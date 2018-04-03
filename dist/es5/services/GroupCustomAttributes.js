"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _templates = require("../templates");

var GroupCustomAttributes =
/*#__PURE__*/
function (_ResourceCustomAttrib) {
  (0, _inherits2.default)(GroupCustomAttributes, _ResourceCustomAttrib);

  function GroupCustomAttributes(options) {
    (0, _classCallCheck2.default)(this, GroupCustomAttributes);
    return (0, _possibleConstructorReturn2.default)(this, (GroupCustomAttributes.__proto__ || (0, _getPrototypeOf.default)(GroupCustomAttributes)).call(this, 'groups', options));
  }

  return GroupCustomAttributes;
}(_templates.ResourceCustomAttributes);

var _default = GroupCustomAttributes;
exports.default = _default;