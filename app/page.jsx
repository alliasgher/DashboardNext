import Nav from "@/components/nav"
import Link from "next/link"

const Home = () => {
  return (
    <div>
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">CRUD Dashboard</h1>
      <p className="py-6">Click below to add a user.</p>
      <button className="btn btn-primary">
        <Link href='/form'>Start</Link>
      </button>
    </div>
  </div>
</div>
</div>
  )
}

export default Home