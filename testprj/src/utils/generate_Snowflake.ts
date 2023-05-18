import cluster from "cluster";

let inc = 0;
let lastSnowflake: string;
const accordEpoch = 1577836800000;

export function generateSnowflake() {
  const pad = (num: number, by: number) => num.toString(2).padStart(by, "0");

  const msSince = pad(new Date().getTime() - accordEpoch, 42);
  const pid = pad(process.pid, 5).slice(0, 5);
  const wid = pad(cluster.worker?.id ?? 0, 5);
  const getInc = (add: number) => pad(inc + add, 12);

  let snowflake = `0b${msSince}${wid}${pid}${getInc(inc)}`;
  snowflake === lastSnowflake
    ? (snowflake = `0b${msSince}${wid}${pid}${getInc(++inc)}`)
    : (inc = 0);

  lastSnowflake = snowflake;
  return BigInt(snowflake).toString();
}

// what this method doesB
// -> https://discord.com/developers/docs/reference#convert-snowflake-to-datetime
export function snowflakeToDate(snowflake: bigint) {
  const dateBits = Number(BigInt.asUintN(64, snowflake) >> 22n);
  return new Date(dateBits + 1420070400000);
}
