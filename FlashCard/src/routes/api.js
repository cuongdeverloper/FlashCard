const express = require('express');
const { addUser, getUserFromUserId, getId } = require('../controller/ApiUser');
const { apiLogin } = require('../controller/ApiAuth');
const { createRefreshToken, createJWT, decodeToken, checkAccessToken } = require('../middleware/JWTAction');
const passport = require('passport');
const { createQuestionPack, getAllQuestionPack } = require('../controller/ApiQuestionPack');
const { addQuestionFlashCard, getQuestionFlashCardByQuestionPackId } = require('../controller/ApiQuestionFlashCard');
const { addComment, getComments, getCommentById } = require('../controller/ApiComment');

const routerApi = express.Router();

routerApi.get('/id',checkAccessToken,getId)
routerApi.post('/auth',apiLogin)
routerApi.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

routerApi.get('/google/redirect',
    passport.authenticate('google', { failureRedirect: 'http://localhost:7070/login' }),
    (req, res) => {
        // Successful authentication, redirect home.
        // res.redirect('http://localhost:6969/');
        const payload = { email: req.user.email, name: req.user.username, role: req.user.role, id:req.user.id };

        const accessToken = createJWT(payload);
        const refreshToken = createRefreshToken(payload);
        // res.json({
        //     accessToken: accessToken,
        //     refreshToken: refreshToken,
        //     user: req.user
        // });
        res.render('social.ejs', { accessToken: accessToken, refreshToken: refreshToken, user: req.user })
    });
    routerApi.post('/decode-token', (req, res) => {
        const { token } = req.body;
        const data = decodeToken(token);
        if (data) {
            res.json({ data });
        } else {
            res.status(400).json({ error: 'Invalid token' });
        }
    });

//APiUser
routerApi.post('/user',addUser)
routerApi.get('/user/:userId',getUserFromUserId)

//Api QuestionPack
routerApi.post('/questionPack',checkAccessToken,createQuestionPack)
routerApi.get('/questionPack',getAllQuestionPack)

routerApi.get('/questionPack/:questionPackId',getQuestionFlashCardByQuestionPackId)
//Api questionFC
routerApi.post('/question',addQuestionFlashCard)


//Api comment
routerApi.post('/questionpack/comments',checkAccessToken,addComment)
routerApi.get('/questionpack/comments/:flashcardId',getComments)
routerApi.get('/questionpack/comment/:commentId',getCommentById)

module.exports = { routerApi };
