"use client";

import { Combobox } from "./Combobox";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { CheckCheck, Copy } from "lucide-react";

const GAME_OVERVIEW = [
  { value: "genshin_impact", label: "Genshin Impact", image: "/genshin.png" },
  {
    value: "marve_rivals",
    label: "Marvel Rivals",
    image: "/marvel-rivals.png",
  },
  { value: "valorant", label: "Valorant", image: "/valorant.png" },
];

const WIDGET_URL = "http://127.0.0.1:3000/widget/";

const Overview = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [selectedGameValue, setSelectedGameValue] = useState(
    GAME_OVERVIEW[0].value
  );

  const selectedGameData =
    GAME_OVERVIEW.find((game) => game.value === selectedGameValue) ??
    GAME_OVERVIEW[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(WIDGET_URL).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };
  return (
    <div className="space-y-4">
      <Combobox
        options={GAME_OVERVIEW}
        hideSearch
        initialValues={GAME_OVERVIEW[0].value}
        onValueChange={setSelectedGameValue}
      />

      <Image
        alt="game overview"
        width="360"
        height="360"
        className="w-96 h-96 object-cover"
        src={selectedGameData.image}
      />

      <div className="flex items-center gap-2">
        <Input value={WIDGET_URL} readOnly />
        <Button size={"sm"} onClick={handleCopy} className="min-w-[6rem]">
          {isCopied ? (
            <CheckCheck className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          {isCopied ? "Copied!" : "Copy"}
        </Button>
      </div>
    </div>
  );
};
export default Overview;
