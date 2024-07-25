'use client'
import { useRouter } from 'next/navigation'

export default function UserButton({ slug }) {
    const router = useRouter()

    function handleClick() {
        router.push(`/users/${slug}`)
    }

    return (
        <button onClick={handleClick} className="bg-[#009DE0] hover:bg-blue-700 text-white font-bold font-sans py-2 px-4 rounded">
            View
        </button>
    )
}