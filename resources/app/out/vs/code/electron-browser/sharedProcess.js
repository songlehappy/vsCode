/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
"use strict";function assign(e,n){return Object.keys(n).reduce(function(e,t){return e[t]=n[t],e},e)}function parseURLQueryArgs(){return(window.location.search||"").split(/[?&]/).filter(function(e){return!!e}).map(function(e){return e.split("=")}).filter(function(e){return 2===e.length}).reduce(function(e,n){return e[n[0]]=decodeURIComponent(n[1]),e},{})}function createScript(e,n){const t=document.createElement("script");t.src=e,t.addEventListener("load",n);const r=document.getElementsByTagName("head")[0];r.insertBefore(t,r.lastChild)}function uriFromPath(e){var n=path.resolve(e).replace(/\\/g,"/");return n.length>0&&"/"!==n.charAt(0)&&(n="/"+n),encodeURI("file://"+n)}function main(){const e=parseURLQueryArgs(),n=JSON.parse(e.config||"{}")||{};assign(process.env,n.userEnv);var t={availableLanguages:{}};const r=process.env.VSCODE_NLS_CONFIG;if(r){process.env.VSCODE_NLS_CONFIG=r;try{t=JSON.parse(r)}catch(e){}}var o=t.availableLanguages["*"]||"en";"zh-tw"===o?o="zh-Hant":"zh-cn"===o&&(o="zh-Hans"),window.document.documentElement.setAttribute("lang",o);const s=uriFromPath(n.appRoot)+"/out";createScript(s+"/vs/loader.js",function(){define("fs",["original-fs"],function(e){return e}),window.MonacoEnvironment={},require.config({baseUrl:s,"vs/nls":t,nodeCachedDataDir:n.nodeCachedDataDir,nodeModules:[]}),t.pseudo&&require(["vs/nls"],function(e){e.setPseudoTranslation(t.pseudo)}),require(["vs/code/electron-browser/sharedProcessMain"],function(){})})}const path=require("path");main();
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/1e9d36539b0ae51ac09b9d4673ebea4e447e5353/core/vs\code\electron-browser\sharedProcess.js.map
