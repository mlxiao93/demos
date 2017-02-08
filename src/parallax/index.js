import './index.scss'

const rate = 0.9;

window.onload = () => {
  let containerEl = document.querySelector('.container');
  let parallaxEl = document.querySelector('.parallax');
  let containerElHeight = Velocity.hook(containerEl, 'height');
  let parallaxElHeight = Velocity.hook(parallaxEl, 'height');

  (function _init() {
    Velocity(parallaxEl, {
      top: '50%',
      translateY: `-${0.5 * parallaxElHeight}`,   //如果直接在css设置该值为-50%，Velocity.hook方法将得不到实际值
      translateX: '-50%'
    }, {
      duration: 0
    })
  })();

  let lastScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  window.onscroll = () => {
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    let deltaY = (scrollTop - lastScrollTop) * rate;
    lastScrollTop = scrollTop;

    let top = Velocity.hook(parallaxEl, 'top');
    let ty = Velocity.hook(parallaxEl, 'translateY');

    /**
     * parallax向上或向下偏移不允许使container出现空白
     * 即向上的偏移距离不能大于0
     * 向下的偏移距离不能大于parallax与container高度之差
     * */
    if (top + ty > 0 || ty - top > parallaxElHeight - containerElHeight) {
      return;
    }

    Velocity(parallaxEl, {
      translateY: `-=${deltaY}`,
      translateX: '-50%'
    }, {
      duration: 0
    })
  };
};

