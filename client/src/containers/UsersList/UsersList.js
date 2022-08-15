import React from 'react'
import { ReactReduxContext, useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DataTable from '../../components/Datatable'
import { getStudents, clearList, getTeachers, deleteUser, cleanDeleted } from '../../redux/reducer/usersReducer'
import { adminStudentsColumns, adminTeachersColumns } from '../../utils/constants'
import { createStudentsData, createTeachersData } from '../../utils/formatters'
import './UsersList.css'
import Swal from 'sweetalert2'

const UsersList = () =>{
    const {type} = useParams()
    const dispatch = useDispatch()
    const students = useSelector(state=> state.users.studentsList)
    const teachers = useSelector(state=> state.users.teachersList)
    const deleted = useSelector(state=> state.users.deleted)
    const careers = useSelector (state => state.career.careers)
    const [studentsRows, setstudentsRows]=React.useState([])
    const [teachersRows, setteachersRows]=React.useState([])

    React.useEffect(()=>{
        dispatch(getStudents())
        dispatch(getTeachers())
    },[])
    React.useEffect(()=>{
        if(students) setstudentsRows(createStudentsData(students, careers))
    },[students])
    React.useEffect(()=>{
        if(teachers) setteachersRows(createTeachersData(teachers, careers))
    },[teachers])

    const handleDeleteUser = (dni)=>{
        Swal.fire({
            title: '¿Eliminar Usuario?',
            text: 'Esta acción no se puede revertir.',
            showCancelButton: true,
            icon: 'warning',
            confirmButtonText: 'Eliminar',
            cancelButtonText:'No! cancelar'
          }).then((value)=>{
            value.isConfirmed && dispatch(deleteUser({dni, type}))
          })
        
    }
    
    
    React.useEffect(()=>{
        if(deleted) Swal.fire({
            title: 'Usuario eliminado!',
            icon: 'success',
            confirmButtonText: 'Ok'
            }).then((value)=>{
                if(value) {
                    dispatch(cleanDeleted())
                    dispatch(getStudents())
                    dispatch(getTeachers())

                }
                    
                    // window.location.reload()
                    
              })
    }, [deleted])
    return(
        <>
        {
            <div className='ListContainer' >
            
            {
                type==='students' ? (
                    <div>
                        <div className='head'>
                            <h2>Lista de Usuarios</h2>
                            <h4>Estudiantes</h4>

                        </div>
                        <DataTable
                            columns={adminStudentsColumns}
                            rows={studentsRows}
                            actions= {handleDeleteUser}
                        /> 

                    </div>
                )
                : (
                    <div>
                        <div className='head'>
                            <h2>Lista de Usuarios</h2>
                            <h4>Docentes</h4>
                        </div>
                    <DataTable
                        columns={adminTeachersColumns}
                        rows={teachersRows}
                        actions= {handleDeleteUser}
                    /> 

                    </div>
                )
            }

            </div>
        
        }

        </>
    )
}

export default UsersList