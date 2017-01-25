module callTabs {

    export enum actionButton {
        New,
        Update
    }

    export class SelectText
    {
        public Categories: Array<Category>;
        public Parent: JQuery;
        public Element: JQuery;
        public SelectedCategory: Category;
        public ManageVariables: panelVariables;
        public Accordion: Accordion;
        public PanelSelect: Panel;
        public PanelPage: MainPanel;

        private contentCategories: JQuery;
        private textControl: JQuery;
        private textDescriptionControl: JQuery;
        private actionButton: actionButton;
        private divAdd: JQuery;
        private divSave: JQuery;
        private divEdit: JQuery;
        private divDelete: JQuery;
        private divClose: JQuery;
        private divLoading: JQuery;
        private divDescription: JQuery;
        private divDropDawn: JQuery;

        constructor(accordion: Accordion, parent: JQuery, panelPage: MainPanel, numberClient: string = "")
        {
            this.Accordion = accordion;
            this.Parent = parent;
            this.PanelPage = panelPage;
            this.Element = $("<div></div>");
            this.Element.addClass("selectContentText");
            this.Categories = new Array<Category>();
            this.ManageVariables = new panelVariables(this, this.Parent);
            this.ManageVariables.PhoneNumber = numberClient;
        }

        public BuildControl(virtualNumber: VirtualNumber) {
            this.SelectedCategory = null;
            this.Parent.append(this.Element);
            this.Element.html("");

            var labelCategory = $("<label></label>");
            labelCategory.addClass("control-label");
            labelCategory.css({"display":"inline-block", "margin-right":"10px"});
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

            this.divDropDawn.click((ev: JQueryEventObject) => {
                this.fillSelectText();
                this.openSelect();
            });

            var iconPlus = $("<span></span>");
            iconPlus.addClass("fa fa-plus");
            var hrefIconPlus = $("<a></a>");
            hrefIconPlus.attr("data-toggle", "tooltip");
            hrefIconPlus.attr("href", "#");
            hrefIconPlus.attr("title", "Add category");
            hrefIconPlus.append(iconPlus)
            this.divAdd.append(hrefIconPlus);

            //Add Category
            this.divAdd.click((ev: JQueryEventObject) => {
                this.actionButton = actionButton.New;
                this.divDropDawn.css("display", "none");
                this.divAdd.css("display", "none");
                this.divEdit.css("display", "none");
                this.divDelete.css("display", "none");
                this.textControl.val("");
                this.textControl.attr("placeHolder", "Write a new category");
                this.textControl.focus();
                this.divSave.css("display", "inline-block");
                this.divClose.css("display", "inline-block");
                this.divDescription.css("display", "inline-block");
                this.contentCategories.slideUp();
            });

            var iconSave = $("<span></span>");
            iconSave.addClass("fa fa-save");
            this.divSave.append(iconSave);

            //Save Category
            this.divSave.click((ev: JQueryEventObject) => {
                var text = this.textControl.val();
                var description = this.textDescriptionControl.val();

                if (text != "" && description!="") {
                    this.divSave.css("display", "none");
                    this.divClose.css("display", "none");
                    this.divLoading.css("display", "inline-block");

                    if (this.actionButton == actionButton.New) {
                        this.Accordion.Services.Local.CreateVariableCategory(virtualNumber.Sid, text, description, (resultOk) => {
                            this.Accordion.Msg_info("The category " + text + " was added.");
                            this.divClose.trigger("click");
                            this.SelectedCategory = new Category(resultOk, text, description);
                            this.Categories.push(this.SelectedCategory);
                            this.selectValue(resultOk);
                            this.fillSelectText();
                            this.actionButton = null;
                        }, (resultError) => {
                            this.divSave.css("display", "inline-block");
                            this.divClose.css("display", "inline-block");
                            this.Accordion.Msg_warning("Error " + resultError + ". Please. Try again.");
                        });
                    }
                    else if (this.actionButton == actionButton.Update) {
                        this.Accordion.Services.Local.UpdateVariableCategory(this.SelectedCategory.Id, text, description, (resultOk) => {
                            this.Accordion.Msg_info("The category " + text + " was updated.");
                            this.divClose.trigger("click");
                            var element = this.searchElement(this.SelectedCategory.Id);
                            element.Name = this.SelectedCategory.Name = text;
                            element.Description = this.SelectedCategory.Description = description;
                            this.selectValue(this.SelectedCategory.Id);
                            this.fillSelectText();
                            this.actionButton = null;
                        }, (resultError) => {
                            this.divSave.css("display", "inline-block");
                            this.divClose.css("display", "inline-block");
                            this.Accordion.Msg_warning("Error " + resultError + ". Please. Try again.");
                        });
                    }

                } else {
                    this.textControl.focus();
                    this.Accordion.Msg_warning("Please. Write a category name and description.");
                }
            });

            var iconClose = $("<span></span>");
            iconClose.addClass("fa fa-close");
            this.divClose.append(iconClose);

            //Cancel Save
            this.divClose.click((ev: JQueryEventObject) => {

                this.divSave.css("display", "none");
                this.divClose.css("display", "none");
                this.divLoading.css("display", "none");
                this.divDescription.css("display", "none");
                this.textControl.attr("placeHolder", "-- Select o type a category --");
                this.textControl.focus();
                this.divDropDawn.css("display", "inline-block");
                this.divAdd.css("display", "inline-block");

                if (this.actionButton == actionButton.New) {
                    this.divEdit.css("display", "none");
                    this.divDelete.css("display", "none");
                }
                else if (this.actionButton == actionButton.Update) {
                    this.divEdit.css("display", "inline-block");
                    this.divDelete.css("display", "inline-block");
                }

                this.actionButton = null;
                this.contentCategories.slideUp();
            });

            var iconEdit = $("<span></span>");
            iconEdit.addClass("fa fa-edit");
            this.divEdit.append(iconEdit);

            //Edit Category
            this.divEdit.click((ev: JQueryEventObject) => {
                if (this.SelectedCategory != null) {
                    this.actionButton = actionButton.Update;
                    this.divClose.css("display", "inline-block");
                    this.divDescription.css("display", "inline-block");
                    this.divSave.css("display", "inline-block");
                    this.textControl.val(this.SelectedCategory.Name);
                    this.textDescriptionControl.val(this.SelectedCategory.Description);
                    this.divAdd.css("display", "none");
                    this.divEdit.css("display", "none");
                    this.divLoading.css("display", "none");
                    this.divDelete.css("display", "none");
                    this.divDropDawn.css("display", "none");
                    this.textControl.focus();
                } else {
                    this.Accordion.Msg_warning("Please. Select a category.");
                    this.textControl.focus();
                }
            });

            var iconDelete = $("<span></span>");
            iconDelete.addClass("fa fa-trash");
            this.divDelete.append(iconDelete);

            //Delete Category
            this.divDelete.click((ev: JQueryEventObject) => {
                if (this.SelectedCategory != null) {
                    if (confirm("Do you confirm delete this category?")) {
                        this.divLoading.css("display", "inline-block");
                        this.Accordion.Services.Local.DeleteVariableCategory(this.SelectedCategory.Id, (resultOk) => {
                            this.divLoading.css("display", "none");
                            var index = this.positionInCategories(this.SelectedCategory.Id);
                            this.Categories.splice((index), 1);
                            this.SelectedCategory = null;
                            this.textControl.val("");
                            this.fillSelectText();
                            this.divClose.trigger("click");
                            this.divEdit.css("display", "none");
                            this.divDelete.css("display", "none");

                        }, (resultError) => {
                            this.Accordion.Msg_warning("Error " + resultError + ". Please. Try again.");
                        });
                    }
                }
                else {
                    this.Accordion.Msg_warning("Please. Select a category.");
                    this.textControl.focus();
                }
            });

            this.divLoading.html("Loading...");

            this.textControl = $("<input type='text' />")
            this.textControl.attr("placeHolder", "-- Select o type a category --");

            this.textControl.keyup((ev: JQueryKeyEventObject) => {
                this.SelectedCategory = null;
                this.fillSelectText(this.textControl.val());
                this.contentCategories.show();
            });

            divSelectControl.append(this.textControl);

            this.Element.append(labelCategory);
            this.Element.append(divSelectControl);
            this.Element.append(this.divDropDawn);
            this.Element.append(this.divDescription);

            if (this.PanelPage == MainPanel.ManageVariables) {
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

            var too: any = $('[data-toggle="tooltip"]');
            too.tooltip();
        }

        private fillSelectText(filter?: string): void
        {
            if (this.actionButton == actionButton.New || this.actionButton == actionButton.Update) return;

            this.contentCategories.html("");
            var count = 0;

            if (filter != null) {
                //search(/blue/i);
                for (var i = 0; i < this.Categories.length; i++) {

                    if (this.Categories[i].Name.toLowerCase().search(filter.toLowerCase()) != -1)
                    {
                        var item = $("<div></div>");

                        item.click((ev: JQueryEventObject) => {
                            this.selectValue($(ev.target).attr("idItem"));
                        });

                        item.addClass("itemSelect");
                        item.attr("idItem", this.Categories[i].Id);
                        item.html(this.Categories[i].Name);
                        this.contentCategories.append(item);
                        count++;
                    }
                }
            } else {
                for (var i = 0; i < this.Categories.length; i++) {
                    var item = $("<div></div>");

                    item.click((ev: JQueryEventObject) => {
                        this.selectValue($(ev.target).attr("idItem"));
                    });

                    item.addClass("itemSelect");
                    item.attr("idItem", this.Categories[i].Id);
                    item.html(this.Categories[i].Name);
                    this.contentCategories.append(item);
                    count++
                }
            }

            var heightPerItem = 30;
            var heightMax = 300;
            var heightContent = heightPerItem * count;
            this.contentCategories.css("height" , heightContent > heightMax ? heightMax : heightContent);
        }

        private openSelect(): void
        {
            if (this.contentCategories.css("display") == "none") {
                this.contentCategories.slideDown();
            } else {
                this.contentCategories.slideUp();
            }
        }

        public selectValue(idItem: string): void{
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
        }

        private searchElement(idItem: string, expression?: string): Category {
            for (var i = 0; i < this.Categories.length; i++) {
                if (idItem == this.Categories[i].Id)
                    return this.Categories[i];
            }

            return null;
        }

        private positionInCategories(idCategory: string): number {
            for (var i = 0; i < this.Categories.length; i++) {
                if (idCategory == this.Categories[i].Id)
                    return i;
            }

            return -1;
        }
    }

    export class Category
    {
        public Id: string;
        public Name: string;
        public Description: string;
        public Date: string;

        constructor(id: string, name: string, description: string, date?: string)
        {
            this.Id = id;
            this.Name = name;
            this.Description = description;
            this.Date = date;
        }
    }
}