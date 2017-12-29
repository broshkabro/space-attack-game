(function(){
    const CONFIG = {
        screenshotsOpen: document.getElementById("screenshots"),
        galleryOpen: document.getElementById("modal-screenshots"),
        mainShotOpen: document.querySelector(".main-slide"),
        shootShotOpen: document.querySelector(".shoot-slide"),
        aliensShotOpen: document.querySelector(".aliens-slide"),
        closeBtn: document.querySelector(".close-btn"),
        imgPrev: document.querySelector(".img-prev"),
    };

    CONFIG.screenshotsOpen.addEventListener("click", showGallery);

    function showGallery(event) {
        let currentTarget = event.target;
        CONFIG.galleryOpen.style.display="flex";

        showChosenScreenshot(currentTarget)
    }

    function showChosenScreenshot(currentTarget) {
        switch(true) {
            case currentTarget.classList.contains("main-screen"):
                CONFIG.mainShotOpen.classList.remove("visually-hidden");
                break;
            case currentTarget.classList.contains("shooting-screen"):
                CONFIG.shootShotOpen.classList.remove("visually-hidden");
                break;
            case currentTarget.classList.contains("aliens-screen"):
                CONFIG.aliensShotOpen.classList.remove("visually-hidden");
                break;
            default:
                CONFIG.shootShotOpen.classList.remove("visually-hidden");
                break;
        }
    }

    CONFIG.imgPrev.addEventListener("click", showImg);

    function showImg(event) {
        let currentTarget = event.target;

        switch(true) {
            case currentTarget.classList.contains("main-demo"):
                hideImg();
                CONFIG.mainShotOpen.classList.remove("visually-hidden");
                break;
            case currentTarget.classList.contains("shoot-demo"):
                hideImg();
                CONFIG.shootShotOpen.classList.remove("visually-hidden");
                break;
            case currentTarget.classList.contains("aliens-demo"):
                hideImg();
                CONFIG.aliensShotOpen.classList.remove("visually-hidden");
                break;
        }
    }

    function hideImg() {
        CONFIG.mainShotOpen.classList.toggle("visually-hidden",true);
        CONFIG.shootShotOpen.classList.toggle("visually-hidden", true);
        CONFIG.aliensShotOpen.classList.toggle("visually-hidden", true);
    }

    CONFIG.closeBtn.addEventListener("click", function(){
        CONFIG.galleryOpen.removeAttribute("style");
        hideImg();
    })
})();



