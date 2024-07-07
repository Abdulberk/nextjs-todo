

import React from 'react'
import { Grid } from '@mui/material';
import { GridLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <Grid container justifyContent="center" alignItems="center" height={"100vh"} >
        <GridLoader color="rgba(40, 174, 179, 1)" size={20} speedMultiplier={1} />
      </Grid>
  )
}

export default Spinner