const updateMetadata = () =>
{
    const playbar = document.querySelector("[data-testid=\"playbar\"]");
    const currentPlayingInfo = playbar.querySelector("[data-testid=\"show-info-title\"]");

    const info = currentPlayingInfo.getElementsByTagName("span");
    console.log(info);

    try
    {
        const title = info[0].getElementsByTagName("b")[0].innerText;
        const artist = info[1].innerText;

        console.log(title);
        console.log(artist);

        navigator.mediaSession.metadata = new MediaMetadata({ title: title, artist: artist });
        console.log(navigator.mediaSession.metadata);
    }

    catch (e)
    {
        console.log("ignored TypeError (likely ads)");
        console.log(e);
    }
}

window.addEventListener("load", () =>
{
    console.log("website loaded");

    const playbar = document.querySelector("[data-testid=\"playbar\"]");
    const currentPlayingInfo = playbar.querySelector("[data-testid=\"show-info-title\"]");

    const playbarObserver = new MutationObserver((mutations) =>
    {
        for (const mut of mutations)
        {
            console.log(mut);

            if (mut.target.dataset.testid == "show-info-title")
            {
                console.log("Updating metadata");
                console.log(mut);
                updateMetadata();
            }
        }
    });

    const playerObserver = new MutationObserver((mutations) =>
    {
        for (const mut of mutations)
        {
            mut.addedNodes.forEach((v, i, _) =>
            {
                if (v instanceof HTMLElement)
                {
                    if (v.tagName == "VIDEO")
                    {
                        if (v instanceof HTMLVideoElement)
                        {
                            console.log("Got video element");
                            v.addEventListener("play", () =>
                            {
                                console.log("Updating metadata on play");
                                updateMetadata();
                            });

                            playerObserver.disconnect();
                        }
                    }
                }
            });
        }
    });

    const globalplayer = document.getElementById("globalplayer");

    if (globalplayer)
    {
        console.log("globalplayer exists");
    }

    playbarObserver.observe(currentPlayingInfo, { attributes: true, childList: true });
    playerObserver.observe(globalplayer, { childList: true, subtree: true });
});