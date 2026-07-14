/*=============================================================

                        PREPMATE
                    APPLICATION CORE

    Purpose
    -------
    Initializes the application and connects
    all frontend modules together.

=============================================================*/



/*=============================================================

                APPLICATION STARTUP

=============================================================*/

document.addEventListener(

    "DOMContentLoaded",

    async function () {

        console.log("Starting PrepMate...");



        /*-----------------------------------------
            Initialize UI
        -----------------------------------------*/

        if (window.PrepMateUI) {

            PrepMateUI.updateSendButton();

            PrepMateUI.hideTypingIndicator();

        }



        /*-----------------------------------------
            Check Backend Connection
        -----------------------------------------*/

        try {

            const connected =

                await PrepMateAPI.checkServerConnection();



            if (connected) {

                console.log(

                    "✓ FastAPI Connected"

                );

            }

            else {

                console.warn(

                    "⚠ Backend not responding."

                );

            }

        }

        catch (error) {

            console.error(

                "Unable to connect to backend.",

                error

            );

        }



        /*-----------------------------------------
            Welcome Message
        -----------------------------------------*/

        console.log(

            "PrepMate Ready"

        );
        PrepMateChat.addMessage(

    "👋 Welcome! Upload your document and begin your session.",

    "ai"

);

    }

);

/*=============================================================

                APPLICATION MODE DETECTION

=============================================================*/

if (DEBUG) {

    console.log(

        "Current Mode:",

        CURRENT_MODE

    );

}



/*=============================================================

                MODULE VERIFICATION

=============================================================*/

function verifyModules() {

    const modules = {

        API: typeof PrepMateAPI !== "undefined",

        Chat: typeof PrepMateChat !== "undefined",

        UI: typeof PrepMateUI !== "undefined"

    };



    console.table(modules);



    return Object.values(modules).every(

        status => status === true

    );

}



/*=============================================================

                VERIFY ALL MODULES

=============================================================*/

window.addEventListener(

    "load",

    function () {

        const allLoaded = verifyModules();



        if (allLoaded) {

            console.log(

                "✅ All PrepMate modules loaded successfully."

            );

        }

        else {

            console.error(

                "❌ One or more modules failed to load."

            );

        }

    }

);

/*=============================================================

                APPLICATION READY

=============================================================*/

console.log(

    "===================================="

);

console.log(

    " PrepMate Frontend Initialized "

);

console.log(

    " Integration Complete "

);

console.log(

    "===================================="

);