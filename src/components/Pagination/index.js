import style from '@site/styles/pagination.module.scss';
import Link from 'next/link';

export default function Component({ page = 1, totalPages = 1, baseUrl = '', texts }) {
    if (!totalPages || totalPages <= 1) return null;

    const currentPage = Number(page) || 1;

    function getPageUrl(p) {
        if (!baseUrl) return `?page=${p}`;
        const separator = baseUrl.includes('?') ? '&' : '?';
        return `${baseUrl}${separator}page=${p}`;
    }

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        if (start > 1) {
            pages.push(1);
            if (start > 2) pages.push('...');
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < totalPages) {
            if (end < totalPages - 1) pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <nav className={style.pagination} aria-label={texts.pagination.title}>
            {currentPage > 1 && (
                <Link href={getPageUrl(currentPage - 1)} className={`${style.item} ${style.prev}`}>
                    {texts.pagination.prev}
                </Link>
            )}

            {pageNumbers.map((p, idx) => {
                if (p === '...') {
                    return (
                        <span key={`dots-${idx}`} className={style.dots}>
                            ...
                        </span>
                    );
                }

                const isActive = p === currentPage;
                return (
                    <Link
                        key={p}
                        href={getPageUrl(p)}
                        className={`${style.item} ${isActive ? style.active : ''}`}
                    >
                        {p}
                    </Link>
                );
            })}

            {currentPage < totalPages && (
                <Link href={getPageUrl(currentPage + 1)} className={`${style.item} ${style.next}`}>
                    {texts.pagination.next}
                </Link>
            )}
        </nav>
    );
}
