/**
 * Created by paulomimahidharia on 4/8/16.
 */
module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var ImageSchema = mongoose.Schema({
        imageURL: String
        // collection property sets
        // collection name to 'user'
    }, {collection: 'project.image'});

    return ImageSchema;
};