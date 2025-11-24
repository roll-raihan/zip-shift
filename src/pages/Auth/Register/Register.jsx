import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import UseAuth from '../../../hooks/UseAuth';
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { registerUser, signInWithGoogle } = UseAuth();

    const handleRegister = (data) => {
        // console.log(data);
        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
                toast("Account created successfully!!", { position: "top-center" })
            })
            .catch(error => {
                console.log(error.message)
                toast(error.message, { position: "top-center" })
            })
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                toast("Logged in successfully!!", { position: "top-center" })
            })
            .catch(error => {
                console.log(error.message)
                toast(error.message, { position: "top-center" })
            })
    }

    return (
        <div className='p-5 rounded-2xl card-body card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl items-center mx-auto'>
            <ToastContainer position="top-center" />
            <div>
                <h2 className='text-3xl font-bold text-center'>Create an Account</h2>
                <p className='text-center'>Register with ZapShift</p>
            </div>
            <form onSubmit={handleSubmit(handleRegister)}>
                <fieldset className="fieldset">
                    {/* name */}
                    <label className="label">Name</label>
                    <input type="text" {...register("name", { required: true })} className="input" placeholder="Your Name" />
                    {errors.name?.type === 'required' && <p className='text-red-500'>Your name is required</p>}

                    {/* photo */}
                    <label className="label">Photo</label>
                    <input type="file" {...register("photo", { required: true })} className="file-input" placeholder="Your Photo" />
                    {errors.name?.type === 'required' && <p className='text-red-500'>Your photo is required</p>}

                    {/* email */}
                    <label className="label">Email</label>
                    <input type="email" {...register("email", { required: true })} className="input" placeholder="Email" />
                    {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}

                    {/* password */}
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
                    <button className="btn btn-primary mt-4 text-black font-bold">Register</button>
                </fieldset>
                <p>Already have an account? Please <Link to="/login" className='font-bold underline text-blue-500'>Login</Link></p>
                <p className='text-center'>Or,</p>
                <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5] w-full">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Login with Google
                </button>
            </form>
        </div>
    );
};

export default Register;