function defineReactive(data, key, val) {
  observe(val)
  var dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return val
    },
    set: function(newVal) {
      if (val === newVal) {
        return;
      }
      val = newVal;
      console.log('属性' + key + '已被监听')
      dep.notify()
    }
  })
}

function observe(data) {
  if (!data || typeof data !== 'object') {
    return;
  }
  Object.keys(data).forEach(function(key) {
    defineReactive(data, key, data[key]);
  });
}

function Dep() {
  this.subs = []  // 订阅者数组
}
Dep.prototype = {
  addSub: function(sub) {
    this.subs.push(sub)
  },
  notify: function() {
    this.subs.forEach(function(sub) {
      sub.update()
    })
  }
}
Dep.target = null