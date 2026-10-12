"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LayoutEvents() {
    const pathname = usePathname();

    useEffect(() => {
        // 2. Rastreamento de Insights (Apenas em Produção)
        if (process.env.NODE_ENV === 'production') {
            const params = new URLSearchParams(window.location.search);
            const referer = params.get('source') || document.referrer;

            // Enviar visualização de página
            fetch('/api/insights', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: pathname, referer, type: 'views' })
            });

            // 3. Rastreamento de cliques em anúncios (.goAds)
            const handleAds = (ad) => {
                fetch('/api/insights', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: pathname, type: 'ads', ad }),
                });
            };

            const adElements = document.querySelectorAll('.goAds:not([data-handled])');
            adElements.forEach(el => {
                el.setAttribute('data-handled', 'true');
                el.addEventListener('click', () => handleAds(el.getAttribute('ad')));
            });
        }
    }, [pathname]); // Dispara a cada mudança de rota

    return null;
}
