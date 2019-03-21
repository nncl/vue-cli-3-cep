<template>
    <b-container fluid class="bv-example-row mt-3">
        <b-row>
            <b-col class="ml-auto">
                <b-table striped hover :items="items" :fields="fields">
                    <template slot="ações" slot-scope="row">
                        <b-button size="sm" class="mr-2" variant="info"
                                  @click="edit(row)">
                            Editar
                        </b-button>
                        <b-button size="sm" class="mr-2" variant="danger"
                                  @click="remove(row)">
                            Excluir
                        </b-button>
                    </template>
                </b-table>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import PubSub from 'pubsub-js'

    export default {
        name: "List",
        data() {
            return {
                fields: ['cep', 'logradouro', 'complemento', 'ações'],
                items: []
            }
        },
        methods: {
            subscribe() {
                PubSub.subscribe('updateList', (msg, param) => this.items.push(param))
            },
            edit(row) {
                PubSub.publish('editListItem', row.item.cep)
            },
            remove(row) {
                this.items.splice(row.index, 1)
            }
        },
        mounted() {
            this.subscribe()
        }
    }
</script>

<style scoped>

</style>
