declare module devices {
    interface IIpPhoneTable {
        BlockInternationalCalling: boolean;
        CallerId: string;
        DeleteVoicemailIfSentByEmail: boolean;
        DisplayName: string;
        HasVoicemail: boolean;
        Id: number;
        IsOnVacation: boolean;
        LogicBusy: string;
        LogicUnavailable: string;
        LogicVacation: string;
        SendVoicemailToEmail: string;
        SipPassword: string;
        VoicemailPin: string;
    }
    interface IIpPhoneStatus {
        DisplayName: string;
        Id: number;
        IpAddress: string;
        IsConnected: boolean;
    }
    interface IExtension {
        DeviceName: string;
        Extension: string;
        Id: number;
        IdIpPhone: number;
    }
    interface IConference {
        Extension: string;
        Id: number;
        Name: string;
    }
    class ExtensionForIPhone {
        IdIpPhone: number;
        Extensions: Array<IExtension>;
    }
    class AdminDevices {
        MainContainer: JQuery;
        private IpPhonesStatus;
        constructor(containerId: string);
        private BuildMainTabs();
        private BuildFormEditConference(conference);
        private BuildFormAddConference();
        private BuildFormAddIpPhone();
        private SubmitDataIpPhone(edit);
        private SubmitNewExtension(IdIpPhone, extension);
        private BuildTableIpPhones();
        private BuildEditFormIPhone(ipPhone);
        private BuildFormExtension(idPhone);
        private BuildTableConferences();
        private UpdateSip();
        private UpdateDialplan();
        private SearchExtensionInIpPhone(extensions, ipPhone);
        private GetExtensionIpPhones(iphonesRef, functionBack?);
        private GetIpPhonesStatus();
    }
}
