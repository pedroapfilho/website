import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: Array<ClassValue>) => twMerge(clsx(inputs));

export { cn };
