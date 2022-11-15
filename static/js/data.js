
function save_current_page(current_page) {
    save_user_data({"current_page": current_page}, function (r) {
        console.log("Save current page okay.", r, current_page);
    })
}

function save_quiz_choice(id, quiz_choice) {
    let field = "quiz_choice_" + id
    let user_data = {}
    user_data[field] = quiz_choice
    save_user_data(user_data, function (r) {
        console.log("Save quiz choices okay.", r);
    })
}

function check_quiz_from_user_data(on_success, on_fail) {
    get_user_data(function (result) {
        console.log(result);
        let quiz_choices = [];
        for (let i = 1; i <= 3; i++) {
            let field = "quiz_choice_" + i;
            if (!result["user_data"]) {
                on_fail();
                return;
            }
            if (!(result["user_data"][field])) {
                console.log("no quiz choice for", i);
                on_fail();
                return;
            }
            quiz_choices.push((result["user_data"][field]));
        }
        check_answers(quiz_choices, function (result) {
            console.log("check quiz choices", result);
            on_success(result);
        });
    })
}

function redirect_if_not_new_user(on_not_redirect) {
    get_user_data(function (result) {
        if (!result["user_data"]) {
            on_not_redirect();
            return;
        }
        if (result["user_data"]["current_page"]) {
            console.log("Redirecting to ", result["user_data"]["current_page"]);
            window.location.href = result["user_data"]["current_page"];

        } else {
            on_not_redirect();
        }
    });
}

function check_answers(quiz_choices, on_success) {
    $.ajax({
        type: "POST",
        url: "/check_answers",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify({"quiz_choices": quiz_choices}),
        success: function(result){
            on_success(result);
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request);
            console.log(status);
            console.log(error);
    }});
}

function save_user_data(user_data, on_success) {
    $.ajax({
        type: "POST",
        url: "/save_user_data",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify({"user_data": user_data}),
        success: function(result){
            on_success(result);
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request);
            console.log(status);
            console.log(error);
    }});
}


function get_user_data(on_success) {
    $.ajax({
        type: "GET",
        url: "/get_user_data",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify({}),
        cache: false,
        success: function(result){
            on_success(result);
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request);
            console.log(status);
            console.log(error);
    }});
}
