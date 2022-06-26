import React, { useRef, useState, useCallback } from "react";
import Try from "./Try";

const getNumbers = () => {
  // 숫자 네 개를 겹치지 않게 랜덤하게 뽑는 함수
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const arr = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    arr.push(chosen);
  }
  return arr;
};

const Numberbaseball = () => {
  const [answer, setAnswer] = useState(getNumbers); //getNumbers()를 써버리면 lazy init 불가, 리렌더링시 계속 함수호출되어 getNumbers로 작성
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [tries, setTries] = useState([]);
  const inputEl = useRef(null);

  const handleOnChange = (event) => {
    setValue(event.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (value === answer.join("")) {
      setResult("홈런!");
      setTries((prevTries) => [
        ...prevTries,
        {
          try: value,
          result: "홈런!",
        },
      ]);
      setResult('홈런!');
      alert('게임을 다시 실행합니다.');
      setValue('');
      setAnswer(getNumbers()); //여기서는 호출
      setTries([]);
      inputEl.current.focus();
    } else {
      const answerArray = value.split("").map((el) => parseInt(el)); //input창에 넣은 value값 Number 타입변환
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setResult(`실패! 답은 ${answer.join("")} 입니다!`);
        alert("게임을 다시 시작합니다!");
        setValue("");
        setAnswer(getNumbers()); //여기서는 호출
        setTries([]);
        inputEl.current.focus();
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setTries((prevTries) => [
          ...prevTries,
          {
            try: value,
            result: `${strike} 스트라이크, ${ball} 볼입니다.`,
          },
        ]);
        setValue("");
        inputEl.current.focus();
      }
    }
  };

  return (
    <>
      <h1>숫자야구</h1>
      <h2>{result}</h2>
      <form onSubmit={handleOnSubmit}>
        <input ref={inputEl} maxLength={4} value={value} onChange={handleOnChange} />
      </form>
      <div>시도 : {tries.length}</div>
      <ul>
        {tries.map((v, i) => (
          <Try key={`${i + 1}차 시도 : ${v.try}`} tryInfo={v} />
        ))}
      </ul>
    </>
  );
};

export default Numberbaseball;
