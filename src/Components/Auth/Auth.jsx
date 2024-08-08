import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Auth = () => {
    const [isSignup, setIsSignup] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = e.target.elements;

        const user = {
            name: name?.value,
            email: email.value,
            password: password.value,
        };

        try {
            const url = isSignup ? '/api/auth/signup' : '/api/auth/login';
            const response = await axios.post(url, user);
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.error(`${isSignup ? 'Signup' : 'Login'} error`, error);
        }
    };

    return (
        <div className="auth-main">
            <input type="checkbox" id="auth-chk" aria-hidden="true" checked={!isSignup} onChange={() => setIsSignup(!isSignup)} />

            <div className="auth-signup">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <label className="auth-label" htmlFor="auth-chk" aria-hidden="true">Sign Up</label>
                    <input className="auth-input" type="text" name="name" placeholder="User name" required={isSignup} />
                    <input className="auth-input" type="email" name="email" placeholder="Email" required />
                    <input className="auth-input" type="password" name="password" placeholder="Password" required />
                    <button className="auth-button" type="submit">Sign up</button>
                </form>
            </div>

            <div className="auth-login">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <label className="auth-label" htmlFor="auth-chk" aria-hidden="true">Login</label>
                    <input className="auth-input" type="email" name="email" placeholder="Email" required />
                    <input className="auth-input" type="password" name="password" placeholder="Password" required />
                    <button className="auth-button" type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Auth;
