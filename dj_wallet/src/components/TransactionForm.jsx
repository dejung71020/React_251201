// src/components/TransactionForm.jsx
import { useState } from "react";
import { useExpense } from "../context/ExpenseContext";

export default function TransactionForm() {
  const { addTransaction } = useExpense(); // 뇌(Context)에서 '추가 기능'만 빌려옴

  // 입력창에 적힌 내용들을 임시로 저장하는 곳
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // 오늘 날짜 기본
  const [type, setType] = useState("expense"); // 기본은 '지출'
  const [category, setCategory] = useState("식비");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");

  // '추가하기' 버튼 누르면 실행되는 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 중요! 버튼 눌렀을 때 페이지가 새로고침 되는 걸 막음

    // 1. 내용이 비었으면 경고
    if (!amount || !category) {
      alert("금액과 카테고리를 입력해주세요!");
      return;
    }

    // 2. 뇌(Context)로 데이터 전송!
    addTransaction({ date, type, category, amount, memo });

    // 3. 입력창 비우기 (초기화)
    setAmount("");
    setMemo("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <h3>✍️ 내역 입력</h3>

      {/* 1. 수입/지출 선택 */}
      <div style={{ marginBottom: "10px" }}>
        <label>
          <input
            type="radio"
            checked={type === "expense"}
            onChange={() => setType("expense")}
          />{" "}
          지출
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="radio"
            checked={type === "income"}
            onChange={() => setType("income")}
          />{" "}
          수입
        </label>
      </div>

      {/* 2. 날짜 & 카테고리 */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: "8px" }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option>식비</option>
          <option>교통비</option>
          <option>쇼핑</option>
          <option>월급</option>
          <option>기타</option>
        </select>
      </div>

      {/* 3. 금액 & 메모 */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          type="number"
          placeholder="금액 (원)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ padding: "8px", flex: 1 }}
        />
        <input
          type="text"
          placeholder="메모 (예: 편의점)"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          style={{ padding: "8px", flex: 2 }}
        />
      </div>

      {/* 4. 전송 버튼 */}
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          background: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        등록하기
      </button>
    </form>
  );
}
