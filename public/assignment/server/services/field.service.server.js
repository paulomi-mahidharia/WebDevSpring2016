/**
 * Created by paulomimahidharia on 3/18/16.
 */
"use strict";

module.exports = function (app, FormModel, uuid) {

    //creates a new field whose properties are the same as the field object embedded in the request's body and
    // the field belongs to a form whose id is equal to the formId path parameter.
    // The field object's id is initially null since it is a new record.
    // The id of the new form field should be set dynamically using Node.js guid or node-uuid libraries.
    // These will eventually be set by the database when they are inserted into a collection
    app.post("/api/assignment/form/:formId/field", createFormField);

    //returns an array of fields belonging to a form object whose id is equal to the formId path parameter
    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);

    //returns a field object whose id is equal to the fieldId path parameter
    //and belonging to a form object whose id is equal to the formId path parameter
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldIdAndFormId);

    //updates a field object whose id is equal to the fieldId path parameter and
    // belonging to a form object whose id is equal to the formId path parameter
    // so that its properties are the same as the property values of the field object embedded in the request's body
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFieldIdAndFormId);

    //removes a field object whose id is equal to the fieldId path parameter and
    // belonging to a form object whose id is equal to the formId path parameter
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFieldIdAndFormId);

    function createFormField (req, res) {

        var field = req.body;
        var formId = parseInt(req.params.formId);

        field._id = parseInt(uuid.v4(), 16);

        FormModel.createFieldForForm(formId, field);

        res.json(FormModel.findAllFieldsForForm(formId));
    }

    function findAllFieldsForForm(req, res) {

        var formId = parseInt(req.params.formId );

        res.json(FormModel.findAllFieldsForForm(formId));
    }

    function findFieldByFieldIdAndFormId(req, res) {

        var formId = parseInt(req.params.formId, 16);
        var fieldId = parseInt(req.params.fieldId, 16   );

        res.json(FormModel.findFieldByFieldIdAndFormId(formId, fieldId));
    }

    function updateFieldByFieldIdAndFormId (req, res) {

        var formId = parseInt(req.params.formId);
        var fieldId = parseInt(req.params.fieldId);
        var field = req.body;

        FormModel.updateFieldByFieldIdAndFormId(formId, fieldId, field);

        res.send(200);
    }
    function deleteFieldByFieldIdAndFormId (req, res) {

        var formId = parseInt(req.params.formId);
        var fieldId = parseInt(req.params.fieldId);

        FormModel.deleteFieldByFieldIdAndFormId(formId, fieldId);

        res.send(200);
    }

}
