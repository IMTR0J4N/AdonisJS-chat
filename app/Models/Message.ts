import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User';

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public authorId: number;

  @hasOne(() => User, { foreignKey: "id", localKey: "authorId"})
  public author: HasOne<typeof User>

  @column()
  public message: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
