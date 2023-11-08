import './form-input.scss';

import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { CustomError } from '#components';

interface FormInputProps {
  classes?: string;
  register?: UseFormRegisterReturn;
  errors?: FieldError;
  type?: string;
}

export function FormInput({ classes, register, errors, type }: FormInputProps) {
  return (
    <div className={['form-input', classes].join(' ')}>
      <input type={type} className="form-input__input" {...register} />
      {errors && <CustomError classes="form-input__error" text={errors.message} />}
    </div>
  );
}
export default FormInput;
