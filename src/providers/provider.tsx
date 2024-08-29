import { JotaiProvider } from "@/providers/jotai-provider";
import { FramerProvider } from "./framer-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <FramerProvider>{children}</FramerProvider>
    </JotaiProvider>
  );
}
