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
        deleteFieldByFieldIdAndFormId: deleteFieldByFieldIdAndFormId,
        sortFields: sortFields
    };

    return api;


    function sortFields(formId, startIndex, endIndex) {
        return Form
            .findById(formId)
            .then(
                function(form) {
                    form.fields.splice(endIndex, 0, form.fields.splice(startIndex, 1)[0]);

                    // notify mongoose 'pages' field changed
                    form.markModified("fields");

                    form.save();
                }
            );
    }



    function createFieldForForm(formId, field) {

        return Form.findById(formId);

    }

    function findAllFieldsForForm (formId) {

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

        return Form.update(
            { _id: formId ,
                "fields._id" :fieldId} ,
            {$set : {"fields.$" : field}}
        );
    }
    function deleteFieldByFieldIdAndFormId(formId, fieldId) {

        return Form.update(
            { _id: formId },
            { $pull: { 'fields': { _id : fieldId } } }
        );
    }
};