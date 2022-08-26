import "./style.css";
import Toggle_Bar from "./components/Toggle_Bar";
import Screen from "./components/Screen";
import Keyboard from "./components/Keyboard";
import { useEffect, useState } from "react";

function App() {
  const themes = {
    light: "standard-light",
    dark: "standard-dark",
    dracula: "dracula"
  };
  const [theme, set_theme] = useState(themes.dark);
  const [currentExpression, set_current_expression] = useState('25/2x32-5');


  function change_body_theme(toAdd, removeList) {
    const body = document.documentElement.querySelector("body");

    removeList.forEach(toRemove => body.classList.remove(toRemove));
    body.classList.add(toAdd);
  }

  function toggle_theme(theme) {
    set_theme(theme);
  }

  useEffect(() => {
    switch (theme) {
      case themes.dark:
        change_body_theme(themes.dark, [themes.light, themes.dracula]);
        break;
      case themes.light:
        change_body_theme(themes.light, [themes.dark, themes.dracula]);
        break;
      case themes.dracula:
        change_body_theme(themes.dracula, [themes.dark, themes.light]);
        break;
    }
  }, [theme]);

  return (
    <div className="App">
      <Toggle_Bar toggle_theme={toggle_theme} theme={theme} themes={themes} />
      <Screen expression={currentExpression} theme={theme} />
      <Keyboard theme={theme}/>
    </div>
  );
}

export default App;
