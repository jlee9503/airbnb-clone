"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import favoritesHook from "../hooks/favoritesHook";
import { LoginUser } from "../types";

interface FavoriteButtonProps {
  listingId: string;
  currentUser?: LoginUser | null;
}

const FavoriteButton = ({ listingId, currentUser }: FavoriteButtonProps) => {
  const { hasFavorited, toggleFavorite } = favoritesHook({
    listingId,
    currentUser,
  });

  return (
    <div
      className="relative hover:opacity-80 transition cursor-pointer"
      onClick={toggleFavorite}
    >
      <AiOutlineHeart
        size={28}
        className="absolute -top-[2px] -right-[2px] fill-white"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-rose-500" : "fill-neutral-500"}
      />
    </div>
  );
};

export default FavoriteButton;
