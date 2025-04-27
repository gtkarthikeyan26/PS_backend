import Product from '../models/product.model.js';
import mongoose from 'mongoose';
export const getProducts = async(req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createProduct = async(req, res) => {
    const product = req.body; //user will send product data
    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const newProduct = new Product(product);
    try{
        await newProduct.save();
        res.status(201).json({success: true , data: newProduct});
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

export const deleteProduct = async(req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, data: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProduct = async(req, res) => {
    const { id } = req.params;
    const product = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}