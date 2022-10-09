# 리액트 웹게임

### 바닐라 JS에서 리액트로 마이그레이션하여 리액트의 기본과 심화과정을 공부

### 리액트의 시초
- 복잡하게 데이터를 변경하고자 하는 웹들이 많이 생겨나면서 문제가 생김
- 어느 쪽에서는 데이터가 바뀌었는데 다른 쪽에서는 데이터가 바뀌지않는 문제
- 페이스북은 전통적인 MVC 패턴을 버리고 리액트를 만들며 데이터의 화면의 불일치 해결

### Create React App?
- 최적화된 웹팩과 바벨을 이용하여 기본적인 react app을 만들어 주는 커맨드
- 하지만 배움을 하는 사람으로써 웹팩과 바벨을 왜 써야하는지, 왜 불편해서 CRA 같은 커맨드가 만들어졌는지 이해해야함.
- 처음에는 HTML로 React App을 만들어보기

### script로 컴포넌트 만들기
- script 태그 추가 : react와 react-dom 사용 가능.
```js
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js" />
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" />
<script>
    // Component 작성

    'use strict';

    const e = React.createElement;
    
    const LikeButton = () => {
        const [liked, setLiked] = React.useState(false);

        if(liked === true){
            return "You liked this.";
        }

        return React.createElement('button', {onClick : () => setState(true)}, "Like");
    }
</script>
<script>
    ReactDom.render(e(LikeButton), document.querySelector('#root'))
</script>
```

- 가독성이 너무 안좋음... => 리액트에서 `JSX 문법`을 만들어줌!
- script 안에서 <> 사용이 안되는건 JS를 배우면 다들 알고 있음. 하여 이런 `JSX 문법을 바벨 라이브러리을 통하여 React.createElement ~ 로 바꿔줌.`
```jsx
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js" />
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" />
<script src="https://unpkg.com/babel-standalone@6/babel.min.js" />
<script type="text/babel">
  'use strict';

  const LikeButton = () => {
        const [liked, setLiked] = React.useState(false);

        if(liked === true){
            return "You liked this.";
        }

        return (
            <button onClick={() => { setLiked(true) }}>Like</button> 
        )
    }
</script>
<script type="text/babel">
  // react 17버전 코드
  ReactDOM.render(<LikeButton/>, document.querySelector('#root'));
  // react 18버전 코드
  ReactDom.createRoot(document.querySelector('#root')).render(<LikeButton />);
</script>
```

## 구구단
### 기본적인 상태변화 (useState), 태그지정(useRef), Fragment에 학습

<img src = "https://user-images.githubusercontent.com/96935557/194752351-0e2e8713-b02b-4288-ac0d-5f36e4571949.gif">

- state (상태) 에 대한 변화값을 잘 파악해야함.
- 구구단의 state
  1. 곱할 첫번째, 두번째 숫자
  2. 결과값이 맞는지 틀리는지?
  3. input의 target value 값
- 함수형 setState 사용법 - `prevState` : setState에 바꾸고 싶은 상태를 입력하면 상태값이 바뀌나, setState에 함수를 넣고 prevState를 파라미터로 받아 예전 상태값 기반, return 값으로 바꿀 상태값을 넣어주는 방법을 쓸때도 있다.
```jsx
const [count, setCount] = useState(0);

// 그냥 setState 사용
const handleButton = () => {
  setCount(count + 1);
}
// prevState 사용
const handleButton = () => {
  setCount((prevState) => {
    return prevState + 1 ;
  })
}

return (
  <div>{count}</div>
  <button onClick={handleButton}>Plus</button>
)
```

- JS에서 태그를 지정해서 무언가 이벤트를 주는 방법 : document.querySelector(태그)
- React에서는 태그를 지정하는 것을 useRef 훅을 사용
```jsx
// input에 focus를 주고 싶을때
const [value, setValue] = React.useState('');
const inputEl = React.useRef(null);

const onSubmitForm = (e) => {
  e.preventDefault();
  inputEl.current.focus();
  //...
}

return (
  <>
    <form onSubmit={onSubmitForm}>
      <input
        ref={inputEl} // ref 설정
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button>입력!</button>
    </form>
  </>
)

```

## 끝말잇기
### CRA가 아닌 웹팩을 통해 빌드해서 끝말잇기 구현해보기

- `웹팩을 왜 쓰는가?` : 페이스북의 컴포넌트는 2만개 이상이다. 그 2만개의 자바스크립트 파일을 차례대로 실행하려면 많은 시간이 걸릴 것. 여러개의 자바스크립트 파일을 합쳐서 하나의 자바스크립트 파일로 만들어주는 도구이다.

- 설치 : 설치할 폴더에 npm init 후 package.json 생성 이후 리액트와 웹팩 설치.
```
npm i react react-dom
npm i -D webpack webpack-cli
```

- *`웹팩 설정`* : `entry에 파일을 읽혀서, module을 적용해, output으로 값을 출력한다.`
  - client.jsx : index.html root에 최상위 컴포넌트 require 해주고 DOM에 페인팅
  - webpack.config.js : react에 필요한 웹팩 플러그인 설정
    - name : 웹팩의 이름
    - mode : 개발용인지 배포용인지?
    - devtool : 보통 eval을 씀. 수정된 모듈만 재빌드하여 빠르다는 장점이있음.
    - resolve - extension : entry에 확장자('./client.jsx')를 안써도 웹팩이 찾아서 entry에 넣어줌.
    - `entry` : 합칠 jsx들의 정보들을 입력.
      - app : 합칠 파일들의 명을 배열로 입력.
    - module : 적용할 웹팩의 여러가지 옵션 부여. jsx를 웹팩이 이해를 못하기 때문에 주로 `바벨을 설정`해줘야한다.
      ```js
      //바벨코어 : 바벨에 들어있는 기본적인 도구
      //바벨프리셋 : 나의 브라우저, 환경에 맞게 바벨설정하는 도구
      //바벨프리셋리액트 : jsx 지원을 하게 해주는 바벨 도구
      //바벨로더 : 바벨과 웹팩을 연결시켜주는 도구
      npm i -D @babel/core @babel/preset-env @babel/preset-react @babel-loader
      ```
      - rules : 웹팩 옵션들에 대한 규칙. 정의.
        - test : 규칙을 적용할 파일. 지금의 경우는 jsx 파일들 (정규표현식으로 설정했음)
        - loader : 어떤 로더를 통해서 규칙 적용을 할지? (우리는 바벨로더를 통해)
        - options : 바벨에 적용할 option들, preset-env, preset-react 적용.
        - options - presets - targets : preset-env에서는 지원하고자하는 브라우저를 어느 정도 범위로 타게팅할 것인가?
        - options - presets - debug : 디버그를 허용할것인가?
        - options - plugins : preset에서의 확장 프로그램. react-refresh로 hot reload를 하기위해 설정.
        ```
        npm i -D react-refresh @pmmmwh/react-refresh-webpack-plugin
        ```

    - plugins : 확장 프로그램. hot reload를 하기위해 따로 RefreshWebpackPlugin 플러그인 모듈 설치를 했음.
    - `output` : 웹팩을 적용할 하나의 js파일을 출력할 정보.
      - path: js파일 이 있는 위치 node의 `path.join(__dirname, "위치")` 사용
        - 원래는 path 경로는 C:\users\minjae\vscode\react-webgame\dist 이겠지만 자동으로 path 메서드 잘 쓰면 좋음.
      - filename: 하나로 합칠 js 파일의 이름
      - publicPath: js 파일이 있는 public 폴더 위치
    - devServer : 개발 서버에서 hot reload를 하기위해 경로 설정해줌.
    - `package.json 커맨드 설정` : 이렇게 웹팩 설정을 하였으면 `package-json`에서 webpack 명령어 설정을 해줘야 함.
    ```
    //package.json - npm run dev 실행
    //hot reload 때문에 serve --env development 추가 커맨드 작성
    "scripts": {
      "dev": "webpack serve --env development"
    },
    ```

- 컨트롤드 인풋 VS 언컨트롤드 인풋
  - 컨트롤드 인풋 : value와 onChange가 있는 input. 복잡한 input을 작성할때 필요.
  - 언컨트롤드 인풋 : value와 onChange가 없는 HTML 본연의 원시적인 input. onSubmit만 써도 되는 경우 사용 가능.
  <img src="https://user-images.githubusercontent.com/96935557/194758379-188b35dd-d5ac-4e78-be97-e934c6ced211.PNG">


## 숫자야구
### 컴포넌트 분리, JSX의 map 사용과 props 전달.

<img src="https://user-images.githubusercontent.com/96935557/194762201-9c5dd02f-3040-44a5-b088-f6694641578a.gif">

- require와 import의 차이
  - require : 노드의 모듈 시스템, commonJS의 키워드
  - import : ES6에서 새로 도입된 키워드
  - 일반적으로 import는 사용자가 필요한 모듈 부분만 선택하고 로드 할 수 있기 때문에 더 선호된다. 또한 require보다 성능이 우수하며 메모리를 절약한다.

- `props` : 성능문제, 재사용성 이점, 가독성의 문제로 컴포넌트를 분리함에 있어서 props가 생김. 부모의 상태값을 자식에게 전달하는 연결고리


- React에서의 map 메서드
  - jsx 문법에서의 반복문은 map으로 사용한다. 그리고 웬만한 반복문을 사용하는 컴포넌트는 따로 빼주어서 props를 받아 사용하는 것이 깔끔하다.
  ```jsx
  {tries.map((v, i) => (
      <Try key={`${i + 1}차 시도 : ${v.try}`} tryInfo={v} />
  ))}
  ```
  - map의 key 값은 항상 고유한 값이어야하며, i를 사용하는 경우는 흔하지만 가상돔에서 겹칠 수 있으니 자제한다.

- useState의 lazy init
  ```jsx
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
  // useState의 함수를 넣으면 함수의 리턴값이 useState의 기본값으로 들어간다.
  // getNumbers() 호출로 기본값 작성시 문제.
  // 리렌더링시 계속 함수호출되어 불필요한 함수호출이 계속 되기 때문에 getNumbers로 호출없이 작성
  const [answer, setAnswer] = useState(getNumbers); 
  ```

- 불필요한 리렌더링 방지하기 : React.memo 사용
  - 부모 컴포넌트가 리렌더링되면 자식 컴포넌트로 무조건 리렌더링이 된다.
  - 부모 컴포넌트쪽 상태가 바뀔때 자식 컴포넌트 쪽이 바뀌지 않는다면, 자식컴포넌트에 memo를 사용하여 불필요한 리렌더링을 막아준다.
  ```jsx
  import React, { memo } from 'react';

  const Try = memo(({tryInfo}) => {
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    );
  });
  Try.displayName = Try; //메모를 쓰면 컴포넌트의 이름이 바뀌어서 불편하기 때문에 원래이름으로 변경

  export default Try;
  ```

- 부득이하게 자식이 부모에게 받은 props를 바꾸어야한다면? : props를 state로 만들어서 바꾸어 주어야한다. 그래야지 부모에게 영향이 미치지 않는다.
  ```jsx
  import React, { memo } from 'react';

  const Try = memo(({tryInfo}) => {
    const [result, setResult] = useState(tryInfo.result);

    const onClick = () => {
      setResult('1');
    }

    return (
      <li>
        <div>{tryInfo.try}</div>
        <div onClick={onClick}>{tryInfo.result}</div>
      </li>
    );
  });
  Try.displayName = Try;

  export default Try;
  ```

## 반응속도
### JSX에서의 조건문과 리액트에서의 타이머 사용

<img src="https://user-images.githubusercontent.com/96935557/194764709-2c8ed0f2-c5df-4112-b709-1680fa71dec4.gif">

- JSX의 조건문 : 삼항연산자 적극 활용
```jsx
// 결과값이 없을때는 화면에 보여주지말고, 생겼다면 화면에 나타나게 하라.
  const renderAverage = () => {
    return result.length === 0 ? null : (
      <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onReset}>리셋</button>
      </>
    );
  };
```

- 리액트에서의 타이머(setTimeout, setInterval) 사용
  - 기존에 타이머를 초기화할 일이 있는데, ref를 이용한다. ref는 변화해도 리렌더링이 되지 않기 때문이다.
  ```jsx
  const timeout = useRef(null);

    const onClickScreen = useCallback(() => {
    if (state === "waiting") {
      //timeout.current ref 지정해주고
      timeout.current = setTimeout(() => {
        setState("now");
        setMessage("지금 클릭하세요");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
      setState("ready");
      setMessage("초록색이 되면 클릭하세요.");
    } else if (state === "ready") {
      // 성급하게 클릭 했다면, timeout ref를 clear 해준다
      clearTimeout(timeout.current);
      setState("waiting");
      setMessage("너무 성급하시군요! 초록색이 된 후에 클릭하세요.");
    } else if (state === "now") {
      // 반응속도 체크
      setState("waiting");
      setMessage("클릭해서 시작하세요.");
      endTime.current = new Date();
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  }, [state]);
  ```

## 가위바위보
### 리액트 라이프 사이클과 useEffect, 커스텀 훅 사용

<img src='https://user-images.githubusercontent.com/96935557/194025618-ec921ef2-a63c-48bd-a58e-d0854c7b7c56.gif'>

- *`리액트 라이프 사이클`*
  - componentDidMount() : 컴포넌트가 첫 렌더링 된 후 동작
  - componentDidUpdate() : 컴포넌트가 리렌더링 후 동작
  - componentWillUnmount() : 컴포넌트가 제거되기 직전 동작
  - 클래스 컴포넌트의 경우 : constructor => render => ref => componentDidMount => 상태값이 변화되거나 props가 변화될 때 리렌더링 => componentDidUpdate => 부모가 나를 없앴을 때 componentWillUnmount => 컴포넌트 소멸

- 고차 함수 : 함수의 return이 함수인 경우 고차함수로 가독성 좋게 나타낼수 있다.
  - onClick={onClickBtn("바위")}는 함수가 아닌 onClickBtn에 바위를 넣었을때의 리턴값
  ```jsx
  const onClickBtn = (choice) => () => { // choice 파라미터가 지금 "바위"
    // onClick 메서드 함수 호출 부분을 따로 뺴줌 () => () => {}
    if (isRunning) {
      setIsRunning(false);
      const myScore = scores[choice]; // 1, 0, -1
      const cpuScore = scores[computerChoice(imgCoord)];
      const diff = myScore - cpuScore;
      if (diff === 0) {
        setResult("비겼습니다");
      } else if ([-1, 2].includes(diff)) {
        setResult("이겼습니다");
        setScore((prevScore) => prevScore + 1);
      } else {
        setResult("졌습니다");
        setScore((prevScore) => prevScore - 1);
      }
      setTimeout(() => {
        setIsRunning(true);
      }, 1000);
    }
  };
  ```

- `useEffect` : componentDidMount, DidUpdate, WillUnmount를 함수형에 적용할 수 있게 만든 Hook.
  - useEffect에서 Didmount는 콜백함수에 작성.
  - DidUpdate는 두번째 의존성 배열에 Update할 상태값을 작성.
  - WillUnmount는 return 문에 작성.

- 커스텀 훅으로 interval 하기
```js
import { useEffect, useRef } from "react";

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() { // tick을 따로 설정한 이유. setInterval과 clearInterval을 호출했을때, 0.1초정도의 delay가 생겨 시간초가 안맞아지기에 tick 함수를 따로 설정
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);

  return savedCallback.current;
};

export default useInterval;
```

## 로또 추첨기
### 최적화에대한 심화공부. useCallback, useMemo 의 차이 학습

<img src='https://user-images.githubusercontent.com/96935557/194005632-e45ea798-8435-4b95-b442-604784a7f6c5.gif'>

- useEffect로 업데이트 감지하기
  - class에선 componentDidUpdate가 감지하는 부분. 두번째 의존성 배열에 Update할 상태값을 넣어준다.
  - 배열에 요소가 있으면 DidMount와 DidUpdate 둘 다 수행.

- *`useMemo와 useCallback`* : 리액트의 성능 최적화 방법
  - getWinNumbers() 함수가 계속 setTimeout 때문에 1초마다 호출됨. getWinNumbers는 처음 셔플할때만 사용함. memo처럼 함수나 값을 쓸때만 렌더하게 할수 없을까? => `값이나 함수를 캐싱. 기억할 수 있게 만드는 훅이 useMemo와 useCallback`
  - `useMemo(callback, [])` : callback 함수의 값을 기억하는 훅. 두번째 의존성 배열은 useEffect와 비슷하게 의존성 배열에 넣은 값이 update 되었을때 바뀜.
  - `useCallback(callback, [])` : callback 함수자체를 기억하는 훅. 두번째 의존성 배열은 useEffect와 비슷하게 의존성 배열에 넣은 함수가 update 되었을때 다시 호출.
  - useCallback을 사용할 때는 callback 함수 안에 state 값이 있으면, 너무 기억을 잘해놔서 이전 state 값을 계속 기억하기 때문에 `두번째 의존성 배열에 변해야하는 상태값을 꼭 넣어주어야한다.`
  - `props에 전해주는 함수가 있을때(만약 onClickRedo를 자식 컴포넌트에 줄때) 꼭 useCallback을 써야 리렌더링 되지 않는다.`
  ```jsx
  const onClickRedo = useCallback(() => {
    console.log("onClickRedo");
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]);
  ```

- Hooks 팁

## 틱택토
### useReducer, reducer, action, dispactch의 관계 학습

<img src='https://user-images.githubusercontent.com/96935557/194033937-73529d6b-8f63-470e-be8b-5ac6edbfa32e.gif'>

-

## 지뢰찾기
### context API 사용방법 학습

<img src='https://user-images.githubusercontent.com/96935557/194033745-2c529406-fdf8-4ad3-85ba-5f84a914c232.gif'>

-