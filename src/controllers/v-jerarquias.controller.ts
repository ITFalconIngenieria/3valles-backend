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
import {VJerarquias} from '../models';
import {VJerarquiasRepository} from '../repositories';

export class VJerarquiasController {
  constructor(
    @repository(VJerarquiasRepository)
    public vJerarquiasRepository: VJerarquiasRepository,
  ) { }

  @get('/v-jerarquias/count')
  @response(200, {
    description: 'VJerarquias model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VJerarquias) where?: Where<VJerarquias>,
  ): Promise<Count> {
    return this.vJerarquiasRepository.count(where);
  }

  @get('/v-jerarquias')
  @response(200, {
    description: 'Array of VJerarquias model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VJerarquias, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(VJerarquias) filter?: Filter<VJerarquias>,
  ): Promise<VJerarquias[]> {
    return this.vJerarquiasRepository.find(filter);
  }

  @get('/v-jerarquias/{id}')
  @response(200, {
    description: 'VJerarquias model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VJerarquias, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(VJerarquias, {exclude: 'where'}) filter?: FilterExcludingWhere<VJerarquias>
  ): Promise<VJerarquias> {
    return this.vJerarquiasRepository.findById(id, filter);
  }
}
