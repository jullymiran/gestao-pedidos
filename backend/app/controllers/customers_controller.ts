import type { HttpContext } from '@adonisjs/core/http'
import Customer from '#models/customer'
export default class CustomersController {
  async index() {
    const customers = await Customer.all()
    return customers
  }
  async store({ request }: HttpContext) {
    const data = request.only(['nome', 'telefone'])
    const customer = await Customer.create(data)
    return customer
  }
  async show({ params }: HttpContext) {
    const customer = await Customer.find(params.id)
    return customer
  }
  async update({ params, request }: HttpContext) {
    const customer = await Customer.find(params.id)
    if (!customer) {
      return { message: 'Cliente não encontrado' }
    }
    const data = request.only(['nome', 'telefone'])
    customer.merge(data)
    await customer.save()
    return customer
  }
}
