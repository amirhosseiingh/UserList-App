'use client';

import { useState } from 'react';
import { User } from '@/lib/api';

interface AddUserModalProps {
  onClose: () => void;
  onAddUser: (newUser: Omit<User, 'id'>) => void;
}

export default function AddUserModal({
  onClose,
  onAddUser,
}: AddUserModalProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !avatar) {
      alert('Please fill all fields');
      return;
    }
    onAddUser({
      first_name: firstName,
      last_name: lastName,
      email: email,
      avatar: avatar,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-scale-in">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="url"
              placeholder="Avatar URL"
              value={avatar}
              onChange={e => setAvatar(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
