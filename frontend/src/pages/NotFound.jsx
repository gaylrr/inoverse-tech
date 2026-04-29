import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-amalfi flex flex-col items-center justify-center text-white text-center px-6">
      <h1 className="text-9xl font-bold text-citrus">404</h1>
      <h2 className="text-3xl font-semibold mt-4 mb-2">Page Not Found</h2>
      <p className="text-breeze mb-8 max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-citrus text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition"
      >
        Back to Home
      </Link>
    </div>
  )
}