import { InputGroup } from "@/components/filter-form/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { hideSpaceInput, spaceOptionAtom } from "@/atoms/filter-form";
import { useAtom } from "jotai/index";
import { OptionHeaderIcon } from "@/components/ui/option-header-icon";
import { OptionHeader } from "@/components/ui/option-header";
import { HideButton } from "@/components/ui/hide-button";

export const SpaceOption = () => {
  const [filterOption, setFilterOption] = useAtom(spaceOptionAtom);
  const [hide, setHide] = useAtom(hideSpaceInput);

  return (
    <div className={"relative flex-shrink-0"}>
      <HideButton
        hide={hide}
        onClick={() => {
          setHide(!hide);
        }}
      />
      <InputGroup>
        <OptionHeaderIcon name={"space"}>
          <OptionHeader>Output Space.</OptionHeader>
        </OptionHeaderIcon>
        <RadioGroup name={"match-one"} defaultValue={filterOption}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="default"
              id="r1-space"
              checked={filterOption === "default"}
              onClick={() => setFilterOption("default")}
            />
            <Label htmlFor="r1-space">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="add-space"
              id="r2-space"
              checked={filterOption === "add-space"}
              onClick={() => setFilterOption("add-space")}
            />
            <Label htmlFor="r2-space">Set Space</Label>
          </div>
        </RadioGroup>
      </InputGroup>
    </div>
  );
};
