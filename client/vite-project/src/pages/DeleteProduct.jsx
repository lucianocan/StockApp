import { useState } from 'react';
import { Button, Container, Typography, Box, TextField } from '@mui/material'; 
import Modal from 'react-modal';
import { styled } from '@mui/material/styles'; 

const Item = styled('div')(({ theme }) => ({ 
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function DeleteProduct() {
  const [productId, setProductId] = useState('');
  const [message, setMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/product/delete/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setModalIsOpen(true);
      } else {
        setMessage('Error borrando producto');
        setModalIsOpen(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error borrando producto');
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
          Eliminar Producto
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            fullWidth
            label="Nombre del Producto"
            id="productId"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Eliminar
          </Button>
        </Box>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              fontFamily: 'inherit',
              fontSize: '1rem',
              padding: '1rem',
              width: 'calc(50% + 40px)', 
              maxWidth: 'calc(50% + 40px)', 
            },
          }}
        >
          <Item>
            <Typography variant="h6">{message}</Typography>
            <Button onClick={handleCloseModal} variant="contained" color="primary" sx={{ mt: 2 }}>
              Cerrar
            </Button>
          </Item>
        </Modal>
      </Box>
    </Container>
  );
}

export default DeleteProduct;
