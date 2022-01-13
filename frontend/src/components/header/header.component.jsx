import React from 'react';
import Logo from '../../images/logo.svg';

const Header = () => {
    return(
        <header>
            <div className="title">
                <h1 className="title_item">Bienvenue sur votre réseau social d'entreprise!</h1>
            </div>
            <div className="logo">
                <img  className="logo_image" src={Logo} alt="logo de l'entrprise"/>
            </div>
        </header>
    )
}

export default Header