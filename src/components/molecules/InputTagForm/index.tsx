import { JSX } from 'react';
import { InputTagFormExternal } from '@/libs/react-hook-form/InputTagForm';
import { InputTagFormProps } from './interfaces';
import { CustomFieldValuesInputTagBaseValue } from '@/shared/@types/CustomFieldValues';

export const InputTagForm: <T extends CustomFieldValuesInputTagBaseValue>(
  props: InputTagFormProps<T>,
) => JSX.Element = (props) => <InputTagFormExternal {...props} />;
