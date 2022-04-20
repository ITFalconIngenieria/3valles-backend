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
import {MedidoresCentroCosto} from '../models';
import {MedidoresCentroCostoRepository} from '../repositories';

export class MedidoresCentroCostoController {
  constructor(
    @repository(MedidoresCentroCostoRepository)
    public medidoresCentroCostoRepository : MedidoresCentroCostoRepository,
  ) {}

  @post('/medidores-centro-costos')
  @response(200, {
    description: 'MedidoresCentroCosto model instance',
    content: {'application/json': {schema: getModelSchemaRef(MedidoresCentroCosto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedidoresCentroCosto, {
            title: 'NewMedidoresCentroCosto',
            exclude: ['id'],
          }),
        },
      },
    })
    medidoresCentroCosto: Omit<MedidoresCentroCosto, 'id'>,
  ): Promise<MedidoresCentroCosto> {
    return this.medidoresCentroCostoRepository.create(medidoresCentroCosto);
  }

  @get('/medidores-centro-costos/count')
  @response(200, {
    description: 'MedidoresCentroCosto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MedidoresCentroCosto) where?: Where<MedidoresCentroCosto>,
  ): Promise<Count> {
    return this.medidoresCentroCostoRepository.count(where);
  }

  @get('/medidores-centro-costos')
  @response(200, {
    description: 'Array of MedidoresCentroCosto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MedidoresCentroCosto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MedidoresCentroCosto) filter?: Filter<MedidoresCentroCosto>,
  ): Promise<MedidoresCentroCosto[]> {
    return this.medidoresCentroCostoRepository.find(filter);
  }

  @patch('/medidores-centro-costos')
  @response(200, {
    description: 'MedidoresCentroCosto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedidoresCentroCosto, {partial: true}),
        },
      },
    })
    medidoresCentroCosto: MedidoresCentroCosto,
    @param.where(MedidoresCentroCosto) where?: Where<MedidoresCentroCosto>,
  ): Promise<Count> {
    return this.medidoresCentroCostoRepository.updateAll(medidoresCentroCosto, where);
  }

  @get('/medidores-centro-costos/{id}')
  @response(200, {
    description: 'MedidoresCentroCosto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MedidoresCentroCosto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MedidoresCentroCosto, {exclude: 'where'}) filter?: FilterExcludingWhere<MedidoresCentroCosto>
  ): Promise<MedidoresCentroCosto> {
    return this.medidoresCentroCostoRepository.findById(id, filter);
  }

  @patch('/medidores-centro-costos/{id}')
  @response(204, {
    description: 'MedidoresCentroCosto PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedidoresCentroCosto, {partial: true}),
        },
      },
    })
    medidoresCentroCosto: MedidoresCentroCosto,
  ): Promise<void> {
    await this.medidoresCentroCostoRepository.updateById(id, medidoresCentroCosto);
  }

  @put('/medidores-centro-costos/{id}')
  @response(204, {
    description: 'MedidoresCentroCosto PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() medidoresCentroCosto: MedidoresCentroCosto,
  ): Promise<void> {
    await this.medidoresCentroCostoRepository.replaceById(id, medidoresCentroCosto);
  }

  @del('/medidores-centro-costos/{id}')
  @response(204, {
    description: 'MedidoresCentroCosto DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.medidoresCentroCostoRepository.deleteById(id);
  }
}
