import express from 'express'
import { WeaterService, CanvasService, ExcelService } from './services'

const app = express()

const start = async () => {
  const { timestamps, temperatures } = await WeaterService.getStructuredWeather()
  const dataUrl = await (new CanvasService(800, 800)).getDataUrl(timestamps, temperatures)
  await (new ExcelService(800, 800)).createExcel(dataUrl, timestamps, temperatures)

  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  })
}

start()
