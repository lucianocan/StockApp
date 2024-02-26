// Controladores: Son los encargados de recibir los parametros y de enviar las respuestas de las peticiones.
// En los modelos es en donde esta la logica de cada función.

const product = require("../models/product");
const log = require("../lib/log");

exports.getAllProducts = async (req,res) => {
    try {
        const response = await product.getAllProducts();
        return res.status(200).send(response);
    } catch (error) {
        log.error("ProductController", error);
        throw(error);
    }
};
exports.getProduct = async (req,res) => {
    try {
        const id = req.params.id;
        const response = await product.getProduct(id);
        return res.status(200).send(response);
    } catch (error) {
        log.error("ProductController", error);
        throw(error);
    }
};
exports.addProduct = async (req,res) => {
    try {
        const {name, description, stock, category} = req.body;
        const response = await product.addProduct(name, description, stock, category);
        return res.status(200).send(response);
    } catch (error) {
        log.error("ProductController", error);
        throw(error);
    }
};
exports.updateProduct = async (req,res) => {
    try {
        const {name, description, stock, category} = req.body;
        const response = await product.updateProduct(name, description, stock, category);
        return res.status(200).send(response);
    } catch (error) {
        log.error("ProductController", error);
        throw(error);
    }
};
exports.deleteProduct = async (req,res) => {
    try {
        const id = req.params.id;
        const response = await product.deleteProduct(id);
        return res.status(200).send(response);
    } catch (error) {
        log.error("ProductController", error);
        throw(error);
    }
};