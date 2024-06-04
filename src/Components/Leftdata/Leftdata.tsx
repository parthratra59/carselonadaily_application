import { useState, useEffect } from "react";
import axios from "axios";

interface Item {
  catgorynames: string;
  question_count: number;
}

const Leftdata = () => {
  const [datas, setdatas] = useState<Item[]>([]);
  const [intervalMs] = useState(2000); 

  const fetchingCategory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/users/categorylisting"
      );
      const newdata = await res.data.data;
      setdatas(newdata);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchingCategory(); 

    const intervalId = setInterval(() => {
      fetchingCategory(); 
    }, intervalMs);

    return () => clearInterval(intervalId); 
  }, [intervalMs]);

  return (
    <>
      <div className="mt-12">
        {datas.map((item: Item, index: number) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center">
              <p className="text-gray-500">{item.catgorynames}</p>
            </div>
            <div className="flex items-center">
              <p className="text-gray-500">{item.question_count}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Leftdata;
