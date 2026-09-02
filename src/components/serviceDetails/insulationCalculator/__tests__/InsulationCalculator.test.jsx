import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InsulationCalculator from '../InsulationCalculator';
import { INSULATION_CALCULATOR_COPY } from '../insulationCalculatorCopy';
import { INSULATION_CALCULATOR_DEFAULT_ESTIMATE } from '../insulationCalculatorData';

describe('InsulationCalculator', () => {
  it('renders the Figma Insulation Calculator UI', () => {
    render(<InsulationCalculator />);

    expect(
      screen.getByRole('region', { name: INSULATION_CALCULATOR_COPY.regionLabel }),
    ).toBeInTheDocument();
    expect(screen.getByText(INSULATION_CALCULATOR_COPY.title)).toBeInTheDocument();
    expect(screen.getByText(INSULATION_CALCULATOR_COPY.subtitle)).toBeInTheDocument();
    expect(screen.getByText(INSULATION_CALCULATOR_COPY.startingEstLabel)).toBeInTheDocument();
    expect(screen.getByTestId('insulation-calculator-estimate')).toHaveTextContent(
      `$${INSULATION_CALCULATOR_DEFAULT_ESTIMATE}`,
    );
    expect(screen.getByLabelText(INSULATION_CALCULATOR_COPY.areaLabel)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: INSULATION_CALCULATOR_COPY.calculate }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: INSULATION_CALCULATOR_COPY.clear }),
    ).toBeInTheDocument();
  });

  it('calculates and clears the estimate from the area input', async () => {
    const user = userEvent.setup();
    render(<InsulationCalculator />);

    const areaInput = screen.getByLabelText(INSULATION_CALCULATOR_COPY.areaLabel);
    await user.clear(areaInput);
    await user.type(areaInput, '20');
    await user.click(screen.getByRole('button', { name: INSULATION_CALCULATOR_COPY.calculate }));

    expect(screen.getByTestId('insulation-calculator-estimate')).toHaveTextContent('$170');

    await user.click(screen.getByRole('button', { name: INSULATION_CALCULATOR_COPY.clear }));
    expect(areaInput).toHaveValue(null);
    expect(screen.getByTestId('insulation-calculator-estimate')).toHaveTextContent(
      `$${INSULATION_CALCULATOR_DEFAULT_ESTIMATE}`,
    );
  });

  it('shows an inline error when calculating with an empty area', async () => {
    const user = userEvent.setup();
    render(<InsulationCalculator />);

    await user.clear(screen.getByLabelText(INSULATION_CALCULATOR_COPY.areaLabel));
    await user.click(screen.getByRole('button', { name: INSULATION_CALCULATOR_COPY.calculate }));

    expect(screen.getByText(INSULATION_CALCULATOR_COPY.errors.areaRequired)).toBeInTheDocument();
  });
});
