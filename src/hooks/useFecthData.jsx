import { useEffect, useState } from "react";
import { token } from "../config";

const useFecthData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message + "error");
        }

        setData(result.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
        console.error("Fetch Error:", err);
      }
    };
    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};

export default useFecthData;
