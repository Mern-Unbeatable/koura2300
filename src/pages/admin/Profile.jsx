import ProfileView from '../../components/admin/profile/ProfileView';
import useAdminProfile from '../../hooks/useAdminProfile';
import { useSEO } from '../../hooks/useSEO';

const Profile = () => {
  const profileProps = useAdminProfile();
  useSEO(profileProps.seo);

  return <ProfileView {...profileProps} />;
};

export default Profile;
