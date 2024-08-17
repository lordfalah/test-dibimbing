import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const colors = [
  "bg-[#FE9B72]",
  "bg-[#FEC971]",
  "bg-[#B693FD]",
  "bg-[#E4EF8F]",
  "bg-[#00D4FE]",
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatedDate = (val: Date) => {
  const date = new Date(val);

  const result = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return result;
};

export function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
