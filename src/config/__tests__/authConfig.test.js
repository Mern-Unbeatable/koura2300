import { isMockAuthEnabled, isMockAuthHost } from '../authConfig';

describe('authConfig', () => {
  const originalDevMock = process.env.REACT_APP_DEV_MOCK_AUTH;
  const originalMock = process.env.REACT_APP_MOCK_AUTH;

  afterEach(() => {
    process.env.REACT_APP_DEV_MOCK_AUTH = originalDevMock;
    process.env.REACT_APP_MOCK_AUTH = originalMock;
  });

  it('detects Coolify staging hostnames', () => {
    expect(isMockAuthHost('koura2300.maktechgroup.tech')).toBe(true);
    expect(isMockAuthHost('localhost')).toBe(true);
    expect(isMockAuthHost('example.com')).toBe(false);
  });

  it('enables mock auth on maktechgroup.tech at runtime', () => {
    process.env.REACT_APP_DEV_MOCK_AUTH = '';
    process.env.REACT_APP_MOCK_AUTH = '';

    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { hostname: 'koura2300.maktechgroup.tech' },
    });

    expect(isMockAuthEnabled()).toBe(true);
  });

  it('enables mock auth when REACT_APP_MOCK_AUTH is true', () => {
    process.env.REACT_APP_MOCK_AUTH = 'true';
    expect(isMockAuthEnabled()).toBe(true);
  });
});
