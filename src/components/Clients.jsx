import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { inject, observer } from 'mobx-react'
import Client from './Client'
import Search from './Search'
import ClientEditor from './ClientEditor';
import {
  Table,withStyles,
  TableRow, TableContainer,
  TableHead, TablePagination,
  TableCell, TableBody, Paper
} from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#f6cd3e',
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const Clients = inject("clientsStore")(observer((props) => {

  const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'surname', label: 'Surname', minWidth: 100 },
    { id: 'country', label: 'Country', minWidth: 170 },
    { id: 'firstContact', label: 'First\u00a0Contact', minWidth: 170 },
    { id: 'emailType', label: 'Email', minWidth: 170 },
    { id: 'sold', label: 'Sold', minWidth: 170 },
    { id: 'owner', label: 'Owner', minWidth: 170 },
  ];

  const rows = props.clientsStore.clients


  const clientEditorRef = React.createRef();

  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 800,
    },
    head: {
      backgroundColor: "black",
      color: 'white',
    },
  });

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [filterRows, setFilterRows] = React.useState({
    search: '',
    variant: 'name'
  });



  const filterRow = async (search, variant) => {
    setFilterRows({ search, variant })
   
  };

  const handleOpenModal = async (client) => {
    clientEditorRef.current.editClient(client)
  };

  const handleUpdatedClient = async (updatedClient, id) => {

    const client = rows.find(c => c.id === id)
    client.updateClient(updatedClient.name, updatedClient.surname, updatedClient.country)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  };


  return (
    <div>

      <ClientEditor ref={clientEditorRef} handleUpdatedClient={handleUpdatedClient}
      ></ClientEditor>

      <Search
        filterBehavior={[filterRows, setFilterRows]}
        filterRow={filterRow} />
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead  >
              <TableRow className={classes.head} >
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .filter(row => {
                  if (!filterRows.search) {
                    return true
                  }

                  const isMatched = row[filterRows.variant].toLowerCase().includes(filterRows.search)

                  return isMatched
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      key={row.id}
                      hover role="checkbox"
                      tabIndex={-1} >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <Client handleOpenModal={handleOpenModal} key={column.id} value={value} column={column} client={row} />
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[50, 100, 200]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );

}))

export default Clients

