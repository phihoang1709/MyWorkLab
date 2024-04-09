import { useForm } from 'react-hook-form';
import axios from 'axios';
const LoginForm = ({setShowModal}) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data: any) => {
        reset();
        
        const {data: {isLogin, token}} = await axios.post(`${import.meta.env.VITE_API_URL}/login`, data);
        if(isLogin){
            alert("Login successful");
            setShowModal(false);
            localStorage.setItem('token', token);
        }else{
            console.log("Error login");
            
        }
    };
  return (
    <form className='modal-form-login' onSubmit={handleSubmit(onSubmit)}>
    <h1>Login</h1>
    <div className='modal-form-login__inp'>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" {...register("email", { required: true })} />
        {errors.email && <span>This field is required</span>}
    </div>
    <div className='modal-form-login__inp'>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" {...register("password", { required: true })} />
        {errors.password && <span>This field is required</span>}
    </div>
    <button className='modal-form-login__submit' type="submit">Login</button>
    <div className='modal-form-login-btn'>
        <button className='modal-form-login-btn__fb'><i className="fa-brands fa-facebook-f"></i> Facebook</button>
        <button className='modal-form-login-btn__gg'><i className="fa-brands fa-google"></i> Google</button>
    </div>
</form>
  )
}

export default LoginForm