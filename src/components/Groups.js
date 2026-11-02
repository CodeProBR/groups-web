import style from '@template/groups.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { PiStarFill } from 'react-icons/pi';
import { isBoostActive } from '@/utils';

export default function Component({ items = [], texts }) {
    return (
        <div className={style.groups}>
            {items.map((item, i) => (
                <Link href={`/${texts.groups.slug}/${item.id}`} key={i}>
                    <figure>
                        <Image src={item.image} alt={item.name} width={320} height={180} loading="lazy" />
                        <span>{item.category}</span>
                        {isBoostActive(item.boost) && <small><PiStarFill /><span>VIP</span></small>}
                        {item.members && <strong>{item.members} {texts.members}</strong>}
                    </figure>
                    <div>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                    </div>
                    <button>{texts.groups.action}</button>
                </Link>
            ))}
        </div>
    );
}
