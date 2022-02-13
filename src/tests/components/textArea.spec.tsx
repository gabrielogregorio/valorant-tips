import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextArea from '@/base/textArea';

describe('<TextArea />', () => {
  it('should render textarea', () => {
    const fn = jest.fn();
    render(<TextArea title="Type our description 1" name="description" value="" setValue={fn} />);

    expect(screen.getByLabelText(/Type our description 1/i)).toBeInTheDocument();
  });

  it('should call handleChange function on each key pressed', () => {
    const fn = jest.fn();
    render(<TextArea title="Type our description 2" name="description" value="" setValue={fn} />);

    const input: HTMLInputElement = screen.getByLabelText(/Type our description 2/i);

    userEvent.type(input, 'a One2 text@12');
    expect(fn).toHaveBeenCalledTimes('a One2 text@12'.length);
  });
});
