import {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {TableFooter} from '@mui/material';
import PropTypes from 'prop-types';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

function TablePaginationActions (props) {
  const theme = useTheme ();
  const {count, page, rowsPerPage, onPageChange} = props;

  const handleFirstPageButtonClick = event => {
    onPageChange (event, 0);
  };

  const handleBackButtonClick = event => {
    onPageChange (event, page - 1);
  };

  const handleNextButtonClick = event => {
    onPageChange (event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onPageChange (event, Math.max (0, Math.ceil (count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{flexShrink: 0, ml: 2.5}}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl'
          ? <KeyboardArrowRight />
          : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil (count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl'
          ? <KeyboardArrowLeft />
          : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil (count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const HistoryPage = () => {
  const [history, setHistory] = useState ([]);
  const [page, setPage] = useState (0);
  const [rowsPerPage, setRowsPerPage] = useState (5);

  const columns = [
    {field: 'operation', headerName: 'Operación', width: 400},
    {field: 'result', headerName: 'Resultado', width: 150},
    {
      field: 'created',
      headerName: 'Fecha',
      width: 500,
      type: 'dateTime',
    },
  ];
  const emptyRows = page > 0
    ? Math.max (0, (1 + page) * rowsPerPage - history.length)
    : 0;
  const [minDate, setMinDate] = useState (null);
  const [maxDate, setMaxDate] = useState (null);

  const getHistory = filters => {
    axios
      .get ('http://127.0.0.1:8000/history?limit=10000', {params: {...filters}})
      .then (({data: response}) => {
        let data = response.results;
        setHistory (data);
      });
  };

  const handleSubmit = event => {
    event.preventDefault ();
    getHistory ({max_date: maxDate, min_date: minDate});
  };

  const handleChangePage = (event, newPage) => {
    setPage (newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage (parseInt (event.target.value, 10));
    setPage (0);
  };
  useEffect (() => {
    getHistory ();
  }, []);
  return (
    <div className="h-85">
      <Link href="/">
        {''}<Button className="mb-1" variant="contained">Calculadora</Button>
      </Link>
      <form onSubmit={handleSubmit}>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            onChange={newValue =>
              setMinDate (dayjs (newValue).format ('MM/DD/YYYY'))}
            name="startDate"
            componentsProps={{
              actionBar: {
                actions: ['clear'],
              },
            }}
          />
          <DatePicker
            onChange={newValue =>
              setMaxDate (dayjs (newValue).format ('MM/DD/YYYY'))}
            name="endDate"
            componentsProps={{
              actionBar: {
                actions: ['clear'],
              },
            }}
          />
        </LocalizationProvider>
        <Button
          className="buttonGroup"
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </form>
      <TableContainer className="mt-2" component={Paper}>
        <Table sx={{minWidth: 500}} aria-label="Historial de operaciones">
          <TableHead>
            <TableRow>
              <TableCell align="right">Operación</TableCell>
              <TableCell align="right">Resultado</TableCell>
              <TableCell align="right">Fecha en la que se realizó</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? history.slice (
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : history).map (row => (
              <TableRow
                key={row.id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell align="right">{row.operation}</TableCell>
                <TableCell align="right">{row.result}</TableCell>
                <TableCell align="right">{row.created}</TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 &&
              <TableRow style={{height: 53 * emptyRows}}>
                <TableCell colSpan={6} />
              </TableRow>}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                colSpan={3}
                count={history.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HistoryPage;
