'use client';

import { useState, useEffect } from 'react';
import {
  FiEdit,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiRefreshCw,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import LoginModal from '@/components/auth/loginModal';
import ConfirmModal from '@/components/common/confirmModal';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hook';
import { setToken } from '@/lib/redux/slices/authSlice';
import {
  fetchUsersFromAPI,
  deleteUserById,
  addUser,
  updateUser,
} from '@/lib/redux/slices/usersSlice';
import Link from 'next/link';
import AddUserModal from '@/components/common/addUserModal';
import { User } from '@/lib/api';
import EditUserModal from '@/components/common/editUserModal';
import LoadingSpinner from '@/components/common/loadingSpinner';
import UserTable from '@/components/user/userTable';
import UserPageHeader from '@/components/user/userPageHeader';
import Pagination from '@/components/common/pagination';

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
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  // login
  const handleLoginSuccess = (token: string) => {
    dispatch(setToken(token));
    toast.success('Successfully logged in');
  };
  if (!isAuthenticated) {
    return <LoginModal onLoginSuccess={handleLoginSuccess} />;
  }

  // edit
  const handleEdit = (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setUserToEdit(user);
      setEditModalOpen(true);
    }
  };

  // delete
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
      toast.success('user successfully removed');
      closeDeleteModal();
    }
  };
  const handleReload = () => {
    dispatch(fetchUsersFromAPI());
  };

  if (userStatus === 'loading') {
    return (
      <div className="p-10 text-center">
        <LoadingSpinner />
      </div>
    );
  }

  const usersPerPage = 6;
  const totalPages = Math.ceil(users.length / usersPerPage);
  const paginatedUsers = users.slice(
    (page - 1) * usersPerPage,
    page * usersPerPage
  );

  return (
    <>
      <div className="bg-slate-50 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
          <UserPageHeader
            onAddUser={() => setAddModalOpen(true)}
            onReload={handleReload}
          />
          <UserTable
            users={paginatedUsers}
            page={page}
            usersPerPage={usersPerPage}
            onEdit={handleEdit}
            onDelete={openDeleteModal}
          />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalEntries={users.length}
            entriesPerPage={usersPerPage}
            onPageChange={newPage => setPage(newPage)}
          />
        </div>
      </div>
      {isDeleteModalOpen && (
        <ConfirmModal
          title="Delete User"
          message="are you sure you want to delete this user account? This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={closeDeleteModal}
        />
      )}
      {isAddModalOpen && (
        <AddUserModal
          onClose={() => setAddModalOpen(false)}
          onAddUser={newUserData => {
            dispatch(addUser(newUserData));
            toast.success('user added successfully');
            setAddModalOpen(false);
          }}
        />
      )}
      {isEditModalOpen && (
        <EditUserModal
          user={userToEdit}
          onClose={() => setEditModalOpen(false)}
          onUpdateUser={updatedUser => {
            dispatch(updateUser(updatedUser));
            toast.success('user updated successfully');
            setEditModalOpen(false);
          }}
        />
      )}
    </>
  );
}
