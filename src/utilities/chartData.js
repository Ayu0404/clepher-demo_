export const cleanChartData = (data) => {
    let cleanedData = []
    let keys = Object.keys(data)
    let values = Object.values(data)

    for(let i=0; i< keys.length; i++) {
        let obj = {
            "date": new Date(keys[i]),
            ...values[i]
        }
        cleanedData.push(obj)
    }
    cleanedData.sort((a, b) => new Date(a.date) - new Date(b.date));
    return cleanedData;
}