import rawData from "./updatedData.json"

const getYearsLabels = () => {
    let rawMonthName = ['January', 'Febrary', 'March', 'April', 'June', 'July', 'August', 'September', 'Octuber', 'November', 'December'];
    let month = new Date().getMonth() - 1;
    let labels = [];
    for (let i = month; i < rawMonthName.length; i++) {
        labels.push(rawMonthName[i]);
    }
    for (let i = 0; i < month; i++) {
        labels.push(rawMonthName[i]);
    }
    return labels;
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
    })
    Object.keys(calculation).map((eachKey) => {
        labels.push(eachKey);
        dataSet.push(calculation[eachKey]);
        dynamicColors.push(createDynamicColors());
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
    let rawMonthName = ['January', 'Febrary', 'March', 'April', 'June', 'July', 'August', 'September', 'Octuber', 'November', 'December'];
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
    for (let i = 0; i < 30; i++) {
        let myDate = new Date(new Date().setDate(new Date().getDate() - i));
        labels.push(`${myDate.getDate()} ${rawMonthName[myDate.getMonth() - 1]}`)
        let countObject = { ...dataLabels };
        rawData.data.map((eachData) => {
            let transDate = new Date(eachData.transDate);
            if (transDate.getMonth() === myDate.getMonth() && transDate.getDay() === myDate.getDay() && transDate.getYear() === myDate.getYear()) {
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
                backgroundColor: createDynamicColors(),
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: dataLabelsArray[eachKeys]
            }
        })
    };
}
export const getYearBarChartData = (dataKey) => {
    let rawMonthName = ['January', 'Febrary', 'March', 'April', 'June', 'July', 'August', 'September', 'Octuber', 'November', 'December'];
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
    for (let i = month; i >= 0; i--) {
        labels.push(rawMonthName[i]);
        let countObject = { ...dataLabels };
        rawData.data.map((eachData) => {
            let transDate = new Date(eachData.transDate);
            if (transDate.getMonth() === i) {
                if (countObject.hasOwnProperty(eachData.operation)) {
                    countObject[eachData.operation] = countObject[eachData.operation] + 1;
                }
            }
        })
        Object.keys(countObject).map((eachKey) => {
            dataLabelsArray[eachKey].push(countObject[eachKey]);
        })
    }
    for (let i = 11; i > month; i--) {
        labels.push(rawMonthName[i]);
        let countObject = { ...dataLabels };
        rawData.data.map((eachData) => {
            let transDate = new Date(eachData.transDate);
            if (transDate.getMonth() === i) {
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
                backgroundColor: createDynamicColors(),
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: dataLabelsArray[eachKeys]
            }
        })
    };
}
export const getWeekBarChartData = (dataKey) => {
    let rawDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday', 'Sunday'];
    let labels = [];
    let dataLabels = {};
    let dataLabelsArray = {};
    rawData.data.map((each) => {
        if (!dataLabels.hasOwnProperty(each.operation) && !dataKey.includes(each.operation)) {
            dataLabels[each.operation] = 0;
            dataLabelsArray[each.operation] = [];
        }
    })
    for (let i = 0; i < 7; i++) {
        let myDate = new Date(new Date().setDate(new Date().getDate() - i));
        labels.push(rawDayNames[myDate.getDay()]);
        let countObject = { ...dataLabels };
        rawData.data.map((eachData) => {
            let transDate = new Date(eachData.transDate);
            if (transDate.getMonth() === myDate.getMonth() && transDate.getDay() === myDate.getDay() && transDate.getYear() === myDate.getYear()) {
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
                backgroundColor: createDynamicColors(),
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