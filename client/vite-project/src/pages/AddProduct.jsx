import { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper, MenuItem, Dialog, DialogTitle, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function AddProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [message, setMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/category/list');
        if (response.ok) {
          const data = await response.json();
          if (data && data.data && Array.isArray(data.data)) {
            setCategories(data.data); 
          }
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/product/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, category, stock }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setModalIsOpen(true);
      } else {
        setMessage('Error adding product');
        setModalIsOpen(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error adding product');
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
          Agregar Producto
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
            select
            margin="normal"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            label="Categoría"
            id="category"
          >
            {categories.map((cat) => (
              <MenuItem key={cat.name} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="normal"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            fullWidth
            label="Stock"
            id="stock"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Enviar
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

export default AddProduct;
