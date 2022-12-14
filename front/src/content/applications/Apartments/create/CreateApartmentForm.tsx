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
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Apartments } from 'src/models/apartments';
import { ApartmentTypes } from 'src/models/apartmentTypes';
import { Hotels } from 'src/models/hotels';
import { create } from 'src/services/apartments';
import { findAll as findType } from 'src/services/apartmentTypes';
import { findAll as findHotel } from 'src/services/hotels';
import * as yup from 'yup';

const schema = yup.object().shape({
  Codigo: yup.number().required('É obrigatório informar uma filial'),
  Id_tipo: yup
    .number()
    .required('É obrigatório informar um tipo de apartamento'),
  numero: yup
    .number()
    .required('É obrigatório informar o número do apartamento'),
});

function CreateHotelForm() {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Apartments> = (data) => {
    create(data).then((res) => {
      setOpenConfirm(false);
      return navigate('/apartments/');
    });
  };

  const [openErrors, setOpenErrors] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Apartments>({ resolver: yupResolver(schema) });

  useEffect(() => {
    register('numero');
    register('Codigo');
    register('Id_tipo');
  }, [register]);

  const [hotelList, setHotelList] = useState<Hotels[]>([]);
  const [typeList, setTypeList] = useState<ApartmentTypes[]>([]);
  const [searchParams] = useSearchParams();

  const selectHotel = useCallback(
    (hotel) => {
      if (!!hotel) {
        const id = !!hotel.Id_hotel ? hotel.Id_hotel : hotel;
        setValue('Codigo', id);
      }
    },
    [setValue]
  );

  useEffect(() => {
    const fetchHotelList = async () => {
      findHotel().then((res) => {
        setHotelList(res);
        const hotel = res.find((hotel) => {
          return (
            hotel.Id_hotel ===
            (parseInt(searchParams.get('Codigo')) ?? res[0].Id_hotel)
          );
        });
        selectHotel(hotel);
      });
    };
    const fetchApartmentTypeList = async () => {
      findType().then((res) => {
        setTypeList(res);
      });
    };
    fetchHotelList();
    fetchApartmentTypeList();
  }, [setValue, searchParams, setHotelList, selectHotel]);

  const formatBoolean = (value: boolean): string => (value ? 'Sim' : 'Não');

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
              title="Cadastrar Apartamento"
              subheader="Selecione os dados do apartamento."
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
                    type="number"
                    name="number"
                    fullWidth
                    error={!!errors?.numero}
                    helperText={errors?.numero?.message || ''}
                    label="Número do apartamento"
                    required
                    onChange={(event) =>
                      setValue('numero', parseInt(event.target.value))
                    }
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth error={!!errors?.Codigo}>
                    <InputLabel children="Selecione a filial do hotel" />
                    <Select
                      value={watch().Codigo ?? ''}
                      label="Selecione a filial do hotel"
                      onChange={(tipo: SelectChangeEvent<string>) =>
                        setValue('Codigo', parseInt(tipo.target.value))
                      }
                    >
                      {hotelList.map((hotel) => (
                        <MenuItem
                          key={hotel.Id_hotel}
                          value={hotel.Id_hotel}
                          children={hotel.Cidade}
                        />
                      ))}
                    </Select>
                    <FormHelperText children={errors?.Codigo?.message || ''} />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth error={!!errors?.Id_tipo}>
                    <InputLabel children="Selecione o tipo de apartamento" />
                    <Select
                      value={watch().Id_tipo ?? ''}
                      label="Selecione o tipo de apartamento"
                      onChange={(tipo: SelectChangeEvent<string>) =>
                        setValue('Id_tipo', parseInt(tipo.target.value))
                      }
                    >
                      {typeList.map((tipo) => (
                        <MenuItem
                          key={tipo.Id_tipo}
                          value={tipo.Id_tipo}
                          children={`
                          ${tipo.Numero_camas_casal} Camas de Casal &
                          ${tipo.Numero_camas_solteiro} Camas de Solteiro |
                          Tv: ${formatBoolean(
                            tipo.Tem_tv
                          )} PCD: ${formatBoolean(tipo.Adaptado)}`}
                        />
                      ))}
                    </Select>
                    <FormHelperText children={errors?.Id_tipo?.message || ''} />
                  </FormControl>
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
                children="Ocorreu um erro ao cadastrar o apartamento!"
              />
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreateHotelForm;
