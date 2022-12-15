import { yupResolver } from '@hookform/resolvers/yup';
import PublishTwoToneIcon from '@mui/icons-material/PublishTwoTone';
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Apartments } from 'src/models/apartments';
import { Cleanings, Funcionario } from 'src/models/cleanings';
import { findAll } from 'src/services/apartments';
import { findAll as findHotels } from 'src/services/hotels';
import { create, getCamareira } from 'src/services/cleanings';
import * as yup from 'yup';
import { Hotels } from 'src/models/hotels';
import DateTimePicker from '@mui/lab/DateTimePicker/DateTimePicker';

const schema = yup.object().shape({
  // Id_funcionario: yup
  //   .number()
  //   .required('É obrigatório selecionar um funcionário para a faxina'),
  // Numero: yup
  //   .number()
  //   .required('É obrigatório selecionar um apartamento'),
  // dataArruma: yup
  //   .date()
  //   .required('É obrigatório informar uma data para a faxina'),
});

function CreateHotelForm() {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Cleanings> = (data) => {
    create(data).then((res) => {
      setOpenConfirm(false);
      return navigate('/cleanings/');
    });
  };

  const [openErrors, setOpenErrors] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [apartamentos, setApartamentos] = useState<Apartments[]>([]);
  const [hotels, setHotels] = useState<Hotels[]>([]);

  useEffect(() => {
    getCamareira().then((res) => setFuncionarios(res));
    findAll().then((res) => setApartamentos(res));
    findHotels().then((res) => setHotels(res));
  }, []);

  const formatHotel = (id): string => {
    if (hotels.length > 0) {
      const hotel = hotels.find((hotel) => hotel.Id_hotel === id);
      return hotel.Cidade;
    } else {
      return 'Buscando...';
    }
  };

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Cleanings>({ resolver: yupResolver(schema) });

  useEffect(() => {
    const initDate = new Date();
    register('Funcionario');
    register('Hotel');
    register('Quarto');
    register('Data');
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
              title="Cadastrar Faxina"
              subheader="Informe os dados da faxina."
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
                <Grid item md={3} xs={12}>
                  <TextField
                    type="number"
                    name="Hotel"
                    fullWidth
                    error={!!errors?.Hotel}
                    helperText={errors?.Hotel?.message || ''}
                    label="Coloque o ID do Hotel"
                    required
                    onChange={(event) => setValue('Hotel', Number(event.target.value))}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <TextField
                    type="number"
                    name="Quarto"
                    fullWidth
                    error={!!errors?.Quarto}
                    helperText={errors?.Quarto?.message || ''}
                    label="Coloque o Numero do Quarto"
                    required
                    onChange={(event) => setValue('Quarto', Number(event.target.value))}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <FormControl fullWidth error={!!errors?.Funcionario}>
                    <InputLabel children="Selecione o(a) responsável pela limpeza" />
                    <Select
                      value={watch().Funcionario ?? ''}
                      label="Selecione o(a) responsável pela limpeza"
                      onChange={(funcionario: SelectChangeEvent<string>) =>
                        setValue(
                          'Funcionario',
                          parseInt(funcionario.target.value)
                        )
                      }
                    >
                      {funcionarios.map((funcionario) => (
                        <MenuItem
                          key={funcionario.Id_funcionario}
                          value={funcionario.Id_funcionario}
                          children={funcionario.Nome}
                        />
                      ))}
                    </Select>
                    <FormHelperText
                      children={errors?.Funcionario?.message || ''}
                    />
                  </FormControl>
                </Grid>
                {/* <Grid item md={4} xs={12}>
                  <FormControl fullWidth error={!!errors?.Quarto}>
                    <InputLabel children="Selecione o apartamento" />
                    <Select
                      value={watch().Quarto ?? ''}
                      label="Selecione o apartamento"
                      onChange={(tipo: SelectChangeEvent<string>) =>
                        setValue('Quarto', parseInt(tipo.target.value))
                      }
                    >
                      {apartamentos.map((tipo) => (
                        <MenuItem
                          key={tipo.Hotel}
                          value={tipo.Hotel}
                          children={`${formatHotel(tipo.Hotel)} | ${
                            tipo.Numero
                          }`}
                        />
                      ))}
                    </Select>
                    <FormHelperText
                      children={errors?.Quarto?.message || ''}
                    />
                  </FormControl>
                </Grid> */}
                <Grid item md={3} xs={12}>
                  <TextField
                    type="string"
                    name="Data"
                    fullWidth
                    error={!!errors?.Data}
                    helperText={errors?.Data?.message || ''}
                    label="Insira da data"
                    required
                    onChange={(event) => setValue('Data', event.target.value)}
                  />
                </Grid>
                {/* <Grid item sm={4} xs={12}>
                  <DateTimePicker
                    label="Data da Faxina"
                    value={watch().Data}
                    onChange={(Data) => {
                      setValue('Data', Data);
                    }}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        error={!!errors?.Data}
                        helperText={errors?.Data?.message || ''}
                      />
                    )}
                    ampm={false}
                    inputFormat="dd/MM/yyyy"
                    // minDateTime={new Date()}
                  />
                </Grid> */}
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
                children="Ocorreu um erro ao cadastrar a faxina!"
              />
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreateHotelForm;
