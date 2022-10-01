export const subStr = (str, maxCharacter) => {
  if (str.length > maxCharacter) {
    str = str.substring(0, maxCharacter);
    return str + "...";
  }

  return str;
};
