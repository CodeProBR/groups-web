import style from '@site/styles/posts.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export default function Component({ items = [], texts }) {
    return (
        <div className={style.posts}>
            {items.map((item, i) => (
                <Link href={`/${texts.blog.slug}/${item.slug}`} key={i}>
                    <figure>
                        <Image src={item.image} alt={item.name} width={320} height={180} loading="lazy" />
                        <span>{item.category}</span>
                    </figure>
                    <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <button>{texts.blog.action}</button>
                    </div>
                </Link>
            ))}
        </div>
    );
}
