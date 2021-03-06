//popups.js
//offline image source: http://www.iconarchive.com/show/senary-drive-icons-by-arrioch/NetworkDrive-Offline-icon.html
//file size too big: http://icons.iconarchive.com/icons/apathae/satellite/512/1-Documents-icon.png
//signature failed: http://icons.iconarchive.com/icons/iconsmind/outline/512/Fingerprint-2-icon.png
var OK_ONLY_DIALOG = 1;
var OK_CANCEL_DIALOG = 2;

var ROOT_PATH = "uploader/data/images/"

function privacyPopUp(){
    BootstrapDialog.show({
            title: 'Privacy policy',
            cssClass: 'z-dialog-vertical-center',
            size: BootstrapDialog.SIZE_LARGE,
            message: $('<div></div>').load('privacy.readme'),
            type: BootstrapDialog.TYPE_DEFAULT, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
            closable: true,
            draggable: true,
            buttons: [
            {
                label: 'Close',
                action: function(dialogRef) {
                    //close dialog
                    dialogRef.close();
                }
            }
            ]
        });
}

function termsOfUsePopup(){
    BootstrapDialog.show({
            title: 'Terms of use',
            cssClass: 'z-dialog-vertical-center',
            size: BootstrapDialog.SIZE_LARGE,
            message: $('<div></div>').load('tos.readme'),
            type: BootstrapDialog.TYPE_DEFAULT, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
            closable: true,
            draggable: true,
            buttons: [
            {
                label: 'Close',
                action: function(dialogRef) {
                    //close dialog
                    dialogRef.close();
                }
            }
            ]
        });
}

function appClosePopUp(){
    BootstrapDialog.show({
            title: 'Close apkr',
            cssClass: 'z-dialog-vertical-center',
            message: getTextAsDiv('Do you really want to exit and loose unsaved information?'),
            type: BootstrapDialog.TYPE_DEFAULT, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
            closable: true,
            draggable: true,
            buttons: [
            {
                label: 'Cancel',
                action: function(dialogRef) {
                    //close dialog
                    dialogRef.close();
                }
            },
            {
                label: 'Close',
                action: function(dialogRef) {
                    //close dialog
                    dialogRef.close();
                    //exit app
                    exitApp(nwin);
                }
            }
            ]
        });
}

function filesizeTooBigPopUp() {
    showErrorPopUp(
        'The file is too big',
        'z-dialog-vertical-center',
        getImageAsDiv(ROOT_PATH+"too-big.png", "Filsize too image") + getTextAsDiv('The file you are trying to submit is too big for being analyzed</br>We are sorry! :(</br>PD: We are working on it!'),
        'Accept',
        undefined, OK_ONLY_DIALOG);
    return;
}

function fileIsEmptyPopUp() {
    showErrorPopUp(
        'The file is empty',
        'z-dialog-vertical-center',
        getImageAsDiv(ROOT_PATH+"file-empty.png", "Filesize empty") + getTextAsDiv('We have detected that there is no useful data in the file you are trying to upload.</br>We are sorry! </br>:('),
        'Accept',
        undefined, OK_ONLY_DIALOG);
    return;
}


function hashSignatureCheckFailedPopUp() {
    showErrorPopUp(
        'Connection error',
        'z-dialog-vertical-center',
        getImageAsDiv(ROOT_PATH+"network-connection-error-icon.png", "Fingerprint image") + getTextAsDiv('It seems that something is blocking the Internet connection because we could not connect. Please check your connection cable and be sure that Firewall rules are not blocking this connection.'),
        'Accept',
        undefined, OK_ONLY_DIALOG);
}

function noServerConnectionPopUp() {
    showErrorPopUp(
        'Connection error',
        'z-dialog-vertical-center',
        getImageAsDiv(ROOT_PATH+"driver-offline.png", "server down image", 30) + getTextAsDiv('It seems we have some difficulties connecting with the server right now.</br>Please, try it later.'),
        'Accept',
        undefined, OK_ONLY_DIALOG);
}


function showFileNotApkPopUp(name) {
    showInfoPopUp(
        'Please, make sure of filetype',
        'z-dialog-vertical-center',
        '<div class="row"><div class="col-md-6 col-xs-6" style="width: 157px;">' + getImageAsDiv(ROOT_PATH+"andy-error.jpg", "Error Andy icon", 120) + '</div><div class="col-md-6 col-xs-6">' + getTextAsDiv('FOCUS!! </br> <tt style="font-family: courier new;">' + cleanHtml(name) + '</tt> </br>Is not a valid <i>Android application.</i>') + '</div></div></div>',
        'Accept',
        undefined, OK_ONLY_DIALOG);
}


function showErrorPopUp(title, cssCl, message, okBtn, clbck, buttons) {

    if (clbck == undefined) {
        clbck = function() {
            restoreBackground();
        }
    }
    //cleanBackground();
    if (buttons == OK_ONLY_DIALOG) {
        BootstrapDialog.show({
            title: title,
            cssClass: cssCl,
            message: message,
            type: BootstrapDialog.TYPE_DANGER, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
            closable: true,
            draggable: true,
            buttons: [{
                label: okBtn,
                cssClass: 'btn-danger',
                action: function(dialogRef) {
                    dialogRef.close();
                    clbck();
                }
            }]
        });
    } else if (buttons == OK_CANCEL_DIALOG) {
        BootstrapDialog.show({
            title: title,
            cssClass: cssCl,
            message: message,
            type: BootstrapDialog.TYPE_DANGER, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
            closable: true,
            draggable: true,
            buttons: [{
                label: 'Close',
                action: function(dialogRef) {
                    dialogRef.close();
                    restoreBackground();
                }
            }, {
                label: okBtn,
                cssClass: 'btn-danger',
                action: function(dialogRef) {
                    dialogRef.close();
                    clbck();
                    restoreBackground();
                }
            }]
        });
    }
}

function showInfoPopUp(title, cssCl, message, okBtn, clbck) {

    if (clbck == undefined) {
        clbck = function() {
            restoreBackground();
        }
    }
    //cleanBackground();
    BootstrapDialog.show({
        title: title,
        cssClass: cssCl,
        message: message,
        type: BootstrapDialog.TYPE_DEFAULT, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
        closable: true,
        draggable: false,
        buttons: [{
            label: okBtn,
            cssClass: 'btn-default',
            action: function(dialogRef) {
                dialogRef.close();
                clbck();
                restoreBackground();
            }
        }]
    });
}

function fileAlreadyAnalyzedPopUp(json, file) {
    var hash = json.hash;
    samplehash = hash;
    BootstrapDialog.show({
            title: '<h4 style="color: white;font-weight: bold;font-size: 18pt;margin-top: 10px;">This file was already scanned</h4>',
            cssClass: 'z-dialog-vertical-center',
            message: '<h4 style="font-size:13pt;">This file, with hash</br><b>' + cleanHtml(hash) + '</b></br>was already analized on ' + json.date + ' (' + json.days + ')</br>Result: ' + json.result + '</br>You can take a look at the last analysis or analyse it again now.</h4>',
            type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
            closable: true,
            draggable: true,
            buttons: [
            {
                label: "Reanalyse",
                action: function(dialogRef) {
                    dialogRef.close();
                    alreadyScanned = false;
                    upload(file.name, file, hash);
                }
            },
                        {
                label: 'View last report',
                cssClass: 'btn-warning',
                action: function(dialogRef) {
                    dialogRef.close();
                    var url = cleanHtml(json.resultUrl);
                    alreadyScanned = true;
                    newTab(url);
                }
            }
            ]
        });
}

function getImageAsDiv(imageName, alt) {
    return '<div class="center-div"><img class="popup-image" src="' + imageName + '" alt="' + alt + '"></div>';
}

function getImageAsDiv(imageName, alt, size) {
    return '<div class="center-div"><img class="popup-image" style="max-width:' + size + '%;" src="' + imageName + '" alt="' + alt + '"></div>';
}

function getTextAsDiv(data) {
    return '<h4 class="popup-text">' + data + '</h4>';
}

function uploadingFilePopup(filename, file, hash) {
    var continueTimer = true;
    BootstrapDialog.show({
                title: '<h4 style="color: white;font-weight: bold;font-size: 18pt;margin-top: 10px;">Uploading file...</h4>',
                message: 'Uploading',
                cssClass: 'z-dialog-vertical-center',
                closable: true,
                draggable: false,
                type: BootstrapDialog.TYPE_PRIMARY,
                onshow: function(dialogRef){
                    dialogRef.enableButtons(false);
                    dialogRef.setClosable(false);
                    dialogRef.getModalBody().html('Uploading file...');
                    var counter = 0;
                    //change text. refresh. upload
                    setInterval(change, 1000);
                    function change() {
                        if(continueTimer){
                            var points = ".";
                            for(var i=0; i<counter%3; i++){
                                points+=".";
                            }
                            dialogRef.getModalBody().html('<p>Please wait, do not close this window until the upload ends.</p><p>The time required for this operation depends on the file size, your bandwith and the net load.</p><p>Uploading'+points+'</p>');
                            counter++;
                    }
                }
                //function callback for action when upload finishes
                var callback = function(data) {
                        continueTimer = false;
                        if (data == undefined) {
                            //error
                            dialogRef.setClosable(true);
                        } else {
                            //success
                            dialogRef.getModalBody().html('Your file is successfully uploaded to apkr.</br>We will start analyzing it! We hope to be fast, but if you are in a rush, hit \'View report\' button');
                            dialogRef.enableButtons(true);
                            dialogRef.setClosable(true);
                        }
                    }
                    //make upload jax request here
                    ajax_uploadFile(filename, file, hash, callback);
                },
                buttons: [{
                    label: 'View report',
                    cssClass: 'btn-default',
                    action: function(dialogRef){
                        console.log('view report clicked');
                        //redirect
                        newTab("/report/"+hash);
                        dialogRef.close();
                    }
                }]
            });
}