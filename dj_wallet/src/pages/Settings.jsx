// src/pages/Settings.jsx
import { useExpense } from "../context/ExpenseContext";

export default function Settings() {
  const { resetData, transactions } = useExpense();

  const handleReset = () => {
    // 🛑 안전장치: 사용자에게 한 번 더 물어봄
    const isConfirmed = window.confirm(
      "정말로 모든 기록을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다!"
    );

    if (isConfirmed) {
      resetData(); // '예'를 눌렀을 때만 실행
      alert("모든 데이터가 초기화되었습니다.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "30px" }}>⚙️ 설정</h2>

      {/* 데이터 관리 섹션 */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <h3 style={{ marginTop: 0 }}>데이터 관리</h3>
        <p style={{ color: "#666", fontSize: "14px" }}>
          현재 저장된 내역: <strong>{transactions.length}건</strong>
        </p>

        <p style={{ color: "#888", fontSize: "12px", marginBottom: "20px" }}>
          모든 수입/지출 내역을 삭제하고 초기 상태로 되돌립니다.
          <br />
          삭제된 데이터는 복구할 수 없습니다.
        </p>

        {/* 빨간색 위험 버튼 */}
        <button
          onClick={handleReset}
          style={{
            background: "#ff4d4d",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🗑️ 모든 데이터 초기화
        </button>
      </div>

      {/* 앱 정보 섹션 (보너스) */}
      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
          color: "#aaa",
          fontSize: "12px",
        }}
      >
        <p>DJ_wallet Version 1.0</p>
        <p>Made with React & Vite</p>
      </div>
    </div>
  );
}
