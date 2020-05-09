import React from 'react';
import NumberFormat from 'react-number-format';

const MoneyField = ( {inputRef, onChange, ...other } ) => {
  return (
    <NumberFormat {...other} getInputRef={inputRef} onValueChange={values => {
        onChange({
          target: {
            value: values.floatValue
          }          
        });
      }} 
      prefix="R$ " thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true}
    />
  );
};

export default MoneyField;