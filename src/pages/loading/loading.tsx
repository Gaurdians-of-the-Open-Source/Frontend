import "./loading.css";
import logo from "../../assets/logo.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Loading() {
    const nav = useNavigate();

    /* 시뮬레이션용 코드 백엔드 연동시 삭제*/
    useEffect(() => {
        const timer = setTimeout(() => {
            const result = {
                summary: "테스트 완료",
                count: 1,
                files: [{ name: "test.zip", size: 1024, type: "application/zip" }],
                createdAt: Date.now(),
                // message: "Test complete" // 있어도 Download가 처리함
            };
            nav("/download", { replace: true, state: { result } });
        }, 2000);

        return () => clearTimeout(timer);
    }, [nav]);
    /* 시뮬레이션용 코드 백엔드 연동시 삭제*/

    return (

        <div className="wrapper">
            <div className="ratio-box">
                <header className="header">
                    <div className="left-box">
                        <img src={logo} alt="LV.0 Logo" className="logo" />
                        <nav className="nav-group" aria-label="Primary">
                            <a href="/" className="nav-item">home</a>
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
                    <div className="inline-loading">
                        <div className="spinner-bars">
                            <span /><span /><span /><span />
                            <span /><span /><span /><span />
                        </div>
                        <p className="loading-text">Analyzing ...</p>
                    </div>
                </main>
            </div>
        </div>

    );
}
