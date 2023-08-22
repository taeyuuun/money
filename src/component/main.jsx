import React, { useState } from "react";
import styled from "styled-components";

function ExpenseTracker() {
  const [place, setPlace] = useState("");
  const [amount, setAmount] = useState("");
  const [history, setHistory] = useState([]);

  const handleCalculate = () => {
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount)) {
      alert("사용한 돈의 양은 숫자여야 합니다.");
      return;
    }

    const total = place + "에서 " + parsedAmount + "원";
    
    const newHistory = [...history, total];
    setHistory(newHistory);

    setPlace("");
    setAmount("");
  };

  return (
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
        <ButtonContainer>
          <ConfirmButton onClick={handleCalculate}>추가</ConfirmButton>
        </ButtonContainer>
      </InputContainer>
      <Result>
        <HistoryList>
          {history.map((item, index) => (
            <HistoryItem key={index}>{item}</HistoryItem>
          ))}
        </HistoryList>
      </Result>
    </Wrapper>
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
  margin-top: 20px;
`;

const HistoryList = styled.ul`
  list-style: none;
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const HistoryItem = styled.li`
  padding: 10px;
  font-size: 12px;
  border-bottom: 1px solid #ccc;
`;

export default ExpenseTracker;
