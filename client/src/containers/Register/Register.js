import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
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
import { register } from '../../redux/reducer/authReducer';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

const theme = createTheme();
const Register = () => {
    const navigate = useNavigate();
    const [validEmail, setValidEmail] = React.useState(false);
    const [rol, setRol] = React.useState("");
    const dispatch = useDispatch();

    const newUser = useSelector(state => state.auth.newUser);
    const error = useSelector(state => state.auth.error);
    const emailChange = (event) =>{
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(event.target.value.match(mailformat)){
            setValidEmail(true);
        } else setValidEmail(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data)
        if(validEmail && data.get('password').length>0 && data.get('firstName').length>0 && data.get('lastName').length>0 && data.get('dni').length>0 && data.get('username').length>0 && rol.length>0){
            console.log("DISPATCHINNNNNG")
            dispatch(register({
                email: data.get('email'),
                password: data.get('password'),
                firstName: data.get('firstName'),
                lastName: data.get('lastName'),
                dni: data.get('dni'),
                username: data.get('username'),
                rol: rol
            }))
        } else {
            alert("Please fill out all fields")
        }
      };
    React.useEffect(()=>{
        if(newUser){
            Swal.fire({
                title: 'Usuario Creado!',
                text: 'Puede iniciar sesion',
                icon: 'success',
                confirmButtonText: 'Ir'
              }).then((value)=>{
                
                value && navigate('/login');

              })

        }

    },[newUser])

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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
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
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            required
                            fullWidth
                            id="username"
                            label="User Name"
                            name="username"
                            
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={(e)=>emailChange(e)}
                            helperText={validEmail? null :"Please enter a valid email"}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            />
                        </Grid>
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
                                    <MenuItem value={"Admin"}>Admin</MenuItem>
                                    <MenuItem value={"Docente"}>Docente</MenuItem>
                                    <MenuItem value={"Estudiante"}>Estudiante</MenuItem>
                                </Select>

                        </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                            Already have an account? Sign in
                            </Link>
                        </Grid>
                        </Grid>
                    </Box>
                    </Box>
                    
                </Container>
            </ThemeProvider>
    )
}

export default Register;