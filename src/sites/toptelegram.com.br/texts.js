const texts = {
    groups: {
        name: "Grupos",
        title: "Grupos do Telegram em Destaque",
        description: "Confira alguns dos grupos e canais do Telegram mais populares e recém-adicionados.",
        titleAside: "Grupos em Destaque",
        button: "ver todos os grupos",
        slug: "grupos",
        action: "Entrar no Grupo",
        moderate: "O conteúdo enviado ao nosso site é revisado manualmente com curadoria por nossos moderadores.",
        rules: {
            title: "Regras do Grupo",
            description: "Antes de acessar o grupo de [PLATFORM] [GROUP], esteja ciente que você precisa estar de acordo com todas as regras do grupo. É importante dizer também que este é um grupo independente, sem nenhuma relação com o nosso site e o único responsável por ele é o administrador do grupo. O [GROUP] faz parte da categoria de [CATEGORY]."
        },
        about: "Sobre os Grupos de [CATEGORY] do [PLATFORM]",
        alert: {
            title: "Aviso importante",
            description: "Atuamos apenas na divulgação de links públicos enviados por terceiros e não gerenciamos nem participamos do [GROUP]. Todo o conteúdo compartilhado é de responsabilidade exclusiva de seus administradores e participantes. Não toleramos atividades ilícitas, golpes ou fraudes; caso identifique irregularidades, utilize o botão de denúncia para que possamos analisar e remover o link."
        },
        similar: {
            title: "Grupos Similares",
            description: "Encontre outros grupos de [CATEGORY] que podem ser do seu interesse"
        },
        verified: "Verificado em",
        group: "Grupo de [PLATFORM]: [GROUP]",
        seo: {
            title: "Grupo de [PLATFORM]: [GROUP] - Categoria [CATEGORY]",
            description: "Grupo de [PLATFORM]: [GROUP] - Categoria [CATEGORY]"
        },
        faq: [
            {
                question: `Como entrar no grupo de [PLATFORM] "[GROUP]"?`,
                answer: `Para entrar no grupo <strong>[GROUP]</strong>, basta clicar no botão de acesso nesta página. Você será redirecionado para o link oficial de convite do [PLATFORM] para confirmar sua entrada pelo próprio aplicativo.`
            },
            {
                question: `O grupo "[GROUP]" é gratuito?`,
                answer: `Sim, o acesso ao link do grupo <strong>[GROUP]</strong> através do <strong>[SITE]</strong> é 100% gratuito.`
            },
            {
                question: `Qual é a categoria do grupo "[GROUP]"?`,
                answer: `O grupo <strong>[GROUP]</strong> faz parte da categoria <strong>[CATEGORY]</strong> em nossa plataforma.`
            },
            {
                question: `Os grupos da categoria [CATEGORY] são verificados?`,
                answer: `Nosso sistema realiza verificações periódicas para manter links de convite ativos e funcionais. Caso identifique um link expirado no grupo <strong>[GROUP]</strong>, você pode nos notificar.`
            },
            {
                question: `O [SITE] é responsável por este grupo?`,
                answer: `Não. O grupo <strong>[GROUP]</strong> é administrado de forma independente por seus criadores. O <strong>[SITE]</strong> funciona exclusivamente como um diretório de divulgação de links públicos.`
            },
        ]
    },
    categories: {
        name: "Categorias",
        title: "Mais Categorias de Grupos de Telegram",
        description: "Confira a nossa lista de categorias de assuntos específicos de Grupos e Canais de Telegram.",
        titleAside: "Categorias em Destaque",
        button: "ver todas as categorias",
        slug: "categorias",
        more: "Mais categorias"
    },
    blog: {
        name: "Blog",
        title: "Dicas e Artigos do Blog",
        description: "Acompanhe nossas dicas, tutoriais e novidades para aproveitar ao máximo seus grupos de Telegram e manter suas comunidades engajadas.",
        button: "ver todos os posts",
        slug: "blog",
        action: "Ler Post",
        read: "min de leitura",
        update: "Atualizado em"
    },
    guides: {
        name: "Guias",
        title: "Guias de Grupos do Telegram",
        description: "Confira a nossa lista de guias de Grupos do Telegram para encontrar os melhores grupos e canais para você.",
        button: "ver todos os guias",
        slug: "guias",
        action: "Ver Grupos",
    },
    products: {
        name: "Produtos",
        title: "Produtos em Alta",
        description: "Confira a nossa lista de produtos em alta para encontrar os melhores produtos para você.",
        action: "Ir para o Produto",
    },
    faq: {
        title: "Perguntas Frequentes",
        description: "Tire suas dúvidas sobre o funcionamento da nossa plataforma de grupos de Telegram."
    },
    pagination: {
        title: "Navegação de páginas",
        prev: "Anterior",
        next: "Próxima"
    },
    share: {
        title: "Compartilhar",
        copy: "Copiar link",
        copied: "Link copiado!"
    },
    home: "Início",
    search: {
        name: "Busca",
        title: "Resultados da busca por",
        description: "Navegue pelos grupos encontrados para a busca",
        placeholder: "Buscar grupos"
    },
    content: "Conteúdo",
    institutional: "Institucional",
    copyright: "Todos os direitos reservados.",
    open: "Abrir menu",
    close: "Fechar menu",
    notFound: {
        title: "404 - Página não encontrada",
        description: "Desculpe! A página que você está procurando não existe ou foi movida.",
        link: "Voltar ao Início"
    },
    report: 'Reportar um erro / Denunciar',
    why: {
        title: "Por que usar o TopTelegram?",
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
    disclaimer: "Atuamos apenas na divulgação de links públicos enviados por terceiros e não gerenciamos nem participamos de Grupos ou Canais. Todo o conteúdo compartilhado é de responsabilidade exclusiva de seus administradores e participantes. Não toleramos atividades ilícitas, golpes ou fraudes; caso identifique irregularidades, utilize o botão de denúncia para que possamos analisar e remover o link.",
    updated: "Atualizado em",
    actives: "Grupos Ativos"
};

export default texts;