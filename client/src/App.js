import "./App.css";
import { TweetVal } from "./Context/FetchContext";
import Main from "./Main";

function App() {
  const {
    Emojitate: { Night },
  } = TweetVal();

  return (
    <div className={Night ? "main_day" : "main"}>
      <Main />
    </div>
  );
}

export default App;
