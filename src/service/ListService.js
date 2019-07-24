function parseDetails(data) {
  return parseInt(data.details.score.detail.popularity * 100, 10);
}

function sortByPopularity(data) {
  return data.sort((i, j) => parseDetails(j) - parseDetails(i));
}

function dataSlice(data, begin, end) {
  return data.slice(begin, end);
}

function formatDownload(a) {

  let s = "";

  (a + "").split("").reverse().forEach((v, i) => {
    if (i !== 0 && i % 3 === 0) { s += " "; }
    s += v
  });

  return s.split("").reverse().join("");
}

export { sortByPopularity, dataSlice, formatDownload };
