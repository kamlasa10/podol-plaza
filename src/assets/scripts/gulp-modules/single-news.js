document.addEventListener('DOMContentLoaded', () => {
    window.init

    if($(window).width() >= 1025) {
        const btnBack = $('.news-single__btn-block')
        const endContentArticle = $('.news-single__content')[0].getBoundingClientRect()

        window.addEventListener('scroll', e => {
            let scrollY = window.scrollY

            if(scrollY >= endContentArticle.height - 50) {
                btnBack.fadeOut(200)
            } else {
                btnBack.fadeIn(200)
            }
        })
    }
})