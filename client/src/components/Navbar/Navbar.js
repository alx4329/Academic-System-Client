import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/reducer/authReducer';

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goRegister = () =>{
        navigate('/register');
    }
    const goCreateCareer = ()=>{
        alert('funcion no lista');
        // navigate('/createcareer');
    }
    const signOut = () =>{
        dispatch(logout())
        setTimeout(()=>{
        navigate('/login');
        },1000)
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        SIU IPESMI
                    </Typography>
                    <Button onClick={goRegister} color="inherit">Nuevo Usuario</Button>
                    <Button onClick={goCreateCareer} color="inherit">Nueva Carrera</Button>
                    <Button onClick={signOut} color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
    }
