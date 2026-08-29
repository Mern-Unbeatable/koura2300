import ServiceCard, { SERVICE_CARD_VARIANTS } from '../../home/ServiceCard';
import { ADS_EMPTY_CLASS, ADS_GRID_CLASS } from './adsData';

const AdsGrid = ({ copy, ads, onEditAd, onDeleteAd }) => {
  if (ads.length === 0) {
    return <p className={ADS_EMPTY_CLASS}>{copy.emptyResults}</p>;
  }

  return (
    <div role="region" aria-label={copy.gridLabel} className={ADS_GRID_CLASS}>
      {ads.map((ad) => (
        <ServiceCard
          key={ad.id}
          service={ad}
          variant={SERVICE_CARD_VARIANTS.ADMIN}
          onEdit={onEditAd}
          onDelete={onDeleteAd}
          editLabel={copy.edit}
          deleteLabel={copy.delete}
        />
      ))}
    </div>
  );
};

export default AdsGrid;
