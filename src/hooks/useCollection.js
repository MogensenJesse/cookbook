import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const useCollection = (c, filterObject = {}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let unsub;
    let ref = collection(db, c);
    const filters = Object.entries(filterObject);
    if (filters.length === 0) {
      unsub = onSnapshot(ref, (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setData(results);
      });
    } else {
      const queries = filters.map(([field, value]) =>
        // where(field, "in", [value])
        query(ref, where(field, "in", value))
      );
      // let searchQuery = query(ref, ...whereStatements);
      unsub = onSnapshot(...queries, (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setData(results);
      });
    }

    return () => unsub();
  }, [c, JSON.stringify(filterObject)]);
  // console.log(data);

  if (!data) return null;
  return data;
};
export default useCollection;
