"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { GrLanguage } from "react-icons/gr";
import loginModalHook from "../hooks/loginModelHook";
import UserProfile from "../UserProfile";
import MenuItem from "./MenuItem";

const Usermenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const loginModal = loginModalHook();

  function handleClickOutside(event: MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(event.target as Element)) {
      setIsOpen(false);
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((val) => !val);
  }, []);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold px-4 py-3 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={() => {}}
        >
          Airbnb your home
        </div>

        <div className="pr-2 lg:block hidden cursor-pointer">
          <GrLanguage />
        </div>

        <div ref={menuRef}>
          <div
            onClick={toggleMenu}
            className="border-[1px] border-neutral-200 p-4 md:px-2 md:py-1 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          >
            <AiOutlineMenu />
            <div className="hidden md:block">
              <UserProfile />
            </div>
          </div>
          {isOpen && (
            <div className="absolute rounded-xl shadow-md bg-white overflow-hidden text-sm w-[40vw] md:w-3/4 right-0 top-12">
              <div className="cursor-pointer">
                <MenuItem onClick={loginModal.onOpen} itemLabel="Sign up" />
                <MenuItem onClick={loginModal.onOpen} itemLabel="Log in" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Usermenu;
