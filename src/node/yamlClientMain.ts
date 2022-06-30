/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ExtensionContext } from 'vscode';
import { ServerOptions, TransportKind, LanguageClientOptions, LanguageClient } from 'vscode-languageclient/node';

const id = 'yaml';
const lsName = 'YAML Support';
const clientOptions: LanguageClientOptions = {
  documentSelector: [{ language: 'yaml' }],
};
let client: LanguageClient;

// this method is called when vs code is activated
// export async function activate(context: ExtensionContext): Promise<SchemaExtensionAPI> {
export function activate(context: ExtensionContext): void {
  // The YAML language server is implemented in node
  const serverModule = context.asAbsolutePath('./dist/languageserver.js');

  // The debug options for the server
  const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: { module: serverModule, transport: TransportKind.ipc, options: debugOptions },
  };
  client = new LanguageClient(id, lsName, serverOptions, clientOptions);
  const disposable = client.start();
  context.subscriptions.push(disposable);
}
