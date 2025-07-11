'use client';

import { useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react'; 
import { store, persistor } from '@/lib/redux/store'; 

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null}  persistor={persistor} >
        <QueryClientProvider client={queryClient} >
         {children}
        </QueryClientProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
