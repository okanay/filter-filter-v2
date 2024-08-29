import { FilterForm } from "@/components/filter-form";
import { FixedLinkGroup } from "@/components/fixed-link-group";
import { ToastManager } from "@/components/toast";
import toast from "react-hot-toast";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full flex-col items-center justify-center py-12">
      <FilterForm />
      <FixedLinkGroup />
      <ToastManager />
    </main>
  );
}
