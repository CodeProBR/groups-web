import Link from 'next/link';
import Layout from '@/layout';

export default function NotFound() {
	return (
		<Layout>

			<div className={'notFound'}>
				<h1>404</h1>
				<p>Página ou ferramenta não encontrada.</p>
				<Link href="/">Voltar ao Início</Link>
			</div>

		</Layout>
	);
}
