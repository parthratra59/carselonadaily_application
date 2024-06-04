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
  const [cardData, setcardData] = useState([]);
  const [categoryid, setcategoryid] = useState([]);

  const getcardData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/users/getAllFAQ"
      );
     
      const data = await response.data.data;
      setcardData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/users/categories"
      );
    
      const data = await response.data.data;
      setcategoryid(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getcardData();
    getCategory();
  }, [cardData,categoryid]);

  return (
    <div>
      {cardData.map((item: Item, key) => {
        return (
          <>
            <div key={key} className="right-data-item mt-6">
              <p className="mt-4 font-semibold">{item.questions}</p>
              <div className="mt-4 text-gray-600 font-normal text-sm">
                {item.shortAnswer}
              </div>
              <div className="flex justify-between mt-6 mb-8">
                <div className="text-sm font-semibold">
                  {categoryid.map((catdata: CatData) => {
                    return catdata.catgoryid === item.catgory_id
                      ? catdata.catgorynames
                      : [];
                  })}
                </div>
                <div className="tag-container">
                  {item.tags.split(",").map((tag, index) => (
                    <span key={index} className="tag">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
              
                <hr style={{ border: "1px dashed #ccc" }} />
              
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Rightdata;
