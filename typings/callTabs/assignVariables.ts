module callTabs {

    export class assignVariables {

        public Element: JQuery;
        public Accordion: Accordion;
        public BodyContent: JQuery;

        private parent: JQuery;
        private layoutBody: JQuery;
        private clientNumbersByVirtualNumber: Array<string>;
        private indexBody = 0;

        constructor(parent: JQuery, accordion: Accordion) {
            this.parent = parent;
            this.Accordion = accordion;
        }

        public BuildUIPanel(): void {
            this.Element = $("<div></div>");

            var labelVirtualNumber = $("<label></label>");
            labelVirtualNumber.addClass("control-label");
            labelVirtualNumber.html("Virtual number:");

            var selectVirtualNumber = $("<select></select>");

            selectVirtualNumber.addClass("form-control input-lg mb-md");
            selectVirtualNumber.css({ "width": "200px", "margin-left": "20px", "display": "inline-block" });

            $.each(this.Accordion.VirtualNumbers, (i, v) => {
                var item = $("<option></option>");
                item.attr("value", v.Sid);
                item.html(v.Number);
                selectVirtualNumber.append(item);
            });

            selectVirtualNumber.change((ev) => {
                var item = (<any>ev.target).value;
                var virtualNumber = this.Accordion.GetVirtualNumber(item);
                this.clientNumbersByVirtualNumber = new Array<string>();
                this.BuildPanelVariablesCreateUpdate(virtualNumber);
            });

            var space = $("<p></p>");

            this.Element.append(labelVirtualNumber);
            this.Element.append(selectVirtualNumber);
            this.Element.append(space);

            this.layoutBody = $("<div></div>");

            this.Element.append(this.layoutBody);

            this.parent.append(this.Element);

            selectVirtualNumber.trigger("change");
        }


        public BuildPanelVariablesCreateUpdate(virtualNumber: VirtualNumber): void {
            this.layoutBody.html("");

            this.BodyContent = $("<div></div>");
            this.layoutBody.append(this.BodyContent);

            var buttonRefresh = $("<button></button>");
            buttonRefresh.html("Refresh&nbsp;");
            buttonRefresh.attr("type", "button");
            buttonRefresh.addClass("mb-xs mt-xs mr-xs btn btn-primary")
            var buttonIcon = $("<i></i>");
            buttonIcon.addClass("fa fa-refresh");
            buttonRefresh.append(buttonIcon);

            buttonRefresh.click((ev) => {
                this.createAccordion(virtualNumber);
            });

            this.BodyContent.append(buttonRefresh);
            //Get client numbers to ListActiveCalls

            this.createAccordion(virtualNumber);
        }

        private createAccordion(virtualNumber: VirtualNumber): void {

            $("#callsClientsContainer").remove();

            this.clientNumbersByVirtualNumber = new Array<string>();
            this.indexBody = 0;

            this.Accordion.Services.Local.ListRecentCalls(virtualNumber.Sid,"1","10", (resultOk) => {

                $.each(resultOk, (ix, vx) => {
                    if (vx.IsIncoming) {
                        this.clientNumbersByVirtualNumber.push(vx.From);
                    } else {
                        this.clientNumbersByVirtualNumber.push(vx.To);
                    }
                });

                //this.clientNumbersByVirtualNumber.push("+45454545441");
                //this.clientNumbersByVirtualNumber.push("+11433332341");

                if (this.clientNumbersByVirtualNumber.length > 0)
                {
                    var divAccordion = $("<div></div>");
                    divAccordion.attr("id", "callsClientsContainer");
                    divAccordion.addClass("panel-group panel-group-primary");
                    divAccordion.css({ "display": "block", "margin-top": "20px" });
                    this.BodyContent.append(divAccordion);

                    for (var i = 0; i < this.clientNumbersByVirtualNumber.length; i++)
                    {
                        var divTab = $("<div></div>");
                        divTab.addClass("panel panel-default");

                        var headContainer = $("<div></div>");
                        headContainer.click((ev) => {
                            //$("#divContentBody_" + (i + 1) + " input[type='text']").eq(0).val("");
                        });
                        headContainer.addClass("panel-heading");

                        var h4Head = $("<h4></h4>");
                        h4Head.addClass("panel-title");

                        var hrefHead = $("<a></a>");
                        hrefHead.addClass("accordion-toggle");
                        hrefHead.attr("data-toggle", "collapse");
                        hrefHead.attr("data-parent", "#callsClientsContainer");
                        hrefHead.attr("href", "#bodyTab_" + (i + 1));
                        hrefHead.attr("aria-expanded", "false");
                        hrefHead.html(this.clientNumbersByVirtualNumber[i]);

                        h4Head.append(hrefHead);

                        headContainer.append(h4Head);

                        var bodyContainer = $("<div></div>");
                        bodyContainer.attr("id", "bodyTab_" + (i + 1));
                        bodyContainer.addClass("accordion-body collapse");
                        bodyContainer.attr("aria-expanded", "false");

                        var divContent = $("<div></div>");
                        divContent.attr("id", "divContentBody_" + (i + 1));
                        divContent.attr("data-numberClient", this.clientNumbersByVirtualNumber[i]);
                        divContent.addClass("panel-body");

                        this.Accordion.Services.Local.GetVariableCategories(virtualNumber.Sid, (resultOk) => {

                            var indexData = this.indexBody + 1;
                            var divContentA1 = $("#divContentBody_" + indexData);

                            var numCli = divContentA1.attr("data-numberClient");

                            var selectText = new SelectText(this.Accordion, divContentA1, MainPanel.AssignValuesToVariables, numCli);
                            selectText.PanelSelect = Panel.Assign;
                            selectText.Categories = new Array<Category>();

                            $.each(resultOk, (ix, vx) => {
                                selectText.Categories.push(new Category(vx.Id, vx.Name, vx.Description, vx.Date));
                            });

                            this.indexBody += 1;

                            selectText.BuildControl(virtualNumber);

                            var selectorCategoryDefault = $("#bodyTab_" + indexData + " .contentSelectCategories .itemSelect");
                            $.each(selectorCategoryDefault, (ix, vx) => {
                                if ($(vx).html().toLowerCase() == "default") {
                                    var idCategory = $(vx).attr("idItem");
                                    selectText.selectValue(idCategory);
                                }
                            });

                            $("#loadControl_" + this.BodyContent.attr("data-index")).hide();

                        }, (resultError) => {
                            this.Accordion.Msg_warning("Error in get Categories.");
                            $("#loadControl_" + this.BodyContent.attr("data-index")).hide();
                        });

                        //divContent.html("3333");

                        ///////////

                        bodyContainer.append(divContent);

                        divTab.append(headContainer);
                        divTab.append(bodyContainer);

                        divAccordion.append(divTab);
                    }
                }

            }, (resultError) => {
                this.Accordion.Msg_warning("Error in get List active call.");
            });

        }

    }
}
