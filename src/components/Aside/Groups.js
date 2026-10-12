import Link from 'next/link';
import { PiBarbell } from 'react-icons/pi';
import style from '@/styles/aside';

export default function Component({ title = 'Grupos', items = [] }) {
    return (
        <div className={style.section}>
            <h2>{title}</h2>
            <hr />
            <div className={style.groups}>
                {items.map((item, i) => (
                    <Link href={`/grupos/${item.id}`} key={i}>
                        <img src={`${process.env.NEXT_PUBLIC_IMG}${item.image}`} alt={item.name} />
                        <div>
                            <span>{item.category}</span>
                            <h3>{item.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}