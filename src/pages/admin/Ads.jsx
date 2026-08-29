import AdsView from '../../components/admin/ads/AdsView';
import useAdminAds from '../../hooks/useAdminAds';

const Ads = () => {
  const adsProps = useAdminAds();

  return <AdsView {...adsProps} />;
};

export default Ads;
