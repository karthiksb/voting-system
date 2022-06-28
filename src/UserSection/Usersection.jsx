import React from "react";

import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";
export default function Usersection() {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  useEffect(() => {
    async function getData() {
      const subColRef = collection(db, "Admin", "mp election", "candidates");
      const querySnapshot = await getDocs(subColRef);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        setData(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    }

    getData();
  }, []);

  async function addVote() {
    const docRef = doc(
      db,
      "Admin",
      "mp election",
      "candidates",
      selectedData.id
    );

    setDoc(docRef, {
      NoOfVotes: parseInt(selectedData.NoOfVotes + 1),
      Name: selectedData.Name,
      Party: selectedData.Party,
    });
  }

  function select(post) {
    setSelectedData(post);
  }

  console.log(selectedData.id);
  return (
    <div>
      <h1>add your vote</h1>
      {data.map((post) => {
        return (
          <div
            onClick={() => select(post)}
            className="bg-[#333]  mt-5 p-10 rounded-md"
          >
            <h1 className="text-2xl text-gray-300">{post.Name}</h1>
            <h1 className="text-2xl text-gray-300">{post.id}</h1>
            <p className="text-gray-400 my-6">{post.Party}</p>
          </div>
        );
      })}

      <button onClick={addVote}>Add Vote</button>
    </div>
  );
}
