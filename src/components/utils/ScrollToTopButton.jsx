import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Показывать кнопку, когда скролл превышает 100 пикселей
    const toggleVisibility = () => {
        if (window.pageYOffset > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Добавить слушателя событий при монтировании компонента
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // Прокрутить страницу к началу
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // Плавная анимация скролла в наверх
        });
    };

    return (
        <>
            {isVisible && (
                <div className="scroll-to-top" onClick={scrollToTop}>
                    <FaArrowUp />
                </div>
            )}
        </>
    );
};

export default ScrollToTopButton;