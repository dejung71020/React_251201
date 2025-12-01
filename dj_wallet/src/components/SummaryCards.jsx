// src/components/SummaryCards.jsx
import { useExpense } from "../context/ExpenseContext";

export default function SummaryCards() {
  const { transactions } = useExpense(); // 장부 가져오기

  // 1. 수입 총액 계산하기
  // (설명: 장부에서 type이 'income'인 것만 골라서, 금액(amount)을 계속 더해라)
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  // 2. 지출 총액 계산하기
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  // 3. 잔액 계산하기 (수입 - 지출)
  const balance = totalIncome - totalExpense;

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      {/* 🟢 수입 카드 */}
      <div
        style={{
          flex: 1,
          padding: "15px",
          background: "#e6f4ea",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "12px", color: "#555" }}>총 수입</div>
        <div style={{ fontSize: "18px", fontWeight: "bold", color: "green" }}>
          +{totalIncome.toLocaleString()}원
        </div>
      </div>

      {/* 🔴 지출 카드 */}
      <div
        style={{
          flex: 1,
          padding: "15px",
          background: "#fce8e6",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "12px", color: "#555" }}>총 지출</div>
        <div style={{ fontSize: "18px", fontWeight: "bold", color: "red" }}>
          -{totalExpense.toLocaleString()}원
        </div>
      </div>

      {/* ⚫ 잔액 카드 */}
      <div
        style={{
          flex: 1,
          padding: "15px",
          background: "#f5f5f5",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "12px", color: "#555" }}>남은 돈</div>
        <div style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>
          {balance.toLocaleString()}원
        </div>
      </div>
    </div>
  );
}
