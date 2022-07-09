export function createData(id, year, name, code, Course, TakeExam,period, actions, career) {
        
    const toTakeExam = TakeExam.map((id)=>{
      const obj = career.subjects.find((subject)=>subject.id === id )
      return obj.name
    })
    let toCourse =[];
    if(Course){
      toCourse = Course.map((id)=>{
        const obj = career.subjects.find((subject)=>subject.id === id )
        return obj.name
      })

    }
    let string = ''
    
    if(period ==='Primero') string = '1°C'
    else if(period ==='Segundo') string = '2°C'
    else string= 'Anual'
    return {  id, year,name, code, toCourse: toCourse.join(', '), toTakeExam: toTakeExam.join(', '),period: string, actions };
  }