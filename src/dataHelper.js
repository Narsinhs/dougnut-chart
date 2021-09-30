import rawData from "./updatedData.json"

const colorData = {};
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
    })
    Object.keys(calculation).map((eachKey) => {
        labels.push(eachKey);
        dataSet.push(calculation[eachKey]);
        if (!colorData.hasOwnProperty(eachKey)) {
            colorData[eachKey] = createDynamicColors();
        }
        dynamicColors.push(colorData[eachKey])
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
    let data = [];
    let dataLabels = {};
    let dataLabelsArray = {};
    rawData.data.map((each) => {
        if (!dataLabels.hasOwnProperty(each.operation) && !dataKey.includes(each.operation)) {
            dataLabels[each.operation] = 0;
            dataLabelsArray[each.operation] = [];
        }
    })
    for (let i = 29; i >= 0; i--) {
        let myDate = new Date(new Date().setDate(new Date().getDate() - i));
        labels.push(`${myDate.getDate()} ${rawMonthName[myDate.getMonth() - 1]} ${myDate.getFullYear()}`)
        let countObject = { ...dataLabels };
        rawData.data.map((eachData) => {
            let transDate = new Date(eachData.transDate);
            if (transDate.getMonth() === myDate.getMonth() && transDate.getDate() === myDate.getDate() && transDate.getYear() === myDate.getYear()) {
                if (countObject.hasOwnProperty(eachData.operation)) {
                    countObject[eachData.operation] = countObject[eachData.operation] + 1;
                }
            }
        })
        Object.keys(countObject).map((eachKey) => {
            dataLabelsArray[eachKey].push(countObject[eachKey]);
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
    let month = new Date().getMonth() - 1;
    let labels = [];
    let dataLabels = {};
    let dataLabelsArray = {};
    rawData.data.map((each) => {
        if (!dataLabels.hasOwnProperty(each.operation) && !dataKey.includes(each.operation)) {
            dataLabels[each.operation] = 0;
            dataLabelsArray[each.operation] = [];
        }
    })
    for (let i = 11; i >= 0; i--) {
        let myDate = new Date(new Date(new Date().setDate(1)).setMonth(new Date().getMonth() - i));
        labels.push(`${rawMonthName[myDate.getMonth()]} ${myDate.getFullYear()}`);
        let countObject = { ...dataLabels };
        rawData.data.map((eachData) => {
            let transDate = new Date(eachData.transDate);
            let year = transDate.getFullYear()
            let month = transDate.getMonth();
            console.log(`${month}/${year} TRANSITION` , `${`${rawMonthName[myDate.getMonth()]} ${myDate.getFullYear()}`}`, month === i && year === myDate.getFullYear() )
            if (month === myDate.getMonth() && year === myDate.getFullYear()) {
                if (countObject.hasOwnProperty(eachData.operation)) {
                    countObject[eachData.operation] = countObject[eachData.operation] + 1;
                }
            }
        })
        Object.keys(countObject).map((eachKey) => {
            dataLabelsArray[eachKey].push(countObject[eachKey]);
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
    let rawDayNames = ['Sun', 'Mon', 'Tues', 'Wed', 'Thr', 'Fri', 'Sat'];
    let labels = [];
    let dataLabels = {};
    let dataLabelsArray = {};
    rawData.data.map((each) => {
        if (!dataLabels.hasOwnProperty(each.operation) && !dataKey.includes(each.operation)) {
            dataLabels[each.operation] = 0;
            dataLabelsArray[each.operation] = [];
        }
    })
    for (let i = 6; i >= 0; i--) {
        let myDate = new Date(new Date().setDate(new Date().getDate() - i));
        let label = rawDayNames[myDate.getDay()];
        label = `${label} (${myDate.getDate()}/${myDate.getMonth()}/${myDate.getFullYear()})`
        labels.push(label);
        let countObject = { ...dataLabels };
        rawData.data.map((eachData) => {
            let transDate = new Date(eachData.transDate);
            console.log(`${transDate.getMonth()}/${transDate.getDate()}/${transDate.getFullYear()} Transition date`)
            if (transDate.getMonth() === myDate.getMonth() && transDate.getDate() === myDate.getDate() && transDate.getFullYear() === myDate.getFullYear()) {
                if (countObject.hasOwnProperty(eachData.operation)) {
                    countObject[eachData.operation] = countObject[eachData.operation] + 1;
                }
            }
        })
        Object.keys(countObject).map((eachKey) => {
            dataLabelsArray[eachKey].push(countObject[eachKey]);
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
    let id = 1;
    let keyObject = {}
    rawData.data.map((each) => {
        if (keyData.includes(each.operation)) {
            return;
        }
        let operation = each.operation;
        if (!keyObject.hasOwnProperty(operation)) {
            keyObject[operation] = { count: 1, name: operation };
        } else {
            keyObject[operation].count = keyObject[operation].count + 1;
        }
    })

    return Object.keys(keyObject).map((each) => {
        console.log(id)
        id = id + 1;
        return {
            ...keyObject[each],
            id: id - 1
        }
    })
}