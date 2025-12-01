// src/pages/Home.jsx
import { useExpense } from "../context/ExpenseContext";
import TransactionForm from "../components/TransactionForm"; // 👈 방금 만든 부품 가져오기

export default function Home() {
  const { transactions, deleteTransaction } = useExpense();

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      {" "}
      {/* 가운데 정렬 */}
      <h2>🏠 나의 자산 흐름</h2>
      {/* 1. 입력 폼 컴포넌트 배치 */}
      <TransactionForm />
      {/* 2. 리스트 보여주기 */}
      <div style={{ marginTop: "20px" }}>
        <h3>📋 최근 내역 ({transactions.length}건)</h3>

        {transactions.length === 0 ? (
          <p style={{ color: "#888", textAlign: "center" }}>
            아직 내역이 없습니다. 위에서 추가해보세요!
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
                  background: item.type === "income" ? "#f0fdf4" : "white", // 수입이면 연한 초록색 배경
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
