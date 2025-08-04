import "./home.css";
import logo from "../../assets/logo.png";

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
          <h1>Welcome</h1>
          <p>main페이지 부분은 아직 아무것도 넣을게 없으니 빈칸으로 둘게요 </p>
        </main>
      </div>
    </div>
  );
}

