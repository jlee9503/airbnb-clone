"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { GrLanguage } from "react-icons/gr";
import signinModalHook from "../../hooks/signInModalHook";
import LogInModalHook from "@/app/hooks/loginInModalHook";
import UserProfile from "../UserProfile";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import { LoginUser } from "@/app/types";
import HostModalHook from "@/app/hooks/hostModalHook";
import { useRouter } from "next/navigation";

interface UsermenuProps {
  currentUser?: LoginUser | null;
}

const Usermenu = ({ currentUser }: UsermenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const signinModal = signinModalHook();
  const loginModal = LogInModalHook();
  const hostModal = HostModalHook();

  const router = useRouter();

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

  const hostAirbnb = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    // Open host page
    hostModal.onOpen();
  }, [currentUser, loginModal, hostModal]);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold px-4 py-3 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={hostAirbnb}
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
              <UserProfile imgSrc={currentUser?.image} />
            </div>
          </div>
          {isOpen && (
            <div className="absolute rounded-xl shadow-md bg-white overflow-hidden text-sm w-[40vw] md:w-3/4 right-0 top-12">
              <div className="cursor-pointer">
                {currentUser ? (
                  <>
                    <MenuItem
                      onClick={() => router.push("/trips")}
                      itemLabel="My trips"
                    />
                    <MenuItem
                      onClick={() => router.push("/favorites")}
                      itemLabel="My favorites"
                    />
                    <MenuItem
                      onClick={() => router.push("/reservations")}
                      itemLabel="My reservations"
                    />
                    <MenuItem
                      onClick={() => router.push("/properties")}
                      itemLabel="My properties"
                    />
                    <MenuItem onClick={hostAirbnb} itemLabel="Airbnb my home" />
                    <hr />
                    <MenuItem onClick={() => signOut()} itemLabel="Logout" />
                  </>
                ) : (
                  <>
                    <MenuItem
                      onClick={signinModal.onOpen}
                      itemLabel="Sign up"
                    />
                    <MenuItem onClick={loginModal.onOpen} itemLabel="Log in" />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Usermenu;
