import { createApp } from 'vue'
import App from './App.vue'

//  Javascript library for utility functions,
import upperFirst from 'lodash/upperFirst'
//  upperFirst('base-input') => 'Base-input'
import camelCase from 'lodash/camelCase'
//  camelCase('Base-input') => 'BaseInput'

// next we used WebPacks require.context
//    this says access the components folder
//    that start with Base prefix, and have .vue or .js extensions
const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

const app = createApp(App)

// we get an array of filenames to contain the component names
requireComponent.keys().forEach(fileName => {
  //  loop through each file

  // make a variable that contains the component object of the file, using fileName
  const componentConfig = requireComponent(fileName)

  // next we will use lodash's camelCase function with a regular expression to parse our filenames,
  // the regular expression will strip the component name and the extension, leaving just the name of the component
  const componentName = upperFirst(

    // componentName =
    //  './base-input.vue' (regEx strips out ./, -, and .vue)
    //  'baseInput' (upperFirst changes i to I)
    //  'BaseInput' (camelCase changes b to B)
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  // we use the componentName we just parsed
  // componentConfig that we registered earlier
  // and create a GLOBAL component with app.component()
  app.component(componentName, componentConfig.default || componentConfig)
})

app.mount('#app')
