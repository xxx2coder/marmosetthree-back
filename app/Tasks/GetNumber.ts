import {BaseTask} from 'adonis5-scheduler/build'
import LastNumber from "App/Models/LastNumber"

export default class GetNumber extends BaseTask {
  public static get schedule() {
    // return '0,15,30 16,17 * * 4'
    return '* * * * *'
  }

  /**
   * Set enable use .lock file for block run retry task
   * Lock file save to `build/tmpTaskLock`
   */
  public static get useLock() {
    return false
  }

  public async handle() {
    let date = new Date()
    let index = await LastNumber.query().withScopes((scopes) => scopes.currentDay()).length

    if (index > 6) {
      return false;
    }

    let date_index = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}-${(index + 1)}`

    if (await LastNumber.findBy('date_index', date_index)) {
      return false
    }

    // const number = await this.getBtcNumber()
    await LastNumber.create({
      date_index: date_index,
      number: 5
    })

    return true
  }

  // private async getBtcNumber() {
  //   const api = "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT";
  //   let data = await axios.get(api);
  //   data = String(Math.trunc(data.data.price)).split("");
  //   data = data[data.length - 1];
  //   return Number(data);
  // }
}
