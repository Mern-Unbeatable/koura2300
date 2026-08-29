import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import BlogFormView from '../BlogFormView';
import { ADMIN_BLOG_FORM_COPY } from '../blogFormCopy';
import {
  ADMIN_BLOG_FORM_EMPTY_VALUES,
  ADMIN_BLOG_FORM_FIELDS,
} from '../blogFormData';
import { ROUTES } from '../../../../config';

const createBlogFormViewProps = (overrides = {}) => ({
  copy: ADMIN_BLOG_FORM_COPY,
  values: { ...ADMIN_BLOG_FORM_EMPTY_VALUES },
  errors: {},
  isSubmitDisabled: true,
  onFieldChange: jest.fn(() => jest.fn()),
  onBannerFilesSelected: jest.fn(),
  onSubmit: jest.fn((event) => event.preventDefault()),
  ...overrides,
});

const renderBlogFormView = (overrides = {}) =>
  render(
    <MemoryRouter>
      <BlogFormView {...createBlogFormViewProps(overrides)} />
    </MemoryRouter>,
  );

describe('BlogFormView', () => {
  it('renders Add New Blog header, subtitle, and Back link from Figma', () => {
    renderBlogFormView();

    expect(
      screen.getByRole('heading', { level: 1, name: ADMIN_BLOG_FORM_COPY.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(ADMIN_BLOG_FORM_COPY.subtitle)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: ADMIN_BLOG_FORM_COPY.actions.back })).toHaveAttribute(
      'href',
      ROUTES.ADMIN_BLOG,
    );
  });

  it('renders title, short description, long description, and banner upload', () => {
    renderBlogFormView();

    expect(screen.getByLabelText(ADMIN_BLOG_FORM_COPY.fields.title)).toBeInTheDocument();
    expect(
      screen.getByLabelText(ADMIN_BLOG_FORM_COPY.fields.shortDescription),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(ADMIN_BLOG_FORM_COPY.fields.longDescription),
    ).toBeInTheDocument();
    expect(screen.getByText(ADMIN_BLOG_FORM_COPY.fields.bannerImage)).toBeInTheDocument();
    expect(screen.getByText(ADMIN_BLOG_FORM_COPY.upload.dropTitle)).toBeInTheDocument();
    expect(screen.getByText(ADMIN_BLOG_FORM_COPY.upload.maxBanner)).toBeInTheDocument();
  });

  it('shows professional blog placeholders for text fields', () => {
    renderBlogFormView();

    expect(
      screen.getByPlaceholderText(ADMIN_BLOG_FORM_COPY.placeholders.title),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(ADMIN_BLOG_FORM_COPY.placeholders.shortDescription),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(ADMIN_BLOG_FORM_COPY.placeholders.longDescription),
    ).toBeInTheDocument();
  });

  it('keeps the submit button disabled until the form is ready', () => {
    renderBlogFormView({ isSubmitDisabled: true });

    expect(
      screen.getByRole('button', { name: ADMIN_BLOG_FORM_COPY.actions.upload }),
    ).toBeDisabled();
  });

  it('enables submit and wires field change and submit handlers', async () => {
    const user = userEvent.setup();
    const onFieldChange = jest.fn(() => jest.fn());
    const onSubmit = jest.fn((event) => event.preventDefault());

    renderBlogFormView({
      isSubmitDisabled: false,
      onFieldChange,
      onSubmit,
      values: {
        ...ADMIN_BLOG_FORM_EMPTY_VALUES,
        [ADMIN_BLOG_FORM_FIELDS.TITLE]: '5 Signs Your Home Needs a Plumbing Repair',
      },
    });

    const titleInput = screen.getByLabelText(ADMIN_BLOG_FORM_COPY.fields.title);
    expect(titleInput).toHaveValue('5 Signs Your Home Needs a Plumbing Repair');

    await user.type(titleInput, '!');
    expect(onFieldChange).toHaveBeenCalledWith(ADMIN_BLOG_FORM_FIELDS.TITLE);

    await user.click(
      screen.getByRole('button', { name: ADMIN_BLOG_FORM_COPY.actions.upload }),
    );
    expect(onSubmit).toHaveBeenCalled();
  });

  it('renders inline field errors from validation', () => {
    renderBlogFormView({
      errors: {
        [ADMIN_BLOG_FORM_FIELDS.TITLE]: ADMIN_BLOG_FORM_COPY.errors.titleRequired,
      },
    });

    expect(screen.getByText(ADMIN_BLOG_FORM_COPY.errors.titleRequired)).toBeInTheDocument();
  });
});
