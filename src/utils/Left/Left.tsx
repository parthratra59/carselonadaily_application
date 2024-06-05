import { lazy, Suspense } from "react";

// Lazy load the Leftdata component
const Leftdata = lazy(() => import("../../Components/Leftdata/Leftdata"));

const Left = () => {
    return (
      <>
        <div className="h-screen p-4">
          <h1 className="text-xl font-semibold">Categories</h1>

            <div>
            <Suspense fallback={<div>Loading...</div>}>
            <Leftdata />
          </Suspense>

            </div>

          
        </div>
      </>
    );
  }
  
  export default Left;
  