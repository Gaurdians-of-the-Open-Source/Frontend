import "./home.css";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <div className="ratio-box">
        <header className="header">
          <div className="left-box">
            <img src={logo} alt="LV.0 Logo" className="logo" />
            <div className="nav-group">
              <Link to="/home" className="nav-item">home</Link>
              <Link to="/about" className="nav-item">about</Link>
              <Link to="/how" className="nav-item">how it works</Link>
              <Link to="/project" className="nav-item">project</Link>
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
            <button
              className="get-started"
              onClick={() => navigate("/analyzing")}
            >
              Get Started ↗
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

