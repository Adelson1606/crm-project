import React from 'react';
import { observer, inject } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  root_1: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const Search = inject('clientsStore')(observer((props) => {
  const classes = useStyles();

  const searchVariants = [
    {
      value: 'name',
      label: 'Name',
    },
    {
      value: 'country',
      label: 'Country',
    },
    {
      value: 'owner',
      label: 'Owner',
    },
    {
      value: 'emailType',
      label: 'Email',
    },
  ];


  const [searchVariant, setSearchVariant] = props.filterBehavior

  const filterRow = () => {
    props.filterRow(searchVariant.search.trim().toLowerCase(), searchVariant.variant)
  }

  const handleInput = e => {

    searchVariant.search = e.target.value

    setSearchVariant(searchVariant)

    filterRow(e.target.value)

  }
  const handleChange = (e) => {

    searchVariant.variant = e.target.value

    setSearchVariant(searchVariant)

    filterRow(e.target.value)

  };
  // const searchResults = clients.filter(c => c[searchVariant].toLowerCase().includes(input.toLowerCase()))

  return (
    <div>
      <span>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="search-input" label="Search" value={searchVariant.search} onChange={handleInput} />
        </form>
        <form className={classes.root_1} noValidate autoComplete="off">
          <div>
            <TextField
              id="standard-select-currency"
              select
              label="Select"
              value={searchVariant.variant}
              onChange={handleChange}
              helperText="Please select search parameter"
            >
              {searchVariants.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

          </div>
        </form>
      </span>
    </div>
  )
}))

export default Search