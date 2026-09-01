import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BathroomTileCalculator from '../BathroomTileCalculator';
import { BATHROOM_TILE_CALCULATOR_COPY } from '../bathroomTileCalculatorCopy';
import { BATHROOM_TILE_CALCULATOR_DEFAULT_ESTIMATE } from '../bathroomTileCalculatorData';

describe('BathroomTileCalculator', () => {
  it('renders the Figma Bathroom Tile & Grout Calculator UI', () => {
    render(<BathroomTileCalculator />);

    expect(
      screen.getByRole('region', { name: BATHROOM_TILE_CALCULATOR_COPY.regionLabel }),
    ).toBeInTheDocument();
    expect(screen.getByText(BATHROOM_TILE_CALCULATOR_COPY.title)).toBeInTheDocument();
    expect(screen.getByText(BATHROOM_TILE_CALCULATOR_COPY.subtitle)).toBeInTheDocument();
    expect(screen.getByText(BATHROOM_TILE_CALCULATOR_COPY.startingEstLabel)).toBeInTheDocument();
    expect(screen.getByTestId('bathroom-tile-calculator-estimate')).toHaveTextContent(
      `$${BATHROOM_TILE_CALCULATOR_DEFAULT_ESTIMATE}`,
    );
    expect(screen.getByLabelText(BATHROOM_TILE_CALCULATOR_COPY.floorLabel)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: BATHROOM_TILE_CALCULATOR_COPY.calculate }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: BATHROOM_TILE_CALCULATOR_COPY.clear }),
    ).toBeInTheDocument();
  });

  it('calculates and clears the estimate from the floor area input', async () => {
    const user = userEvent.setup();
    render(<BathroomTileCalculator />);

    const floorInput = screen.getByLabelText(BATHROOM_TILE_CALCULATOR_COPY.floorLabel);
    await user.clear(floorInput);
    await user.type(floorInput, '20');
    await user.click(screen.getByRole('button', { name: BATHROOM_TILE_CALCULATOR_COPY.calculate }));

    expect(screen.getByTestId('bathroom-tile-calculator-estimate')).toHaveTextContent('$195');

    await user.click(screen.getByRole('button', { name: BATHROOM_TILE_CALCULATOR_COPY.clear }));
    expect(floorInput).toHaveValue(null);
    expect(screen.getByTestId('bathroom-tile-calculator-estimate')).toHaveTextContent(
      `$${BATHROOM_TILE_CALCULATOR_DEFAULT_ESTIMATE}`,
    );
  });

  it('shows an inline error when calculating with an empty floor area', async () => {
    const user = userEvent.setup();
    render(<BathroomTileCalculator />);

    await user.clear(screen.getByLabelText(BATHROOM_TILE_CALCULATOR_COPY.floorLabel));
    await user.click(screen.getByRole('button', { name: BATHROOM_TILE_CALCULATOR_COPY.calculate }));

    expect(screen.getByText(BATHROOM_TILE_CALCULATOR_COPY.errors.floorRequired)).toBeInTheDocument();
  });
});
