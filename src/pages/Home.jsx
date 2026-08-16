import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSEO } from '../hooks/useSEO';
import HomeContent from '../components/home/HomeContent';

const Home = memo(() => {
  const { t, i18n } = useTranslation();

  useSEO({
    title: t('landing.seo.title'),
    description: t('landing.seo.description'),
    keywords: t('landing.seo.keywords', { returnObjects: true }),
    locale: i18n.resolvedLanguage,
  });

  return <HomeContent />;
});

Home.displayName = 'Home';

export default Home;
