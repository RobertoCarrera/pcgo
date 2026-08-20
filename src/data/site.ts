/**
 * Single source of truth for business identity, NAP, hours, contact.
 * Import in any page or component.
 */

export const site = {
  name: 'PCGO',
  legalName: 'José Alberto Domínguez Jiménez',
  nif: '46499111B',
  tagline: 'Informático a domicilio en Vilanova, Sitges y Garraf',
  description:
    'Informático a domicilio en Vilanova i la Geltrú, Sitges y comarca del Garraf. PC, Mac, redes, servidores, Active Directory, NAS. 10+ años arreglando tecnología.',

  // Contact
  phone: {
    display: '620 67 15 15',
    tel: '+34620671515',
  },
  email: 'info@satpcgo.es',
  whatsapp: 'https://wa.me/message/5SXSSL6VY63EG1',
  instagram: 'https://www.instagram.com/pcgo.ig',
  website: 'https://satpcgo.es',

  // Location
  city: 'Vilanova i la Geltrú',
  province: 'Barcelona',
  region: 'ES-CT', // ISO 3166-2
  geo: {
    lat: 41.2376,
    lng: 1.7284,
  },

  // Hours (ISO 8601 dayOfWeek: Mo=1, Tu=2, We=3, Th=4, Fr=5, Sa=6, Su=0)
  hours: [
    { day: 'Mo-Sa', opens: '09:00', closes: '20:00' },
  ],

  // Social
  social: [
    { name: 'Instagram', url: 'https://www.instagram.com/pcgo.ig', handle: '@pcgo.ig' },
    { name: 'WhatsApp', url: 'https://wa.me/message/5SXSSL6VY63EG1' },
  ],

  // Brand
  colors: {
    primary: '#0071e3',
    accent: '#5e5cff',
    dark: '#1d1d1f',
    bg: '#fbfbfd',
  },

  // OG defaults
  ogImage: '/og-cover.jpg',

  // Stats
  stats: [
    { num: '10+', label: 'Años arreglando PC y redes' },
    { num: '24h', label: 'TarifaGo de urgencia' },
    { num: '12', label: 'Poblaciones cubiertas' },
    { num: '0€', label: 'Desplazamiento en Garraf' },
  ],

  // Aggregate rating (for LocalBusiness JSON-LD)
  rating: {
    value: 4.9,
    count: 47,
  },
} as const;

export type Site = typeof site;
