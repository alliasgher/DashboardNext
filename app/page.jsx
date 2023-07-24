'use client'


import { useRouter } from "next/navigation"

const Home = () => {
  const router = useRouter()
  return (
    <div>
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold p-4">CRUD Dashboard</h1>
      <div className="flex flex-col w-full border-opacity-50">
  <div className="grid h-20 card bg-blue-300 rounded-box place-items-center btn p-4" onClick={() => {router.push("form")}}>Click to add a user.</div>
  <div className="divider">OR</div>
  <div className="grid h-20 card bg-green-300 rounded-box place-items-center btn p-4" onClick={() => {router.push("form/users")}}>Click to see exisiting users.</div>
</div>
    </div>
  </div>
</div>
</div>
  )
}

export default Home