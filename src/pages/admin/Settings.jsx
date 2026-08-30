import SettingsView from '../../components/admin/settings/SettingsView';
import useAdminSettings from '../../hooks/useAdminSettings';

const Settings = () => {
  const settingsProps = useAdminSettings();

  return (
    <div className="h-auto w-full shrink-0">
      <SettingsView {...settingsProps} />
    </div>
  );
};

export default Settings;
