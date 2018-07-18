
'use strict'

//
// ─── PUT ON THE FOOTER ──────────────────────────────────────────────────────────
//

    function inject_karion_time_to_screen ( ) {
        var fetch_time =
            new Date( Date.now( ) ).toLocaleString( )

        fetch( "https://kary.lib.id/karion@dev/" )
            .then( function ( response ) {
                response.text( ).then( function ( karion_time ) {
                    document.getElementById( "karion-time" ).innerText =
                        "\u2723 KARION " + karion_time + "TH"
                    document.getElementById( "kary-footer-copy-right" ).title =
                        "Fetched at " + fetch_time + " from the Kary's secure Time API server. (This service does not collect and/or compile any data on you)"
                })
            })
    }

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    setTimeout( inject_karion_time_to_screen )

// ────────────────────────────────────────────────────────────────────────────────
