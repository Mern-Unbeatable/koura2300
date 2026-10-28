const EMPTY_OVERLAY = {
  additionalFeatures: [],
  sizes: [],
  options: [],
};

const VANITY_HARDWARE_OVERLAY = {
  additionalFeatures: [
    {
      id: 'vanity-hardware-feature-1',
      name: 'Handles',
      measurementUnit: 'ft',
      quantity: '3',
      standardPrice: '25%',
      premiumPrice: '30%',
      note1: 'First 3 handles: included in base labor price.',
      note2: 'Each additional: +25% of selected labor price.',
    },
  ],
  sizes: [],
  options: [],
};

const SINK_CAULKING_OVERLAY = {
  additionalFeatures: [
    {
      id: 'sink-caulking-feature-1',
      name: 'Caulking',
      measurementUnit: 'ft',
      quantity: '2',
      standardPrice: '25%',
      premiumPrice: '30%',
      note1: 'First 2 ft: included in base labor price.',
      note2: 'Each additional: +25% of selected labor price.',
    },
  ],
  sizes: [],
  options: [],
};

const VANITY_INSTALLATION_OVERLAY = {
  additionalFeatures: [],
  sizes: [
    {
      id: 'vanity-size-24',
      size: '24',
      measurementUnit: 'inch',
      standardPrice: '$180.00',
      premiumPrice: '$220.00',
    },
    {
      id: 'vanity-size-36',
      size: '36',
      measurementUnit: 'inch',
      standardPrice: '$200.00',
      premiumPrice: '$250.00',
    },
    {
      id: 'vanity-size-48',
      size: '48',
      measurementUnit: 'inch',
      standardPrice: '$230.00',
      premiumPrice: '$280.00',
    },
    {
      id: 'vanity-size-60',
      size: '60',
      measurementUnit: 'inch',
      standardPrice: '$260.00',
      premiumPrice: '$310.00',
    },
  ],
  options: [],
};

const TOILET_INSTALLATION_OVERLAY = {
  additionalFeatures: [],
  sizes: [],
  options: [
    {
      id: 'toilet-option-a',
      name: 'Option A',
      standardPrice: '$150.00',
      premiumPrice: '$190.00',
    },
    {
      id: 'toilet-option-b',
      name: 'Option B',
      standardPrice: '$175.00',
      premiumPrice: '$210.00',
    },
  ],
};

const OVERLAY_BY_SERVICE_ID = {
  'vanity-services-hardware': VANITY_HARDWARE_OVERLAY,
  'caulking-waterproofing-sink': SINK_CAULKING_OVERLAY,
  'vanity-services-installation': VANITY_INSTALLATION_OVERLAY,
  'toilet-services-installation': TOILET_INSTALLATION_OVERLAY,
};

export const getServiceDetailsConfigOverlay = (service) => {
  if (!service?.id) {
    return EMPTY_OVERLAY;
  }

  return OVERLAY_BY_SERVICE_ID[service.id] ?? EMPTY_OVERLAY;
};
