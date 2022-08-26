import { nanoid } from "nanoid";
import { useState } from "react";
import "./three_way_toggle.css";

export default function Three_Way_Toggle({toggle, theme}) {
    const choices = ["1", "2", "3"];
    const [currentChoice, set_choice] = useState("1");
    const id = nanoid();

    function handle_change(event) {
        const value = event.target.value;

        set_choice(value);
        toggle(value);
    }

    return (
        <div className={`three-way-toggle ${theme}`}>
            <div className="labels">
                
                {choices.map(choice => {
                    const key = `choice-${choice}-${id}`;

                    return (
                        <label key={`${key}-label`} htmlFor={key}>{choice}</label>
                    );
                })}

            </div>
            <div className="choices">

                {choices.map(choice => {
                    const key = `choice-${choice}-${id}`;
                    
                    return (
                        <input key={key} type="radio" id={key} value={choice} name="choices" checked={currentChoice === choice} onChange={handle_change}/>
                    );
                })}

                <span className="ball"></span>
            </div>
        </div>
    );
}