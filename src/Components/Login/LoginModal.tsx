import { FC, useContext, useState } from 'react';
import './Login.css'
import '../../Styles/Reutilized.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { LoginModalProps } from '../../Types/Types';
import dotLogo from '../../Assets/iconoLogoBlanco.png';

import handleLogin from '../../DbFunctions/handleLogin';
import { UserContext } from '../../Context/UserContext';
import { useNotification } from '../../Context/NotificationContext';


export const LoginModal: FC<LoginModalProps> = ({ onVisible, closeModal, setOnVisible }) => {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [modalStatus, setModalStatus] = useState('login');

    const { userData, setUserData, setLoaderOn } = useContext(UserContext);
    const { showNotification } = useNotification();

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLoginAction = async() =>{
        setLoaderOn(true)
        await handleLogin(email, password, setUserData, showNotification)
        setLoaderOn(false)
        setOnVisible(false)
    }

    const handlePassword = (e: any) =>{
        const pass = e.target.value;
        setPassword(pass)
    }

    const handleEmail = (e: any) =>{
        const mail = e.target.value;
        setEmail(mail)
    }

    return (
        <>
            {
                onVisible &&
                <div className='loginModalOverlay'>
                    <div className='loginModalContainer'>
                        <FontAwesomeIcon icon={faXmark} className='exitIcon' onClick={closeModal} />
                        <div className='loginTitleSection'>
                            <div className='loginTitles'>
                                <h2 className='title login'><img src={dotLogo} className="titlePng" />Bienvenido/a</h2>
                            </div>
                        </div>

                        <form action="" className='loginForm'>
                            <div className="inputContainer">
                                <label className="label" htmlFor="email">Email</label>
                                <input className="input" type="email" name="email" id="email" onChange={handleEmail} />
                            </div>
                            <div className="inputContainer">
                                <label className="label" htmlFor="password">Contraseña</label>
                                <input className="input" type={showPassword ? 'text' : 'password'} name="password" id="password" onChange={handlePassword} />
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className='loginShowPass' onClick={handleTogglePassword} />
                            </div>

                            <div className='loginPassActions'>
                                {
                                    modalStatus === 'login' &&
                                    <p className='loginPassForget grayText'>¿Has olvidado tu contraseña?</p>
                                }
                            </div>
                            <div className='logRegisterBtns'>
                                <button className='btn btnDarkGreen marginXSmall' onClick={handleLoginAction} type='button'>Inicia sesión</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}