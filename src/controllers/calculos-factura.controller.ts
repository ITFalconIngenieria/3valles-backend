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
    @param.query.number('cc') cc: number,
    @param.query.number('grupo') grupo: number
  ) {
    return await this.repo.execute(`
      select f.valor factorC,f2.valor factorG from centrocosto cc
      inner join factores f on cc.factorId=f.id
      cross join grupos g
      inner join factores f2 on g.factorId=f2.id
      where cc.id=${cc} and g.id=${grupo}
    `)
  }
}
