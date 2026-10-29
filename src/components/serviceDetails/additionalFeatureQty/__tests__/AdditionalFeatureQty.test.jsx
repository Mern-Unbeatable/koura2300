import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SERVICE_PACKAGES } from '../../serviceDetailsData';
import { ADDITIONAL_FEATURE_QTY_COPY } from '../additionalFeatureQtyCopy';
import {
  ADDITIONAL_FEATURE_QTY_ASSETS,
  ADDITIONAL_FEATURE_QTY_CONTROL_CLASS,
  ADDITIONAL_FEATURE_QTY_SECTION_CLASS,
} from '../additionalFeatureQtyData';
import AdditionalFeatureQty from '../AdditionalFeatureQty';

describe('AdditionalFeatureQty', () => {
  const feature = {
    id: 'feature-1',
    name: 'Handles',
    measurementUnit: 'ft',
    quantity: '3',
    standardPrice: '25%',
    premiumPrice: '25%',
    note1: 'First 3 handles: included in base labor price.',
    note2: 'Each additional: +25% of selected labor price.',
  };

  it('renders Number of unit label with Figma stepper and notes', async () => {
    const user = userEvent.setup();

    const { container } = render(
      <AdditionalFeatureQty
        additionalFeatures={[feature]}
        selectedPackageId={SERVICE_PACKAGES.STANDARD}
        selectedPackagePrice={200}
      />,
    );

    expect(screen.getByTestId('service-additional-feature-qty')).toBeInTheDocument();
    expect(ADDITIONAL_FEATURE_QTY_CONTROL_CLASS).toContain('flex-col');
    expect(ADDITIONAL_FEATURE_QTY_SECTION_CLASS).toContain('min-[768px]:flex-row');
    expect(ADDITIONAL_FEATURE_QTY_SECTION_CLASS).toContain('min-[768px]:items-stretch');
    expect(ADDITIONAL_FEATURE_QTY_SECTION_CLASS).toContain('min-[768px]:h-[86px]');
    expect(ADDITIONAL_FEATURE_QTY_SECTION_CLASS).toContain('min-[768px]:justify-between');
    expect(screen.getByText('Number of ft')).toBeInTheDocument();
    expect(screen.getByText('00')).toBeInTheDocument();
    expect(
      screen.getByText('First 3 handles: included in base labor price.'),
    ).toBeInTheDocument();
    expect(
      container.querySelectorAll(`[src="${ADDITIONAL_FEATURE_QTY_ASSETS.noteCheck}"]`),
    ).toHaveLength(2);

    await user.click(
      screen.getByRole('button', { name: ADDITIONAL_FEATURE_QTY_COPY.increaseLabel }),
    );
    expect(screen.getByText('01')).toBeInTheDocument();
  });

  it('renders nothing when measurement unit is not selected', () => {
    const { container } = render(
      <AdditionalFeatureQty
        additionalFeatures={[{ ...feature, measurementUnit: '' }]}
        selectedPackageId={SERVICE_PACKAGES.STANDARD}
        selectedPackagePrice={200}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when features are empty', () => {
    const { container } = render(
      <AdditionalFeatureQty
        additionalFeatures={[]}
        selectedPackageId={SERVICE_PACKAGES.STANDARD}
        selectedPackagePrice={200}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
