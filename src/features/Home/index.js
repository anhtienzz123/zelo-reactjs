import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import FEATURE_1 from 'assets/images/home/Feature_1.png';
import PHONE_1 from 'assets/images/home/phone_1.png';
import PHONE_2 from 'assets/images/home/phone_2.png';
import ZELO_ICON from 'assets/images/home/zelo_icon.png';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css'; // ES6
import './style.scss';

function Home(props) {
    const [isShowMenu, setIsShowMenu] = useState(false);

    return (
        <div id="home_page">
            <header>
                <a href="#" className="logo">
                    <img src={ZELO_ICON} alt="zeloapp" />
                </a>

                <input type="checkbox" id="menu-bar" />
                <label
                    for="menu-bar"
                    onClick={() => setIsShowMenu(!isShowMenu)}
                    className="menu-bar"
                >
                    {isShowMenu ? <CloseOutlined /> : <MenuOutlined />}
                </label>

                <nav className="navbar">
                    <a href="#home">Trang chủ</a>
                    <a href="#features">Tính năng</a>
                    <a href="#features">Ứng dụng</a>
                    <a href="#about">Nhà phát triển</a>
                    <a href="#about">Đăng ký</a>
                    <a href="#about">Đăng nhập</a>
                </nav>
            </header>

            <section className="home" id="home">
                <div className="content">
                    <h3>
                        best mobile app <span>showcase</span>
                    </h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptatibus suscipit porro nam libero natus error
                        consequatur sed repudiandae eos quo?
                    </p>
                    <a href="#" className="btn">
                        download now
                    </a>
                </div>

                <div className="image">
                    <img src={PHONE_2} />
                </div>
            </section>

            <section className="features" id="features">
                <h1 className="heading">Tính năng </h1>

                <div className="box-container">
                    <div className="box">
                        <img src={FEATURE_1} alt="" />
                        <h3>amazing UI design</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Ullam minus recusandae autem, repellendus
                            fugit quaerat provident voluptatum non officiis
                            ratione.
                        </p>
                        <a href="#" className="btn">
                            read more
                        </a>
                    </div>

                    <div className="box">
                        <img src={FEATURE_1} alt="" />
                        <h3>soft and smooth animations</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Ullam minus recusandae autem, repellendus
                            fugit quaerat provident voluptatum non officiis
                            ratione.
                        </p>
                        <a href="#" className="btn">
                            read more
                        </a>
                    </div>

                    <div className="box">
                        <img src={FEATURE_1} alt="" />
                        <h3>freindly interactions</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Ullam minus recusandae autem, repellendus
                            fugit quaerat provident voluptatum non officiis
                            ratione.
                        </p>
                        <a href="#" className="btn">
                            read more
                        </a>
                    </div>
                </div>
            </section>

            {/* <section className="slider">
                <Carousel autoplay>
                    <div>
                        <img src={WEB_BG} alt="" />
                    </div>
                    <div>
                        <img src={WEB_BG} alt="" />
                    </div>
                    <div>
                        <img src={WEB_BG} alt="" />
                    </div>
                </Carousel>
                ,
            </section> */}

            <section className="about" id="about">
                <h1 className="heading"> about the app </h1>

                <div className="column">
                    <div className="image">
                        <img src={PHONE_1} alt="" />
                    </div>

                    <div className="content">
                        <h3>Easy And Perfect Solution For Your Business App</h3>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Nulla placeat deserunt saepe repudiandae
                            veniam soluta minima dolor hic aperiam iure.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Laudantium, quaerat. Dolorem ratione saepe
                            magni quo inventore porro ab voluptates eos, nam
                            eius provident accusantium, quia similique est,
                            repellendus et reiciendis.
                        </p>
                        <div className="buttons">
                            <a href="#" className="btn">
                                {' '}
                                <i className="fab fa-apple"></i> app store{' '}
                            </a>
                            <a href="#" className="btn">
                                {' '}
                                <i className="fab fa-google-play"></i>{' '}
                                google-play{' '}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="review" id="review">
                <h1 className="heading"> people's review </h1>

                <div className="box-container">
                    <div className="box">
                        <i className="fas fa-quote-right"></i>
                        <div className="user">
                            <img src="images/pic1.png" alt="" />
                            <h3>john deo</h3>
                            <div className="stars"></div>
                            <div className="comment">
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Possimus et, perspiciatis nisi
                                tempore aspernatur accusantium sed distinctio
                                facilis aperiam laborum autem earum repellat,
                                commodi eum. Ullam cupiditate expedita officiis
                                obcaecati?
                            </div>
                        </div>
                    </div>

                    <div className="box">
                        <i className="fas fa-quote-right"></i>
                        <div className="user">
                            <img src="images/pic2.png" alt="" />
                            <h3>john deo</h3>
                            <div className="stars">
                                <i className="fas fa-star-half-alt"></i>
                            </div>
                            <div className="comment">
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Possimus et, perspiciatis nisi
                                tempore aspernatur accusantium sed distinctio
                                facilis aperiam laborum autem earum repellat,
                                commodi eum. Ullam cupiditate expedita officiis
                                obcaecati?
                            </div>
                        </div>
                    </div>

                    <div className="box">
                        <i className="fas fa-quote-right"></i>
                        <div className="user">
                            <img src="images/pic3.png" alt="" />
                            <h3>john deo</h3>
                            <div className="stars">
                                <i className="far fa-star"></i>
                            </div>
                            <div className="comment">
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Possimus et, perspiciatis nisi
                                tempore aspernatur accusantium sed distinctio
                                facilis aperiam laborum autem earum repellat,
                                commodi eum. Ullam cupiditate expedita officiis
                                obcaecati?
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div class="footer">
                <div class="box-container">
                    <div class="box">
                        <h3>about us</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Amet pariatur rerum consectetur architecto ad
                            tempora blanditiis quo aliquid inventore a.
                        </p>
                    </div>

                    <div class="box">
                        <h3>quick links</h3>
                        <a href="#">home</a>
                        <a href="#">features</a>
                        <a href="#">about</a>
                        <a href="#">review</a>
                        <a href="#">pricing</a>
                        <a href="#">contact</a>
                    </div>

                    <div class="box">
                        <h3>contact info</h3>
                        <div class="info">
                            <i class="fas fa-phone"></i>
                            <p>
                                {' '}
                                +123-456-7890 <br /> +111-2222-333{' '}
                            </p>
                        </div>
                        <div class="info">
                            <i class="fas fa-envelope"></i>
                            <p>
                                {' '}
                                example@gmail.com <br /> example@gmail.com{' '}
                            </p>
                        </div>
                        <div class="info">
                            <i class="fas fa-map-marker-alt"></i>
                            <p> mumbai, india - 400104 </p>
                        </div>
                    </div>
                </div>

                <h2 className="credit">
                    {' '}
                    &copy; copyright @ 2021 by mr. web designer{' '}
                </h2>
            </div>
        </div>
    );
}

export default Home;
