import axios from 'axios'

export default class CepService {
    doGet(address) {
        return axios.get(`http://viacep.com.br/ws/${address}/json/`)
    }
}
