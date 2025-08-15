import "./download.css";
import logo from "../../assets/logo.png";
import { FiDownload, FiUpload } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";

type ResultFile = { name: string; size: number; type: string };

// 백엔드가 보내줄 필드만 남김 (+ 선택: 다운로드 링크)
type Result = {
    summary: string;
    count: number;
    files: ResultFile[];
    createdAt: number;          // ms
    reportUrl?: string;         // 선택: 백엔드가 생성한 리포트 다운로드 URL
};

export default function Download() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const result: Result | undefined = (state as any)?.result;

    const handleDownloadReport = () => {
        if (!result) return;
        // ✅ 백엔드 연동: 서버가 내려준 URL로 다운로드
        if (result.reportUrl) {
            window.open(result.reportUrl, "_blank");
        } else {
            // TODO: 백엔드에서 reportUrl 내려주면 위 줄만 남기고 아래 안내는 삭제
            console.warn("reportUrl이 없습니다. 백엔드 연동 후 이 경고를 제거하세요.");
        }
    };

    return (
        <div className="download">
            <div className="wrapper">
                <div className="ratio-box">
                    <header className="header">
                        <div className="left-box">
                            <img src={logo} alt="LV.0 Logo" className="logo" />
                            <nav className="nav-group">
                                <Link to="/" className="nav-item">home</Link>
                                <a href="#about" className="nav-item">about</a>
                                <a href="#how" className="nav-item">how it works</a>
                                <a href="#project" className="nav-item">project</a>
                            </nav>
                        </div>

                        <div className="right-buttons">
                            <select className="lang-select" aria-label="Select language">
                                <option>English</option>
                                <option>한국어</option>
                            </select>
                            <button className="contact-btn" type="button">Contact us</button>
                        </div>
                    </header>

                    <main className="report-layout">
                        <section className="report-pane">
                            <div className="pane-head">
                                <img src={logo} alt="LV.0" className="pane-logo" />
                                <h2>Vulnerability Report</h2>
                            </div>

                            <div className="report-scroll">
                                {!result ? (
                                    <div className="empty-report">표시할 결과가 없어요.</div>
                                ) : (
                                    <>
                                        <div className="report-meta">
                                            <div><strong>Created:</strong> {new Date(result.createdAt).toLocaleString()}</div>
                                            <div><strong>Total Files:</strong> {result.count}</div>
                                            <div><strong>Summary:</strong> {result.summary}</div>
                                        </div>

                                        {result.files?.length > 0 && (
                                            <div className="report-section">
                                                <h3>Analyzed Files</h3>
                                                <ul className="file-list">
                                                    {result.files.map((f, i) => (
                                                        <li key={`${f.name}-${i}`} className="file-item">
                                                            <span className="file-name">{f.name}</span>
                                                            <span className="file-size">{(f.size / 1024).toFixed(1)} KB</span>
                                                            <span className="file-type">{f.type || "unknown"}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </section>

                        <aside className="summary-section">
                            <div className="summary-pane">
                                <h2 className="summary-title">Report Summary</h2>
                                {!result ? (
                                    <div className="summary-empty">No data</div>
                                ) : (
                                    <div className="summary-cards">
                                        <div className="summary-card">
                                            <div className="summary-key">Files</div>
                                            <div className="summary-val">{result.count}</div>
                                        </div>
                                        <div className="summary-card">
                                            <div className="summary-key">Created</div>
                                            <div className="summary-val small">
                                                {new Date(result.createdAt).toLocaleString()}
                                            </div>
                                        </div>
                                        <div className="summary-card">
                                            <div className="summary-key">Status</div>
                                            <div className="summary-val ok">Completed</div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="summary-actions">
                                <button
                                    className="btn pill primary"
                                    type="button"
                                    onClick={handleDownloadReport}
                                    disabled={!result}
                                >
                                    <FiDownload className="btn-ic-left" />
                                    <span>Report Download</span>
                                </button>

                                <button
                                    className="btn pill ghost"
                                    type="button"
                                    onClick={() => navigate("/upload")}
                                >
                                    <FiUpload className="btn-ic-left" />
                                    <span>Upload Another File</span>
                                </button>
                            </div>
                        </aside>
                    </main>
                </div>
            </div>
        </div>
    );
}
