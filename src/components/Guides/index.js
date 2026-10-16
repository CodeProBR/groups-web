import style from '@site/styles/guides.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { formatData } from '@/utils';

export default function Component({ items = [], texts }) {
    return (
        <div className={style.guides}>
            {items.map((item, i) => (
                <Link href={`/${texts.guides.slug}/${item.slug}`} key={i}>
                    <figure>
                        <Image src={item.image} alt={item.title} width={320} height={180} loading="lazy" />
                    </figure>
                    <div>
                        <span>{formatData(item.updatedAt)}</span>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <button>{texts.guides.action}</button>
                    </div>
                </Link>
            ))}
        </div>
    );
}
