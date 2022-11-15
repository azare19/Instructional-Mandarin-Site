let user_answers = [0,0,0,0,0,0];

function getUserAnswer( ui, position){
    user_answers[position - 1] = ui.draggable[0].getAttribute("id").split("_")[1];
    console.log(user_answers)
    save_quiz_choice("3",getUserAnswers());
}

function getUserAnswers( ){
    let final_answers = "";
    for( let i = 0; i < user_answers.length - 1; i++){
        final_answers = final_answers + user_answers[i] + ",";
    }
    final_answers = final_answers + user_answers[5];

    return final_answers
}


$(document).ready(function() {
    save_current_page(window.location.pathname);
    check_quiz_from_user_data(function(result) {
        $('#score__').text(result)
    }, function() {

    })

    $('.stroke').draggable( {
        start: function(event,ui){
        }
    })

    $("#quiz-intro-next-btn").click(function() {
        window.location.href = "/quiz/1"
    });

    
    $("#quiz-end-next-btn").click(function() {
        window.location.href = "/quiz/4"
    });


    $('#position1').droppable({
        accept: ".stroke",
        over: function (event, ui) {
        },
        drop: function (event, ui) {
            getUserAnswer(ui, 1);
            ui.draggable.draggable({disabled: true});
        }
    })
    
    $('#position2').droppable({
        accept: ".stroke",
        over: function (event, ui) {
        },
        drop: function (event, ui) {
            getUserAnswer(ui, 2);
            ui.draggable.draggable({disabled: true});
           
        }
    })
    $('#position3').droppable({
        accept: ".stroke",
        over: function (event, ui) {
        },
        drop: function (event, ui) {
            getUserAnswer(ui, 3);
            ui.draggable.draggable({disabled: true});
        }
    })
    $('#position4').droppable({
        accept: ".stroke",
        over: function (event, ui) {
        },
        drop: function (event, ui) {
            getUserAnswer(ui, 4);
            ui.draggable.draggable({disabled: true});
        }
    })
    $('#position5').droppable({
        accept: ".stroke",
        over: function (event, ui) {
        },
        drop: function (event, ui) {
            getUserAnswer(ui, 5);
            ui.draggable.draggable({disabled: true});
        }
    })

    $('#position6').droppable({
        accept: ".stroke",
        over: function (event, ui) {
        },
        drop: function (event, ui) {
            getUserAnswer(ui, 6);
            ui.draggable.draggable({disabled: true});
        }
    })
    
    $("#reset-btn").click(function () {
        user_answers = [0,0,0,0,0,0];
        $(".stroke").animate({
            top: "0px",
            left: "0px"
        });
        $('.stroke').draggable('enable')
    }); 

    $("#quiz-next-btn").click(function() {
        let next_attribute = true;
        for ( let i = 0; i < user_answers.length; i++){
            if (user_answers[i] == 0){
                next_attribute = false;
                break;
            }
        }
        if (next_attribute){
            window.location.href = "/quiz/" + (parseInt($(this).attr("data-current-id")) + 1);
        }
    });
})
