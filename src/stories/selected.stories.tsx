import { ComponentMeta, Story } from '@storybook/react';
import { TPropsSelectedBase, Selected } from '../components/base/selected';
import { agents } from '@/data/data-valorant';
import { convertToSelectedRender } from '../core/helpers/convertToSelectedData';

export default {
  title: 'form/Selected',
  component: Selected,
} as ComponentMeta<typeof Selected>;

const Template: Story<TPropsSelectedBase> = (props) => {
  const onChangeInput = () => {};
  return <Selected {...props} setValue={onChangeInput} />;
};

export const Default: Story<TPropsSelectedBase> = Template.bind({});
Default.args = {
  name: 'Agente',
  text: 'Agente',
  value: '',
  render: convertToSelectedRender(agents()),
};