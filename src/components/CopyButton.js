'use client';

import { useState } from 'react';

export default function CopyButton({ textToCopy, label, copiedLabel, className }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		if (!textToCopy) return;

		try {
			if (navigator?.clipboard?.writeText) {
				await navigator.clipboard.writeText(textToCopy);
			} else {
				// Fallback para navegadores sem suporte direto a clipboard
				const textArea = document.createElement('textarea');
				textArea.value = textToCopy;
				textArea.style.position = 'fixed';
				textArea.style.opacity = '0';
				document.body.appendChild(textArea);
				textArea.focus();
				textArea.select();
				document.execCommand('copy');
				document.body.removeChild(textArea);
			}

			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Falha ao copiar:', err);
		}
	};

	return (
		<button
			type="button"
			onClick={handleCopy}
			className={className}
		>
			{copied ? (copiedLabel || 'Copiado!') : label}
		</button>
	);
}

