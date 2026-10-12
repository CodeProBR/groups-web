import Layout from '@/layout';
import Faq from '@/components/Faq';
import Breadcrumbs from '@/components/Breadcrumbs';
import Groups from '@/components/Groups';
import Posts from '@/components/Posts';
import Categories from '@/components/Categories';
import WebSite from '@/components/Snippet/WebSite';
import { getGroups, getCategories, getPosts } from "@/utils/database";
import { cache } from 'react';
import styleSection from '@/styles/section';
import Link from 'next/link';

export async function generateMetadata() {
	const data = await dataCache();
	return {
		title: data.seo.title,
		description: data.seo.description,
		image: data.seo.image,
	};
}

export default async function Page() {
	const data = await dataCache();

	return (
		<Layout>

			<Breadcrumbs
				items={data.breadcrumb}
				title={`Grupos de Telegram no Brasil`}
				description={`Encontre e entre em grupos e canais de Telegram organizados por categorias. Links de convite verificados e atualizados diariamente.`}
			/>

			<div className={styleSection.w100}>

				{/* GROUPS */}
				<div className={styleSection.block}>
					<div className={styleSection.title}>
						<h1><strong>{`Grupos e Canais de Telegram no Brasil`}</strong></h1>
						<p>{`Descubra links de grupos e canais de Telegram no Brasil, filtrados por categoria e atualizados para facilitar sua entrada em comunidades de namoro, estudo, trabalho, cripto e games.`}</p>
					</div>
					<Groups items={data.groups.items} />
					<Link className={styleSection.link} href={'/grupos'}>{'ver todos os grupos'}</Link>
				</div>

				<hr className={styleSection.break} />

				{/* CATEGORIES */}
				<div className={styleSection.block}>
					<div className={styleSection.title}>
						<h2><strong>{`Mais Categorias de Grupos de Telegram`}</strong></h2>
						<p>{`Confira a nossa lista de categorias de assuntos específicos de Grupos e Canais de Telegram.`}</p>
					</div>
					<Categories items={data.categories} />
					<Link className={styleSection.link} href={'/categorias'}>{'ver todas as categorias'}</Link>
				</div>

				<hr className={styleSection.break} />

				{/* POSTS */}
				<div className={styleSection.block}>
					<div className={styleSection.title}>
						<h2><strong>{`Posts Recentes`}</strong></h2>
						<p>{`Veja as postagens do nosso blog que vão te ajudar com dicas e tutoriais de como deixar cada vez melhor os seus Grupos de Telegram.`}</p>
					</div>
					<Posts
						items={data.posts.items}
					/>
					<Link className={styleSection.link} href={'/blog'}>{'ver todos os posts'}</Link>
				</div>

				<hr className={styleSection.break} />

				{/* FAQ */}
				<div className={styleSection.block}>
					<div className={styleSection.title}>
						<h2><strong>{`Perguntas Frequentes`}</strong></h2>
						<p>{`Confira as respostas para as perguntas mais comuns sobre o ${process.env.NEXT_PUBLIC_NAME} e aprenda como usar a plataforma da melhor forma para encontrar grupos de Telegram.`}</p>
					</div>
					<Faq items={data.faq} />
				</div>

			</div>

			<WebSite description={`Encontre e entre em grupos de Telegram no Brasil. Links de convite verificados e organizados por categorias.`} />
		</Layout>
	);
}

export const dataCache = cache(async () => {
	const [
		groups,
		categories,
		posts,
	] = await Promise.all([
		getGroups({ adult: false, limit: 12 }),
		getCategories({ limit: 8 }),
		getPosts({ limit: 4 }),
	]);
	const seo = {
		title: `Grupos de Telegram do Brasil – Links Atualizados | ${process.env.NEXT_PUBLIC_NAME}`,
		description: `Encontre grupos e canais de Telegram atualizados diariamente. Descubra grupos de amizade, promoções, empregos, jogos, tecnologia e muito mais.`,
		image: null,
	};
	const faq = [
		{
			question: `O que é o ${process.env.NEXT_PUBLIC_NAME}?`,
			answer: `O <strong>${process.env.NEXT_PUBLIC_NAME}</strong> é a maior plataforma especializada em reunir, organizar e divulgar grupos e canais de Telegram. Funcionamos como um diretório completo onde qualquer pessoa pode encontrar desde uma nova <strong>comunidade Telegram</strong> sobre os mais diversos assuntos — desde amizade, namoro e entretenimento até empregos, estudos, tecnologia, esportes e finanças. Nosso objetivo é facilitar a conexão entre pessoas que compartilham interesses em comum, oferecendo uma experiência de busca rápida, segura e totalmente gratuita.`
		},
		{
			question: `O ${process.env.NEXT_PUBLIC_NAME} é gratuito?`,
			answer: `Sim, o <strong>${process.env.NEXT_PUBLIC_NAME}</strong> é 100% gratuito para todos os usuários. Você pode navegar pelas categorias, pesquisar grupos, acessar links e entrar em qualquer comunidade sem precisar pagar nada. Não cobramos taxas de acesso, assinatura ou qualquer tipo de pagamento para utilizar a plataforma.`
		},
		{
			question: `Como funciona o ${process.env.NEXT_PUBLIC_NAME}?`,
			answer: `Se você tem dúvidas sobre <strong>como entrar em grupos</strong>, o funcionamento é simples e intuitivo. Primeiro, você acessa o site e escolhe uma categoria de interesse, como "Amizade", "Empregos", "Tecnologia" ou "Estudos". Em seguida, navega pelos grupos disponíveis naquela categoria, podendo ver informações como nome, descrição e número de visualizações. Ao encontrar um grupo que lhe interesse, basta clicar no botão de acesso para ser redirecionado diretamente ao <strong>link do Telegram</strong> e entrar na comunidade.`
		},
		{
			question: `Os grupos listados no ${process.env.NEXT_PUBLIC_NAME} são oficiais?`,
			answer: `Não, os grupos listados no ${process.env.NEXT_PUBLIC_NAME} <strong>não são oficiais</strong> de nenhuma empresa, marca ou instituição. Todos os grupos são criados e administrados por usuários independentes que optaram por divulgá-los em nossa plataforma. O ${process.env.NEXT_PUBLIC_NAME} atua exclusivamente como um diretório de indexação e não possui qualquer vínculo, parceria ou afiliação com o Telegram FZ-LLC ou com os administradores dos grupos cadastrados.`
		},
		{
			question: `Como posso adicionar meu grupo no ${process.env.NEXT_PUBLIC_NAME}?`,
			answer: `Para adicionar seu grupo, basta clicar em "Enviar Grupo", preencher o nome do grupo, uma descrição detalhada, selecionar a categoria adequada e colar o link de convite oficial do grupo. Após o envio, nosso sistema analisa as informações e, se estiver tudo correto, o grupo será publicado e ficará visível para milhares de usuários.`
		},
		{
			question: `O ${process.env.NEXT_PUBLIC_NAME} é seguro?`,
			answer: `O ${process.env.NEXT_PUBLIC_NAME} adota diversas medidas de segurança para proteger seus usuários. Todos os grupos passam por um processo de moderação antes de serem publicados, e links suspeitos, conteúdos ilegais ou que violem nossas diretrizes são removidos. Além disso, oferecemos um sistema de denúncia para que os próprios usuários possam reportar grupos impróprios. No entanto, recomendamos sempre que os usuários mantenham cautela ao entrar em qualquer grupo online e não compartilhem informações pessoais sensíveis.`
		},
		{
			question: `Posso denunciar um grupo no ${process.env.NEXT_PUBLIC_NAME}?`,
			answer: `Sim, absolutamente. O ${process.env.NEXT_PUBLIC_NAME} possui um sistema de denúncia. Se você encontrar um grupo que contenha conteúdo impróprio, ilegal, spam ou que viole nossas políticas de uso, basta denunciar através da nossa página de contato. Nossa equipe de moderação analisará a denúncia e tomará as medidas cabíveis, que podem incluir a remoção do grupo da plataforma.`
		},
		{
			question: `Com que frequência os grupos são atualizados?`,
			answer: `A base de dados do ${process.env.NEXT_PUBLIC_NAME} é atualizada constantemente. Novos grupos são adicionados diariamente por usuários de todo o Brasil, e nossa equipe realiza verificações periódicas para remover links expirados, grupos inativos ou conteúdos que violem nossas diretrizes.`
		},
		{
			question: `Preciso criar uma conta para entrar nos grupos?`,
			answer: `Não, você <strong>não precisa criar uma conta</strong> para navegar pelo site ou entrar nos grupos listados. Qualquer pessoa pode acessar o ${process.env.NEXT_PUBLIC_NAME}, explorar as categorias e clicar nos links dos grupos de forma totalmente anônima e gratuita.`
		},
		{
			question: `O ${process.env.NEXT_PUBLIC_NAME} tem aplicativo?`,
			answer: `Atualmente, o ${process.env.NEXT_PUBLIC_NAME} funciona como uma plataforma web responsiva, otimizada para funcionar perfeitamente em qualquer dispositivo — computadores, tablets e smartphones. O site se adapta automaticamente ao tamanho da tela, proporcionando uma experiência fluida e rápida sem a necessidade de baixar nenhum aplicativo.`
		}
	];
	const breadcrumb = [
		{ name: 'Início', url: '/' },
	];
	return { seo, faq, breadcrumb, groups, categories, posts };
});