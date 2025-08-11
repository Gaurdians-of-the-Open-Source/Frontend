import React, { useEffect, useMemo, useState } from "react";
import "../home/home.css";
import "./project.css";
import logo from "../../assets/logo.png";
import { PiFolderSimpleFill } from "react-icons/pi";

type ProjectItem = { id: number; name: string };

const PAGE_SIZE = 6;
const LS_KEY = "lv0_projects_grid_v4";

export default function ProjectPage() {
    const [projects, setProjects] = useState<ProjectItem[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
            try {
                setProjects(JSON.parse(saved));
            } catch { }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(projects));
    }, [projects]);

    const pageCount = Math.max(1, Math.ceil((projects.length + 1) / PAGE_SIZE));

    const currentPageItems = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return projects.slice(start, start + PAGE_SIZE);
    }, [projects, page]);

    const handleAdd = () => {
        const nextNum = projects.length + 1;
        const next = [...projects, { id: Date.now(), name: `Project ${nextNum}` }];
        setProjects(next);
        const isCurrentFull = currentPageItems.length >= PAGE_SIZE;
        if (isCurrentFull) {
            const nextPageCount = Math.ceil((next.length + 1) / PAGE_SIZE);
            setPage(nextPageCount);
        }
    };

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
                            <a href="#project" className="nav-item active">project</a>
                        </div>
                    </div>

                    <div className="right-buttons">
                        <select className="lang-select" aria-label="Language">
                            <option>English</option>
                            <option>한국어</option>
                        </select>
                        <button className="contact-btn">Contact us</button>
                    </div>
                </header>

                <main className="content">
                    {projects.length === 0 ? (
                        <div className="center-wrap">
                            <button
                                className="project-card new"
                                onClick={handleAdd}
                                title="Create New Project"
                                aria-label="Create New Project"
                            >
                                <div className="folder-with-text">
                                    <PiFolderSimpleFill className="folder-icon" />
                                    <span className="plus">+</span>
                                    <span className="folder-label">New Project</span>
                                </div>
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="project-grid fixed-3x2">
                                {currentPageItems.map((p) => (
                                    <button
                                        key={p.id}
                                        className="project-card"
                                        title={p.name}
                                        aria-label={p.name}
                                    >
                                        <div className="folder-with-text">
                                            <PiFolderSimpleFill className="folder-icon" />
                                            <span className="folder-label">{p.name}</span>
                                        </div>
                                    </button>
                                ))}

                                {currentPageItems.length < PAGE_SIZE && (
                                    <button
                                        className="project-card new"
                                        onClick={handleAdd}
                                        title="Create New Project"
                                        aria-label="Create New Project"
                                    >
                                        <div className="folder-with-text">
                                            <PiFolderSimpleFill className="folder-icon" />
                                            <span className="plus">+</span>
                                            <span className="folder-label">New Project</span>
                                        </div>
                                    </button>
                                )}
                            </div>


                            <nav className="pagination" aria-label="Projects pagination">
                                <button
                                    className="page-btn arrow"
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    aria-label="Previous page"
                                >
                                    ‹
                                </button>

                                {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                                    <button
                                        key={n}
                                        onClick={() => setPage(n)}
                                        className={`page-btn number ${page === n ? "active" : ""}`}
                                        aria-current={page === n ? "page" : undefined}
                                    >
                                        {n}
                                    </button>
                                ))}

                                <button
                                    className="page-btn arrow"
                                    onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                                    disabled={page === pageCount}
                                    aria-label="Next page"
                                >
                                    ›
                                </button>
                            </nav>

                        </>
                    )}
                </main>
            </div>
        </div>
    );
}
