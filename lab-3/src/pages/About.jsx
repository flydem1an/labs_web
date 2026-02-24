import React from 'react';

export default function About() {
    return (
        <div className="container">
            <section className="section-about">
                <h2>Про нас</h2>

                <div className="contact-info">
                    <p>Найкращий сервіс оренди для студентів та викладачів.</p>
                    <p><strong>Адреса:</strong> вул. Степана Бандери, 28А, Львів, 79000</p>
                    <p><strong>Телефон:</strong>
                        <a href="tel:+380999999999" style={{color: 'inherit', textDecoration: 'none'}}>
                            +380 99 999 99 99
                        </a>
                    </p>
                </div>

                <div className="map-wrapper" style={{marginTop: '30px'}}>
                    <iframe
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2573.685532599728!2d24.012297615709064!3d49.83268897939466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add7e427d143f%3A0x6295383a1b854d66!2z0J3QsNGG0ZbQvtC90LDQu9GM0L3QuNC59YMg0YPQvdGW0LLQtdGA0YHQuNGC0LXRgiDCq9Cb0YzQstGW0LLRgdGM0LrQsCDQv9C-0LvRltGC0LXRhdC90ZbQutCwwrs!5e0!3m2!1suk!2sua!4v1633346781234!5m2!1suk!2sua"
                        width="100%"
                        height="400"
                        style={{border:0, borderRadius: '10px'}}
                        allowFullScreen=""
                        loading="lazy">
                    </iframe>
                </div>
            </section>
        </div>
    );
}