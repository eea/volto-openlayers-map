import React from 'react';

export function getOptions(props) {
  let options = {};

  for (let key in props) {
    if (
      key !== 'children' &&
      typeof props[key] !== 'undefined' &&
      !key.match(/^on[A-Z]/)
    ) {
      options[key] = props[key];
    }
  }

  return options;
}

function getPropsKey(eventName) {
  return (
    'on' +
    eventName
      .replace(/(:[a-z])/g, ($1) => $1.toUpperCase())
      .replace(/^[a-z]/, ($1) => $1.toUpperCase())
      .replace(':', '')
  );
}

export function getEvents(events, props) {
  let prop2EventMap = {};
  for (let key in events) {
    prop2EventMap[getPropsKey(key)] = key;
  }

  let ret = {};
  for (let propName in props) {
    let eventName = prop2EventMap[propName];
    let prop = props[propName];
    if (
      typeof prop !== 'undefined' &&
      propName.match(/^on[A-Z]/) &&
      eventName
    ) {
      ret[eventName] = prop;
    }
  }

  return ret;
}

export function findChild(children, childType) {
  let found;
  let childrenArr = React.Children.toArray(children);
  for (let i = 0; i < childrenArr.length; i++) {
    let child = childrenArr[i];
    if (child.type === childType) {
      found = child;
      break;
    }
  }
  return found;
}

export function isEqual(arg1, arg2) {
  try {
    return JSON.stringify(arg1) === JSON.stringify(arg2);
  } catch {
    return false;
  }
}
