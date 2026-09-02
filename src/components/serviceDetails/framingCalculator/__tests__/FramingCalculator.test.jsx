import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FramingCalculator from '../FramingCalculator';
import { FRAMING_CALCULATOR_COPY } from '../framingCalculatorCopy';
import { FRAMING_CALCULATOR_DEFAULT_ESTIMATE } from '../framingCalculatorData';

describe('FramingCalculator', () => {
  it('renders the Figma Framing calculator UI', () => {
    render(<FramingCalculator />);

    expect(
      screen.getByRole('region', { name: FRAMING_CALCULATOR_COPY.regionLabel }),
    ).toBeInTheDocument();
    expect(screen.getByText(FRAMING_CALCULATOR_COPY.title)).toBeInTheDocument();
    expect(screen.getByText(FRAMING_CALCULATOR_COPY.subtitle)).toBeInTheDocument();
    expect(screen.getByText(FRAMING_CALCULATOR_COPY.startingEstLabel)).toBeInTheDocument();
    expect(screen.getByTestId('framing-calculator-estimate')).toHaveTextContent(
      `$${FRAMING_CALCULATOR_DEFAULT_ESTIMATE}`,
    );
    expect(screen.getByLabelText(FRAMING_CALCULATOR_COPY.lengthLabel)).toBeInTheDocument();
    expect(screen.getByLabelText(FRAMING_CALCULATOR_COPY.heightLabel)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: FRAMING_CALCULATOR_COPY.calculate }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: FRAMING_CALCULATOR_COPY.clear })).toBeInTheDocument();
  });

  it('calculates and clears the estimate from wall length and height inputs', async () => {
    const user = userEvent.setup();
    render(<FramingCalculator />);

    const lengthInput = screen.getByLabelText(FRAMING_CALCULATOR_COPY.lengthLabel);
    const heightInput = screen.getByLabelText(FRAMING_CALCULATOR_COPY.heightLabel);
    await user.clear(lengthInput);
    await user.type(lengthInput, '20');
    await user.clear(heightInput);
    await user.type(heightInput, '10');
    await user.click(screen.getByRole('button', { name: FRAMING_CALCULATOR_COPY.calculate }));

    expect(screen.getByTestId('framing-calculator-estimate')).toHaveTextContent('$155');

    await user.click(screen.getByRole('button', { name: FRAMING_CALCULATOR_COPY.clear }));
    expect(lengthInput).toHaveValue(null);
    expect(heightInput).toHaveValue(null);
    expect(screen.getByTestId('framing-calculator-estimate')).toHaveTextContent(
      `$${FRAMING_CALCULATOR_DEFAULT_ESTIMATE}`,
    );
  });

  it('shows inline errors when calculating with empty dimensions', async () => {
    const user = userEvent.setup();
    render(<FramingCalculator />);

    await user.clear(screen.getByLabelText(FRAMING_CALCULATOR_COPY.lengthLabel));
    await user.clear(screen.getByLabelText(FRAMING_CALCULATOR_COPY.heightLabel));
    await user.click(screen.getByRole('button', { name: FRAMING_CALCULATOR_COPY.calculate }));

    expect(screen.getByText(FRAMING_CALCULATOR_COPY.errors.lengthRequired)).toBeInTheDocument();
    expect(screen.getByText(FRAMING_CALCULATOR_COPY.errors.heightRequired)).toBeInTheDocument();
  });
});
