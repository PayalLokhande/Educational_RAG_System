/*=============================================================

                        PREPMATE
                    FILE UPLOAD

    Purpose
    -------
    Handles Resume and Project Report uploads.

    Supported Files
    ---------------
    • PDF
    • DOCX
    • TXT

=============================================================*/



/*=============================================================

                    DOM ELEMENTS

=============================================================*/

const uploadInput =

document.getElementById(

    CURRENT_MODE === APP_MODE.TECHNICAL

    ? "resumeUpload"

    : "reportUpload"

);



const uploadButton =

document.getElementById("uploadButton");



/*=============================================================

                FILE VALIDATION

=============================================================*/

function validateFile(file){

    if(!file){

        alert("Please select a file.");

        return false;

    }



    const fileName =

    file.name.toLowerCase();



    const allowedExtensions =

    [

        ".pdf",

        ".docx",

        ".txt"

    ];



    const validExtension =

    allowedExtensions.some(

        extension =>

        fileName.endsWith(extension)

    );



    if(!validExtension){

        alert(

            "Only PDF, DOCX and TXT files are allowed."

        );

        return false;

    }



    if(

        file.size >

        FILE_CONFIG.MAX_FILE_SIZE

    ){

        alert(

            "File exceeds maximum size (10 MB)."

        );

        return false;

    }



    return true;

}



/*=============================================================

                FILE UPLOAD

=============================================================*/

async function uploadSelectedFile(){

    const file =

    uploadInput.files[0];



    if(

        !validateFile(file)

    ){

        return;

    }

    try{

        uploadButton.disabled = true;
        messageInput.disabled = true;
        sendButton.disabled = true;

       uploadButton.textContent =

      CURRENT_MODE === APP_MODE.TECHNICAL

     ?

      "Uploading Resume..."

     :

     "Uploading Report...";


        let response;



        if(

            CURRENT_MODE ===

            APP_MODE.TECHNICAL

        ){

            response =

            await PrepMateAPI.uploadResume(

                file

            );

        }

        else{

            response =

            await PrepMateAPI.uploadProjectReport(

                file

            );

        }

                /*-----------------------------------------
            Upload Successful
        -----------------------------------------*/

        if (CURRENT_MODE === APP_MODE.TECHNICAL) {

    PrepMateChat.addMessage(

        "✅ Resume uploaded successfully.\nYou can now begin your technical interview.",

        "ai"

    );

}

else {

    PrepMateChat.addMessage(

        "✅ Project report uploaded successfully.\nYou can now begin your viva session.",

        "ai"

    );

}

/* Move cursor to chat box */
setTimeout(() => {
    messageInput.focus();
}, 100);

/* Clear selected file */
uploadInput.value = "";
uploadInput.blur();

    }

    catch(error){

        console.error(error);

        alert(

            "File upload failed. Please try again."

        );

    }

    finally{

    uploadButton.disabled = false;

    messageInput.disabled = false;

    sendButton.disabled = false;

    uploadButton.textContent =

        CURRENT_MODE === APP_MODE.TECHNICAL

        ?

        "Upload Resume"

        :

        "Upload Report";

}
}



/*=============================================================

                UPLOAD BUTTON

=============================================================*/

uploadButton.addEventListener(

    "click",

    uploadSelectedFile

);



/*=============================================================

                FILE SELECTION

=============================================================*/

uploadInput.addEventListener(

    "change",

    function(){

        if(uploadInput.files.length > 0){

            console.log(

                "Selected File :",

                uploadInput.files[0].name

            );

        }

    }

);


// ... EXISTING UPLOAD FUNCTIONALITIES PRESERVED EXCLUSIVELY ...

 function getHistoryFileMetadataBridge() {

    try {

        const trackingList =
            document.querySelectorAll(".uploaded-file-item");

        const metadataArray = [];

        trackingList.forEach(function(item){

            metadataArray.push({

                fileName:
                    item.dataset.name ||
                    item.textContent.trim(),

                uploadedAt:
                    new Date().toISOString()

            });

        });

        return metadataArray;

    }

    catch(e){

        console.warn(

            "Could not bind file metadata structures to history entry safely.",

            e

        );

        return [];

    }

}

window.getHistoryFileMetadataBridge =
    getHistoryFileMetadataBridge;


/*=============================================================

                DEBUG

=============================================================*/

if(DEBUG){

    console.log(

        "PrepMate Upload Module Loaded"

    );

}