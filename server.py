import datetime
import json

from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import threading

sema = threading.Semaphore()

app = Flask(__name__)

app.secret_key = "123456"
saved_user_data = {}

tutorial_data = {
    1: {"img": "learn_img.png", "title": "Eight Principles of Yong", "practice": False,
        "text":
            r"""All eight categories of Chinese strokes can be shown in the character 'Yong.' These categories will be used along with the six general rules in our stroke order tutorials.

You can click “Next” to start the tutorials or skip to a specific tutorial by clicking the submenu under “Learn” in the menu bar."""},
    2: {"img": "rule1.gif", "title": "", "practice": True, "rule_name": "Top to bottom",
        "text": r""""""},
    3: {"img": "rule2.gif", "title": "", "practice": True, "rule_name": "Left to right",
        "text": r""""""},
    4: {"img": "rule3.gif", "title": "", "practice": True, "rule_name": "First horizontal,<br>then vertical",
        "text": r""""""},
    5: {"img": "rule4.gif", "title": "", "practice": True, "rule_name": "First right-to-left diagonals,<br>then left-to-right diagonals",
        "text": r""""""},
    6: {"img": "rule5.gif", "title": "", "practice": True, "rule_name": "Center comes first in vertically<br>symmetrical characters",
        "text": r""""""},
    7: {"img": "rule6.gif", "title": "", "practice": True, "rule_name": "Move from outside to inside<br>and close frames last",
        "text": r""""""},
}

# index starts from 0, do not change this part... you can add additional fields if you want
quiz_data = {
    0: {"correct_answer": 1, "text": "Please select the correct stroke order for the character above.",
        "answers": ["2, 1, 4, 3", "4, 1, 3, 2", "3, 4, 1, 2", "4, 3, 1, 2"], "img": "quiz_question_1.png", "id": 1},
    1: {"correct_answer": 2, "text": "Please select the correct stroke order for the character above.",
        "answers": ["2, 3, 5, 1, 4", "4, 3, 5, 1, 2", "4, 1, 3, 2, 5", "1, 2, 5, 4, 3"], "img": "quiz_question_2.png", "id": 2},
    2: {"correct_answer": "6,4,2,1,3,5", "text": "Drag the strokes into the correct order for the character above.", "id": 3,
        "answers": [], "img": "quiz_question_3.png",
        "stroke_image_1":"quiz_question_3_stroke_1.png", "stroke_image_2":"quiz_question_3_stroke_2.png",
        "stroke_image_3":"quiz_question_3_stroke_3.png", "stroke_image_4":"quiz_question_3_stroke_4.png",
        "stroke_image_5":"quiz_question_3_stroke_5.png", "stroke_image_6":"quiz_question_3_stroke_6.png"},
}


# ROUTES
@app.route('/')
def home():
    return render_template('home.html')


@app.route('/learn/1')
def learnIntro():
    return render_template('learn_intro.html')


@app.route('/learn/<learn_id>')
def learnLesson(learn_id=None):
    return render_template('learn_lesson.html', data=tutorial_data[int(learn_id)], id=learn_id, rule_id=int(learn_id)-1)


@app.route('/learn/8')
def learnEnd():
    return render_template('learn_end.html')

@app.route('/quiz')
def quizIntro():
    return render_template('quiz_question_type1.html', data=quiz_data[int(0)], id=1)


@app.route('/quiz/<quiz_id>')
def quiz(quiz_id=None):
    return render_template('quiz_question_type1.html', data=quiz_data[int(quiz_id)-1], id=quiz_id)

@app.route('/quiz/3')
def quiz_drag():
    return render_template('quiz_question_type2.html', data=quiz_data[2])

@app.route('/quiz/4')
def quizEnd():
    return render_template('quiz_end.html')

# AJAX routes

@app.route("/check_answers", methods=['POST'])
def check_answers():
    quiz_choices = request.json["quiz_choices"]
    correct_cnt = 0
    wrong_id = []
    for i in range(0, 2):
        if quiz_data[i]["correct_answer"] == int(quiz_choices[i]):
            correct_cnt += 1
        else:
            wrong_id.append(i)
    for i in range(2, 3):
        if quiz_data[i]["correct_answer"] == quiz_choices[i]:
            correct_cnt += 1
        else:
            wrong_id.append(i)

    return json.dumps({"err": "ok", "correct_cnt": correct_cnt, "wrong_id": wrong_id})


@app.route("/save_user_data", methods=['POST'])
def save_user_data():
    sema.acquire()
    user_data = request.json["user_data"]
    for k, v in user_data.items():
        saved_user_data[k] = v
        print(k,v)
    result = json.dumps({"err": "ok", "user_data": saved_user_data})
    print("save", result)
    sema.release()
    return result


@app.route("/get_user_data", methods=['GET'])
def get_user_data():
    sema.acquire()
    result = json.dumps({"err": "ok", "user_data": saved_user_data})
    print("get", result)
    sema.release()
    return result


if __name__ == '__main__':
    app.run(debug=True)
