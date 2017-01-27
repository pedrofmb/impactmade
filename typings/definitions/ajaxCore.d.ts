interface PrimaryService
{
    Name: string;
    BaseUrl: string;
    Test : (successFunction : Function, errorFunction : Function) => void;
    CheckAvailableNumbers : (successFunction : Function, errorFunction : Function) => void;
    Login : (email : string, password : string, successFunction : Function, errorFunction : Function) => void;
    CreateAccount : (verificationCode : any, firstName : string, lastName : string, email : string, password : string, companyName : string, keepExistingNumber : any, virtualNumber : string, successFunction : Function, errorFunction : Function) => void;
    GetAccountInfo : (successFunction : Function, errorFunction : Function) => void;
    UpdateAccountInfo : (firstName : string, lastName : string, companyName : string, email : string, mobileNumber : string, imageBase64 : string, subscribeToNewsLetter : any, successFunction : Function , errorFunction : Function) => void;
    UpdatePassword : (oldPassword : string, newPassword : string , successFunction : Function, errorFunction : Function) => void;
    SignUpRequest : (firstName : string, lastName : string, companyName : string, contactPhone : string, emailAddress : string, numberEmployees : number, successFunction : Function, errorFunction : Function) => void;
    ContactUs : (firstName : string, emailAddress : string, subject : string, message : string, successFunction : Function, errorFunction : Function) => void;
    PingLinuxCoreService : (idLinuxCoreService : any, successFunction : Function, errorFunction : Function) => void;
}

interface LocalService
{
    Name: string;
    BaseUrl: string;
    Test : (successFunction : Function, errorFunction : Function) => void;
    GetExamples : (successFunction : Function, errorFunction : Function) => void;
    GetExample : (idOfExample : any, successFunction : Function, errorFunction : Function) => void;
    Logout : (token : any, successFunction : Function, errorFunction : Function) => void;
    GetVirtualNumbers : (successFunction : Function, errorFunction : Function) => void;
    UpdateVirtualNumber : (sidVirtualNumber : string, friendlyName : string, timeZoneOffset : any, successFunction : Function, errorFunction : Function) => void;
    DeleteVirtualNumber : (sidVirtualNumber : string, successFunction : Function, errorFunction: Function) => void;
    PurchaseVirtualNumber : (virtualNumber : any, successFunction : Function, errorFunction : Function) => void;
    IsAuthenticated : (token : any, successFunction : Function, errorFunction : Function) => void;
    ValidateXml : (xmlEncoded : any, isVoice : Boolean, successFunction : Function, errorFunction : Function) => void;
    GetLogics : (sidVirtualNumber : string, successFunction : Function, errorFunction : Function) => void;
    GetLogicXml : (idLogic : any, successFunction : Function, errorFunction : Function) => void;
    CreateLogic : (sidVirtualNumber : string, xmlEncoded : any, name : string, description : string, isVoice : Boolean, isTemp : Boolean, successFunction : Function, errorFunction : Function) => void;
    UpdateLogic : (idLogic : any, xmlEncoded : any, name : string, description : string, weekDaysToAdd : any, successFunction : Function, errorFunction : Function) => void;
    DeleteLogic : (idLogic : any, successFunction : Function, errorFunction : Function) => void;
    ListUsageSms : (virtualNumberSid : string, startDate : Date, endDate : Date, successFunction : Function, errorFunction : Function) => void;
    ListUsageSmsMedia : (virtualNumberSid : string, startDate : Date, endDate : Date, successFunction : Function, errorFunction : Function) => void;
    ListSms : (virtualNumberSid : string, startDate : Date, endDate : Date, pageNumber : any, filterFrom : Date, filterTo : Date, filterBody : any, filterIsIncoming : any, successFunction : Function, errorFunction : Function) => void;
    GetSms : (sidSms : any, successFunction : Function, errorFunction : Function) => void;
    ListUsageCalls : (virtualNumberSid : string, startDate : Date, endDate : Date, successFunction : Function, errorFunction : Function) => void;
    ListCalls : (virtualNumberSid : string, startDate : Date, endDate : Date, pageNumber : any, filterFrom : Date, filterTo : Date, filterHasRecordings : any, filterIsIncoming : any, successFunction : Function, errorFunction : Function) => void;
    ListUsageRecordings : (virtualNumberSid : string, startDate : Date, endDate : Date, successFunction : Function, errorFunction : Function) => void;
    ListRecordings : (virtualNumberSid : string, startDate : Date, endDate : Date, successFunction : Function, errorFunction : Function) => void;
    GetCall : (sidCall : any, successFunction : Function, errorFunction : Function) => void;
    Call : (virtualNumberSid : string, fromNumber : string, toNumber : string, successFunction : Function, errorFunction : Function) => void;
    InitiateOutboundCall : (sidVirtualNumber : string, toNumber : string, idLogic : any, label : any, successFunction : Function, errorFunction : Function) => void;
    ListRecentCalls : (sidVirtualNumber : string, filterFrom : any, filterTo : any, successFunction : Function, errorFunction : Function) => void;
    RedirectCall : (sidCall : any, idLogic : any, label : any, successFunction : Function, errorFunction : Function) => void;
    GetLocationOfCall : (callSid : any, currentLocation : any, successFunction : Function, errorFunction : Function) => void;
    ImportContacts : (vCardContactactsEncoded : any, successFunction : Function, errorFunction : Function) => void;
    GetActivePeriodInfo : (successFunction : Function, errorFunction : Function) => void;
    PortNumber : (phoneNumberToPort : any, data : any, doc1 : any, doc2 : any, doc3 : any, doc4 : any, successFunction : Function, errorFunction : Function) => void;
    GetVariableCategories : (sidVirtualNumber : string, successFunction : Function, errorFunction : Function) => void;
    AutoCompleteGetVariableCategories : (sidVirtualNumber : string, partialCategoryName : string, successFunction : Function, errorFunction : Function) => void;
    CreateVariableCategory : (sidVirtualNumber : string, name : string, description : string, successFunction : Function, errorFunction : Function) => void;
    UpdateVariableCategory : (idVariableCategory : any, newName : string, newDescription : string, successFunction : Function, errorFunction : Function) => void;
    DeleteVariableCategory : (idVariableCategory : any, successFunction : Function, errorFunction : Function) => void;
    GetVariables : (idVariableCategory : any, successFunction : Function, errorFunction : Function) => void;
    AutoCompleteGetVariables : (idCategory : any, partialVariableName : string, successFunction : Function, errorFunction : Function) => void;
    CreateVariable : (idVariableCategory : any, variableName : string, variableType : any, variableOptionsSeparatedByComma : any, successFunction : Function, errorFunction : Function) => void;
    UpdateVariable : (idVariable : any, variableName : string, variableType : any, variableOptionsSeparatedByComma : any, successFunction : Function, errorFunction : Function) => void;
    DeleteVariable : (idVariable : any, successFunction : Function, errorFunction : Function) => void;
    GetVariableValues : (idVariableSeparatedByComma : any, phoneNumbersSeparatedByComma : any, successFunction : Function, errorFunction : Function) => void;
    UpdateOrCreateVariableValue : (idVariable : any, phoneNumber : string, valueEncoded : any, successFunction : Function, errorFunction : Function) => void;
    GetRecording : (idRecording : any, successFunction : Function, errorFunction : Function) => void;
    GetEvents : (startDate : Date, endDate : Date, pageNumber : any, successFunction : Function, errorFunction : Function) => void;
    DeleteEvent : (id : any, successFunction : Function, errorFunction : Function) => void;
    CreateEvent : (idVirtualNumber : any, idLogic : any, title : string, subtitle : any, date : Date, recipientsSeparatedByComma : any, successFunction : Function, errorFunction : Function) => void;
    UpdateEvent : (idEvent : any, idVirtualNumber : any, idLogic : any, title : string, subtitle : string, date : Date, recipientsSeparatedByComa : any, successFunction : Function, errorFunction : Function) => void;
}

interface PBXService
{
    Name: string;
    BaseUrl: string;
    Test : (successFunction : Function, errorFunction : Function) => void;
    HandleCall : (successFunction : Function, errorFunction : Function) => void;
    OnCallTerminated : (successFunction : Function, errorFunction : Function) => void;
    DownloadSipConf : (id : any, successFunction : Function, errorFunction : Function) => void;
    DownloadDialplanConf : (id : any, successFunction : Function, errorFunction : Function) => void;
    GetModelsOfPhonesThatCanBeConfiguredRemotely : (successFunction : Function, errorFunction : Function) => void;
    CreateExecutableToConfigureIpPhone : (idIpPhone : any, ipPhoneModel : any, ipAddressOfIpPhone : any, successFunction : Function, errorFunction : Function) => void;
    DownloadExecuatbleConfiguration : (id : any, successFunction : Function, errorFunction : Function) => void;
    UpdateSip : (successFunction : Function, errorFunction : Function) => void;
    UpdateDialplan : (successFunction : Function, errorFunction : Function) => void;
    CanWeSshIntoPbx : (successFunction : Function, errorFunction : Function) => void;
    CreateIpPhone : (displayName : string, blockInterationalCalling : any, callerId : any, hasVoicemail : Boolean, voicemailPin : any, sendVoicemailToEmail : any, deleteVoicemailIfSentByEmail : Boolean, logicVacation : any, logicUnavailable : any, logicBusy : any, isOnVacation : any, sipPassword : any, successFunction : Function, errorFunction : Function) => void;
    GetIpPhones : (successFunction : Function, errorFunction : Function) => void;
    GetIpPhonesStatus : (successFunction : Function, errorFunction : Function) => void;
    UpdateIpPhone : (idIpPhone : any, displayName : string, blockInterationalCalling : any, callerId : any, hasVoicemail : Boolean, voicemailPin : any, sendVoicemailToEmail : any, deleteVoicemailIfSentByEmail : Boolean, logicVacation : any, logicUnavailable : any, logicBusy : any, isOnVacation : any, sipPassword : any, successFunction : Function, errorFunction : Function) => void;
    RemoveIpPhone : (idIpPhone : any, successFunction : Function, errorFunction : Function) => void;
    CreateExtension : (idIpPhone : any, extension : any, successFunction : Function, errorFunction : Function) => void;
    GetExtensions : (successFunction : Function, errorFunction : Function) => void;
    UpdateExtension : (idExtension : any, newExtension : any, successFunction : Function, errorFunction : Function) => void;
    DeleteExtension : (idExtension : any, successFunction : Function, errorFunction : Function) => void;
    CreateConference : (confName : any, extension : any, successFunction : Function, errorFunction : Function) => void;
    GetConferences : (successFunction : Function, errorFunction : Function) => void;
    UpdateConference : (idConference : any, confName : string, extension : any, successFunction : Function, errorFunction : Function) => void;
    DeleteConference : (idConference : any, successFunction : Function, errorFunction : Function) => void;
}

interface ServicesCore
{
    Primary : PrimaryService;
    Local : LocalService;
    PBX : PBXService;
}

declare var Services : ServicesCore;