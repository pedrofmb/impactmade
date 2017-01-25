/// <reference path="../typings/definitions/jquery.d.ts" />
declare module callTabs {
    class Accordion {
        Tabs: Array<Tab>;
        Msg_warning: any;
        Msg_info: any;
        Services: any;
        Element: JQuery;
        VirtualNumbers: Array<VirtualNumber>;
        private parent;
        constructor(idElementParent: string);
        GetVirtualNumber(Sid: string): VirtualNumber;
        private buildAssignValuesToVariables();
        LoadVirtualNumbers(panel: MainPanel): void;
    }
    enum MainPanel {
        ManageVariables = 0,
        AssignValuesToVariables = 1,
    }
    class VirtualNumber {
        Sid: string;
        Number: string;
        constructor(sid: string, number: string);
    }
}
declare module callTabs {
    class assignVariables {
        Element: JQuery;
        Accordion: Accordion;
        BodyContent: JQuery;
        private parent;
        private layoutBody;
        private clientNumbersByVirtualNumber;
        private indexBody;
        constructor(parent: JQuery, accordion: Accordion);
        BuildUIPanel(): void;
        BuildPanelVariablesCreateUpdate(virtualNumber: VirtualNumber): void;
        private createAccordion(virtualNumber);
    }
}
declare module callTabs {
    class createVariables {
        Element: JQuery;
        Accordion: Accordion;
        SelectText: SelectText;
        BodyContent: JQuery;
        private parent;
        private layoutBody;
        constructor(parent: JQuery, accordion: Accordion);
        BuildUIPanel(): void;
        BuildPanelVariablesCreateUpdate(virtualNumber: VirtualNumber): void;
    }
}
declare module callTabs {
    class panelVariables {
        Parent: JQuery;
        Element: JQuery;
        SelectText: SelectText;
        Category: Category;
        PhoneNumber: string;
        private nameTextBoxPanel;
        private typeTextBoxPanel;
        private valuesTextBoxPanel;
        private iconAddPanel;
        private iconSavePanel;
        private inputVariableName;
        private selectType;
        private inputPossiblesValues;
        private divClose;
        private divLoading;
        private tabPanel;
        private tabContentPanels;
        private tabContentPanelManage;
        private tabContentPanelAssign;
        private tabContentPanelHistory;
        private navTabPanels;
        private navTabManage;
        private navTabAssign;
        private navTabHistory;
        private blockControlsManage;
        private blockContentManage;
        private blockContentAssign;
        private selectedVariable;
        constructor(selectCategory: SelectText, parent: JQuery);
        BuildControl(panel?: Panel): void;
        private buildPanelsContent(panel);
        private buildHistoryVariables(variables, panelVariable);
        private buildAssignVariables(variables, panelVariable);
        private buildManageTable(variables, panelVariable);
        private searchVariableInArray(variables, id);
        private getVariables(func);
    }
    enum varType {
        String = 0,
        Numeric = 1,
        Options = 2,
    }
    enum Panel {
        Manage = 0,
        Assign = 1,
        History = 2,
    }
    class Variable {
        Id: string;
        Name: string;
        DateV: string;
        VariableType: varType;
        Options: Array<string>;
        constructor(id: string, name: string, dateV: string, variableType: varType, options: Array<string>);
    }
}
declare module callTabs {
    enum actionButton {
        New = 0,
        Update = 1,
    }
    class SelectText {
        Categories: Array<Category>;
        Parent: JQuery;
        Element: JQuery;
        SelectedCategory: Category;
        ManageVariables: panelVariables;
        Accordion: Accordion;
        PanelSelect: Panel;
        PanelPage: MainPanel;
        private contentCategories;
        private textControl;
        private textDescriptionControl;
        private actionButton;
        private divAdd;
        private divSave;
        private divEdit;
        private divDelete;
        private divClose;
        private divLoading;
        private divDescription;
        private divDropDawn;
        constructor(accordion: Accordion, parent: JQuery, panelPage: MainPanel, numberClient?: string);
        BuildControl(virtualNumber: VirtualNumber): void;
        private fillSelectText(filter?);
        private openSelect();
        selectValue(idItem: string): void;
        private searchElement(idItem, expression?);
        private positionInCategories(idCategory);
    }
    class Category {
        Id: string;
        Name: string;
        Description: string;
        Date: string;
        constructor(id: string, name: string, description: string, date?: string);
    }
}
declare module callTabs {
    class Tab {
        Status: boolean;
        SidNp: string;
        NumberPhone: string;
        Element: JQuery;
        Bar: JQuery;
        BodyContent: JQuery;
        ControlCheck: JQuery;
        SelectText: SelectText;
        Accordion: Accordion;
        private item;
        private parent;
        private layoutBody;
        constructor(status: boolean, sidNp: string, numberPhone: string, item: number, parent: JQuery, accordion: Accordion);
        private buildTab();
        UpdateCheckValue(value: boolean): void;
        private openTab();
        private getCategories();
    }
}
