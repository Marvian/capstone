import { DataSource } from 'typeorm'
import {
    //dataProduction, cambiar por dataPruebas al momento de produccion
    dataPruebas,
} from './AppDataConfig'
export class AppDataSource {
    private static instanceDataSource: DataSource

    private constructor() {}

    public static getDataSource() {
        if (!this.instanceDataSource) {
            this.instanceDataSource = new DataSource(dataPruebas)
        }

        return this.instanceDataSource
    }
}
