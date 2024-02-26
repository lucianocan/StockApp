import { useState } from 'react';
import { Button, Container, Typography, Box, TextField } from '@mui/material';
import Modal from 'react-modal';

const DeleteCategory = () => {
  const [categoryId, setCategoryId] = useState('');
  const [message, setMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/category/delete/${categoryId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setModalIsOpen(true);
      } else {
        setMessage('Error borrando categoría');
        setModalIsOpen(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error borrando categoría');
      setModalIsOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Container component="main" maxWidth="xl">
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" fontWeight="Bold">
          Borrar Categoría
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, maxWidth: '50%' }}>
          <TextField
            margin="normal"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            fullWidth
            label="Nombre de la Categoría"
            id="category-id"
            sx={{ width: '100%' }} 
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Borrar
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
          <div style={{ textAlign: 'center', color: '#888' }}>
            <Typography variant="h6">{message}</Typography>
            <Button onClick={handleCloseModal} variant="contained" color="primary" sx={{ mt: 2 }}>
              Cerrar
            </Button>
          </div>
        </Modal>
      </Box>
    </Container>
  );
};

export default DeleteCategory;
