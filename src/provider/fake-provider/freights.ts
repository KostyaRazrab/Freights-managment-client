import {fakeFreights} from './fake-data/freigths'
import { IFreight } from '../../models'

export const fetchFreights = (): Promise<IFreight[]> => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(fakeFreights)
            rej('Ошибка получения данных')
        }, 1000)
    })
}