import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param, response
} from '@loopback/rest';
import {VMedidorPme} from '../models';
import {VMedidorPmeRepository} from '../repositories';

export class VMedidorPmeController {
  constructor(
    @repository(VMedidorPmeRepository)
    public vMedidorPmeRepository: VMedidorPmeRepository,
  ) { }

  @get('/v-medidor-pmes/count')
  @response(200, {
    description: 'VMedidorPme model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VMedidorPme) where?: Where<VMedidorPme>,
  ): Promise<Count> {
    return this.vMedidorPmeRepository.count(where);
  }

  @get('/v-medidor-pmes')
  @response(200, {
    description: 'Array of VMedidorPme model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VMedidorPme, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(VMedidorPme) filter?: Filter<VMedidorPme>,
  ): Promise<VMedidorPme[]> {
    return this.vMedidorPmeRepository.find(filter);
  }

  @get('/v-medidor-pmes/{id}')
  @response(200, {
    description: 'VMedidorPme model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VMedidorPme, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(VMedidorPme, {exclude: 'where'}) filter?: FilterExcludingWhere<VMedidorPme>
  ): Promise<VMedidorPme> {
    return this.vMedidorPmeRepository.findById(id, filter);
  }
}
