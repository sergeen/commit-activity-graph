import React, { useEffect, useState, createContext, ReactNode } from "react";
import axios from "axios";
import { CommitActivity } from "./types.ts";

const url = "https://api.github.com/repos/facebook/react/stats/commit_activity";

interface CommitActivityContextProps {
  data: CommitActivity[];
  loading: boolean;
}

export const CommitActivityContext = createContext<CommitActivityContextProps | undefined>(undefined);

interface CommitActivityContextProviderProps {
  children: ReactNode;
}

export const CommitActivityContextProvider: React.FC<CommitActivityContextProviderProps> = ({ children }) => {
  const [data, setData] = useState<CommitActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CommitActivity[]>(url);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <CommitActivityContext.Provider value={{ data, loading }}>
      {children}
    </CommitActivityContext.Provider>
  );
};
