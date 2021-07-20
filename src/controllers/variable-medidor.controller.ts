import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {VariableMedidor} from '../models';
import {VariableMedidorRepository, VVariablesMedidorRepository} from '../repositories';

export class VariableMedidorController {
  constructor(
    @repository(VariableMedidorRepository)
    public variableMedidorRepository: VariableMedidorRepository,
    @repository(VVariablesMedidorRepository)
    public vVariablesMedidorRepository: VVariablesMedidorRepository
  ) { }

  @post('/variable-medidors')
  @response(200, {
    description: 'VariableMedidor model instance',
    content: {'application/json': {schema: getModelSchemaRef(VariableMedidor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VariableMedidor, {
            title: 'NewVariableMedidor',
            exclude: ['id'],
          }),
        },
      },
    })
    variableMedidor: Omit<VariableMedidor, 'id'>,
  ): Promise<any> {
    const data = await this.variableMedidorRepository.create(variableMedidor);
    return await this.vVariablesMedidorRepository.findById(data.id, {});
  }

  @get('/variable-medidors/count')
  @response(200, {
    description: 'VariableMedidor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VariableMedidor) where?: Where<VariableMedidor>,
  ): Promise<Count> {
    return this.variableMedidorRepository.count(where);
  }

  @get('/variable-medidors')
  @response(200, {
    description: 'Array of VariableMedidor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VariableMedidor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(VariableMedidor) filter?: Filter<VariableMedidor>,
  ): Promise<VariableMedidor[]> {
    return this.variableMedidorRepository.find(filter);
  }

  @patch('/variable-medidors')
  @response(200, {
    description: 'VariableMedidor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VariableMedidor, {partial: true}),
        },
      },
    })
    variableMedidor: VariableMedidor,
    @param.where(VariableMedidor) where?: Where<VariableMedidor>,
  ): Promise<Count> {
    return this.variableMedidorRepository.updateAll(variableMedidor, where);
  }

  @get('/variable-medidors/{id}')
  @response(200, {
    description: 'VariableMedidor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VariableMedidor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(VariableMedidor, {exclude: 'where'}) filter?: FilterExcludingWhere<VariableMedidor>
  ): Promise<VariableMedidor> {
    return this.variableMedidorRepository.findById(id, filter);
  }

  @patch('/variable-medidors/{id}')
  @response(204, {
    description: 'VariableMedidor PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VariableMedidor, {partial: true}),
        },
      },
    })
    variableMedidor: VariableMedidor,
  ): Promise<void> {
    return await this.variableMedidorRepository.updateById(id, variableMedidor);
  }

  @put('/variable-medidors/{id}')
  @response(204, {
    description: 'VariableMedidor PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() variableMedidor: VariableMedidor,
  ): Promise<any> {
    await this.variableMedidorRepository.replaceById(id, variableMedidor);
    return await this.vVariablesMedidorRepository.findById(id, {});
  }

  @del('/variable-medidors/{id}')
  @response(204, {
    description: 'VariableMedidor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.variableMedidorRepository.deleteById(id);
  }
}
