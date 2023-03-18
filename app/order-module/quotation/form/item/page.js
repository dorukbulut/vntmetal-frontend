"use client";
import ItemForm from "./form";
import { useSearchParams } from "next/navigation";

export default function ItemPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return <ItemForm id={id} />;
}
