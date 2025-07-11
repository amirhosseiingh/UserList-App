'use client';

import { useParams } from 'next/navigation';
import { useAppSelector } from '@/lib/redux/hook';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function UserDetailPage() {
  const params = useParams();
  const userId = Number(params.id); 
  const user = useAppSelector(state =>
    state.users.list.find(u => u.id === userId)
  );

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-100">
        {/* <h2 className="text-2xl font-bold text-slate-700">user not found!</h2> */}
        <Link href="/users" className="mt-4 text-blue-600 hover:underline">
          go back to user list
        </Link>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 text-center animate-scale-in" >
        <img
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-blue-500 "
        />
        <h1 className="text-3xl font-bold text-slate-800">{`${user.first_name}  ${user.last_name}`} </h1>
        <p className="text-slate-500 text-lg mt-2">{user.email}</p>

        <Link
          href="/users"
          className="inline-flex items-center gap-2 mt-8 bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
        >
          <FiArrowLeft />
          <span>Back to List</span>
        </Link>
      </div>
    </div>
  );
}
