const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const {connect} = require("mongoose");
const checkAuth = require('./middlewares/checkAuth');

const UsersController = require('./controllers/UsersController');
const LinksController = require('./controllers/LinksController');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/static', express.static('public'));
app.use(fileUpload());

/* USERS */
app.post('/api/users/register', UsersController.register);
app.post('/api/users/login', UsersController.login);
app.get('/api/users/me', checkAuth, UsersController.getMe);
app.patch('/api/users/save', checkAuth, UsersController.saveMe);

/* LINKS */
app.post('/api/links', checkAuth, LinksController.save);
app.get('/api/links', checkAuth, LinksController.getAll);

(async () => {
    try {
        await mongoose.connect(config.DB_URL);
        console.log('DB OK');

        app.listen(config.PORT, () => {
            console.log('Server OK');
        });
    } catch (err) {
        console.log(err);
    }
})();
