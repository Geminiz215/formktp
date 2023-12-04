import clsx from "clsx";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(true);

  const handler = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Fragment>
      <nav
        className={clsx(
          "fixed w-full h-24 shadow-xl",
          isScrolled ? "opacity-100 bg-white" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex justify-between sm:justify-start   items-center h-full 2xl:px16">
          <Link href="" className=" p-5 ">
            <p className="text-red-900 text-[26px] font-semibold">GERINDRA</p>
            <p className="text-[10px] w-max -tracking-widest">
              {" "}
              GERINDRA GERAKAN INDONESIA RAYA
            </p>
          </Link>
          <div className="hidden sm:flex mx-5">
            <input
              type="text"
              placeholder="search"
              className="block w-[100%] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div onClick={handler} className="sm:hidden cursor-pointer pr-5">
            {menuOpen ? (
              <AiOutlineClose size={25} />
            ) : (
              <AiOutlineMenu size={25} />
            )}
          </div>
        </div>
        <div
          className={
            menuOpen
              ? " w-[65%] sm:hidden h-screen bg-white ease-in duration-200"
              : "-translate-x-full top-10 w-[65%] ease-out duration-200 pointer-events-none"
          }
        >
          <div className="w-full flex flex-row h-screen justify-between p-8">
            {/* <div onClick={handler} className="cursor-pointer">
            <AiOutlineClose size={25} />
          </div> */}
            <div className="pt-6">
              <ul className="mt-3">
                <Link href="" className="my-10">
                  <li className="ml-10 uppercase hover:border-b text-xl my-5">
                    Todo list
                  </li>
                  <li className="ml-10 uppercase hover:border-b text-xl my-5">
                    ABOUT
                  </li>
                  <li className="ml-10 uppercase hover:border-b text-xl my-5">
                    US
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}
