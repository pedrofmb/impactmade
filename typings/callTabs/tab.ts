module callTabs {

    export class Tab {

        public Status: boolean;
        public SidNp: string;
        public NumberPhone: string;
        public Element: JQuery;
        public Bar: JQuery;
        public BodyContent: JQuery;
        public ControlCheck: JQuery;
        public SelectText: SelectText;
        public Accordion: Accordion;

        private item: number;
        private parent: JQuery;
        private layoutBody: JQuery;
        
        constructor(status: boolean, sidNp: string, numberPhone: string, item: number, parent: JQuery, accordion: Accordion)
        {
            this.Status = status;
            this.SidNp = sidNp;
            this.NumberPhone = numberPhone;
            this.item = item;
            this.parent = parent;
            this.Accordion = accordion;
            this.buildTab();
        }

        private buildTab(): void
        {
            this.Element = $("<div></div>");
            this.Bar = $("<div></div>");
            this.BodyContent = $("<div></div>");

            this.Element.addClass("tab");
            this.Bar.addClass("tabElementItem");
            this.Bar.addClass("tabHead");
            this.Bar.attr("id", "barItem_" + this.item);

            this.BodyContent.addClass("tabElementItem");
            this.BodyContent.addClass("tabBody");
            this.BodyContent.attr("id", "bodyItem_" + this.item);
            this.BodyContent.hide();

            this.layoutBody = $("<div></div>");
            this.layoutBody.addClass("bodyLayout");
            
            //this.SelectText = new SelectText(this, this.layoutBody);

            this.BodyContent.append(this.layoutBody);
            this.BodyContent.attr("data-index", this.item)

            this.layoutBody.append("<div id='loadControl_" + this.BodyContent.attr("data-index") + "'><span class='glyphicon glyphicon-refresh glyphicon-refresh-animate'></span>&nbsp;Loading....</div>");
            
            var ctrlCheckContent = $("<div></div>");
            ctrlCheckContent.addClass("tabBarItem");
            var label1 = $("<label></label>");
            label1.addClass("col-md-10");
            this.ControlCheck = $("<input class='col-md-2' type='checkbox' style='width: 30px;'/>");

            this.ControlCheck.change((ev: JQueryEventObject) => {
                this.BodyContent.slideToggle("slow", (ec) => {
                    $("#loadControl_" + this.BodyContent.attr("data-index")).show();
                    this.openTab();
                });
            });

            this.Status ? this.ControlCheck.prop("checked", true) : this.ControlCheck.prop("checked", false);
            label1.append(this.ControlCheck);

            label1.append(this.NumberPhone);

            var p = $("<p>&nbsp;</p>");

            ctrlCheckContent.append(label1);
            ctrlCheckContent.append(p);


            this.Bar.append(ctrlCheckContent);

            this.Element.append(this.Bar);
            this.Element.append(this.BodyContent);

            this.parent.append(this.Element);
        }

        public UpdateCheckValue(value: boolean): void {
            this.Status = value;
            this.Status ? this.ControlCheck.prop("checked", true) : this.ControlCheck.prop("checked", false);
        }

        private openTab(): void
        {
            if (this.BodyContent.css("display") == "none") {
                //
            } else {
                //Get Categories
                var itema = $("#panelVariableIden");
                if (itema["0"] != null)
                    itema.remove();
                this.getCategories();
            }
        }

        private getCategories() : void
        {
            this.Accordion.Services.Local.GetVariableCategories(this.SidNp, (resultOk) => {

                this.SelectText.Categories = new Array<Category>();

                $.each(resultOk, (ix, vx) => {
                    this.SelectText.Categories.push(new Category(vx.Id, vx.Name, vx.Description, vx.Date));
                });

                //this.SelectText.BuildControl();
                $("#loadControl_" + this.BodyContent.attr("data-index")).hide();

            }, (resultError) => {
                this.Accordion.Msg_warning("Error in get Categories.");
                $("#loadControl_" + this.BodyContent.attr("data-index")).hide();
            });
        }

    }

}