"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkdownUtil = exports.commands = exports.default = void 0;

var _reactMarkdownPreview = _interopRequireDefault(require("@uiw/react-markdown-preview"));

var _MDEditor = _interopRequireDefault(require("./MDEditor"));

var commands = _interopRequireWildcard(require("./commands"));

exports.commands = commands;

var MarkdownUtil = _interopRequireWildcard(require("./utils/markdownUtils"));

exports.MarkdownUtil = MarkdownUtil;
_MDEditor.default.Markdown = _reactMarkdownPreview.default;
var _default = _MDEditor.default;
exports.default = _default; 
//# sourceMappingURL=index.js.map