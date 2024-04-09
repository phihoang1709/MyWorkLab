import { useForm } from 'react-hook-form';
import axios from 'axios';
const RegisterForm = ({setShowModal}) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data: any) => {
        reset();
        console.log(data);
        
        const {data: {isRegistered}} = await axios.post(`${import.meta.env.VITE_API_URL}/register`, data);
        if (isRegistered) {
            alert("You have registered successfully");
            setShowModal(false)
        }
    };
    return (
        <form className='modal-form-login' onSubmit={handleSubmit(onSubmit)}>
            <h1>Register</h1>
            <div className='modal-form-login__inp'>
                <label htmlFor="name">Username:</label>
                <input type="text" id="name" {...register("name", { required: true })} />
                {errors.name && <span>This field is required</span>}
            </div>
            <div className='modal-form-login__inp'>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" {...register("email", { required: true })} />
                {errors.email && <span>This field is required</span>}
            </div>
           
            <div className='modal-form-login__inp'>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" {...register("password", { required: true })} />
                {errors.password && <span>This field is required</span>}
            </div>
            <div className='modal-form-login__inp'>
                <label htmlFor="phone">Phone:</label>
                <input type="text" id="phone" {...register("phone", { required: true })} />
                {errors.phone && <span>This field is required</span>}
            </div>
            <button className='modal-form-login__submit' type="submit">Register</button>

        </form>
    )
}

export default RegisterForm