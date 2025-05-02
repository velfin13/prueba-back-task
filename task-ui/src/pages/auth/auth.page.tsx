import { loginAPI, registerAPI } from '@/api';
import {
    FormInfoAuth,
    FormInputAuth,
    FormLinkAuth,
    Loading,
    SubmitButtonAuth,
} from '@/components';
import { useAuth } from '@/hooks';
import {
    LoginUserFormData,
    RegisterUserFormData,
    Routes,
} from '@/models';
import { setAuth } from '@/redux';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './style.css';

export const AuthPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, loading } = useAuth();

    const [isRegister, setIsRegister] = useState(false);
    const [loginForm, setLoginForm] = useState<LoginUserFormData>({
        email: '',
        password: '',
    });
    const [registerForm, setRegisterForm] = useState<RegisterUserFormData>({
        username: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        if (!loading && isAuthenticated) {
            navigate(Routes.TASK);
        }
    }, [isAuthenticated, loading, navigate]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        isLogin = true
    ) => {
        const { name, value } = e.target;

        if (isLogin) {
            setLoginForm((prev: LoginUserFormData) => ({ ...prev, [name]: value }));
        } else {
            setRegisterForm((prev: RegisterUserFormData) => ({ ...prev, [name]: value }));
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await loginAPI(loginForm);
            if (res.status && res.data?.token) {
                dispatch(setAuth(res.data.token));
                toast.success(res.message || 'Inicio de sesión exitoso');
                navigate(Routes.TASK);
            } else {
                toast.error(res.message || 'Credenciales inválidas');
            }
        } catch (err: any) {
            toast.error(err?.message || 'Error en el inicio de sesión');
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await registerAPI(registerForm);
            if (res.status) {
                toast.success(res.message || 'Registro exitoso');
    
                const loginRes = await loginAPI({
                    email: registerForm.email,
                    password: registerForm.password,
                });
    
                if (loginRes.status && loginRes.data?.token) {
                    dispatch(setAuth(loginRes.data.token));
                    navigate(Routes.TASK);
                } else {
                    toast.error(loginRes.message || 'Error al iniciar sesión automáticamente');
                }
    
            } else {
                toast.error(res.message || 'No se pudo registrar el usuario');
            }
        } catch (err: any) {
            const message = err?.response?.data?.message || err?.message || 'Error en el registro';
            toast.error(message);
        }
    };
    


    if (loading) return <Loading />;

    return (
        <div className="login_context">
            <div className={`wrapper ${isRegister ? 'active' : ''}`}>
                <span className="rotate-bg" />
                <span className="rotate-bg2" />

                {/* Login Form */}
                <div className="form-box login">
                    <h2 className="title animation animation-i-0 animation-j-21">
                        Ingresar al Sistema
                    </h2>
                    <form onSubmit={handleLogin}>
                        <FormInputAuth
                            name="email"
                            label="Email"
                            icon="bxs-envelope"
                            value={loginForm.email}
                            onChange={handleInputChange}
                        />
                        <FormInputAuth
                            name="password"
                            label="Password"
                            type="password"
                            icon="bxs-lock-alt"
                            value={loginForm.password}
                            onChange={handleInputChange}
                        />
                        <SubmitButtonAuth text="Ingresar" i={3} j={24} />
                        <FormLinkAuth
                            text="¿Aún no tienes una cuenta?"
                            link="Registrate!!"
                            onClick={() => setIsRegister(true)}
                            i={5}
                            j={25}
                        />
                    </form>
                </div>

                <FormInfoAuth type="login" />

                {/* Register Form */}
                <div className="form-box register">
                    <h2 className="title animation animation-i-17 animation-j-0">
                        Registrarse
                    </h2>
                    <form onSubmit={handleRegister}>
                        <FormInputAuth
                            name="username"
                            label="Username"
                            icon="bxs-user"
                            value={registerForm.username}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, false)}
                        />
                        <FormInputAuth
                            name="email"
                            label="Email"
                            icon="bxs-envelope"
                            value={registerForm.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, false)}
                        />
                        <FormInputAuth
                            name="password"
                            label="Password"
                            type="password"
                            icon="bxs-lock-alt"
                            value={registerForm.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, false)}
                        />
                        <SubmitButtonAuth text="Crear cuenta" i={21} j={4} />
                        <FormLinkAuth
                            text="¿Ya tienes una cuenta?"
                            link="Ingresar"
                            onClick={() => setIsRegister(false)}
                            i={22}
                            j={5}
                        />
                    </form>
                </div>

                <FormInfoAuth type="register" />
            </div>
        </div>
    );
};
