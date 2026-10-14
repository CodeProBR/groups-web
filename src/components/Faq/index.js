'use client';

import { useState } from 'react';
import style from '@site/styles/faq.module.scss';
import { FiChevronDown } from 'react-icons/fi';
import FAQPage from '@/components/Snippet/FAQPage';

export default function Component({ items = [] }) {
    const [openIdx, setOpenIdx] = useState(0);
    const toggleItem = (idx) => {
        setOpenIdx(openIdx === idx ? null : idx);
    };
    return (
        <div className={`${style.faq}`}>
            {items.map((item, i) => {
                const isOpen = openIdx === i;
                return (
                    <div
                        key={i}
                        className={`${isOpen ? style.open : ''}`}
                        onClick={() => toggleItem(i)}
                        aria-expanded={isOpen}
                    >
                        <h3>
                            <span>{item.question}</span>
                            <FiChevronDown />
                        </h3>
                        {isOpen && (
                            <div>
                                <p dangerouslySetInnerHTML={{ __html: item.answer }} />
                            </div>
                        )}
                    </div>
                );
            })}
            <FAQPage data={items} />
        </div>
    );
}

