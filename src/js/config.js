/*=============================================================

                        PREPMATE
                Configuration File

    Purpose
    -------
    Stores application-wide configuration values.
    No application logic should be written here.

=============================================================*/


/*=============================================================

                    BACKEND SERVER

    Change this only if backend URL changes.

=============================================================*/

const API_CONFIG = {

    BASE_URL: "http://127.0.0.1:8000",

};



/*=============================================================

                    API ENDPOINTS

=============================================================*/

const API_ENDPOINTS = {

    TECHNICAL_CHAT: "/api/v1/technical/chat",

    VIVA_CHAT: "/api/v1/viva/chat",

    TECHNICAL_UPLOAD: "/api/v1/technical/upload",

    VIVA_UPLOAD: "/api/v1/viva/upload",

    CHAT_HISTORY: "/api/v1/chat/history"

};



/*=============================================================

                    APPLICATION MODES

=============================================================*/

const APP_MODE = {

    TECHNICAL: "technical",

    VIVA: "viva",

};



/*=============================================================

                    FILE SETTINGS

=============================================================*/

const FILE_CONFIG = {

    ALLOWED_TYPES: [

        ".pdf",

        ".docx",

        ".txt"

    ],

    MAX_FILE_SIZE: 10 * 1024 * 1024   // 10 MB

};



/*=============================================================

                    CHAT SETTINGS

=============================================================*/

const CHAT_CONFIG = {

    SPAM_LOCK_TIME: 2000,

    MAX_MESSAGE_LENGTH: 1000,

    // Creates a unique session every time the page is opened
    SESSION_ID: "session_" + Date.now()

};


/*=============================================================

                    UI SETTINGS

=============================================================*/

const UI_CONFIG = {

    SHOW_TYPING_INDICATOR: true,

    AUTO_SCROLL: true,

    ENABLE_ANIMATION: true,

};



/*=============================================================

                    PAGE DETECTION

=============================================================*/

const CURRENT_MODE =

window.location.pathname.includes("technical")

? APP_MODE.TECHNICAL

: APP_MODE.VIVA;



/*=============================================================

                    DEBUG MODE

=============================================================*/

const DEBUG = false;

// ... EXISTING CONFIGURATION (DO NOT MODIFY API URLs, APP_MODE, UI_CONFIG, ETC.) ...

/*=============================================================

         HISTORY CONFIGURATION

    Configuration only.
    No application logic.

=============================================================*/

const HISTORY_CONFIG = {

    ENABLE_HISTORY: true,

    MAX_HISTORY_ITEMS: 50,

    AUTO_LOAD_HISTORY: true,

    AUTO_SAVE_HISTORY: true,

    DEFAULT_HISTORY_TITLE: "New Session"

};

const SESSION_CONFIG = {

    CREATE_NEW_SESSION_ON_REFRESH: true,

    ALLOW_SESSION_RELOAD: true,

    ALLOW_SESSION_DELETE: false,

    ALLOW_SESSION_BOOKMARK: false,

    MAX_SESSION_NAME_LENGTH: 40

};