import {isElementInViewPort} from 'src/util'

const LOADING_ICON = require('./gears.svg');

const SCROLL_HANDLES = [];
let oldOnscroll = onscroll;

onscroll = e => {
  oldOnscroll && oldOnscroll(e);
  SCROLL_HANDLES.map(handle => {
    typeof handle === 'function' && handle(e);
  })
};

Vue.component('lazy-img', {
  template: `
    <img :src="url" ref="el" />
  `,
  props: ['src'],
  data() {
    return {
      url: LOADING_ICON
    }
  },
  methods: {
    loadImg: function () {
      let img = new Image();
      if (!isElementInViewPort(this.$refs.el)) return;
      img.src = this.src;
      img.onload = () => {
        this.url = this.src;
      }
    }
  },
  mounted() {
    this.loadImg();
    SCROLL_HANDLES.push(e => {
      this.loadImg();
    })
  }
});