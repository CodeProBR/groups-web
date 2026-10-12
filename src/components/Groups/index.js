import style from '@/styles/groups';
import Link from 'next/link';
import { PiStarFill, PiBarbell } from 'react-icons/pi';

export default function Component({ items = [] }) {
    return (
        <div className={style.groups}>
            {items.map((item, i) => (
                <Link href={`/grupos/${item.id}`} key={i}>
                    <figure>
                        <img src={`${process.env.NEXT_PUBLIC_IMG}${item.image}`} alt={item.name} />
                        <span><PiBarbell />{item.category}</span>
                        {item.boost && <small><PiStarFill /><span>VIP</span></small>}
                    </figure>
                    <div>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <button>Entrar no Grupo</button>
                    </div>
                </Link>
            ))}
        </div>
    );
}
