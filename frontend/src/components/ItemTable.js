import React, { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { 
    Grid, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, 
    TableRow, TableSortLabel, Toolbar, Typography, Paper, Checkbox, IconButton,
    Tooltip, FormControlLabel, Switch, FormControl, TextField, FormHelperText,
    InputBase, Divider,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import PostAddIcon from '@material-ui/icons/PostAdd';

import {
    useMutation, useLazyQuery, useQuery
} from "@apollo/client";
import { CREATE_ITEM_MUTATION, DELETE_ITEM_MUTATION, FIND_ITEMS_OF_LIST } from '../gql/Queries';

function createData(id, name, quantity, units) {
  return { id, name, quantity, units };
}

const sRows = [];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'quantity', numeric: true, disablePadding: false, label: 'Quantity' },
  { id: 'units', numeric: true, disablePadding: false, label: 'Units' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all items' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

// TOOLBAR

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const deselectAndDelete = () => {
    props.deleteRows(props.retrieveSelection);
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={() => deselectAndDelete()} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  submitRoot:{
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  shrigma: {
    justifyContent: 'center',
    flex: 1
  }
}));


// TABLE

export default function EnhancedTable(props) {
  const roomCode = props.code;
  const items = props.items;
  const classes = useStyles();
  const [newItemID, setNewItemID] = useState(-1);
  const [rows, setRows] = useState(sRows);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [itemName, setItemName] = useState("Egg");
  const itemNameFieldRef = useRef();
  const [itemQuant, setItemQuant] = useState(1);
  const itemQuantFieldRef = useRef();
  const [itemUnits, setItemUnits] = useState("container");
  const itemUnitsFieldRef = useRef();
  useMemo(() => {
    if (items === undefined){
      setRows([]);
    }
    else {
      setRows(items);
    }
  }, []);
  const [ deleteItem ] = useMutation(DELETE_ITEM_MUTATION,
    {
        variables: { 
            id: 4,
        },
    }
  );
  const [ createItem ] = useMutation(CREATE_ITEM_MUTATION,
    {
        variables: { 
            name: itemName,
            quantity: itemQuant,
            units: itemUnits,
            list_code: roomCode,
        },
        onCompleted: (data) => {
            setNewItemID(data.createItem.item.id);
            AddNewRow();
        }
    }
  );


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const DeleteSelectedRows = (rowsToDelete) => {
    deleteItem();
    setRows(rows.filter((row, index) => {
        return !rowsToDelete.includes(row.id);
    }));
    setSelected([]);
  };

  const addToList = () => {
    // in order to generate a real ID we add the item to the server, get the response with the ID, use it as a key before rendering it on the page
    createItem();
  }

  // Callback on completed response
  const AddNewRow = () => {
    let newRow = createData(newItemID, itemName, itemQuant, itemUnits);
    let z = rows.concat(newRow);
    setRows(z);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Grid container>
        <Grid item xs={12}>
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <EnhancedTableToolbar deleteRows={DeleteSelectedRows} retrieveSelection={selected} numSelected={selected.length} />
                    <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        />
                        <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                hover
                                onClick={(event) => handleClick(event, row.id)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.id}
                                selected={isItemSelected}
                                >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                    checked={isItemSelected}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </TableCell>
                                <TableCell component="th" id={labelId} scope="row" padding="none">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.quantity}</TableCell>
                                <TableCell align="right">{row.units}</TableCell>
                                </TableRow>
                            );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                            <TableCell colSpan={6} />
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <TablePagination
                    rowsPerPageOptions={[8,10]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label="Dense padding"
                />
            </div>
        </Grid>
        <Grid container item xs={12} className={classes.shrigma}>
            <Paper component="form" className={classes.submitRoot}>
                <InputBase
                    className={classes.input}
                    placeholder="Egg"
                    inputProps={{ 'aria-label': 'itemname' }}
                    inputRef={itemNameFieldRef}
                    onChange={() => setItemName(itemNameFieldRef.current.value)}
                    required={true}
                    defaultValue={itemName}
                />
                <Divider className={classes.divider} orientation="vertical" />
                <InputBase
                    className={classes.input}
                    placeholder="1"
                    inputProps={{ 'aria-label': 'itemquant' }}
                    inputRef={itemQuantFieldRef}
                    onChange={() => setItemQuant(itemQuantFieldRef.current.value)}
                    required={true}
                    defaultValue={itemQuant}
                />
                <Divider className={classes.divider} orientation="vertical" />
                <InputBase
                    className={classes.input}
                    placeholder="container"
                    inputProps={{ 'aria-label': 'itemunits' }}
                    inputRef={itemUnitsFieldRef}
                    onChange={() => setItemUnits(itemUnitsFieldRef.current.value)}
                    required={true}
                    defaultValue={itemUnits}
                />
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton  
                    className={classes.iconButton} 
                    aria-label="submittolist"
                    onClick={() => addToList()}
                >
                    <PostAddIcon style={{ fill: "green" }} />
                </IconButton>
            </Paper>
            
        </Grid>
    </Grid>
    
  );
}