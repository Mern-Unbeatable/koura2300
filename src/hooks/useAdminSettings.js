import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { SETTINGS_COPY } from '../components/admin/settings/settingsCopy';
import {
  SETTINGS_MODERATOR_PAGE_SIZE,
  SETTINGS_MODERATORS_SEED,
} from '../components/admin/settings/settingsData';
import {
  getModeratorCountLabel,
  getPaginationRangeLabel,
  getTotalPages,
  paginateModerators,
  validateInviteEmail,
} from '../components/admin/settings/settingsUtils';

const useAdminSettings = () => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteEmailError, setInviteEmailError] = useState('');
  const [moderators] = useState(SETTINGS_MODERATORS_SEED);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(
    () => getTotalPages(moderators.length, SETTINGS_MODERATOR_PAGE_SIZE),
    [moderators.length],
  );

  const paginatedModerators = useMemo(
    () => paginateModerators(moderators, currentPage, SETTINGS_MODERATOR_PAGE_SIZE),
    [moderators, currentPage],
  );

  const moderatorCountLabel = useMemo(
    () => getModeratorCountLabel(moderators.length, SETTINGS_COPY),
    [moderators.length],
  );

  const pagination = useMemo(
    () => ({
      rangeLabel: getPaginationRangeLabel(
        currentPage,
        SETTINGS_MODERATOR_PAGE_SIZE,
        moderators.length,
      ),
      canGoPrevious: currentPage > 1,
      canGoNext: currentPage < totalPages,
    }),
    [currentPage, moderators.length, totalPages],
  );

  const handleInviteEmailChange = useCallback((event) => {
    setInviteEmail(event.target.value);
    setInviteEmailError('');
  }, []);

  const handleSendInvite = useCallback(
    (event) => {
      event.preventDefault();
      const error = validateInviteEmail(inviteEmail, SETTINGS_COPY);
      if (error) {
        setInviteEmailError(error);
        return;
      }

      setInviteEmail('');
      setInviteEmailError('');
      toast.success(SETTINGS_COPY.toasts.inviteSent);
    },
    [inviteEmail],
  );

  const handlePreviousPage = useCallback(() => {
    setCurrentPage((page) => Math.max(1, page - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
  }, [totalPages]);

  const handleEditModerator = useCallback((moderatorId) => {
    const moderator = moderators.find((item) => item.id === moderatorId);
    if (!moderator) {
      return;
    }
    toast.success(SETTINGS_COPY.toasts.editModerator);
  }, [moderators]);

  return {
    copy: SETTINGS_COPY,
    inviteEmail,
    inviteEmailError,
    moderators: paginatedModerators,
    moderatorCountLabel,
    pagination,
    onInviteEmailChange: handleInviteEmailChange,
    onSendInvite: handleSendInvite,
    onPreviousPage: handlePreviousPage,
    onNextPage: handleNextPage,
    onEditModerator: handleEditModerator,
  };
};

export default useAdminSettings;
