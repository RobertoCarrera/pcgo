import { site } from './site';

export type Service = {
  slug: string;
  name: string;
  eyebrow: string;
  h1: string;
  lead: string;
  metaDescription: string;
  ogDescription: string;
  serviceType: string;
  faqs: { q: string; a: string }[];
  /** SVG path data for the icon (single-color stroke style, Apple-SF-Symbols-like) */
  icon: 'pc' | 'apple' | 'wifi' | 'box' | 'console' | 'chat';
  /** Unsplash photo URL used as a heavily-blurred card background. */
  image: string;
  /** Card color theme for the Servicios page bento. */
  theme: 'default' | 'dark' | 'blue' | 'tinted';
  /** Optional layout class for the bento grid (e.g. col-span-2 row-span-2). */
  span?: string;
};

export const services: Service[] = [
  {
    slug: 'reparacion-ordenadores',
    name: 'Reparación de ordenadores',
    eyebrow: 'Servicio técnico PC',
    h1: 'Tu ordenador, <span class="text-gradient-blue">como nuevo</span>.<br>Sin moverlo de casa.',
    lead: 'Diagnóstico honesto, presupuesto cerrado antes de tocar nada, y reparación in situ. Si no se puede arreglar, te lo digo.',
    metaDescription:
      'Reparación de ordenadores PC y portátiles a domicilio en Vilanova, Sitges y Garraf. Diagnóstico, limpieza, eliminación de virus, recuperación de datos, ampliación de RAM y SSD. 45 €/h con desplazamiento incluido.',
    ogDescription:
      'Tu PC va lento, se reinicia, no enciende o tiene virus. Vamos a tu casa y lo solucionamos. 45 €/h, desplazamiento incluido.',
    serviceType: 'Reparación de ordenadores PC y Mac',
    icon: 'pc',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=80&auto=format&fit=crop',
    theme: 'default',
    faqs: [
      {
        q: '¿Cuánto tarda una reparación típica?',
        a: 'Depende del problema. Una limpieza de virus suele ser 1-2 horas. Un cambio de disco a SSD y reinstalación, unas 3-4 horas. Te digo el tiempo estimado antes de empezar.',
      },
      {
        q: '¿Trabajáis con todas las marcas?',
        a: 'Sí: HP, Dell, Lenovo, ASUS, Acer, MSI, Samsung, Sony, LG, Toshiba… y también con equipos montados a medida.',
      },
      {
        q: '¿Y si no tiene arreglo?',
        a: 'Si el equipo es irrecuperable, te lo digo honestamente y no se cobra la reparación. Solo el tiempo de diagnóstico si lo has autorizado.',
      },
      {
        q: '¿Recuperáis datos de discos dañados?',
        a: 'Sí, en la mayoría de casos. Usamos herramientas profesionales para discos con sectores defectuosos, y si el disco ha muerto del todo, tenemos contacto con un laboratorio de recuperación.',
      },
    ],
  },
  {
    slug: 'soporte-apple',
    name: 'Soporte Apple',
    eyebrow: 'Servicio estrella',
    h1: 'Soporte <span class="text-gradient-blue">Apple</span> a domicilio.<br>Voy a tu casa o a tu negocio.',
    lead: 'Especialista con 2+ años de experiencia en Mac, iPhone, iPad, Apple Watch y Apple TV. Voy a tu casa o negocio en Vilanova, Sitges y todo el Garraf.',
    metaDescription:
      'Especialista Apple a domicilio en Vilanova i la Geltrú, Sitges y comarca del Garraf. Configuración, reparación, migración y soporte de Mac, iPhone e iPad. 2+ años de experiencia. 45 €/h, desplazamiento incluido.',
    ogDescription:
      'Especialista Apple en Vilanova, Sitges y Garraf. Mac, iPhone, iPad. 2+ años de experiencia.',
    serviceType: 'Soporte técnico Apple',
    icon: 'apple',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&q=80&auto=format&fit=crop',
    theme: 'dark',
    faqs: [
      {
        q: '¿Hacéis reparaciones de hardware de Mac e iPhone?',
        a: 'Sí. Trabajamos tanto a nivel de software como de hardware: cambios de batería, pantallas, discos SSD, limpieza interna, sustitución de pasta térmica. Para presupuestos oficiales, enlazamos con la herramienta oficial de Apple (no tramitamos AppleCare+).',
      },
      {
        q: '¿Podéis migrar mis datos de un Mac viejo a uno nuevo?',
        a: 'Por supuesto. Usamos Asistente de Migración de Apple y, si hace falta, técnicas avanzadas para recuperar datos de discos dañados. Dejamos tu nuevo Mac exactamente como tenías el antiguo: cuentas, apps, documentos, ajustes.',
      },
      {
        q: '¿Ayudáis a configurar iCloud y copias de seguridad?',
        a: 'Sí. Configuramos iCloud con la mejor estrategia según tu almacenamiento, activamos Time Machine si tienes disco externo, y dejamos programada la copia de seguridad para que nunca pierdas nada.',
      },
      {
        q: '¿Trabajáis con empresa con flota de Mac?',
        a: 'Sí. Implantación, configuración con MDM, gestión de usuarios y mantenimiento continuado con PackGo!. Pídenos presupuesto personalizado para tu empresa.',
      },
    ],
  },
  {
    slug: 'redes-wifi',
    name: 'Redes e internet',
    eyebrow: 'Conectividad',
    h1: 'WiFi rápido, <span class="text-gradient-blue">sin zonas muertas</span>,<br>en toda tu casa o negocio.',
    lead: 'Estudio de cobertura, instalación de mesh o cableado, configuración avanzada. Para particulares y empresas.',
    metaDescription:
      'Instalación y mejora de redes WiFi en Vilanova, Sitges y Garraf. Mesh, routers, cableado estructurado, switches, NAS. Sin zonas muertas, en casa o en tu negocio.',
    ogDescription:
      'WiFi sin zonas muertas, mesh, cableado y NAS. Para casa y para negocio. Desplazamiento incluido en Garraf.',
    serviceType: 'Instalación y mejora de redes WiFi',
    icon: 'wifi',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a0?w=900&q=80&auto=format&fit=crop',
    theme: 'tinted',
    faqs: [
      {
        q: '¿Cuánto cuesta mejorar la WiFi de mi casa?',
        a: 'Depende del tamaño y de la solución. Un sistema mesh básico para 100 m² empieza en torno a 150-200 € de equipo, más 1-2 horas de instalación. Te doy presupuesto cerrado.',
      },
      {
        q: '¿Valen los WiFi mesh de los operadores?',
        a: 'Suelen ser limitados. Para una casa grande o con varias plantas recomiendo sistemas mesh dedicados (ASUS, TP-Link Deco, Eero).',
      },
      {
        q: '¿Hacéis cableado estructurado en oficinas?',
        a: 'Sí. Canalización, rosetas, rack, switches, certificaciones. Trabajamos con Cat 6 y Cat 7 según presupuesto.',
      },
      {
        q: '¿Podéis ayudarme con el teletrabajo?',
        a: 'Por supuesto. VPN, doble pantalla, configuración del router para priorizar tráfico de videoconferencia, microfonía y cámara. Te lo dejo todo listo para trabajar desde casa.',
      },
    ],
  },
  {
    slug: 'reparacion-consolas',
    name: 'Reparación de consolas',
    eyebrow: 'Gaming',
    h1: 'Tu consola, otra vez <span class="text-gradient-blue">como nueva</span>.',
    lead: 'PlayStation, Xbox, Nintendo y también vintage. Recogida y entrega incluida en el Garraf. 40 €/h en taller.',
    metaDescription:
      'Reparación de PlayStation, Xbox, Nintendo y consolas vintage en Vilanova, Sitges y Garraf. Cambio de pasta térmica, HDMI, fuentes, lectores. Recogida incluida en Garraf.',
    ogDescription:
      'Reparación de PS, Xbox, Nintendo y vintage. Pasta térmica, HDMI, fuentes. Recogida en Garraf.',
    serviceType: 'Reparación de consolas y equipos gaming',
    icon: 'console',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=900&q=80&auto=format&fit=crop',
    theme: 'default',
    faqs: [
      {
        q: '¿Cuánto cuesta cambiar la pasta térmica de una PS5?',
        a: 'Suele ser 1 hora de trabajo (40 €) más el coste de la pasta térmica de calidad (incluida en el precio). En 24-48 h la tienes lista.',
      },
      {
        q: '¿Recogéis la consola en mi casa?',
        a: 'Sí, en todo el Garraf. Te la recogemos, la reparamos en taller y te la devolvemos. Todo en 2-5 días laborables.',
      },
      {
        q: '¿Tiene arreglo el Joy-Con con drift?',
        a: 'Casi siempre. Cambio del stick analógico o limpieza con isopropílico. En menos de 1 hora y por 25-40 € dependiendo del modelo.',
      },
      {
        q: '¿Reparáis consolas muy antiguas?',
        a: 'Sí, siempre que haya piezas o posibilidad de adaptación. Trabajamos con PS1, PS2, Dreamcast, Saturn, Game Boy y demás. Consúltenos.',
      },
    ],
  },
  {
    slug: 'venta-equipos',
    name: 'Venta de equipos',
    eyebrow: 'Venta de equipos',
    h1: 'Te ayudo a elegir el equipo<br>que <span class="text-gradient-blue">realmente necesitas</span>.',
    lead: 'PC Gaming, workstations, portátiles, barebones, dispositivos Apple. Asesoramiento sin venderte humo: solo lo que necesitas, configurado y listo.',
    metaDescription:
      'Asesoramiento y venta de PC Gaming a medida, workstations, portátiles, barebones y dispositivos Apple en Vilanova, Sitges y Garraf. Te recomendamos solo lo que necesitas.',
    ogDescription:
      'PC Gaming, workstations, portátiles, Apple. Asesoramiento honesto, solo lo que necesitas. Configurado y listo.',
    serviceType: 'Venta de equipos a medida',
    icon: 'box',
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=900&q=80&auto=format&fit=crop',
    theme: 'default',
    faqs: [
      {
        q: '¿Vendéis componentes sueltos?',
        a: 'Sí. Si ya tienes una torre y solo necesitas la gráfica, el SSD o la fuente, te lo consigo y te lo instalo.',
      },
      {
        q: '¿Cuánto cuesta un PC Gaming decente?',
        a: 'Para 1080p con buenos detalles en juegos actuales, desde unos 700 € con caja, fuente decente y SSD. Para 1440p, sobre los 1.200 €. Te armo presupuesto personalizado.',
      },
      {
        q: '¿Hacéis configuración inicial?',
        a: 'Siempre. Te entrego el PC con Windows actualizado, drivers al día, software básico instalado y tu cuenta de usuario ya configurada. Solo tienes que encender y jugar.',
      },
      {
        q: '¿Dáis garantía?',
        a: 'Sí: 2 años en componentes según ley, y garantía propia de montaje (cables, pasta térmica, configuración). Si algo falla por montaje, lo arreglo sin coste.',
      },
    ],
  },
  {
    slug: 'clases-personalizadas',
    name: 'Clases personalizadas',
    eyebrow: 'Formación',
    h1: 'Aprende <span class="text-gradient-blue">a tu ritmo</span>.<br>Sin tecnicismos.',
    lead: 'Clases uno-a-uno a domicilio. Desde manejar el smartphone hasta montar tu PC Gaming, pasando por copias, fotos o videollamadas con la familia.',
    metaDescription:
      'Clases de informática uno-a-uno a domicilio en Vilanova, Sitges y Garraf. Aprende a tu ritmo: smartphone, PC, copias, fotos, videollamadas. Especial personas mayores.',
    ogDescription:
      'Clases uno-a-uno a domicilio. Aprende a tu ritmo, sin tecnicismos. Especial personas mayores.',
    serviceType: 'Clases de informática personalizadas',
    icon: 'chat',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80&auto=format&fit=crop',
    theme: 'tinted',
    faqs: [
      {
        q: '¿Cuánto dura cada clase?',
        a: 'Lo que tú quieras. Mínimo 1 hora, aunque 1,5-2 horas suele funcionar mejor porque da tiempo a practicar.',
      },
      {
        q: '¿Hacéis packs de varias clases?',
        a: 'Sí, con descuento. Por ejemplo, 5 clases de 1,5 horas sale mejor que 5 clases sueltas. Te lo calculo.',
      },
      {
        q: '¿Trabajáis con personas mayores?',
        a: 'Es nuestra especialidad. Tenemos experiencia explicando a personas de 70, 80 años con paciencia y sin prisa. Cero tecnicismos, todo con ejemplos de su vida diaria.',
      },
      {
        q: '¿Puedo pedir que vengas a casa de mis padres?',
        a: 'Por supuesto. Vamos donde haga falta, con la misma tarifa, y al final les dejo un mini manual impreso con los pasos que han aprendido.',
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export { site };
