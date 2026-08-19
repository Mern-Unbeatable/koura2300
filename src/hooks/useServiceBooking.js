import { useCallback, useReducer } from 'react';
import toast from 'react-hot-toast';
import useAddService from './useAddService';
import { SERVICE_DETAILS_CONTENT } from '../components/serviceDetails/serviceDetailsCopy';
import {
  SERVICE_PACKAGES,
  UNSELECTED_CONTACT_METHOD,
  createConfirmedCartItem,
} from '../components/serviceDetails/serviceDetailsData';

const BOOKING_ACTION = {
  SELECT_PACKAGE: 'SELECT_PACKAGE',
  SET_NEEDS_MATERIALS: 'SET_NEEDS_MATERIALS',
  TOGGLE_RECYCLE: 'TOGGLE_RECYCLE',
  OPEN_ZIP_PANEL: 'OPEN_ZIP_PANEL',
  CLOSE_ZIP_PANEL: 'CLOSE_ZIP_PANEL',
  CHANGE_ZIP_CODE: 'CHANGE_ZIP_CODE',
  SELECT_CONTACT_METHOD: 'SELECT_CONTACT_METHOD',
  COMPLETE_CONFIRMATION: 'COMPLETE_CONFIRMATION',
};

const createBookingState = () => ({
  selectedPackageId: SERVICE_PACKAGES.STANDARD,
  needsMaterials: true,
  recycleOldMaterials: false,
  isZipPanelOpen: false,
  zipCode: '',
  isContactMethodVisible: false,
  selectedContactMethod: UNSELECTED_CONTACT_METHOD,
});

const bookingReducer = (state, action) => {
  switch (action.type) {
    case BOOKING_ACTION.SELECT_PACKAGE:
      return { ...state, selectedPackageId: action.packageId };
    case BOOKING_ACTION.SET_NEEDS_MATERIALS:
      return { ...state, needsMaterials: action.needsMaterials };
    case BOOKING_ACTION.TOGGLE_RECYCLE:
      return { ...state, recycleOldMaterials: !state.recycleOldMaterials };
    case BOOKING_ACTION.OPEN_ZIP_PANEL:
      return { ...state, isZipPanelOpen: true };
    case BOOKING_ACTION.CLOSE_ZIP_PANEL:
      return { ...state, isZipPanelOpen: false };
    case BOOKING_ACTION.CHANGE_ZIP_CODE:
      return { ...state, zipCode: action.zipCode };
    case BOOKING_ACTION.SELECT_CONTACT_METHOD:
      return { ...state, selectedContactMethod: action.contactMethod };
    case BOOKING_ACTION.COMPLETE_CONFIRMATION:
      return {
        ...state,
        isZipPanelOpen: false,
        isContactMethodVisible: true,
        zipCode: '',
      };
    default:
      return state;
  }
};

const useServiceBooking = (service, packages) => {
  const addService = useAddService();
  const [state, dispatch] = useReducer(bookingReducer, undefined, createBookingState);

  const selectedPackage =
    packages.find((servicePackage) => servicePackage.id === state.selectedPackageId) ?? packages[0];

  const handleSelectPackage = useCallback((packageId) => {
    dispatch({ type: BOOKING_ACTION.SELECT_PACKAGE, packageId });
  }, []);

  const handleNeedMaterials = useCallback(() => {
    dispatch({ type: BOOKING_ACTION.SET_NEEDS_MATERIALS, needsMaterials: true });
  }, []);

  const handleHaveMaterials = useCallback(() => {
    dispatch({ type: BOOKING_ACTION.SET_NEEDS_MATERIALS, needsMaterials: false });
  }, []);

  const handleToggleRecycle = useCallback(() => {
    dispatch({ type: BOOKING_ACTION.TOGGLE_RECYCLE });
  }, []);

  const handleConfirmJob = useCallback(() => {
    dispatch({ type: BOOKING_ACTION.OPEN_ZIP_PANEL });
  }, []);

  const handleCloseZipPanel = useCallback(() => {
    dispatch({ type: BOOKING_ACTION.CLOSE_ZIP_PANEL });
  }, []);

  const handleZipCodeChange = useCallback((event) => {
    dispatch({ type: BOOKING_ACTION.CHANGE_ZIP_CODE, zipCode: event.target.value });
  }, []);

  const handleSelectContactMethod = useCallback((contactMethod) => {
    dispatch({ type: BOOKING_ACTION.SELECT_CONTACT_METHOD, contactMethod });
  }, []);

  const handleSubmitZip = useCallback(
    (event) => {
      event.preventDefault();

      addService(
        createConfirmedCartItem({
          service,
          selectedPackage,
          needsMaterials: state.needsMaterials,
          recycleOldMaterials: state.recycleOldMaterials,
        }),
      );
      toast.success(SERVICE_DETAILS_CONTENT.booking.success);
      dispatch({ type: BOOKING_ACTION.COMPLETE_CONFIRMATION });
    },
    [addService, selectedPackage, service, state.needsMaterials, state.recycleOldMaterials],
  );

  return {
    selectedPackageId: state.selectedPackageId,
    selectedPackage,
    needsMaterials: state.needsMaterials,
    recycleOldMaterials: state.recycleOldMaterials,
    isZipPanelOpen: state.isZipPanelOpen,
    zipCode: state.zipCode,
    isContactMethodVisible: state.isContactMethodVisible,
    selectedContactMethod: state.selectedContactMethod,
    handleSelectPackage,
    handleNeedMaterials,
    handleHaveMaterials,
    handleToggleRecycle,
    handleConfirmJob,
    handleCloseZipPanel,
    handleZipCodeChange,
    handleSubmitZip,
    handleSelectContactMethod,
  };
};

export default useServiceBooking;
