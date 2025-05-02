
export const SubmitButtonAuth = ({ text, i, j }: { text: string; i: number; j: number }) => (
    <button type="submit" className={`btn animation animation-i-${i} animation-j-${j}`}>
        {text}
    </button>
);
