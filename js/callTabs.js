var callTabs;
(function (callTabs) {
    var Accordion = (function () {
        function Accordion(idElementParent) {
            this.VirtualNumbers = new Array();
            this.Msg_warning = eval("msg_warning");
            this.Msg_info = eval("msg_info");
            this.Services = eval("Services");
            this.Element = $("<div></div>");
            this.parent = $("#" + idElementParent);
            this.Tabs = new Array();
            this.parent.append(this.Element);
        }
        Accordion.prototype.GetVirtualNumber = function (Sid) {
            for (var i = 0; i < this.VirtualNumbers.length; i++) {
                if (this.VirtualNumbers[i].Sid == Sid)
                    return this.VirtualNumbers[i];
            }
            return null;
        };
        Accordion.prototype.buildAssignValuesToVariables = function () {
            var _this = this;
            this.Services.Local.GetVirtualNumbers(function (result) {
                if (result.length > 0) {
                    $.each(result, function (index, value) {
                        var tab = new callTabs.Tab(false, value.Sid, value.Number, (index + 1), _this.Element, _this);
                        _this.Tabs.push(tab);
                    });
                }
                $("#loadControl").remove();
            }, function (result) {
                _this.Msg_warning("Error in get virtual numbers.");
                $("#loadControl").remove();
            });
        };
        Accordion.prototype.LoadVirtualNumbers = function (panel) {
            var _this = this;
            this.Services.Local.GetVirtualNumbers(function (result) {
                if (result.length > 0) {
                    $.each(result, function (index, value) {
                        _this.VirtualNumbers.push(new VirtualNumber(value.Sid, value.Number));
                    });
                    if (panel == MainPanel.ManageVariables) {
                        var manageVariables = new callTabs.createVariables(_this.Element, _this);
                        manageVariables.BuildUIPanel();
                    }
                    else if (panel == MainPanel.AssignValuesToVariables) {
                        var assignerVariables = new callTabs.assignVariables(_this.Element, _this);
                        assignerVariables.BuildUIPanel();
                    }
                }
                $("#loadControl").remove();
            }, function (result) {
                _this.Msg_warning("Error in get virtual numbers.");
                $("#loadControl").remove();
            });
        };
        return Accordion;
    }());
    callTabs.Accordion = Accordion;
    (function (MainPanel) {
        MainPanel[MainPanel["ManageVariables"] = 0] = "ManageVariables";
        MainPanel[MainPanel["AssignValuesToVariables"] = 1] = "AssignValuesToVariables";
    })(callTabs.MainPanel || (callTabs.MainPanel = {}));
    var MainPanel = callTabs.MainPanel;
    var VirtualNumber = (function () {
        function VirtualNumber(sid, number) {
            this.Sid = sid;
            this.Number = number;
        }
        return VirtualNumber;
    }());
    callTabs.VirtualNumber = VirtualNumber;
})(callTabs || (callTabs = {}));
var callTabs;
(function (callTabs) {
    var assignVariables = (function () {
        function assignVariables(parent, accordion) {
            this.indexBody = 0;
            this.parent = parent;
            this.Accordion = accordion;
        }
        assignVariables.prototype.BuildUIPanel = function () {
            var _this = this;
            this.Element = $("<div></div>");
            var labelVirtualNumber = $("<label></label>");
            labelVirtualNumber.addClass("control-label");
            labelVirtualNumber.html("Virtual number:");
            var selectVirtualNumber = $("<select></select>");
            selectVirtualNumber.addClass("form-control input-lg mb-md");
            selectVirtualNumber.css({ "width": "200px", "margin-left": "20px", "display": "inline-block" });
            $.each(this.Accordion.VirtualNumbers, function (i, v) {
                var item = $("<option></option>");
                item.attr("value", v.Sid);
                item.html(v.Number);
                selectVirtualNumber.append(item);
            });
            selectVirtualNumber.change(function (ev) {
                var item = ev.target.value;
                var virtualNumber = _this.Accordion.GetVirtualNumber(item);
                _this.clientNumbersByVirtualNumber = new Array();
                _this.BuildPanelVariablesCreateUpdate(virtualNumber);
            });
            var space = $("<p></p>");
            this.Element.append(labelVirtualNumber);
            this.Element.append(selectVirtualNumber);
            this.Element.append(space);
            this.layoutBody = $("<div></div>");
            this.Element.append(this.layoutBody);
            this.parent.append(this.Element);
            selectVirtualNumber.trigger("change");
        };
        assignVariables.prototype.BuildPanelVariablesCreateUpdate = function (virtualNumber) {
            var _this = this;
            this.layoutBody.html("");
            this.BodyContent = $("<div></div>");
            this.layoutBody.append(this.BodyContent);
            var buttonRefresh = $("<button></button>");
            buttonRefresh.html("Refresh&nbsp;");
            buttonRefresh.attr("type", "button");
            buttonRefresh.addClass("mb-xs mt-xs mr-xs btn btn-primary");
            var buttonIcon = $("<i></i>");
            buttonIcon.addClass("fa fa-refresh");
            buttonRefresh.append(buttonIcon);
            buttonRefresh.click(function (ev) {
                _this.createAccordion(virtualNumber);
            });
            this.BodyContent.append(buttonRefresh);
            this.createAccordion(virtualNumber);
        };
        assignVariables.prototype.createAccordion = function (virtualNumber) {
            var _this = this;
            $("#callsClientsContainer").remove();
            this.clientNumbersByVirtualNumber = new Array();
            this.indexBody = 0;
            this.Accordion.Services.Local.ListRecentCalls(virtualNumber.Sid, "1", "10", function (resultOk) {
                $.each(resultOk, function (ix, vx) {
                    if (vx.IsIncoming) {
                        _this.clientNumbersByVirtualNumber.push(vx.From);
                    }
                    else {
                        _this.clientNumbersByVirtualNumber.push(vx.To);
                    }
                });
                if (_this.clientNumbersByVirtualNumber.length > 0) {
                    var divAccordion = $("<div></div>");
                    divAccordion.attr("id", "callsClientsContainer");
                    divAccordion.addClass("panel-group panel-group-primary");
                    divAccordion.css({ "display": "block", "margin-top": "20px" });
                    _this.BodyContent.append(divAccordion);
                    for (var i = 0; i < _this.clientNumbersByVirtualNumber.length; i++) {
                        var divTab = $("<div></div>");
                        divTab.addClass("panel panel-default");
                        var headContainer = $("<div></div>");
                        headContainer.click(function (ev) {
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
                        hrefHead.html(_this.clientNumbersByVirtualNumber[i]);
                        h4Head.append(hrefHead);
                        headContainer.append(h4Head);
                        var bodyContainer = $("<div></div>");
                        bodyContainer.attr("id", "bodyTab_" + (i + 1));
                        bodyContainer.addClass("accordion-body collapse");
                        bodyContainer.attr("aria-expanded", "false");
                        var divContent = $("<div></div>");
                        divContent.attr("id", "divContentBody_" + (i + 1));
                        divContent.attr("data-numberClient", _this.clientNumbersByVirtualNumber[i]);
                        divContent.addClass("panel-body");
                        _this.Accordion.Services.Local.GetVariableCategories(virtualNumber.Sid, function (resultOk) {
                            var indexData = _this.indexBody + 1;
                            var divContentA1 = $("#divContentBody_" + indexData);
                            var numCli = divContentA1.attr("data-numberClient");
                            var selectText = new callTabs.SelectText(_this.Accordion, divContentA1, callTabs.MainPanel.AssignValuesToVariables, numCli);
                            selectText.PanelSelect = callTabs.Panel.Assign;
                            selectText.Categories = new Array();
                            $.each(resultOk, function (ix, vx) {
                                selectText.Categories.push(new callTabs.Category(vx.Id, vx.Name, vx.Description, vx.Date));
                            });
                            _this.indexBody += 1;
                            selectText.BuildControl(virtualNumber);
                            var selectorCategoryDefault = $("#bodyTab_" + indexData + " .contentSelectCategories .itemSelect");
                            $.each(selectorCategoryDefault, function (ix, vx) {
                                if ($(vx).html().toLowerCase() == "default") {
                                    var idCategory = $(vx).attr("idItem");
                                    selectText.selectValue(idCategory);
                                }
                            });
                            $("#loadControl_" + _this.BodyContent.attr("data-index")).hide();
                        }, function (resultError) {
                            _this.Accordion.Msg_warning("Error in get Categories.");
                            $("#loadControl_" + _this.BodyContent.attr("data-index")).hide();
                        });
                        bodyContainer.append(divContent);
                        divTab.append(headContainer);
                        divTab.append(bodyContainer);
                        divAccordion.append(divTab);
                    }
                }
            }, function (resultError) {
                _this.Accordion.Msg_warning("Error in get List active call.");
            });
        };
        return assignVariables;
    }());
    callTabs.assignVariables = assignVariables;
})(callTabs || (callTabs = {}));
var callTabs;
(function (callTabs) {
    var createVariables = (function () {
        function createVariables(parent, accordion) {
            this.parent = parent;
            this.Accordion = accordion;
        }
        createVariables.prototype.BuildUIPanel = function () {
            var _this = this;
            this.Element = $("<div></div>");
            var labelVirtualNumber = $("<label></label>");
            labelVirtualNumber.addClass("control-label");
            labelVirtualNumber.html("Virtual number:");
            var selectVirtualNumber = $("<select></select>");
            selectVirtualNumber.addClass("form-control input-lg mb-md");
            selectVirtualNumber.css({ "width": "200px", "margin-left": "20px", "display": "inline-block" });
            $.each(this.Accordion.VirtualNumbers, function (i, v) {
                var item = $("<option></option>");
                item.attr("value", v.Sid);
                item.html(v.Number);
                selectVirtualNumber.append(item);
            });
            selectVirtualNumber.change(function (ev) {
                var item = ev.target.value;
                var virtualNumber = _this.Accordion.GetVirtualNumber(item);
                _this.BuildPanelVariablesCreateUpdate(virtualNumber);
            });
            var space = $("<p></p>");
            this.Element.append(labelVirtualNumber);
            this.Element.append(selectVirtualNumber);
            this.Element.append(space);
            this.layoutBody = $("<div></div>");
            this.SelectText = new callTabs.SelectText(this.Accordion, this.layoutBody, callTabs.MainPanel.ManageVariables);
            this.Element.append(this.layoutBody);
            this.parent.append(this.Element);
            selectVirtualNumber.trigger("change");
        };
        createVariables.prototype.BuildPanelVariablesCreateUpdate = function (virtualNumber) {
            var _this = this;
            this.layoutBody.html("");
            this.BodyContent = $("<div></div>");
            this.layoutBody.append(this.BodyContent);
            this.Accordion.Services.Local.GetVariableCategories(virtualNumber.Sid, function (resultOk) {
                _this.SelectText.Categories = new Array();
                $.each(resultOk, function (ix, vx) {
                    _this.SelectText.Categories.push(new callTabs.Category(vx.Id, vx.Name, vx.Description, vx.Date));
                });
                _this.SelectText.BuildControl(virtualNumber);
                $("#loadControl_" + _this.BodyContent.attr("data-index")).hide();
                var selectorCategoryDefault = $(".contentSelectCategories .itemSelect");
                $.each(selectorCategoryDefault, function (ix, vx) {
                    if ($(vx).html().toLowerCase() == "default") {
                        var idCategory = $(vx).attr("idItem");
                        _this.SelectText.selectValue(idCategory);
                    }
                });
            }, function (resultError) {
                _this.Accordion.Msg_warning("Error in get Categories.");
                $("#loadControl_" + _this.BodyContent.attr("data-index")).hide();
            });
        };
        return createVariables;
    }());
    callTabs.createVariables = createVariables;
})(callTabs || (callTabs = {}));
var callTabs;
(function (callTabs) {
    var panelVariables = (function () {
        function panelVariables(selectCategory, parent) {
            this.SelectText = selectCategory;
            this.Parent = parent;
        }
        panelVariables.prototype.BuildControl = function (panel) {
            var _this = this;
            if (panel === void 0) { panel = Panel.Manage; }
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
            }
            else {
                this.navTabManage.removeClass("active");
                hrefManageNavTab.attr("aria-expanded", "false");
            }
            hrefManageNavTab.html("Manage");
            hrefManageNavTab.click(function (ev) { _this.buildPanelsContent(Panel.Manage); });
            this.navTabManage.append(hrefManageNavTab);
            this.navTabAssign = $("<li></li>");
            var hrefAssignNavTab = $("<a></a>");
            hrefAssignNavTab.attr("href", "#manageAssign");
            hrefAssignNavTab.attr("data-toggle", "tab");
            if (panel == Panel.Assign) {
                this.navTabAssign.addClass("active");
                hrefAssignNavTab.attr("aria-expanded", "true");
            }
            else {
                this.navTabAssign.removeClass("active");
                hrefAssignNavTab.attr("aria-expanded", "false");
            }
            hrefAssignNavTab.html("Assign");
            hrefAssignNavTab.click(function (ev) { _this.buildPanelsContent(Panel.Assign); });
            this.navTabAssign.append(hrefAssignNavTab);
            this.navTabHistory = $("<li></li>");
            var hrefHistoryNavTab = $("<a></a>");
            hrefHistoryNavTab.attr("href", "#manageHistory");
            hrefHistoryNavTab.attr("data-toggle", "tab");
            if (panel == Panel.History) {
                this.navTabHistory.addClass("active");
                hrefHistoryNavTab.attr("aria-expanded", "true");
            }
            else {
                this.navTabHistory.removeClass("active");
                hrefHistoryNavTab.attr("aria-expanded", "false");
            }
            hrefHistoryNavTab.html("History");
            hrefHistoryNavTab.click(function (ev) { _this.buildPanelsContent(Panel.History); });
            this.navTabHistory.append(hrefHistoryNavTab);
            this.navTabPanels.append(this.navTabManage);
            this.navTabPanels.append(this.navTabAssign);
            this.navTabPanels.append(this.navTabHistory);
            this.tabPanel.append(this.tabContentPanels);
            this.tabPanel.append(this.navTabPanels);
            this.Element.append(this.tabPanel);
        };
        panelVariables.prototype.buildPanelsContent = function (panel) {
            var _this = this;
            switch (panel) {
                case Panel.Manage:
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
                    this.selectType.change(function (ev) {
                        var value = _this.selectType.val();
                        if (value == 0) {
                            _this.inputPossiblesValues.hide();
                            _this.inputPossiblesValues.attr("placeholder", "Input a string value");
                        }
                        else if (value == 1) {
                            _this.inputPossiblesValues.hide();
                            _this.inputPossiblesValues.attr("placeholder", "Input a Numeric value");
                        }
                        else if (value == 2) {
                            _this.inputPossiblesValues.show();
                            _this.inputPossiblesValues.attr("placeholder", "Input value1,value2,value3,....");
                        }
                        _this.inputPossiblesValues.focus();
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
                    this.inputPossiblesValues.css({ "width": "220px", "display": "none" });
                    this.inputPossiblesValues.addClass("form-control");
                    this.inputPossiblesValues.attr("placeholder", "Input a string value");
                    this.valuesTextBoxPanel.append(this.inputPossiblesValues);
                    this.iconAddPanel = $("<div></div>");
                    this.iconAddPanel.addClass("iconVariableControl");
                    var iconPlus = $("<span></span>");
                    iconPlus.addClass("fa fa-plus");
                    this.iconAddPanel.click(function (ev) {
                        var variableName = _this.inputVariableName.val();
                        var variableType = _this.selectType.val();
                        var variableOptionsSeparatedByComma = _this.inputPossiblesValues.val();
                        if (variableName != "" && ((variableType == varType.String.toString() || variableType == varType.Numeric.toString()) || (variableType == varType.Options.toString() && variableOptionsSeparatedByComma != ""))) {
                            _this.inputVariableName.prop("disabled", true);
                            _this.inputPossiblesValues.prop("disabled", true);
                            _this.divLoading.css("display", "inline-block");
                            _this.iconAddPanel.hide();
                            _this.iconSavePanel.hide();
                            _this.SelectText.Accordion.Services.Local.CreateVariable(_this.Category.Id, variableName, variableType, variableOptionsSeparatedByComma, function (resultOk) {
                                _this.iconAddPanel.css("display", "inline-block");
                                _this.blockContentManage.html("<span class='glyphicon glyphicon-refresh glyphicon-refresh-animate'></span>&nbsp;Loading....");
                                _this.getVariables(_this.buildManageTable);
                                _this.SelectText.Accordion.Msg_info("The variable " + variableName + " was added.");
                                _this.inputVariableName.prop("disabled", false);
                                _this.inputPossiblesValues.prop("disabled", false);
                                _this.inputVariableName.val("");
                                _this.inputPossiblesValues.val("");
                                _this.selectType.val(0);
                            }, function (resultError) {
                                _this.SelectText.Accordion.Msg_warning("Error " + resultError.responseText + ". Please. Try again.");
                                _this.iconAddPanel.css("display", "inline-block");
                                _this.divLoading.hide();
                                _this.inputVariableName.prop("disabled", false);
                                _this.inputPossiblesValues.prop("disabled", false);
                                _this.inputVariableName.focus();
                            });
                        }
                        else {
                            _this.SelectText.Accordion.Msg_warning("Input a Variable name and options values");
                            _this.inputVariableName.prop("disabled", false);
                            _this.inputPossiblesValues.prop("disabled", false);
                            _this.inputVariableName.focus();
                        }
                    });
                    this.iconAddPanel.append(iconPlus);
                    this.iconSavePanel = $("<div></div>");
                    this.iconSavePanel.addClass("iconVariableControl");
                    var iconSave = $("<span></span>");
                    iconSave.addClass("fa fa-save");
                    this.iconSavePanel.hide();
                    this.iconSavePanel.click(function (ev) {
                        if (_this.selectedVariable != null && _this.selectedVariable != undefined) {
                            var name = _this.inputVariableName.val();
                            var value = _this.inputPossiblesValues.val();
                            var type = _this.selectType.val();
                            _this.divLoading.css("display", "inline-block");
                            _this.iconSavePanel.hide();
                            _this.divClose.hide();
                            _this.SelectText.Accordion.Services.Local.UpdateVariable(_this.selectedVariable.Id, name, type, value, function (resultOk) {
                                _this.iconAddPanel.css("display", "inline-block");
                                _this.blockContentManage.html("<span class='glyphicon glyphicon-refresh glyphicon-refresh-animate'></span>&nbsp;Loading....");
                                _this.getVariables(_this.buildManageTable);
                                _this.iconSavePanel.hide();
                                _this.divClose.hide();
                                _this.inputVariableName.val("");
                                _this.inputPossiblesValues.val("");
                                _this.selectType.val(0);
                                _this.selectedVariable = null;
                            }, function (resultError) {
                                _this.SelectText.Accordion.Msg_warning("Error " + resultError.responseText + ". Please. Try again.");
                                _this.divLoading.hide();
                                _this.iconSavePanel.css("display", "inline-block");
                                _this.divClose.css("display", "inline-block");
                                _this.inputVariableName.focus();
                            });
                        }
                        else {
                            _this.SelectText.Accordion.Msg_warning("Select a variable.");
                        }
                    });
                    this.iconSavePanel.append(iconSave);
                    this.divClose = $("<div></div>");
                    this.divClose.addClass("iconVariableControl");
                    var iconClose = $("<span></span>");
                    iconClose.addClass("fa fa-close");
                    this.divClose.hide();
                    this.divClose.click(function (ev) {
                        _this.iconAddPanel.css("display", "inline-block");
                        _this.iconSavePanel.hide();
                        _this.divClose.hide();
                        $(".tableManage tbody tr").css("background-color", "");
                        _this.selectedVariable = null;
                        _this.inputVariableName.val("");
                        _this.inputPossiblesValues.hide();
                        _this.inputPossiblesValues.val("");
                        _this.selectType.val(0);
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
        };
        panelVariables.prototype.buildHistoryVariables = function (variables, panelVariable) {
        };
        panelVariables.prototype.buildAssignVariables = function (variables, panelVariable) {
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
                }
                else {
                    var input = $("<input />");
                    input.attr("rowVariable-" + variables[i].Id);
                    input.addClass("form-control");
                    if (variables[i].VariableType == varType.String)
                        input.attr("type", "text");
                    else if (variables[i].VariableType == varType.Numeric) {
                        input.attr("type", "number");
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
            buttonSave.click(function (ev) {
                var items = $("#" + tableId + " tr.trAssign");
                $.each(items, function (ix, vx) {
                    var item = $(vx).attr("data-name-variable");
                    if (item != null) {
                        var variableItem = JSON.parse(item);
                        var data = $(vx).find("td>select,td>input[type='text'],td>input[type='number']");
                        panelVariable.SelectText.Accordion.Services.Local.UpdateOrCreateVariableValue(variableItem.Id, panelVariable.PhoneNumber, encodeURI(data.val()), function (success) {
                            console.log(success);
                        }, function (error) {
                            console.log(error);
                        });
                    }
                });
            });
            panelVariable.blockContentAssign.append(buttonSave);
            panelVariable.blockContentAssign.append(table);
            var charsIds = "";
            var itemsTable = $("#" + tableId + " tr.trAssign");
            $.each(itemsTable, function (ix, vx) {
                var item = $(vx).attr("data-name-variable");
                if (item != null) {
                    var variableItem = JSON.parse(item);
                    var data = $(vx).find("td>select,td>input[type='text'],td>input[type='number']");
                    charsIds += variableItem.Id + ',';
                }
            });
            charsIds = charsIds.substr(0, charsIds.length - 1);
            panelVariable.SelectText.Accordion.Services.Local.GetVariableValues(charsIds, panelVariable.PhoneNumber, function (dataSucess) {
                var _loop_1 = function(i_1) {
                    var idVariable = dataSucess[i_1]["IdVariable"];
                    var valueVariable = dataSucess[i_1]["Value"];
                    var items = $("#" + tableId + " tr.trAssign");
                    $.each(items, function (ix, vx) {
                        var item = $(vx).attr("data-name-variable");
                        if (item != null) {
                            var variableItem = JSON.parse(item);
                            if (idVariable == variableItem.Id) {
                                var data = $(vx).find("td>select,td>input[type='text'],td>input[type='number']");
                                data.val(valueVariable);
                            }
                        }
                    });
                };
                for (var i_1 = 0; i_1 < dataSucess.length; i_1++) {
                    _loop_1(i_1);
                }
            }, function (error) {
            });
        };
        panelVariables.prototype.buildManageTable = function (variables, panelVariable) {
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
            for (var i = 0; i < variables.length; i++) {
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
                switch (variables[i].VariableType) {
                    case varType.String:
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
                iconEdit.click(function (ev) {
                    $(".tableManage tbody tr").css("background-color", "");
                    $(ev.target.parentElement.parentElement).css("background-color", "cornsilk");
                    panelVariable.selectedVariable = panelVariable.searchVariableInArray(variables, $(ev.target.parentElement).attr("data-id-variable"));
                    panelVariable.inputVariableName.val(panelVariable.selectedVariable.Name);
                    panelVariable.inputPossiblesValues.val(panelVariable.selectedVariable.Options.toString());
                    panelVariable.selectType.val(panelVariable.selectedVariable.VariableType);
                    if (panelVariable.selectedVariable.VariableType == varType.Options) {
                        panelVariable.inputPossiblesValues.show();
                    }
                    else {
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
                iconDelete.click(function (ev) {
                    $(".tableManage tbody tr").css("background-color", "");
                    $(ev.target.parentElement.parentElement).css("background-color", "cornsilk");
                    panelVariable.selectedVariable = panelVariable.searchVariableInArray(variables, $(ev.target.parentElement).attr("data-id-variable"));
                    if (confirm("Doy you want delete this variable?")) {
                        panelVariable.divLoading.css("display", "inline-block");
                        panelVariable.SelectText.Accordion.Services.Local.DeleteVariable(panelVariable.selectedVariable.Id, function (resultOK) {
                            panelVariable.blockContentManage.html("<span class='glyphicon glyphicon-refresh glyphicon-refresh-animate'></span>&nbsp;Loading....");
                            panelVariable.getVariables(panelVariable.buildManageTable);
                        }, function (resultError) {
                            panelVariable.SelectText.Accordion.Msg_warning("Error " + resultError.responseText + ". Please. Try again.");
                            panelVariable.divLoading.hide();
                        });
                    }
                    else {
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
        };
        panelVariables.prototype.searchVariableInArray = function (variables, id) {
            for (var i = 0; i < variables.length; i++) {
                if (variables[i].Id == id)
                    return variables[i];
            }
            return null;
        };
        panelVariables.prototype.getVariables = function (func) {
            var _this = this;
            this.SelectText.Accordion.Services.Local.GetVariables(this.Category.Id, function (resultOk) {
                var array = new Array();
                $.each(resultOk, function (ix, vx) {
                    var data = new Variable(vx.Id, vx.VariableName, vx.Date, vx.VariableType, vx.VariableOptions);
                    array.push(data);
                });
                func(array, _this);
            }, function (resultError) {
                _this.SelectText.Accordion.Msg_warning("Ready to create variables.");
                _this.divLoading.hide();
                _this.blockContentManage.html("");
            });
        };
        return panelVariables;
    }());
    callTabs.panelVariables = panelVariables;
    (function (varType) {
        varType[varType["String"] = 0] = "String";
        varType[varType["Numeric"] = 1] = "Numeric";
        varType[varType["Options"] = 2] = "Options";
    })(callTabs.varType || (callTabs.varType = {}));
    var varType = callTabs.varType;
    (function (Panel) {
        Panel[Panel["Manage"] = 0] = "Manage";
        Panel[Panel["Assign"] = 1] = "Assign";
        Panel[Panel["History"] = 2] = "History";
    })(callTabs.Panel || (callTabs.Panel = {}));
    var Panel = callTabs.Panel;
    var Variable = (function () {
        function Variable(id, name, dateV, variableType, options) {
            this.Id = id;
            this.Name = name;
            this.DateV = dateV;
            this.VariableType = variableType;
            this.Options = options;
        }
        return Variable;
    }());
    callTabs.Variable = Variable;
})(callTabs || (callTabs = {}));
var callTabs;
(function (callTabs) {
    (function (actionButton) {
        actionButton[actionButton["New"] = 0] = "New";
        actionButton[actionButton["Update"] = 1] = "Update";
    })(callTabs.actionButton || (callTabs.actionButton = {}));
    var actionButton = callTabs.actionButton;
    var SelectText = (function () {
        function SelectText(accordion, parent, panelPage, numberClient) {
            if (numberClient === void 0) { numberClient = ""; }
            this.Accordion = accordion;
            this.Parent = parent;
            this.PanelPage = panelPage;
            this.Element = $("<div></div>");
            this.Element.addClass("selectContentText");
            this.Categories = new Array();
            this.ManageVariables = new callTabs.panelVariables(this, this.Parent);
            this.ManageVariables.PhoneNumber = numberClient;
        }
        SelectText.prototype.BuildControl = function (virtualNumber) {
            var _this = this;
            this.SelectedCategory = null;
            this.Parent.append(this.Element);
            this.Element.html("");
            var labelCategory = $("<label></label>");
            labelCategory.addClass("control-label");
            labelCategory.css({ "display": "inline-block", "margin-right": "10px" });
            labelCategory.html("Category:");
            var divSelectControl = $("<div></div>");
            divSelectControl.addClass("selectControl");
            this.divDropDawn = $("<div></div>");
            this.divDropDawn.addClass("icSelect iconControl");
            this.divAdd = $("<div></div>");
            this.divAdd.addClass("icSelect iconAddControl");
            this.divSave = $("<div></div>");
            this.divSave.addClass("icSelect iconSaveControl");
            this.divClose = $("<div></div>");
            this.divClose.addClass("icSelect iconCloseControl");
            this.divLoading = $("<div></div>");
            this.divLoading.addClass("panelLoading");
            this.divEdit = $("<div></div>");
            this.divEdit.addClass("icSelect iconEditControl");
            this.divDelete = $("<div></div>");
            this.divDelete.addClass("icSelect iconDeleteControl");
            this.divDescription = $("<div></div>");
            this.divDescription.addClass("descriptionCategory");
            this.textDescriptionControl = $("<input type='text' />");
            this.textDescriptionControl.attr("placeHolder", "Write a description");
            this.divDescription.append(this.textDescriptionControl);
            var icon = $("<span></span>");
            icon.addClass("fa fa-caret-down");
            this.divDropDawn.append(icon);
            this.divDropDawn.click(function (ev) {
                _this.fillSelectText();
                _this.openSelect();
            });
            var iconPlus = $("<span></span>");
            iconPlus.addClass("fa fa-plus");
            var hrefIconPlus = $("<a></a>");
            hrefIconPlus.attr("data-toggle", "tooltip");
            hrefIconPlus.attr("href", "#");
            hrefIconPlus.attr("title", "Add category");
            hrefIconPlus.append(iconPlus);
            this.divAdd.append(hrefIconPlus);
            this.divAdd.click(function (ev) {
                _this.actionButton = actionButton.New;
                _this.divDropDawn.css("display", "none");
                _this.divAdd.css("display", "none");
                _this.divEdit.css("display", "none");
                _this.divDelete.css("display", "none");
                _this.textControl.val("");
                _this.textControl.attr("placeHolder", "Write a new category");
                _this.textControl.focus();
                _this.divSave.css("display", "inline-block");
                _this.divClose.css("display", "inline-block");
                _this.divDescription.css("display", "inline-block");
                _this.contentCategories.slideUp();
            });
            var iconSave = $("<span></span>");
            iconSave.addClass("fa fa-save");
            this.divSave.append(iconSave);
            this.divSave.click(function (ev) {
                var text = _this.textControl.val();
                var description = _this.textDescriptionControl.val();
                if (text != "" && description != "") {
                    _this.divSave.css("display", "none");
                    _this.divClose.css("display", "none");
                    _this.divLoading.css("display", "inline-block");
                    if (_this.actionButton == actionButton.New) {
                        _this.Accordion.Services.Local.CreateVariableCategory(virtualNumber.Sid, text, description, function (resultOk) {
                            _this.Accordion.Msg_info("The category " + text + " was added.");
                            _this.divClose.trigger("click");
                            _this.SelectedCategory = new Category(resultOk, text, description);
                            _this.Categories.push(_this.SelectedCategory);
                            _this.selectValue(resultOk);
                            _this.fillSelectText();
                            _this.actionButton = null;
                        }, function (resultError) {
                            _this.divSave.css("display", "inline-block");
                            _this.divClose.css("display", "inline-block");
                            _this.Accordion.Msg_warning("Error " + resultError + ". Please. Try again.");
                        });
                    }
                    else if (_this.actionButton == actionButton.Update) {
                        _this.Accordion.Services.Local.UpdateVariableCategory(_this.SelectedCategory.Id, text, description, function (resultOk) {
                            _this.Accordion.Msg_info("The category " + text + " was updated.");
                            _this.divClose.trigger("click");
                            var element = _this.searchElement(_this.SelectedCategory.Id);
                            element.Name = _this.SelectedCategory.Name = text;
                            element.Description = _this.SelectedCategory.Description = description;
                            _this.selectValue(_this.SelectedCategory.Id);
                            _this.fillSelectText();
                            _this.actionButton = null;
                        }, function (resultError) {
                            _this.divSave.css("display", "inline-block");
                            _this.divClose.css("display", "inline-block");
                            _this.Accordion.Msg_warning("Error " + resultError + ". Please. Try again.");
                        });
                    }
                }
                else {
                    _this.textControl.focus();
                    _this.Accordion.Msg_warning("Please. Write a category name and description.");
                }
            });
            var iconClose = $("<span></span>");
            iconClose.addClass("fa fa-close");
            this.divClose.append(iconClose);
            this.divClose.click(function (ev) {
                _this.divSave.css("display", "none");
                _this.divClose.css("display", "none");
                _this.divLoading.css("display", "none");
                _this.divDescription.css("display", "none");
                _this.textControl.attr("placeHolder", "-- Select o type a category --");
                _this.textControl.focus();
                _this.divDropDawn.css("display", "inline-block");
                _this.divAdd.css("display", "inline-block");
                if (_this.actionButton == actionButton.New) {
                    _this.divEdit.css("display", "none");
                    _this.divDelete.css("display", "none");
                }
                else if (_this.actionButton == actionButton.Update) {
                    _this.divEdit.css("display", "inline-block");
                    _this.divDelete.css("display", "inline-block");
                }
                _this.actionButton = null;
                _this.contentCategories.slideUp();
            });
            var iconEdit = $("<span></span>");
            iconEdit.addClass("fa fa-edit");
            this.divEdit.append(iconEdit);
            this.divEdit.click(function (ev) {
                if (_this.SelectedCategory != null) {
                    _this.actionButton = actionButton.Update;
                    _this.divClose.css("display", "inline-block");
                    _this.divDescription.css("display", "inline-block");
                    _this.divSave.css("display", "inline-block");
                    _this.textControl.val(_this.SelectedCategory.Name);
                    _this.textDescriptionControl.val(_this.SelectedCategory.Description);
                    _this.divAdd.css("display", "none");
                    _this.divEdit.css("display", "none");
                    _this.divLoading.css("display", "none");
                    _this.divDelete.css("display", "none");
                    _this.divDropDawn.css("display", "none");
                    _this.textControl.focus();
                }
                else {
                    _this.Accordion.Msg_warning("Please. Select a category.");
                    _this.textControl.focus();
                }
            });
            var iconDelete = $("<span></span>");
            iconDelete.addClass("fa fa-trash");
            this.divDelete.append(iconDelete);
            this.divDelete.click(function (ev) {
                if (_this.SelectedCategory != null) {
                    if (confirm("Do you confirm delete this category?")) {
                        _this.divLoading.css("display", "inline-block");
                        _this.Accordion.Services.Local.DeleteVariableCategory(_this.SelectedCategory.Id, function (resultOk) {
                            _this.divLoading.css("display", "none");
                            var index = _this.positionInCategories(_this.SelectedCategory.Id);
                            _this.Categories.splice((index), 1);
                            _this.SelectedCategory = null;
                            _this.textControl.val("");
                            _this.fillSelectText();
                            _this.divClose.trigger("click");
                            _this.divEdit.css("display", "none");
                            _this.divDelete.css("display", "none");
                        }, function (resultError) {
                            _this.Accordion.Msg_warning("Error " + resultError + ". Please. Try again.");
                        });
                    }
                }
                else {
                    _this.Accordion.Msg_warning("Please. Select a category.");
                    _this.textControl.focus();
                }
            });
            this.divLoading.html("Loading...");
            this.textControl = $("<input type='text' />");
            this.textControl.attr("placeHolder", "-- Select o type a category --");
            this.textControl.keyup(function (ev) {
                _this.SelectedCategory = null;
                _this.fillSelectText(_this.textControl.val());
                _this.contentCategories.show();
            });
            divSelectControl.append(this.textControl);
            this.Element.append(labelCategory);
            this.Element.append(divSelectControl);
            this.Element.append(this.divDropDawn);
            this.Element.append(this.divDescription);
            if (this.PanelPage == callTabs.MainPanel.ManageVariables) {
                this.Element.append(this.divAdd);
                this.Element.append(this.divSave);
                this.Element.append(this.divEdit);
                this.Element.append(this.divDelete);
                this.Element.append(this.divClose);
            }
            this.Element.append(this.divLoading);
            this.contentCategories = $("<div></div>");
            this.contentCategories.addClass("contentSelectCategories");
            this.contentCategories.css({ "top": (divSelectControl.height() + 9), "left": (76) });
            this.contentCategories.width(300);
            this.fillSelectText();
            this.Element.append(this.contentCategories);
            var too = $('[data-toggle="tooltip"]');
            too.tooltip();
        };
        SelectText.prototype.fillSelectText = function (filter) {
            var _this = this;
            if (this.actionButton == actionButton.New || this.actionButton == actionButton.Update)
                return;
            this.contentCategories.html("");
            var count = 0;
            if (filter != null) {
                for (var i = 0; i < this.Categories.length; i++) {
                    if (this.Categories[i].Name.toLowerCase().search(filter.toLowerCase()) != -1) {
                        var item = $("<div></div>");
                        item.click(function (ev) {
                            _this.selectValue($(ev.target).attr("idItem"));
                        });
                        item.addClass("itemSelect");
                        item.attr("idItem", this.Categories[i].Id);
                        item.html(this.Categories[i].Name);
                        this.contentCategories.append(item);
                        count++;
                    }
                }
            }
            else {
                for (var i = 0; i < this.Categories.length; i++) {
                    var item = $("<div></div>");
                    item.click(function (ev) {
                        _this.selectValue($(ev.target).attr("idItem"));
                    });
                    item.addClass("itemSelect");
                    item.attr("idItem", this.Categories[i].Id);
                    item.html(this.Categories[i].Name);
                    this.contentCategories.append(item);
                    count++;
                }
            }
            var heightPerItem = 30;
            var heightMax = 300;
            var heightContent = heightPerItem * count;
            this.contentCategories.css("height", heightContent > heightMax ? heightMax : heightContent);
        };
        SelectText.prototype.openSelect = function () {
            if (this.contentCategories.css("display") == "none") {
                this.contentCategories.slideDown();
            }
            else {
                this.contentCategories.slideUp();
            }
        };
        SelectText.prototype.selectValue = function (idItem) {
            if (idItem != "") {
                var item = this.searchElement(idItem);
                if (item != null) {
                    this.contentCategories.slideUp();
                    this.SelectedCategory = item;
                    this.divEdit.css("display", "inline-block");
                    this.divDelete.css("display", "inline-block");
                    this.textControl.val(item.Name);
                    this.ManageVariables.Category = this.SelectedCategory;
                    if (this.PanelSelect == undefined)
                        this.ManageVariables.BuildControl();
                    else
                        this.ManageVariables.BuildControl(this.PanelSelect);
                }
            }
        };
        SelectText.prototype.searchElement = function (idItem, expression) {
            for (var i = 0; i < this.Categories.length; i++) {
                if (idItem == this.Categories[i].Id)
                    return this.Categories[i];
            }
            return null;
        };
        SelectText.prototype.positionInCategories = function (idCategory) {
            for (var i = 0; i < this.Categories.length; i++) {
                if (idCategory == this.Categories[i].Id)
                    return i;
            }
            return -1;
        };
        return SelectText;
    }());
    callTabs.SelectText = SelectText;
    var Category = (function () {
        function Category(id, name, description, date) {
            this.Id = id;
            this.Name = name;
            this.Description = description;
            this.Date = date;
        }
        return Category;
    }());
    callTabs.Category = Category;
})(callTabs || (callTabs = {}));
var callTabs;
(function (callTabs) {
    var Tab = (function () {
        function Tab(status, sidNp, numberPhone, item, parent, accordion) {
            this.Status = status;
            this.SidNp = sidNp;
            this.NumberPhone = numberPhone;
            this.item = item;
            this.parent = parent;
            this.Accordion = accordion;
            this.buildTab();
        }
        Tab.prototype.buildTab = function () {
            var _this = this;
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
            this.BodyContent.append(this.layoutBody);
            this.BodyContent.attr("data-index", this.item);
            this.layoutBody.append("<div id='loadControl_" + this.BodyContent.attr("data-index") + "'><span class='glyphicon glyphicon-refresh glyphicon-refresh-animate'></span>&nbsp;Loading....</div>");
            var ctrlCheckContent = $("<div></div>");
            ctrlCheckContent.addClass("tabBarItem");
            var label1 = $("<label></label>");
            label1.addClass("col-md-10");
            this.ControlCheck = $("<input class='col-md-2' type='checkbox' style='width: 30px;'/>");
            this.ControlCheck.change(function (ev) {
                _this.BodyContent.slideToggle("slow", function (ec) {
                    $("#loadControl_" + _this.BodyContent.attr("data-index")).show();
                    _this.openTab();
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
        };
        Tab.prototype.UpdateCheckValue = function (value) {
            this.Status = value;
            this.Status ? this.ControlCheck.prop("checked", true) : this.ControlCheck.prop("checked", false);
        };
        Tab.prototype.openTab = function () {
            if (this.BodyContent.css("display") == "none") {
            }
            else {
                var itema = $("#panelVariableIden");
                if (itema["0"] != null)
                    itema.remove();
                this.getCategories();
            }
        };
        Tab.prototype.getCategories = function () {
            var _this = this;
            this.Accordion.Services.Local.GetVariableCategories(this.SidNp, function (resultOk) {
                _this.SelectText.Categories = new Array();
                $.each(resultOk, function (ix, vx) {
                    _this.SelectText.Categories.push(new callTabs.Category(vx.Id, vx.Name, vx.Description, vx.Date));
                });
                $("#loadControl_" + _this.BodyContent.attr("data-index")).hide();
            }, function (resultError) {
                _this.Accordion.Msg_warning("Error in get Categories.");
                $("#loadControl_" + _this.BodyContent.attr("data-index")).hide();
            });
        };
        return Tab;
    }());
    callTabs.Tab = Tab;
})(callTabs || (callTabs = {}));
