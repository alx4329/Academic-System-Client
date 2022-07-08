import React from 'react'
import { Button } from '@mui/material';
import Swal from 'sweetalert2'
import { deletePlan } from '../redux/reducer/careerReducer';
import { useDispatch, useSelector } from 'react-redux';

const DeletePlanButton= ({id})=>{
    const dispatch = useDispatch()
    const success = useSelector(state=>state.career.success)
    const error = useSelector(state=> state.career.error)
    
    React.useEffect(()=>{
        if(success){
            Swal.fire({
                title: 'Plan de estudios eliminado!',
                icon: 'success',
                confirmButtonText: 'Ok'
                }).then((value)=>{
                    value && window.location.reload()
                  })
        }
    },[success])

    React.useEffect(()=>{
        if(error){
            Swal.fire({
                title: 'Hubo un error al eliminar el plan de estudios.',
                text:error,
                icon: 'success',
                confirmButtonText: 'Ok'
                })
        }
    },[error])
    
    
    const handleDeletePlan = ()=>{
        Swal.fire({
            title: '¿Eliminar Plan de estudio?',
            text: 'Esta acción no se puede revertir.',
            showCancelButton: true,
            icon: 'warning',
            confirmButtonText: 'Eliminar',
            cancelButtonText:'No! cancelar'
          }).then((value)=>{
            value.isConfirmed && dispatch(deletePlan({id}))
          })
    }
    return(
        <Button onClick={handleDeletePlan} variant="contained">Eliminar Plan</Button>
    )
}

export default DeletePlanButton