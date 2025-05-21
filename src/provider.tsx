import { persistor, store } from './redux/store';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider as ReduxProvider } from 'react-redux';
import React from 'react';
import {HeroUIProvider} from "@heroui/react";
import {ToastProvider} from "@heroui/toast";
import {ThemeProvider} from "next-themes";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HeroUIProvider>
            <ToastProvider toastProps = {{
          variant: "flat",
          radius: "sm",
          timeout: 1000,
          shouldShowTimeoutProgress: true,
          
        }}
        placement='top-center' />
        <ThemeProvider attribute='class' defaultTheme='light'>
            {children}
        </ThemeProvider>
          </HeroUIProvider>
        </PersistGate>
      </ReduxProvider>
  );
}