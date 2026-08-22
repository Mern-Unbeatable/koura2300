import {
  OVERVIEW_LIST_BODY_CLASS,
  OVERVIEW_LIST_ITEM_CLASS,
  OVERVIEW_LIST_NAME_CLASS,
  OVERVIEW_LIST_TIME_CLASS,
  OVERVIEW_MESSAGE_AVATAR_WRAP_CLASS,
} from './overviewData';
import OverviewAvatarBadge from './OverviewAvatarBadge';

const MessageListItem = ({ message }) => (
  <article className={OVERVIEW_LIST_ITEM_CLASS}>
    <div className={OVERVIEW_MESSAGE_AVATAR_WRAP_CLASS}>
      <OverviewAvatarBadge
        initial={message.initial}
        name={message.name}
        isOnline={message.isOnline}
      />
    </div>
    <div className="flex min-w-0 flex-1 flex-col gap-1">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className={OVERVIEW_LIST_NAME_CLASS}>{message.name}</p>
        <time className={OVERVIEW_LIST_TIME_CLASS}>{message.time}</time>
      </div>
      <p className={OVERVIEW_LIST_BODY_CLASS}>{message.message}</p>
    </div>
  </article>
);

export default MessageListItem;
