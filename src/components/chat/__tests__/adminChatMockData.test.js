import {
  ADMIN_CHAT_MOCK_ROOMS,
  getAdminChatMockMessages,
} from '../adminChatMockData';

describe('adminChatMockData', () => {
  it('includes Figma conversation names for the Support messages list', () => {
    const names = ADMIN_CHAT_MOCK_ROOMS.map((room) => room.otherUser.name);

    expect(names).toEqual(
      expect.arrayContaining([
        'TechPrint Hub',
        '3D Maker Store',
        'Printify Zone',
        'GadgetForge',
        'MegaTech Mart',
        'PrintLab Pro',
        "Maker's Market",
        '3D Print World',
      ]),
    );
    expect(ADMIN_CHAT_MOCK_ROOMS.length).toBeGreaterThan(8);
  });

  it('loads Figma thread copy for the default TechPrint Hub room', () => {
    const messages = getAdminChatMockMessages('techprint-hub');

    expect(messages.map((message) => message.text)).toEqual([
      'Yo mandem',
      'Cho dey house?',
      'Kwasia',
      'You dey hung dier you kai say house dey',
    ]);
  });
});
