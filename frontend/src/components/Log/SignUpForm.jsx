import axios from 'axios';
import { useForm } from 'react-hook-form';
//Call to dotenv 
const dotenv = require('dotenv');
//Call to function of dotenv config
dotenv.config({ path: '../../.env' });
let cleAPI = process.env.REACT_APP_URL;

function SignUpForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onTouched'
    });
    const { isSubmitting } = errors;

    const onSubmit = data => {
        axios.post(`${cleAPI}/api/auth/signup`,
            { lastName: data.lastName, firstName: data.firstName, email: data.email, password: data.password })
            .then(res => {
                console.log(res.data);
                const storageToken = {
                    "userId": res.data.userId,
                    "token": res.data.token
                }
                sessionStorage.setItem("storageToken", JSON.stringify(storageToken));
                // Add data here
                // and here
            })
            .catch(err => { 'Ceci est une erreur' });
    }

    console.log(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form'>
            <div className='form_title'>Inscription</div>
            <label htmlFor='lastName' className='form_label'>Nom</label>
            <br />
            <input type='text' name='lastName' id='lastName' placeholder='Doe' {...register('lastName', { required: true, minLength: 3, pattern: /^[A-Za-z]+$/i })} />

            <div className='error'>{errors.lastName?.type === 'required' && "Vous devez entrer un nom"}</div>
            <div className='error'>{errors.lastName?.type === 'minLength' && "Ce champ doit comprendre au moins 3 caractères"}</div>
            <div className='error'>{errors.lastName?.type === 'pattern' && "Ce champ ne peut pas comprendre de caractères spéciaux"}</div>
            <br />

            <label htmlFor='firstName' className='form_label'>Prénom</label>
            <br />
            <input type='text' name='firstName' id='firstName' placeholder='John' {...register('firstName', { required: true, minLength: 3, pattern: /^[A-Za-z]+$/i })} />
            <div className='error'>{errors.firstName?.type === 'required' && "Vous devez entrer un prénom"}</div>
            <div className='error'>{errors.firstName?.type === 'minLength' && "Ce champ doit comprendre au moins 3 caractères"}</div>
            <div className='error'>{errors.firstName?.type === 'pattern' && "Ce champ ne peut pas comprendre de caractères spéciaux"}</div>
            <br />

            <label htmlFor='service' className='form_label'>Service</label>
            <br />
            <input type='text' name='service' id='service' placeholder='Ressources humaines' {...register('service', { required: true, minLength: 2, pattern: /^[A-Za-z]+$/i })} />
            <div className='error'>{errors.service?.type === 'required' && "Vous devez entrer votre service"}</div>
            <div className='error'>{errors.service?.type === 'minLength' && "Ce champ doit comprendre au moins 3 caractères"}</div>
            <div className='error'>{errors.service?.type === 'pattern' && "Ce champ ne peut pas comprendre de caractères spéciaux"}</div>
            <br />

            <label htmlFor='email' className='form_label'>Email</label>
            <br />
            <input type='email' name='email' id='email' placeholder='johndoe@gmail.com' {...register('email', { required: true, pattern: /^[\w_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}$/g })} />
            <div className='error'>{errors.email?.type === 'required' && "Vous devez entrer une adresse mail"}</div>
            <div className='error'>{errors.email?.type === 'pattern' && "Veuillez entrer une adresse mail valide"}</div>
            <br />

            <label htmlFor='password' className='form_label'>Mot de passe</label>
            <br />
            <input type='password' name='password' id='password' placeholder='Mot de passe' {...register('password', { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })} />
            <div className='error'>{errors.password?.type === 'required' && "Vous devez entrer un mot de passe"}</div>
            <div className='error'>{errors.password?.type === 'pattern' && "Votre mot de passe doit contenir: 8 caractères minimum, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial"}</div>
            <br />

            <button type='submit' disabled={isSubmitting} className='btn'>Valider inscription</button>
        </form>
    )
}


export default SignUpForm;