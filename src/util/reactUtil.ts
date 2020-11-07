import { useEffect } from 'react';

// Created to prevent annoying ESLint error every time empty array is passed.
// eslint-disable-next-line react-hooks/exhaustive-deps
export const useMountEffect = (fun: () => void | (() => void | undefined)) => useEffect(fun, []);
