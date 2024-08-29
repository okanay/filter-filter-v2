import { atom } from "jotai";
import { atomWithStorage } from 'jotai/utils'

export type TStatus = {
  type: "initial" | "error" | "loading" | "success";
  message?: string;
};

export const statusAtom = atom<TStatus>({ type: "initial" });
export const fileAtom = atom<File | undefined>(undefined);
export const downloadUrlAtom = atom<undefined | string>(undefined);

export const keywordAtom = atom<undefined | string>("");
export const keywordsListAtom = atom<string[]>([]);

export type TCaseOption = "case-sensitive" | "case-insensitive";
// export const caseSensitiveAtom = atom<TCaseOption>("case-insensitive");
export const caseSensitiveAtom = atomWithStorage<TCaseOption>("caseSensitive", "case-sensitive");

export type TNameOption =
  | "default"
  | "custom"
  | "file-name"
  | "custom-with-file-name";
// export const nameOptionAtom = atom<TNameOption>("default");
export const nameOptionAtom = atomWithStorage<TNameOption>("nameOption", "default");
// export const customNameAtom = atom<undefined | string>("");
export const customNameAtom = atomWithStorage<undefined | string>("customName", "");
export const hideNameInput = atomWithStorage<boolean>("hideNameInput", false);

export type TLengthOption =
  | "all"
  | "find-first"
  | "find-last"
  | "first-custom"
  | "last-custom";
// export const lengthOptionAtom = atom<TLengthOption>("all");
export const lengthOptionAtom = atomWithStorage<TLengthOption>("lengthOption", "all");
// export const customLengthAtom = atom<undefined | number>(0);
export const customLengthAtom = atomWithStorage<undefined | number>("customLength", 1);
export const hideLengthInput = atomWithStorage<boolean>("hideLengthInput", false);

export type TDateTimeValue = {
  from: {
    hour: number;
    minute: number;
  };
  to: {
    hour: number;
    minute: number;
  };
};
export const dateTimeValueAtom = atom<TDateTimeValue>({
  from: {
    hour: 0,
    minute: 0,
  },
  to: {
    hour: 0,
    minute: 0,
  },
});

export type TDateOption = "default" | "target" | "between";
// export const dateOptionAtom = atom<TDateOption>("default");
export const dateOptionAtom = atomWithStorage<TDateOption>("dateOption", "default");
export const dateValueAtom = atom<Date | undefined>(undefined);

export type TDateTimeOption = "default" | "target" | "between";
// export const dateTimeOptionAtom = atom<TDateTimeOption>("default");
export const dateTimeOptionAtom = atomWithStorage<TDateTimeOption>("dateTimeOption", "default");

export type TDateValues = { from: Date; to: Date };
export const dateValuesAtom = atom<TDateValues | undefined>(undefined);

export type TFilterOption = "match one" | "match all" | "none";
// export const filterOptionAtom = atom<TFilterOption>("match one");
export const filterOptionAtom = atomWithStorage<TFilterOption>("filterOption", "match one");

export type TSpaceOption = "default" | "add-space";
// export const spaceOptionAtom = atom<TSpaceOption>("default");
export const spaceOptionAtom = atomWithStorage<TSpaceOption>("spaceOption", "default");
export const hideSpaceInput = atomWithStorage<boolean>("hideSpaceInput", false);

export type TSpaceValues = { line: number; space: number };
// export const spaceValuesAtom = atom<TSpaceValues | undefined>({
//   line: 1,
//   space: 1,
// });

export const spaceValuesAtom = atomWithStorage<TSpaceValues | undefined>("spaceValues", {
  line: 1,
  space: 1,
});

export type TLineOption = "default" | "add-line";
// export const lineOptionAtom = atom<TLineOption>("default");
export const lineOptionAtom = atomWithStorage<TLineOption>("lineOption", "default");
