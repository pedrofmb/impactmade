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
    class ExtensionForIPhone {
        IdIpPhone: number;
        Extensions: Array<string>;
    }
    class AdminDevices {
        MainContainer: JQuery;
        private IpPhonesStatus;
        constructor(containerId: string);
        private BuildMainTabs();
        private AddIpPhone();
        private BuildTableIpPhones();
        private BuildTableConferences();
        private SearchExtensionInIpPhone(extensions, ipPhone);
        private GetExtensionIpPhones(iphonesRef);
        private GetIpPhonesStatus();
    }
}
