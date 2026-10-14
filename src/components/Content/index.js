import style from '@site/styles/content.module.scss';
import { marked } from 'marked';

export default function Component({ id, content }) {
    return (
        <div id={id} className={style.content} dangerouslySetInnerHTML={{ __html: marked(content) }} />
    );
}

