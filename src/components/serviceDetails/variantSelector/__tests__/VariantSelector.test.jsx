import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VARIANT_SELECTOR_KIND } from '../variantSelectorData';
import VariantSelector from '../VariantSelector';

describe('VariantSelector', () => {
  const sizes = [
    { id: 'size-24', size: '24 Inch', standardPrice: '$180.00', premiumPrice: '$220.00' },
    { id: 'size-36', size: '36 Inch', standardPrice: '$200.00', premiumPrice: '$250.00' },
  ];

  it('renders size pills and selects a size', async () => {
    const user = userEvent.setup();
    const onSelectVariant = jest.fn();

    render(
      <VariantSelector
        kind={VARIANT_SELECTOR_KIND.SIZES}
        items={sizes}
        selectedId="size-24"
        onSelectVariant={onSelectVariant}
      />,
    );

    expect(screen.getByTestId('service-variant-selector')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: '24 Inch' })).toHaveAttribute('aria-checked', 'true');

    await user.click(screen.getByRole('radio', { name: '36 Inch' }));
    expect(onSelectVariant).toHaveBeenCalledWith('size-36');
  });

  it('renders option pills', () => {
    render(
      <VariantSelector
        kind={VARIANT_SELECTOR_KIND.OPTIONS}
        items={[
          { id: 'opt-a', name: 'Option A', standardPrice: '$150.00', premiumPrice: '$190.00' },
        ]}
        selectedId="opt-a"
        onSelectVariant={jest.fn()}
      />,
    );

    expect(screen.getByRole('radio', { name: 'Option A' })).toBeInTheDocument();
  });
});
