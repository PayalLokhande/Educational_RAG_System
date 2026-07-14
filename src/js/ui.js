/*=============================================================

                        PREPMATE
                    USER INTERFACE

    Purpose
    -------
    Controls frontend UI behaviour.

    Features
    --------
    • Hidden Send Button
    • Typing Indicator
    • 2-Second Anti-Spam Lock
    • Enable / Disable Input

=============================================================*/



/*=============================================================

                    DOM ELEMENTS

=============================================================*/

const sendButton =
document.getElementById("sendButton");

const typingIndicator =
document.getElementById("typingIndicator");

const inputBox =
document.getElementById("messageInput");



/*=============================================================

            RULE 10

            HIDE SEND BUTTON
            UNTIL USER TYPES

=============================================================*/

function updateSendButton(){

    if(

        inputBox.value.trim().length > 0

    ){

        sendButton.style.display = "block";

    }

    else{

        sendButton.style.display = "none";

    }

}



/*=============================================================

                INPUT LISTENER

=============================================================*/

inputBox.addEventListener(

    "input",

    updateSendButton

);



/*=============================================================

                SHOW TYPING

=============================================================*/

function showTypingIndicator(){

    typingIndicator.classList.remove(

        "hidden"

    );

}



/*=============================================================

                HIDE TYPING

=============================================================*/

function hideTypingIndicator(){

    typingIndicator.classList.add(

        "hidden"

    );

}

/*=============================================================

                RULE 3

            2-SECOND ANTI-SPAM LOCK

=============================================================*/

function enableInput(){

    inputBox.disabled = false;

    sendButton.disabled = false;

    inputBox.focus();

}



function disableInput(){

    inputBox.disabled = true;

    sendButton.disabled = true;

}



/*=============================================================

                SPAM LOCK

=============================================================*/

function activateSpamLock(){

    disableInput();

    setTimeout(

        function(){

            enableInput();

            updateSendButton();

        },

        CHAT_CONFIG.SPAM_LOCK_TIME

    );

}





/*=============================================================

                SEND BUTTON

=============================================================*/

sendButton.addEventListener(

    "click",

    async function(){

        await PrepMateChat.sendMessage();

        activateSpamLock();

    }

);


/*=============================================================

                INITIAL UI STATE

=============================================================*/

document.addEventListener(

    "DOMContentLoaded",

    function(){

        updateSendButton();

        hideTypingIndicator();

    }

);


/*=============================================================

            UPDATE AI EVALUATION PANEL

=============================================================*/

function updateEvaluationPanel(evaluation){

    if(!evaluation) return;

    const score =
    document.getElementById("overallScore");

    const strength =
    document.getElementById("strengthList");

    const improvement =
    document.getElementById("improvementList");

    const recommendation =
    document.getElementById("recommendation");

    if(score)
        score.textContent =
        evaluation.score || "--";

    if(strength)
        strength.textContent =
        evaluation.strength || "-";

    if(improvement)
        improvement.textContent =
        evaluation.improvement || "-";

    if(recommendation)
        recommendation.textContent =
        evaluation.recommendation || "-";
}


/*=============================================================

                PUBLIC UI METHODS

=============================================================*/

window.PrepMateUI = {

    showTypingIndicator,

    hideTypingIndicator,

    updateSendButton,

    activateSpamLock,

    enableInput,

    disableInput,

    updateEvaluationPanel

};


const PrepMateHistorySystem = {

    historyContainer: null,
    searchBox: null,

    async init() {

        this.historyContainer =
            document.getElementById("historyContainer");

        this.searchBox =
            document.getElementById("historySearch");

        if (!this.historyContainer) return;

        if (this.searchBox) {

            this.searchBox.addEventListener("input", () => {

                this.loadHistory(
                    this.searchBox.value.trim()
                );

            });

        }

        await this.loadHistory();

    },

    async loadHistory(search = "") {

        try {

            let sessions =
                await HistoryAPI.fetchSessions(CURRENT_MODE);

            if (search) {

                sessions = sessions.filter(session =>
                    session.session_id
                        .toLowerCase()
                        .includes(search.toLowerCase())
                );

            }

            this.renderHistory(sessions);

        }

        catch (error) {

            console.error(error);

        }

    },

    renderHistory(sessions) {

        this.historyContainer.innerHTML = "";

        if (!sessions.length) {

            this.historyContainer.innerHTML = `
                <div class="empty-history">
                    <div class="history-icon">📝</div>
                    <h3>No Interview History</h3>
                    <p>Complete your first interview.</p>
                </div>
            `;

            return;

        }

        sessions.forEach(session => {

            const card =
                document.createElement("div");

            card.className = "history-card";

            card.innerHTML = `
                <h3>${session.session_id}</h3>
                <p>${session.timestamp}</p>
            `;

            card.onclick = () =>
                this.loadMessages(session.session_id);

            this.historyContainer.appendChild(card);

        });

    },

    async loadMessages(sessionId) {

        try {

            const chat =
                await HistoryAPI.fetchMessages(
                    sessionId,
                    CURRENT_MODE
                );

            PrepMateChat.clearChat();

            let latestEvaluation = null;

            chat.forEach(turn => {

                if (turn.user_message) {

                    const bubble =
    PrepMateChat.addMessage(
        turn.user_message,
        "user",
        turn.evaluation
    );

if (bubble && turn.evaluation) {

    bubble.onclick = () => {

        PrepMateUI.updateEvaluationPanel(
            turn.evaluation
        );

    };

}

                }

                if (turn.ai_message) {

                    PrepMateChat.addMessage(
                        turn.ai_message,
                        "ai"
                    );

                }

                if (turn.evaluation) {

                    latestEvaluation =
                        turn.evaluation;

                }

            });

            if (latestEvaluation) {

                PrepMateUI.updateEvaluationPanel(
                    latestEvaluation
                );

            }

        }

        catch (error) {

            console.error(error);

        }

    }

};

window.PrepMateHistorySystem =
    PrepMateHistorySystem;

document.addEventListener(

    "DOMContentLoaded",

    () => PrepMateHistorySystem.init()

);


/*=============================================================

                DEBUG

=============================================================*/

if(DEBUG){

    console.log("PrepMate UI Loaded");

}