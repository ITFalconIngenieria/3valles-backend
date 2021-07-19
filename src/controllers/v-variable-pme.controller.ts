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
import {VVariablePme} from '../models';
import {VVariablePmeRepository} from '../repositories';

export class VVariablePmeController {
  constructor(
    @repository(VVariablePmeRepository)
    public vVariablePmeRepository: VVariablePmeRepository,
  ) { }

  @get('/v-variable-pmes/count')
  @response(200, {
    description: 'VVariablePme model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VVariablePme) where?: Where<VVariablePme>,
  ): Promise<Count> {
    return this.vVariablePmeRepository.count(where);
  }

  @get('/v-variable-pmes')
  @response(200, {
    description: 'Array of VVariablePme model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VVariablePme, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(VVariablePme) filter?: Filter<VVariablePme>,
  ): Promise<VVariablePme[]> {
    return this.vVariablePmeRepository.find(filter);
  }

  @get('/v-variable-pmes/{id}')
  @response(200, {
    description: 'VVariablePme model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VVariablePme, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(VVariablePme, {exclude: 'where'}) filter?: FilterExcludingWhere<VVariablePme>
  ): Promise<VVariablePme> {
    return this.vVariablePmeRepository.findById(id, filter);
  }
}
