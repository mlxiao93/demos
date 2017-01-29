import './carousel.scss'

Vue.component('carousel', {
  template: require('./carousel.html')
});

Vue.component('carousel-item', {
  template: `
    <li class="carousel__item">
      <slot></slot>
    </li>
  `
});

