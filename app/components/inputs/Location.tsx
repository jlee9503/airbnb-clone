"use client";

import locationHook from "@/app/hooks/locationHook";
import React from "react";
import Select from "react-select";

export type LocationData = {
  value: string;
  label: string;
  flag: string;
  latlng: number[];
  region: string;
};

interface LocationProps {
  value?: LocationData;
  onChange: (val: LocationData) => void;
}

const Location = ({ value, onChange }: LocationProps) => {
  const { getAll } = locationHook();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        options={getAll()}
        value={value}
        isClearable
        onChange={(value) => onChange(value as LocationData)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},{" "}
              <span className="text-neutral-400">{option.region}</span>
            </div>
          </div>
        )}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "#000",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default Location;
