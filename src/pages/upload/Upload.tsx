import React, { useState, useRef } from "react";
import "./upload.css";
import logo from "../../assets/logo.png";

import { FaCloudUploadAlt } from "react-icons/fa";
import { TbFileTypeZip } from "react-icons/tb";
import { BsTrash } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { ImSpinner3 } from "react-icons/im";
import { CgCheckO } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

// 파일 아이템 타입 정의
type UploadStatus = "ready" | "uploading" | "done" | "error" | "canceled";
interface FileItem {
  id: string;
  file: File;
  status: UploadStatus;
  progress: number;
}

export default function Upload() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  // 파일 추가 (중복 검사)
  const addFiles = (newFiles: FileList | File[]) => {
    const incoming = Array.from(newFiles);

    setFiles((prev) => {
      const existingNames = new Set(prev.map((f) => f.file.name));
      const filtered = incoming.filter((f) => !existingNames.has(f.name));
      const newFileObjs: FileItem[] = filtered.map((file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        file,
        status: "ready",
        progress: 0,
      }));
      return [...prev, ...newFileObjs];
    });
  };

  const deleteFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const cancelUpload = (id: string) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, status: "canceled", progress: 0 } : f
      )
    );
  };

  const startUpload = (fileObj: FileItem) => {
    if (fileObj.status !== "ready") return;

    setFiles((prev) =>
      prev.map((f) =>
        f.id === fileObj.id ? { ...f, status: "uploading", progress: 0 } : f
      )
    );

    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) => {
          if (f.id !== fileObj.id) return f;
          if (f.status !== "uploading") {
            clearInterval(interval);
            return f;
          }
          const nextProgress = f.progress + Math.floor(Math.random() * 15) + 5;
          if (nextProgress >= 100) {
            clearInterval(interval);
            return { ...f, status: "done", progress: 100 };
          }
          return { ...f, progress: nextProgress };
        })
      );
    }, 300);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    e.target.value = "";
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Start analyzing 버튼
  const handleStartAnalyzing = () => {
    if (!files.length) return;
    const filesMeta = files.map((f) => ({
      name: f.file.name,
      size: f.file.size,
      type: f.file.type,
    }));
    navigate("/loading", { state: { filesMeta } });
  };

  return (
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
            <select className="lang-select">
              <option>English</option>
              <option>한국어</option>
            </select>
            <button className="contact-btn">Contact us</button>
          </div>
        </header>

        <div className="main">
          {/* 업로드 박스 */}
          <div
            className="upload-box"
            onDrop={onDrop}
            onDragOver={onDragOver}
            onClick={() => inputRef.current?.click()}
          >
            <div className="upload-content">
              <FaCloudUploadAlt size={48} color="#13113b" className="upload-icon" />
              <span className="upload-text">Choose a file or drag & drop it here</span>
              <span className="upload-text2">ZIP formats, up to 100 MB</span>
            </div>

            <label htmlFor="file-upload" className="browse-btn">Browse File</label>
            <input
              ref={inputRef}
              id="file-upload"
              type="file"
              accept=".zip"
              multiple
              onChange={onFileChange}
              style={{ display: "none" }}
            />
          </div>

          {/* 파일 리스트 + Start analyzing 버튼 */}
          <div style={{ width: "500px" }}>
            {files.length === 0 && (
              <div style={{ textAlign: "center", color: "#777", marginTop: "1rem", fontSize: "18px" }}>
                No files selected.
              </div>
            )}

            {files.map(({ id, file, status, progress }) => (
              <div key={id} className="file-row">
                <div className="file-icon">
                  <TbFileTypeZip size={28} color="#5677fc" />
                </div>

                <div className="file-info" title={file.name}>
                  <div className="file-name">{file.name}</div>
                  <div className="progress-bar-wrapper">
                    <div className={`progress-bar ${status}`} style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className="file-status-icon">
                  {status === "uploading" && <ImSpinner3 className="spin" size={22} color="#5677fc" />}
                  {status === "done" && <CgCheckO size={22} color="#00c851" />}
                  {status === "canceled" && <AiOutlineClose size={22} color="#ff4444" />}
                </div>

                <div className="file-action-btns">
                  {status === "uploading" && (
                    <button
                      className="icon-btn cancel-btn"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        cancelUpload(id);
                      }}
                      title="Cancel upload"
                    >
                      <AiOutlineClose size={20} />
                    </button>
                  )}

                  {status === "ready" && (
                    <button
                      className="icon-btn start-btn"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        startUpload({ id, file, status, progress });
                      }}
                      title="Start upload"
                    >
                      ▶
                    </button>
                  )}

                  <button
                    className="icon-btn delete-btn"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      deleteFile(id);
                    }}
                    title="Delete file"
                  >
                    <BsTrash size={18} />
                  </button>
                </div>

                <div className="file-progress-text">{progress}%</div>
              </div>
            ))}

            {/* Start analyzing 버튼 */}
            <div className="analyze-cta">
              <button
                className="analyze-btn"
                disabled={!files.length}
                onClick={handleStartAnalyzing}
              >
                Start analyzing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
