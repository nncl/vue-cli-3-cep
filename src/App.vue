<template>
    <div id="app">
        <Form/>
        <List/>
    </div>
</template>

<script>
    import Form from './components/Form'
    import List from './components/List'

    export default {
        name: 'app',
        components: {
            Form,
            List
        }
    }
</script>

<style>
</style>
