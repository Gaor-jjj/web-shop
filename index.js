const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const productAdminRoutes = require('./routes/admin/product');
app.use('/admin', productAdminRoutes);
const productRoutes = require('./routes/product');
app.use(productRoutes);

const sequelize = require('./util/db')
const models = require('./models/index');
sequelize.models = models;

sequelize
    .sync()
    .then(() => {
        return models.User.FindByPk(1)
    })
    .then(user => {
        if (!user) {
            return models.User.create({ name: 'user', email: 'user@local.com'})
        }
        return user;
    })
    .then((user) => {
        console.log(user)
        app.listen(3002);
        console.log('Listening on port 3002')
    })
    .catch((error) => {
        console.log(error)
    })