import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleRegister = (data) => {
        console.log(data);
    }

    return (
        <div className='border p-5 rounded-2xl card-body'>
            <form onSubmit={handleSubmit(handleRegister)}>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" {...register("email", { required: true })} className="input" placeholder="Email" />
                    {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}
                    <label className="label">Password</label>
                    <input type="password" {...register("password",
                        {
                            required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
                        }
                    )} className="input" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 character or long</p>
                    }
                    {
                        errors.password?.type === 'pattern' && <p className='text-red-500'>Password must have at least one uppercase, at least one lowercase, at least one number and at least one special character</p>
                    }
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Register</button>
                </fieldset>
                <p>Already have an account? Please <Link to="/login" className='font-bold underline text-blue-500'>Login</Link></p>
            </form>
        </div>
    );
};

export default Register;