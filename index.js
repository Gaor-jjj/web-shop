const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const productAdminRoutes = require('./routes/admin/product');
app.use('/admin', productAdminRoutes);

const sequelize = require('./util/db')
const models = require('./models/index');
sequelize.models = models;

sequelize
    .sync()
    .then(() => {
        app.listen(3002);
        console.log('Listening on port 3002')
    })
    .catch((error) => {
        console.log(error)
    })