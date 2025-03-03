# big-a-api

A股node.js调用接口, 信息源来源于腾讯证券，建议用于腾讯相关的服务比如微信小程序等等，否则可能容易出现调用异常，同时服务存在限流，请注意缓存数据

# install

```sh
npm install big-a-api
```

# use
## 根据股票名字进行搜索获取股票代码
```ts
    import { getStockSearch } from 'big-a-api'
    const query = "中国平安";
    // @param 
    // string query 查询股票关键词
    const data = await getStockSearch({ query }); // output [{name:"中国平安",code:"sz000001"},...]
```

## 获取实时价格
```ts
    import { getRealTimeData } from 'big-a-api'
    // @param 
    // string code 股票代码 
    // number limit 最近N条
    const data = await getRealTimeData({ code: "sz000001", limit: 5 });
    /**
     * output:
        {
            date: '20250303',
            data: [
                { time: '13:13:24', price: '11.55', volume: '188', direction: 'S' },...
            ]
        }
     */
```

## 获取K线
```ts
    import { getSeriesData } from 'big-a-api'
    // @param 
    // string code 股票代码 
    // string interval 周期 day为日线 week为周线 month为月线  
    // number limit 最近N条
    const data = await getSeriesData({ code: "sz000001", interval: "day", limit: 10 });
    /**
     * output:
        [
            {
                date: '2025-02-17',
                open: '11.60',
                close: '11.78',
                high: '11.80',
                low: '11.55',
                volume: '2061965.00'
            },...
        ]
     */
```