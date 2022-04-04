import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ErrorBoundary } from "react-error-boundary";
import "./index.css";
import App from "./App";
import ContextProviders from "./context/ContextProviders";
import reportWebVitals from "./reportWebVitals";

const isDevelopment = process.env.NODE_ENV === "development";

function ErrorFallback({ error }) {
  return (
    <div className="h-screen w-screen grid place-content-center bg-red-700">
      <div className="text-white flex justify-center flex-col items-center gap-4">
        <h1 className=" font-bold text-7xl">Ops! 🙁</h1>
        <p>
          Kesalahan tak terduga, mohon segera{" "}
          <a
            href="https://github.com/renomureza/muslimin/issues/new/choose"
            className="underline font-bold"
            target="_blank"
            rel="noopener noreferrer"
          >
            laporkan
          </a>
          .
        </p>
        {isDevelopment && (
          <pre className="max-w-5xl mx-auto whitespace-pre-wrap">
            <code>{`${error.message}\n\n${error.stack}`}</code>
          </pre>
        )}
      </div>
    </div>
  );
}

const queryCLient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <QueryClientProvider client={queryCLient}>
          <ContextProviders>
            <App />
          </ContextProviders>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals();
