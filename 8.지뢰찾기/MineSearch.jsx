import React, { useReducer } from "react";

const initialState = {
  tableData: [],
  timer: 0,
  result : '',
};

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <div>지뢰찾기</div>
      <Form />
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </>
  );
};

export default MineSearch;
