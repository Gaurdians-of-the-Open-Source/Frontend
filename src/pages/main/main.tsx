import "./home.css";
import logo from "../../assets/logo.png";

export default function Home() {
    return (
        <div className="wrapper">
            <div className="ratio-box">
                <header className="header">
                    <div className="left-box">
                        <img src={logo} alt="LV.0 Logo" className="logo" />
                        <div className="nav-group">
                            <a href="#home" className="nav-item">home</a>
                            <a href="#about" className="nav-item">about</a>
                            <a href="#how" className="nav-item">how it works</a>
                            <a href="#project" className="nav-item">project</a>
                        </div>
                    </div>

                    <div className="right-buttons">
                        <select className="lang-select">
                            <option>English</option>
                            <option>한국어</option>
                        </select>
                        <button className="contact-btn">Contact us</button>
                    </div>
                </header>
            </div>
        </div>
    );
}

