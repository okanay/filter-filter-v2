import { InputGroup } from "@/components/filter-form/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAtom } from "jotai/index";
import { dateOptionAtom } from "@/atoms/filter-form";
import { OptionHeaderIcon } from "@/components/ui/option-header-icon";
import { OptionHeader } from "@/components/ui/option-header";

export const CalendarOption = () => {
  const [filterOption, setFilterOption] = useAtom(dateOptionAtom);

  return (
    <div className={"flex-shrink-0"}>
      <InputGroup>
        <OptionHeaderIcon name={"date"}>
          <OptionHeader>Customize Date.</OptionHeader>
        </OptionHeaderIcon>
        <RadioGroup defaultValue={filterOption}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="default"
              id="r1-date-option"
              checked={filterOption === "default"}
              onClick={() => setFilterOption("default")}
            />
            <Label htmlFor="r1-date-option">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="between-one"
              id="r2-date-option"
              checked={filterOption === "target"}
              onClick={() => setFilterOption("target")}
            />
            <Label htmlFor="r2-date-option">Target Date</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="between-two"
              id="r3-date-option"
              checked={filterOption === "between"}
              onClick={() => setFilterOption("between")}
            />
            <Label htmlFor="r3-date-option">Between Date</Label>
          </div>
        </RadioGroup>
      </InputGroup>
    </div>
  );
};
