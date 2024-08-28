import {
  caseSensitiveAtom,
  filterOptionAtom,
  keywordsListAtom,
} from "@/atoms/filter-form";
import { Badge } from "@/components/ui/badge";
import { useAtomValue } from "jotai";
import { nanoid } from "nanoid";
import { twMerge } from "tailwind-merge";

type TProps = React.FC<{
  removeHandle: (key: string) => void;
}>;
export const KeywordsList: TProps = ({ removeHandle }) => {
  const keywordsList = useAtomValue(keywordsListAtom);
  const filterType = useAtomValue(filterOptionAtom);
  const caseSensitive = useAtomValue(caseSensitiveAtom);

  const onBadgeClick = (key: string) => {
    removeHandle(key);
  };

  return keywordsList.length ? (
    <div className={"flex max-w-[320px] flex-wrap gap-2"}>
      {keywordsList.map((key) => (
        <Badge
          className={twMerge(
            "cursor-pointer py-1.5 transition-all duration-300 hover:scale-90 hover:bg-red-400 active:bg-red-800",
            caseSensitive === "case-insensitive" &&
              "border border-blue-950/10 bg-blue-500 shadow shadow-blue-950/10",
            filterType === "match all" &&
              "border border-amber-950/10 bg-amber-500 shadow shadow-amber-950/10",
            caseSensitive === "case-insensitive" &&
              filterType === "match all" &&
              "border border-violet-950/10 bg-violet-500 shadow-violet-950/10",
          )}
          key={nanoid()}
          onClick={() => {
            onBadgeClick(key);
          }}
        >
          <span
            className={`${caseSensitive === "case-insensitive" ? "lowercase" : "normal-case"}`}
          >
            {key}
          </span>
        </Badge>
      ))}
    </div>
  ) : null;
};
