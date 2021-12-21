const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')




const categorySchema = new mongoose.Schema({
   name: {
      type: String,
      trim: true,
      required: true,
      minlength:[3,'too short'],
      maxlength:[32,'too long']
  },
  slug: {
      type: String,
      unique:true,
      lowercase:true,
      index:true
  }
},{timestamps: true});




/* userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})
 */
categorySchema.plugin(uniqueValidator)




const categoryModel = mongoose.model('catagory', categorySchema)

module.exports = categoryModel