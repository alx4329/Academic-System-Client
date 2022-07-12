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
import './StudyPlan.css'
import { useNavigate } from "react-router-dom";
import DeletePlanButton from './DeletePlanButton';
import { createPlanData } from '../../utils/formatters';
import EditSubject from './EditSubject';
import { orderByNumber } from '../../utils/sorters';

const StudyPlan = ({career}) => {
  const [openEditModal, setOpenEM] = React.useState(false);
  const navigate = useNavigate();
    const columns = [
        {id:'year',label:'Año',minWidth:10},
        { id: 'code', label: 'Codigo', minWidth: 30 },
        { id: 'name', label: 'Nombre', minWidth: 170 },
        { id: 'period', label: 'Dictado', minWidth: 30 },
        {
          id: 'toCourse',
          label: 'Para cursar',
          minWidth: 200,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'toTakeExam',
          label: 'Para Rendir',
          minWidth: 200,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        },
        {id:'actions',align:'center', label:'Editar', minWidth:150}
      ];
      
      let subjects = career.subjects
      let arrayForSort = [...subjects]
      orderByNumber(arrayForSort, "year", 1)
      subjects=arrayForSort
      

      const rows = subjects?.map(subject=>{
        return createPlanData(subject.id, subject.year,subject.name,subject.code,subject.toCourse,subject.toTakeExam, subject.period, "actions", career)
        })
        
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
                                      : value==="actions"?<EditSubject row={row} />: value}
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
      <div className='planButtons' >
      <Button onClick={()=>{navigate(`/newSubject/${career.id}`)}} variant="contained" >Agregar materias</Button>
      <DeletePlanButton id={career.id} />
      </div>
    </>
    )
}

export default StudyPlan