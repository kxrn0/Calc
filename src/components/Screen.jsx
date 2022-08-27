import "./screen.css";

export default function Screen({ expression, theme }) {
    function format_numbers(expression) {
        return expression.replace(/\d+(\.\d+)?/g, match => {
            const digits = match.split('.');

            if (digits.length == 1)
                return ` ${Number(match).toLocaleString()} `;
            else {
                if (digits[1].length > 10)
                    digits[1] = digits[1].slice(0, 10);

                return ` ${Number(digits[0]).toLocaleString()}.${digits[1]} `;
            }
        });
    }

    return (
        <div className={`screen ${theme}`}>
            <p>{format_numbers(expression).trim()}</p>
        </div>
    );
}