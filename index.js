const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const sequelize = require('./util/db')
const models = require('./models/index');
sequelize.models = models;

app.use((req, res, next) => {
    models.User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
})

// Routes
const productAdminRoutes = require('./routes/admin/product');
app.use('/admin', productAdminRoutes);
const productRoutes = require('./routes/product');
app.use(productRoutes);
const shopRoutes = require('./routes/shop');
app.use(shopRoutes)

sequelize
    .sync()
    .then(() => {
        return models.User.findByPk(1)
    })
    .then(user => {
        if (!user) {
            return models.User.create({ name: 'user', email: 'user@local.com'})
        }
        return user;
    })
    .then(async (user) => {
        const cart = await user.getCart();
        if (!cart) {
            return user.createCart();
        }
        return cart;
    })
    .then((cart) => {
        console.log('User cart:', cart)
        app.listen(3002)
    })
    .catch((error) => {
        console.log(error)
    })