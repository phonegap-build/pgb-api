module.exports=function(e){var t={};function r(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:s})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r.w={},r(r.s=12)}([function(e,t,r){const s=r(2),n=r(1),o=r(3).Writable;e.exports={merge:function(){const e=(t,r)=>{for(let s in t)t[s]&&t[s].constructor===Object?(r[s]=r[s]||{},r[s]=e(t[s],r[s])):r[s]=t[s];return r};return Array.from(arguments).reduce((t,r)=>e(r,t),{})},mkdirp:function(e){e=e||"";let t=n.resolve(e).split(n.sep);for(let e=1;e<t.length;e++){let r=n.join(t.slice(0,e+1).join(n.sep)+n.sep);s.existsSync(r)||s.mkdirSync(r)}},TextStream:class extends o{constructor(){super(),this._chunks=[]}_write(e,t,r){this._chunks.push(e),r()}toString(){return this._chunks.join("")}},getPath:e=>{let t,r;return e.endsWith(n.sep)||s.existsSync(e)&&s.statSync(e).isDirectory()?r=e:(r=n.dirname(e),t=n.basename(e)),{filename:t,directory:r}}}},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("stream")},function(e,t){e.exports=require("url")},function(e,t){e.exports=require("os")},function(e,t){e.exports=require("yazl")},function(e,t,r){const s=r(2),n=r(6),o=r(1),a=e=>{let t=[],r=[],n=e=>{s.readdirSync(e).forEach(a=>{let i=o.join(e,a);if(!a.startsWith(".")||a.match(/^\.pgb/))try{let e=s.statSync(i);s.closeSync(s.openSync(i,"r")),e.isDirectory()?(t.push({path:i,size:0}),n(i)):t.push({path:i,size:e.size})}catch(e){r.push(`${i} [${e.code}]`)}else r.push(`${i} [HIDDEN]`)})};return n(e),{list:t,skipped:r}};e.exports={getFileList:a,zipDir:(e,t,r)=>new Promise((i,p)=>{let u=a(e),d=s.createWriteStream(t),l=new n.ZipFile,h="",c=0,f=[0],m=0,g=0;const y=(e,t)=>{r&&r.emit(e,t)};y("zip/files",u);for(let t of u.list){let r=o.relative(e,t.path);s.statSync(t.path).isDirectory()?(l.addEmptyDirectory(r),m+=46+r.length+1):(l.addFile(t.path,r),m+=46+r.length),f.push(m+=t.size)}d.on("error",p),l.outputStream.on("error",p),l.outputStream.pipe(d).once("close",()=>{y("zip/write",{size:m,file:h,pos:m,delta:f[f.length-1]-g}),y("zip/end",!0),i()}),l.outputStream.on("data",e=>{for(let e=c;e<l.entries.length;e++){let t=l.entries[e];if(2===t.state){h=t.utf8FileName.toString(),c=e;break}}y("zip/write",{size:m,file:h,pos:f[c],delta:f[c]-g}),g=f[c]}),l.end()})}},function(e,t){e.exports=require("http")},function(e,t){e.exports=require("https")},function(e){e.exports={name:"pgb-api",version:"1.0.0-alpha2",description:"nodeJS API to PhoneGap Build",keywords:["PhoneGap","Cordova","PhoneGap Build","api"],bugs:{url:"https://github.com/phonegap-build/pgb-api/issues"},main:"./index.js",scripts:{build:"npm test && webpack",test:"eslint . && jest  --coverage"},engines:{node:">= 4.0.0"},author:"Brett Rudd <brettrudd@gmail.com>",license:"MIT",repository:{type:"git",url:"phonegap-build/pgb-api"},devDependencies:{eslint:"^4.19.0","eslint-config-standard":"^11.0.0","eslint-plugin-import":"^2.9.0","eslint-plugin-jest":"^21.15.0","eslint-plugin-node":"^6.0.1","eslint-plugin-promise":"^3.7.0","eslint-plugin-standard":"^3.0.1",express:"^4.16.3",jest:"^22.4.3","jest-plugin-fs":"^2.7.0",multer:"^1.3.0",webpack:"^4.2.0","webpack-cli":"^2.0.12","webpack-node-externals":"^1.6.0"},dependencies:{yazl:"^2.4.3"}}},function(e,t,r){const s=r(0).merge,n=r(0).mkdirp,o=r(0).TextStream,a=r(0).getPath,i=r(4),p=r(2),u=r(1),d=r(3).Stream,l={headers:{user_agent:`pgb-api/${r(10).version} (${process.platform}) node/${process.version}`}},h=(e,t,r)=>{e.opts.events&&e.opts.events.emit&&e.opts.events.emit(t,r)},c=(e,t)=>(t=t||{},new Promise((d,g)=>{let y=0,_={},b=i.parse(e);_.opts=s(l,b,t),f(_);const $="https:"===_.opts.protocol?r(9):r(8);h(_,"api/headers",_.opts.headers),h(_,"debug",`${_.opts.method||"GET"} ${e}`),_.req=$.request(_.opts,s=>{_.response=s;let l=Number.parseInt(s.headers["content-length"])||null,f=Math.trunc(s.statusCode/100);if(3===f&&"location"in s.headers){let r=i.parse(s.headers.location);return t.headers&&_.opts.hostname!==r.hostname&&delete t.headers.Authorization,r=i.resolve(e,r.href),h(_,"debug",`${_.req.method} ${e} -> ${s.statusCode} ${r}`),d(c(r,t))}if(_.opts.save&&2===f)if(_.opts.save instanceof r(3).Writable)_.output=_.opts.save;else{let e=a(_.opts.save);e.filename=decodeURI(e.filename||u.basename(_.opts.pathname)||"app.download"),_.output=u.join(e.directory,e.filename);try{n(e.directory),p.closeSync(p.openSync(_.output,"w")),_.path=u.resolve(_.output)}catch(e){return g(e)}h(_,"debug",`saving to ${_.path}`),_.output=p.createWriteStream(_.output)}h(_,"api/connect",{statusCode:s.statusCode,size:l,headers:s.headers,path:_.path,url:e,method:_.req.method}),h(_,"debug",`${_.req.method} ${e} -> ${s.statusCode}`),_.output=_.output||new o,_.output.once("error",g),s.pipe(_.output),s.on("data",e=>{y+=e.length,h(_,"api/read",{size:l,pos:y,delta:e.length})}),s.once("end",()=>{let e=(e=>{let t,r;if(e.output instanceof o){t=e.output.toString();try{r=JSON.parse(t)}catch(e){}}return e.path||r||t})(_);if(2===f)d(e);else{let t=new Error(e.error||e);t.statusCode=s.statusCode,g(t)}})}),_.req.once("error",g),m(_)})),f=e=>{if(e._payload=[],e._contentLength=0,null==e.opts.data)return;for(let t in e.opts.data){let r=e.opts.data[t];if(e._payload.push("------pgbapi\r\n"),r instanceof d){let s=u.basename(r.path);e._payload.push(`Content-Disposition: form-data; name="${t}"; filename="${s.replace('"','\\"')}"\r\n`),e._payload.push("Content-Type: application/octet-stream\r\n\r\n"),e._payload.push(r),e._payload.push("\r\n")}else e._payload.push(`Content-Disposition: form-data; name="${t}";\r\n\r\n`),r&&"Object"===r.constructor.name&&(r=JSON.stringify(r)),e._payload.push(`${r}\r\n`)}e._payload.push("------pgbapi--\r\n");for(let t of e._payload)e._contentLength+=t.length||p.statSync(t.path).size;e.opts.headers["Content-Length"]=e._contentLength,e.opts.headers["Content-Type"]="multipart/form-data; boundary=----pgbapi"},m=e=>{if(0===e._payload.length)return e.req.end();let t=0;let r=e._payload.slice(0),s=()=>{g=r.shift(),y=(()=>0===r.length?e.req.end():s()),g instanceof d?(g.on("data",r=>{t+=r.length,h(e,"api/write",{size:e._contentLength,pos:t,delta:r.length})}),g.once("end",y),g.pipe(e.req,{end:!1})):(t+=g.length,e.req.write(g),h(e,"api/write",{size:e._contentLength,pos:t,delta:g.length}),y())};s()};var g,y;e.exports={post:(e,t)=>c(e,s(t,{method:"POST"})),put:(e,t)=>c(e,s(t,{method:"PUT"})),del:(e,t)=>c(e,s(t,{method:"DELETE"})),get:c}},function(e,t,r){"use strict";const s=r(0).merge,n=r(0).getPath,o=r(0).mkdirp,a=r(11),i=r(7),p=r(2),u=r(1),d=r(5),l=r(4).parse,h="https://build.phonegap.com/api/v1";e.exports=(e=>new class{constructor(e){this.defaults=s(e)}_get(e,t){return a.get(h+e,s(this.defaults,t))}_post(e,t){return a.post(h+e,s(this.defaults,t))}_put(e,t){return a.put(h+e,s(this.defaults,t))}_del(e,t){return a.del(h+e,s(this.defaults,t))}me(){return this._get("/me")}getToken(){return this._post("/token")}getApps(){return this._get("/apps")}getStatus(e){return this._get(`/apps/${e}/status`)}getApp(e){return this._get(`/apps/${e}`)}getAppLog(e,t){return this._get(`/apps/${e}/logs/${t}/build`)}_app(e,t){return e?this._put(`/apps/${e}`,{data:t}):this._post("/apps",{data:t})}deleteApp(e){return this._del(`/apps/${e}`)}downloadApp(e,t,r){return this._get(`/apps/${e}/${t}`,{save:r})}buildApp(e,t){return this._post(`/apps/${e}/build/${t||""}`)}addCollaborator(e,t,r){return this._post(`/apps/${e}/collaborators`,{data:{email:t,role:r}})}updateCollaborator(e,t,r){return this._put(`/apps/${e}/collaborators/${t}`,{data:{role:r}})}deleteCollaborator(e,t){return this._del(`/apps/${e}/collaborators/${t}`)}getKeys(e){return this._get(`/keys/${e||""}/`)}getKey(e,t){return this._get(`/keys/${e}/${t}`)}addKey(e,t){return this._post(`/keys/${e}`,{data:t})}updateKey(e,t,r){return this._put(`/keys/${e}/${t}`,{data:r})}deleteKey(e,t){return this._del(`/keys/${e}/${t}`)}currentSupport(){return this._get("/current_support")}isRepo(e){try{return e.toString().match(/^[a-z0-9_-][a-z0-9_.-]*\/[a-z0-9_.-]+(#[a-z0-9_.-]*)?$/i)||l(e).hostname}catch(e){return!1}}addApp(e,t){return this.updateApp(null,e,t)}updateApp(e,t,r){r=r||{},"string"!=typeof t&&(r=t,t=null);let s=p.existsSync(t);return t?s&&p.statSync(t).isDirectory()?this.addAppFromDir(e,t,r):this.isRepo(t)?this.addAppfromRepo(e,t,r):this.addAppFromFile(e,t,r):this._app(e,r)}addAppFromDir(e,t,r){return new Promise((s,a)=>{let l=!1,h=r.zip;delete r.zip,h||(h=u.join(d.tmpdir(),"pgb-"+Math.random().toString(32).slice(2)+".zip"),l=!0);let c=n(h);c.filename=c.filename||"app.zip",o(c.directory),h=u.join(c.directory,c.filename);const f=(e,t)=>{this.defaults.events&&this.defaults.events.emit&&this.defaults.events.emit(e,t)},m=()=>{l&&p.existsSync(h)&&p.statSync(h).isFile()&&(p.unlinkSync(h),f("debug",`archive deleted ${h}`))};f("debug",`archiving ${t} to ${h}`),i.zipDir(t,h,this.defaults.events).then(()=>this.addAppFromFile(e,h,r)).then(e=>{m(),s(e)}).catch(e=>{m(),a(e)})})}addAppfromRepo(e,t,r){return this._app(e,s(r,{repo:t}))}addAppFromFile(e,t,r){return new Promise((n,o)=>{let a=p.createReadStream(t);a.once("error",o),this._app(e,s(r,{file:a})).then(n,o)})}pullApp(e,t){return this._app(e,s(t,{pull:!0}))}lockKey(e,t){return this.updateKey(e,t,{lock:!0})}addIOSKey(e,t,r,n){return new Promise((o,a)=>{let i=p.createReadStream(t);i.once("error",a);let u=p.createReadStream(r);return u.once("error",a),this.addKey("ios",s({title:e,profile:i,cert:u},n)).then(o,a)})}addWindowsKey(e,t,r){return new Promise((n,o)=>{let a=p.createReadStream(t);return a.once("error",o),this.addKey("windows",s({title:e,keystore:a},r)).then(n,o)})}addAndroidKey(e,t,r,n){return new Promise((o,a)=>{let i=p.createReadStream(r);return i.once("error",a),this.addKey("android",s({title:e,keystore:i,alias:t},n)).then(o,a)})}addWinphoneKey(e,t,r){return this.addKey("winphone",s({title:e,publisher_id:t},r))}unlockIOSKey(e,t){return this.updateKey("ios",e,{password:t})}unlockAndroidKey(e,t,r){return this.updateKey("android",e,{keystore_pw:t,key_pw:r})}unlockWindowsKey(e,t){return this.updateKey("windows",e,{password:t})}hasAuth(){return!(!this.defaults.headers||!this.defaults.headers.Authorization)}clearAuth(){this.hasAuth()&&delete this.defaults.headers.Authorization}addAuth(e,t){if(this.defaults.headers=this.defaults.headers||{},e&&t){const r=Buffer.from(`${e}:${t}`).toString("base64");this.defaults.headers.Authorization=`Basic ${r}`}else e&&(this.defaults.headers.Authorization=`token ${e}`);return this}}(e))}]);