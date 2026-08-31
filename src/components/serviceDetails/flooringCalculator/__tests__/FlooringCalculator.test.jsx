import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FlooringCalculator from '../FlooringCalculator';
import { FLOORING_CALCULATOR_COPY } from '../flooringCalculatorCopy';
import {
  FLOORING_CALCULATOR_CARD_CLASS,
  FLOORING_CALCULATOR_DEFAULT_ESTIMATE,
} from '../flooringCalculatorData';

describe('FlooringCalculator', () => {
  it('renders the Figma Flooring Calculator UI', () => {
    render(<FlooringCalculator />);

    expect(
      screen.getByRole('region', { name: FLOORING_CALCULATOR_COPY.regionLabel }),
    ).toBeInTheDocument();
    expect(screen.getByText(FLOORING_CALCULATOR_COPY.title)).toBeInTheDocument();
    expect(screen.getByText(FLOORING_CALCULATOR_COPY.subtitle)).toBeInTheDocument();
    expect(screen.getByText(FLOORING_CALCULATOR_COPY.startingEstLabel)).toBeInTheDocument();
    expect(screen.getByTestId('flooring-calculator-estimate')).toHaveTextContent(
      `$${FLOORING_CALCULATOR_DEFAULT_ESTIMATE}`,
    );
    expect(screen.getByLabelText(FLOORING_CALCULATOR_COPY.roomLabel)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: FLOORING_CALCULATOR_COPY.calculate }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: FLOORING_CALCULATOR_COPY.clear })).toBeInTheDocument();
    expect(screen.getByTestId('flooring-calculator').className).toContain(
      FLOORING_CALCULATOR_CARD_CLASS.split(' ')[0],
    );
  });

  it('calculates and clears the estimate from the room input', async () => {
    const user = userEvent.setup();
    render(<FlooringCalculator />);

    const roomInput = screen.getByLabelText(FLOORING_CALCULATOR_COPY.roomLabel);
    await user.clear(roomInput);
    await user.type(roomInput, '20');
    await user.click(screen.getByRole('button', { name: FLOORING_CALCULATOR_COPY.calculate }));

    expect(screen.getByTestId('flooring-calculator-estimate')).toHaveTextContent('$170');

    await user.click(screen.getByRole('button', { name: FLOORING_CALCULATOR_COPY.clear }));
    expect(roomInput).toHaveValue(null);
    expect(screen.getByTestId('flooring-calculator-estimate')).toHaveTextContent(
      `$${FLOORING_CALCULATOR_DEFAULT_ESTIMATE}`,
    );
  });

  it('shows an inline error when calculating with an empty room size', async () => {
    const user = userEvent.setup();
    render(<FlooringCalculator />);

    await user.clear(screen.getByLabelText(FLOORING_CALCULATOR_COPY.roomLabel));
    await user.click(screen.getByRole('button', { name: FLOORING_CALCULATOR_COPY.calculate }));

    expect(screen.getByText(FLOORING_CALCULATOR_COPY.errors.roomRequired)).toBeInTheDocument();
  });
});
