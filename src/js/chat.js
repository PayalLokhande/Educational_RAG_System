/*=============================================================

                        PREPMATE
                    CHAT CONTROLLER

    Purpose
    -------
    Handles chat messages between the user
    and the FastAPI backend.

=============================================================*/



/*=============================================================

                    DOM ELEMENTS

=============================================================*/

const chatContainer =
document.getElementById("chatMessages");

const messageInput =
document.getElementById("messageInput");



/*=============================================================

                ADD MESSAGE BUBBLE

=============================================================*/

function addMessage(message, sender, evaluation = null) {

    const messageRow =
        document.createElement("div");

    messageRow.className =
        sender === "user"
            ? "message user-message"
            : "message";

    const avatar =
        document.createElement("div");

    avatar.className = "avatar";

    avatar.textContent =
        sender === "user"
            ? "You"
            : "AI";

    const messageBox =
        document.createElement("div");

    messageBox.className =
        "message-content";

    const title =
        document.createElement("h4");

    title.textContent =
        sender === "user"
            ? "You"
            : "PrepMate AI";

    const text =
        document.createElement("p");

    text.textContent = message;

    messageBox.appendChild(title);
    messageBox.appendChild(text);

    if (sender === "user") {

    messageRow.appendChild(messageBox);
    messageRow.appendChild(avatar);


}
else {

    messageRow.appendChild(avatar);
    messageRow.appendChild(messageBox);

}

    chatContainer.appendChild(messageRow);

    if (UI_CONFIG.AUTO_SCROLL) {

        chatContainer.scrollTop =
            chatContainer.scrollHeight;

    }

    return messageRow;
}
/*=============================================================

                SEND MESSAGE TO AI

=============================================================*/

async function sendMessage() {

    const message = messageInput.value.trim();

    if (message === "") {

        return;

    }

    try {

        /*-----------------------------------------
            Show User Message
        -----------------------------------------*/

        const userBubble = addMessage(message, "user");



        /*-----------------------------------------
            Clear Input
        -----------------------------------------*/

        messageInput.value = "";
        messageInput.dispatchEvent(new Event("input"));



        /*-----------------------------------------
            Show Typing Indicator
        -----------------------------------------*/

        if (window.PrepMateUI) {
          PrepMateUI.showTypingIndicator();
       }



        let response;



        /*-----------------------------------------
            Technical Mode
        -----------------------------------------*/

        if (CURRENT_MODE === APP_MODE.TECHNICAL) {

            response = await PrepMateAPI.sendTechnicalMessage(message);
            console.log(response);

        }

        /*-----------------------------------------
            Viva Mode
        -----------------------------------------*/

        else {

            response = await PrepMateAPI.sendVivaMessage(message);
            console.log(response);

        }



        /*-----------------------------------------
            Hide Typing Indicator
        -----------------------------------------*/

        if (window.PrepMateUI) {
         PrepMateUI.hideTypingIndicator();
       }

        // Attach evaluation to the user bubble
// Attach evaluation to this specific user message
if (userBubble && response.evaluation) {

    userBubble.style.cursor = "pointer";

    userBubble.addEventListener("click", function () {

        PrepMateUI.updateEvaluationPanel(response.evaluation);

    });

}

        /*-----------------------------------------
            Display AI Response
        -----------------------------------------*/

        addMessage(response.ai_response, "ai");


        if (window.PrepMateUI && response.evaluation) {

    PrepMateUI.updateEvaluationPanel({

        score: response.evaluation.score,

        strength: response.evaluation.strength,

        improvement: response.evaluation.improvement,

        recommendation: response.evaluation.recommendation

    });

}

    }

    catch (error) {

    console.error("FULL ERROR:", error);

    alert(error);

    if (typeof hideTypingIndicator === "function") {
        hideTypingIndicator();
    }

    addMessage(
        "Unable to connect to the PrepMate server. Please try again.",
        "ai"
    );

}

}

/*=============================================================

                ENTER KEY SUPPORT

    Press Enter to send.
    Shift + Enter creates a new line.

=============================================================*/

messageInput.addEventListener(

    "keydown",

    function (event) {

        if (

            event.key === "Enter" &&

            !event.shiftKey

        ) {

            event.preventDefault();

            sendMessage();

        }

    }

);

function updateEvaluationPanel(evaluation) {

    if (!evaluation) return;

    // Overall Score
    document.getElementById("overallScore").textContent =
        evaluation.score || "--";

    // Strength
    const strengthList =
        document.getElementById("strengthList");

    strengthList.innerHTML =
        `<li>${evaluation.strength || "No feedback yet."}</li>`;

    // Improvement
    const improvementList =
        document.getElementById("improvementList");

    improvementList.innerHTML =
        `<li>${evaluation.improvement || "No suggestions yet."}</li>`;

    // Recommendation
    document.getElementById("recommendation").textContent =
        evaluation.recommendation ||
        "Complete your interview to receive personalized recommendations.";
}

/*=============================================================

                PUBLIC CHAT METHODS

    Makes chat functions accessible
    to other JavaScript files.

=============================================================*/

window.PrepMateChat = {

    clearChat() {

    const messages =
        document.getElementById("chatMessages");

    if (messages) {

        messages.innerHTML = "";

    }

},

    sendMessage,

    addMessage

};


const originalAddMessage = addMessage;

addMessage = function (message, sender, evaluation = null) {

    const bubble = originalAddMessage(
        message,
        sender,
        evaluation
    );

    if (
        sender === "ai" &&
        window.PrepMateHistorySystem &&
        typeof window.PrepMateHistorySystem.loadHistory === "function"
    ) {
        setTimeout(() => {
            window.PrepMateHistorySystem.loadHistory();
        }, 300);
    }

    return bubble;

};


/*=============================================================

                DEBUG

=============================================================*/

if (DEBUG) {

    console.log("PrepMate Chat Controller Loaded");

}