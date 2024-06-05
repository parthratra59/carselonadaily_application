import { X } from "lucide-react";
import { useState, useRef, KeyboardEvent,useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import "./Modal.css";


interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const [stepData, setStepData] = useState({
    questions: "",
    shortAnswer: "",
    longAnswer: "",
    tags: "",
    catgory_id:0
  });
  
  const [categoryid, setcategoryid] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);


  const [tags, setTags] = useState<string[]>([]);
  const inputRef = useRef<HTMLDivElement>(null);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === inputRef.current) {
      onClose();
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && stepData.tags) {
      e.preventDefault();
      setTags([...tags, stepData.tags]);
      setStepData({ ...stepData, tags: "" });
    }
  };


  
  const getCategory = async () => {
    setLoading1(true);
    toast.loading("Fetching categories...")
    try {
      const response = await axios.get("https://carselonadaily-application.onrender.com/api/v1/users/categories");
      
      const data = response.data.data;
      console.log("dfndsfj", data)
      setcategoryid(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }finally {
      toast.dismiss()
      setLoading1(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    console.log("dsfndsfj",e.target.value);
    setStepData({...stepData, catgory_id: Number(e.target.value) });
   
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading2(true);
    toast.loading("Submitting your question...");
    
    try {
      const response = await axios.post("https://carselonadaily-application.onrender.com/api/v1/users/createFAQ", {
        questions: stepData.questions,
        shortAnswer: stepData.shortAnswer,
        longAnswer: stepData.longAnswer,
        catgory_id: stepData.catgory_id,
        tags: tags,
      });
     await response.data.data;

      
     toast.success("Your question has been submitted successfully!");
      onClose();
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Something went wrong! Please try again later.");
    }finally{
      toast.dismiss()
      setLoading2(false);
    }
    


  }


  
  return (
    <>
      <div
        ref={inputRef}
        onClick={handleClose}
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center overflow-auto"
      >
        <div className="bg-white p-6 rounded-md shadow-md w-96 relative">
          <button className="absolute top-2 right-2" onClick={onClose}>
            <X size={30} className="text-black" />
          </button>
          <div className="flex flex-col gap-5 mt-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Question to ASK ? <span className="text-red-500">*</span>
                  <textarea
                    className="mt-1 p-2 block w-full border rounded-md outline-none shadow-sm text-black"
                    name="question"
                    value={stepData.questions}
                    onChange={(e) => {
                      setStepData({ ...stepData, questions: e.target.value });
                    }}
                    required
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Short Answer <span className="text-red-500">*</span>
                  <textarea
                    className="mt-1 p-2 block w-full border rounded-md outline-none shadow-sm text-black"
                    name="shortAnswer"
                    value={stepData.shortAnswer}
                    onChange={(e) => {
                      setStepData({ ...stepData, shortAnswer: e.target.value });
                    }}
                    required
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Long Answer <span className="text-red-500">*</span>
                  <textarea
                    className="mt-1 p-2 block w-full border rounded-md outline-none shadow-sm text-black"
                    name="longAnswer"
                    value={stepData.longAnswer}
                    onChange={(e) => {
                      setStepData({ ...stepData, longAnswer: e.target.value });
                    }}
                    required
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Category <span className="text-red-500">*</span>
                  <select
                    className="mt-1 p-2 block w-full border rounded-md outline-none shadow-sm text-black"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    required
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categoryid.map((category: any) => (
                      <option key={category.id} value={category.catgoryid}>
                        {category.catgorynames}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Tags <span className="text-red-500">*</span>
                  <div className="taginput flex items-center flex-wrap border rounded-md p-2">
                    {tags.map((item, index) => {
                      return (
                        <button key={index} className="tag flex items-center ">
                          <span className="p-1">{item}</span>
                          <span>
                            <X size={16} onClick={() => removeTag(index)} />
                          </span>
                        </button>
                      );
                    })}
                    <input
                      type="text"
                      style={{
                        display: "block",
                      }}
                      className="flex-1 min-w-[100px] mt-1 p-2 outline-none text-black"
                      placeholder="Tags"
                      name="tags"
                      value={stepData.tags}
                      onChange={(e) => {
                        setStepData({ ...stepData, tags: e.target.value });
                      }}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                </label>
              </div>

              <button
                className="mt-4 w-full flex items-center justify-center gap-2 px-5 py-3
                font-medium rounded bg-black text-white"
              >
                Send Data
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
