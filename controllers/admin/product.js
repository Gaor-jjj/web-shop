const Product = require('../../models/product');

class adminController {
    async addProduct(req, res) {
        const product = await Product.create({
            title: req.body.title,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            description: req.body.description
        })
        res.status(201).json({
            message: 'Product is added',
            productId: product.id
        })
    }
}

module.exports = new adminController;