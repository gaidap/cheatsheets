import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import { bold } from './bold';
import { code } from './code';
import { italic } from './italic';
import { link } from './link';
import { unorderedListCommand, orderedListCommand, checkedListCommand } from './list';
import { quote } from './quote';
import { hr } from './hr';
import { title } from './title';
import { divider } from './divider';
import { codePreview, codeEdit, codeLive } from './preview';
import { fullscreen } from './fullscreen';
import { image } from './image';
import { strikethrough } from './strikeThrough';
import insertText from '../utils/InsertTextAtPosition';

var getCommands = function getCommands() {
  return [bold, italic, strikethrough, hr, title, divider, link, quote, code, image, divider, unorderedListCommand, orderedListCommand, checkedListCommand, divider, codeEdit, codeLive, codePreview, divider, fullscreen];
};

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
    _classCallCheck(this, TextAreaTextApi);

    this.textArea = void 0;
    this.textArea = textArea;
  }

  _createClass(TextAreaTextApi, [{
    key: "replaceSelection",
    value: function replaceSelection(text) {
      insertText(this.textArea, text);
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

var TextAreaCommandOrchestrator = /*#__PURE__*/function () {
  function TextAreaCommandOrchestrator(textArea) {
    _classCallCheck(this, TextAreaCommandOrchestrator);

    this.textArea = void 0;
    this.textApi = void 0;
    this.textArea = textArea;
    this.textApi = new TextAreaTextApi(textArea);
  }

  _createClass(TextAreaCommandOrchestrator, [{
    key: "executeCommand",
    value: function executeCommand(command) {
      command.execute && command.execute(getStateFromTextArea(this.textArea), this.textApi);
    }
  }]);

  return TextAreaCommandOrchestrator;
}();

export { // Toolbars.
bold, italic, strikethrough, hr, title, divider, link, quote, code, image, unorderedListCommand, orderedListCommand, checkedListCommand, codeEdit, codeLive, codePreview, fullscreen // Tool method.
, getCommands, getStateFromTextArea, TextAreaCommandOrchestrator, TextAreaTextApi }; 
//# sourceMappingURL=index.js.map