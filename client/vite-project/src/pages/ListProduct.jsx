import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

const ListProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products here
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/product/list');
      if (response.ok) {
        const responseData = await response.json();
        setProducts(responseData.data || []);
      } else {
        console.error('Error listando productos');
      }
    } catch (error) {
      console.error('Error listando productos:', error);
    }
  };

  return (
    <>
      <Typography variant="h5" gutterBottom style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '1.5rem' }}>
        Lista de productos
      </Typography>
      <Box display="flex" justifyContent="center" height="100vh">
        <TableContainer component={Paper} style={{ maxWidth: '70%' }}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Descripción</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Stock</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Categoría</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default ListProduct;
