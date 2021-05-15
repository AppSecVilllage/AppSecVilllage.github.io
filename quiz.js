let questions = [
    [
        'Which of the following code snippets prevents a Buffer Overflow vulnerability?',
        [
            [
                `String updateServer = request.getParameter("updateServer");\n  if(updateServer.indexOf(";")==-1 && updateServer.indexOf("&")==-1) {\n    String [] commandArgs = {\n      Util.isWindows() ? "cmd" : "/bin/sh",\n      "-c", "ping", updateServer\n    }\n    Process p = Runtime.getRuntime().exec(commandArgs);\n}`,
                'ASV{invalid1}'
            ],
            [
                `String updateServer = request.getParameter("updateServer");\n  if(updateServer.indexOf(";")==-1 && updateServer.indexOf("&")==-1) {\n    String [] commandArgs = {\n      Util.isWindows() ? "cmd" : "/bin/sh",\n      "-c", "ping", updateServer\n    }\n    Process p = Runtime.getRuntime().exec(commandArgs);\n}`,
                'ASV{correct1}'
            ]
        ]
    ]
]

Object.defineProperty(Array.prototype, 'shuffle', { value: function() { for (let i = this.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [this[i], this[j]] = [this[j], this[i]]; } return this; } });

function handle_answer(idx, flag) {
    if($(`#flag-${idx}`).length) { return; }

    $(`#question-block-${idx}-flag`).append(`<div id="flag-${idx}" class="alert alert-primary"><strong>Your flag: </strong><span class="AlertMsg">${flag}</span></div>`)
}

function build_question_block(index, question) {
    return `
<div class="question-block" id="question-block-${index}">
    <p class="w-75 fw-bold">Q${index + 1}: ${question[0]}</p>
    <div class="row">
        <div class="col-sm-6">
            <a class="block-link" onclick="handle_answer(${index}, '${question[1][0][1]}');">
                <div>
                    <pre>
                        <code class="javascript">${question[1][0][0]}</code>
                    </pre>
                </div>
            </a>
        </div>
        <div class="col-sm-6">
            <a class="block-link" onclick="handle_answer(${index}, '${question[1][1][1]}');">
                <div>
                    <pre>
                        <code class="javascript">${question[1][1][0]}</code>
                    </pre>
                </div>
            </a>
        </div>
        <div id="question-block-${index}-flag"></div>
    </div>
    <hr>
</div>
`;
}

function load_questions() { questions.forEach(function(question, idx) { question[1].shuffle(); $('#questions').append(build_question_block(idx, question)); }); hljs.highlightAll(); }

$(document).ready(function() { load_questions(); });
