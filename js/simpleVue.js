function SimpleVue (data, el, exp) {
  this.data = data
  observe(data)
  el.innerHTML = this.data[exp]
  new Watcher(this, exp, function(value) {
    el.innerHTML = value
  })
  return this
}