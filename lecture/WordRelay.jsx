const React = require("react");

const WordRelay = () => {
  const [word, setWord] = React.useState("차민재");
  const [value, setValue] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const ref = React.useRef(null);

  const handleOnChange = (event) => {
    setValue(event.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setAnswer("딩동댕");
      setWord(value);
      setValue("");
      ref.current.focus();
    } else {
      setAnswer("땡");
      setValue("");
      ref.current.focus();
    }
  };

  return (
    <>
      <h1>{word}</h1>
      <form onSubmit={handleOnSubmit}>
        <input
          ref={ref}
          type="text"
          placeholder="다음 낱말은?"
          value={value}
          onChange={handleOnChange}
        />
        <button>클릭!</button>
      </form>
      <h2>{answer}</h2>
    </>
  );
};

module.exports = WordRelay;
