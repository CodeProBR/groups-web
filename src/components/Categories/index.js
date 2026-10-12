import style from '@/styles/categories';
import Link from 'next/link';
import { PiBarbell } from 'react-icons/pi';

export default function Component({ items = [] }) {
    return (
        <div className={style.categories}>
            {items.map((item, i) => (
                <Link href={`/categorias/${item.slug}`} key={i}>
                    <PiBarbell />
                    <h3>{item.name}</h3>
                </Link>
            ))}
        </div>
    );
}
