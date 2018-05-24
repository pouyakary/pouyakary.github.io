
'use strict'

//
// ─── GLOBAL COUNTERS ────────────────────────────────────────────────────────────
//

    var catchLocation = 0

//
// ─── HIDE SHOW PAGE TITLE ───────────────────────────────────────────────────────
//

    function hideShowTitle ( distance ) {
        var titleDisplay =
            document.getElementById('kf-topic-page-header-title')
        if ( distance > 180 )
            titleDisplay.className =
                'kf-topic-page-header-title-visible';
        else
            titleDisplay.className =
                'kf-topic-page-header-title-hidden'
    }

//
// ─── TABLE OF CONTENTS CORE ─────────────────────────────────────────────────────
//

    function TableOfContents ( ) {
        // defs
        var container =
            document.getElementById( 'kf-topic-article-container' )
        var output =
            document.getElementById( 'kf-topic-toc' )
        var tableOfContents =
            ''

        // finding headers
        var headers =
            container.querySelectorAll( 'h1, h2, h3, h4, h5, h6' )

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
                'kf-sidebar-' + heading.nodeName
            reference.setAttribute( 'target-id', heading.id )

            reference.onclick = function ( ev ) {
                scroll( ev.target.getAttribute('target-id') )
            }

            // done
            output.appendChild( reference )
        }
    }

//
// ─── SCROLL TO FUNCTION ─────────────────────────────────────────────────────────
//

    function scroll ( element ) {
        window.scrollTo( 0, document.getElementById( element ).offsetTop - 100 )
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
            document.getElementById( 'kf-topic-page-sidebar' )

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
// ─── EVENTS ─────────────────────────────────────────────────────────────────────
//

    document.addEventListener( 'DOMContentLoaded', TableOfContents )
    document.addEventListener( 'scroll', updateTableOfContentsInLocation )

// ────────────────────────────────────────────────────────────────────────────────