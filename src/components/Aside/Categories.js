import Link from 'next/link';
import style from '@site/styles/aside.module.scss';
import * as PiIcons from 'react-icons/pi';

export default function Component({ title, items = [], texts }) {
    return (
        <div className={style.section}>
            <h2>{title || texts.categories.titleAside}</h2>
            <hr />
            <div className={style.categories}>
                {items.map((item, i) => {
                    const iconKey = item.icon?.startsWith('Pi') ? item.icon : (item.icon ? `Pi${item.icon}` : null);
                    const IconComponent = (iconKey && PiIcons[iconKey]) || PiIcons.PiBarbell;
                    return (
                        <Link href={`/${texts.categories.slug}/${item.slug}`} key={i}>
                            <IconComponent />
                            <h3>{item.name}</h3>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}