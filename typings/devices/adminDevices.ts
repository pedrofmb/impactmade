module devices
{
    export interface IIpPhoneTable
    {
        BlockInternationalCalling : boolean;
        CallerId : string;
        DeleteVoicemailIfSentByEmail : boolean;
        DisplayName : string;
        HasVoicemail : boolean;
        Id : number;
        IsOnVacation : boolean;
        LogicBusy : string;
        LogicUnavailable : string;
        LogicVacation : string;
        SendVoicemailToEmail : string;
        SipPassword : string;
        VoicemailPin : string;
    }

    export interface IIpPhoneStatus
    {
        DisplayName : string;
        Id : number;
        IpAddress : string;
        IsConnected : boolean;
    }

    export interface IExtension
    {
        DeviceName : string;
        Extension : string;
        Id : number;
        IdIpPhone : number;
    }

    export class ExtensionForIPhone
    {
        public IdIpPhone : number;
        public Extensions : Array<string>
    }

    export class AdminDevices
    {
        public MainContainer : JQuery;
        private IpPhonesStatus : Array<IIpPhoneStatus>;

        constructor(containerId : string)
        {
            this.MainContainer = $("#" + containerId);
            this.BuildMainTabs();
        }

        private BuildMainTabs() : void
        {
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
            aTextPhoneOption.click((ev) => { this.BuildTableIpPhones(); });
            aTextPhoneOption.css({"font-weight" : "bolder" , "color" : "black"});
            liIpPhoneOption.append(aTextPhoneOption);

            var liConferenceOption = $("<li></li>");
            liConferenceOption.attr("role", "presentation");
            

            var aTextConferenceOption = $("<a></a>");
            aTextConferenceOption.attr("href", "#conferenceTab");
            aTextConferenceOption.attr("aria-controls", "conferenceTab");
            aTextConferenceOption.attr("role", "tab");
            aTextConferenceOption.attr("data-toggle", "tab");
            aTextConferenceOption.html("Conferences");
            aTextConferenceOption.click((ev) => { this.BuildTableConferences(); });
            aTextConferenceOption.css({"font-weight" : "bolder" , "color" : "black"});
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
        }

        private AddIpPhone() : void
        {
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

            /////

            var divBlockInternCalling = $("<div></div>");
            divBlockInternCalling.addClass("checkbox");

            var labelBlockInterCalling = $("<label></label>");
            var inputBlockInterCalling = $("<input />");
            inputBlockInterCalling.attr("id" , "inputBlockInternCalling");
            inputBlockInterCalling.attr("type", "checkbox");

            labelBlockInterCalling.append(inputBlockInterCalling);
            labelBlockInterCalling.append("Block international calling");

            divBlockInternCalling.append(labelBlockInterCalling);


            ///

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

            ///


            var divButtons = $("<div></div>");
            divButtons.css({"margin-top" : "10px"});
            divButtons.addClass("form-group");

            var btnSubmit = $("<input />");
            btnSubmit.attr("type", "button");
            btnSubmit.attr("value", "Submit");
            btnSubmit.addClass("col-sm-1 btn btn-success");

            var btnCancel = $("<input />");
            btnCancel.attr("type", "button");
            btnCancel.attr("value", "Cancel");
            btnCancel.css({"margin-left" : "10px"});
            btnCancel.addClass("col-sm-1 btn btn-danger");
            btnCancel.click((ev) => {
                ev.preventDefault();
                this.BuildTableIpPhones();
            });

            divButtons.append(btnSubmit);
            divButtons.append(btnCancel);

            form.append(divDisplayName);
            form.append(divBlockInternCalling);
            form.append(divCallerNumber);
            form.append(divButtons);

            content.append("<div style='margin-bottom: 10px;'><h2>Add Ip Phone</h2></div>");
            content.append(form);
        }

        private BuildTableIpPhones() : void
        {
            //ipphoneTab
            var content = $("#ipphoneTab");
            content.html("");

            //Options in table
            var btnAddIpPhone = $("<input />");
            btnAddIpPhone.attr("type", "button");
            btnAddIpPhone.attr("value", "Add ip Phone");
            btnAddIpPhone.addClass("btn btn-success");
            btnAddIpPhone.css({"margin-bottom" : "10px"});
            btnAddIpPhone.click(() => {
                this.AddIpPhone();
            });

            content.append(btnAddIpPhone);

            Services.PBX.GetIpPhones((success) => {

                var iphones = success as Array<IIpPhoneTable>;

                if(iphones.length > 0)
                {
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

                    for (var i = 0; i < iphones.length; i++)
                    {
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
                        if(iphones[i].HasVoicemail)
                            checkHasVoiceMail.prop("checked", true);
                        else
                            checkHasVoiceMail.prop("checked", false);

                        tdBody.append(checkHasVoiceMail);
                        trBody.append(tdBody);
                        

                        tdBody = $("<td></td>");

                        var checkBlockInternationalCalling = $("<input />");
                        checkBlockInternationalCalling.attr("type", "checkbox");
                        checkBlockInternationalCalling.prop("disabled" , true);
                        if(iphones[i].BlockInternationalCalling)
                            checkBlockInternationalCalling.prop("checked", true);
                        else
                            checkBlockInternationalCalling.prop("checked", false);


                        tdBody.append(checkBlockInternationalCalling);
                        trBody.append(tdBody);



                        tdBody = $("<td></td>");

                        var checkIsVacation = $("<input />");
                        checkIsVacation.attr("type", "checkbox");
                        checkIsVacation.prop("disabled" , true);
                        if(iphones[i].IsOnVacation)
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
                        btnEdit.attr("value","Edit");
                        tdBody.append(btnEdit);


                        var btnDelete = $("<input />");
                        btnDelete.attr("type", "button");
                        btnDelete.addClass("btn btn-danger");
                        btnDelete.css({"margin-left" : "10px"});
                        btnDelete.attr("value", "Delete");
                        tdBody.append(btnDelete);

                        var btnExtensions = $("<input />");
                        btnExtensions.attr("type", "button");
                        btnExtensions.addClass("btn btn-warning");
                        btnExtensions.css({"margin-left" : "10px"});
                        btnExtensions.attr("value", "Extensions");
                        tdBody.append(btnExtensions);

                        var btnDownload = $("<input />");
                        btnDownload.attr("type", "button");
                        btnDownload.addClass("btn btn-info");
                        btnDownload.css({"margin-left" : "10px"});
                        btnDownload.attr("value", "Download");
                        tdBody.append(btnDownload);


                        trBody.append(tdBody);

                        trBody.append(tdBody);
                        tbody.append(trBody);
                    }

                    table.append(thead);
                    table.append(tbody);

                    content.append(table);

                    this.GetIpPhonesStatus();
                    this.GetExtensionIpPhones(iphones);
                }
            }, (error) => {

            });
        }

        private BuildTableConferences() : void
        {
            //conferenceTab
            var content = $("#conferenceTab");
            content.html("");

            Services.PBX.GetConferences((success) => {
                console.log(success);
            }, (error) => {

            });
        }

        private SearchExtensionInIpPhone(extensions : Array<ExtensionForIPhone>, ipPhone : number) : {index : number; found : boolean}
        {
            if(extensions.length > 0)
            {
                for(var i=0; i < extensions.length; i++)
                {
                    if(extensions[i].IdIpPhone == ipPhone)
                     return {index : i, found : true};
                }
            }

            return {index : -1, found : false};
        }

        private GetExtensionIpPhones(iphonesRef : Array<IIpPhoneTable>) : void
        {
            Services.PBX.GetExtensions((success) => {
                //ipPhoneExtension_

                var extensions = success as Array<IExtension>;

                var extensionForIp = new Array<ExtensionForIPhone>();

                for(var i=0; i<extensions.length; i++)
                {
                    var search = this.SearchExtensionInIpPhone(extensionForIp, extensions[i].IdIpPhone);

                    if(!search.found)
                    {
                        if(search.index == -1)
                        {
                            var arrayExtensions = new Array<string>();
                            arrayExtensions.push(extensions[i].Extension);

                            var exts = new ExtensionForIPhone();
                            exts.IdIpPhone = extensions[i].IdIpPhone;
                            exts.Extensions = arrayExtensions;
                            
                            extensionForIp.push(exts);
                        }
                    }
                    else
                    {
                        var extIphones = extensionForIp[search.index].Extensions;
                        extIphones.push(extensions[i].Extension);
                    }
                }

                for(var j=0 ; j < iphonesRef.length ; j++)
                {
                    $("#ipPhoneExtension_" + iphonesRef[j].Id).removeClass();

                    var search = this.SearchExtensionInIpPhone(extensionForIp, iphonesRef[j].Id);

                    $("#ipPhoneExtension_" + iphonesRef[j].Id).html(extensionForIp[search.index].Extensions.join(","));
                }

            }, (error) => {

            });
        }

        private GetIpPhonesStatus() : void
        {
            Services.PBX.GetIpPhonesStatus((success) => {

                this.IpPhonesStatus = success as Array<IIpPhoneStatus>;

                for(var i=0; i<this.IpPhonesStatus.length; i++)
                {
                    $("#ipPhone_" + this.IpPhonesStatus[i].Id).removeClass();

                    if(this.IpPhonesStatus[i].IsConnected)
                        $("#ipPhone_" + this.IpPhonesStatus[i].Id).addClass("blink-layer circle-green");
                    else
                        $("#ipPhone_" + this.IpPhonesStatus[i].Id).addClass("blink-layer circle-red");

                }
                
            }, (error) => {

            });
        }
    }
}