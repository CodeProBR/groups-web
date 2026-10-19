import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';
import style from '@site/styles/footer.module.scss';

export default async function Footer({ categories = [], pages = [], texts }) {
	const year = new Date().getFullYear();

	return (
		<footer className={style.footer}>
			<div className={'container'}>
				<div className={style.top}>
					<div>
						<span>{process.env.NEXT_PUBLIC_NAME}</span>
						<p>{process.env.NEXT_PUBLIC_DESCRIPTION}</p>
					</div>
					<div>
						<span>{texts.categories.name}</span>
						<ul>
							{categories.slice(0, 7).map((item, i) => (
								<li key={i}>
									<Link href={`/${texts.categories.slug}/${item.slug}`}>
										<FiChevronRight />
										<span>{item.name}</span>
										<small>{item.groups}</small>
									</Link>
								</li>
							))}
						</ul>
						<Link href={`/${texts.categories.slug}`}>
							{texts.categories.more}
						</Link>
					</div>
					<div>
						<span>{texts.content}</span>
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
					<div>
						<span>{texts.institutional}</span>
						<ul>
							{pages.filter(item => item.type === 'institutional' && item.slug !== '').map((item, i) => (
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
				<div className={style.disclaimer}>
					<p>{texts.disclaimer}</p>
				</div>
				<div className={style.bottom}>
					<p>© {year} {process.env.NEXT_PUBLIC_NAME}. {texts.copyright}</p>
				</div>
			</div>
		</footer>
	);
}
