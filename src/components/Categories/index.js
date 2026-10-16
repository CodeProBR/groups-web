import style from '@site/styles/categories.module.scss';
import Link from 'next/link';
import * as PiIcons from 'react-icons/pi';

export default function Component({ items = [], texts }) {
    return (
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
    );
}
