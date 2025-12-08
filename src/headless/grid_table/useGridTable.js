import { use, useEffect, useState } from "react";

function useGridTable(fetchItemAPI) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchItems() {
    try {
      setError(null);
      setLoading(true);
      const result = await fetchItemAPI();
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

  return { items, loading, error, fetchItems };
}

export default useGridTable;
