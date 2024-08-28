const cleanRegex = /[,.!]/g;

// Anahtar kelimeleri regex kullanarak bölen fonksiyon
export const keywordsSplitWithRegex = (keywords: string) => {
  // Önce tüm kelimeleri regex ile temizle
  let splitKeywords: any = keywords
    .split(" ")
    .map((key) => key.replace(cleanRegex, "")) // Regex ile temizleme işlemi
    .filter((keyword) => keyword.length >= 3)  // Temizlendikten sonra filtreleme
    .reduce((acc, curr) => {
      if (!acc.has(curr)) {
        acc.add(curr);
      }
      return acc;
    }, new Set());

  return splitKeywords.values();
};

export const removeKeyword = (targetKeyword: string, inputText: string) => {
  // inputText'i temizle (noktalama işaretlerinden arındır)
  let cleanedInputText = inputText.replace(cleanRegex, "");

  // Temizlenmiş targetKeyword'ü de temizleyelim
  const cleanTargetKeyword = targetKeyword.replace(cleanRegex, "");

  // Giriş metnindeki kelimeleri böl ve hedef kelimeyi çıkar
  let keywords = cleanedInputText.split(" ");

  keywords = keywords.filter((keyword) => keyword !== cleanTargetKeyword);

  return keywords.join(" ");
};
