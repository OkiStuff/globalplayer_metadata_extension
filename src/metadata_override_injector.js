// Injector for metadata_override_extension.js

document.addEventListener("DOMContentLoaded", () =>
{
    const comment = document.createComment(" Injected by GlobalPlayer.com Metadata Extension ");
    const scriptElement = document.createElement("script");

    scriptElement.src = chrome.runtime.getURL("src/metadata_override_extension.js");

    document.documentElement.append(comment, scriptElement);
});