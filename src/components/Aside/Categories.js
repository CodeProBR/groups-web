import Link from 'next/link';
import { PiBarbell } from 'react-icons/pi';
import style from '@site/styles/aside.module.scss';

export default function Component({ title, items = [], texts }) {
    return (
        <div className={style.section}>
            <h2>{title || texts.categories.titleAside}</h2>
            <hr />
            <div className={style.categories}>
                {items.map((item, i) => (
                    <Link href={`/${texts.categories.slug}/${item.slug}`} key={i}>
                        <PiBarbell />
                        <h3>{item.name}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
}