"use client";

// Import necessary modules
import Link from "next/link";
import Lottie from "lottie-web";
import { useEffect, useRef } from "react";

// Define the Home component
export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationInstance: any;

    const loadAnimation = () => {
      animationInstance = Lottie.loadAnimation({
        container: container.current!,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/todo-lottie.json",
      });
    };

    if (!animationInstance) {
      loadAnimation();
    }

    return () => {
      // Cleanup the animation when the component is unmounted
      if (animationInstance) {
        animationInstance.destroy();
      }
    };
  }, []);

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-yellow-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-white text-xl font-bold">Todo App</Link>
          <div>
              <Link href="/login" className="text-white mx-2">Login</Link>
              <Link href="/register" className="text-white mx-2">Signup</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex min-h-screen items-center justify-center lg:flex-row flex-col">
        <div className="lg:w-1/2 lg:order-1 order-2 p-6 lg:text-left text-center">
          <h1 className="lg:text-6xl md:text-5xl font-bold mb-2 text-4xl">
            Todo Task Manager
          </h1>
          <p className="text-gray-400 lg:text-2xl">
            Organize your tasks and boost your productivity!
          </p>
          <div className="flex gap-4 mt-4 justify-center lg:justify-start">
            <Link
              href={"/login"}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </Link>
            <Link
              href={"/register"}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Signup
            </Link>
          </div>
        </div>
        <div
          ref={container}
          className="lg:w-1/2 w-96 lg:order-2 order-1 my-4"
        ></div>
      </main>
    </div>
  );
}

