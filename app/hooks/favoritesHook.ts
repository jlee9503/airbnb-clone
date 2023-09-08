/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { LoginUser } from "@/app/types";
import LogInModalHook from "./loginInModalHook";

interface IFavoritesHook {
  listingId: string;
  currentUser?: LoginUser | null;
}

const favoritesHook = ({ listingId, currentUser }: IFavoritesHook) => {
  const router = useRouter();
  const loginModal = LogInModalHook();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      // if no user is signed in, open login modal
      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success(hasFavorited ? "Selected place has been removed" : "Successfully added");
      } catch (err: any) {
        toast.error("Error occured: " + err);
      }
    },
    [currentUser, hasFavorited, router, listingId, loginModal]
  );

  return { hasFavorited, toggleFavorite };
};

export default favoritesHook;
