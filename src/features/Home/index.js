import { MenuOutlined } from '@ant-design/icons';
import React from 'react';
import 'react-quill/dist/quill.snow.css'; // ES6
import { Link } from 'react-router-dom';
import './style.scss';

function Home(props) {
    return (
        <div id="home_page">
            <header>
                <a href="#" class="logo">
                    Zelo
                </a>

                <input type="checkbox" id="menu-bar" />
                <label for="menu-bar" className="">
                    <MenuOutlined />
                </label>
                <label for="menu-bar">
                    <MenuOutlined />
                </label>

                <nav className="navbar">
                    <a href="#home">Home</a>
                    <a href="#features">Features</a>
                    <a href="#about">About</a>
                    <a href="#review">Review</a>
                    <a href="#contact">Contact</a>
                    <Link to="/">Login</Link>
                </nav>
            </header>
        </div>
    );
}

export default Home;
