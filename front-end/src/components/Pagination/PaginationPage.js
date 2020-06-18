import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import { Grid } from "@material-ui/core";

const PaginationPage = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
    //이거 배열 
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };


  return (
    <nav>
      <div className={classes.root}>
        <Grid container spacing={4}>
          < Grid item xs={12} sm={4}>
          </ Grid>
          < Grid item xs={12} sm={6}>
            <Pagination count={pageNumbers.length} page={page} onChange={handleChange} onClick={paginate(page)} variant="outlined" color="secondary" />
          </Grid>
        </Grid>
        <Typography>Page: {page}</Typography>
      </div>
      {/* <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} href='!#' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul> */}
    </nav>
  );
};
export default PaginationPage;
