import React, { useReducer, createContext, useMemo, useEffect } from "react";
import Form from "./Form";
import Table from "./Table";
import { CODE } from "./Code";

//createContext 안에는 기본값 삽입
export const TableContext = createContext({
  tableData: [],
  halted: true, // 중단된
  dispatch: () => {},
});

//initalState
const initialState = {
  tableData: [],
  timer: 0,
  result: "",
  halted: true, // 중단된
  timer: 0,
  result: "",
  openedCount: 0,
};

//Action
export const START_GAME = "START_GAME";
export const OPEN_CELL = "OPEN_CELL";
export const CLICK_MINE = "CLICK_MINE";
export const FLAG_CELL = "FLAG_CELL";
export const QUESTION_CELL = "QUESTION_CELL";
export const NORMALIZE_CELL = "NORMALIZE_CELL";
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

//Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false,
        timer: 0,
      };
    case OPEN_CELL:
      const tableData = [...state.tableData];
      tableData.forEach((row, i) => {
        tableData[i] = [...row];
      });
      const checked = [];

      let openedCount = 0;

      const checkAround = (row, cell) => {
        console.log(row, cell);
        if (
          row < 0 ||
          row >= tableData.length ||
          cell < 0 ||
          cell >= tableData[0].length
        ) {
          return;
        } // 상하좌우 없는칸은 안 열기
        if (
          [
            CODE.OPENED,
            CODE.FLAG,
            CODE.FLAG_MINE,
            CODE.QUESTION_MINE,
            CODE.QUESTION,
          ].includes(tableData[row][cell])
        ) {
          return;
        } // 닫힌 칸만 열기
        if (checked.includes(row + "/" + cell)) {
          return;
        } else {
          checked.push(row + "/" + cell);
        } // 한 번 연칸은 무시하기

        // around = 오픈셀을 했다면 주변에 지뢰 몇개인지 확인하는 변수
        let around = [tableData[row][cell - 1], tableData[row][cell + 1]];

        // 윗줄이 있다면 윗줄 around 검사
        if (tableData[row - 1]) {
          around = around.concat([
            tableData[row - 1][cell - 1],
            tableData[row - 1][cell],
            tableData[row - 1][cell + 1],
          ]);
        }
        // 아랫줄이 있다면 아랫줄 around 검사
        if (tableData[row + 1]) {
          around = around.concat([
            tableData[row + 1][cell - 1],
            tableData[row + 1][cell],
            tableData[row + 1][cell + 1],
          ]);
        }
        //최종적으로 지뢰가 근처에 있다면, length를 표시
        const count = around.filter(function (v) {
          return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
        }).length;

        // 카운트가 빈칸, 0이면 주변칸 모두 오픈
        if (count === 0) {
          // 주변칸 오픈하는 조건문
          if (row > -1) {
            const near = [];
            if (row - 1 > -1) {
              near.push([row - 1, cell - 1]);
              near.push([row - 1, cell]);
              near.push([row - 1, cell + 1]);
            }
            near.push([row, cell - 1]);
            near.push([row, cell + 1]);
            if (row + 1 < tableData.length) {
              near.push([row + 1, cell - 1]);
              near.push([row + 1, cell]);
              near.push([row + 1, cell + 1]);
            }
            near.forEach((n) => {
              if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                checkAround(n[0], n[1]);
              }
            });
          }
        }
        if (tableData[row][cell] === CODE.NORMAL) {
          // 내 칸이 닫힌 칸이면 카운트 증가
          openedCount += 1;
        }
        tableData[row][cell] = count;
      };

      checkAround(action.row, action.cell);

      return {
        ...state,
        tableData,
      };
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted: true,
      };
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      };
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE;
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      };
    }
    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1,
      }
    }
    default:
      return state;
  }
};

const plantMine = (row, cell, mine) => {
  //candidate = 가로세로 행렬 배열 만드는 변수
  const candidate = Array(row * cell)
    .fill()
    .map((arr, i) => {
      return i;
    });
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }
  console.log(data);
  return data;
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //context API에선 value 값을 자식에게 넘겨줄때 마다 불필요한 리렌더링 발생, useMemo 사용, 캐싱한번 해야 성능저하가 덜됨
  const { tableData, halted, timer, result } = state;

  const value = useMemo(
    () => ({ tableData, halted, dispatch }),
    [tableData, halted]
  );

  useEffect(() => {
    let timer;
    if (halted === false) {
      timer = setInterval(() => {
        dispatch({ type: INCREMENT_TIMER });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [halted]);

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
