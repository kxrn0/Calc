import "./style.css";
import Toggle_Bar from "./components/Toggle_Bar";
import Screen from "./components/Screen";
import Keyboard from "./components/Keyboard";
import { useEffect, useState } from "react";
import stringMath from "string-math";

function App() {
  const themes = {
    light: "standard-light",
    dark: "standard-dark",
    dracula: "dracula"
  };
  const [theme, set_theme] = useState(themes.dark);
  const [currentExpression, set_current_expression] = useState('0');

  function change_body_theme(toAdd, removeList) {
    const body = document.documentElement.querySelector("body");

    removeList.forEach(toRemove => body.classList.remove(toRemove));
    body.classList.add(toAdd);
  }

  function toggle_theme(theme) {
    set_theme(theme);
  }

  function handle_key_press(value) {
    const numberReg = /\d/;
    const minusReg = /-/;
    const operationReg = /[+\-x\/]/;
    
    console.log(`value: ${value}, current: ${currentExpression}`);

    if (currentExpression === '0' && value != '.') {
      if (numberReg.test(value) || minusReg.test(value))
        set_current_expression(value);
    }
    else {
      if (numberReg.test(value))
        set_current_expression(prevExpression => `${prevExpression}${value}`);
      else {
        if (value === "DEL") {
          if (currentExpression.length > 1)
            set_current_expression(prevExpression => prevExpression.slice(0, prevExpression.length - 1));
          else
            set_current_expression('0');
        }
        else if (operationReg.test(value)) {
          if (operationReg.test(currentExpression[currentExpression.length - 1]))
            set_current_expression(prevExpression => `${prevExpression.slice(0, prevExpression.length - 1)}${value}`);
          else
            set_current_expression(prevExpression => `${prevExpression}${value}`);
        }
        else if (value === '.') {
          const numbers = currentExpression.split(operationReg);
          const last = numbers[numbers.length - 1];

          if (last === '') {
            set_current_expression(prevExpression => `${prevExpression}0.`);
          }
          else if (last === '0') {
            set_current_expression(prevExpression => `${prevExpression}.`);
          }
          else if (numberReg.test(last)) {
            if (!~last.indexOf('.'))
              set_current_expression(prevExpression => `${prevExpression}.`);
          }
        }
        else if (value === "RESET") {
          set_current_expression('0');
        }
        else if (value === '=') {
          const isLastCharOp = operationReg.test(currentExpression[currentExpression.length - 1]);
          let expression;
          
          expression = isLastCharOp ? currentExpression.slice(0, currentExpression.length - 1) : currentExpression;
          if (expression[expression.length - 1] == '.')
            expression = expression.slice(0, expression.length - 1);

          set_current_expression(String(Number(stringMath(expression.replace(/x/g, '*')).toFixed(10))));
        }
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", event => {
      const keys = ['+', '-', '*', '/'];
      let key;
      
      key = event.key;

      for (let i = 0; i < 10; i++)
        keys.push(`${i}`);

      if (!!~keys.indexOf(key)) {
        console.log(`key: ${key}`);
        if (key === '*')
          key = 'x';
        handle_key_press(key);
      }
    })
  }, []);

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
      <Keyboard theme={theme} handler={handle_key_press} />
    </div>
  );
}

export default App;
