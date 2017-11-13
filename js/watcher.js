function Watcher(vm, exp, cb) {
  this.cb = cb
  this.vm = vm
  this.exp = exp
  this.value = this.get()
}

Watcher.prototype = {
  update: function() {
    this.run()
  },
  run: function() {
    var value = this.vm.data[this.exp]
    var oldVal = this.value
    if (value !== oldVal) {
      this.value = value
      this.cb.call(this.vm, value, oldVal)  // 执行更新时的回调函数
    }
  },
  get: function() {
    Dep.target = this
    var value = this.vm.data[this.exp]  // 读取data的属性，从而执行属性的get函数
    Dep.target = null
    return value
  }
}