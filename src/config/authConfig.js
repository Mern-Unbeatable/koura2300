/** Hostnames that use in-browser mock login when no API is reachable (Coolify staging). */
const MOCK_AUTH_HOST_SUFFIXES = ['.maktechgroup.tech'];

const MOCK_AUTH_HOSTS = ['localhost', '127.0.0.1'];

const hasMockAuthEnvFlag = () =>
  process.env.REACT_APP_DEV_MOCK_AUTH === 'true' ||
  process.env.REACT_APP_MOCK_AUTH === 'true';

export const isMockAuthHost = (hostname) => {
  if (!hostname) {
    return false;
  }

  if (MOCK_AUTH_HOSTS.includes(hostname)) {
    return true;
  }

  return MOCK_AUTH_HOST_SUFFIXES.some((suffix) => hostname.endsWith(suffix));
};

/** Skip API login when env flag is set or when running on a known staging host. */
export const isMockAuthEnabled = () => {
  if (hasMockAuthEnvFlag()) {
    return true;
  }

  if (typeof window !== 'undefined') {
    return isMockAuthHost(window.location.hostname);
  }

  return false;
};
