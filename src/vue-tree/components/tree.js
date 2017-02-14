import './tree.scss'
import {isEmpty} from 'src/util';
import {extendNode, deepCopy} from './service'
import treeNodes from './tree-nodes'

Vue.component('tree', {
  template: require('./tree.html'),
  props: {
    data: Array,
    rowTemplate: String
  },
  data() {
    return {
      bus: new Vue()
    }
  },
  methods: {
    handleCheckAllToggle: function () {
      console.log(this.root.$toggleCheck());
      this.bus.refresh.fire();
    }
  },
  components: {
    treeNodes
  },
  directives: {

  },
  computed: {
    root: function () {
      let root = {$root: true, children: this.data};
      extendNode(root, this.lastData);
      return root;
    }
  },
  created () {

    this.lastData = this.data;

    this.bus.refresh = new class {
      handles = [];
      register(func) {
        if (typeof func === 'function') {
          this.handles.push(func);
        }
      }
      fire() {
        this.handles.map(func => {
          func.call();
        })
      }
    };
    this.bus.refresh.register(() => {
      this.$forceUpdate();
    });

    this.bus.$on('add', (parent) => {
      this.$emit('add', parent);
    });
    this.bus.$on('update', node => {
      this.$emit('update', node);
    });
    this.bus.$on('remove', node => {
      this.$emit('remove', node);
    });
  },
  beforeUpdate: function () {
    this.lastData = this.data;
  }
});