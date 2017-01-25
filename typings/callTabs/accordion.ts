/// <reference path="../definitions/jquery.d.ts" />

module callTabs {

    export class Accordion
    {
        public Tabs: Array<Tab>;
        public Msg_warning: any;
        public Msg_info: any;
        public Services: any;
        public Element: JQuery;
        public VirtualNumbers: Array<VirtualNumber> = new Array<VirtualNumber>();

        private parent: JQuery;

        constructor(idElementParent: string)
        {
            this.Msg_warning = eval("msg_warning");
            this.Msg_info = eval("msg_info");
            this.Services = eval("Services");
            this.Element = $("<div></div>");
            this.parent = $("#" + idElementParent);

            this.Tabs = new Array<Tab>();
            this.parent.append(this.Element);
        }

        public GetVirtualNumber(Sid: string): VirtualNumber {

            for (var i = 0; i < this.VirtualNumbers.length; i++) {
                if (this.VirtualNumbers[i].Sid == Sid)
                    return this.VirtualNumbers[i];
            }

            return null;
        }

        private buildAssignValuesToVariables(): void
        {
            this.Services.Local.GetVirtualNumbers(
                 (result) => {

                     if (result.length > 0)
                     {
                         $.each(result, (index, value) =>
                         {
                             var tab = new Tab(false, value.Sid, value.Number, (index + 1), this.Element, this);
                             this.Tabs.push(tab);
                         });
                     }

                     $("#loadControl").remove();
                 },
                (result) => {
                    this.Msg_warning("Error in get virtual numbers.");
                    $("#loadControl").remove();
                }
            );
        }

        public LoadVirtualNumbers(panel: MainPanel): void {

            this.Services.Local.GetVirtualNumbers(
                (result) => {
                    if (result.length > 0) {

                        $.each(result, (index, value) => {
                            this.VirtualNumbers.push(new VirtualNumber(value.Sid, value.Number));
                        });

                        if (panel == MainPanel.ManageVariables) {
                            var manageVariables = new createVariables(this.Element, this);
                            manageVariables.BuildUIPanel();

                        }
                        else if (panel == MainPanel.AssignValuesToVariables) {
                            var assignerVariables = new assignVariables(this.Element, this);
                            assignerVariables.BuildUIPanel();
                        }
                    }

                    $("#loadControl").remove();
                },
                (result) => {
                    this.Msg_warning("Error in get virtual numbers.");
                    $("#loadControl").remove();
                }
            );
        }


    }

    export enum MainPanel {
        ManageVariables,
        AssignValuesToVariables
    }

    export class VirtualNumber {
        public Sid: string;
        public Number: string;

        constructor(sid: string, number: string) {
            this.Sid = sid;
            this.Number = number;
        }
    }

}
