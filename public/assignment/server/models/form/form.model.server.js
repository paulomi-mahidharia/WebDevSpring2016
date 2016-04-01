/**
 * Created by paulomimahidharia on 3/17/16.
 */
"use strict";

var forms = require("./form.mock.json");
//var q = require("q");

module.exports = function(db, mongoose) {

    var FormSchema = require("./form.schema.server.js")(mongoose);
    var Form = mongoose.model('Form', FormSchema);

    //var FieldSchema = require("./field.schema.server.js")(mongoose);
    //var Field = mongoose.model('Field', FieldSchema);

    var api = {

        //Functionalities for Form
        createForm: createForm,
        findFormById: findFormById,
        findAllForms: findAllForms,
        updateFormById: updateFormById,
        deleteFormById: deleteFormById,
        findFormByTitle: findFormByTitle,
        findAllFormsByUserId: findAllFormsByUserId,
        getMongooseModel: getMongooseModel

        //Functionalities for Field
        /*createFieldForForm: createFieldForForm,
        findAllFieldsForForm: findAllFieldsForForm,
        findFieldByFieldIdAndFormId: findFieldByFieldIdAndFormId,
        updateFieldByFieldIdAndFormId: updateFieldByFieldIdAndFormId,
        deleteFieldByFieldIdAndFormId: deleteFieldByFieldIdAndFormId*/
    };
    return api;

    function createForm(form) {

        // insert new user with mongoose user model's create()
        return Form.create(form)
    }

    function findFormById(formId) {

        return Form.findById(formId);
    }

    function findAllForms() {

        return Form.find();
    }

    function updateFormById(formId, newForm) {

        return Form.findByIdAndUpdate(formId, newForm)
    }

    function deleteFormById(formId) {

        return Form.findByIdAndRemove(formId);
    }

    function findFormByTitle(title) {

        return Form.findOne({title: title});
    }

    function findAllFormsByUserId(userId) {

        return Form.find({userId: userId});
    }

    function getMongooseModel() {

        return Form
    }


};