// Uncomment these imports to begin using these cool features!

import {repository} from '@loopback/repository';
import {get, param} from '@loopback/rest';
import {MedidoresCentroCostoRepository} from '../repositories';

// import {inject} from '@loopback/core';


export class CalculosFacturaController {
  constructor(
    @repository(MedidoresCentroCostoRepository) public repo: MedidoresCentroCostoRepository
  ) { }

  @get('/consumo-medidores')
  async consumoMedidores(
    @param.query.number('cc') cc: number,
    @param.query.string('f1') f1: string,
    @param.query.string('f2') f2: string
  ) {
    return await this.repo.execute(`spLecturaFactura ${cc},'${f1}','${f2}'`)
  }

  @get('/factores-factura')
  async factoresFactura(
    @param.query.number('grupo') grupo: number
  ) {
    return await this.repo.execute(`
    select f.valor from grupos g
    inner join factores f on f.id=g.factorId
    where g.id=${grupo}
    `)
  }

  @get('/generacion')
  async generacionInterna(
    @param.query.boolean('tipo') tipo: boolean,
    @param.query.string('f1') f1: string,
    @param.query.string('f2') f2: string
  ) {
    return await this.repo.execute(`spLecturaGeneracion ${tipo},'${f1}','${f2}'`)
  }

  @get('/ventaEnee')
  async ventEnee(
    @param.query.string('f1') f1: string,
    @param.query.string('f2') f2: string
  ) {
    return await this.repo.execute(`spLecturaVentaENEE '${f1}','${f2}'`)
  }
}
