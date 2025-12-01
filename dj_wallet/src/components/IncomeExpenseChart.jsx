// src/components/IncomeExpenseChart.jsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { useExpense } from "../context/ExpenseContext";

export default function IncomeExpenseChart() {
  const { transactions } = useExpense();

  // 1. 수입 총합 계산
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  // 2. 지출 총합 계산
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  // 3. 잔액 계산 (수입 - 지출)
  const balance = totalIncome - totalExpense;

  // 4. 차트용 데이터 만들기 (잔액 추가!)
  const data = [
    { name: "수입", amount: totalIncome, color: "#4caf50" }, // 초록색
    { name: "지출", amount: totalExpense, color: "#f44336" }, // 빨간색
    { name: "잔액", amount: balance, color: "#2196f3" }, // 파란색 (NEW!)
  ];

  // 데이터가 하나도 없으면 표시 안 함
  if (totalIncome === 0 && totalExpense === 0) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "#ccc" }}>
        데이터가 없습니다.
      </div>
    );
  }

  return (
    <div
      style={{
        height: "350px",
        width: "100%",
        background: "white",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        marginBottom: "20px",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
        💰 수입 vs 지출 vs 잔액
      </h3>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          {/* 금액이 0보다 작을 수도 있으니 Y축이 자동으로 조절되게 둠 */}
          <YAxis />
          <Tooltip
            formatter={(value) => `${value.toLocaleString()}원`}
            cursor={{ fill: "transparent" }}
          />

          {/* 0원 기준선 (적자일 때 막대가 아래로 내려가니까 기준선이 필요해요) */}
          <ReferenceLine y={0} stroke="#000" />

          <Bar dataKey="amount" barSize={50}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
