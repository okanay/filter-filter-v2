export const keywordsSplitWithRegex = (keywords: string) => {
  let splitKeywords: any = keywords
    .split(" ")
    .filter((keyword) => keyword.length >= 3)
    .map((key) => {
      return key.replace(/[,.!]/g, "");
    })
    .reduce((acc, curr) => {
      if (!acc.has(curr)) {
        acc.add(curr);
      }

      return acc;
    }, new Set());

  return splitKeywords.values();
};

export const removeKeyword = (targetKeyword: string, inputText: string) => {
  let keywords = inputText.split(" ");

  const targetKeywords = keywords.filter(
    (keyword) => keyword === targetKeyword,
  );

  for (const targetKeyword of targetKeywords) {
    keywords = keywords.filter((keyword) => keyword !== targetKeyword);
  }

  return keywords.join(" ");
};
