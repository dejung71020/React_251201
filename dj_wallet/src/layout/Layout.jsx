// src/layout/Layout.jsx
import Header from "../components/Header";

// children: 이 레이아웃 안에 들어올 내용물(Home, Stats 등)을 뜻하는 약속된 단어입니다.
export default function Layout({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f9f9f9" }}>
      {" "}
      {/* 전체 배경색 연한 회색 */}
      {/* 1. 지붕 (헤더) */}
      <Header />
      {/* 2. 내용물 (페이지들이 들어올 공간) */}
      <main style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        {children}
      </main>
    </div>
  );
}
