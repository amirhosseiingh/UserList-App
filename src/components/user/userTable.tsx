import { User } from '@/lib/api';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';

interface UserTableProps {
  users: User[];
  page: number;
  usersPerPage: number;
  onEdit: (userId: number) => void;
  onDelete: (userId: number) => void;
}

export default function UserTable({
  users,
  page,
  usersPerPage,
  onEdit,
  onDelete,
}: UserTableProps) {
  return (
    
    <div className="overflow-y-hidden rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
              <th className="px-5 py-3">#</th>
              <th className="px-5 py-3">Avatar</th>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {users.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border-b border-gray-200 bg-white px-5 py-4 text-sm">
                  <p className="whitespace-nowrap">
                    {(page - 1) * usersPerPage + index + 1}
                  </p>
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-4 text-sm">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img
                      className="h-full w-full rounded-full"
                      src={user.avatar}
                      alt="User Avatar"
                    />
                  </div>
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-4 text-sm">
                  <Link
                    href={`/users/${user.id}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    <p className="whitespace-nowrap font-medium">{`${user.first_name} ${user.last_name}`}</p>
                  </Link>
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-4 text-sm">
                  <p className="whitespace-nowrap">{user.email}</p>
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-4 text-sm">
                  <div className="flex justify-center items-center gap-4">
                    <button
                      onClick={() => onEdit(user.id)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
