import { MemoryRouter } from 'react-router-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ADMIN_SERVICE_FORM_COPY } from '../adminServiceFormCopy';
import {
  ADMIN_SERVICE_FORM_ADD_ROW_BUTTON_CLASS,
  ADMIN_SERVICE_FORM_BANNER_PREVIEW_CLASS,
  ADMIN_SERVICE_FORM_BANNER_PREVIEW_HEIGHT_PX,
  ADMIN_SERVICE_FORM_BANNER_PREVIEW_WIDTH_PX,
  ADMIN_SERVICE_FORM_CONTROL_CLASS,
  ADMIN_SERVICE_FORM_DYNAMIC_SECTION_CLASS,
  ADMIN_SERVICE_FORM_DYNAMIC_SECTION_TITLE_CLASS,
  ADMIN_SERVICE_FORM_EMPTY_VALUES,
  ADMIN_SERVICE_FORM_FEATURE_ROW_CLASS,
  ADMIN_SERVICE_FORM_FIELDS,
  ADMIN_SERVICE_FORM_OTHER_PREVIEW_COLUMNS,
  ADMIN_SERVICE_FORM_OTHER_PREVIEW_GRID_CLASS,
  ADMIN_SERVICE_FORM_PAIR_CLASS,
  ADMIN_SERVICE_FORM_ROW_CLASS,
  ADMIN_SERVICE_FORM_SELECT_MENU_CLASS,
  ADMIN_SERVICE_FORM_SIZE_OPTION_ROW_CLASS,
  ADMIN_SERVICE_FORM_VIEWPORT,
  createEmptyAdminServiceFormValues,
} from '../adminServiceFormData';
import AdminServiceFormView from '../AdminServiceFormView';

const createFormValues = () => createEmptyAdminServiceFormValues();

const renderForm = (props = {}) => {
  const onSubmit = jest.fn((event) => event.preventDefault());
  const onAddAdditionalFeature = jest.fn();
  const onAddSize = jest.fn();
  const onAddOption = jest.fn();
  const onAdditionalFeatureChange = jest.fn(() => () => {});
  const onSizeChange = jest.fn(() => () => {});
  const onOptionChange = jest.fn(() => () => {});

  render(
    <MemoryRouter>
      <AdminServiceFormView
        copy={ADMIN_SERVICE_FORM_COPY}
        pageTitle={ADMIN_SERVICE_FORM_COPY.titles.create}
        values={createFormValues()}
        errors={{}}
        categoryOptions={[{ id: 'Lighting', label: 'Lighting' }]}
        isNotFound={false}
        onFieldChange={() => () => {}}
        onAdditionalFeatureChange={onAdditionalFeatureChange}
        onSizeChange={onSizeChange}
        onOptionChange={onOptionChange}
        onAddAdditionalFeature={onAddAdditionalFeature}
        onAddSize={onAddSize}
        onAddOption={onAddOption}
        onBannerFilesSelected={jest.fn()}
        onOtherFilesSelected={jest.fn()}
        onSubmit={onSubmit}
        {...props}
      />
    </MemoryRouter>,
  );

  return {
    onSubmit,
    onAddAdditionalFeature,
    onAddSize,
    onAddOption,
  };
};

describe('AdminServiceFormView', () => {
  it('renders the Figma add-service form sections including dynamic catalog fields', () => {
    renderForm();

    expect(
      screen.getByRole('heading', { name: ADMIN_SERVICE_FORM_COPY.titles.create }),
    ).toBeInTheDocument();
    expect(screen.getByText(ADMIN_SERVICE_FORM_COPY.subtitle)).toBeInTheDocument();
    expect(ADMIN_SERVICE_FORM_COPY.subtitle).toContain('—');
    expect(screen.getByLabelText(ADMIN_SERVICE_FORM_COPY.fields.category)).toBeInTheDocument();
    expect(screen.getByLabelText(ADMIN_SERVICE_FORM_COPY.fields.duration)).toBeInTheDocument();
    expect(ADMIN_SERVICE_FORM_SELECT_MENU_CLASS).toContain('scrollbar-services-ash');
    expect(
      screen.getAllByLabelText(ADMIN_SERVICE_FORM_COPY.fields.standardPrice).length,
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getByLabelText(ADMIN_SERVICE_FORM_COPY.fields.title)).toBeInTheDocument();
    expect(
      screen.queryByLabelText(ADMIN_SERVICE_FORM_COPY.fields.longDescription),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(ADMIN_SERVICE_FORM_COPY.sections.additionalFeature),
    ).toBeInTheDocument();
    expect(screen.getByText(ADMIN_SERVICE_FORM_COPY.sections.sizes)).toBeInTheDocument();
    expect(screen.getByText(ADMIN_SERVICE_FORM_COPY.sections.options)).toBeInTheDocument();
    const additionalFeatureSection = screen
      .getByText(ADMIN_SERVICE_FORM_COPY.sections.additionalFeature)
      .closest('section');
    const sizesSection = screen.getByText(ADMIN_SERVICE_FORM_COPY.sections.sizes).closest('section');

    expect(
      within(additionalFeatureSection).getByLabelText(ADMIN_SERVICE_FORM_COPY.fields.featureName),
    ).toBeInTheDocument();
    expect(
      within(additionalFeatureSection).getByLabelText(
        ADMIN_SERVICE_FORM_COPY.fields.featureMeasurementUnit,
      ),
    ).toBeInTheDocument();
    expect(
      within(additionalFeatureSection).getByLabelText(
        ADMIN_SERVICE_FORM_COPY.fields.featureQuantity,
      ),
    ).toBeInTheDocument();
    expect(
      within(additionalFeatureSection).getByLabelText(ADMIN_SERVICE_FORM_COPY.fields.featureNote1),
    ).toBeInTheDocument();
    expect(
      within(additionalFeatureSection).getByLabelText(ADMIN_SERVICE_FORM_COPY.fields.featureNote2),
    ).toBeInTheDocument();
    expect(
      within(sizesSection).getByLabelText(ADMIN_SERVICE_FORM_COPY.fields.size),
    ).toBeInTheDocument();
    expect(
      within(sizesSection).getByLabelText(ADMIN_SERVICE_FORM_COPY.fields.sizeMeasurementUnit),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(ADMIN_SERVICE_FORM_COPY.fields.optionName)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: ADMIN_SERVICE_FORM_COPY.actions.addAdditionalFeature }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: ADMIN_SERVICE_FORM_COPY.actions.addAnotherSize }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: ADMIN_SERVICE_FORM_COPY.actions.addAnotherOption }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(ADMIN_SERVICE_FORM_COPY.fields.notIncluded),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(ADMIN_SERVICE_FORM_COPY.upload.bannerInputLabel),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: ADMIN_SERVICE_FORM_COPY.actions.upload }),
    ).toBeInTheDocument();
    expect(ADMIN_SERVICE_FORM_ROW_CLASS).toContain('min-[1440px]:grid-cols-3');
    expect(ADMIN_SERVICE_FORM_PAIR_CLASS).toContain('min-[768px]:grid-cols-2');
    expect(ADMIN_SERVICE_FORM_FEATURE_ROW_CLASS).toContain('min-[1440px]:grid-cols-');
    expect(ADMIN_SERVICE_FORM_SIZE_OPTION_ROW_CLASS).toContain('min-[1020px]:grid-cols-4');
    expect(ADMIN_SERVICE_FORM_DYNAMIC_SECTION_CLASS).toContain('gap-[18px]');
    expect(ADMIN_SERVICE_FORM_DYNAMIC_SECTION_TITLE_CLASS).toContain('font-medium');
    expect(ADMIN_SERVICE_FORM_ADD_ROW_BUTTON_CLASS).toContain('text-[#fc6f32]');
    expect(ADMIN_SERVICE_FORM_VIEWPORT.LAPTOP).toBe(1020);
    expect(ADMIN_SERVICE_FORM_VIEWPORT.MOBILE_S).toBe(320);
    expect(ADMIN_SERVICE_FORM_VIEWPORT.MOBILE_M).toBe(375);
    expect(ADMIN_SERVICE_FORM_VIEWPORT.MOBILE_L).toBe(425);
    expect(ADMIN_SERVICE_FORM_VIEWPORT.TABLET).toBe(768);
    expect(ADMIN_SERVICE_FORM_COPY.placeholders.title).toBe('Portland Cement Quick Set');
    expect(ADMIN_SERVICE_FORM_COPY.placeholders.duration).toBe('1-2 hours');
    expect(ADMIN_SERVICE_FORM_COPY.placeholders.featured).toBe('Write feature');
    expect(ADMIN_SERVICE_FORM_COPY.placeholders.price).toBe('$200.00');
    expect(ADMIN_SERVICE_FORM_OTHER_PREVIEW_COLUMNS).toBe(5);
    expect(ADMIN_SERVICE_FORM_OTHER_PREVIEW_GRID_CLASS).toContain('grid-cols-5');
    expect(ADMIN_SERVICE_FORM_CONTROL_CLASS).toContain('placeholder:text-[#b8bec6]');
  });

  it('invokes add-row handlers for Additional Feature, Sizes, and Options', async () => {
    const user = userEvent.setup();
    const { onAddAdditionalFeature, onAddSize, onAddOption } = renderForm();

    await user.click(
      screen.getByRole('button', { name: ADMIN_SERVICE_FORM_COPY.actions.addAdditionalFeature }),
    );
    await user.click(
      screen.getByRole('button', { name: ADMIN_SERVICE_FORM_COPY.actions.addAnotherSize }),
    );
    await user.click(
      screen.getByRole('button', { name: ADMIN_SERVICE_FORM_COPY.actions.addAnotherOption }),
    );

    expect(onAddAdditionalFeature).toHaveBeenCalledTimes(1);
    expect(onAddSize).toHaveBeenCalledTimes(1);
    expect(onAddOption).toHaveBeenCalledTimes(1);
  });

  it('shows edit title and submits the form', async () => {
    const user = userEvent.setup();
    const { onSubmit } = renderForm({
      pageTitle: ADMIN_SERVICE_FORM_COPY.titles.edit,
    });

    expect(
      screen.getByRole('heading', { name: ADMIN_SERVICE_FORM_COPY.titles.edit }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: ADMIN_SERVICE_FORM_COPY.actions.upload }),
    );

    expect(onSubmit).toHaveBeenCalled();
  });

  it('renders not-found state for missing edit targets', () => {
    renderForm({ isNotFound: true });

    expect(
      screen.getByRole('heading', { name: ADMIN_SERVICE_FORM_COPY.notFound.title }),
    ).toBeInTheDocument();
  });

  it('shows field errors when provided', () => {
    renderForm({
      errors: {
        [ADMIN_SERVICE_FORM_FIELDS.TITLE]: ADMIN_SERVICE_FORM_COPY.errors.titleRequired,
      },
    });

    expect(screen.getByText(ADMIN_SERVICE_FORM_COPY.errors.titleRequired)).toBeInTheDocument();
  });

  it('renders Product Banner Image preview at Service Card media size', () => {
    renderForm({
      values: {
        ...ADMIN_SERVICE_FORM_EMPTY_VALUES,
        [ADMIN_SERVICE_FORM_FIELDS.BANNER_IMAGE]: {
          id: 'existing-banner',
          previewUrl: '/assets/landing/service-plumbing.png',
          isExisting: true,
        },
      },
    });

    const previewImage = screen.getByRole('presentation');
    expect(previewImage).toHaveAttribute('src', '/assets/landing/service-plumbing.png');
    expect(previewImage).toHaveClass('mx-auto', 'h-52', 'max-w-[367px]', 'rounded-2xl');
    expect(previewImage).not.toHaveClass('h-40');
    expect(ADMIN_SERVICE_FORM_BANNER_PREVIEW_WIDTH_PX).toBe(367);
    expect(ADMIN_SERVICE_FORM_BANNER_PREVIEW_HEIGHT_PX).toBe(208);
    expect(ADMIN_SERVICE_FORM_BANNER_PREVIEW_CLASS).toContain('h-52');
    expect(ADMIN_SERVICE_FORM_BANNER_PREVIEW_CLASS).toContain('max-w-[367px]');
  });

  it('does not render catalog dynamic sections when copy.sections is absent', () => {
    const adsLikeCopy = {
      ...ADMIN_SERVICE_FORM_COPY,
      sections: undefined,
    };

    renderForm({ copy: adsLikeCopy });

    expect(
      screen.queryByText(ADMIN_SERVICE_FORM_COPY.sections.additionalFeature),
    ).not.toBeInTheDocument();
    expect(screen.getByLabelText(ADMIN_SERVICE_FORM_COPY.fields.longDescription)).toBeInTheDocument();
  });

  it('keeps dynamic section labels accessible within their sections', () => {
    renderForm();

    const additionalFeatureHeading = screen.getByText(
      ADMIN_SERVICE_FORM_COPY.sections.additionalFeature,
    );
    const section = additionalFeatureHeading.closest('section');

    expect(section).not.toBeNull();
    expect(within(section).getByLabelText(ADMIN_SERVICE_FORM_COPY.fields.featureName)).toBeInTheDocument();
  });

  it('removes banner and other image previews from the close buttons', async () => {
    const user = userEvent.setup();
    const onRemoveBannerImage = jest.fn();
    const onRemoveOtherImage = jest.fn();

    renderForm({
      values: {
        ...ADMIN_SERVICE_FORM_EMPTY_VALUES,
        [ADMIN_SERVICE_FORM_FIELDS.BANNER_IMAGE]: {
          id: 'existing-banner',
          previewUrl: '/assets/landing/service-plumbing.png',
          isExisting: true,
        },
        [ADMIN_SERVICE_FORM_FIELDS.OTHER_IMAGES]: [
          {
            id: 'other-1',
            previewUrl: '/assets/landing/service-faucet.png',
            isExisting: false,
          },
        ],
      },
      onRemoveBannerImage,
      onRemoveOtherImage,
    });

    const removeButtons = screen.getAllByRole('button', {
      name: ADMIN_SERVICE_FORM_COPY.upload.removeImage,
    });
    expect(removeButtons).toHaveLength(2);

    await user.click(removeButtons[0]);
    await user.click(removeButtons[1]);

    expect(onRemoveBannerImage).toHaveBeenCalledTimes(1);
    expect(onRemoveOtherImage).toHaveBeenCalledWith('other-1');
  });
});
