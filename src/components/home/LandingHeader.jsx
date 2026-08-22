import React, { memo, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { ROUTES } from '../../config';
import useElementHeight from '../../hooks/useElementHeight';
import useLandingChat from '../../hooks/useLandingChat';
import useMobileMenu from '../../hooks/useMobileMenu';
import LandingChatWidget from './landingChat/LandingChatWidget';
import CategoryNavigation from './CategoryNavigation';
import LandingHeaderActions from './LandingHeaderActions';
import LandingSearchForm from './LandingSearchForm';
import MobileMenu from './MobileMenu';
import { LANDING_CONTENT } from './landingContent';
import { LANDING_ASSET_PATH } from './landingData';

const MENU_ICON_SIZE = 24;

const LandingHeader = memo(({ searchValue, onSearchChange, onSearchSubmit }) => {
  const headerRef = useRef(null);
  const headerOffset = useElementHeight(headerRef);
  const { isMenuOpen, toggleMenu, closeMenu } = useMobileMenu();
  const chat = useLandingChat();

  const handleChatClick = useCallback(() => {
    closeMenu();
    chat.toggleChat();
  }, [chat, closeMenu]);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 right-0 left-0 z-50 overflow-x-clip bg-brand-navy text-white"
        role="banner"
      >
        <div className="mx-auto min-w-0 max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center justify-between gap-3 py-3.5 sm:gap-6">
            <Link
              to={ROUTES.HOME}
              aria-label={LANDING_CONTENT.header.homeLabel}
              className="min-w-0 shrink-0"
            >
              <img
                src={`${LANDING_ASSET_PATH}/logo.svg`}
                alt={LANDING_CONTENT.header.logoAlt}
                width="220"
                height="40"
                className="h-8 w-auto max-w-38 sm:max-w-none"
              />
            </Link>

            <LandingSearchForm
              idPrefix="desktop"
              searchValue={searchValue}
              onSearchChange={onSearchChange}
              onSearchSubmit={onSearchSubmit}
              className="hidden min-w-0 max-w-4xl flex-1 md:block"
            />

            <LandingHeaderActions isChatActive={chat.isOpen} onChatClick={handleChatClick} />

            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-controls="landing-mobile-navigation"
                aria-label={LANDING_CONTENT.header.openMenu}
                className="-mr-2 cursor-pointer rounded-md p-2 transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              >
                <Menu size={MENU_ICON_SIZE} aria-hidden="true" />
              </button>
            </div>
          </div>

          <LandingSearchForm
            idPrefix="mobile"
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            onSearchSubmit={onSearchSubmit}
            className="block min-w-0 pb-3.5 md:hidden"
          />

          <CategoryNavigation />
        </div>

        <MobileMenu
          isOpen={isMenuOpen}
          onClose={closeMenu}
          onChatClick={handleChatClick}
        />
      </header>

      <div aria-hidden="true" className="shrink-0" style={{ height: headerOffset }} />

      {chat.isOpen ? (
        <LandingChatWidget
          messages={chat.messages}
          inputValue={chat.inputValue}
          inputRef={chat.inputRef}
          onClose={chat.closeChat}
          onInputChange={chat.handleInputChange}
          onSend={chat.handleSend}
          onKeyDown={chat.handleKeyDown}
        />
      ) : null}
    </>
  );
});

LandingHeader.displayName = 'LandingHeader';

export default LandingHeader;
