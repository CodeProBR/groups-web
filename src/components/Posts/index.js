import style from '@site/styles/posts.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { formatData } from '@/utils';

export default function Component({ items = [], texts }) {
    return (
        <div className={style.posts}>
            {items.map((item, i) => (
                <Link href={`/${texts.blog.slug}/${item.slug}`} key={i}>
                    <figure>
                        <Image src={item.image} alt={item.title} width={320} height={180} loading="lazy" />
                        {item.category && <span>{item.category}</span>}
                    </figure>
                    <div>
                        <span>{formatData(item.updatedAt)}</span>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <button>{texts.blog.action}</button>
                    </div>
                </Link>
            ))}
        </div>
    );
}
