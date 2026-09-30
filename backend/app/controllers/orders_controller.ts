import type { HttpContext } from '@adonisjs/core/http'
import Order from '#models/order'
import Customer from '#models/customer'
import Product from '#models/product'
import OrderItem from '#models/order_item'

export default class OrdersController {
  async index() {
    const orders = await Order.all()
    return orders
  }
  async show({ params }: HttpContext) {
    const order = await Order.query().where('id', params.id).preload('items').first()

    if (!order) {
      return { message: 'Pedido não encontrado' }
    }

    return order
  }

  async store({ request }: HttpContext) {
    const { customer_id, produtos } = request.only(['customer_id', 'produtos'])
    const customer = await Customer.find(customer_id)
    if (!customer) {
      return { message: 'Cliente não encontrado' }
    }

    if (!produtos || produtos.length === 0) {
      return { message: 'O pedido precisa ter pelo menos um produto' }
    }

    for (const item of produtos) {
      const product = await Product.find(item.product_id)

      if (!product) {
        return { message: `Produto ${item.product_id} não encontrado` }
      }
      if (!product.ativo) {
        return { message: `Produto ${product.nome} está inativo` }
      }
      if (!item.quantidade || item.quantidade < 1) {
        return { message: `Quantidade inválida para o produto ${product.nome}` }
      }
    }

    const order = await Order.create({ customerId: customer_id })

    let total = 0

    for (const item of produtos) {
      const product = await Product.find(item.product_id)

      if (!product) {
        continue
      }

      const totalItem = product.preco * item.quantidade

      await OrderItem.create({
        orderId: order.id,
        productId: product.id,
        quantidade: item.quantidade,
        precoUnitario: product.preco,
        totalItem: totalItem,
      })
      total += totalItem
    }
    order.total = total
    await order.save()
    return order
  }

  async updateStatus({ params, request }: HttpContext) {
    const transicoesValidas: Record<string, string[]> = {
      'Pendente': ['Em preparação', 'Cancelado'],
      'Em preparação': ['Pronto', 'Cancelado'],
      'Pronto': ['Finalizado', 'Cancelado'],
      'Finalizado': [],
      'Cancelado': [],
    }
    const order = await Order.find(params.id)

    if (!order) {
      return { message: 'Pedido não encontrado' }
    }

    const { status } = request.only(['status'])
    const statusPermitidos = transicoesValidas[order.status]

    if (!statusPermitidos.includes(status)) {
      return { message: `Não é possível mudar de "${order.status}" para "${status}"` }
    }

    order.status = status
    await order.save()
    return order
  }
}
