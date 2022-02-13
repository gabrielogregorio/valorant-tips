import { ChangeEvent } from 'react';
import GroupInput from './groupInput';
import LabelComponent from './label';

type inputFileType = {
  disabled: boolean;
  type: 'file';
  text: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name;
};

export default function InputFile({ disabled, type, text, onChange, name }: inputFileType) {
  return (
    <GroupInput>
      <LabelComponent name={name} text={text} />
      <input
        className="w-full p-1.5 border-2 border-skin-secondary bg-skin-bgContainer outline-none rounded-lg resize-none text-skin-textColor"
        id={name}
        disabled={disabled}
        type={type}
        placeholder={text}
        onChange={(e) => onChange(e)}
      />
    </GroupInput>
  );
}