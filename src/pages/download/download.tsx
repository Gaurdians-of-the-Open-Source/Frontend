import "./download.css";
import logo from "../../assets/logo.png";
import { FiDownload, FiUpload } from "react-icons/fi";

export default function Report() {
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


                <main className="report-layout">
                    <section className="report-pane">
                        <div className="pane-head">
                            <img src={logo} alt="LV.0" className="pane-logo" />
                            <h2>Vulnerability Report</h2>
                        </div>
                        <div className="report-scroll"> </div>
                    </section>
                    <aside className="summary-section">
                        <div className="summary-pane">
                            <h2 className="summary-title">Report Summary</h2>
                        </div>

                        <div className="summary-actions">
                            <button className="btn pill primary">
                                <FiDownload className="btn-ic-left" />
                                <span>Report Download</span>
                            </button>
                            <label className="btn pill ghost" htmlFor="file-input">
                                <FiUpload className="btn-ic-left" />
                                <span>Upload Another File</span>
                            </label>
                            <input id="file-input" type="file" hidden />
                        </div>
                    </aside>

                </main>
            </div>
        </div>
    );
}
