document.addEventListener('DOMContentLoaded', () => {
    window.initCustomScroll()

    window.createScrollTrigger({
        trigger: '.parking',
        start: () => '-=350',
        end: () => ($(window).width() >= 480 ? '+=400' : `+=${document.documentElement.clientHeight}`),
    }, window.animateBg('.parking'))
})