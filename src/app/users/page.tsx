'use client';

import { useState, useEffect } from 'react'; 
import {
  FiEdit,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
} from 'react-icons/fi';
import toast from 'react-hot-toast';

import LoginModal from '@/components/auth/loginModal';
import ConfirmModal from '@/components/common/confirmModal';

import { useAppSelector, useAppDispatch } from '@/lib/redux/hook';
import { setToken } from '@/lib/redux/slices/authSlice';
import {
  fetchUsersFromAPI,
  deleteUserById,
} from '@/lib/redux/slices/usersSlice';
import Link from 'next/link';
import AddUserModal from '@/components/common/addUserModal';

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const { list: users, status: userStatus } = useAppSelector(
    state => state.users
  );

  useEffect(() => {

    if (isAuthenticated && users.length === 0) {
      dispatch(fetchUsersFromAPI());
    }
    // [isAuthenticated, users.length, dispatch] 
  }, [isAuthenticated, users.length, dispatch]);

  const [page, setPage] = useState(1);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const handleLoginSuccess = (token: string) => {
    dispatch(setToken(token));
    toast.success('Successfully logged in!');
  };

  const handleEdit = (userId: number) => {
    console.log('Edit user:', userId);
  };

  const openDeleteModal = (userId: number) => {
    setUserToDelete(userId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      dispatch(deleteUserById(userToDelete)); 
      toast.success('User successfully removed!');
      closeDeleteModal();
    }
  };

  if (!isAuthenticated) {
    return <LoginModal onLoginSuccess={handleLoginSuccess} />;
  }

  if (userStatus === 'loading') {
    return <div className="p-10 text-center">Loading user data...</div>;
  }

  const usersPerPage = 6;
  const totalPages = Math.ceil(users.length / usersPerPage);
  const paginatedUsers = users.slice(
    (page - 1) * usersPerPage,
    page * usersPerPage
  );

const [isAddModalOpen, setAddModalOpen] = useState(false);

  return (
    <>
      <div className="bg-slate-50 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
          <div className="flex items-center justify-between pb-6">
            <div>
              <h2 className="font-semibold text-gray-700">User Accounts</h2>
              <span className="text-xs text-gray-500">
                View accounts of registered users
              </span>
            </div>
            <button
              onClick={() => setAddModalOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              <FiPlus />
              <span>Add User</span>
            </button>
          </div>

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
                  {paginatedUsers.map((user, index) => (
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
                            onClick={() => handleEdit(user.id)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <FiEdit size={18} />
                          </button>
                          <button
                            onClick={() => openDeleteModal(user.id)}
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
            <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
              <span className="text-xs text-gray-600 sm:text-sm">
                Showing {(page - 1) * usersPerPage + 1} to{' '}
                {Math.min(page * usersPerPage, users.length)} of {users.length}{' '}
                Entries
              </span>
              <div className="inline-flex mt-2 sm:mt-0">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="flex items-center justify-center w-10 h-10 mr-1 text-sm font-semibold text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronLeft />
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className="flex items-center justify-center w-10 h-10 text-sm font-semibold text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isDeleteModalOpen && (
        <ConfirmModal
          title="Delete User"
          message="Are you sure you want to delete this user account? This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={closeDeleteModal}
        />
      )}
      {isAddModalOpen && (
        <AddUserModal
          onClose={() => setAddModalOpen(false)}
          onAddUser={newUser => {
            console.log('New user data:', newUser); 
            setAddModalOpen(false); 
          }}
        />
      )}
    </>
  );
}
