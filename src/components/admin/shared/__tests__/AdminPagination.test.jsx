import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminPagination from '../AdminPagination';
import { getPaginationItems, PAGINATION_ELLIPSIS_TOKEN } from '../adminPaginationUtils';

const paginationCopy = {
  pagination: {
    previous: 'Prev',
    next: 'Next',
    ellipsis: '...',
    pageLabel: (page) => `Go to page ${page}`,
  },
};

describe('AdminPagination', () => {
  it('renders Service Management style Prev, pages, ellipsis, and Next', async () => {
    const user = userEvent.setup();
    const onNext = jest.fn();
    const onPageChange = jest.fn();

    render(
      <AdminPagination
        copy={paginationCopy}
        currentPage={1}
        pageItems={getPaginationItems(1, 10)}
        canGoPrevious={false}
        canGoNext
        onPrevious={jest.fn()}
        onNext={onNext}
        onPageChange={onPageChange}
        regionLabel="Shared pagination"
        testId="admin-shared-pagination"
      />,
    );

    const pagination = screen.getByTestId('admin-shared-pagination');
    expect(pagination).toHaveAttribute('aria-label', 'Shared pagination');
    expect(screen.getByRole('button', { name: 'Prev' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(getPaginationItems(1, 10)).toContain(PAGINATION_ELLIPSIS_TOKEN);

    await user.click(screen.getByRole('button', { name: 'Go to page 2' }));
    expect(onPageChange).toHaveBeenCalledWith(2);

    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
