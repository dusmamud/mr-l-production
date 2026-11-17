import type { Metadata } from "next";
import { SearchClient } from "./SearchClient";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Mr. L Production — every project and every article, in one place.",
};

export default function SearchPage() {
  return <SearchClient />;
}
