'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FiMenu, FiX, FiChevronRight, FiSearch } from 'react-icons/fi';
import style from '@/styles/header';

function SearchInput() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const qParam = searchParams.get('q') || '';
	const [searchQuery, setSearchQuery] = useState(qParam);

	useEffect(() => {
		setSearchQuery(qParam);
	}, [qParam]);

	const handleSearch = (e) => {
		if (e) e.preventDefault();
		const trimmed = searchQuery.trim();
		if (!trimmed) return;
		router.push(`/grupos?q=${encodeURIComponent(trimmed)}`);
	};

	return (
		<form onSubmit={handleSearch} className={style.searchForm}>
			<input
				type="text"
				placeholder="Buscar grupos..."
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				className={style.searchInput}
			/>
			<button type="submit" className={style.searchBtn} aria-label="Buscar grupos">
				<FiSearch />
			</button>
		</form>
	);
}

export default function Header({ categories = [] }) {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	const toggleMenu = () => setIsOpen((prev) => !prev);
	const closeMenu = () => setIsOpen(false);

	// Close menu automatically when user navigates
	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	// Prevent scrolling on main body when sidebar is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	// Close menu when pressing Escape key
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') {
				closeMenu();
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);

	return (
		<header className={style.header}>

			<div className="container">
				<Link href="/" onClick={closeMenu}>
					<div>
					</div>
					<span>
						Top<span>Telegram</span>
					</span>
				</Link>

				<Suspense fallback={null}>
					<SearchInput />
				</Suspense>

				<nav>
					<Link href="/grupos">
						<span>Grupos</span>
					</Link>
					<Link href="/categorias">
						<span>Categorias</span>
					</Link>
					<Link href="/blog">
						<span>Blog</span>
					</Link>

				</nav>

				<button
					type="button"
					className={style.menuToggleBtn}
					onClick={toggleMenu}
					aria-label={isOpen ? 'Fechar menu' : 'Abrir menu de ferramentas'}
					aria-expanded={isOpen}
				>
					{isOpen ? <FiX /> : <FiMenu />}
				</button>

			</div>

			<div
				className={`${style.overlay} ${isOpen ? style.open : ''}`}
				onClick={closeMenu}
				aria-hidden="true"
			/>

			<aside className={`${style.sidebar} ${isOpen ? style.open : ''}`}>
				<button
					type="button"
					className={style.close}
					onClick={closeMenu}
					aria-label="Fechar menu"
				>
					<FiX />
				</button>

				<div className={style.content}>
					<div>
						<h4>Categorias</h4>
						<ul>
							{categories.map((item, i) => (
								<li key={i}>
									<Link href={`/categorias/${item.slug}`}>
										<FiChevronRight />
										<span>{item.name}</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
					<hr />
					<div>
						<h4>Conteúdo</h4>
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
					<hr />
					<div>
						<h4>Institucional</h4>
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
			</aside>
		</header>
	);
}


