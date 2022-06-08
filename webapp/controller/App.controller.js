
    sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageBox",
        "sap/ui/core/Fragment",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "../model/formatter"

    ],
        /**
         * @param {typeof sap.ui.core.mvc.Controller} Controller
         */
        function (Controller, MessageBox, Fragment, Filter, FilterOperator, formatter) {
            "use strict";
    
            return Controller.extend("crud2.crud2.controller.App", {
                formatter: formatter,
                onSearch: function (oEvent) {
    
                    // build filter array
                    var aFilter = [];
                    var sQuery = oEvent.getParameter("query");
                    if (sQuery) {
                        aFilter.push(new Filter("Name", FilterOperator.Contains, sQuery));
                    }
    
                    // filter binding
                    var oList = this.getView().byId("Table");
                    var oBinding = oList.getBinding("items");
                    oBinding.filter(aFilter);
    
                },
    
    
                onInit: function () {
    
                    var oModel = this.getOwnerComponent().getModel();
                    var sPath = "/rtypeSet"; //Odata entity set path
                    var that = this;
    
                    //Do the call to BE and create the data binding model
                    oModel.read(sPath, {
                        success: function (oData) {
                            var sRequest = new sap.ui.model.json.JSONModel(oData.results);
                            that.getView().setModel(sRequest, "positionsTable2");
                        },
                        error: function (Error) { //In case of error show pop up 
                        }
                    });
    
                },
    
    
    
                onDelete: function (oEvent) {
                    
                    var oTable = this.getView().byId("Table");
                    var oSelectedItems = oTable.getSelectedItems();
                    var oModel = this.getOwnerComponent().getModel();
                    var oName = this.getView().byId("Table").getSelectedItem().getBindingContext("positionsTable2").getObject("Name");
                    var oMandt = this.getView().byId("Table").getSelectedItem().getBindingContext("positionsTable2").getObject("Mandt");
                    var sPath1 = `/rtypeSet(Mandt='${oMandt}',Name='${oName}')`;
                    if (oSelectedItems = true) {
                        oModel.remove(sPath1, {
                            success: function (odata) {
                                MessageBox.success("Deleted successfully!", {
                                    
                               
                                });
                               
                            },
                            error: function() {
                                MessageBox.error("Oops! Something wrong to Delete.");
                            }
                                
                        });
                        oModel.refresh(true);
                    } else {
                        MessageBox.warning("Please select a row to delete!"
                           
                        );
                    }
                },
    
    
                onCreate: function () {
                        this.getDialog().open()
                },
    
                getDialog: function () {
                    // create a fragment with dialog, and pass the selected data
                    if (!this.dialog) {
                        // This fragment can be instantiated from a controller as follows:
                        this.dialog = sap.ui.xmlfragment("idFragment", "crud2.crud2.view.fragment.Dialog", this);
                        //debugger;
                    }
                    //debugger;
                    return this.dialog;
                },
                closeDialog: function () {
                    this.getDialog().close()
                },
    
                onSave: function () {
    
                    var oModel = this.getOwnerComponent().getModel();
                   
                    var oName = sap.ui.getCore().byId("idFragment--idFirstName").getValue();
                    var oSurname = sap.ui.getCore().byId("idFragment--idLastName").getValue();
                    var oBranch = sap.ui.getCore().byId("idFragment--idBranch").getValue();
    
                    var oEntry = {
                        "Mandt": "800",
                        "Name": oName,
                        "Surname": oSurname,
                        "Branch": oBranch
                    }
                    
                    oModel.create(`/rtypeSet`, oEntry , {
                        success: function(odata) {
                          MessageBox.success("Created successfully!", {
                               
                            });
                            //oModel.refresh(true);
                        },
                        error: function(error) {
                            MessageBox.error("Error. Failed to create the Product! Please try again later,", {
                               
                            });
                        }
                    });
                    this.getDialog().close();
                    oModel.refresh(true);
    
                },
    
                onUpdate: function () {
                    // get selected data from table (reference of table)
    
                    var oTable = this.getView().byId("Table");
                    var oSelectedItems = oTable.getSelectedItems();
                    var oModel = this.getView().getModel();
    
    
                    var Name = this.getView().byId("Table").getSelectedItem().getBindingContext("positionsTable2").getObject("Name");
                    var Surname = this.getView().byId("Table").getSelectedItem().getBindingContext("positionsTable2").getObject("Surname");
                    var Branch = this.getView().byId("Table").getSelectedItem().getBindingContext("positionsTable2").getObject("Branch");
    
                    this.getDialog().open()
    
                    // get the reference of input fields of fragment and set the values
                    sap.ui.getCore().byId("idFragment--idFirstName").setValue(Name);
                    sap.ui.getCore().byId("idFragment--idLastName").setValue(Surname);
                    sap.ui.getCore().byId("idFragment--idBranch").setValue(Branch);
                },
                getDialog: function () {
                    // create a fragment with dialog, and pass the selected data
                    if (!this.dialog) {
                        // This fragment can be instantiated from a controller as follows:
                        this.dialog = sap.ui.xmlfragment("idFragment", "crud2.crud2.view.fragment.Dialog", this);
                        //debugger;
                    }
                    //debugger;
                    return this.dialog;
                },
                closeDialog: function () {
                    this.getDialog().close()
                },
    
                onSave1: function () {
    
                    var oModel = this.getView().getModel();
                    var oName = sap.ui.getCore().byId("idFragment--idFirstName").getValue();
                    var oSurname = sap.ui.getCore().byId("idFragment--idLastName").getValue();
                    var oBranch = sap.ui.getCore().byId("idFragment--idBranch").getValue();
                    var oName1 = this.getView().byId("Table").getSelectedItem().getBindingContext("positionsTable2").getObject("Name");
                    var oMandt1 = this.getView().byId("Table").getSelectedItem().getBindingContext("positionsTable2").getObject("Mandt");
                    var sPath3 = `/rtypeSet(Mandt='${oMandt1}',Name='${oName1}')`;
    
                    var finalData = {
                        "Name": oName,
                        "Surname": oSurname,
                        "Branch": oBranch
                    }
    
                    oModel.update(sPath3,  finalData, {
                        success: function (odata) {
                            MessageBox.success("Updated successfully!", {
                               
                            });
                            //oModel.refresh(true);
                        },
                        error: function (error) {
                            MessageBox.error("Error. Failed to update the Product! Please try again later,", {
                               
                            });
                        }
                    });
                    this.getDialog().close();
                    oModel.refresh(true);
                }
    
    
            });
        });
    

