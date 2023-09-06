"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { LoginUser } from "../types";

interface FavoriteButtonProps {
  listingId: string;
  currentUser?: LoginUser | null;
}

const FavoriteButton = ({ listingId, currentUser }: FavoriteButtonProps) => {
  const selectedFavorite = false;
  const toggleButton = () => {};

  return (
    <div
      className="relative hover:opacity-80 transition cursor-pointer"
      onClick={toggleButton}
    >
      <AiOutlineHeart
        size={28}
        className="absolute -top-[2px] -right-[2px] fill-white"
      />
      <AiFillHeart
        size={24}
        className={selectedFavorite ? "fill-rose-500" : "fill-neutral-500"}
      />
    </div>
  );
};

export default FavoriteButton;
