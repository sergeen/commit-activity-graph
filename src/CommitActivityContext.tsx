import React, { useEffect, useState, createContext} from "react";
import axios from "axios";

const url = "https://api.github.com/repos/facebook/react/stats/commit_activity";

export const CommitActivityContext = createContext({});

export const CommitActivityContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Using async/await because of readability
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <CommitActivityContext.Provider value={{ data, loading }}>{children}</CommitActivityContext.Provider>
  );
}

