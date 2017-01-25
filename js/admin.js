/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global eval */

function VerificarSesion()
{
    Services.Local.IsAuthenticated(localStorage["x-token"],
		function (result) {
		    if (!result) {
		        location.replace("index.html");
		    }
		},
        function (error) { location.replace("index.html"); });
}

function Logout()
{
    Services.Local.Logout(localStorage["x-token"],
        function (result) {
            if (result) {
                localStorage.clear();
                location.replace("index.html");
            } else {
                alert("Error in logout. Try again.");
            }
        },
        function (error) { location.replace("index.html"); });
}

function CalculateMainHeight() {
    var height = document.documentElement.clientHeight - (document.getElementById("header").clientHeight + document.getElementById("footer").clientHeight);
    document.getElementById("mainElement").style.height = height + "px";
    var offset = document.documentElement.offsetHeight - document.documentElement.clientHeight;
    document.getElementById("mainElement").style.height = (height - offset) + "px";
}