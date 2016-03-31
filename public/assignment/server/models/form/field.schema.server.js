/**
 * Created by paulomimahidharia on 3/31/16.
 */
module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var FieldSchema = mongoose.Schema({
        label: String,
        type: {
            type: String,
            enum: ['TEXT', 'TEXTAREA', 'EMAIL', 'PASSWORD', 'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES'],
            default: 'TEXT'},
        placeholder: [String],
        options: [{label:String,
                    value: {type:String, uppercase: true}
        }]
        // collection property sets
        // collection name to 'field'
    }, {collection: 'assignment.field'});

    return FieldSchema;
};