/*=============================================================

                        PREPMATE
                    API COMMUNICATION

    Purpose
    -------
    Handles all communication between the frontend
    and the FastAPI backend.

    This file DOES NOT manipulate the UI.
    It ONLY sends and receives data.

=============================================================*/



/*=============================================================

                API REQUEST HELPER

    Sends HTTP requests to FastAPI.

=============================================================*/

async function apiRequest(endpoint, options = {}) {

    try {

        const response = await fetch(
            API_CONFIG.BASE_URL + endpoint,
            options
        );

        if (!response.ok) {

            throw new Error(
                `HTTP Error : ${response.status}`
            );

        }

        return await response.json();

    }

    catch (error) {

        console.error(
            "API Request Failed :",
            error
        );

        throw error;

    }

}



/*=============================================================

            TECHNICAL CHAT REQUEST

=============================================================*/

async function sendTechnicalMessage(message) {

    return await apiRequest(

        API_ENDPOINTS.TECHNICAL_CHAT,

        {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                session_id: CHAT_CONFIG.SESSION_ID,

                message: message

            })

        }

    );

}



/*=============================================================

                VIVA CHAT REQUEST

=============================================================*/

async function sendVivaMessage(message) {

    return await apiRequest(

        API_ENDPOINTS.VIVA_CHAT,

        {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                session_id: CHAT_CONFIG.SESSION_ID,

                message: message

            })

        }

    );

}

/*=============================================================

                TECHNICAL RESUME UPLOAD

=============================================================*/

async function uploadResume(file) {

    const formData = new FormData();

    formData.append("file", file);

    return await apiRequest(

        API_ENDPOINTS.TECHNICAL_UPLOAD,

        {

            method: "POST",

            body: formData

        }

    );

}



/*=============================================================

                PROJECT REPORT UPLOAD

=============================================================*/

async function uploadProjectReport(file) {

    const formData = new FormData();

    formData.append("file", file);

    return await apiRequest(

        API_ENDPOINTS.VIVA_UPLOAD,

        {

            method: "POST",

            body: formData

        }

    );

}



/*=============================================================

                HISTORY API

=============================================================*/

window.HistoryAPI = {

    async fetchSessions(mode) {

        try {

            const response = await fetch(
                API_CONFIG.BASE_URL +
                "/api/v1/history/sessions?mode=" + mode
            );

            return await response.json();

        } catch (error) {

            console.error("History fetch failed:", error);
            return [];

        }

    },

    async fetchMessages(sessionId, mode) {

        try {

            const response = await fetch(
                API_CONFIG.BASE_URL +
                "/api/v1/history/messages/" +
                sessionId +
                "?mode=" +
                mode
            );

            return await response.json();

        } catch (error) {

            console.error("Message fetch failed:", error);
            return [];

        }

    }

};

/*=============================================================

                CONNECTION CHECK

=============================================================*/

async function checkServerConnection() {

    try {

        const response = await fetch(
            API_CONFIG.BASE_URL + "/docs"
        );

        return response.ok;

    }

    catch (error) {

        return false;

    }

}

/*=============================================================

                GLOBAL API OBJECT

    Makes API functions available to the
    rest of the application.

=============================================================*/

window.PrepMateAPI = {

    sendTechnicalMessage,

    sendVivaMessage,

    uploadResume,

    uploadProjectReport,

    checkServerConnection

};



/*=============================================================

                DEBUG

=============================================================*/

if (DEBUG) {

    console.log("PrepMate API Loaded");

}