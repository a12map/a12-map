# A12 (accessibility) map of Prague public transport accessibility.

Repo and [a12map team](https://github.com/a12map) started as [PragueHacks2016](http://www.praguehacks.cz/) hackathon project focused on improving the life of [Prague](https://en.wikipedia.org/wiki/Prague) citizens.


### Motivation

Give users a visual (color) representation - a map of time accessibility - where they can select a point A see immediately how long does it take to get to other parts of the city.

> **Problem** - You would like to rent a **flat** somewhere in Prague, therefore you need to know **multiple travel times** from the selected area (point A) to other destinations like  work, school, shopping, bars, sport places, etc. (points B, C, D, E, F, G)

> **Current solution** - You open a web page with transport search, you execute multiple queries.

This approach works but has major drawbacks

  * no map view unless you use google maps w/ traffic search - but locals use more accurate services like [ddp.cz](http://www.dpp.cz/)
  * you have to execute 1 query per 1 place with 1 departure time specified (peak, off peak, day, nigh, weekend) that's for `n * m queries` for n places, m departure times

![a12map](http://i.imgur.com/uK3Zrz5.gif)

As baseline we used for the client application [Create React App](https://github.com/facebookincubator/create-react-app)

### Team
  [Eldar Gabidullin](https://github.com/indiegate), [Andrej Palička](https://github.com/palicand), Martin Barus, [Karol Kasáš](https://twitter.com/reeller_sk), [Viliam Elischer](https://github.com/vire)

### MIT
