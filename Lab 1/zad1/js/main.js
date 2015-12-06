/**
 * Created by Damian on 2015-11-30.
 */

window.onload = function () {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var grd = ctx.createLinearGradient(0,0,200,0);

    grd.addColorStop(0,"#FFFFFF");
    grd.addColorStop(0.4,"#99FF33");
    grd.addColorStop(1,"#000000");

    ctx.beginPath();
    ctx.arc(84, 84, 60, 0, 2 * Math.PI);
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.stroke();

    if (navigator.userAgent.match(/OS X.*Safari/) || navigator.userAgent.match(/Firefox/)) {
        document.body.className += 'safariFirefox';
    }
}