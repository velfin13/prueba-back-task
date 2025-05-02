
export const FormInfoAuth = ({ type }: { type: 'login' | 'register' }) => (
    <div className={`info-text ${type}`}>
        <h2 className="animation animation-i-0 animation-j-0">Bienvenido</h2>
        <p className="animation animation-i-1 animation-j-1">
            Este es un sistema de gestión de tareas, donde podrás crear, editar y eliminar tareas de manera sencilla y rápida.
        </p>
    </div>
);
