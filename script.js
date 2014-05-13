// github user finder example

var githubUrl = "https://api.github.com/users/";

var $profileInfo = undefined;

$(document).ready(function(){

    $profileInfo = $('#profile');

    $(document).on('keypress', '#username', function(e){

        if (e.which == 13) {

            var username = $('#username').val();

            var githubInfo = getGithubInfo(username); //"jkbits1"

            var success = (githubInfo.status === 200 || githubInfo.status === 304);

            if (!success) {

//                var errorMessage = "No such user: <" + username + ">" ;

                var errorMessage = "No such user: " + username;

                // html escaping method below is cribbed from http://jsperf.com/htmlencoderegex
//                errorMessage = errorMessage.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

                $profileInfo.find("h2").html(errorMessage);

//                $("")

                return;
            }

            var user = JSON.parse(githubInfo.responseText);

            showUser(user);

            var i = 0;

        }
    });
});

function showUser(user) {

    var loginInfo = user.login + " is Github user #" + user.id;

    $profileInfo.find('h2').text(loginInfo);

    var $link = $("<a class='profile'>");

    $link.attr("href", user.html_url);

    $link.text("View Profile on Github");



    $profileInfo.find(".information").append($link);

//  the following are alternative methods to create the link

//    $profileInfo.find(".information").append("<a href='" + user.html_url + "'>View Profile on Github</a>");

//    $profileInfo.find(".information").append($("<a>").attr("href",user.html_url).text("View Profile on Github"));

    var avatar = $("<img>");

    avatar.attr("src", "https://gravatar.com/avatar/" + user.gravatar_id + "?s=220")

    $profileInfo.find(".avatar").append(avatar);


}

function getGithubInfo(user) {

    return ajaxRequest(githubUrl + user);
}

function ajaxRequest(url) {

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", url, true);

//    xmlhttp.onreadystatechange = function handleAjaxResponse(){
//
//        if (xmlhttp.readyState != 4) return;
//        if (xmlhttp.status != 200 && req.status != 304) {
////			alert('HTTP error ' + req.status);
//            return;
//        }
//
//        callback(req);
//
//
//    };
//
//    if (xmlhttp.readyState == 4) return;

    xmlhttp.send();

    return xmlhttp;
}

