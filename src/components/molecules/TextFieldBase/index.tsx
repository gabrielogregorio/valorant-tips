import { Dispatch, HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode, Ref, SetStateAction, useState } from 'react';
import { HelpText, HelpTextVariantEnum } from '../helpText';
import { Label, LabelVariantEnum } from '../Label';
import { Optional, OptionalVariantEnum } from '../optional';
import { tailwindMerge } from '@/libs/mergeClasses';
import { Icons } from '@/atoms/Icons';
import { ClickableInputButton } from '../ClickableInputButton';

export interface TextFieldBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isOptional?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  helpText?: string;
  ref?: Ref<HTMLInputElement>;
  errorMessage?: string;
  id: string;
  name: string;
}

const getVariants = ({
  disabled,
  errorMessage,
}: {
  disabled: boolean;
  errorMessage: string;
}): {
  label: LabelVariantEnum;
  optional: OptionalVariantEnum;
  helpText: HelpTextVariantEnum;
} => {
  if (disabled) {
    return {
      helpText: HelpTextVariantEnum.Disabled,
      label: LabelVariantEnum.Disabled,
      optional: OptionalVariantEnum.Disabled,
    };
  }

  if (errorMessage) {
    return {
      helpText: HelpTextVariantEnum.Error,
      label: LabelVariantEnum.Error,
      optional: OptionalVariantEnum.Error,
    };
  }

  return {
    helpText: HelpTextVariantEnum.Default,
    label: LabelVariantEnum.Default,
    optional: OptionalVariantEnum.Default,
  };
};

const handlePasswordShow = (
  type: HTMLInputTypeAttribute | undefined,
  showPassword: boolean,
  setShowPassword: Dispatch<SetStateAction<boolean>>,
) => {
  const typeHandled = showPassword && type === 'password' ? 'text' : type;

  let iconPassword: ReactNode;

  if (type === 'password') {
    iconPassword = showPassword ? (
      <ClickableInputButton ariaLabel="Esconder senha" onClick={() => setShowPassword(false)} icon="OpenEyeOutline" />
    ) : (
      <ClickableInputButton ariaLabel="Mostrar senha" onClick={() => setShowPassword(true)} icon="CloseEyeOutline" />
    );
  }

  return {
    typeHandled,
    iconPassword,
  };
};

export const TextFieldBase = ({
  errorMessage = '',
  id,
  helpText = undefined,
  ref = undefined,
  disabled = false,
  name,
  className = '',
  type,
  rightIcon = undefined,
  isOptional = false,
  label,
  leftIcon = undefined,
  value,
  ...rest
}: TextFieldBaseProps) => {
  const variants = getVariants({ disabled, errorMessage });

  const helpTextHandled = errorMessage || helpText;

  const [showPassword, setShowPassword] = useState(false);

  const { iconPassword, typeHandled } = handlePasswordShow(type, showPassword, setShowPassword);

  return (
    <div className="flex w-full flex-col gap-1">
      <div className="flex items-center justify-between px-1">
        <Label text={label} htmlFor={id} variant={variants.label} />
        {isOptional ? <Optional variant={variants.optional} /> : null}
      </div>

      <div
        className={tailwindMerge(
          'relative flex items-center rounded-xl border border-border-soft bg-content-bg px-3 py-1 transition-all duration-200 hover:border-primary focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20',
          disabled ? 'cursor-not-allowed opacity-50' : '',
          errorMessage &&
            'border-feedback-error-soft focus-within:border-feedback-error-soft focus-within:ring-feedback-error-soft/20',
          className,
        )}>
        {leftIcon ? <div className="mr-2 flex items-center justify-center">{leftIcon}</div> : null}

        <input
          type={typeHandled}
          ref={ref}
          name={name}
          value={value === null || value === undefined ? '' : value}
          id={id}
          disabled={disabled}
          className={tailwindMerge(
            'flex-1 bg-transparent py-2.5 text-base font-normal tracking-[0%] text-content-fg! outline-none placeholder:text-content-fg-placeholder disabled:cursor-not-allowed',
          )}
          {...rest}
        />

        {rightIcon ? (
          <div className="ml-2 flex items-center justify-center">{rightIcon}</div>
        ) : iconPassword ? (
          <div className="ml-2 flex items-center justify-center">{iconPassword}</div>
        ) : null}
      </div>

      {helpTextHandled ? (
        <div className="px-1 mt-1">
          <HelpText
            leftIcon={errorMessage ? <Icons.AlertOutline className="h-3 w-3" /> : undefined}
            variant={variants.helpText}
            text={helpTextHandled}
          />
        </div>
      ) : null}
    </div>
  );
};
