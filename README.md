# rn-orientation-playground

The master branch contains minimal implementation to reproduce issue I have on our content rich app.
We have tabs - there is possiblity to navigate trough tabs via taping on tab name or by swiping - for such behavior we are using the
[scrollable-tab-view](https://github.com/skv-headless/react-native-scrollable-tab-view)
this however solves only the navigation issue but when you try to perform orientation change couple of things happen:
* the scroll lock itself on pixel position,
* all the tabs rerender to fit the new width, 
* but scroll is locked so in the view you see differet tab than before,
* the animation slides to the new position of selected tab.

What have I tried so far:
* disable animaions in `scrollable-tab-view`
* disable rerendering of inactive tabs (but then when as you swipe it rerenders - this reminds me I should try some delayed reneder for hiddent tabs)

tbd...
