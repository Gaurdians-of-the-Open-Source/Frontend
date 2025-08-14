import "./loading.css";
import logo from "../../assets/logo.png";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

type FileMeta = { name: string; size: number; type: string };
type LocState = { filesMeta?: FileMeta[] };

export default function Loading() {
    const nav = useNavigate();
    const { state } = useLocation();
    const filesMeta: FileMeta[] = (state as LocState)?.filesMeta ?? [];

    useEffect(() => {
        if (!filesMeta.length) {
            nav("/upload", { replace: true });
            return;
        }

        // ================================
        // 🔹 백엔드 연동 지점
        // 1. 분석 시작 요청 (예: POST /analysis)
        // 2. 진행률 수신 시 상태 업데이트
        // 3. 완료 시 결과 데이터(result)와 함께:
        //    nav("/download", { replace: true, state: { result } });
        // ================================
    }, [filesMeta, nav]);

    return (
        <div className="wrapper">
            <div className="ratio-box">
                <header className="header">
                    <div className="left-box">
                        <img src={logo} alt="LV.0 Logo" className="logo" />
                        <nav className="nav-group" aria-label="Primary">
                            <Link to="/" className="nav-item">home</Link>
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
