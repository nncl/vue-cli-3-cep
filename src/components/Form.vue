<template>
    <div>

        <b-container fluid class="bv-example-row">
            <b-row>
                <b-col>
                    <b-form @submit="searchCep">
                        <b-form-group
                                id="exampleInputGroup1"
                                label="Procure por endereços"
                                label-for="exampleInput1"
                                description="Busque pelo CEP e visualize abaixo as informações de endereço">
                            <b-form-input
                                    id="cep"
                                    type="tel"
                                    v-model="form.cep"
                                    v-mask="'#####-###'"
                                    required
                                    placeholder="Digite o CEP"/>
                        </b-form-group>

                        <b-alert variant="danger" v-model="error">
                            Erro ao obter CEP, tente novamente.
                        </b-alert>

                        <b-button type="submit"
                                  variant="primary"
                                  :disabled="isLoading">
                            <span v-if="!isLoading">Procurar</span>
                            <span v-else>Procurando...</span>
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
                    cep: ''
                },
                error: null,
                isLoading: false
            }
        },
        methods: {
            searchCep(e) {
                e.preventDefault();

                if (!this.form.cep || this.form.cep.length !== 9) return

                this.isLoading = true

                cepService.doGet(this.form.cep)
                    .then((res) => {
                        this.error = res.data.erro
                        this.isLoading = false
                        if (!this.error) PubSub.publish('updateList', res.data)
                    })
                    .catch((err) => {
                        this.error = err
                        this.isLoading = false
                    })
            }
        }
    }
</script>

<style scoped>

</style>
