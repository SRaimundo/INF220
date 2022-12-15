import { yupResolver } from '@hookform/resolvers/yup';
import PublishTwoToneIcon from '@mui/icons-material/PublishTwoTone';
import { DateTimePicker } from '@mui/lab';
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
import { ApartmentTypes } from 'src/models/apartmentTypes';
import { Clients } from 'src/models/clients';
import { Hotels } from 'src/models/hotels';
import { Reservations } from 'src/models/reservations';
import { findAll as findType } from 'src/services/apartmentTypes';
import { findAll as findClient } from 'src/services/clients';
import { findAll as findHotel } from 'src/services/hotels';
import { create } from 'src/services/reservations';
import * as yup from 'yup';
 
const schema = yup.object().shape({
 Tipo: yup
   .string()
   .required('É obrigatório informar um tipo de apartamento'),
 Cliente: yup.string().required('É obrigatório informar um cliente'),
 Num_hospedes: yup
   .string()
   .required('É obrigatório informar o número de pessoas hospedadas'),
 // Data_prevista_entrada: yup
 //   .date()
 //   .required('É obrigatório informar a data prevista de entrada'),
 // Data_prevista_saida: yup
 //   .date()
 //   .required('É obrigatório informar a data prevista de saída'),
});
 
function CreateReservationForm() {
 const navigate = useNavigate();
 
 const {
   register,
   setValue,
   handleSubmit,
   watch,
   formState: { errors },
 } = useForm<Reservations>({ resolver: yupResolver(schema) });
 
 const onSubmit: SubmitHandler<Reservations> = (data) => {
   create(data).then((res) => {
     setOpenConfirm(false);
     console.log(res);
     return navigate('/reservations/');
   });
 };
 
 useEffect(() => {
   const initDate = new Date();
   initDate.setDate(initDate.getDate() + 1);
 
   register('Tipo');
   register('Cliente');
   register('Num_hospedes');
   register('Data_prevista_entrada');
   register('Data_prevista_saida');
 }, [register]);
 
 const [openErrors, setOpenErrors] = useState(false);
 const [openConfirm, setOpenConfirm] = useState(false);
 
 const [hotelList, setHotelList] = useState<Hotels[]>([]);
 const [typeList, setTypeList] = useState<ApartmentTypes[]>([]);
 const [clientList, setClientList] = useState<Clients[]>([]);
 
 useEffect(() => {
   const fetchHotelList = async () => {
     findHotel().then((res) => {
       setHotelList(res);
     });
   };
   const fetchClientList = async () => {
     findClient().then((res) => {
       setClientList(res);
     });
   };
   const fetchApartmentTypeList = async () => {
     findType().then((res) => {
       setTypeList(res);
     });
   };
   fetchHotelList();
   fetchClientList();
   fetchApartmentTypeList();
 }, [setHotelList, setClientList, setTypeList]);
 
 const formatBoolean = (value: boolean): string => (value ? 'Sim' : 'Não');
 
 const formatDate = (dateString: string): string => {
   var date = new Date(dateString);
   return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
 };
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
             title="Cadastrar Reserva"
             subheader="Selecione os dados da reserva."
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
                 <FormControl fullWidth error={!!errors?.Cliente}>
                   <InputLabel children="Selecione o cliente" />
                   <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={watch().Cliente ?? ''}
                     label="Selecione o cliente"
                     onChange={(cliente: SelectChangeEvent<string>) =>
                       setValue('Cliente', parseInt(cliente.target.value))
                     }
                   >
                     {clientList.map((cliente) => (
                       <MenuItem
                         key={cliente.Id_cliente}
                         value={cliente.Id_cliente}
                         children={cliente.Nome}
                       />
                     ))}
                   </Select>
                   <FormHelperText
                     children={errors?.Cliente?.message || ''}
                   />
                 </FormControl>
               </Grid>
               <Grid item md={6} xs={12}>
                 <FormControl fullWidth error={!!errors?.Tipo}>
                   <InputLabel children="Selecione o tipo de apartamento" />
                   <Select
                     value={watch().Tipo ?? ''}
                     label="Selecione o tipo de apartamento"
                     onChange={(tipo: SelectChangeEvent<string>) =>
                       setValue('Tipo', parseInt(tipo.target.value))
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
                           tipo.Tem_TV
                         )} PCD: ${formatBoolean(tipo.Adaptado)}`}
                       />
                     ))}
                   </Select>
                   <FormHelperText children={errors?.Tipo?.message || ''} />
                 </FormControl>
               </Grid>
               <Grid item md={6} xs={12}>
                 <TextField
                   type="number"
                   name="number"
                   fullWidth
                   error={!!errors?.Num_hospedes}
                   helperText={errors?.Num_hospedes?.message || ''}
                   label="Numero de Hóspedes"
                   required
                   onChange={(event) =>
                     setValue('Num_hospedes', parseInt(event.target.value))
                   }
                 />
               </Grid>
             </Grid>
           </CardContent>
         </Card>
       </Grid>
      
       <Grid item xs={12}>
         <Card>
           <CardHeader
             title="Data da Reserva"
             subheader="Informe a data desejada para a reserva."
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
               <Grid item sm={6} xs={12}>
                 <TextField
                   type="string"
                   name="Data_prevista_entrada"
                   fullWidth
                   error={!!errors?.Data_prevista_entrada}
                   helperText={errors?.Data_prevista_entrada?.message || ''}
                   label="Insira da data"
                   required
                   onChange={(event) => setValue('Data_prevista_entrada', event.target.value)}
                 />
               </Grid>
               <Grid item sm={6} xs={12}>
                 <TextField
                   type="string"
                   name="Data_prevista_entrada"
                   fullWidth
                   error={!!errors?.Data_prevista_saida}
                   helperText={errors?.Data_prevista_saida?.message || ''}
                   label="Insira da data"
                   required
                   onChange={(event) => setValue('Data_prevista_saida', event.target.value)}
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
               children="Ocorreu um erro ao cadastrar a reserva!"
             />
           }
         />
       </Grid>
     </Grid>
   </Container>
 );
}
 
export default CreateReservationForm;
 

