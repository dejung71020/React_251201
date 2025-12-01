// src/context/ExpenseContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid"; // 고유 ID 생성 도구

// 1. 컨텍스트(데이터 저장소) 생성
const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  // 2. 상태 초기화: 로컬스토리지에 데이터가 있으면 가져오고, 없으면 빈 배열 []
  const [transactions, setTransactions] = useState(() => {
    const savedData = localStorage.getItem("dj_wallet_data");
    return savedData ? JSON.parse(savedData) : [];
  });

  // 3. 감시자: transactions 데이터가 바뀔 때마다 로컬스토리지에 자동 저장
  useEffect(() => {
    localStorage.setItem("dj_wallet_data", JSON.stringify(transactions));
  }, [transactions]);

  // 4. 기능: 지출/수입 추가
  const addTransaction = ({ date, type, category, amount, memo }) => {
    const newTransaction = {
      id: uuidv4(), // 주민등록번호처럼 고유한 ID 생성
      date, // 날짜 (YYYY-MM-DD)
      type, // 'income'(수입) 또는 'expense'(지출)
      category, // 식비, 교통비 등
      amount: Number(amount), // 숫자로 확실하게 변환
      memo, // 메모
    };
    // 기존 목록의 '앞'에 새 데이터를 붙임 (최신순 정렬 효과)
    setTransactions([newTransaction, ...transactions]);
  };

  // 5. 기능: 삭제
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((item) => item.id !== id));
  };

  const resetData = () => {
    setTransactions([]); // 빈 배열로 만들면 끝! (LocalStorage도 자동으로 비워짐)
  };

  return (
    <ExpenseContext.Provider
      value={{ transactions, addTransaction, deleteTransaction, resetData }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

// 6. 훅: 다른 컴포넌트에서 쉽게 갖다 쓰기 위해 만든 함수
export function useExpense() {
  return useContext(ExpenseContext);
}
