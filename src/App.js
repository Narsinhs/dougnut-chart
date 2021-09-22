import React, { useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import "./App.css";
import data from "./data.json"
import { addDynamicColor, calculateTotal, htmlLegendPlugin } from "./helper";
addDynamicColor(data);
const total = calculateTotal(data)
function App() {
  const myChart = useRef();
  return (
    <>
      <div className="header">
        <h1 className="title">Doughnut Chart</h1>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "300px" }}>
          <Doughnut
            ref={myChart}
            data={data}
            plugins={[htmlLegendPlugin, {
              beforeDraw(chart) {
                var width = chart.width,
                  height = chart.height,
                  ctx = chart.ctx;
                ctx.restore();
                var fontSize = (height / 160).toFixed(2);
                ctx.font = fontSize + "em sans-serif";
                ctx.textBaseline = "top";
                let chartData = myChart.current._metasets[0]._parsed;
                let legends = myChart.current.legend.legendItems;
                let totalCount = 0;
                for (let i = 0; i < legends.length; i++) {
                  if (!legends[i].hidden) {
                    totalCount += chartData[i];
                  } else {
                    let element = document.getElementById(`label-${i}`);
                    if (element) {
                      element.innerText = `${legends[i].text}: ${chartData[i]} (0%)`;
                    }
                  }
                }
                var text = totalCount === 0 ? calculateTotal() : totalCount;
                var textX = Math.round((width - ctx.measureText(text).width) / 2);
                var textY = height / 2;
                var text2 = 'Total';
                var text2X = Math.round((width - ctx.measureText(text2).width) / 2);
                var text2Y = height / 3;
                ctx.fillText(text, textX, textY);
                ctx.fillText(text2, text2X, text2Y);
                ctx.save();
              }
            }]}
            options={{
              plugins: {
                htmlLegend: {
                  // ID of the container to put the legend in
                  containerID: "js-legend",
                },

                legend: {
                  display: false,
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      let legends = myChart.current.legend.legendItems;
                      let chartData = myChart.current._metasets[0]._parsed;
                      let count = 0;
                      for (let i = 0; i < legends.length; i++) {
                        if (!legends[i].hidden) {
                          count += chartData[i];
                        }
                      }
                      let label = context.label || "";
                      let percentage = count === 0 ?
                        ((100 * (context.parsed || 0)) / total).toFixed(2) :
                        ((100 * (context.parsed || 0)) / count).toFixed(2)

                      label += ": " + percentage + "%";
                      return label;
                    },
                  },
                },
              },
            }}
          />
        </div>
        <div id="js-legend" className="chart-legend"></div>
      </div>
    </>
  );
}

export default App;
