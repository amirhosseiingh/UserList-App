import { FiPlus, FiRefreshCw } from 'react-icons/fi';

interface UserPageHeaderProps {
  onReload: () => void;
  onAddUser: () => void;
}

export default function UserPageHeader({
  onReload,
  onAddUser,
}: UserPageHeaderProps) {
  return (
    <div className="flex flex-col items-start justify-between pb-6 sm:flex-row sm:items-center">
      <div>
        <h2 className="font-semibold text-gray-700">User Accounts</h2>
        <span className="text-xs text-gray-500">
          View accounts of registered users
        </span>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={onReload}
          className="flex items-center gap-2 rounded-lg bg-slate-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700"
        >
          <FiRefreshCw />
          <span className="hidden sm:inline">Reload</span>
        </button>
        <button
          onClick={onAddUser}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          <FiPlus />
          <span className="hidden sm:inline">Add User</span>
        </button>
      </div>
    </div>
  );
}
