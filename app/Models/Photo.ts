import { DateTime } from 'luxon'
import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Photo extends BaseModel {
  @column({ isPrimary: true})
  public id: string

  @column()
  public collection_name: string

  @column()
  public name: string

  @column()
  public file_name: string

  @column()
  public mime_type: string | undefined

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @computed()
  public get full_path() {
    return `public/${this.collection_name}/${this.file_name}`
  }
}
