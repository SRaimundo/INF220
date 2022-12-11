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
  idFuncionario: yup
    .number()
    .required('É obrigatório selecionar um funcionário para a faxina'),
  idApartamento: yup
    .number()
    .required('É obrigatório selecionar um apartamento'),
  dataArruma: yup
    .date()
    .required('É obrigatório informar uma data para a faxina'),
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
      const hotel = hotels.find((hotel) => hotel.idHotel === id);
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
    register('idFuncionario');
    register('idApartamento');
    register('dataArruma', { value: initDate });
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
                <Grid item md={4} xs={12}>
                  <FormControl fullWidth error={!!errors?.idFuncionario}>
                    <InputLabel children="Selecione o(a) responsável pela limpeza" />
                    <Select
                      value={watch().idFuncionario ?? ''}
                      label="Selecione o(a) responsável pela limpeza"
                      onChange={(funcionario: SelectChangeEvent<string>) =>
                        setValue(
                          'idFuncionario',
                          parseInt(funcionario.target.value)
                        )
                      }
                    >
                      {funcionarios.map((funcionario) => (
                        <MenuItem
                          key={funcionario.idFuncionario}
                          value={funcionario.idFuncionario}
                          children={funcionario.nome}
                        />
                      ))}
                    </Select>
                    <FormHelperText
                      children={errors?.idFuncionario?.message || ''}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={4} xs={12}>
                  <FormControl fullWidth error={!!errors?.idApartamento}>
                    <InputLabel children="Selecione o apartamento" />
                    <Select
                      value={watch().idApartamento ?? ''}
                      label="Selecione o apartamento"
                      onChange={(tipo: SelectChangeEvent<string>) =>
                        setValue('idApartamento', parseInt(tipo.target.value))
                      }
                    >
                      {apartamentos.map((tipo) => (
                        <MenuItem
                          key={tipo.idApartamento}
                          value={tipo.idApartamento}
                          children={`${formatHotel(tipo.Codigo)} | ${
                            tipo.numero
                          }`}
                        />
                      ))}
                    </Select>
                    <FormHelperText
                      children={errors?.idApartamento?.message || ''}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={4} xs={12}>
                  <DateTimePicker
                    label="Data da Faxina"
                    value={watch().dataArruma}
                    onChange={(date) => {
                      setValue('dataArruma', date);
                    }}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        error={!!errors?.dataArruma}
                        helperText={errors?.dataArruma?.message || ''}
                      />
                    )}
                    ampm={false}
                    inputFormat="dd/MM/yyyy HH:mm"
                    minDateTime={new Date()}
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
