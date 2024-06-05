import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from 'react';
import "./index.css";

// Lazy load the App component
const App = lazy(() => import('./App.tsx'));

// Placeholder for loading state
function Loading() {
  return <div>Loading...</div>;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<Loading />}>
    <Toaster />
    <App />
  </Suspense>
);
