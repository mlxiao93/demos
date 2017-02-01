import './carousel.scss'
import {throttle} from 'src/util';

const DURATION = 400;

Vue.component('carousel', {
  template: require('./carousel.html'),
  props: {
    loop: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeIndex: 0
    }
  },
  methods: {
    _moveTo: function (index, {duration = DURATION} = {}) {

      let listEl = this.$refs.list,
          lastIndex = this.itemCount - 1,
          scrollIndex = this.loop ? index + 1 : index;    //是否支持循环

      if (this.loop && (index < 0 || index > lastIndex)) {
        if (index < 0) {
          this.activeIndex = lastIndex;
        } else {
          this.activeIndex = 0;
        }
        Velocity(listEl, 'stop');
        Velocity(listEl, {
          translateX: () => `-${scrollIndex * 100}%`
        }, {
          complete: () => {
            Velocity(listEl, {
              translateX: () => `-${(this.activeIndex + 1) * 100}%`
            }, {duration: 0});
          }
        });
        return;
      }

      if (index < 0 || index > lastIndex) return;
      this.activeIndex = index;
      Velocity(listEl, 'stop');
      Velocity(listEl, {
        translateX: () => `-${scrollIndex * 100}%`
      }, {
        duration
      });
    },
    prev: throttle(function() {
      this._moveTo(this.activeIndex - 1);
    }, DURATION),
    next: throttle(function() {
      this._moveTo(this.activeIndex + 1);
    }, DURATION)
  },
  computed: {
    itemCount: function() {
      return this.$children.length;
    },
    firstItemEl: function() {
      return this.$children[0] && this.$children[0].$el || null;
    },
    lastItemEL: function() {
      let length = this.$children.length;
      return this.$children[length - 1] && this.$children[length - 1].$el || null;
    }
  },
  mounted() {
    if (this.loop) {   //循环需要首尾各新增一个元素
      let firstItemEl = this.firstItemEl.cloneNode(true);
      let lastItemEL = this.lastItemEL.cloneNode(true);
      let listEl = this.$refs.list;
      if (this.itemCount > 0) {
        listEl.insertBefore(lastItemEL, listEl.firstChild);
        listEl.appendChild(firstItemEl);
      }
      this._moveTo(0, {duration: 0});  //移动到真正的第一个元素
    }
  }
});

Vue.component('carousel-item', {
  template: `
    <li class="carousel__item">
      <slot></slot>
    </li>
  `
});

