import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../config';
import useNewsletterForm from '../../hooks/useNewsletterForm';
import { LANDING_ASSET_PATH } from './landingData';

const LandingFooter = memo(() => {
  const { t } = useTranslation();
  const { email, status, handleEmailChange, handleSubmit } = useNewsletterForm();

  return (
    <footer id="footer" className="bg-brand-footer text-white">
      <div className="mx-auto max-w-screen-2xl px-4 pb-5 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-[1.4fr_0.7fr_0.8fr_1fr]">
          <div>
            <img
              src={`${LANDING_ASSET_PATH}/logo.svg`}
              alt={t('landing.header.logoAlt')}
              width="220"
              height="40"
              className="h-10 w-auto"
            />
            <p className="mt-6 max-w-sm text-base leading-7 text-white/80">
              {t('landing.footer.description')}
            </p>
          </div>

          <nav aria-label={t('landing.footer.company')}>
            <h2 className="text-lg font-bold">{t('landing.footer.company')}</h2>
            <ul className="mt-7 space-y-4 text-sm font-medium text-white/80">
              <li>
                <Link to={ROUTES.ABOUT}>{t('landing.footer.about')}</Link>
              </li>
              <li>
                <Link to={ROUTES.SERVICES}>{t('landing.footer.services')}</Link>
              </li>
              <li>
                <a href="#learning">{t('landing.footer.blog')}</a>
              </li>
            </ul>
          </nav>

          <nav aria-label={t('landing.footer.knowMore')}>
            <h2 className="text-lg font-bold">{t('landing.footer.knowMore')}</h2>
            <ul className="mt-7 space-y-4 text-sm font-medium text-white/80">
              <li>
                <Link to={ROUTES.PRIVACY_POLICY}>{t('landing.footer.privacy')}</Link>
              </li>
              <li>
                <Link to={ROUTES.TERMS}>{t('landing.footer.terms')}</Link>
              </li>
            </ul>
          </nav>

          <form onSubmit={handleSubmit} noValidate>
            <h2 className="text-lg font-bold">{t('landing.footer.newsletter')}</h2>
            <label htmlFor="newsletter-email" className="sr-only">
              {t('landing.footer.emailLabel')}
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              aria-invalid={status === 'error'}
              aria-describedby="newsletter-feedback"
              placeholder={t('landing.footer.emailPlaceholder')}
              className="mt-7 w-full rounded-md border border-white/40 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />
            <button
              type="submit"
              aria-label={t('landing.footer.subscribeLabel')}
              className="mt-4 rounded-md bg-brand-orange px-7 py-3 text-sm font-bold transition-all duration-200 ease-in-out hover:bg-brand-orange-dark focus:outline-none focus:ring-2 focus:ring-white"
            >
              {t('landing.footer.send')}
            </button>
            {status === 'error' && (
              <p id="newsletter-feedback" role="alert" className="mt-3 text-sm text-red-300">
                {t('landing.footer.emailError')}
              </p>
            )}
            {status === 'success' && (
              <p id="newsletter-feedback" role="status" className="mt-3 text-sm text-green-300">
                {t('landing.footer.success')}
              </p>
            )}
          </form>
        </div>

        <div className="mt-16 border-t border-white/30 pt-5 text-center text-sm text-white/80">
          {t('landing.footer.copyright')}
        </div>
      </div>
    </footer>
  );
});

LandingFooter.displayName = 'LandingFooter';

export default LandingFooter;
