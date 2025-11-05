import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Upload, Trash2, Image as ImageIcon, Video } from 'lucide-react';

interface GalleryItem {
  id: string;
  file_path: string;
  alt_text: string;
  category: string;
  is_video: boolean;
  created_at: string;
}

const AdminGallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('fabrica');
  const [altText, setAltText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchGalleryItems();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin-login');
    }
  };

  const fetchGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching items:', error);
      toast.error('Error al cargar la galería');
    } finally {
      setIsLoading(false);
    }
  };

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  const handleUploadToGallery = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast.error('Por favor selecciona archivos para subir');
      return;
    }

    if (!altText.trim()) {
      toast.error('Por favor ingresa un texto alternativo');
      return;
    }

    setUploading(true);

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const isVideo = file.type.startsWith('video/');
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${i}.${fileExt}`;
        const filePath = `${selectedCategory}/${fileName}`;

        // Upload to storage
        const { error: uploadError } = await supabase.storage
          .from('gallery')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('gallery')
          .getPublicUrl(filePath);

        // Insert into database
        const { error: dbError } = await supabase
          .from('gallery_items')
          .insert({
            file_path: publicUrl,
            alt_text: altText,
            category: selectedCategory,
            is_video: isVideo
          });

        if (dbError) throw dbError;
      }

      toast.success(`${selectedFiles.length} archivo(s) subido(s) a la galería exitosamente`);
      setAltText('');
      setSelectedFiles(null);
      fetchGalleryItems();
      
      // Reset file input
      const fileInput = document.getElementById('file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Error uploading:', error);
      toast.error('Error al subir archivos a la galería');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item: GalleryItem) => {
    if (!confirm('¿Estás seguro de eliminar este elemento?')) return;

    try {
      // Extract file path from URL
      const url = new URL(item.file_path);
      const pathParts = url.pathname.split('/');
      const filePath = pathParts.slice(-2).join('/'); // category/filename

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('gallery')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('gallery_items')
        .delete()
        .eq('id', item.id);

      if (dbError) throw dbError;

      toast.success('Elemento eliminado');
      fetchGalleryItems();
    } catch (error) {
      console.error('Error deleting:', error);
      toast.error('Error al eliminar');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button onClick={() => navigate('/admin')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <h1 className="text-3xl font-bold">Gestión de Galería</h1>
        </div>

        {/* Upload Section */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Subir Nuevos Archivos</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fabrica">Fábrica</SelectItem>
                    <SelectItem value="metalurgica">Metalúrgica</SelectItem>
                    <SelectItem value="rental">Rental</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="altText">Texto Alternativo</Label>
                <Input
                  id="altText"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="Describe la imagen/video"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Seleccionar Archivos (Imágenes o Videos)</Label>
              <Input
                id="file"
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleFileSelect}
                disabled={uploading}
              />
              {selectedFiles && (
                <p className="text-sm text-muted-foreground">
                  {selectedFiles.length} archivo(s) seleccionado(s)
                </p>
              )}
            </div>

            <Button 
              onClick={handleUploadToGallery}
              disabled={uploading || !selectedFiles}
              className="w-full"
              size="lg"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Subiendo a la Galería...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Subir a la Galería
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Gallery Items Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Elementos en la Galería ({items.length})</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="aspect-square bg-gray-100 relative">
                  {item.is_video ? (
                    <>
                      <video 
                        src={item.file_path} 
                        className="w-full h-full object-cover"
                        muted
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Video className="w-8 h-8 text-white" />
                      </div>
                    </>
                  ) : (
                    <img 
                      src={item.file_path} 
                      alt={item.alt_text} 
                      className="w-full h-full object-cover"
                    />
                  )}
                  <Button
                    onClick={() => handleDelete(item)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <CardContent className="p-3">
                  <p className="text-xs font-medium truncate">{item.alt_text}</p>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {items.length === 0 && (
            <Card className="p-12">
              <div className="text-center text-muted-foreground">
                <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No hay elementos en la galería</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminGallery;