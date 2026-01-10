import { useEffect, useState } from "react";

function useGridTable(fetchItemAPI) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchItems() {
    if (! fetchItemAPI) return;
    try {
      setError(null);
      setLoading(true);
      const result = await fetchItemAPI();
      setItems(result);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

    // Remove from local state by id
  function removeItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return { items, loading, error, fetchItems };
}

export default useGridTable;
