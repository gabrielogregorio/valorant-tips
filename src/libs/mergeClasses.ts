import { twMerge } from 'tailwind-merge';

export const mergeClasses = (...classes: string[]) => twMerge(...classes);
