import Link from 'next/link';
import Image from 'next/image';
import style from '@template/aside.module.scss';

export default function Component({ title, items = [], texts }) {
    return (
        <div className={style.section}>
            <h2>{title || texts.groups.highlight}</h2>
            <hr />
            <div className={style.boosts}>
                {items.map((item, i) => (
                    <Link href={`/${texts.groups.slug}/${item.id}`} key={i}>
                        <Image src={process.env.NEXT_PUBLIC_IMG + item.image} alt={item.name} width={150} height={100} loading="lazy" />
                        <div>
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}