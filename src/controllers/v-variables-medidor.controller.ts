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
import {VVariablesMedidor} from '../models';
import {VVariablesMedidorRepository} from '../repositories';

export class VVariablesMedidorController {
  constructor(
    @repository(VVariablesMedidorRepository)
    public vVariablesMedidorRepository: VVariablesMedidorRepository,
  ) { }

  @get('/v-variables-medidors/count')
  @response(200, {
    description: 'VVariablesMedidor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VVariablesMedidor) where?: Where<VVariablesMedidor>,
  ): Promise<Count> {
    return this.vVariablesMedidorRepository.count(where);
  }

  @get('/v-variables-medidors')
  @response(200, {
    description: 'Array of VVariablesMedidor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VVariablesMedidor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(VVariablesMedidor) filter?: Filter<VVariablesMedidor>,
  ): Promise<VVariablesMedidor[]> {
    return this.vVariablesMedidorRepository.find(filter);
  }

  @get('/v-variables-medidors/{id}')
  @response(200, {
    description: 'VVariablesMedidor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VVariablesMedidor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(VVariablesMedidor, {exclude: 'where'}) filter?: FilterExcludingWhere<VVariablesMedidor>
  ): Promise<VVariablesMedidor> {
    return this.vVariablesMedidorRepository.findById(id, filter);
  }
}
