document.addEventListener('DOMContentLoaded', () => {
  window.initCustomScroll()

  const videosId = Array.from(document.querySelectorAll("[data-video]"));
  let currentVideoSrc = "";
  const modal = $(".ReactModal__Overlay")
  modal.hide()
  const modalClose = modal.find(".modal-close")
  const videoContainer = document.querySelector(".ReactModal__Content")
  let player
  let blockWithVideo

  modal.hide();
  videosId.forEach((item) => {
      item.addEventListener("click", (e) => {
          e.stopPropagation()
          blockWithVideo = createNodeToFrame("div", "modal-video__frame")
          const source = item.dataset.video

          if (!source) return;
          $('.header').fadeOut(300)
          modal.addClass("ReactModal__Overlay--video")
          document.body.style.overflowY = 'hidden'
          document.body.style.margingRight = '17px'
          modal.show(300)

          videoContainer.appendChild(blockWithVideo)

          player = onYoutubePlayer(blockWithVideo, source)
      });
  });

  modalClose.on("click", (e) => {
      e.preventDefault();

      $('.header').fadeIn(300)
      document.body.style.overflowY = 'scroll'
      document.body.style.margingRight = '0px'
      modal.hide();
      blockWithVideo.remove();
      player.stopVideo();
  });

  function createNodeToFrame(node, classses) {
      const elem = document.createElement(node)
      elem.classList.add(classses)

      return elem
  }

  function onYoutubePlayer(whereSelector, videId) {
      let player;
      window.YT.ready(function() {
          player = new YT.Player(whereSelector, {
              height: "390",
              width: "640",
              videoId: videId,
              events: {
                  onReady: onPlayerReady,
              },
          });
      });

      return player;
  }

  function onPlayerReady() {
      player.playVideo();
  }
})


