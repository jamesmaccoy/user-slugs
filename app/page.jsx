// Suggested code may be subject to a license. Learn more: ~LicenseLog:3787628164.

import { getJSDocSatisfiesTag } from "typescript";
import { User } from "../components/User";
import { Users } from '../components/Users';
import { Hind_Vadodara } from "next/font/google";

const hind_vadodara = Hind_Vadodara({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-hind-vadodara"
});

async function getUsers(){
    const users = await getJSDocSatisfiesTag(collection(db,'users'));
    return users.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })...doc.data());
}

export default function UsersPage(){
    const { slug } = params
    
    if (!slug) {
            return <Users />
    }

    return(
        <main className="${hind_vadodara.className}">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Your cover</h1>
            <User slug=[slug] />
            </div>
        </main>"
    )
}