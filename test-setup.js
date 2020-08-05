/*
config to tell Jest to run the file before it runs the tests.
To do that, use the setupFiles option
*/

import Vue from 'vue'
import { yearMixin } from './src/util/mixins'
import { timeAgo } from './src/util/filters'

//set the Vue production tip to be false;
//this stops Vue from logging a warning that you are using the development build when run your tests
Vue.config.productionTip = false

//globally register a mixin
Vue.mixin(yearMixin)

//globally register a filter
Vue.filter('timeAgo', timeAgo)
