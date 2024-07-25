import User from '../components/User'
import { Hind_Vadodara } from 'next/font/google';

const hind_vadodara = Hind_Vadodara({ subsets: ['latin'],weight: '400', variable: '--font-hind-vadodara' })

async function getUsers(){
    const 
}

export default function UsersPage() {
  return (
    <div className={hind_vadodara.className}>
      <User />
    </div>
  )
},
