import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CountertopCalculator from '../CountertopCalculator';
import { COUNTERTOP_CALCULATOR_COPY } from '../countertopCalculatorCopy';
import { COUNTERTOP_CALCULATOR_DEFAULT_ESTIMATE } from '../countertopCalculatorData';

describe('CountertopCalculator', () => {
  it('renders the Figma Countertop Calculator UI', () => {
    render(<CountertopCalculator />);

    expect(
      screen.getByRole('region', { name: COUNTERTOP_CALCULATOR_COPY.regionLabel }),
    ).toBeInTheDocument();
    expect(screen.getByText(COUNTERTOP_CALCULATOR_COPY.title)).toBeInTheDocument();
    expect(screen.getByText(COUNTERTOP_CALCULATOR_COPY.subtitle)).toBeInTheDocument();
    expect(screen.getByText(COUNTERTOP_CALCULATOR_COPY.startingEstLabel)).toBeInTheDocument();
    expect(screen.getByTestId('countertop-calculator-estimate')).toHaveTextContent(
      `$${COUNTERTOP_CALCULATOR_DEFAULT_ESTIMATE}`,
    );
    expect(screen.getByLabelText(COUNTERTOP_CALCULATOR_COPY.lengthLabel)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: COUNTERTOP_CALCULATOR_COPY.calculate }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: COUNTERTOP_CALCULATOR_COPY.clear }),
    ).toBeInTheDocument();
  });

  it('calculates and clears the estimate from the counter length input', async () => {
    const user = userEvent.setup();
    render(<CountertopCalculator />);

    const lengthInput = screen.getByLabelText(COUNTERTOP_CALCULATOR_COPY.lengthLabel);
    await user.clear(lengthInput);
    await user.type(lengthInput, '20');
    await user.click(screen.getByRole('button', { name: COUNTERTOP_CALCULATOR_COPY.calculate }));

    expect(screen.getByTestId('countertop-calculator-estimate')).toHaveTextContent('$195');

    await user.click(screen.getByRole('button', { name: COUNTERTOP_CALCULATOR_COPY.clear }));
    expect(lengthInput).toHaveValue(null);
    expect(screen.getByTestId('countertop-calculator-estimate')).toHaveTextContent(
      `$${COUNTERTOP_CALCULATOR_DEFAULT_ESTIMATE}`,
    );
  });

  it('shows an inline error when calculating with an empty length', async () => {
    const user = userEvent.setup();
    render(<CountertopCalculator />);

    await user.clear(screen.getByLabelText(COUNTERTOP_CALCULATOR_COPY.lengthLabel));
    await user.click(screen.getByRole('button', { name: COUNTERTOP_CALCULATOR_COPY.calculate }));

    expect(screen.getByText(COUNTERTOP_CALCULATOR_COPY.errors.lengthRequired)).toBeInTheDocument();
  });
});
