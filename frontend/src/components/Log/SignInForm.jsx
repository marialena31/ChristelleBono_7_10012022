import React, { useState } from 'react';
import axios from 'axios';
//Call to dotenv 
const dotenv = require('dotenv');
//Call to function of dotenv config
dotenv.config({ path: '../../.env' });
let cleAPI = process.env.REACT_APP_URL;

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const emailError = document.querySelector('.error');
        const passwordError = document.querySelector('.error');
        
        axios({
            method: "POST",
            url: `${cleAPI}/api/auth/login`,
            withCredentials: true,
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                email,
                password
            }),
        })
        .then((res) => {
            if (res.data.errors) {
                emailError.innerHTML = res.data.errors.email;
                passwordError.innerHTML = res.data.errors.password;
            } else {
                window.location = '/';
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <form action='' onSubmit={handleLogin} id='sign-up-form' className='form'>
            <div className='form_title'>Compte</div>
            <label htmlFor='email' className='form_label'>Email</label>
            <br />
            <input type='text' name='email' id='email' onChange={(e) => setEmail(e.target.value)} value={email} />
            <div className='error'></div>
            <br />

            <label htmlFor='password' className='logForm_label'>Mot de passe</label>
            <br />
            <input type='password' name='password' id='password' onChange={(e) => setPassword(e.target.value)} value={password}/>
            <div className='error'></div>
            <br />

            <input type='submit' value='Se connecter' className='btn' />
        </form>
    );
};

export default SignInForm;