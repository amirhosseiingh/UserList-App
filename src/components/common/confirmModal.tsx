'use client';

import { FiAlertTriangle } from 'react-icons/fi';

interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isConfirming?: boolean;
}

export default function ConfirmModal({
  title,
  message,
  onConfirm,
  onCancel,
  isConfirming = false,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full flex flex-col max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-scale-in">
        <div className="flex flex-col justify-center items-center">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
            <FiAlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div className="ml-4 flex flex-col justify-center items-center mt-3">
            <h3 className="text-lg font-bold text-slate-800">{title}</h3>
            <p className="mt-2 text-sm text-slate-500 text-center">{message}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-center items-center gap-3 ">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isConfirming}
            className="rounded-lg border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-red-400"
          >
            {isConfirming ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
