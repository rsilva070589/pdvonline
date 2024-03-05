import VueNoUiSlider from './components/noUiSlider.vue';

const VueNoUiSliderPlugin = {
  install(app, options) {
    if (!options) {
      options = {};
    }
    app.component('vue-nouislider', VueNoUiSlider);
  }
};
export default VueNoUiSliderPlugin;
