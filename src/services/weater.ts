import axios from 'axios'

export class WeaterService {
  private static openWeatherUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=London,uk&units=metric&APPID=2aabf6ec517e2be2d3469eefe89ded07'

  public static async getStructuredWeather() {
    const openWeatherData = await axios.get(this.openWeatherUrl)

    const temperatures: number[] = []
    const timestamps: string[] = []

    openWeatherData.data.list.forEach((el: any) => {
      temperatures.push(el.main.temp)
      timestamps.push(el.dt_txt)
    })

    return { temperatures, timestamps }
  }
}
