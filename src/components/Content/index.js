import style from '@site/styles/content.module.scss';
import { marked } from 'marked';
import Image from 'next/image';

export default function Component({ id, content }) {
    if (Array.isArray(content) && content.length > 0) {
        return (
            content.map((item, i) => (
                <div key={i} id={item.name} className={style.content}>
                    {item.title && <h2>{item.title}</h2>}
                    {item.image && <figure>
                        <Image src={item.image} alt={item.title} width={900} height={400} loading="lazy" />
                    </figure>}
                    <div dangerouslySetInnerHTML={{ __html: marked(item.text) }} />
                </div>
            ))
        );
    }
    return (
        <div id={id} className={style.content} dangerouslySetInnerHTML={{ __html: marked(content) }} />
    );
}

