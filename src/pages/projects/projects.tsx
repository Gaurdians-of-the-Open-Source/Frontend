import "./projects.css";
import {
    FaCheckCircle,
    FaClock,
    FaExclamationCircle,
    FaFolderOpen,
    FaDownload,
    FaFileArchive,
} from "react-icons/fa";
import logo from "../../assets/logo.png";

type Row = {
    filename: string;
    status: "Analyzed" | "In progress" | "Error";
    uploaded: string;
    hasReport: boolean;
};

export default function ProjectDetail() {
    const rows: Row[] = [
        { filename: "maerong.zip", status: "Analyzed", uploaded: "July 19, 2025 12:30", hasReport: true },
        { filename: "ransomware.zip", status: "In progress", uploaded: "July 19, 2025 12:30", hasReport: false },
        { filename: "archive.zip", status: "Error", uploaded: "July 19, 2025 12:30", hasReport: false },
    ];

    return (
        <div className="wrapper">
            <div className="ratio-box">
                {/* 상단 헤더 */}
                <header className="header">
                    <div className="left-box">
                        <img src={logo} alt="LV.0 Logo" className="logo" />
                        <div className="nav-group">
                            <a href="#home" className="nav-item">home</a>
                            <a href="#about" className="nav-item">about</a>
                            <a href="#how" className="nav-item">how it works</a>
                            <a href="#project" className="nav-item active">project</a>
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

                {/* 프로젝트 카드 */}
                <main className="project-card">
                    <h1 className="project-title">Project: Malware Dataset</h1>

                    {/* 필터/검색 */}
                    <div className="project-controls">
                        <select className="status-filter">
                            <option>Status : All</option>
                            <option>Analyzed</option>
                            <option>In progress</option>
                            <option>Error</option>
                        </select>
                        <input type="text" className="search-input" placeholder="Search Files" />
                    </div>

                    {/* 표: 헤더 고정, 바디만 스크롤 */}
                    <div className="file-table">
                        <div className="file-header">
                            <span>Filename</span>
                            <span>Status</span>
                            <span>Uploaded</span>
                            <span>Report</span>
                        </div>

                        <div className="file-body">
                            {rows.map((row, idx) => (
                                <div className="file-row" key={idx}>
                                    <div className="file-name">
                                        <FaFileArchive /> {row.filename}
                                    </div>
                                    <div className={`file-status ${row.status.replace(" ", "-").toLowerCase()}`}>
                                        {row.status === "Analyzed" && <FaCheckCircle />}
                                        {row.status === "In progress" && <FaClock />}
                                        {row.status === "Error" && <FaExclamationCircle />}
                                        <span>{row.status}</span>
                                    </div>
                                    <div className="file-date">{row.uploaded}</div>
                                    <div className="file-report">
                                        {row.hasReport ? (
                                            <button className="view-btn">View &gt;</button>
                                        ) : (
                                            <span className="no-report">—</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 하단 버튼 */}
                    <div className="project-actions">
                        <button className="upload-btn"><FaFolderOpen /> Upload File</button>
                        <button className="download-btn"><FaDownload /> Download All</button>
                    </div>
                </main>
            </div>
        </div>
    );
}
