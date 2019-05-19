export const showMixin = {
    props: {
        value: {}
    },
    data() {
        return {
            show: false
        }
    },
    mounted() {
        this.show = this.value
    },
    watch: {
        value(value) {
            this.show = value
        },
        show(value) {
            this.$emit('input', value);
        }
    }
};