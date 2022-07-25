import React from "react";
import NumberBaseball from "../3.숫자야구/Numberbaseball";
import RSP from "../5.가위바위보/RSP";
import Lotto from "../6.로또추첨기/Lotto";

function GameMatcher(props) {
  console.log(props);

  if(props.match.params.name === 'number-baseball'){
    return <NumberBaseball />
  } else if(props.match.params.name === 'rock-scissors-paper'){
    return <RSP />
  } else if(props.match.params.name === 'lotto-generator'){
    return <Lotto />
  }

  return (
    <>
    </>
  );
}

export default GameMatcher;
