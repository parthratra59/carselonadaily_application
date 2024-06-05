import { useState} from "react";
import { IoIosSearch } from "react-icons/io";
import { lazy,Suspense } from "react";
const Modal = lazy(() => import("../Modal/Modal"));
const Rightdata = lazy(() => import("../../Components/Rightdata/Rightdata"));

const Right = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlechange=(e:any)=>{
    console.log(e.target.value)
    
  }

  return (
    <>
      <div className="flex justify-between items-center mt-4">
        <p className="ml-2 text-xl font-semibold">Carselonadaily</p>
        <div className="flex">
          <button
            className="text-black bg-white w-28 font-semibold border border-gray-300 rounded p-1 ml-4 mr-2"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Add Faqs
          </button>
          <div className="relative flex items-center">
            <IoIosSearch
              style={{
                position: "absolute",
                left: "10px",
                color: "gray",
                fontSize: "20px",
                cursor: "pointer",
              }}
            />
            <input
              type="text"
              placeholder="Search"
              className="border rounded pl-10 pr-28 py-1 outline-none"
              onChange={handlechange}
            />
            <span
              style={{
                position: "absolute",
                right: "10px",
                color: "gray",
                fontSize: "12px",
                pointerEvents: "none",
              }}
            >
              Ctrl+Shift+/
            </span>
          </div>
        </div>
      </div>
      <div>
        <div className="mt-10 mb-6 ml-4">
        <Suspense fallback={<div>Loading data...</div>}>
            <Rightdata />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<div>Loading modal...</div>}>
        {isModalOpen && (
          <Modal
            onClose={() => {
              setIsModalOpen(false);
            }}
          />
        )}
      </Suspense>
    </>
  );
};

export default Right;
