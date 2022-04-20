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
import {CentroCosto} from '../models';
import {CentroCostoRepository} from '../repositories';

export class CentroCostoController {
  constructor(
    @repository(CentroCostoRepository)
    public centroCostoRepository : CentroCostoRepository,
  ) {}

  @post('/centro-costos')
  @response(200, {
    description: 'CentroCosto model instance',
    content: {'application/json': {schema: getModelSchemaRef(CentroCosto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CentroCosto, {
            title: 'NewCentroCosto',
            exclude: ['id'],
          }),
        },
      },
    })
    centroCosto: Omit<CentroCosto, 'id'>,
  ): Promise<CentroCosto> {
    return this.centroCostoRepository.create(centroCosto);
  }

  @get('/centro-costos/count')
  @response(200, {
    description: 'CentroCosto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CentroCosto) where?: Where<CentroCosto>,
  ): Promise<Count> {
    return this.centroCostoRepository.count(where);
  }

  @get('/centro-costos')
  @response(200, {
    description: 'Array of CentroCosto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CentroCosto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CentroCosto) filter?: Filter<CentroCosto>,
  ): Promise<CentroCosto[]> {
    return this.centroCostoRepository.find(filter);
  }

  @patch('/centro-costos')
  @response(200, {
    description: 'CentroCosto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CentroCosto, {partial: true}),
        },
      },
    })
    centroCosto: CentroCosto,
    @param.where(CentroCosto) where?: Where<CentroCosto>,
  ): Promise<Count> {
    return this.centroCostoRepository.updateAll(centroCosto, where);
  }

  @get('/centro-costos/{id}')
  @response(200, {
    description: 'CentroCosto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CentroCosto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CentroCosto, {exclude: 'where'}) filter?: FilterExcludingWhere<CentroCosto>
  ): Promise<CentroCosto> {
    return this.centroCostoRepository.findById(id, filter);
  }

  @patch('/centro-costos/{id}')
  @response(204, {
    description: 'CentroCosto PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CentroCosto, {partial: true}),
        },
      },
    })
    centroCosto: CentroCosto,
  ): Promise<void> {
    await this.centroCostoRepository.updateById(id, centroCosto);
  }

  @put('/centro-costos/{id}')
  @response(204, {
    description: 'CentroCosto PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() centroCosto: CentroCosto,
  ): Promise<void> {
    await this.centroCostoRepository.replaceById(id, centroCosto);
  }

  @del('/centro-costos/{id}')
  @response(204, {
    description: 'CentroCosto DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.centroCostoRepository.deleteById(id);
  }
}
