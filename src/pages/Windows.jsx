import React, { memo } from 'react';
import WindowsContent from '../components/windows/WindowsContent';
import { WINDOWS_CONTENT } from '../components/windows/windowsCopy';
import { useSEO } from '../hooks/useSEO';

const Windows = memo(() => {
  useSEO(WINDOWS_CONTENT.seo);

  return <WindowsContent />;
});

Windows.displayName = 'Windows';

export default Windows;
