const filterObj = (obj, f) => {
  return Object.fromEntries(Object.entries(obj).filter(([k]) => f(k)));
};
const pick = (obj, keys = []) => filterObj(obj, (k) => keys.includes(k));
const omit = (obj, keys = []) => filterObj(obj, (k) => !keys.includes(k));

const secondsToTime = (sec) => {
  const sec_num = parseInt(sec, 10);
  const hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - hours * 3600) / 60);
  let seconds = sec_num - hours * 3600 - minutes * 60;

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return `${minutes}:${seconds}`;
};

export { pick, omit, secondsToTime };
