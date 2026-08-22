import { memo } from 'react';
import LoginContent from '../components/login/LoginContent';
import { LOGIN_COPY } from '../components/login/loginCopy';
import { useSEO } from '../hooks/useSEO';

const Login = memo(() => {
  useSEO(LOGIN_COPY.seo);

  return <LoginContent />;
});

Login.displayName = 'Login';

export default Login;
