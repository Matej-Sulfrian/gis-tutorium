let header
let headerHeight
let wHeight

window.addEventListener('load', () => {
    console.log('load')
    sizeHeaderAndTop()
    setAnchorListeners()
})

window.addEventListener('resize', () => {
    console.log('########### resize ############')
    sizeHeaderAndTop()
})

function sizeHeaderAndTop() {
    
    let wWidth = $(window).innerWidth()

    header = $('header')
    headerHeight = $(header).outerHeight()
    $('.topHead').css('margin-top', headerHeight + 'px')
    console.log('header height: ', headerHeight)

    wHeight = $(window).innerHeight()
    console.log('window height: ', wHeight)
    let topHeight = (wHeight - headerHeight)

    topHeight = topHeight - (topHeight / 4)
    console.log('top height: ', topHeight)
    let topContentHeight = 384
    console.log('top content height: ', topContentHeight)
    let topContentPadding = topHeight - topContentHeight - (headerHeight * 1.1)
    if (topContentPadding < 80) {
        topContentPadding = 80
    }
    if (wWidth <= 770) {
        topContentPadding = 40
    }
    if (wWidth <= 486) {
        topContentPadding = 20
    }
    console.log('top content padding: ', Math.abs(topContentPadding))
    $('.topContent').css('padding-bottom', (Math.abs(topContentPadding) * 2) + 'px')


    
    let wFloatText = document.querySelector('.floatText').scrollWidth
    document.documentElement.style.setProperty('--end-width', '-' + percentage((wFloatText - wWidth + 100), wWidth) + '%')
    console.log(getComputedStyle(document.documentElement).getPropertyValue('--end-width'))



    let allPInRow3 = document.querySelectorAll('.row3 .bottom p')
    let row3 = document.querySelector('.row3')
    let description = document.querySelector(".row3 .bottom .left p")
    for (let p of allPInRow3) {
        p.addEventListener('mouseover', function(e) {
            let color = e.target.getAttribute('data')
            let text = e.target.innerHTML
            console.log(text)
            console.log(color)
            if (color) {
                row3.classList.remove(row3.classList[1])
                row3.classList.add(color)
                description.innerHTML = text
                description.classList.remove(description.classList[0])
                description.classList.add(color)
            }
        })
    }
}

function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
 } 

let lastScrollTop = 0
$(document).scroll(() => {

    let offset = $('header').offset().top
    if (offset >= 5) {
        $(header).addClass('shadow')
    } else {
        $(header).removeClass('shadow')
    }
    if (offset >= headerHeight) {
        console.log('scroll')
        $(header).addClass('hide')
    }

    let st = $(this).scrollTop();
    if (st < lastScrollTop) {
        // downscroll code
        $(header).removeClass('hide')
    }
    lastScrollTop = st;

    let stripeBox = document.querySelector('.row2 .stripe-box')
    if (elementInViewport2(stripeBox) && stripeBox.classList.contains('hide')) {
        setTimeout(() => {
            stripeBox.classList.remove('hide')
        }, 150)
    } else if (!elementInViewport2(stripeBox) && !stripeBox.classList.contains('hide')) {
        stripeBox.classList.add('hide')
    }

    let floatText = document.querySelector('.triggerWrap')
    if (elementInViewport2(floatText) && floatText.classList.contains('hide')) {
        setTimeout(() => {
            floatText.classList.remove('hide')
        }, 150)
    } else if (!elementInViewport2(floatText) && !floatText.classList.contains('hide')) {
        floatText.classList.add('hide')
    }
})

function elementInViewport2(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return (
        top < (window.pageYOffset + window.innerHeight) &&
        left < (window.pageXOffset + window.innerWidth) &&
        (top + height) > window.pageYOffset &&
        (left + width) > window.pageXOffset
    );
}

function setAnchorListeners() {
    document.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", function (e) {
            let target= a.getAttribute('action')
            let screenWidth = window.innerWidth
            console.log(target)
            if (target) {
                if (target == ".row2 .bottom" && screenWidth <= 485) {
                    target = ".row2"
                }
                document.querySelector(target).scrollIntoView({behavior: "smooth", block: "start"})
            }
        })
    })
}