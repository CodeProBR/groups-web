import style from '@site/styles/categories.module.scss';
import Link from 'next/link';
import * as PiIcons from 'react-icons/pi';

export default function Component({ items = [], texts, subcategories = false }) {
    return (
        <div className={style.categories}>
            {items.filter(item => subcategories ? !item.parentId : true).map((item, i) => {
                const iconKey = item.icon?.startsWith('Pi') ? item.icon : (item.icon ? `Pi${item.icon}` : null);
                const IconComponent = (iconKey && PiIcons[iconKey]) || null;
                return (
                    <div key={i}>
                        <Link href={`/${texts.categories.slug}/${item.slug}`}>
                            {IconComponent && <IconComponent />}
                            <h3>{item.name}<span>{item.groups || 0}</span></h3>
                        </Link>
                        {items.filter(child => child.parentId === item._id).length > 0 && subcategories && <ul>
                            {items.filter(child => child.parentId === item._id).map((child, j) => (
                                <li key={j}>
                                    <Link href={`/${texts.categories.slug}/${child.slug}`}>
                                        {child.name}<span>{child.groups || 0}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>}
                    </div>
                );
            })}
        </div>
    );
}
