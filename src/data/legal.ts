export type LegalPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  /** HTML body. */
  body: string;
};

export const legalPages: LegalPage[] = [
  {
    slug: 'aviso-legal',
    title: 'Aviso legal — PCGO',
    description: 'Aviso legal y datos identificativos de PCGO, José Alberto Domínguez Jiménez, NIF 46499111B.',
    h1: 'Aviso legal',
    body: `
<p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa al usuario de los siguientes datos identificativos del titular del sitio web <strong>satpcgo.es</strong>:</p>
<h2>1. Datos identificativos</h2>
<ul>
  <li>Titular: <strong>José Alberto Domínguez Jiménez</strong></li>
  <li>NIF: <strong>46499111B</strong></li>
  <li>Domicilio: Vilanova i la Geltrú, Barcelona (España)</li>
  <li>Teléfono: 620 67 15 15</li>
  <li>Email: info@satpcgo.es</li>
  <li>Actividad: Servicios técnicos de informática y consultoría</li>
</ul>
<h2>2. Objeto y ámbito de aplicación</h2>
<p>Las presentes disposiciones regulan el uso del sitio web satpcgo.es, del que es titular José Alberto Domínguez Jiménez. La navegación por el sitio web atribuye la condición de usuario del mismo y comporta la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal.</p>
<h2>3. Propiedad intelectual e industrial</h2>
<p>Todos los contenidos del sitio web, incluyendo textos, fotografías, gráficos, imágenes, iconos, tecnología, software, así como su diseño gráfico y códigos fuente, son propiedad del titular o de los terceros que han cedido sus derechos, y están protegidos por la legislación nacional e internacional en materia de propiedad intelectual e industrial.</p>
<h2>4. Régimen de responsabilidad</h2>
<p>El titular no se hace responsable de los daños y perjuicios derivados del uso indebido del sitio web ni de la información contenida en él. Tampoco se hace responsable de los contenidos de los enlaces externos que pueda incluir.</p>
<h2>5. Legislación aplicable y jurisdicción</h2>
<p>Las relaciones entre el titular y los usuarios se regirán por la legislación española. Para la resolución de cualquier conflicto, las partes se someten a los Juzgados y Tribunales de Vilanova i la Geltrú (Barcelona).</p>
`,
  },
  {
    slug: 'politica-de-privacidad',
    title: 'Política de privacidad — PCGO',
    description: 'Política de privacidad y tratamiento de datos personales de PCGO conforme al RGPD.',
    h1: 'Política de privacidad',
    body: `
<p>En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos (RGPD), y de la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), se informa al usuario de lo siguiente:</p>
<h2>1. Responsable del tratamiento</h2>
<p>José Alberto Domínguez Jiménez (PCGO) — NIF 46499111B — Vilanova i la Geltrú, Barcelona — info@satpcgo.es</p>
<h2>2. Finalidad del tratamiento</h2>
<p>Los datos personales facilitados a través de los formularios de contacto o por correo electrónico serán tratados con la única finalidad de atender las consultas o solicitudes de servicios realizadas por el usuario. No se utilizan para finalidades comerciales ni se ceden a terceros.</p>
<h2>3. Legitimación</h2>
<p>La base legal para el tratamiento de los datos es el consentimiento del interesado, que se manifiesta al facilitarlos a través de los canales de contacto.</p>
<h2>4. Conservación de los datos</h2>
<p>Los datos se conservarán mientras se mantenga la relación comercial o el usuario no solicite su supresión.</p>
<h2>5. Derechos del usuario</h2>
<p>El usuario puede ejercer en cualquier momento los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de sus datos, dirigiéndose a info@satpcgo.es.</p>
<h2>6. Seguridad de los datos</h2>
<p>El titular aplica las medidas técnicas y organizativas adecuadas para garantizar la seguridad de los datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado.</p>
<h2>7. Cookies</h2>
<p>Este sitio web no utiliza cookies propias. Solo se cargan servicios de terceros (Google Analytics, Deftform) que pueden establecer sus propias cookies. El usuario puede configurar su navegador para rechazarlas.</p>
`,
  },
  {
    slug: 'condiciones',
    title: 'Condiciones de uso — PCGO',
    description: 'Condiciones de uso del sitio web satpcgo.es.',
    h1: 'Condiciones de uso',
    body: `
<p>El acceso y uso de este sitio web atribuye la condición de usuario y comporta la aceptación de las presentes condiciones de uso.</p>
<h2>1. Aceptación</h2>
<p>El usuario acepta las presentes condiciones al acceder al sitio. Si no está de acuerdo, debe abandonar el sitio.</p>
<h2>2. Uso del sitio</h2>
<p>El usuario se compromete a utilizar el sitio y sus contenidos de conformidad con la ley, la buena fe y el orden público. Queda prohibido el uso del sitio con finalidades ilícitas o que vulneren derechos de terceros.</p>
<h2>3. Contenidos</h2>
<p>Los contenidos del sitio son informativos. El titular se reserva el derecho de modificarlos, actualizarlos o eliminarlos en cualquier momento sin previo aviso.</p>
<h2>4. Limitación de responsabilidad</h2>
<p>El titular no se hace responsable de los daños derivados del uso del sitio, ni de la imposibilidad de acceso al mismo.</p>
<h2>5. Legislación aplicable</h2>
<p>Las presentes condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales de Vilanova i la Geltrú.</p>
`,
  },
  {
    slug: 'condiciones-servicio',
    title: 'Condiciones del servicio — PCGO',
    description: 'Condiciones contractuales de los servicios técnicos ofrecidos por PCGO.',
    h1: 'Condiciones del servicio',
    body: `
<p>Las presentes condiciones regulan la prestación de los servicios técnicos ofrecidos por José Alberto Domínguez Jiménez (PCGO).</p>
<h2>1. Objeto</h2>
<p>El servicio consiste en la prestación de asistencia técnica informática a domicilio, en taller o en remoto, en el ámbito territorial indicado en la web.</p>
<h2>2. Tarifas y facturación</h2>
<p>Las tarifas vigentes están publicadas en la página de Tarifas. Se facturará por horas reales de trabajo, con un mínimo de 1 hora. Los presupuestos cerrados se respetan aunque el trabajo dure más.</p>
<h2>3. Desplazamientos</h2>
<p>El desplazamiento está incluido en todo el Garraf. Para poblaciones entre 25 y 50 km se cobrará 10 € adicionales. Más de 50 km, presupuesto previo.</p>
<h2>4. Forma de pago</h2>
<p>Efectivo, tarjeta, Bizum o transferencia bancaria. Para soporte remoto se requiere pago por adelantado.</p>
<h2>5. Garantía</h2>
<p>Las reparaciones tienen una garantía de 3 meses sobre el trabajo realizado. Los componentes nuevos mantienen la garantía del fabricante.</p>
<h2>6. Responsabilidad</h2>
<p>El titular no se hace responsable de la pérdida de datos durante la intervención, aunque se toman todas las precauciones razonables. Se recomienda copia de seguridad previa.</p>
<h2>7. Cancelaciones</h2>
<p>Las cancelaciones con más de 24h de antelación no tienen coste. Con menos de 24h se cobrará 1 hora de servicio a la tarifa estándar.</p>
<h2>8. Reclamaciones</h2>
<p>Las reclamaciones se atenderán por escrito a info@satpcgo.es en un plazo máximo de 30 días.</p>
`,
  },
];

export function getLegal(slug: string): LegalPage | undefined {
  return legalPages.find((l) => l.slug === slug);
}
