import React, { memo } from 'react';
import { useSEO } from '../hooks/useSEO';
import HomeContent from '../components/home/HomeContent';
import { LANDING_CONTENT } from '../components/home/landingContent';

const Home = memo(() => {
  useSEO({
    title: LANDING_CONTENT.seo.title,
    description: LANDING_CONTENT.seo.description,
    keywords: LANDING_CONTENT.seo.keywords,
    locale: 'en',
  });

  return <HomeContent />;
});

Home.displayName = 'Home';

export default Home;
