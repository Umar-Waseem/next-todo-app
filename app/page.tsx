"use client";

// Import necessary modules
import Link from "next/link";
import Image from "next/image";
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
    <section>
      {/* <nav className="bg-yellow-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-white text-xl font-black hover:text-red-500">Todo App</Link>
          <div>
              <Link href="/login" className="text-white mx-2 hover:text-red-500">Login</Link>
              <Link href="/register" className="text-white mx-2 hover:text-red-500">Signup</Link>
          </div>
        </div>
      </nav> */}

      {/* Main Content */}
      <main className="flex min-h-screen items-center justify-center lg:flex-row flex-col">
        <div className="lg:w-1/2 lg:order-1 order-2 p-6 lg:text-left text-center">
          <h1 className="lg:text-6xl md:text-5xl font-bold mb-2 text-4xl">
            Todo Task Manager
          </h1>
          <p className="text-gray-400 lg:text-2xl">
            Organize your tasks and boost your productivity!
          </p>
          <div className="flex gap-4 mt-8 justify-center lg:justify-start">
            <Link
              href={"/login"}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded flex flex-row justify-center items-center"
            >
            <Image src="/login.svg" width={20} height={20} alt={"login-icon"} className="mr-2"/>
              Login
            </Link>
            <Link
              href={"/register"}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded flex flex-row justify-center items-center"
            >
              <Image src="/signup.svg" width={20} height={20} alt={"signup-icon"} className="mr-2"/>
              Signup
            </Link>
          </div>
        </div>
        <div
          ref={container}
          className="lg:w-1/2 w-96 lg:order-2 order-1 my-4"
        ></div>
      </main>
    </section>
  );
}

