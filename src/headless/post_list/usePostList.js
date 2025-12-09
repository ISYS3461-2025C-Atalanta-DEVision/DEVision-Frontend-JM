import { useState, useEffect } from "react";

function usePostList(fetchItemAPI, company_Id) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState([]);

  async function fetchItems() {
    try {
      setError(null);
      setLoading(true);
      const result = await fetchItemAPI(company_Id);
      console.log("Fetched items:", result);
      setItems(result);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return { items, loading, error, fetchItems, filter, setFilter };
}

export default usePostList;
