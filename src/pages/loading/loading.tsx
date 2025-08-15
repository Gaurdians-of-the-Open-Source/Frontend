import "./loading.css";
import logo from "../../assets/logo.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Loading() {
    const nav = useNavigate();

    useEffect(() => {
        // ✅ 테스트용 더미 데이터 (실제 연동 시 백엔드 결과로 대체)
        const filesMeta = [{ name: "test.zip", size: 1024, type: "application/zip" }];

        if (!filesMeta.length) {
            nav("/upload", { replace: true });
            return;
        }

        // 3초 뒤 /download로 이동 (테스트용)
        const timer = setTimeout(() => {
            nav("/download", {
                replace: true,
                state: { result: { message: "Test complete" } }
            });
        }, 3000);

        return () => clearTimeout(timer);
    }, [nav]);

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
