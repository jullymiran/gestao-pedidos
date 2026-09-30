import { OrderSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import OrderItem from '#models/order_item'

export default class Order extends OrderSchema {
  @hasMany(() => OrderItem)
  declare items: HasMany<typeof OrderItem>
}
