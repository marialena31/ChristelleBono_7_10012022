//Call the module of jsonwebtoken for token management
const jwt = require('jsonwebtoken');

//Call to dotenv 
const dotenv = require('dotenv');

//Call to function of dotenv config
dotenv.config({ path: '../.env' });

//Call the file to have the user Schema
const User = require('../models/User');

//Call the file to have the userLog Schema
const userLog = require('../models/UserLog');

//Call the module of bcrypt for hashed the password
const bcrypt = require('bcrypt');

const fs = require('fs');

//Allows you to create a new user
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) //Allows you to hash the password
        .then(hash => {
            const user = new User({// create a new user with the userSchema
                firstname: req.body.firstname,//Get the firstname in the request's body
                lastname: req.body.lastname,//Get the lastname in the request's body
                service: req.body.service,//Get the service in the request's body
                email: req.body.email,//Get the email in the request's body
                password: hash//Get the password hash
            });
            user.save()//Allows you to save this new user
                .then(() => res.status(201).json({ message: 'User created!' }))// response create data
                .catch(error => res.status(400).json({ error }));// response error bad request
        })
        .catch(error => res.status(500).json({ error }));// response error server problem
};

//Allows you to connect with your identifiers 
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })//Allows you to find the email passed in the request in the database
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'User no found!' });//The email isn't in the database error unauthorized
            }
            bcrypt.compare(req.body.password, user.password)// Compare to password passed in the request in the hash in the database
                .then(valid => {
                    if (!valid) {//it's not valid
                        return res.status(401).json({ error: 'Pasword inccorect!' });//response error unauthorized
                    }
                    res.status(200).json({//is valid
                        userId: user._id, //get the user id 
                        token: jwt.sign( //function to create a token which will be used for the authentication of a user
                            { userId: user._id },//data to encode
                            process.env.TOKEN_SECRET,//encoding key
                            { expiresIn: '24h' }//token expiration
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));// response error server problem
        })
        .catch(error => res.status(500).json({ error }));// response error server problem
};

// Get one account
exports.getOneAccount = (req, res, next) => {
    User.findOne({
        where: { id_user: req.params.id_user },
        attributes: { exclude: ['email', 'password'] },
    })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({ error }));
};

// Modify Account
exports.modifyAccount = (req, res, next) => {
    if (req.file) { //if a image 
        User.findById(req.params.id)// find one sauce by id 
            .then(account => {
                const filename = account.imageUrl.split('/images/')[1];//return the filename 
                fs.unlink(`images/${filename}`, () => { console.log('File of image is deleted!') });// To delete image 
            })
            .catch(error => res.status(400).json({ error }));//response error bad request
    }

    const accountObject = req.file ?//If in the request have a file
        {
            email: JSON.parse(req.body.account).email, //trandform a format JSOn to Js object
            service: JSON.parse(req.body.account).service,
            avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,// to generate a avatar
        } : {
            email: req.body.email,
            service: req.body.service
        };

    User.updateOne({ _id: req.params.id }, accountObject)// to update the profil with a modification
        .then(res.status(200).json({ message: "Account modify!" }))// response resuqest ok
        .catch(error => res.status(400).json({ error }));// response bad request
};