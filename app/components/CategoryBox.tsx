"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import queryString from "query-string";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox = ({ icon: Icon, label, selected }: CategoryBoxProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    // check if params is null
    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    // Updated selected category
    const updatedQuery: any = { ...currentQuery, category: label };

    // remove category if it's already selected
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    // get url
    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      className={`flex flex-col justify-center items-center gap-2 border-b-2 p-3 hover:text-neutral-800 cursor-pointer transition ${
        selected ? "border-b-neutral-800" : "border-transparent"
        } ${selected ? "text-neutral-800" : "text-neutral-500"}`}
      onClick={handleClick}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
