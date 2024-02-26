import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper, Dialog, DialogTitle, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function UpdateProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/product/update/${name}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, stock, category }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setModalIsOpen(true);
      } else {
        setMessage('Error actualizando producto');
        setModalIsOpen(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error actualizando producto');
      setModalIsOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" fontWeight="Bold">
          Actualizar producto
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            label="Nombre"
            id="name"
          />
          <TextField
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            label="Descripción"
            id="description"
          />
          <TextField
            margin="normal"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            fullWidth
            label="Stock"
            type="number"
            id="stock"
          />
          <TextField
            margin="normal"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            label="Categoría"
            id="category"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
        <Dialog
          open={modalIsOpen}
          onClose={handleCloseModal}
          PaperProps={{
            style: {
              backgroundColor: '#fff',
              padding: '1rem',
              minWidth: '50%',
              maxWidth: '50%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            },
          }}
        >
          <DialogTitle style={{ textAlign: 'center', color: '#666' }}>{message}</DialogTitle>
          <DialogActions style={{ justifyContent: 'center' }}>
            <Button onClick={handleCloseModal} variant="contained" color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}

export default UpdateProduct;

