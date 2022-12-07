import { Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';

function PageHeader() {
  const { state } = useContext(AuthContext);

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Bem vindo(a), {state.data.name}!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
