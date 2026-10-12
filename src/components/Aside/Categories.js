import Link from 'next/link';
import { PiBarbell } from 'react-icons/pi';
import style from '@/styles/aside';

export default function Component({ title = 'Categorias', items = [] }) {
    return (
        <div className={style.section}>
            <h2>{title}</h2>
            <hr />
            <div className={style.categories}>
                {items.map((item, i) => (
                    <Link href={`/categorias/${item.slug}`} key={i}>
                        <PiBarbell />
                        <h3>{item.name}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
}