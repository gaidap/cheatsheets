# Getting Started with Cheatsheets

This is a little learning project to get familiar with React and TypeScript.  
It assambles a little notebook application that you can use to write, execute and store little code snippets written in JavaScript, JSX, HTML and CSS.  
  
You might have to disable your script blocker. Notice that uMatrix (https://github.com/gorhill/uMatrix/issues/926) get you some error message with the csp headers but you can ignore them, the app will work normally.  

Note: As technical trade off I decided not to provide a second server to serve the iFrame content hence you cannot use localStorage, cookies or some other browser related features like alerts from your code snippets.

## How to use Cheatsheets
### Code Editor
This editor is based on the Monaco-Editor (VSCode). You have features like auto complete and various other default features at your service.  
You can import mostly any JS or JSX and mostly all css libraries to create code snippets and get the results rendered to the preview area or the console.  
You can use a build function called preview, for example preview(<div>Hello!</div>) will print a div to the innerHTML of the preview area.

### Markdown Editor
A simple texteditor where you can use markdown syntax to format your text or display content like pictures. Click inside the editor cell to open the edito and click outside the cell to close the editor.

### Markdown Editor
## Keyboard shortcuts
### Code editor
- ctrl + alt + Enter => clear screen
- alt + Enter => format code
### Markdown editor
- Escape => Exit

## Available Scripts
### Shortcuts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
