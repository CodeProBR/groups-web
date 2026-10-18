import { Poppins } from 'next/font/google';
import '@site/styles/globals.scss';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LayoutEvents from './LayoutEvents';
import Script from 'next/script';
import Organization from '@/components/Snippet/Organization';
import { getCategoriesFeatured, getCategoriesAll, getPages } from "@/utils/database";

const poppins = Poppins({
	variable: '--font-poppins',
	subsets: ['latin'],
	display: 'swap',
	weight: ['400', '500', '600', '700', '800'],
});

export default async function RootLayout({ children }) {
	const categoriesAll = await getCategoriesAll();
	const categoriesFeatured = await getCategoriesFeatured();
	const pages = await getPages();
	const texts = (await import(`@/sites/${process.env.NEXT_PUBLIC_SITE}/texts`)).default;
	return (
		<html lang={process.env.NEXT_PUBLIC_LOCALE} className={`${poppins.variable}`}>
			<body>
				<Header categories={categoriesAll} pages={pages} texts={texts} />
				<main>
					<div className="container">
						{children}
					</div>
				</main>
				<Footer categories={categoriesFeatured} pages={pages} texts={texts} />
				<Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.ANALYTICS}`} strategy="afterInteractive" />
				<Script id="ga-script" strategy="afterInteractive">
					{`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.ANALYTICS}');
                `}
				</Script>
				<Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1452757382037765`} crossOrigin="anonymous" strategy="afterInteractive" />
				<LayoutEvents />
				<Organization />
			</body>
		</html>
	);
}