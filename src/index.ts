import fetch from 'node-fetch'

type SeriesIntervalType = 'day'| 'week' | 'month'

export const getSeriesData = async ({code,interval,limit}:{code:string,interval:SeriesIntervalType,limit:number}) => {
    const resp = await fetch(`https://proxy.finance.qq.com/ifzqgtimg/appstock/app/newfqkline/get?param=${code},${interval},,,${limit},`);
    const json = await resp.json()
    if(json.code !== 0) {
        throw new Error(json.msg)
    }
    return json.data[code][interval].map((item:any) => {
        return {
            date: item[0],
            open: item[1],
            close: item[2],
            high: item[3],
            low: item[4],
            volume: item[5],
            amount: item[8]*10000,
        }
    })
}

export const getRealTimeData = async ({code,limit}:{code:string,limit:number}) => {
    const resp = await fetch(`https://proxy.finance.qq.com/ifzqgtimg/appstock/app/dealinfo/getMingxiV2?code=${code}&limit=${limit}&direction=1`);
    const json = await resp.json()
    if(json.code !== 0) {
        throw new Error(json.msg)
    }
    return {
        date:json.data.date,
        data:json.data.data.map((item:string) => {
            const data = item.split('/')
            return {
                time: data[1],
                price: data[2],
                volume: data[4],
                // amount: data[5],
                direction: data[6],
            }
        })
    }
}


export const getStockSearch = async ({query}:{query:string}) => {
    const resp = await fetch(`https://proxy.finance.qq.com/cgi/cgi-bin/smartbox/search?stockFlag=1&fundFlag=0&query=${query}`);
    const json = await resp.json()
    return json.stock.map((item:any) => {
        return {
            code: item.code,
            name: item.name
        }
    })
}