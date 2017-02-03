import './carousel3d.scss'
import {debounce} from 'src/util'

const DURATION = 400;

Vue.component('carousel3d', {
  template: `
    <div class="carousel3d">
      <ul class="carousel3d__list"
          @mousedown="handleMouseDown"
          @touchstart="handleTouchStart"
          @mousemove="handleMouseMove"
          @touchmove="handleTouchMove"
          @mouseup="handleMouseUp"
          @touchend="handleTouchEnd">
        <slot></slot>
      </ul>
    </div>
  `,
  data() {
    return {
      activeIndex: 0,
      items: [],
      mouseDown: false,
      touchStart: {
        X: 0
      },
      touchMove: {
        x: 0
      },
      deltaX: 0
    }
  },
  methods: {
    _moveTo(index, {duration = DURATION} = {}) {

      let itemEls = this.items.map(item => item.$el),
          itemCount = itemEls.length;

      if (index < 0) {
        index = itemCount - 1;
      } else if (index >= itemCount) {
        index = 0;
      }

      this.activeIndex = index;

      itemEls.map((itemEl, i) => {
        //计算当前迭代元素离active元素的正反向距离
        let positiveDistance = i - index,
            negativeDistance = positiveDistance;
        if (positiveDistance < 0) positiveDistance += itemCount;
        if (negativeDistance > 0) negativeDistance -= itemCount;

        //取正反向距离中绝对值小的为实际距离，(绝对值相等则取正向距离)
        let distance = positiveDistance;
        if (Math.abs(negativeDistance) < Math.abs(positiveDistance)) {
          distance = negativeDistance
        }

        itemEl.setAttribute('data-index', i);
        itemEl.setAttribute('data-distance', distance);

        //计算出各层的属性
        let absDistance = Math.abs(distance),
            maxDistance = Math.ceil(itemCount / 2),
            indent = 1 - (absDistance / maxDistance) * 0.5;   //最小0.5

        let itemElWidth = Velocity.hook(itemEl, 'width');

        let translateX = itemElWidth * 0.3 * absDistance;
        let translateZ = absDistance * -100;
        if (distance < 0) {
          translateX *= -1;
        } else if (distance === 0) {
          translateX = 0;
          translateZ = 0;
        }

        Velocity(itemEl, 'stop');
        Velocity(itemEl, {
          scale: 0.8,
          opacity: indent,
          translateX: `${translateX}px`,
          translateZ: `${translateZ}px`
        }, {
          duration,
          begin: () => {
            Velocity.hook(itemEl, 'zIndex', itemCount - absDistance);
          }
        })

      });

    },
    handleItemChange: debounce(function() {
      this.items = this.$children.filter(child => child.$options.name === 'carousel3d-item');
      this._moveTo(0, {duration: 0});
    }, 100),
    handleItemClick(index) {
      if (this.mouseMove) return;
      if (index === this.activeIndex) return;
      this._moveTo(index);
    },
    handleTouchStart(e) {
      let touch = e.touches[0];
      this.touchStart.x = touch.pageX;

      this.deltaX = 0;
    },
    handleTouchMove(e) {
      let touch = e.touches[0];
      this.touchMove.x = touch.pageX;

      this.deltaX = this.touchMove.x - this.touchStart.x;
    },
    handleTouchEnd() {
      if (this.deltaX > 50) {
        this._moveTo(+this.activeIndex - 1);
      } else if (this.deltaX < -50) {
        this._moveTo(+this.activeIndex + 1);
      }
    },
    handleMouseDown(e) {
      this.mouseDown = true;
      this.handleTouchStart({touches: [{pageX: e.pageX}]});
    },
    handleMouseMove(e) {
      if (!this.mouseDown) return;
      this.mouseMove = true;
      this.handleTouchMove({touches: [{pageX: e.pageX}]})
    },
    handleMouseUp() {
      setTimeout(() => this.mouseMove = false, 200);
      this.mouseDown = false;
      this.handleTouchEnd();
    }
  }
});

Vue.component('carousel3d-item', {
  template: `
    <li class="carousel3d__item carousel3d-item" @click="handleClick">
      <slot></slot>
    </li>
  `,
  methods: {
    handleClick(e) {
      let index = e.target.getAttribute('data-index');
      this.$parent && this.$parent.handleItemClick(index);
    }
  },
  created() {
    this.$parent && this.$parent.handleItemChange();
  }
});