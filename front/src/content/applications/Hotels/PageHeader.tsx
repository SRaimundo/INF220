import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Button, Grid, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

function PageHeader() {
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid
          item
          children={
            <Typography
              variant="h3"
              component="h3"
              gutterBottom
              children="Hotéis"
            />
          }
        />

        <Grid
          item
          children={
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
              to="new"
              component={NavLink}
              children="Cadastrar Hotel"
            />
          }
        />
      </Grid>
    </>
  );
}

export default PageHeader;
