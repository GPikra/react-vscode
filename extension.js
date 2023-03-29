const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function activate(context) {

  // Create a directory with the same name as the selected file
  let makeReactComponentDisposable = vscode.commands.registerCommand('extension.makeReactComponent', async function () {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const selectedFilePath = editor.document.uri.fsPath;
    const selectedFileName = path.basename(selectedFilePath);
    const selectedFileExtension = path.extname(selectedFileName);
    
    // Check if the selected file is a TypeScript or TypeScript React file
    if (['.tsx', '.ts'].includes(selectedFileExtension)) {
        const componentName = selectedFileName.slice(0, -selectedFileExtension.length);

        const componentDirectory = path.join(path.dirname(selectedFilePath), componentName);
        fs.mkdirSync(componentDirectory);

        // Create the index.tsx file
        const indexTsxPath = path.join(componentDirectory, 'index.tsx');
        fs.writeFileSync(indexTsxPath, '');

        // Create the index.css file
        const indexCssPath = path.join(componentDirectory, 'index.css');
        fs.writeFileSync(indexCssPath, '');

        vscode.window.showInformationMessage(`Created React component: ${componentName}`);
    } else {
        vscode.window.showErrorMessage(`Selected file is not a TypeScript or TypeScript React file.`);
    }
  });

  // Register the disposable
  context.subscriptions.push(makeReactComponentDisposable);
}

exports.activate = activate;
