import "./loading.css";
import logo from "../../assets/logo.png";
import { useState, useEffect } from "react";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        if (!loading) return;
        const timer = setInterval(() => {
            setPercent(prev => {
                const next = Math.min(prev + 10, 100);
                if (next === 100) {
                    clearInterval(timer);
                    setLoading(false);
                }
                return next;
            });
        }, 500);
        return () => clearInterval(timer);
    }, [loading]);

    return (
        <div className="wrapper">
            <div className="ratio-box">
                <header className="header">
                    <div className="left-box">
                        <img src={logo} alt="LV.0 Logo" className="logo" />
                        <nav className="nav-group" aria-label="Primary">
                            <a href="#home" className="nav-item">home</a>
                            <a href="#about" className="nav-item">about</a>
                            <a href="#how" className="nav-item">how it works</a>
                            <a href="#project" className="nav-item">project</a>
                        </nav>
                    </div>

                    <div className="right-buttons">
                        <select className="lang-select" aria-label="Language">
                            <option>English</option>
                            <option>한국어</option>
                        </select>
                        <button className="contact-btn" type="button">Contact us</button>
                    </div>
                </header>

                <main className="main">
                    {loading && (
                        <div className="inline-loading">
                            <div className="spinner-bars">
                                <span /><span /><span /><span />
                                <span /><span /><span /><span />
                            </div>
                            <p className="loading-text">Analyzing ...</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
