import React, { useState, useRef } from "react";
import "./upload.css";
//파일 리스트 관리, 추가, 삭제, UI 렌더링은 프론트 기능
//업로드 진행률 처리 및 중단 처리가 시뮬레이션 (나중에 백엔드 연동시 교체해야함)

import logo from "../../assets/logo.png";

import { FaCloudUploadAlt } from "react-icons/fa";
import { TbFileTypeZip } from "react-icons/tb";
import { BsTrash } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { ImSpinner3 } from "react-icons/im";
import { CgCheckO } from "react-icons/cg";

export default function Upload() {
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);

  // 파일 추가 (중복 검사 포함)
  const addFiles = (newFiles) => {
    const fileArr = Array.from(newFiles);
    setFiles((prev) => {
      // 중복된 파일명 걸러내기
      const existingNames = prev.map((f) => f.file.name);
      const filtered = fileArr.filter((f) => !existingNames.includes(f.name));
      // 새 파일 객체에 상태 초기값 넣기
      const newFileObjs = filtered.map((file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        file,
        status: "ready", // ready, uploading, done, error, canceled
        progress: 0,
      }));
      return [...prev, ...newFileObjs];
    });
  };

  // 파일 삭제
  const deleteFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // 중단 버튼 (업로드 중단 시뮬)
  const cancelUpload = (id) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, status: "canceled", progress: 0 } : f
      )
    );
  };

  // 파일 업로드 시뮬레이션 (진행률 증가)
  // 나중에 실제 백엔드 업로드 함수로 교체할 예정
  const startUpload = (fileObj) => {
    if (fileObj.status !== "ready") return;

    setFiles((prev) =>
      prev.map((f) =>
        f.id === fileObj.id ? { ...f, status: "uploading", progress: 0 } : f
      )
    );

    // 현재는 단순 시뮬레이션 코드
    // 실제 업로드 로직으로 교체할 때 바꿀것!
    const interval = setInterval(() => {
      setFiles((prev) => {
        return prev.map((f) => {
          if (f.id === fileObj.id) {
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
          }
          return f;
        });
      });
    }, 300);
  };

  // 파일 선택 이벤트
  const onFileChange = (e) => {
    addFiles(e.target.files);
    e.target.value = null; // 같은 파일 선택시도 가능하게 초기화
  };

  // 드래그앤드롭 이벤트
  const onDrop = (e) => {
    e.preventDefault();
    addFiles(e.dataTransfer.files);
  };
  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="wrapper">
      <div className="ratio-box">
        <header className="header">
          <div className="left-box">
            <img src={logo} alt="LV.0 Logo" className="logo" />
            <div className="nav-group">
              <a href="#home" className="nav-item">
                home
              </a>
              <a href="#about" className="nav-item">
                about
              </a>
              <a href="#how" className="nav-item">
                how it works
              </a>
              <a href="#project" className="nav-item">
                project
              </a>
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

        {/* 메인 컨텐츠 */}
        <div className="main">
          {/* 업로드 박스 */}
          <div
            className="upload-box"
            onDrop={onDrop}
            onDragOver={onDragOver}
            onClick={() => inputRef.current?.click()}
          >
            <div className="upload-content">
              <FaCloudUploadAlt
                size={48}
                color="#13113b"
                className="upload-icon"
              />
              <span className="upload-text">
                Choose a file or drag & drop it here
              </span>
              <span className="upload-text2">ZIP formats, up to 100 MB</span>
            </div>

            <label htmlFor="file-upload" className="browse-btn">
              Browse File
            </label>
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

          {/* 파일 리스트 */}
          <div style={{ width: "500px" }}>
            {files.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  color: "#777",
                  marginTop: "1rem",
                  fontSize: "18px",
                }}
              >
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
                    <div
                      className={`progress-bar ${status}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <div className="file-status-icon">
                  {status === "uploading" && (
                    <ImSpinner3
                      className="spin"
                      size={22}
                      color="#5677fc"
                    />
                  )}
                  {status === "done" && <CgCheckO size={22} color="#00c851" />}
                  {status === "canceled" && (
                    <AiOutlineClose size={22} color="#ff4444" />
                  )}
                  {status === "ready" && null}
                </div>

                <div className="file-action-btns">
                  {status === "uploading" && (
                    <button
                      className="icon-btn cancel-btn"
                      onClick={(e) => {
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
                      onClick={(e) => {
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
                    onClick={(e) => {
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
          </div>
        </div>
      </div>
    </div>
  );
}
