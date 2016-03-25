/**
 * Created by paulomimahidharia on 3/17/16.
 */
"use strict";

var forms = require("./form.mock.json");

module.exports = function() {
    var api = {

        //Functionalities for Form
        createForm: createForm,
        findFormById: findFormById,
        findAllForms: findAllForms,
        updateFormById: updateFormById,
        deleteFormById: deleteFormById,
        findFormByTitle: findFormByTitle,
        findAllFormsByUserId: findAllFormsByUserId,

        //Functionalities for Field
        createFieldForForm: createFieldForForm,
        findAllFieldsForForm: findAllFieldsForForm,
        findFieldByFieldIdAndFormId: findFieldByFieldIdAndFormId,
        updateFieldByFieldIdAndFormId: updateFieldByFieldIdAndFormId,
        deleteFieldByFieldIdAndFormId: deleteFieldByFieldIdAndFormId
    };
    return api;

    function createForm(form) {

        forms.push(form);
    }

    function findFormById(formId) {
        for (var formObj in forms) {
            if(forms[formObj]._id == formId) {
                return forms[formObj];
            }
        }
        return null;
    }

    function findAllForms() {
        return forms;
    }

    function updateFormById(formId, newForm) {
        // find the object in the collection with id formId
        for (var formObj in forms) {
            if (forms[formObj]._id == formId) {
                forms[formObj] = newForm;
                return newForm;
            }
        }
    }

    function deleteFormById(formId) {
        for (var formObj in forms) {
            if (forms[formObj]._id == formId) {
                forms.splice(formObj,1);
                break;
            }
        }

        return forms;
    }

    function findFormByTitle(formTitle) {
        for (var formObj in forms) {
            if (forms[formObj].title == formTitle) {

                return forms[formObj];
            }
        }
        return null;
    }

    function findAllFormsByUserId(userId) {

        var userForms = [];
        for (var formObj in forms) {
            if (forms[formObj].userId == userId) {
                userForms.push(forms[formObj]);
            }
        }
        return userForms;
    }

    function createFieldForForm(formId, field) {
        for (var formObj in forms) {
            if (forms[formObj]._id === formId) {
                if(!forms[formObj].fields) {
                    forms[formObj].fields = [];
                }
                forms[formObj].fields.push(field);
                break;
            }
        }
    }

    function findAllFieldsForForm (formId) {

        for (var formObj in forms) {
            if (forms[formObj]._id === formId) {
                return forms[formObj].fields;
            }
        }
        return null;
    }

    function findFieldByFieldIdAndFormId(formId, fieldId) {
        for (var formObj in forms) {
            if (forms[formObj]._id === formId) {
                for (var j in forms[formObj].fields) {
                    if (forms[formObj].fields[j]._id === fieldId) {
                        return forms[formObj].fields[j];
                    }
                }
            }
        }
        return null;
    }

    function updateFieldByFieldIdAndFormId(formId, fieldId, field) {

        for (var i in forms) {
            if (forms[i]._id === formId) {
                for (var j in forms[i].fields) {
                    if (forms[i].fields[j]._id === fieldId) {
                        forms[i].fields[j] = field;
                        return field;
                    }
                }
            }
        }
    }
    function deleteFieldByFieldIdAndFormId(formId, fieldId) {

        for (var formObj in forms) {
            if (forms[formObj]._id === formId) {
                for (var fieldObj in forms[formObj].fields) {
                    if (forms[formObj].fields[fieldObj]._id === fieldId) {
                        forms[formObj].fields.splice(fieldObj,1);
                    }
                }
            }
        }
    }

}