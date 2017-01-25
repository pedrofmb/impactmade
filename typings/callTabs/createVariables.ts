module callTabs {

    export class createVariables {

        public Element: JQuery;
        public Accordion: Accordion;
        public SelectText: SelectText;
        public BodyContent: JQuery;

        private parent: JQuery;
        private layoutBody: JQuery;

        constructor(parent: JQuery, accordion: Accordion) {
            this.parent = parent;
            this.Accordion = accordion;
        }

        public BuildUIPanel() : void {
            this.Element = $("<div></div>");

            var labelVirtualNumber = $("<label></label>");
            labelVirtualNumber.addClass("control-label");
            labelVirtualNumber.html("Virtual number:");

            var selectVirtualNumber = $("<select></select>");

            selectVirtualNumber.addClass("form-control input-lg mb-md");
            selectVirtualNumber.css({ "width": "200px", "margin-left" : "20px", "display" : "inline-block" });

            $.each(this.Accordion.VirtualNumbers, (i, v) => {
                var item = $("<option></option>");
                item.attr("value", v.Sid);
                item.html(v.Number);
                selectVirtualNumber.append(item);
            });

            selectVirtualNumber.change((ev) => {
                var item = (<any>ev.target).value;
                var virtualNumber = this.Accordion.GetVirtualNumber(item);
                this.BuildPanelVariablesCreateUpdate(virtualNumber);
            });

            var space = $("<p></p>");

            this.Element.append(labelVirtualNumber);
            this.Element.append(selectVirtualNumber);
            this.Element.append(space);

            this.layoutBody = $("<div></div>");
            this.SelectText = new SelectText(this.Accordion, this.layoutBody, MainPanel.ManageVariables);

            this.Element.append(this.layoutBody);

            this.parent.append(this.Element);

            selectVirtualNumber.trigger("change");
        }

        public BuildPanelVariablesCreateUpdate(virtualNumber: VirtualNumber): void {
            this.layoutBody.html("");
            //<span class='glyphicon glyphicon-refresh glyphicon-refresh-animate'></span>

            this.BodyContent = $("<div></div>");
            this.layoutBody.append(this.BodyContent);

            this.Accordion.Services.Local.GetVariableCategories(virtualNumber.Sid, (resultOk) => {

                this.SelectText.Categories = new Array<Category>();

                $.each(resultOk, (ix, vx) => {
                    this.SelectText.Categories.push(new Category(vx.Id, vx.Name, vx.Description, vx.Date));
                });

                this.SelectText.BuildControl(virtualNumber);
                $("#loadControl_" + this.BodyContent.attr("data-index")).hide();

                var selectorCategoryDefault = $(".contentSelectCategories .itemSelect");
                $.each(selectorCategoryDefault, (ix, vx) => {
                    if ($(vx).html().toLowerCase() == "default") {
                        var idCategory = $(vx).attr("idItem");
                        this.SelectText.selectValue(idCategory);
                    }
                });


            }, (resultError) => {
                this.Accordion.Msg_warning("Error in get Categories.");
                $("#loadControl_" + this.BodyContent.attr("data-index")).hide();
            });

        }
    }
}