import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';

const ListCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories here
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/category/list');
      if (response.ok) {
        const responseData = await response.json();
        setCategories(responseData.data || []);
      } else {
        console.error('Error listando categorías');
      }
    } catch (error) {
      console.error('Error listando categorías:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h5" gutterBottom style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '0.8rem' }}>
        Categorías
      </Typography>
      <TableContainer component={Paper} style={{ width: '50%', minWidth: '400px', }}>
        <Table size="small" aria-label="categories table">
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="body1" fontWeight="bold">Nombre</Typography></TableCell>
              <TableCell><Typography variant="body1" fontWeight="bold">Descripción</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={index}>
                <TableCell><Typography variant="body1">{category.name}</Typography></TableCell>
                <TableCell><Typography variant="body1">{category.description}</Typography></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListCategory;
