import './index.scss'
import './components/lazy-img'

new Vue({
  el: '#app',
  data: {

  },
  filters: {
    imgUrl: function(index) {
      return 'http://ol1waj5za.bkt.clouddn.com/' + index + '.jpg';
    }
  }
});