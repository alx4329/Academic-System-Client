export function createPlanData(id, year, name, code, Course, TakeExam,period, actions, career) {
        
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

  export function createStudentsData(students, careers){
    const rows = students.map(student=>{
      const career= careers.find(career => student.careerId=== career.id)
      return {
        id: student.id, 
        legajo:student.fileNumber,
        nombre:student.name, 
        apellido: student.surname, 
        dni: student.dni, 
        carrera: career?.name, 
        email: student.user.email,
        actions:"actions"
        
      }
    })
    return rows
  }
  
  export function createTeachersData(teachers){
    const rows= teachers.map(teacher=>{
      return {
        id: teacher.id, 
        legajo:teacher.fileNumber,
        nombre:teacher.name, 
        apellido: teacher.surname, 
        dni: teacher.dni, 
        email: teacher.user.email,
        actions:"actions"

      }
    })
    return rows
  }