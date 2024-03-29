import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'conn',
  connector: 'mssql',
  //url: 'mssql://dev:Control1*@SRVPME01-3VALLE\\ION/facturacionEnergetica',
  host: 'LaptopIT',//'SRVPME01-3VALLE\\ION',
  port: 1433,
  user: 'sa',// 'dev',
  password: 'control1*',//Control1*',
  database: 'facturacionEnergetica',
  requestTimeout: 60000
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ConnDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'conn';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.conn', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
