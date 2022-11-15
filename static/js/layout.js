$(document).ready(function() {

    // set active state for active menu bar item
    let active = window.location.pathname

    if (active.indexOf("/learn") > -1) {
        clearActive()
        $("#learn").addClass('active');
    } 
    else if (active.indexOf("/quiz") > -1) {
        clearActive()
        $("#quiz").addClass('active');
    }
    else if (active.indexOf("/") > -1) {
        clearActive()
        $("#home").addClass('active');
    }
})

// clear active states for all menu bar items
function clearActive() {
    $(".mr-auto .nav-item").each(function() {
        $(this).removeClass("active");
    });
}


