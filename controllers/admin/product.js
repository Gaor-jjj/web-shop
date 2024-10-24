const Product = require('../../models/product');

class adminController {
    async addProduct(req, res) {
        const product = await Product.create({
            title: req.body.title,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            description: req.body.description,
            userId: req.user.id
        })
        res.status(201).json({
            message: 'Product is added',
            productId: product.id
        })
    }

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

            if (!product) {
                return res.status(404).json({ error: 'Product not found'});
            }

            res.status(200).json(product);
        } catch (error) {
            console.log('Error fetching product: ', error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    async editProduct(req, res) {
        const productId = req.params.id;

        if (req.query.edit !== 'true') {
            return res.status(400).json({ error: 'Editing not allowed' })
        }

        try {
            const product = await Product.findByPk(productId);

            if (!product) {
                return res.status(404).json({ error: 'Product not found'})
            }

            const updatedProduct = await product.update({
                title: req.body.title || product.title,
                price: req.body.price || product.price,
                imageUrl: req.body.imageUrl || product.imageUrl,
                description: req.body.description || product.description
            })

            res.status(200).json({
                message: 'Product updated successfully',
                product: updatedProduct
            })
        } catch (error) {
            console.error('Error updating product: ', error);
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    async deleteProduct(req, res) {
        const productId = req.params.id;

        try {
            const product = await Product.findByPk(productId);

            if (!product) {
                return res.status(404).json({ error: 'Product not found' })
            }

            await product.destroy();
            res.status(200).json({ message: 'Product deleted successfully' })

        } catch (error) {
            console.error('Error deleting product: ', error);
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}

module.exports = new adminController;