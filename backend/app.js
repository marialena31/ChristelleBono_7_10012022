//Call to dotenv 
const dotenv = require('dotenv');

//Call to function of dotenv config
dotenv.config({ path: './.env' });

const path = require('path');

//Call to sequelize for use
const sequelize = require('./sequelize');

//Call to express for use
const express = require('express');

//Synchronisation des tables
const dbComment = require('./models/Comment');
const dbCommentModerate = require('./models/CommentModerate');
const dbPost = require('./models/Post');
const dbPostDislike = require('./models/PostDislike');
const dbPostLike = require('./models/PostLike');
const dbPostModerate = require('./models/PostModerate');
const dbUser = require('./models/User');
const dbUserlog = require('./models/UserLog');
const dbModerate = require('./models/Moderator');

//Call the file to have  defined user routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require ('./routes/postRoutes');
const commentRoutes = require ('./routes/commentRoutes');
const countRoutes = require('./routes/countRoutes');

//App use the method express
const app = express();

//Allows to manage the authorization
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');//authorization from all origins
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//authorization of all listed headers
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//authorization of all listed methods
    next();
});

sequelize.sync()
app.get("/", (req, res) => {
    res.json({ message: "model syncro!" });
});

//app use to express formated json
app.use(express.json());

//app use to userRoute who defined the routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/count', countRoutes);

module.exports = app;