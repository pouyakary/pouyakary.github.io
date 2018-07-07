
'use strict'

//
// ─── COMPUTE KARION ─────────────────────────────────────────────────────────────
//

    function compute_karion ( ) {
        var karionsInception =
            new Date('01/08/1996')
        var now =
            Date.now( )
        var msPerDay =
            24 * 60 * 60 * 1000
        var karionDays =
            Math.floor( ( now - karionsInception ) / msPerDay )

        return karionDays
    }

//
// ─── PUT ON THE FOOTER ──────────────────────────────────────────────────────────
//

    function inject_karion_time_to_screen ( ) {
        document.getElementById("karion-time").innerText =
            compute_karion( ).toString( )
    }

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    setTimeout( inject_karion_time_to_screen )

// ────────────────────────────────────────────────────────────────────────────────
