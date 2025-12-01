// src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      {/* 임시 네비게이션 (나중에 예쁜 헤더로 바꿀 거예요) */}
      <nav
        style={{
          marginBottom: "20px",
          borderBottom: "1px solid #ddd",
          paddingBottom: "10px",
        }}
      >
        <Link to="/" style={{ marginRight: "10px" }}>
          홈
        </Link>
        <Link to="/stats" style={{ marginRight: "10px" }}>
          통계
        </Link>
        <Link to="/settings">설정</Link>
      </nav>

      {/* 화면이 바뀌는 부분 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
