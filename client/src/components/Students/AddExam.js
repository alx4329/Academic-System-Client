import React from 'react'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import { getCareer } from '../../redux/reducer/careerReducer';
import { getTeachers } from '../../redux/reducer/usersReducer';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {  cleanError, newExam } from '../../redux/reducer/examsReducer';
import './AddExam.css'
import { format } from 'date-fns'


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



const AddExam = ({row})=>{
    // console.log(row)
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false)
    // const period = row.period === '1°C' ? 'Primero' : (row.period === '2°C'? "Segundo" : "Anual") 
    const careers= useSelector(state=>state.career.careers)
    const career= careers.find(career => row.carrera=== career.name)
    const [state, setState] = React.useState({
        studentId: row.id,
        careerId: career.id,
        subjectName:"",  
        teacherId:"",
        score:"",
        date:new Date()
    })
    
    const teachers = useSelector(state => state.users.teachersList)
    const careerInfo= useSelector(state=>state.career.career)
    const createdExam = useSelector(state=>state.exams.newExam)
    const error = useSelector (state=>state.exams.error)
    React.useEffect(()=>{
        // console.log("===CAREERID",row.careerId)
        if(career.id !== "undefined"){
            dispatch(getCareer({careerId:career.id}))
            dispatch(getTeachers())
        }
        return ()=>{}
    },[career])
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
    React.useEffect(()=>{
        if(createdExam){
            let date = format(new Date(createdExam.date), 'dd/MM/yyyy')
            Swal.fire({
                title: 'Examen Cargado!',
                html: `<div>Alumno: ${createdExam.studentName}</div>   
                <div>Evaluador: ${createdExam.teacherName}</div>
                <div>Fecha: ${date}</div>
                <div>Nota: ${createdExam.score}</div>
                `,
                icon: 'success',
                confirmButtonText: 'Ok'
                }).then((value)=>{
                    // dispatch(cleanNewExam());
                    value && window.location.reload();
                })
        }
    },[createdExam])
    

    const handleOpen = () => {
        setOpen(!open)
    }

    const handleChange = (e) => {
        console.log(e)
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        
    }
    const handleDate = (date) =>{
        setState({
            ...state,
            date:date
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!state.subjectName || !state.teacherId || !state.score || !state.date ) {
            Swal.fire({
                text: "Completar todos los campos",
                toast: true,
                customClass: {
                    container: 'my-swal'
                  }
            })
        } else {            
            dispatch(newExam({state}))
            handleOpen()
        }        
    }
    
    return(
        <>
            <div className="icons-container">
                <Button onClick={handleOpen} >
                    <span className="material-symbols-outlined">add</span></Button>
            </div>
            {                
                <Dialog open={open} onClose={handleOpen}>
                    <DialogTitle>Agregar Examen</DialogTitle>
                    <DialogContent>
                        
                        <TextField
                            autoFocus
                            name="nombre"
                            value={row.nombre+row.apellido}
                            required
                            fullWidth
                            margin="dense"
                            id="nombre"
                            label="Nombre"
                            type="text"
                            variant="standard"
                            // value={state.id_senasa}
                            disabled
                        />

                        <TextField
                            autoFocus
                            name="careerId"
                            value={career.name}
                            margin="dense"
                            id="codigo"
                            label="Codigo"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) =>{handleChange(e)}}
                            disabled
                        />
                        
                         <InputLabel id="demo-name-label">Profesor</InputLabel>
                        <Select
                            labelId="demo-name-label"
                            id="demo-multiple-name"
                            value={state.teacherId}
                            name="teacherId"
                            onChange={handleChange}
                            input={<OutlinedInput label="Profesor" fullWidth />}
                            MenuProps={MenuProps}
                        >
                        {
                            teachers ? teachers.map((item)=> <MenuItem
                                key={item.id}
                                value={item.id}
                                >
                                {item.name}
                            </MenuItem>)  : console.log("wtf")
                        }
                        </Select>
                         <InputLabel id="demo-name-label">Materia</InputLabel>
                        <Select
                            labelId="demo-name-label"
                            id="demo-multiple-name"
                            value={state.subjectName}
                            name="subjectName"
                            onChange={handleChange}
                            input={<OutlinedInput label="Materia" fullWidth />}
                            MenuProps={MenuProps}
                        >
                        {
                            careerInfo ? careerInfo.subjects.map((item)=> <MenuItem
                                                        key={item.id}
                                                        value={item.name}
                                                        >
                                                        {item.name}
                                                    </MenuItem>)  : console.log("wtf")
                        }
                        </Select>
                        <TextField
                            autoFocus
                            name="score"
                            value={state.score}
                            margin="dense"
                            id="codigo"
                            label="Puntaje"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={(e) =>{handleChange(e)}}
                            error={state.score>10? true : false}
                            helperText={state.score>10? "Debe ser menor o igual a 10" : state.score<1? "Debe ser mayor a 0" : null }
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Date desktop"
                            inputFormat="dd/MM/yyyy"
                            value={state.date}
                            onChange={handleDate}
                            name="date"
                            renderInput={(params) => <TextField {...params} />}
                            />

                        </LocalizationProvider>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleOpen}>Cerrar</Button>
                        <Button onClick={handleSubmit}>Agregar</Button>
                    </DialogActions>
                </Dialog>
            }
        </>  
    )

}


export default AddExam