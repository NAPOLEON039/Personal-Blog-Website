---
path: '/mapping-vuex-for-beginner'
title: 'Mapping for a Vuex beginner'
date: '2019-12-10'
---

## Introduction
This is a continuation of the [article](https://dev.to/napoleon039/understanding-and-using-vuex-for-the-first-time-2ngi) I published previously about using Vuex for the first time. I'll only be talking about mapping your getters, mutations, and actions from the Vuex store to properties in a Vue component.

## Why should I map them?
Using Vuex for some time you might be thinking - "I can use a mutation or an action just fine. Why would I map them?". Well, mapping them is very helpful if you're going to use multiple getters, mutations, or actions.

## Mapping Getters
We use a getter inside our computed property this way:

```javascript
computed: {
	newValue() {
    	return this.$store.getters.newValue;
    }
}
```

Now how about doing this for 5 getters or 10 getters? It occupies a lot of lines, not to mention having to write a lot of code. You can use the `mapGetters` helper from Vuex to shorten this. If you want to format the return value of a getter or carry out some other operation with it, you may have to write getters as written above. But if the computed property is going to simply return the value from a getter, it's better to use the `mapGetters` helper:

```javascript
import { mapGetters } from 'vuex';

export default{
    computed: {
    	...mapGetters([
        	'newValue',
            'getCubeValue'
        ])
    }
}
```

This would be the same as writing:

```javascript
export default {
    computed: {
    	newValue() {
        	return this.$store.getters.newValue;
        },
        getCubeValue() {
        	return this.$store.getters.getCubeValue;
        }
    }
}
```

We pass an array to `mapGetters` and write the name of the getters inside it. You only need to write the name of the getters and then use them in your template. No need to write anything else. If you want to use the getter with a different name, then instead of passing an array to `mapGetters`, you can pass an object:

```javascript
import { mapGetters } from 'vuex';

export default {
    computed: {
    	...mapGetters({
        	value: 'newValue',
            cube: 'getCubeValue'
        })
    }
}
```

Without using `mapGetters` these getters would be written this way:

```javascript
export default {
    computed: {
    	value() {
        	return this.$store.getters.newValue;
        },
        cube() {
        	return this.$store.getters.getCubeValue;
        }
    }
}
```

## Mapping Mutations
Like we have done with getters, we can do the same with mutations as well. Similar to `mapGetters`, we have the `mapMutations` helper for mapping our mutations.

```javascript
import { mapMutations } from 'vuex';

export default {
    methods: {
    	...mapMutations([
        	'calculatePercentage',
            'incrementAmount',
            'increasePrincipalBy'
        ])
    }
}
```

The `mapMutations` helper also supports passing payloads. The last mutation, `increasePrincipalBy` accepts a payload. Mapping our mutations `calculatePercentage`, `increasePrincipalBy` and `incrementAmount` to the methods property would give the same result as explicitly committing the mutations: 

```javascript
export default {
    methods: {
    	calculatePercentage() {
        	this.$store.commit('calculatePercentage');
        },
        incrementAmount() {
        	this.$store.commit('incrementAmount');
        },
        increasePrincipalBy(amount) {
        	this.$store.commit('increasePrincipalBy', amount);
        }
    }
}
```

We can also pass in an object to the `mapMutations` helper as we did with `mapGetters`:

```javascript
import { mapMutations } from 'vuex';

export default {
    methods: {
    	...mapMutations({
        	getPercentage: 'calculatePercentage',
            add: 'incrementAmount'
        })
    }
}
```

This is how we would write the above mapped mutations without mapping them:

```javascript
export default {
    methods: {
    	getPercentage() {
        	this.$store.commit('calculatePercentage');
        },
        add() {
        	this.$store.commit('incrementAmount');
        }
    }
}
```

## Mapping Actions
By now, you must have understood that mapping getters, mutations, and actions are quite similar in syntax. You map getters to computed properties while you map mutations and actions to methods. Mapping actions is similar to mapping mutations, only the helper used is different. 

Though I've shown examples of passing an object and an array to the helpers separately, we can use both at the same time:

```javascript
import { mapActions } from 'vuex';

export default {
    methods: {
    	...mapActions([
        	'incrementAsync',
            'getUsers',
            'addUser'
        ]),
        ...mapActions({
        	authenticate: 'checkLogin'
        })
    }
}
```

Here, the `addUser` action is one that accepts a payload. Now if we write these without using the `mapActions` helper, they would be written like this:

```javascript
export default{
    methods: {
    	incrementAsync() {
        	this.$store.dispatch('incrementAsync');
        },
        getUsers() {
        	this.$store.dispatch('getUsers');
        },
        addUser(user) {
        	this.$store.dispatch('addUser', user);
        },
        authenticate() {
        	this.$store.dispatch('checkLogin');
        }
    }
}
```

As I mentioned, you can use both ways of passing an object and passing an array in the same method property. I showed this with the actions helper, but it can be done for mutations as well.

## Wrapping up
This is it for this article. Mapping your actions, getters, and mutations will make your code smaller and save some time writing them. As always, you can learn more from the [Vuex docs](https://vuex.vuejs.org/guide/).