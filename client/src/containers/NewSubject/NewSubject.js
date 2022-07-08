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
import { cleanError, getCareer, newSubject} from '../../redux/reducer/careerReducer';
import Swal from 'sweetalert2'
import {  useParams } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const theme = createTheme();

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
// COMPONENT
const NewSubject = () => {
    const dispatch = useDispatch();
    const {careerId} = useParams();
    const [state, setState] = React.useState({
        nombre: '',
        codigo: '',
        año:'',  
        toCourse:[],
        toTakeExam:[],
        lastSubject:false,
        period:''
    })
    const error = useSelector(state => state.career.error);
    React.useEffect(()=>{
        if(error){
            Swal.fire({
                title: 'Error!',
                text: error,
                icon: 'error',
                confirmButtonText: 'Ok'
              }).then((value)=>{
                
                value && cleanError();
              })

        }

    },[error])
    const career = useSelector(state => state.career.career);
    const createdSubject = useSelector(state => state.career.createdSubject);

    
    const handleRelatives = (event) => {
        setState({
            ...state,
            [event.target.name]: typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value,
        })
        console.log(state)
      };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!state.nombre || !state.codigo || !state.año || !state.period ) {
            Swal.fire({
                text: "completar todos los campos",
                toast: true,
            })
        } else {
            const info = {
                name: state.nombre,
                code: state.codigo,
                year: state.año,
                toCourse:state.toCourse,
                toTakeExam: state.toTakeExam,
                careerId: careerId,
                lastSubject: state.lastSubject,
                period: state.period
            }
            await dispatch(newSubject({info}))
        }        
    }
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        console.log(state)
    }
    React.useEffect(()=>{
            if(careerId) {
                dispatch(getCareer({careerId}))
            }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[careerId])
    React.useEffect(()=>{
        if(createdSubject){
            Swal.fire({
                title: 'Asignatura Creada!',
                text: 'Continuar Agregando',
                icon: 'success',
                confirmButtonText: 'Agregar'
              }).then((value)=>{
                console.log(value)
                value && window.location.reload()
              })
        }
    },[createdSubject])
    

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
                        
                        <Typography component="h1" variant="h6">
                            Nueva Materia - {career?.name}
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>                            
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        name="nombre"
                                        required
                                        fullWidth
                                        id="nombre"
                                        label="Nombre"
                                        autoFocus
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="codigo"
                                        label="Codigo"
                                        name="codigo"
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="año"
                                        label="Año"
                                        name="año"
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={24} sm={12}>
                                    <InputLabel id="demo-multiple-name-label">Correlativas para cursar</InputLabel>
                                        <Select
                                            labelId="demo-multiple-name-label"
                                            id="demo-multiple-name"
                                            multiple
                                            value={state.toCourse}
                                            name="toCourse"
                                            onChange={handleRelatives}
                                            input={<OutlinedInput label="Correlativas" fullWidth />}
                                            MenuProps={MenuProps}
                                    >
                                    { career && career.subjects.map((subject) => (
                                        <MenuItem
                                            key={subject.name}
                                            value={subject.id}
                                            style={getStyles(subject.name, subject.name, theme)}
                                            >
                                            {subject.name}
                                        </MenuItem>
                                    ))}
                                    </Select>

                                </Grid>
                                <Grid item xs={24} sm={12}>
                                    <InputLabel id="demo-multiple-name-label">Correlativas para Rendir</InputLabel>
                                        <Select
                                            labelId="demo-multiple-name-label"
                                            id="demo-multiple-name"
                                            multiple
                                            value={state.toTakeExam}
                                            name="toTakeExam"
                                            onChange={handleRelatives}
                                            input={<OutlinedInput label="Correlativas" fullWidth />}
                                            MenuProps={MenuProps}
                                    >
                                    { career && career.subjects.map((subject) => (
                                        <MenuItem
                                            key={subject.name}
                                            value={subject.id}
                                            style={getStyles(subject.name, state.toCourse, theme)}
                                            >
                                            {subject.name}
                                        </MenuItem>
                                    ))}
                                    </Select>

                                </Grid>
                                <Grid item xs={24} sm={12}>
                                    <InputLabel id="demo-multiple-name-label">Periodo</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"                                        
                                        value={state.period}
                                        name="period"
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Periodo" fullWidth />}
                                        MenuProps={MenuProps}
                                    >
                                        <MenuItem
                                            key='Primero'
                                            value='Primero'
                                            style={getStyles('Primero','Primero',  theme)}
                                            >
                                            {'1° Cuatrimestre'}
                                        </MenuItem>
                                        <MenuItem
                                            key='Segundo'
                                            value='Segundo'
                                            style={getStyles('Segundo','Segundo',  theme)}
                                            >
                                            {'2° Cuatrimestre'}
                                        </MenuItem>
                                        <MenuItem
                                            key='Anual'
                                            value='Anual'
                                            style={getStyles('Anual', 'Anual', theme)}
                                            >
                                            {'Anual'}
                                        </MenuItem>

                                    </Select>
                                    <FormControlLabel 
                                        control={
                                            <Checkbox 
                                            checked={state.lastSubject}
                                            onChange={()=>setState({...state, lastSubject: !state.lastSubject})}    
                                        />} 
                                        label="Ultima Materia" 
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
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
    )
}

export default NewSubject;

