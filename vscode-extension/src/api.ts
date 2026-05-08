import { spawn } from "node:child_process";
import { QuickPickItem } from "vscode";
import * as vscode from 'vscode';
import { getDocumentsFolder } from 'platform-folders';
import { join } from "node:path";
import { existsSync, mkdirSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";

export interface CrossLangProjectConfigInfo
{
    type: string
    maintainer?: string
    repo?: string
    homepage?: string
    license?: string
    plugin_host?: string
    description?: string
    executable_name?: string
    executable_can_be_renamed?: boolean
    executable_runtime?: string
    template_ignored_files?: string[]
    template_info?: CrossLangProjectConfigInfo
}
export interface CrossLangProjectDependency {
    name: string
    version: string
}
export interface CrossLangProjectConfig {
    name: string
    version: string
    info: CrossLangProjectConfigInfo
    resource_directory?: string
    source_directory?: string
    bin_directory?: string
    obj_directory?: string
    project_dependencies?: string[]
    dependencies?: CrossLangProjectDependency[]
}

export interface CrossLangTemplate {
    name: string
    description: string
}
export interface PackageServerResponseItem {
    accountName: string
    description: string
    homepage: string
    license: string
    maintainer: string
    packageName: string
    repo: string
    type: string
    uploadDate: string
    uploadTime: number
    version: string
}
export interface PackageServerResponse {
    packages: PackageServerResponseItem[]
}


export function readCommandToEnd(name: string, args: Array<string>, working?:string) : Promise<string>
{
    return new Promise<string>((resolve,reject)=>{
        var str: string = "";   
        const program = spawn(name, args, {cwd: working});
        program.stdout.on('data',(data)=>{
            str += `${data}`;
        });
        program.on('close',(signal)=>{
            if(signal && signal != 0)
                reject("Didn't exit successfully");
            resolve(str);
        })
    });
}
export async function ensureWorkingShell()
{
    if(!await hasShell())
    {
        const install = await vscode.window.showInformationMessage('CrossLang shell is not installed, install?',"Yes","No");
        if(install === "Yes")
        {
            await updateShell();
        }
    }
}

export async function getCrossLangConfigDir() : Promise<string>
{
    return (await readCommandToEnd('crosslang',['configdir'])).replace('\r','').replace('\n','');
}

export async function hasShell() : Promise<boolean>
{
    try {
        return existsSync(join(await getCrossLangConfigDir(),"Shell/Shell.crvm"));
    } catch(ex) {return false;}
}

export async function updateShell()
{
    await readCommandToEnd('crosslang',['update-shell']);
}

export async function getWorkspace() : Promise<string|null>
{
    const wsf = vscode.workspace.workspaceFolders;
    if(wsf)
    {
        if(wsf.length === 1) return wsf[0].uri.fsPath ?? null;
        if(wsf.length > 1)
        {
            return await new Promise<string|null>((resolve,reject)=>{
                const qp=vscode.window.createQuickPick();
                qp.title = "Which workspace folder?";
                const qpItems :QuickPickItem[] = [];
                for(var i = 0; i < wsf.length; i++)
                {

                    qpItems.push({
                        label: wsf[i].name,
                        description: wsf[i].uri.fsPath
                    });
                }
                qp.items = qpItems;
                qp.onDidAccept(()=>{
			        if(qp.activeItems.length ==1)
			        {

                        qp.hide();
                        resolve(qp.activeItems[0].description ?? null);
                        
		            }
                    else {

		                qp.hide();
                        resolve(null);

                    }
	            });
	            qp.show();
            });
        }
    }
    return null;
}


export async function getTemplatesAsync() : Promise<CrossLangTemplate[]>
{
    const text = await readCommandToEnd('crosslang',['new','--list-json']);
    return JSON.parse(text);
}
async function pickTemplate() : Promise<string>
{
    const templates=await getTemplatesAsync();
    return await new Promise<string>((resolve,reject)=>{
        const qp=vscode.window.createQuickPick();
		qp.title = "Select the template";
		const qpItems :QuickPickItem[] = [];
		for(var i = 0; i < templates.length; i++)
			qpItems.push({label: templates[i].name, description: templates[i].description});
		
		qp.items = qpItems;
		
		qp.onDidAccept(()=>{
			if(qp.activeItems.length ==1)
			{
                qp.hide();
                resolve(qp.activeItems[0].label);
		        
		    }
            else {

		        qp.hide();
            }
	    });
	    qp.show();
    
    });
}
export async function uploadPackage()
{
    const projectDir = await getWorkspace();
    if(projectDir)
    {
        try {
            await readCommandToEnd('crosslang',['upload-package'],projectDir);
            await vscode.window.showInformationMessage('Uploaded package successfully');
        } catch(ex) {
            await vscode.window.showErrorMessage('Failed to upload to CPKG');
        }
    }
}

export async function createTemplate()
{
    const templateName = await pickTemplate();
    
    const project_name = await vscode.window.showInputBox({title: "Project name"});
    if(project_name)
    {
        const dir = join(getDocumentsFolder(),"CrossLangProjects",project_name);
        mkdirSync(getDocumentsFolder());
        mkdirSync(join(getDocumentsFolder(),"CrossLangProjects"));
        mkdirSync(dir);
        
        await readCommandToEnd("crosslang",["new",templateName,dir]);

        let uri = vscode.Uri.file(dir);
        await vscode.commands.executeCommand('vscode.openFolder', uri, true)
    }
}
export async function createTemplateInWorkspace()
{
    const templateName = await pickTemplate();
    const workspace = await getWorkspace();
    console.log(workspace);
    if(workspace)
    {
        await readCommandToEnd("crosslang",["new",templateName,workspace]);
    }
}
export async function getServerUrl() : Promise<string|null> {
    try {
        const confDir = await getCrossLangConfigDir();
        const pkgServersFile = join(confDir,"package_servers.json");
        if(existsSync(pkgServersFile))
        {
            const data = await readFile(pkgServersFile);
            const array: string[] = JSON.parse(data.toString());
        
            if(array.length === 0) return null;
            if(array.length === 1) return array[0];
             return await new Promise<string|null>((resolve,reject)=>{
                const qp=vscode.window.createQuickPick();
		        qp.title = "Select the server";
		        const qpItems :QuickPickItem[] = [];
		        for(var i = 0; i < array.length; i++)
			        qpItems.push({label: array[i]});
		
		        qp.items = qpItems;
		
		        qp.onDidAccept(()=>{
			        if(qp.activeItems.length ==1)
			        {
                        qp.hide();
                        resolve(qp.activeItems[0].label);
		        
		            }
                    else {

		                qp.hide();
                        resolve(null);
                    }
	            });
	            qp.show();
    
            });
            
        }
    }catch(ex) {
        return null;
    }
    
    return "https://cpkg.tesseslanguage.com/";
}
export function trimEndChar(str: string, trim: string): string
{
    if(trim.length!==1) throw new Error("trim must be one char");
    var i = str.length-1;
    for(;i>=0;i--)
    {
        if(str[i] !== trim[0]) break;
    }
    return str.substring(0,i+1);
}
export async function addPackagePage(extensionUri: vscode.Uri)
{
    //package_servers.json
    const projectDir =await getWorkspace();
    if(projectDir)
    {   
        if(existsSync(join(projectDir,"cross.json")))
        {
            await addPackagePageInternal(extensionUri,projectDir);
        }
        else {
            await vscode.window.showErrorMessage('Workspace does not have cross.json');
        }
    }
    else {
        await vscode.window.showErrorMessage('No workspace selected');
    }
}
export async function getProjectInfo(projectDir: string): Promise<CrossLangProjectConfig | null>
{
    const file = join(projectDir,"cross.json");
    if(existsSync(file))
    {
        const bytes = await readFile(file);
        return JSON.parse(bytes.toString());
    }
    return null;
}
export async function setProjectInfo(projectDir: string, config: CrossLangProjectConfig)
{
    const file = join(projectDir,"cross.json");
    await writeFile(file,JSON.stringify(config,null,4));
}
export function version2number(version: string) : number
{
    const parts = version.split('-');
    if(parts.length === 2)
    {
        const dotPart = parts[0].split('.');
        if(dotPart.length === 4)
        {
            var number = 0;
            switch(parts[1])
            {
                case 'alpha':
                    number = 1;
                    break;
                case 'beta':
                    number = 2;
                    break;
                case 'prod':
                    number = 3;
                    break;
            }
            number += (parseInt(parts[3],10) % 65536) * 4;
            number += (parseInt(parts[2],10) % 256) * 65536;
            number += (parseInt(parts[1],10) % 256) * 16777216;
            number += (parseInt(parts[0],10) % 256) * 4294967296;
            return number;
        }
    }
    return -1;
}
async function addPackagePageInternal(extensionUri: vscode.Uri, projectDir: string) : Promise<void>
{

    const server = await getServerUrl();
	const scriptPathOnDisk = vscode.Uri.joinPath(extensionUri, 'media', 'add-package.js');

		// And the uri we use to load this script in the webview
	
    var panel = vscode.window.createWebviewPanel(
			'toolbox',
			'CrossLang Package Manager',
			vscode.ViewColumn.One
	);
    panel.webview.options = {
        enableScripts: true
    };
    
    panel.webview.onDidReceiveMessage(
			async message => {
                console.log(message.command);
				switch (message.command) {
                    case 'manage-pkg':
                    {
                        //console.log(`${message.name} ${message.version}`);

                        const info = await getProjectInfo(projectDir);
                        var install=true;
                        if(info)
                        {
                            if(info.dependencies)
                            for(var j = 0; j < info.dependencies.length; j++)
                            {
                                if(message.name === info.dependencies[j].name)
                                {

                                    install=false;
                                    if(version2number(message.version) > version2number(info.dependencies[j].version))
                                    {
                                        //upgrade or remove
                                        const result= await new Promise<boolean|null>((resolve,reject)=>{
                const qp=vscode.window.createQuickPick();
		        qp.title = "Update or remove package";
		        
		
		        qp.items = [
                    {label: "Update",description: `Update ${message.name} to ${message.version}`},
                    {label: "Remove",description: `Remove ${message.name}`}
                ];
		
		        qp.onDidAccept(()=>{
			        if(qp.activeItems.length ==1)
			        {
                        qp.hide();
                        resolve(qp.activeItems[0].label === "Update");
		        
		            }
                    else {

		                qp.hide();
                        resolve(null);
                    }
	            });
	            qp.show();
    
            });
                                        if(result !== null)
                                        {
                                            if(result)
                                            {
                                                info.dependencies[j].version = message.version;
                                                break;
                                            }
                                            else
                                            {
                                                info.dependencies.splice(j,1);
                                                break;
                                            }
                                        }
                                    }
                                    else
                                    {
                                        //remove
                                        info.dependencies.splice(j,1);
                                        break;
                                    }
                                }
                            }
                            if(install)
                                (info.dependencies ??= []).push({name: message.name, version: message.version});
                            
                            await setProjectInfo(projectDir,info);

                            
                        }

                        
                    }
                    case 'query':
                    {
                        const info = await getProjectInfo(projectDir);
                        
                        if(server && info)
                        {
                            const url = `${trimEndChar(server,'/')}/api/v1/search?q=${encodeURIComponent(message.query)}&type=lib,compile_tool&offset=${encodeURIComponent(message.page-1)}`;
                            console.log(url);
                            const response = await fetch(url);
                            if(response.status === 200)
                            {
                               const packageServerResponse : PackageServerResponse = await response.json() as PackageServerResponse;
                               const packages = [];
                                

                               for(var i = 0; i < packageServerResponse.packages.length;i++)
                               {
                                    var installText = "Install";
                                    const pkg = packageServerResponse.packages[i];
                                    if(info.dependencies)
                                    for(var j = 0; j < info.dependencies.length; j++)
                                    {
                                        if(pkg.packageName === info.dependencies[j].name)
                                        {
                                            installText = (version2number(pkg.version) > version2number(info.dependencies[j].version)) ? "Upgrade/Remove" : "Remove";
                                        }
                                    }

                                    packages.push({
                                        name: pkg.packageName,
                                        version: pkg.version,
                                        icon: `${trimEndChar(server,'/')}/api/v1/package_icon.png?name=${encodeURIComponent(pkg.packageName)}&version=${pkg.version}`,
                                        installText: installText
                                    });

                                    
                               }

                               panel.webview.postMessage({
                                    command: "searchResponse",
                                    packages: packages,
                                    page: message.page,
                                    query: message.query
                               });
                            }
                        }
                    }
                        break;
				}
			},
			null
		);
    const scriptUri = panel.webview.asWebviewUri(scriptPathOnDisk);
    // Local path to css styles
		const styleResetPath = vscode.Uri.joinPath(extensionUri, 'media', 'reset.css');
		const stylesPathMainPath = vscode.Uri.joinPath(extensionUri, 'media', 'vscode.css');

		// Uri to load styles into webview
		const stylesResetUri = panel.webview.asWebviewUri(styleResetPath);
		const stylesMainUri = panel.webview.asWebviewUri(stylesPathMainPath);
        const nonce = getNonce();
		panel.webview.html = `<!DOCTYPE html>
		<html lang="en">
<head>
    <meta charset="UTF-8">

	<!--
		Use a content security policy to only allow loading images from https or from our extension directory,
		and only allow scripts that have a specific nonce.
	-->
	<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${panel.webview.cspSource}; img-src ${panel.webview.cspSource} https:; script-src 'nonce-${nonce}';">

	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link href="${stylesResetUri}" rel="stylesheet">
	<link href="${stylesMainUri}" rel="stylesheet">
</head>
<body>
    <div class="search-box">
        <input type="text" id="query" placeholder="Search for packages">
        <button id="searchbtn">Search</button>
    </div>
    <div id="packages">

    </div>
    <div class="pagination">
        <div></div>
        <button id="prevPage">Previous</button>
        <span id="currentPage">1</span>
        <button id="nextPage">Next</button>
        <div></div>
    </div>
	<script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
}

function getNonce() : string {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}