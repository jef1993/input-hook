import { useState, useCallback } from "react";
import axios from "axios";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchTasks = useCallback((requestConfig = {}, applyData) => {
    setIsLoading(true);
    setError(null);
    axios(requestConfig)
      .then((response) => {
        if (response.data) {
          const data = response.data;
          applyData && applyData(data);
        }
      })
      .catch((err) => {
        setError(err.message || "Something went wrong!");
      })
      .finally((re) => {
        return;
      });
    setIsLoading(false);
  }, []);

  return { isLoading, fetchTasks, error };
};

export default useHttp;
