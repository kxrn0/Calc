import { nanoid } from "nanoid";
import "./keyboard.css";

export default function Keyboard({theme}) {
    const keys = [
        {key: "7"}, {key: "8"}, {key: "9"}, {key: "DEL"},
        {key: "4"}, {key: "5"}, {key: "6"}, {key: "+"},
        {key: "1"}, {key: "2"}, {key: "3"}, {key: "-"},
        {key: "."}, {key: "0"}, {key: "/"}, {key: "x"}

    ];
    return (
        <div className={`keyboard ${theme}`}>
            <div className="main-keys">
                {keys.map(key => <button key={nanoid()} className={key.key === "DEL" ? "delete-key" : ''}>{key.key}</button> )}
            </div>
            <div className="result-keys">
                <button className="reset-button">RESET</button>
                <button className="equal-button">=</button>
            </div>
        </div>
    );   
}