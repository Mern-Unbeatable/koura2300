import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ServiceCatalogSubcategoryGrid from '../ServiceCatalogSubcategoryGrid';
import { DEFAULT_SUBCATEGORY_COPY, SUBCATEGORY_GRID_CLASS } from '../subcategoryData';

const CARDS = [
  {
    id: 'Indoor Lighting',
    title: 'Indoor Lighting',
    image: '/assets/lighting/lighting-service.png',
    imageAlt: 'Indoor',
    startingPrice: 75,
    rating: '4.9 (312)',
  },
  {
    id: 'Outdoor Lighting',
    title: 'Outdoor Lighting',
    image: '/assets/lighting/lighting-service.png',
    imageAlt: 'Outdoor',
    startingPrice: 100,
    rating: '4.9 (312)',
  },
];

describe('ServiceCatalogSubcategoryGrid', () => {
  it('renders Figma-style subcategory cards with price and rating', () => {
    render(
      <ServiceCatalogSubcategoryGrid
        cards={CARDS}
        onSelect={jest.fn()}
      />,
    );

    expect(screen.getByRole('region', { name: DEFAULT_SUBCATEGORY_COPY.gridLabel })).toHaveClass(
      ...SUBCATEGORY_GRID_CLASS.split(' ').filter(Boolean).slice(0, 2),
    );
    expect(screen.getByRole('button', { name: 'Indoor Lighting' })).toBeInTheDocument();
    expect(screen.getByText('Starting at $75')).toBeInTheDocument();
    expect(screen.getAllByText('4.9 (312)').length).toBe(CARDS.length);
  });

  it('notifies when a subcategory card is selected', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();

    render(<ServiceCatalogSubcategoryGrid cards={CARDS} onSelect={onSelect} />);

    await user.click(screen.getByRole('button', { name: 'Outdoor Lighting' }));
    expect(onSelect).toHaveBeenCalledWith('Outdoor Lighting');
  });
});
