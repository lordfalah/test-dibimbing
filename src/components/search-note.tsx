"use client";

import React from "react";
import InputText from "./input-text";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchNote = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <InputText
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        label="Search"
        type="search"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchNote;
