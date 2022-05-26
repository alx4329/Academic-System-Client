import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useParams } from "react-router-dom";
import { getCareer } from '../../redux/reducer/careerReducer';
import StudyPlan from '../../components/StudyPlan';



const CareerDetails = () => {
    const {careerId} = useParams();
    const dispatch = useDispatch();
    const career = useSelector(state=>state.career.career);
    React.useEffect(()=>{
        if(careerId) {
            dispatch(getCareer({careerId}))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[careerId])
    
    
    return (
        <div>
            <h1>{career?.name}</h1>
            <StudyPlan career={career}/>
        </div>
    )
}

export default CareerDetails;