import axios from 'axios'

export default class CepService {
    doGet(address) {
        return axios.get(`http://viacep.com.br/ws/${address}/json/`)
    }

    async doGetList(arr) {
        let [addresses] = await Promise.all([
            arr.map((item) => this.doGet(item))
        ])
        return {
            addresses
        }
    }
}
