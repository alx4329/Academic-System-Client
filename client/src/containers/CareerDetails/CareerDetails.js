import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useParams } from "react-router-dom";
import { getCareer } from '../../redux/reducer/careerReducer';
import StudyPlan from '../../components/Studyplan/StudyPlan';
import './CareerDetails.css'
import { cleanNewCareer } from '../../redux/reducer/careerReducer';


const CareerDetails = () => {
    const {careerId} = useParams();
    const dispatch = useDispatch();
    const career = useSelector(state=>state.career.career);
    const createdSubject = useSelector(state=>state.career.createdSubject)
    
    React.useEffect(()=>{
        console.log(createdSubject)
        if(careerId !== 'undefined' && careerId !== null && careerId !== '' && careerId !== undefined ){
            dispatch(getCareer({careerId}))
            dispatch(cleanNewCareer())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[careerId,createdSubject])
    
    
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