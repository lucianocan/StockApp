const {Connection} = require("./db")

const connect =()=> {
  const db = Connection.db;
  const productos = db.collection("productos");
  return productos;
}
// Listar productos
const getAllProducts = async () => {
    const productos = connect();
    const list = await productos.find({}).project({__id:0}).limit(5).toArray();
    if (list) return {message: "Lista de productos", data: list};
    else return {message: "Error al listar los productos", data: null};
}
// Buscar un producto
const getProduct = async (id) => {
    const productos = connect();
    const product = await productos.findOne({_id: id});
    if (product) return {message: "Producto encontrado", data: product};
    else return {message: "Producto no encontrado", data: null};
}
// Agregar un producto
const addProduct = async (name, description, stock, category) => {
  const productos = connect();
  
  // Check if product already exists
  const existingProduct = await productos.findOne({ name: name });
  if (existingProduct) {
      return { message: "Producto ya existe", data: existingProduct };
  }
  
  // If product doesn't exist, insert it
  const newProduct = await productos.insertOne({
      _id: name,
      name,
      description,
      stock,
      category
  });
  
  if (newProduct) {
      return { message: "Producto creado con éxito", data: newProduct };
  } else {
      return { message: "Error al crear el producto" };
  }
};

// Actualizar un producto
const updateProduct = async (name, description, stock, category) => {
    const productos = connect();
    const productUpdated = await productos.findOneAndUpdate(
      {
        _id: name
      },
      {
        $set: {
          name: name,
          description: description,
          stock: stock,
          category: category
        }
      });
      if (productUpdated) return {message: "Producto actualizado con exito", data: productUpdated};
      return {message: "Error al actualizar el producto"};
  };
// Eliminar un producto
const deleteProduct = async (id) => {
    const productos = connect();
    const productRemoved = await productos.findOneAndDelete({_id: id});
    if (productRemoved) return {message: "Producto eliminado con exito", data: productRemoved};
    return {message: "Error al eliminar el producto"};
};
module.exports = {getAllProducts, getProduct, addProduct, updateProduct, deleteProduct}