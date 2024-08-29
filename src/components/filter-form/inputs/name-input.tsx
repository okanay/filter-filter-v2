import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InputGroup } from "@/components/filter-form/input-group";
import { useSetAtom } from "jotai/index";
import { useAtomValue } from "jotai";
import {
  customNameAtom,
  hideNameInput,
  nameOptionAtom,
} from "@/atoms/filter-form";
import { Separator } from "@/components/ui/separator";

export const NameInput = () => {
  const setCustomName = useSetAtom(customNameAtom);
  const customNameValue = useAtomValue(customNameAtom);
  const hide = useAtomValue(hideNameInput);

  const nameOption = useAtomValue(nameOptionAtom);

  // prettier-ignore
  const showInput = nameOption === "custom-with-file-name" || nameOption === "custom";

  if (hide) return null;

  return (
    showInput && (
      <>
        <Separator />
        <InputGroup>
          <Label htmlFor="customName">Enter your custom file name.</Label>
          <Input
            type="text"
            id="customName"
            value={customNameValue}
            placeholder="my-file-name etc.."
            onChange={(e) => setCustomName(e.target?.value)}
          />
        </InputGroup>
      </>
    )
  );
};
