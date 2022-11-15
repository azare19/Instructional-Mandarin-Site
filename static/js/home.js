$(document).ready(function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // redirect old user to previous saved page
    if (urlParams.get('redirect') != "false") {
        redirect_if_not_new_user(function() {
            // save the current page that the user is on
            save_current_page(null)

            // direct user to learn intro page
            $("#home-start-btn").click(function() {
                window.location.href = "/learn/1";
            });
        });
        return;
    }
    
    // save the current page that the user is on    
    save_current_page(null)

    // direct user to learn intro page
    $("#home-start-btn").click(function() {
        window.location.href = "/learn/1";
    });
})