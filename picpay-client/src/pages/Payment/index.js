import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Typography, TextField, Divider, Button, Grid, Box } from '@material-ui/core';
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

  const inputFirstName = useRef(null);
  const inputLastName = useRef(null);
  const inputDocument = useRef(null);
  const inputEmail = useRef(null);
  const inputPhone = useRef(null);  
  const [valuePayment, setValuePayment] = useState(0);
  const [qrCode, setQrCode] = useState(QRCodeWhite);
  const [statusPayment, setStatusPayment] = useState('Nenhum Pagamento Gerado');
  const [styleStatus, setStyleStatus] = useState(classes.textNormal);

  const handleSave = e => {
    e.preventDefault();
    setLoading(true);

    const referenceId = uuid();
    const phone = inputPhone.current.value ? 
      `+55 ${inputPhone.current.value.replace('(', '').replace(')', '').replace('-', ' ')}`
      : '';  

    const payment = {
      referenceId,
      value: valuePayment,
      firstName: inputFirstName.current.value,
      lastName: inputLastName.current.value,
      document: inputDocument.current.value,
      email: inputEmail.current.value,
      phone: phone
    };

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

  const resetBuyer = () => {
    inputFirstName.current.value = '';
    inputLastName.current.value = '';
    inputDocument.current.value = '';
    inputEmail.current.value = '';
    inputPhone.current.value = '';
    setValuePayment(0);
    setQrCode(QRCodeWhite);
    setStatusPayment('Nenhum Pagamento Gerado');
    setStyleStatus(classes.textNormal);
  };

  const handleChangeMoney = e => setValuePayment(e.target.value);

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
        <form onSubmit={handleSave} autoComplete="off">
          <Typography variant="h5" style={{padding: '5px'}}>Comprador</Typography>

          <Grid container spacing={1} >
            <Grid item xs={12} sm={12} md={5} lg={5} xl={5} >
              <TextField inputRef={inputFirstName} id="firstName" label="Nome" margin="normal" fullWidth 
                variant="outlined" InputLabelProps={{shrink: true}} required />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
              <TextField inputRef={inputLastName} id="lastName" label="Sobrenome" margin="normal" fullWidth 
                variant="outlined" InputLabelProps={{shrink: true}} required />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} >
              <TextField inputRef={inputDocument} id="document" label="Documento" margin="normal" fullWidth 
                variant="outlined" InputLabelProps={{shrink: true}} required />
            </Grid>
          </Grid>

          <Grid container spacing={1} >
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
              <TextField inputRef={inputEmail} id="email" label="E-mail" type="email" margin="normal" fullWidth 
                variant="outlined" InputLabelProps={{shrink: true}} required />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >          
              <TextField inputRef={inputPhone} id="phone" label="Telefone" margin="normal" fullWidth variant="outlined" 
                InputLabelProps={{shrink: true}} InputProps={{ inputComponent: PhoneField}} required />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
              <TextField id="value" name="value" value={valuePayment} label="Valor" margin="normal" fullWidth variant="outlined" 
                onChange={handleChangeMoney} InputLabelProps={{shrink: true}} InputProps={{inputComponent: MoneyField }} required min={0.01} />
            </Grid>
          </Grid>        

          <Divider style={{marginTop: '5px', marginBottom: '10px'}} />

          <Box width="100%" display="flex" justifyContent="flex-end" alignItems="center" style={{marginBottom: '10px'}}>
            <Button type="submit" variant="contained" color="primary" size="large">Gerar Pagamento</Button>
            <Button type="button" variant="contained" color="secondary" size="large" style={{marginLeft: '5px'}}
              onClick={resetBuyer}>Novo Comprador</Button>
          </Box>
        </form>
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