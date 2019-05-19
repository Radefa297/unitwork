<template>
	<v-container fluid  fill-height >
		<v-layout row wrap app>
			<v-flex
					align-center
					justify-center
					text-xs-center
			>
				<v-img
					:src="require('~/images/no_data_c.png')"
					max-height="300"
					contain
				></v-img>
				<blockquote  class="blockquote text-xs-center pa-3">{{blockquote}}</blockquote>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
    export default {
        name: "noResults",
	    props: {
            blockquote: {}
	    }
    }
</script>

<style scoped>

</style>