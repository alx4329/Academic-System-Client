export const periodOptions=[
    {value:'Primero', text:'1° Cuatimestre'},
    {value:'Segundo', text:'2° Cuatimestre'},
    {value:'Anual', text:'Anual'}
]

export const userTypes = [
    {id:'teachers',name:'Docentes'},
    {id:'students',name:'Estudiantes'},
]

export const adminStudentsColumns = [
        { id: 'legajo', label: 'Legajo', minWidth: 30 },
        {id:'nombre',label:'Nombre',minWidth:100},
        {id:'apellido',label:'Apellido',minWidth:100},
        { id: 'dni', label: 'Dni', minWidth: 100 },
        {id:"carrera", label:"Carrera", minWidth:100},
        {id:"email", label:"Email", minWidth:100},
        {id:'actions',align:'center', label:'Editar', minWidth:150}
    ]
    
    export const adminTeachersColumns=[
        { id: 'legajo', label: 'Legajo', minWidth: 30 },
        {id:'nombre',label:'Nombre',minWidth:100},
        {id:'apellido',label:'Apellido',minWidth:100},
        { id: 'dni', label: 'Dni', minWidth: 100 },
        {id:"email", label:"Email", minWidth:100},
        {id:'actions',align:'center', label:'Editar', minWidth:150}

]