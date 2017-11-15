function Compile(el, vm) {
  this.vm = vm
  this.el = document.querySelector(el)
  this.fragment = null
  this.init()
}
Compile.prototype = {
  init: function() {
    if(this.el) {
      this.fragment = this.nodeToFragement(this.el)
      this.compileElement(this.fragment)
      this.el.appendChild(this.fragment)
    } else {
      console.warn('绑定元素不存在')
    }
  },
  nodeToFragement: function(el) {
    var fragment = document.createDocumentFragment()
    var child = el.firstChild
    // 将dom节点移到fragment
    while(child) {
      fragment.appendChild(child)
      child = el.firstChild
    }
    return fragment
  },
  compileElement: function(el) {
    var childNodes = el.childNodes
    var self = this;
    [].slice.call(childNodes).forEach(function(node) {
      var reg = /\{\{(.*)\}\}/
      var text = node.textContent
      if (self.isTextNode(node) && reg.test(text)) {
        self.compileText(node, reg.exec(text)[1])
      }
      if (node.childNodes && node.childNodes.length) {
        self.compileElement(node)  // 递归遍历子节点
      }
    });
  },
  compileText: function(node, exp) {
    var self = this
    var initText = this.vm[exp]
    this.updateText(node, initText)
    new Watcher(this.vm, exp, function(value) {
      self.updateText(node, value)
    })
  },
  isTextNode: function(node) {
    return node.nodeType == 3
  },
  updateText: function(node, value) {
    node.textContent = (typeof value =='undefined' ? '' : value)
  }
}