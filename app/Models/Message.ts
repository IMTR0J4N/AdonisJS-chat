import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User';

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(() => User, { foreignKey: "id", localKey: "authorId"})

  @column()
  public authorId: HasOne<typeof User>;

  @column()
  public author: string

  @column()
  public message: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
