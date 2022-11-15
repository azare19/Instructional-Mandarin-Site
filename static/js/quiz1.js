$(document).ready(function() {
    save_current_page(window.location.pathname);
    check_quiz_from_user_data(function(result) {
        $('#score__').text(result["correct_cnt"])
        for (const element of result["wrong_id"]){
            let tag = '#result_' + element
            $(tag).text("Wrong")
        }
    }, function() {

    })
    
    $(".quiz-buttons").on('click', function(){
        $(".quiz-buttons").removeClass("selected");

        if (this.id != "quiz-next-btn") {
            $(this).addClass("selected");
        }
    });

    $("#quiz-intro-next-btn").click(function() {
        window.location.href = "/quiz/1"
    });

    
    $("#quiz-end-next-btn").click(function() {
        window.location.href = "/quiz/4"
    });

    $("#answer1").click(function() {
        save_quiz_choice($(this).attr("data-current-id"), "0")
        $("#quiz-next-btn").click(function() {
            window.location.href = "/quiz/" + (parseInt($(this).attr("data-current-id")) + 1)
        });
    
    });

    $("#answer2").click(function() {
        save_quiz_choice($(this).attr("data-current-id"), "1")
        $("#quiz-next-btn").click(function() {
            window.location.href = "/quiz/" + (parseInt($(this).attr("data-current-id")) + 1)
        });
    
    });

    $("#answer3").click(function() {
        save_quiz_choice($(this).attr("data-current-id"), "2")
        $("#quiz-next-btn").click(function() {
            window.location.href = "/quiz/" + (parseInt($(this).attr("data-current-id")) + 1)
        });
    
    });

    $("#answer4").click(function() {
        save_quiz_choice($(this).attr("data-current-id"), "3")
        $("#quiz-next-btn").click(function() {
            window.location.href = "/quiz/" + (parseInt($(this).attr("data-current-id")) + 1)
        });
    });

    $("#quiz-end-home-btn").click(function() {
        window.location.href = "/?redirect=false"
    });

    $("#quiz-end-quiz-btn").click(function() {
        window.location.href = "/quiz/1"
    });
})
