import rawData from "./updatedData.json"

const colorData = {};
let transformDate = (date) => {
    let dataDate = date.toString();
    let year = dataDate.slice(0, 4);
    let month = dataDate.slice(4, 6);
    let day = dataDate.slice(6, 8);
    let updatedDate = new Date(`${month}/${day}/${year}`)
    return updatedDate;

}
const createDynamicColors = function () {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
};
export const transformRawDataToPieChart = () => {
    let labels = [];
    let dataSet = [];
    let dynamicColors = [];
    let calculation = {};
    rawData.data.map((each) => {
        if (calculation.hasOwnProperty(each.operation)) {
            calculation[each.operation] = calculation[each.operation] + 1;
        } else {
            calculation[each.operation] = 1;
        }
        return each;
    })
    Object.keys(calculation).map((eachKey) => {
        labels.push(eachKey);
        dataSet.push(calculation[eachKey]);
        if (!colorData.hasOwnProperty(eachKey)) {
            colorData[eachKey] = createDynamicColors();
        }
        dynamicColors.push(colorData[eachKey])
        return eachKey;
    })

    return {
        labels,
        datasets: [{
            backgroundColor: dynamicColors,
            data: dataSet
        }]
    }
}
export const getMonthBarChartData = (dataKey) => {
    let rawMonthName = ['Jan', 'Feb', 'Mar', 'Apr', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let labels = [];
    let dataLabels = {};
    let dataLabelsArray = {};
    rawData.data.map((each) => {
        if (!dataLabels.hasOwnProperty(each.operation) && !dataKey.includes(each.operation)) {
            dataLabels[each.operation] = 0;
            dataLabelsArray[each.operation] = [];
        }
        return each;
    })
    for (let i = 29; i >= 0; i--) {
        let myDate = new Date(new Date().setDate(new Date().getDate() - i));
        labels.push(`${myDate.getDate()} ${rawMonthName[myDate.getMonth() - 1]} ${myDate.getFullYear()}`)
        let countObject = { ...dataLabels };
        rawData.data.map((eachData) => {
            let transDate = transformDate(eachData.transDate);
            if (transDate.getMonth() === myDate.getMonth() && transDate.getDate() === myDate.getDate() && transDate.getYear() === myDate.getYear()) {
                if (countObject.hasOwnProperty(eachData.operation)) {
                    countObject[eachData.operation] = countObject[eachData.operation] + 1;
                }
            }
            return eachData;
        })
        Object.keys(countObject).map((eachKey) => {
            dataLabelsArray[eachKey].push(countObject[eachKey]);
            return eachKey;
        })
    }
    return {
        labels,
        datasets: Object.keys(dataLabelsArray).map((eachKeys) => {
            return {
                label: eachKeys,
                backgroundColor: colorData[eachKeys],
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: dataLabelsArray[eachKeys]
            }
        })
    };
}
export const getYearBarChartData = (dataKey) => {
    let rawMonthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let labels = [];
    let dataLabels = {};
    let dataLabelsArray = {};
    rawData.data.map((each) => {
        if (!dataLabels.hasOwnProperty(each.operation) && !dataKey.includes(each.operation)) {
            dataLabels[each.operation] = 0;
            dataLabelsArray[each.operation] = [];
        }
        return each;
    })
    for (let i = 11; i >= 0; i--) {
        let myDate = new Date(new Date(new Date().setDate(1)).setMonth(new Date().getMonth() - i));
        labels.push(`${rawMonthName[myDate.getMonth()]} ${myDate.getFullYear()}`);
        let countObject = { ...dataLabels };
        rawData.data.map((eachData) => {
            let transDate = transformDate(eachData.transDate);
            let year = transDate.getFullYear()
            let month = transDate.getMonth();
            if (month === myDate.getMonth() && year === myDate.getFullYear()) {
                if (countObject.hasOwnProperty(eachData.operation)) {
                    countObject[eachData.operation] = countObject[eachData.operation] + 1;
                }
            }
            return eachData;
        })
        Object.keys(countObject).map((eachKey) => {
            dataLabelsArray[eachKey].push(countObject[eachKey]);
            return eachKey;
        })
    }
    return {
        labels,
        datasets: Object.keys(dataLabelsArray).map((eachKeys) => {
            return {
                label: eachKeys,
                backgroundColor: colorData[eachKeys],
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: dataLabelsArray[eachKeys]
            }
        })
    };
}
export const getWeekBarChartData = (dataKey) => {
    let rawDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let labels = [];
    let dataLabels = {};
    let dataLabelsArray = {};
    rawData.data.map((each) => {
        if (!dataLabels.hasOwnProperty(each.operation) && !dataKey.includes(each.operation)) {
            dataLabels[each.operation] = 0;
            dataLabelsArray[each.operation] = [];
        }
        return each;
    })
    for (let i = 6; i >= 0; i--) {
        let myDate = new Date(new Date().setDate(new Date().getDate() - i));
        let label = rawDayNames[myDate.getDay()];
        label = `${label} (${myDate.getDate()}/${myDate.getMonth() + 1}/${myDate.getFullYear()})`
        labels.push(label);
        let countObject = { ...dataLabels };
        rawData.data.map((eachData) => {
            let transDate = transformDate(eachData.transDate);
            console.log(`${transDate.getMonth()}/${transDate.getDate()}/${transDate.getFullYear()} Transition date`)
            if (transDate.getMonth() === myDate.getMonth() && transDate.getDate() === myDate.getDate() && transDate.getFullYear() === myDate.getFullYear()) {
                if (countObject.hasOwnProperty(eachData.operation)) {
                    countObject[eachData.operation] = countObject[eachData.operation] + 1;
                }
            }
            return eachData;
        })
        Object.keys(countObject).map((eachKey) => {
            dataLabelsArray[eachKey].push(countObject[eachKey]);
            return eachKey
        })
    }
    return {
        labels,
        datasets: Object.keys(dataLabelsArray).map((eachKeys) => {
            return {
                label: eachKeys,
                backgroundColor: colorData[eachKeys],
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: dataLabelsArray[eachKeys]
            }
        })
    };
}
export const getDataForDataTable = (keyData) => {
    // let id = 1;
    let operatorId = {};
    rawData.data.map((each) => {
        if (!operatorId.hasOwnProperty(each.operatorId)) {
            operatorId[each.operatorId] = true;
        }
    })
    let result = [];
    Object.keys(operatorId).map((eachId) => {
        let operatorCount = {};
        rawData.data.map((eachData) => {
            if (keyData.includes(eachData.operation)) {
                return;
            }
            if (eachData.operatorId === eachId) {
                if (operatorCount.hasOwnProperty(eachData.operation)) {
                    operatorCount[eachData.operation] += 1;
                } else {
                    operatorCount[eachData.operation] = 1;
                }
            }
        })
        Object.keys(operatorCount).map((eachKey) => {
            result.push({
                operatorId: eachId,
                count: 100,
                name: eachKey
            })
        })
    })
    console.log(result)
    return result;
    // return Object.keys(keyObject).map((each) => {
    //     // console.log(id)
    //     // id = id + 1;
    //     return {
    //         ...keyObject[each],
    //         // id: id - 1
    //     }
    // })
}