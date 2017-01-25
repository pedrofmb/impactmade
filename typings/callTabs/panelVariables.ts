module callTabs {

    export class panelVariables {

        public Parent: JQuery;
        public Element: JQuery;
        public SelectText: SelectText;
        public Category: Category;
        public PhoneNumber: string;

        private nameTextBoxPanel: JQuery;
        private typeTextBoxPanel: JQuery;
        private valuesTextBoxPanel: JQuery;
        private iconAddPanel: JQuery;
        private iconSavePanel: JQuery;
        private inputVariableName: JQuery;
        private selectType: JQuery;
        private inputPossiblesValues: JQuery;
        private divClose: JQuery;
        private divLoading: JQuery;

        private tabPanel: JQuery;
        private tabContentPanels: JQuery;
        private tabContentPanelManage: JQuery;
        private tabContentPanelAssign: JQuery;
        private tabContentPanelHistory: JQuery;
        private navTabPanels: JQuery;
        private navTabManage: JQuery;
        private navTabAssign: JQuery;
        private navTabHistory: JQuery;

        private blockControlsManage: JQuery;
        private blockContentManage: JQuery;
        private blockContentAssign: JQuery;

        private selectedVariable: Variable;

        constructor(selectCategory: SelectText, parent: JQuery)
        {
            this.SelectText = selectCategory;
            this.Parent = parent;
        }

        public BuildControl(panel: Panel = Panel.Manage)
        {
            var itema = $("#panelVariableIden");
            var itema1 = this.Parent.find(".panelVariables");
            if (itema1["0"] != null)
                itema1.remove();

            this.Element = $("<div></div>");
            this.Element.attr("id", "panelVariableIden");
            this.Element.addClass("panelVariables");
            this.Parent.append(this.Element);

            this.SelectText.Element.after(this.Element);
            this.Element.html("");

            this.tabPanel = $("<div></div>");
            this.tabPanel.addClass("tabs tabs-bottom");

            this.tabContentPanels = $("<div></div>");
            this.tabContentPanels.addClass("tab-content");

            this.tabContentPanelManage = $("<div></div>");
            this.tabContentPanelManage.attr("id", "managePanel");

            if (panel == Panel.Manage)
                this.tabContentPanelManage.addClass("tab-pane active");
            else
                this.tabContentPanelManage.addClass("tab-pane");

            this.tabContentPanelAssign = $("<div></div>");
            this.tabContentPanelAssign.attr("id", "manageAssign");

            if (panel == Panel.Assign)
                this.tabContentPanelAssign.addClass("tab-pane active");
            else
                this.tabContentPanelAssign.addClass("tab-pane");

            this.tabContentPanelHistory = $("<div></div>");
            this.tabContentPanelHistory.attr("id", "manageHistory");

            if (panel == Panel.History)
                this.tabContentPanelHistory.addClass("tab-pane active");
            else
                this.tabContentPanelHistory.addClass("tab-pane");

            this.tabContentPanels.append(this.tabContentPanelManage);
            this.tabContentPanels.append(this.tabContentPanelAssign);
            this.tabContentPanels.append(this.tabContentPanelHistory);

            this.buildPanelsContent(panel);

            this.navTabPanels = $("<ul></ul>");
            this.navTabPanels.css("display", "none");
            this.navTabPanels.addClass("nav nav-tabs");

            this.navTabManage = $("<li></li>");

            var hrefManageNavTab = $("<a></a>");
            hrefManageNavTab.attr("href", "#managePanel");
            hrefManageNavTab.attr("data-toggle", "tab");
            if (panel == Panel.Manage) {
                this.navTabManage.addClass("active");
                hrefManageNavTab.attr("aria-expanded", "true");
            } else {
                this.navTabManage.removeClass("active");
                hrefManageNavTab.attr("aria-expanded", "false");
            }

            hrefManageNavTab.html("Manage");
            hrefManageNavTab.click((ev) => { this.buildPanelsContent(Panel.Manage) });
            this.navTabManage.append(hrefManageNavTab);


            this.navTabAssign = $("<li></li>");

            var hrefAssignNavTab = $("<a></a>");
            hrefAssignNavTab.attr("href", "#manageAssign");
            hrefAssignNavTab.attr("data-toggle", "tab");
            if (panel == Panel.Assign) {
                this.navTabAssign.addClass("active");
                hrefAssignNavTab.attr("aria-expanded", "true");
            } else {
                this.navTabAssign.removeClass("active");
                hrefAssignNavTab.attr("aria-expanded", "false");
            }

            hrefAssignNavTab.html("Assign");
            hrefAssignNavTab.click((ev) => { this.buildPanelsContent(Panel.Assign) });
            this.navTabAssign.append(hrefAssignNavTab);

            this.navTabHistory = $("<li></li>");

            var hrefHistoryNavTab = $("<a></a>");
            hrefHistoryNavTab.attr("href", "#manageHistory");
            hrefHistoryNavTab.attr("data-toggle", "tab");

            if (panel == Panel.History) {
                this.navTabHistory.addClass("active");
                hrefHistoryNavTab.attr("aria-expanded", "true");
            } else {
                this.navTabHistory.removeClass("active");
                hrefHistoryNavTab.attr("aria-expanded", "false");
            }

            hrefHistoryNavTab.html("History");
            hrefHistoryNavTab.click((ev) => { this.buildPanelsContent(Panel.History) });
            this.navTabHistory.append(hrefHistoryNavTab);

            this.navTabPanels.append(this.navTabManage);
            this.navTabPanels.append(this.navTabAssign);
            this.navTabPanels.append(this.navTabHistory);

            this.tabPanel.append(this.tabContentPanels);
            this.tabPanel.append(this.navTabPanels);

            this.Element.append(this.tabPanel);
        }

        private buildPanelsContent(panel: Panel)
        {
            switch (panel)
            {
                case Panel.Manage :
                    this.tabContentPanelManage.html("");
                    this.SelectText.PanelSelect = Panel.Manage;

                    this.blockControlsManage = $("<div></div>");
                    this.blockControlsManage.addClass("manageControls");

                    this.blockContentManage = $("<div></div>");

                    this.nameTextBoxPanel = $("<div></div>");
                    this.inputVariableName = $("<input type='text' name='textBoxName' />");
                    this.inputVariableName.addClass("form-control");
                    this.inputVariableName.attr("placeholder", "Input a name");
                    this.nameTextBoxPanel.append(this.inputVariableName);

                    this.typeTextBoxPanel = $("<div></div>");

                    this.selectType = $("<select></select>");
                    this.selectType.addClass("form-control");
                    this.selectType.change((ev: JQueryEventObject) => {
                        var value = this.selectType.val();
                        if (value == 0) {
                            this.inputPossiblesValues.hide();
                            this.inputPossiblesValues.attr("placeholder", "Input a string value");
                        }
                        else if (value == 1) {
                            this.inputPossiblesValues.hide();
                            this.inputPossiblesValues.attr("placeholder", "Input a Numeric value");
                        }
                        else if (value == 2) {
                            this.inputPossiblesValues.show();
                            this.inputPossiblesValues.attr("placeholder", "Input value1,value2,value3,....");
                        }

                        this.inputPossiblesValues.focus();
                    });

                    for (var i = 0; i < 4; i++) {
                        var item;
                        switch (i) {
                            case varType.String:
                                item = $("<option></option>");
                                item.attr("value", i);
                                item.html("Type => String");
                                break;
                            case varType.Numeric:
                                item = $("<option></option>");
                                item.attr("value", i);
                                item.html("Type => Numeric");
                                break;
                            case varType.Options:
                                item = $("<option></option>");
                                item.attr("value", i);
                                item.html("Type => Options");
                                break;
                        }

                        this.selectType.append(item);
                    }
                    this.typeTextBoxPanel.append(this.selectType);

                    this.valuesTextBoxPanel = $("<div></div>");
                    this.inputPossiblesValues = $("<input type='text' name='textBoxValues'  />");
                    this.inputPossiblesValues.css({"width": "220px", "display" : "none"});
                    this.inputPossiblesValues.addClass("form-control");
                    this.inputPossiblesValues.attr("placeholder", "Input a string value");
                    this.valuesTextBoxPanel.append(this.inputPossiblesValues);

                    this.iconAddPanel = $("<div></div>");
                    this.iconAddPanel.addClass("iconVariableControl");
                    var iconPlus = $("<span></span>");
                    iconPlus.addClass("fa fa-plus");

                    //Add variable
                    this.iconAddPanel.click((ev: JQueryEventObject) => {

                        var variableName = this.inputVariableName.val();
                        var variableType = this.selectType.val();
                        var variableOptionsSeparatedByComma = this.inputPossiblesValues.val();

                        if (variableName != "" && ((variableType == varType.String.toString() || variableType == varType.Numeric.toString()) || (variableType == varType.Options.toString() && variableOptionsSeparatedByComma != ""))) {

                            this.inputVariableName.prop("disabled", true);
                            this.inputPossiblesValues.prop("disabled", true);
                            this.divLoading.css("display", "inline-block");
                            this.iconAddPanel.hide();
                            this.iconSavePanel.hide();

                            this.SelectText.Accordion.Services.Local.CreateVariable(this.Category.Id, variableName, variableType, variableOptionsSeparatedByComma, (resultOk) => {
                                this.iconAddPanel.css("display", "inline-block");
                                this.blockContentManage.html("<span class='glyphicon glyphicon-refresh glyphicon-refresh-animate'></span>&nbsp;Loading....");
                                this.getVariables(this.buildManageTable);
                                this.SelectText.Accordion.Msg_info("The variable " + variableName + " was added.");
                                this.inputVariableName.prop("disabled", false);
                                this.inputPossiblesValues.prop("disabled", false);
                                this.inputVariableName.val("");
                                this.inputPossiblesValues.val("");
                                this.selectType.val(0);

                            }, (resultError) => {
                                this.SelectText.Accordion.Msg_warning("Error " + resultError.responseText + ". Please. Try again.");
                                this.iconAddPanel.css("display", "inline-block");
                                this.divLoading.hide();
                                this.inputVariableName.prop("disabled", false);
                                this.inputPossiblesValues.prop("disabled", false);
                                this.inputVariableName.focus();
                            });
                        } else {
                            this.SelectText.Accordion.Msg_warning("Input a Variable name and options values");
                            this.inputVariableName.prop("disabled", false);
                            this.inputPossiblesValues.prop("disabled", false);
                            this.inputVariableName.focus();
                        }
                    });
                    this.iconAddPanel.append(iconPlus);

                    this.iconSavePanel = $("<div></div>");
                    this.iconSavePanel.addClass("iconVariableControl");
                    var iconSave = $("<span></span>");
                    iconSave.addClass("fa fa-save");
                    this.iconSavePanel.hide();

                    //save variable
                    this.iconSavePanel.click((ev: JQueryEventObject) => {
                        if (this.selectedVariable != null && this.selectedVariable != undefined) {
                            var name = this.inputVariableName.val();
                            var value = this.inputPossiblesValues.val();
                            var type = this.selectType.val();

                            this.divLoading.css("display", "inline-block");
                            this.iconSavePanel.hide();
                            this.divClose.hide();

                            this.SelectText.Accordion.Services.Local.UpdateVariable(this.selectedVariable.Id, name, type, value, (resultOk) => {
                                this.iconAddPanel.css("display", "inline-block");
                                this.blockContentManage.html("<span class='glyphicon glyphicon-refresh glyphicon-refresh-animate'></span>&nbsp;Loading....");
                                this.getVariables(this.buildManageTable);
                                this.iconSavePanel.hide();
                                this.divClose.hide();
                                this.inputVariableName.val("");
                                this.inputPossiblesValues.val("");
                                this.selectType.val(0);
                                this.selectedVariable = null;

                            }, (resultError) => {
                                this.SelectText.Accordion.Msg_warning("Error " + resultError.responseText + ". Please. Try again.");
                                this.divLoading.hide();
                                this.iconSavePanel.css("display", "inline-block");
                                this.divClose.css("display", "inline-block");
                                this.inputVariableName.focus();
                            });


                        } else {
                            this.SelectText.Accordion.Msg_warning("Select a variable.");
                        }
                    });

                    this.iconSavePanel.append(iconSave);

                    this.divClose = $("<div></div>");
                    this.divClose.addClass("iconVariableControl");
                    var iconClose = $("<span></span>");
                    iconClose.addClass("fa fa-close");
                    this.divClose.hide();

                    //cancel edit
                    this.divClose.click((ev: JQueryEventObject) => {
                        this.iconAddPanel.css("display", "inline-block");
                        this.iconSavePanel.hide();
                        this.divClose.hide();
                        $(".tableManage tbody tr").css("background-color", "");
                        this.selectedVariable = null;
                        this.inputVariableName.val("");
                        this.inputPossiblesValues.hide();
                        this.inputPossiblesValues.val("");
                        this.selectType.val(0);
                    });

                    this.divClose.append(iconClose);

                    this.divLoading = $("<div></div>");
                    this.divLoading.addClass("iconVariableControl");
                    var loading = $("<span></span>");
                    loading.addClass("fa fa-refresh fa-spin");
                    this.divLoading.hide();
                    this.divLoading.append(loading);

                    this.blockControlsManage.append(this.nameTextBoxPanel);
                    this.blockControlsManage.append(this.typeTextBoxPanel);
                    this.blockControlsManage.append(this.valuesTextBoxPanel);
                    this.blockControlsManage.append(this.iconAddPanel);
                    this.blockControlsManage.append(this.iconSavePanel);
                    this.blockControlsManage.append(this.divClose);
                    this.blockControlsManage.append(this.divLoading);


                    this.tabContentPanelManage.append(this.blockControlsManage);
                    this.tabContentPanelManage.append(this.blockContentManage);

                    this.inputVariableName.focus();
                    this.divLoading.css("display", "inline-block");
                    this.blockContentManage.html("<span class='glyphicon glyphicon-refresh glyphicon-refresh-animate'></span>&nbsp;Loading....");
                    this.getVariables(this.buildManageTable);

                    break;
                case Panel.Assign:
                    this.tabContentPanelAssign.html("");
                    this.SelectText.PanelSelect = Panel.Assign;

                    this.divLoading = $("<div></div>");
                    this.divLoading.addClass("iconVariableControl");
                    var loading = $("<span></span>");
                    loading.addClass("fa fa-refresh fa-spin");
                    this.divLoading.hide();
                    this.divLoading.append(loading);

                    this.tabContentPanelAssign.append(this.divLoading);

                    this.divLoading.css("display", "inline-block");
                    this.blockContentAssign = $("<div></div>");
                    this.blockContentAssign.html("<span class='glyphicon glyphicon-refresh glyphicon-refresh-animate'></span>&nbsp;Loading....");
                    this.tabContentPanelAssign.append(this.blockContentAssign);
                    this.getVariables(this.buildAssignVariables);
                    break;
                case Panel.History:
                    this.tabContentPanelHistory.html("");
                    this.SelectText.PanelSelect = Panel.History;


                    break;
            }
        }

        private buildHistoryVariables(variables: Array<Variable>, panelVariable: panelVariables): void
        {

        }

        private buildAssignVariables(variables: Array<Variable>, panelVariable: panelVariables): void
        {
            panelVariable.divLoading.hide();
            panelVariable.blockContentAssign.html("");
            panelVariable.blockContentAssign.css("margin-top", "10px");

            var table = $("<table></table>");
            table.addClass("table table-striped tableAssign");

            var tableId = "tableAssign_" + Math.floor((Math.random() * 100) + 1);
            table.attr("id", tableId);

            var thead = $("<thead></thead>");
            var trHead = $("<tr></tr>");

            var tdHead = $("<th></th>");
            tdHead.html("Variable");
            trHead.append(tdHead);
            thead.append(trHead);

            tdHead = $("<th></th>");
            tdHead.html("Type");
            trHead.append(tdHead);
            thead.append(trHead);

            tdHead = $("<th></th>");
            tdHead.html("Value");
            trHead.append(tdHead);
            thead.append(trHead);

            var tbody = $("<tbody></tbody>");

            for (var i = 0; i < variables.length; i++) {
                var trBody = $("<tr></tr>");
                trBody.addClass("trAssign");
                trBody.attr("data-name-variable", JSON.stringify(variables[i]));

                var tdBody = $("<td></td>");
                tdBody.html(variables[i].Name);
                trBody.append(tdBody);

                tdBody = $("<td></td>");
                switch (variables[i].VariableType) {
                    case varType.String:
                        tdBody.html("<span class='label label-default'>String</span>");
                        break;
                    case varType.Numeric:
                        tdBody.html("<span class='label label-warning'>Numeric</span>");
                        break;
                    case varType.Options:
                        tdBody.html("<span class='label label-success'>Options</span>");
                        break;
                }

                trBody.append(tdBody);

                tdBody = $("<td></td>");

                if (variables[i].VariableType == varType.Options) {
                    var select = $("<select></select>");
                    select.attr("rowVariable-" + variables[i].Id);
                    select.addClass("form-control mb-md");
                    select.css({ "width": "200px" });
                    select.append($("<option value='0'>--Select--</option>"));

                    for (var j = 0; j < variables[i].Options.length; j++) {
                        var option = $("<option></option>");
                        option.val(variables[i].Options[j].toString());
                        option.html(variables[i].Options[j].toString());
                        select.append(option);
                    }

                    tdBody.append(select);
                } else {
                    var input = $("<input />");
                    input.attr("rowVariable-" + variables[i].Id);
                    input.addClass("form-control");

                    if (variables[i].VariableType == varType.String)
                      input.attr("type", "text");
                    else if (variables[i].VariableType == varType.Numeric){
                      input.attr("type", "number");
                      //input.attr("oninput", "this.value = this.value.replace(/[^0-9.]/g, ''); this.value = this.value.replace(/(\..*)\./g, '$1');");
                    }

                    input.css({ "width": "200px" });
                    tdBody.append(input);
                }


                trBody.append(tdBody);

                tbody.append(trBody);
            }

            table.append(thead);
            table.append(tbody);


            var buttonSave = $("<button type='button'></button>");
            buttonSave.addClass("btn btn-primary mr-xs mb-sm");
            buttonSave.html("Save <span class='fa fa-floppy-o'>&nbsp;</span>");
            buttonSave.click((ev) => {
                //assign values to data
                var items = $("#"+tableId + " tr.trAssign");

                $.each(items, (ix, vx) => {
                    let item = $(vx).attr("data-name-variable");
                    if(item!=null)
                    {
                      let variableItem = JSON.parse(item) as Variable;
                      let data = $(vx).find("td>select,td>input[type='text'],td>input[type='number']");

                      panelVariable.SelectText.Accordion.Services.Local.UpdateOrCreateVariableValue(variableItem.Id,
                        panelVariable.PhoneNumber, encodeURI(data.val()), (success) => {
                          console.log(success);
                        }, (error) => {
                          console.log(error);
                        });
                    }
                });
            });

            panelVariable.blockContentAssign.append(buttonSave);

            panelVariable.blockContentAssign.append(table);

            //Load values in table
            var charsIds:string = "";
            var itemsTable = $("#"+tableId + " tr.trAssign");
            $.each(itemsTable, (ix, vx) => {
                let item = $(vx).attr("data-name-variable");
                if(item!=null)
                {
                  let variableItem = JSON.parse(item) as Variable;
                  let data = $(vx).find("td>select,td>input[type='text'],td>input[type='number']");
                  charsIds += variableItem.Id + ',';
                }
            });

            charsIds = charsIds.substr(0, charsIds.length -1);

            panelVariable.SelectText.Accordion.Services.Local.GetVariableValues(charsIds,panelVariable.PhoneNumber,
              (dataSucess:any) => {
                for(let i=0;i<dataSucess.length;i++){
                  let idVariable = dataSucess[i]["IdVariable"];
                  let valueVariable = dataSucess[i]["Value"];

                  let items = $("#"+tableId + " tr.trAssign");
                  $.each(items, (ix, vx) => {
                      let item = $(vx).attr("data-name-variable");
                      if(item!=null)
                      {
                        let variableItem = JSON.parse(item) as Variable;
                        if(idVariable == variableItem.Id)
                        {
                          let data = $(vx).find("td>select,td>input[type='text'],td>input[type='number']");
                          data.val(valueVariable);
                        }
                      }
                  });
                }
              }, (error) => {

              });

        }

        private buildManageTable(variables: Array<Variable>, panelVariable: panelVariables): void
        {
            panelVariable.divLoading.hide();
            panelVariable.blockContentManage.html("");

            panelVariable.blockContentManage.css("margin-top", "10px");

            var table = $("<table></table>");
            table.addClass("table table-striped tableManage");

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
            tdHead.html("Date");
            trHead.append(tdHead);
            thead.append(trHead);

            tdHead = $("<th></th>");
            tdHead.html("Type");
            trHead.append(tdHead);
            thead.append(trHead);

            tdHead = $("<th></th>");
            tdHead.html("Values");
            trHead.append(tdHead);
            thead.append(trHead);

            tdHead = $("<th></th>");
            tdHead.html("Options");
            trHead.append(tdHead);
            thead.append(trHead);


            var tbody = $("<tbody></tbody>");

            for (var i = 0; i < variables.length; i++)
            {
                var trBody = $("<tr></tr>");

                var tdBody = $("<td></td>");
                tdBody.html(variables[i].Id);
                trBody.append(tdBody);

                tdBody = $("<td></td>");
                tdBody.html(variables[i].Name);
                trBody.append(tdBody);

                tdBody = $("<td></td>");
                var date = new Date(variables[i].DateV);
                tdBody.html(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
                trBody.append(tdBody);

                tdBody = $("<td></td>");
                switch (variables[i].VariableType)
                {
                    case varType.String :
                        tdBody.html("String");
                        break;
                    case varType.Numeric:
                        tdBody.html("Numeric");
                        break;
                    case varType.Options:
                        tdBody.html("Options");
                        break;
                }

                trBody.append(tdBody);

                tdBody = $("<td></td>");
                tdBody.html(variables[i].Options.toString());
                trBody.append(tdBody);

                tdBody = $("<td></td>");
                tdBody.attr("data-id-variable", variables[i].Id);
                var iconEdit = $("<span></span>");
                iconEdit.addClass("iconActions");
                iconEdit.addClass("fa fa-edit");

                //Action Before Edit Variable
                iconEdit.click((ev) => {
                    $(".tableManage tbody tr").css("background-color", "");
                    $(ev.target.parentElement.parentElement).css("background-color", "cornsilk");
                    panelVariable.selectedVariable = panelVariable.searchVariableInArray(variables, $(ev.target.parentElement).attr("data-id-variable"));

                    panelVariable.inputVariableName.val(panelVariable.selectedVariable.Name);
                    panelVariable.inputPossiblesValues.val(panelVariable.selectedVariable.Options.toString());
                    panelVariable.selectType.val(panelVariable.selectedVariable.VariableType);

                    if (panelVariable.selectedVariable.VariableType == varType.Options) {
                        panelVariable.inputPossiblesValues.show();
                    } else {
                        panelVariable.inputPossiblesValues.hide();
                    }

                    panelVariable.iconSavePanel.css("display", "inline-block");
                    panelVariable.iconAddPanel.hide();
                    panelVariable.divClose.css("display", "inline-block");
                    panelVariable.inputVariableName.focus();
                });

                tdBody.append(iconEdit);

                var iconDelete = $("<span></span>");
                iconDelete.addClass("iconActions");
                iconDelete.addClass("fa fa-trash");

                //Delete a variable
                iconDelete.click((ev) => {
                    $(".tableManage tbody tr").css("background-color", "");
                    $(ev.target.parentElement.parentElement).css("background-color", "cornsilk");
                    panelVariable.selectedVariable = panelVariable.searchVariableInArray(variables, $(ev.target.parentElement).attr("data-id-variable"));
                    if (confirm("Doy you want delete this variable?")) {
                        panelVariable.divLoading.css("display", "inline-block");
                        panelVariable.SelectText.Accordion.Services.Local.DeleteVariable(panelVariable.selectedVariable.Id, (resultOK) => {
                            panelVariable.blockContentManage.html("<span class='glyphicon glyphicon-refresh glyphicon-refresh-animate'></span>&nbsp;Loading....");
                            panelVariable.getVariables(panelVariable.buildManageTable);
                        }, (resultError) => {
                            panelVariable.SelectText.Accordion.Msg_warning("Error " + resultError.responseText + ". Please. Try again.");
                            panelVariable.divLoading.hide();
                        });
                    } else {
                        panelVariable.selectedVariable = null;
                    }
                });

                tdBody.append(iconDelete);

                trBody.append(tdBody);



                tbody.append(trBody);
            }

            table.append(thead);
            table.append(tbody);

            panelVariable.blockContentManage.append(table);
            //panelVariable.tabContentPanelManage.append(this.blockContentManage);
        }

        private searchVariableInArray(variables: Array<Variable>, id: string): Variable {
            for (var i = 0; i < variables.length; i++) {
                if (variables[i].Id == id)
                    return variables[i];
            }
            return null;
        }

        private getVariables(func: (array: Array<Variable>, panelVariable: panelVariables) => void): void
        {
            this.SelectText.Accordion.Services.Local.GetVariables(this.Category.Id, (resultOk) => {
                var array = new Array<Variable>();
                $.each(resultOk, (ix, vx) => {
                    var data: Variable = new Variable(vx.Id, vx.VariableName, vx.Date, vx.VariableType, vx.VariableOptions);
                    array.push(data);
                });
                func(array, this);
            }, (resultError) => {
                this.SelectText.Accordion.Msg_warning("Ready to create variables.");
                this.divLoading.hide();
                this.blockContentManage.html("");
            });
        }
    }

    export enum varType {
        String,
        Numeric,
        Options
    }

    export enum Panel
    {
        Manage,
        Assign,
        History
    }

    export class Variable {

        public Id: string;
        public Name: string;
        public DateV: string;
        public VariableType: varType;
        public Options: Array<string>

        constructor(id: string, name: string, dateV: string, variableType: varType, options: Array<string>) {
            this.Id = id;
            this.Name = name;
            this.DateV = dateV;
            this.VariableType = variableType;
            this.Options = options;
        }
    }
}
