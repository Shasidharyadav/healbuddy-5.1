import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <h1>{isSignup ? 'Signup' : 'Login'}</h1>
            <form onSubmit={handleSubmit}>
                {isSignup && <div>
                    <label>Name</label>
                    <input type="text" name="name" required />
                </div>}
                <div>
                    <label>Email</label>
                    <input type="email" name="email" required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" required />
                </div>
                <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
            </form>
            <button onClick={() => setIsSignup(!isSignup)}>
                Switch to {isSignup ? 'Login' : 'Signup'}
            </button>
        </div>
    );
};

export default Auth;
