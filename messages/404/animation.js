
//
// ─── ANIMATION ──────────────────────────────────────────────────────────────────
//

    function repeatDangerSignMove ( ) {
        var location = 0;
        var element = document.getElementById('error-text');
        var height =  element.offsetHeight;
        setInterval( function ( ) {
            window.requestAnimationFrame( function ( timestamp ) {
                element.style.backgroundPositionX = ( location ).toString( ) + 'px';
            })
            location = location + 3 % height;
        }, 40 );
    }

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    window.onload = function ( ) {
        repeatDangerSignMove( );
    }

// ────────────────────────────────────────────────────────────────────────────────
