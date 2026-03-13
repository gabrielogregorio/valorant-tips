import { useEffect, useRef, ReactElement, RefObject } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { TextFieldBase, TextFieldBaseProps } from '@/molecules/TextFieldBase';
import { CustomFieldValues } from '@/shared/@types/CustomFieldValues';

export interface TextFieldFormProps<T extends CustomFieldValues> extends Omit<
  Omit<TextFieldBaseProps, 'value'>,
  'onChange'
> {
  name: Extract<keyof T, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
}

export const TextFieldFormExternal = <T extends FieldValues>({
  name,
  control,
  onBlur,
  onFocus,
  errorMessage,
  ...rest
}: TextFieldFormProps<T>): ReactElement => {
  const wrapperRefInput: RefObject<HTMLInputElement | null> = useRef(null);
  const {
    field: { value, onChange: onChangeHookForm, onBlur: onBlurHookForm, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  useEffect(() => {
    const setRefInHookForm = (): void => {
      ref(wrapperRefInput?.current);
    };

    setRefInHookForm();
  }, [ref]);

  const errorMessageHandled = error?.message || errorMessage;

  return (
    <TextFieldBase
      ref={wrapperRefInput}
      value={value}
      errorMessage={errorMessageHandled}
      onFocus={(event) => {
        onFocus?.(event);
      }}
      onBlur={(event) => {
        onBlurHookForm();
        onBlur?.(event);
      }}
      name={name}
      onChange={(event) => onChangeHookForm(event.target.value)}
      {...rest}
    />
  );
};
