import "./home.css";
import logo from "../../assets/logo.png";
import badge from "../../assets/벡터.png"; // ← 오른쪽에 넣을 이미지

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

        <main className="main">
          <div className="text-box">
            <h1>
              LLM-powered <br />
              Vulnerability Reporter <br />
              for your Open Source
            </h1>
            <p>
              Protect vulnerabilities in your codebase with the power of LLMs and static analysis<br />
              - No more vulnerabilities: LV.0
            </p>
            <button className="get-started">Get Started ↗</button>
          </div>

          <div className="image-box">
            <img src={badge} alt="Security badge" />
          </div>
        </main>
      </div>
    </div>
  );
}
