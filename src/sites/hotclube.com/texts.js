const texts = {
    groups: {
        name: "Grupos",
        title: "Grupos e Canais Adultos em Destaque",
        description: "Explore os grupos e canais adultos mais quentes, ativos e exclusivos do Telegram e WhatsApp. Links 100% atualizados diariamente.",
        titleAside: "Grupos em Alta 🔥",
        button: "ver todos os grupos",
        slug: "grupos",
        action: "Acessar Grupo VIP",
        moderate: "Todo o conteúdo divulgado passa por curadoria rigorosa da nossa moderação para garantir links ativos e seguros.",
        rules: {
            title: "Regras e Recomendações",
            description: "Antes de entrar no grupo de [PLATFORM] [GROUP], certifique-se de ser maior de 18 anos e estar de acordo com as regras internas da comunidade. Este é um grupo independente gerenciado por terceiros, pertencente à categoria [CATEGORY]."
        },
        about: "Sobre os Grupos Adultos de [CATEGORY] no [PLATFORM]",
        alert: {
            title: "Aviso Legal - Conteúdo para Maiores (+18)",
            description: "Atuamos exclusivamente na catalogação de links públicos enviados por terceiros. Não produzimos, armazenamos nem gerenciamos os conteúdos compartilhados nos grupos. Exigimos estrita conformidade com a legislação: não toleramos qualquer conteúdo ilegal, abusivo ou fraudulento. Caso encontre irregularidades, utilize o botão de denúncia imediatamente."
        },
        similar: {
            title: "Grupos Picantes Relacionados",
            description: "Confira outras comunidades quentes da categoria [CATEGORY] que você vai gostar"
        },
        verified: "Verificado em",
        group: "Grupo Adulto de [PLATFORM]: [GROUP]",
        seo: {
            title: "Grupo Adulto de [PLATFORM]: [GROUP] - [CATEGORY] +18",
            description: "Acesse o grupo adulto de [PLATFORM] [GROUP] na categoria [CATEGORY]. Links verificados, comunidade ativa e conteúdo exclusivo."
        },
        faq: [
            {
                question: `Como entrar no grupo de [PLATFORM] "[GROUP]"?`,
                answer: `Basta clicar no botão <strong>Acessar Grupo VIP</strong> nesta página. Você será redirecionado para o link oficial de convite do [PLATFORM] para confirmar sua entrada diretamente pelo aplicativo.`
            },
            {
                question: `O acesso ao grupo "[GROUP]" é gratuito?`,
                answer: `Sim! O acesso aos links disponibilizados no <strong>[SITE]</strong> é totalmente gratuito e livre de taxas de intermediação.`
            },
            {
                question: `Qual é a categoria do grupo "[GROUP]"?`,
                answer: `O grupo <strong>[GROUP]</strong> está catalogado na categoria <strong>[CATEGORY]</strong> da nossa plataforma adulta.`
            },
            {
                question: `Os links de [CATEGORY] são verificados com frequência?`,
                answer: `Sim, mantemos rotinas diárias para testar e validar os links de convite, garantindo que você encontre grupos de <strong>[GROUP]</strong> funcionando sem links quebrados.`
            },
            {
                question: `O [SITE] é responsável pelo que é postado no grupo?`,
                answer: `Não. O <strong>[SITE]</strong> opera apenas como agregador de links públicos. A administração e os conteúdos postados no grupo <strong>[GROUP]</strong> são de responsabilidade única e exclusiva de seus administradores.`
            },
        ]
    },
    categories: {
        name: "Categorias",
        title: "Categorias Adultas e Exclusivas",
        description: "Encontre exatamente o que você procura navegando pelas categorias adultas mais populares e procuradas.",
        titleAside: "Categorias Picantes",
        button: "ver todas as categorias",
        slug: "categorias",
        more: "Mais categorias"
    },
    blog: {
        name: "Blog",
        title: "Dicas, Tendências e Artigos",
        description: "Fique por dentro das melhores dicas de segurança, novidades sobre comunidades adultas e guias para aproveitar o Telegram e WhatsApp.",
        button: "ver todos os posts",
        slug: "blog",
        action: "Ler Artigo",
        read: "min de leitura",
        update: "Atualizado em"
    },
    guides: {
        name: "Guias",
        title: "Guias e Seleções Especiais",
        description: "Nossos guias detalhados reúnem as melhores seleções de canais e grupos adultos organizados a dedo.",
        button: "ver todos os guias",
        slug: "guias",
        action: "Ver Grupos",
    },
    products: {
        name: "Produtos",
        title: "Destaques e Ofertas",
        description: "Confira produtos selecionados e recomendados para o seu entretenimento e bem-estar.",
        action: "Conferir Oferta",
    },
    faq: {
        title: "Dúvidas Frequentes",
        description: "Respostas para as principais perguntas sobre como encontrar, acessar e participar de grupos adultos com discrição e segurança."
    },
    pagination: {
        title: "Navegação de páginas",
        prev: "Anterior",
        next: "Próxima"
    },
    share: {
        title: "Compartilhar",
        copy: "Copiar link",
        copied: "Copiado com sucesso!"
    },
    home: "Início",
    search: {
        name: "Busca",
        title: "Resultados da busca por",
        description: "Navegue pelos grupos adultos encontrados para a sua busca",
        placeholder: "Buscar grupos adultos..."
    },
    content: "Conteúdo",
    institutional: "Institucional",
    copyright: "Todos os direitos reservados. Proibido para menores de 18 anos.",
    open: "Abrir menu",
    close: "Fechar menu",
    notFound: {
        title: "404 - Página não encontrada",
        description: "O link ou conteúdo que você tentou acessar não está disponível ou foi removido.",
        link: "Voltar ao Início"
    },
    report: 'Denunciar Conteúdo Irregular',
    why: {
        title: "Por que escolher o HotClube?",
        description: "A melhor e mais segura plataforma para descobrir grupos e canais adultos selecionados, discretos e 100% atualizados.",
        items: [
            {
                icon: 'PiFlame',
                name: "Conteúdo Exclusivo",
                description: "Seleção curada das melhores comunidades adultas e canais VIP de entretenimento."
            },
            {
                icon: 'PiShieldCheck',
                name: "Discrição e Segurança",
                description: "Acesso rápido e direto sem cadastros burocráticos, com foco total na sua privacidade."
            },
            {
                icon: 'PiCalendarCheck',
                name: "Links Atualizados",
                description: "Verificação contínua dos links para garantir que você sempre encontre grupos ativos."
            },
            {
                icon: 'PiTag',
                name: "Categorias Quentes",
                description: "Tudo catalogado por nichos e temas específicos para você achar o que deseja em segundos."
            },
            {
                icon: 'PiMagnifyingGlass',
                name: "Busca Rápida",
                description: "Filtros e ferramentas de pesquisa para localizar grupos por palavras-chave com facilidade."
            },
            {
                icon: 'PiSealCheck',
                name: "Acesso 100% Gratuito",
                description: "Navegue, descubra e acerte seu destino sem pagar nada para consultar nosso diretório."
            },
        ]
    },
    disclaimer: "O HotClube é um catálogo informativo estritamente destinado a maiores de 18 anos. Atuamos apenas na divulgação de links públicos enviados por terceiros e não armazenamos, moderamos ou nos responsabilizamos pelas mensagens compartilhadas dentro dos grupos ou canais. Repudiamos qualquer conteúdo ilícito ou não consensual; caso identifique abusos, denuncie para remoção imediata do link.",
    updated: "Atualizado em",
    actives: "Grupos Ativos"
};

export default texts;