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
  RollOver,
} from '../models';
import {MedidorRepository} from '../repositories';

export class MedidorRollOverController {
  constructor(
    @repository(MedidorRepository) protected medidorRepository: MedidorRepository,
  ) { }

  @get('/medidors/{id}/roll-overs', {
    responses: {
      '200': {
        description: 'Array of Medidor has many RollOver',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RollOver)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<RollOver>,
  ): Promise<RollOver[]> {
    return this.medidorRepository.rollOvers(id).find(filter);
  }

  @post('/medidors/{id}/roll-overs', {
    responses: {
      '200': {
        description: 'Medidor model instance',
        content: {'application/json': {schema: getModelSchemaRef(RollOver)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Medidor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RollOver, {
            title: 'NewRollOverInMedidor',
            exclude: ['id'],
            optional: ['medidorId']
          }),
        },
      },
    }) rollOver: Omit<RollOver, 'id'>,
  ): Promise<RollOver> {
    return this.medidorRepository.rollOvers(id).create(rollOver);
  }

  @patch('/medidors/{id}/roll-overs', {
    responses: {
      '200': {
        description: 'Medidor.RollOver PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RollOver, {partial: true}),
        },
      },
    })
    rollOver: Partial<RollOver>,
    @param.query.object('where', getWhereSchemaFor(RollOver)) where?: Where<RollOver>,
  ): Promise<Count> {
    return this.medidorRepository.rollOvers(id).patch(rollOver, where);
  }

  @del('/medidors/{id}/roll-overs', {
    responses: {
      '200': {
        description: 'Medidor.RollOver DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(RollOver)) where?: Where<RollOver>,
  ): Promise<Count> {
    return this.medidorRepository.rollOvers(id).delete(where);
  }
}
