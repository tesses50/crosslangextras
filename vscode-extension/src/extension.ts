// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { addPackagePage, createTemplate, createTemplateInWorkspace, ensureWorkingShell,  uploadPackage } from './api';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	ensureWorkingShell();
	const createProjectCommand = vscode.commands.registerCommand('crosslang.createProject', async() => {
		await createTemplate();
	});
	const createProjectWorkspaceCommand = vscode.commands.registerCommand('crosslang.createProjectWorkspace', async()=>{
		await createTemplateInWorkspace();
	});
	const uploadPackageCommand = vscode.commands.registerCommand('crosslang.uploadPackage', async()=>{
		await uploadPackage();
	});
	const addPackageCommand = vscode.commands.registerCommand('crosslang.addPackage', async()=>{
		await addPackagePage(context.extensionUri);
	});

	context.subscriptions.push(createProjectCommand);
	context.subscriptions.push(createProjectWorkspaceCommand);
	context.subscriptions.push(uploadPackageCommand);
	context.subscriptions.push(addPackageCommand);

	
}

// This method is called when your extension is deactivated
export function deactivate() {}
