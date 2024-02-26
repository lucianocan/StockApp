import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function AddCategory() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false); // State to track button click

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/category/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setModalIsOpen(true);
      } else {
        setMessage('Error agregando Categoría');
        setModalIsOpen(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error agregando Categoría');
      setModalIsOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleEnviarClick = () => {
    setButtonClicked(true); // Set buttonClicked to true when "Enviar" button is clicked
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
          Agregar Categoría
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
          {buttonClicked && ( // Render the following if button is clicked
            <>
              <TextField
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                label="Descripción"
                id="description"
              />
            </>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleEnviarClick}>
            Enviar
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
              top: '60%', // Adjusted to be 10% more towards the bottom
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
}

export default AddCategory;

