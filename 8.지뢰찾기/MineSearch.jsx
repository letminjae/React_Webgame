import React, { useReducer, createContext, useMemo } from "react";
import Form from "./Form";
import Table from "./Table";
import { CODE } from "./Code";

//createContext 안에는 기본값 삽입
export const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
});

//initalState
const initialState = {
  tableData: [],
  timer: 0,
  result: "",
};

//Action
export const START_GAME = "START_GAME"


//Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine)
      }
    default:
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //context API에선 value 값을 자식에게 넘겨줄때 마다 불필요한 리렌더링 발생, useMemo 사용, 캐싱한번 해야 성능저하가 덜됨
  const value = useMemo(() => ({tableData: state.tableData, dispatch}), [state.tableData]);

  return (
    //ContextAPI 사용시 데이터에 접근하기위해 Provider로 묶어줘야한다 redux의 Provider처럼!
    <TableContext.Provider value={value}>
      <div>지뢰찾기</div>
      <Form />
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </TableContext.Provider>
  );
};

export default MineSearch;
