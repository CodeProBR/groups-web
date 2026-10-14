import style from '@site/styles/groups.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { PiStarFill, PiBarbell } from 'react-icons/pi';

export default function Component({ items = [], texts }) {
    return (
        <div className={style.groups}>
            {items.map((item, i) => (
                <Link href={`/${texts.groups.slug}/${item.id}`} key={i}>
                    <figure>
                        <Image src={item.image} alt={item.name} width={320} height={180} loading="lazy" />
                        <span><PiBarbell />{item.category}</span>
                        {item.boost && <small><PiStarFill /><span>VIP</span></small>}
                    </figure>
                    <div>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <button>{texts.groups.action}</button>
                    </div>
                </Link>
            ))}
        </div>
    );
}
