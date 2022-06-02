import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useParams } from "react-router-dom";
import { getCareer } from '../../redux/reducer/careerReducer';
import StudyPlan from '../../components/StudyPlan';
import './CareerDetails.css'


const CareerDetails = () => {
    const {careerId} = useParams();
    const dispatch = useDispatch();
    const career = useSelector(state=>state.career.career);
    React.useEffect(()=>{
        if(careerId !== 'undefined' && careerId !== null && careerId !== '' && careerId !== undefined ){
            console.log("dispatching por aca", careerId)
            dispatch(getCareer({careerId}))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[careerId])
    
    
    return (
        <div className="careerContainer">
            <div className='head'>
                <h2 >{career?.name}</h2>
                <h4>Plan de estudios</h4>

            </div>
            {career && <StudyPlan career={career}/>}
        </div>
    )
}

export default CareerDetails;