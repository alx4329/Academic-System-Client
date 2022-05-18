import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { addCareer, cleanNewCareer} from '../../redux/reducer/careerReducer';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const NewCareer = () => {
    const dispatch = useDispatch();
    
    const newCareer = useSelector(state => state.career.newCareer);
    const error = useSelector(state => state.career.error);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
            if(data.get('nombre').length>0 && data.get('codigo').length>0){
                dispatch(addCareer({
                    name: data.get('nombre'),
                    code: data.get('codigo'),
                }))
            }
    }

    React.useEffect(()=>{
        if(newCareer){
            Swal.fire({
                title: 'Carrera Creada!',
                text: 'Ahora puede agregar el plan de estudios',
                icon: 'success',
                confirmButtonText: 'Agregar'
              }).then((value)=>{
                dispatch(cleanNewCareer());
                value && navigate('/createStudyplan');

              })

        }

    },[newCareer])

    React.useEffect(()=>{
        if(error){
            Swal.fire({
                title: 'Error!',
                text: error,
                icon: 'error',
                confirmButtonText: 'Ok'
              }).then((value)=>{
                
                value && window.location.reload();
              })

        }

    },[error])

    return (
        <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                        <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        
                        <Typography component="h1" variant="h5">
                            Nueva Carrera
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                            
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="nombre"
                                        required
                                        fullWidth
                                        id="nombre"
                                        label="nombre"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="codigo"
                                        label="codigo"
                                        name="codigo"
                                    />
                                </Grid>
                                
                                
                                
                                </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        >
                                        Crear
                                    </Button>
                                <Grid container justifyContent="flex-end">
                                
                            </Grid>
                        </Box>
                    </Box>
                    
                </Container>
            </ThemeProvider>
    )
}

export default NewCareer;