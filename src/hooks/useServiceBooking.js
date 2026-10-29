import { useCallback, useMemo, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ROUTES } from '../config';
import { loginSuccess, selectIsAuthenticated } from '../store/slices/authSlice';
import { clearCart } from '../store/slices/cartSlice';
import useAddService from './useAddService';
import { SERVICE_DETAILS_CONTENT } from '../components/serviceDetails/serviceDetailsCopy';
import {
  CONTACT_METHODS,
  SERVICE_PACKAGES,
  UNSELECTED_CONTACT_METHOD,
  applyRecycleSurchargeToPackages,
  computeRecycleSurcharge,
  createConfirmedCartItem,
  roundMoney,
} from '../components/serviceDetails/serviceDetailsData';
import useAdditionalFeatureQty from '../components/serviceDetails/additionalFeatureQty/useAdditionalFeatureQty';
import { applyAdditionalFeatureSurchargeToPackages } from '../components/serviceDetails/additionalFeatureQty/additionalFeatureQtyUtils';

const BOOKING_ACTION = {
  SELECT_PACKAGE: 'SELECT_PACKAGE',
  SET_NEEDS_MATERIALS: 'SET_NEEDS_MATERIALS',
  TOGGLE_RECYCLE: 'TOGGLE_RECYCLE',
  OPEN_ZIP_PANEL: 'OPEN_ZIP_PANEL',
  CLOSE_ZIP_PANEL: 'CLOSE_ZIP_PANEL',
  CHANGE_ZIP_CODE: 'CHANGE_ZIP_CODE',
  SELECT_CONTACT_METHOD: 'SELECT_CONTACT_METHOD',
  CLOSE_CHAT: 'CLOSE_CHAT',
  OPEN_ACCOUNT: 'OPEN_ACCOUNT',
  OPEN_MANUAL_SIGN_UP: 'OPEN_MANUAL_SIGN_UP',
  CLOSE_ACCOUNT: 'CLOSE_ACCOUNT',
  COMPLETE_CONFIRMATION: 'COMPLETE_CONFIRMATION',
};

const isSignUpContactMethod = (contactMethod) =>
  contactMethod === CONTACT_METHODS.PHONE || contactMethod === CONTACT_METHODS.EMAIL;

const createBookingState = () => ({
  selectedPackageId: SERVICE_PACKAGES.STANDARD,
  needsMaterials: true,
  recycleOldMaterials: false,
  isZipPanelOpen: false,
  zipCode: '',
  isContactMethodVisible: false,
  isChatOpen: false,
  isSignUpMethodsOpen: false,
  isAccountOpen: false,
  selectedContactMethod: UNSELECTED_CONTACT_METHOD,
});

const bookingReducer = (state, action) => {
  switch (action.type) {
    case BOOKING_ACTION.SELECT_PACKAGE:
      return { ...state, selectedPackageId: action.packageId };
    case BOOKING_ACTION.SET_NEEDS_MATERIALS:
      if (action.needsMaterials) {
        return {
          ...state,
          needsMaterials: true,
          isAccountOpen: false,
          isSignUpMethodsOpen: false,
        };
      }

      return {
        ...state,
        needsMaterials: false,
        isZipPanelOpen: false,
        isContactMethodVisible: false,
        isChatOpen: false,
        isSignUpMethodsOpen: false,
        isAccountOpen: false,
        selectedContactMethod: UNSELECTED_CONTACT_METHOD,
      };
    case BOOKING_ACTION.TOGGLE_RECYCLE:
      return { ...state, recycleOldMaterials: !state.recycleOldMaterials };
    case BOOKING_ACTION.OPEN_ZIP_PANEL:
      return { ...state, isZipPanelOpen: true, isAccountOpen: false, isSignUpMethodsOpen: false };
    case BOOKING_ACTION.CLOSE_ZIP_PANEL:
      return { ...state, isZipPanelOpen: false };
    case BOOKING_ACTION.CHANGE_ZIP_CODE:
      return { ...state, zipCode: action.zipCode };
    case BOOKING_ACTION.SELECT_CONTACT_METHOD:
      return {
        ...state,
        selectedContactMethod: action.contactMethod,
        isChatOpen: action.contactMethod === CONTACT_METHODS.CHAT,
        isSignUpMethodsOpen: isSignUpContactMethod(action.contactMethod),
        isAccountOpen: false,
      };
    case BOOKING_ACTION.CLOSE_CHAT:
      return {
        ...state,
        isChatOpen: false,
        selectedContactMethod: UNSELECTED_CONTACT_METHOD,
      };
    case BOOKING_ACTION.OPEN_ACCOUNT:
      return {
        ...state,
        isAccountOpen: true,
        isSignUpMethodsOpen: false,
        isZipPanelOpen: false,
        isChatOpen: false,
      };
    case BOOKING_ACTION.OPEN_MANUAL_SIGN_UP:
      return {
        ...state,
        isAccountOpen: true,
        isSignUpMethodsOpen: false,
      };
    case BOOKING_ACTION.CLOSE_ACCOUNT:
      return {
        ...state,
        isAccountOpen: false,
        isSignUpMethodsOpen: false,
        selectedContactMethod: UNSELECTED_CONTACT_METHOD,
      };
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

const getCheckoutNavigationState = (location) => ({
  from: `${location.pathname}${location.search}`,
});

const useServiceBooking = (service, packages, { additionalFeatures = [] } = {}) => {
  const addService = useAddService();
  const dispatchAuth = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [state, dispatch] = useReducer(bookingReducer, undefined, createBookingState);

  const selectedPackage =
    packages.find((servicePackage) => servicePackage.id === state.selectedPackageId) ?? packages[0];

  const featureQty = useAdditionalFeatureQty({
    additionalFeatures,
    selectedPackageId: state.selectedPackageId,
    selectedPackagePrice: selectedPackage?.price,
  });

  const laborPrice = useMemo(
    () => roundMoney(Number(selectedPackage?.price || 0) + featureQty.surcharge),
    [featureQty.surcharge, selectedPackage?.price],
  );

  const recycleSurcharge = useMemo(
    () => (state.recycleOldMaterials ? computeRecycleSurcharge(laborPrice) : 0),
    [laborPrice, state.recycleOldMaterials],
  );

  const pricedPackages = useMemo(() => {
    const withFeatureQty = applyAdditionalFeatureSurchargeToPackages(
      packages,
      featureQty.feature,
      featureQty.quantity,
    );
    return applyRecycleSurchargeToPackages(withFeatureQty, state.recycleOldMaterials);
  }, [featureQty.feature, featureQty.quantity, packages, state.recycleOldMaterials]);

  const addConfirmedItem = useCallback(() => {
    dispatchAuth(clearCart());
    addService(
      createConfirmedCartItem({
        service,
        selectedPackage,
        needsMaterials: state.needsMaterials,
        recycleOldMaterials: state.recycleOldMaterials,
        additionalFeatureSurcharge: featureQty.surcharge,
      }),
    );
  }, [
    addService,
    dispatchAuth,
    featureQty.surcharge,
    selectedPackage,
    service,
    state.needsMaterials,
    state.recycleOldMaterials,
  ]);

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
    if (!state.needsMaterials) {
      addConfirmedItem();
      if (isAuthenticated) {
        navigate(ROUTES.CHECKOUT, { state: getCheckoutNavigationState(location) });
        return;
      }
      dispatch({ type: BOOKING_ACTION.OPEN_ACCOUNT });
      return;
    }

    dispatch({ type: BOOKING_ACTION.OPEN_ZIP_PANEL });
  }, [addConfirmedItem, isAuthenticated, location, navigate, state.needsMaterials]);

  const handleCloseZipPanel = useCallback(() => {
    dispatch({ type: BOOKING_ACTION.CLOSE_ZIP_PANEL });
  }, []);

  const handleZipCodeChange = useCallback((event) => {
    dispatch({ type: BOOKING_ACTION.CHANGE_ZIP_CODE, zipCode: event.target.value });
  }, []);

  const handleSelectContactMethod = useCallback((contactMethod) => {
    dispatch({ type: BOOKING_ACTION.SELECT_CONTACT_METHOD, contactMethod });
  }, []);

  const handleCloseChat = useCallback(() => {
    dispatch({ type: BOOKING_ACTION.CLOSE_CHAT });
  }, []);

  const handleCloseAccount = useCallback(() => {
    dispatch({ type: BOOKING_ACTION.CLOSE_ACCOUNT });
  }, []);

  const handleManualSignUp = useCallback(() => {
    dispatch({ type: BOOKING_ACTION.OPEN_MANUAL_SIGN_UP });
  }, []);

  const handleAccountComplete = useCallback(
    (fields) => {
      dispatchAuth(
        loginSuccess({
          user: {
            name: fields.fullName,
            email: fields.email,
            phone: fields.phone,
            address: fields.address,
            role: 'user',
          },
          token: null,
        }),
      );
      navigate(ROUTES.CHECKOUT, { state: getCheckoutNavigationState(location) });
    },
    [dispatchAuth, location, navigate],
  );

  const handleSubmitZip = useCallback(
    (event) => {
      event.preventDefault();
      addConfirmedItem();
      toast.success(SERVICE_DETAILS_CONTENT.booking.success);
      dispatch({ type: BOOKING_ACTION.COMPLETE_CONFIRMATION });
    },
    [addConfirmedItem],
  );

  return {
    selectedPackageId: state.selectedPackageId,
    selectedPackage,
    pricedPackages,
    recycleSurcharge,
    featureQty,
    needsMaterials: state.needsMaterials,
    recycleOldMaterials: state.recycleOldMaterials,
    isZipPanelOpen: state.isZipPanelOpen,
    zipCode: state.zipCode,
    isContactMethodVisible: state.isContactMethodVisible,
    isChatOpen: state.isChatOpen,
    isSignUpMethodsOpen: state.isSignUpMethodsOpen,
    isAccountOpen: state.isAccountOpen,
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
    handleCloseChat,
    handleCloseAccount,
    handleManualSignUp,
    handleAccountComplete,
  };
};

export default useServiceBooking;
