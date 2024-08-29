"use client";

import { LazyMotion, domAnimation } from "framer-motion";

type Type = React.FC<{ children: React.ReactNode }>;

export const FramerProvider: Type = ({ children }) => {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
};
