'use client';

import { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useLogin } from '@/hooks/useLogin'; 
import LoadingSpinner from '../common/loadingSpinner';

interface LoginModalProps {
  onLoginSuccess: (token: string) => void;
}

export default function LoginModal({ onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('eve.holt@reqres.in'); 
  const [password, setPassword] = useState('cityslicka'); 

  const { mutate: performLogin, isPending, isError } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performLogin(
      { email, password },
      {
        onSuccess: data => {
          onLoginSuccess(data.token);
        },
        onError: error => {
          toast.error(`Login failed: ${error.message}`);
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
          <p className="text-gray-500 text-sm mt-1">
            Please enter your credentials to log in.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors flex items-center justify-center gap-2 disabled:bg-blue-400"
            >
              {isPending ? (
                <span><LoadingSpinner/></span>
              ) : (
                <>
                  <FiLogIn />
                  <span>Log In</span>
                </>
              )}
            </button>
          </div>
          {isError && (
            <p className="text-red-500 text-xs text-center mt-4">
              Invalid email or password.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
