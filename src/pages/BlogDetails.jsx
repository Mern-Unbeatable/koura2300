import React, { memo } from 'react';
import BlogDetailsContent from '../components/blog/BlogDetailsContent';
import LandingFooter from '../components/home/LandingFooter';
import LandingHeader from '../components/home/LandingHeader';
import { SERVICE_ITEMS } from '../components/home/landingData';
import useLandingSearch from '../hooks/useLandingSearch';
import useScrollToTop from '../hooks/useScrollToTop';

const BlogDetails = memo(() => {
  const { searchValue, handleSearchChange, handleSearchSubmit } = useLandingSearch(SERVICE_ITEMS);

  useScrollToTop();

  return (
    <div className="min-h-screen bg-white font-inter text-brand-ink">
      <LandingHeader
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <BlogDetailsContent />
      <LandingFooter />
    </div>
  );
});

BlogDetails.displayName = 'BlogDetails';

export default BlogDetails;
