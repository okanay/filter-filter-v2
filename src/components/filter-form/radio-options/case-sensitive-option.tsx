import { InputGroup } from "@/components/filter-form/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OptionHeader } from "@/components/ui/option-header";
import { OptionHeaderIcon } from "@/components/ui/option-header-icon";
import { caseSensitiveAtom } from "@/atoms/filter-form";
import { useAtom } from "jotai/index";

export const CaseOption = () => {
  const [caseSensitive, setCaseSensitive] = useAtom(caseSensitiveAtom);

  return (
    <div className={"flex-shrink-0"}>
      <InputGroup>
        <OptionHeaderIcon name={"case"}>
          <OptionHeader>Case Sensitivity.</OptionHeader>
        </OptionHeaderIcon>
        <RadioGroup name={"case-sensitive"} defaultValue={caseSensitive}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="case-sensitive"
              id="r1-case"
              onClick={() => setCaseSensitive("case-sensitive")}
            />
            <Label htmlFor="r1-case">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="case-insensitive"
              id="r2-case"
              onClick={() => setCaseSensitive("case-insensitive")}
            />
            <Label htmlFor="r2-case">Sensitive</Label>
          </div>
        </RadioGroup>
      </InputGroup>
    </div>
  );
};
