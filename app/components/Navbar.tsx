import Link from 'next/link'

function Navbar() {
  return (
    <nav className="bg-yellow-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-white text-xl font-black hover:text-red-500">Todo App</Link>
          <div>
              <Link href="/login" className="text-white mx-2 hover:text-red-500">Login</Link>
              <Link href="/register" className="text-white mx-2 hover:text-red-500">Signup</Link>
          </div>
        </div>
      </nav>
  )
}

export default Navbar