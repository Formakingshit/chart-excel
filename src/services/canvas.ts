import { ChartJSNodeCanvas } from 'chartjs-node-canvas'

export class CanvasService {
  constructor(private width: number, private height: number) { }

  public async getDataUrl(timestamps: string[], temperatures: number[]) {
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: this.width, height: this.height })

    const configuration = {
      type: 'line',
      data: {
        labels: timestamps.filter((el: string, index: number) => {
          if (!(index % 5)) {
            return el
          }
        }),
        datasets: [{
          label: 'Temperature line diagram',
          data: temperatures,
          borderColor: 'rgba(255, 99, 132, 1)',
          fill: false,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }

    return await chartJSNodeCanvas.renderToDataURL(configuration)
  }
}
