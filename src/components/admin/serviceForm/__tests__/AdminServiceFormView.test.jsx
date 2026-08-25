import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ADMIN_SERVICE_FORM_COPY } from '../adminServiceFormCopy';
import {
  ADMIN_SERVICE_FORM_CONTROL_CLASS,
  ADMIN_SERVICE_FORM_EMPTY_VALUES,
  ADMIN_SERVICE_FORM_FIELDS,
  ADMIN_SERVICE_FORM_OTHER_PREVIEW_COLUMNS,
  ADMIN_SERVICE_FORM_OTHER_PREVIEW_GRID_CLASS,
  ADMIN_SERVICE_FORM_PAIR_CLASS,
  ADMIN_SERVICE_FORM_ROW_CLASS,
  ADMIN_SERVICE_FORM_SELECT_MENU_CLASS,
  ADMIN_SERVICE_FORM_VIEWPORT,
} from '../adminServiceFormData';
import AdminServiceFormView from '../AdminServiceFormView';

const renderForm = (props = {}) => {
  const onSubmit = jest.fn((event) => event.preventDefault());

  render(
    <MemoryRouter>
      <AdminServiceFormView
        copy={ADMIN_SERVICE_FORM_COPY}
        pageTitle={ADMIN_SERVICE_FORM_COPY.titles.create}
        values={ADMIN_SERVICE_FORM_EMPTY_VALUES}
        errors={{}}
        categoryOptions={[{ id: 'Lighting', label: 'Lighting' }]}
        isNotFound={false}
        onFieldChange={() => () => {}}
        onBannerFilesSelected={jest.fn()}
        onOtherFilesSelected={jest.fn()}
        onSubmit={onSubmit}
        {...props}
      />
    </MemoryRouter>,
  );

  return { onSubmit };
};

describe('AdminServiceFormView', () => {
  it('renders the Figma add-service form sections', () => {
    renderForm();

    expect(
      screen.getByRole('heading', { name: ADMIN_SERVICE_FORM_COPY.titles.create }),
    ).toBeInTheDocument();
    expect(screen.getByText(ADMIN_SERVICE_FORM_COPY.subtitle)).toBeInTheDocument();
    expect(screen.getByLabelText(ADMIN_SERVICE_FORM_COPY.fields.category)).toBeInTheDocument();
    expect(screen.getByLabelText(ADMIN_SERVICE_FORM_COPY.fields.duration)).toBeInTheDocument();
    expect(ADMIN_SERVICE_FORM_SELECT_MENU_CLASS).toContain('scrollbar-services-ash');
    expect(
      screen.getByLabelText(ADMIN_SERVICE_FORM_COPY.fields.standardPrice),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(ADMIN_SERVICE_FORM_COPY.fields.title)).toBeInTheDocument();
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
    expect(ADMIN_SERVICE_FORM_VIEWPORT.LAPTOP).toBe(1020);
    expect(ADMIN_SERVICE_FORM_COPY.placeholders.title).toBe('Enter service title');
    expect(ADMIN_SERVICE_FORM_OTHER_PREVIEW_COLUMNS).toBe(5);
    expect(ADMIN_SERVICE_FORM_OTHER_PREVIEW_GRID_CLASS).toContain('grid-cols-5');
    expect(ADMIN_SERVICE_FORM_CONTROL_CLASS).toContain('placeholder:text-[#b8bec6]');
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
});
