const numberOfTabs = 5;

const IMAGES = [
  { url: 'https://blog.jscrambler.com/files/2015/09/react_native_banner-min.png'},
  { url: 'https://www.novoda.com/blog/content/images/2016/06/reactive-nativingitup-png-800x600_q96.png'},
  { url: 'http://carnivalmobile-wordpress.s3.amazonaws.com/wp-content/uploads/2016/02/react-native.jpg'},
  { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7olfCLLPZ-cy69nuuuNj3UEwyZgHqIDKd7shvQQ5LyAn_5T1sA'},
];

function getItem(val) {
  return {
    title: `item#${val}`,
    ...IMAGES[val % IMAGES.length],
  };
};

function getItems(length) {
  return getBaseArray(length).map(val => getItem(val));
}

function getTab(idx) {
  return {
    name: `tab#${idx}`,
    items: getItems((numberOfTabs * 2) - idx),
  }
};
export const getBaseArray = (length) => {
  return Array.apply(null, {length}).map(Number.call, Number)
};
export const TABS = getBaseArray(numberOfTabs).map(val => getTab(val));
