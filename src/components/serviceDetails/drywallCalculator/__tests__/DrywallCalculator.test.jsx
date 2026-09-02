import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DrywallCalculator from '../DrywallCalculator';
import { DRYWALL_CALCULATOR_COPY } from '../drywallCalculatorCopy';
import { DRYWALL_CALCULATOR_DEFAULT_ESTIMATE } from '../drywallCalculatorData';

describe('DrywallCalculator', () => {
  it('renders the Figma Drywall Calculator UI', () => {
    render(<DrywallCalculator />);

    expect(
      screen.getByRole('region', { name: DRYWALL_CALCULATOR_COPY.regionLabel }),
    ).toBeInTheDocument();
    expect(screen.getByText(DRYWALL_CALCULATOR_COPY.title)).toBeInTheDocument();
    expect(screen.getByText(DRYWALL_CALCULATOR_COPY.subtitle)).toBeInTheDocument();
    expect(screen.getByText(DRYWALL_CALCULATOR_COPY.startingEstLabel)).toBeInTheDocument();
    expect(screen.getByTestId('drywall-calculator-estimate')).toHaveTextContent(
      `$${DRYWALL_CALCULATOR_DEFAULT_ESTIMATE}`,
    );
    expect(screen.getByLabelText(DRYWALL_CALCULATOR_COPY.widthLabel)).toBeInTheDocument();
    expect(screen.getByLabelText(DRYWALL_CALCULATOR_COPY.heightLabel)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: DRYWALL_CALCULATOR_COPY.calculate }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: DRYWALL_CALCULATOR_COPY.clear })).toBeInTheDocument();
  });

  it('calculates and clears the estimate from wall width and height inputs', async () => {
    const user = userEvent.setup();
    render(<DrywallCalculator />);

    const widthInput = screen.getByLabelText(DRYWALL_CALCULATOR_COPY.widthLabel);
    const heightInput = screen.getByLabelText(DRYWALL_CALCULATOR_COPY.heightLabel);
    await user.clear(widthInput);
    await user.type(widthInput, '20');
    await user.clear(heightInput);
    await user.type(heightInput, '10');
    await user.click(screen.getByRole('button', { name: DRYWALL_CALCULATOR_COPY.calculate }));

    expect(screen.getByTestId('drywall-calculator-estimate')).toHaveTextContent('$155');

    await user.click(screen.getByRole('button', { name: DRYWALL_CALCULATOR_COPY.clear }));
    expect(widthInput).toHaveValue(null);
    expect(heightInput).toHaveValue(null);
    expect(screen.getByTestId('drywall-calculator-estimate')).toHaveTextContent(
      `$${DRYWALL_CALCULATOR_DEFAULT_ESTIMATE}`,
    );
  });

  it('shows inline errors when calculating with empty dimensions', async () => {
    const user = userEvent.setup();
    render(<DrywallCalculator />);

    await user.clear(screen.getByLabelText(DRYWALL_CALCULATOR_COPY.widthLabel));
    await user.clear(screen.getByLabelText(DRYWALL_CALCULATOR_COPY.heightLabel));
    await user.click(screen.getByRole('button', { name: DRYWALL_CALCULATOR_COPY.calculate }));

    expect(screen.getByText(DRYWALL_CALCULATOR_COPY.errors.widthRequired)).toBeInTheDocument();
    expect(screen.getByText(DRYWALL_CALCULATOR_COPY.errors.heightRequired)).toBeInTheDocument();
  });
});
