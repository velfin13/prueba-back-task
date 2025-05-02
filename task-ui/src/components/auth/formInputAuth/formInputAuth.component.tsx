
export const FormInputAuth = ({ name, label, icon, type = "text", value, onChange }: any) => (
    <div className={`input-box animation animation-i animation-j`}>
        <input type={type} name={name} required value={value} onChange={onChange} />
        <label>{label}</label>
        <i className={`bx ${icon}`}></i>
    </div>
);
