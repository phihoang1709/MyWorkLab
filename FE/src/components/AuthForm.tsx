/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useNavigate } from 'react-router-dom';


const AuthForm = ({ setShowModal }: {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [hasAccount, setHasAccount] = useState(false);
    const navigate = useNavigate();
    const onLogout = () => {
        if(confirm("Are you sure to logout ?")){
            localStorage.removeItem('token');
            navigate('/');
        }else{
            return;
        }
    }
    return (
        <div className='modal'>
            <div className="modal-form">
                <button className='modal-close' onClick={() => setShowModal(false)}>X</button>

                {!localStorage.getItem('token') ? hasAccount ? (
                    <>
                        <RegisterForm setShowModal={setShowModal} />
                        <button onClick={() => setHasAccount(!hasAccount)} className='modal-form-switch'>Back to Login Form</button>
                    </>
                ) : (
                    <>
                        <LoginForm setShowModal={setShowModal} />
                        <button onClick={() => setHasAccount(!hasAccount)} className='modal-form-switch'>If you dont have an account ? Register now</button>
                    </>
                ) : <button className='modal-form-login-btn__logout' onClick={onLogout}>Logout</button>}

            </div>
        </div>

    );
}

export default AuthForm;