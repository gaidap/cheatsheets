/// <reference types="react" />
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
export interface CommandOrchestrator {
    executeCommand(command: ICommand): void;
}
export interface ICommand {
    name?: string;
    icon?: React.ReactElement;
    keyCommand: string;
    value?: string;
    position?: 'right';
    liProps?: React.LiHTMLAttributes<HTMLLIElement>;
    buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement> | null;
    execute?: (state: TextState, api: TextApi) => void;
}
export interface TextRange {
    start: number;
    end: number;
}
export interface TextState {
    text: string;
    selectedText: string;
    selection: TextRange;
}
export interface TextApi {
    /**
     * Replaces the current selection with the new text. This will make the new selectedText to be empty, the
     * selection start and selection end will be the same and will both point to the end
     * @param text Text that should replace the current selection
     */
    replaceSelection(text: string): TextState;
    /**
     * Selects the specified text range
     * @param selection
     */
    setSelectionRange(selection: TextRange): TextState;
}
declare const getCommands: () => ICommand[];
declare function getStateFromTextArea(textArea: HTMLTextAreaElement): TextState;
declare class TextAreaTextApi implements TextApi {
    textArea: HTMLTextAreaElement;
    constructor(textArea: HTMLTextAreaElement);
    replaceSelection(text: string): TextState;
    setSelectionRange(selection: TextRange): TextState;
}
declare class TextAreaCommandOrchestrator implements CommandOrchestrator {
    textArea: HTMLTextAreaElement;
    textApi: TextApi;
    constructor(textArea: HTMLTextAreaElement);
    executeCommand(command: ICommand): void;
}
export { bold, italic, strikethrough, hr, title, divider, link, quote, code, image, unorderedListCommand, orderedListCommand, checkedListCommand, codeEdit, codeLive, codePreview, fullscreen, getCommands, getStateFromTextArea, TextAreaCommandOrchestrator, TextAreaTextApi };
