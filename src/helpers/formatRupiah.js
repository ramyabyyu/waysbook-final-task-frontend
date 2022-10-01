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
