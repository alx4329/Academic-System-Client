import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/reducer/authReducer';
import { getCareers } from '../../redux/reducer/careerReducer';
import CollapseButton from './CollapseButton';
import { userTypes } from '../../utils/constants';

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const careers = useSelector(state => state.career.careers);
    
    const goRegister = () =>{
        navigate('/register');
    }
    const goCreateCareer = ()=>{        
        navigate('/newCareer');
    }
    const goCareer = (id)=>{
        navigate(`/plan/${id}`);
    }

    const goUsers = (id)=>{
        navigate(`/users/${id}`)
    }
    const signOut = () =>{
        dispatch(logout())
        setTimeout(()=>{
        navigate('/login');
        },1000)
    }
    React.useEffect(()=>{
        dispatch(getCareers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky" height="10%" >
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
                        SIU IPESMI - {user.nombre + " " + user.apellido }
                    </Typography>
                    {
                        (user.rol === "Admin" || user.rol === "SuperAdmin") &&
                        <>
                            <Button onClick={goRegister} color="inherit">Nuevo Usuario</Button>
                            <Button onClick={goCreateCareer} color="inherit">Nueva Carrera</Button>
                            <CollapseButton 
                                title="Usuarios" 
                                items={userTypes}
                                onClickAction={goUsers}
                                />
                            <CollapseButton 
                                title="Carreras" 
                                items={careers}
                                onClickAction={goCareer}
                                />
                            
                            
                        </>
                        
                    }
                            <Button onClick={signOut} color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
    }
