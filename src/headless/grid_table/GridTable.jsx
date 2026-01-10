import React from "react";
import { motion } from "framer-motion";
import useGridTable from "./useGridTable";

export default function GridTable({ customItems = [], CardComponent, fetchItemAPI = null, className, itemKey = "id",       // field to use as key
  cardProps = {} }) {
  const { items, loading, error, removeItem } = useGridTable(fetchItemAPI);
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-gray-600 text-lg">Loading stats...</p>
        </div>
      ) : error ? (
        <div className="mt-6 mb-6 bg-bgComponent rounded-lg shadow p-6">
          <p className="text-error text-center w-full">{error}</p>
        </div>
      ) : (
        <div className={`grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${className}`}>
          {(customItems.length > 0 ? customItems : items).map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <CardComponent
                item={item}
                removeItem={removeItem}   // pass down so card can call it
                {...cardProps}
               />
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}
