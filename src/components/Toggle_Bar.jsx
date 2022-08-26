import Three_Way_Toggle from "./Three_Way_Toggle";
import "./toggle_bar.css";

export default function Toggle_Bar({toggle_theme, theme, themes}) {
    function toggle(value) {
        switch(value) {
            case '1':
                toggle_theme(themes.dark);
                break;
            case '2':
                toggle_theme(themes.light);
                break;
            case '3':
                toggle_theme(themes.dracula);
                break;
        }
    }

    return (
        <div className={`toggle-bar ${theme}`}>
            <h1 className="logo">calc</h1>
            <div className="switch-wrapper">
                <p>THEME</p>
                <Three_Way_Toggle toggle={toggle} theme={theme} />
            </div>
        </div>
    );
}