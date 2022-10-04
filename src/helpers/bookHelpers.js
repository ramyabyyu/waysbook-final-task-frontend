// Format Rupiah
export const formatRupiah = (price, prefix) => {
  let num_str = price.replace(/[^,\d]/g, "").toString(),
    split = num_str.split(","),
    remainder = split[0].length % 3,
    rupiah = split[0].substr(0, remainder),
    thousand = split[0].substr(remainder).match(/\d{3}/gi);

  // add "." if input value already become a thousand
  if (thousand) {
    let separator = remainder ? "." : "";
    rupiah += separator + thousand.join(".");
  }

  rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
  return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
};

// Check if book image is available
export const noFileAvailable = (fileURL, noFileURL, noFileSrc) => {
  if (fileURL === noFileURL) {
    return noFileSrc;
  }

  return fileURL;
};

// Check if book has a promo, and get the real price
export const getPrice = (realPrice, promoPrice) => {
  // if book doesn't have any promo, return realPrice
  if (promoPrice === 0) {
    return realPrice;
  }

  // else, return promoPrice
  return promoPrice;
};

// Format str
export const subStr = (str, maxCharacter) => {
  if (str.length > maxCharacter) {
    str = str.substring(0, maxCharacter);
    return str + "...";
  }

  return str;
};

// convert str to date
export const convertToDate = (str) => {
  const strDate = new Date(str);
  const result = `${strDate.getDate()}/${strDate.getMonth()}/${strDate.getFullYear()}`;

  return result;
};
