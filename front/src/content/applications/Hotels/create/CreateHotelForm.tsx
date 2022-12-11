import { yupResolver } from '@hookform/resolvers/yup';
import PublishTwoToneIcon from '@mui/icons-material/PublishTwoTone';
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider, Grid, Snackbar,
  TextField
} from '@mui/material';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Hotels } from 'src/models/hotels';
import { create } from 'src/services/hotels';
import * as yup from 'yup';

const schema = yup.object().shape({
  Cidade: yup.string().required('É obrigatório informar uma Cidade para a filial')
});

function CreateHotelForm() {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Hotels> = (data) => {
    create(data).then((res) => {
      setOpenConfirm(false);
      return navigate('/hotels/');
    });
  };

  const [openErrors, setOpenErrors] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Hotels>({ resolver: yupResolver(schema) });

  useEffect(() => {
    register('Cidade');
  }, [register]);

  return (
    <Container>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Cadastrar Hotel"
              subheader="Informe os dados da filial do hotel."
            />
            <Divider />
            <CardContent>
              <Grid
                container
                component="form"
                noValidate
                autoComplete="on"
                spacing={2}
              >
                <Grid item md={6} xs={12}>
                  <TextField
                    type="city"
                    name="city"
                    fullWidth
                    error={!!errors?.Cidade}
                    helperText={errors?.Cidade?.message || ''}
                    label="Cidade da Filial"
                    required
                    onChange={(event) => setValue('Cidade', event.target.value)}
                  />
                </Grid>

              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Button
            style={{ float: 'right', marginTop: 10 }}
            disabled={openConfirm}
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            onClick={() => handleSubmit(onSubmit)() && setOpenErrors(true)}
            startIcon={<PublishTwoToneIcon fontSize="small" />}
            children="Salvar"
            type="submit"
          />
          <Snackbar
            open={Object.keys(errors).length !== 0 && openErrors}
            autoHideDuration={6000}
            onClose={() => setOpenErrors(false)}
            children={
              <Alert
                onClose={() => setOpenErrors(false)}
                severity="error"
                sx={{ width: '100%' }}
                children="Ocorreu um erro ao cadastrar o hotel!"
              />
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreateHotelForm;
