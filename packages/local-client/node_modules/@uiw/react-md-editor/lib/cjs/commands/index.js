"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStateFromTextArea = getStateFromTextArea;
Object.defineProperty(exports, "bold", {
  enumerable: true,
  get: function get() {
    return _bold.bold;
  }
});
Object.defineProperty(exports, "code", {
  enumerable: true,
  get: function get() {
    return _code.code;
  }
});
Object.defineProperty(exports, "italic", {
  enumerable: true,
  get: function get() {
    return _italic.italic;
  }
});
Object.defineProperty(exports, "link", {
  enumerable: true,
  get: function get() {
    return _link.link;
  }
});
Object.defineProperty(exports, "unorderedListCommand", {
  enumerable: true,
  get: function get() {
    return _list.unorderedListCommand;
  }
});
Object.defineProperty(exports, "orderedListCommand", {
  enumerable: true,
  get: function get() {
    return _list.orderedListCommand;
  }
});
Object.defineProperty(exports, "checkedListCommand", {
  enumerable: true,
  get: function get() {
    return _list.checkedListCommand;
  }
});
Object.defineProperty(exports, "quote", {
  enumerable: true,
  get: function get() {
    return _quote.quote;
  }
});
Object.defineProperty(exports, "hr", {
  enumerable: true,
  get: function get() {
    return _hr.hr;
  }
});
Object.defineProperty(exports, "title", {
  enumerable: true,
  get: function get() {
    return _title.title;
  }
});
Object.defineProperty(exports, "divider", {
  enumerable: true,
  get: function get() {
    return _divider.divider;
  }
});
Object.defineProperty(exports, "codePreview", {
  enumerable: true,
  get: function get() {
    return _preview.codePreview;
  }
});
Object.defineProperty(exports, "codeEdit", {
  enumerable: true,
  get: function get() {
    return _preview.codeEdit;
  }
});
Object.defineProperty(exports, "codeLive", {
  enumerable: true,
  get: function get() {
    return _preview.codeLive;
  }
});
Object.defineProperty(exports, "fullscreen", {
  enumerable: true,
  get: function get() {
    return _fullscreen.fullscreen;
  }
});
Object.defineProperty(exports, "image", {
  enumerable: true,
  get: function get() {
    return _image.image;
  }
});
Object.defineProperty(exports, "strikethrough", {
  enumerable: true,
  get: function get() {
    return _strikeThrough.strikethrough;
  }
});
exports.TextAreaTextApi = exports.TextAreaCommandOrchestrator = exports.getCommands = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _bold = require("./bold");

var _code = require("./code");

var _italic = require("./italic");

var _link = require("./link");

var _list = require("./list");

var _quote = require("./quote");

var _hr = require("./hr");

var _title = require("./title");

var _divider = require("./divider");

var _preview = require("./preview");

var _fullscreen = require("./fullscreen");

var _image = require("./image");

var _strikeThrough = require("./strikeThrough");

var _InsertTextAtPosition = _interopRequireDefault(require("../utils/InsertTextAtPosition"));

var getCommands = function getCommands() {
  return [_bold.bold, _italic.italic, _strikeThrough.strikethrough, _hr.hr, _title.title, _divider.divider, _link.link, _quote.quote, _code.code, _image.image, _divider.divider, _list.unorderedListCommand, _list.orderedListCommand, _list.checkedListCommand, _divider.divider, _preview.codeEdit, _preview.codeLive, _preview.codePreview, _divider.divider, _fullscreen.fullscreen];
};

exports.getCommands = getCommands;

function getStateFromTextArea(textArea) {
  return {
    selection: {
      start: textArea.selectionStart,
      end: textArea.selectionEnd
    },
    text: textArea.value,
    selectedText: textArea.value.slice(textArea.selectionStart, textArea.selectionEnd)
  };
}

var TextAreaTextApi = /*#__PURE__*/function () {
  function TextAreaTextApi(textArea) {
    (0, _classCallCheck2.default)(this, TextAreaTextApi);
    this.textArea = void 0;
    this.textArea = textArea;
  }

  (0, _createClass2.default)(TextAreaTextApi, [{
    key: "replaceSelection",
    value: function replaceSelection(text) {
      (0, _InsertTextAtPosition.default)(this.textArea, text);
      return getStateFromTextArea(this.textArea);
    }
  }, {
    key: "setSelectionRange",
    value: function setSelectionRange(selection) {
      this.textArea.focus();
      this.textArea.selectionStart = selection.start;
      this.textArea.selectionEnd = selection.end;
      return getStateFromTextArea(this.textArea);
    }
  }]);
  return TextAreaTextApi;
}();

exports.TextAreaTextApi = TextAreaTextApi;

var TextAreaCommandOrchestrator = /*#__PURE__*/function () {
  function TextAreaCommandOrchestrator(textArea) {
    (0, _classCallCheck2.default)(this, TextAreaCommandOrchestrator);
    this.textArea = void 0;
    this.textApi = void 0;
    this.textArea = textArea;
    this.textApi = new TextAreaTextApi(textArea);
  }

  (0, _createClass2.default)(TextAreaCommandOrchestrator, [{
    key: "executeCommand",
    value: function executeCommand(command) {
      command.execute && command.execute(getStateFromTextArea(this.textArea), this.textApi);
    }
  }]);
  return TextAreaCommandOrchestrator;
}();

exports.TextAreaCommandOrchestrator = TextAreaCommandOrchestrator; 
//# sourceMappingURL=index.js.map