import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Medidor,
  VariableMedidor,
} from '../models';
import {MedidorRepository} from '../repositories';

export class MedidorVariableMedidorController {
  constructor(
    @repository(MedidorRepository) protected medidorRepository: MedidorRepository,
  ) { }

  @get('/medidors/{id}/variable-medidors', {
    responses: {
      '200': {
        description: 'Array of Medidor has many VariableMedidor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(VariableMedidor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<VariableMedidor>,
  ): Promise<VariableMedidor[]> {
    return this.medidorRepository.variableMedidors(id).find(filter);
  }

  @post('/medidors/{id}/variable-medidors', {
    responses: {
      '200': {
        description: 'Medidor model instance',
        content: {'application/json': {schema: getModelSchemaRef(VariableMedidor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Medidor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VariableMedidor, {
            title: 'NewVariableMedidorInMedidor',
            exclude: ['id'],
            optional: ['medidorId']
          }),
        },
      },
    }) variableMedidor: Omit<VariableMedidor, 'id'>,
  ): Promise<VariableMedidor> {
    return this.medidorRepository.variableMedidors(id).create(variableMedidor);
  }

  @patch('/medidors/{id}/variable-medidors', {
    responses: {
      '200': {
        description: 'Medidor.VariableMedidor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VariableMedidor, {partial: true}),
        },
      },
    })
    variableMedidor: Partial<VariableMedidor>,
    @param.query.object('where', getWhereSchemaFor(VariableMedidor)) where?: Where<VariableMedidor>,
  ): Promise<Count> {
    return this.medidorRepository.variableMedidors(id).patch(variableMedidor, where);
  }

  @del('/medidors/{id}/variable-medidors', {
    responses: {
      '200': {
        description: 'Medidor.VariableMedidor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(VariableMedidor)) where?: Where<VariableMedidor>,
  ): Promise<Count> {
    return this.medidorRepository.variableMedidors(id).delete(where);
  }
}
