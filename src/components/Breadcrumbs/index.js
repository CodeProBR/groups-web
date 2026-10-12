import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';
import Share from '@/components/Share';
import BreadcrumbList from '@/components/Snippet/BreadcrumbList';
import style from '@/styles/breadcrumbs';

export default function Component({ items = [], title = '', description = '', showShare = true }) {
	const shareTitle = title || (items.length > 0 ? items[items.length - 1].label : '');
	return (
		<div className={style.breadcrumbs}>
			<nav aria-label="Breadcrumb">
				<ol>
					{items.map((item, i) => (
						<li key={i}>
							{i > 0 && <FiChevronRight />}
							{item.url ? (
								<Link href={item.url}>
									{item.name}
								</Link>
							) : (
								<span aria-current="page">
									{item.name}
								</span>
							)}
						</li>
					))}
				</ol>
			</nav>
			{showShare && (
				<Share title={shareTitle} description={description} />
			)}
			<BreadcrumbList data={items} />
		</div>
	);
}
