import Link from 'next/link';
import Image from 'next/image';
import style from '@site/styles/aside.module.scss';

export default function Component({ title, items = [], texts }) {
    return (
        <div className={style.section}>
            <h2>{title || texts.groups.titleAside}</h2>
            <hr />
            <div className={style.groups}>
                {items.map((item, i) => (
                    <Link href={`/${texts.groups.slug}/${item.id}`} key={i}>
                        <Image src={`${process.env.NEXT_PUBLIC_IMG}${item.image}`} alt={item.name} width={150} height={100} loading="lazy" />
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