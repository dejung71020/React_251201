// src/pages/Home.jsx
import { useExpense } from "../context/ExpenseContext";
import TransactionForm from "../components/TransactionForm";
import SummaryCards from "../components/SummaryCards"; // 👈 1. 여기 추가!

export default function Home() {
  const { transactions, deleteTransaction } = useExpense();

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>🏠 나의 자산 흐름</h2>

      {/* 2. 여기에 요약 카드 배치! (입력 폼보다 위에 두는 게 좋겠죠?) */}
      <SummaryCards />

      {/* 입력 폼 */}
      <TransactionForm />

      {/* 리스트 보여주기 */}
      <div style={{ marginTop: "20px" }}>
        <h3>📋 최근 내역 ({transactions.length}건)</h3>
        {/* ... (아래 리스트 코드는 아까와 동일합니다) ... */}
        {transactions.length === 0 ? (
          <p style={{ color: "#888", textAlign: "center" }}>
            아직 내역이 없습니다.
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {transactions.map((item) => (
              <li
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "15px",
                  borderBottom: "1px solid #eee",
                  background: item.type === "income" ? "#f0fdf4" : "white",
                }}
              >
                <div>
                  <div style={{ fontSize: "12px", color: "#888" }}>
                    {item.date} | {item.category}
                  </div>
                  <div style={{ fontWeight: "bold" }}>{item.memo}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontWeight: "bold",
                      color: item.type === "income" ? "green" : "red",
                    }}
                  >
                    {item.type === "income" ? "+" : "-"}
                    {item.amount.toLocaleString()}원
                  </div>
                  <button
                    onClick={() => deleteTransaction(item.id)}
                    style={{
                      fontSize: "12px",
                      color: "#aaa",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
