import style from '@/styles/content';

export default function Component({ id, children, html }) {
    if (html) {
        return <div id={id} className={style.content} dangerouslySetInnerHTML={{ __html: html }} />;
    }

    return (
        <div id={id} className={style.content}>
            {children}
        </div>
    );
}

