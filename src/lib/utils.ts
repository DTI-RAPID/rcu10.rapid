import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** shadcn/ui helper: merge Tailwind class names, later ones win. */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
