import AdminPanelEditor from "./admin-editor";
import UserDataTabs from "./user-data";

export default function ViewPage() {
  return (
    <div className="flex h-full">
      <UserDataTabs />
      <AdminPanelEditor />
    </div>
  );
}
