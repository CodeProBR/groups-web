'use client';

import { useState, useEffect } from 'react';
import {
	FaFacebook,
	FaTelegram,
	FaWhatsapp,
	FaXTwitter,
	FaEnvelope,
	FaLink,
	FaCheck,
} from 'react-icons/fa6';
import style from '@site/styles/share.module.scss';

export default function Component({ title = '', description = '', texts }) {
	const [currentUrl, setCurrentUrl] = useState('');
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setCurrentUrl(window.location.href);
		}
	}, []);

	if (!currentUrl) {
		return null;
	}

	const shareText = title ? `${title}${description ? ` - ${description}` : ''}` : description;

	const shareLinks = [
		{
			name: 'WhatsApp',
			icon: FaWhatsapp,
			colorClass: style.whatsapp,
			href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${currentUrl}`)}`,
		},
		{
			name: 'Telegram',
			icon: FaTelegram,
			colorClass: style.telegram,
			href: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`,
		},
		{
			name: 'Facebook',
			icon: FaFacebook,
			colorClass: style.facebook,
			href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
		},
		{
			name: 'X (Twitter)',
			icon: FaXTwitter,
			colorClass: style.twitter,
			href: `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`,
		},
		{
			name: 'E-mail',
			icon: FaEnvelope,
			colorClass: style.email,
			href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${shareText}\n\n${currentUrl}`)}`,
		},
	];

	const handleCopy = () => {
		navigator.clipboard.writeText(currentUrl);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className={style.share}>
			<span>{texts.share.title}</span>
			<div>
				{shareLinks.map((item) => {
					const Icon = item.icon;
					return (
						<a
							key={item.name}
							href={item.href}
							target="_blank"
							rel="noopener noreferrer"
							className={item.colorClass}
							title={`${texts.share.title}: ${item.name}`}
						>
							<Icon />
						</a>
					);
				})}
				<button
					type="button"
					onClick={handleCopy}
					className={`${style.copyBtn} ${copied ? style.copied : ''}`}
					title={copied ? texts.share.copied : texts.share.copy}
				>
					{copied ? <FaCheck /> : <FaLink />}
				</button>
			</div>
		</div>
	);
}
