import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import GameMatcher from "./GameMatcher";

function Games() {
  return (
    <BrowserRouter>
      <div>
        <Link to="/game/number-baseball">숫자야구</Link>
        <br />
        <Link to="/game/rock-scissors-paper">가위바위보</Link>
        <br />
        <Link to="/game/lotto-generator">로또추첨기</Link>
      </div>
      <div>
        <Switch>
          <Route exact path="/" render={(props) => <GameMatcher {...props} />} />
          <Route path="/game/:name" render={(props) => <GameMatcher {...props} />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default Games;
