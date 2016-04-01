/**
 * Created by paulomimahidharia on 4/1/16.
 */
module.exports = function(db, mongoose, FormModel) {

    var Form = FormModel.getMongooseModel();

    var api = {

        //Functionalities for Field
        createFieldForForm: createFieldForForm,
        findAllFieldsForForm: findAllFieldsForForm,
        findFieldByFieldIdAndFormId: findFieldByFieldIdAndFormId,
        updateFieldByFieldIdAndFormId: updateFieldByFieldIdAndFormId,
        deleteFieldByFieldIdAndFormId: deleteFieldByFieldIdAndFormId
    };

    return api;

    function createFieldForForm(formId, field) {

        return Form.findById(formId)
            .then(
                function(form) {
                    form.fields.push(field);
                    return form.save();
                },
                function(err){
                    return null;
                }
            );
    }

    function findAllFieldsForForm (formId) {

        /*Form.findById(formId)
            .then(
                function (form){
                    return form.fields;
                },

                function (err){
                    return null;
                }
            );*/

        //console.log(formId);

        return Form.findById(formId).select("fields");

    }

    function findFieldByFieldIdAndFormId(formId, fieldId) {

        Form.findById(formId)
            .then(
                function (form){
                    for (var i in form.fields) {
                        if (form.fields[i]._id === fieldId) {
                            return form.fields[i];

                        }
                    }
                },

                function (err){
                    return null;
                }
            );
    }

    function updateFieldByFieldIdAndFormId(formId, fieldId, field) {

        Form.findById(formId)
            .then(
                function (form){
                    for (var i in form.fields) {
                        if (form.fields[i]._id === fieldId) {
                            form.fields[i] = field;
                            return field;

                        }
                    }
                },

                function (err){
                    return null;
                }
            );
    }
    function deleteFieldByFieldIdAndFormId(formId, fieldId) {

        Form.findById(formId)
            .then(
                function (form){
                    for (var i in form.fields) {
                        if (form.fields[i]._id === fieldId) {
                            form.fields[i].remove();
                            break;
                        }
                    }
                    return form.save();
                },

                function (err){
                    return null;
                }
            );
    }
};