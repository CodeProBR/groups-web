'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FiMenu, FiX, FiChevronRight, FiSearch } from 'react-icons/fi';
import style from '@site/styles/header.module.scss';

function SearchInput({ texts }) {
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
		router.push(`/${texts.groups.slug}?q=${encodeURIComponent(trimmed)}`);
	};

	return (
		<form onSubmit={handleSearch} className={style.searchForm}>
			<input
				type="text"
				placeholder={texts.search.placeholder}
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				className={style.searchInput}
			/>
			<button type="submit" className={style.searchBtn} aria-label={texts.search.placeholder}>
				<FiSearch />
			</button>
		</form>
	);
}

export default function Header({ categories = [], pages = [], texts }) {
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
					<Image src={`${process.env.NEXT_PUBLIC_IMG}/logo.webp`} alt={process.env.NEXT_PUBLIC_NAME} width={200} height={80} priority />
				</Link>

				<Suspense fallback={null}>
					<SearchInput texts={texts} />
				</Suspense>

				<nav>
					<Link href={`/${texts.groups.slug}`}>
						<span>{texts.groups.name}</span>
					</Link>
					<Link href={`/${texts.categories.slug}`}>
						<span>{texts.categories.name}</span>
					</Link>
					<Link href={`/${texts.blog.slug}`}>
						<span>{texts.blog.name}</span>
					</Link>

				</nav>

				<button
					type="button"
					className={style.menuToggleBtn}
					onClick={toggleMenu}
					aria-label={isOpen ? texts.close : texts.open}
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
					aria-label={texts.close}
				>
					<FiX />
				</button>

				<div className={style.content}>
					<div>
						<h4>{texts.categories.name}</h4>
						<ul>
							{categories.map((item, i) => (
								<li key={i}>
									<Link href={`/${texts.categories.slug}/${item.slug}`}>
										<FiChevronRight />
										<span>{item.name}</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
					<hr />
					<div>
						<h4>{texts.content}</h4>
						<ul>
							{pages.filter(item => item.type === 'content').map((item, i) => (
								<li key={i}>
									<Link href={`/${item.slug}`}>
										<FiChevronRight />
										<span>{item.name}</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
					<hr />
					<div>
						<h4>{texts.institutional}</h4>
						<ul>
							{pages.filter(item => item.type === 'institutional').map((item, i) => (
								<li key={i}>
									<Link href={`/${item.slug}`}>
										<FiChevronRight />
										<span>{item.name}</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</aside>
		</header>
	);
}


