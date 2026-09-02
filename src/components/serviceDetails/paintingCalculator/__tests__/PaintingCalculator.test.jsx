import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PaintingCalculator from '../PaintingCalculator';
import { PAINTING_CALCULATOR_COPY } from '../paintingCalculatorCopy';
import { PAINTING_CALCULATOR_DEFAULT_ESTIMATE } from '../paintingCalculatorData';

describe('PaintingCalculator', () => {
  it('renders the Figma Painting calculator UI', () => {
    render(<PaintingCalculator />);

    expect(
      screen.getByRole('region', { name: PAINTING_CALCULATOR_COPY.regionLabel }),
    ).toBeInTheDocument();
    expect(screen.getByText(PAINTING_CALCULATOR_COPY.title)).toBeInTheDocument();
    expect(screen.getByText(PAINTING_CALCULATOR_COPY.subtitle)).toBeInTheDocument();
    expect(screen.getByText(PAINTING_CALCULATOR_COPY.startingEstLabel)).toBeInTheDocument();
    expect(screen.getByTestId('painting-calculator-estimate')).toHaveTextContent(
      `$${PAINTING_CALCULATOR_DEFAULT_ESTIMATE}`,
    );
    expect(screen.getByLabelText(PAINTING_CALCULATOR_COPY.lengthLabel)).toBeInTheDocument();
    expect(screen.getByLabelText(PAINTING_CALCULATOR_COPY.widthLabel)).toBeInTheDocument();
    expect(screen.getByLabelText(PAINTING_CALCULATOR_COPY.heightLabel)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: PAINTING_CALCULATOR_COPY.calculate }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: PAINTING_CALCULATOR_COPY.clear })).toBeInTheDocument();
  });

  it('calculates and clears the estimate from room dimension inputs', async () => {
    const user = userEvent.setup();
    render(<PaintingCalculator />);

    const lengthInput = screen.getByLabelText(PAINTING_CALCULATOR_COPY.lengthLabel);
    const widthInput = screen.getByLabelText(PAINTING_CALCULATOR_COPY.widthLabel);
    const heightInput = screen.getByLabelText(PAINTING_CALCULATOR_COPY.heightLabel);
    await user.clear(lengthInput);
    await user.type(lengthInput, '10');
    await user.clear(widthInput);
    await user.type(widthInput, '10');
    await user.clear(heightInput);
    await user.type(heightInput, '8');
    await user.click(screen.getByRole('button', { name: PAINTING_CALCULATOR_COPY.calculate }));

    expect(screen.getByTestId('painting-calculator-estimate')).toHaveTextContent('$121');

    await user.click(screen.getByRole('button', { name: PAINTING_CALCULATOR_COPY.clear }));
    expect(lengthInput).toHaveValue(null);
    expect(widthInput).toHaveValue(null);
    expect(heightInput).toHaveValue(null);
    expect(screen.getByTestId('painting-calculator-estimate')).toHaveTextContent(
      `$${PAINTING_CALCULATOR_DEFAULT_ESTIMATE}`,
    );
  });

  it('shows inline errors when calculating with empty dimensions', async () => {
    const user = userEvent.setup();
    render(<PaintingCalculator />);

    await user.clear(screen.getByLabelText(PAINTING_CALCULATOR_COPY.lengthLabel));
    await user.clear(screen.getByLabelText(PAINTING_CALCULATOR_COPY.widthLabel));
    await user.clear(screen.getByLabelText(PAINTING_CALCULATOR_COPY.heightLabel));
    await user.click(screen.getByRole('button', { name: PAINTING_CALCULATOR_COPY.calculate }));

    expect(screen.getByText(PAINTING_CALCULATOR_COPY.errors.lengthRequired)).toBeInTheDocument();
    expect(screen.getByText(PAINTING_CALCULATOR_COPY.errors.widthRequired)).toBeInTheDocument();
    expect(screen.getByText(PAINTING_CALCULATOR_COPY.errors.heightRequired)).toBeInTheDocument();
  });
});
