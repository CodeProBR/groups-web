import { NextResponse } from 'next/server';
import mongodb from '@/lib/mongoDB';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    const baseUrl = process.env.NEXT_PUBLIC_URL || '';
    const urls = [`${baseUrl}/ (Home)`];

    urls.push(`${baseUrl}/saude-e-bem-estar (Categoria de Saúde e Bem-estar)`);
    urls.push(`${baseUrl}/financas-e-investimentos (Categoria de Finanças e Investimentos)`);
    urls.push(`${baseUrl}/datas-e-tempo (Categoria de Datas e Tempo)`);
    urls.push(`${baseUrl}/matematica-e-estudos (Categoria de Matemática e Estudos)`);
    urls.push(`${baseUrl}/blog (Blog)`);

    urls.push(`${baseUrl}/calculadora-de-metabolismo-basal (Calculadora de Metabolismo Basal)`);
    urls.push(`${baseUrl}/calculadora-de-peso-ideal (Calculadora de Peso Ideal)`);
    urls.push(`${baseUrl}/calculadora-de-calorias-diarias (Calculadora de Calorias Diárias)`);
    urls.push(`${baseUrl}/calculadora-de-imc (Calculadora de IMC)`);
    urls.push(`${baseUrl}/calculadora-de-agua-diaria (Calculadora de Água Diária)`);
    urls.push(`${baseUrl}/calculadora-de-gestacao (Calculadora de Gestação)`);
    urls.push(`${baseUrl}/calculadora-de-ciclo-menstrual (Calculadora de Ciclo Menstrual)`);
    urls.push(`${baseUrl}/calculadora-de-juros-compostos (Calculadora de Juros Compostos)`);
    urls.push(`${baseUrl}/calculadora-de-juros-simples (Calculadora de Juros Simples)`);
    urls.push(`${baseUrl}/calculadora-de-financiamento (Calculadora de Financiamento)`);
    urls.push(`${baseUrl}/calculadora-de-cdi (Calculadora de CDI)`);
    urls.push(`${baseUrl}/calculadora-de-dias-entre-datas (Calculadora de Dias entre Datas)`);
    urls.push(`${baseUrl}/calculadora-de-contador-de-dias (Calculadora de Contador de Dias)`);
    urls.push(`${baseUrl}/calculadora-de-dias-uteis (Calculadora de Dias Úteis)`);
    urls.push(`${baseUrl}/calculadora-de-semanas-entre-datas (Calculadora de Semanas entre Datas)`);
    urls.push(`${baseUrl}/calculadora-de-contagem-regressiva (Calculadora de Contagem Regressiva)`);
    urls.push(`${baseUrl}/calculadora-de-regra-de-tres (Calculadora de Regra de Três)`);
    urls.push(`${baseUrl}/calculadora-de-media-ponderada (Calculadora de Média Ponderada)`);
    urls.push(`${baseUrl}/calculadora-de-area-do-triangulo (Calculadora de Área do Triângulo)`);
    urls.push(`${baseUrl}/calculadora-de-bhaskara (Calculadora de Bhaskara)`);

    try {
        if (process.env.DATABASE) {
            const client = await mongodb(process.env.DATABASE);
            const db = client.db();
            const posts = await db.collection('blog_posts')
                .find({ status: 'active' }, { projection: { slug: 1, title: 1 } })
                .toArray();

            posts.forEach(post => {
                if (post.slug) {
                    const cleanSlug = post.slug.startsWith('/') ? post.slug.slice(1) : post.slug;
                    urls.push(`${baseUrl}/blog/${cleanSlug} (${post.title || cleanSlug})`);
                }
            });
        }
    } catch (error) {
        console.error('Erro ao buscar posts da coleção blog_posts:', error);
    }

    return NextResponse.json(urls);
}