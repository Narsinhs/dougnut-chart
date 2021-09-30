import React, { useState } from "react"
import { Bar } from "react-chartjs-2";
import { getMonthBarChartData, getWeekBarChartData, getYearBarChartData } from "../dataHelper";
const filters = {
    "Week": "Week",
    "Month": "Month",
    "Year": "Year"
}
const BarChart = ({ notSelectedLabels }) => {
    const [filterType, setFilterType] = useState(filters.Year)
    const getData = () => {
        let data = [];
        if (filterType === filters.Week) {
            data = getWeekBarChartData(notSelectedLabels || [])
        } else if (filterType === filters.Month) {
            data = getMonthBarChartData(notSelectedLabels || []);
        } else {
            data = getYearBarChartData(notSelectedLabels || []);
        }
        return data;
    }

    const renderFilterBox = (text, type, selected) => {
        return (
            <button class={`btn ${selected ? 'active' : ''}`} onClick={() => setFilterType(type)}> {text}</button>
        )
    }
    // console.log(getData())
    let data = getData();
    console.log(data)
    return (
        <div style={{ marginTop: "1px",marginRight : "50px" }}>
            <div style={{ marginBottom: "5px", display: 'flex', flex: 1, justifyContent: 'space-around' }}>
                {renderFilterBox('7 Days Filter', filters.Week, filters.Week === filterType)}
                {renderFilterBox('30 Days Filter', filters.Month, filters.Month === filterType)}
                {renderFilterBox('Year Filter', filters.Year, filters.Year === filterType)}
            </div>
            <Bar data={data} height={70}  options={{
                
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {

                        // type: 'time',
                        grid: {
                            display : false
                        }
                        // title: {
                        //     display: true,
                        //     text: 'Date'
                        // },
                        // ticks: {
                        //     major: {
                        //         enabled: true
                        //     },
                        //     color: (context) => context.tick && context.tick.major && '#FF0000',
                        //     font: function (context) {
                        //         if (context.tick && context.tick.major) {
                        //             return {
                        //                 weight: 'bold'
                        //             };
                        //         }
                        //     }
                        // }
                    },
                    y: {
                        min :0,
                        max : 10,
                        // display: true,
                        grid:{
                            display : true
                        }
                    }
                }
            }} />
        </div>
    )
}
export default BarChart;