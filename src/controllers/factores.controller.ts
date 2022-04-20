import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Factores} from '../models';
import {FactoresRepository} from '../repositories';

export class FactoresController {
  constructor(
    @repository(FactoresRepository)
    public factoresRepository : FactoresRepository,
  ) {}

  @post('/factores')
  @response(200, {
    description: 'Factores model instance',
    content: {'application/json': {schema: getModelSchemaRef(Factores)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factores, {
            title: 'NewFactores',
            exclude: ['id'],
          }),
        },
      },
    })
    factores: Omit<Factores, 'id'>,
  ): Promise<Factores> {
    return this.factoresRepository.create(factores);
  }

  @get('/factores/count')
  @response(200, {
    description: 'Factores model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Factores) where?: Where<Factores>,
  ): Promise<Count> {
    return this.factoresRepository.count(where);
  }

  @get('/factores')
  @response(200, {
    description: 'Array of Factores model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Factores, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Factores) filter?: Filter<Factores>,
  ): Promise<Factores[]> {
    return this.factoresRepository.find(filter);
  }

  @patch('/factores')
  @response(200, {
    description: 'Factores PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factores, {partial: true}),
        },
      },
    })
    factores: Factores,
    @param.where(Factores) where?: Where<Factores>,
  ): Promise<Count> {
    return this.factoresRepository.updateAll(factores, where);
  }

  @get('/factores/{id}')
  @response(200, {
    description: 'Factores model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Factores, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Factores, {exclude: 'where'}) filter?: FilterExcludingWhere<Factores>
  ): Promise<Factores> {
    return this.factoresRepository.findById(id, filter);
  }

  @patch('/factores/{id}')
  @response(204, {
    description: 'Factores PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factores, {partial: true}),
        },
      },
    })
    factores: Factores,
  ): Promise<void> {
    await this.factoresRepository.updateById(id, factores);
  }

  @put('/factores/{id}')
  @response(204, {
    description: 'Factores PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() factores: Factores,
  ): Promise<void> {
    await this.factoresRepository.replaceById(id, factores);
  }

  @del('/factores/{id}')
  @response(204, {
    description: 'Factores DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.factoresRepository.deleteById(id);
  }
}
