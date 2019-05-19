<template>
	<v-img
		v-if="info.avatar"
		class="white--text blur"
		:lazy-src="info.logo||info.avatar"
		max-height="35vh"
	>
		<v-container
				fluid
				grid-list-lg
		>
			<v-layout row wrap>
				<v-flex xs12>
					<v-card color="transparent" flat class="white--text">
						<v-layout>
							<v-flex xs5>
								<v-img
									class="shadow"
									:src="info.logo||info.avatar"
									cover
								></v-img>
							</v-flex>
							<v-flex xs7>
								<v-card-title >
									<div>
										<div v-if="title" class="subheading text-overflow">{{info.name}}</div>
										<div v-if="subtitle" class="pt-1">{{info.subtitle}}</div>
										<slot name="brief"></slot>
									</div>
								</v-card-title>
							</v-flex>
						</v-layout>
						<slot name="actions"></slot>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</v-img>
</template>

<script>
	
    export default {
        name: "imageCard",
	    props:{
            info:{
                type: Object,
                default: function () {
	                return {}
                }
            },
            content:{
                type: Boolean,
                default: false
            },
            title:{
                type: Boolean,
                default: false
            },
            subtitle:{
                type: Boolean,
                default: false
            },
            isShowBrief:{
                type: Boolean,
                default: false
            },
            rating:{
                type: Number,
                default: 3.3
            }
	    }
    }
</script>

<style scoped>

</style>