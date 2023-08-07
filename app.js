const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();


//middlewares
// Use the built-in express.urlencoded() middleware to parse the request body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/static',express.static('public'));

app.set('view engine', 'pug');

const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);

});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});



app.listen(3000, () => {
    console.log('listening on port 3000');
});
