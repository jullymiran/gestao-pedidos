import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'

export default class ProductsController {
  async index() {
    const products = await Product.all()
    return products
  }
  async store({ request }: HttpContext) {
    const data = request.only(['nome', 'preco', 'ativo'])
    if (!data.nome) {
      return { message: 'O nome é obrigatório' }
    }

    const product = await Product.create(data)
    return product
  }
  async show({ params }: HttpContext) {
    const product = await Product.find(params.id)
    return product
  }
  async update({ params, request }: HttpContext) {
    const product = await Product.find(params.id)

    if (!product) {
      return { message: 'Produto não encontrado' }
    }

    const data = request.only(['nome', 'preco', 'ativo'])
    product.merge(data)
    await product.save()
    return product
  }
}
