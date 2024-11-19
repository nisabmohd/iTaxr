import AdminPanelEditor from "./admin-editor";
import UserDataTabs from "./user-data";

export default function ViewPage() {
  // fileId searchparams
  return (
    <div className="flex h-full">
      <UserDataTabs />
      <AdminPanelEditor />
    </div>
  );
}
