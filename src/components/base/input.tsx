import { ReactElement, ReactNode, useState } from 'react';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';
import { AiFillWarning, AiFillEye, AiTwotoneEyeInvisible } from 'react-icons/ai';
import { MdError } from 'react-icons/md';
import { GroupInput } from './groupInput';
import { Label } from './label';

export type typeInputColors = 'invalid' | 'valid' | 'warning' | 'default';

export const styleLiteral = {
  default: 'border-gray-400 text-gray-500 focus:border-blue-400 focus:shadow-blue-400 ',
  invalid: 'border-red-400 text-red-400 focus:shadow-red-400 ',
  valid: 'border-success text-success focus:shadow-success',
  warning: 'border-orange-400 text-orange-400 focus:shadow-orange-400 ',
};

export const getStylesFromInput = (status): string => styleLiteral[status] ?? styleLiteral.default;

type iconsFromInputType = {
  children: ReactNode;
  getStyles: string;
  onClick?: Function;
};

const IconsFromInput = ({ children, getStyles, onClick }: iconsFromInputType): ReactElement => (
  <button type="button" onClick={(): void => onClick()} className={`cursor-pointer flex ${getStyles}  `}>
    {children}
  </button>
);

IconsFromInput.defaultProps = {
  onClick: (): void => null,
};

type TPropsInput = {
  label: string;
  placeholder: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'hidden';
  name: string;
  status?: typeInputColors;
  disabled?: boolean;
  register: UseFormRegisterReturn;
  errors: FieldErrors;
  isSubmitted?: boolean;
};

export const Input = ({
  type,
  label,
  name,
  status,
  disabled,
  register,
  errors,
  placeholder,
  isSubmitted,
}: TPropsInput): ReactElement => {
  const [showEyeIcon, setShowEyeIcon] = useState<boolean>(false);

  const togglePassword = (): void => {
    setShowEyeIcon((prev) => !prev);
  };

  const showIcon = (): ReactElement => (showEyeIcon ? <AiFillEye /> : <AiTwotoneEyeInvisible />);

  const displayEyeIcon = type === 'password';
  const displayTextIfForPassword = displayEyeIcon && showEyeIcon ? 'text' : type;

  let getStyles = disabled ? styleLiteral.default : getStylesFromInput(status);
  const errorMessages = errors?.[name]?.message ?? '';
  const hasError = !!(errors && errorMessages);

  getStyles = hasError ? styleLiteral.invalid : getStyles;
  getStyles = !hasError && isSubmitted ? styleLiteral.valid : getStyles;

  return (
    <GroupInput>
      <Label name={name} text={label} className={[getStyles]} />
      <div className="relative">
        <input
          {...register}
          className={`w-full px-3 py-2 pr-12 focus:shadow-sm top-0 left-0 border bg-transparent outline-none rounded-md text-xs  ${getStyles} ${
            disabled ? 'bg-gray-50 dark:bg-gray-600' : ''
          }`}
          id={name}
          disabled={disabled}
          type={displayTextIfForPassword}
          placeholder={placeholder}
        />

        <div className="absolute top-0 right-2 h-full flex items-center justify-center">
          {displayEyeIcon ? (
            <IconsFromInput getStyles={getStyles} onClick={togglePassword}>
              {showIcon()}
            </IconsFromInput>
          ) : null}

          {status === 'warning' ? (
            <IconsFromInput getStyles={getStyles}>
              <AiFillWarning className="ml-1" />
            </IconsFromInput>
          ) : null}

          {hasError ? (
            <IconsFromInput getStyles={getStyles}>
              <MdError className="ml-1" />
            </IconsFromInput>
          ) : null}
        </div>
      </div>

      {hasError ? (
        <div role="alert" className={`text-xs mt-1 ${getStyles}`}>
          {errorMessages}
        </div>
      ) : null}
    </GroupInput>
  );
};

Input.defaultProps = {
  disabled: false,
  isSubmitted: false,
  status: '',
  type: '',
};
