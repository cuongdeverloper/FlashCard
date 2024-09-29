const express = require('express');
const { addUser, getUserFromUserId, getId } = require('../controller/ApiUser');
const { apiLogin, apiRegister } = require('../controller/ApiAuth');
const { createRefreshToken, createJWT, decodeToken, checkAccessToken } = require('../middleware/JWTAction');
const passport = require('passport');
const { createQuestionPack, getAllQuestionPack, searchQuestionPack, addQuestionPackToClass, getQuestionPackById } = require('../controller/ApiQuestionPack');
const { addQuestionFlashCard, getQuestionFlashCardByQuestionPackId } = require('../controller/ApiQuestionFlashCard');
const { addComment, getComments, getCommentById, deleteComment, addReply, deleteReply } = require('../controller/ApiComment');
const { createClass, getClassById, getClassesForUser, inviteStudentToClass, getClassByClassId, removeQuestionPackFromClass, joinClassByInvite } = require('../controller/ApiClass');

const routerApi = express.Router();

routerApi.get('/id', checkAccessToken, getId)
//auth
routerApi.post('/auth', apiLogin);
routerApi.post('/register',apiRegister)
routerApi.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

routerApi.get('/google/redirect',
    passport.authenticate('google', { failureRedirect: 'http://localhost:7070/login' }),
    (req, res) => {

        const payload = { email: req.user.email, name: req.user.username, role: req.user.role, id: req.user.id };

        const accessToken = createJWT(payload);
        const refreshToken = createRefreshToken(payload);

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
routerApi.post('/user', addUser)
routerApi.get('/user/:userId', getUserFromUserId)

//Api QuestionPack
routerApi.post('/questionPack', checkAccessToken, createQuestionPack)
routerApi.get('/questionPack', getAllQuestionPack)
routerApi.get('/questionPacks/search', searchQuestionPack)
routerApi.get('/questionPacks/:questionPackId', getQuestionPackById)


routerApi.get('/questionPack/:questionPackId', getQuestionFlashCardByQuestionPackId)
//Api questionFC
routerApi.post('/question', addQuestionFlashCard)


//Api comment
routerApi.post('/questionpack/comments', checkAccessToken, addComment)
routerApi.get('/questionpack/comments/:flashcardId', checkAccessToken, getComments)
routerApi.get('/questionpack/comment/:commentId', getCommentById)
routerApi.delete('/questionpack/comment/:questionPackId/:commentId', checkAccessToken, deleteComment)
routerApi.post('/questionpack/comment/reply/:commentId',checkAccessToken,addReply)
routerApi.delete('/questionpack/comment/reply/:commentId/:replyId', checkAccessToken, deleteReply);

//Api class
routerApi.post('/class',checkAccessToken,createClass)
routerApi.get('/class',checkAccessToken,getClassesForUser);
routerApi.post('/class/invite',checkAccessToken,inviteStudentToClass)
routerApi.get('/class/:classId',checkAccessToken,getClassByClassId)
routerApi.post('/class/questionPackToClass',checkAccessToken,addQuestionPackToClass)
routerApi.delete('/class/removeQp',checkAccessToken,removeQuestionPackFromClass)
routerApi.get('/join-class/:token', checkAccessToken, joinClassByInvite);  
module.exports = { routerApi };
