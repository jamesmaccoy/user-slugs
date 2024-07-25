'use client'
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDoc,
  querySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  documentId,
} from 'firebase/firestore';
import { db } from '../firebase'
import UserButton from './UserButton';



export default function Details({id, name, coverAmount, noButton = false, premium, category, image}) {

    const [users, setUsers] = useState([]);
      const [newUser, setNewUser] = useState({ name: '', coverAmount: '' });
      const [total, setTotal] = useState(0);
    
    
       // Read items from database
       useEffect(() => {
        const q = query(collection(db, 'users'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let usersArr = [];
    
          querySnapshot.forEach((doc) => {
            usersArr.push({ ...doc.data(), id: doc.id });
          });
          setUsers(usersArr);
    
          // Read total from itemsArr
          const calculateTotal = () => {
            const totalPrice = usersArr.reduce(
              (sum, user) => sum + parseFloat(user.price),
              0
            );
            setTotal(totalPrice);
          };
          calculateTotal();
          return () => unsubscribe();
        });
      }, []);
    
      // Delete items from database
      const deleteUser = async (id) => {
        await deleteDoc(doc(db, 'users', id));
      };
    
      useEffect(() => {
        setTotal(users.reduce((acc, user) => acc + user.coverAmount, 0));
      }, [users]);

    return (
             
        
<div className="bg-gray-200 p-4 rounded-lg">


    {/* Only show the first product */}
    {users.length > 0 && (
      <div key={id} className="bg-white p-2 my-4 w-full flex justify-between items-center flex-col bg-gray-300 shadow-md rounded-md"> 
          <span>{image}</span>
          <main className="bg-gray-900 p-4 rounded-lg flex items-left w-full">
           
           <h1 className=" text-white p-2 rounded-md text-2xl font-bold">{coverAmount}</h1></main>
           <div className="p-4 w-1/4 flex flex-col items-left justify-between flex-wrap ">
             <span className="capitalize font-sans w-ful ">{name}</span>
      
            
             <span className="font-sans">{premium}</span>
             <span>{category}</span>
     
            {
             !noButton &&
             <UserButton id={id} />
            } 
           </div>
           <button onClick={() => deleteUser(id)} className="font-sans ml-8 p-4 border-1-2 border-slate-900 hover:bg-slate-900 hover:text-white  w-16">Remove</button>
          </div>
    )}
  
</div>
      
    )
}