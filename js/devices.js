var devices;
(function (devices) {
    var ExtensionForIPhone = (function () {
        function ExtensionForIPhone() {
        }
        return ExtensionForIPhone;
    }());
    devices.ExtensionForIPhone = ExtensionForIPhone;
    var AdminDevices = (function () {
        function AdminDevices(containerId) {
            this.MainContainer = $("#" + containerId);
            this.BuildMainTabs();
        }
        AdminDevices.prototype.BuildMainTabs = function () {
            var _this = this;
            this.MainContainer.html("");
            var tabsContainer = $("<div></div>");
            var ulTabs = $("<ul></ul>");
            ulTabs.addClass("nav nav-tabs");
            ulTabs.attr("role", "tablist");
            var liIpPhoneOption = $("<li></li>");
            liIpPhoneOption.attr("role", "presentation");
            liIpPhoneOption.addClass("active");
            var aTextPhoneOption = $("<a></a>");
            aTextPhoneOption.attr("href", "#ipphoneTab");
            aTextPhoneOption.attr("aria-controls", "ipphoneTab");
            aTextPhoneOption.attr("role", "tab");
            aTextPhoneOption.attr("data-toggle", "tab");
            aTextPhoneOption.html("Ip Phones");
            aTextPhoneOption.click(function (ev) { _this.BuildTableIpPhones(); });
            aTextPhoneOption.css({ "font-weight": "bolder", "color": "black" });
            liIpPhoneOption.append(aTextPhoneOption);
            var liConferenceOption = $("<li></li>");
            liConferenceOption.attr("role", "presentation");
            var aTextConferenceOption = $("<a></a>");
            aTextConferenceOption.attr("href", "#conferenceTab");
            aTextConferenceOption.attr("aria-controls", "conferenceTab");
            aTextConferenceOption.attr("role", "tab");
            aTextConferenceOption.attr("data-toggle", "tab");
            aTextConferenceOption.html("Conferences");
            aTextConferenceOption.click(function (ev) { _this.BuildTableConferences(); });
            aTextConferenceOption.css({ "font-weight": "bolder", "color": "black" });
            liConferenceOption.append(aTextConferenceOption);
            ulTabs.append(liIpPhoneOption);
            ulTabs.append(liConferenceOption);
            tabsContainer.append(ulTabs);
            var tabContents = $("<div></div>");
            tabContents.addClass("tab-content");
            var tabIpPhoneContent = $("<div></div>");
            tabIpPhoneContent.attr("role", "tabpanel");
            tabIpPhoneContent.addClass("tab-pane active");
            tabIpPhoneContent.attr("id", "ipphoneTab");
            var tabConferenceContent = $("<div></div>");
            tabConferenceContent.attr("role", "tabpanel");
            tabConferenceContent.addClass("tab-pane");
            tabConferenceContent.attr("id", "conferenceTab");
            tabContents.append(tabIpPhoneContent);
            tabContents.append(tabConferenceContent);
            tabsContainer.append(tabContents);
            this.MainContainer.append(tabsContainer);
            this.BuildTableIpPhones();
        };
        AdminDevices.prototype.AddIpPhone = function () {
            var _this = this;
            var content = $("#ipphoneTab");
            content.html("");
            var form = $("<form></form>");
            var divDisplayName = $("<div></div>");
            divDisplayName.addClass("form-group");
            var labelDisplayName = $("<label></label>");
            labelDisplayName.html("Display name");
            labelDisplayName.addClass("control-label");
            labelDisplayName.attr("for", "inputDisplayName");
            var inputDisplayName = $("<input />");
            inputDisplayName.attr("id", "inputDisplayName");
            inputDisplayName.attr("type", "text");
            inputDisplayName.addClass("col-sm-6 form-control");
            divDisplayName.append(labelDisplayName);
            divDisplayName.append(inputDisplayName);
            var divBlockInternCalling = $("<div></div>");
            divBlockInternCalling.addClass("checkbox");
            var labelBlockInterCalling = $("<label></label>");
            var inputBlockInterCalling = $("<input />");
            inputBlockInterCalling.attr("id", "inputBlockInternCalling");
            inputBlockInterCalling.attr("type", "checkbox");
            labelBlockInterCalling.append(inputBlockInterCalling);
            labelBlockInterCalling.append("Block international calling");
            divBlockInternCalling.append(labelBlockInterCalling);
            var divCallerNumber = $("<div></div>");
            divCallerNumber.addClass("form-group");
            var labelCallerNumber = $("<label></label>");
            labelCallerNumber.html("Caller number");
            labelCallerNumber.addClass("control-label");
            labelCallerNumber.attr("for", "inputCallerNumber");
            var inputCallerNumber = $("<input />");
            inputCallerNumber.attr("id", "inputCallerNumber");
            inputCallerNumber.attr("type", "text");
            inputCallerNumber.addClass("col-sm-6 form-control");
            divCallerNumber.append(labelCallerNumber);
            divCallerNumber.append(inputCallerNumber);
            var divButtons = $("<div></div>");
            divButtons.css({ "margin-top": "10px" });
            divButtons.addClass("form-group");
            var btnSubmit = $("<input />");
            btnSubmit.attr("type", "button");
            btnSubmit.attr("value", "Submit");
            btnSubmit.addClass("col-sm-1 btn btn-success");
            var btnCancel = $("<input />");
            btnCancel.attr("type", "button");
            btnCancel.attr("value", "Cancel");
            btnCancel.css({ "margin-left": "10px" });
            btnCancel.addClass("col-sm-1 btn btn-danger");
            btnCancel.click(function (ev) {
                ev.preventDefault();
                _this.BuildTableIpPhones();
            });
            divButtons.append(btnSubmit);
            divButtons.append(btnCancel);
            form.append(divDisplayName);
            form.append(divBlockInternCalling);
            form.append(divCallerNumber);
            form.append(divButtons);
            content.append("<div style='margin-bottom: 10px;'><h2>Add Ip Phone</h2></div>");
            content.append(form);
        };
        AdminDevices.prototype.BuildTableIpPhones = function () {
            var _this = this;
            var content = $("#ipphoneTab");
            content.html("");
            var btnAddIpPhone = $("<input />");
            btnAddIpPhone.attr("type", "button");
            btnAddIpPhone.attr("value", "Add ip Phone");
            btnAddIpPhone.addClass("btn btn-success");
            btnAddIpPhone.css({ "margin-bottom": "10px" });
            btnAddIpPhone.click(function () {
                _this.AddIpPhone();
            });
            content.append(btnAddIpPhone);
            Services.PBX.GetIpPhones(function (success) {
                var iphones = success;
                if (iphones.length > 0) {
                    var table = $("<table></table>");
                    table.addClass("table table-striped tableAdminDevices");
                    var thead = $("<thead></thead>");
                    var trHead = $("<tr></tr>");
                    var tdHead = $("<th></th>");
                    tdHead.html("Id");
                    trHead.append(tdHead);
                    thead.append(trHead);
                    tdHead = $("<th></th>");
                    tdHead.html("Name");
                    trHead.append(tdHead);
                    thead.append(trHead);
                    tdHead = $("<th></th>");
                    tdHead.html("Has Voice mail");
                    trHead.append(tdHead);
                    thead.append(trHead);
                    tdHead = $("<th></th>");
                    tdHead.html("Block Inter. Calling");
                    trHead.append(tdHead);
                    thead.append(trHead);
                    tdHead = $("<th></th>");
                    tdHead.html("Vacation?");
                    trHead.append(tdHead);
                    thead.append(trHead);
                    tdHead = $("<th></th>");
                    tdHead.html("Caller Id");
                    trHead.append(tdHead);
                    thead.append(trHead);
                    tdHead = $("<th></th>");
                    tdHead.html("Extensions");
                    trHead.append(tdHead);
                    thead.append(trHead);
                    tdHead = $("<th></th>");
                    tdHead.html("Status");
                    trHead.append(tdHead);
                    thead.append(trHead);
                    tdHead = $("<th></th>");
                    tdHead.html("Options");
                    trHead.append(tdHead);
                    thead.append(trHead);
                    var tbody = $("<tbody></tbody>");
                    for (var i = 0; i < iphones.length; i++) {
                        var trBody = $("<tr></tr>");
                        var tdBody = $("<td></td>");
                        tdBody.html(iphones[i].Id.toString());
                        trBody.append(tdBody);
                        tdBody = $("<td></td>");
                        tdBody.html(iphones[i].DisplayName);
                        trBody.append(tdBody);
                        tdBody = $("<td></td>");
                        var checkHasVoiceMail = $("<input />");
                        checkHasVoiceMail.attr("type", "checkbox");
                        checkHasVoiceMail.prop("disabled", true);
                        if (iphones[i].HasVoicemail)
                            checkHasVoiceMail.prop("checked", true);
                        else
                            checkHasVoiceMail.prop("checked", false);
                        tdBody.append(checkHasVoiceMail);
                        trBody.append(tdBody);
                        tdBody = $("<td></td>");
                        var checkBlockInternationalCalling = $("<input />");
                        checkBlockInternationalCalling.attr("type", "checkbox");
                        checkBlockInternationalCalling.prop("disabled", true);
                        if (iphones[i].BlockInternationalCalling)
                            checkBlockInternationalCalling.prop("checked", true);
                        else
                            checkBlockInternationalCalling.prop("checked", false);
                        tdBody.append(checkBlockInternationalCalling);
                        trBody.append(tdBody);
                        tdBody = $("<td></td>");
                        var checkIsVacation = $("<input />");
                        checkIsVacation.attr("type", "checkbox");
                        checkIsVacation.prop("disabled", true);
                        if (iphones[i].IsOnVacation)
                            checkIsVacation.prop("checked", true);
                        else
                            checkIsVacation.prop("checked", false);
                        tdBody.append(checkIsVacation);
                        trBody.append(tdBody);
                        tdBody = $("<td></td>");
                        tdBody.html(iphones[i].CallerId);
                        trBody.append(tdBody);
                        tdBody = $("<td></td>");
                        var divExtensions = $("<div></div>");
                        divExtensions.attr("id", "ipPhoneExtension_" + iphones[i].Id);
                        divExtensions.html("&nbsp;");
                        tdBody.append(divExtensions);
                        trBody.append(tdBody);
                        tdBody = $("<td></td>");
                        var divStatus = $("<div></div>");
                        divStatus.attr("id", "ipPhone_" + iphones[i].Id);
                        divStatus.html("&nbsp;");
                        tdBody.append(divStatus);
                        trBody.append(tdBody);
                        tdBody = $("<td></td>");
                        var btnEdit = $("<input />");
                        btnEdit.attr("type", "button");
                        btnEdit.addClass("btn btn-primary");
                        btnEdit.attr("value", "Edit");
                        tdBody.append(btnEdit);
                        var btnDelete = $("<input />");
                        btnDelete.attr("type", "button");
                        btnDelete.addClass("btn btn-danger");
                        btnDelete.css({ "margin-left": "10px" });
                        btnDelete.attr("value", "Delete");
                        tdBody.append(btnDelete);
                        var btnExtensions = $("<input />");
                        btnExtensions.attr("type", "button");
                        btnExtensions.addClass("btn btn-warning");
                        btnExtensions.css({ "margin-left": "10px" });
                        btnExtensions.attr("value", "Extensions");
                        tdBody.append(btnExtensions);
                        var btnDownload = $("<input />");
                        btnDownload.attr("type", "button");
                        btnDownload.addClass("btn btn-info");
                        btnDownload.css({ "margin-left": "10px" });
                        btnDownload.attr("value", "Download");
                        tdBody.append(btnDownload);
                        trBody.append(tdBody);
                        trBody.append(tdBody);
                        tbody.append(trBody);
                    }
                    table.append(thead);
                    table.append(tbody);
                    content.append(table);
                    _this.GetIpPhonesStatus();
                    _this.GetExtensionIpPhones(iphones);
                }
            }, function (error) {
            });
        };
        AdminDevices.prototype.BuildTableConferences = function () {
            var content = $("#conferenceTab");
            content.html("");
            Services.PBX.GetConferences(function (success) {
                console.log(success);
            }, function (error) {
            });
        };
        AdminDevices.prototype.SearchExtensionInIpPhone = function (extensions, ipPhone) {
            if (extensions.length > 0) {
                for (var i = 0; i < extensions.length; i++) {
                    if (extensions[i].IdIpPhone == ipPhone)
                        return { index: i, found: true };
                }
            }
            return { index: -1, found: false };
        };
        AdminDevices.prototype.GetExtensionIpPhones = function (iphonesRef) {
            var _this = this;
            Services.PBX.GetExtensions(function (success) {
                var extensions = success;
                var extensionForIp = new Array();
                for (var i = 0; i < extensions.length; i++) {
                    var search = _this.SearchExtensionInIpPhone(extensionForIp, extensions[i].IdIpPhone);
                    if (!search.found) {
                        if (search.index == -1) {
                            var arrayExtensions = new Array();
                            arrayExtensions.push(extensions[i].Extension);
                            var exts = new ExtensionForIPhone();
                            exts.IdIpPhone = extensions[i].IdIpPhone;
                            exts.Extensions = arrayExtensions;
                            extensionForIp.push(exts);
                        }
                    }
                    else {
                        var extIphones = extensionForIp[search.index].Extensions;
                        extIphones.push(extensions[i].Extension);
                    }
                }
                for (var j = 0; j < iphonesRef.length; j++) {
                    $("#ipPhoneExtension_" + iphonesRef[j].Id).removeClass();
                    var search = _this.SearchExtensionInIpPhone(extensionForIp, iphonesRef[j].Id);
                    $("#ipPhoneExtension_" + iphonesRef[j].Id).html(extensionForIp[search.index].Extensions.join(","));
                }
            }, function (error) {
            });
        };
        AdminDevices.prototype.GetIpPhonesStatus = function () {
            var _this = this;
            Services.PBX.GetIpPhonesStatus(function (success) {
                _this.IpPhonesStatus = success;
                for (var i = 0; i < _this.IpPhonesStatus.length; i++) {
                    $("#ipPhone_" + _this.IpPhonesStatus[i].Id).removeClass();
                    if (_this.IpPhonesStatus[i].IsConnected)
                        $("#ipPhone_" + _this.IpPhonesStatus[i].Id).addClass("blink-layer circle-green");
                    else
                        $("#ipPhone_" + _this.IpPhonesStatus[i].Id).addClass("blink-layer circle-red");
                }
            }, function (error) {
            });
        };
        return AdminDevices;
    }());
    devices.AdminDevices = AdminDevices;
})(devices || (devices = {}));
