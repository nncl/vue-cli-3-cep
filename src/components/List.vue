<template>
    <b-container fluid class="bv-example-row mt-3">
        <b-row>
            <b-col class="ml-auto">
                <b-table striped hover :items="items" :fields="fields" />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import PubSub from 'pubsub-js'

    export default {
        name: "List",
        data(){
            return {
                fields: ['cep', 'logradouro', 'complemento'],
                items: []
            }
        },
        methods:{
            subscribe(){
                PubSub.subscribe('updateList', (msg, param) => this.items.push(param))
            }
        },
        mounted() {
            this.subscribe()
        }
    }
</script>

<style scoped>

</style>
