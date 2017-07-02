function h(nodeName, attributes, ...children) {
  return { nodeName: nodeName, attributes: attributes || Object.create(null), children: children || [] };
}

function render(vnode, parent) {
  var type = typeof vnode;
  if (type === 'null' || type === 'undefined' || type === 'boolean') return;
  if (type === 'string' || type === 'number') {
    parent.appendChild(document.createTextNode(String(vnode)));
    return;
  }
  var nodeName = vnode.nodeName;
  var nodeNameType = typeof nodeName;
  if (nodeNameType === 'function') {
    //todo
  } else if (nodeNameType === 'string') {
    var node = document.createElement(nodeName);
    Object.keys(vnode.attributes).forEach(attr => {
      node.setAttribute(attr, vnode.attributes[attr]);
    });
    if (vnode.children) {
      vnode.children.forEach(c => {
        render(c, node);
      });
    }
    parent.appendChild(node);
  }
}

function extend(obj, props) {
  for (var i in props) {
    obj[i] = props[i];
  }
  return obj;
}

function Component(props, context) {
  this._dirty = true;

  /** @public
      *	@type {object}
      */
  this.context = context;

  /** @public
      *	@type {object}
      */
  this.props = props;

  /** @public
      *	@type {object}
      */
  this.state = this.state || {};
}

extend(Component.prototype, {
  setState: function setState(state, callback) {
    var s = this.state;
    if (!this.prevState) this.prevState = extend({}, s);
    extend(s, typeof state === 'function' ? state(s, this.props) : state);
    if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
    enqueueRender(this);
  },

  forceUpdate: function forceUpdate(callback) {
    if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
    renderComponent(this, 2);
  },

  render: function render() {}
});

export { h, render };
export default { h, render };
