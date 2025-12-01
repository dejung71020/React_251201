// src/components/Header.jsx
import { Link, useLocation } from "react-router-dom";
import { FaWallet, FaChartPie, FaCog } from "react-icons/fa"; // 아이콘 가져오기

export default function Header() {
  const location = useLocation(); // 현재 내가 어느 페이지에 있는지 알아내는 훅

  // 버튼 스타일을 만들어주는 함수 (현재 페이지면 색깔을 진하게!)
  const getLinkStyle = (path) => ({
    textDecoration: "none",
    color: location.pathname === path ? "#333" : "#aaa", // 현재 위치면 검은색, 아니면 회색
    fontWeight: location.pathname === path ? "bold" : "normal",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "12px",
  });

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 20px",
        background: "white",
        borderBottom: "1px solid #eee",
        position: "sticky", // 스크롤 내려도 상단에 붙어있게 함
        top: 0,
        zIndex: 100,
      }}
    >
      {/* 왼쪽: 로고 */}
      <div
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: "#007BFF",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <FaWallet /> DJ_wallet
      </div>

      {/* 오른쪽: 메뉴들 */}
      <nav style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={getLinkStyle("/")}>
          <FaWallet size={20} style={{ marginBottom: "4px" }} />
          자산
        </Link>
        <Link to="/stats" style={getLinkStyle("/stats")}>
          <FaChartPie size={20} style={{ marginBottom: "4px" }} />
          통계
        </Link>
        <Link to="/settings" style={getLinkStyle("/settings")}>
          <FaCog size={20} style={{ marginBottom: "4px" }} />
          설정
        </Link>
      </nav>
    </header>
  );
}
