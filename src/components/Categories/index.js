import style from '@site/styles/categories.module.scss';
import Link from 'next/link';
import { PiBarbell } from 'react-icons/pi';

export default function Component({ items = [], texts }) {
    return (
        <div className={style.categories}>
            {items.map((item, i) => (
                <Link href={`/${texts.categories.slug}/${item.slug}`} key={i}>
                    <PiBarbell />
                    <h3>{item.name}</h3>
                </Link>
            ))}
        </div>
    );
}
