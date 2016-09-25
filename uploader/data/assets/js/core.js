function quitApp(deleteStorage) {
    if (deleteStorage == true) {
        console.log("Deleting local storage...");
        localStorage.clear();
    }
    //force quit
    nwin.hide(); // Pretend to be closed already
    console.log("We're closing...");
    nwin.close(true);
    setProperlyClosed(true);
    //RESET localstorage values
    resetSessionValues();
}

function cleanBackground() {
    $('#page-wrapper').hide();
    $('body').css("background-color", "black");
}

function restoreBackground() {
    $('#page-wrapper').show();
    $('body').css("background-color", "#F5F5F5");
}

function createProfile() {
    var data = 
        '{ "cpusInfo": ' + JSON.stringify(os.cpus()) +
        ', "vars": {' +
        '"tempdir": ' + JSON.stringify(os.tmpdir()) + ', ' +
        '"endianness": ' + JSON.stringify(os.endianness()) + ', ' +
        '"hostname": ' + JSON.stringify(os.hostname()) + ', ' +
        '"type": ' + JSON.stringify(os.type()) + ', ' +
        '"platform": ' + JSON.stringify(os.platform()) + ', ' +
        '"arch": ' + JSON.stringify(os.arch()) + ', ' +
        '"release": ' + JSON.stringify(os.release()) + ', ' +
        '"totalmem": ' + JSON.stringify(os.totalmem()) +
        '}, "networkInterfaces": ' +
        JSON.stringify(os.networkInterfaces()) +
        '}';
    var enc = encapsulateData(data, true);
    userProfile(enc);
}


function upload(filename, file, hash) {
    if (file && file.size > maxFileS * 1024 * 1024) {
        //show dile too big dialog
        filesizeTooBigPopUp();
        return;
    } else {
        uploadingFilePopup(filename, file, hash);
    }
}

function openReport(url, hash){
    window.location.href = getServerAddress("report/"+hash);
}

function newTab(url) {
    window.location.href = url;
}

function getServerAddress(argument) {
    if(mainServer==null && (serverList==null || serverList.length == 0) ){
        //try to get server list from repo
        /*
        $.ajax({
            url: 'https://raw.githubusercontent.com/zerjioang/apkr/master/resources/webapp/server.json',
            success: function (result) {
                if (result){
                    var json = jQuery.parseJSON(result);
                    serverList = json.datacenters;
                    console.log("Datacencers detecteds: "+serverList.length);
                    if(serverList.length>0){
                        mainserver = serverList[0];
                        console.log("Setting first datacenter as main server: "+mainServer);
                    }
                    else{
                        //no servers available
                        console.log("No servers available right now");
                    }
                }
            },
            error: function (result) {
                if (result){
                    console.log("Error: "+result);
                }
            }
        });
        */
        return [];
    }
    else{
        return "http://" + mainServer +"/api/v1/" + argument;
    }
}

function checkRequirements() {
    if (window.localStorage) {
        //local storage exists
    } else {
        //local storage not available
        var callback = function() {
            localStorage.clear();
            quitApp(true);
        }

        showErrorPopUp(
            'ERROR',
            'dialog-vertical-center',
            'apkr can not work on this computer because it does not fullfil minimum requirements. </br> Please, check more information at <a href="https:www.google.com" target="_blank">minimum requirements</a>',
            'I understand',
            callback
        );
    }
}

function requestPermissions() {
    // request permission on page load
    document.addEventListener('DOMContentLoaded', function() {
        if (Notification.permission !== "granted")
            Notification.requestPermission();
    });
}

init();