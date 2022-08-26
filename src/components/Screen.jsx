import "./screen.css";

export default function Screen({ expression, theme }) {
    function format_numbers(expression) {
        return expression.replace(/(\d+(\.\d+)?)/g, match => {
            return ` ${Number(match).toLocaleString()} `;
        });
    }

    return (
        <div className={`screen ${theme}`}>
            <p>{format_numbers(expression).trim()}</p>
        </div>
    );
}