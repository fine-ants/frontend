export function removeWord(text: string, wordToRemove: string) {
  const regex = new RegExp(wordToRemove, "gi");
  return text.replace(regex, "").trim();
}
