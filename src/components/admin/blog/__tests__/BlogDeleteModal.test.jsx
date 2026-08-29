import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogDeleteModal from '../BlogDeleteModal';
import { ADMIN_BLOG_COPY } from '../blogCopy';

describe('BlogDeleteModal', () => {
  it('renders the animated delete confirmation dialog', () => {
    render(
      <BlogDeleteModal
        postTitle="5 Signs Your Home Needs a Plumbing Repair"
        onClose={jest.fn()}
        onConfirm={jest.fn()}
      />,
    );

    const dialog = screen.getByRole('dialog', {
      name: ADMIN_BLOG_COPY.deleteModal.regionLabel,
    });

    expect(dialog).toBeInTheDocument();
    expect(dialog.className).toContain('animate-page-enter');
    expect(screen.getByTestId('blog-delete-overlay').className).toContain('animate-fade-in');
    expect(screen.getByText(ADMIN_BLOG_COPY.deleteModal.title)).toBeInTheDocument();
    expect(
      screen.getByText(
        ADMIN_BLOG_COPY.deleteModal.description(
          '5 Signs Your Home Needs a Plumbing Repair',
        ),
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: ADMIN_BLOG_COPY.deleteModal.cancel }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: ADMIN_BLOG_COPY.deleteModal.confirm }),
    ).toBeInTheDocument();
  });

  it('confirms delete from the Delete action', async () => {
    const user = userEvent.setup();
    const onConfirm = jest.fn();

    render(
      <BlogDeleteModal
        postTitle="Simple Ways to Keep Your Home in Top Shape"
        onClose={jest.fn()}
        onConfirm={onConfirm}
      />,
    );

    await user.click(
      screen.getByRole('button', { name: ADMIN_BLOG_COPY.deleteModal.confirm }),
    );

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('closes from Cancel, close button, and overlay click', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <BlogDeleteModal
        postTitle="Simple Ways to Keep Your Home in Top Shape"
        onClose={onClose}
        onConfirm={jest.fn()}
      />,
    );

    await user.click(
      screen.getByRole('button', { name: ADMIN_BLOG_COPY.deleteModal.cancel }),
    );
    await user.click(
      screen.getByRole('button', { name: ADMIN_BLOG_COPY.deleteModal.closeLabel }),
    );
    fireEvent.click(screen.getByTestId('blog-delete-overlay'));

    expect(onClose).toHaveBeenCalledTimes(3);
  });
});
