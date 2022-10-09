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
- `prevState` : setState에 바꾸고 싶은 상태를 입력하면 상태값이 바뀌나, setState에 함수를 넣고 prevState를 파라미터로 받아 예전 상태값 기반, return 값으로 바꿀 상태값을 넣어주는 방법을 쓸때도 있다.
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

## 웹팩 빌드
### 구구단을 웹팩을 통해 빌드해보기

- 

## 끝말잇기
###

- 

## 숫자야구
###

-

## 반응속도
###

-

## 가위바위보
###

-

## 로또 추첨기
###

-

## 틱택토
###

-

## 지뢰찾기
###

-