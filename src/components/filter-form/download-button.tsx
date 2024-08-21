import {
  customNameAtom,
  downloadUrlAtom,
  statusAtom,
} from "@/atoms/filter-form-atoms";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";

export const DownloadButton = () => {
  const [status, setStatus] = useAtom(statusAtom);
  const [downloadUrl] = useAtom(downloadUrlAtom);
  const [fileName] = useAtom(customNameAtom);

  const handleOnClick = () => {
    if (status.type === "success") {
      setTimeout(() => {
        setStatus({ type: "initial" });
      }, 1000);
    }
  };

  return (
    <Button
      asChild={true}
      className={`-my-2 ${
        status.type === "success"
          ? "border border-lime-950/10 bg-lime-400 text-lime-950 shadow shadow-lime-950/10"
          : "cursor-no-drop border border-zinc-950/10 bg-zinc-300 text-zinc-600 opacity-75"
      }`}
    >
      <a
        href={downloadUrl}
        download={fileName}
        target="_blank"
        onMouseDown={handleOnClick}
      >
        Download Filtered File
      </a>
    </Button>
  );
};
