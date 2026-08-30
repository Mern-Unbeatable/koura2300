import {
  CONVERSATION_DAY_TYPE,
  formatConversationTimestamp,
  groupMessages,
} from '../chatUtils';

describe('groupMessages day separators', () => {
  it('inserts a centered day stamp at the start of a conversation', () => {
    const groups = groupMessages([
      {
        id: '1',
        type: 'received',
        text: 'Yo mandem',
        createdAt: '2026-01-04T18:21:00',
      },
    ]);

    expect(groups[0]).toMatchObject({
      type: CONVERSATION_DAY_TYPE,
      dateLabel: expect.stringMatching(/Jan/),
      timeLabel: expect.stringMatching(/6:21/),
    });
    expect(groups[1].type).toBe('received');
  });

  it('inserts another day stamp when the calendar day changes', () => {
    const groups = groupMessages([
      {
        id: '1',
        type: 'received',
        text: 'Day one',
        createdAt: '2026-01-04T18:21:00',
      },
      {
        id: '2',
        type: 'sent',
        text: 'Day two',
        createdAt: '2026-01-05T10:00:00',
      },
    ]);

    const dayStamps = groups.filter((group) => group.type === CONVERSATION_DAY_TYPE);
    expect(dayStamps).toHaveLength(2);
  });

  it('formats Figma-style date and time labels', () => {
    const stamp = formatConversationTimestamp('2026-01-04T18:21:00');

    expect(stamp.dateLabel).toMatch(/Jan/);
    expect(stamp.dateLabel).toMatch(/4/);
    expect(stamp.timeLabel).toMatch(/6:21/);
  });
});
