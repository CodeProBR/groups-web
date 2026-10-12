import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';
import style from '@/styles/footer';

export default async function Footer({ categories = [] }) {
	const year = new Date().getFullYear();

	return (
		<footer className={style.footer}>
			<div className={'container'}>
				<div className={style.top}>
					<div>
						<span>{process.env.NEXT_PUBLIC_NAME}</span>
						<p>{`Sua plataforma completa para encontrar, acessar e divulgar links de grupos e canais de Telegram organizados por categorias. Conecte-se com pessoas de todo o Brasil e encontre comunidades ativas do seu interesse.`}</p>
					</div>
					<div>
						<span>Categorias</span>
						<ul>
							{categories.slice(0, 5).map((item, i) => (
								<li key={i}>
									<Link href={`/categorias/${item.slug}`}>
										<FiChevronRight />
										<span>{item.name}</span>
									</Link>
								</li>
							))}
						</ul>
						<Link href="/categorias">
							Mais categorias
						</Link>
					</div>
					<div>
						<span>Conteúdo</span>
						<ul>
							<li>
								<Link href={`/grupos`}>
									<FiChevronRight />
									<span>Grupos</span>
								</Link>
							</li>
							<li>
								<Link href={`/categorias`}>
									<FiChevronRight />
									<span>Categorias</span>
								</Link>
							</li>
							<li>
								<Link href={`/blog`}>
									<FiChevronRight />
									<span>Blog</span>
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<span>Institucional</span>
						<ul>
							<li>
								<Link href={`/sobre-nos`}>
									<FiChevronRight />
									<span>Sobre Nós</span>
								</Link>
							</li>
							<li>
								<Link href={`/termos-de-uso`}>
									<FiChevronRight />
									<span>Termos de Uso</span>
								</Link>
							</li>
							<li>
								<Link href={`/termos-para-anunciantes`}>
									<FiChevronRight />
									<span>Termos para Anunciantes</span>
								</Link>
							</li>
							<li>
								<Link href={`/politica-de-conteudo`}>
									<FiChevronRight />
									<span>Política de Conteúdo</span>
								</Link>
							</li>
							<li>
								<Link href={`/politica-de-privacidade`}>
									<FiChevronRight />
									<span>Política de Privacidade</span>
								</Link>
							</li>
							<li>
								<Link href={`/politica-de-cookies`}>
									<FiChevronRight />
									<span>Política de Cookies</span>
								</Link>
							</li>
							<li>
								<Link href={`/denuncias-e-remocao-de-conteudo`}>
									<FiChevronRight />
									<span>Denúncias e Remoção de Conteúdo</span>
								</Link>
							</li>
							<li>
								<Link href={`/contato`}>
									<FiChevronRight />
									<span>Contato</span>
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className={style.bottom}>
					<p>© {year} {process.env.NEXT_PUBLIC_NAME}. Todos os direitos reservados.</p>
				</div>
			</div>
		</footer>
	);
}
