import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DataTable from '../../components/Datatable'
import { getStudents, clearList, getTeachers } from '../../redux/reducer/usersReducer'
import { adminStudentsColumns, adminTeachersColumns } from '../../utils/constants'
import { createStudentsData, createTeachersData } from '../../utils/formatters'
import './UsersList.css'

const UsersList = () =>{
    const {type} = useParams()
    const dispatch = useDispatch()
    const students = useSelector(state=> state.users.studentsList)
    const teachers = useSelector(state=> state.users.teachersList)
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

     
    return(
        <>
        {
            <div className='ListContainer' >
            {
                type==='students' ? 
                <DataTable
                    columns={adminStudentsColumns}
                    rows={studentsRows}
                /> 
                : 
                <DataTable
                    columns={adminTeachersColumns}
                    rows={teachersRows}
                /> 
            }

            </div>
        
        }

        </>
    )
}

export default UsersList