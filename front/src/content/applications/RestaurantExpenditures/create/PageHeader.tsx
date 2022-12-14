import { Button, Grid, Typography } from '@mui/material';
import KeyboardReturnTwoToneIcon from '@mui/icons-material/KeyboardReturnTwoTone';
import { NavLink } from 'react-router-dom';

function PageHeader() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid
        item
        children={
          <Typography
            variant="h3"
            component="h3"
            gutterBottom
            children="Consumos"
          />
        }
      />
      <Grid
        item
        children={
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<KeyboardReturnTwoToneIcon fontSize="small" />}
            component={NavLink}
            to="/restaurantexpenditures/"
            children="Retornar"
          />
        }
      />
    </Grid>
  );
}

export default PageHeader;
