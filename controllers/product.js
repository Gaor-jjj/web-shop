const Product = require('../models/product');

class productController {

    async getAllProducts(req, res) {
        const products = await Product.findAll()
        res.status(200).json({
            products: products
        })
    }

    async getProductById(req, res) {
        const productId = req.params.id;

        try {
            const product = await Product.findByPk(productId);

            if(!product) {
                return res.status(404).json({ error: 'Product not found'});
            }

            res.status(200).json(product);
        } catch (error) {
            console.log('Error fetching product: ', error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}

module.exports = new productController;