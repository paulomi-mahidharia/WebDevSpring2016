/**
 * Created by paulomimahidharia on 3/17/16.
 */
"use strict";

module.exports = function(app, FormModel, uuid) {

    app.post("/api/assignment/user/:userId/form", createForm);

    //returns an array of forms belonging to a user whose id is equal to the userId path parameter
    app.get("/api/assignment/user/:userId/form", findAllformsForUser);

    //returns a form object whose id is equal to the formId path parameter
    app.get("/api/assignment/form/:formId", findFormById);

    //updates a form object whose id is equal to the formId path parameter so that its properties are the same as
    //the property values of the form object embedded in the request's body
    app.put("/api/assignment/form/:formId", updateFormById);

    //removes a form object whose id is equal to the formId path parameter
    app.delete("/api/assignment/form/:formId", deleteFormById);

    function createForm (req, res) {

        var form = req.body;
        var userId = parseInt(req.params.userId);

        form.userId = userId;
        form._id = parseInt(uuid.v4(), 16);

        FormModel.createForm(form);
        res.json(FormModel.findAllFormsByUserId(userId));
    }

    function findAllformsForUser(req, res) {
        var userId = parseInt(req.params.userId);
        res.json(FormModel.findAllFormsByUserId(userId));
    }

    function findAllForms(req, res) {

        res.json(FormModel.findAllForms());
    }

    function findFormById(req, res) {

        var formId = req.params.formId;
        res.json(FormModel.findFormById(formId));
    }

    function updateFormById(req, res) {

        var formId = req.params.formId;
        var form = req.body;
        var forms = FormModel.updateFormById(formId, form);
        res.json(forms);
    }

    function deleteFormById(req, res) {

        var formId = req.params.formId;
        FormModel.deleteFormById(formId);
        res.send(200);
    }
}