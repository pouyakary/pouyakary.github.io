
'use strict'

//
// ─── GLOBALS ────────────────────────────────────────────────────────────────────
//

    var catchLocation = 0
    var tocElement = null
    var upperShadowElement = null
    var bottomShadowElement = null
    var sidebarTitleElement = null

//
// ─── ON LOAD STUFF ──────────────────────────────────────────────────────────────
//

    TableOfContents( )
    initElementsOnload( )
    initWindowEventsOnLoad( )
    updateTableOfContentsInLocation( )
    reEvaluateSidebarOverflowShadows( )

    setTimeout( reEvaluateSidebarOverflowShadows )


//
// ─── INIT ELEMENTS ON LOAD ──────────────────────────────────────────────────────
//

    function initElementsOnload ( ) {
        tocElement =
            document.getElementById("kary-topic-toc")
        upperShadowElement =
            document.getElementById("kary-topic-toc-upper-shadow")
        bottomShadowElement =
            document.getElementById("kary-topic-toc-bottom-shadow")
        sidebarTitleElement =
            document.getElementById("kary-sidebar-title")
    }

//
// ─── INIT WINDOW EVENTS ─────────────────────────────────────────────────────────
//

    function initWindowEventsOnLoad ( ) {
        document.addEventListener(
            'scroll', updateTableOfContentsInLocation )
        window.onresize =
            reEvaluateSidebarOverflowShadows
        tocElement.onscroll =
            reEvaluateSidebarOverflowShadows
        tocElement.onresize =
            reEvaluateSidebarOverflowShadows
        var sidebarElement =
            document.getElementById( 'kary-topic-page-sidebar' )
        sidebarElement.addEventListener(
            "onresize", reEvaluateSidebarOverflowShadows )
    }

//
// ─── HIDE SHOW PAGE TITLE ───────────────────────────────────────────────────────
//

    function hideShowTitle ( distance ) {
        var titleDisplay =
            document.getElementById('kary-topic-page-header-title')
        if ( distance > 180 )
            titleDisplay.className =
                'kary-topic-page-header-title-visible';
        else
            titleDisplay.className =
                'kary-topic-page-header-title-hidden'
    }

//
// ─── TABLE OF CONTENTS CORE ─────────────────────────────────────────────────────
//

    function TableOfContents ( ) {
        // defs
        var container =
            document.getElementById( 'kary-topic-article-container' )
        var output =
            document.getElementById( 'kary-topic-toc' )

        // finding headers
        var headers =
            container.querySelectorAll( 'h1, h2' )

        if ( headers.length === 0 ) {
            document.getElementById("kary-topic-page-sidebar").remove( )
            return
        }

        // adding headers
        for ( var index = 0; index < headers.length; index++ ) {
            var heading =
                headers[ index ]

            // making the reference
            var reference =
                document.createElement( 'div' )
            var headingStartingSymbol = ""
                // (( heading.nodeName === 'H2' )? '\u2192 ': '')

            reference.innerText =
                headingStartingSymbol + heading.innerText
            reference.className =
                'kary-sidebar-' + heading.nodeName
            reference.setAttribute( 'target-id', heading.id )

            reference.onclick = function ( ev ) {
                scrollToElementId( ev.target.getAttribute('target-id') )
            }

            // done
            output.appendChild( reference )
        }
    }

//
// ─── SCROLL TO FUNCTION ─────────────────────────────────────────────────────────
//

    function scrollToElementId ( element ) {
        window.scroll({
            top:        document.getElementById( element ).offsetTop - 100,
            left:       0,
            behavior:   'smooth'
        })
    }

//
// ─── GET SCROLL POSITION ────────────────────────────────────────────────────────
//

    function getScrollPosition ( ) {
        return ( window.pageYOffset || document.documentElement.scrollTop )
             - ( document.documentElement.clientTop || 0 )
    }

//
// ─── MAKING TABLE OF CONTENTS BE ON TOP OF PAGE ─────────────────────────────────
//

    function updateTableOfContentsInLocation ( ) {
        // basic info
        var distanceY =
            getScrollPosition( )
        var toc =
            document.getElementById( 'kary-topic-page-sidebar' )

        // constants
        var fadingLength =
            300

        // sizing tools
        var windowHeight =
            document.documentElement.scrollHeight
        var tocHeight =
            toc.scrollHeight
        var footerHeight =
            document.getElementById('footer').scrollHeight
        var spaceHeight =
            windowHeight - tocHeight - footerHeight - 250

        // logic
        if ( distanceY > spaceHeight - fadingLength ) {
            // bottom
            if ( distanceY > spaceHeight ) {
                // hide
                if ( catchLocation === 0 ) {
                    toc.style.opacity = '0'
                    catchLocation = distanceY
                }
            } else {
                // apply fading effect
                toc.style.opacity =
                    ( ( spaceHeight - distanceY ) / fadingLength ).toString( )
            }
        } else if ( distanceY > 130 ) {
            hideShowTitle( distanceY )
            // Middle
            if ( distanceY < catchLocation + tocHeight || catchLocation === 0 ) {
                toc.className = 'toc-on-middle'
                toc.style.opacity = '1.0'
                catchLocation = 0
            }
        } else {
            // Top
            toc.className = 'toc-on-top'
            hideShowTitle( distanceY )
        }
    }

//
// ─── SCROLL TO TOP ──────────────────────────────────────────────────────────────
//

    function topicPageScrollToTop ( ) {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }

//
// ─── SCROLL SHADOW ENABLERS ─────────────────────────────────────────────────────
//

    function showOrHideElement ( element, condition ) {
        element.classList[ condition? "remove" : "add" ]( "show" )
    }

    function reEvaluateSidebarOverflowShadows ( ) {
        showOrHideElement( upperShadowElement, true )
        showOrHideElement( bottomShadowElement, true )

        if ( tocElement.scrollHeight === tocElement.clientHeight ) {
            // In case of no overflow
            showOrHideElement( bottomShadowElement, true )
            showOrHideElement( upperShadowElement, true )

        } else {
            // Checking overflow on top
            var conditionOfShowingTopShadow =
                tocElement.scrollTop < 10
            showOrHideElement( upperShadowElement, conditionOfShowingTopShadow )
            showOrHideElement( sidebarTitleElement, conditionOfShowingTopShadow )

            // Checking overflow on bottom
            showOrHideElement( bottomShadowElement,
                ( ( tocElement.clientHeight + tocElement.scrollTop ) >
                  ( tocElement.scrollHeight - 30 ) ) )
        }
    }

// ────────────────────────────────────────────────────────────────────────────────