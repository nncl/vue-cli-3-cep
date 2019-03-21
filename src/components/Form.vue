<template>
    <div>

        <b-container fluid class="mt-3">
            <b-row>
                <b-col>
                    <b-form @submit="searchZipCode">
                        <b-form-group
                                id="zipcodeGroup"
                                label="Procure por endereços"
                                label-for="zipcodeInput"
                                description="Busque pelo CEP e visualize abaixo as informações de endereço">
                            <b-form-input
                                    id="cep"
                                    type="tel"
                                    v-model="form.zipcode"
                                    v-mask="'#####-###'"
                                    required
                                    placeholder="Digite o CEP"/>
                        </b-form-group>

                        <b-alert variant="danger" v-model="error">
                            Erro ao obter CEP, tente novamente.
                        </b-alert>

                        <b-button type="submit"
                                  variant="info"
                                  :disabled="isLoading">
                            <span v-if="!isLoading">Procurar</span>
                            <b-spinner small v-else/>
                        </b-button>
                    </b-form>
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>

<script>
    import CepService from '../services/cep'
    import PubSub from 'pubsub-js'

    const cepService = new CepService();

    export default {
        name: 'Form',
        props: {
            cep: String
        },
        data() {
            return {
                form: {
                    zipcode: ''
                },
                error: null,
                isLoading: false
            }
        },
        mounted() {
            this.searchStaticZipCodes();
            this.subscribe();
        },
        methods: {
            searchZipCode(e) {
                e.preventDefault();

                if (!this.form.zipcode || this.form.zipcode.length !== 9) return

                this.isLoading = true

                cepService.doGet(this.form.zipcode)
                    .then((res) => {
                        this.error = res.data.erro
                        this.isLoading = false
                        if (!this.error) this.publish(res.data)
                    })
                    .catch((err) => {
                        this.error = err
                        this.isLoading = false
                    })
            },
            searchStaticZipCodes() {
                const zipcodes = []
                for (let i = 1; i <= 10; i++) {
                    zipcodes.push(`04104-0${i}0`)
                }
                cepService.doGetList(zipcodes)
                    .then(this.bindZipCodes)
            },
            bindZipCodes(addressesPromises) {
                addressesPromises.addresses.map((item) => item.then((res) => this.publish(res.data)))
            },
            publish(address) {
                PubSub.publish('updateList', address)
            },
            subscribe(){
                PubSub.subscribe('editListItem', (msg, zipcode) => this.form.zipcode = zipcode)
            }
        }
    }
</script>

<style scoped>

</style>
