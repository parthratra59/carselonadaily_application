import { useEffect, useState, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import "./Right.css"
import { lazy, Suspense } from "react";
const Modal = lazy(() => import("../Modal/Modal"));
const Rightdata = lazy(() => import("../../Components/Rightdata/Rightdata"));

interface SearchResult {
  questions: string;
  tags: string;
}

const Right: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false); 
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setShowDropdown(e.target.value.trim() !== ""); 
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://carselonadaily-application.onrender.com/api/v1/users/searching?searchTerm=${value}`
        );

        setSearchResults(response.data.data);
      } catch (error) {
        console.error("API error:", error);
        // Handle errors
      }
    };

    const timer = setTimeout(() => {
      if (value.trim() !== "") {
        fetchData();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = () => {
    setShowDropdown(false);
  
  };

  // Function to truncate text to a certain number of words
  const truncateText = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  return (
    <>
      <div className="flex justify-between items-center mt-4 relative">
        <p className="ml-2 text-xl font-semibold">Carselonadaily</p>
        <div className="flex relative">
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
              onChange={handleChange}
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
          <div className="absolute w-full mt-10">
            {showDropdown && (
              <div
                className="dropdown-container" // Added dropdown container class
                ref={dropdownRef}
              >
                <div
                  className="bg-white p-2 shadow-md rounded w-full z-50 border border-gray-300 rounded-b-lg"
                  style={{ position: "absolute", top: "100%", left: 0 }} 
                >
                  <Suspense fallback={<div>Loading data...</div>}>
                    {searchResults.length > 0 ? (
                      <ul>
                        {searchResults.map((result, index) => (
                          <li
                            key={index}
                            className={
                              index !== 0
                                ? "border-t border-gray-300 cursor-pointer"
                                : "cursor-pointer"
                            }
                            onClick={handleItemClick}
                            
                          >
                            <div>
                              <p>{truncateText(result.questions, 10)}</p>
                              <p className="tags">{truncateText(result.tags, 5)}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-center">Not Found</p>
                    )}
                  </Suspense>
                </div>
              </div>
            )}
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
