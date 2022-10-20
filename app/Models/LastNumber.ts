import { DateTime } from 'luxon'
import { BaseModel, column, scope } from '@ioc:Adonis/Lucid/Orm'

export default class LastNumber extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public date_index: string

  @column()
  public number: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static currentDay = scope((query) => {
    let date = new Date()
    query.where('created_at', 'like', `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}%`)
  })
}
