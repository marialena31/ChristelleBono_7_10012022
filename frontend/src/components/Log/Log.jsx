import React, { useState } from 'react';
import SignUpForm from './SignUp';
import SignInForm from './SignIn';

const Log = ( props ) => {
    const [signUpModal, setSignUpModal] = useState(props.signUp);
    const [signInModal, setSignInModal] = useState(props.signIn);

    const handleModals = (e) => {
        if(e.target.id === "register") {
            setSignInModal(false);
            setSignUpModal(true);
        } else if (e.target.id === "login") {
            setSignUpModal(false);
            setSignInModal(true);
        }
    };

    return (
        <div className="container_form home_container">
                <ul>
                    <li onClick={handleModals} id="register" className={signUpModal ? "active-btn" : null} >S'inscrire</li>
                    <li onClick={handleModals} id="login" className={signInModal ? "active-btn" : null} >Se connecter</li>
                </ul>
                {signUpModal && <SignUpForm />}
                {signInModal && <SignInForm />}
        </div>
    );
};

export default Log;