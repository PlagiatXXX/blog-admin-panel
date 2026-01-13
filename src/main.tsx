import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <CssBaseline />
    <App />
    </BrowserRouter>
    </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
