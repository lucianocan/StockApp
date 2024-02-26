import * as React from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Typography from '@mui/material/Typography';
import AddCategory from './pages/AddCategory';
import AddProduct from './pages/AddProduct';
import DeleteProduct from './pages/DeleteProduct'; 
import DeleteCategory from './pages/DeleteCategory';
import UpdateCategory from './pages/UpdateCategory';
import UpdateProduct from './pages/UpdateProduct';
import ListCategory from './pages/ListCategory';
import ListProduct from './pages/ListProduct';

const AddCategoryComponent = () => <AddCategory />;
const AddProductComponent = () => <AddProduct />;
const DeleteProductComponent = () => <DeleteProduct />;
const DeleteCategoryComponent = () => <DeleteCategory />;
const UpdateCategoryComponent = () => <UpdateCategory />;
const UpdateProductComponent = () => <UpdateProduct />;
const ListCategoryComponent = () => <ListCategory />;
const ListProductComponent = () => <ListProduct />;

export default function App() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BrowserRouter>
      <main>
       <Typography  variant="h4" gutterBottom fontWeight="Bold" align="center">
          StockApp
        </Typography>
        <Routes>
          <Route path='/add-category' element={<AddCategoryComponent />} />
          <Route path='/add-product' element={<AddProductComponent />} />
          <Route path='/delete-product' element={<DeleteProductComponent />} /> 
          <Route path='/delete-category' element={<DeleteCategoryComponent />} />
          <Route path='/update-category' element={<UpdateCategoryComponent />} />
          <Route path='/update-product' element={<UpdateProductComponent />} />
          <Route path='/list-category' element={<ListCategoryComponent />} />
          <Route path='/list-product' element={<ListProductComponent />} />
        </Routes>
        <BottomNavigation
          sx={{ width: '100%', position: 'fixed', bottom: 0 }}
          value={value}
          onChange={handleChange}
          showLabels={true}
        >
          <BottomNavigationAction
            label="Añadir Categoría"
            value="/add-category"
            component={Link}
            to="/add-category"
          />
          <BottomNavigationAction
            label="Añadir Producto"
            value="/add-product"
            component={Link}
            to="/add-product"
          />
          <BottomNavigationAction
            label="Borrar Producto"
            value="/delete-product"
            component={Link}
            to="/delete-product"
          />
          <BottomNavigationAction
            label="Borrar Categoría"
            value="/delete-category"
            component={Link}
            to="/delete-category"
          />
          <BottomNavigationAction
            label="Actualizar Categoría"
            value="/update-category"
            component={Link}
            to="/update-category"
          />
          <BottomNavigationAction
            label="Actualizar Producto"
            value="/update-product"
            component={Link}
            to="/update-product"
          />
          <BottomNavigationAction
            label="Listar Categorías"
            value="/list-category"
            component={Link}
            to="/list-category"
          />
          <BottomNavigationAction
            label="Listar Productos"
            value="/list-product"
            component={Link}
            to="/list-product"
          />
        </BottomNavigation>
      </main>
    </BrowserRouter>
  );
}
