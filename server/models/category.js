const {Connection} = require("./db")

const connect =()=> {
  const db = Connection.db;
  const categorias = db.collection("categorias");
  return categorias;
}
// Listar categorias
const getAllCategories = async () => {
    const categorias = connect();
    const list = await categorias.find({}).project({ _id: 0 }).toArray(); // Removed limit(5)
    if (list) return { message: "Lista de categorias", data: list };
    else return { message: "Error al listar las categorias", data: null };
};
// Buscar una categoria
const getCategory = async (id) => {
    const categorias = connect();
    const category = await categorias.findOne({_id: id});
    if (category) return {message: "Categoria Encontrada", data: category};
    else return {message: "Categoria no encontrada", data: null};
}
// Agregar una categoria
const addCategory = async (name, description) => {
  const categorias = connect();
  
  // Check if category already exists
  const existingCategory = await categorias.findOne({ name: name });
  if (existingCategory) {
      return { message: "Categoría ya existe", data: existingCategory };
  }
  
  // If category doesn't exist, insert it
  const newCategory = await categorias.insertOne({
      _id: name,
      name,
      description
  });
  
  if (newCategory) {
      return { message: "Categoría creada con éxito", data: newCategory };
  } else {
      return { message: "Error al crear la categoría" };
  }
};
// Actualizar una categoria
const updateCategory = async (name, description) => {
    const categorias = connect();;
    const categoryUpdated = await categorias.findOneAndUpdate(
      {
        _id: name
      },
      {
        $set: {
          name,
          description
        }
      });
      if (categoryUpdated) return {message: "Categoria actualizada con exito", data: categoryUpdated};
      return {message: "Error al actualizar la categoria"};
  };
// Eliminar una categoria
const deleteCategory = async (id) => {
    const categorias = connect();
    const categoryRemoved = await categorias.findOneAndDelete({_id: id});
    if (categoryRemoved) return {message: "Categoria eliminada con exito", data: categoryRemoved};
    return {message: "Error al eliminar la categoria"};
};
module.exports = {getAllCategories, getCategory, addCategory, updateCategory, deleteCategory}