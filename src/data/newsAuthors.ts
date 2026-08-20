import ignacioGuerraCodelcoPerfil from '@/assets/ignacio-guerra-codelco-perfil.webp.asset.json';

export const newsAuthorOverrides: Record<
  string,
  {
    name: string;
    role: string;
    image: string;
    url: string;
  }
> = {
  'que-es-un-modulo-habitacional': {
    name: 'Ignacio Guerra',
    role: 'Organic Design · Neuquén',
    image: ignacioGuerraCodelcoPerfil.url,
    url: 'https://organicdesign.com.ar/sobre-mi',
  },
};

