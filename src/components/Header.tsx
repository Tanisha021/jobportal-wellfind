import { useAppStore } from "@/hooks/useAppStore";
import React from "react";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { ModeToggle } from "./ThemeToggler";

type Props = {};

const Header = (props: Props) => {
  const { toggleSidebar } = useAppStore((state) => state);

  return (
    <header className="flex h-14 items-center justify-between md:justify-end border-b bg-white dark:bg-gray-800 dark:border-gray-700 px-4">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        onClick={toggleSidebar}
      >
        <MenuIcon className="h-6 w-6" />
      </Button>
      <div className="flex items-center space-x-4">
        <ModeToggle />
        <Button variant="ghost" size="icon" className="rounded-full">
          <img
            alt="Avatar"
            className="rounded-full"
            height="32"
            src="https://api.dicebear.com/9.x/lorelei/svg"
            style={{
              aspectRatio: "32/32",
              objectFit: "cover",
            }}
            width="32"
          />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
