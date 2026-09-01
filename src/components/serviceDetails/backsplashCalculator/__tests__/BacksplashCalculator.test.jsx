import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BacksplashCalculator from '../BacksplashCalculator';
import { BACKSPLASH_CALCULATOR_COPY } from '../backsplashCalculatorCopy';
import { BACKSPLASH_CALCULATOR_DEFAULT_ESTIMATE } from '../backsplashCalculatorData';

describe('BacksplashCalculator', () => {
  it('renders the Figma Backsplash & Tile Calculator UI', () => {
    render(<BacksplashCalculator />);

    expect(
      screen.getByRole('region', { name: BACKSPLASH_CALCULATOR_COPY.regionLabel }),
    ).toBeInTheDocument();
    expect(screen.getByText(BACKSPLASH_CALCULATOR_COPY.title)).toBeInTheDocument();
    expect(screen.getByText(BACKSPLASH_CALCULATOR_COPY.subtitle)).toBeInTheDocument();
    expect(screen.getByText(BACKSPLASH_CALCULATOR_COPY.startingEstLabel)).toBeInTheDocument();
    expect(screen.getByTestId('backsplash-calculator-estimate')).toHaveTextContent(
      `$${BACKSPLASH_CALCULATOR_DEFAULT_ESTIMATE}`,
    );
    expect(screen.getByLabelText(BACKSPLASH_CALCULATOR_COPY.widthLabel)).toBeInTheDocument();
    expect(screen.getByLabelText(BACKSPLASH_CALCULATOR_COPY.heightLabel)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: BACKSPLASH_CALCULATOR_COPY.calculate }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: BACKSPLASH_CALCULATOR_COPY.clear }),
    ).toBeInTheDocument();
  });

  it('calculates and clears the estimate from wall width and height inputs', async () => {
    const user = userEvent.setup();
    render(<BacksplashCalculator />);

    const widthInput = screen.getByLabelText(BACKSPLASH_CALCULATOR_COPY.widthLabel);
    const heightInput = screen.getByLabelText(BACKSPLASH_CALCULATOR_COPY.heightLabel);
    await user.clear(widthInput);
    await user.type(widthInput, '20');
    await user.clear(heightInput);
    await user.type(heightInput, '10');
    await user.click(screen.getByRole('button', { name: BACKSPLASH_CALCULATOR_COPY.calculate }));

    expect(screen.getByTestId('backsplash-calculator-estimate')).toHaveTextContent('$155');

    await user.click(screen.getByRole('button', { name: BACKSPLASH_CALCULATOR_COPY.clear }));
    expect(widthInput).toHaveValue(null);
    expect(heightInput).toHaveValue(null);
    expect(screen.getByTestId('backsplash-calculator-estimate')).toHaveTextContent(
      `$${BACKSPLASH_CALCULATOR_DEFAULT_ESTIMATE}`,
    );
  });

  it('shows inline errors when calculating with empty dimensions', async () => {
    const user = userEvent.setup();
    render(<BacksplashCalculator />);

    await user.clear(screen.getByLabelText(BACKSPLASH_CALCULATOR_COPY.widthLabel));
    await user.clear(screen.getByLabelText(BACKSPLASH_CALCULATOR_COPY.heightLabel));
    await user.click(screen.getByRole('button', { name: BACKSPLASH_CALCULATOR_COPY.calculate }));

    expect(screen.getByText(BACKSPLASH_CALCULATOR_COPY.errors.widthRequired)).toBeInTheDocument();
    expect(screen.getByText(BACKSPLASH_CALCULATOR_COPY.errors.heightRequired)).toBeInTheDocument();
  });
});
