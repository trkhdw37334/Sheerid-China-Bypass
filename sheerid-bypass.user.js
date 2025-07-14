// ==UserScript==
// @name         Sheerid-China-Bypass Fetch Modify
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  拦截指定 Fetch 请求并修改URL中的country=TW为CN
// @author       ZAMBAR
// @match        https://services.sheerid.com/*
// @grant        none
// ==/UserScript==


(function () {
    'use strict';

    const originalFetch = window.fetch;

    window.fetch = function (input, init) {
        if (typeof input === 'string' && input.includes("orgsearch.sheerid.net/rest/organization/search")) {
            console.log("原始Fetch请求URL:", input);
            input = input.replace("country=TW", "country=VN");
            console.log("修改后的Fetch请求URL:", input);
        } else if (input instanceof Request) {
            const url = input.url;
            if (url.includes("orgsearch.sheerid.net/rest/organization/search")) {
                console.log("Got fetch:", url);
                const newUrl = url.replace("country=TW", "country=CN");
                console.log("Modified to:", newUrl);

                // Clone
                const newRequest = new Request(newUrl, {
                    method: input.method,
                    headers: input.headers,
                    body: input.body,
                    mode: input.mode,
                    credentials: input.credentials,
                    cache: input.cache,
                    redirect: input.redirect,
                    referrer: input.referrer,
                    integrity: input.integrity,
                    keepalive: input.keepalive,
                    signal: input.signal
                });
                return originalFetch.call(this, newRequest, init);
            }
        }
        return originalFetch.call(this, input, init);
    };
})();
