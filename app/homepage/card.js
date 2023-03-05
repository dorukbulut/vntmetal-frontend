"use client";
import * as React from "react";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Link from "next/link";
export default function Elem({ module }) {
  const { title, body, path, color } = module;
  return (
    <div className="shadow-xl transition duration-500 hover:scale-110 hover:cursor-pointer lg:w-3/4">
      <Card sx={{ height: "100%" }}>
        <div className="p-2 flex flex-col gap-2">
          <TurnedInIcon color={color} />
          <p className="text-md font-roboto text-slate-700">{title}</p>
          <p className="text-sm font-roboto  text-slate-500 leading-loose">
            {body}
          </p>
        </div>
        <CardActions>
          <Link href={path} passHref>
            <button
              type="button"
              className="inline-block justify-self-end w-full rounded bg-indigo-600 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            >
              Kullan
            </button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
}
