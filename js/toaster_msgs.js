/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var TOASTER_TITLE = "IMPACT MADE";

function msg_toaster(msg, type, pos) {
    pos = typeof pos !== 'undefined' ? pos : 'toast-bottom-right';

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": pos,
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    toastr[type](msg, TOASTER_TITLE);
}


function msg_error(msg, pos) {
    msg_toaster(msg, "error", pos);
}
function msg_success(msg, pos) {
    msg_toaster(msg, "success", pos);
}
function msg_info(msg, pos) {
    msg_toaster(msg, "info", pos);
}
function msg_warning(msg, pos) {
    msg_toaster(msg, "warning", pos);
}