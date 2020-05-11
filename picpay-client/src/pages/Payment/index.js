import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Typography, TextField, Divider, Button, Grid, Box } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import MoneyField from '../../components/MoneyField';
import PhoneField from '../../components/PhoneField';
import { postPayment } from '../../services/api';
import { setLoading } from '../../store/actions/loading-action';
import { subscribe, unsubscribe } from '../../services/web-socket';
import * as QRCodeWhite from '../../assets/fotos/qrcode-white-sem-fundo.png';
import useStyles from './styles';

const Payment = ( {setLoading} ) => {

  const classes = useStyles();

  const [qrCode, setQrCode] = useState(QRCodeWhite);
  const [statusPayment, setStatusPayment] = useState('Nenhum Pagamento Gerado');
  const [styleStatus, setStyleStatus] = useState(classes.textNormal);
  
  const handleSubmit = values => {
    setLoading(true);

    let formattedPhone = values.phone;
    formattedPhone = `+55 ${formattedPhone.replace('(', '').replace(')', '').replace('-', ' ')}`;

    const payment = {...values, referenceId: uuid(), phone: formattedPhone };
  
    postPayment(payment)
      .then(res => {
        const referenceId = res.referenceId;
        toast.success(`Compra ${referenceId} gerada com sucesso.`);
        setQrCode(res.qrCode);
        setStatusPayment(res.statusPayment);
        subscribe(`/queue/${referenceId}`, status => {
          if (status.body === 'paid') {
            setStatusPayment('Obaa! Pagamento Realizado.');
            setStyleStatus(classes.textBold);
            unsubscribe(`/queue/${referenceId}`);
          }
        });
      })
    .catch(err => toast.error(`Erro na geração da compra: ${err}`))
    .finally(() => setLoading(false));
  };

  const resetBuyer = formik => {
    formik.resetForm();
    setQrCode(QRCodeWhite);
    setStatusPayment('Nenhum Pagamento Gerado');
    setStyleStatus(classes.textNormal);
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
        <Formik 
          initialValues={{firstName: '', lastName: '', document: '', email: '', phone: '', value: 0.0}} 
          onSubmit={values => handleSubmit(values)} 
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required('Informe o nome do comprador'),
            lastName: Yup.string().required('Informe o sobrenome do comprador'),
            document: Yup.string().required('Informe o documento do comprador'),
            email: Yup.string().email('E-mail inválido').required('Informe o e-mail do comprador'),
            phone: Yup.string().required('Informe o telefone do comprador'),
            value: Yup.number().min(0.01, 'Informe um valor válido').required('Informe o valor da compra')
          })}> 
          { ( {formik, errors, touched} ) => (
            <Form autoComplete="off">
              <Typography variant="h5" style={{padding: '5px'}}>Comprador</Typography>
              
              <Grid container spacing={1} >
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                  <Field name="firstName">
                    { ( {field} ) => (                        
                        <TextField {...field} label="Nome" margin="normal" fullWidth 
                          variant="outlined" InputLabelProps={{shrink: true}} 
                          helperText={touched.firstName && errors.firstName ? errors.firstName : ''} />
                      ) }
                  </Field>
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                  <Field name="lastName">
                    { ( {field} ) => (
                        <TextField {...field} label="Sobrenome" margin="normal" fullWidth
                          variant="outlined" InputLabelProps={{shrink: true}}
                          helperText={touched.lastName && errors.lastName ? errors.lastName : ''} />
                      ) }
                  </Field>
                </Grid>

                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                  <Field name="document">
                    { ( {field} ) => (
                        <TextField {...field} label="Documento" margin="normal" fullWidth 
                          variant="outlined" InputLabelProps={{shrink: true}} 
                          helperText={touched.document && errors.document ? errors.document : ''} />
                      ) }
                  </Field>
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                  <Field name="email" >
                    { ( {field} ) => (
                        <TextField {...field} label="E-mail" type="email" margin="normal" fullWidth 
                          variant="outlined" InputLabelProps={{shrink: true}} 
                          helperText={touched.email && errors.email ? errors.email : ''} />
                      ) }
                  </Field>
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                  <Field name="phone">
                    { ( {field} ) => (
                        <TextField {...field} label="Telefone" margin="normal" fullWidth variant="outlined" 
                          InputLabelProps={{shrink: true}} InputProps={{ inputComponent: PhoneField}} 
                          helperText={touched.phone && errors.phone ? errors.phone : ''} />
                      ) }
                  </Field>
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                  <Field name="value">
                    { ( {field, form} ) => (
                        <TextField {...field} id="value" name="value" label="Valor" margin="normal" fullWidth variant="outlined" 
                          onChange={e => form.setFieldValue('value', e.target.value)} 
                          InputLabelProps={{shrink: true}} InputProps={{inputComponent: MoneyField }} 
                          helperText={touched.value && errors.value ? errors.value : ''} />
                      ) }
                  </Field>
                </Grid>
              </Grid>

              <Divider style={{marginTop: '5px', marginBottom: '10px'}} />

              <Box width="100%" display="flex" justifyContent="flex-end" alignItems="center" style={{marginBottom: '10px'}}>
                <Button type="submit" variant="contained" color="primary" size="large">Gerar Pagamento</Button>

                <Button type="button" variant="contained" color="secondary" size="large" style={{marginLeft: '5px'}} 
                  onClick={() => resetBuyer(formik)}>Novo Comprador</Button>
              </Box>
            </Form>
          )
        }
        </Formik>
      </Grid>
        
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} className={classes.qrCode} >
        <figure className={classes.figure}>
          <img className={classes.img} src={qrCode} alt="QRCode" title="QRCode"/>
          <Box component="span" display="flex" justifyContent="center" alignItems="center" p={1} className={styleStatus}>
            {statusPayment}
          </Box>
        </figure>
      </Grid>
    </Grid>
  )
};

const mapStateToProps = state => {
  return { isLoading: state.isLoading };
};

export default connect(mapStateToProps, {setLoading})(Payment);