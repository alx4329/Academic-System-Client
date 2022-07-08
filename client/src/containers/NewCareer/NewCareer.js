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
    const [state, setState] = React.useState({
        name: '',
        code: '',
        years: ''
    })

    const handleChange = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        console.log(state)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
            if(state.name.length>0 && state.code.length>0 && state.years.length>0){
                dispatch(addCareer(state))
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
                    value && navigate(`/NewSubject/${newCareer.id}`);

                })

        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                            
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        name="name"
                                        required
                                        fullWidth
                                        id="nombre"
                                        label="Nombre"
                                        autoFocus
                                        value={state.name}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="codigo"
                                        label="Codigo"
                                        name="code"
                                        value={state.code}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        type="number"
                                        required
                                        fullWidth
                                        id="years"
                                        label="Cantidad de años"
                                        name="years"
                                        value={state.years}
                                        onChange={handleChange}
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