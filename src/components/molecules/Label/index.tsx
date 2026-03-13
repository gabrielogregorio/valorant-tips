import { LabelHTMLAttributes } from 'react';
import { Text, TextVariantEnum } from '@/atoms/Text';
import { tailwindMerge } from '@/libs/mergeClasses';

export enum LabelVariantEnum {
  Default = 'Default',
  Disabled = 'Disabled',
  Error = 'Error',
}
type labelHtmlProps = LabelHTMLAttributes<HTMLLabelElement>;

interface Props extends Omit<labelHtmlProps, 'children'> {
  htmlFor: string;
  variant?: LabelVariantEnum;
  text?: string;
}

const variantStyles: { [key in LabelVariantEnum]: { labelStyles: string } } = {
  [LabelVariantEnum.Default]: {
    labelStyles: 'text-neutral-100',
  },
  [LabelVariantEnum.Disabled]: {
    labelStyles: 'text-content-fg-disabled',
  },
  [LabelVariantEnum.Error]: {
    labelStyles: 'text-feedback-error-soft',
  },
};

export const Label = ({ htmlFor, variant = LabelVariantEnum.Default, className = '', text = '', ...rest }: Props) => {
  const isDisabled = variant === LabelVariantEnum.Disabled;

  return (
    <label
      aria-disabled={isDisabled}
      htmlFor={htmlFor}
      className={tailwindMerge(variantStyles[variant].labelStyles, className)}
      {...rest}>
      <Text variant={TextVariantEnum.subtext}>{text}</Text>
    </label>
  );
};
