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
import {Transformaciones} from '../models';
import {TransformacionesRepository} from '../repositories';

export class TransformacionesController {
  constructor(
    @repository(TransformacionesRepository)
    public transformacionesRepository : TransformacionesRepository,
  ) {}

  @post('/transformaciones')
  @response(200, {
    description: 'Transformaciones model instance',
    content: {'application/json': {schema: getModelSchemaRef(Transformaciones)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transformaciones, {
            title: 'NewTransformaciones',
            exclude: ['id'],
          }),
        },
      },
    })
    transformaciones: Omit<Transformaciones, 'id'>,
  ): Promise<Transformaciones> {
    return this.transformacionesRepository.create(transformaciones);
  }

  @get('/transformaciones/count')
  @response(200, {
    description: 'Transformaciones model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Transformaciones) where?: Where<Transformaciones>,
  ): Promise<Count> {
    return this.transformacionesRepository.count(where);
  }

  @get('/transformaciones')
  @response(200, {
    description: 'Array of Transformaciones model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Transformaciones, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Transformaciones) filter?: Filter<Transformaciones>,
  ): Promise<Transformaciones[]> {
    return this.transformacionesRepository.find(filter);
  }

  @patch('/transformaciones')
  @response(200, {
    description: 'Transformaciones PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transformaciones, {partial: true}),
        },
      },
    })
    transformaciones: Transformaciones,
    @param.where(Transformaciones) where?: Where<Transformaciones>,
  ): Promise<Count> {
    return this.transformacionesRepository.updateAll(transformaciones, where);
  }

  @get('/transformaciones/{id}')
  @response(200, {
    description: 'Transformaciones model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Transformaciones, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Transformaciones, {exclude: 'where'}) filter?: FilterExcludingWhere<Transformaciones>
  ): Promise<Transformaciones> {
    return this.transformacionesRepository.findById(id, filter);
  }

  @patch('/transformaciones/{id}')
  @response(204, {
    description: 'Transformaciones PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transformaciones, {partial: true}),
        },
      },
    })
    transformaciones: Transformaciones,
  ): Promise<void> {
    await this.transformacionesRepository.updateById(id, transformaciones);
  }

  @put('/transformaciones/{id}')
  @response(204, {
    description: 'Transformaciones PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() transformaciones: Transformaciones,
  ): Promise<void> {
    await this.transformacionesRepository.replaceById(id, transformaciones);
  }

  @del('/transformaciones/{id}')
  @response(204, {
    description: 'Transformaciones DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.transformacionesRepository.deleteById(id);
  }
}
