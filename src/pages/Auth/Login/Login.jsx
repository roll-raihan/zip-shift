import React from 'react';
import { Link } from 'react-router';

const Login = () => {
    return (
        <div className="border p-5 rounded-2xl card-body">
            <form>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" className="input" placeholder="Email" />
                    <label className="label">Password</label>
                    <input type="password" className="input" placeholder="Password" />
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
                <p>Don't have an account? PLease, <Link to="/register" className='font-bold underline text-blue-500'>Register</Link></p>
            </form>
        </div>
    );
};

export default Login;