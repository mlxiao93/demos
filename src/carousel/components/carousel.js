import './carousel.scss'
import 'babel-polyfill'
import {throttle, debounce} from 'src/util';

const DURATION = 400;

Vue.component('carousel', {
  template: `
    <div class="carousel">
      <ul class="carousel__list" ref="list">
        <slot></slot>
      </ul>
      <button class="carousel__arrow carousel__arrow--prev"
              v-show="arrow"
              @click="prev">
        <i class="fa fa-angle-left"></i>
      </button>
      <button class="carousel__arrow carousel__arrow--next"
              v-show="arrow"
              @click="next">
        <i class="fa fa-angle-right"></i>
      </button>
      <ul class="carousel__indicators"
          v-show="indicator">
        <li class="carousel__indicator"
            v-for="item, i in items"
            @click="jumpTo(i)"
            :class="{'carousel__indicator--active': i == activeIndex}"></li>
      </ul>
    </div>
  `,
  props: {
    loop: {
      type: Boolean,
      default: false
    },
    interval: {
      type: Number,
      default: 0
    },
    arrow: {
      type: Boolean,
      default: false
    },
    indicator: {
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
          listElWidth = Velocity.hook(listEl, 'width'),
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
          translateX: () => `-${scrollIndex * listElWidth}px`
        }, {
          complete: () => {
            Velocity(listEl, {
              translateX: `-${(this.activeIndex + 1) * listElWidth}px`
            }, {duration: 0});
          }
        });
        return;
      }

      if (index < 0) {
        this.activeIndex = scrollIndex = lastIndex;
      } else if (index > lastIndex) {
        this.activeIndex = scrollIndex = 0;
      } else {
        this.activeIndex = index;
      }

      Velocity(listEl, 'stop');
      Velocity(listEl, {
        translateX: `-${scrollIndex * listElWidth}px`
      }, {
        duration
      });
    },
    handleTouchMove(x) {
      let listEl = this.$refs.list,
          listElWidth = Velocity.hook(listEl, 'width'),
          scrollIndex = this.loop ? this.activeIndex + 1 : this.activeIndex,
          initTranslateX = -scrollIndex * listElWidth;
      Velocity.hook(listEl, "translateX",`${initTranslateX + x}px`);
    },
    handleTouchEnd(deltaX, deltaT) {
      let listEl = this.$refs.list,
          listElWidth = Velocity.hook(listEl, 'width'),
          boundary = 0.2,
          offsetX = deltaX / listElWidth;

      //若不支持循坏，边界滑动需要归位
      if (!this.loop && (this.activeIndex === 0 || this.activeIndex === this.items.length - 1)) {
        this._moveTo(this.activeIndex);
      }

      //快速滑动(时间短，速度快)时需要触发翻页
      if (deltaT < 80 && deltaT > 0) {
        if (deltaX / deltaT < -0.6) {
          this._moveTo(this.activeIndex + 1);
          return;
        }
        if (deltaX / deltaT > 0.6) {
          this._moveTo(this.activeIndex - 1);
          return;
        }
      }

      if (offsetX < -boundary) {     //右翻
        this._moveTo(this.activeIndex + 1);
        return;
      }
      if (offsetX > boundary) {      //左翻
        this._moveTo(this.activeIndex - 1);
        return;
      }

      this._moveTo(this.activeIndex);    //归位
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
  },
  created() {
    if (this.interval) {
       this._interval = setInterval(() => {
         this._moveTo(this.activeIndex + 1);
       }, this.interval)
    }
  },
  destroyed() {
    clearInterval(this._interval);
  }
});

Vue.component('carousel-item', {
  template: `
    <li class="carousel__item carousel-item" 
    @mousedown="handleMouseDown"
    @touchstart="handleTouchStart"
    @mousemove="handleMouseMove"
    @touchmove="handleTouchMove"
    @mouseup="handleMouseUp"
    @touchend="handleTouchEnd">
      <slot></slot>
    </li>
  `,
  data() {
    return {
      mouseDown: false,
      touchStart: {
        time: 0,
        x: 0
      },
      touchMove: {
        x: 0
      },
      deltaX: 0,    //左滑的距离
      deltaT: 0     //滑动的时间
    }
  },
  methods: {
    handleTouchStart(e) {
      let touch = e.touches[0];
      this.touchStart.time = Date.now();
      this.touchStart.x = touch.pageX;

      //短暂触击不会触发touchmove,需要重置delta值
      this.deltaT = 0;
      this.deltaX = 0;
    },
    handleTouchMove(e) {
      let touch = e.touches[0];
      this.touchMove.x = touch.pageX;

      this.deltaX = this.touchMove.x - this.touchStart.x;
      this.deltaT = Date.now() - this.touchStart.time;

      //改变容器的transformX
      this.$parent && this.$parent.handleTouchMove(this.deltaX);

    },
    handleTouchEnd() {
      this.$parent && this.$parent.handleTouchEnd(this.deltaX, this.deltaT);
    },

    handleMouseDown(e) {
      this.mouseDown = true;
      this.handleTouchStart({touches: [{pageX: e.pageX, pageY: e.pageY}]});
    },
    handleMouseMove(e) {
      if (!this.mouseDown) return;
      this.handleTouchMove({touches: [{pageX: e.pageX, pageY: e.pageY}]});
    },
    handleMouseUp() {
      this.mouseDown = false;
      this.handleTouchEnd();
    }
  },
  created() {
    this.$parent && this.$parent.handleItemChange();
  },
  destroyed() {
    this.$parent && this.$parent.handleItemChange();
  }
});

