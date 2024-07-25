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


export default function User({id, name, coverAmount, noButton = false}) {

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

  <ul>
    {users.map((user, id) => (
     <li key={id} className="bg-white my-4 w-full flex justify-between items-center bg-gray-300 shadow-md rounded-md"> 
           <div className="p-1 w-full flex justify-between">
             <span className="capitalize font-sans">{user.name}</span>
             <span>{user.coverAmount}</span>
     
            {
             !noButton &&
             <UserButton id={user.id} />
            } 
           </div>
           <button onClick={() => deleteUser(user.id)} className="font-sans ml-8 p-4 border-1-2 border-slate-900 hover:bg-slate-900 hover:text-white  w-16">Remove</button>
          </li>
     
    ))}
  </ul>
</div>
      
    )
}