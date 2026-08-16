import React, { memo } from 'react';

const FeatureCard = memo(({ title, description, bgColor, textColor }) => (
  <div className={`${bgColor} p-6 rounded-lg`}>
    <h3 className={`text-xl font-semibold ${textColor} mb-2`}>{title}</h3>
    <p className='text-gray-600'>{description}</p>
  </div>
));

FeatureCard.displayName = 'FeatureCard';

const HomeContent = memo(() => {
  return (
    <div className='max-w-4xl mx-auto'>
      <article className='bg-white rounded-lg shadow-md p-8'>
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>
          Welcome to Gairewele
        </h1>
        <p className='text-lg text-gray-600 mb-6'>
          A modern React application built with Webpack and Tailwind CSS
        </p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-8'>
          <FeatureCard
            title='React 18'
            description='Built with the latest React features and best practices'
            bgColor='bg-blue-50'
            textColor='text-blue-800'
          />
          <FeatureCard
            title='Tailwind CSS'
            description='Styled with modern utility-first CSS framework'
            bgColor='bg-green-50'
            textColor='text-green-800'
          />
          <FeatureCard
            title='React Router'
            description='Fast and reliable client-side routing'
            bgColor='bg-purple-50'
            textColor='text-purple-800'
          />
        </div>
      </article>
    </div>
  );
});

HomeContent.displayName = 'HomeContent';

export default HomeContent;
