"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nls = require("vscode-nls");
const vscode_1 = require("vscode");
const localize = nls.loadMessageBundle(__filename);
const useWorkspaceTsdkStorageKey = 'typescript.useWorkspaceTsdk';
var MessageAction;
(function (MessageAction) {
    MessageAction[MessageAction["useLocal"] = 0] = "useLocal";
    MessageAction[MessageAction["useBundled"] = 1] = "useBundled";
    MessageAction[MessageAction["learnMore"] = 2] = "learnMore";
})(MessageAction || (MessageAction = {}));
class TypeScriptVersionPicker {
    constructor(versionProvider, workspaceState) {
        this.versionProvider = versionProvider;
        this.workspaceState = workspaceState;
        this._currentVersion = this.versionProvider.defaultVersion;
        if (this.useWorkspaceTsdkSetting) {
            const localVersion = this.versionProvider.localVersion;
            if (localVersion) {
                this._currentVersion = localVersion;
            }
        }
    }
    get useWorkspaceTsdkSetting() {
        return this.workspaceState.get(useWorkspaceTsdkStorageKey, false);
    }
    get currentVersion() {
        return this._currentVersion;
    }
    useBundledVersion() {
        this._currentVersion = this.versionProvider.bundledVersion;
    }
    show(firstRun) {
        return __awaiter(this, void 0, void 0, function* () {
            const pickOptions = [];
            const shippedVersion = this.versionProvider.defaultVersion;
            pickOptions.push({
                label: (!this.useWorkspaceTsdkSetting
                    ? '• '
                    : '') + localize(0, null),
                description: shippedVersion.versionString,
                detail: shippedVersion.pathLabel,
                id: MessageAction.useBundled
            });
            for (const version of this.versionProvider.localVersions) {
                pickOptions.push({
                    label: (this.useWorkspaceTsdkSetting && this.currentVersion.path === version.path
                        ? '• '
                        : '') + localize(1, null),
                    description: version.versionString,
                    detail: version.pathLabel,
                    id: MessageAction.useLocal,
                    version: version
                });
            }
            pickOptions.push({
                label: localize(2, null),
                description: '',
                id: MessageAction.learnMore
            });
            const selected = yield vscode_1.window.showQuickPick(pickOptions, {
                placeHolder: localize(3, null),
                ignoreFocusOut: firstRun
            });
            if (!selected) {
                return { oldVersion: this.currentVersion };
            }
            switch (selected.id) {
                case MessageAction.useLocal:
                    yield this.workspaceState.update(useWorkspaceTsdkStorageKey, true);
                    if (selected.version) {
                        const tsConfig = vscode_1.workspace.getConfiguration('typescript');
                        yield tsConfig.update('tsdk', selected.version.pathLabel, false);
                        const previousVersion = this.currentVersion;
                        this._currentVersion = selected.version;
                        return { oldVersion: previousVersion, newVersion: selected.version };
                    }
                    return { oldVersion: this.currentVersion };
                case MessageAction.useBundled:
                    yield this.workspaceState.update(useWorkspaceTsdkStorageKey, false);
                    const previousVersion = this.currentVersion;
                    this._currentVersion = shippedVersion;
                    return { oldVersion: previousVersion, newVersion: shippedVersion };
                case MessageAction.learnMore:
                    vscode_1.commands.executeCommand('vscode.open', vscode_1.Uri.parse('https://go.microsoft.com/fwlink/?linkid=839919'));
                    return { oldVersion: this.currentVersion };
                default:
                    return { oldVersion: this.currentVersion };
            }
        });
    }
}
exports.TypeScriptVersionPicker = TypeScriptVersionPicker;
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/1e9d36539b0ae51ac09b9d4673ebea4e447e5353/extensions\typescript\out/utils\versionPicker.js.map
