import assert from "assert";
import { getSeriesData, getRealTimeData, getStockSearch } from "./index";

const testUnit = {
  [Symbol("test.getSeriesData.day")]: async function () {
    const data = await getSeriesData({ code: "sz000001", interval: "day", limit: 10 });
    assert.equal(data.length, 10+1, "getSeriesData.day.error");
  },
  [Symbol("test.getSeriesData.week")]: async function () {
    const data = await getSeriesData({ code: "sz000001", interval: "week", limit: 10 });
    assert.equal(data.length, 10+1, "getSeriesData.day.week.error");
  },
  [Symbol("test.getSeriesData.month")]: async function () {
    const data = await getSeriesData({ code: "sz000001", interval: "month", limit: 10 });
    assert.equal(data.length, 10+1, "getSeriesData.day.month.error");
  },
  [Symbol("test.getRealTimeData")]: async function () {
    const data = await getRealTimeData({ code: "sz000001", limit: 5 });
    assert.equal(data.data.length, 5, "getRealTimeData.error");
  },
  [Symbol("test.getStockSearch")]: async function () {
    const query = "中国平安";
    const data = await getStockSearch({ query });
    assert.equal(data.filter(e=>e.name===query).length>0, true, "getStockSearch.error");
  },
};

async function run(testUnitList) {
  for (let testUnitValue of testUnitList) {
    for (let testFunc of Object.getOwnPropertySymbols(testUnitValue)) {
      await testUnitValue[testFunc]();
    }
  }
}
(async function () {
  await run([testUnit]);
})().catch((error) => {
  console.error(error);
});
