import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";

function ExpenseTracker() {
  const [place, setPlace] = useState("");
  const [amount, setAmount] = useState("");
  const [history, setHistory] = useState([]);
  const [일일평균, set일일평균] = useState(0);

  useEffect(() => {
    const savedHistory = Cookies.getJSON("expenseHistory");
    const savedPlace = Cookies.get("expensePlace");
    const savedAmount = Cookies.get("expenseAmount");

    if (savedHistory) {
      setHistory(savedHistory);
    }
    if (savedPlace) {
      setPlace(savedPlace);
    }
    if (savedAmount) {
      setAmount(savedAmount);
    }
  }, []);

  useEffect(() => {
    Cookies.set("expenseHistory", history);
    Cookies.set("expensePlace", place);
    Cookies.set("expenseAmount", amount);
  }, [history, place, amount]);

  const handleCalculate = () => {
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount)) {
      alert("사용한 돈의 양은 숫자여야 합니다.");
      return;
    }

    const currentDate = new Date().toLocaleDateString();

    const updatedHistory = [...history];
    const existingEntry = updatedHistory.find((entry) => entry.date === currentDate);

    if (existingEntry) {
      existingEntry.expenses.push({
        place,
        amount: parsedAmount,
      });
    } else {
      updatedHistory.push({
        date: currentDate,
        expenses: [{ place, amount: parsedAmount }],
      });
    }

    setHistory(updatedHistory);
    setPlace("");
    setAmount("");
  };

  useEffect(() => {
    const 총지출액 = history.reduce((합계, 엔트리) => {
      return 합계 + 엔트리.expenses.reduce((소계, 지출) => 소계 + 지출.amount, 0);
    }, 0);

    const 일수 = history.length || 1;
    const 일일평균 = 총지출액 / 일수;

    set일일평균(일일평균);
  }, [history]);

  return (
    <div>
      <Wrapper>
        <Title>가계부</Title>
        <InputContainer>
          <InputField
            placeholder="돈을 쓴 곳"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
          <InputField
            placeholder="사는데 썼던 돈의 양"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div>
            <strong>일일 평균 치출: {일일평균.toFixed(2)}원</strong>
          </div>
          <ButtonContainer>
            <ConfirmButton onClick={handleCalculate}>+</ConfirmButton>
          </ButtonContainer>
        </InputContainer>
      </Wrapper>
      <Result>
        {history.map((entry, index) => (
          <div key={index}>
            <DateHeader>{entry.date}</DateHeader>
            <HistoryList>
              {entry.expenses.map((expense, i) => (
                <HistoryItem key={i}>
                  {expense.place}에서 {expense.amount}원
                </HistoryItem>
              ))}
            </HistoryList>
          </div>
        ))}
      </Result>
    </div>
  );
}

const Wrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;


const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputField = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  text-align: center;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: #000000;
  }
`;

const Result = styled.div`
  max-width: 420px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  list-style-type: none;
  padding-left: 0;
`;

const DateHeader = styled.h2`
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const HistoryList = styled.ul`
  list-style: none;
  padding: 0;
`;

const HistoryItem = styled.li`
  padding: 10px;
  font-size: 12px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 5px;
`;

export default ExpenseTracker;
