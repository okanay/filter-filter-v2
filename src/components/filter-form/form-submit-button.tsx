import { Button } from "@/components/ui/button";
import { useAtomValue } from "jotai";
import { useAtom, useSetAtom } from "jotai/index";
import { keywordsSplitWithRegex } from "@/helpers/keyword-regex";
import { parseLogDate } from "@/helpers/parse-date-toString";
import { createFileName } from "@/helpers/create-file-name";
import { filterForm } from "@/validations/filter-form";
import {
  customLengthAtom,
  customNameAtom,
  dateOptionAtom,
  dateTimeOptionAtom,
  dateTimeValueAtom,
  dateValueAtom,
  dateValuesAtom,
  downloadUrlAtom,
  fileAtom,
  filterOptionAtom,
  keywordAtom,
  lengthOptionAtom,
  lineOptionAtom,
  nameOptionAtom,
  spaceOptionAtom,
  spaceValuesAtom,
  statusAtom,
  caseSensitiveAtom,
  TDateOption,
  TDateTimeOption,
  TDateTimeValue,
  TDateValues,
  TFilterOption,
  TLengthOption,
  TLineOption,
  TSpaceOption,
  TSpaceValues,
  TCaseOption,
} from "@/atoms/filter-form";

export const FormSubmitButton = () => {
  const setDownloadUrl = useSetAtom(downloadUrlAtom);
  const [status, setStatus] = useAtom(statusAtom);
  const [customName, setCustomName] = useAtom(customNameAtom);

  const file = useAtomValue(fileAtom);
  const caseSensitive = useAtomValue(caseSensitiveAtom);
  const keywords = useAtomValue(keywordAtom);

  const nameOption = useAtomValue(nameOptionAtom);

  const lengthOption = useAtomValue(lengthOptionAtom);
  const customLength = useAtomValue(customLengthAtom);

  const dateOption = useAtomValue(dateOptionAtom);
  const customDate = useAtomValue(dateValueAtom);
  const customDates = useAtomValue(dateValuesAtom);

  const dateTimeOption = useAtomValue(dateTimeOptionAtom);
  const dateTimeValue = useAtomValue(dateTimeValueAtom);

  const spaceOption = useAtomValue(spaceOptionAtom);
  const spaceValues = useAtomValue(spaceValuesAtom);

  const filterOption = useAtomValue(filterOptionAtom);
  const lineOption = useAtomValue(lineOptionAtom);

  const handleFormSubmit = async () => {
    // Form Validation Here
    const validation = filterForm.safeParse({
      file,
      keywords,
      nameOption,
      customName,
      lengthOption,
      customLength,
      dateOption,
      customDate,
      customDates,
      filterOption,
      dateTimeOption,
      dateTimeValue,
      spaceOption,
      spaceValues,
    });

    // If Form Not Valid Return.
    if (!validation.success) {
      console.log(validation);
      setStatus({
        type: "error",
        message: validation.error.errors.at(0)?.message,
      });
      return;
    }

    try {
      setStatus({ type: "loading" });
      setDownloadUrl(undefined);

      // Initialize Result File.
      let resultFile;

      // Convert validation file to buffer.
      const bytes = await validation.data.file.arrayBuffer();
      // Convert bytes to buffer for string conversion.
      const buffer = Buffer.from(bytes);
      // Convert buffer to string array.
      const fileToStringArray = buffer.toString("utf8").split("\n");

      // Filter File With Keywords.
      resultFile = FilterWithKeywords(
        fileToStringArray,
        keywords as string,
        filterOption,
        caseSensitive,
      );

      // Filter File With Date.
      resultFile = FilterWithDate(
        resultFile,
        dateOption,
        customDate as Date,
        customDates as TDateValues,
      );

      // Filter File With Time.
      resultFile = FilterWithTime(resultFile, dateTimeValue, dateTimeOption);

      // Filter File With Length.
      resultFile = FilterWithLength(resultFile, lengthOption, customLength!);

      if (resultFile.length === 0) {
        setStatus({
          type: "error",
          message: "There is no row return. Please change your options.",
        });
        return;
      }

      // TODO: IMPROVE LINE OPTION TO ORIGINAL LOG FILE LINE.
      // Add Line Option.
      resultFile = LineOption(resultFile, lineOption);

      // Add Space Option.
      resultFile = SpaceOption(resultFile, spaceOption, spaceValues!);

      // Convert Result File to Buffer.
      const filteredFileBuffer = new Blob([resultFile], {
        type: "text/csv",
      });

      // Create Download Url.
      const url = window.URL.createObjectURL(filteredFileBuffer);

      // Set Custom Name and Download Url.
      setCustomName(createFileName(file!.name, nameOption, customName!));
      setDownloadUrl(url);
      setStatus({ type: "success" });
    } catch (e: any) {
      setStatus({
        type: "error",
        message: "System not working as usual. (FUCK)",
      });
    }
  };

  return (
    <Button
      onClick={handleFormSubmit}
      type={"button"}
      disabled={status.type === "loading"}
    >
      Filter File By Keywords.
    </Button>
  );
};

function FilterWithLength(
  resultFile: string[],
  lengthOption: TLengthOption,
  customLength: number,
) {
  switch (lengthOption) {
    case "all":
      return resultFile;
    case "find-first": {
      return resultFile.slice(0, 1);
    }
    case "find-last": {
      return resultFile.slice(-1);
    }
    case "first-custom": {
      return resultFile.slice(0, Number(customLength));
    }
    case "last-custom": {
      return resultFile.slice(Number(customLength) * -1);
    }
  }
}

function FilterWithKeywords(
  fileToStringArray: string[],
  keywords: string,
  filterOption: TFilterOption,
  caseSensitivity: TCaseOption,
) {
  return fileToStringArray.filter((item) => {
    const compareFn = (a: string, b: string) =>
      caseSensitivity === "case-sensitive"
        ? a.includes(b)
        : a.toLowerCase().includes(b.toLowerCase());

    if (filterOption === "match one") {
      for (const keyToCheck of keywordsSplitWithRegex(keywords!)) {
        if (compareFn(item, keyToCheck)) {
          return true;
        }
      }
    } else if (filterOption === "match all") {
      let isMatchAll = true;
      for (const keyToCheck of keywordsSplitWithRegex(keywords!)) {
        if (!compareFn(item, keyToCheck)) {
          return (isMatchAll = false);
        }
      }
      return isMatchAll;
    } else return true;
  });
}

function FilterWithDate(
  fileToStringArray: string[],
  dateOption: TDateOption,
  customDate: Date,
  customDates: TDateValues,
) {
  const customDateFormat = new Date(customDate!);
  const customDay = customDateFormat.getDate();
  const customMonth = customDateFormat.getMonth();
  const customYear = customDateFormat.getFullYear();

  const customDayFrom = customDates?.from?.getDate();
  const customDayTo = customDates?.to?.getDate();

  const customMonthFrom = customDates?.from?.getMonth();
  const customMonthTo = customDates?.to?.getMonth();

  const customYearFrom = customDates?.from?.getFullYear();
  const customYearTo = customDates?.to?.getFullYear();

  return fileToStringArray.filter((item) => {
    // check only target date.
    if (dateOption === "target") {
      const lineDate = parseLogDate(item);

      if (lineDate) {
        const lineDay = lineDate.getDate();
        const lineMonth = lineDate.getMonth();
        const lineYear = lineDate.getFullYear();

        return (
          lineDay === customDay &&
          lineMonth === customMonth &&
          lineYear === customYear
        );
      } else return false;
    }
    // check between two date.
    else if (dateOption === "between") {
      const lineDate = parseLogDate(item);

      if (lineDate) {
        const lineDay = lineDate.getDate();
        const lineMonth = lineDate.getMonth();
        const lineYear = lineDate.getFullYear();

        return (
          customDayFrom <= lineDay &&
          customDayTo >= lineDay &&
          customMonthFrom <= lineMonth &&
          customMonthTo >= lineMonth &&
          customYearFrom <= lineYear &&
          customYearTo >= lineYear
        );
      } else return false;
    }
    // if date option is default just return true.
    else return true;
  });
}

function FilterWithTime(
  fileToStringArray: string[],
  dateFilterValue: TDateTimeValue,
  dateFilterOption: TDateTimeOption,
) {
  // prettier-ignore
  const customFrom = dateFilterValue.from.hour * 60 + dateFilterValue.from.minute;
  const customTo = dateFilterValue.to.hour * 60 + dateFilterValue.to.minute;

  return fileToStringArray.filter((item) => {
    // check only target time.
    if (dateFilterOption === "target") {
      const lineDate = parseLogDate(item);

      if (lineDate) {
        const lineHour = lineDate.getHours();
        const lineMin = lineDate.getMinutes();

        const lineTime = lineHour * 60 + lineMin;

        if (customFrom === lineTime) {
          return true;
        }
      }
    }
    // check between two time.
    else if (dateFilterOption === "between") {
      const lineDate = parseLogDate(item);

      if (lineDate) {
        const lineHour = lineDate.getHours();
        const lineMin = lineDate.getMinutes();

        const lineTime = lineHour * 60 + lineMin;

        if (customFrom <= lineTime && customTo >= lineTime) {
          return true;
        }
      }
    }
    // if time option is default just return true.
    else return true;
  });
}

function SpaceOption(
  fileToStringArray: string[],
  spaceOption: TSpaceOption,
  spaceValues: TSpaceValues,
): string {
  if (spaceOption === "default") return fileToStringArray.join("\n");
  else {
    const { line, space } = spaceValues;

    const splittedArray = [];
    for (let i = 0; i < fileToStringArray.length; i += line) {
      splittedArray.push(fileToStringArray.slice(i, i + line).join("\n"));
    }

    const spaceCount = () => {
      let spaceValue = "";
      for (let i = 1; i < space; i++) {
        spaceValue += "\n";
      }

      return spaceValue;
    };

    return splittedArray.join(`${spaceCount()}`);
  }
}

function LineOption(
  fileToStringArray: string[],
  lineOption: TLineOption,
): string[] {
  if (lineOption === "add-line") {
    return fileToStringArray.map((item, index) =>
      item.replace(item, `<${index}> : ${item}`),
    );
  }

  return fileToStringArray;
}
