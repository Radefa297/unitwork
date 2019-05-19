<template>
	<v-snackbar
		v-model="isShow"
		:color="color"
		:timeout="timeout"
		bottom
		class="snackbar-wrap"
		left
		auto-height
	>
<!--		<v-btn-->
<!--			dark-->
<!--			flat-->
<!--			color="white"-->
<!--		>-->
<!--			<v-icon>notifications</v-icon>-->
<!--		</v-btn>-->
		{{ msg }}
		<v-btn
			dark
			flat
			@click="isShow = false"
		>
			<v-icon small>close</v-icon>
		</v-btn>
	</v-snackbar>
</template>

<script>
    export default {
        name: "snackbar",
	    props: {
            value: {},
            color: {
                type: String,
	            default: ''
            },
            timeout: {
                type: Number,
	            default: 4000
            },
            isShow: {
                type: Boolean,
                default: true
            },
            msg: {
                type: String,
                default: ''
            }
	    },
    }
</script>

<style scoped>
	.snackbar-wrap{
		margin: 3%;
	}
</style>