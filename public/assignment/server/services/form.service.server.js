/**
 * Created by paulomimahidharia on 3/17/16.
 */
"use strict";

module.exports = function(app, FormModel, uuid) {

    //creates a new form whose properties are the same as the form object embedded in the HTTP request's body
    // and the form belongs to a user whose id is equal to the userId path parameter.
    // The form object's id is initially null since it is a new record.
    // The id of the new form should be set dynamically using Node.js guid or node-uuid libraries.
    // These will eventually be set by the database when they are inserted into a collection
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
        var userId = req.params.userId;

        form.userId = userId;
        //form._id = parseInt(uuid.v4(), 16);

        FormModel.createForm(form)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
        //res.json(FormModel.findAllFormsByUserId(userId));
    }

    function findAllformsForUser(req, res) {

        var userId = req.params.userId;

        FormModel.findAllFormsByUserId(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllForms(req, res) {

        FormModel.findAllForms()
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findFormById(req, res) {

        var formId = req.params.formId;

        FormModel.findFormById(formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFormById(req, res) {

        var formId = req.params.formId;
        var form = req.body;
        //var forms = FormModel.updateFormById(formId, form);
        //res.json(forms);

        FormModel.updateFormById(formId, form)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFormById(req, res) {

        var formId = req.params.formId;
        FormModel.deleteFormById(formId)
            .then(
                function (doc) {
                    res.send(200);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }
};