"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function LayoutEvents() {
    const pathname = usePathname();
    const prevUrlRef = useRef(null);
    const isFirstLoad = useRef(true);

    useEffect(() => {
        // 2. Rastreamento de Insights (Apenas em Produção)
        if (process.env.NODE_ENV === 'production') {
            const params = new URLSearchParams(window.location.search);

            // No primeiro carregamento, pega o source da URL ou document.referrer externo.
            // Nas próximas navegações internas, o referer passa a ser a página anterior do site.
            let referer = '';
            if (isFirstLoad.current) {
                referer = params.get('source') || document.referrer || '';
                isFirstLoad.current = false;
            } else {
                referer = prevUrlRef.current || window.location.origin;
            }

            // Atualiza a URL de referência para a próxima navegação interna
            prevUrlRef.current = window.location.href;

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
