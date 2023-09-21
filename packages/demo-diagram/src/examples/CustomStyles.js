import { isArray } from 'min-dash'

export default function CustomStyles(config) {
  this._defaultStyles = {
    'no-fill': { fill: 'burlywood' },
    normal: { fill: 'none', stroke: 'burlywood' },
    line: { fill: 'none', stroke: '#000', strokeWidth: '10px' },
    ...(config || {})
  }
}

CustomStyles.$inject = ['config.styles']

CustomStyles.prototype.style = function (traits, additionalAttrs) {
  if (!isArray(traits) && !additionalAttrs) {
    additionalAttrs = traits
    traits = []
  }
  const attrs = traits.reduce((attrsMap, t) => {
    return { ...attrsMap, ...(this._defaultStyles[t] || this._defaultStyles['normal']) }
  }, {})
  return { ...attrs, ...(additionalAttrs || {}) }
}
CustomStyles.prototype.cls = function (className, traits, additionalAttrs) {
  const attrs = this.style(traits, additionalAttrs)
  return { ...attrs, class: className + ' demo' }
}
CustomStyles.prototype.computeStyle = function (custom, traits, defaultStyles) {
  if (!isArray(traits)) {
    defaultStyles = traits
    traits = []
  }
  return this.style(traits || [], { ...(custom || {}), ...defaultStyles })
}
