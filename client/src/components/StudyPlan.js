import * as React from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import './Navbar/Navbar.css'
import { useNavigate } from "react-router-dom";

const StudyPlan = ({career}) => {
  const navigate = useNavigate();
    const columns = [
        {id:'year',label:'Año',minWidth:50},
        { id: 'code', label: 'Codigo', minWidth: 100 },
        { id: 'name', label: 'Nombre', minWidth: 170 },
        { id: 'period', label: 'Dictado', minWidth: 170 },
        {
          id: 'toCourse',
          label: 'Para cursar',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'toTakeExam',
          label: 'Para Rendir',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        }
      ];
      
      function createData(year, name, code, Course, TakeExam,period) {
        
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
        return { year,name, code, toCourse: toCourse.join(', '), toTakeExam: toTakeExam.join(', '),period: string };
      }
      
      const rows = career.subjects?.map(career=>{
        return createData(career.year,career.name,career.code,career.toCourse,career.toTakeExam, career.period)
        })
        console.log(rows)
      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
    return(
        <>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer >
                  <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                      <TableRow>
                      {columns.map((column) => (
                          <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                          >
                          {column.label}
                          </TableCell>
                      ))}
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {rows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                          return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                              {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                  <TableCell key={column.id} align={column.align} size='small'>
                                  {column.format && typeof value === 'number'
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                              );
                              })}
                          </TableRow>
                          );
                      })}
                  </TableBody>
                  </Table>
              </TableContainer>
              <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
              />
      </Paper>
      <br/>
      <div className='addSubjects' >
      <Button onClick={()=>{navigate(`/newSubject/${career.id}`)}} variant="contained" >Agregar materias</Button>

      </div>
    </>
    )
}

export default StudyPlan