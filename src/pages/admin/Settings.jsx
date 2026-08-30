import SettingsView from '../../components/admin/settings/SettingsView';
import useAdminSettings from '../../hooks/useAdminSettings';

const Settings = () => {
  const settingsProps = useAdminSettings();

  return <SettingsView {...settingsProps} />;
};

export default Settings;
