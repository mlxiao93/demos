import './carousel.scss'
import 'babel-polyfill'
import {throttle, debounce} from 'src/util';

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
      activeIndex: 0,
      items: []
    }
  },
  methods: {
    _init: function() {

      this.items = this.$children.filter(child => child.$options.name === 'carousel-item');
      let itemCount = this.items.length;

      if (!itemCount) return;

      if (this.loop) {   //循环需要首尾各新增一个元素

        let listEl = this.$refs.list;

        let firstItemEl = this.items[0].$el;
        let lastItemEl = this.items[itemCount - 1].$el;
        let firstItemElClone = firstItemEl && firstItemEl.cloneNode(true);
        let lastItemElClone = lastItemEl && lastItemEl.cloneNode(true);
        firstItemElClone.setAttribute('data-loop', true);
        lastItemElClone.setAttribute('data-loop', true);

        //删除之前新增的元素
        [].slice.call(listEl.children).filter(child => child.getAttribute('data-loop')).map(child => {
          listEl.removeChild(child);
        });

        listEl.insertBefore(lastItemElClone, listEl.firstChild);
        listEl.appendChild(firstItemElClone);

        this._moveTo(0, {duration: 0});  //移动到真正的第一个元素
      }
    },
    _moveTo: function (index, {duration = DURATION} = {}) {

      let listEl = this.$refs.list,
          lastIndex = this.items.length - 1,
          scrollIndex = this.loop ? index + 1 : index;

      if (this.loop && (index < 0 || index > lastIndex)) {   //支持循环的处理
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
    }, DURATION),
    jumpTo(index) {
      this._moveTo(index);
    },
    handleItemChange: debounce(function() {
      this._init();
    }, 200)
  }
});

Vue.component('carousel-item', {
  template: `
    <li class="carousel__item carousel-item">
      <slot></slot>
    </li>
  `,
  created() {
    this.$parent && this.$parent.handleItemChange();
  },
  destroyed() {
    this.$parent && this.$parent.handleItemChange();
  }
});

