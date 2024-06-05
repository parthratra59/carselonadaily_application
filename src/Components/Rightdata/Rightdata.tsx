import { useEffect, useState } from "react";
import axios from "axios";
import "./Rightdata.css";

interface Item {
  questions: string;
  shortAnswer: string;
  longAnswer: string;
  category: string;
  catgory_id: number;
  tags: string;
}

interface CatData {
  catgoryid: number;
  catgorynames: string;
}

const Rightdata = () => {
  const [cardData, setcardData] = useState<Item[]>([]);
  const [categoryid, setcategoryid] = useState<CatData[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const getcardData = async () => {
    try {
      const response = await axios.get("https://carselonadaily-application.onrender.com/api/v1/users/getAllFAQ");
      const data = await response.data.data;
      setcardData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleLongAnswer = (index: number) => {
    setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const getCategory = async () => {
    try {
      const response = await axios.get("https://carselonadaily-application.onrender.com/api/v1/users/categories");
      const data = await response.data.data;
      setcategoryid(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getcardData();
    getCategory();

    const intervalId = setInterval(() => {
      getcardData();
      getCategory();
    }, 5000);

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div>
      {cardData.map((item, index) => (
        <div key={index} className="right-data-item mt-6">
          <p className="mt-4 font-semibold question" onClick={() => toggleLongAnswer(index)}>{item.questions}</p>
          <div className="mt-4 text-gray-600 font-normal text-sm">
            {expandedIndex === index ? item.longAnswer : item.shortAnswer}
          </div>
          <div className="flex justify-between mt-6 mb-8">
            <div className="text-sm font-semibold">
              {categoryid.map(catdata => (
                catdata.catgoryid === item.catgory_id && (
                  <span key={catdata.catgoryid}>{catdata.catgorynames}</span>
                )
              ))}
            </div>
            <div className="tag-container">
              {item.tags.split(",").map((tag, tagIndex) => (
                <span key={tagIndex} className="tag">
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
          <hr style={{ border: "1px dashed #ccc" }} />
        </div>
      ))}
    </div>
  );
};

export default Rightdata;
