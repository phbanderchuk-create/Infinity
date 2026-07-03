import type { Language } from './types'

const pt = {
  nav: {
    services: 'Serviços',
    sitesLanding: 'Sites & Landing Pages',
    botsDiscord: 'BOTs Discord',
    features: 'Recursos',
    plans: 'Planos',
    signIn: 'Entrar',
    getStarted: 'Começar agora',
  },
  hero: {
    badge: 'Soluções profissionais para Discord & Web',
    title1: 'Potencialize seu',
    titleDiscord: 'servidor Discord',
    title2: 'e sua',
    titleDigital: 'presença digital',
    subtitle:
      'BOTs profissionais e sites modernos com infraestrutura de classe mundial, gestão completa e suporte especializado.',
    ctaProducts: 'Ver produtos e preços',
    ctaPanel: 'Acessar painel',
    stats: {
      clients: 'Clientes ativos',
      uptime: 'Uptime garantido',
      support: 'Suporte técnico',
      products: 'Produtos especializados',
    },
  },
  sites: {
    badge: 'Novo serviço',
    title: 'Sites & Landing Pages',
    titleHighlight: 'Landing Pages',
    subtitle: 'Orçamento personalizado para o seu projeto web.',
    features: {
      design: { title: 'Design Moderno', desc: 'Layouts profissionais e atraentes' },
      responsive: { title: 'Responsivo', desc: 'Perfeito em qualquer dispositivo' },
      seo: { title: 'SEO Otimizado', desc: 'Melhor posicionamento no Google' },
      custom: { title: 'Personalizado', desc: 'Identidade visual da sua marca' },
    },
    portfolio: 'Portfólio',
    portfolioHighlight: 'Clientes',
    portfolioSubtitle: 'Projetos reais entregues pela nossa equipe',
    visitSite: 'Visitar site',
    online: 'Online',
    items: [
      {
        title: 'Projeto Institucional',
        description: 'Site institucional moderno para grupo empresarial',
        tags: ['Institucional', 'Landing Page'],
      },
      {
        title: 'Portfólio Profissional',
        description: 'Portfólio profissional para desenvolvedor',
        tags: ['Portfólio', 'Dev'],
      },
      {
        title: 'Grupo Gaming',
        description: 'Site institucional para grupo de gaming',
        tags: ['Institucional', 'Gaming'],
      },
    ],
  },
  features: {
    title: 'Por que nos',
    titleHighlight: 'escolher?',
    subtitle: 'Infraestrutura, performance e suporte — tudo em um só lugar.',
    items: [
      {
        title: 'Alta Performance',
        description:
          'Infraestrutura dedicada com 99,9% de uptime garantido para o seu BOT.',
      },
      {
        title: 'Segurança Total',
        description:
          'Dados criptografados e proteção contra ataques, mantendo seu servidor seguro.',
      },
      {
        title: 'Atualizações Automáticas',
        description:
          'Seu BOT sempre atualizado com os recursos mais recentes e correções de bugs.',
      },
      {
        title: 'Painel Completo',
        description:
          'Gerencie suas aplicações em tempo real: status, logs e muito mais.',
      },
      {
        title: 'Hospedagem Dedicada',
        description:
          'Hospedagem dedicada na melhor infraestrutura de BOTs do Brasil.',
      },
      {
        title: 'Suporte 24/7',
        description: 'Equipe técnica disponível para ajudar sempre que precisar.',
      },
    ],
  },
  infrastructure: {
    badge: 'Infraestrutura Dedicada',
    title: 'Infraestrutura de classe mundial',
    description:
      'Todos os nossos BOTs rodam em servidores dedicados, garantindo máxima disponibilidade, velocidade e segurança para suas aplicações.',
    uptime: 'Uptime',
    latency: 'Latência',
    monitoring: 'Monitoramento',
  },
  plans: {
    title: 'Planos & Preços',
    titleHighlight: 'Preços',
    subtitle: 'Escolha o plano ideal para o seu servidor Discord',
    popular: 'Mais popular',
    promotion: 'Promoção',
    perMonth: '/mês',
    subscribe: 'Assinar agora',
    moreDetails: 'Mais detalhes',
    loginToBuy: 'Faça login',
    or: 'ou',
    createAccount: 'crie uma conta',
    toBuy: 'para comprar',
    botSubtitle: 'BOT Discord Profissional',
    store: {
      description:
        'BOT de store com painel de controle completo para seu servidor Discord.',
      features: [
        'Painel de controle integrado',
        'Catálogo de produtos customizável',
        'Sistema de pedidos automático',
        'Notificações em tempo real',
        'Suporte a múltiplas moedas',
      ],
    },
    cfx: {
      description: 'BOT para servidores FiveM/RedM com integração CFX completa.',
      features: [
        'Integração com CFX/FiveM',
        'Sistema de whitelist',
        'Gerenciamento de permissões',
        'Logs de atividade detalhados',
        'Sincronização em tempo real',
      ],
    },
    websites: {
      title: 'Sites & Landing Pages',
      badge: 'Sob consulta',
      description: 'Orçamento personalizado para o seu projeto web.',
      cta: 'Solicitar orçamento',
    },
  },
  cta: {
    badge: 'Comece hoje',
    title: 'Pronto para elevar seu',
    titleHighlight: 'servidor e presença digital?',
    subtitle: 'Junte-se a centenas de clientes que já confiam em nossas soluções.',
    start: 'Começar agora',
    hasAccount: 'Já tenho uma conta',
  },
  footer: {
    systemStatus: 'Status do Sistema',
    description:
      'Soluções profissionais de BOT para Discord. Automatize seu servidor com tecnologia de ponta.',
    products: 'Produtos',
    account: 'Conta',
    signIn: 'Entrar',
    createAccount: 'Criar conta',
    dashboard: 'Painel',
    rights: 'Todos os direitos reservados.',
  },
} 

const en = {
  nav: {
    services: 'Services',
    sitesLanding: 'Websites & Landing Pages',
    botsDiscord: 'Discord BOTs',
    features: 'Features',
    plans: 'Plans',
    signIn: 'Sign in',
    getStarted: 'Start now',
  },
  hero: {
    badge: 'Professional solutions for Discord & Web',
    title1: 'Power up your',
    titleDiscord: 'Discord server',
    title2: 'and your',
    titleDigital: 'digital presence',
    subtitle:
      'Professional BOTs and modern websites with world-class infrastructure, full management and specialized support.',
    ctaProducts: 'View products & pricing',
    ctaPanel: 'Access panel',
    stats: {
      clients: 'Active clients',
      uptime: 'Guaranteed uptime',
      support: 'Technical support',
      products: 'Specialized products',
    },
  },
  sites: {
    badge: 'New service',
    title: 'Websites & Landing Pages',
    titleHighlight: 'Landing Pages',
    subtitle: 'Custom quote for your web project.',
    features: {
      design: { title: 'Modern Design', desc: 'Professional and attractive layouts' },
      responsive: { title: 'Responsive', desc: 'Perfect on any device' },
      seo: { title: 'SEO Optimized', desc: 'Better Google ranking' },
      custom: { title: 'Custom', desc: 'Your brand visual identity' },
    },
    portfolio: 'Portfolio',
    portfolioHighlight: 'Clients',
    portfolioSubtitle: 'Real projects delivered by our team',
    visitSite: 'Visit site',
    online: 'Online',
    items: [
      {
        title: 'Institutional Project',
        description: 'Modern institutional website for a business group',
        tags: ['Institutional', 'Landing Page'],
      },
      {
        title: 'Professional Portfolio',
        description: 'Professional developer portfolio',
        tags: ['Portfolio', 'Dev'],
      },
      {
        title: 'Gaming Group',
        description: 'Institutional website for a gaming group',
        tags: ['Institutional', 'Gaming'],
      },
    ],
  },
  features: {
    title: 'Why choose',
    titleHighlight: 'us?',
    subtitle: 'Infrastructure, performance and support — all in one place.',
    items: [
      {
        title: 'High Performance',
        description:
          'Dedicated infrastructure with 99.9% guaranteed uptime for your BOT.',
      },
      {
        title: 'Total Security',
        description:
          'Encrypted data and attack protection, keeping your server safe.',
      },
      {
        title: 'Automatic Updates',
        description:
          'Your BOT always up-to-date with the latest features and bug fixes.',
      },
      {
        title: 'Full Panel',
        description:
          'Manage your applications in real time: status, logs and much more.',
      },
      {
        title: 'Dedicated Hosting',
        description: "Dedicated hosting on Brazil's best BOT infrastructure.",
      },
      {
        title: '24/7 Support',
        description: 'Technical team available to help whenever you need.',
      },
    ],
  },
  infrastructure: {
    badge: 'Dedicated Infrastructure',
    title: 'World-class infrastructure',
    description:
      'All our BOTs run on dedicated servers, ensuring maximum availability, speed and security for your applications.',
    uptime: 'Uptime',
    latency: 'Latency',
    monitoring: 'Monitoring',
  },
  plans: {
    title: 'Plans & Pricing',
    titleHighlight: 'Prices',
    subtitle: 'Choose the ideal plan for your Discord server',
    popular: 'Most popular',
    promotion: 'Sale',
    perMonth: '/month',
    subscribe: 'Subscribe now',
    moreDetails: 'More details',
    loginToBuy: 'Sign in',
    or: 'or',
    createAccount: 'create an account',
    toBuy: 'to purchase',
    botSubtitle: 'Professional Discord BOT',
    store: {
      description:
        'Store BOT with a complete control panel for your Discord server.',
      features: [
        'Integrated control panel',
        'Customizable product catalog',
        'Automatic order system',
        'Real-time notifications',
        'Multi-currency support',
      ],
    },
    cfx: {
      description: 'BOT for FiveM/RedM servers with full CFX integration.',
      features: [
        'CFX/FiveM integration',
        'Whitelist system',
        'Permission management',
        'Detailed activity logs',
        'Real-time synchronization',
      ],
    },
    websites: {
      title: 'Websites & Landing Pages',
      badge: 'On request',
      description: 'Custom quote for your web project.',
      cta: 'Request a quote',
    },
  },
  cta: {
    badge: 'Start today',
    title: 'Ready to elevate your',
    titleHighlight: 'server and digital presence?',
    subtitle: 'Join hundreds of clients who already trust our solutions.',
    start: 'Start now',
    hasAccount: 'I already have an account',
  },
  footer: {
    systemStatus: 'System Status',
    description:
      'Professional BOT solutions for Discord. Automate your server with cutting-edge technology.',
    products: 'Products',
    account: 'Account',
    signIn: 'Sign in',
    createAccount: 'Create account',
    dashboard: 'Dashboard',
    rights: 'All rights reserved.',
  },
}

const es = {
  nav: {
    services: 'Servicios',
    sitesLanding: 'Sitios y Landing Pages',
    botsDiscord: 'BOTs de Discord',
    features: 'Recursos',
    plans: 'Planes',
    signIn: 'Iniciar sesión',
    getStarted: 'Empezar ahora',
  },
  hero: {
    badge: 'Soluciones profesionales para Discord y Web',
    title1: 'Potencia tu',
    titleDiscord: 'servidor de Discord',
    title2: 'y tu',
    titleDigital: 'presencia digital',
    subtitle:
      'BOTs profesionales y sitios modernos con infraestructura de clase mundial, gestión completa y soporte especializado.',
    ctaProducts: 'Ver productos y precios',
    ctaPanel: 'Acceder al panel',
    stats: {
      clients: 'Clientes activos',
      uptime: 'Uptime garantizado',
      support: 'Soporte técnico',
      products: 'Productos especializados',
    },
  },
  sites: {
    badge: 'Nuevo servicio',
    title: 'Sitios y Landing Pages',
    titleHighlight: 'Landing Pages',
    subtitle: 'Presupuesto personalizado para tu proyecto web.',
    features: {
      design: { title: 'Diseño Moderno', desc: 'Diseños profesionales y atractivos' },
      responsive: { title: 'Responsivo', desc: 'Perfecto en cualquier dispositivo' },
      seo: { title: 'SEO Optimizado', desc: 'Mejor posicionamiento en Google' },
      custom: { title: 'Personalizado', desc: 'Identidad visual de tu marca' },
    },
    portfolio: 'Portafolio',
    portfolioHighlight: 'Clientes',
    portfolioSubtitle: 'Proyectos reales entregados por nuestro equipo',
    visitSite: 'Visitar sitio',
    online: 'En línea',
    items: [
      {
        title: 'Proyecto Institucional',
        description: 'Sitio institucional moderno para un grupo empresarial',
        tags: ['Institucional', 'Landing Page'],
      },
      {
        title: 'Portafolio Profesional',
        description: 'Portafolio profesional para desarrollador',
        tags: ['Portafolio', 'Dev'],
      },
      {
        title: 'Grupo Gaming',
        description: 'Sitio institucional para un grupo de gaming',
        tags: ['Institucional', 'Gaming'],
      },
    ],
  },
  features: {
    title: '¿Por qué',
    titleHighlight: 'elegirnos?',
    subtitle: 'Infraestructura, rendimiento y soporte — todo en un solo lugar.',
    items: [
      {
        title: 'Alto Rendimiento',
        description:
          'Infraestructura dedicada con 99,9% de uptime garantizado para tu BOT.',
      },
      {
        title: 'Seguridad Total',
        description:
          'Datos encriptados y protección contra ataques, manteniendo tu servidor seguro.',
      },
      {
        title: 'Actualizaciones Automáticas',
        description:
          'Tu BOT siempre actualizado con las últimas funciones y correcciones.',
      },
      {
        title: 'Panel Completo',
        description:
          'Gestiona tus aplicaciones en tiempo real: estado, logs y mucho más.',
      },
      {
        title: 'Hosting Dedicado',
        description:
          'Hosting dedicado en la mejor infraestructura de BOTs de Brasil.',
      },
      {
        title: 'Soporte 24/7',
        description: 'Equipo técnico disponible para ayudarte cuando lo necesites.',
      },
    ],
  },
  infrastructure: {
    badge: 'Infraestructura Dedicada',
    title: 'Infraestructura de clase mundial',
    description:
      'Todos nuestros BOTs corren en servidores dedicados, garantizando máxima disponibilidad, velocidad y seguridad para tus aplicaciones.',
    uptime: 'Uptime',
    latency: 'Latencia',
    monitoring: 'Monitoreo',
  },
  plans: {
    title: 'Planes y Precios',
    titleHighlight: 'Precios',
    subtitle: 'Elige el plan ideal para tu servidor de Discord',
    popular: 'Más popular',
    promotion: 'Promoción',
    perMonth: '/mes',
    subscribe: 'Suscribirse ahora',
    moreDetails: 'Más detalles',
    loginToBuy: 'Inicia sesión',
    or: 'o',
    createAccount: 'crea una cuenta',
    toBuy: 'para comprar',
    botSubtitle: 'BOT de Discord Profesional',
    store: {
      description:
        'BOT de tienda con panel de control completo para tu servidor de Discord.',
      features: [
        'Panel de control integrado',
        'Catálogo de productos personalizable',
        'Sistema de pedidos automático',
        'Notificaciones en tiempo real',
        'Soporte para múltiples monedas',
      ],
    },
    cfx: {
      description: 'BOT para servidores FiveM/RedM con integración CFX completa.',
      features: [
        'Integración con CFX/FiveM',
        'Sistema de whitelist',
        'Gestión de permisos',
        'Logs de actividad detallados',
        'Sincronización en tiempo real',
      ],
    },
    websites: {
      title: 'Sitios y Landing Pages',
      badge: 'Bajo consulta',
      description: 'Presupuesto personalizado para tu proyecto web.',
      cta: 'Solicitar presupuesto',
    },
  },
  cta: {
    badge: 'Empieza hoy',
    title: '¿Listo para elevar tu',
    titleHighlight: 'servidor y presencia digital?',
    subtitle: 'Únete a cientos de clientes que ya confían en nuestras soluciones.',
    start: 'Empezar ahora',
    hasAccount: 'Ya tengo una cuenta',
  },
  footer: {
    systemStatus: 'Estado del Sistema',
    description:
      'Soluciones profesionales de BOT para Discord. Automatiza tu servidor con tecnología de punta.',
    products: 'Productos',
    account: 'Cuenta',
    signIn: 'Iniciar sesión',
    createAccount: 'Crear cuenta',
    dashboard: 'Panel',
    rights: 'Todos los derechos reservados.',
  },
}

export const translations: Record<Language, typeof pt> = { pt, en, es }
export type TranslationKeys = typeof pt
