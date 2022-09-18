<template>
    <div class="hello">
        {{ hello }}
    </div>
</template>

<script>
import HelloQuery from '~/graphql/queries/Hello.graphql'

export default {

    apollo: {
        hello: {
            query: HelloQuery
        }
    }

}
</script>

<style>

</style>
