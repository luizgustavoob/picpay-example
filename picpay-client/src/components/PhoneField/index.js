import React from 'react';
import MaskedInput from 'react-text-mask';

const MoneyField = ( {inputRef, ...other } ) => {

  const mask = () => {
    return ['(', /[1-9]/, /[1-9]/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  };

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={mask}
      keepCharPositions={false}
      placeholderChar={'\u2000'}
    />
  );
};

export default MoneyField;