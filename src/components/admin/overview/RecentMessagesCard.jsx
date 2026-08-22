import OverviewPanelCard from './OverviewPanelCard';
import MessageListItem from './MessageListItem';

const RecentMessagesCard = ({ title, viewAllLabel, messages, onViewAll }) => (
  <OverviewPanelCard title={title} actionLabel={viewAllLabel} onAction={onViewAll}>
    <div className="flex flex-col gap-4">
      {messages.map((message) => (
        <MessageListItem key={message.id} message={message} />
      ))}
    </div>
  </OverviewPanelCard>
);

export default RecentMessagesCard;
