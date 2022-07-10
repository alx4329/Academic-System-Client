import React from 'react'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import { createTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import { periodOptions } from '../../utils/constants';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { updateSubject } from '../../redux/reducer/careerReducer';
import { cleanError } from '../../redux/reducer/careerReducer';

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


const EditSubject = ({row})=>{
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false)
    const period = row.period === '1°C' ? 'Primero' : (row.period === '2°C'? "Segundo" : "Anual") 
    const [state, setState] = React.useState({
        nombre: row.name,
        codigo: row.code,
        año:row.year,  
        toCourse:[],
        toTakeExam:[],
        lastSubject:false,
        period
    })
    const career = useSelector(state => state.career.career)

    const [years, setYears]=React.useState([])
    
    React.useEffect(()=>{
        let numbers= []
        for(let i=1 ; i<career.years+1; i++){
           numbers.push(i)
        }
        setYears(numbers)
    },[career])


    const handleOpen = () => {
        setOpen(!open)
    }

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
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
                lastSubject: state.lastSubject,
                period: state.period
            }
            await dispatch(updateSubject({info, id:row.id}))
            handleOpen()
        }        
    }
    const handleRelatives = (event) => {
        setState({
            ...state,
            [event.target.name]: typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value,
        })
        console.log(state)
        };
    
    return(
        <>
            <div className="icons-container">
                <Button onClick={handleOpen} >
                    <span className="material-symbols-outlined">edit</span></Button>
            </div>
            {
                
                <Dialog open={open} onClose={handleOpen}>
                    <DialogTitle>Editar Materia</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Datos:</DialogContentText>
                        <TextField
                            autoFocus
                            name="nombre"
                            value={state.nombre}
                            required
                            fullWidth
                            margin="dense"
                            id="nombre"
                            label="Nombre"
                            type="text"
                            variant="standard"
                            // value={state.id_senasa}
                            onChange={(e) => { handleChange(e)}}
                        />
                        <InputLabel id="demo-name-label">Tipo de animal</InputLabel>

                        <TextField
                            autoFocus
                            name="codigo"
                            value={state.codigo}
                            margin="dense"
                            id="codigo"
                            label="Codigo"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) =>{handleChange(e)}}
                            
                            
                        />
                        
                         <InputLabel id="demo-name-label">Año</InputLabel>
                            <Select
                                labelId="demo-name-label"
                                id="demo-multiple-name"
                                value={state.año}
                                name="año"
                                onChange={handleChange}
                                input={<OutlinedInput label="Año" fullWidth />}
                                MenuProps={MenuProps}
                            >
                            {
                                years ? years.map((item)=> <MenuItem
                                                            key={item}
                                                            value={item}
                                                            >
                                                            {item}
                                                        </MenuItem>)  : console.log("wtf")
                            }
                            </Select>
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
                                        {
                                        periodOptions.map((option)=> <MenuItem
                                                                        key={option.value}
                                                                        value={option.value}
                                                                        style={getStyles('Primero','Primero',  theme)}
                                                                        >
                                                                        {option.text}
                                                                    </MenuItem>
                                        )
                                        }
                                    </Select>
                                    <FormControlLabel 
                                        control={
                                            <Checkbox 
                                            checked={state.lastSubject}
                                            onChange={()=>setState({...state, lastSubject: !state.lastSubject})}    
                                        />} 
                                        label="Ultima Materia" 
                                    />   
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleOpen}>Cerrar</Button>
                        <Button onClick={handleSubmit}>Editar</Button>
                    </DialogActions>
                </Dialog>
            }
        </>  
    )

}


export default EditSubject