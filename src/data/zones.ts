export type Zone = {
  slug: string;
  name: string;
  province: string;
  /** Headline of the "cobertura" or "intro" block. */
  intro: string;
  /** Lead paragraph shown in hero. */
  lead: string;
  /** Key bullet groups (each title + items). */
  groups: { title: string; items: string[] }[];
  /** Optional unique paragraphs (like "por qué elegirnos aquí"). */
  unique: string[];
  faqs: { q: string; a: string }[];
};

export const zones: Zone[] = [
  {
    slug: 'vilanova-i-la-geltru',
    name: 'Vilanova i la Geltrú',
    province: 'Garraf · Barcelona',
    intro: 'Vilanova i la Geltrú es la capital de la comarca del Garraf y nuestro centro de operaciones.',
    lead: 'A domicilio en Vilanova i la Geltrú y poblaciones cercanas. 45 €/h, desplazamiento incluido en todo el Garraf.',
    groups: [
      {
        title: 'Barrios cubiertos',
        items: [
          'Centro y Eixample',
          'La Geltrú y la Rambla',
          'Roc de Sant Gaietà y zona marítima',
          'Sant Joan y Armanyà',
          'Mar y Camp',
          'Molí de Vent y la Collada',
          'Polígonos industriales',
        ],
      },
      {
        title: 'Servicio habitual en Vilanova',
        items: [
          'Reparación de PC y Mac a domicilio',
          'Soporte Apple (especialista 2+ años)',
          'Mejora de WiFi en pisos y casas',
          'Clases de informática para mayores',
          'Soporte a autónomos y pequeñas empresas',
          'Mantenimiento de redes y equipos',
        ],
      },
    ],
    unique: [
      'Somos de aquí. Conocemos los problemas típicos del cableado de los edificios del centro, las particularidades de los chalets de la zona norte y los horarios de los negocios del paseo marítimo. Por eso llegamos rápido y diagnosticamos mejor.',
      'Y como Vilanova está en el centro del Garraf, el desplazamiento está incluido en la tarifa. Sin extras por venir a tu casa.',
    ],
    faqs: [
      {
        q: '¿Cuánto tardáis en venir a Vilanova?',
        a: 'Si es TarifaGo (urgencia), en menos de 24h. Si no, normalmente en 24-48h. Para soporte remoto, en menos de 1 hora.',
      },
      {
        q: '¿Cobramos desplazamiento en Vilanova?',
        a: 'No. Está incluido en la tarifa estándar de 45 €/h, igual que en todo el Garraf.',
      },
      {
        q: '¿Trabajáis con empresas de Vilanova?',
        a: 'Por supuesto. Muchas de las pequeñas empresas y autónomos de la zona son clientes habituales. PackGo! disponible con descuento.',
      },
    ],
  },
  {
    slug: 'sitges',
    name: 'Sitges',
    province: 'Garraf · Barcelona',
    intro: 'Sitges, donde Alberto lleva más de 10 años trabajando como técnico.',
    lead: 'A domicilio en Sitges y todo el término municipal. 45 €/h, desplazamiento incluido en el Garraf.',
    groups: [
      {
        title: 'Zonas cubiertas',
        items: [
          'Centro y casco antiguo',
          'Paseo marítimo',
          'Zona de Levante (Terramar, Vinyet)',
          'Zona de Poniente (Poble Sec, Quint Mar)',
          'Aiguadolç y Port d\'Aiguadolç',
          'Urbanizaciones de la Vallpineda',
        ],
      },
      {
        title: 'Servicios más demandados en Sitges',
        items: [
          'Soporte Apple para profesionales y creativos',
          'Mejora de WiFi en chalets de varias plantas',
          'Reparación de Mac y migración de datos',
          'Clases de tecnología en inglés y español',
          'Configuración de equipos para nómadas digitales',
        ],
      },
    ],
    unique: [
      'Sitges tiene una comunidad importante de usuarios de Mac. Por eso aquí es donde más servicios Apple damos: configuración de Mac Studio y MacBook Pro para creativos, migración entre equipos, copias con Time Machine, integración con iCloud.',
    ],
    faqs: [
      {
        q: '¿Cubrís también las urbanizaciones de Sitges?',
        a: 'Sí: Vallpineda, Levantina, Santa Bàrbara, Quint Mar, Mas d\'en Serra. Desplazamiento incluido en el Garraf.',
      },
      {
        q: '¿Trabajáis con segundas residencias?',
        a: 'Por supuesto. Muchos clientes nos llaman para una revisión de su Mac o la actualización de su WiFi antes de llegar a pasar el verano. Coordinamos por WhatsApp.',
      },
      {
        q: '¿Dais servicio en inglés?',
        a: 'Sí, perfectamente. Alberto habla inglés y puede atender a clientes internacionales sin problema.',
      },
    ],
  },
  {
    slug: 'sant-pere-de-ribes',
    name: 'Sant Pere de Ribes',
    province: 'Garraf · Barcelona',
    intro: 'Sant Pere de Ribes, municipio tranquilo del Garraf con muchos chalets y urbanizaciones.',
    lead: 'A domicilio en Sant Pere de Ribes y urbanizaciones. 45 €/h, desplazamiento incluido en el Garraf.',
    groups: [
      {
        title: 'Zonas',
        items: [
          'Centro de Sant Pere',
          'Las Roquetes',
          'Puigmoltó',
          'Mas Pares',
          'Can Macià',
          'Vilanoveta',
        ],
      },
      {
        title: 'Lo que más piden en Ribes',
        items: [
          'Mejora de cobertura WiFi en chalets',
          'Reparación de PC de sobremesa',
          'Clases para padres y abuelos',
          'Configuración de impresoras WiFi',
          'Instalación de NAS y copias de seguridad',
        ],
      },
    ],
    unique: [],
    faqs: [
      {
        q: '¿El desplazamiento a Sant Pere está incluido?',
        a: 'Sí, forma parte del Garraf. Sin coste adicional.',
      },
      {
        q: '¿Cuánto tardáis en venir?',
        a: 'Habitualmente en 24-48 horas. Con TarifaGo, en menos de 24h.',
      },
    ],
  },
  {
    slug: 'cubelles',
    name: 'Cubelles',
    province: 'Garraf · Barcelona',
    intro: 'Cubelles, el pueblo más al sur del Garraf.',
    lead: 'A domicilio en Cubelles y urbanizaciones. 45 €/h, desplazamiento incluido en el Garraf.',
    groups: [],
    unique: [
      'Cubelles es un pueblo con una mezcla interesante de residentes todo el año y casas de veraneo. Damos servicio a ambos: revisiones antes del verano para los segundos residentes, y mantenimiento continuado para los que viven aquí permanentemente.',
    ],
    faqs: [
      {
        q: '¿Venís a las urbanizaciones de Cubelles?',
        a: 'Sí, todas: Mas Trader, La Gaviota, Costacubeta, Les Salines.',
      },
      {
        q: '¿Cobramos desplazamiento?',
        a: 'No, está incluido en el Garraf.',
      },
    ],
  },
  {
    slug: 'canyelles',
    name: 'Canyelles',
    province: 'Garraf · Barcelona',
    intro: 'Canyelles, pueblo pequeño del Garraf interior con muchas casas unifamiliares.',
    lead: 'A domicilio en Canyelles. 45 €/h, desplazamiento incluido en el Garraf.',
    groups: [],
    unique: [
      'Canyelles tiene un perfil residencial tranquilo, con chalets y adosados. Por eso los servicios más habituales aquí son: ampliación de WiFi, configuración de impresoras, clases a mayores y reparación puntual de PCs.',
    ],
    faqs: [
      {
        q: '¿Y si vivo en una masía alejada del centro?',
        a: 'No hay problema. Llegamos a cualquier punto de Canyelles. El WiFi en casas grandes es precisamente una de nuestras especialidades.',
      },
    ],
  },
  {
    slug: 'baix-penedes',
    name: 'Baix Penedès',
    province: 'Tarragona',
    intro: 'El Baix Penedès (Vilafranca, El Vendrell, Calafell, Cunit) entra en nuestra zona con un pequeño suplemento de desplazamiento.',
    lead: 'A domicilio en Vilafranca, El Vendrell, Calafell y Cunit. 45 €/h + 10 € de desplazamiento (entre 25 y 50 km).',
    groups: [
      {
        title: 'Poblaciones',
        items: ['Vilafranca del Penedès', 'El Vendrell', 'Calafell', 'Cunit', 'Segur de Calafell'],
      },
      {
        title: 'Servicios habituales',
        items: [
          'Mantenimiento B2B con PackGo!',
          'Soporte a oficinas y despachos',
          'Reparación de Mac en Vilafranca',
          'Clases particulares',
        ],
      },
    ],
    unique: [
      'Cubrimos Vilafranca del Penedès, El Vendrell, Calafell y Cunit. Para particulares, el desplazamiento son 10 € adicionales (entre 25 y 50 km). Para empresas con PackGo!, el coste de desplazamiento se diluye en la primera hora de trabajo.',
    ],
    faqs: [
      {
        q: '¿Cuánto cuesta el desplazamiento al Baix Penedès?',
        a: '10 € adicionales por visita (para poblaciones entre 25 y 50 km). Dentro del PackGo! empresarial, se diluye.',
      },
      {
        q: '¿Venís a Calafell y Cunit en verano?',
        a: 'Sí, todo el año. En verano es temporada alta para nosotros por las segundas residencias.',
      },
    ],
  },
];

export function getZone(slug: string): Zone | undefined {
  return zones.find((z) => z.slug === slug);
}
