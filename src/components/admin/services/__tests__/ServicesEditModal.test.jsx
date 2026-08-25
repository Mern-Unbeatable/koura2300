import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ServicesEditModal from '../ServicesEditModal';
import { SERVICES_EDIT_BODY_CLASS } from '../servicesEditData';
import { SERVICES_EDIT_COPY } from '../servicesEditCopy';
import { SERVICES_SEED } from '../servicesData';

describe('ServicesEditModal', () => {
  const service = SERVICES_SEED[0];

  it('opens with existing card fields prefilled', () => {
    render(
      <ServicesEditModal service={service} onClose={jest.fn()} onSave={jest.fn()} />,
    );

    expect(
      screen.getByRole('dialog', { name: SERVICES_EDIT_COPY.regionLabel }),
    ).toBeInTheDocument();
    expect(SERVICES_EDIT_BODY_CLASS).toContain('scrollbar-services-ash');
    expect(screen.getByLabelText(SERVICES_EDIT_COPY.categoryLabel)).toHaveValue(
      service.catalogTitle,
    );
    expect(screen.getByLabelText(SERVICES_EDIT_COPY.subcategoryLabel)).toHaveValue(
      service.category,
    );
    expect(screen.getByLabelText(SERVICES_EDIT_COPY.titleLabel)).toHaveValue(service.title);
    expect(screen.getByLabelText(SERVICES_EDIT_COPY.descriptionLabel)).toHaveValue(
      service.description,
    );
    expect(screen.getByLabelText(SERVICES_EDIT_COPY.durationLabel)).toHaveValue(
      service.duration,
    );
    expect(screen.getByLabelText(SERVICES_EDIT_COPY.priceLabel)).toHaveValue(
      String(service.price),
    );
    expect(screen.getByLabelText(SERVICES_EDIT_COPY.ratingLabel)).toHaveValue(service.rating);
    expect(screen.getByAltText(service.imageAlt)).toHaveAttribute('src', service.image);
  });

  it('saves edited card fields and closes via cancel', async () => {
    const user = userEvent.setup();
    const onSave = jest.fn();
    const onClose = jest.fn();

    render(<ServicesEditModal service={service} onClose={onClose} onSave={onSave} />);

    await user.clear(screen.getByLabelText(SERVICES_EDIT_COPY.titleLabel));
    await user.type(screen.getByLabelText(SERVICES_EDIT_COPY.titleLabel), 'Edited Service');
    await user.clear(screen.getByLabelText(SERVICES_EDIT_COPY.priceLabel));
    await user.type(screen.getByLabelText(SERVICES_EDIT_COPY.priceLabel), '120');
    await user.click(screen.getByRole('button', { name: SERVICES_EDIT_COPY.submit }));

    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Edited Service',
        price: 120,
        catalogTitle: service.catalogTitle,
        category: service.category,
      }),
    );

    await user.click(screen.getByRole('button', { name: SERVICES_EDIT_COPY.cancel }));
    expect(onClose).toHaveBeenCalled();
  });

  it('shows validation errors when required fields are empty', async () => {
    const user = userEvent.setup();
    const onSave = jest.fn();

    render(<ServicesEditModal service={service} onClose={jest.fn()} onSave={onSave} />);

    await user.clear(screen.getByLabelText(SERVICES_EDIT_COPY.titleLabel));
    await user.click(screen.getByRole('button', { name: SERVICES_EDIT_COPY.submit }));

    expect(screen.getByRole('alert')).toHaveTextContent(
      SERVICES_EDIT_COPY.errors.titleRequired,
    );
    expect(onSave).not.toHaveBeenCalled();
  });
});
