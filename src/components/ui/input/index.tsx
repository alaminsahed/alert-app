import { Input as AntdInput } from 'antd';
import { FC } from 'react';
import cls from 'classnames';

import styles from './input.module.css';

interface InputProps {
  formik: any;
  label: string;
  name: string;
  placeholder: string;
  onChange: (e: any) => void;
  value: string;
  required?: boolean;
  type?: 'text' | 'password';
  disabled?: boolean;
}

const Input: FC<InputProps> = ({
  formik,
  label,
  name,
  onChange,
  placeholder,
  value,
  required = false,
  type = 'text',
  disabled = false,
}) => {
  return (
    <div className={styles.input}>
      <label htmlFor={name}>{label}</label>
      <AntdInput
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value ? value : formik.values[name]}
        className={cls(
          styles.inputField,
          formik.errors[name] && styles.borderRed,
        )}
        required={required}
        disabled={disabled}
      />
      {formik.errors[name] && (
        <div
          className={cls(
            'ant-form-item-explain-error',
            styles.errorMessage,
            formik.errors[name] && styles.displayBlock,
          )}
        >
          {formik.errors[name]}
        </div>
      )}
    </div>
  );
};

export { Input };
