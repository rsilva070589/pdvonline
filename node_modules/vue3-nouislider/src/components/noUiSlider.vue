<template>
  <div>
    <div :id="sliderId" class="vue-nouislider">
    </div>
  </div>
</template>

<script>
import noUiSlider from 'nouislider';

export default {
  name: 'Nouislider',
  props: {
    config: {
      type: Object,
      required: true
    },
    values: {
      type: Array,
      required: true
    },
    id: {
      type: String,
      default () {
        return Math.random().toString(36).substr(2, 4);
      }
    }
  },
  emits: ['update:values'],
  data () {
    return {
      init: false
    };
  },
  computed: {
    sliderId() {
      if (this.id === undefined) {
        return this.uniqueId();
      }

      return this.id;
    },
    slider() {
      return document.getElementById(this.id);
    }
  },
  mounted () {
    this.config.start = this.values;
    noUiSlider.create(this.slider, this.config);
    this.slider.noUiSlider.on('update', this.updateValue);
  },
  methods: {
    updateValue(value, handle) {
      this.values[handle] = value[handle];
      this.$emit('update:values', this.values);
    },
    uniqueId() {
      function s4 () {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return `vue-nouislider-${ s4() }${s4()}`;
    }
  }
};
</script>

<style scoped lang="scss">
  @import '~nouislider/distribute/nouislider.min.css';
</style>
