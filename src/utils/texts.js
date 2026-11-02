const texts = {
    pt: {
        home: "Início",
        enter: "Entrar no Grupo",
        rules: {
            title: "Regras do Grupo",
            description: "Antes de acessar o grupo de [PLATFORM] [NAME], esteja ciente que você precisa estar de acordo com todas as regras do grupo. É importante dizer também que este é um grupo independente, sem nenhuma relação com o nosso site e o único responsável por ele é o administrador do grupo. O [GROUP] faz parte da categoria de [CATEGORY]."
        },
        verified: "Verificado",
        verifiedAt: "Verificado em",
        updatedAt: "Atualizado em",
        copy: "Copiar link",
        copied: "Link copiado!",
        report: 'Reportar um erro / Denunciar',
        alert: {
            title: "Aviso importante",
            description: "Atuamos apenas na divulgação de links públicos enviados por terceiros e não gerenciamos nem participamos do [NAME]. Todo o conteúdo compartilhado é de responsabilidade exclusiva de seus administradores e participantes. Não toleramos atividades ilícitas, golpes ou fraudes; caso identifique irregularidades, utilize o botão de denúncia para que possamos analisar e remover o link."
        },
        moderate: "O conteúdo enviado ao nosso site é revisado manualmente com curadoria por nossos moderadores.",
        categories: {
            name: "Categorias",
            title: "Mais Categorias de Grupos de [PLATFORM]",
            description: "Confira a nossa lista de categorias de assuntos específicos de Grupos e Canais de [PLATFORM].",
            button: "ver todas as categorias",
            slug: "categorias",
            highlight: "Categorias em Destaque",
        },
        blog: {
            name: "Blog",
            title: "Dicas e Artigos do Blog",
            description: "Acompanhe nossas dicas, tutoriais e novidades para aproveitar ao máximo seus grupos de [PLATFORM] e manter suas comunidades engajadas.",
            button: "ver todos os posts",
            slug: "blog",
            action: "Ler Post",
        },
        guides: {
            name: "Guias",
            title: "Guias de Grupos do [PLATFORM]",
            description: "Confira a nossa lista de guias de Grupos do [PLATFORM] para encontrar os melhores grupos e canais para você.",
            button: "ver todos os guias",
            slug: "guias",
            action: "Ver Grupos",
        },
        products: {
            title: "Produtos em Alta",
            description: "Confira a nossa lista de produtos em alta para encontrar os melhores produtos para você.",
            action: "Ir para o Produto",
        },
        similar: {
            title: "Grupos Similares",
            description: "Encontre outros grupos de [CATEGORY] que podem ser do seu interesse"
        },
        groups: {
            name: "Grupos",
            title: "Grupos do [PLATFORM] em Destaque",
            description: "Confira alguns dos grupos e canais do [PLATFORM] mais populares e recém-adicionados.",
            button: "ver todos os grupos",
            slug: "grupos",
            action: "Entrar no Grupo",
            item: "Grupo de [PLATFORM]: [NAME]",
            highlight: "Grupos em Destaque",
        },
        faq: {
            title: "Perguntas Frequentes",
            description: "Confira as respostas para as perguntas mais frequentes.",
        },
        search: {
            name: "Busca",
            title: "Resultados da busca por",
            description: "Navegue pelos grupos encontrados para a busca",
            placeholder: "Buscar grupos"
        },
        pagination: {
            title: "Navegação de páginas",
            prev: "Anterior",
            next: "Próxima"
        },
        share: "Compartilhar",
        content: "Conteúdo",
        institutional: "Institucional",
        copyright: "Todos os direitos reservados.",
        open: "Abrir menu",
        close: "Fechar menu",
        members: "membros",
        description: "Descrição do Grupo",
        about: "Sobre o grupo",
        find: "O que você vai encontrar",
        worth: "Vale a pena entrar",
        actives: "Grupos Ativos",
        read: "min de leitura",
        disclaimer: "Atuamos apenas na divulgação de links públicos enviados por terceiros e não gerenciamos nem participamos de Grupos ou Canais. Todo o conteúdo compartilhado é de responsabilidade exclusiva de seus administradores e participantes. Não toleramos atividades ilícitas, golpes ou fraudes; caso identifique irregularidades, utilize o botão de denúncia para que possamos analisar e remover o link.",
        why: {
            title: "Por que usar o [SITE]?",
            description: "Diferenciais que fazem da nossa plataforma o lugar mais seguro, prático e atualizado para encontrar os melhores grupos e canais.",
            items: [
                {
                    icon: 'PiUsersThree',
                    name: "Grupos Verificados",
                    description: "Nossa plataforma conta com uma comunidade ativa de usuários que compartilham e interagem em nossos grupos."
                },
                {
                    icon: 'PiCalendarCheck',
                    name: "Atualizações Diárias",
                    description: "Todos os dias verificamos os links dos grupos para garantir que estejam funcionando."
                },
                {
                    icon: 'PiTag',
                    name: "Organizado por Categorias",
                    description: "Navegue por categorias selecionadas e encontre os grupos ideais para seus interesses."
                },
                {
                    icon: 'PiUserList',
                    name: "Comunidade Ativa",
                    description: "Junte-se a milhares de usuários que compartilham interesses e experiências em nossos grupos."
                },
                {
                    icon: 'PiMagnifyingGlass',
                    name: "Busca Inteligente",
                    description: "Encontre exatamente o que procura com nossa ferramenta de busca."
                },
                {
                    icon: 'PiCurrencyCircleDollar',
                    name: "100% Gratuito",
                    description: "Acesse todos os grupos e funcionalidades sem nenhum custo. A entrada nos grupos é feita diretamente pelo aplicativo."
                },
            ]
        },
        notFound: {
            title: "404 - Página não encontrada",
            description: "Desculpe! A página que você está procurando não existe ou foi movida.",
            link: "Voltar ao Início"
        },
        and: " e "
    },
    en: {
        home: "Home",
        enter: "Join Group",
        rules: {
            title: "Group Rules",
            description: "Before accessing the [PLATFORM] group [NAME], please be aware that you must agree with all group rules. It is also important to note that this is an independent group with no affiliation to our website, and the sole responsible party is the group administrator. [GROUP] belongs to the [CATEGORY] category."
        },
        verified: "Verified",
        verifiedAt: "Verified on",
        updatedAt: "Updated on",
        copy: "Copy link",
        copied: "Link copied!",
        report: "Report an error / Report abuse",
        alert: {
            title: "Important Notice",
            description: "We only publish public links submitted by third parties and do not manage or participate in [NAME]. All shared content is the sole responsibility of its administrators and participants. We do not tolerate illegal activities, scams, or fraud; if you identify any violations, please use the report button so we can review and remove the link."
        },
        moderate: "Content submitted to our website is manually reviewed and curated by our moderation team.",
        categories: {
            name: "Categories",
            title: "More [PLATFORM] Group Categories",
            description: "Check out our list of specific topic categories for [PLATFORM] Groups and Channels.",
            button: "view all categories",
            slug: "categories",
            highlight: "Featured Categories",
        },
        blog: {
            name: "Blog",
            title: "Blog Tips and Articles",
            description: "Follow our tips, tutorials, and news to make the most of your [PLATFORM] groups and keep your communities engaged.",
            button: "view all posts",
            slug: "blog",
            action: "Read Post",
        },
        guides: {
            name: "Guides",
            title: "[PLATFORM] Group Guides",
            description: "Check out our list of [PLATFORM] Group guides to find the best groups and channels for you.",
            button: "view all guides",
            slug: "guides",
            action: "View Groups",
        },
        products: {
            title: "Trending Products",
            description: "Check out our list of trending products to find the best picks for you.",
            action: "Go to Product",
        },
        similar: {
            title: "Similar Groups",
            description: "Find other [CATEGORY] groups that might interest you"
        },
        groups: {
            name: "Groups",
            title: "Featured [PLATFORM] Groups",
            description: "Check out some of the most popular and recently added [PLATFORM] groups and channels.",
            button: "view all groups",
            slug: "groups",
            action: "Join Group",
            item: "[PLATFORM] Group: [NAME]",
            highlight: "Featured Groups",
        },
        faq: {
            title: "Frequently Asked Questions",
            description: "Find answers to the most frequently asked questions.",
        },
        search: {
            name: "Search",
            title: "Search results for",
            description: "Browse the groups found for your search",
            placeholder: "Search groups"
        },
        pagination: {
            title: "Page navigation",
            prev: "Previous",
            next: "Next"
        },
        share: "Share",
        content: "Content",
        institutional: "Institutional",
        copyright: "All rights reserved.",
        open: "Open menu",
        close: "Close menu",
        members: "members",
        description: "Group Description",
        about: "About the group",
        find: "What you will find",
        worth: "Is it worth joining",
        actives: "Active Groups",
        read: "min read",
        disclaimer: "We only publish public links submitted by third parties and do not manage or participate in Groups or Channels. All shared content is the sole responsibility of its administrators and participants. We do not tolerate illegal activities, scams, or fraud; if you identify any violations, please use the report button so we can review and remove the link.",
        why: {
            title: "Why use [SITE]?",
            description: "Key features that make our platform the safest, most convenient, and up-to-date place to discover top groups and channels.",
            items: [
                {
                    icon: 'PiUsersThree',
                    name: "Verified Groups",
                    description: "Our platform features an active community of users who share and interact in our groups."
                },
                {
                    icon: 'PiCalendarCheck',
                    name: "Daily Updates",
                    description: "Every day we verify group links to ensure they are active and working."
                },
                {
                    icon: 'PiTag',
                    name: "Organized by Category",
                    description: "Browse curated categories and discover the ideal groups for your interests."
                },
                {
                    icon: 'PiUserList',
                    name: "Active Community",
                    description: "Join thousands of users who share common interests and experiences across our groups."
                },
                {
                    icon: 'PiMagnifyingGlass',
                    name: "Smart Search",
                    description: "Find exactly what you are looking for with our fast search tool."
                },
                {
                    icon: 'PiCurrencyCircleDollar',
                    name: "100% Free",
                    description: "Access all groups and features at no cost. Joining groups is done directly via the app."
                },
            ]
        },
        notFound: {
            title: "404 - Page not found",
            description: "Sorry! The page you are looking for does not exist or has been moved.",
            link: "Back to Home"
        },
        and: " and "
    },
    es: {
        home: "Inicio",
        enter: "Entrar al Grupo",
        rules: {
            title: "Reglas del Grupo",
            description: "Antes de acceder al grupo de [PLATFORM] [NAME], ten en cuenta que debes aceptar todas las reglas del grupo. Es importante destacar también que este es un grupo independiente, sin ninguna relación con nuestro sitio, y el único responsable es el administrador del grupo. [GROUP] forma parte de la categoría [CATEGORY]."
        },
        verified: "Verificado",
        verifiedAt: "Verificado el",
        updatedAt: "Actualizado el",
        copy: "Copiar enlace",
        copied: "¡Enlace copiado!",
        report: "Reportar un error / Denunciar",
        alert: {
            title: "Aviso importante",
            description: "Solo actuamos en la difusión de enlaces públicos enviados por terceros y no administramos ni participamos en [NAME]. Todo el contenido compartido es responsabilidad exclusiva de sus administradores y participantes. No toleramos actividades ilícitas, estafas ni fraudes; si identificas alguna irregularidad, utiliza el botón de denuncia para que podamos analizar y remover el enlace."
        },
        moderate: "El contenido enviado a nuestro sitio es revisado manualmente con moderación por nuestro equipo.",
        categories: {
            name: "Categorías",
            title: "Más Categorías de Grupos de [PLATFORM]",
            description: "Consulta nuestra lista de categorías temáticas de Grupos y Canales de [PLATFORM].",
            button: "ver todas las categorías",
            slug: "categorias",
            highlight: "Categorías Destacadas",
        },
        blog: {
            name: "Blog",
            title: "Consejos y Artículos del Blog",
            description: "Sigue nuestros consejos, tutoriales y novedades para aprovechar al máximo tus grupos de [PLATFORM] y mantener tus comunidades activas.",
            button: "ver todas las publicaciones",
            slug: "blog",
            action: "Leer Artículo",
        },
        guides: {
            name: "Guías",
            title: "Guías de Grupos de [PLATFORM]",
            description: "Consulta nuestra lista de guías de Grupos de [PLATFORM] para encontrar los mejores grupos y canales para ti.",
            button: "ver todas las guías",
            slug: "guias",
            action: "Ver Grupos",
        },
        products: {
            title: "Productos Populares",
            description: "Consulta nuestra lista de productos populares para encontrar las mejores opciones para ti.",
            action: "Ir al Producto",
        },
        similar: {
            title: "Grupos Similares",
            description: "Encuentra otros grupos de [CATEGORY] que puedan interesarte"
        },
        groups: {
            name: "Grupos",
            title: "Grupos de [PLATFORM] Destacados",
            description: "Descubre algunos de los grupos y canales de [PLATFORM] más populares y recién añadidos.",
            button: "ver todos los grupos",
            slug: "grupos",
            action: "Entrar al Grupo",
            item: "Grupo de [PLATFORM]: [NAME]",
            highlight: "Grupos Destacados",
        },
        faq: {
            title: "Preguntas Frecuentes",
            description: "Encuentra respuestas a las preguntas más frecuentes.",
        },
        search: {
            name: "Búsqueda",
            title: "Resultados de búsqueda para",
            description: "Explora los grupos encontrados para la búsqueda",
            placeholder: "Buscar grupos"
        },
        pagination: {
            title: "Navegación de páginas",
            prev: "Anterior",
            next: "Siguiente"
        },
        share: "Compartir",
        content: "Contenido",
        institutional: "Institucional",
        copyright: "Todos los derechos reservados.",
        open: "Abrir menú",
        close: "Cerrar menú",
        members: "miembros",
        description: "Descripción del Grupo",
        about: "Sobre el grupo",
        find: "Qué vas a encontrar",
        worth: "Vale la pena unirse",
        actives: "Grupos Activos",
        read: "min de lectura",
        disclaimer: "Solo actuamos en la difusión de enlaces públicos enviados por terceros y no administramos ni participamos en Grupos o Canales. Todo el contenido compartido es responsabilidad exclusiva de sus administradores y participantes. No toleramos actividades ilícitas, estafas ni fraudes; si identificas alguna irregularidad, utiliza el botón de denuncia para que podamos analizar y remover el enlace.",
        why: {
            title: "¿Por qué usar [SITE]?",
            description: "Diferenciales que hacen de nuestra plataforma el lugar más seguro, práctico y actualizado para encontrar los mejores grupos y canales.",
            items: [
                {
                    icon: 'PiUsersThree',
                    name: "Grupos Verificados",
                    description: "Nuestra plataforma cuenta con una comunidad activa de usuarios que comparten e interactúan en nuestros grupos."
                },
                {
                    icon: 'PiCalendarCheck',
                    name: "Actualizaciones Diarias",
                    description: "Revisamos los enlaces de los grupos todos los días para asegurar que sigan funcionando."
                },
                {
                    icon: 'PiTag',
                    name: "Organizado por Categorías",
                    description: "Navega por categorías seleccionadas y encuentra los grupos ideales para tus intereses."
                },
                {
                    icon: 'PiUserList',
                    name: "Comunidad Activa",
                    description: "Únete a miles de usuarios que comparten intereses y experiencias en nuestros grupos."
                },
                {
                    icon: 'PiMagnifyingGlass',
                    name: "Búsqueda Inteligente",
                    description: "Encuentra exactamente lo que buscas con nuestra herramienta de búsqueda."
                },
                {
                    icon: 'PiCurrencyCircleDollar',
                    name: "100% Gratuito",
                    description: "Accede a todos los grupos y funciones sin ningún costo. La entrada a los grupos se realiza directamente desde la aplicación."
                },
            ]
        },
        notFound: {
            title: "404 - Página no encontrada",
            description: "¡Lo sentimos! La página que estás buscando no existe o fue movida.",
            link: "Volver al Inicio"
        },
        and: " y "
    }
};

export default texts;