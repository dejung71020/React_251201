// src/pages/Stats.jsx
import ExpenseChart from "../components/ExpenseChart";
import IncomeExpenseChart from "../components/IncomeExpenseChart"; // 👈 1. 새로 만든 차트 불러오기
import { useExpense } from "../context/ExpenseContext";

export default function Stats() {
  const { transactions } = useExpense();

  // 지출 총액 (상단 표시용)
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  // 수입 총액 (이번에 추가!)
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  // 잔액
  const balance = totalIncome - totalExpense;

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>📈 이달의 소비 리포트</h2>

      {/* 2. 상단 요약 멘트 업그레이드 */}
      <div
        style={{ marginBottom: "30px", fontSize: "16px", lineHeight: "1.6" }}
      >
        이번 달은{" "}
        <strong style={{ color: "green" }}>
          {totalIncome.toLocaleString()}원
        </strong>
        을 벌고,
        <br />
        <strong style={{ color: "red" }}>
          {totalExpense.toLocaleString()}원
        </strong>
        을 썼습니다.
        <br />
        현재 잔액은{" "}
        <strong
          style={{ color: balance >= 0 ? "blue" : "red", fontSize: "20px" }}
        >
          {balance.toLocaleString()}원
        </strong>{" "}
        입니다.
      </div>

      {/* 3. 수입 vs 지출 비교 막대 차트 (여기에 배치!) */}
      <IncomeExpenseChart />

      {/* 4. 기존 카테고리별 파이 차트 */}
      <ExpenseChart />

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          background: "#e3f2fd",
          borderRadius: "10px",
        }}
      >
        💡 <strong>분석 팁:</strong>
        <br />
        지출 막대(빨강)가 수입 막대(초록)보다 길다면 과소비 상태입니다! 🚨
      </div>
    </div>
  );
}
