import style from '@site/styles/posts.module.scss';
import Link from 'next/link';

export default function Component({ items = [], texts }) {
    return (
        <div className={style.posts}>
            {items.map((item, i) => (
                <Link href={`/${texts.blog.slug}/${item.slug}`} key={i}>
                    <figure>
                        <img src={`${process.env.NEXT_PUBLIC_IMG}${item.image}`} alt={item.name} />
                        <span>{item.category}</span>
                    </figure>
                    <div>
                        <h3>{item.title}</h3>
                        <p>{item.summary}</p>
                        <button>{texts.card}</button>
                    </div>
                </Link>
            ))}
        </div>
    );
}
