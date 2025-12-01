// src/components/ExpenseChart.jsx
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useExpense } from "../context/ExpenseContext";

// 차트에 쓸 예쁜 색깔들 (순서대로 적용됨)
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

export default function ExpenseChart() {
  const { transactions } = useExpense();

  // 1. 데이터 가공하기 (지출만 골라서 -> 카테고리별로 합치기)
  const expenseData = transactions
    .filter((t) => t.type === "expense") // 지출만 필터링
    .reduce((acc, curr) => {
      // 이미 이 카테고리가 목록에 있나 확인
      const existing = acc.find((item) => item.name === curr.category);

      if (existing) {
        existing.value += curr.amount; // 있으면 금액 더하기
      } else {
        acc.push({ name: curr.category, value: curr.amount }); // 없으면 새로 추가
      }
      return acc;
    }, []);

  // 지출 내역이 하나도 없으면 메시지 띄우기
  if (expenseData.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "#888" }}>
        지출 내역이 있어야 차트가 나옵니다!
      </div>
    );
  }

  return (
    <div
      style={{
        height: "300px",
        width: "100%",
        background: "white",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "0" }}>
        📊 지출 카테고리 분석
      </h3>

      {/* 2. Recharts 라이브러리로 차트 그리기 */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={expenseData}
            cx="50%" // 차트 중심 X좌표
            cy="50%" // 차트 중심 Y좌표
            innerRadius={60} // 도넛 모양 안쪽 반지름
            outerRadius={80} // 도넛 모양 바깥쪽 반지름
            paddingAngle={5} // 조각 사이 간격
            dataKey="value" // 어떤 값을 기준으로 자를지
          >
            {/* 데이터 개수만큼 돌면서 색칠하기 */}
            {expenseData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value.toLocaleString()}원`} />{" "}
          {/* 마우스 올리면 금액 표시 */}
          <Legend verticalAlign="bottom" height={36} /> {/* 하단 범례 */}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
