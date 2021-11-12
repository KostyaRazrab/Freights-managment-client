import axios from 'axios'
import { FreightAPI } from '../types/freight-api'

const apiUrl = 'http://localhost:8000'

export const freightService: FreightAPI = {
    getAllFreights(){
        return axios.get(`${apiUrl}/freights`)
    },

    createFreight(freight){
        return axios.post(`${apiUrl}/freights`, freight)
    },
    deleteFreight(freightId){
        return axios.delete(`${apiUrl}/freights/${freightId}`)
    },
    updateFreight(freightId, freight){
        return axios.put(`${apiUrl}/freights/${freightId}`, freight)
    }
}