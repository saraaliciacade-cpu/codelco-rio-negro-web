export interface ClientLogo {
  name: string;
  /** Stable public URL so Google Images can index the logo */
  logo: string;
}

const P = '/images/clientes';

export const clientsRow1: ClientLogo[] = [
  { name: "Compressco LP", logo: `${P}/compresco.jpeg` },
  { name: "Transportes Crexell S.A.", logo: `${P}/crexell.png` },
  { name: "Datum S.A.", logo: `${P}/datum.png` },
  { name: "E&G Servicios SRL", logo: `${P}/eg-servicios.png` },
  { name: "Edvsa", logo: `${P}/edvsa.png` },
  { name: "Emergencias", logo: `${P}/emergencias-new.png` },
  { name: "Flargent S.A.", logo: `${P}/flargent.jpg` },
  { name: "Hidromec SRL", logo: `${P}/hidromec-new.jpeg` },
  { name: "Hot Hed S.A.", logo: `${P}/hot-hed.png` },
  { name: "Indasyc", logo: `${P}/indasyc-new.png` },
];

export const clientsRow2: ClientLogo[] = [
  { name: "SL Group Oil Solutions", logo: `${P}/sl-group.jpg` },
  { name: "Ingenieria Terra S.A.", logo: `${P}/ingenieria-terra.png` },
  { name: "LyG Servicios SRL", logo: `${P}/lyg-servicios-new.jpeg` },
  { name: "Net Log S.A.", logo: `${P}/netlog.png` },
  { name: "Oilstone", logo: `${P}/oilstone-new.jpg` },
  { name: "Prodeng S.A.", logo: `${P}/prodeng.png` },
  { name: "Quimpe SRL", logo: `${P}/quimpe-new.png` },
  { name: "Rakiduam S.A.", logo: `${P}/rakiduam.png` },
  { name: "Ranger Oil S.A.", logo: `${P}/ranger-oil-new.png` },
  { name: "San Antonio Internacional", logo: `${P}/san-antonio-new.png` },
];

export const clientsRow3: ClientLogo[] = [
  { name: "Wintershall", logo: `${P}/wintershall-new.png` },
  { name: "Technip FMC", logo: `${P}/technip-fmc.webp` },
  { name: "Tecpetrol S.A.", logo: `${P}/tecpetrol-new.png` },
  { name: "Tetra Technologies", logo: `${P}/tetra.png` },
  { name: "Tomrel S.A.", logo: `${P}/tomrel.png` },
  { name: "Tacker SRL", logo: `${P}/tacker-new.png` },
  { name: "Transportes Ferra S.A.", logo: `${P}/transporte-ferra.png` },
  { name: "Compañía TSB", logo: `${P}/tsb-new.png` },
  { name: "Tuboscope Vetco Ar.", logo: `${P}/tuboscope.jpg` },
  { name: "25 de Mayo S.A.", logo: `${P}/25-de-mayo-new.png` },
];

export const allClients: ClientLogo[] = [...clientsRow1, ...clientsRow2, ...clientsRow3];
