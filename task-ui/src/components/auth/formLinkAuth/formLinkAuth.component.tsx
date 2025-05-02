export const FormLinkAuth = ({ text, link, onClick, i, j }: any) => (
    <div className={`linkTxt animation animation-i-${i} animation-j-${j}`}>
        <p>
            {text}{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); onClick(); }}>
                {link}
            </a>
        </p>
    </div>
);

