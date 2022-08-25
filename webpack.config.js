// We mention what we want our webpack to do ,
// Here we are putting any input that we have in index js file
//  into one bundle

// code nod module 
const path = require('path')

module.exports = {
    // Mode can be development or Production  
    mode: 'development',
    entry: './src/index.js',
    // path define what output file we are pointing to
    // __dirname = current directory as require absolute path
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename:'bundle.js'
    },

    // this statement allow us to watch whatever changes is being done by us
    watch:true
}