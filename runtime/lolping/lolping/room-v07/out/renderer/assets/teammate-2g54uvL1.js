import { b8 as murmur2, b9 as HASH_PREFIX, ba as RESET, bb as UNSUPPORTED_CSS_PROPERTIES, bc as insertionFactory, bd as reduceToClassNameForSlots, be as useTextDirection, bf as useRenderer, bg as insertionFactory$1, d as dom, c as addListener, bh as GroupperMoveFocusEventName, K as Keys, bi as GroupperMoveFocusActions, A as AsyncFocusSources, e as removeListener, g as getTabsterOnElement, R as RootAPI, h as dispatchEvent, bj as TabsterMoveFocusEvent, T as TabsterPart, j as getDummyInputContainer, bk as GroupperTabbabilities, W as WeakHTMLElement, D as DummyInputManager, i as DummyInputManagerPriorities, F as FocusedElementState, bl as getAdjacentElement, n as nativeFocus, q as useTabster, t as useTabsterAttributes, B as createFluentIcon, r as reactExports, a8 as always, a9 as getIntrinsicElementProps, ab as jsx, U as mergeClasses, _ as __styles, ac as useCustomStyleHook, bm as useText_unstable, bn as useTextStyles_unstable, bo as renderText_unstable, a7 as useControllableState, a0 as Enter, ae as optional, aa as mergeCallbacks, ap as useFocusWithin, z as useMergedRefs, at as useFocusFinders, af as jsxs, an as __resetStyles, al as DismissRegular, bp as resolveShorthand, a as useEventCallback, ag as isResolvedShorthand, bq as useInput_unstable, br as useInputStyles_unstable, ax as jsxRuntimeExports, aA as Button, bs as Dismiss16Regular, aE as Text, aC as ProgressBar, aH as Input, bt as Send16Regular, bu as History16Regular, bv as Checkmark16Regular, bw as Copy16Regular, aQ as Checkbox, bx as Delete16Regular, ay as Switch, b7 as clientExports, a$ as FluentProvider, b0 as webDarkTheme, b1 as webLightTheme } from "./ProgressBar-D2t9L2tr.js";
import { t as tagColorCss, s as strings } from "./i18n-C9rFRN0K.js";
var MOZ = "-moz-";
var WEBKIT = "-webkit-";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var MEDIA = "@media";
var IMPORT = "@import";
var SUPPORTS = "@supports";
var NAMESPACE = "@namespace";
var KEYFRAMES = "@keyframes";
var LAYER = "@layer";
var abs = Math.abs;
var from = String.fromCharCode;
var assign = Object.assign;
function hash(value, length2) {
  return charat(value, 0) ^ 45 ? (((length2 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
}
function trim(value) {
  return value.trim();
}
function match(value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search) {
  return value.indexOf(search);
}
function charat(value, index) {
  return value.charCodeAt(index) | 0;
}
function substr(value, begin, end) {
  return value.slice(begin, end);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}
function combine(array, callback) {
  return array.map(callback).join("");
}
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
function node(value, root, parent, type, props, children, length2, siblings) {
  return { value, root, parent, type, props, children, line, column, length: length2, return: "", siblings };
}
function copy(root, props) {
  return assign(node("", null, null, "", null, null, 0, root.siblings), root, { length: -root.length }, props);
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end) {
  return substr(characters, begin, end);
}
function token(type) {
  switch (type) {
    // \0 \t \n \r \s whitespace token
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    // ! + , / > @ ~ isolate token
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    // ; { } breakpoint token
    case 59:
    case 123:
    case 125:
      return 4;
    // : accompanied token
    case 58:
      return 3;
    // " ' ( [ opening delimit token
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    // ) ] closing delimit token
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function tokenize(value) {
  return dealloc(tokenizer(alloc(value)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function tokenizer(children) {
  while (next())
    switch (token(character)) {
      case 0:
        append(identifier(position - 1), children);
        break;
      case 2:
        append(delimit(character), children);
        break;
      default:
        append(from(character), children);
    }
  return children;
}
function escaping(index, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      // ] ) " '
      case type:
        return position;
      // " '
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      // (
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      // \
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type, index) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
  while (!token(peek()))
    next();
  return slice(index, position);
}
function compile(value) {
  return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index = 0;
  var offset = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var parens = 0;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      // (
      case 40:
        if (previous != 108 && charat(characters2, length2 - 1) == 58) parens++, characters2 += "(";
        else characters2 += delimit(character2);
        break;
      // )
      case 41:
        parens--, characters2 += ")";
        break;
      // " ' [
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        if (parens > 0) {
          characters2 += from(character2);
          break;
        }
        characters2 += whitespace(previous);
        break;
      // \
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      // /
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent, declarations), declarations);
            if ((token(previous || 1) == 5 || token(peek() || 1) == 5) && strlen(characters2) && substr(characters2, -1, void 0) !== " ") characters2 += " ";
            break;
          default:
            characters2 += "/";
        }
        break;
      // {
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      // } ; \0
      case 125 * variable:
      case 59:
      case 0:
        if (parens > 0 && character2) {
          characters2 += from(character2);
          break;
        }
        switch (character2) {
          // \0 }
          case 0:
          case 125:
            scanning = 0;
          // ;
          case 59 + offset:
            if (ampersand == -1) characters2 = replace(characters2, /\f/g, "");
            if (property > 0 && (strlen(characters2) - length2 || variable === 0))
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1, declarations) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2, declarations), declarations);
            break;
          // @ ;
          case 59:
            characters2 += ";";
          // { rule/at-rule
          default:
            append(reference = ruleset(characters2, root, parent, index, offset, rules, points, type, props = [], children = [], length2, rulesets), rulesets);
            if (character2 === 123)
              if (offset === 0)
                parse(characters2, root, reference, reference, props, rulesets, length2, points, children);
              else {
                switch (atrule) {
                  // c(ontainer)
                  case 99:
                    if (charat(characters2, 3) === 110) break;
                  // l(ayer)
                  case 108:
                    if (charat(characters2, 2) === 97) break;
                  default:
                    offset = 0;
                  // d(ocument) m(edia) s(upports)
                  case 100:
                  case 109:
                  case 115:
                }
                if (offset) parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2, children), children), rules, children, length2, points, rule ? props : children);
                else parse(characters2, reference, reference, reference, [""], children, 0, points, children);
              }
        }
        index = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      // :
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          // &
          case 38:
            ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
            break;
          // ,
          case 44:
            if (parens > 0) break;
            points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          // @
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          // -
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length2, siblings) {
  var post = offset - 1;
  var rule = offset === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i = 0, j2 = 0, k = 0; i < index; ++i)
    for (var x2 = 0, y2 = substr(value, post + 1, post = abs(j2 = points[i])), z2 = value; x2 < size; ++x2)
      if (z2 = trim(j2 > 0 ? rule[x2] + " " + y2 : replace(y2, /&\f/g, rule[x2])))
        props[k++] = z2;
  return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length2, siblings);
}
function comment(value, root, parent, siblings) {
  return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0, siblings);
}
function declaration(value, root, parent, length2, siblings) {
  return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2, siblings);
}
function serialize(children, callback) {
  var output = "";
  for (var i = 0; i < children.length; i++)
    output += callback(children[i], i, children, callback) || "";
  return output;
}
function stringify(element, index, children, callback) {
  switch (element.type) {
    case LAYER:
      if (element.children.length) break;
    case IMPORT:
    case NAMESPACE:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      if (!strlen(element.value = element.props.join(","))) return "";
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
function middleware(collection) {
  var length2 = sizeof(collection);
  return function(element, index, children, callback) {
    var output = "";
    for (var i = 0; i < length2; i++)
      output += collection[i](element, index, children, callback) || "";
    return output;
  };
}
function rulesheet(callback) {
  return function(element) {
    if (!element.root) {
      if (element = element.return)
        callback(element);
    }
  };
}
function arrayToObject(array) {
  return array.reduce(function(obj, _ref2) {
    var prop1 = _ref2[0], prop2 = _ref2[1];
    obj[prop1] = prop2;
    obj[prop2] = prop1;
    return obj;
  }, {});
}
function isBoolean(val) {
  return typeof val === "boolean";
}
function isFunction(val) {
  return typeof val === "function";
}
function isNumber(val) {
  return typeof val === "number";
}
function isNullOrUndefined(val) {
  return val === null || typeof val === "undefined";
}
function isObject$1(val) {
  return val && typeof val === "object";
}
function isString(val) {
  return typeof val === "string";
}
function includes(inclusive, inclusee) {
  return inclusive.indexOf(inclusee) !== -1;
}
function flipSign(value) {
  if (parseFloat(value) === 0) {
    return value;
  }
  if (value[0] === "-") {
    return value.slice(1);
  }
  return "-" + value;
}
function flipTransformSign(match2, prefix2, offset, suffix) {
  return prefix2 + flipSign(offset) + suffix;
}
function calculateNewBackgroundPosition(value) {
  var idx = value.indexOf(".");
  if (idx === -1) {
    value = 100 - parseFloat(value) + "%";
  } else {
    var len = value.length - idx - 2;
    value = 100 - parseFloat(value);
    value = value.toFixed(len) + "%";
  }
  return value;
}
function getValuesAsList(value) {
  return value.replace(/ +/g, " ").split(" ").map(function(i) {
    return i.trim();
  }).filter(Boolean).reduce(function(_ref2, item) {
    var list = _ref2.list, state = _ref2.state;
    var openParansCount = (item.match(/\(/g) || []).length;
    var closedParansCount = (item.match(/\)/g) || []).length;
    if (state.parensDepth > 0) {
      list[list.length - 1] = list[list.length - 1] + " " + item;
    } else {
      list.push(item);
    }
    state.parensDepth += openParansCount - closedParansCount;
    return {
      list,
      state
    };
  }, {
    list: [],
    state: {
      parensDepth: 0
    }
  }).list;
}
function handleQuartetValues(value) {
  var splitValues = getValuesAsList(value);
  if (splitValues.length <= 3 || splitValues.length > 4) {
    return value;
  }
  var top = splitValues[0], right = splitValues[1], bottom = splitValues[2], left = splitValues[3];
  return [top, left, bottom, right].join(" ");
}
function canConvertValue(value) {
  return !isBoolean(value) && !isNullOrUndefined(value);
}
function splitShadow(value) {
  var shadows = [];
  var start = 0;
  var end = 0;
  var rgba = false;
  while (end < value.length) {
    if (!rgba && value[end] === ",") {
      shadows.push(value.substring(start, end).trim());
      end++;
      start = end;
    } else if (value[end] === "(") {
      rgba = true;
      end++;
    } else if (value[end] === ")") {
      rgba = false;
      end++;
    } else {
      end++;
    }
  }
  if (start != end) {
    shadows.push(value.substring(start, end + 1));
  }
  return shadows;
}
var propertyValueConverters = {
  padding: function padding(_ref2) {
    var value = _ref2.value;
    if (isNumber(value)) {
      return value;
    }
    return handleQuartetValues(value);
  },
  textShadow: function textShadow(_ref2) {
    var value = _ref2.value;
    var flippedShadows = splitShadow(value).map(function(shadow) {
      return shadow.replace(/(^|\s)(-*)([.|\d]+)/, function(match2, whiteSpace, negative, number) {
        if (number === "0") {
          return match2;
        }
        var doubleNegative = negative === "" ? "-" : "";
        return "" + whiteSpace + doubleNegative + number;
      });
    });
    return flippedShadows.join(",");
  },
  borderColor: function borderColor(_ref3) {
    var value = _ref3.value;
    return handleQuartetValues(value);
  },
  borderRadius: function borderRadius(_ref4) {
    var value = _ref4.value;
    if (isNumber(value)) {
      return value;
    }
    if (includes(value, "/")) {
      var _value$split = value.split("/"), radius1 = _value$split[0], radius2 = _value$split[1];
      var convertedRadius1 = propertyValueConverters.borderRadius({
        value: radius1.trim()
      });
      var convertedRadius2 = propertyValueConverters.borderRadius({
        value: radius2.trim()
      });
      return convertedRadius1 + " / " + convertedRadius2;
    }
    var splitValues = getValuesAsList(value);
    switch (splitValues.length) {
      case 2: {
        return splitValues.reverse().join(" ");
      }
      case 4: {
        var topLeft = splitValues[0], topRight = splitValues[1], bottomRight = splitValues[2], bottomLeft = splitValues[3];
        return [topRight, topLeft, bottomLeft, bottomRight].join(" ");
      }
      default: {
        return value;
      }
    }
  },
  background: function background(_ref5) {
    var value = _ref5.value, valuesToConvert2 = _ref5.valuesToConvert, isRtl = _ref5.isRtl, bgImgDirectionRegex2 = _ref5.bgImgDirectionRegex, bgPosDirectionRegex2 = _ref5.bgPosDirectionRegex;
    if (isNumber(value)) {
      return value;
    }
    var backgroundPositionValue = value.replace(/(url\(.*?\))|(rgba?\(.*?\))|(hsl\(.*?\))|(#[a-fA-F0-9]+)|((^| )(\D)+( |$))/g, "").trim();
    value = value.replace(backgroundPositionValue, propertyValueConverters.backgroundPosition({
      value: backgroundPositionValue,
      valuesToConvert: valuesToConvert2,
      isRtl,
      bgPosDirectionRegex: bgPosDirectionRegex2
    }));
    return propertyValueConverters.backgroundImage({
      value,
      valuesToConvert: valuesToConvert2,
      bgImgDirectionRegex: bgImgDirectionRegex2
    });
  },
  backgroundImage: function backgroundImage(_ref6) {
    var value = _ref6.value, valuesToConvert2 = _ref6.valuesToConvert, bgImgDirectionRegex2 = _ref6.bgImgDirectionRegex;
    if (!includes(value, "url(") && !includes(value, "linear-gradient(")) {
      return value;
    }
    return value.replace(bgImgDirectionRegex2, function(match2, g1, group2) {
      return match2.replace(group2, valuesToConvert2[group2]);
    });
  },
  backgroundPosition: function backgroundPosition(_ref7) {
    var value = _ref7.value, valuesToConvert2 = _ref7.valuesToConvert, isRtl = _ref7.isRtl, bgPosDirectionRegex2 = _ref7.bgPosDirectionRegex;
    return value.replace(isRtl ? /^((-|\d|\.)+%)/ : null, function(match2, group) {
      return calculateNewBackgroundPosition(group);
    }).replace(bgPosDirectionRegex2, function(match2) {
      return valuesToConvert2[match2];
    });
  },
  backgroundPositionX: function backgroundPositionX(_ref8) {
    var value = _ref8.value, valuesToConvert2 = _ref8.valuesToConvert, isRtl = _ref8.isRtl, bgPosDirectionRegex2 = _ref8.bgPosDirectionRegex;
    if (isNumber(value)) {
      return value;
    }
    return propertyValueConverters.backgroundPosition({
      value,
      valuesToConvert: valuesToConvert2,
      isRtl,
      bgPosDirectionRegex: bgPosDirectionRegex2
    });
  },
  transition: function transition(_ref9) {
    var value = _ref9.value, propertiesToConvert2 = _ref9.propertiesToConvert;
    return value.split(/,\s*/g).map(function(transition2) {
      var values = transition2.split(" ");
      values[0] = propertiesToConvert2[values[0]] || values[0];
      return values.join(" ");
    }).join(", ");
  },
  transitionProperty: function transitionProperty(_ref10) {
    var value = _ref10.value, propertiesToConvert2 = _ref10.propertiesToConvert;
    return value.split(/,\s*/g).map(function(prop) {
      return propertiesToConvert2[prop] || prop;
    }).join(", ");
  },
  transform: function transform(_ref11) {
    var value = _ref11.value;
    var nonAsciiPattern = "[^\\u0020-\\u007e]";
    var escapePattern = "(?:(?:(?:\\[0-9a-f]{1,6})(?:\\r\\n|\\s)?)|\\\\[^\\r\\n\\f0-9a-f])";
    var signedQuantPattern = "((?:-?" + ("(?:[0-9]*\\.[0-9]+|[0-9]+)(?:\\s*(?:em|ex|px|cm|mm|in|pt|pc|deg|rad|grad|ms|s|hz|khz|%)|" + ("-?" + ("(?:[_a-z]|" + nonAsciiPattern + "|" + escapePattern + ")") + ("(?:[_a-z0-9-]|" + nonAsciiPattern + "|" + escapePattern + ")") + "*") + ")?") + ")|(?:inherit|auto))";
    var translateXRegExp = new RegExp("(translateX\\s*\\(\\s*)" + signedQuantPattern + "(\\s*\\))", "gi");
    var translateRegExp = new RegExp("(translate\\s*\\(\\s*)" + signedQuantPattern + "((?:\\s*,\\s*" + signedQuantPattern + "){0,1}\\s*\\))", "gi");
    var translate3dRegExp = new RegExp("(translate3d\\s*\\(\\s*)" + signedQuantPattern + "((?:\\s*,\\s*" + signedQuantPattern + "){0,2}\\s*\\))", "gi");
    var rotateRegExp = new RegExp("(rotate[ZY]?\\s*\\(\\s*)" + signedQuantPattern + "(\\s*\\))", "gi");
    return value.replace(translateXRegExp, flipTransformSign).replace(translateRegExp, flipTransformSign).replace(translate3dRegExp, flipTransformSign).replace(rotateRegExp, flipTransformSign);
  }
};
propertyValueConverters.objectPosition = propertyValueConverters.backgroundPosition;
propertyValueConverters.margin = propertyValueConverters.padding;
propertyValueConverters.borderWidth = propertyValueConverters.padding;
propertyValueConverters.boxShadow = propertyValueConverters.textShadow;
propertyValueConverters.webkitBoxShadow = propertyValueConverters.boxShadow;
propertyValueConverters.mozBoxShadow = propertyValueConverters.boxShadow;
propertyValueConverters.WebkitBoxShadow = propertyValueConverters.boxShadow;
propertyValueConverters.MozBoxShadow = propertyValueConverters.boxShadow;
propertyValueConverters.borderStyle = propertyValueConverters.borderColor;
propertyValueConverters.webkitTransform = propertyValueConverters.transform;
propertyValueConverters.mozTransform = propertyValueConverters.transform;
propertyValueConverters.WebkitTransform = propertyValueConverters.transform;
propertyValueConverters.MozTransform = propertyValueConverters.transform;
propertyValueConverters.transformOrigin = propertyValueConverters.backgroundPosition;
propertyValueConverters.webkitTransformOrigin = propertyValueConverters.transformOrigin;
propertyValueConverters.mozTransformOrigin = propertyValueConverters.transformOrigin;
propertyValueConverters.WebkitTransformOrigin = propertyValueConverters.transformOrigin;
propertyValueConverters.MozTransformOrigin = propertyValueConverters.transformOrigin;
propertyValueConverters.webkitTransition = propertyValueConverters.transition;
propertyValueConverters.mozTransition = propertyValueConverters.transition;
propertyValueConverters.WebkitTransition = propertyValueConverters.transition;
propertyValueConverters.MozTransition = propertyValueConverters.transition;
propertyValueConverters.webkitTransitionProperty = propertyValueConverters.transitionProperty;
propertyValueConverters.mozTransitionProperty = propertyValueConverters.transitionProperty;
propertyValueConverters.WebkitTransitionProperty = propertyValueConverters.transitionProperty;
propertyValueConverters.MozTransitionProperty = propertyValueConverters.transitionProperty;
propertyValueConverters["text-shadow"] = propertyValueConverters.textShadow;
propertyValueConverters["border-color"] = propertyValueConverters.borderColor;
propertyValueConverters["border-radius"] = propertyValueConverters.borderRadius;
propertyValueConverters["background-image"] = propertyValueConverters.backgroundImage;
propertyValueConverters["background-position"] = propertyValueConverters.backgroundPosition;
propertyValueConverters["background-position-x"] = propertyValueConverters.backgroundPositionX;
propertyValueConverters["object-position"] = propertyValueConverters.objectPosition;
propertyValueConverters["border-width"] = propertyValueConverters.padding;
propertyValueConverters["box-shadow"] = propertyValueConverters.textShadow;
propertyValueConverters["-webkit-box-shadow"] = propertyValueConverters.textShadow;
propertyValueConverters["-moz-box-shadow"] = propertyValueConverters.textShadow;
propertyValueConverters["border-style"] = propertyValueConverters.borderColor;
propertyValueConverters["-webkit-transform"] = propertyValueConverters.transform;
propertyValueConverters["-moz-transform"] = propertyValueConverters.transform;
propertyValueConverters["transform-origin"] = propertyValueConverters.transformOrigin;
propertyValueConverters["-webkit-transform-origin"] = propertyValueConverters.transformOrigin;
propertyValueConverters["-moz-transform-origin"] = propertyValueConverters.transformOrigin;
propertyValueConverters["-webkit-transition"] = propertyValueConverters.transition;
propertyValueConverters["-moz-transition"] = propertyValueConverters.transition;
propertyValueConverters["transition-property"] = propertyValueConverters.transitionProperty;
propertyValueConverters["-webkit-transition-property"] = propertyValueConverters.transitionProperty;
propertyValueConverters["-moz-transition-property"] = propertyValueConverters.transitionProperty;
var propertiesToConvert = arrayToObject([
  ["paddingLeft", "paddingRight"],
  ["marginLeft", "marginRight"],
  ["left", "right"],
  ["borderLeft", "borderRight"],
  ["borderLeftColor", "borderRightColor"],
  ["borderLeftStyle", "borderRightStyle"],
  ["borderLeftWidth", "borderRightWidth"],
  ["borderTopLeftRadius", "borderTopRightRadius"],
  ["borderBottomLeftRadius", "borderBottomRightRadius"],
  // kebab-case versions
  ["padding-left", "padding-right"],
  ["margin-left", "margin-right"],
  ["border-left", "border-right"],
  ["border-left-color", "border-right-color"],
  ["border-left-style", "border-right-style"],
  ["border-left-width", "border-right-width"],
  ["border-top-left-radius", "border-top-right-radius"],
  ["border-bottom-left-radius", "border-bottom-right-radius"]
]);
var propsToIgnore = ["content"];
var valuesToConvert = arrayToObject([["ltr", "rtl"], ["left", "right"], ["w-resize", "e-resize"], ["sw-resize", "se-resize"], ["nw-resize", "ne-resize"]]);
var bgImgDirectionRegex = new RegExp("(^|\\W|_)((ltr)|(rtl)|(left)|(right))(\\W|_|$)", "g");
var bgPosDirectionRegex = new RegExp("(left)|(right)");
function convert(object) {
  return Object.keys(object).reduce(function(newObj, originalKey) {
    var originalValue = object[originalKey];
    if (isString(originalValue)) {
      originalValue = originalValue.trim();
    }
    if (includes(propsToIgnore, originalKey)) {
      newObj[originalKey] = originalValue;
      return newObj;
    }
    var _convertProperty = convertProperty(originalKey, originalValue), key = _convertProperty.key, value = _convertProperty.value;
    newObj[key] = value;
    return newObj;
  }, Array.isArray(object) ? [] : {});
}
function convertProperty(originalKey, originalValue) {
  var isNoFlip = /\/\*\s?@noflip\s?\*\//.test(originalValue);
  var key = isNoFlip ? originalKey : getPropertyDoppelganger(originalKey);
  var value = isNoFlip ? originalValue : getValueDoppelganger(key, originalValue);
  return {
    key,
    value
  };
}
function getPropertyDoppelganger(property) {
  return propertiesToConvert[property] || property;
}
function getValueDoppelganger(key, originalValue) {
  if (!canConvertValue(originalValue)) {
    return originalValue;
  }
  if (isObject$1(originalValue)) {
    return convert(originalValue);
  }
  var isNum = isNumber(originalValue);
  var isFunc = isFunction(originalValue);
  var importantlessValue = isNum || isFunc ? originalValue : originalValue.replace(/ !important.*?$/, "");
  var isImportant = !isNum && importantlessValue.length !== originalValue.length;
  var valueConverter = propertyValueConverters[key];
  var newValue;
  if (valueConverter) {
    newValue = valueConverter({
      value: importantlessValue,
      valuesToConvert,
      propertiesToConvert,
      isRtl: true,
      bgImgDirectionRegex,
      bgPosDirectionRegex
    });
  } else {
    newValue = valuesToConvert[importantlessValue] || importantlessValue;
  }
  if (isImportant) {
    return newValue + " !important";
  }
  return newValue;
}
const globalPlugin = (element) => {
  switch (element.type) {
    case RULESET:
      if (typeof element.props === "string") {
        return;
      }
      element.props = element.props.map((value) => {
        if (value.indexOf(":global(") === -1) {
          return value;
        }
        return tokenize(value).reduce((acc, value2, index, children) => {
          if (value2 === "") {
            return acc;
          }
          if (value2 === ":" && children[index + 1] === "global") {
            const selector = (
              // An inner part of ":global()"
              children[index + 2].slice(1, -1) + // A separator between selectors i.e. "body .class"
              " "
            );
            acc.unshift(selector);
            children[index + 1] = "";
            children[index + 2] = "";
            return acc;
          }
          acc.push(value2);
          return acc;
        }, []).join("");
      });
  }
};
function prefix(value, length2, children) {
  switch (hash(value, length2)) {
    // color-adjust
    case 5103:
      return WEBKIT + "print-" + value + value;
    // backface-visibility, column, box-decoration-break
    case 3191:
    case 6645:
    case 3005:
    // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
      return WEBKIT + value + value;
    // backdrop-filter, background-clip: text
    case 4215:
      if (charat(value, 9) === 102) {
        return WEBKIT + value + value;
      }
      if (charat(value, length2 + 1) === 116) {
        return WEBKIT + value + value;
      }
      break;
    // tab-size
    case 4789:
      return MOZ + value + value;
    // appearance, user-select, hyphens
    case 5349:
    case 4246:
    case 6968:
      return WEBKIT + value + MOZ + value + value;
    // cursor
    // @ts-expect-error fall through is intentional here
    case 6187:
      if (!match(value, /grab/)) {
        return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
      }
    // background, background-image
    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
    // (min|max)?(width|height|inline-size|block-size)
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen(value) - 1 - length2 > 6)
        switch (charat(value, length2 + 1)) {
          // (f)ill-available
          // @ts-expect-error fall through is intentional here
          case 102:
            if (charat(value, length2 + 3) === 108) {
              return replace(
                value,
                /(.+:)(.+)-([^]+)/,
                // eslint-disable-next-line no-useless-concat, eqeqeq
                "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")
              ) + value;
            }
          // (s)tretch
          case 115:
            return ~indexof(value, "stretch") ? prefix(replace(value, "stretch", "fill-available"), length2) + value : value;
        }
      break;
  }
  return value;
}
function prefixerPlugin(element, index, children, callback) {
  if (element.length > -1) {
    if (!element.return)
      switch (element.type) {
        case DECLARATION:
          element.return = prefix(element.value, element.length);
          return;
        case RULESET:
          if (element.length)
            return combine(element.props, function(value) {
              switch (match(value, /(::plac\w+|:read-\w+)/)) {
                // :read-(only|write)
                case ":read-only":
                case ":read-write":
                  return serialize(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    [copy(element, { props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")] })],
                    callback
                  );
                // :placeholder
                case "::placeholder":
                  return serialize([
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    copy(element, { props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")] }),
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    copy(element, { props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")] })
                  ], callback);
              }
              return "";
            });
      }
  }
  return void 0;
}
function isAtRuleElement(element) {
  switch (element.type) {
    case "@container":
    case MEDIA:
    case SUPPORTS:
    case LAYER:
      return true;
  }
  return false;
}
const sortClassesInAtRulesPlugin = (element) => {
  if (isAtRuleElement(element) && Array.isArray(element.children)) {
    element.children.sort((a3, b) => a3.props[0] > b.props[0] ? 1 : -1);
  }
};
function compileCSSRules(cssRules, sortClassesInAtRules) {
  const rules = [];
  serialize(compile(cssRules), middleware([
    globalPlugin,
    sortClassesInAtRulesPlugin,
    prefixerPlugin,
    stringify,
    // 💡 we are using `.insertRule()` API for DOM operations, which does not support
    // insertion of multiple CSS rules in a single call. `rulesheet` plugin extracts
    // individual rules to be used with this API
    rulesheet((rule) => rules.push(rule))
  ]));
  return rules;
}
const uppercasePattern = /[A-Z]/g;
const msPattern = /^ms-/;
const cache = {};
function toHyphenLower(match2) {
  return "-" + match2.toLowerCase();
}
function hyphenateProperty(name) {
  if (Object.prototype.hasOwnProperty.call(cache, name)) {
    return cache[name];
  }
  if (name.substr(0, 2) === "--") {
    return name;
  }
  const hName = name.replace(uppercasePattern, toHyphenLower);
  return cache[name] = msPattern.test(hName) ? "-" + hName : hName;
}
function normalizeNestedProperty(nestedProperty) {
  if (nestedProperty.charAt(0) === "&") {
    return nestedProperty.slice(1);
  }
  return nestedProperty;
}
const PSEUDO_SELECTOR_REGEX = /,( *[^ &])/g;
function normalizePseudoSelector(pseudoSelector) {
  return "&" + normalizeNestedProperty(
    // Regex there replaces a comma, spaces and an ampersand if it's present with comma and an ampersand.
    // This allows to normalize input, see examples in JSDoc.
    pseudoSelector.replace(PSEUDO_SELECTOR_REGEX, ",&$1")
  );
}
function createCSSDeclaration(cssDeclaration, pseudos) {
  return pseudos.reduceRight((acc, selector) => `${normalizePseudoSelector(selector)} { ${acc} }`, cssDeclaration);
}
function compileAtomicCSSRule(options, atRules) {
  const { className, selectors, property, rtlClassName, rtlProperty, rtlValue, value } = options;
  const { container, layer, media, scope, supports } = atRules;
  const classNameSelector = `.${className}`;
  const cssDeclaration = Array.isArray(value) ? `${value.map((v2) => `${hyphenateProperty(property)}: ${v2}`).join(";")};` : `${hyphenateProperty(property)}: ${value};`;
  const ltrBody = createCSSDeclaration(cssDeclaration, selectors);
  let cssRule = scope ? `@scope (${classNameSelector}) ${scope} { :scope{${ltrBody}} }` : `${classNameSelector}{${ltrBody}}`;
  if (rtlProperty && rtlClassName) {
    const rtlClassNameSelector = `.${rtlClassName}`;
    const rtlCSSDeclaration = Array.isArray(rtlValue) ? `${rtlValue.map((v2) => `${hyphenateProperty(rtlProperty)}: ${v2}`).join(";")};` : `${hyphenateProperty(rtlProperty)}: ${rtlValue};`;
    const rtlBody = createCSSDeclaration(rtlCSSDeclaration, selectors);
    cssRule += scope ? `@scope (${rtlClassNameSelector}) ${scope} { :scope{${rtlBody}} }` : `${rtlClassNameSelector}{${rtlBody}}`;
  }
  if (media) {
    cssRule = `@media ${media} { ${cssRule} }`;
  }
  if (layer) {
    cssRule = `@layer ${layer} { ${cssRule} }`;
  }
  if (supports) {
    cssRule = `@supports ${supports} { ${cssRule} }`;
  }
  if (container) {
    cssRule = `@container ${container} { ${cssRule} }`;
  }
  return compileCSSRules(cssRule);
}
function cssifyObject(style) {
  let css = "";
  for (const property in style) {
    const value = style[property];
    if (typeof value === "string" || typeof value === "number") {
      css += hyphenateProperty(property) + ":" + value + ";";
      continue;
    }
    if (Array.isArray(value)) {
      for (const arrValue of value) {
        css += hyphenateProperty(property) + ":" + arrValue + ";";
      }
    }
  }
  return css;
}
function compileKeyframeRule(keyframeObject) {
  let css = "";
  for (const percentage in keyframeObject) {
    css += `${percentage}{${cssifyObject(keyframeObject[percentage])}}`;
  }
  return css;
}
function compileKeyframesCSS(keyframeName, keyframeCSS) {
  const cssRule = `@keyframes ${keyframeName} {${keyframeCSS}}`;
  const rules = [];
  serialize(compile(cssRule), middleware([
    stringify,
    prefixerPlugin,
    // 💡 we are using `.insertRule()` API for DOM operations, which does not support
    // insertion of multiple CSS rules in a single call. `rulesheet` plugin extracts
    // individual rules to be used with this API
    rulesheet((rule) => rules.push(rule))
  ]));
  return rules;
}
const pseudosMap = {
  // :focus-within
  "us-w": "w",
  // :focus-visible
  "us-v": "i",
  // :link
  nk: "l",
  // :visited
  si: "v",
  // :focus
  cu: "f",
  // :hover
  ve: "h",
  // :active
  ti: "a"
};
function getStyleBucketName(selectors, atRules) {
  if (atRules.media) {
    return "m";
  }
  if (atRules.layer || atRules.supports) {
    return "t";
  }
  if (atRules.container) {
    return "x";
  }
  if (selectors.length > 0) {
    const normalizedPseudo = selectors[0].trim();
    if (normalizedPseudo.charCodeAt(0) === 58) {
      return pseudosMap[normalizedPseudo.slice(4, 8)] || pseudosMap[normalizedPseudo.slice(3, 5)] || "d";
    }
  }
  return "d";
}
const shorthands = {
  animation: [
    -1,
    [
      "animationDelay",
      "animationDirection",
      "animationDuration",
      "animationFillMode",
      "animationIterationCount",
      "animationName",
      "animationPlayState",
      "animationTimeline",
      "animationTimingFunction"
    ]
  ],
  animationRange: [-1, ["animationRangeEnd", "animationRangeStart"]],
  background: [
    -2,
    [
      "backgroundAttachment",
      "backgroundClip",
      "backgroundColor",
      "backgroundImage",
      "backgroundOrigin",
      "backgroundPosition",
      "backgroundPositionX",
      "backgroundPositionY",
      "backgroundRepeat",
      "backgroundSize"
    ]
  ],
  backgroundPosition: [-1, ["backgroundPositionX", "backgroundPositionY"]],
  border: [
    -2,
    [
      "borderBottom",
      "borderBottomColor",
      "borderBottomStyle",
      "borderBottomWidth",
      "borderLeft",
      "borderLeftColor",
      "borderLeftStyle",
      "borderLeftWidth",
      "borderRight",
      "borderRightColor",
      "borderRightStyle",
      "borderRightWidth",
      "borderTop",
      "borderTopColor",
      "borderTopStyle",
      "borderTopWidth"
    ]
  ],
  borderBottom: [-1, ["borderBottomColor", "borderBottomStyle", "borderBottomWidth"]],
  borderImage: [
    -1,
    ["borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth"]
  ],
  borderLeft: [-1, ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"]],
  borderRadius: [
    -1,
    ["borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"]
  ],
  borderRight: [-1, ["borderRightColor", "borderRightStyle", "borderRightWidth"]],
  borderTop: [-1, ["borderTopColor", "borderTopStyle", "borderTopWidth"]],
  caret: [-1, ["caretColor", "caretShape"]],
  columnRule: [-1, ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"]],
  columns: [-1, ["columnCount", "columnWidth"]],
  containIntrinsicSize: [-1, ["containIntrinsicHeight", "containIntrinsicWidth"]],
  container: [-1, ["containerName", "containerType"]],
  flex: [-1, ["flexBasis", "flexGrow", "flexShrink"]],
  flexFlow: [-1, ["flexDirection", "flexWrap"]],
  font: [-1, ["fontFamily", "fontSize", "fontStretch", "fontStyle", "fontVariant", "fontWeight", "lineHeight"]],
  gap: [-1, ["columnGap", "rowGap"]],
  grid: [
    -1,
    [
      "columnGap",
      "gridAutoColumns",
      "gridAutoFlow",
      "gridAutoRows",
      "gridColumnGap",
      "gridRowGap",
      "gridTemplateAreas",
      "gridTemplateColumns",
      "gridTemplateRows",
      "rowGap"
    ]
  ],
  gridArea: [-1, ["gridColumnEnd", "gridColumnStart", "gridRowEnd", "gridRowStart"]],
  gridColumn: [-1, ["gridColumnEnd", "gridColumnStart"]],
  gridRow: [-1, ["gridRowEnd", "gridRowStart"]],
  gridTemplate: [-1, ["gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"]],
  inset: [-1, ["bottom", "left", "right", "top"]],
  insetBlock: [-1, ["insetBlockEnd", "insetBlockStart"]],
  insetInline: [-1, ["insetInlineEnd", "insetInlineStart"]],
  listStyle: [-1, ["listStyleImage", "listStylePosition", "listStyleType"]],
  margin: [-1, ["marginBottom", "marginLeft", "marginRight", "marginTop"]],
  marginBlock: [-1, ["marginBlockEnd", "marginBlockStart"]],
  marginInline: [-1, ["marginInlineEnd", "marginInlineStart"]],
  mask: [
    -1,
    ["maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPosition", "maskRepeat", "maskSize"]
  ],
  maskBorder: [
    -1,
    [
      "maskBorderMode",
      "maskBorderOutset",
      "maskBorderRepeat",
      "maskBorderSlice",
      "maskBorderSource",
      "maskBorderWidth"
    ]
  ],
  offset: [-1, ["offsetAnchor", "offsetDistance", "offsetPath", "offsetPosition", "offsetRotate"]],
  outline: [-1, ["outlineColor", "outlineStyle", "outlineWidth"]],
  overflow: [-1, ["overflowX", "overflowY"]],
  overscrollBehavior: [-1, ["overscrollBehaviorX", "overscrollBehaviorY"]],
  padding: [-1, ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"]],
  paddingBlock: [-1, ["paddingBlockEnd", "paddingBlockStart"]],
  paddingInline: [-1, ["paddingInlineEnd", "paddingInlineStart"]],
  placeContent: [-1, ["alignContent", "justifyContent"]],
  placeItems: [-1, ["alignItems", "justifyItems"]],
  placeSelf: [-1, ["alignSelf", "justifySelf"]],
  positionTry: [-1, ["positionTryFallbacks", "positionTryOrder"]],
  scrollMargin: [-1, ["scrollMarginBottom", "scrollMarginLeft", "scrollMarginRight", "scrollMarginTop"]],
  scrollMarginBlock: [-1, ["scrollMarginBlockEnd", "scrollMarginBlockStart"]],
  scrollMarginInline: [-1, ["scrollMarginInlineEnd", "scrollMarginInlineStart"]],
  scrollPadding: [-1, ["scrollPaddingBottom", "scrollPaddingLeft", "scrollPaddingRight", "scrollPaddingTop"]],
  scrollPaddingBlock: [-1, ["scrollPaddingBlockEnd", "scrollPaddingBlockStart"]],
  scrollPaddingInline: [-1, ["scrollPaddingInlineEnd", "scrollPaddingInlineStart"]],
  scrollTimeline: [-1, ["scrollTimelineAxis", "scrollTimelineName"]],
  textDecoration: [-1, ["textDecorationColor", "textDecorationLine", "textDecorationStyle", "textDecorationThickness"]],
  textEmphasis: [-1, ["textEmphasisColor", "textEmphasisStyle"]],
  textWrap: [-1, ["textWrapMode", "textWrapStyle"]],
  transition: [
    -1,
    ["transitionBehavior", "transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction"]
  ],
  viewTimeline: [-1, ["viewTimelineAxis", "viewTimelineName"]]
};
function generateCombinedQuery(currentMediaQuery, nestedMediaQuery) {
  if (currentMediaQuery.length === 0) {
    return nestedMediaQuery;
  }
  return `${currentMediaQuery} and ${nestedMediaQuery}`;
}
function addAtRulePrefix(atRule, prefix2) {
  return atRule ? prefix2 + atRule : atRule;
}
function atRulesToString(atRules) {
  return addAtRulePrefix(atRules.container, "c") + addAtRulePrefix(atRules.media, "m") + addAtRulePrefix(atRules.layer, "l") + addAtRulePrefix(atRules.supports, "s") + addAtRulePrefix(atRules.scope, "o");
}
function hashPropertyKey(selector, property, atRules) {
  const computedKey = selector + atRulesToString(atRules) + property;
  const hashedKey = murmur2(computedKey);
  const firstCharCode = hashedKey.charCodeAt(0);
  const startsWithNumber = firstCharCode >= 48 && firstCharCode <= 57;
  if (startsWithNumber) {
    return String.fromCharCode(firstCharCode + 17) + hashedKey.slice(1);
  }
  return hashedKey;
}
function hashClassName({ property, selector, salt, value }, atRules) {
  return HASH_PREFIX + murmur2(salt + selector + atRulesToString(atRules) + property + // Trimming of value is required to generate consistent hashes
  value.trim());
}
function isContainerQuerySelector(property) {
  return property.substring(0, 10) === "@container";
}
function isLayerSelector(property) {
  return property.substr(0, 6) === "@layer";
}
function isMediaQuerySelector(property) {
  return property.substr(0, 6) === "@media";
}
const regex = /^(:|\[|>|&)/;
function isNestedSelector(property) {
  return regex.test(property);
}
function isObject(val) {
  return val != null && typeof val === "object" && Array.isArray(val) === false;
}
function isResetValue(value) {
  return value === RESET;
}
function isScopeSelector(property) {
  return property.substring(0, 6) === "@scope";
}
function isSupportQuerySelector(property) {
  return property.substr(0, 9) === "@supports";
}
function trimSelector(selector) {
  return selector.replace(/>\s+/g, ">");
}
function warnAboutUnsupportedProperties(property, value) {
}
function getShorthandDefinition(property) {
  return shorthands[property];
}
function computePropertyPriority(shorthand) {
  var _a;
  return (_a = shorthand === null || shorthand === void 0 ? void 0 : shorthand[0]) !== null && _a !== void 0 ? _a : 0;
}
function pushToClassesMap(classesMap, propertyKey, ltrClassname, rtlClassname) {
  classesMap[propertyKey] = rtlClassname ? [ltrClassname, rtlClassname] : ltrClassname;
}
function createBucketEntry(cssRule, metadata) {
  if (metadata.length > 0) {
    return [cssRule, Object.fromEntries(metadata)];
  }
  return cssRule;
}
function pushToCSSRules(cssRulesByBucket, styleBucketName, ltrCSS, rtlCSS, media, container, priority) {
  var _a;
  const metadata = [];
  if (priority !== 0) {
    metadata.push(["p", priority]);
  }
  if (styleBucketName === "m" && media) {
    metadata.push(["m", media]);
  }
  if (styleBucketName === "x" && container) {
    metadata.push(["x", container]);
  }
  (_a = cssRulesByBucket[styleBucketName]) !== null && _a !== void 0 ? _a : cssRulesByBucket[styleBucketName] = [];
  if (ltrCSS) {
    cssRulesByBucket[styleBucketName].push(createBucketEntry(ltrCSS, metadata));
  }
  if (rtlCSS) {
    cssRulesByBucket[styleBucketName].push(createBucketEntry(rtlCSS, metadata));
  }
}
function resolveStyleRules(styles, classNameHashSalt = "", selectors = [], atRules = {
  container: "",
  layer: "",
  media: "",
  supports: "",
  scope: ""
}, cssClassesMap = {}, cssRulesByBucket = {}, rtlValue) {
  for (const property in styles) {
    if (UNSUPPORTED_CSS_PROPERTIES.hasOwnProperty(property)) {
      warnAboutUnsupportedProperties(property, styles[property]);
      continue;
    }
    const value = styles[property];
    if (value == null) {
      continue;
    }
    if (isResetValue(value)) {
      const selector = trimSelector(selectors.join(""));
      const key = hashPropertyKey(selector, property, atRules);
      pushToClassesMap(cssClassesMap, key, 0, void 0);
      continue;
    }
    if (typeof value === "string" || typeof value === "number") {
      const selector = trimSelector(selectors.join(""));
      const shorthand = getShorthandDefinition(property);
      if (shorthand) {
        const shorthandProperties = shorthand[1];
        const shorthandResetStyles = Object.fromEntries(shorthandProperties.map((property2) => [property2, RESET]));
        resolveStyleRules(shorthandResetStyles, classNameHashSalt, selectors, atRules, cssClassesMap, cssRulesByBucket);
      }
      const key = hashPropertyKey(selector, property, atRules);
      const className = hashClassName({
        value: value.toString(),
        salt: classNameHashSalt,
        selector,
        property
      }, atRules);
      const rtlDefinition = rtlValue && { key: property, value: rtlValue } || convertProperty(property, value);
      const flippedInRtl = rtlDefinition.key !== property || rtlDefinition.value !== value;
      const rtlClassName = flippedInRtl ? hashClassName({
        value: rtlDefinition.value.toString(),
        property: rtlDefinition.key,
        salt: classNameHashSalt,
        selector
      }, atRules) : void 0;
      const rtlCompileOptions = flippedInRtl ? {
        rtlClassName,
        rtlProperty: rtlDefinition.key,
        rtlValue: rtlDefinition.value
      } : void 0;
      const styleBucketName = getStyleBucketName(selectors, atRules);
      const [ltrCSS, rtlCSS] = compileAtomicCSSRule({
        className,
        selectors,
        property,
        value,
        ...rtlCompileOptions
      }, atRules);
      pushToClassesMap(cssClassesMap, key, className, rtlClassName);
      pushToCSSRules(cssRulesByBucket, styleBucketName, ltrCSS, rtlCSS, atRules.media, atRules.container, computePropertyPriority(shorthand));
    } else if (property === "animationName") {
      const animationNameValue = Array.isArray(value) ? value : [value];
      const animationNames = [];
      const rtlAnimationNames = [];
      for (const keyframeObject of animationNameValue) {
        const keyframeCSS = compileKeyframeRule(keyframeObject);
        const rtlKeyframeCSS = compileKeyframeRule(convert(keyframeObject));
        const animationName = HASH_PREFIX + murmur2(keyframeCSS);
        let rtlAnimationName;
        const keyframeRules = compileKeyframesCSS(animationName, keyframeCSS);
        let rtlKeyframeRules = [];
        if (keyframeCSS === rtlKeyframeCSS) {
          rtlAnimationName = animationName;
        } else {
          rtlAnimationName = HASH_PREFIX + murmur2(rtlKeyframeCSS);
          rtlKeyframeRules = compileKeyframesCSS(rtlAnimationName, rtlKeyframeCSS);
        }
        for (let i = 0; i < keyframeRules.length; i++) {
          pushToCSSRules(
            cssRulesByBucket,
            // keyframes styles should be inserted into own bucket
            "k",
            keyframeRules[i],
            rtlKeyframeRules[i],
            atRules.media,
            atRules.container,
            // keyframes always have default priority
            0
          );
        }
        animationNames.push(animationName);
        rtlAnimationNames.push(rtlAnimationName);
      }
      resolveStyleRules({ animationName: animationNames.join(", ") }, classNameHashSalt, selectors, atRules, cssClassesMap, cssRulesByBucket, rtlAnimationNames.join(", "));
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        continue;
      }
      const selector = trimSelector(selectors.join(""));
      const shorthand = getShorthandDefinition(property);
      if (shorthand) {
        const shorthandProperties = shorthand[1];
        const shorthandResetStyles = Object.fromEntries(shorthandProperties.map((property2) => [property2, RESET]));
        resolveStyleRules(shorthandResetStyles, classNameHashSalt, selectors, atRules, cssClassesMap, cssRulesByBucket);
      }
      const key = hashPropertyKey(selector, property, atRules);
      const className = hashClassName({
        value: value.map((v2) => (v2 !== null && v2 !== void 0 ? v2 : "").toString()).join(";"),
        salt: classNameHashSalt,
        selector,
        property
      }, atRules);
      const rtlDefinitions = value.map((v2) => convertProperty(property, v2));
      const rtlPropertyConsistent = !rtlDefinitions.some((v2) => v2.key !== rtlDefinitions[0].key);
      if (!rtlPropertyConsistent) {
        continue;
      }
      const flippedInRtl = rtlDefinitions[0].key !== property || rtlDefinitions.some((v2, i) => v2.value !== value[i]);
      const rtlClassName = flippedInRtl ? hashClassName({
        value: rtlDefinitions.map((v2) => {
          var _a;
          return ((_a = v2 === null || v2 === void 0 ? void 0 : v2.value) !== null && _a !== void 0 ? _a : "").toString();
        }).join(";"),
        salt: classNameHashSalt,
        property: rtlDefinitions[0].key,
        selector
      }, atRules) : void 0;
      const rtlCompileOptions = flippedInRtl ? {
        rtlClassName,
        rtlProperty: rtlDefinitions[0].key,
        rtlValue: rtlDefinitions.map((d) => d.value)
      } : void 0;
      const styleBucketName = getStyleBucketName(selectors, atRules);
      const [ltrCSS, rtlCSS] = compileAtomicCSSRule({
        className,
        selectors,
        property,
        value,
        ...rtlCompileOptions
      }, atRules);
      pushToClassesMap(cssClassesMap, key, className, rtlClassName);
      pushToCSSRules(cssRulesByBucket, styleBucketName, ltrCSS, rtlCSS, atRules.media, atRules.container, computePropertyPriority(shorthand));
    } else if (isObject(value)) {
      if (isNestedSelector(property)) {
        resolveStyleRules(value, classNameHashSalt, selectors.concat(normalizeNestedProperty(property)), atRules, cssClassesMap, cssRulesByBucket);
      } else if (isMediaQuerySelector(property)) {
        const combinedMediaQuery = generateCombinedQuery(atRules.media, property.slice(6).trim());
        resolveStyleRules(value, classNameHashSalt, selectors, { ...atRules, media: combinedMediaQuery }, cssClassesMap, cssRulesByBucket);
      } else if (isLayerSelector(property)) {
        const combinedLayerQuery = (atRules.layer ? `${atRules.layer}.` : "") + property.slice(6).trim();
        resolveStyleRules(value, classNameHashSalt, selectors, { ...atRules, layer: combinedLayerQuery }, cssClassesMap, cssRulesByBucket);
      } else if (isSupportQuerySelector(property)) {
        const combinedSupportQuery = generateCombinedQuery(atRules.supports, property.slice(9).trim());
        resolveStyleRules(value, classNameHashSalt, selectors, { ...atRules, supports: combinedSupportQuery }, cssClassesMap, cssRulesByBucket);
      } else if (isContainerQuerySelector(property)) {
        const containerQuery = property.slice(10).trim();
        resolveStyleRules(value, classNameHashSalt, selectors, { ...atRules, container: containerQuery }, cssClassesMap, cssRulesByBucket);
      } else if (isScopeSelector(property)) {
        if (atRules.scope) {
          continue;
        }
        const scopeQuery = property.slice(6).trim();
        if (scopeQuery === "" || !scopeQuery.startsWith("to ")) {
          continue;
        }
        resolveStyleRules(value, classNameHashSalt, selectors, { ...atRules, scope: scopeQuery }, cssClassesMap, cssRulesByBucket);
      } else ;
    }
  }
  return [cssClassesMap, cssRulesByBucket];
}
function resolveStyleRulesForSlots(stylesBySlots, classNameHashSalt = "") {
  const classesMapBySlot = {};
  const cssRules = {};
  for (const slotName in stylesBySlots) {
    const slotStyles = stylesBySlots[slotName];
    const [cssClassMap, cssRulesByBucket] = resolveStyleRules(slotStyles, classNameHashSalt);
    classesMapBySlot[slotName] = cssClassMap;
    Object.keys(cssRulesByBucket).forEach((styleBucketName) => {
      cssRules[styleBucketName] = (cssRules[styleBucketName] || []).concat(cssRulesByBucket[styleBucketName]);
    });
  }
  return [classesMapBySlot, cssRules];
}
function makeStyles$1(stylesBySlots, factory = insertionFactory) {
  const insertStyles = factory();
  let classesMapBySlot = null;
  let cssRules = null;
  let ltrClassNamesForSlots = null;
  let rtlClassNamesForSlots = null;
  function computeClasses(options) {
    const { dir, renderer } = options;
    if (classesMapBySlot === null) {
      [classesMapBySlot, cssRules] = resolveStyleRulesForSlots(stylesBySlots, renderer.classNameHashSalt);
    }
    const isLTR = dir === "ltr";
    if (isLTR) {
      if (ltrClassNamesForSlots === null) {
        ltrClassNamesForSlots = reduceToClassNameForSlots(classesMapBySlot, dir);
      }
    } else {
      if (rtlClassNamesForSlots === null) {
        rtlClassNamesForSlots = reduceToClassNameForSlots(classesMapBySlot, dir);
      }
    }
    insertStyles(renderer, cssRules);
    const classNamesForSlots = isLTR ? ltrClassNamesForSlots : rtlClassNamesForSlots;
    return classNamesForSlots;
  }
  return computeClasses;
}
function makeStyles(stylesBySlots) {
  const getStyles = makeStyles$1(stylesBySlots, insertionFactory$1);
  return function useClasses() {
    const dir = useTextDirection();
    const renderer = useRenderer();
    return getStyles({ dir, renderer });
  };
}
class GroupperDummyManager extends DummyInputManager {
  constructor(element, groupper, tabster, sys) {
    super(tabster, element, DummyInputManagerPriorities.Groupper, sys, true);
    this._setHandlers((dummyInput, isBackward, relatedTarget) => {
      const container = element.get();
      const input = dummyInput.input;
      if (container && input) {
        const ctx = RootAPI.getTabsterContext(tabster, input);
        if (ctx) {
          let next2;
          next2 = groupper.findNextTabbable(relatedTarget || void 0, void 0, isBackward, true)?.element;
          if (!next2) {
            next2 = FocusedElementState.findNextTabbable(tabster, ctx, void 0, dummyInput.isOutside ? input : getAdjacentElement(container, !isBackward), void 0, isBackward, true)?.element;
          }
          if (next2) {
            nativeFocus(next2);
          }
        }
      }
    });
  }
}
class Groupper extends TabsterPart {
  constructor(tabster, element, onDispose, props, sys) {
    super(tabster, element, props);
    this._shouldTabInside = false;
    this.makeTabbable(false);
    this._onDispose = onDispose;
    if (!tabster.controlTab) {
      this.dummyManager = new GroupperDummyManager(this._element, this, tabster, sys);
    }
  }
  dispose() {
    this._onDispose(this);
    this._element.get();
    this.dummyManager?.dispose();
    delete this.dummyManager;
    delete this._first;
  }
  findNextTabbable(currentElement, referenceElement, isBackward, ignoreAccessibility) {
    const groupperElement = this.getElement();
    if (!groupperElement) {
      return null;
    }
    const currentIsDummy = getDummyInputContainer(currentElement) === groupperElement;
    if (!this._shouldTabInside && currentElement && dom.nodeContains(groupperElement, currentElement) && !currentIsDummy) {
      return { element: void 0, outOfDOMOrder: true };
    }
    const groupperFirstFocusable = this.getFirst(true);
    if (!currentElement || !dom.nodeContains(groupperElement, currentElement) || currentIsDummy) {
      return {
        element: groupperFirstFocusable,
        outOfDOMOrder: true
      };
    }
    const tabster = this._tabster;
    let next2 = null;
    let outOfDOMOrder = false;
    let uncontrolled;
    if (this._shouldTabInside && groupperFirstFocusable) {
      const findProps = {
        container: groupperElement,
        currentElement,
        referenceElement,
        ignoreAccessibility,
        useActiveModalizer: true
      };
      const findPropsOut = {};
      next2 = tabster.focusable[isBackward ? "findPrev" : "findNext"](findProps, findPropsOut);
      outOfDOMOrder = !!findPropsOut.outOfDOMOrder;
      if (!next2 && this._props.tabbability === GroupperTabbabilities.LimitedTrapFocus) {
        next2 = tabster.focusable[isBackward ? "findLast" : "findFirst"]({
          container: groupperElement,
          ignoreAccessibility,
          useActiveModalizer: true
        }, findPropsOut);
        outOfDOMOrder = true;
      }
      uncontrolled = findPropsOut.uncontrolled;
    }
    return {
      element: next2,
      uncontrolled,
      outOfDOMOrder
    };
  }
  makeTabbable(isTabbable) {
    this._shouldTabInside = isTabbable || !this._props.tabbability;
  }
  isActive(noIfFirstIsFocused) {
    const element = this.getElement() || null;
    let isParentActive = true;
    for (let e = dom.getParentElement(element); e; e = dom.getParentElement(e)) {
      const g = getTabsterOnElement(this._tabster, e)?.groupper;
      if (g) {
        if (!g._shouldTabInside) {
          isParentActive = false;
        }
      }
    }
    let ret = isParentActive ? this._props.tabbability ? this._shouldTabInside : false : void 0;
    if (ret && noIfFirstIsFocused) {
      const focused = this._tabster.focusedElement.getFocusedElement();
      if (focused) {
        ret = focused !== this.getFirst(true);
      }
    }
    return ret;
  }
  getFirst(orContainer) {
    const groupperElement = this.getElement();
    let first;
    if (groupperElement) {
      if (orContainer && this._tabster.focusable.isFocusable(groupperElement)) {
        return groupperElement;
      }
      first = this._first?.get();
      if (!first) {
        first = this._tabster.focusable.findFirst({
          container: groupperElement,
          useActiveModalizer: true
        }) || void 0;
        if (first) {
          this.setFirst(first);
        }
      }
    }
    return first;
  }
  setFirst(element) {
    if (element) {
      this._first = new WeakHTMLElement(element);
    } else {
      delete this._first;
    }
  }
  acceptElement(element, state) {
    const cachedGrouppers = state.cachedGrouppers;
    const parentElement = dom.getParentElement(this.getElement());
    const parentCtx = parentElement && RootAPI.getTabsterContext(this._tabster, parentElement);
    const parentCtxGroupper = parentCtx?.groupper;
    const parentGroupper = parentCtx?.groupperBeforeMover ? parentCtxGroupper : void 0;
    let parentGroupperElement;
    const getIsActive = (groupper) => {
      let cached = cachedGrouppers[groupper.id];
      let isActive2;
      if (cached) {
        isActive2 = cached.isActive;
      } else {
        isActive2 = this.isActive(true);
        cached = cachedGrouppers[groupper.id] = {
          isActive: isActive2
        };
      }
      return isActive2;
    };
    if (parentGroupper) {
      parentGroupperElement = parentGroupper.getElement();
      if (!getIsActive(parentGroupper) && parentGroupperElement && state.container !== parentGroupperElement && dom.nodeContains(state.container, parentGroupperElement)) {
        state.skippedFocusable = true;
        return NodeFilter.FILTER_REJECT;
      }
    }
    const isActive = getIsActive(this);
    const groupperElement = this.getElement();
    if (groupperElement) {
      if (isActive !== true) {
        if (groupperElement === element && parentCtxGroupper) {
          if (!parentGroupperElement) {
            parentGroupperElement = parentCtxGroupper.getElement();
          }
          if (parentGroupperElement && !getIsActive(parentCtxGroupper) && dom.nodeContains(state.container, parentGroupperElement) && parentGroupperElement !== state.container) {
            state.skippedFocusable = true;
            return NodeFilter.FILTER_REJECT;
          }
        }
        if (groupperElement !== element && dom.nodeContains(groupperElement, element)) {
          state.skippedFocusable = true;
          return NodeFilter.FILTER_REJECT;
        }
        const cached = cachedGrouppers[this.id];
        let first;
        if ("first" in cached) {
          first = cached.first;
        } else {
          first = cached.first = this.getFirst(true);
        }
        if (first && state.acceptCondition(first)) {
          state.rejectElementsFrom = groupperElement;
          state.skippedFocusable = true;
          if (first !== state.from) {
            state.found = true;
            state.foundElement = first;
            return NodeFilter.FILTER_ACCEPT;
          } else {
            return NodeFilter.FILTER_REJECT;
          }
        }
      }
    }
    return void 0;
  }
}
class GroupperAPI {
  constructor(tabster, getWindow) {
    this._current = {};
    this._grouppers = {};
    this._init = () => {
      const win = this._win();
      this._tabster.focusedElement.subscribeFirst(this._onFocus);
      const doc = win.document;
      const activeElement = dom.getActiveElement(doc);
      if (activeElement) {
        this._onFocus(activeElement);
      }
      addListener(doc, "mousedown", this._onMouseDown, true);
      addListener(win, "keydown", this._onKeyDown, true);
      addListener(win, GroupperMoveFocusEventName, this._onMoveFocus);
    };
    this._onGroupperDispose = (groupper) => {
      delete this._grouppers[groupper.id];
    };
    this._onFocus = (element) => {
      if (element) {
        this._updateCurrent(element);
      }
    };
    this._onMouseDown = (e) => {
      let target = e.target;
      while (target && !this._tabster.focusable.isFocusable(target)) {
        target = this._tabster.getParent(target);
      }
      if (target) {
        this._updateCurrent(target);
      }
    };
    this._onKeyDown = (event) => {
      if (event.key !== Keys.Enter && event.key !== Keys.Escape) {
        return;
      }
      if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey) {
        return;
      }
      const element = this._tabster.focusedElement.getFocusedElement();
      if (element) {
        this.handleKeyPress(element, event);
      }
    };
    this._onMoveFocus = (e) => {
      const element = e.composedPath()[0];
      const action = e.detail?.action;
      if (element && action !== void 0 && !e.defaultPrevented) {
        if (action === GroupperMoveFocusActions.Enter) {
          this._enterGroupper(element);
        } else {
          this._escapeGroupper(element);
        }
        e.stopImmediatePropagation();
      }
    };
    this._tabster = tabster;
    this._win = getWindow;
    tabster.queueInit(this._init);
  }
  dispose() {
    const win = this._win();
    this._tabster.focusedElement.cancelAsyncFocus(AsyncFocusSources.EscapeGroupper);
    this._current = {};
    if (this._updateTimer) {
      win.clearTimeout(this._updateTimer);
      delete this._updateTimer;
    }
    this._tabster.focusedElement.unsubscribe(this._onFocus);
    removeListener(win.document, "mousedown", this._onMouseDown, true);
    removeListener(win, "keydown", this._onKeyDown, true);
    removeListener(win, GroupperMoveFocusEventName, this._onMoveFocus);
    Object.keys(this._grouppers).forEach((groupperId) => {
      if (this._grouppers[groupperId]) {
        this._grouppers[groupperId].dispose();
        delete this._grouppers[groupperId];
      }
    });
  }
  createGroupper(element, props, sys) {
    const tabster = this._tabster;
    const newGroupper = new Groupper(tabster, element, this._onGroupperDispose, props, sys);
    this._grouppers[newGroupper.id] = newGroupper;
    const focusedElement = tabster.focusedElement.getFocusedElement();
    if (focusedElement && dom.nodeContains(element, focusedElement) && !this._updateTimer) {
      this._updateTimer = this._win().setTimeout(() => {
        delete this._updateTimer;
        if (focusedElement === tabster.focusedElement.getFocusedElement()) {
          this._updateCurrent(focusedElement);
        }
      }, 0);
    }
    return newGroupper;
  }
  forgetCurrentGrouppers() {
    this._current = {};
  }
  _updateCurrent(element) {
    if (this._updateTimer) {
      this._win().clearTimeout(this._updateTimer);
      delete this._updateTimer;
    }
    const tabster = this._tabster;
    const newIds = {};
    for (let el = tabster.getParent(element); el; el = tabster.getParent(el)) {
      const groupper = getTabsterOnElement(tabster, el)?.groupper;
      if (groupper) {
        newIds[groupper.id] = true;
        this._current[groupper.id] = groupper;
        const isTabbable = groupper.isActive() || element !== el && (!groupper.getProps().delegated || groupper.getFirst(false) !== element);
        groupper.makeTabbable(isTabbable);
      }
    }
    for (const id of Object.keys(this._current)) {
      const groupper = this._current[id];
      if (!(groupper.id in newIds)) {
        groupper.makeTabbable(false);
        groupper.setFirst(void 0);
        delete this._current[id];
      }
    }
  }
  _enterGroupper(element, relatedEvent) {
    const tabster = this._tabster;
    const ctx = RootAPI.getTabsterContext(tabster, element);
    const groupper = ctx?.groupper || ctx?.modalizerInGroupper;
    const groupperElement = groupper?.getElement();
    if (groupper && groupperElement && (element === groupperElement || groupper.getProps().delegated && element === groupper.getFirst(false))) {
      const next2 = tabster.focusable.findNext({
        container: groupperElement,
        currentElement: element,
        useActiveModalizer: true
      });
      if (next2 && (!relatedEvent || relatedEvent && dispatchEvent(groupperElement, new TabsterMoveFocusEvent({
        by: "groupper",
        owner: groupperElement,
        next: next2,
        relatedEvent
      })))) {
        if (relatedEvent) {
          relatedEvent.preventDefault();
          relatedEvent.stopImmediatePropagation();
        }
        next2.focus();
        return next2;
      }
    }
    return null;
  }
  _escapeGroupper(element, relatedEvent, fromModalizer) {
    const tabster = this._tabster;
    const ctx = RootAPI.getTabsterContext(tabster, element);
    let groupper = ctx?.groupper || ctx?.modalizerInGroupper;
    const groupperElement = groupper?.getElement();
    if (groupper && groupperElement && dom.nodeContains(groupperElement, element)) {
      let next2;
      if (element !== groupperElement || fromModalizer) {
        next2 = groupper.getFirst(true);
      } else {
        const parentElement = dom.getParentElement(groupperElement);
        const parentCtx = parentElement ? RootAPI.getTabsterContext(tabster, parentElement) : void 0;
        groupper = parentCtx?.groupper;
        next2 = groupper?.getFirst(true);
      }
      if (next2 && (!relatedEvent || relatedEvent && dispatchEvent(groupperElement, new TabsterMoveFocusEvent({
        by: "groupper",
        owner: groupperElement,
        next: next2,
        relatedEvent
      })))) {
        if (groupper) {
          groupper.makeTabbable(false);
        }
        next2.focus();
        return next2;
      }
    }
    return null;
  }
  moveFocus(element, action) {
    return action === GroupperMoveFocusActions.Enter ? this._enterGroupper(element) : this._escapeGroupper(element);
  }
  handleKeyPress(element, event, fromModalizer) {
    const tabster = this._tabster;
    const ctx = RootAPI.getTabsterContext(tabster, element);
    if (ctx && (ctx?.groupper || ctx?.modalizerInGroupper)) {
      tabster.focusedElement.cancelAsyncFocus(AsyncFocusSources.EscapeGroupper);
      if (ctx.ignoreKeydown(event)) {
        return;
      }
      if (event.key === Keys.Enter) {
        this._enterGroupper(element, event);
      } else if (event.key === Keys.Escape) {
        const focusedElement = tabster.focusedElement.getFocusedElement();
        tabster.focusedElement.requestAsyncFocus(AsyncFocusSources.EscapeGroupper, () => {
          if (focusedElement !== tabster.focusedElement.getFocusedElement() && // A part of Modalizer that has called this handler to escape the active groupper
          // might have been removed from DOM, if the focus is on body, we still want to handle Esc.
          (fromModalizer && !focusedElement || !fromModalizer)) {
            return;
          }
          this._escapeGroupper(element, event, fromModalizer);
        }, 0);
      }
    }
  }
}
function getGroupper(tabster) {
  const tabsterCore = tabster.core;
  if (!tabsterCore.groupper) {
    const api2 = new GroupperAPI(tabsterCore, tabsterCore.getWindow);
    tabsterCore.groupper = api2;
    tabsterCore.attrHandlers.set("groupper", (element, existingGroupper, newProps, _oldProps, sys) => {
      if (existingGroupper) {
        existingGroupper.setProps(newProps);
        return existingGroupper;
      }
      return api2.createGroupper(element, newProps, sys);
    });
  }
  return tabsterCore.groupper;
}
const useFocusableGroup = (options) => {
  useTabster(getGroupper);
  return useTabsterAttributes({
    groupper: {
      tabbability: getTabbability(options === null || options === void 0 ? void 0 : options.tabBehavior)
    },
    focusable: {
      ignoreKeydown: options === null || options === void 0 ? void 0 : options.ignoreDefaultKeydown
    }
  });
};
const getTabbability = (tabBehavior) => {
  switch (tabBehavior) {
    case "unlimited":
      return GroupperTabbabilities.Unlimited;
    case "limited":
      return GroupperTabbabilities.Limited;
    case "limited-trap-focus":
      return GroupperTabbabilities.LimitedTrapFocus;
    default:
      return void 0;
  }
};
const tokens = {
  // Color tokens
  colorNeutralForeground1: "var(--colorNeutralForeground1)",
  colorNeutralForeground2: "var(--colorNeutralForeground2)",
  colorNeutralForeground3: "var(--colorNeutralForeground3)",
  colorBrandForeground2: "var(--colorBrandForeground2)",
  colorNeutralBackground1: "var(--colorNeutralBackground1)",
  colorNeutralBackground1Hover: "var(--colorNeutralBackground1Hover)",
  colorNeutralBackground2: "var(--colorNeutralBackground2)",
  colorNeutralBackground3: "var(--colorNeutralBackground3)",
  colorBrandBackground: "var(--colorBrandBackground)",
  colorTransparentStroke: "var(--colorTransparentStroke)",
  colorPaletteRedForeground1: "var(--colorPaletteRedForeground1)",
  borderRadiusSmall: "var(--borderRadiusSmall)",
  borderRadiusMedium: "var(--borderRadiusMedium)",
  borderRadiusLarge: "var(--borderRadiusLarge)",
  borderRadiusXLarge: "var(--borderRadiusXLarge)",
  borderRadiusCircular: "var(--borderRadiusCircular)",
  fontSizeBase200: "var(--fontSizeBase200)",
  fontWeightSemibold: "var(--fontWeightSemibold)",
  lineHeightBase200: "var(--lineHeightBase200)",
  // Shadow tokens
  shadow2: "var(--shadow2)",
  shadow8: "var(--shadow8)",
  shadow16: "var(--shadow16)",
  durationFaster: "var(--durationFaster)",
  durationFast: "var(--durationFast)",
  durationNormal: "var(--durationNormal)",
  durationGentle: "var(--durationGentle)",
  curveAccelerateMid: "var(--curveAccelerateMid)",
  curveDecelerateMax: "var(--curveDecelerateMax)",
  curveDecelerateMid: "var(--curveDecelerateMid)",
  curveEasyEase: "var(--curveEasyEase)"
};
const SearchRegular = /* @__PURE__ */ createFluentIcon("SearchRegular", "1em", ["M13.73 14.44a6.5 6.5 0 1 1 .7-.7l3.42 3.4a.5.5 0 0 1-.63.77l-.07-.06zm-.71-.71A5.5 5.5 0 0 0 15 9.5a5.5 5.5 0 1 0-1.98 4.23"]);
const SkeletonContext = reactExports.createContext(void 0);
const skeletonContextDefaultValue = {};
const SkeletonContextProvider = SkeletonContext.Provider;
const useSkeletonContext = () => {
  var _React_useContext;
  return (_React_useContext = reactExports.useContext(SkeletonContext)) !== null && _React_useContext !== void 0 ? _React_useContext : skeletonContextDefaultValue;
};
const useSkeleton_unstable = (props, ref) => {
  const { animation: contextAnimation, appearance: contextAppearance } = useSkeletonContext();
  const { animation = contextAnimation !== null && contextAnimation !== void 0 ? contextAnimation : "wave", appearance = contextAppearance !== null && contextAppearance !== void 0 ? contextAppearance : "opaque", size, shape, ...baseProps } = props;
  const baseState = useSkeletonBase_unstable(baseProps, ref);
  return {
    ...baseState,
    animation,
    appearance,
    size,
    shape
  };
};
const useSkeletonBase_unstable = (props, ref) => {
  const root = always(getIntrinsicElementProps("div", {
    ref,
    role: "progressbar",
    "aria-busy": true,
    ...props
  }), {
    elementType: "div"
  });
  return {
    components: {
      root: "div"
    },
    root
  };
};
const renderSkeleton_unstable = (state, contextValues) => {
  return /* @__PURE__ */ jsx(SkeletonContextProvider, {
    value: contextValues.skeletonGroup,
    children: /* @__PURE__ */ jsx(state.root, {})
  });
};
const skeletonClassNames = {
  root: "fui-Skeleton"
};
const useStyles$8 = /* @__PURE__ */ __styles({
  blockStyling: {
    mc9l5x: "ftgm304"
  }
}, {
  d: [".ftgm304{display:block;}"]
});
const useSkeletonStyles_unstable = (state) => {
  const styles = useStyles$8();
  state.root.className = mergeClasses(skeletonClassNames.root, state.root.as === "span" && styles.blockStyling, state.root.className);
  return state;
};
const useSkeletonContextValues = (state) => {
  const { animation, appearance, size, shape } = state;
  const skeletonGroup = reactExports.useMemo(() => ({
    animation,
    appearance,
    size,
    shape
  }), [
    animation,
    appearance,
    size,
    shape
  ]);
  return {
    skeletonGroup
  };
};
const Skeleton = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useSkeleton_unstable(props, ref);
  const contextValues = useSkeletonContextValues(state);
  useSkeletonStyles_unstable(state);
  useCustomStyleHook("useSkeletonStyles_unstable")(state);
  return renderSkeleton_unstable(state, contextValues);
});
Skeleton.displayName = "Skeleton";
const useSkeletonItem_unstable = (props, ref) => {
  const { animation: contextAnimation, appearance: contextAppearance, size: contextSize, shape: contextShape } = useSkeletonContext();
  const { animation = contextAnimation !== null && contextAnimation !== void 0 ? contextAnimation : "wave", appearance = contextAppearance !== null && contextAppearance !== void 0 ? contextAppearance : "opaque", size = contextSize !== null && contextSize !== void 0 ? contextSize : 16, shape = contextShape !== null && contextShape !== void 0 ? contextShape : "rectangle", ...baseProps } = props;
  const baseState = useSkeletonItemBase_unstable(baseProps, ref);
  return {
    ...baseState,
    animation,
    appearance,
    size,
    shape
  };
};
const useSkeletonItemBase_unstable = (props, ref) => {
  const root = always(getIntrinsicElementProps("div", {
    ref,
    ...props
  }), {
    elementType: "div"
  });
  return {
    components: {
      root: "div"
    },
    root
  };
};
const renderSkeletonItem_unstable = (state) => {
  return /* @__PURE__ */ jsx(state.root, {});
};
const skeletonItemClassNames = {
  root: "fui-SkeletonItem"
};
const useStyles$7 = /* @__PURE__ */ __styles({
  root: {
    qhf8xq: "f10pi13n",
    B68tc82: 0,
    Bmxbyg5: 0,
    Bpg54ce: "f1a3p1vp",
    Bsft5z2: "f13zj6fq",
    ap17g6: "f2gz7yw",
    E3zdtr: "f1mdlcz9",
    By385i5: 0,
    Eqx8gd: 0,
    B1piin3: 0,
    bn5sak: 0,
    B58onuk: "f1nt53hs",
    s9ouvv: "f18xs7ez",
    xr36ep: "ffm3629",
    Bitv4sc: "f1f9zsvm",
    Gt9ir8: "f1evo4vk",
    Crt7la: "f18va1k3"
  },
  wave: {
    De3pzq: "f1gjxg63",
    Br128sd: ["f3fo419", "f6m9r4"],
    h62rwi: ["ftnv2js", "f12jzhyt"],
    b1kco5: ["fig1c6l", "f1rv5y9h"],
    Iqrfzq: "f1xjc3a9"
  },
  pulse: {
    Br128sd: "f171zwvm",
    xr36ep: "fs3pcyf",
    Bjyk6c5: "f1yu5riq"
  },
  translucent: {
    De3pzq: "f162mh4z",
    h62rwi: ["flvf4r0", "f1uek97b"]
  },
  translucentPulse: {
    De3pzq: "flu3bqm",
    Bjyk6c5: "fxucc0w"
  },
  blockStyling: {
    mc9l5x: "ftgm304"
  }
}, {
  d: [".f10pi13n{position:relative;}", [".f1a3p1vp{overflow:hidden;}", {
    p: -1
  }], '.f13zj6fq::after{content:"";}', ".f2gz7yw::after{display:block;}", ".f1mdlcz9::after{position:absolute;}", [".f1nt53hs::after{inset:0;}", {
    p: -1
  }], ".f18xs7ez::after{animation-iteration-count:infinite;}", ".ffm3629::after{animation-duration:3s;}", ".f1f9zsvm::after{animation-timing-function:ease-in-out;}", ".f1gjxg63{background-color:var(--colorNeutralStencil1);}", ".f3fo419::after{animation-name:f1efwx7q;}", ".f6m9r4::after{animation-name:f1kkgpz1;}", ".ftnv2js::after{background-image:linear-gradient(\n        to right,\n        var(--colorNeutralStencil1) 0%,\n        var(--colorNeutralStencil2) 50%,\n        var(--colorNeutralStencil1) 100%);}", ".f12jzhyt::after{background-image:linear-gradient(\n        to left,\n        var(--colorNeutralStencil1) 0%,\n        var(--colorNeutralStencil2) 50%,\n        var(--colorNeutralStencil1) 100%);}", ".fig1c6l::after{transform:translate(-100%);}", ".f1rv5y9h::after{transform:translate(100%);}", ".f171zwvm::after{animation-name:f12o7gg6;}", ".fs3pcyf::after{animation-duration:1s;}", ".f1yu5riq::after{background-color:var(--colorNeutralStencil1);}", ".f162mh4z{background-color:var(--colorNeutralStencil1Alpha);}", ".flvf4r0::after{background-image:linear-gradient(\n      to right,\n      transparent 0%,\n      var(--colorNeutralStencil1Alpha) 50%,\n      transparent 100%);}", ".f1uek97b::after{background-image:linear-gradient(\n      to left,\n      transparent 0%,\n      var(--colorNeutralStencil1Alpha) 50%,\n      transparent 100%);}", ".flu3bqm{background-color:none;}", ".fxucc0w::after{background-color:var(--colorNeutralStencil1Alpha);}", ".ftgm304{display:block;}"],
  m: [["@media screen and (prefers-reduced-motion: reduce){.f1evo4vk::after{animation-duration:0.01ms;}}", {
    m: "screen and (prefers-reduced-motion: reduce)"
  }], ["@media screen and (prefers-reduced-motion: reduce){.f18va1k3::after{animation-iteration-count:1;}}", {
    m: "screen and (prefers-reduced-motion: reduce)"
  }], ["@media screen and (forced-colors: active){.f1xjc3a9::after{background-color:WindowText;}}", {
    m: "screen and (forced-colors: active)"
  }]],
  k: ["@keyframes f1efwx7q{to{transform:translate(100%);}}", "@keyframes f1kkgpz1{to{transform:translate(-100%);}}", "@keyframes f12o7gg6{0%{opacity:1;}50%{opacity:0.4;}100%{opacity:1;}}"]
});
const useRectangleStyles = /* @__PURE__ */ __styles({
  "8": {
    Bqenvij: "f1x82gua"
  },
  "12": {
    Bqenvij: "fvblgha"
  },
  "14": {
    Bqenvij: "fuesxvb"
  },
  "16": {
    Bqenvij: "fd461yt"
  },
  "20": {
    Bqenvij: "fjamq6b"
  },
  "22": {
    Bqenvij: "f50nw0v"
  },
  "24": {
    Bqenvij: "frvgh55"
  },
  "28": {
    Bqenvij: "fxldao9"
  },
  "32": {
    Bqenvij: "f1d2rq10"
  },
  "36": {
    Bqenvij: "f8ljn23"
  },
  "40": {
    Bqenvij: "fbhnoac"
  },
  "48": {
    Bqenvij: "ff2sm71"
  },
  "52": {
    Bqenvij: "fltz6oj"
  },
  "56": {
    Bqenvij: "fzki0ko"
  },
  "64": {
    Bqenvij: "f16k9i2m"
  },
  "72": {
    Bqenvij: "f1shusfg"
  },
  "92": {
    Bqenvij: "f19zsq0h"
  },
  "96": {
    Bqenvij: "fypu0ge"
  },
  "120": {
    Bqenvij: "fjr5b71"
  },
  "128": {
    Bqenvij: "fele2au"
  },
  root: {
    a9b677: "fly5x3f",
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "ff3glw6"
  }
}, {
  d: [".f1x82gua{height:8px;}", ".fvblgha{height:12px;}", ".fuesxvb{height:14px;}", ".fd461yt{height:16px;}", ".fjamq6b{height:20px;}", ".f50nw0v{height:22px;}", ".frvgh55{height:24px;}", ".fxldao9{height:28px;}", ".f1d2rq10{height:32px;}", ".f8ljn23{height:36px;}", ".fbhnoac{height:40px;}", ".ff2sm71{height:48px;}", ".fltz6oj{height:52px;}", ".fzki0ko{height:56px;}", ".f16k9i2m{height:64px;}", ".f1shusfg{height:72px;}", ".f19zsq0h{height:92px;}", ".fypu0ge{height:96px;}", ".fjr5b71{height:120px;}", ".fele2au{height:128px;}", ".fly5x3f{width:100%;}", [".ff3glw6{border-radius:4px;}", {
    p: -1
  }]]
});
const useSizeStyles = /* @__PURE__ */ __styles({
  "8": {
    a9b677: "f1o3cbw4",
    Bqenvij: "f1x82gua"
  },
  "12": {
    a9b677: "frx94fk",
    Bqenvij: "fvblgha"
  },
  "14": {
    a9b677: "fz18fzn",
    Bqenvij: "fuesxvb"
  },
  "16": {
    a9b677: "fjw5fx7",
    Bqenvij: "fd461yt"
  },
  "20": {
    a9b677: "f64fuq3",
    Bqenvij: "fjamq6b"
  },
  "22": {
    a9b677: "f6zmzpu",
    Bqenvij: "f50nw0v"
  },
  "24": {
    a9b677: "fq4mcun",
    Bqenvij: "frvgh55"
  },
  "28": {
    a9b677: "f1w9dchk",
    Bqenvij: "fxldao9"
  },
  "32": {
    a9b677: "f1szoe96",
    Bqenvij: "f1d2rq10"
  },
  "36": {
    a9b677: "fpdz1er",
    Bqenvij: "f8ljn23"
  },
  "40": {
    a9b677: "feqmc2u",
    Bqenvij: "fbhnoac"
  },
  "48": {
    a9b677: "f124akge",
    Bqenvij: "ff2sm71"
  },
  "52": {
    a9b677: "f16130wi",
    Bqenvij: "fltz6oj"
  },
  "56": {
    a9b677: "f1u66zr1",
    Bqenvij: "fzki0ko"
  },
  "64": {
    a9b677: "fa9ln6p",
    Bqenvij: "f16k9i2m"
  },
  "72": {
    a9b677: "fhcae8x",
    Bqenvij: "f1shusfg"
  },
  "92": {
    a9b677: "f78o5r6",
    Bqenvij: "f19zsq0h"
  },
  "96": {
    a9b677: "f1kyr2gn",
    Bqenvij: "fypu0ge"
  },
  "120": {
    a9b677: "fwfqyga",
    Bqenvij: "fjr5b71"
  },
  "128": {
    a9b677: "f1iksgmy",
    Bqenvij: "fele2au"
  }
}, {
  d: [".f1o3cbw4{width:8px;}", ".f1x82gua{height:8px;}", ".frx94fk{width:12px;}", ".fvblgha{height:12px;}", ".fz18fzn{width:14px;}", ".fuesxvb{height:14px;}", ".fjw5fx7{width:16px;}", ".fd461yt{height:16px;}", ".f64fuq3{width:20px;}", ".fjamq6b{height:20px;}", ".f6zmzpu{width:22px;}", ".f50nw0v{height:22px;}", ".fq4mcun{width:24px;}", ".frvgh55{height:24px;}", ".f1w9dchk{width:28px;}", ".fxldao9{height:28px;}", ".f1szoe96{width:32px;}", ".f1d2rq10{height:32px;}", ".fpdz1er{width:36px;}", ".f8ljn23{height:36px;}", ".feqmc2u{width:40px;}", ".fbhnoac{height:40px;}", ".f124akge{width:48px;}", ".ff2sm71{height:48px;}", ".f16130wi{width:52px;}", ".fltz6oj{height:52px;}", ".f1u66zr1{width:56px;}", ".fzki0ko{height:56px;}", ".fa9ln6p{width:64px;}", ".f16k9i2m{height:64px;}", ".fhcae8x{width:72px;}", ".f1shusfg{height:72px;}", ".f78o5r6{width:92px;}", ".f19zsq0h{height:92px;}", ".f1kyr2gn{width:96px;}", ".fypu0ge{height:96px;}", ".fwfqyga{width:120px;}", ".fjr5b71{height:120px;}", ".f1iksgmy{width:128px;}", ".fele2au{height:128px;}"]
});
const useCircleSizeStyles = /* @__PURE__ */ __styles({
  root: {
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "f5q2cvs"
  }
}, {
  d: [[".f5q2cvs{border-radius:50%;}", {
    p: -1
  }]]
});
const useSkeletonItemStyles_unstable = (state) => {
  const {
    animation,
    appearance,
    size,
    shape
  } = state;
  const rootStyles = useStyles$7();
  const rectStyles = useRectangleStyles();
  const sizeStyles = useSizeStyles();
  const circleStyles = useCircleSizeStyles();
  state.root.className = mergeClasses(skeletonItemClassNames.root, rootStyles.root, state.root.as === "span" && rootStyles.blockStyling, animation === "wave" && rootStyles.wave, animation === "pulse" && rootStyles.pulse, appearance === "translucent" && rootStyles.translucent, animation === "pulse" && appearance === "translucent" && rootStyles.translucentPulse, shape === "rectangle" && rectStyles.root, shape === "rectangle" && rectStyles[size], shape === "square" && sizeStyles[size], shape === "circle" && circleStyles.root, shape === "circle" && sizeStyles[size], state.root.className);
  return state;
};
const SkeletonItem = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useSkeletonItem_unstable(props, ref);
  useSkeletonItemStyles_unstable(state);
  useCustomStyleHook("useSkeletonItemStyles_unstable")(state);
  return renderSkeletonItem_unstable(state);
});
SkeletonItem.displayName = "SkeletonItem";
function createPreset(options) {
  const { useStyles: useStyles2, className, displayName } = options;
  const Wrapper = reactExports.forwardRef((props, ref) => {
    const styles = useStyles2();
    const state = useText_unstable(props, ref);
    useTextStyles_unstable(state);
    state.root.className = mergeClasses(className, state.root.className, styles.root, props.className);
    return renderText_unstable(state);
  });
  Wrapper.displayName = displayName;
  return Wrapper;
}
const body1StrongClassNames = {
  root: "fui-Body1Strong"
};
const useBody1StrongStyles = /* @__PURE__ */ __styles({
  root: {
    Bahqtrf: "fk6fouc",
    Be2twd7: "fkhj508",
    Bhrd7zp: "fl43uef",
    Bg96gwp: "f1i3iumi"
  }
}, {
  d: [".fk6fouc{font-family:var(--fontFamilyBase);}", ".fkhj508{font-size:var(--fontSizeBase300);}", ".fl43uef{font-weight:var(--fontWeightSemibold);}", ".f1i3iumi{line-height:var(--lineHeightBase300);}"]
});
const Body1Strong = createPreset({
  useStyles: useBody1StrongStyles,
  className: body1StrongClassNames.root,
  displayName: "Body1Strong"
});
const caption1ClassNames = {
  root: "fui-Caption1"
};
const useCaption1Styles = /* @__PURE__ */ __styles({
  root: {
    Bahqtrf: "fk6fouc",
    Be2twd7: "fy9rknc",
    Bhrd7zp: "figsok6",
    Bg96gwp: "fwrc4pm"
  }
}, {
  d: [".fk6fouc{font-family:var(--fontFamilyBase);}", ".fy9rknc{font-size:var(--fontSizeBase200);}", ".figsok6{font-weight:var(--fontWeightRegular);}", ".fwrc4pm{line-height:var(--lineHeightBase200);}"]
});
const Caption1 = createPreset({
  useStyles: useCaption1Styles,
  className: caption1ClassNames.root,
  displayName: "Caption1"
});
const subtitle1ClassNames = {
  root: "fui-Subtitle1"
};
const useSubtitle1Styles = /* @__PURE__ */ __styles({
  root: {
    Bahqtrf: "fk6fouc",
    Be2twd7: "f1pp30po",
    Bhrd7zp: "fl43uef",
    Bg96gwp: "f106mvju"
  }
}, {
  d: [".fk6fouc{font-family:var(--fontFamilyBase);}", ".f1pp30po{font-size:var(--fontSizeBase500);}", ".fl43uef{font-weight:var(--fontWeightSemibold);}", ".f106mvju{line-height:var(--lineHeightBase500);}"]
});
const Subtitle1 = createPreset({
  useStyles: useSubtitle1Styles,
  className: subtitle1ClassNames.root,
  displayName: "Subtitle1"
});
const subtitle2ClassNames = {
  root: "fui-Subtitle2"
};
const useSubtitle2Styles = /* @__PURE__ */ __styles({
  root: {
    Bahqtrf: "fk6fouc",
    Be2twd7: "fod5ikn",
    Bhrd7zp: "fl43uef",
    Bg96gwp: "faaz57k"
  }
}, {
  d: [".fk6fouc{font-family:var(--fontFamilyBase);}", ".fod5ikn{font-size:var(--fontSizeBase400);}", ".fl43uef{font-weight:var(--fontWeightSemibold);}", ".faaz57k{line-height:var(--lineHeightBase400);}"]
});
const Subtitle2 = createPreset({
  useStyles: useSubtitle2Styles,
  className: subtitle2ClassNames.root,
  displayName: "Subtitle2"
});
const useCardSelectable = (props, { referenceLabel, referenceId }) => {
  const { checkbox = {}, onSelectionChange, floatingAction, onClick, onKeyDown, disabled, shouldRestrictTriggerAction } = props;
  const checkboxRef = reactExports.useRef(null);
  const [selected, setSelected] = useControllableState({
    state: props.selected,
    defaultState: props.defaultSelected,
    initialState: false
  });
  const selectable = [
    props.selected,
    props.defaultSelected,
    onSelectionChange
  ].some((prop) => typeof prop !== "undefined");
  const [selectFocused, setSelectFocused] = reactExports.useState(false);
  const onChangeHandler = reactExports.useCallback((event) => {
    if (disabled) {
      return;
    }
    const isCheckboxOrFloatingActionTarget = checkboxRef.current === event.target;
    if (!isCheckboxOrFloatingActionTarget && (shouldRestrictTriggerAction === null || shouldRestrictTriggerAction === void 0 ? void 0 : shouldRestrictTriggerAction(event))) {
      return;
    }
    const newCheckedValue = !selected;
    setSelected(newCheckedValue);
    if (onSelectionChange) {
      onSelectionChange(event, {
        selected: newCheckedValue
      });
    }
  }, [
    disabled,
    onSelectionChange,
    selected,
    setSelected,
    shouldRestrictTriggerAction
  ]);
  const onKeyDownHandler = reactExports.useCallback((event) => {
    if ([
      Enter
    ].includes(event.key)) {
      event.preventDefault();
      onChangeHandler(event);
    }
  }, [
    onChangeHandler
  ]);
  const checkboxSlot = reactExports.useMemo(() => {
    if (!selectable || floatingAction) {
      return;
    }
    const selectableCheckboxProps = {};
    if (referenceId) {
      selectableCheckboxProps["aria-labelledby"] = referenceId;
    } else if (referenceLabel) {
      selectableCheckboxProps["aria-label"] = referenceLabel;
    }
    return optional(checkbox, {
      defaultProps: {
        ref: checkboxRef,
        type: "checkbox",
        checked: selected,
        disabled,
        onChange: (event) => onChangeHandler(event),
        onFocus: () => setSelectFocused(true),
        onBlur: () => setSelectFocused(false),
        ...selectableCheckboxProps
      },
      elementType: "input"
    });
  }, [
    checkbox,
    disabled,
    floatingAction,
    selected,
    selectable,
    onChangeHandler,
    referenceId,
    referenceLabel
  ]);
  const floatingActionSlot = reactExports.useMemo(() => {
    if (!floatingAction) {
      return;
    }
    return optional(floatingAction, {
      defaultProps: {
        ref: checkboxRef
      },
      elementType: "div"
    });
  }, [
    floatingAction
  ]);
  const selectableCardProps = reactExports.useMemo(() => {
    if (!selectable) {
      return null;
    }
    return {
      // eslint-disable-next-line react-hooks/refs
      onClick: mergeCallbacks(onClick, onChangeHandler),
      // eslint-disable-next-line react-hooks/refs
      onKeyDown: mergeCallbacks(onKeyDown, onKeyDownHandler)
    };
  }, [
    selectable,
    onChangeHandler,
    onClick,
    onKeyDown,
    onKeyDownHandler
  ]);
  return {
    selected,
    selectable,
    selectFocused,
    selectableCardProps,
    checkboxSlot,
    floatingActionSlot
  };
};
const cardContext = reactExports.createContext(void 0);
const cardContextDefaultValue = {
  selectableA11yProps: {
    referenceId: void 0
  }
};
const CardProvider = cardContext.Provider;
const focusMap = {
  off: void 0,
  "no-tab": "limited-trap-focus",
  "tab-exit": "limited",
  "tab-only": "unlimited"
};
const interactiveEventProps = [
  "onClick",
  "onDoubleClick",
  "onMouseUp",
  "onMouseDown",
  "onPointerUp",
  "onPointerDown",
  "onTouchStart",
  "onTouchEnd",
  "onDragStart",
  "onDragEnd"
];
const computeInteractive = (props) => {
  if (props.disabled) {
    return false;
  }
  return interactiveEventProps.some((prop) => props[prop] !== void 0);
};
const useCard_unstable = (props, ref) => {
  const { appearance = "filled", orientation = "vertical", size = "medium", ...cardProps } = props;
  const { disabled = false, focusMode: focusModeProp } = props;
  const focusWithinRef = useFocusWithin();
  const cardRef = useMergedRefs(focusWithinRef, ref);
  const { findAllFocusable } = useFocusFinders();
  const shouldRestrictTriggerAction = reactExports.useCallback((event) => {
    if (!focusWithinRef.current) {
      return false;
    }
    const focusableElements = findAllFocusable(focusWithinRef.current);
    const target = event.target;
    return focusableElements.some((element) => element.contains(target));
  }, [
    findAllFocusable,
    focusWithinRef
  ]);
  const interactive = computeInteractive(props);
  const focusMode = focusModeProp !== null && focusModeProp !== void 0 ? focusModeProp : interactive ? "no-tab" : "off";
  const groupperAttrs = useFocusableGroup({
    tabBehavior: focusMap[focusMode]
  });
  const state = useCardBase_unstable({
    shouldRestrictTriggerAction,
    ...cardProps
  }, cardRef);
  const shouldApplyFocusAttributes = !disabled && !state.selectable && focusMode !== "off";
  if (shouldApplyFocusAttributes) {
    Object.assign(state.root, groupperAttrs, {
      tabIndex: 0
    });
  }
  return {
    ...state,
    appearance,
    orientation,
    size
  };
};
const useCardBase_unstable = (props, ref) => {
  const { disabled = false, ...restProps } = props;
  const [referenceId, setReferenceId] = reactExports.useState(cardContextDefaultValue.selectableA11yProps.referenceId);
  const [referenceLabel, setReferenceLabel] = reactExports.useState(cardContextDefaultValue.selectableA11yProps.referenceId);
  const { selectable, selected, selectableCardProps, selectFocused, checkboxSlot, floatingActionSlot } = useCardSelectable(props, {
    referenceId,
    referenceLabel
  });
  const interactive = computeInteractive(props);
  let cardRootProps = {
    ...restProps,
    ...selectableCardProps
  };
  if (disabled) {
    cardRootProps = {
      ...restProps,
      "aria-disabled": true,
      onClick: void 0
    };
  }
  return {
    interactive,
    selectable,
    selectFocused,
    selected,
    disabled,
    selectableA11yProps: {
      setReferenceId,
      referenceId,
      referenceLabel,
      setReferenceLabel
    },
    components: {
      root: "div",
      floatingAction: "div",
      checkbox: "input"
    },
    root: always(getIntrinsicElementProps("div", {
      ref,
      role: "group",
      ...cardRootProps
    }), {
      elementType: "div"
    }),
    floatingAction: floatingActionSlot,
    checkbox: checkboxSlot
  };
};
const renderCard_unstable = (state, cardContextValue) => {
  return /* @__PURE__ */ jsx(state.root, {
    children: /* @__PURE__ */ jsxs(CardProvider, {
      value: cardContextValue,
      children: [
        state.checkbox ? /* @__PURE__ */ jsx(state.checkbox, {}) : null,
        state.floatingAction ? /* @__PURE__ */ jsx(state.floatingAction, {}) : null,
        state.root.children
      ]
    })
  });
};
const cardClassNames = {
  root: "fui-Card",
  floatingAction: "fui-Card__floatingAction",
  checkbox: "fui-Card__checkbox"
};
const useCardResetStyles = /* @__PURE__ */ __resetStyles("rfxo2k2", "rgle7w9", [".rfxo2k2{overflow:hidden;border-radius:var(--fui-Card--border-radius);padding:var(--fui-Card--size);gap:var(--fui-Card--size);display:flex;position:relative;box-sizing:border-box;color:var(--colorNeutralForeground1);}", '.rfxo2k2::after{position:absolute;top:0;left:0;right:0;bottom:0;content:"";pointer-events:none;border-top-style:solid;border-right-style:solid;border-bottom-style:solid;border-left-style:solid;border-top-width:var(--strokeWidthThin);border-right-width:var(--strokeWidthThin);border-bottom-width:var(--strokeWidthThin);border-left-width:var(--strokeWidthThin);border-radius:var(--fui-Card--border-radius);}', ".rfxo2k2>.fui-CardHeader,.rfxo2k2>.fui-CardFooter{flex-shrink:0;}", ".rgle7w9{overflow:hidden;border-radius:var(--fui-Card--border-radius);padding:var(--fui-Card--size);gap:var(--fui-Card--size);display:flex;position:relative;box-sizing:border-box;color:var(--colorNeutralForeground1);}", '.rgle7w9::after{position:absolute;top:0;right:0;left:0;bottom:0;content:"";pointer-events:none;border-top-style:solid;border-left-style:solid;border-bottom-style:solid;border-right-style:solid;border-top-width:var(--strokeWidthThin);border-left-width:var(--strokeWidthThin);border-bottom-width:var(--strokeWidthThin);border-right-width:var(--strokeWidthThin);border-radius:var(--fui-Card--border-radius);}', ".rgle7w9>.fui-CardHeader,.rgle7w9>.fui-CardFooter{flex-shrink:0;}"]);
const useCardStyles = /* @__PURE__ */ __styles({
  focused: {
    Brovlpu: "ftqa4ok",
    B486eqv: "f2hkw1w",
    B8q5s1w: "f8hki3x",
    Bci5o5g: ["f1d2448m", "ffh67wi"],
    n8qw10: "f1bjia2o",
    Bdrgwmp: ["ffh67wi", "f1d2448m"],
    Bqhya38: "f1j6vpng",
    Bwxa6fj: ["f1pniga2", "f1ffjurs"],
    Bdhvstf: "f987i1v",
    B7zbvrb: ["f1ffjurs", "f1pniga2"],
    Bm4h7ae: "f15bsgw9",
    B7ys5i9: "f14e48fq",
    Busjfv9: "f18yb2kv",
    Bhk32uz: "fd6o370",
    f6g5ot: 0,
    Boxcth7: 0,
    Bhdgwq3: 0,
    hgwjuy: 0,
    Bshpdp8: 0,
    Bsom6fd: 0,
    Blkhhs4: 0,
    Bonggc9: 0,
    Ddfuxk: 0,
    i03rao: 0,
    kclons: 0,
    clg4pj: 0,
    Bpqj9nj: 0,
    B6dhp37: 0,
    Bf4ptjt: 0,
    Bqtpl0w: 0,
    i4rwgc: "fpqizxz",
    Dah5zi: 0,
    B1tsrr9: 0,
    qqdqy8: 0,
    Bkh64rk: 0,
    e3fwne: "fnd8nzh",
    J0r882: "f15fr7a0",
    Bule8hv: ["fwsq40z", "fy0y4wt"],
    Bjwuhne: "f34ld9f",
    Ghsupd: ["fy0y4wt", "fwsq40z"]
  },
  selectableFocused: {
    Brovlpu: "ftqa4ok",
    B486eqv: "f2hkw1w",
    Bssx7fj: "f1b1k54r",
    uh7if5: ["f4ne723", "fqqcjud"],
    clntm0: "fh7aioi",
    Dlk2r6: ["fqqcjud", "f4ne723"],
    h6p2u: "f1ufm4qn",
    I6qiy5: ["f1qnwcb4", "fgrk5zm"],
    yzno9d: "fi52z01",
    By0wis0: ["fgrk5zm", "f1qnwcb4"],
    B2j2mmj: "ffht0p2",
    wigs8: "f1p0ul1q",
    pbfy6t: "f1c901ms",
    B0v4ure: "f1alokd7",
    Byrf0fs: 0,
    Bsiemmq: 0,
    Bwckmig: 0,
    skfxo0: 0,
    Iidy0u: 0,
    B98u21t: 0,
    Bvwlmkc: 0,
    jo1ztg: 0,
    Ba1iezr: 0,
    Blmvk6g: 0,
    B24cy0v: 0,
    Bil7v7r: 0,
    Br3gin4: 0,
    nr063g: 0,
    ghq09: 0,
    Bbgo44z: 0,
    Bseh09z: "f1i978nd",
    az1dzo: 0,
    Ba3ybja: 0,
    B6352mv: 0,
    vppk2z: 0,
    Biaj6j7: "f1nh8hsq",
    B2pnrqr: "f1amxum7",
    B29w5g4: ["f1cec8w7", "f554mv0"],
    Bhhzhcn: "f1sj6kbr",
    Bec0n69: ["f554mv0", "f1cec8w7"]
  },
  orientationHorizontal: {
    Beiy3e4: "f1063pyq",
    Bt984gj: "f122n59",
    Binpb3b: "ftrw7vg",
    qrt8p2: "f18opajm",
    k6ws3r: ["f13002it", "fqo182t"],
    Btcwela: ["f18yna97", "f1kd6wh7"],
    Fer9m8: "f4i4759"
  },
  orientationVertical: {
    Beiy3e4: "f1vx9l62",
    B5nvv7i: ["f14k419y", "f1fgo9fz"],
    Baxg94k: ["f1fgo9fz", "f14k419y"],
    tn21ii: "fvqmfsm",
    B0ud6bj: "f3am6yf",
    Bgdo4j: "f1r5wgso"
  },
  sizeSmall: {
    B7balbw: "f1pi9uxy",
    B1h88n7: "f1h1zgly"
  },
  sizeMedium: {
    B7balbw: "frsmuga",
    B1h88n7: "fuldkky"
  },
  sizeLarge: {
    B7balbw: "f1qua4xo",
    B1h88n7: "fimkt6v"
  },
  interactive: {
    rhjd8f: "f1epqm3e"
  },
  filled: {
    De3pzq: "fxugw4r",
    E5pizo: "f1whvlc6",
    B0n5ga8: "f16gxe2i",
    s924m2: ["fpgykix", "fzybk4o"],
    B1q35kw: "f1osi826",
    Gp14am: ["fzybk4o", "fpgykix"]
  },
  filledInteractive: {
    Bceei9c: "f1k6fduh",
    De3pzq: "fxugw4r",
    E5pizo: "f1whvlc6",
    B0n5ga8: "f16gxe2i",
    s924m2: ["fpgykix", "fzybk4o"],
    B1q35kw: "f1osi826",
    Gp14am: ["fzybk4o", "fpgykix"],
    Bi91k9c: "feu1g3u",
    Jwef8y: "f1knas48",
    Bvxd0ez: "f1m145df",
    ecr2s2: "fb40n2d"
  },
  filledInteractiveSelected: {
    De3pzq: "f1nfm20t",
    B0n5ga8: "f16eln5f",
    s924m2: ["fa2okxs", "fg4zq3l"],
    B1q35kw: "ff6932p",
    Gp14am: ["fg4zq3l", "fa2okxs"],
    Bi91k9c: "fx9teim",
    Jwef8y: "f1kz6goq"
  },
  filledAlternative: {
    De3pzq: "f1dmdbja",
    E5pizo: "f1whvlc6",
    B0n5ga8: "f16gxe2i",
    s924m2: ["fpgykix", "fzybk4o"],
    B1q35kw: "f1osi826",
    Gp14am: ["fzybk4o", "fpgykix"]
  },
  filledAlternativeInteractive: {
    Bceei9c: "f1k6fduh",
    De3pzq: "f1dmdbja",
    E5pizo: "f1whvlc6",
    B0n5ga8: "f16gxe2i",
    s924m2: ["fpgykix", "fzybk4o"],
    B1q35kw: "f1osi826",
    Gp14am: ["fzybk4o", "fpgykix"],
    Bi91k9c: "fnwyq0v",
    Jwef8y: "f1uvynv3",
    Bvxd0ez: "f1m145df",
    ecr2s2: "f1yhgkbh"
  },
  filledAlternativeInteractiveSelected: {
    De3pzq: "fjxa0vh",
    B0n5ga8: "f16eln5f",
    s924m2: ["fa2okxs", "fg4zq3l"],
    B1q35kw: "ff6932p",
    Gp14am: ["fg4zq3l", "fa2okxs"],
    Bi91k9c: "f1luvkty",
    Jwef8y: "fehi0vp"
  },
  outline: {
    De3pzq: "f1c21dwh",
    E5pizo: "f1couhl3",
    B0n5ga8: "ft83z1f",
    s924m2: ["f1g4150c", "f192dr6e"],
    B1q35kw: "f1qnawh6",
    Gp14am: ["f192dr6e", "f1g4150c"]
  },
  outlineInteractive: {
    Bceei9c: "f1k6fduh",
    De3pzq: "f1c21dwh",
    E5pizo: "f1couhl3",
    B0n5ga8: "ft83z1f",
    s924m2: ["f1g4150c", "f192dr6e"],
    B1q35kw: "f1qnawh6",
    Gp14am: ["f192dr6e", "f1g4150c"],
    Bi91k9c: "feu1g3u",
    Jwef8y: "fjxutwb",
    Be0v6ae: "f1llr77y",
    B5kxglz: ["fzk0khw", "fjj8tog"],
    B3pwyw6: "fb1u8ub",
    Bymgtzf: ["fjj8tog", "fzk0khw"],
    ecr2s2: "fophhak",
    dmfk: "f1uohb70",
    B4ofi8: ["f1jm7v1n", "f1bus3rq"],
    jgq6uv: "f1fbu7rr",
    Baxewws: ["f1bus3rq", "f1jm7v1n"]
  },
  outlineInteractiveSelected: {
    De3pzq: "f1q9pm1r",
    B0n5ga8: "f16eln5f",
    s924m2: ["fa2okxs", "fg4zq3l"],
    B1q35kw: "ff6932p",
    Gp14am: ["fg4zq3l", "fa2okxs"],
    Bi91k9c: "fx9teim",
    Jwef8y: "fg59vm4"
  },
  outlineDisabled: {
    De3pzq: "f1c21dwh",
    E5pizo: "f1couhl3",
    g2u3we: "f1jj8ep1",
    h3c5rm: ["f15xbau", "fy0fskl"],
    B9xav0g: "f4ikngz",
    zhjwy3: ["fy0fskl", "f15xbau"],
    ezxybo: "f1ls5moo",
    wc7uws: "f1qiza15",
    B0n5ga8: "f13dj02",
    s924m2: ["f9wngki", "f17v59j0"],
    B1q35kw: "f1vxzwsp",
    Gp14am: ["f17v59j0", "f9wngki"]
  },
  subtle: {
    De3pzq: "fhovq9v",
    E5pizo: "f1couhl3",
    B0n5ga8: "f16gxe2i",
    s924m2: ["fpgykix", "fzybk4o"],
    B1q35kw: "f1osi826",
    Gp14am: ["fzybk4o", "fpgykix"]
  },
  subtleInteractive: {
    Bceei9c: "f1k6fduh",
    De3pzq: "fhovq9v",
    E5pizo: "f1couhl3",
    B0n5ga8: "f16gxe2i",
    s924m2: ["fpgykix", "fzybk4o"],
    B1q35kw: "f1osi826",
    Gp14am: ["fzybk4o", "fpgykix"],
    Bi91k9c: "feu1g3u",
    Jwef8y: "f1t94bn6",
    ecr2s2: "f1wfn5kd"
  },
  subtleInteractiveSelected: {
    De3pzq: "fq5gl1p",
    B0n5ga8: "f16eln5f",
    s924m2: ["fa2okxs", "fg4zq3l"],
    B1q35kw: "ff6932p",
    Gp14am: ["fg4zq3l", "fa2okxs"],
    Bi91k9c: "fx9teim",
    Jwef8y: "f1uqaxdt"
  },
  highContrastSelected: {
    B8gzw0y: "f1h3a8gf",
    By8wz76: "f1nz3ub2",
    B7iucu3: "fqc85l4",
    Boo9lyk: "f1ucc5z8",
    sga51p: "fyj59f4",
    qj1yg9: ["f19v95gn", "f1n69f6i"],
    B8acmzm: "f16q7dot",
    Gezqo6: ["f1n69f6i", "f19v95gn"]
  },
  highContrastInteractive: {
    waf3gn: "f1quqgnd",
    B96h8j5: "f193utb4",
    Bpd3jnq: "f1io67iv",
    uhbujs: "f3n01jk",
    sga51p: "fyj59f4",
    qj1yg9: ["f19v95gn", "f1n69f6i"],
    B8acmzm: "f16q7dot",
    Gezqo6: ["f1n69f6i", "f19v95gn"]
  },
  select: {
    qhf8xq: "f1euv43f",
    Bhzewxz: "fqclxi7",
    j35jbq: ["fiv86kb", "f36uhnt"],
    Bj3rh1h: "fom9my7"
  },
  hiddenCheckbox: {
    B68tc82: 0,
    Bmxbyg5: 0,
    Bpg54ce: "f1a3p1vp",
    a9b677: "frkrog8",
    Bqenvij: "f1mpe4l3",
    qhf8xq: "f1euv43f",
    Bh84pgu: "fmf1zke",
    Bgl5zvf: "f1wch0ki",
    Huce71: "fz5stix"
  },
  disabled: {
    Bceei9c: "fdrzuqr",
    famaaq: "f1xqy1su",
    sj55zd: "f1s2aq7o",
    De3pzq: "f1bg9a2p",
    E5pizo: "fyed02w",
    g2u3we: "f1jj8ep1",
    h3c5rm: ["f15xbau", "fy0fskl"],
    B9xav0g: "f4ikngz",
    zhjwy3: ["fy0fskl", "f15xbau"],
    Ftih45: "f1wl9k8s",
    Brfgrao: "f1j7ml58",
    lawp4y: 0,
    Fbdkly: 0,
    mdwyqc: 0,
    Bciustq: 0,
    gc50h5: "f13vvzas",
    Ehzi8l: "f198lalb",
    B0n5ga8: "f13dj02",
    s924m2: ["f9wngki", "f17v59j0"],
    B1q35kw: "f1vxzwsp",
    Gp14am: ["f17v59j0", "f9wngki"],
    Bikrtoi: "f11og98d",
    G8qf51: "f1rg3h4v",
    Brxh4y7: "fbm2y3b",
    ezxybo: "f4yodeu",
    wc7uws: "fcwfbwp",
    gp3uxg: "f1repx37",
    Fohawp: ["f1ybi8ct", "f1h4eg6q"],
    Bxulg6k: "f18mejnb",
    vcjq4m: ["f1h4eg6q", "f1ybi8ct"],
    Bsqkqe9: "f1nift3m",
    fskg1g: "f1wu3i8x",
    iwiei9: 0,
    Effecx: 0,
    Bkt1b9m: 0,
    jfmxvr: 0,
    orauir: "f6v4vfa",
    B2yd9ot: "folrdqs",
    Fn9tzk: "f168z5yf",
    Bv0wker: ["fpor7gj", "fzextn6"],
    Bp2dl5b: "f1yaw79v",
    pzn0iz: ["fzextn6", "fpor7gj"]
  }
}, {
  f: [".ftqa4ok:focus{outline-style:none;}"],
  i: [".f2hkw1w:focus-visible{outline-style:none;}"],
  d: [".f8hki3x[data-fui-focus-visible]{border-top-color:transparent;}", ".f1d2448m[data-fui-focus-visible]{border-right-color:transparent;}", ".ffh67wi[data-fui-focus-visible]{border-left-color:transparent;}", ".f1bjia2o[data-fui-focus-visible]{border-bottom-color:transparent;}", '.f15bsgw9[data-fui-focus-visible]::after{content:"";}', ".f14e48fq[data-fui-focus-visible]::after{position:absolute;}", ".f18yb2kv[data-fui-focus-visible]::after{pointer-events:none;}", ".fd6o370[data-fui-focus-visible]::after{z-index:1;}", [".fpqizxz[data-fui-focus-visible]::after{border:var(--strokeWidthThick) solid var(--colorStrokeFocus2);}", {
    p: -2
  }], [".fnd8nzh[data-fui-focus-visible]::after{border-radius:var(--fui-Card--border-radius);}", {
    p: -1
  }], ".f15fr7a0[data-fui-focus-visible]::after{top:calc(0px - var(--strokeWidthThick) - -2px);}", ".fwsq40z[data-fui-focus-visible]::after{right:calc(0px - var(--strokeWidthThick) - -2px);}", ".fy0y4wt[data-fui-focus-visible]::after{left:calc(0px - var(--strokeWidthThick) - -2px);}", ".f34ld9f[data-fui-focus-visible]::after{bottom:calc(0px - var(--strokeWidthThick) - -2px);}", ".f1b1k54r[data-fui-focus-within]:focus-within{border-top-color:transparent;}", ".f4ne723[data-fui-focus-within]:focus-within{border-right-color:transparent;}", ".fqqcjud[data-fui-focus-within]:focus-within{border-left-color:transparent;}", ".fh7aioi[data-fui-focus-within]:focus-within{border-bottom-color:transparent;}", '.ffht0p2[data-fui-focus-within]:focus-within::after{content:"";}', ".f1p0ul1q[data-fui-focus-within]:focus-within::after{position:absolute;}", ".f1c901ms[data-fui-focus-within]:focus-within::after{pointer-events:none;}", ".f1alokd7[data-fui-focus-within]:focus-within::after{z-index:1;}", [".f1i978nd[data-fui-focus-within]:focus-within::after{border:var(--strokeWidthThick) solid var(--colorStrokeFocus2);}", {
    p: -2
  }], [".f1nh8hsq[data-fui-focus-within]:focus-within::after{border-radius:var(--fui-Card--border-radius);}", {
    p: -1
  }], ".f1amxum7[data-fui-focus-within]:focus-within::after{top:calc(0px - var(--strokeWidthThick) - -2px);}", ".f1cec8w7[data-fui-focus-within]:focus-within::after{right:calc(0px - var(--strokeWidthThick) - -2px);}", ".f554mv0[data-fui-focus-within]:focus-within::after{left:calc(0px - var(--strokeWidthThick) - -2px);}", ".f1sj6kbr[data-fui-focus-within]:focus-within::after{bottom:calc(0px - var(--strokeWidthThick) - -2px);}", ".f1063pyq{flex-direction:row;}", ".f122n59{align-items:center;}", ".ftrw7vg>.fui-CardPreview{margin-top:calc(var(--fui-Card--size) * -1);}", ".f18opajm>.fui-CardPreview{margin-bottom:calc(var(--fui-Card--size) * -1);}", '.f13002it>:not([aria-hidden="true"]).fui-CardPreview:first-of-type{margin-left:calc(var(--fui-Card--size) * -1);}', '.fqo182t>:not([aria-hidden="true"]).fui-CardPreview:first-of-type{margin-right:calc(var(--fui-Card--size) * -1);}', '.f18yna97>:not([aria-hidden="true"]).fui-CardPreview:last-of-type{margin-right:calc(var(--fui-Card--size) * -1);}', '.f1kd6wh7>:not([aria-hidden="true"]).fui-CardPreview:last-of-type{margin-left:calc(var(--fui-Card--size) * -1);}', ".f4i4759>.fui-CardHeader:last-of-type,.f4i4759>.fui-CardFooter:last-of-type{flex-grow:1;}", ".f1vx9l62{flex-direction:column;}", ".f14k419y>.fui-CardPreview{margin-left:calc(var(--fui-Card--size) * -1);}", ".f1fgo9fz>.fui-CardPreview{margin-right:calc(var(--fui-Card--size) * -1);}", '.fvqmfsm>:not([aria-hidden="true"]).fui-CardPreview:first-of-type{margin-top:calc(var(--fui-Card--size) * -1);}', ".f3am6yf>.fui-Card__floatingAction+.fui-CardPreview{margin-top:calc(var(--fui-Card--size) * -1);}", '.f1r5wgso>:not([aria-hidden="true"]).fui-CardPreview:last-of-type{margin-bottom:calc(var(--fui-Card--size) * -1);}', ".f1pi9uxy{--fui-Card--size:8px;}", ".f1h1zgly{--fui-Card--border-radius:var(--borderRadiusSmall);}", ".frsmuga{--fui-Card--size:12px;}", ".fuldkky{--fui-Card--border-radius:var(--borderRadiusMedium);}", ".f1qua4xo{--fui-Card--size:16px;}", ".fimkt6v{--fui-Card--border-radius:var(--borderRadiusLarge);}", ".f1epqm3e .fui-Text{color:currentColor;}", ".fxugw4r{background-color:var(--colorNeutralBackground1);}", ".f1whvlc6{box-shadow:var(--shadow4);}", ".f16gxe2i::after{border-top-color:var(--colorTransparentStroke);}", ".fpgykix::after{border-right-color:var(--colorTransparentStroke);}", ".fzybk4o::after{border-left-color:var(--colorTransparentStroke);}", ".f1osi826::after{border-bottom-color:var(--colorTransparentStroke);}", ".f1k6fduh{cursor:pointer;}", ".f1nfm20t{background-color:var(--colorNeutralBackground1Selected);}", ".f16eln5f::after{border-top-color:var(--colorNeutralStroke1Selected);}", ".fa2okxs::after{border-right-color:var(--colorNeutralStroke1Selected);}", ".fg4zq3l::after{border-left-color:var(--colorNeutralStroke1Selected);}", ".ff6932p::after{border-bottom-color:var(--colorNeutralStroke1Selected);}", ".f1dmdbja{background-color:var(--colorNeutralBackground2);}", ".fjxa0vh{background-color:var(--colorNeutralBackground2Selected);}", ".f1c21dwh{background-color:var(--colorTransparentBackground);}", ".f1couhl3{box-shadow:none;}", ".ft83z1f::after{border-top-color:var(--colorNeutralStroke1);}", ".f1g4150c::after{border-right-color:var(--colorNeutralStroke1);}", ".f192dr6e::after{border-left-color:var(--colorNeutralStroke1);}", ".f1qnawh6::after{border-bottom-color:var(--colorNeutralStroke1);}", ".f1q9pm1r{background-color:var(--colorTransparentBackgroundSelected);}", ".f1jj8ep1{border-top-color:var(--colorNeutralStrokeDisabled);}", ".f15xbau{border-right-color:var(--colorNeutralStrokeDisabled);}", ".fy0fskl{border-left-color:var(--colorNeutralStrokeDisabled);}", ".f4ikngz{border-bottom-color:var(--colorNeutralStrokeDisabled);}", ".f13dj02::after{border-top-color:var(--colorNeutralStrokeDisabled);}", ".f9wngki::after{border-right-color:var(--colorNeutralStrokeDisabled);}", ".f17v59j0::after{border-left-color:var(--colorNeutralStrokeDisabled);}", ".f1vxzwsp::after{border-bottom-color:var(--colorNeutralStrokeDisabled);}", ".fhovq9v{background-color:var(--colorSubtleBackground);}", ".fq5gl1p{background-color:var(--colorSubtleBackgroundSelected);}", ".f1euv43f{position:absolute;}", ".fqclxi7{top:4px;}", ".fiv86kb{right:4px;}", ".f36uhnt{left:4px;}", ".fom9my7{z-index:var(--zIndexContent, 1);}", [".f1a3p1vp{overflow:hidden;}", {
    p: -1
  }], ".frkrog8{width:1px;}", ".f1mpe4l3{height:1px;}", ".fmf1zke{clip:rect(0 0 0 0);}", ".f1wch0ki{clip-path:inset(50%);}", ".fz5stix{white-space:nowrap;}", ".fdrzuqr{cursor:not-allowed;}", ".f1xqy1su{-webkit-user-select:none;-moz-user-select:none;user-select:none;}", ".f1s2aq7o{color:var(--colorNeutralForegroundDisabled);}", ".f1bg9a2p{background-color:var(--colorNeutralBackgroundDisabled);}", ".fyed02w{box-shadow:var(--shadow2);}", '.f1wl9k8s::before{content:"";}', ".f1j7ml58::before{position:absolute;}", [".f13vvzas::before{inset:0;}", {
    p: -1
  }], ".f198lalb::before{z-index:calc(var(--zIndexContent, 1) + 1);}"],
  m: [["@media (forced-colors: active){.f1j6vpng[data-fui-focus-visible]::after{border-top-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1ffjurs[data-fui-focus-visible]::after{border-left-color:Highlight;}.f1pniga2[data-fui-focus-visible]::after{border-right-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f987i1v[data-fui-focus-visible]::after{border-bottom-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1ufm4qn[data-fui-focus-within]:focus-within::after{border-top-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1qnwcb4[data-fui-focus-within]:focus-within::after{border-right-color:Highlight;}.fgrk5zm[data-fui-focus-within]:focus-within::after{border-left-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fi52z01[data-fui-focus-within]:focus-within::after{border-bottom-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1h3a8gf{forced-color-adjust:none;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1nz3ub2{background-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fqc85l4{color:HighlightText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1ucc5z8 .fui-CardPreview,.f1ucc5z8 .fui-CardFooter{forced-color-adjust:auto;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fyj59f4::after{border-top-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f19v95gn::after{border-right-color:Highlight;}.f1n69f6i::after{border-left-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f16q7dot::after{border-bottom-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1quqgnd:hover,.f1quqgnd :active{forced-color-adjust:none;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f193utb4:hover,.f193utb4 :active{background-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1io67iv:hover,.f1io67iv :active{color:HighlightText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f3n01jk:hover .fui-CardPreview,.f3n01jk :active .fui-CardPreview,.f3n01jk:hover .fui-CardFooter,.f3n01jk :active .fui-CardFooter{forced-color-adjust:auto;}}", {
    m: "(forced-colors: active)"
  }]],
  h: [".feu1g3u:hover{color:var(--colorNeutralForeground1Hover);}", ".f1knas48:hover{background-color:var(--colorNeutralBackground1Hover);}", ".f1m145df:hover{box-shadow:var(--shadow8);}", ".fx9teim:hover{color:var(--colorNeutralForeground1Selected);}", ".f1kz6goq:hover{background-color:var(--colorNeutralBackground1Selected);}", ".fnwyq0v:hover{color:var(--colorNeutralForeground2Hover);}", ".f1uvynv3:hover{background-color:var(--colorNeutralBackground2Hover);}", ".f1luvkty:hover{color:var(--colorNeutralForeground2Selected);}", ".fehi0vp:hover{background-color:var(--colorNeutralBackground2Selected);}", ".fjxutwb:hover{background-color:var(--colorTransparentBackgroundHover);}", ".f1llr77y:hover::after{border-top-color:var(--colorNeutralStroke1Hover);}", ".fzk0khw:hover::after{border-right-color:var(--colorNeutralStroke1Hover);}", ".fjj8tog:hover::after{border-left-color:var(--colorNeutralStroke1Hover);}", ".fb1u8ub:hover::after{border-bottom-color:var(--colorNeutralStroke1Hover);}", ".fg59vm4:hover{background-color:var(--colorTransparentBackgroundSelected);}", ".f1ls5moo:hover,.f1ls5moo:active{background-color:var(--colorTransparentBackground);}", ".f1qiza15:hover,.f1qiza15:active{box-shadow:none;}", ".f1t94bn6:hover{background-color:var(--colorSubtleBackgroundHover);}", ".f1uqaxdt:hover{background-color:var(--colorSubtleBackgroundSelected);}", ".f11og98d:hover,.f11og98d:active{cursor:not-allowed;}", ".f1rg3h4v:hover,.f1rg3h4v:active{-webkit-user-select:none;-moz-user-select:none;user-select:none;}", ".fbm2y3b:hover,.fbm2y3b:active{color:var(--colorNeutralForegroundDisabled);}", ".f4yodeu:hover,.f4yodeu:active{background-color:var(--colorNeutralBackgroundDisabled);}", ".fcwfbwp:hover,.fcwfbwp:active{box-shadow:var(--shadow2);}", ".f1repx37:hover,.f1repx37:active{border-top-color:var(--colorNeutralStrokeDisabled);}", ".f1ybi8ct:hover,.f1ybi8ct:active{border-right-color:var(--colorNeutralStrokeDisabled);}", ".f1h4eg6q:hover,.f1h4eg6q:active{border-left-color:var(--colorNeutralStrokeDisabled);}", ".f18mejnb:hover,.f18mejnb:active{border-bottom-color:var(--colorNeutralStrokeDisabled);}", '.f1nift3m:hover::before,.f1nift3m:active::before{content:"";}', ".f1wu3i8x:hover::before,.f1wu3i8x:active::before{position:absolute;}", [".f6v4vfa:hover::before,.f6v4vfa:active::before{inset:0;}", {
    p: -1
  }], ".folrdqs:hover::before,.folrdqs:active::before{z-index:calc(var(--zIndexContent, 1) + 1);}", ".f168z5yf:hover::after,.f168z5yf:active::after{border-top-color:var(--colorNeutralStrokeDisabled);}", ".fpor7gj:hover::after,.fpor7gj:active::after{border-right-color:var(--colorNeutralStrokeDisabled);}", ".fzextn6:hover::after,.fzextn6:active::after{border-left-color:var(--colorNeutralStrokeDisabled);}", ".f1yaw79v:hover::after,.f1yaw79v:active::after{border-bottom-color:var(--colorNeutralStrokeDisabled);}"],
  a: [".fb40n2d:active{background-color:var(--colorNeutralBackground1Pressed);}", ".f1yhgkbh:active{background-color:var(--colorNeutralBackground2Pressed);}", ".fophhak:active{background-color:var(--colorTransparentBackgroundPressed);}", ".f1uohb70:active::after{border-top-color:var(--colorNeutralStroke1Pressed);}", ".f1jm7v1n:active::after{border-right-color:var(--colorNeutralStroke1Pressed);}", ".f1bus3rq:active::after{border-left-color:var(--colorNeutralStroke1Pressed);}", ".f1fbu7rr:active::after{border-bottom-color:var(--colorNeutralStroke1Pressed);}", ".f1wfn5kd:active{background-color:var(--colorSubtleBackgroundPressed);}"]
});
const useCardStyles_unstable = (state) => {
  const resetStyles = useCardResetStyles();
  const styles = useCardStyles();
  const orientationMap = {
    horizontal: styles.orientationHorizontal,
    vertical: styles.orientationVertical
  };
  const sizeMap = {
    small: styles.sizeSmall,
    medium: styles.sizeMedium,
    large: styles.sizeLarge
  };
  const appearanceMap = {
    filled: styles.filled,
    "filled-alternative": styles.filledAlternative,
    outline: styles.outline,
    subtle: styles.subtle
  };
  const selectedMap = {
    filled: styles.filledInteractiveSelected,
    "filled-alternative": styles.filledAlternativeInteractiveSelected,
    outline: styles.outlineInteractiveSelected,
    subtle: styles.subtleInteractiveSelected
  };
  const interactiveMap = {
    filled: styles.filledInteractive,
    "filled-alternative": styles.filledAlternativeInteractive,
    outline: styles.outlineInteractive,
    subtle: styles.subtleInteractive
  };
  const isSelectableOrInteractive = !state.disabled && (state.interactive || state.selectable);
  const focusedClassName = reactExports.useMemo(() => {
    if (state.disabled) {
      return "";
    }
    if (state.selectable) {
      if (state.selectFocused) {
        return styles.selectableFocused;
      }
      return "";
    }
    return styles.focused;
  }, [state.disabled, state.selectFocused, state.selectable, styles.focused, styles.selectableFocused]);
  state.root.className = mergeClasses(cardClassNames.root, resetStyles, orientationMap[state.orientation], sizeMap[state.size], appearanceMap[state.appearance], isSelectableOrInteractive && styles.interactive, isSelectableOrInteractive && interactiveMap[state.appearance], state.selected && selectedMap[state.appearance], focusedClassName, isSelectableOrInteractive && styles.highContrastInteractive, state.selected && styles.highContrastSelected, state.disabled && styles.disabled, state.disabled && state.appearance === "outline" && styles.outlineDisabled, state.root.className);
  if (state.floatingAction) {
    state.floatingAction.className = mergeClasses(cardClassNames.floatingAction, styles.select, state.floatingAction.className);
  }
  if (state.checkbox) {
    state.checkbox.className = mergeClasses(cardClassNames.checkbox, styles.hiddenCheckbox, state.checkbox.className);
  }
  return state;
};
function useCardContextValue({ selectableA11yProps }) {
  return {
    selectableA11yProps
  };
}
const Card$1 = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useCard_unstable(props, ref);
  const cardContextValue = useCardContextValue(state);
  useCardStyles_unstable(state);
  useCustomStyleHook("useCardStyles_unstable")(state);
  return renderCard_unstable(state, cardContextValue);
});
Card$1.displayName = "Card";
const useSearchBox_unstable = (props, ref) => {
  const { size = "medium", appearance = "outline", ...baseProps } = props;
  const state = useSearchBoxBase_unstable(baseProps, ref);
  if (state.contentBefore) {
    var _state_contentBefore;
    var _children;
    (_children = (_state_contentBefore = state.contentBefore).children) !== null && _children !== void 0 ? _children : _state_contentBefore.children = /* @__PURE__ */ reactExports.createElement(SearchRegular, null);
  }
  if (state.dismiss) {
    var _state_dismiss;
    var _children1;
    (_children1 = (_state_dismiss = state.dismiss).children) !== null && _children1 !== void 0 ? _children1 : _state_dismiss.children = /* @__PURE__ */ reactExports.createElement(DismissRegular, null);
  }
  return {
    ...state,
    size,
    appearance
  };
};
const useSearchBoxBase_unstable = (props, ref) => {
  const { disabled = false, root, contentBefore, dismiss, contentAfter, value, defaultValue, ...inputProps } = props;
  const searchBoxRootRef = reactExports.useRef(null);
  const searchBoxRef = reactExports.useRef(null);
  const [internalValue, setInternalValue] = useControllableState({
    state: value,
    defaultState: defaultValue,
    initialState: ""
  });
  const [focused, setFocused] = reactExports.useState(false);
  const onFocus = reactExports.useCallback(() => {
    setFocused(true);
  }, [
    setFocused
  ]);
  const onBlur = reactExports.useCallback((ev) => {
    var _searchBoxRootRef_current;
    setFocused(!!((_searchBoxRootRef_current = searchBoxRootRef.current) === null || _searchBoxRootRef_current === void 0 ? void 0 : _searchBoxRootRef_current.contains(ev.relatedTarget)));
  }, [
    setFocused
  ]);
  const rootProps = resolveShorthand(root);
  const handleDismissClick = useEventCallback((event) => {
    var _props_onChange, _searchBoxRef_current;
    if (isResolvedShorthand(dismiss)) {
      var _dismiss_onClick;
      (_dismiss_onClick = dismiss.onClick) === null || _dismiss_onClick === void 0 ? void 0 : _dismiss_onClick.call(dismiss, event);
    }
    const newValue = "";
    setInternalValue(newValue);
    (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, event, {
      value: newValue
    });
    (_searchBoxRef_current = searchBoxRef.current) === null || _searchBoxRef_current === void 0 ? void 0 : _searchBoxRef_current.focus();
  });
  const inputState = useInput_unstable({
    type: "search",
    disabled,
    value: internalValue,
    root: always({
      ...rootProps,
      ref: useMergedRefs(rootProps === null || rootProps === void 0 ? void 0 : rootProps.ref, searchBoxRootRef),
      onFocus: mergeCallbacks(rootProps === null || rootProps === void 0 ? void 0 : rootProps.onFocus, onFocus),
      // eslint-disable-next-line react-hooks/refs
      onBlur: mergeCallbacks(rootProps === null || rootProps === void 0 ? void 0 : rootProps.onBlur, onBlur)
    }, {
      elementType: "span"
    }),
    contentBefore: optional(contentBefore, {
      renderByDefault: true,
      elementType: "span"
    }),
    contentAfter: optional(contentAfter, {
      renderByDefault: true,
      elementType: "span"
    }),
    ...inputProps,
    onChange: useEventCallback((ev) => {
      var _props_onChange;
      const newValue = ev.target.value;
      (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, ev, {
        value: newValue
      });
      setInternalValue(newValue);
    })
  }, useMergedRefs(searchBoxRef, ref));
  const state = {
    ...inputState,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...inputState.components,
      dismiss: "span"
    },
    dismiss: optional(dismiss, {
      defaultProps: {
        role: "button",
        "aria-label": "clear",
        tabIndex: -1
      },
      renderByDefault: true,
      elementType: "span"
    }),
    disabled,
    focused
  };
  if (state.dismiss) {
    state.dismiss.onClick = handleDismissClick;
  }
  return state;
};
const renderSearchBox_unstable = (state) => {
  return /* @__PURE__ */ jsxs(state.root, {
    children: [
      state.contentBefore && /* @__PURE__ */ jsx(state.contentBefore, {}),
      /* @__PURE__ */ jsx(state.input, {}),
      state.contentAfter && /* @__PURE__ */ jsxs(state.contentAfter, {
        children: [
          state.contentAfter.children,
          state.dismiss && /* @__PURE__ */ jsx(state.dismiss, {})
        ]
      })
    ]
  });
};
const searchBoxClassNames = {
  root: "fui-SearchBox",
  dismiss: "fui-SearchBox__dismiss",
  contentAfter: "fui-SearchBox__contentAfter",
  contentBefore: "fui-SearchBox__contentBefore",
  input: "fui-SearchBox__input"
};
const useRootStyles = /* @__PURE__ */ __styles({
  small: {
    i8kkvl: "fjuset5",
    B2u0y6b: "f1xzfw5u",
    uwmqm3: ["fk8j09s", "fdw0yi8"],
    z189sj: ["fdw0yi8", "fk8j09s"]
  },
  medium: {
    i8kkvl: "fjuset5",
    B2u0y6b: "f1xzfw5u",
    uwmqm3: ["f1f5gg8d", "f1vdfbxk"],
    z189sj: ["f1vdfbxk", "f1f5gg8d"]
  },
  large: {
    i8kkvl: "fjuset5",
    B2u0y6b: "f1xzfw5u",
    uwmqm3: ["f1ng84yb", "f11gcy0p"],
    z189sj: ["f11gcy0p", "f1ng84yb"]
  },
  input: {
    uwmqm3: ["fk8j09s", "fdw0yi8"],
    z189sj: ["fhxju0i", "f1cnd47f"],
    Boqhc8c: "f18izjht",
    B8uat0v: "fcoa6sg"
  },
  unfocusedNoContentAfter: {
    z189sj: ["fhxju0i", "f1cnd47f"]
  }
}, {
  d: [".fjuset5{column-gap:0;}", ".f1xzfw5u{max-width:468px;}", ".fk8j09s{padding-left:var(--spacingHorizontalSNudge);}", ".fdw0yi8{padding-right:var(--spacingHorizontalSNudge);}", ".f1f5gg8d{padding-left:var(--spacingHorizontalS);}", ".f1vdfbxk{padding-right:var(--spacingHorizontalS);}", ".f1ng84yb{padding-left:var(--spacingHorizontalMNudge);}", ".f11gcy0p{padding-right:var(--spacingHorizontalMNudge);}", ".fhxju0i{padding-right:0;}", ".f1cnd47f{padding-left:0;}", ".f18izjht::-webkit-search-decoration{display:none;}", ".fcoa6sg::-webkit-search-cancel-button{display:none;}"]
});
const useInputStyles = /* @__PURE__ */ __styles({
  small: {
    z189sj: ["fdw0yi8", "fk8j09s"]
  },
  medium: {
    z189sj: ["f1vdfbxk", "f1f5gg8d"]
  },
  large: {
    z189sj: ["f11gcy0p", "f1ng84yb"]
  }
}, {
  d: [".fdw0yi8{padding-right:var(--spacingHorizontalSNudge);}", ".fk8j09s{padding-left:var(--spacingHorizontalSNudge);}", ".f1vdfbxk{padding-right:var(--spacingHorizontalS);}", ".f1f5gg8d{padding-left:var(--spacingHorizontalS);}", ".f11gcy0p{padding-right:var(--spacingHorizontalMNudge);}", ".f1ng84yb{padding-left:var(--spacingHorizontalMNudge);}"]
});
const useContentAfterStyles = /* @__PURE__ */ __styles({
  contentAfter: {
    uwmqm3: ["f1uw59to", "fw5db7e"],
    i8kkvl: "f1ufnopg"
  },
  rest: {
    Bqenvij: "fniina8",
    a9b677: "f3tsq5r",
    uwmqm3: ["f1cnd47f", "fhxju0i"],
    B68tc82: 0,
    Bmxbyg5: 0,
    Bpg54ce: "f1a3p1vp"
  }
}, {
  d: [".f1uw59to{padding-left:var(--spacingHorizontalM);}", ".fw5db7e{padding-right:var(--spacingHorizontalM);}", ".f1ufnopg{column-gap:var(--spacingHorizontalXS);}", ".fniina8{height:0;}", ".f3tsq5r{width:0;}", ".f1cnd47f{padding-left:0;}", ".fhxju0i{padding-right:0;}", [".f1a3p1vp{overflow:hidden;}", {
    p: -1
  }]]
});
const useDismissClassName = /* @__PURE__ */ __resetStyles("r1pvzcuu", null, [".r1pvzcuu{box-sizing:border-box;color:var(--colorNeutralForeground3);display:flex;cursor:pointer;}", ".r1pvzcuu>svg{font-size:20px;}"]);
const useDismissStyles = /* @__PURE__ */ __styles({
  disabled: {
    sj55zd: "f1s2aq7o"
  },
  small: {
    Duoase: "f3qv9w"
  },
  medium: {},
  large: {
    Duoase: "f16u2scb"
  }
}, {
  d: [".f1s2aq7o{color:var(--colorNeutralForegroundDisabled);}", ".f3qv9w>svg{font-size:16px;}", ".f16u2scb>svg{font-size:24px;}"]
});
const useSearchBoxStyles_unstable = (state) => {
  const {
    disabled,
    focused,
    size
  } = state;
  const rootStyles = useRootStyles();
  const inputStyles = useInputStyles();
  const contentAfterStyles = useContentAfterStyles();
  const dismissClassName = useDismissClassName();
  const dismissStyles = useDismissStyles();
  state.root.className = mergeClasses(searchBoxClassNames.root, rootStyles[size], !focused && rootStyles.unfocusedNoContentAfter, state.root.className);
  state.input.className = mergeClasses(searchBoxClassNames.input, rootStyles.input, !focused && inputStyles[size], state.input.className);
  if (state.dismiss) {
    state.dismiss.className = mergeClasses(searchBoxClassNames.dismiss, dismissClassName, disabled && dismissStyles.disabled, dismissStyles[size], state.dismiss.className);
  }
  if (state.contentBefore) {
    state.contentBefore.className = mergeClasses(searchBoxClassNames.contentBefore, state.contentBefore.className);
  }
  if (state.contentAfter) {
    state.contentAfter.className = mergeClasses(searchBoxClassNames.contentAfter, contentAfterStyles.contentAfter, !focused && contentAfterStyles.rest, state.contentAfter.className);
  } else if (state.dismiss) {
    state.dismiss.className = mergeClasses(state.dismiss.className, contentAfterStyles.contentAfter);
  }
  useInputStyles_unstable(state);
  return state;
};
const SearchBox = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useSearchBox_unstable(props, ref);
  useSearchBoxStyles_unstable(state);
  useCustomStyleHook("useSearchBoxStyles_unstable")(state);
  return renderSearchBox_unstable(state);
});
SearchBox.displayName = "SearchBox";
const MATE_TEXT_MAX = 2e3;
const MATE_COPY_MAX = 1e5;
function copyText(entries2) {
  const last = entries2.filter((e) => e.kind === "answer").at(-1);
  return (last ? last.markdown || last.line || "" : "").slice(0, MATE_COPY_MAX);
}
function footerText(footer, ui) {
  return [
    footer.profile,
    footer.model,
    footer.route,
    footer.tokens !== null ? ui.tokens(footer.tokens) : "",
    footer.used.length ? `${ui.used}${ui.labelSep}${footer.used.join(ui.listSep)}` : ""
  ].filter(Boolean).join(ui.sep);
}
function putLabel(put, ui) {
  switch (put) {
    case "paste":
      return ui.putPaste;
    case "replace":
      return ui.putReplace;
    case "fill":
      return ui.putFill;
    case "ready":
      return ui.putReady;
    default:
      return null;
  }
}
function bubbleButtons(more, put) {
  return [...more ? ["more"] : [], ...put ? ["put"] : []];
}
function cardButtons(put, answerOnly = false) {
  return ["copy", ...answerOnly ? [] : ["deep"], "history", ...put ? ["put"] : []];
}
const PUT_ARM_MS = 400;
class PutGuard {
  constructor(now) {
    this.now = now;
  }
  now;
  label = null;
  since = 0;
  /** The label drawn now; a new or changed one starts the wait again. */
  show(label) {
    if (label === this.label) return;
    this.label = label;
    this.since = this.now();
  }
  click() {
    return this.label !== null && this.now() - this.since >= PUT_ARM_MS;
  }
}
function consentKey(s) {
  return JSON.stringify([s.serial ?? 0, s.action, s.text, s.detail, s.always]);
}
function consentMore(s, ui) {
  return [
    s.moreLines ? ui.moreLines(s.moreLines) : "",
    s.moreEdits ? ui.moreEdits(s.moreEdits) : ""
  ].filter(Boolean).join(ui.sep);
}
function formKey(s) {
  return JSON.stringify([s.serial ?? 0, s.rows.map((r) => r.id)]);
}
const NOT_A_HANDLE = 'button, a, input, textarea, [role="link"]';
function dragHandle(send) {
  let from2 = null;
  const offset = (e) => from2 ? { dx: e.screenX - from2.x, dy: e.screenY - from2.y } : { dx: 0, dy: 0 };
  const end = (e) => {
    if (!from2) return;
    send({ phase: "end", ...offset(e) });
    from2 = null;
  };
  return {
    onPointerDown(e) {
      if (e.button !== 0 || e.target instanceof Element && e.target.closest(NOT_A_HANDLE)) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      from2 = { x: e.screenX, y: e.screenY };
      send({ phase: "start", dx: 0, dy: 0 });
    },
    onPointerMove(e) {
      if (from2) send({ phase: "move", ...offset(e) });
    },
    onPointerUp: end,
    onLostPointerCapture: end
  };
}
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
const REDUCED = `@media ${REDUCED_QUERY}`;
const reducedMotion = () => matchMedia(REDUCED_QUERY).matches;
const still = { [REDUCED]: { animationName: "none" } };
const STAGGER_MS = 35;
const STAGGER_MAX = 10;
const stagger = (i) => ({ animationDelay: `${Math.min(i, STAGGER_MAX) * STAGGER_MS}ms` });
const useMotion = makeStyles({
  /** Bubble and words box appear: they rise out of the spot below-left of them. */
  appear: {
    transformOrigin: "bottom left",
    animationName: {
      from: { opacity: 0, transform: "translateY(8px) scale(0.96)" },
      to: { opacity: 1, transform: "none" }
    },
    animationDuration: tokens.durationGentle,
    animationTimingFunction: tokens.curveDecelerateMax,
    ...still
  },
  /** Card grows out of the bubble's corner. */
  grow: {
    transformOrigin: "top left",
    animationName: {
      from: { opacity: 0, transform: "translateY(-4px) scale(0.94)" },
      to: { opacity: 1, transform: "none" }
    },
    animationDuration: tokens.durationGentle,
    animationTimingFunction: tokens.curveDecelerateMax,
    ...still
  },
  /** Card closes toward the spot. */
  shrink: {
    transformOrigin: "top left",
    animationName: { from: { opacity: 1, transform: "none" }, to: { opacity: 0, transform: "scale(0.96)" } },
    animationDuration: tokens.durationFast,
    animationTimingFunction: tokens.curveAccelerateMid,
    animationFillMode: "forwards",
    ...still
  },
  /** Bubble leaves when the card opens or it is closed: it sinks back toward the spot. */
  fadeOut: {
    transformOrigin: "bottom left",
    animationName: {
      from: { opacity: 1, transform: "none" },
      to: { opacity: 0, transform: "translateY(4px) scale(0.98)" }
    },
    animationDuration: tokens.durationFast,
    animationTimingFunction: tokens.curveAccelerateMid,
    animationFillMode: "forwards",
    ...still
  },
  /** A stale signal: the slow fade. */
  stale: {
    animationName: { from: { opacity: 1 }, to: { opacity: 0 } },
    animationDuration: "600ms",
    animationTimingFunction: tokens.curveEasyEase,
    animationFillMode: "forwards",
    ...still
  },
  /** The consent card slides 12 px in from the side it sits on (spec §7.6); it leaves the same way. */
  slideInRight: {
    animationName: { from: { opacity: 0, transform: "translateX(12px)" }, to: { opacity: 1, transform: "none" } },
    animationDuration: tokens.durationNormal,
    animationTimingFunction: tokens.curveDecelerateMax,
    animationFillMode: "both",
    ...still
  },
  slideInLeft: {
    animationName: { from: { opacity: 0, transform: "translateX(-12px)" }, to: { opacity: 1, transform: "none" } },
    animationDuration: tokens.durationNormal,
    animationTimingFunction: tokens.curveDecelerateMax,
    animationFillMode: "both",
    ...still
  },
  slideOutRight: {
    animationName: { from: { opacity: 1, transform: "none" }, to: { opacity: 0, transform: "translateX(12px)" } },
    animationDuration: tokens.durationFast,
    animationTimingFunction: tokens.curveAccelerateMid,
    animationFillMode: "forwards",
    ...still
  },
  slideOutLeft: {
    animationName: { from: { opacity: 1, transform: "none" }, to: { opacity: 0, transform: "translateX(-12px)" } },
    animationDuration: tokens.durationFast,
    animationTimingFunction: tokens.curveAccelerateMid,
    animationFillMode: "forwards",
    ...still
  },
  /** A new line or entry settles in from just below; with `stagger`, one after another. */
  rise: {
    animationName: { from: { opacity: 0, transform: "translateY(6px)" }, to: { opacity: 1, transform: "none" } },
    animationDuration: tokens.durationNormal,
    animationTimingFunction: tokens.curveDecelerateMid,
    animationFillMode: "both",
    ...still
  },
  /** History rows slide in as they come into the list; with `stagger`, one after another. */
  slideIn: {
    animationName: { from: { opacity: 0, transform: "translateY(10px)" }, to: { opacity: 1, transform: "none" } },
    animationDuration: tokens.durationGentle,
    animationTimingFunction: tokens.curveDecelerateMax,
    animationFillMode: "both",
    ...still
  },
  /** A row being deleted slides away before it goes. */
  slideOut: {
    animationName: { from: { opacity: 1, transform: "none" }, to: { opacity: 0, transform: "translateX(24px)" } },
    animationDuration: tokens.durationNormal,
    animationTimingFunction: tokens.curveAccelerateMid,
    animationFillMode: "forwards",
    ...still
  },
  /** A button or icon that appears on its own (More, Copied) pops in. */
  pop: {
    animationName: {
      "0%": { opacity: 0, transform: "scale(0.6)" },
      "70%": { opacity: 1, transform: "scale(1.06)" },
      "100%": { opacity: 1, transform: "none" }
    },
    animationDuration: tokens.durationNormal,
    animationTimingFunction: tokens.curveDecelerateMid,
    animationFillMode: "both",
    ...still
  },
  /** One of the three thinking dots in the name tag; they hop one after another. */
  dot: {
    display: "inline-block",
    width: "4px",
    height: "4px",
    marginLeft: "3px",
    borderRadius: "50%",
    backgroundColor: "currentColor",
    opacity: 0.4,
    animationName: {
      "0%, 60%, 100%": { opacity: 0.35, transform: "none" },
      "30%": { opacity: 1, transform: "translateY(-3px)" }
    },
    animationDuration: "1200ms",
    animationIterationCount: "infinite",
    animationTimingFunction: tokens.curveEasyEase,
    ":nth-child(2)": { animationDelay: "150ms" },
    ":nth-child(3)": { animationDelay: "300ms" },
    [REDUCED]: { animationName: "none", opacity: 0.7 }
  }
});
const useStyles$6 = makeStyles({
  tag: {
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    padding: "1px 8px",
    borderRadius: tokens.borderRadiusCircular,
    // The same dark pill as the overlay's name tags, so the teammate looks the same everywhere.
    backgroundColor: "rgba(8, 12, 16, .78)",
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase200,
    whiteSpace: "nowrap"
  }
});
function NameTag({ tag, thinking, thinkingLabel }) {
  const s = useStyles$6();
  const m = useMotion();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: s.tag, style: { color: tagColorCss(tag.color, tag.rgb) }, children: [
    tag.name,
    thinking && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { role: "status", "aria-label": thinkingLabel, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: m.dot }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: m.dot }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: m.dot })
    ] })
  ] });
}
const useSurfaceStyles = makeStyles({
  /** Room around the surface for its shadow: the window is transparent there. */
  frame: { padding: "12px" },
  surface: {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    borderRadius: tokens.borderRadiusXLarge,
    boxShadow: tokens.shadow16,
    border: `1px solid ${tokens.colorTransparentStroke}`
  }
});
const useStyles$5 = makeStyles({
  bubble: {
    maxWidth: "416px",
    padding: "8px 6px 8px 10px",
    display: "flex",
    flexDirection: "column",
    rowGap: "4px"
  },
  head: { display: "flex", alignItems: "center", columnGap: "6px", minWidth: 0 },
  thread: {
    flexGrow: 1,
    minWidth: 0,
    color: tokens.colorNeutralForeground3,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  spacer: { flexGrow: 1 },
  body: { display: "flex", alignItems: "flex-end", columnGap: "6px", paddingRight: "4px" },
  line: { flexGrow: 1 }
});
function Bubble({ s, t, act: act2, leaving }) {
  const st2 = useStyles$5();
  const sf = useSurfaceStyles();
  const m = useMotion();
  const leave = leaving === "stale" ? m.stale : leaving === "fast" ? m.fadeOut : void 0;
  const put = putLabel(s.put, t);
  const [guard] = reactExports.useState(() => new PutGuard(() => performance.now()));
  guard.show(put);
  const [drag] = reactExports.useState(() => dragHandle((d) => window.mateApi.drag(d)));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: sf.frame, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: mergeClasses(sf.surface, st2.bubble, m.appear, leave), ...drag, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: st2.head, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(NameTag, { tag: s.tag, thinking: s.thinking, thinkingLabel: t.thinking }),
      s.thread ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Caption1, { className: st2.thread, children: [
        "↳ ",
        s.thread
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: st2.spacer }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "small",
          appearance: "subtle",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Dismiss16Regular, {}),
          "aria-label": t.dismiss,
          onClick: () => act2({ t: "dismiss" })
        }
      )
    ] }),
    (s.line || s.more || put) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: st2.body, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: mergeClasses(st2.line, m.rise), children: s.line }, s.line),
      bubbleButtons(s.more, put).map((b) => b === "more" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: m.pop, size: "small", appearance: "primary", onClick: () => act2({ t: "more" }), children: t.more }, "more") : (
        // Keyed by the label, so Paste turning into Paste when ready pops in again.
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: m.pop,
            size: "small",
            onClick: () => guard.click() && act2({ t: "put" }),
            children: put
          },
          `put:${put}`
        )
      ))
    ] })
  ] }) });
}
const EASE_MS = 200;
const HEIGHT_TARGET = "data-height-target";
function heightStep(shown, target, reduced) {
  if (reduced) return { window: target, settleMs: 0 };
  return { window: Math.max(shown, target), settleMs: target < shown ? EASE_MS : 0 };
}
function contentHeight(chrome, gap, children, max) {
  const gaps = Math.max(children.length - 1, 0) * gap;
  return Math.min(chrome + gaps + children.reduce((sum, h2) => sum + h2, 0), max);
}
function _arrayLikeToArray(r, a3) {
  (null == a3 || a3 > r.length) && (a3 = r.length);
  for (var e = 0, n = Array(a3); e < a3; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a3 = [], f2 = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f2 = (e = i.call(t)).done) && (a3.push(e.value), a3.length !== l); f2 = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f2 && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a3;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _unsupportedIterableToArray(r, a3) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a3);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a3) : void 0;
  }
}
const entries = Object.entries;
const setPrototypeOf = Object.setPrototypeOf;
const isFrozen = Object.isFrozen;
const getPrototypeOf = Object.getPrototypeOf;
const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
let freeze = Object.freeze;
let seal = Object.seal;
let create = Object.create;
let _ref = typeof Reflect !== "undefined" && Reflect;
let apply = _ref.apply;
let construct = _ref.construct;
if (!freeze) freeze = function freeze2(x2) {
  return x2;
};
if (!seal) seal = function seal2(x2) {
  return x2;
};
if (!apply) apply = function apply2(func, thisArg) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) args[_key - 2] = arguments[_key];
  return func.apply(thisArg, args);
};
if (!construct) construct = function construct2(Func) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
  return new Func(...args);
};
const arrayForEach = unapply(Array.prototype.forEach);
const arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
const arrayPop = unapply(Array.prototype.pop);
const arrayPush = unapply(Array.prototype.push);
const arraySlice = unapply(Array.prototype.slice);
const arraySplice = unapply(Array.prototype.splice);
const arrayIsArray = Array.isArray;
const setCreate = unconstruct(Set);
const setAdd = unapply(Set.prototype.add);
const setHas = unapply(Set.prototype.has);
const stringToLowerCase = unapply(String.prototype.toLowerCase);
const stringToString = unapply(String.prototype.toString);
const stringMatch = unapply(String.prototype.match);
const stringReplace = unapply(String.prototype.replace);
const stringIndexOf = unapply(String.prototype.indexOf);
const stringTrim = unapply(String.prototype.trim);
const numberToString = unapply(Number.prototype.toString);
const booleanToString = unapply(Boolean.prototype.toString);
const bigintToString = typeof BigInt === "undefined" ? null : unapply(BigInt.prototype.toString);
const symbolToString = typeof Symbol === "undefined" ? null : unapply(Symbol.prototype.toString);
const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
const objectToString = unapply(Object.prototype.toString);
const regExpTest = unapply(RegExp.prototype.test);
const typeErrorCreate = unconstruct(TypeError);
function unapply(func) {
  return function(thisArg) {
    if (thisArg instanceof RegExp) thisArg.lastIndex = 0;
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) args[_key3 - 1] = arguments[_key3];
    return apply(func, thisArg, args);
  };
}
function unconstruct(Func) {
  return function() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) args[_key4] = arguments[_key4];
    return construct(Func, args);
  };
}
function addToSet(set, array) {
  let transformCaseFunc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : stringToLowerCase;
  if (setPrototypeOf) setPrototypeOf(set, null);
  if (!arrayIsArray(array)) return set;
  let l = array.length;
  while (l--) {
    let element = array[l];
    if (typeof element === "string") {
      const lcElement = transformCaseFunc(element);
      if (lcElement !== element) {
        if (!isFrozen(array)) array[l] = lcElement;
        element = lcElement;
      }
    }
    set[element] = true;
  }
  return set;
}
function cleanArray(array) {
  for (let index = 0; index < array.length; index++) if (!objectHasOwnProperty(array, index)) array[index] = null;
  return array;
}
function clone(object) {
  const newObject = create(null);
  for (const _ref2 of entries(object)) {
    var _ref3 = _slicedToArray(_ref2, 2);
    const property = _ref3[0];
    const value = _ref3[1];
    if (objectHasOwnProperty(object, property)) {
      if (arrayIsArray(value)) newObject[property] = cleanArray(value);
      else if (value && typeof value === "object" && value.constructor === Object) newObject[property] = clone(value);
      else newObject[property] = value;
    }
  }
  return newObject;
}
function stringifyValue(value) {
  switch (typeof value) {
    case "string":
      return value;
    case "number":
      return numberToString(value);
    case "boolean":
      return booleanToString(value);
    case "bigint":
      return bigintToString ? bigintToString(value) : "0";
    case "symbol":
      return symbolToString ? symbolToString(value) : "Symbol()";
    case "undefined":
      return objectToString(value);
    case "function":
    case "object": {
      if (value === null) return objectToString(value);
      const valueAsRecord = value;
      const valueToString = lookupGetter(valueAsRecord, "toString");
      if (typeof valueToString === "function") {
        const stringified = valueToString(valueAsRecord);
        return typeof stringified === "string" ? stringified : objectToString(stringified);
      }
      return objectToString(value);
    }
    default:
      return objectToString(value);
  }
}
function lookupGetter(object, prop) {
  while (object !== null) {
    const desc = getOwnPropertyDescriptor(object, prop);
    if (desc) {
      if (desc.get) return unapply(desc.get);
      if (typeof desc.value === "function") return unapply(desc.value);
    }
    object = getPrototypeOf(object);
  }
  function fallbackValue() {
    return null;
  }
  return fallbackValue;
}
function lookupAccessor(object, prop) {
  while (object !== null) {
    const desc = getOwnPropertyDescriptor(object, prop);
    if (desc) return desc.get ? unapply(desc.get) : null;
    object = getPrototypeOf(object);
  }
  return null;
}
function isRegex(value) {
  try {
    regExpTest(value, "");
    return true;
  } catch (_unused) {
    return false;
  }
}
const html$1 = freeze([
  "a",
  "abbr",
  "acronym",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "bdi",
  "bdo",
  "big",
  "blink",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "center",
  "cite",
  "code",
  "col",
  "colgroup",
  "content",
  "data",
  "datalist",
  "dd",
  "decorator",
  "del",
  "details",
  "dfn",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "element",
  "em",
  "fieldset",
  "figcaption",
  "figure",
  "font",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meter",
  "nav",
  "nobr",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "search",
  "section",
  "select",
  "shadow",
  "slot",
  "small",
  "source",
  "spacer",
  "span",
  "strike",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "track",
  "tt",
  "u",
  "ul",
  "var",
  "video",
  "wbr"
]);
const svg$1 = freeze([
  "svg",
  "a",
  "altglyph",
  "altglyphdef",
  "altglyphitem",
  "animatecolor",
  "animatemotion",
  "animatetransform",
  "circle",
  "clippath",
  "defs",
  "desc",
  "ellipse",
  "enterkeyhint",
  "exportparts",
  "filter",
  "font",
  "g",
  "glyph",
  "glyphref",
  "hkern",
  "image",
  "inputmode",
  "line",
  "lineargradient",
  "marker",
  "mask",
  "metadata",
  "mpath",
  "part",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialgradient",
  "rect",
  "stop",
  "style",
  "switch",
  "symbol",
  "text",
  "textpath",
  "title",
  "tref",
  "tspan",
  "view",
  "vkern"
]);
const svgFilters = freeze([
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence"
]);
const svgDisallowed = freeze([
  "animate",
  "color-profile",
  "cursor",
  "discard",
  "font-face",
  "font-face-format",
  "font-face-name",
  "font-face-src",
  "font-face-uri",
  "foreignobject",
  "hatch",
  "hatchpath",
  "mesh",
  "meshgradient",
  "meshpatch",
  "meshrow",
  "missing-glyph",
  "script",
  "set",
  "solidcolor",
  "unknown",
  "use"
]);
const mathMl$1 = freeze([
  "math",
  "menclose",
  "merror",
  "mfenced",
  "mfrac",
  "mglyph",
  "mi",
  "mlabeledtr",
  "mmultiscripts",
  "mn",
  "mo",
  "mover",
  "mpadded",
  "mphantom",
  "mroot",
  "mrow",
  "ms",
  "mspace",
  "msqrt",
  "mstyle",
  "msub",
  "msup",
  "msubsup",
  "mtable",
  "mtd",
  "mtext",
  "mtr",
  "munder",
  "munderover",
  "mprescripts"
]);
const mathMlDisallowed = freeze([
  "maction",
  "maligngroup",
  "malignmark",
  "mlongdiv",
  "mscarries",
  "mscarry",
  "msgroup",
  "mstack",
  "msline",
  "msrow",
  "semantics",
  "annotation",
  "annotation-xml",
  "mprescripts",
  "none"
]);
const text = freeze(["#text"]);
const html = freeze([
  "accept",
  "action",
  "align",
  "alt",
  "autocapitalize",
  "autocomplete",
  "autopictureinpicture",
  "autoplay",
  "background",
  "bgcolor",
  "border",
  "capture",
  "cellpadding",
  "cellspacing",
  "checked",
  "cite",
  "class",
  "clear",
  "color",
  "cols",
  "colspan",
  "command",
  "commandfor",
  "controls",
  "controlslist",
  "coords",
  "crossorigin",
  "datetime",
  "decoding",
  "default",
  "dir",
  "disabled",
  "disablepictureinpicture",
  "disableremoteplayback",
  "download",
  "draggable",
  "enctype",
  "enterkeyhint",
  "exportparts",
  "face",
  "for",
  "headers",
  "height",
  "hidden",
  "high",
  "href",
  "hreflang",
  "id",
  "inert",
  "inputmode",
  "integrity",
  "ismap",
  "kind",
  "label",
  "lang",
  "list",
  "loading",
  "loop",
  "low",
  "max",
  "maxlength",
  "media",
  "method",
  "min",
  "minlength",
  "multiple",
  "muted",
  "name",
  "nonce",
  "noshade",
  "novalidate",
  "nowrap",
  "open",
  "optimum",
  "part",
  "pattern",
  "placeholder",
  "playsinline",
  "popover",
  "popovertarget",
  "popovertargetaction",
  "poster",
  "preload",
  "pubdate",
  "radiogroup",
  "readonly",
  "rel",
  "required",
  "rev",
  "reversed",
  "role",
  "rows",
  "rowspan",
  "spellcheck",
  "scope",
  "selected",
  "shape",
  "size",
  "sizes",
  "slot",
  "span",
  "srclang",
  "start",
  "src",
  "srcset",
  "step",
  "style",
  "summary",
  "tabindex",
  "title",
  "translate",
  "type",
  "usemap",
  "valign",
  "value",
  "width",
  "wrap",
  "xmlns"
]);
const svg = freeze([
  "accent-height",
  "accumulate",
  "additive",
  "alignment-baseline",
  "amplitude",
  "ascent",
  "attributename",
  "attributetype",
  "azimuth",
  "basefrequency",
  "baseline-shift",
  "begin",
  "bias",
  "by",
  "class",
  "clip",
  "clippathunits",
  "clip-path",
  "clip-rule",
  "color",
  "color-interpolation",
  "color-interpolation-filters",
  "color-profile",
  "color-rendering",
  "cx",
  "cy",
  "d",
  "dx",
  "dy",
  "diffuseconstant",
  "direction",
  "display",
  "divisor",
  "dominant-baseline",
  "dur",
  "edgemode",
  "elevation",
  "end",
  "exponent",
  "fill",
  "fill-opacity",
  "fill-rule",
  "filter",
  "filterunits",
  "flood-color",
  "flood-opacity",
  "font-family",
  "font-size",
  "font-size-adjust",
  "font-stretch",
  "font-style",
  "font-variant",
  "font-weight",
  "fx",
  "fy",
  "g1",
  "g2",
  "glyph-name",
  "glyphref",
  "gradientunits",
  "gradienttransform",
  "height",
  "href",
  "id",
  "image-rendering",
  "in",
  "in2",
  "intercept",
  "k",
  "k1",
  "k2",
  "k3",
  "k4",
  "kerning",
  "keypoints",
  "keysplines",
  "keytimes",
  "lang",
  "lengthadjust",
  "letter-spacing",
  "kernelmatrix",
  "kernelunitlength",
  "lighting-color",
  "local",
  "marker-end",
  "marker-mid",
  "marker-start",
  "markerheight",
  "markerunits",
  "markerwidth",
  "maskcontentunits",
  "maskunits",
  "max",
  "mask",
  "mask-type",
  "media",
  "method",
  "mode",
  "min",
  "name",
  "numoctaves",
  "offset",
  "operator",
  "opacity",
  "order",
  "orient",
  "orientation",
  "origin",
  "overflow",
  "paint-order",
  "path",
  "pathlength",
  "patterncontentunits",
  "patterntransform",
  "patternunits",
  "pointer-events",
  "points",
  "preservealpha",
  "preserveaspectratio",
  "primitiveunits",
  "r",
  "rx",
  "ry",
  "radius",
  "refx",
  "refy",
  "repeatcount",
  "repeatdur",
  "restart",
  "result",
  "rotate",
  "scale",
  "seed",
  "shape-rendering",
  "slope",
  "specularconstant",
  "specularexponent",
  "spreadmethod",
  "startoffset",
  "stddeviation",
  "stitchtiles",
  "stop-color",
  "stop-opacity",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke",
  "stroke-width",
  "style",
  "surfacescale",
  "systemlanguage",
  "tabindex",
  "tablevalues",
  "targetx",
  "targety",
  "transform",
  "transform-origin",
  "text-anchor",
  "text-decoration",
  "text-orientation",
  "text-rendering",
  "textlength",
  "type",
  "u1",
  "u2",
  "unicode",
  "values",
  "vector-effect",
  "viewbox",
  "visibility",
  "version",
  "vert-adv-y",
  "vert-origin-x",
  "vert-origin-y",
  "width",
  "word-spacing",
  "wrap",
  "writing-mode",
  "xchannelselector",
  "ychannelselector",
  "x",
  "x1",
  "x2",
  "xmlns",
  "y",
  "y1",
  "y2",
  "z",
  "zoomandpan"
]);
const mathMl = freeze([
  "accent",
  "accentunder",
  "align",
  "bevelled",
  "close",
  "columnalign",
  "columnlines",
  "columnspacing",
  "columnspan",
  "denomalign",
  "depth",
  "dir",
  "display",
  "displaystyle",
  "encoding",
  "fence",
  "frame",
  "height",
  "href",
  "id",
  "largeop",
  "length",
  "linethickness",
  "lquote",
  "lspace",
  "mathbackground",
  "mathcolor",
  "mathsize",
  "mathvariant",
  "maxsize",
  "minsize",
  "movablelimits",
  "notation",
  "numalign",
  "open",
  "rowalign",
  "rowlines",
  "rowspacing",
  "rowspan",
  "rspace",
  "rquote",
  "scriptlevel",
  "scriptminsize",
  "scriptsizemultiplier",
  "selection",
  "separator",
  "separators",
  "stretchy",
  "subscriptshift",
  "supscriptshift",
  "symmetric",
  "voffset",
  "width",
  "xmlns"
]);
const xml = freeze([
  "xlink:href",
  "xml:id",
  "xlink:title",
  "xml:space",
  "xmlns:xlink"
]);
const MUSTACHE_EXPR = seal(/{{[\w\W]*|^[\w\W]*}}/g);
const ERB_EXPR = seal(/<%[\w\W]*|^[\w\W]*%>/g);
const TMPLIT_EXPR = seal(/\${[\w\W]*/g);
const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/);
const ARIA_ATTR = seal(/^aria-[\-\w]+$/);
const IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i);
const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
const ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g);
const DOCTYPE_NAME = seal(/^html$/i);
const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
const ELEMENT_MARKUP_PROBE = seal(/<[/\w!]/g);
const COMMENT_MARKUP_PROBE = seal(/<[/\w]/g);
const FALLBACK_TAG_CLOSE = seal(/<\/no(script|embed|frames)/i);
const SELF_CLOSING_TAG = seal(/\/>/i);
const NODE_TYPE = {
  element: 1,
  attribute: 2,
  text: 3,
  cdataSection: 4,
  entityReference: 5,
  entityNode: 6,
  processingInstruction: 7,
  comment: 8,
  document: 9,
  documentType: 10,
  documentFragment: 11,
  notation: 12
};
const LITERAL_TEXT_ELEMENTS = freeze(addToSet({}, [
  "style",
  "script",
  "xmp",
  "iframe",
  "noembed",
  "noframes",
  "plaintext",
  "noscript"
]));
const getGlobal = function getGlobal2() {
  return typeof window === "undefined" ? null : window;
};
const _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, purifyHostElement) {
  if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") return null;
  let suffix = null;
  const ATTR_NAME = "data-tt-policy-suffix";
  if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) suffix = purifyHostElement.getAttribute(ATTR_NAME);
  const policyName = "dompurify" + (suffix ? "#" + suffix : "");
  try {
    return trustedTypes.createPolicy(policyName, {
      createHTML(html2) {
        return html2;
      },
      createScriptURL(scriptUrl) {
        return scriptUrl;
      }
    });
  } catch (_2) {
    console.warn("TrustedTypes policy " + policyName + " could not be created.");
    return null;
  }
};
const _createHooksMap = function _createHooksMap2() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
const _resolveSetOption = function _resolveSetOption2(cfg, key, fallback, options) {
  return objectHasOwnProperty(cfg, key) && arrayIsArray(cfg[key]) ? addToSet(options.base ? clone(options.base) : {}, cfg[key], options.transform) : fallback;
};
const _resolveObjectOption = function _resolveObjectOption2(cfg, key, makeFallback) {
  const value = objectHasOwnProperty(cfg, key) ? cfg[key] : void 0;
  return value && typeof value === "object" ? clone(value) : makeFallback();
};
function createDOMPurify() {
  let window2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
  const DOMPurify = (root) => createDOMPurify(root);
  DOMPurify.version = "3.4.17";
  DOMPurify.removed = [];
  if (!window2 || !window2.document || window2.document.nodeType !== NODE_TYPE.document || !window2.Element) {
    DOMPurify.isSupported = false;
    return DOMPurify;
  }
  let document2 = window2.document;
  const originalDocument = document2;
  const currentScript = originalDocument.currentScript;
  window2.DocumentFragment;
  const HTMLTemplateElement = window2.HTMLTemplateElement, Node = window2.Node, Element2 = window2.Element, NodeFilter2 = window2.NodeFilter;
  window2.NamedNodeMap === void 0 && (window2.NamedNodeMap || window2.MozNamedAttrMap);
  window2.HTMLFormElement;
  const DOMParser = window2.DOMParser, trustedTypes = window2.trustedTypes;
  const ElementPrototype = Element2.prototype;
  const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
  const remove = lookupGetter(ElementPrototype, "remove");
  const removeAttributeNode = lookupGetter(ElementPrototype, "removeAttributeNode");
  const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
  const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
  const getParentNode = lookupGetter(ElementPrototype, "parentNode");
  const getShadowRoot = lookupGetter(ElementPrototype, "shadowRoot");
  const getAttributes = lookupGetter(ElementPrototype, "attributes");
  const getNodeType = Node && Node.prototype ? lookupGetter(Node.prototype, "nodeType") : null;
  const getNodeName = Node && Node.prototype ? lookupGetter(Node.prototype, "nodeName") : null;
  const getOwnerDocument = Node && Node.prototype ? lookupGetter(Node.prototype, "ownerDocument") : null;
  const _readNodeType = function _readNodeType2(node2) {
    return getNodeType ? getNodeType(node2) : node2.nodeType;
  };
  const _readNodeName = function _readNodeName2(node2) {
    return getNodeName ? getNodeName(node2) : node2.nodeName;
  };
  const getNamespaceURI = lookupAccessor(ElementPrototype, "namespaceURI");
  const _readNamespaceURI = function _readNamespaceURI2(element) {
    return getNamespaceURI ? getNamespaceURI(element) : element.namespaceURI;
  };
  if (typeof HTMLTemplateElement === "function") {
    const template = document2.createElement("template");
    if (template.content && template.content.ownerDocument) document2 = template.content.ownerDocument;
  }
  let trustedTypesPolicy;
  let emptyHTML = "";
  let defaultTrustedTypesPolicy;
  let defaultTrustedTypesPolicyResolved = false;
  let IN_TRUSTED_TYPES_POLICY = 0;
  const _assertNotInTrustedTypesPolicy = function _assertNotInTrustedTypesPolicy2() {
    if (IN_TRUSTED_TYPES_POLICY > 0) throw typeErrorCreate('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.');
  };
  const _createTrustedHTML = function _createTrustedHTML2(html2) {
    _assertNotInTrustedTypesPolicy();
    IN_TRUSTED_TYPES_POLICY++;
    try {
      return trustedTypesPolicy.createHTML(html2);
    } finally {
      IN_TRUSTED_TYPES_POLICY--;
    }
  };
  const _createTrustedScriptURL = function _createTrustedScriptURL2(scriptUrl) {
    _assertNotInTrustedTypesPolicy();
    IN_TRUSTED_TYPES_POLICY++;
    try {
      return trustedTypesPolicy.createScriptURL(scriptUrl);
    } finally {
      IN_TRUSTED_TYPES_POLICY--;
    }
  };
  const _getDefaultTrustedTypesPolicy = function _getDefaultTrustedTypesPolicy2() {
    if (!defaultTrustedTypesPolicyResolved) {
      defaultTrustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
      defaultTrustedTypesPolicyResolved = true;
    }
    return defaultTrustedTypesPolicy;
  };
  const _document = document2, implementation = _document.implementation, createNodeIterator = _document.createNodeIterator, createDocumentFragment = _document.createDocumentFragment, getElementsByTagName = _document.getElementsByTagName;
  const importNode = originalDocument.importNode;
  let hooks = _createHooksMap();
  DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0;
  const MUSTACHE_EXPR$1 = MUSTACHE_EXPR, ERB_EXPR$1 = ERB_EXPR, TMPLIT_EXPR$1 = TMPLIT_EXPR, DATA_ATTR$1 = DATA_ATTR, ARIA_ATTR$1 = ARIA_ATTR, IS_SCRIPT_OR_DATA$1 = IS_SCRIPT_OR_DATA, ATTR_WHITESPACE$1 = ATTR_WHITESPACE, CUSTOM_ELEMENT$1 = CUSTOM_ELEMENT;
  let IS_ALLOWED_URI$1 = IS_ALLOWED_URI;
  let ALLOWED_TAGS2 = null;
  const DEFAULT_ALLOWED_TAGS = addToSet({}, [
    ...html$1,
    ...svg$1,
    ...svgFilters,
    ...mathMl$1,
    ...text
  ]);
  let ALLOWED_ATTR2 = null;
  const DEFAULT_ALLOWED_ATTR = addToSet({}, [
    ...html,
    ...svg,
    ...mathMl,
    ...xml
  ]);
  let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
    tagNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: false
    }
  }));
  let FORBID_TAGS = null;
  let FORBID_ATTR = null;
  const EXTRA_ELEMENT_HANDLING = Object.seal(create(null, {
    tagCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    }
  }));
  let ALLOW_ARIA_ATTR = true;
  let ALLOW_DATA_ATTR = true;
  let ALLOW_UNKNOWN_PROTOCOLS = false;
  let ALLOW_SELF_CLOSE_IN_ATTR = true;
  let SAFE_FOR_TEMPLATES = false;
  let SAFE_FOR_XML = true;
  let WHOLE_DOCUMENT = false;
  let SET_CONFIG = false;
  let SET_CONFIG_ALLOWED_TAGS = null;
  let SET_CONFIG_ALLOWED_ATTR = null;
  let FORCE_BODY = false;
  let RETURN_DOM = false;
  let RETURN_DOM_FRAGMENT = false;
  let RETURN_TRUSTED_TYPE = false;
  let SANITIZE_DOM = true;
  let SANITIZE_NAMED_PROPS = false;
  const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
  let KEEP_CONTENT = true;
  let IN_PLACE = false;
  let IN_PLACE_VISITED = null;
  let USE_PROFILES = {};
  let FORBID_CONTENTS = null;
  const DEFAULT_FORBID_CONTENTS = addToSet({}, [
    "annotation-xml",
    "audio",
    "colgroup",
    "desc",
    "foreignobject",
    "head",
    "iframe",
    "math",
    "mi",
    "mn",
    "mo",
    "ms",
    "mtext",
    "noembed",
    "noframes",
    "noscript",
    "plaintext",
    "script",
    "selectedcontent",
    "style",
    "svg",
    "template",
    "thead",
    "title",
    "video",
    "xmp"
  ]);
  let DATA_URI_TAGS = null;
  const DEFAULT_DATA_URI_TAGS = addToSet({}, [
    "audio",
    "video",
    "img",
    "source",
    "image",
    "track"
  ]);
  let URI_SAFE_ATTRIBUTES = null;
  const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, [
    "alt",
    "class",
    "for",
    "id",
    "label",
    "name",
    "pattern",
    "placeholder",
    "role",
    "summary",
    "title",
    "value",
    "style",
    "xmlns"
  ]);
  const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
  let NAMESPACE2 = HTML_NAMESPACE;
  let IS_EMPTY_INPUT = false;
  let ALLOWED_NAMESPACES = null;
  const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [
    MATHML_NAMESPACE,
    SVG_NAMESPACE,
    HTML_NAMESPACE
  ], stringToString);
  const DEFAULT_MATHML_TEXT_INTEGRATION_POINTS = freeze([
    "mi",
    "mo",
    "mn",
    "ms",
    "mtext"
  ]);
  let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, DEFAULT_MATHML_TEXT_INTEGRATION_POINTS);
  const DEFAULT_HTML_INTEGRATION_POINTS = freeze(["annotation-xml"]);
  let HTML_INTEGRATION_POINTS = addToSet({}, DEFAULT_HTML_INTEGRATION_POINTS);
  const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, [
    "title",
    "style",
    "font",
    "a",
    "script"
  ]);
  let PARSER_MEDIA_TYPE = null;
  const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
  const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
  let transformCaseFunc = null;
  let CONFIG = null;
  const formElement = document2.createElement("form");
  const isRegexOrFunction = function isRegexOrFunction2(testValue) {
    return testValue instanceof RegExp || testValue instanceof Function;
  };
  const _parseConfig = function _parseConfig2() {
    let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (CONFIG && CONFIG === cfg) return;
    if (!cfg || typeof cfg !== "object") cfg = {};
    cfg = clone(cfg);
    PARSER_MEDIA_TYPE = SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
    transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
    ALLOWED_TAGS2 = _resolveSetOption(cfg, "ALLOWED_TAGS", DEFAULT_ALLOWED_TAGS, { transform: transformCaseFunc });
    ALLOWED_ATTR2 = _resolveSetOption(cfg, "ALLOWED_ATTR", DEFAULT_ALLOWED_ATTR, { transform: transformCaseFunc });
    ALLOWED_NAMESPACES = _resolveSetOption(cfg, "ALLOWED_NAMESPACES", DEFAULT_ALLOWED_NAMESPACES, { transform: stringToString });
    URI_SAFE_ATTRIBUTES = _resolveSetOption(cfg, "ADD_URI_SAFE_ATTR", DEFAULT_URI_SAFE_ATTRIBUTES, {
      transform: transformCaseFunc,
      base: DEFAULT_URI_SAFE_ATTRIBUTES
    });
    DATA_URI_TAGS = _resolveSetOption(cfg, "ADD_DATA_URI_TAGS", DEFAULT_DATA_URI_TAGS, {
      transform: transformCaseFunc,
      base: DEFAULT_DATA_URI_TAGS
    });
    FORBID_CONTENTS = _resolveSetOption(cfg, "FORBID_CONTENTS", DEFAULT_FORBID_CONTENTS, { transform: transformCaseFunc });
    FORBID_TAGS = _resolveSetOption(cfg, "FORBID_TAGS", clone({}), { transform: transformCaseFunc });
    FORBID_ATTR = _resolveSetOption(cfg, "FORBID_ATTR", clone({}), { transform: transformCaseFunc });
    USE_PROFILES = objectHasOwnProperty(cfg, "USE_PROFILES") ? cfg.USE_PROFILES && typeof cfg.USE_PROFILES === "object" ? clone(cfg.USE_PROFILES) : cfg.USE_PROFILES : false;
    ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
    ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
    ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
    ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
    SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
    SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false;
    WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
    RETURN_DOM = cfg.RETURN_DOM || false;
    RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
    RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
    FORCE_BODY = cfg.FORCE_BODY || false;
    SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
    SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
    KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
    IN_PLACE = cfg.IN_PLACE || false;
    IS_ALLOWED_URI$1 = isRegex(cfg.ALLOWED_URI_REGEXP) ? cfg.ALLOWED_URI_REGEXP : IS_ALLOWED_URI;
    NAMESPACE2 = typeof cfg.NAMESPACE === "string" ? cfg.NAMESPACE : HTML_NAMESPACE;
    MATHML_TEXT_INTEGRATION_POINTS = _resolveObjectOption(cfg, "MATHML_TEXT_INTEGRATION_POINTS", () => addToSet({}, DEFAULT_MATHML_TEXT_INTEGRATION_POINTS));
    HTML_INTEGRATION_POINTS = _resolveObjectOption(cfg, "HTML_INTEGRATION_POINTS", () => addToSet({}, DEFAULT_HTML_INTEGRATION_POINTS));
    const customElementHandling = _resolveObjectOption(cfg, "CUSTOM_ELEMENT_HANDLING", () => create(null));
    CUSTOM_ELEMENT_HANDLING = create(null);
    if (objectHasOwnProperty(customElementHandling, "tagNameCheck") && isRegexOrFunction(customElementHandling.tagNameCheck)) CUSTOM_ELEMENT_HANDLING.tagNameCheck = customElementHandling.tagNameCheck;
    if (objectHasOwnProperty(customElementHandling, "attributeNameCheck") && isRegexOrFunction(customElementHandling.attributeNameCheck)) CUSTOM_ELEMENT_HANDLING.attributeNameCheck = customElementHandling.attributeNameCheck;
    if (objectHasOwnProperty(customElementHandling, "allowCustomizedBuiltInElements") && typeof customElementHandling.allowCustomizedBuiltInElements === "boolean") CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = customElementHandling.allowCustomizedBuiltInElements;
    seal(CUSTOM_ELEMENT_HANDLING);
    if (SAFE_FOR_TEMPLATES) ALLOW_DATA_ATTR = false;
    if (RETURN_DOM_FRAGMENT) RETURN_DOM = true;
    if (USE_PROFILES) {
      ALLOWED_TAGS2 = addToSet({}, text);
      ALLOWED_ATTR2 = create(null);
      if (USE_PROFILES.html === true) {
        addToSet(ALLOWED_TAGS2, html$1);
        addToSet(ALLOWED_ATTR2, html);
      }
      if (USE_PROFILES.svg === true) {
        addToSet(ALLOWED_TAGS2, svg$1);
        addToSet(ALLOWED_ATTR2, svg);
        addToSet(ALLOWED_ATTR2, xml);
      }
      if (USE_PROFILES.svgFilters === true) {
        addToSet(ALLOWED_TAGS2, svgFilters);
        addToSet(ALLOWED_ATTR2, svg);
        addToSet(ALLOWED_ATTR2, xml);
      }
      if (USE_PROFILES.mathMl === true) {
        addToSet(ALLOWED_TAGS2, mathMl$1);
        addToSet(ALLOWED_ATTR2, mathMl);
        addToSet(ALLOWED_ATTR2, xml);
      }
    }
    EXTRA_ELEMENT_HANDLING.tagCheck = null;
    EXTRA_ELEMENT_HANDLING.attributeCheck = null;
    if (objectHasOwnProperty(cfg, "ADD_TAGS")) {
      if (typeof cfg.ADD_TAGS === "function") EXTRA_ELEMENT_HANDLING.tagCheck = cfg.ADD_TAGS;
      else if (arrayIsArray(cfg.ADD_TAGS)) {
        if (ALLOWED_TAGS2 === DEFAULT_ALLOWED_TAGS) ALLOWED_TAGS2 = clone(ALLOWED_TAGS2);
        addToSet(ALLOWED_TAGS2, cfg.ADD_TAGS, transformCaseFunc);
      }
    }
    if (objectHasOwnProperty(cfg, "ADD_ATTR")) {
      if (typeof cfg.ADD_ATTR === "function") EXTRA_ELEMENT_HANDLING.attributeCheck = cfg.ADD_ATTR;
      else if (arrayIsArray(cfg.ADD_ATTR)) {
        if (ALLOWED_ATTR2 === DEFAULT_ALLOWED_ATTR) ALLOWED_ATTR2 = clone(ALLOWED_ATTR2);
        addToSet(ALLOWED_ATTR2, cfg.ADD_ATTR, transformCaseFunc);
      }
    }
    if (objectHasOwnProperty(cfg, "ADD_FORBID_CONTENTS") && arrayIsArray(cfg.ADD_FORBID_CONTENTS)) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) FORBID_CONTENTS = clone(FORBID_CONTENTS);
      addToSet(FORBID_CONTENTS, cfg.ADD_FORBID_CONTENTS, transformCaseFunc);
    }
    if (KEEP_CONTENT) ALLOWED_TAGS2["#text"] = true;
    if (WHOLE_DOCUMENT) addToSet(ALLOWED_TAGS2, [
      "html",
      "head",
      "body"
    ]);
    if (ALLOWED_TAGS2.table) {
      addToSet(ALLOWED_TAGS2, ["tbody"]);
      delete FORBID_TAGS.tbody;
    }
    if (cfg.TRUSTED_TYPES_POLICY) {
      if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      const previousTrustedTypesPolicy = trustedTypesPolicy;
      trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
      try {
        emptyHTML = _createTrustedHTML("");
      } catch (error) {
        trustedTypesPolicy = previousTrustedTypesPolicy;
        throw error;
      }
    } else if (cfg.TRUSTED_TYPES_POLICY === null) {
      trustedTypesPolicy = void 0;
      emptyHTML = "";
    } else {
      if (trustedTypesPolicy === void 0) trustedTypesPolicy = _getDefaultTrustedTypesPolicy();
      if (trustedTypesPolicy && typeof emptyHTML === "string") emptyHTML = _createTrustedHTML("");
    }
    if (freeze) freeze(cfg);
    CONFIG = cfg;
  };
  const ALL_SVG_TAGS = addToSet({}, [
    ...svg$1,
    ...svgFilters,
    ...svgDisallowed
  ]);
  const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
  const _checkSvgNamespace = function _checkSvgNamespace2(tagName, parent, parentTagName) {
    if (parent.namespaceURI === HTML_NAMESPACE) return tagName === "svg";
    if (parent.namespaceURI === MATHML_NAMESPACE) return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
    return Boolean(ALL_SVG_TAGS[tagName]);
  };
  const _checkMathMlNamespace = function _checkMathMlNamespace2(tagName, parent, parentTagName) {
    if (parent.namespaceURI === HTML_NAMESPACE) return tagName === "math";
    if (parent.namespaceURI === SVG_NAMESPACE) return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
    return Boolean(ALL_MATHML_TAGS[tagName]);
  };
  const _checkHtmlNamespace = function _checkHtmlNamespace2(tagName, parent, parentTagName) {
    if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) return false;
    if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) return false;
    return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
  };
  const _checkValidNamespace = function _checkValidNamespace2(element) {
    const elementNamespace = _readNamespaceURI(element);
    const tagName = stringToLowerCase(_readNodeName(element));
    const parentNode = getParentNode(element);
    let parent;
    let parentTagName;
    if (parentNode && _readNodeType(parentNode) === NODE_TYPE.element) {
      parent = { namespaceURI: _readNamespaceURI(parentNode) };
      parentTagName = stringToLowerCase(_readNodeName(parentNode));
    } else {
      parent = { namespaceURI: NAMESPACE2 };
      parentTagName = "template";
    }
    if (!ALLOWED_NAMESPACES[elementNamespace]) return false;
    if (elementNamespace === SVG_NAMESPACE) return _checkSvgNamespace(tagName, parent, parentTagName);
    if (elementNamespace === MATHML_NAMESPACE) return _checkMathMlNamespace(tagName, parent, parentTagName);
    if (elementNamespace === HTML_NAMESPACE) return _checkHtmlNamespace(tagName, parent, parentTagName);
    if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[elementNamespace]) return true;
    return false;
  };
  const _forceRemove = function _forceRemove2(node2) {
    arrayPush(DOMPurify.removed, { element: node2 });
    try {
      getParentNode(node2).removeChild(node2);
    } catch (_2) {
      remove(node2);
      if (!getParentNode(node2)) throw typeErrorCreate("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
    }
  };
  const _stripAttributeNode = function _stripAttributeNode2(element, attribute, name) {
    try {
      removeAttributeNode(element, attribute);
    } catch (_2) {
      try {
        element.removeAttribute(name);
      } catch (_3) {
      }
    }
  };
  const _neutralizeRoot = function _neutralizeRoot2(root) {
    _neutralizeSubtree(root);
    const childNodes = getChildNodes(root);
    if (childNodes) arrayForEach(arraySlice(childNodes), (child) => {
      try {
        remove(child);
      } catch (_2) {
      }
    });
    const attributes = _readNodeType(root) === NODE_TYPE.element ? getAttributes(root) : null;
    if (attributes) for (let i = attributes.length - 1; i >= 0; --i) {
      const attribute = attributes[i];
      const name = attribute && attribute.name;
      if (typeof name === "string") _stripAttributeNode(root, attribute, name);
    }
  };
  const _removeAttribute = function _removeAttribute2(name, element, attr) {
    if (!attr) try {
      attr = element.getAttributeNode(name);
    } catch (_2) {
      attr = null;
    }
    arrayPush(DOMPurify.removed, {
      attribute: attr || null,
      from: element
    });
    try {
      if (attr) removeAttributeNode(element, attr);
      else element.removeAttribute(name);
    } catch (_2) {
      try {
        element.removeAttribute(name);
      } catch (_3) {
      }
    }
    if (name === "is") {
      if (RETURN_DOM || RETURN_DOM_FRAGMENT) try {
        _forceRemove(element);
      } catch (_2) {
      }
      else try {
        element.setAttribute(name, "");
      } catch (_2) {
      }
    }
  };
  const _stripDisallowedAttributes = function _stripDisallowedAttributes2(element) {
    const attributes = getAttributes(element);
    if (!attributes) return;
    for (let i = attributes.length - 1; i >= 0; --i) {
      const attribute = attributes[i];
      const name = attribute && attribute.name;
      if (typeof name !== "string" || ALLOWED_ATTR2[transformCaseFunc(name)]) continue;
      _stripAttributeNode(element, attribute, name);
    }
  };
  const _walkTree = function _walkTree2(root, visit) {
    let intoShadow = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    const stack = [root];
    while (stack.length > 0) {
      const node2 = stack.pop();
      if (visit(node2) === false) continue;
      if (intoShadow && _readNodeType(node2) === NODE_TYPE.element) {
        const shadowRoot = getShadowRoot(node2);
        if (_isDocumentFragment(shadowRoot)) stack.push(shadowRoot);
      }
      const childNodes = getChildNodes(node2);
      if (childNodes) for (let i = childNodes.length - 1; i >= 0; --i) stack.push(childNodes[i]);
    }
  };
  const _neutralizeSubtree = function _neutralizeSubtree2(root) {
    _walkTree(root, (node2) => {
      if (_readNodeType(node2) === NODE_TYPE.element) _stripDisallowedAttributes(node2);
    });
  };
  const _collectLiveNodes = function _collectLiveNodes2(root) {
    const nodes = [];
    _walkTree(root, (node2) => {
      nodes.push(node2);
    }, true);
    return nodes;
  };
  const _neutralizeEscapedElements = function _neutralizeEscapedElements2(root, before) {
    const reachable = setCreate();
    arrayForEach(_collectLiveNodes(root), (node2) => {
      if (_readNodeType(node2) === NODE_TYPE.element) setAdd(reachable, node2);
    });
    arrayForEach(before, (node2) => {
      if (_readNodeType(node2) === NODE_TYPE.element && !setHas(reachable, node2)) _stripDisallowedAttributes(node2);
    });
  };
  const _neutralizeDiscarded = function _neutralizeDiscarded2(root, before) {
    let rootRemoved = false;
    arrayForEach(DOMPurify.removed, (entry) => {
      if (entry.element) {
        rootRemoved = rootRemoved || entry.element === root;
        _neutralizeSubtree(entry.element);
      }
    });
    _neutralizeEscapedElements(root, before);
    return rootRemoved;
  };
  const MAX_UNVISITED_ROUNDS = 8;
  const _sanitizeUnvisitedNodes = function _sanitizeUnvisitedNodes2(root, before) {
    const visited = IN_PLACE_VISITED;
    let original = null;
    const getOriginal = () => {
      if (!original) {
        original = setCreate();
        arrayForEach(before, (beforeNode) => {
          setAdd(original, beforeNode);
        });
      }
      return original;
    };
    for (let round = 0; ; round++) {
      const live = _collectLiveNodes(root);
      const containers = [root];
      let pending = false;
      arrayForEach(live, (node2) => {
        if (_readNodeType(node2) === NODE_TYPE.documentFragment) arrayPush(containers, node2);
        else if (!pending && !setHas(visited, node2)) pending = setHas(getOriginal(), node2);
      });
      if (!pending) return;
      if (round >= MAX_UNVISITED_ROUNDS) throw typeErrorCreate("the tree kept changing during in-place sanitization; refusing to return it");
      arrayForEach(containers, (container, index) => {
        _sanitizeUnvisitedIn(container, index > 0, root, getOriginal());
      });
    }
  };
  const _sanitizeUnvisitedIn = function _sanitizeUnvisitedIn2(container, inShadow, root, original) {
    const iterator = _createNodeIterator(container);
    let node2;
    while (node2 = iterator.nextNode()) {
      if (!setHas(original, node2) || setHas(IN_PLACE_VISITED, node2)) continue;
      if (inShadow) _executeHooks(hooks.uponSanitizeShadowNode, node2, null);
      _sanitizeElements(node2, root);
      _sanitizeAttributes(node2, root);
      if (_isDocumentFragment(node2.content)) _sanitizeShadowDOM2(node2.content);
    }
  };
  const _markVisited = function _markVisited2(node2) {
    if (IN_PLACE_VISITED) setAdd(IN_PLACE_VISITED, node2);
  };
  const _isPatchLinkageAttribute = function _isPatchLinkageAttribute2(lcName, lcTag) {
    if (!SAFE_FOR_XML) return false;
    if (lcName === "patchsrc") return true;
    return lcName === "for" && lcTag !== "label" && lcTag !== "output";
  };
  const _neutralizePatchLinkage = function _neutralizePatchLinkage2(root) {
    if (!SAFE_FOR_XML) return;
    _walkTree(root, (node2) => {
      const nodeType = _readNodeType(node2);
      if (nodeType === NODE_TYPE.processingInstruction || nodeType === NODE_TYPE.comment && regExpTest(COMMENT_MARKUP_PROBE, node2.data)) {
        try {
          remove(node2);
        } catch (_2) {
        }
        return false;
      }
      if (nodeType === NODE_TYPE.element) {
        const element = node2;
        const lcTag = transformCaseFunc(_readNodeName(node2));
        try {
          if (element.hasAttribute && element.hasAttribute("patchsrc")) element.removeAttribute("patchsrc");
          if (element.hasAttribute && element.hasAttribute("for") && _isPatchLinkageAttribute("for", lcTag)) element.removeAttribute("for");
        } catch (_2) {
        }
      }
      return true;
    });
  };
  const _initDocument = function _initDocument2(dirty) {
    let doc = null;
    let leadingWhitespace = null;
    if (FORCE_BODY) dirty = "<remove></remove>" + dirty;
    else {
      const matches = stringMatch(dirty, /^[\r\n\t ]+/);
      leadingWhitespace = matches && matches[0];
    }
    if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE2 === HTML_NAMESPACE) dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
    const dirtyPayload = trustedTypesPolicy ? _createTrustedHTML(dirty) : dirty;
    if (NAMESPACE2 === HTML_NAMESPACE) try {
      doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
    } catch (_2) {
    }
    if (!doc || !doc.documentElement) {
      doc = implementation.createDocument(NAMESPACE2, "template", null);
      try {
        doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
      } catch (_2) {
      }
    }
    const body = doc.body || doc.documentElement;
    if (dirty && leadingWhitespace) body.insertBefore(document2.createTextNode(leadingWhitespace), body.childNodes[0] || null);
    if (NAMESPACE2 === HTML_NAMESPACE) return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
    return WHOLE_DOCUMENT ? doc.documentElement : body;
  };
  const _createNodeIterator = function _createNodeIterator2(root) {
    const doc = getOwnerDocument ? getOwnerDocument(root) : root.ownerDocument;
    return createNodeIterator.call(doc || root, root, NodeFilter2.SHOW_ELEMENT | NodeFilter2.SHOW_COMMENT | NodeFilter2.SHOW_TEXT | NodeFilter2.SHOW_PROCESSING_INSTRUCTION | NodeFilter2.SHOW_CDATA_SECTION, null);
  };
  const _stripTemplateExpressions = function _stripTemplateExpressions2(value) {
    value = stringReplace(value, MUSTACHE_EXPR$1, " ");
    value = stringReplace(value, ERB_EXPR$1, " ");
    value = stringReplace(value, TMPLIT_EXPR$1, " ");
    return value;
  };
  const _scrubTemplateExpressions2 = function _scrubTemplateExpressions(node2) {
    var _node$querySelectorAl;
    _scrubOwnCharacterData(node2);
    const templates = (_node$querySelectorAl = node2.querySelectorAll) === null || _node$querySelectorAl === void 0 ? void 0 : _node$querySelectorAl.call(node2, "template");
    if (templates) arrayForEach(templates, (tmpl) => {
      if (_isDocumentFragment(tmpl.content)) _scrubTemplateExpressions2(tmpl.content);
    });
  };
  const _scrubOwnCharacterData = function _scrubOwnCharacterData2(node2) {
    node2.normalize();
    const doc = getOwnerDocument ? getOwnerDocument(node2) : node2.ownerDocument;
    const walker = createNodeIterator.call(doc || node2, node2, NodeFilter2.SHOW_TEXT | NodeFilter2.SHOW_COMMENT | NodeFilter2.SHOW_CDATA_SECTION | NodeFilter2.SHOW_PROCESSING_INSTRUCTION, null);
    let currentNode = walker.nextNode();
    while (currentNode) {
      currentNode.data = _stripTemplateExpressions(currentNode.data);
      currentNode = walker.nextNode();
    }
  };
  const _isClobbered = function _isClobbered2(element) {
    const realTagName = getNodeName ? getNodeName(element) : null;
    if (typeof realTagName !== "string") return false;
    if (transformCaseFunc(realTagName) !== "form") return false;
    return typeof element.nodeName !== "string" || typeof element.textContent !== "string" || typeof element.removeChild !== "function" || element.attributes !== getAttributes(element) || typeof element.removeAttribute !== "function" || typeof element.removeAttributeNode !== "function" || typeof element.getAttributeNode !== "function" || typeof element.setAttribute !== "function" || typeof element.namespaceURI !== "string" || typeof element.insertBefore !== "function" || typeof element.hasChildNodes !== "function" || element.nodeType !== getNodeType(element) || element.childNodes !== getChildNodes(element);
  };
  const _isDocumentFragment = function _isDocumentFragment2(value) {
    if (!getNodeType || typeof value !== "object" || value === null) return false;
    try {
      return getNodeType(value) === NODE_TYPE.documentFragment;
    } catch (_2) {
      return false;
    }
  };
  const _isNode = function _isNode2(value) {
    if (!getNodeType || typeof value !== "object" || value === null) return false;
    try {
      return typeof getNodeType(value) === "number";
    } catch (_2) {
      return false;
    }
  };
  function _executeHooks(hooks2, currentNode, data) {
    if (hooks2.length === 0) return;
    arrayForEach(hooks2, (hook) => {
      hook.call(DOMPurify, currentNode, data, CONFIG);
    });
  }
  const _isUnsafeNode = function _isUnsafeNode2(currentNode, tagName) {
    if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(ELEMENT_MARKUP_PROBE, currentNode.textContent) && regExpTest(ELEMENT_MARKUP_PROBE, currentNode.innerHTML)) return true;
    if (SAFE_FOR_XML && LITERAL_TEXT_ELEMENTS[tagName] && _readNodeType(currentNode) === NODE_TYPE.element && _readNamespaceURI(currentNode) === HTML_NAMESPACE && (_isNode(currentNode.firstElementChild) || typeof currentNode.textContent === "string" && regExpTest(ELEMENT_MARKUP_PROBE, currentNode.textContent))) return true;
    if (currentNode.nodeType === NODE_TYPE.processingInstruction) return true;
    if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(COMMENT_MARKUP_PROBE, currentNode.data)) return true;
    return false;
  };
  const _matchesNameCheck = function _matchesNameCheck2(check, name) {
    if (check instanceof RegExp) return regExpTest(check, name);
    if (check instanceof Function) {
      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) args[_key - 2] = arguments[_key];
      return Boolean(check(name, ...args));
    }
    return false;
  };
  const _sanitizeDisallowedNode = function _sanitizeDisallowedNode2(currentNode, tagName, root) {
    if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName) && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) return false;
    if (KEEP_CONTENT && !FORBID_CONTENTS[tagName] && !FORBID_CONTENTS[stringToLowerCase(tagName)]) {
      const parentNode = getParentNode(currentNode);
      const childNodes = getChildNodes(currentNode);
      if (childNodes && parentNode) {
        const childCount = childNodes.length;
        for (let i = childCount - 1; i >= 0; --i) {
          const hoisted = currentNode === root ? cloneNode(childNodes[i], true) : childNodes[i];
          parentNode.insertBefore(hoisted, getNextSibling(currentNode));
        }
      }
    }
    _forceRemove(currentNode);
    return true;
  };
  const _forkSharedAllowlist = function _forkSharedAllowlist2(hookList, set, defaultSet, setConfigSet) {
    if (hookList.length === 0) return set;
    return set === defaultSet || set === setConfigSet ? clone(set) : set;
  };
  const _handleHookDetachedNode = function _handleHookDetachedNode2(currentNode, root) {
    if (currentNode === root || getParentNode(currentNode) !== null) return false;
    if (IN_PLACE) _neutralizeSubtree(currentNode);
    return true;
  };
  const _sanitizeElements = function _sanitizeElements2(currentNode, root) {
    _markVisited(currentNode);
    _executeHooks(hooks.beforeSanitizeElements, currentNode, null);
    if (_handleHookDetachedNode(currentNode, root)) return true;
    if (_isClobbered(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    const tagName = transformCaseFunc(_readNodeName(currentNode));
    ALLOWED_TAGS2 = _forkSharedAllowlist(hooks.uponSanitizeElement, ALLOWED_TAGS2, DEFAULT_ALLOWED_TAGS, SET_CONFIG_ALLOWED_TAGS);
    _executeHooks(hooks.uponSanitizeElement, currentNode, {
      tagName,
      allowedTags: ALLOWED_TAGS2
    });
    if (_handleHookDetachedNode(currentNode, root)) return true;
    if (_isUnsafeNode(currentNode, tagName)) {
      _forceRemove(currentNode);
      return true;
    }
    if (FORBID_TAGS[tagName] || !(EXTRA_ELEMENT_HANDLING.tagCheck instanceof Function && EXTRA_ELEMENT_HANDLING.tagCheck(tagName)) && !ALLOWED_TAGS2[tagName]) {
      const removed = _sanitizeDisallowedNode(currentNode, tagName, root);
      if (removed === false) {
        _executeHooks(hooks.afterSanitizeElements, currentNode, null);
        if (_handleHookDetachedNode(currentNode, root)) return true;
      }
      return removed;
    }
    if (_readNodeType(currentNode) === NODE_TYPE.element && !_checkValidNamespace(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(FALLBACK_TAG_CLOSE, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }
    if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
      const content = _stripTemplateExpressions(currentNode.textContent);
      if (currentNode.textContent !== content) {
        arrayPush(DOMPurify.removed, { element: currentNode.cloneNode() });
        currentNode.textContent = content;
      }
    }
    _executeHooks(hooks.afterSanitizeElements, currentNode, null);
    return _handleHookDetachedNode(currentNode, root);
  };
  const _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
    if (FORBID_ATTR[lcName]) return false;
    if (_isPatchLinkageAttribute(lcName, lcTag)) return false;
    if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document2 || value in formElement)) return false;
    const nameIsPermitted = ALLOWED_ATTR2[lcName] || EXTRA_ELEMENT_HANDLING.attributeCheck instanceof Function && EXTRA_ELEMENT_HANDLING.attributeCheck(lcName, lcTag);
    if (ALLOW_DATA_ATTR && regExpTest(DATA_ATTR$1, lcName)) return true;
    if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$1, lcName)) return true;
    if (!nameIsPermitted) return _isBasicCustomElement(lcTag) && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName, lcTag) || lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value);
    if (URI_SAFE_ATTRIBUTES[lcName]) return true;
    if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE$1, ""))) return true;
    if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag]) return true;
    if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$1, stringReplace(value, ATTR_WHITESPACE$1, ""))) return true;
    return !value;
  };
  const RESERVED_CUSTOM_ELEMENT_NAMES = addToSet({}, [
    "annotation-xml",
    "color-profile",
    "font-face",
    "font-face-format",
    "font-face-name",
    "font-face-src",
    "font-face-uri",
    "missing-glyph"
  ]);
  const _isBasicCustomElement = function _isBasicCustomElement2(tagName) {
    return !RESERVED_CUSTOM_ELEMENT_NAMES[stringToLowerCase(tagName)] && regExpTest(CUSTOM_ELEMENT$1, tagName);
  };
  const _applyTrustedTypesToAttribute = function _applyTrustedTypesToAttribute2(lcTag, lcName, namespaceURI, value) {
    if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function" && !namespaceURI) switch (trustedTypes.getAttributeType(lcTag, lcName)) {
      case "TrustedHTML":
        return _createTrustedHTML(value);
      case "TrustedScriptURL":
        return _createTrustedScriptURL(value);
    }
    return value;
  };
  const _setAttributeValue = function _setAttributeValue2(currentNode, name, namespaceURI, value) {
    try {
      if (namespaceURI) currentNode.setAttributeNS(namespaceURI, name, value);
      else currentNode.setAttribute(name, value);
      if (_isClobbered(currentNode)) {
        _forceRemove(currentNode);
        return false;
      }
      return true;
    } catch (_2) {
      _removeAttribute(name, currentNode);
      return false;
    }
  };
  const _isUnsafeAttributeValue = function _isUnsafeAttributeValue2(name, value) {
    if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, value)) return true;
    return stringToLowerCase(name) === "attributename" && stringMatch(value, "href") !== null;
  };
  const _sanitizeAttributes = function _sanitizeAttributes2(currentNode, root) {
    _executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
    if (_handleHookDetachedNode(currentNode, root)) return;
    const attributes = currentNode.attributes;
    if (!attributes || _isClobbered(currentNode)) return;
    ALLOWED_ATTR2 = _forkSharedAllowlist(hooks.uponSanitizeAttribute, ALLOWED_ATTR2, DEFAULT_ALLOWED_ATTR, SET_CONFIG_ALLOWED_ATTR);
    const hookEvent = {
      attrName: "",
      attrValue: "",
      keepAttr: true,
      allowedAttributes: ALLOWED_ATTR2,
      forceKeepAttr: void 0
    };
    let l = attributes.length;
    const lcTag = transformCaseFunc(currentNode.nodeName);
    while (l--) {
      const attr = attributes[l];
      const name = attr.name, namespaceURI = attr.namespaceURI, attrValue = attr.value;
      const lcName = transformCaseFunc(name);
      const initValue = attrValue;
      let value = name === "value" ? initValue : stringTrim(initValue);
      let recreatedNamedProp = false;
      hookEvent.attrName = lcName;
      hookEvent.attrValue = value;
      hookEvent.keepAttr = true;
      hookEvent.forceKeepAttr = void 0;
      _executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
      value = hookEvent.attrValue;
      if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name") && stringIndexOf(value, SANITIZE_NAMED_PROPS_PREFIX) !== 0) {
        _removeAttribute(name, currentNode, attr);
        value = SANITIZE_NAMED_PROPS_PREFIX + value;
        recreatedNamedProp = true;
      }
      if (_isUnsafeAttributeValue(name, value)) {
        _removeAttribute(name, currentNode, attr);
        continue;
      }
      if (hookEvent.forceKeepAttr) continue;
      if (!hookEvent.keepAttr) {
        _removeAttribute(name, currentNode, attr);
        continue;
      }
      if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(SELF_CLOSING_TAG, value)) {
        _removeAttribute(name, currentNode, attr);
        continue;
      }
      if (SAFE_FOR_TEMPLATES) value = _stripTemplateExpressions(value);
      if (!_isValidAttribute(lcTag, lcName, value)) {
        _removeAttribute(name, currentNode, attr);
        continue;
      }
      value = _applyTrustedTypesToAttribute(lcTag, lcName, namespaceURI, value);
      if (value !== initValue) {
        if (_setAttributeValue(currentNode, name, namespaceURI, value) && recreatedNamedProp) arrayPop(DOMPurify.removed);
      }
    }
    _executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
    _handleHookDetachedNode(currentNode, root);
  };
  const _sanitizeShadowDOM2 = function _sanitizeShadowDOM(fragment) {
    let shadowNode = null;
    const shadowIterator = _createNodeIterator(fragment);
    _executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
    while (shadowNode = shadowIterator.nextNode()) {
      _executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
      _sanitizeElements(shadowNode, fragment);
      _sanitizeAttributes(shadowNode, fragment);
      if (_isDocumentFragment(shadowNode.content)) _sanitizeShadowDOM2(shadowNode.content);
      if (_readNodeType(shadowNode) === NODE_TYPE.element) {
        const innerSr = getShadowRoot(shadowNode);
        if (_isDocumentFragment(innerSr)) {
          _sanitizeAttachedShadowRoots(innerSr);
          _sanitizeShadowDOM2(innerSr);
        }
      }
    }
    if (SAFE_FOR_TEMPLATES) _scrubOwnCharacterData(fragment);
    _executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
  };
  const _sanitizeAttachedShadowRoots = function _sanitizeAttachedShadowRoots2(root) {
    const stack = [{
      node: root,
      shadow: null
    }];
    while (stack.length > 0) {
      const item = stack.pop();
      if (item.shadow) {
        _sanitizeShadowDOM2(item.shadow);
        continue;
      }
      const node2 = item.node;
      const isElement = _readNodeType(node2) === NODE_TYPE.element;
      const childNodes = getChildNodes(node2);
      if (childNodes) for (let i = childNodes.length - 1; i >= 0; --i) stack.push({
        node: childNodes[i],
        shadow: null
      });
      if (isElement) {
        const rootName = getNodeName ? getNodeName(node2) : null;
        if (typeof rootName === "string" && transformCaseFunc(rootName) === "template") {
          const content = node2.content;
          if (_isDocumentFragment(content)) stack.push({
            node: content,
            shadow: null
          });
        }
      }
      if (isElement) {
        const sr = getShadowRoot(node2);
        if (_isDocumentFragment(sr)) stack.push({
          node: null,
          shadow: sr
        }, {
          node: sr,
          shadow: null
        });
      }
    }
  };
  DOMPurify.sanitize = function(dirty) {
    let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let body = null;
    let importedNode = null;
    let currentNode = null;
    let returnNode = null;
    IS_EMPTY_INPUT = !dirty;
    if (IS_EMPTY_INPUT) dirty = "<!-->";
    if (typeof dirty !== "string" && !_isNode(dirty)) {
      dirty = stringifyValue(dirty);
      if (typeof dirty !== "string") throw typeErrorCreate("dirty is not a string, aborting");
    }
    if (!DOMPurify.isSupported) return dirty;
    if (SET_CONFIG) {
      ALLOWED_TAGS2 = SET_CONFIG_ALLOWED_TAGS;
      ALLOWED_ATTR2 = SET_CONFIG_ALLOWED_ATTR;
    } else _parseConfig(cfg);
    if (hooks.uponSanitizeElement.length > 0 || hooks.uponSanitizeAttribute.length > 0) ALLOWED_TAGS2 = clone(ALLOWED_TAGS2);
    if (hooks.uponSanitizeAttribute.length > 0) ALLOWED_ATTR2 = clone(ALLOWED_ATTR2);
    DOMPurify.removed = [];
    const inPlace = IN_PLACE && typeof dirty !== "string" && _isNode(dirty);
    let inPlaceNodes = [];
    const outerVisited = IN_PLACE_VISITED;
    if (inPlace) {
      _neutralizePatchLinkage(dirty);
      const nn = _readNodeName(dirty);
      if (typeof nn === "string") {
        const tagName = transformCaseFunc(nn);
        if (!ALLOWED_TAGS2[tagName] || FORBID_TAGS[tagName]) {
          _neutralizeRoot(dirty);
          throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
        }
      }
      if (_isClobbered(dirty)) {
        _neutralizeRoot(dirty);
        throw typeErrorCreate("root node is clobbered and cannot be sanitized in-place");
      }
      inPlaceNodes = _collectLiveNodes(dirty);
      IN_PLACE_VISITED = setCreate();
    } else if (_isNode(dirty)) {
      body = _initDocument("<!---->");
      importedNode = body.ownerDocument.importNode(dirty, true);
      if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === "BODY") body = importedNode;
      else if (importedNode.nodeName === "HTML") body = importedNode;
      else body.appendChild(importedNode);
      _sanitizeAttachedShadowRoots(body);
    } else {
      if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && dirty.indexOf("<") === -1) return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? _createTrustedHTML(dirty) : dirty;
      body = _initDocument(dirty);
      if (!body) return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
    }
    if (body && FORCE_BODY) _forceRemove(body.firstChild);
    const walkRoot = inPlace ? dirty : body;
    try {
      if (inPlace) _sanitizeAttachedShadowRoots(dirty);
      const nodeIterator = _createNodeIterator(walkRoot);
      while (currentNode = nodeIterator.nextNode()) {
        _sanitizeElements(currentNode, walkRoot);
        _sanitizeAttributes(currentNode, walkRoot);
        if (_isDocumentFragment(currentNode.content)) _sanitizeShadowDOM2(currentNode.content);
      }
      if (inPlace) _sanitizeUnvisitedNodes(dirty, inPlaceNodes);
    } catch (error) {
      if (inPlace) {
        _neutralizeRoot(dirty);
        _neutralizeDiscarded(dirty, inPlaceNodes);
      }
      throw error;
    } finally {
      IN_PLACE_VISITED = outerVisited;
    }
    if (inPlace) {
      if (_neutralizeDiscarded(dirty, inPlaceNodes)) throw typeErrorCreate("a node selected for removal could not be safely returned; refusing to sanitize in place");
      if (SAFE_FOR_TEMPLATES) _scrubTemplateExpressions2(dirty);
      return dirty;
    }
    if (RETURN_DOM) {
      if (SAFE_FOR_TEMPLATES) _scrubTemplateExpressions2(body);
      if (RETURN_DOM_FRAGMENT) {
        returnNode = createDocumentFragment.call(body.ownerDocument);
        while (body.firstChild) returnNode.appendChild(body.firstChild);
      } else returnNode = body;
      if (ALLOWED_ATTR2.shadowroot || ALLOWED_ATTR2.shadowrootmode) returnNode = importNode.call(originalDocument, returnNode, true);
      return returnNode;
    }
    let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
    if (WHOLE_DOCUMENT && ALLOWED_TAGS2["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
    if (SAFE_FOR_TEMPLATES) serializedHTML = _stripTemplateExpressions(serializedHTML);
    return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? _createTrustedHTML(serializedHTML) : serializedHTML;
  };
  DOMPurify.setConfig = function() {
    let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _parseConfig(cfg);
    SET_CONFIG = true;
    SET_CONFIG_ALLOWED_TAGS = ALLOWED_TAGS2;
    SET_CONFIG_ALLOWED_ATTR = ALLOWED_ATTR2;
  };
  DOMPurify.clearConfig = function() {
    CONFIG = null;
    SET_CONFIG = false;
    SET_CONFIG_ALLOWED_TAGS = null;
    SET_CONFIG_ALLOWED_ATTR = null;
    trustedTypesPolicy = defaultTrustedTypesPolicy;
    emptyHTML = "";
  };
  DOMPurify.isValidAttribute = function(tag, attr, value) {
    if (!CONFIG) _parseConfig({});
    const lcTag = transformCaseFunc(tag);
    const lcName = transformCaseFunc(attr);
    if (typeof value === "string" && (_isUnsafeAttributeValue(attr, value) || !ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(SELF_CLOSING_TAG, value))) return false;
    return _isValidAttribute(lcTag, lcName, value);
  };
  DOMPurify.addHook = function(entryPoint, hookFunction) {
    if (typeof hookFunction !== "function") return;
    if (!objectHasOwnProperty(hooks, entryPoint)) return;
    arrayPush(hooks[entryPoint], hookFunction);
  };
  DOMPurify.removeHook = function(entryPoint, hookFunction) {
    if (!objectHasOwnProperty(hooks, entryPoint)) return;
    if (hookFunction !== void 0) {
      const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
      return index === -1 ? void 0 : arraySplice(hooks[entryPoint], index, 1)[0];
    }
    return arrayPop(hooks[entryPoint]);
  };
  DOMPurify.removeHooks = function(entryPoint) {
    if (!objectHasOwnProperty(hooks, entryPoint)) return;
    hooks[entryPoint] = [];
  };
  DOMPurify.removeAllHooks = function() {
    hooks = _createHooksMap();
  };
  return DOMPurify;
}
var purify_default = createDOMPurify();
function B() {
  return { async: false, breaks: false, extensions: null, gfm: true, hooks: null, pedantic: false, renderer: null, silent: false, tokenizer: null, walkTokens: null };
}
var y = B();
function V(a3) {
  y = a3;
}
var M = { exec: () => null };
function D(a3) {
  let e = [];
  return (t) => {
    let n = Math.max(0, Math.min(3, t - 1)), i = e[n];
    return i || (i = a3(n), e[n] = i), i;
  };
}
function h(a3, e = "") {
  let t = typeof a3 == "string" ? a3 : a3.source, n = { replace: (i, r) => {
    let o = typeof r == "string" ? r : r.source;
    return o = o.replace(x.caret, "$1"), t = t.replace(i, o), n;
  }, getRegex: () => new RegExp(t, e) };
  return n;
}
var ze = ((a3 = "") => {
  try {
    return !!new RegExp("(?<=1)(?<!1)" + a3);
  } catch {
    return false;
  }
})(), x = { codeRemoveIndent: /^(?: {0,3}\t| {1,4})/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, endingSpaceTabChar: /[ \t]$/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, leadingSpaceTab: /^[ \t]+/, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, numericCharacterReference: /&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));/, numericCharacterReferenceOrAmpersand: /&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (a3) => new RegExp(`^( {0,3}${a3})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: D((a3) => new RegExp(`^ {0,${a3}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)), hrRegex: D((a3) => new RegExp(`^ {0,${a3}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)), fencesBeginRegex: D((a3) => new RegExp(`^ {0,${a3}}(?:\`\`\`|~~~)`)), headingBeginRegex: D((a3) => new RegExp(`^ {0,${a3}}#`)), htmlBeginRegex: D((a3) => new RegExp(`^ {0,${a3}}(?:</?(?:${Q})(?: +|$|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`, "i")), blockquoteBeginRegex: D((a3) => new RegExp(`^ {0,${a3}}>`)) }, Ee = /^(?:[ \t]*(?:\n|$))+/, Me = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Ce = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, N = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Ie = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, Y = / {0,3}(?:[*+-]|\d{1,9}[.)])/, fe = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |fences|blockquote|heading|hr|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, me = h(fe).replace(/bull/g, Y).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Be = h(fe).replace(/bull/g, Y).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), ee = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/, De = /^[^\n]+/, te = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, qe = h(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", te).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Ze = h(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, Y).getRegex(), Q = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", ne = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, ve = h("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!(?:script|pre|style|textarea)(?![a-z0-9-]))([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", ne).replace("tag", Q).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), xe = (a3) => h(ee).replace("hr", N).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", a3).replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", Q).getRegex(), He = xe(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/), Ge = xe(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/), Ne = h(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Ge).getRegex(), re = { blockquote: Ne, code: Me, def: qe, fences: Ce, heading: Ie, hr: N, html: ve, lheading: me, list: Ze, newline: Ee, paragraph: He, table: M, text: De }, de = h("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", N).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", Q).getRegex(), Qe = { ...re, lheading: Be, table: de, paragraph: h(ee).replace("hr", N).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", de).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", Q).getRegex() }, je = { ...re, html: h(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", ne).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: M, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: h(ee).replace("hr", N).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", me).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, Fe = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Ue = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, be = /^( {2,}|\\)\n(?!\s*$)[ \t]*/, Ke = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, S = /[\p{P}\p{S}]/u, q = /[\s\p{P}\p{S}]/u, j = /[^\s\p{P}\p{S}]/u, Xe = h(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, q).getRegex(), We = /[\p{Pi}\p{Ps}"']/u, Re = /(?!~)[\p{P}\p{S}]/u, Ve = /(?!~)[\s\p{P}\p{S}]/u, Je = /(?:[^\s\p{P}\p{S}]|~)/u, Ye = h(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", ze ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), Te = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/, et = h(Te, "u").replace(/punct/g, S).getRegex(), tt = h(Te, "u").replace(/punct/g, Re).getRegex(), nt = /^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/, rt = h(nt, "u").replace(/openQuote/g, We).replace(/punct/g, S).getRegex(), Oe = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", st = h(Oe, "gu").replace(/notPunctSpace/g, j).replace(/punctSpace/g, q).replace(/punct/g, S).getRegex(), it = h(Oe, "gu").replace(/notPunctSpace/g, Je).replace(/punctSpace/g, Ve).replace(/punct/g, Re).getRegex(), ot = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)", at = h(ot, "gu").replace(/notPunctSpace/g, j).replace(/punctSpace/g, q).replace(/punct/g, S).getRegex(), lt = h("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, j).replace(/punctSpace/g, q).replace(/punct/g, S).getRegex(), ut = "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)", pt = h(ut, "gu").replace(/notPunctSpace/g, j).replace(/punctSpace/g, q).replace(/punct/g, S).getRegex(), ct = h(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, S).getRegex(), ht = "^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", dt = h(ht, "gu").replace(/notPunctSpace/g, j).replace(/punctSpace/g, q).replace(/punct/g, S).getRegex(), kt = h(/\\(punct)/, "gu").replace(/punct/g, S).getRegex(), gt = h(/(`+)(?:[^`]|[^`][\s\S]*?[^`])\1(?!`)|`+|\\(punct)/, "gu").replace(/punct/g, S).getRegex(), ft = h(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), mt = h(ne).replace("(?:-->|$)", "-->").getRegex(), xt = h("^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", mt).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), we = /\[(?:\\[\s\S]|[^\[\]\\])*\]/, K = h(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace("brackets", we).getRegex(), bt = h(/^!?\[(label)\]\([ \t\n]*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?[ \t\n]*\)/).replace("label", K).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Rt = h(/^!?\[(label)\]\[(ref)\]/).replace("label", K).replace("ref", te).getRegex(), Tt = h(/^!?\[(ref)\](?:\[\])?/).replace("ref", te).getRegex(), ke = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/, Ot = h(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace("brackets", we).getRegex(), wt = h("reflink|nolink(?!\\()", "g").replace("reflink", h(/^!?\[(label)\]\[(ref)\]/).replace("label", Ot).replace("ref", ke).getRegex()).replace("nolink", h(/^!?\[(ref)\](?:\[\])?/).replace("ref", ke).getRegex()).getRegex(), ge = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, Pt = /[A-Za-z0-9._+-]+@[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/, yt = h(/(?:mailto:email|xmpp:email(?:\/[A-Za-z0-9@.]+)?)/).replace(/email/g, Pt).getRegex(), se = { _backpedal: M, anyPunctuation: kt, anyPunctuationOutsideCode: gt, autolink: ft, blockSkip: Ye, br: be, code: Ue, del: M, delLDelim: M, delRDelim: M, emStrongLDelim: et, emStrongRDelimAst: st, emStrongRDelimUnd: lt, escape: Fe, link: bt, nolink: Tt, punctuation: Xe, reflink: Rt, reflinkSearch: wt, tag: xt, text: Ke, url: M }, St = { ...se, emStrongLDelim: rt, emStrongRDelimAst: at, emStrongRDelimUnd: pt, link: h(/^!?\[(label)\]\((.*?)\)/).replace("label", K).getRegex(), reflink: h(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", K).getRegex() }, J = { ...se, emStrongRDelimAst: it, emStrongLDelim: tt, delLDelim: ct, delRDelim: dt, url: h(/^emailProtocol|^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("emailProtocol", yt).replace("protocol", ge).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: h(/^(?:[^a-zA-Z0-9](?=emailProtocol)|(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9](?=emailProtocol)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))))/).replace("protocol", ge).replace(/emailProtocol/g, /(?:mailto|xmpp):/).getRegex() }, _t = { ...J, br: h(be).replace("{2,}", "*").getRegex(), text: h(J.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, F = { normal: re, gfm: Qe, pedantic: je }, Z = { normal: se, gfm: J, breaks: _t, pedantic: St };
var $t = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, Pe = (a3) => $t[a3];
function w(a3, e) {
  if (e) {
    if (x.escapeTest.test(a3)) return a3.replace(x.escapeReplace, Pe);
  } else if (x.escapeTestNoEncode.test(a3)) return a3.replace(x.escapeReplaceNoEncode, Pe);
  return a3;
}
function ye(a3) {
  return x.numericCharacterReference.test(a3) ? a3.replace(x.numericCharacterReferenceOrAmpersand, (e, t, n) => {
    if (t === void 0 && n === void 0) return "&amp;";
    let i = t === void 0 ? Number.parseInt(n, 16) : Number.parseInt(t, 10);
    return i === 0 || i > 1114111 || i >= 55296 && i <= 57343 ? "�" : i === 38 ? "&amp;" : String.fromCodePoint(i);
  }) : a3;
}
function ie(a3) {
  try {
    a3 = encodeURI(a3).replace(x.percentDecode, "%");
  } catch {
    return null;
  }
  return a3;
}
function oe(a3, e) {
  let t = a3.replace(x.findPipe, (r, o, s) => {
    let l = false, u = o;
    for (; --u >= 0 && s[u] === "\\"; ) l = !l;
    return l ? "|" : " |";
  }), n = t.split(x.splitPipe), i = 0;
  if (n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), e) if (n.length > e) n.splice(e);
  else for (; n.length < e; ) n.push("");
  for (; i < n.length; i++) n[i] = n[i].trim().replace(x.slashPipe, "|");
  return n;
}
function A(a3, e, t) {
  let n = a3.length;
  if (n === 0) return "";
  let i = 0;
  for (; i < n; ) {
    let r = a3.charAt(n - i - 1);
    if (r === e && true) i++;
    else break;
  }
  return a3.slice(0, n - i);
}
function ae(a3) {
  let e = a3.split(`
`), t = e.length - 1;
  for (; t >= 0 && x.blankLine.test(e[t]); ) t--;
  return e.length - t <= 2 ? a3 : e.slice(0, t + 1).join(`
`);
}
function v(a3) {
  return a3.trim().toLowerCase().toUpperCase().toLowerCase();
}
function le(a3, e) {
  if (a3.indexOf(e[0]) === -1 && a3.indexOf(e[1]) === -1) return -1;
  let t = 0;
  for (let n = 0; n < a3.length; n++) if (a3[n] === "\\") n++;
  else if (a3[n] === e[0]) t++;
  else if (a3[n] === e[1] && (t--, t < 0)) return n;
  return t > 0 ? -2 : -1;
}
function X(a3, e = 0) {
  let t = e, n = "";
  for (let i of a3) if (i === "	") {
    let r = 4 - t % 4;
    n += " ".repeat(r), t += r;
  } else n += i, t++;
  return n;
}
function Se(a3, e, t, n, i) {
  let r = e.href, o = e.title || null, s = a3[1].replace(i.other.outputLinkReplace, "$1"), l = a3[0].charAt(0) === "!", u = n.state.inLink, c = n.state.linkEmitted, p = n.state.inRawBlock;
  n.state.inLink = true, n.state.linkEmitted = false;
  let d = n.inlineTokens(s), g = n.state.linkEmitted;
  if (n.state.linkEmitted = c, n.state.inLink = u, !l) {
    if (g) {
      n.state.inRawBlock = p;
      return;
    }
    n.state.linkEmitted = true;
  }
  return { type: l ? "image" : "link", raw: t, href: r, title: o, text: s, tokens: d };
}
function Lt(a3, e, t) {
  let n = a3.match(t.other.indentCodeCompensation);
  if (n === null) return e;
  let i = n[1];
  return e.split(`
`).map((r) => {
    let o = r.match(t.other.beginningSpace);
    if (o === null) return r;
    let [s] = o;
    return r.slice(Math.min(s.length, i.length));
  }).join(`
`);
}
function _e(a3, e, t, n) {
  if (!e.includes("<")) return false;
  for (let i = 0; i < e.length; i++) {
    if (e[i] === "\\") {
      i++;
      continue;
    }
    if (e[i] === "`") {
      let s = n.inline.code.exec(e.slice(i));
      if (s) {
        i += s[0].length - 1;
        continue;
      }
    }
    if (e[i] !== "<") continue;
    let r = a3.slice(t + i), o = n.inline.tag.exec(r) || n.inline.autolink.exec(r);
    if (o) {
      if (o[0].length > e.length - i) return true;
      i += o[0].length - 1;
    }
  }
  return false;
}
var _ = class {
  options;
  rules;
  lexer;
  constructor(e) {
    this.options = e || y;
  }
  space(e) {
    let t = this.rules.block.newline.exec(e);
    if (t && t[0].length > 0) return { type: "space", raw: t[0] };
  }
  code(e) {
    let t = this.rules.block.code.exec(e);
    if (t) {
      let n = this.options.pedantic ? t[0] : ae(t[0]), i = n.replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: n, codeBlockStyle: "indented", text: i };
    }
  }
  fences(e) {
    let t = this.rules.block.fences.exec(e);
    if (t) {
      let n = t[0], i = Lt(n, t[3] || "", this.rules);
      return { type: "code", raw: n, lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2], text: i };
    }
  }
  heading(e) {
    let t = this.rules.block.heading.exec(e);
    if (t) {
      let n = t[2].trim();
      if (this.rules.other.endingHash.test(n)) {
        let i = A(n, "#");
        (this.options.pedantic || !i || this.rules.other.endingSpaceTabChar.test(i)) && (n = i.trim());
      }
      return { type: "heading", raw: A(t[0], `
`), depth: t[1].length, text: n, tokens: this.lexer.inline(n) };
    }
  }
  hr(e) {
    let t = this.rules.block.hr.exec(e);
    if (t) return { type: "hr", raw: A(t[0], `
`) };
  }
  blockquote(e) {
    let t = this.rules.block.blockquote.exec(e);
    if (t) {
      let n = A(t[0], `
`).split(`
`), i = "", r = "", o = [];
      for (; n.length > 0; ) {
        let s = false, l = [], u;
        for (u = 0; u < n.length; u++) if (this.rules.other.blockquoteStart.test(n[u])) l.push(n[u]), s = true;
        else if (!s) l.push(n[u]);
        else break;
        n = n.slice(u);
        let c = l.join(`
`), p = c.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        i = i ? `${i}
${c}` : c, r = r ? `${r}
${p}` : p;
        let d = this.lexer.state.top;
        if (this.lexer.state.top = true, this.lexer.blockTokens(p, o, true), this.lexer.state.top = d, n.length === 0) break;
        let g = o.at(-1);
        if (g?.type === "code" || g?.type === "heading" || g?.type === "hr" || g?.type === "html") break;
        if (g?.type === "blockquote") {
          let k = g, P = n.join(`
`), R = k.raw + `
` + P.replace(this.rules.other.blockquoteSetextReplace2, ""), m = this.blockquote(R);
          o[o.length - 1] = m;
          let E = R.substring(m.raw.length).replace(/^\n/, ""), b = E ? E.split(`
`).length : 0, H = b ? n.slice(0, -b) : n;
          H.length > 0 && (i = `${i}
${H.join(`
`)}`), r = r.substring(0, r.length - k.text.length) + m.text;
          break;
        } else if (g?.type === "list") {
          let k = g, P = k.raw + `
` + n.join(`
`), R = this.list(P);
          o[o.length - 1] = R, i = i.substring(0, i.length - g.raw.length) + R.raw, r = r.substring(0, r.length - k.raw.length) + R.raw, n = P.substring(o.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: i, tokens: o, text: r };
    }
  }
  list(e) {
    let t = this.rules.block.list.exec(e);
    if (t) {
      let n = e, i = () => n.length - e.length, r = t[1].trim(), o = r.length > 1, s = { type: "list", raw: "", ordered: o, start: o ? +r.slice(0, -1) : "", loose: false, items: [] };
      r = o ? `\\d{1,9}\\${r.slice(-1)}` : `\\${r}`, this.options.pedantic && (r = o ? r : "[*+-]");
      let l = this.rules.other.listItemRegex(r), u = false;
      for (; e; ) {
        let p = false, d = "";
        if (!(t = l.exec(e)) || this.rules.block.hr.test(e)) break;
        let g = i();
        e = e.substring(t[0].length);
        let k = t[2].split(`
`, 1)[0], P = t[1].length, R = this.options.pedantic ? X(k, P) : k.replace(this.rules.other.leadingSpaceTab, (W) => X(W, P)), m = e.split(`
`, 1)[0], E = !R.trim(), b = 0;
        if (this.options.pedantic ? (b = 2, d = R.trimStart()) : E ? b = P + 1 : (b = R.search(this.rules.other.nonSpaceChar), b = b > 4 ? 1 : b, d = R.slice(b), b += P), E && this.rules.other.blankLine.test(m) && (e = e.substring(m.length + 1), p = true), !p) {
          let W = this.rules.other.nextBulletRegex(b), ue = this.rules.other.hrRegex(b), pe = this.rules.other.fencesBeginRegex(b), ce = this.rules.other.headingBeginRegex(b), $e = this.rules.other.htmlBeginRegex(b), Le = this.rules.other.blockquoteBeginRegex(b);
          for (; e; ) {
            let he = e.split(`
`, 1)[0], G;
            if (m = he, this.options.pedantic ? (m = m.replace(this.rules.other.listReplaceNesting, "  "), G = m) : G = m.replace(this.rules.other.leadingSpaceTab, (Ae) => X(Ae)), pe.test(m) || ce.test(m) || $e.test(m) || Le.test(m) || W.test(m) || ue.test(m)) break;
            if (G.search(this.rules.other.nonSpaceChar) >= b || !m.trim()) d += `
` + G.slice(b);
            else {
              if (E || R.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || pe.test(R) || ce.test(R) || ue.test(R)) break;
              d += `
` + m;
            }
            E = !m.trim(), e = e.substring(he.length + 1), R = G.slice(b);
          }
        }
        let H = n.slice(g, i());
        s.loose || (u ? s.loose = true : this.rules.other.doubleBlankLine.test(H) && (u = true)), s.items.push({ type: "list_item", raw: H, task: !!this.options.gfm && this.rules.other.listIsTask.test(d), loose: false, text: d, tokens: [] });
      }
      let c = s.items.at(-1);
      if (c) c.raw = c.raw.trimEnd(), c.text = c.text.trimEnd();
      else return;
      s.raw = n.slice(0, i()).trimEnd();
      for (let p of s.items) if (this.lexer.state.top = false, p.tokens = this.lexer.blockTokens(p.text, []), !s.loose) {
        let d = p.tokens.filter((k) => k.type === "space"), g = d.length > 0 && d.some((k) => this.rules.other.anyLine.test(k.raw));
        s.loose = g;
      }
      for (let p of s.items) {
        let d = p.tokens[0];
        if (p.task && (d?.type === "text" || d?.type === "paragraph")) {
          p.text = p.text.replace(this.rules.other.listReplaceTask, ""), d.raw = d.raw.replace(this.rules.other.listReplaceTask, ""), d.text = d.text.replace(this.rules.other.listReplaceTask, "");
          for (let k = this.lexer.inlineQueue.length - 1; k >= 0; k--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[k].src)) {
            this.lexer.inlineQueue[k].src = this.lexer.inlineQueue[k].src.replace(this.rules.other.listReplaceTask, "");
            break;
          }
          let g = this.rules.other.listTaskCheckbox.exec(p.raw);
          if (g) {
            let k = { type: "checkbox", raw: g[0] + " ", checked: g[0] !== "[ ]" };
            p.checked = k.checked, s.loose ? p.tokens[0] && ["paragraph", "text"].includes(p.tokens[0].type) && "tokens" in p.tokens[0] && p.tokens[0].tokens ? (p.tokens[0].raw = k.raw + p.tokens[0].raw, p.tokens[0].text = k.raw + p.tokens[0].text, p.tokens[0].tokens.unshift(k)) : p.tokens.unshift({ type: "paragraph", raw: k.raw, text: k.raw, tokens: [k] }) : p.tokens.unshift(k);
          }
        } else p.task && (p.task = false);
      }
      if (s.loose) for (let p of s.items) {
        p.loose = true;
        for (let d of p.tokens) d.type === "text" && (d.type = "paragraph");
      }
      return s;
    }
  }
  html(e) {
    let t = this.rules.block.html.exec(e);
    if (t) {
      let n = ae(t[0]);
      return { type: "html", block: true, raw: n, pre: t[1] === "pre" || t[1] === "script" || t[1] === "style", text: n };
    }
  }
  def(e) {
    let t = this.rules.block.def.exec(e);
    if (t) {
      if (!this.rules.other.startAngleBracket.test(t[2]) && le(t[2], "()") !== -1) return;
      let n = v(t[1]).replace(this.rules.other.multipleSpaceGlobal, " "), i = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
      return { type: "def", tag: n, raw: A(t[0], `
`), href: i, title: r };
    }
  }
  table(e) {
    let t = this.rules.block.table.exec(e);
    if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
    let n = oe(t[1]), i = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), r = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], o = { type: "table", raw: A(t[0], `
`), header: [], align: [], rows: [] };
    if (n.length === i.length) {
      for (let s of i) this.rules.other.tableAlignRight.test(s) ? o.align.push("right") : this.rules.other.tableAlignCenter.test(s) ? o.align.push("center") : this.rules.other.tableAlignLeft.test(s) ? o.align.push("left") : o.align.push(null);
      for (let s = 0; s < n.length; s++) o.header.push({ text: n[s], tokens: this.lexer.inline(n[s]), header: true, align: o.align[s] });
      for (let s of r) o.rows.push(oe(s, o.header.length).map((l, u) => ({ text: l, tokens: this.lexer.inline(l), header: false, align: o.align[u] })));
      return o;
    }
  }
  lheading(e) {
    let t = this.rules.block.lheading.exec(e);
    if (t) {
      let n = t[1].trim();
      return { type: "heading", raw: A(t[0], `
`), depth: t[2].charAt(0) === "=" ? 1 : 2, text: n, tokens: this.lexer.inline(n) };
    }
  }
  paragraph(e) {
    let t = this.rules.block.paragraph.exec(e);
    if (t) {
      let n = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
      return { type: "paragraph", raw: t[0], text: n, tokens: this.lexer.inline(n) };
    }
  }
  text(e) {
    let t = this.rules.block.text.exec(e);
    if (t) return { type: "text", raw: t[0], text: t[0], tokens: this.lexer.inline(t[0]) };
  }
  escape(e) {
    let t = this.rules.inline.escape.exec(e);
    if (t) return { type: "escape", raw: t[0], text: t[1] };
  }
  tag(e) {
    let t = this.rules.inline.tag.exec(e);
    if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = true : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = false), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = true : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = false), { type: "html", raw: t[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: false, text: t[0] };
  }
  link(e) {
    if (this.lexer.state.linkParenPossible === false) return;
    let t = this.rules.inline.link.exec(e);
    if (t) {
      let n = t[0].charAt(0) === "!" ? 2 : 1;
      if (!this.options.pedantic && _e(e, t[1], n, this.rules)) return;
      let i = t[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(i)) {
        if (!this.rules.other.endAngleBracket.test(i)) return;
        let s = A(i.slice(0, -1), "\\");
        if ((i.length - s.length) % 2 === 0) return;
      } else {
        let s = le(t[2], "()");
        if (s === -2) return;
        if (s > -1) {
          let u = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + s;
          t[2] = t[2].substring(0, s), t[0] = t[0].substring(0, u).trim(), t[3] = "";
        }
      }
      let r = t[2], o = "";
      if (this.options.pedantic) {
        let s = this.rules.other.pedanticHrefTitle.exec(r);
        s && (r = s[1], o = s[3]);
      } else o = t[3] ? t[3].slice(1, -1) : "";
      return r = r.trim(), this.rules.other.startAngleBracket.test(r) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(i) ? r = r.slice(1) : r = r.slice(1, -1)), Se(t, { href: r && r.replace(this.rules.inline.anyPunctuation, "$1"), title: o && o.replace(this.rules.inline.anyPunctuation, "$1") }, t[0], this.lexer, this.rules);
    }
  }
  reflink(e, t) {
    let n;
    if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
      let i = n[0].charAt(0) === "!" ? 2 : 1;
      if (!this.options.pedantic && _e(e, n[1], i, this.rules)) return;
      let r = (n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "), o = t[v(r)];
      if (!o) {
        let s = n[0].charAt(0);
        return { type: "text", raw: s, text: s };
      }
      return Se(n, o, n[0], this.lexer, this.rules);
    }
  }
  emStrong(e, t, n = "") {
    let i = this.rules.inline.emStrongLDelim.exec(e);
    if (!i || !i[1] && !i[2] && !i[3] && !i[4] || i[4] && n.match(this.rules.other.unicodeAlphaNumeric)) return;
    if (!(i[1] || i[3] || "") || !n || this.rules.inline.punctuation.exec(n)) {
      let o = [...i[0]].length - 1, s, l, u = o, c = 0, p = i[0][0], d = n === p, g = p === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (g.lastIndex = 0, t = t.slice(-1 * e.length + o); (i = g.exec(t)) !== null; ) {
        if (s = i[1] || i[2] || i[3] || i[4] || i[5] || i[6], !s) continue;
        if (l = [...s].length, i[3] || i[4]) {
          u += l;
          continue;
        } else if (i[5] || i[6]) {
          if (o % 3 && !((o + l) % 3)) {
            c += l;
            continue;
          }
          if (d) break;
        }
        if (u -= l, u > 0) continue;
        l = Math.min(l, l + u + c);
        let k = [...i[0]][0].length, P = e.slice(0, o + i.index + k + l);
        if (Math.min(o, l) % 2) {
          let m = P.slice(1, -1);
          return { type: "em", raw: P, text: m, tokens: this.lexer.inlineTokens(m) };
        }
        let R = P.slice(2, -2);
        return { type: "strong", raw: P, text: R, tokens: this.lexer.inlineTokens(R) };
      }
    }
  }
  codespan(e) {
    let t = this.rules.inline.code.exec(e);
    if (t) {
      let n = t[2].replace(this.rules.other.newLineCharGlobal, " "), i = this.rules.other.nonSpaceChar.test(n), r = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
      return i && r && (n = n.substring(1, n.length - 1)), { type: "codespan", raw: t[0], text: n };
    }
  }
  br(e) {
    let t = this.rules.inline.br.exec(e);
    if (t) return { type: "br", raw: t[0] };
  }
  del(e, t, n = "") {
    let i = this.rules.inline.delLDelim.exec(e);
    if (!i) return;
    if (!(i[1] || "") || !n || this.rules.inline.punctuation.exec(n)) {
      let o = [...i[0]].length - 1, s, l, u = o, c = this.rules.inline.delRDelim;
      for (c.lastIndex = 0, t = t.slice(-1 * e.length + o); (i = c.exec(t)) !== null; ) {
        if (s = i[1] || i[2] || i[3] || i[4] || i[5] || i[6], !s || (l = [...s].length, l !== o)) continue;
        if (i[3] || i[4]) {
          u += l;
          continue;
        }
        if (u -= l, u > 0) continue;
        l = Math.min(l, l + u);
        let p = [...i[0]][0].length, d = e.slice(0, o + i.index + p + l), g = d.slice(o, -o);
        return { type: "del", raw: d, text: g, tokens: this.lexer.inlineTokens(g) };
      }
    }
  }
  autolink(e) {
    let t = this.rules.inline.autolink.exec(e);
    if (t) {
      let n, i;
      return t[2] === "@" ? (n = t[1], i = "mailto:" + n) : (n = t[1], i = n), { type: "link", raw: t[0], text: n, href: i, autolink: true, tokens: [{ type: "text", raw: n, text: n }] };
    }
  }
  url(e) {
    let t;
    if (t = this.rules.inline.url.exec(e)) {
      let n, i;
      if (t[2] === "@") n = t[0], i = "mailto:" + n;
      else {
        let r;
        do
          r = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
        while (r !== t[0]);
        n = t[0], t[1] === "www." ? i = "http://" + t[0] : i = t[0];
      }
      return { type: "link", raw: t[0], text: n, href: i, autolink: true, tokens: [{ type: "text", raw: n, text: n }] };
    }
  }
  inlineText(e) {
    let t = this.rules.inline.text.exec(e);
    if (t) {
      let n = this.lexer.state.inRawBlock;
      return { type: "text", raw: t[0], text: n ? t[0] : ye(t[0]), escaped: n };
    }
  }
};
var T = class a {
  tokens;
  options;
  state;
  inlineQueue;
  tokenizer;
  constructor(e) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || y, this.options.tokenizer = this.options.tokenizer || new _(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: false, inRawBlock: false, linkEmitted: false, linkParenPossible: true, top: true };
    let t = { other: x, block: F.normal, inline: Z.normal };
    this.options.pedantic ? (t.block = F.pedantic, t.inline = Z.pedantic) : this.options.gfm && (t.block = F.gfm, this.options.breaks ? t.inline = Z.breaks : t.inline = Z.gfm), this.tokenizer.rules = t;
  }
  static get rules() {
    return { block: F, inline: Z };
  }
  static lex(e, t) {
    return new a(t).lex(e);
  }
  static lexInline(e, t) {
    return new a(t).inlineTokens(e);
  }
  lex(e) {
    e = e.replace(x.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let t = 0; t < this.inlineQueue.length; t++) {
      let n = this.inlineQueue[t];
      this.inlineTokens(n.src, n.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, t = [], n = false) {
    this.tokenizer.lexer = this, this.options.pedantic && (e = e.replace(x.tabCharGlobal, "    ").replace(x.spaceLine, ""));
    let i = 1 / 0;
    for (; e; ) {
      if (e.length < i) i = e.length;
      else {
        this.infiniteLoopError(e.charCodeAt(0));
        break;
      }
      let r;
      if (this.options.extensions?.block?.some((s) => (r = s.call({ lexer: this }, e, t)) ? (e = e.substring(r.raw.length), t.push(r), true) : false)) continue;
      if (r = this.tokenizer.space(e)) {
        e = e.substring(r.raw.length);
        let s = t.at(-1);
        r.raw.length === 1 && s !== void 0 ? s.raw += `
` : t.push(r);
        continue;
      }
      if (r = this.tokenizer.code(e)) {
        e = e.substring(r.raw.length);
        let s = t.at(-1);
        s?.type === "paragraph" || s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.text, this.inlineQueue.at(-1).src = s.text) : t.push(r);
        continue;
      }
      if (r = this.tokenizer.fences(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.heading(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.hr(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.blockquote(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.list(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.html(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.def(e)) {
        e = e.substring(r.raw.length);
        let s = t.at(-1);
        s?.type === "paragraph" || s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.raw, this.inlineQueue.at(-1).src = s.text) : this.tokens.links[r.tag] || (this.tokens.links[r.tag] = { href: r.href, title: r.title }, t.push(r));
        continue;
      }
      if (r = this.tokenizer.table(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.lheading(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      let o = e;
      if (this.options.extensions?.startBlock) {
        let s = 1 / 0, l = e.slice(1), u;
        this.options.extensions.startBlock.forEach((c) => {
          u = c.call({ lexer: this }, l), typeof u == "number" && u >= 0 && (s = Math.min(s, u));
        }), s < 1 / 0 && s >= 0 && (o = e.substring(0, s + 1));
      }
      if (this.state.top && (r = this.tokenizer.paragraph(o))) {
        let s = t.at(-1);
        n && s?.type === "paragraph" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : t.push(r), n = o.length !== e.length, e = e.substring(r.raw.length);
        continue;
      }
      if (r = this.tokenizer.text(e)) {
        e = e.substring(r.raw.length);
        let s = t.at(-1);
        s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : t.push(r);
        continue;
      }
      if (e) {
        this.infiniteLoopError(e.charCodeAt(0));
        break;
      }
    }
    return this.state.top = true, t;
  }
  inline(e, t = []) {
    return this.inlineQueue.push({ src: e, tokens: t }), t;
  }
  linkInText(e) {
    if (!e.includes("[")) return false;
    let t = this.tokenizer.rules.inline.link;
    for (let n of e.matchAll(this.tokenizer.rules.inline.blockSkip)) if (t.test(n[0]) && e.charAt(n.index - 1) !== "!") return true;
    for (let n of e.matchAll(this.tokenizer.rules.inline.reflinkSearch)) {
      let i = n[0], r = i.lastIndexOf("[");
      if (!(i.charAt(0) === "!" || !Object.hasOwn(this.tokens.links, v(i.slice(r + 1, -1)))) && !(r > 1 && this.linkInText(i.slice(1, r - 1)))) return true;
    }
    return false;
  }
  inlineTokens(e, t = []) {
    this.tokenizer.lexer = this;
    let n = this.state.linkParenPossible;
    this.state.linkParenPossible = n && e.includes(")");
    try {
      return this.#e(e, t);
    } finally {
      this.state.linkParenPossible = n;
    }
  }
  #e(e, t) {
    let n = e;
    if (this.tokens.links && e.includes("[")) {
      let s = this.tokenizer.rules.inline.reflinkSearch, l = (u) => {
        let c = u.lastIndexOf("[");
        if (!Object.hasOwn(this.tokens.links, v(u.slice(c + 1, -1)))) return u;
        if (c > 1 && u.charAt(0) !== "!") {
          let p = u.slice(1, c - 1);
          if (this.linkInText(p)) return "[" + p.replace(s, l) + "][" + "a".repeat(u.length - c - 2) + "]";
        }
        return "[" + "a".repeat(u.length - 2) + "]";
      };
      n = n.replace(s, l);
    }
    n = n.replace(this.tokenizer.rules.inline.anyPunctuationOutsideCode, (s, l, u) => u ? "+".repeat(s.length) : l ? l + s.slice(l.length, -l.length).replace(/`/g, "+") + l : s), n = n.replace(this.tokenizer.rules.inline.blockSkip, (s, l, u) => {
      let c = u ? u.length : 0;
      return s.slice(0, c) + "[" + "a".repeat(s.length - c - 2) + "]";
    }), n = this.options.hooks?.emStrongMask?.call({ lexer: this }, n) ?? n;
    let i = false, r = "", o = 1 / 0;
    for (; e; ) {
      if (e.length < o) o = e.length;
      else {
        this.infiniteLoopError(e.charCodeAt(0));
        break;
      }
      i || (r = ""), i = false;
      let s;
      if (this.options.extensions?.inline?.some((u) => (s = u.call({ lexer: this }, e, t)) ? (e = e.substring(s.raw.length), t.push(s), true) : false)) continue;
      if (s = this.tokenizer.escape(e)) {
        e = e.substring(s.raw.length), t.push(s);
        continue;
      }
      if (s = this.tokenizer.tag(e)) {
        e = e.substring(s.raw.length), t.push(s);
        continue;
      }
      if (s = this.tokenizer.link(e)) {
        e = e.substring(s.raw.length), t.push(s);
        continue;
      }
      if (s = this.tokenizer.reflink(e, this.tokens.links)) {
        e = e.substring(s.raw.length);
        let u = t.at(-1);
        s.type === "text" && u?.type === "text" ? (u.raw += s.raw, u.text += s.text) : t.push(s);
        continue;
      }
      if (s = this.tokenizer.emStrong(e, n, r)) {
        e = e.substring(s.raw.length), t.push(s);
        continue;
      }
      if (s = this.tokenizer.codespan(e)) {
        e = e.substring(s.raw.length), t.push(s);
        continue;
      }
      if (s = this.tokenizer.br(e)) {
        e = e.substring(s.raw.length), t.push(s);
        continue;
      }
      if (s = this.tokenizer.del(e, n, r)) {
        e = e.substring(s.raw.length), t.push(s);
        continue;
      }
      if (s = this.tokenizer.autolink(e)) {
        e = e.substring(s.raw.length), t.push(s);
        continue;
      }
      if (!this.state.inLink && (s = this.tokenizer.url(e))) {
        e = e.substring(s.raw.length), t.push(s);
        continue;
      }
      let l = e;
      if (this.options.extensions?.startInline) {
        let u = 1 / 0, c = e.slice(1), p;
        this.options.extensions.startInline.forEach((d) => {
          p = d.call({ lexer: this }, c), typeof p == "number" && p >= 0 && (u = Math.min(u, p));
        }), u < 1 / 0 && u >= 0 && (l = e.substring(0, u + 1));
      }
      if (s = this.tokenizer.inlineText(l)) {
        e = e.substring(s.raw.length), s.raw.slice(-1) !== "_" && (r = s.raw.slice(-1)), i = true;
        let u = t.at(-1);
        u?.type === "text" ? (u.raw += s.raw, u.text += s.text) : t.push(s);
        continue;
      }
      if (e) {
        this.infiniteLoopError(e.charCodeAt(0));
        break;
      }
    }
    return t;
  }
  infiniteLoopError(e) {
    let t = "Infinite loop on byte: " + e;
    if (this.options.silent) console.error(t);
    else throw new Error(t);
  }
};
var $ = class {
  options;
  parser;
  constructor(e) {
    this.options = e || y;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: t, escaped: n }) {
    let i = (t || "").match(x.notSpaceStart)?.[0], r = e ? e.replace(x.endingNewline, "") + `
` : "";
    return i ? '<pre><code class="language-' + w(i) + '">' + (n ? r : w(r, true)) + `</code></pre>
` : "<pre><code>" + (n ? r : w(r, true)) + `</code></pre>
`;
  }
  blockquote({ tokens: e }) {
    return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
  }
  html({ text: e }) {
    return e;
  }
  def(e) {
    return "";
  }
  heading({ tokens: e, depth: t }) {
    return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
  }
  hr(e) {
    return `<hr>
`;
  }
  list(e) {
    let t = e.ordered, n = e.start, i = "";
    for (let s = 0; s < e.items.length; s++) {
      let l = e.items[s];
      i += this.listitem(l);
    }
    let r = t ? "ol" : "ul", o = t && n !== 1 ? ' start="' + n + '"' : "";
    return "<" + r + o + `>
` + i + "</" + r + `>
`;
  }
  listitem(e) {
    return `<li>${this.parser.parse(e.tokens)}</li>
`;
  }
  checkbox({ checked: e }) {
    return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox"> ';
  }
  paragraph({ tokens: e }) {
    return `<p>${this.parser.parseInline(e)}</p>
`;
  }
  table(e) {
    let t = "", n = "";
    for (let r = 0; r < e.header.length; r++) n += this.tablecell(e.header[r]);
    t += this.tablerow({ text: n });
    let i = "";
    for (let r = 0; r < e.rows.length; r++) {
      let o = e.rows[r];
      n = "";
      for (let s = 0; s < o.length; s++) n += this.tablecell(o[s]);
      i += this.tablerow({ text: n });
    }
    return i && (i = `<tbody>${i}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + i + `</table>
`;
  }
  tablerow({ text: e }) {
    return `<tr>
${e}</tr>
`;
  }
  tablecell(e) {
    let t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
    return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
  }
  strong({ tokens: e }) {
    return `<strong>${this.parser.parseInline(e)}</strong>`;
  }
  em({ tokens: e }) {
    return `<em>${this.parser.parseInline(e)}</em>`;
  }
  codespan({ text: e }) {
    return `<code>${w(e, true)}</code>`;
  }
  br(e) {
    return "<br>";
  }
  del({ tokens: e }) {
    return `<del>${this.parser.parseInline(e)}</del>`;
  }
  link({ href: e, title: t, text: n, tokens: i, autolink: r }) {
    let o = r ? w(n, true) : this.parser.parseInline(i), s = ie(e);
    if (s === null) return o;
    e = w(s, r);
    let l = '<a href="' + e + '"';
    return t && (l += ' title="' + w(t) + '"'), l += ">" + o + "</a>", l;
  }
  image({ href: e, title: t, text: n, tokens: i }) {
    i && (n = this.parser.parseInline(i, this.parser.textRenderer));
    let r = ie(e);
    if (r === null) return w(n);
    e = r;
    let o = `<img src="${w(e)}" alt="${w(n)}"`;
    return t && (o += ` title="${w(t)}"`), o += ">", o;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : w(e.text);
  }
};
var z = class {
  strong({ text: e }) {
    return e;
  }
  em({ text: e }) {
    return e;
  }
  codespan({ text: e }) {
    return e;
  }
  del({ text: e }) {
    return e;
  }
  html({ text: e }) {
    return e;
  }
  text({ text: e }) {
    return e;
  }
  link({ text: e }) {
    return "" + e;
  }
  image({ text: e }) {
    return "" + e;
  }
  br() {
    return "";
  }
  checkbox({ raw: e }) {
    return e;
  }
};
var O = class a2 {
  options;
  renderer;
  textRenderer;
  constructor(e) {
    this.options = e || y, this.options.renderer = this.options.renderer || new $(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new z();
  }
  static parse(e, t) {
    return new a2(t).parse(e);
  }
  static parseInline(e, t) {
    return new a2(t).parseInline(e);
  }
  parse(e) {
    this.renderer.parser = this;
    let t = "";
    for (let n = 0; n < e.length; n++) {
      let i = e[n];
      if (this.options.extensions?.renderers?.[i.type]) {
        let o = i, s = this.options.extensions.renderers[o.type].call({ parser: this }, o);
        if (s !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "checkbox", "html", "def", "paragraph", "text"].includes(o.type)) {
          t += s || "";
          continue;
        }
      }
      let r = i;
      switch (r.type) {
        case "space": {
          t += this.renderer.space(r);
          break;
        }
        case "hr": {
          t += this.renderer.hr(r);
          break;
        }
        case "heading": {
          t += this.renderer.heading(r);
          break;
        }
        case "code": {
          t += this.renderer.code(r);
          break;
        }
        case "table": {
          t += this.renderer.table(r);
          break;
        }
        case "blockquote": {
          t += this.renderer.blockquote(r);
          break;
        }
        case "list": {
          t += this.renderer.list(r);
          break;
        }
        case "checkbox": {
          t += this.renderer.checkbox(r);
          break;
        }
        case "html": {
          t += this.renderer.html(r);
          break;
        }
        case "def": {
          t += this.renderer.def(r);
          break;
        }
        case "paragraph": {
          t += this.renderer.paragraph(r);
          break;
        }
        case "text": {
          t += this.renderer.text(r);
          break;
        }
        default: {
          let o = 'Token with "' + r.type + '" type was not found.';
          if (this.options.silent) return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return t;
  }
  parseInline(e, t = this.renderer) {
    this.renderer.parser = this;
    let n = "";
    for (let i = 0; i < e.length; i++) {
      let r = e[i];
      if (this.options.extensions?.renderers?.[r.type]) {
        let s = this.options.extensions.renderers[r.type].call({ parser: this }, r);
        if (s !== false || !["escape", "html", "link", "image", "checkbox", "strong", "em", "codespan", "br", "del", "text"].includes(r.type)) {
          n += s || "";
          continue;
        }
      }
      let o = r;
      switch (o.type) {
        case "escape": {
          n += t.text(o);
          break;
        }
        case "html": {
          n += t.html(o);
          break;
        }
        case "link": {
          n += t.link(o);
          break;
        }
        case "image": {
          n += t.image(o);
          break;
        }
        case "checkbox": {
          n += t.checkbox(o);
          break;
        }
        case "strong": {
          n += t.strong(o);
          break;
        }
        case "em": {
          n += t.em(o);
          break;
        }
        case "codespan": {
          n += t.codespan(o);
          break;
        }
        case "br": {
          n += t.br(o);
          break;
        }
        case "del": {
          n += t.del(o);
          break;
        }
        case "text": {
          n += t.text(o);
          break;
        }
        default: {
          let s = 'Token with "' + o.type + '" type was not found.';
          if (this.options.silent) return console.error(s), "";
          throw new Error(s);
        }
      }
    }
    return n;
  }
};
var L = class {
  options;
  block;
  constructor(e) {
    this.options = e || y;
  }
  static passThroughHooks = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"]);
  static passThroughHooksRespectAsync = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"]);
  preprocess(e) {
    return e;
  }
  postprocess(e) {
    return e;
  }
  processAllTokens(e) {
    return e;
  }
  emStrongMask(e) {
    return e;
  }
  provideLexer(e = this.block) {
    return e ? T.lex : T.lexInline;
  }
  provideParser(e = this.block) {
    return e ? O.parse : O.parseInline;
  }
};
function C(a3, e) {
  if (Array.isArray(e)) for (let t = 0; t < e.length; t++) a3.push(e[t]);
  else a3.push(e);
}
var U = class {
  defaults = B();
  options = this.setOptions;
  parse = this.parseMarkdown(true);
  parseInline = this.parseMarkdown(false);
  Parser = O;
  Renderer = $;
  TextRenderer = z;
  Lexer = T;
  Tokenizer = _;
  Hooks = L;
  constructor(...e) {
    this.use(...e);
  }
  walkTokens(e, t) {
    let n = [];
    for (let i of e) switch (C(n, t.call(this, i)), i.type) {
      case "table": {
        let r = i;
        for (let o of r.header) C(n, this.walkTokens(o.tokens, t));
        for (let o of r.rows) for (let s of o) C(n, this.walkTokens(s.tokens, t));
        break;
      }
      case "list": {
        let r = i;
        C(n, this.walkTokens(r.items, t));
        break;
      }
      default: {
        let r = i;
        this.defaults.extensions?.childTokens?.[r.type] ? this.defaults.extensions.childTokens[r.type].forEach((o) => {
          let s = r[o].flat(1 / 0);
          C(n, this.walkTokens(s, t));
        }) : r.tokens && C(n, this.walkTokens(r.tokens, t));
      }
    }
    return n;
  }
  use(...e) {
    let t = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return e.forEach((n) => {
      let i = { ...n };
      if (i.async = this.defaults.async || i.async || false, n.extensions && (n.extensions.forEach((r) => {
        if (!r.name) throw new Error("extension name required");
        if ("renderer" in r) {
          let o = t.renderers[r.name];
          o ? t.renderers[r.name] = function(...s) {
            let l = r.renderer.apply(this, s);
            return l === false && (l = o.apply(this, s)), l;
          } : t.renderers[r.name] = r.renderer;
        }
        if ("tokenizer" in r) {
          if (!r.level || r.level !== "block" && r.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let o = t[r.level];
          o ? o.unshift(r.tokenizer) : t[r.level] = [r.tokenizer], r.start && (r.level === "block" ? t.startBlock ? t.startBlock.push(r.start) : t.startBlock = [r.start] : r.level === "inline" && (t.startInline ? t.startInline.push(r.start) : t.startInline = [r.start]));
        }
        "childTokens" in r && r.childTokens && (t.childTokens[r.name] = r.childTokens);
      }), i.extensions = t), n.renderer) {
        let r = this.defaults.renderer || new $(this.defaults);
        for (let o in n.renderer) {
          if (!(o in r)) throw new Error(`renderer '${o}' does not exist`);
          if (["options", "parser"].includes(o)) continue;
          let s = o, l = n.renderer[s], u = r[s];
          r[s] = (...c) => {
            let p = l.apply(r, c);
            return p === false && (p = u.apply(r, c)), p || "";
          };
        }
        i.renderer = r;
      }
      if (n.tokenizer) {
        let r = this.defaults.tokenizer || new _(this.defaults);
        for (let o in n.tokenizer) {
          if (!(o in r)) throw new Error(`tokenizer '${o}' does not exist`);
          if (["options", "rules", "lexer"].includes(o)) continue;
          let s = o, l = n.tokenizer[s], u = r[s];
          r[s] = (...c) => {
            let p = l.apply(r, c);
            return p === false && (p = u.apply(r, c)), p;
          };
        }
        i.tokenizer = r;
      }
      if (n.hooks) {
        let r = this.defaults.hooks || new L();
        for (let o in n.hooks) {
          if (!(o in r)) throw new Error(`hook '${o}' does not exist`);
          if (["options", "block"].includes(o)) continue;
          let s = o, l = n.hooks[s], u = r[s];
          L.passThroughHooks.has(o) ? r[s] = (c) => {
            if (this.defaults.async && L.passThroughHooksRespectAsync.has(o)) return (async () => {
              let d = await l.call(r, c);
              return u.call(r, d);
            })();
            let p = l.call(r, c);
            return u.call(r, p);
          } : r[s] = (...c) => {
            if (this.defaults.async) return (async () => {
              let d = await l.apply(r, c);
              return d === false && (d = await u.apply(r, c)), d;
            })();
            let p = l.apply(r, c);
            return p === false && (p = u.apply(r, c)), p;
          };
        }
        i.hooks = r;
      }
      if (n.walkTokens) {
        let r = this.defaults.walkTokens, o = n.walkTokens;
        i.walkTokens = function(s) {
          let l = [];
          return l.push(o.call(this, s)), r && C(l, r.call(this, s)), l;
        };
      }
      this.defaults = { ...this.defaults, ...i };
    }), this;
  }
  setOptions(e) {
    return this.defaults = { ...this.defaults, ...e }, this;
  }
  lexer(e, t) {
    return T.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return O.parse(e, t ?? this.defaults);
  }
  parseMarkdown(e) {
    return (n, i) => {
      let r = { ...i }, o = { ...this.defaults, ...r }, s = this.onError(!!o.silent, !!o.async);
      if (this.defaults.async === true && r.async === false) return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof n > "u" || n === null) return s(new Error("marked(): input parameter is undefined or null"));
      if (typeof n != "string") return s(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
      if (o.hooks && (o.hooks.options = o, o.hooks.block = e), o.async) return (async () => {
        let l = o.hooks ? await o.hooks.preprocess(n) : n, c = await (o.hooks ? await o.hooks.provideLexer(e) : e ? T.lex : T.lexInline)(l, o), p = o.hooks ? await o.hooks.processAllTokens(c) : c;
        o.walkTokens && await Promise.all(this.walkTokens(p, o.walkTokens));
        let g = await (o.hooks ? await o.hooks.provideParser(e) : e ? O.parse : O.parseInline)(p, o);
        return o.hooks ? await o.hooks.postprocess(g) : g;
      })().catch(s);
      try {
        o.hooks && (n = o.hooks.preprocess(n));
        let u = (o.hooks ? o.hooks.provideLexer(e) : e ? T.lex : T.lexInline)(n, o);
        o.hooks && (u = o.hooks.processAllTokens(u)), o.walkTokens && this.walkTokens(u, o.walkTokens);
        let p = (o.hooks ? o.hooks.provideParser(e) : e ? O.parse : O.parseInline)(u, o);
        return o.hooks && (p = o.hooks.postprocess(p)), p;
      } catch (l) {
        return s(l);
      }
    };
  }
  onError(e, t) {
    return (n) => {
      if (n.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
        let i = "<p>An error occurred:</p><pre>" + w(n.message + "", true) + "</pre>";
        return t ? Promise.resolve(i) : i;
      }
      if (t) return Promise.reject(n);
      throw n;
    };
  }
};
var I = new U();
function f(a3, e) {
  return I.parse(a3, e);
}
f.options = f.setOptions = function(a3) {
  return I.setOptions(a3), f.defaults = I.defaults, V(f.defaults), f;
};
f.getDefaults = B;
f.defaults = y;
function At(...a3) {
  return I.use(...a3), f.defaults = I.defaults, V(f.defaults), f;
}
f.use = At;
f.walkTokens = function(a3, e) {
  return I.walkTokens(a3, e);
};
f.parseInline = I.parseInline;
f.Parser = O;
f.parser = O.parse;
f.Renderer = $;
f.TextRenderer = z;
f.Lexer = T;
f.lexer = T.lex;
f.Tokenizer = _;
f.Hooks = L;
f.parse = f;
f.options;
f.setOptions;
f.walkTokens;
f.parseInline;
O.parse;
T.lex;
const ALLOWED_TAGS = [
  "p",
  "br",
  "hr",
  "strong",
  "em",
  "del",
  "s",
  "code",
  "pre",
  "blockquote",
  "ul",
  "ol",
  "li",
  "a",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "span"
];
const ALLOWED_ATTR = ["href", "start"];
function renderMarkdown(md) {
  const html2 = f.parse(md, { async: false, gfm: true });
  const root = document.createElement("div");
  root.innerHTML = purify_default.sanitize(html2, { ALLOWED_TAGS, ALLOWED_ATTR, ALLOW_DATA_ATTR: false });
  for (const a3 of [...root.querySelectorAll("a")]) {
    const url = webLink(a3.getAttribute("href"));
    if (url) {
      a3.removeAttribute("href");
      a3.setAttribute("data-link", url);
    } else {
      a3.replaceWith(...a3.childNodes);
    }
  }
  return root.innerHTML;
}
function webLink(href) {
  if (!href) return null;
  try {
    const u = new URL(href);
    return u.protocol === "https:" || u.protocol === "http:" ? href : null;
  } catch {
    return null;
  }
}
const COPIED_MS = 1500;
const useStyles$4 = makeStyles({
  card: {
    position: "relative",
    overflow: "hidden",
    width: "456px",
    maxHeight: "576px",
    boxSizing: "border-box",
    padding: "10px 6px 8px 12px",
    rowGap: "8px",
    transitionProperty: "height",
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
    "@media (prefers-reduced-motion: reduce)": { transitionProperty: "none" }
  },
  /** While the answer streams, a thin bar runs along the card's top edge. */
  progress: { position: "absolute", top: 0, left: 0, right: 0 },
  head: { display: "flex", alignItems: "center", columnGap: "8px", minWidth: 0 },
  title: { flexGrow: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  body: {
    flexShrink: 1,
    minHeight: 0,
    overflowY: "auto",
    paddingRight: "6px",
    display: "flex",
    flexDirection: "column",
    rowGap: "10px"
  },
  entry: { display: "flex", flexDirection: "column", rowGap: "2px" },
  /** The user's side of the thread: a chip on the right with the ping's label and any words. */
  ask: {
    alignSelf: "flex-end",
    maxWidth: "85%",
    padding: "4px 10px 5px",
    borderRadius: tokens.borderRadiusXLarge,
    borderBottomRightRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground3,
    display: "flex",
    flexDirection: "column"
  },
  askLabel: { color: tokens.colorBrandForeground2 },
  askWords: { color: tokens.colorNeutralForeground1, whiteSpace: "pre-wrap", overflowWrap: "anywhere" },
  waiting: { display: "flex", flexDirection: "column", rowGap: "6px", paddingTop: "2px" },
  /** The bubble's line leads its answer. */
  lead: { display: "block", marginBottom: "4px" },
  buttons: { display: "flex", flexWrap: "wrap", columnGap: "4px", rowGap: "4px", paddingRight: "6px" },
  reply: { marginRight: "6px" },
  footer: { color: tokens.colorNeutralForeground3, paddingRight: "6px" }
});
function useContentHeight(card, body) {
  const [height, setHeight] = reactExports.useState(void 0);
  const watcher = reactExports.useRef(null);
  const measure = reactExports.useCallback(() => {
    const c = card.current;
    if (!c) return;
    const css = getComputedStyle(c);
    const chrome = ["paddingTop", "paddingBottom", "borderTopWidth", "borderBottomWidth"].reduce((sum, k) => sum + (parseFloat(css[k]) || 0), 0);
    const flow = [...c.children].filter((el) => getComputedStyle(el).position !== "absolute");
    const heights = flow.map((el) => el === body.current ? el.scrollHeight : el.offsetHeight);
    const next2 = contentHeight(chrome, parseFloat(css.rowGap) || 0, heights, parseFloat(css.maxHeight) || Infinity);
    setHeight((h2) => h2 === next2 ? h2 : next2);
  }, [card, body]);
  reactExports.useLayoutEffect(() => {
    measure();
    const c = card.current;
    if (!c) return;
    watcher.current ??= new ResizeObserver(measure);
    for (const el of [...c.children, ...body.current?.children ?? []]) {
      if (el !== body.current) watcher.current.observe(el);
    }
  });
  reactExports.useEffect(() => () => watcher.current?.disconnect(), []);
  return height;
}
function Markdown({ md, t, act: act2, className }) {
  const ref = reactExports.useRef(null);
  const html2 = reactExports.useMemo(() => renderMarkdown(md), [md]);
  reactExports.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = html2;
    for (const link of el.querySelectorAll("[data-link]")) {
      link.setAttribute("role", "link");
      link.setAttribute("tabindex", "0");
    }
    for (const pre of el.querySelectorAll("pre")) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "mate-copy-code";
      b.textContent = t.copyCode;
      pre.append(b);
    }
  }, [html2, t]);
  const activate = (target) => {
    if (!(target instanceof Element)) return false;
    const copy2 = target.closest(".mate-copy-code");
    if (copy2) {
      act2({ t: "copy", text: copy2.parentElement?.querySelector("code")?.textContent ?? "" });
      return true;
    }
    const url = target.closest("[data-link]")?.getAttribute("data-link");
    if (url) act2({ t: "link", url });
    return Boolean(url);
  };
  const onClick = (e) => {
    if (activate(e.target)) e.preventDefault();
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter" && e.target instanceof Element && e.target.hasAttribute("data-link") && activate(e.target)) {
      e.preventDefault();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: mergeClasses("mate-md", className), onClick, onKeyDown });
}
function Card({ s, t, act: act2, leaving }) {
  const st2 = useStyles$4();
  const sf = useSurfaceStyles();
  const m = useMotion();
  const [reply, setReply] = reactExports.useState("");
  const [copied, setCopied] = reactExports.useState(false);
  const bodyRef = reactExports.useRef(null);
  const cardRef = reactExports.useRef(null);
  const height = useContentHeight(cardRef, bodyRef);
  const opened = reactExports.useRef(s.entries.length).current;
  const waited = reactExports.useRef(/* @__PURE__ */ new Set()).current;
  const lineFirst = reactExports.useRef(/* @__PURE__ */ new Set()).current;
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && !e.isComposing) act2({ t: "close" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [act2]);
  reactExports.useEffect(() => {
    const el = bodyRef.current;
    if (!el || !s.streaming) return;
    const smooth = !reducedMotion();
    el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "auto" });
  }, [s]);
  reactExports.useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), COPIED_MS);
    return () => clearTimeout(timer);
  }, [copied]);
  const sendReply = () => {
    const text2 = reply.trim();
    if (!text2) return;
    act2({ t: "reply", text: text2 });
    setReply("");
  };
  const copyAll = () => {
    act2({ t: "copy", text: copyText(s.entries) });
    setCopied(true);
  };
  const leave = leaving === "stale" ? m.stale : leaving === "fast" ? m.shrink : void 0;
  const put = putLabel(s.put, t);
  const [guard] = reactExports.useState(() => new PutGuard(() => performance.now()));
  guard.show(put);
  const [drag] = reactExports.useState(() => dragHandle((d) => window.mateApi.drag(d)));
  const button = (b) => {
    switch (b) {
      case "copy":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "small",
            icon: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Checkmark16Regular, { className: m.pop }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy16Regular, {}),
            onClick: copyAll,
            children: copied ? t.copied : t.copy
          },
          "copy"
        );
      case "deep":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", onClick: () => act2({ t: "deep" }), children: t.wholePicture }, "deep");
      case "history":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(History16Regular, {}), onClick: () => act2({ t: "history" }), children: t.history }, "history");
      case "put":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: m.pop,
            size: "small",
            appearance: "primary",
            onClick: () => guard.click() && act2({ t: "put" }),
            children: put
          },
          `put:${put}`
        );
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: sf.frame, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card$1,
    {
      ref: cardRef,
      className: mergeClasses(sf.surface, st2.card, m.grow, leave),
      style: height === void 0 ? void 0 : { height },
      ...{ [HEIGHT_TARGET]: height },
      children: [
        s.streaming && /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { className: st2.progress, thickness: "medium", shape: "square", "aria-hidden": true }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: st2.head, ...drag, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(NameTag, { tag: s.tag, thinking: s.streaming, thinkingLabel: t.thinking }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Subtitle2, { className: st2.title, children: s.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "small",
              appearance: "subtle",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Dismiss16Regular, {}),
              "aria-label": t.close,
              onClick: () => act2({ t: "close" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: st2.body, ref: bodyRef, children: s.entries.map((e, i) => {
          const style = stagger(i < opened ? i : 0);
          if (e.kind === "ask") {
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: mergeClasses(st2.ask, m.rise), style, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Caption1, { className: st2.askLabel, children: e.label }),
              e.markdown && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: st2.askWords, children: e.markdown })
            ] }, i);
          }
          const waiting = !e.line && !e.markdown && s.streaming && i === s.entries.length - 1;
          if (waiting) waited.add(i);
          if (e.line && !e.markdown) lineFirst.add(i);
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: mergeClasses(st2.entry, m.rise), style, children: waiting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Skeleton, { className: st2.waiting, "aria-label": t.thinking, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonItem, { size: 12, style: { width: "92%" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonItem, { size: 12, style: { width: "78%" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonItem, { size: 12, style: { width: "54%" } })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            e.line && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { weight: "semibold", className: mergeClasses(st2.lead, waited.has(i) && m.rise), children: e.line }),
            e.markdown && /* @__PURE__ */ jsxRuntimeExports.jsx(Markdown, { md: e.markdown, t, act: act2, className: lineFirst.has(i) ? m.rise : void 0 })
          ] }) }, i);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: st2.buttons, children: cardButtons(put, s.answerOnly).map(button) }),
        !s.answerOnly && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: st2.reply,
            size: "small",
            placeholder: t.reply,
            value: reply,
            maxLength: MATE_TEXT_MAX,
            onChange: (_e2, d) => setReply(d.value),
            onKeyDown: (e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing) sendReply();
            },
            contentAfter: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", appearance: "transparent", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Send16Regular, {}), "aria-label": t.send, onClick: sendReply })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Caption1, { className: st2.footer, children: footerText(s.footer, t) })
      ]
    }
  ) });
}
const useStyles$3 = makeStyles({
  card: {
    position: "relative",
    overflow: "hidden",
    width: "360px",
    boxSizing: "border-box",
    padding: "12px 12px 14px",
    rowGap: "8px"
  },
  head: { display: "flex", alignItems: "center", columnGap: "8px", minWidth: 0 },
  /** An agent's question can hold a long path or address with no spaces to break at. */
  text: { fontWeight: tokens.fontWeightSemibold, overflowWrap: "anywhere" },
  /** What will be pasted: quiet, and scrollable with the wheel when it is long. */
  detail: {
    maxHeight: "96px",
    overflowY: "auto",
    padding: "6px 8px",
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere"
  },
  /** Said outside the detail box, so it shows however long the detail is. */
  note: { color: tokens.colorNeutralForeground2 },
  buttons: { display: "flex", flexWrap: "wrap", columnGap: "6px", rowGap: "6px" },
  /** The time left to decide, along the card's bottom edge. */
  bar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "3px",
    backgroundColor: tokens.colorBrandBackground,
    transformOrigin: "left",
    animationName: { from: { transform: "scaleX(1)" }, to: { transform: "scaleX(0)" } },
    animationFillMode: "forwards"
  }
});
function Consent({ s, t, act: act2, leaving }) {
  const st2 = useStyles$3();
  const sf = useSurfaceStyles();
  const m = useMotion();
  const [guard] = reactExports.useState(() => new PutGuard(() => performance.now()));
  guard.show(consentKey(s));
  const send = (a3) => {
    if (!leaving && guard.click()) act2(a3);
  };
  const serial = s.serial ?? 0;
  const left = s.side === "left";
  const enter = left ? m.slideInLeft : m.slideInRight;
  const leave = leaving ? left ? m.slideOutLeft : m.slideOutRight : void 0;
  const more = consentMore(s, t);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: sf.frame, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card$1, { className: mergeClasses(sf.surface, st2.card, enter, leave), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: st2.head, children: /* @__PURE__ */ jsxRuntimeExports.jsx(NameTag, { tag: s.tag, thinking: false, thinkingLabel: t.thinking }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: st2.text, children: s.text }),
    s.detail && /* @__PURE__ */ jsxRuntimeExports.jsx(Caption1, { className: st2.detail, children: s.detail }),
    more && /* @__PURE__ */ jsxRuntimeExports.jsx(Caption1, { className: st2.note, children: more }),
    s.alwaysAsks && /* @__PURE__ */ jsxRuntimeExports.jsx(Caption1, { className: st2.note, children: t.agentAlwaysAsks }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: st2.buttons, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", appearance: "primary", onClick: () => send({ t: "allow", serial }), children: t.allowOnce }),
      s.always && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", onClick: () => send({ t: "always", serial }), children: t.alwaysAllow }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", onClick: () => send({ t: "decline", serial }), children: t.decline })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: st2.bar,
        "aria-hidden": true,
        style: {
          animationDuration: `${s.seconds}s`,
          animationTimingFunction: reduced ? `steps(${Math.max(1, Math.round(s.seconds))}, end)` : "linear"
        }
      }
    )
  ] }) });
}
function checkedIds(rows, choice) {
  return rows.filter((r) => choice[r.id] ?? r.checked).map((r) => r.id);
}
const useStyles$2 = makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    width: "396px",
    // The window is at most 520 DIPs high, with 12 on each side for the shadow: past this the list scrolls.
    maxHeight: "496px",
    boxSizing: "border-box",
    padding: "12px 12px 10px",
    rowGap: "8px",
    overflow: "hidden"
  },
  head: { display: "flex", alignItems: "center", columnGap: "8px", minWidth: 0 },
  text: { fontWeight: tokens.fontWeightSemibold },
  /** The rows and the fields left for the user; the wheel scrolls it, and the buttons stay below it. */
  list: { flexShrink: 1, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column", rowGap: "2px" },
  label: { display: "flex", flexDirection: "column", minWidth: 0 },
  name: { fontWeight: tokens.fontWeightSemibold, overflowWrap: "anywhere" },
  /** Two lines at most; the whole value is the row's tooltip. */
  value: {
    color: tokens.colorNeutralForeground2,
    overflowWrap: "anywhere",
    whiteSpace: "pre-wrap",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "2",
    overflow: "hidden"
  },
  leftHead: { color: tokens.colorNeutralForeground3, marginTop: "6px" },
  leftRow: { paddingLeft: "8px", overflowWrap: "anywhere" },
  reason: { color: tokens.colorNeutralForeground3 },
  buttons: { display: "flex", flexWrap: "wrap", columnGap: "6px", rowGap: "6px" },
  note: { color: tokens.colorNeutralForeground3 }
});
const reasonText = (t, reason) => {
  switch (reason) {
    case "secure":
      return t.formWhySecure;
    case "unknown":
      return t.formWhyUnknown;
    case "kind":
      return t.formWhyKind;
    case "option":
      return t.formWhyOption;
  }
};
function FormPreview({ s, t, act: act2, leaving }) {
  const st2 = useStyles$2();
  const sf = useSurfaceStyles();
  const m = useMotion();
  const [choice, setChoice] = reactExports.useState({});
  const ids = checkedIds(s.rows, choice);
  const [guard] = reactExports.useState(() => new PutGuard(() => performance.now()));
  guard.show(formKey(s));
  const send = (a3) => {
    if (!leaving && guard.click()) act2(a3);
  };
  const serial = s.serial ?? 0;
  const left = s.side === "left";
  const enter = left ? m.slideInLeft : m.slideInRight;
  const leave = leaving ? left ? m.slideOutLeft : m.slideOutRight : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: sf.frame, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card$1, { className: mergeClasses(sf.surface, st2.card, enter, leave), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: st2.head, children: /* @__PURE__ */ jsxRuntimeExports.jsx(NameTag, { tag: s.tag, thinking: false, thinkingLabel: t.thinking }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: st2.text, children: t.formTitle(s.app) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: st2.list, children: [
      s.rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Checkbox,
        {
          title: r.value,
          checked: ids.includes(r.id),
          onChange: (_e2, d) => setChoice((c) => ({ ...c, [r.id]: d.checked === true })),
          label: {
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: st2.label, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: st2.name, children: r.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Caption1, { className: st2.value, children: r.value })
            ] })
          }
        },
        r.id
      )),
      s.left.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Caption1, { className: st2.leftHead, children: t.formLeft }),
        s.left.map((f2, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: st2.leftRow, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Caption1, { children: [
          f2.label,
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: st2.reason, children: [
            t.sep,
            reasonText(t, f2.reason)
          ] })
        ] }) }, i))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: st2.buttons, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "small",
          appearance: "primary",
          disabled: ids.length === 0,
          onClick: () => send({ t: "fill", ids, serial }),
          children: t.formFill(ids.length)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", onClick: () => send({ t: "cancel", serial }), children: t.formCancel })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Caption1, { className: st2.note, children: t.formNote })
  ] }) });
}
const midnight = (t) => {
  const d = new Date(t);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
};
function groupByDay(threads, now) {
  const today = midnight(now);
  const yesterday = midnight(today - 1);
  const groups = /* @__PURE__ */ new Map();
  for (const t of [...threads].sort((a3, b) => b.lastActivity - a3.lastActivity)) {
    const key = midnight(t.lastActivity);
    const list = groups.get(key);
    if (list) list.push(t);
    else groups.set(key, [t]);
  }
  return [...groups].map(([key, list]) => ({
    day: key === today ? "today" : key === yesterday ? "yesterday" : key,
    threads: list
  }));
}
const SEARCH_WAIT_MS = 150;
const DELETE_MS = 200;
const useStyles$1 = makeStyles({
  page: {
    boxSizing: "border-box",
    minHeight: "100%",
    padding: "20px 24px",
    display: "flex",
    flexDirection: "column",
    rowGap: "12px",
    backgroundColor: tokens.colorNeutralBackground2,
    color: tokens.colorNeutralForeground1
  },
  search: { maxWidth: "360px" },
  day: { marginTop: "8px", color: tokens.colorNeutralForeground3 },
  /** A row waits unseen until it scrolls into view, where it slides in. */
  unseen: { opacity: 0 },
  row: {
    display: "flex",
    alignItems: "center",
    columnGap: "12px",
    marginTop: "6px",
    padding: "8px 12px",
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow2,
    transitionProperty: "background-color, box-shadow, transform",
    transitionDuration: tokens.durationFaster,
    transitionTimingFunction: tokens.curveEasyEase,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      boxShadow: tokens.shadow8,
      transform: "translateY(-1px)"
    },
    "@media (prefers-reduced-motion: reduce)": { transitionDuration: "0.01ms", ":hover": { transform: "none" } }
  },
  text: { flexGrow: 1, minWidth: 0, display: "flex", flexDirection: "column" },
  ellipsis: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  meta: { color: tokens.colorNeutralForeground3 },
  note: { color: tokens.colorNeutralForeground2 },
  error: { color: tokens.colorPaletteRedForeground1 }
});
function History({ s, t, act: act2 }) {
  const st2 = useStyles$1();
  const m = useMotion();
  const ui = t.teammate.ui;
  const [query, setQuery] = reactExports.useState(s.query);
  const sent = reactExports.useRef(s.query);
  const [removing, setRemoving] = reactExports.useState(/* @__PURE__ */ new Set());
  const [seen, setSeen] = reactExports.useState(/* @__PURE__ */ new Map());
  const watcher = reactExports.useRef(null);
  const watch = reactExports.useCallback((el) => {
    if (!el) return;
    watcher.current ??= new IntersectionObserver((entries2) => {
      const arrived = entries2.filter((e) => e.isIntersecting).map((e) => e.target);
      if (arrived.length === 0) return;
      for (const target of arrived) watcher.current?.unobserve(target);
      setSeen((prev2) => {
        const next2 = new Map(prev2);
        arrived.forEach((target, i) => {
          const id = target instanceof HTMLElement ? target.dataset.row : void 0;
          if (id !== void 0 && !next2.has(id)) next2.set(id, i);
        });
        return next2;
      });
    }, { root: document.body });
    watcher.current.observe(el);
  }, []);
  reactExports.useEffect(() => () => watcher.current?.disconnect(), []);
  reactExports.useEffect(() => {
    if (query === sent.current) return;
    const timer = setTimeout(() => {
      sent.current = query;
      act2({ t: "search", query });
    }, SEARCH_WAIT_MS);
    return () => clearTimeout(timer);
  }, [query, act2]);
  const groups = reactExports.useMemo(() => groupByDay(s.threads, Date.now()), [s.threads]);
  const dayName = (day) => day === "today" ? ui.today : day === "yesterday" ? ui.yesterday : new Intl.DateTimeFormat(s.lang, { dateStyle: "full" }).format(day);
  const time = new Intl.DateTimeFormat(s.lang, { timeStyle: "short" });
  const remove = (id) => {
    setRemoving((r) => new Set(r).add(id));
    setTimeout(() => act2({ t: "delete", id }), DELETE_MS);
  };
  const shown = (id) => reducedMotion() || seen.has(id);
  const dayShown = (g) => {
    const first = g.threads[0];
    return first === void 0 || shown(first.id);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: st2.page, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Subtitle1, { children: ui.historyTitle }),
    !s.available ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: mergeClasses(st2.note, m.rise), children: s.off === "unavailable" ? ui.historyUnavailable : ui.historyDisabled }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      s.openFailed !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: st2.error, role: "status", children: ui.openInFailed(s.openFailed) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SearchBox,
        {
          className: st2.search,
          placeholder: ui.search,
          "aria-label": ui.search,
          value: query,
          maxLength: 200,
          onChange: (_e2, d) => setQuery(d.value)
        }
      ),
      groups.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: mergeClasses(st2.note, m.rise), children: s.query ? ui.noMatch : ui.noThreads }),
      groups.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Body1Strong,
          {
            className: mergeClasses(st2.day, dayShown(g) ? m.rise : st2.unseen),
            style: dayShown(g) ? stagger(seen.get(g.threads[0]?.id ?? "") ?? 0) : void 0,
            children: dayName(g.day)
          }
        ),
        g.threads.map((th) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            ref: shown(th.id) ? void 0 : watch,
            "data-row": th.id,
            className: mergeClasses(
              st2.row,
              removing.has(th.id) ? m.slideOut : shown(th.id) ? m.slideIn : st2.unseen
            ),
            style: removing.has(th.id) || !shown(th.id) ? void 0 : stagger(seen.get(th.id) ?? 0),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: st2.text, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { weight: "semibold", className: st2.ellipsis, children: th.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Caption1, { className: mergeClasses(st2.meta, st2.ellipsis), children: [time.format(th.lastActivity), th.app, ...th.intents.map((id) => t.teammate.intent[id].label)].filter(Boolean).join(" · ") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", onClick: () => act2({ t: "open", id: th.id }), children: ui.open }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", appearance: "primary", onClick: () => act2({ t: "continue", id: th.id }), children: ui.continueThread }),
              th.agent !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", onClick: () => act2({ t: "openInAgent", id: th.id }), children: ui.openInAgent(th.agent) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "small",
                  appearance: "subtle",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Delete16Regular, {}),
                  "aria-label": ui.delete,
                  title: ui.delete,
                  onClick: () => remove(th.id)
                }
              )
            ]
          },
          th.id
        ))
      ] }, String(g.day)))
    ] })
  ] });
}
const useStyles = makeStyles({
  box: { padding: "8px 10px", display: "flex", flexDirection: "column", rowGap: "6px" },
  head: { display: "flex", alignItems: "center", columnGap: "8px", minWidth: 0, minHeight: "24px" },
  thread: {
    flexGrow: 1,
    minWidth: 0,
    color: tokens.colorNeutralForeground3,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  spacer: { flexGrow: 1 },
  switch: { flexShrink: 0 }
});
function Words({ s, t, act: act2 }) {
  const st2 = useStyles();
  const sf = useSurfaceStyles();
  const m = useMotion();
  const [text2, setText] = reactExports.useState("");
  const [newThread, setNewThread] = reactExports.useState(!s.continueByDefault);
  const input = reactExports.useRef(null);
  reactExports.useEffect(() => {
    input.current?.focus();
  }, []);
  const ask = () => {
    const words = text2.trim();
    if (words) act2({ t: "ask", text: words, newThread: s.thread === null || newThread });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: sf.frame, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: mergeClasses(sf.surface, st2.box, m.appear), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: st2.head, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(NameTag, { tag: s.tag, thinking: false, thinkingLabel: t.thinking }),
      s.thread ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Caption1, { className: st2.thread, children: [
          "↳ ",
          s.thread
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            className: st2.switch,
            label: t.newThread,
            checked: newThread,
            onChange: (_e2, d) => {
              setNewThread(d.checked);
              input.current?.focus();
            }
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: st2.spacer })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        ref: input,
        placeholder: t.ask,
        value: text2,
        maxLength: MATE_TEXT_MAX,
        onChange: (_e2, d) => setText(d.value),
        onKeyDown: (e) => {
          if (e.nativeEvent.isComposing) return;
          if (e.key === "Enter") ask();
          else if (e.key === "Escape") act2({ t: "cancel" });
        }
      }
    )
  ] }) });
}
const api = window.mateApi;
const VIEW = ["bubble", "card", "words", "history", "consent", "form"].find((v2) => location.hash === `#${v2}`) ?? "bubble";
const act = (a3) => api.act(a3);
function useDarkMode() {
  const query = "(prefers-color-scheme: dark)";
  const [dark, setDark] = reactExports.useState(() => matchMedia(query).matches);
  reactExports.useEffect(() => {
    const m = matchMedia(query);
    const onChange = () => setDark(m.matches);
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);
  return dark;
}
function Sized({ children }) {
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let sent = { width: 0, height: 0 };
    let settle;
    const send = (width, height) => {
      if (width === sent.width && height === sent.height) return;
      sent = { width, height };
      api.size(sent);
    };
    const measure = () => {
      const card = el.querySelector(`[${HEIGHT_TARGET}]`);
      const ahead = card ? Number(card.getAttribute(HEIGHT_TARGET)) - card.offsetHeight : 0;
      return { width: el.offsetWidth, height: el.offsetHeight + (Number.isFinite(ahead) ? ahead : 0), eased: !!card };
    };
    let settling = 0;
    const report = () => {
      const { width, height, eased } = measure();
      const step = heightStep(sent.height, height, !eased || reducedMotion());
      send(width, step.window);
      if (step.settleMs === 0) {
        clearTimeout(settle);
        settle = void 0;
      } else if (settle === void 0 || settling !== height) {
        clearTimeout(settle);
        settling = height;
        settle = setTimeout(() => {
          settle = void 0;
          const now = measure();
          send(now.width, now.height);
        }, step.settleMs);
      }
    };
    const observer = new ResizeObserver(report);
    observer.observe(el);
    const target = new MutationObserver(report);
    target.observe(el, { subtree: true, attributes: true, attributeFilter: [HEIGHT_TARGET] });
    report();
    return () => {
      clearTimeout(settle);
      observer.disconnect();
      target.disconnect();
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, style: { width: "max-content" }, children });
}
function Root() {
  const dark = useDarkMode();
  const [state, setState] = reactExports.useState(null);
  const [leaving, setLeaving] = reactExports.useState(null);
  const [round, setRound] = reactExports.useState(0);
  const left = reactExports.useRef(false);
  const serial = reactExports.useRef(void 0);
  reactExports.useEffect(
    () => api.on((s) => {
      if (s.view !== VIEW) return;
      const sided = s.view === "consent" || s.view === "form";
      const fresh = sided && serial.current !== void 0 && s.serial !== serial.current;
      if (sided) serial.current = s.serial;
      if (fresh && !left.current) setRound((r) => r + 1);
      if (left.current) {
        left.current = false;
        setLeaving(null);
        setRound((r) => r + 1);
      }
      setState(s);
    }),
    []
  );
  reactExports.useEffect(
    () => api.onLeave((how) => {
      left.current = true;
      setLeaving(how);
    }),
    []
  );
  const lang = state?.lang ?? "en";
  const t = strings(lang, api.platform);
  reactExports.useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.view = VIEW;
    if (VIEW === "history") document.title = t.teammate.ui.historyTitle;
  }, [lang, t]);
  if (!state) return null;
  const ui = t.teammate.ui;
  let view;
  switch (state.view) {
    case "bubble":
      view = /* @__PURE__ */ jsxRuntimeExports.jsx(Sized, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bubble, { s: state, t: ui, act, leaving }) });
      break;
    case "card":
      view = /* @__PURE__ */ jsxRuntimeExports.jsx(Sized, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { s: state, t: ui, act, leaving }) });
      break;
    case "consent":
      view = /* @__PURE__ */ jsxRuntimeExports.jsx(Sized, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Consent, { s: state, t: ui, act, leaving }) });
      break;
    case "form":
      view = /* @__PURE__ */ jsxRuntimeExports.jsx(Sized, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormPreview, { s: state, t: ui, act, leaving }) });
      break;
    case "words":
      view = /* @__PURE__ */ jsxRuntimeExports.jsx(Words, { s: state, t: ui, act });
      break;
    case "history":
      view = /* @__PURE__ */ jsxRuntimeExports.jsx(History, { s: state, t, act });
      break;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    FluentProvider,
    {
      theme: dark ? webDarkTheme : webLightTheme,
      style: { background: "transparent", height: VIEW === "history" ? "100%" : void 0 },
      children: view
    },
    round
  );
}
clientExports.createRoot(document.getElementById("root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(Root, {}));
