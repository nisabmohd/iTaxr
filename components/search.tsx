"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  return (
    <div className="h-9 w-[300px] border rounded-md relative">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.keyCode == 13) router.push(`/admin/search?query=${query}`);
        }}
        placeholder="Search..."
        className="h-8 border-none outline-none w-full"
      />
      <SearchIcon className="w-4 h-4 absolute right-2 top-2 text-muted-foreground" />
    </div>
  );
}
