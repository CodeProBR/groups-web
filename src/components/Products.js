"use client";

import style from '@site/styles/products.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { formatarMoeda } from '@/utils';

export default function Component({ items = [], texts }) {
    const handleClick = (item) => {
        try {
            const payload = {
                product: item,
                pathname: typeof window !== 'undefined' ? window.location.pathname : '',
                referer: typeof document !== 'undefined' ? document.referrer : ''
            };

            if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
                const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
                navigator.sendBeacon('/api/products', blob);
            } else {
                fetch('/api/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                    keepalive: true
                }).catch(() => { });
            }
        } catch (e) {
            console.error('Error tracking product click:', e);
        }
    };

    return (
        <div className={style.products}>
            {items.sort(() => Math.random() - 0.5).slice(0, 5).map((item, i) => (
                <Link href={item.url} key={i} target="_blank" onClick={() => handleClick(item)}>
                    <figure>
                        <Image src={item.image} alt={item.name} width={320} height={180} loading="lazy" data-padding={item.padding} />
                        <div><Image src={`${process.env.NEXT_PUBLIC_IMG}/assets/${item.store}.webp`} alt={item.store} width={50} height={50} loading="lazy" /></div>
                        <span>{item.discount}</span>
                    </figure>
                    <div>
                        <h3>{item.name}</h3>
                        <div>
                            {item.price?.original && <del>{formatarMoeda(item.price.original)}</del>}
                            {item.price?.current && <strong>{formatarMoeda(item.price.current)}</strong>}
                            {item.installments && <span>{item.installments}</span>}
                        </div>
                        <p>{item.shipping}</p>
                        <button>{texts.products.action}</button>
                    </div>
                </Link>
            ))}
        </div>
    );
}
