import Link from 'next/link'

import { useRouter } from 'next/navigation';

function Navbar({showLogin, showSignup, showLogout}:any) {

  const router = useRouter();

  return (
    <nav className="bg-yellow-500 p-4">
      <div className="container mx-auto flex flex-row justify-between items-center">
        <Link href="/" className="text-white text-xl font-black hover:text-red-500">Todo App</Link>
        <div>
          {showLogin && <Link href="/login" className="text-white mx-2 hover:text-red-500">Login</Link>}
          {showSignup && <Link href="/register" className="text-white mx-2 hover:text-red-500">Signup</Link>}
          {showLogout && <button onClick={function () {
            // localStorage.removeItem("token");
            return router.replace("/login");
          }} className="text-white border mx-2 hover:text-white hover:bg-red-500 py-2 px-4 rounded">Logout</button>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar