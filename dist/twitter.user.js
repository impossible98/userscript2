"use strict";
// ==UserScript==
// @name        Twitter Media Downloader
// @name:zh-cn  Twitter 媒体下载
// @description    Save Video/Photo by One-Click.
// @description:zh-cn 一键保存视频/图片
// @version     0.0.1
// @author      impossible98
// @namespace   none
// @match       https://twitter.com/*
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_download
// @compatible  Chrome
// @compatible  Firefox
// @downloadURL  https://raw.githubusercontent.com/impossible98/userscript/master/dist/twitter.user.js
// ==/UserScript==
// https://greasyfork.org/zh-CN/scripts/423001-twitter-media-downloader
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var filename = '{date-time}_{file-type}';
var language = {
    en: {
        download: 'Download',
        completed: 'Download Completed',
        settings: 'Settings',
        dialog: {
            title: 'Download Settings',
            save: 'Save',
            record: 'Remember Download History',
            clear: '(Clear)',
            confirm: 'Clear download history?',
            pattern: 'File Name Pattern',
        },
    },
    zh: {
        download: '下载',
        completed: '下载完成',
        settings: '设置',
        dialog: { title: '下载设置', save: '保存', record: '保存下载记录', clear: '(清除)', confirm: '确认要清除下载记录？', pattern: '文件名格式' },
    },
};
var svg = "\n<g class=\"download\"><path d=\"M3,14 v5 q0,2 2,2 h14 q2,0 2,-2 v-5 M7,10 l4,4 q1,1 2,0 l4,-4 M12,3 v11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" /></g>\n<g class=\"completed\"><path d=\"M3,14 v5 q0,2 2,2 h14 q2,0 2,-2 v-5 M7,10 l3,4 q1,1 2,0 l8,-11\" fill=\"none\" stroke=\"#1DA1F2\" stroke-width=\"2\" stroke-linecap=\"round\" /></g>\n<g class=\"loading\"><circle cx=\"12\" cy=\"12\" r=\"10\" fill=\"none\" stroke=\"#1DA1F2\" stroke-width=\"4\" opacity=\"0.4\" /><path d=\"M12,2 a10,10 0 0 1 10,10\" fill=\"none\" stroke=\"#1DA1F2\" stroke-width=\"4\" stroke-linecap=\"round\" /></g>\n<g class=\"failed\"><circle cx=\"12\" cy=\"12\" r=\"11\" fill=\"#f33\" stroke=\"currentColor\" stroke-width=\"2\" opacity=\"0.8\" /><path d=\"M14,5 a1,1 0 0 0 -4,0 l0.5,9.5 a1.5,1.5 0 0 0 3,0 z M12,17 a2,2 0 0 0 0,4 a2,2 0 0 0 0,-4\" fill=\"#fff\" stroke=\"none\" /></g>\n";
var css = "\n.tmd-down > div > div > div:nth-child(2) {display: none}\n.tmd-down:hover > div > div {color: rgba(29, 161, 242, 1.0);}\n.tmd-down:hover > div > div > div > div {background-color: rgba(29, 161, 242, 0.1);}\n.tmd-down:active > div > div > div > div {background-color: rgba(29, 161, 242, 0.2);}\n.tmd-down g {display: none;}\n.tmd-down.download g.download, .tmd-down.completed g.completed, .tmd-down.loading g.loading,.tmd-down.failed g.failed {display: unset;}\n.tmd-down.loading svg {animation: spin 1s linear infinite;}\n@keyframes spin {0% {transform: rotate(0deg);} 100% {transform: rotate(360deg);}}\n.tmd-btn {display: inline-block; background-color: #1DA1F2; color: #FFFFFF; padding: 0 20px; border-radius: 99px;}\n.tmd-tag {display: inline-block; background-color: #FFFFFF; color: #1DA1F2; padding: 0 10px; border-radius: 10px; border: 1px solid #1DA1F2;  font-weight: bold; margin: 5px;}\n.tmd-btn:hover {background-color: rgba(29, 161, 242, 0.9);}\n.tmd-tag:hover {background-color: rgba(29, 161, 242, 0.1);}\n.tmd-notifier {display: none; position: fixed; left: 16px; bottom: 16px; background: #fff; border: 1px solid #ccc; border-radius: 8px; padding: 4px;}\n.tmd-notifier.running {display: flex; align-items: center;}\n.tmd-notifier label {display: inline-flex; align-items: center; margin: 0 8px;}\n.tmd-notifier label:before {content: \" \"; width: 32px; height: 16px; background-position: center; background-repeat: no-repeat;}\n.tmd-notifier label:nth-child(1):before {background-image:url(\"data:image/svg+xml;charset=utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22><path d=%22M3,14 v5 q0,2 2,2 h14 q2,0 2,-2 v-5 M7,10 l4,4 q1,1 2,0 l4,-4 M12,3 v11%22 fill=%22none%22 stroke=%22%23666%22 stroke-width=%222%22 stroke-linecap=%22round%22 /></svg>\");}\n.tmd-notifier label:nth-child(2):before {background-image:url(\"data:image/svg+xml;charset=utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22><path d=%22M12,2 a1,1 0 0 1 0,20 a1,1 0 0 1 0,-20 M12,5 v7 h6%22 fill=%22none%22 stroke=%22%23999%22 stroke-width=%222%22 stroke-linejoin=%22round%22 stroke-linecap=%22round%22 /></svg>\");}\n.tmd-notifier label:nth-child(3):before {background-image:url(\"data:image/svg+xml;charset=utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22><path d=%22M12,0 a2,2 0 0 0 0,24 a2,2 0 0 0 0,-24%22 fill=%22%23f66%22 stroke=%22none%22 /><path d=%22M14.5,5 a1,1 0 0 0 -5,0 l0.5,9 a1,1 0 0 0 4,0 z M12,17 a2,2 0 0 0 0,5 a2,2 0 0 0 0,-5%22 fill=%22%23fff%22 stroke=%22none%22 /></svg>\");}\n";
var TMD = (function () {
    var lang, history;
    return {
        init: function () {
            GM_registerMenuCommand((language[navigator.language] || language.en).settings, this.settings);
            document.head.insertAdjacentHTML('beforeend', '<style>' + css + '</style>');
            lang = language[document.querySelector('html').lang] || language.en;
            history = this.storage('history');
        },
        inject: function (article) {
            var _this = this;
            var media_selector = [
                'a[href*="/photo/1"]',
                'div[role="progressbar"]',
                'div[data-testid="playButton"]',
                'a[href="/settings/safety"]',
            ];
            var media = article.querySelector(media_selector.join(','));
            if (media) {
                var status_id_1 = article.querySelector('a[href*="/status/"]').href.split('/status/').pop().split('/')
                    .shift();
                var btn_group = article.querySelector('div[role="group"]');
                var btn_share = Array.from(btn_group.querySelectorAll(':scope>div>div')).pop().parentNode;
                var btn_down_1 = btn_share.cloneNode(true);
                btn_down_1.querySelector('svg').innerHTML = svg;
                var is_exist_1 = history.indexOf(status_id_1) >= 0;
                this.status(btn_down_1, 'tmd-down');
                this.status(btn_down_1, is_exist_1 ? 'completed' : 'download', is_exist_1 ? lang.completed : lang.download);
                btn_group.insertBefore(btn_down_1, btn_share.nextSibling);
                btn_down_1.onclick = function () { return _this.click(btn_down_1, status_id_1, is_exist_1); };
                article.dataset.injected = 'true';
            }
        },
        click: function (btn, status_id, is_exist) {
            return __awaiter(this, void 0, void 0, function () {
                var out, record, json, tweet, user, invalid_chars, datetime, info, medias, tasks_1, tasks_result_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (btn.classList.contains('loading'))
                                return [2 /*return*/];
                            this.status(btn, 'loading');
                            return [4 /*yield*/, GM_getValue('filename', filename)];
                        case 1:
                            out = (_a.sent()).split('\n').join('');
                            return [4 /*yield*/, GM_getValue('record', true)];
                        case 2:
                            record = _a.sent();
                            return [4 /*yield*/, this.fetchJson(status_id)];
                        case 3:
                            json = _a.sent();
                            tweet = json.globalObjects.tweets[status_id];
                            user = json.globalObjects.users[tweet.user_id_str];
                            invalid_chars = {
                                '\\': '＼',
                                '\/': '／',
                                '\|': '｜',
                                '<': '＜',
                                '>': '＞',
                                ':': '：',
                                '*': '＊',
                                '?': '？',
                                '"': '＂',
                                '🔞': '',
                            };
                            datetime = out.match(/{date-time(-local)?:[^{}]+}/)
                                ? out.match(/{date-time(?:-local)?:([^{}]+)}/)[1].replace(/[\\\/\|<>\*\?:"]/g, function (v) { return invalid_chars[v]; })
                                : 'YYYY-MM-DD-hh-mm-ss';
                            info = {};
                            info['status-id'] = status_id;
                            info['user-name'] = user.name.replace(/([\\\/\|\*\?:"]|🔞)/g, function (v) { return invalid_chars[v]; });
                            info['user-id'] = user.screen_name;
                            info['date-time'] = this.formatDate(tweet.created_at, datetime);
                            info['date-time-local'] = this.formatDate(tweet.created_at, datetime, true);
                            info['full-text'] = tweet.full_text.split('\n').join(' ').replace(/\s*https:\/\/t\.co\/\w+/g, '').replace(/[\\\/\|<>\*\?:"]/g, function (v) { return invalid_chars[v]; });
                            medias = tweet.extended_entities && tweet.extended_entities.media;
                            if (medias.length > 0) {
                                tasks_1 = medias.length;
                                tasks_result_1 = [];
                                medias.forEach(function (media, i) {
                                    info.url = media.type == 'photo'
                                        ? media.media_url + ':orig'
                                        : media.video_info.variants.filter(function (n) { return n.content_type == 'video/mp4'; }).sort(function (a, b) {
                                            return b.bitrate - a.bitrate;
                                        })[0].url;
                                    info.file = info.url.split('/').pop().split(/[:?]/).shift();
                                    info['file-name'] = info.file.split('.').shift();
                                    info['file-ext'] = info.file.split('.').pop();
                                    info['file-type'] = media.type.replace('animated_', '');
                                    info.out = (out.replace(/\.?{file-ext}/, '') + (medias.length > 1 && !out.match('{file-name}')
                                        ? '-' + i
                                        : '')
                                        + '.{file-ext}').replace(/{([^{}:]+)(:[^{}]+)?}/g, function (match, name) { return info[name]; });
                                    _this.downloader.add({
                                        url: info.url,
                                        name: info.out,
                                        onload: function () {
                                            tasks_1 -= 1;
                                            tasks_result_1.push((medias.length > 1
                                                ? i + 1 + ': '
                                                : '') + lang.completed);
                                            _this.status(btn, null, tasks_result_1.sort().join('\n'));
                                            if (tasks_1 === 0) {
                                                _this.status(btn, 'completed', lang.completed);
                                                if (record && !is_exist) {
                                                    history.push(status_id);
                                                    _this.storage('history', status_id);
                                                }
                                            }
                                        },
                                        onerror: function (result) {
                                            tasks_1 = -1;
                                            tasks_result_1.push((medias.length > 1 ? i + 1 + ': ' : '') + result.details.current);
                                            _this.status(btn, 'failed', tasks_result_1.sort().join('\n'));
                                        },
                                    });
                                });
                            }
                            else {
                                this.status(btn, 'failed', 'MEDIA_NOT_FOUND');
                            }
                            return [2 /*return*/];
                    }
                });
            });
        },
        status: function (btn, css, title, style) {
            if (css) {
                btn.classList.remove('download', 'completed', 'loading', 'failed');
                btn.classList.add(css);
            }
            if (title)
                btn.title = title;
            if (style)
                btn.style.cssText = style;
        },
        settings: function () {
            return __awaiter(this, void 0, void 0, function () {
                var $element, wapper, wapper_close, dialog, title, options, record_label, record_input, _a, record_clear, filename_div, filename_label, filename_input, _b, _c, filename_tags, btn_save;
                var _this = this;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            $element = function (parent, tag, style, content, css) {
                                var el = document.createElement(tag);
                                if (style) {
                                    el.style.cssText = style;
                                }
                                if (typeof content !== 'undefined') {
                                    if (tag == 'input') {
                                        if (content == 'checkbox')
                                            el.type = content;
                                        else
                                            el.value = content;
                                    }
                                    else
                                        el.innerHTML = content;
                                }
                                if (css) {
                                    css.split(' ').forEach(function (c) { return el.classList.add(c); });
                                }
                                parent.appendChild(el);
                                return el;
                            };
                            wapper = $element(document.body, 'div', 'position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; background-color: #0009; z-index: 10;');
                            wapper.onmousedown = function (e) {
                                wapper_close = e.target == wapper;
                            };
                            wapper.onmouseup = function (e) {
                                if (wapper_close && e.target == wapper)
                                    wapper.remove();
                            };
                            dialog = $element(wapper, 'div', 'position: absolute; left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%); width: fit-content; width: -moz-fit-content; background-color: #f3f3f3; border: 1px solid #ccc; border-radius: 10px;');
                            title = $element(dialog, 'h3', 'margin: 10px 20px;', lang.dialog.title);
                            options = $element(dialog, 'div', 'margin: 10px; border: 1px solid #ccc; border-radius: 5px;');
                            record_label = $element(options, 'label', 'display: block; margin: 10px;', lang.dialog.record);
                            record_input = $element(record_label, 'input', 'float: left;', 'checkbox');
                            _a = record_input;
                            return [4 /*yield*/, GM_getValue('history', true)];
                        case 1:
                            _a.checked = _d.sent();
                            record_input.onchange = function () { return GM_setValue('history', record_input.checked); };
                            record_clear = $element(record_label, 'label', 'margin: 10px; color: blue;', lang.dialog.clear);
                            record_clear.onclick = function () {
                                if (confirm(lang.dialog.confirm)) {
                                    history = [];
                                    localStorage.removeItem('history');
                                }
                            };
                            filename_div = $element(dialog, 'div', 'margin: 10px; border: 1px solid #ccc; border-radius: 5px;');
                            filename_label = $element(filename_div, 'label', 'display: block; margin: 10px 15px;', lang.dialog.pattern);
                            _b = $element;
                            _c = [filename_label,
                                'textarea',
                                'display: block; min-width: 500px; max-width: 500px; min-height: 100px; font-size: inherit;'];
                            return [4 /*yield*/, GM_getValue('filename', filename)];
                        case 2:
                            filename_input = _b.apply(void 0, _c.concat([_d.sent()]));
                            filename_tags = $element(filename_div, 'label', 'display: table; margin: 10px;', "\n<span class=\"tmd-tag\" title=\"user name\">{user-name}</span>\n<span class=\"tmd-tag\" title=\"The user name after @ sign.\">{user-id}</span>\n<span class=\"tmd-tag\" title=\"example: 1234567890987654321\">{status-id}</span>\n<span class=\"tmd-tag\" title=\"{date-time} : Posted time in UTC.\n{date-time-local} : Your local time zone.\n\nDefault:\nYYYYMMDD-hhmmss => 20201231-235959\n\nExample of custom:\n{date-time:DD-MMM-YY hh.mm} => 31-DEC-21 23.59\">{date-time}</span><br>\n<span class=\"tmd-tag\" title=\"Text content in tweet.\">{full-text}</span>\n<span class=\"tmd-tag\" title=\"Type of &#34;video&#34; or &#34;photo&#34; or &#34;gif&#34;.\">{file-type}</span>\n<span class=\"tmd-tag\" title=\"Original filename from URL.\">{file-name}</span>\n");
                            filename_input.selectionStart = filename_input.value.length;
                            filename_tags.querySelectorAll('.tmd-tag').forEach(function (tag) {
                                tag.onclick = function () {
                                    var ss = filename_input.selectionStart;
                                    var se = filename_input.selectionEnd;
                                    filename_input.value = filename_input.value.substring(0, ss) + tag.innerText
                                        + filename_input.value.substring(se);
                                    filename_input.selectionStart = ss + tag.innerText.length;
                                    filename_input.selectionEnd = ss + tag.innerText.length;
                                    filename_input.focus();
                                };
                            });
                            btn_save = $element(title, 'label', 'float: right;', lang.dialog.save, 'tmd-btn');
                            btn_save.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, GM_setValue('filename', filename_input.value)];
                                        case 1:
                                            _a.sent();
                                            wapper.remove();
                                            return [2 /*return*/];
                                    }
                                });
                            }); };
                            return [2 /*return*/];
                    }
                });
            });
        },
        fetchJson: function (status_id) {
            return __awaiter(this, void 0, void 0, function () {
                var url, cookies, headers;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = 'https://twitter.com/i/api/2/timeline/conversation/' + status_id
                                + '.json?tweet_mode=extended&include_entities=false&include_user_entities=false';
                            cookies = this.getCookie();
                            headers = {
                                'authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
                                'x-twitter-active-user': 'yes',
                                'x-twitter-client-language': cookies.lang,
                                'x-csrf-token': cookies.ct0,
                            };
                            if (cookies.ct0.length == 32)
                                headers['x-guest-token'] = cookies.gt;
                            return [4 /*yield*/, fetch(url, { headers: headers }).then(function (result) { return result.json(); })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        getCookie: function (name) {
            var cookies = {};
            document.cookie.split(';').filter(function (n) { return n.indexOf('=') > 0; }).forEach(function (n) {
                n.replace(/^([^=]+)=(.+)$/, function (match, name, value) {
                    cookies[name.trim()] = value.trim();
                });
            });
            return name ? cookies[name] : cookies;
        },
        storage: function (name, value) {
            var data = JSON.parse(localStorage.getItem(name) || '[]');
            if (value)
                data.push(value);
            else
                return data;
            localStorage.setItem(name, JSON.stringify(data));
        },
        formatDate: function (i, o, tz) {
            var d = new Date(i);
            if (tz)
                d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
            var m = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
            var v = {
                YYYY: d.getUTCFullYear().toString(),
                YY: d.getUTCFullYear().toString(),
                MM: d.getUTCMonth() + 1,
                MMM: m[d.getUTCMonth()],
                DD: d.getUTCDate(),
                hh: d.getUTCHours(),
                mm: d.getUTCMinutes(),
                ss: d.getUTCSeconds(),
                h2: d.getUTCHours() % 12,
                ap: d.getUTCHours() < 12 ? 'AM' : 'PM',
            };
            return o.replace(/(YY(YY)?|MMM?|DD|hh|mm|ss|h2|ap)/g, function (n) { return ('0' + v[n]).substr(-n.length); });
        },
        downloader: (function () {
            var tasks = [], thread = 0, max_thread = 2, retry = 0, max_retry = 2, failed = 0, notifier, has_failed = false;
            return {
                add: function (task) {
                    tasks.push(task);
                    if (thread < max_thread) {
                        thread += 1;
                        this.next();
                    }
                    else
                        this.update();
                },
                next: function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var task;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    task = tasks.shift();
                                    return [4 /*yield*/, this.start(task)];
                                case 1:
                                    _a.sent();
                                    if (tasks.length > 0 && thread <= max_thread)
                                        this.next();
                                    else
                                        thread -= 1;
                                    this.update();
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                start: function (task) {
                    var _this = this;
                    this.update();
                    return new Promise(function (resolve) {
                        GM_download({
                            url: task.url,
                            name: task.name,
                            onload: function (result) {
                                task.onload();
                                resolve();
                            },
                            onerror: function (result) {
                                _this.retry(task, result);
                                resolve();
                            },
                            ontimeout: function (result) {
                                _this.retry(task, result);
                                resolve();
                            },
                        });
                    });
                },
                retry: function (task, result) {
                    retry += 1;
                    if (retry == 3)
                        max_thread = 1;
                    if (task.retry && task.retry >= max_retry
                        || result.details && result.details.current == 'USER_CANCELED') {
                        task.onerror(result);
                        failed += 1;
                    }
                    else {
                        if (max_thread == 1)
                            task.retry = (task.retry || 0) + 1;
                        this.add(task);
                    }
                },
                update: function () {
                    var _this = this;
                    if (!notifier) {
                        notifier = document.createElement('div');
                        notifier.title = 'Twitter Media Downloader';
                        notifier.classList.add('tmd-notifier');
                        notifier.innerHTML = '<label>0</label>|<label>0</label>';
                        document.body.appendChild(notifier);
                    }
                    if (failed > 0 && !has_failed) {
                        has_failed = true;
                        notifier.innerHTML += '|';
                        var clear = document.createElement('label');
                        notifier.appendChild(clear);
                        clear.onclick = function () {
                            notifier.innerHTML = '<label>0</label>|<label>0</label>';
                            failed = 0;
                            has_failed = false;
                            _this.update();
                        };
                    }
                    notifier.firstChild.innerText = thread;
                    notifier.firstChild.nextElementSibling.innerText = tasks.length;
                    if (failed > 0)
                        notifier.lastChild.innerText = failed;
                    if (thread > 0 || tasks.length > 0 || failed > 0)
                        notifier.classList.add('running');
                    else
                        notifier.classList.remove('running');
                },
            };
        })(),
    };
})();
(function () {
    TMD.init();
    new MutationObserver(function (ms) {
        return ms.forEach(function (m) {
            return m.addedNodes.forEach(function (node) {
                var article = node.tagName == 'DIV' && (node.querySelector('article') || node.closest('article'));
                if (article && !article.dataset.injected)
                    TMD.inject(article);
            });
        });
    }).observe(document.body, { childList: true, subtree: true });
})();
