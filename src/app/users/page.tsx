// src/app/users/page.tsx
'use client';

import { useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { useDeleteUser } from '@/hooks/useDeleteUser';
import {
  FiEdit,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import LoginModal from '@/components/auth/loginModal';
import ConfirmModal from '@/components/common/confirmModal';
import { useAppSelector, useAppDispatch } from '@/lib/redux//hook';
import { setToken } from '@/lib/redux/slices/authSlice';
import toast from 'react-hot-toast';

export default function UsersPage() {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  // State های جدید برای مدیریت مودال حذف
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useUsers(page);
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const handleLoginSuccess = (token: string) => {
    dispatch(setToken(token));
    toast.success('Successfully logged in!');
  };

  const handleEdit = (userId: number) => {
    console.log('Edit user:', userId);
  };

  // وقتی روی دکمه سطل زباله کلیک می‌شود
  const openDeleteModal = (userId: number) => {
    setUserToDelete(userId);
    setDeleteModalOpen(true);
  };

  // وقتی روی دکمه کنسل در مودال کلیک می‌شود
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setUserToDelete(null);
  };

  // وقتی روی دکمه تایید در مودال کلیک می‌شود
  const confirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete, {
        onSuccess: () => {
          closeDeleteModal(); // در صورت موفقیت، مودال را ببند
        },
      });
    }
  };

  if (!isAuthenticated) {
    return <LoginModal onLoginSuccess={handleLoginSuccess} />;
  }

  if (isLoading) {
    return <div className="p-10 text-center">Loading users...</div>;
  }
  if (isError) {
    return (
      <div className="p-10 text-center text-red-500">
        Error: {error.message}
      </div>
    );
  }
  if (!data) {
    return <div className="p-10 text-center">No users found.</div>;
  }

  return (
    <>
      <div className="bg-slate-50 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
          {/* ... کد هدر و جدول بدون تغییر ... */}
          <div className="flex items-center justify-between pb-6">
            <div>
              <h2 className="font-semibold text-gray-700">User Accounts</h2>
              <span className="text-xs text-gray-500">
                View accounts of registered users
              </span>
            </div>
          </div>
          <div className="overflow-y-hidden rounded-lg border">
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* ... thead ... */}
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
                  {data.data.map((user, index) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      {/* ... td ها ... */}
                      <td className="border-b border-gray-200 bg-white px-5 py-4 text-sm">
                        <p className="whitespace-nowrap">
                          {data.per_page * (page - 1) + index + 1}
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
                        <p className="whitespace-nowrap font-medium">{`${user.first_name} ${user.last_name}`}</p>
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
                            onClick={() => openDeleteModal(user.id)} // تابع جدید را اینجا فراخوانی کن
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
            {/* ... کد صفحه‌بندی ... */}
            <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
              <span className="text-xs text-gray-600 sm:text-sm">
                Showing {data.per_page * (page - 1) + 1} to{' '}
                {Math.min(data.per_page * page, data.total)} of {data.total}{' '}
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
                  disabled={page === data.total_pages}
                  className="flex items-center justify-center w-10 h-10 text-sm font-semibold text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* مودال را اینجا به صورت شرطی رندر می‌کنیم */}
      {isDeleteModalOpen && (
        <ConfirmModal
          title="Delete User"
          message="Are you sure you want to delete this user account? This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={closeDeleteModal}
          isConfirming={isDeleting}
        />
      )}
    </>
  );
}
