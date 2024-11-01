const Product = require('../models/product');
const Cart = require('../models/cart');
const CartItem = require('../models/cart-item');

class shopController {
    async getCart(req, res) {
        const userCart = await req.user.getCart()
        console.log(userCart)
        const cartProducts = await userCart.getProducts()
        res.status(201).json({
            products: cartProducts
        })
    }

    async addToCart(req, res) {
        const productId = req.body.productId;
        const quantityToAdd = parseInt(req.body.quantity, 10) || 1;

        try {
            const userCart = await req.user.getCart();
            const [cartProduct] = await userCart.getProducts({ where: { id: productId } })

            let newQuantity = quantityToAdd;

            if (cartProduct) {
                const currentQuantity = cartProduct.cartItem.quantity;
                newQuantity += currentQuantity
                await cartProduct.cartItem.update({ quantity: newQuantity});
            } else {
                const product = await Product.findByPk(productId);
                if (product) {
                    await userCart.addProduct(product, { through: { quantity: newQuantity } })
                } else {
                    return res.status(404).json({ message: 'Product not found' })
                }
            }
            
            res.status(200).json({ message: 'Product added to cart', productId, quantity: newQuantity})
        } catch (error) {
            console.error('Error adding product to cart: ', error)
            res.status(500).json({ message: 'Error adding product to cart', error })
        }
    }

    async removeFromCart(req, res) {
        const productId = req.body.productId;

        try {
            const userCart = await req.user.getCart();
            const cartProduct = await userCart.getProducts({ where: { id: productId } })

            if (cartProduct.length > 0) {
                await userCart.removeProduct(productId);
                res.status(200).json({ message: 'Product removed from cart', productId })
            } else {
                res.status(404).json({ message: 'Product not found in cart' })
            }
        } catch (error) {
            console.error('Error removing product from cart: ', error)
            res.status(500).json({ message: 'Error removing product from cart', error })
        }
    }
}

module.exports = new shopController()