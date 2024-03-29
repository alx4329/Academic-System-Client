import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { cleanError, register } from '../../redux/reducer/authReducer';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import {cleanNewUser} from '../../redux/reducer/authReducer'

const theme = createTheme();

const Register = () => {
    const navigate = useNavigate();
    const [badEmail, setBadEmail] = React.useState(null);
    const [rol, setRol] = React.useState("");
    const careers = useSelector(state => state.career.careers)
    const [career, setCareer] = React.useState("")

    const loggedUser = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const newUser = useSelector(state => state.auth.newUser);
    const error = useSelector(state => state.auth.error);

    const emailChange = (event) =>{
        var mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        if(event.target.value.length>4 && !event.target.value.match(mailformat)){
            setBadEmail(true);
        } else setBadEmail(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(data.get('email').length>4 &&  !badEmail && data.get('password').length>0 && data.get('firstName').length>0 && data.get('lastName').length>0 && data.get('dni').length>0 && data.get('username').length>0 && rol.length>0){
            const userInfo={
                email: data.get('email'),
                password: data.get('password'),
                nombre: data.get('firstName'),
                apellido: data.get('lastName'),
                dni: data.get('dni'),
                username: data.get('username'),
                rol: rol,
                fileNumber: data.get('Legajo'),
            }
            if(rol ==="Estudiante") userInfo.careerId=career
            console.log(userInfo)
            dispatch(register(userInfo))
        } else {
            Swal.fire({
                text: "completar todos los campos",
                toast: true,
            })
        }
      };
    React.useEffect(()=>{
        if(newUser){
            dispatch(cleanNewUser());
            Swal.fire({
                title: 'Usuario Creado!',
                text: 'El usuario ha sido creado correctamente',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((value)=>{
                value && window.location.reload()
                  

              })

        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[newUser])

    React.useEffect(()=>{
        if(error){
            console.log(error)
            Swal.fire({
                title: 'Error!',
                text: error,
                icon: 'error',
                confirmButtonText: 'Ok'
              }).then((value)=>{
                dispatch(cleanError())
                
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
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Nuevo Usuario
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <InputLabel id="simple-select-label">Rol</InputLabel>
                        <Select
                            labelId="simple-select-label"
                            id="simple-select"
                            value={rol}
                            label="Rol"
                            onChange={(e)=>setRol(e.target.value)}
                            fullWidth
                            
                        >
                            {loggedUser.rol === "SuperAdmin"?<MenuItem value={"Admin"}>Admin</MenuItem>:null}
                            <MenuItem value={"Docente"}>Docente</MenuItem>
                            <MenuItem value={"Estudiante"}>Estudiante</MenuItem>
                        </Select>

                </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="Nombre"
                            autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Apellido"
                            name="lastName"
                            autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            name="dni"
                            required
                            fullWidth
                            id="dni"
                            label="DNI"
                            autoFocus
                            type="number"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            required
                            fullWidth
                            id="username"
                            label="Usuario"
                            name="username"
                            
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            onChange={(e)=>emailChange(e)}
                            helperText={badEmail? "Please enter a valid email" :null}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            />
                        </Grid>
                        {
                        (rol === "Estudiante" || rol === "Docente") &&   <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                name="Legajo"
                                label="Legajo"
                                type="text"
                                id="Legajo"
                                />
                            </Grid>
                        }
                        {
                        (rol === "Estudiante" ) &&   <Grid item xs={12}>
                                <InputLabel id="simple-select-label">Carrera</InputLabel>
                                <Select
                                    labelId="simple-select-label"
                                    id="simple-select"
                                    value={career}
                                    label="Carrera"
                                    onChange={(e)=>setCareer(e.target.value)}
                                    fullWidth  
                                >
                                    {
                                        careers.map((item)=><MenuItem key={item.id} value={item.id} >
                                            {item.name}
                                        </MenuItem>)
                                    }
                                </Select>
                            </Grid>
                        }
                        
                        </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                >
                                Registrar
                            </Button>
                        <Grid container justifyContent="flex-end">
                        
                    </Grid>
                </Box>
            </Box>
            
        </Container>
    </ThemeProvider>
    )
}

export default Register;