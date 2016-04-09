/**
 * Created by paulomimahidharia on 4/8/16.
 */
module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var MapSchema = mongoose.Schema({
        mapURL: String
        // collection property sets
        // collection name to 'user'
    }, {collection: 'project.map'});

    return MapSchema;
};