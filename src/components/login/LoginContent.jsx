import { memo } from 'react';
import { ALL_CATALOG_SERVICES } from '../catalog/catalogRegistry';
import LandingFooter from '../home/LandingFooter';
import LandingHeader from '../home/LandingHeader';
import useLandingSearch from '../../hooks/useLandingSearch';
import useLogin from '../../hooks/useLogin';
import useScrollToTop from '../../hooks/useScrollToTop';
import LoginView from './LoginView';
import { LOGIN_MAIN_CLASS, LOGIN_PAGE_CLASS } from './loginData';

const LoginContent = memo(() => {
  useScrollToTop();

  const { searchValue, handleSearchChange, handleSearchSubmit } =
    useLandingSearch(ALL_CATALOG_SERVICES);
  const loginProps = useLogin();

  return (
    <div className={LOGIN_PAGE_CLASS}>
      <LandingHeader
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <main className={LOGIN_MAIN_CLASS}>
        <LoginView {...loginProps} />
      </main>
      <LandingFooter />
    </div>
  );
});

LoginContent.displayName = 'LoginContent';

export default LoginContent;
