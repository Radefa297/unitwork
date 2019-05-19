<template>
	<v-text-field
		:placeholder="placeholder"
		v-model="query"
		class="searchInput"
		clearable
		@change="change"
		flat
		solo
		color="yellow darken-2"
		prepend-inner-icon="search"
		@click:clear="clear"
	>
		<template v-slot:append-outer>
			<div class="v-btn__content white--text pt-2" @click="cancel">取消</div>
		</template>
	</v-text-field>
</template>

<script>
    export default {
        name: "searchInput",
	    props:{
            value: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: '搜索歌曲、歌单、专辑'
          }
	    },
	    data() {
            return {
                query: ''
            }
	    },
	    mounted(){
            this.query = this.value
	    },
	    watch: {
            value(value){
                this.query = value
            }
	    },
	    methods:{
            cancel(){
                this.$emit('v-cancel')
            },
            change(value){
                this.$emit('v-change',value)
            },
            clear(value){
                this.$emit('v-clear')
            }
	    }
    }
</script>

<style scoped>

</style>