import { Grid, Typography, Button } from '@mui/material';
import KeyboardReturnTwoToneIcon from '@mui/icons-material/KeyboardReturnTwoTone';
import { NavLink } from 'react-router-dom';

function PageHeader() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Hospede
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<KeyboardReturnTwoToneIcon fontSize="small" />}
          component={NavLink}
          to="/clients"
        >
          Retornar
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
