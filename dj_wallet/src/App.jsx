// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout"; // 👈 액자 틀 가져오기
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";

function App() {
  return (
    // Layout으로 전체를 감쌉니다.
    // 그러면 Layout 안에 있는 {children} 자리에 아래의 Routes가 쏙 들어갑니다.
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
}

export default App;
