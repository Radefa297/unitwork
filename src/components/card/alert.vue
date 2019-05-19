<template>
	<v-dialog v-model="show" persistent max-width="60%" @click.stop>
		<v-card class="text-xs-center radius-20">
			<v-card-title v-if="type">
				<v-spacer></v-spacer>
				<v-icon size="50">{{type|filterType}}</v-icon>
				<v-spacer></v-spacer>
			</v-card-title>
			<v-card-text>
				<p v-if="title" class="subheading font-weight-bold grey--text text--darken-2">{{title}}</p>
				<p v-if="subheading" class="grey--text text--darken-2">{{subheading}}</p>
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions>
				<v-btn block color="yellow darken-2" flat @click.stop="disagree">{{disagreeContent}}</v-btn>
				<v-divider vertical></v-divider>
				<v-btn block color="yellow darken-2" flat @click.stop="agree">{{agreeContent}}</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
    import {showMixin} from '@/components/mixin/show'

    export default {
        mixins: [showMixin],
        name: "confirm",
        props: {
            disagreeContent: {
                type: String,
                default: 'Disagree'
            },
            agreeContent: {
                type: String,
                default: 'Agree'
            },
            type: {
                type: String,
                default: 'success'
            },
            title: {
                type: String,
                default: ''
            },
            subheading: {
                type: String,
                default: ''
            },
        },
        filters: {
            filterType(value) {
                const table = {
                    'success': 'check_circle_outline',
                    'info': 'help_outline',
                    'error': 'highlight_off'
                };
                return table[value]
            }
        },
        methods: {
            agree() {
                this.show = false;
                this.$emit('v-agree')
            },
            disagree() {
                this.show = false;
                this.$emit('v-disagree')
            }
        }
    }
</script>

<style scoped>
	.radius-20 {
		border-radius: 20px !important;
	}
</style>