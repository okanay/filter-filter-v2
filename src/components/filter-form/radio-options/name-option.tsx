import { InputGroup } from "@/components/filter-form/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAtom } from "jotai/index";
import { hideNameInput, nameOptionAtom } from "@/atoms/filter-form";
import { OptionHeaderIcon } from "@/components/ui/option-header-icon";
import { OptionHeader } from "@/components/ui/option-header";
import { useEffect } from "react";
import { HideButton } from "@/components/ui/hide-button";

export const NameOption = () => {
  const [filterOption, setFilterOption] = useAtom(nameOptionAtom);
  const [hide, setHide] = useAtom(hideNameInput);

  return (
    <div className={"relative flex-shrink-0"}>
      <HideButton
        hide={hide}
        onClick={() => {
          setHide(!hide);
        }}
      />
      <InputGroup>
        <OptionHeaderIcon name={"name"}>
          <OptionHeader>Output File Name.</OptionHeader>
        </OptionHeaderIcon>
        <RadioGroup name={"name-option"} defaultValue={filterOption}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="default"
              id="r1-name"
              checked={filterOption === "default"}
              onClick={() => setFilterOption("default")}
            />
            <Label htmlFor="r1-name">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="file-name"
              id="r2-name"
              checked={filterOption === "file-name"}
              onClick={() => setFilterOption("file-name")}
            />
            <Label htmlFor="r2-name">File Name</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="custom"
              id="r3-name"
              checked={filterOption === "custom"}
              onClick={() => setFilterOption("custom")}
            />
            <Label htmlFor="r3-name">Custom</Label>
          </div>
        </RadioGroup>
      </InputGroup>
    </div>
  );
};

// <div className="flex items-center space-x-2">
// <RadioGroupItem
// value="custom-with-file-name"
// id="r4-name"
// checked={filterOption === "custom-with-file-name"}
// onClick={() => setFilterOption("custom-with-file-name")}
// />
// <Label htmlFor="r4-name">Custom With File Name</Label>
// </div>
