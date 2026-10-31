function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var jsxRuntime$1 = { exports: {} };
var reactJsxRuntime_production = {};
var hasRequiredReactJsxRuntime_production;
function requireReactJsxRuntime_production() {
  if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
  hasRequiredReactJsxRuntime_production = 1;
  var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
  function jsxProd(type, config, maybeKey) {
    var key = null;
    void 0 !== maybeKey && (key = "" + maybeKey);
    void 0 !== config.key && (key = "" + config.key);
    if ("key" in config) {
      maybeKey = {};
      for (var propName in config)
        "key" !== propName && (maybeKey[propName] = config[propName]);
    } else maybeKey = config;
    config = maybeKey.ref;
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type,
      key,
      ref: void 0 !== config ? config : null,
      props: maybeKey
    };
  }
  reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
  reactJsxRuntime_production.jsx = jsxProd;
  reactJsxRuntime_production.jsxs = jsxProd;
  return reactJsxRuntime_production;
}
var hasRequiredJsxRuntime;
function requireJsxRuntime() {
  if (hasRequiredJsxRuntime) return jsxRuntime$1.exports;
  hasRequiredJsxRuntime = 1;
  {
    jsxRuntime$1.exports = requireReactJsxRuntime_production();
  }
  return jsxRuntime$1.exports;
}
var jsxRuntimeExports = requireJsxRuntime();
const jsxRuntime = /* @__PURE__ */ getDefaultExportFromCjs(jsxRuntimeExports);
const ReactRuntime = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: jsxRuntime
}, [jsxRuntimeExports]);
var client = { exports: {} };
var reactDomClient_production = {};
var scheduler = { exports: {} };
var scheduler_production = {};
var hasRequiredScheduler_production;
function requireScheduler_production() {
  if (hasRequiredScheduler_production) return scheduler_production;
  hasRequiredScheduler_production = 1;
  (function(exports) {
    function push(heap, node) {
      var index = heap.length;
      heap.push(node);
      a: for (; 0 < index; ) {
        var parentIndex = index - 1 >>> 1, parent = heap[parentIndex];
        if (0 < compare(parent, node))
          heap[parentIndex] = node, heap[index] = parent, index = parentIndex;
        else break a;
      }
    }
    function peek(heap) {
      return 0 === heap.length ? null : heap[0];
    }
    function pop(heap) {
      if (0 === heap.length) return null;
      var first = heap[0], last = heap.pop();
      if (last !== first) {
        heap[0] = last;
        a: for (var index = 0, length = heap.length, halfLength = length >>> 1; index < halfLength; ) {
          var leftIndex = 2 * (index + 1) - 1, left = heap[leftIndex], rightIndex = leftIndex + 1, right = heap[rightIndex];
          if (0 > compare(left, last))
            rightIndex < length && 0 > compare(right, left) ? (heap[index] = right, heap[rightIndex] = last, index = rightIndex) : (heap[index] = left, heap[leftIndex] = last, index = leftIndex);
          else if (rightIndex < length && 0 > compare(right, last))
            heap[index] = right, heap[rightIndex] = last, index = rightIndex;
          else break a;
        }
      }
      return first;
    }
    function compare(a, b) {
      var diff = a.sortIndex - b.sortIndex;
      return 0 !== diff ? diff : a.id - b.id;
    }
    exports.unstable_now = void 0;
    if ("object" === typeof performance && "function" === typeof performance.now) {
      var localPerformance = performance;
      exports.unstable_now = function() {
        return localPerformance.now();
      };
    } else {
      var localDate = Date, initialTime = localDate.now();
      exports.unstable_now = function() {
        return localDate.now() - initialTime;
      };
    }
    var taskQueue = [], timerQueue = [], taskIdCounter = 1, currentTask = null, currentPriorityLevel = 3, isPerformingWork = false, isHostCallbackScheduled = false, isHostTimeoutScheduled = false, needsPaint = false, localSetTimeout = "function" === typeof setTimeout ? setTimeout : null, localClearTimeout = "function" === typeof clearTimeout ? clearTimeout : null, localSetImmediate = "undefined" !== typeof setImmediate ? setImmediate : null;
    function advanceTimers(currentTime) {
      for (var timer = peek(timerQueue); null !== timer; ) {
        if (null === timer.callback) pop(timerQueue);
        else if (timer.startTime <= currentTime)
          pop(timerQueue), timer.sortIndex = timer.expirationTime, push(taskQueue, timer);
        else break;
        timer = peek(timerQueue);
      }
    }
    function handleTimeout(currentTime) {
      isHostTimeoutScheduled = false;
      advanceTimers(currentTime);
      if (!isHostCallbackScheduled)
        if (null !== peek(taskQueue))
          isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline());
        else {
          var firstTimer = peek(timerQueue);
          null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
        }
    }
    var isMessageLoopRunning = false, taskTimeoutID = -1, frameInterval = 5, startTime = -1;
    function shouldYieldToHost() {
      return needsPaint ? true : exports.unstable_now() - startTime < frameInterval ? false : true;
    }
    function performWorkUntilDeadline() {
      needsPaint = false;
      if (isMessageLoopRunning) {
        var currentTime = exports.unstable_now();
        startTime = currentTime;
        var hasMoreWork = true;
        try {
          a: {
            isHostCallbackScheduled = false;
            isHostTimeoutScheduled && (isHostTimeoutScheduled = false, localClearTimeout(taskTimeoutID), taskTimeoutID = -1);
            isPerformingWork = true;
            var previousPriorityLevel = currentPriorityLevel;
            try {
              b: {
                advanceTimers(currentTime);
                for (currentTask = peek(taskQueue); null !== currentTask && !(currentTask.expirationTime > currentTime && shouldYieldToHost()); ) {
                  var callback = currentTask.callback;
                  if ("function" === typeof callback) {
                    currentTask.callback = null;
                    currentPriorityLevel = currentTask.priorityLevel;
                    var continuationCallback = callback(
                      currentTask.expirationTime <= currentTime
                    );
                    currentTime = exports.unstable_now();
                    if ("function" === typeof continuationCallback) {
                      currentTask.callback = continuationCallback;
                      advanceTimers(currentTime);
                      hasMoreWork = true;
                      break b;
                    }
                    currentTask === peek(taskQueue) && pop(taskQueue);
                    advanceTimers(currentTime);
                  } else pop(taskQueue);
                  currentTask = peek(taskQueue);
                }
                if (null !== currentTask) hasMoreWork = true;
                else {
                  var firstTimer = peek(timerQueue);
                  null !== firstTimer && requestHostTimeout(
                    handleTimeout,
                    firstTimer.startTime - currentTime
                  );
                  hasMoreWork = false;
                }
              }
              break a;
            } finally {
              currentTask = null, currentPriorityLevel = previousPriorityLevel, isPerformingWork = false;
            }
            hasMoreWork = void 0;
          }
        } finally {
          hasMoreWork ? schedulePerformWorkUntilDeadline() : isMessageLoopRunning = false;
        }
      }
    }
    var schedulePerformWorkUntilDeadline;
    if ("function" === typeof localSetImmediate)
      schedulePerformWorkUntilDeadline = function() {
        localSetImmediate(performWorkUntilDeadline);
      };
    else if ("undefined" !== typeof MessageChannel) {
      var channel = new MessageChannel(), port = channel.port2;
      channel.port1.onmessage = performWorkUntilDeadline;
      schedulePerformWorkUntilDeadline = function() {
        port.postMessage(null);
      };
    } else
      schedulePerformWorkUntilDeadline = function() {
        localSetTimeout(performWorkUntilDeadline, 0);
      };
    function requestHostTimeout(callback, ms) {
      taskTimeoutID = localSetTimeout(function() {
        callback(exports.unstable_now());
      }, ms);
    }
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_cancelCallback = function(task) {
      task.callback = null;
    };
    exports.unstable_forceFrameRate = function(fps) {
      0 > fps || 125 < fps ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5;
    };
    exports.unstable_getCurrentPriorityLevel = function() {
      return currentPriorityLevel;
    };
    exports.unstable_next = function(eventHandler) {
      switch (currentPriorityLevel) {
        case 1:
        case 2:
        case 3:
          var priorityLevel = 3;
          break;
        default:
          priorityLevel = currentPriorityLevel;
      }
      var previousPriorityLevel = currentPriorityLevel;
      currentPriorityLevel = priorityLevel;
      try {
        return eventHandler();
      } finally {
        currentPriorityLevel = previousPriorityLevel;
      }
    };
    exports.unstable_requestPaint = function() {
      needsPaint = true;
    };
    exports.unstable_runWithPriority = function(priorityLevel, eventHandler) {
      switch (priorityLevel) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          priorityLevel = 3;
      }
      var previousPriorityLevel = currentPriorityLevel;
      currentPriorityLevel = priorityLevel;
      try {
        return eventHandler();
      } finally {
        currentPriorityLevel = previousPriorityLevel;
      }
    };
    exports.unstable_scheduleCallback = function(priorityLevel, callback, options) {
      var currentTime = exports.unstable_now();
      "object" === typeof options && null !== options ? (options = options.delay, options = "number" === typeof options && 0 < options ? currentTime + options : currentTime) : options = currentTime;
      switch (priorityLevel) {
        case 1:
          var timeout = -1;
          break;
        case 2:
          timeout = 250;
          break;
        case 5:
          timeout = 1073741823;
          break;
        case 4:
          timeout = 1e4;
          break;
        default:
          timeout = 5e3;
      }
      timeout = options + timeout;
      priorityLevel = {
        id: taskIdCounter++,
        callback,
        priorityLevel,
        startTime: options,
        expirationTime: timeout,
        sortIndex: -1
      };
      options > currentTime ? (priorityLevel.sortIndex = options, push(timerQueue, priorityLevel), null === peek(taskQueue) && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? (localClearTimeout(taskTimeoutID), taskTimeoutID = -1) : isHostTimeoutScheduled = true, requestHostTimeout(handleTimeout, options - currentTime))) : (priorityLevel.sortIndex = timeout, push(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline())));
      return priorityLevel;
    };
    exports.unstable_shouldYield = shouldYieldToHost;
    exports.unstable_wrapCallback = function(callback) {
      var parentPriorityLevel = currentPriorityLevel;
      return function() {
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = parentPriorityLevel;
        try {
          return callback.apply(this, arguments);
        } finally {
          currentPriorityLevel = previousPriorityLevel;
        }
      };
    };
  })(scheduler_production);
  return scheduler_production;
}
var hasRequiredScheduler;
function requireScheduler() {
  if (hasRequiredScheduler) return scheduler.exports;
  hasRequiredScheduler = 1;
  {
    scheduler.exports = requireScheduler_production();
  }
  return scheduler.exports;
}
var react = { exports: {} };
var react_production = {};
var hasRequiredReact_production;
function requireReact_production() {
  if (hasRequiredReact_production) return react_production;
  hasRequiredReact_production = 1;
  var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = /* @__PURE__ */ Symbol.for("react.view_transition"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
  function getIteratorFn(maybeIterable) {
    if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
    maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
    return "function" === typeof maybeIterable ? maybeIterable : null;
  }
  var ReactNoopUpdateQueue = {
    isMounted: function() {
      return false;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, assign = Object.assign, emptyObject = {};
  function Component(props, context, updater) {
    this.props = props;
    this.context = context;
    this.refs = emptyObject;
    this.updater = updater || ReactNoopUpdateQueue;
  }
  Component.prototype.isReactComponent = {};
  Component.prototype.setState = function(partialState, callback) {
    if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, partialState, callback, "setState");
  };
  Component.prototype.forceUpdate = function(callback) {
    this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
  };
  function ComponentDummy() {
  }
  ComponentDummy.prototype = Component.prototype;
  function PureComponent(props, context, updater) {
    this.props = props;
    this.context = context;
    this.refs = emptyObject;
    this.updater = updater || ReactNoopUpdateQueue;
  }
  var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
  pureComponentPrototype.constructor = PureComponent;
  assign(pureComponentPrototype, Component.prototype);
  pureComponentPrototype.isPureReactComponent = true;
  var isArrayImpl = Array.isArray;
  function noop2() {
  }
  var ReactSharedInternals = { H: null, A: null, T: null, S: null }, hasOwnProperty = Object.prototype.hasOwnProperty;
  function ReactElement(type, key, props) {
    var refProp = props.ref;
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type,
      key,
      ref: void 0 !== refProp ? refProp : null,
      props
    };
  }
  function cloneAndReplaceKey(oldElement, newKey) {
    return ReactElement(oldElement.type, newKey, oldElement.props);
  }
  function isValidElement(object) {
    return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
  }
  function escape(key) {
    var escaperLookup = { "=": "=0", ":": "=2" };
    return "$" + key.replace(/[=:]/g, function(match) {
      return escaperLookup[match];
    });
  }
  var userProvidedKeyEscapeRegex = /\/+/g;
  function getElementKey(element, index) {
    return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
  }
  function resolveThenable(thenable) {
    switch (thenable.status) {
      case "fulfilled":
        return thenable.value;
      case "rejected":
        throw thenable.reason;
      default:
        switch ("string" === typeof thenable.status ? thenable.then(noop2, noop2) : (thenable.status = "pending", thenable.then(
          function(fulfilledValue) {
            "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
          },
          function(error) {
            "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
          }
        )), thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenable.reason;
        }
    }
    throw thenable;
  }
  function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
    var type = typeof children;
    if ("undefined" === type || "boolean" === type) children = null;
    var invokeCallback = false;
    if (null === children) invokeCallback = true;
    else
      switch (type) {
        case "bigint":
        case "string":
        case "number":
          invokeCallback = true;
          break;
        case "object":
          switch (children.$$typeof) {
            case REACT_ELEMENT_TYPE:
            case REACT_PORTAL_TYPE:
              invokeCallback = true;
              break;
            case REACT_LAZY_TYPE:
              return invokeCallback = children._init, mapIntoArray(
                invokeCallback(children._payload),
                array,
                escapedPrefix,
                nameSoFar,
                callback
              );
          }
      }
    if (invokeCallback)
      return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
        return c;
      })) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(
        callback,
        escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(
          userProvidedKeyEscapeRegex,
          "$&/"
        ) + "/") + invokeCallback
      )), array.push(callback)), 1;
    invokeCallback = 0;
    var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
    if (isArrayImpl(children))
      for (var i = 0; i < children.length; i++)
        nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
          nameSoFar,
          array,
          escapedPrefix,
          type,
          callback
        );
    else if (i = getIteratorFn(children), "function" === typeof i)
      for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
        nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
          nameSoFar,
          array,
          escapedPrefix,
          type,
          callback
        );
    else if ("object" === type) {
      if ("function" === typeof children.then)
        return mapIntoArray(
          resolveThenable(children),
          array,
          escapedPrefix,
          nameSoFar,
          callback
        );
      array = String(children);
      throw Error(
        "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return invokeCallback;
  }
  function mapChildren(children, func, context) {
    if (null == children) return children;
    var result = [], count = 0;
    mapIntoArray(children, result, "", "", function(child) {
      return func.call(context, child, count++);
    });
    return result;
  }
  function lazyInitializer(payload) {
    if (-1 === payload._status) {
      var ctor = payload._result, thenable = ctor();
      thenable.then(
        function(moduleObject) {
          if (0 === payload._status || -1 === payload._status)
            payload._status = 1, payload._result = moduleObject, void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
        },
        function(error) {
          if (0 === payload._status || -1 === payload._status)
            payload._status = 2, payload._result = error, void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
        }
      );
      -1 === payload._status && (payload._status = 0, payload._result = thenable);
    }
    if (1 === payload._status) return payload._result.default;
    throw payload._result;
  }
  var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
    if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
      var event = new window.ErrorEvent("error", {
        bubbles: true,
        cancelable: true,
        message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
        error
      });
      if (!window.dispatchEvent(event)) return;
    } else if ("object" === typeof process && "function" === typeof process.emit) {
      process.emit("uncaughtException", error);
      return;
    }
    console.error(error);
  };
  function startTransition(scope) {
    var prevTransition = ReactSharedInternals.T, currentTransition = {};
    currentTransition.types = null !== prevTransition ? prevTransition.types : null;
    ReactSharedInternals.T = currentTransition;
    try {
      var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
      null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
      "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop2, reportGlobalError);
    } catch (error) {
      reportGlobalError(error);
    } finally {
      null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
    }
  }
  function addTransitionType(type) {
    var transition = ReactSharedInternals.T;
    if (null !== transition) {
      var transitionTypes = transition.types;
      null === transitionTypes ? transition.types = [type] : -1 === transitionTypes.indexOf(type) && transitionTypes.push(type);
    } else startTransition(addTransitionType.bind(null, type));
  }
  var Children = {
    map: mapChildren,
    forEach: function(children, forEachFunc, forEachContext) {
      mapChildren(
        children,
        function() {
          forEachFunc.apply(this, arguments);
        },
        forEachContext
      );
    },
    count: function(children) {
      var n = 0;
      mapChildren(children, function() {
        n++;
      });
      return n;
    },
    toArray: function(children) {
      return mapChildren(children, function(child) {
        return child;
      }) || [];
    },
    only: function(children) {
      if (!isValidElement(children))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return children;
    }
  };
  react_production.Activity = REACT_ACTIVITY_TYPE;
  react_production.Children = Children;
  react_production.Component = Component;
  react_production.Fragment = REACT_FRAGMENT_TYPE;
  react_production.Profiler = REACT_PROFILER_TYPE;
  react_production.PureComponent = PureComponent;
  react_production.StrictMode = REACT_STRICT_MODE_TYPE;
  react_production.Suspense = REACT_SUSPENSE_TYPE;
  react_production.ViewTransition = REACT_VIEW_TRANSITION_TYPE;
  react_production.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
  react_production.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(size) {
      return ReactSharedInternals.H.useMemoCache(size);
    }
  };
  react_production.addTransitionType = addTransitionType;
  react_production.cache = function(fn) {
    return function() {
      return fn.apply(null, arguments);
    };
  };
  react_production.cacheSignal = function() {
    return null;
  };
  react_production.cloneElement = function(element, config, children) {
    if (null === element || void 0 === element)
      throw Error(
        "The argument must be a React element, but you passed " + element + "."
      );
    var props = assign({}, element.props), key = element.key;
    if (null != config)
      for (propName in void 0 !== config.key && (key = "" + config.key), config)
        !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
    var propName = arguments.length - 2;
    if (1 === propName) props.children = children;
    else if (1 < propName) {
      for (var childArray = Array(propName), i = 0; i < propName; i++)
        childArray[i] = arguments[i + 2];
      props.children = childArray;
    }
    return ReactElement(element.type, key, props);
  };
  react_production.createContext = function(defaultValue) {
    defaultValue = {
      $$typeof: REACT_CONTEXT_TYPE,
      _currentValue: defaultValue,
      _currentValue2: defaultValue,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    };
    defaultValue.Provider = defaultValue;
    defaultValue.Consumer = {
      $$typeof: REACT_CONSUMER_TYPE,
      _context: defaultValue
    };
    return defaultValue;
  };
  react_production.createElement = function(type, config, children) {
    var propName, props = {}, key = null;
    if (null != config)
      for (propName in void 0 !== config.key && (key = "" + config.key), config)
        hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
    var childrenLength = arguments.length - 2;
    if (1 === childrenLength) props.children = children;
    else if (1 < childrenLength) {
      for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
        childArray[i] = arguments[i + 2];
      props.children = childArray;
    }
    if (type && type.defaultProps)
      for (propName in childrenLength = type.defaultProps, childrenLength)
        void 0 === props[propName] && (props[propName] = childrenLength[propName]);
    return ReactElement(type, key, props);
  };
  react_production.createRef = function() {
    return { current: null };
  };
  react_production.forwardRef = function(render) {
    return { $$typeof: REACT_FORWARD_REF_TYPE, render };
  };
  react_production.isValidElement = isValidElement;
  react_production.lazy = function(ctor) {
    return {
      $$typeof: REACT_LAZY_TYPE,
      _payload: { _status: -1, _result: ctor },
      _init: lazyInitializer
    };
  };
  react_production.memo = function(type, compare) {
    return {
      $$typeof: REACT_MEMO_TYPE,
      type,
      compare: void 0 === compare ? null : compare
    };
  };
  react_production.startTransition = startTransition;
  react_production.unstable_useCacheRefresh = function() {
    return ReactSharedInternals.H.useCacheRefresh();
  };
  react_production.use = function(usable) {
    return ReactSharedInternals.H.use(usable);
  };
  react_production.useActionState = function(action, initialState, permalink) {
    return ReactSharedInternals.H.useActionState(action, initialState, permalink);
  };
  react_production.useCallback = function(callback, deps) {
    return ReactSharedInternals.H.useCallback(callback, deps);
  };
  react_production.useContext = function(Context) {
    return ReactSharedInternals.H.useContext(Context);
  };
  react_production.useDebugValue = function() {
  };
  react_production.useDeferredValue = function(value, initialValue) {
    return ReactSharedInternals.H.useDeferredValue(value, initialValue);
  };
  react_production.useEffect = function(create, deps) {
    return ReactSharedInternals.H.useEffect(create, deps);
  };
  react_production.useEffectEvent = function(callback) {
    return ReactSharedInternals.H.useEffectEvent(callback);
  };
  react_production.useId = function() {
    return ReactSharedInternals.H.useId();
  };
  react_production.useImperativeHandle = function(ref, create, deps) {
    return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
  };
  react_production.useInsertionEffect = function(create, deps) {
    return ReactSharedInternals.H.useInsertionEffect(create, deps);
  };
  react_production.useLayoutEffect = function(create, deps) {
    return ReactSharedInternals.H.useLayoutEffect(create, deps);
  };
  react_production.useMemo = function(create, deps) {
    return ReactSharedInternals.H.useMemo(create, deps);
  };
  react_production.useOptimistic = function(passthrough, reducer) {
    return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
  };
  react_production.useReducer = function(reducer, initialArg, init) {
    return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
  };
  react_production.useRef = function(initialValue) {
    return ReactSharedInternals.H.useRef(initialValue);
  };
  react_production.useState = function(initialState) {
    return ReactSharedInternals.H.useState(initialState);
  };
  react_production.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
    return ReactSharedInternals.H.useSyncExternalStore(
      subscribe,
      getSnapshot,
      getServerSnapshot
    );
  };
  react_production.useTransition = function() {
    return ReactSharedInternals.H.useTransition();
  };
  react_production.version = "19.3.0";
  return react_production;
}
var hasRequiredReact;
function requireReact() {
  if (hasRequiredReact) return react.exports;
  hasRequiredReact = 1;
  {
    react.exports = requireReact_production();
  }
  return react.exports;
}
var reactDom = { exports: {} };
var reactDom_production = {};
var hasRequiredReactDom_production;
function requireReactDom_production() {
  if (hasRequiredReactDom_production) return reactDom_production;
  hasRequiredReactDom_production = 1;
  var React2 = requireReact();
  function formatProdErrorMessage(code) {
    var url = "https://react.dev/errors/" + code;
    if (1 < arguments.length) {
      url += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var i = 2; i < arguments.length; i++)
        url += "&args[]=" + encodeURIComponent(arguments[i]);
    }
    return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function noop2() {
  }
  var Internals = {
    d: {
      f: noop2,
      r: function() {
        throw Error(formatProdErrorMessage(522));
      },
      D: noop2,
      C: noop2,
      L: noop2,
      m: noop2,
      X: noop2,
      S: noop2,
      M: noop2
    },
    p: 0,
    findDOMNode: null
  }, REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_RECOVERABLE_TYPE = /* @__PURE__ */ Symbol.for("react.recoverable"), REACT_OPTIMISTIC_KEY = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function createPortal$1(children, containerInfo, implementation) {
    var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
    return {
      $$typeof: REACT_PORTAL_TYPE,
      key: null == key ? null : key === REACT_OPTIMISTIC_KEY ? REACT_OPTIMISTIC_KEY : "" + key,
      children,
      containerInfo,
      implementation
    };
  }
  var ReactSharedInternals = React2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function getCrossOriginStringAs(as, input) {
    if ("font" === as) return "";
    if ("string" === typeof input)
      return "use-credentials" === input ? input : "";
  }
  reactDom_production.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
  reactDom_production.browser = function(reason) {
    return { $$typeof: REACT_RECOVERABLE_TYPE, _reason: reason };
  };
  reactDom_production.createPortal = function(children, container) {
    var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
    if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType)
      throw Error(formatProdErrorMessage(299));
    return createPortal$1(children, container, null, key);
  };
  reactDom_production.flushSync = function(fn) {
    var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
    try {
      if (ReactSharedInternals.T = null, Internals.p = 2, fn) return fn();
    } finally {
      ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
    }
  };
  reactDom_production.preconnect = function(href, options) {
    "string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
  };
  reactDom_production.prefetchDNS = function(href) {
    "string" === typeof href && Internals.d.D(href);
  };
  reactDom_production.preinit = function(href, options) {
    if ("string" === typeof href && options && "string" === typeof options.as) {
      var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
      "style" === as ? Internals.d.S(
        href,
        "string" === typeof options.precedence ? options.precedence : void 0,
        {
          crossOrigin,
          integrity,
          fetchPriority
        }
      ) : "script" === as && Internals.d.X(href, {
        crossOrigin,
        integrity,
        fetchPriority,
        nonce: "string" === typeof options.nonce ? options.nonce : void 0
      });
    }
  };
  reactDom_production.preinitModule = function(href, options) {
    if ("string" === typeof href)
      if ("object" === typeof options && null !== options) {
        if (null == options.as || "script" === options.as) {
          var crossOrigin = getCrossOriginStringAs(
            options.as,
            options.crossOrigin
          );
          Internals.d.M(href, {
            crossOrigin,
            integrity: "string" === typeof options.integrity ? options.integrity : void 0,
            nonce: "string" === typeof options.nonce ? options.nonce : void 0,
            fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0
          });
        }
      } else null == options && Internals.d.M(href);
  };
  reactDom_production.preload = function(href, options) {
    if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
      var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
      Internals.d.L(href, as, {
        crossOrigin,
        integrity: "string" === typeof options.integrity ? options.integrity : void 0,
        nonce: "string" === typeof options.nonce ? options.nonce : void 0,
        type: "string" === typeof options.type ? options.type : void 0,
        fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
        referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
        imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
        imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
        media: "string" === typeof options.media ? options.media : void 0
      });
    }
  };
  reactDom_production.preloadModule = function(href, options) {
    if ("string" === typeof href)
      if (options) {
        var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
        Internals.d.m(href, {
          as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
          crossOrigin,
          integrity: "string" === typeof options.integrity ? options.integrity : void 0,
          nonce: "string" === typeof options.nonce ? options.nonce : void 0,
          fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0
        });
      } else Internals.d.m(href);
  };
  reactDom_production.requestFormReset = function(form) {
    Internals.d.r(form);
  };
  reactDom_production.unstable_batchedUpdates = function(fn, a) {
    return fn(a);
  };
  reactDom_production.useFormState = function(action, initialState, permalink) {
    return ReactSharedInternals.H.useFormState(action, initialState, permalink);
  };
  reactDom_production.useFormStatus = function() {
    return ReactSharedInternals.H.useHostTransitionStatus();
  };
  reactDom_production.version = "19.3.0";
  return reactDom_production;
}
var hasRequiredReactDom;
function requireReactDom() {
  if (hasRequiredReactDom) return reactDom.exports;
  hasRequiredReactDom = 1;
  function checkDCE() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
      return;
    }
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
    } catch (err) {
      console.error(err);
    }
  }
  {
    checkDCE();
    reactDom.exports = requireReactDom_production();
  }
  return reactDom.exports;
}
var hasRequiredReactDomClient_production;
function requireReactDomClient_production() {
  if (hasRequiredReactDomClient_production) return reactDomClient_production;
  hasRequiredReactDomClient_production = 1;
  var Scheduler = requireScheduler(), React2 = requireReact(), ReactDOM = requireReactDom();
  function formatProdErrorMessage(code) {
    var url = "https://react.dev/errors/" + code;
    if (1 < arguments.length) {
      url += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var i = 2; i < arguments.length; i++)
        url += "&args[]=" + encodeURIComponent(arguments[i]);
    }
    return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function isValidContainer(node) {
    return !(!node || 1 !== node.nodeType && 9 !== node.nodeType && 11 !== node.nodeType);
  }
  function getNearestMountedFiber(fiber) {
    for (var node = fiber, nextNode = node; nextNode && !nextNode.alternate; )
      node = nextNode, 0 !== (node.flags & 4098) && (fiber = node.return), nextNode = node.return;
    for (; node.return; ) node = node.return;
    return 3 === node.tag ? fiber : null;
  }
  function getSuspenseInstanceFromFiber(fiber) {
    if (13 === fiber.tag) {
      var suspenseState = fiber.memoizedState;
      null === suspenseState && (fiber = fiber.alternate, null !== fiber && (suspenseState = fiber.memoizedState));
      if (null !== suspenseState) return suspenseState.dehydrated;
    }
    return null;
  }
  function getActivityInstanceFromFiber(fiber) {
    if (31 === fiber.tag) {
      var activityState = fiber.memoizedState;
      null === activityState && (fiber = fiber.alternate, null !== fiber && (activityState = fiber.memoizedState));
      if (null !== activityState) return activityState.dehydrated;
    }
    return null;
  }
  function assertIsMounted(fiber) {
    if (getNearestMountedFiber(fiber) !== fiber)
      throw Error(formatProdErrorMessage(188));
  }
  function findCurrentFiberUsingSlowPath(fiber) {
    var alternate = fiber.alternate;
    if (!alternate) {
      alternate = getNearestMountedFiber(fiber);
      if (null === alternate) throw Error(formatProdErrorMessage(188));
      return alternate !== fiber ? null : fiber;
    }
    for (var a = fiber, b = alternate; ; ) {
      var parentA = a.return;
      if (null === parentA) break;
      var parentB = parentA.alternate;
      if (null === parentB) {
        b = parentA.return;
        if (null !== b) {
          a = b;
          continue;
        }
        break;
      }
      if (parentA.child === parentB.child) {
        for (parentB = parentA.child; parentB; ) {
          if (parentB === a) return assertIsMounted(parentA), fiber;
          if (parentB === b) return assertIsMounted(parentA), alternate;
          parentB = parentB.sibling;
        }
        throw Error(formatProdErrorMessage(188));
      }
      if (a.return !== b.return) a = parentA, b = parentB;
      else {
        for (var didFindChild = false, child$0 = parentA.child; child$0; ) {
          if (child$0 === a) {
            didFindChild = true;
            a = parentA;
            b = parentB;
            break;
          }
          if (child$0 === b) {
            didFindChild = true;
            b = parentA;
            a = parentB;
            break;
          }
          child$0 = child$0.sibling;
        }
        if (!didFindChild) {
          for (child$0 = parentB.child; child$0; ) {
            if (child$0 === a) {
              didFindChild = true;
              a = parentB;
              b = parentA;
              break;
            }
            if (child$0 === b) {
              didFindChild = true;
              b = parentB;
              a = parentA;
              break;
            }
            child$0 = child$0.sibling;
          }
          if (!didFindChild) throw Error(formatProdErrorMessage(189));
        }
      }
      if (a.alternate !== b) throw Error(formatProdErrorMessage(190));
    }
    if (3 !== a.tag) throw Error(formatProdErrorMessage(188));
    return a.stateNode.current === a ? fiber : alternate;
  }
  function findCurrentHostFiberImpl(node) {
    var tag = node.tag;
    if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return node;
    for (node = node.child; null !== node; ) {
      tag = findCurrentHostFiberImpl(node);
      if (null !== tag) return tag;
      node = node.sibling;
    }
    return null;
  }
  function traverseVisibleInstancesAndTextInstances(child, searchWithinHosts, fn, a, b, c) {
    for (; null !== child; ) {
      if ((5 === child.tag || 27 === child.tag || 6 === child.tag) && fn(child, a, b, c) || (22 !== child.tag || null === child.memoizedState) && (searchWithinHosts || 5 !== child.tag && 27 !== child.tag) && traverseVisibleInstancesAndTextInstances(
        child.child,
        searchWithinHosts,
        fn,
        a,
        b,
        c
      ))
        return true;
      child = child.sibling;
    }
    return false;
  }
  function getFragmentParentInstanceOrContainerFiber(fiber) {
    for (fiber = fiber.return; null !== fiber; ) {
      if (3 === fiber.tag || 5 === fiber.tag || 27 === fiber.tag) return fiber;
      fiber = fiber.return;
    }
    return null;
  }
  function fiberIsPortaledIntoHost(fiber) {
    var foundPortalParent = false;
    for (fiber = fiber.return; null !== fiber; ) {
      4 === fiber.tag && (foundPortalParent = true);
      if (3 === fiber.tag || 5 === fiber.tag || 27 === fiber.tag) break;
      fiber = fiber.return;
    }
    return foundPortalParent;
  }
  function getFragmentInstanceOrTextInstanceSiblings(fiber) {
    var result = [null, null], parentHostFiber = getFragmentParentInstanceOrContainerFiber(fiber);
    if (null === parentHostFiber) return result;
    findFragmentInstanceOrTextInstanceSiblings(
      result,
      fiber,
      parentHostFiber.child,
      { foundSelf: false }
    );
    return result;
  }
  function findFragmentInstanceOrTextInstanceSiblings(result, self, child, state) {
    for (; null !== child; ) {
      if (child === self) state.foundSelf = true;
      else if (5 === child.tag || 27 === child.tag || 6 === child.tag) {
        if (state.foundSelf) return result[1] = child, true;
        result[0] = child;
      } else if ((22 !== child.tag || null === child.memoizedState) && findFragmentInstanceOrTextInstanceSiblings(
        result,
        self,
        child.child,
        state
      ))
        return true;
      child = child.sibling;
    }
    return false;
  }
  function getInstanceFromHostFiber(fiber) {
    switch (fiber.tag) {
      case 5:
      case 27:
      case 6:
        return fiber.stateNode;
      case 3:
        return fiber.stateNode.containerInfo;
      default:
        throw Error(formatProdErrorMessage(559));
    }
  }
  var searchTarget = null, searchBoundary = null;
  function isFiberPrecedingCheck(child, target, boundary) {
    return child === boundary ? true : child === target ? (searchTarget = child, true) : false;
  }
  function isFiberFollowingCheck(child, target, boundary) {
    return child === boundary ? (searchBoundary = child, false) : child === target ? (null !== searchBoundary && (searchTarget = child), true) : false;
  }
  function getParentForFragmentAncestors(inst) {
    if (null === inst) return null;
    do
      inst = null === inst ? null : inst.return;
    while (inst && 5 !== inst.tag && 27 !== inst.tag && 3 !== inst.tag);
    return inst ? inst : null;
  }
  function getLowestCommonAncestor(instA, instB, getParent3) {
    for (var depthA = 0, tempA = instA; tempA; tempA = getParent3(tempA)) depthA++;
    tempA = 0;
    for (var tempB = instB; tempB; tempB = getParent3(tempB)) tempA++;
    for (; 0 < depthA - tempA; ) instA = getParent3(instA), depthA--;
    for (; 0 < tempA - depthA; ) instB = getParent3(instB), tempA--;
    for (; depthA--; ) {
      if (instA === instB || null !== instB && instA === instB.alternate)
        return instA;
      instA = getParent3(instA);
      instB = getParent3(instB);
    }
    return null;
  }
  var assign = Object.assign, REACT_LEGACY_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.element"), REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
  var REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"), REACT_LEGACY_HIDDEN_TYPE = /* @__PURE__ */ Symbol.for("react.legacy_hidden");
  var REACT_MEMO_CACHE_SENTINEL = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), REACT_VIEW_TRANSITION_TYPE = /* @__PURE__ */ Symbol.for("react.view_transition"), REACT_RECOVERABLE_TYPE = /* @__PURE__ */ Symbol.for("react.recoverable"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
  function getIteratorFn(maybeIterable) {
    if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
    maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
    return "function" === typeof maybeIterable ? maybeIterable : null;
  }
  var REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference");
  function getComponentNameFromType(type) {
    if (null == type) return null;
    if ("function" === typeof type)
      return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
    if ("string" === typeof type) return type;
    switch (type) {
      case REACT_FRAGMENT_TYPE:
        return "Fragment";
      case REACT_PROFILER_TYPE:
        return "Profiler";
      case REACT_STRICT_MODE_TYPE:
        return "StrictMode";
      case REACT_SUSPENSE_TYPE:
        return "Suspense";
      case REACT_SUSPENSE_LIST_TYPE:
        return "SuspenseList";
      case REACT_ACTIVITY_TYPE:
        return "Activity";
      case REACT_VIEW_TRANSITION_TYPE:
        return "ViewTransition";
    }
    if ("object" === typeof type)
      switch (type.$$typeof) {
        case REACT_PORTAL_TYPE:
          return "Portal";
        case REACT_CONTEXT_TYPE:
          return type.displayName || "Context";
        case REACT_CONSUMER_TYPE:
          return (type._context.displayName || "Context") + ".Consumer";
        case REACT_FORWARD_REF_TYPE:
          var innerType = type.render;
          type = type.displayName;
          type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
          return type;
        case REACT_MEMO_TYPE:
          return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
        case REACT_LAZY_TYPE:
          innerType = type._payload;
          type = type._init;
          try {
            return getComponentNameFromType(type(innerType));
          } catch (x) {
          }
      }
    return null;
  }
  var isArrayImpl = Array.isArray, ReactSharedInternals = React2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, sharedNotPendingObject = {
    pending: false,
    data: null,
    method: null,
    action: null
  }, valueStack = [], index = -1;
  function createCursor(defaultValue) {
    return { current: defaultValue };
  }
  function pop(cursor) {
    0 > index || (cursor.current = valueStack[index], valueStack[index] = null, index--);
  }
  function push(cursor, value) {
    index++;
    valueStack[index] = cursor.current;
    cursor.current = value;
  }
  var contextStackCursor = createCursor(null), contextFiberStackCursor = createCursor(null), rootInstanceStackCursor = createCursor(null), hostTransitionProviderCursor = createCursor(null);
  function pushHostContainer(fiber, nextRootInstance) {
    push(rootInstanceStackCursor, nextRootInstance);
    push(contextFiberStackCursor, fiber);
    push(contextStackCursor, null);
    switch (nextRootInstance.nodeType) {
      case 9:
      case 11:
        fiber = (fiber = nextRootInstance.documentElement) ? (fiber = fiber.namespaceURI) ? getOwnHostContext(fiber) : 0 : 0;
        break;
      default:
        if (fiber = nextRootInstance.tagName, nextRootInstance = nextRootInstance.namespaceURI)
          nextRootInstance = getOwnHostContext(nextRootInstance), fiber = getChildHostContextProd(nextRootInstance, fiber);
        else
          switch (fiber) {
            case "svg":
              fiber = 1;
              break;
            case "math":
              fiber = 2;
              break;
            default:
              fiber = 0;
          }
    }
    pop(contextStackCursor);
    push(contextStackCursor, fiber);
  }
  function popHostContainer() {
    pop(contextStackCursor);
    pop(contextFiberStackCursor);
    pop(rootInstanceStackCursor);
  }
  function pushHostContext(fiber) {
    var stateHook = fiber.memoizedState;
    null !== stateHook && (HostTransitionContext._currentValue = stateHook.memoizedState, push(hostTransitionProviderCursor, fiber));
    stateHook = contextStackCursor.current;
    var JSCompiler_inline_result = getChildHostContextProd(stateHook, fiber.type);
    stateHook !== JSCompiler_inline_result && (push(contextFiberStackCursor, fiber), push(contextStackCursor, JSCompiler_inline_result));
  }
  function popHostContext(fiber) {
    contextFiberStackCursor.current === fiber && (pop(contextStackCursor), pop(contextFiberStackCursor));
    hostTransitionProviderCursor.current === fiber && (pop(hostTransitionProviderCursor), HostTransitionContext._currentValue = sharedNotPendingObject);
  }
  var prefix, suffix;
  function describeBuiltInComponentFrame(name) {
    if (void 0 === prefix)
      try {
        throw Error();
      } catch (x) {
        var match = x.stack.trim().match(/\n( *(at )?)/);
        prefix = match && match[1] || "";
        suffix = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return "\n" + prefix + name + suffix;
  }
  var reentry = false;
  function describeNativeComponentFrame(fn, construct) {
    if (!fn || reentry) return "";
    reentry = true;
    var previousPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var RunInRootFrame = {
        DetermineComponentFrameRoot: function() {
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if ("object" === typeof Reflect && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  var control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x$1) {
                  control = x$1;
                }
                Fake = false;
                try {
                  var prevProps = Object.getOwnPropertyDescriptor(
                    fn.prototype,
                    "props"
                  );
                  Object.defineProperty(fn.prototype, "props", {
                    configurable: true,
                    set: function() {
                      throw Error();
                    }
                  });
                  Fake = true;
                  new fn();
                } finally {
                  Fake && (void 0 !== prevProps ? Object.defineProperty(fn.prototype, "props", prevProps) : delete fn.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (x$2) {
                control = x$2;
              }
              (Fake = fn()) && "function" === typeof Fake.catch && Fake.catch(function() {
              });
            }
          } catch (sample) {
            if (sample && control && "string" === typeof sample.stack)
              return [sample.stack, control.stack];
          }
          return [null, null];
        }
      };
      RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var namePropDescriptor = Object.getOwnPropertyDescriptor(
        RunInRootFrame.DetermineComponentFrameRoot,
        "name"
      );
      namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(
        RunInRootFrame.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
      if (sampleStack && controlStack) {
        var sampleLines = sampleStack.split("\n"), controlLines = controlStack.split("\n");
        for (namePropDescriptor = RunInRootFrame = 0; RunInRootFrame < sampleLines.length && !sampleLines[RunInRootFrame].includes("DetermineComponentFrameRoot"); )
          RunInRootFrame++;
        for (; namePropDescriptor < controlLines.length && !controlLines[namePropDescriptor].includes(
          "DetermineComponentFrameRoot"
        ); )
          namePropDescriptor++;
        if (RunInRootFrame === sampleLines.length || namePropDescriptor === controlLines.length)
          for (RunInRootFrame = sampleLines.length - 1, namePropDescriptor = controlLines.length - 1; 1 <= RunInRootFrame && 0 <= namePropDescriptor && sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]; )
            namePropDescriptor--;
        for (; 1 <= RunInRootFrame && 0 <= namePropDescriptor; RunInRootFrame--, namePropDescriptor--)
          if (sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
            if (1 !== RunInRootFrame || 1 !== namePropDescriptor) {
              do
                if (RunInRootFrame--, namePropDescriptor--, 0 > namePropDescriptor || sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
                  var frame = "\n" + sampleLines[RunInRootFrame].replace(" at new ", " at ");
                  fn.displayName && frame.includes("<anonymous>") && (frame = frame.replace("<anonymous>", fn.displayName));
                  return frame;
                }
              while (1 <= RunInRootFrame && 0 <= namePropDescriptor);
            }
            break;
          }
      }
    } finally {
      reentry = false, Error.prepareStackTrace = previousPrepareStackTrace;
    }
    return (previousPrepareStackTrace = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(previousPrepareStackTrace) : "";
  }
  function describeFiber(fiber, childFiber) {
    switch (fiber.tag) {
      case 26:
      case 27:
      case 5:
        return describeBuiltInComponentFrame(fiber.type);
      case 16:
        return describeBuiltInComponentFrame("Lazy");
      case 13:
        return fiber.child !== childFiber && null !== childFiber ? describeBuiltInComponentFrame("Suspense Fallback") : describeBuiltInComponentFrame("Suspense");
      case 19:
        return describeBuiltInComponentFrame("SuspenseList");
      case 0:
      case 15:
        return describeNativeComponentFrame(fiber.type, false);
      case 11:
        return describeNativeComponentFrame(fiber.type.render, false);
      case 1:
        return describeNativeComponentFrame(fiber.type, true);
      case 31:
        return describeBuiltInComponentFrame("Activity");
      case 30:
        return describeBuiltInComponentFrame("ViewTransition");
      default:
        return "";
    }
  }
  function getStackByFiberInDevAndProd(workInProgress2) {
    try {
      var info = "", previous = null;
      do
        info += describeFiber(workInProgress2, previous), previous = workInProgress2, workInProgress2 = workInProgress2.return;
      while (workInProgress2);
      return info;
    } catch (x) {
      return "\nError generating stack: " + x.message + "\n" + x.stack;
    }
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty, scheduleCallback$3 = Scheduler.unstable_scheduleCallback, cancelCallback$1 = Scheduler.unstable_cancelCallback, shouldYield = Scheduler.unstable_shouldYield, requestPaint = Scheduler.unstable_requestPaint, now = Scheduler.unstable_now, getCurrentPriorityLevel = Scheduler.unstable_getCurrentPriorityLevel, ImmediatePriority = Scheduler.unstable_ImmediatePriority, UserBlockingPriority = Scheduler.unstable_UserBlockingPriority, NormalPriority$1 = Scheduler.unstable_NormalPriority, LowPriority = Scheduler.unstable_LowPriority, IdlePriority = Scheduler.unstable_IdlePriority, log$1 = Scheduler.log, unstable_setDisableYieldValue = Scheduler.unstable_setDisableYieldValue, rendererID = null, injectedHook = null;
  function setIsStrictModeForDevtools(newIsStrictMode) {
    "function" === typeof log$1 && unstable_setDisableYieldValue(newIsStrictMode);
    if (injectedHook && "function" === typeof injectedHook.setStrictMode)
      try {
        injectedHook.setStrictMode(rendererID, newIsStrictMode);
      } catch (err) {
      }
  }
  var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback, log = Math.log, LN2 = Math.LN2;
  function clz32Fallback(x) {
    x >>>= 0;
    return 0 === x ? 32 : 31 - (log(x) / LN2 | 0) | 0;
  }
  var nextTransitionUpdateLane = 256, nextTransitionDeferredLane = 262144, nextRetryLane = 4194304;
  function getHighestPriorityLanes(lanes) {
    var pendingSyncLanes = lanes & 42;
    if (0 !== pendingSyncLanes) return pendingSyncLanes;
    switch (lanes & -lanes) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return lanes & -lanes;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return lanes & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return lanes & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return lanes;
    }
  }
  function getNextLanes(root2, wipLanes, rootHasPendingCommit) {
    var pendingLanes = root2.pendingLanes;
    if (0 === pendingLanes) return 0;
    var nextLanes = 0, suspendedLanes = root2.suspendedLanes, pingedLanes = root2.pingedLanes;
    root2 = root2.warmLanes;
    var nonIdlePendingLanes = pendingLanes & 134217727;
    0 !== nonIdlePendingLanes ? (pendingLanes = nonIdlePendingLanes & ~suspendedLanes, 0 !== pendingLanes ? nextLanes = getHighestPriorityLanes(pendingLanes) : (pingedLanes &= nonIdlePendingLanes, 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = nonIdlePendingLanes & ~root2, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))))) : (nonIdlePendingLanes = pendingLanes & ~suspendedLanes, 0 !== nonIdlePendingLanes ? nextLanes = getHighestPriorityLanes(nonIdlePendingLanes) : 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = pendingLanes & ~root2, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))));
    return 0 === nextLanes ? 0 : 0 !== wipLanes && wipLanes !== nextLanes && 0 === (wipLanes & suspendedLanes) && (suspendedLanes = nextLanes & -nextLanes, rootHasPendingCommit = wipLanes & -wipLanes, suspendedLanes >= rootHasPendingCommit || 32 === suspendedLanes && 0 !== (rootHasPendingCommit & 4194048)) ? wipLanes : nextLanes;
  }
  function checkIfRootIsPrerendering(root2, renderLanes2) {
    return 0 === (root2.pendingLanes & ~(root2.suspendedLanes & ~root2.pingedLanes) & renderLanes2);
  }
  function getEntangledLanes(root2, renderLanes2) {
    0 !== (renderLanes2 & 8) && (renderLanes2 |= renderLanes2 & 32);
    var allEntangledLanes = root2.entangledLanes;
    if (0 !== allEntangledLanes)
      for (root2 = root2.entanglements, allEntangledLanes &= renderLanes2; 0 < allEntangledLanes; ) {
        var index$4 = 31 - clz32(allEntangledLanes), lane = 1 << index$4;
        renderLanes2 |= root2[index$4];
        allEntangledLanes &= ~lane;
      }
    return renderLanes2;
  }
  function computeExpirationTime(lane, currentTime) {
    switch (lane) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return currentTime + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return currentTime + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function claimNextRetryLane() {
    var lane = nextRetryLane;
    nextRetryLane <<= 1;
    0 === (nextRetryLane & 62914560) && (nextRetryLane = 4194304);
    return lane;
  }
  function createLaneMap(initial) {
    for (var laneMap = [], i = 0; 31 > i; i++) laneMap.push(initial);
    return laneMap;
  }
  function markRootUpdated$1(root2, updateLane) {
    root2.pendingLanes |= updateLane;
    268435456 !== updateLane && (root2.suspendedLanes = 0, root2.pingedLanes = 0, root2.warmLanes = 0);
  }
  function markRootFinished(root2, finishedLanes, remainingLanes, spawnedLane, updatedLanes, suspendedRetryLanes) {
    var previouslyPendingLanes = root2.pendingLanes;
    root2.pendingLanes = remainingLanes;
    root2.suspendedLanes = 0;
    root2.pingedLanes = 0;
    root2.warmLanes = 0;
    root2.expiredLanes &= remainingLanes;
    root2.entangledLanes &= remainingLanes;
    root2.errorRecoveryDisabledLanes &= remainingLanes;
    root2.shellSuspendCounter = 0;
    var entanglements = root2.entanglements, expirationTimes = root2.expirationTimes, hiddenUpdates = root2.hiddenUpdates;
    for (remainingLanes = previouslyPendingLanes & ~remainingLanes; 0 < remainingLanes; ) {
      var index$7 = 31 - clz32(remainingLanes), lane = 1 << index$7;
      entanglements[index$7] = 0;
      expirationTimes[index$7] = -1;
      var hiddenUpdatesForLane = hiddenUpdates[index$7];
      if (null !== hiddenUpdatesForLane)
        for (hiddenUpdates[index$7] = null, index$7 = 0; index$7 < hiddenUpdatesForLane.length; index$7++) {
          var update = hiddenUpdatesForLane[index$7];
          null !== update && (update.lane &= -536870913);
        }
      remainingLanes &= ~lane;
    }
    0 !== spawnedLane && markSpawnedDeferredLane(root2, spawnedLane, 0);
    0 !== suspendedRetryLanes && 0 === updatedLanes && 0 !== root2.tag && (root2.suspendedLanes |= suspendedRetryLanes & ~(previouslyPendingLanes & ~finishedLanes));
  }
  function markSpawnedDeferredLane(root2, spawnedLane, entangledLanes) {
    root2.pendingLanes |= spawnedLane;
    root2.suspendedLanes &= ~spawnedLane;
    var spawnedLaneIndex = 31 - clz32(spawnedLane);
    root2.entangledLanes |= spawnedLane;
    root2.entanglements[spawnedLaneIndex] = root2.entanglements[spawnedLaneIndex] | 1073741824 | entangledLanes & 261930;
  }
  function markRootEntangled(root2, entangledLanes) {
    var rootEntangledLanes = root2.entangledLanes |= entangledLanes;
    for (root2 = root2.entanglements; rootEntangledLanes; ) {
      var index$8 = 31 - clz32(rootEntangledLanes), lane = 1 << index$8;
      lane & entangledLanes | root2[index$8] & entangledLanes && (root2[index$8] |= entangledLanes);
      rootEntangledLanes &= ~lane;
    }
  }
  function getBumpedLaneForHydration(root2, renderLanes2) {
    var renderLane = renderLanes2 & -renderLanes2;
    renderLane = 0 !== (renderLane & 42) ? 1 : getBumpedLaneForHydrationByLane(renderLane);
    return 0 !== (renderLane & (root2.suspendedLanes | renderLanes2)) ? 0 : renderLane;
  }
  function getBumpedLaneForHydrationByLane(lane) {
    switch (lane) {
      case 2:
        lane = 1;
        break;
      case 8:
        lane = 4;
        break;
      case 32:
        lane = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        lane = 128;
        break;
      case 268435456:
        lane = 134217728;
        break;
      default:
        lane = 0;
    }
    return lane;
  }
  function lanesToEventPriority(lanes) {
    lanes &= -lanes;
    return 2 < lanes ? 8 < lanes ? 0 !== (lanes & 134217727) ? 32 : 268435456 : 8 : 2;
  }
  function resolveUpdatePriority() {
    var updatePriority = ReactDOMSharedInternals.p;
    if (0 !== updatePriority) return updatePriority;
    updatePriority = window.event;
    return void 0 === updatePriority ? 32 : getEventPriority(updatePriority.type);
  }
  function runWithPriority(priority, fn) {
    var previousPriority = ReactDOMSharedInternals.p;
    try {
      return ReactDOMSharedInternals.p = priority, fn();
    } finally {
      ReactDOMSharedInternals.p = previousPriority;
    }
  }
  var randomKey = Math.random().toString(36).slice(2), internalInstanceKey = "__reactFiber$" + randomKey, internalPropsKey = "__reactProps$" + randomKey, internalContainerInstanceKey = "__reactContainer$" + randomKey, internalEventHandlersKey = "__reactEvents$" + randomKey, internalEventHandlerListenersKey = "__reactListeners$" + randomKey, internalEventHandlesSetKey = "__reactHandles$" + randomKey, internalRootNodeResourcesKey = "__reactResources$" + randomKey, internalHoistableMarker = "__reactMarker$" + randomKey, internalLoadPendingKey = "__reactLoad$" + randomKey;
  function detachDeletedInstance(node) {
    delete node[internalInstanceKey];
    delete node[internalPropsKey];
    delete node[internalEventHandlerListenersKey];
    delete node[internalEventHandlesSetKey];
  }
  function getClosestInstanceFromNode(targetNode) {
    var targetInst;
    if (targetInst = targetNode[internalInstanceKey]) return targetInst;
    for (var parentNode = targetNode.parentNode; parentNode; ) {
      if (targetInst = parentNode[internalContainerInstanceKey] || parentNode[internalInstanceKey]) {
        parentNode = targetInst.alternate;
        if (null !== targetInst.child || null !== parentNode && null !== parentNode.child)
          for (targetNode = getParentHydrationBoundary(targetNode); null !== targetNode; ) {
            if (parentNode = targetNode[internalInstanceKey]) return parentNode;
            targetNode = getParentHydrationBoundary(targetNode);
          }
        return targetInst;
      }
      targetNode = parentNode;
      parentNode = targetNode.parentNode;
    }
    return null;
  }
  function getInstanceFromNode(node) {
    if (node = node[internalInstanceKey] || node[internalContainerInstanceKey]) {
      var tag = node.tag;
      if (5 === tag || 6 === tag || 13 === tag || 31 === tag || 26 === tag || 27 === tag || 3 === tag)
        return node;
    }
    return null;
  }
  function getNodeFromInstance(inst) {
    var tag = inst.tag;
    if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return inst.stateNode;
    throw Error(formatProdErrorMessage(33));
  }
  function getResourcesFromRoot(root2) {
    var resources = root2[internalRootNodeResourcesKey];
    resources || (resources = root2[internalRootNodeResourcesKey] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() });
    return resources;
  }
  function markNodeAsHoistable(node) {
    node[internalHoistableMarker] = true;
  }
  function clearPendingLoadOnNode(node) {
    node[internalLoadPendingKey] = void 0;
  }
  var allNativeEvents = /* @__PURE__ */ new Set(), registrationNameDependencies = {};
  function registerTwoPhaseEvent(registrationName, dependencies) {
    registerDirectEvent(registrationName, dependencies);
    registerDirectEvent(registrationName + "Capture", dependencies);
  }
  function registerDirectEvent(registrationName, dependencies) {
    registrationNameDependencies[registrationName] = dependencies;
    for (registrationName = 0; registrationName < dependencies.length; registrationName++)
      allNativeEvents.add(dependencies[registrationName]);
  }
  var VALID_ATTRIBUTE_NAME_REGEX = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), illegalAttributeNameCache = {}, validatedAttributeNameCache = {};
  function isAttributeNameSafe(attributeName) {
    if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
      return true;
    if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return false;
    if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
      return validatedAttributeNameCache[attributeName] = true;
    illegalAttributeNameCache[attributeName] = true;
    return false;
  }
  var viewTransitionMutationContext = false;
  function pushMutationContext() {
    var prev = viewTransitionMutationContext;
    viewTransitionMutationContext = false;
    return prev;
  }
  function setValueForAttribute(node, name, value) {
    if (isAttributeNameSafe(name))
      if (null === value) node.removeAttribute(name);
      else {
        switch (typeof value) {
          case "undefined":
          case "function":
          case "symbol":
            node.removeAttribute(name);
            return;
          case "boolean":
            var prefix$10 = name.toLowerCase().slice(0, 5);
            if ("data-" !== prefix$10 && "aria-" !== prefix$10) {
              node.removeAttribute(name);
              return;
            }
        }
        node.setAttribute(name, value);
      }
  }
  function setValueForKnownAttribute(node, name, value) {
    if (null === value) node.removeAttribute(name);
    else {
      switch (typeof value) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          node.removeAttribute(name);
          return;
      }
      node.setAttribute(name, value);
    }
  }
  function setValueForNamespacedAttribute(node, namespace, name, value) {
    if (null === value) node.removeAttribute(name);
    else {
      switch (typeof value) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          node.removeAttribute(name);
          return;
      }
      node.setAttributeNS(namespace, name, value);
    }
  }
  function getToStringValue(value) {
    switch (typeof value) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return value;
      case "object":
        return value;
      default:
        return "";
    }
  }
  function isCheckable(elem) {
    var type = elem.type;
    return (elem = elem.nodeName) && "input" === elem.toLowerCase() && ("checkbox" === type || "radio" === type);
  }
  function trackValueOnNode(node, valueField, currentValue) {
    var descriptor = Object.getOwnPropertyDescriptor(
      node.constructor.prototype,
      valueField
    );
    if (!node.hasOwnProperty(valueField) && "undefined" !== typeof descriptor && "function" === typeof descriptor.get && "function" === typeof descriptor.set) {
      var get = descriptor.get, set = descriptor.set;
      Object.defineProperty(node, valueField, {
        configurable: true,
        get: function() {
          return get.call(this);
        },
        set: function(value) {
          currentValue = "" + value;
          set.call(this, value);
        }
      });
      Object.defineProperty(node, valueField, {
        enumerable: descriptor.enumerable
      });
      return {
        getValue: function() {
          return currentValue;
        },
        setValue: function(value) {
          currentValue = "" + value;
        },
        stopTracking: function() {
          node._valueTracker = null;
          delete node[valueField];
        }
      };
    }
  }
  function track(node) {
    if (!node._valueTracker) {
      var valueField = isCheckable(node) ? "checked" : "value";
      node._valueTracker = trackValueOnNode(
        node,
        valueField,
        "" + node[valueField]
      );
    }
  }
  function updateValueIfChanged(node) {
    if (!node) return false;
    var tracker = node._valueTracker;
    if (!tracker) return true;
    var lastValue = tracker.getValue();
    var value = "";
    node && (value = isCheckable(node) ? node.checked ? "true" : "false" : node.value);
    node = value;
    return node !== lastValue ? (tracker.setValue(node), true) : false;
  }
  var escapeSelectorAttributeValueInsideDoubleQuotesRegex = /[\n"\\]/g;
  function escapeSelectorAttributeValueInsideDoubleQuotes(value) {
    return value.replace(
      escapeSelectorAttributeValueInsideDoubleQuotesRegex,
      function(ch) {
        return "\\" + ch.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function updateInput(element, value, defaultValue, lastDefaultValue, checked, defaultChecked, type, name) {
    element.name = "";
    null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type ? element.type = type : element.removeAttribute("type");
    if (null != value)
      if ("number" === type) {
        if (0 === value && "" === element.value || element.value != value)
          element.value = "" + getToStringValue(value);
      } else
        element.value !== "" + getToStringValue(value) && (element.value = "" + getToStringValue(value));
    else
      "submit" !== type && "reset" !== type || element.removeAttribute("value");
    null != value ? "number" === type && element.value == value ? setDefaultValue(element, getToStringValue(element.value)) : setDefaultValue(element, getToStringValue(value)) : null != defaultValue ? setDefaultValue(element, getToStringValue(defaultValue)) : null != lastDefaultValue && element.removeAttribute("value");
    null == checked && null != defaultChecked && (element.defaultChecked = !!defaultChecked);
    null != checked && (element.checked = checked && "function" !== typeof checked && "symbol" !== typeof checked);
    null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name ? element.name = "" + getToStringValue(name) : element.removeAttribute("name");
  }
  function initInput(element, value, defaultValue, checked, defaultChecked, type, name, isHydrating2) {
    null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type && (element.type = type);
    if (null != value || null != defaultValue) {
      if (!("submit" !== type && "reset" !== type || void 0 !== value && null !== value)) {
        track(element);
        return;
      }
      defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
      value = null != value ? "" + getToStringValue(value) : defaultValue;
      isHydrating2 || value === element.value || (element.value = value);
      element.defaultValue = value;
    }
    checked = null != checked ? checked : defaultChecked;
    checked = "function" !== typeof checked && "symbol" !== typeof checked && !!checked;
    element.checked = isHydrating2 ? element.checked : !!checked;
    element.defaultChecked = !!checked;
    null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name && (element.name = name);
    track(element);
  }
  function setDefaultValue(node, value) {
    node.defaultValue !== "" + value && (node.defaultValue = "" + value);
  }
  function updateOptions(node, multiple, propValue, setDefaultSelected) {
    node = node.options;
    if (multiple) {
      multiple = {};
      for (var i = 0; i < propValue.length; i++)
        multiple["$" + propValue[i]] = true;
      for (propValue = 0; propValue < node.length; propValue++)
        i = multiple.hasOwnProperty("$" + node[propValue].value), node[propValue].selected !== i && (node[propValue].selected = i), i && setDefaultSelected && (node[propValue].defaultSelected = true);
    } else {
      propValue = "" + getToStringValue(propValue);
      multiple = null;
      for (i = 0; i < node.length; i++) {
        if (node[i].value === propValue) {
          node[i].selected = true;
          setDefaultSelected && (node[i].defaultSelected = true);
          return;
        }
        null !== multiple || node[i].disabled || (multiple = node[i]);
      }
      null !== multiple && (multiple.selected = true);
    }
  }
  function updateTextarea(element, value, defaultValue) {
    if (null != value && (value = "" + getToStringValue(value), value !== element.value && (element.value = value), null == defaultValue)) {
      element.defaultValue !== value && (element.defaultValue = value);
      return;
    }
    element.defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
  }
  function initTextarea(element, value, defaultValue, children) {
    if (null == value) {
      if (null != children) {
        if (null != defaultValue) throw Error(formatProdErrorMessage(92));
        if (isArrayImpl(children)) {
          if (1 < children.length) throw Error(formatProdErrorMessage(93));
          children = children[0];
        }
        defaultValue = children;
      }
      null == defaultValue && (defaultValue = "");
      value = defaultValue;
    }
    defaultValue = getToStringValue(value);
    element.defaultValue = defaultValue;
    children = element.textContent;
    children === defaultValue && "" !== children && null !== children && (element.value = children);
    track(element);
  }
  function setTextContent(node, text) {
    if (text) {
      var firstChild = node.firstChild;
      if (firstChild && firstChild === node.lastChild && 3 === firstChild.nodeType) {
        firstChild.nodeValue = text;
        return;
      }
    }
    node.textContent = text;
  }
  var unitlessNumbers = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function setValueForStyle(style2, styleName, value) {
    var isCustomProperty = 0 === styleName.indexOf("--");
    null == value || "boolean" === typeof value || "" === value ? isCustomProperty ? style2.setProperty(styleName, "") : "float" === styleName ? style2.cssFloat = "" : style2[styleName] = "" : isCustomProperty ? style2.setProperty(styleName, value) : "number" !== typeof value || 0 === value || unitlessNumbers.has(styleName) ? "float" === styleName ? style2.cssFloat = value : style2[styleName] = ("" + value).trim() : style2[styleName] = value + "px";
  }
  function setValueForStyles(node, styles, prevStyles) {
    if (null != styles && "object" !== typeof styles)
      throw Error(formatProdErrorMessage(62));
    node = node.style;
    if (null != prevStyles) {
      for (var styleName in prevStyles)
        !prevStyles.hasOwnProperty(styleName) || null != styles && styles.hasOwnProperty(styleName) || (0 === styleName.indexOf("--") ? node.setProperty(styleName, "") : "float" === styleName ? node.cssFloat = "" : node[styleName] = "", viewTransitionMutationContext = true);
      for (var styleName$16 in styles)
        styleName = styles[styleName$16], styles.hasOwnProperty(styleName$16) && prevStyles[styleName$16] !== styleName && (setValueForStyle(node, styleName$16, styleName), viewTransitionMutationContext = true);
    } else
      for (var styleName$17 in styles)
        styles.hasOwnProperty(styleName$17) && setValueForStyle(node, styleName$17, styles[styleName$17]);
  }
  function isCustomElement(tagName) {
    if (-1 === tagName.indexOf("-")) return false;
    switch (tagName) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }
  var aliases = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["maskType", "mask-type"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function sanitizeURL(url) {
    return isJavaScriptProtocol.test("" + url) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : url;
  }
  function noop$1() {
  }
  var currentReplayingEvent = null;
  function getEventTarget(nativeEvent) {
    nativeEvent = nativeEvent.target || nativeEvent.srcElement || window;
    nativeEvent.correspondingUseElement && (nativeEvent = nativeEvent.correspondingUseElement);
    return 3 === nativeEvent.nodeType ? nativeEvent.parentNode : nativeEvent;
  }
  var restoreTarget = null, restoreQueue = null;
  function restoreStateOfTarget(target) {
    var internalInstance = getInstanceFromNode(target);
    if (internalInstance && (target = internalInstance.stateNode)) {
      var props = target[internalPropsKey] || null;
      a: switch (target = internalInstance.stateNode, internalInstance.type) {
        case "input":
          updateInput(
            target,
            props.value,
            props.defaultValue,
            props.defaultValue,
            props.checked,
            props.defaultChecked,
            props.type,
            props.name
          );
          internalInstance = props.name;
          if ("radio" === props.type && null != internalInstance) {
            for (props = target; props.parentNode; ) props = props.parentNode;
            props = props.querySelectorAll(
              'input[name="' + escapeSelectorAttributeValueInsideDoubleQuotes(
                "" + internalInstance
              ) + '"][type="radio"]'
            );
            for (internalInstance = 0; internalInstance < props.length; internalInstance++) {
              var otherNode = props[internalInstance];
              if (otherNode !== target && otherNode.form === target.form) {
                var otherProps = otherNode[internalPropsKey] || null;
                if (!otherProps) throw Error(formatProdErrorMessage(90));
                updateInput(
                  otherNode,
                  otherProps.value,
                  otherProps.defaultValue,
                  otherProps.defaultValue,
                  otherProps.checked,
                  otherProps.defaultChecked,
                  otherProps.type,
                  otherProps.name
                );
              }
            }
            for (internalInstance = 0; internalInstance < props.length; internalInstance++)
              otherNode = props[internalInstance], otherNode.form === target.form && updateValueIfChanged(otherNode);
          }
          break a;
        case "textarea":
          updateTextarea(target, props.value, props.defaultValue);
          break a;
        case "select":
          internalInstance = props.value, null != internalInstance && updateOptions(target, !!props.multiple, internalInstance, false);
      }
    }
  }
  var isInsideEventHandler = false;
  function batchedUpdates$1(fn, a, b) {
    if (isInsideEventHandler) return fn(a, b);
    isInsideEventHandler = true;
    try {
      var JSCompiler_inline_result = fn(a);
      return JSCompiler_inline_result;
    } finally {
      if (isInsideEventHandler = false, null !== restoreTarget || null !== restoreQueue) {
        if (flushSyncWork$1(), restoreTarget && (a = restoreTarget, fn = restoreQueue, restoreQueue = restoreTarget = null, restoreStateOfTarget(a), fn))
          for (a = 0; a < fn.length; a++) restoreStateOfTarget(fn[a]);
      }
    }
  }
  function getListener(inst, registrationName) {
    var stateNode = inst.stateNode;
    if (null === stateNode) return null;
    var props = stateNode[internalPropsKey] || null;
    if (null === props) return null;
    stateNode = props[registrationName];
    a: switch (registrationName) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (props = !props.disabled) || (inst = inst.type, props = !("button" === inst || "input" === inst || "select" === inst || "textarea" === inst));
        inst = !props;
        break a;
      default:
        inst = false;
    }
    if (inst) return null;
    if (stateNode && "function" !== typeof stateNode)
      throw Error(
        formatProdErrorMessage(231, registrationName, typeof stateNode)
      );
    return stateNode;
  }
  var canUseDOM2 = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), passiveBrowserEventsSupported = false;
  if (canUseDOM2)
    try {
      var options = {};
      Object.defineProperty(options, "passive", {
        get: function() {
          passiveBrowserEventsSupported = true;
        }
      });
      window.addEventListener("test", options, options);
      window.removeEventListener("test", options, options);
    } catch (e) {
      passiveBrowserEventsSupported = false;
    }
  var root = null, startText = null, fallbackText = null;
  function getData() {
    if (fallbackText) return fallbackText;
    var start, startValue = startText, startLength = startValue.length, end, endValue = "value" in root ? root.value : root.textContent, endLength = endValue.length;
    for (start = 0; start < startLength && startValue[start] === endValue[start]; start++) ;
    var minEnd = startLength - start;
    for (end = 1; end <= minEnd && startValue[startLength - end] === endValue[endLength - end]; end++) ;
    return fallbackText = endValue.slice(start, 1 < end ? 1 - end : void 0);
  }
  function getEventCharCode(nativeEvent) {
    var keyCode = nativeEvent.keyCode;
    "charCode" in nativeEvent ? (nativeEvent = nativeEvent.charCode, 0 === nativeEvent && 13 === keyCode && (nativeEvent = 13)) : nativeEvent = keyCode;
    10 === nativeEvent && (nativeEvent = 13);
    return 32 <= nativeEvent || 13 === nativeEvent ? nativeEvent : 0;
  }
  function functionThatReturnsTrue() {
    return true;
  }
  function functionThatReturnsFalse() {
    return false;
  }
  function createSyntheticEvent(Interface) {
    function SyntheticBaseEvent(reactName, reactEventType, targetInst, nativeEvent, nativeEventTarget) {
      this._reactName = reactName;
      this._targetInst = targetInst;
      this.type = reactEventType;
      this.nativeEvent = nativeEvent;
      this.target = nativeEventTarget;
      this.currentTarget = null;
      for (var propName in Interface)
        Interface.hasOwnProperty(propName) && (reactName = Interface[propName], this[propName] = reactName ? reactName(nativeEvent) : nativeEvent[propName]);
      this.isDefaultPrevented = (null != nativeEvent.defaultPrevented ? nativeEvent.defaultPrevented : false === nativeEvent.returnValue) ? functionThatReturnsTrue : functionThatReturnsFalse;
      this.isPropagationStopped = functionThatReturnsFalse;
      return this;
    }
    assign(SyntheticBaseEvent.prototype, {
      preventDefault: function() {
        this.defaultPrevented = true;
        var event = this.nativeEvent;
        event && (event.preventDefault ? event.preventDefault() : "unknown" !== typeof event.returnValue && (event.returnValue = false), this.isDefaultPrevented = functionThatReturnsTrue);
      },
      stopPropagation: function() {
        var event = this.nativeEvent;
        event && (event.stopPropagation ? event.stopPropagation() : "unknown" !== typeof event.cancelBubble && (event.cancelBubble = true), this.isPropagationStopped = functionThatReturnsTrue);
      },
      persist: function() {
      },
      isPersistent: functionThatReturnsTrue
    });
    return SyntheticBaseEvent;
  }
  var EventInterface = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(event) {
      return event.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, SyntheticEvent = createSyntheticEvent(EventInterface), UIEventInterface = assign({}, EventInterface, { view: 0, detail: 0 }), SyntheticUIEvent = createSyntheticEvent(UIEventInterface), lastMovementX, lastMovementY, lastMouseEvent, MouseEventInterface = assign({}, UIEventInterface, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: getEventModifierState,
    button: 0,
    buttons: 0,
    relatedTarget: function(event) {
      return void 0 === event.relatedTarget ? event.fromElement === event.srcElement ? event.toElement : event.fromElement : event.relatedTarget;
    },
    movementX: function(event) {
      if ("movementX" in event) return event.movementX;
      event !== lastMouseEvent && (lastMouseEvent && "mousemove" === event.type ? (lastMovementX = event.screenX - lastMouseEvent.screenX, lastMovementY = event.screenY - lastMouseEvent.screenY) : lastMovementY = lastMovementX = 0, lastMouseEvent = event);
      return lastMovementX;
    },
    movementY: function(event) {
      return "movementY" in event ? event.movementY : lastMovementY;
    }
  }), SyntheticMouseEvent = createSyntheticEvent(MouseEventInterface), DragEventInterface = assign({}, MouseEventInterface, { dataTransfer: 0 }), SyntheticDragEvent = createSyntheticEvent(DragEventInterface), FocusEventInterface = assign({}, UIEventInterface, { relatedTarget: 0 }), SyntheticFocusEvent = createSyntheticEvent(FocusEventInterface), AnimationEventInterface = assign({}, EventInterface, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), SyntheticAnimationEvent = createSyntheticEvent(AnimationEventInterface), ClipboardEventInterface = assign({}, EventInterface, {
    clipboardData: function(event) {
      return "clipboardData" in event ? event.clipboardData : window.clipboardData;
    }
  }), SyntheticClipboardEvent = createSyntheticEvent(ClipboardEventInterface), CompositionEventInterface = assign({}, EventInterface, { data: 0 }), SyntheticCompositionEvent = createSyntheticEvent(CompositionEventInterface), normalizeKey = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, translateToKey = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, modifierKeyToProp = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function modifierStateGetter(keyArg) {
    var nativeEvent = this.nativeEvent;
    return nativeEvent.getModifierState ? nativeEvent.getModifierState(keyArg) : (keyArg = modifierKeyToProp[keyArg]) ? !!nativeEvent[keyArg] : false;
  }
  function getEventModifierState() {
    return modifierStateGetter;
  }
  var KeyboardEventInterface = assign({}, UIEventInterface, {
    key: function(nativeEvent) {
      if (nativeEvent.key) {
        var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
        if ("Unidentified" !== key) return key;
      }
      return "keypress" === nativeEvent.type ? (nativeEvent = getEventCharCode(nativeEvent), 13 === nativeEvent ? "Enter" : String.fromCharCode(nativeEvent)) : "keydown" === nativeEvent.type || "keyup" === nativeEvent.type ? translateToKey[nativeEvent.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: getEventModifierState,
    charCode: function(event) {
      return "keypress" === event.type ? getEventCharCode(event) : 0;
    },
    keyCode: function(event) {
      return "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
    },
    which: function(event) {
      return "keypress" === event.type ? getEventCharCode(event) : "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
    }
  }), SyntheticKeyboardEvent = createSyntheticEvent(KeyboardEventInterface), PointerEventInterface = assign({}, MouseEventInterface, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), SyntheticPointerEvent = createSyntheticEvent(PointerEventInterface), SubmitEventInterface = assign({}, EventInterface, { submitter: 0 }), SyntheticSubmitEvent = createSyntheticEvent(SubmitEventInterface), TouchEventInterface = assign({}, UIEventInterface, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: getEventModifierState
  }), SyntheticTouchEvent = createSyntheticEvent(TouchEventInterface), TransitionEventInterface = assign({}, EventInterface, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), SyntheticTransitionEvent = createSyntheticEvent(TransitionEventInterface), WheelEventInterface = assign({}, MouseEventInterface, {
    deltaX: function(event) {
      return "deltaX" in event ? event.deltaX : "wheelDeltaX" in event ? -event.wheelDeltaX : 0;
    },
    deltaY: function(event) {
      return "deltaY" in event ? event.deltaY : "wheelDeltaY" in event ? -event.wheelDeltaY : "wheelDelta" in event ? -event.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), SyntheticWheelEvent = createSyntheticEvent(WheelEventInterface), ToggleEventInterface = assign({}, EventInterface, {
    newState: 0,
    oldState: 0,
    source: 0
  }), SyntheticToggleEvent = createSyntheticEvent(ToggleEventInterface), END_KEYCODES = [9, 13, 27, 32], canUseCompositionEvent = canUseDOM2 && "CompositionEvent" in window, documentMode = null;
  canUseDOM2 && "documentMode" in document && (documentMode = document.documentMode);
  var canUseTextInputEvent = canUseDOM2 && "TextEvent" in window && !documentMode, useFallbackCompositionData = canUseDOM2 && (!canUseCompositionEvent || documentMode && 8 < documentMode && 11 >= documentMode), SPACEBAR_CHAR = String.fromCharCode(32), hasSpaceKeypress = false;
  function isFallbackCompositionEnd(domEventName, nativeEvent) {
    switch (domEventName) {
      case "keyup":
        return -1 !== END_KEYCODES.indexOf(nativeEvent.keyCode);
      case "keydown":
        return 229 !== nativeEvent.keyCode;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function getDataFromCustomEvent(nativeEvent) {
    nativeEvent = nativeEvent.detail;
    return "object" === typeof nativeEvent && "data" in nativeEvent ? nativeEvent.data : null;
  }
  var isComposing = false;
  function getNativeBeforeInputChars(domEventName, nativeEvent) {
    switch (domEventName) {
      case "compositionend":
        return getDataFromCustomEvent(nativeEvent);
      case "keypress":
        if (32 !== nativeEvent.which) return null;
        hasSpaceKeypress = true;
        return SPACEBAR_CHAR;
      case "textInput":
        return domEventName = nativeEvent.data, domEventName === SPACEBAR_CHAR && hasSpaceKeypress ? null : domEventName;
      default:
        return null;
    }
  }
  function getFallbackBeforeInputChars(domEventName, nativeEvent) {
    if (isComposing)
      return "compositionend" === domEventName || !canUseCompositionEvent && isFallbackCompositionEnd(domEventName, nativeEvent) ? (domEventName = getData(), fallbackText = startText = root = null, isComposing = false, domEventName) : null;
    switch (domEventName) {
      case "paste":
        return null;
      case "keypress":
        if (!(nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) || nativeEvent.ctrlKey && nativeEvent.altKey) {
          if (nativeEvent.char && 1 < nativeEvent.char.length)
            return nativeEvent.char;
          if (nativeEvent.which) return String.fromCharCode(nativeEvent.which);
        }
        return null;
      case "compositionend":
        return useFallbackCompositionData && "ko" !== nativeEvent.locale ? null : nativeEvent.data;
      default:
        return null;
    }
  }
  var supportedInputTypes = {
    color: true,
    date: true,
    datetime: true,
    "datetime-local": true,
    email: true,
    month: true,
    number: true,
    password: true,
    range: true,
    search: true,
    tel: true,
    text: true,
    time: true,
    url: true,
    week: true
  };
  function isTextInputElement(elem) {
    var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
    return "input" === nodeName ? !!supportedInputTypes[elem.type] : "textarea" === nodeName ? true : false;
  }
  function createAndAccumulateChangeEvent(dispatchQueue, inst, nativeEvent, target) {
    restoreTarget ? restoreQueue ? restoreQueue.push(target) : restoreQueue = [target] : restoreTarget = target;
    inst = accumulateTwoPhaseListeners(inst, "onChange");
    0 < inst.length && (nativeEvent = new SyntheticEvent(
      "onChange",
      "change",
      null,
      nativeEvent,
      target
    ), dispatchQueue.push({ event: nativeEvent, listeners: inst }));
  }
  var activeElement$1 = null, activeElementInst$1 = null;
  function runEventInBatch(dispatchQueue) {
    processDispatchQueue(dispatchQueue, 0);
  }
  function getInstIfValueChanged(targetInst) {
    var targetNode = getNodeFromInstance(targetInst);
    if (updateValueIfChanged(targetNode)) return targetInst;
  }
  function getTargetInstForChangeEvent(domEventName, targetInst) {
    if ("change" === domEventName) return targetInst;
  }
  var isInputEventSupported = false;
  if (canUseDOM2) {
    var JSCompiler_inline_result$jscomp$318;
    if (canUseDOM2) {
      var isSupported$jscomp$inline_474 = "oninput" in document;
      if (!isSupported$jscomp$inline_474) {
        var element$jscomp$inline_475 = document.createElement("div");
        element$jscomp$inline_475.setAttribute("oninput", "return;");
        isSupported$jscomp$inline_474 = "function" === typeof element$jscomp$inline_475.oninput;
      }
      JSCompiler_inline_result$jscomp$318 = isSupported$jscomp$inline_474;
    } else JSCompiler_inline_result$jscomp$318 = false;
    isInputEventSupported = JSCompiler_inline_result$jscomp$318 && (!document.documentMode || 9 < document.documentMode);
  }
  function stopWatchingForValueChange() {
    activeElement$1 && (activeElement$1.detachEvent("onpropertychange", handlePropertyChange), activeElementInst$1 = activeElement$1 = null);
  }
  function handlePropertyChange(nativeEvent) {
    if ("value" === nativeEvent.propertyName && getInstIfValueChanged(activeElementInst$1)) {
      var dispatchQueue = [];
      createAndAccumulateChangeEvent(
        dispatchQueue,
        activeElementInst$1,
        nativeEvent,
        getEventTarget(nativeEvent)
      );
      batchedUpdates$1(runEventInBatch, dispatchQueue);
    }
  }
  function handleEventsForInputEventPolyfill(domEventName, target, targetInst) {
    "focusin" === domEventName ? (stopWatchingForValueChange(), activeElement$1 = target, activeElementInst$1 = targetInst, activeElement$1.attachEvent("onpropertychange", handlePropertyChange)) : "focusout" === domEventName && stopWatchingForValueChange();
  }
  function getTargetInstForInputEventPolyfill(domEventName) {
    if ("selectionchange" === domEventName || "keyup" === domEventName || "keydown" === domEventName)
      return getInstIfValueChanged(activeElementInst$1);
  }
  function getTargetInstForClickEvent(domEventName, targetInst) {
    if ("click" === domEventName) return getInstIfValueChanged(targetInst);
  }
  function getTargetInstForInputOrChangeEvent(domEventName, targetInst) {
    if ("input" === domEventName || "change" === domEventName)
      return getInstIfValueChanged(targetInst);
  }
  function is(x, y) {
    return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
  }
  var objectIs = "function" === typeof Object.is ? Object.is : is;
  function shallowEqual(objA, objB) {
    if (objectIs(objA, objB)) return true;
    if ("object" !== typeof objA || null === objA || "object" !== typeof objB || null === objB)
      return false;
    var keysA = Object.keys(objA), keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;
    for (keysB = 0; keysB < keysA.length; keysB++) {
      var currentKey = keysA[keysB];
      if (!hasOwnProperty.call(objB, currentKey) || !objectIs(objA[currentKey], objB[currentKey]))
        return false;
    }
    return true;
  }
  function getActiveElement(doc) {
    doc = doc || ("undefined" !== typeof document ? document : void 0);
    if ("undefined" === typeof doc) return null;
    try {
      return doc.activeElement || doc.body;
    } catch (e$20) {
      return doc.body;
    }
  }
  function getLeafNode(node) {
    for (; node && node.firstChild; ) node = node.firstChild;
    return node;
  }
  function getNodeForCharacterOffset(root2, offset) {
    var node = getLeafNode(root2);
    root2 = 0;
    for (var nodeEnd; node; ) {
      if (3 === node.nodeType) {
        nodeEnd = root2 + node.textContent.length;
        if (root2 <= offset && nodeEnd >= offset)
          return { node, offset: offset - root2 };
        root2 = nodeEnd;
      }
      a: {
        for (; node; ) {
          if (node.nextSibling) {
            node = node.nextSibling;
            break a;
          }
          node = node.parentNode;
        }
        node = void 0;
      }
      node = getLeafNode(node);
    }
  }
  function containsNode(outerNode, innerNode) {
    return outerNode && innerNode ? outerNode === innerNode ? true : outerNode && 3 === outerNode.nodeType ? false : innerNode && 3 === innerNode.nodeType ? containsNode(outerNode, innerNode.parentNode) : "contains" in outerNode ? outerNode.contains(innerNode) : outerNode.compareDocumentPosition ? !!(outerNode.compareDocumentPosition(innerNode) & 16) : false : false;
  }
  function getActiveElementDeep(containerInfo) {
    containerInfo = null != containerInfo && null != containerInfo.ownerDocument && null != containerInfo.ownerDocument.defaultView ? containerInfo.ownerDocument.defaultView : window;
    for (var element = getActiveElement(containerInfo.document); element instanceof containerInfo.HTMLIFrameElement; ) {
      try {
        var JSCompiler_inline_result = "string" === typeof element.contentWindow.location.href;
      } catch (err) {
        JSCompiler_inline_result = false;
      }
      if (JSCompiler_inline_result) containerInfo = element.contentWindow;
      else break;
      element = getActiveElement(containerInfo.document);
    }
    return element;
  }
  function hasSelectionCapabilities(elem) {
    var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
    return nodeName && ("input" === nodeName && ("text" === elem.type || "search" === elem.type || "tel" === elem.type || "url" === elem.type || "password" === elem.type) || "textarea" === nodeName || "true" === elem.contentEditable);
  }
  var skipSelectionChangeEvent = canUseDOM2 && "documentMode" in document && 11 >= document.documentMode, activeElement = null, activeElementInst = null, lastSelection = null, mouseDown = false;
  function constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget) {
    var doc = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : 9 === nativeEventTarget.nodeType ? nativeEventTarget : nativeEventTarget.ownerDocument;
    mouseDown || null == activeElement || activeElement !== getActiveElement(doc) || (doc = activeElement, "selectionStart" in doc && hasSelectionCapabilities(doc) ? doc = { start: doc.selectionStart, end: doc.selectionEnd } : (doc = (doc.ownerDocument && doc.ownerDocument.defaultView || window).getSelection(), doc = {
      anchorNode: doc.anchorNode,
      anchorOffset: doc.anchorOffset,
      focusNode: doc.focusNode,
      focusOffset: doc.focusOffset
    }), lastSelection && shallowEqual(lastSelection, doc) || (lastSelection = doc, doc = accumulateTwoPhaseListeners(activeElementInst, "onSelect"), 0 < doc.length && (nativeEvent = new SyntheticEvent(
      "onSelect",
      "select",
      null,
      nativeEvent,
      nativeEventTarget
    ), dispatchQueue.push({ event: nativeEvent, listeners: doc }), nativeEvent.target = activeElement)));
  }
  function makePrefixMap(styleProp, eventName) {
    var prefixes = {};
    prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
    prefixes["Webkit" + styleProp] = "webkit" + eventName;
    prefixes["Moz" + styleProp] = "moz" + eventName;
    return prefixes;
  }
  var vendorPrefixes = {
    animationend: makePrefixMap("Animation", "AnimationEnd"),
    animationiteration: makePrefixMap("Animation", "AnimationIteration"),
    animationstart: makePrefixMap("Animation", "AnimationStart"),
    transitionrun: makePrefixMap("Transition", "TransitionRun"),
    transitionstart: makePrefixMap("Transition", "TransitionStart"),
    transitioncancel: makePrefixMap("Transition", "TransitionCancel"),
    transitionend: makePrefixMap("Transition", "TransitionEnd")
  }, prefixedEventNames = {}, style = {};
  canUseDOM2 && (style = document.createElement("div").style, "AnimationEvent" in window || (delete vendorPrefixes.animationend.animation, delete vendorPrefixes.animationiteration.animation, delete vendorPrefixes.animationstart.animation), "TransitionEvent" in window || delete vendorPrefixes.transitionend.transition);
  function getVendorPrefixedEventName(eventName) {
    if (prefixedEventNames[eventName]) return prefixedEventNames[eventName];
    if (!vendorPrefixes[eventName]) return eventName;
    var prefixMap = vendorPrefixes[eventName], styleProp;
    for (styleProp in prefixMap)
      if (prefixMap.hasOwnProperty(styleProp) && styleProp in style)
        return prefixedEventNames[eventName] = prefixMap[styleProp];
    return eventName;
  }
  var ANIMATION_END = getVendorPrefixedEventName("animationend"), ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration"), ANIMATION_START = getVendorPrefixedEventName("animationstart"), TRANSITION_RUN = getVendorPrefixedEventName("transitionrun"), TRANSITION_START = getVendorPrefixedEventName("transitionstart"), TRANSITION_CANCEL = getVendorPrefixedEventName("transitioncancel"), TRANSITION_END = getVendorPrefixedEventName("transitionend"), topLevelEventsToReactNames = /* @__PURE__ */ new Map(), simpleEventPluginEvents = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  simpleEventPluginEvents.push("scrollEnd");
  function registerSimpleEvent(domEventName, reactName) {
    topLevelEventsToReactNames.set(domEventName, reactName);
    registerTwoPhaseEvent(reactName, [domEventName]);
  }
  var globalClientIdCounter$1 = 0;
  function getViewTransitionName(props, instance) {
    if (null != props.name && "auto" !== props.name) return props.name;
    if (null !== instance.autoName) return instance.autoName;
    props = pendingEffectsRoot.identifierPrefix;
    var globalClientId = globalClientIdCounter$1++;
    props = "_" + props + "t_" + globalClientId.toString(32) + "_";
    return instance.autoName = props;
  }
  function getClassNameByType(classByType) {
    if (null == classByType || "string" === typeof classByType)
      return classByType;
    var className = null, activeTypes = pendingTransitionTypes;
    if (null !== activeTypes)
      for (var i = 0; i < activeTypes.length; i++) {
        var match = classByType[activeTypes[i]];
        if (null != match) {
          if ("none" === match) return "none";
          className = null == className ? match : className + (" " + match);
        }
      }
    return null == className ? classByType.default : className;
  }
  function getViewTransitionClassName(defaultClass, eventClass) {
    defaultClass = getClassNameByType(defaultClass);
    eventClass = getClassNameByType(eventClass);
    return null == eventClass ? "auto" === defaultClass ? null : defaultClass : "auto" === eventClass ? null : eventClass;
  }
  var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
    if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
      var event = new window.ErrorEvent("error", {
        bubbles: true,
        cancelable: true,
        message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
        error
      });
      if (!window.dispatchEvent(event)) return;
    } else if ("object" === typeof process && "function" === typeof process.emit) {
      process.emit("uncaughtException", error);
      return;
    }
    console.error(error);
  }, concurrentQueues = [], concurrentQueuesIndex = 0, concurrentlyUpdatedLanes = 0;
  function finishQueueingConcurrentUpdates() {
    for (var endIndex = concurrentQueuesIndex, i = concurrentlyUpdatedLanes = concurrentQueuesIndex = 0; i < endIndex; ) {
      var fiber = concurrentQueues[i];
      concurrentQueues[i++] = null;
      var queue = concurrentQueues[i];
      concurrentQueues[i++] = null;
      var update = concurrentQueues[i];
      concurrentQueues[i++] = null;
      var lane = concurrentQueues[i];
      concurrentQueues[i++] = null;
      if (null !== queue && null !== update) {
        var pending = queue.pending;
        null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
        queue.pending = update;
      }
      0 !== lane && markUpdateLaneFromFiberToRoot(fiber, update, lane);
    }
  }
  function enqueueUpdate$1(fiber, queue, update, lane) {
    concurrentQueues[concurrentQueuesIndex++] = fiber;
    concurrentQueues[concurrentQueuesIndex++] = queue;
    concurrentQueues[concurrentQueuesIndex++] = update;
    concurrentQueues[concurrentQueuesIndex++] = lane;
    concurrentlyUpdatedLanes |= lane;
    fiber.lanes |= lane;
    fiber = fiber.alternate;
    null !== fiber && (fiber.lanes |= lane);
  }
  function enqueueConcurrentHookUpdate(fiber, queue, update, lane) {
    enqueueUpdate$1(fiber, queue, update, lane);
    return getRootForUpdatedFiber(fiber);
  }
  function enqueueConcurrentRenderForLane(fiber, lane) {
    enqueueUpdate$1(fiber, null, null, lane);
    return getRootForUpdatedFiber(fiber);
  }
  function markUpdateLaneFromFiberToRoot(sourceFiber, update, lane) {
    sourceFiber.lanes |= lane;
    var alternate = sourceFiber.alternate;
    null !== alternate && (alternate.lanes |= lane);
    for (var isHidden = false, parent = sourceFiber.return; null !== parent; )
      parent.childLanes |= lane, alternate = parent.alternate, null !== alternate && (alternate.childLanes |= lane), 22 === parent.tag && (sourceFiber = parent.stateNode, null === sourceFiber || sourceFiber._visibility & 1 || (isHidden = true)), sourceFiber = parent, parent = parent.return;
    return 3 === sourceFiber.tag ? (parent = sourceFiber.stateNode, isHidden && null !== update && (isHidden = 31 - clz32(lane), sourceFiber = parent.hiddenUpdates, alternate = sourceFiber[isHidden], null === alternate ? sourceFiber[isHidden] = [update] : alternate.push(update), update.lane = lane | 536870912), parent) : null;
  }
  function getRootForUpdatedFiber(sourceFiber) {
    if (50 < nestedUpdateCount)
      throw nestedUpdateCount = 0, rootWithNestedUpdates = null, Error(formatProdErrorMessage(185));
    for (var parent = sourceFiber.return; null !== parent; )
      sourceFiber = parent, parent = sourceFiber.return;
    return 3 === sourceFiber.tag ? sourceFiber.stateNode : null;
  }
  var emptyContextObject = {};
  function FiberNode(tag, pendingProps, key, mode) {
    this.tag = tag;
    this.key = key;
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
    this.index = 0;
    this.refCleanup = this.ref = null;
    this.pendingProps = pendingProps;
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
    this.mode = mode;
    this.subtreeFlags = this.flags = 0;
    this.deletions = null;
    this.childLanes = this.lanes = 0;
    this.alternate = null;
  }
  function createFiberImplClass(tag, pendingProps, key, mode) {
    return new FiberNode(tag, pendingProps, key, mode);
  }
  function shouldConstruct(Component) {
    Component = Component.prototype;
    return !(!Component || !Component.isReactComponent);
  }
  function createWorkInProgress(current, pendingProps) {
    var workInProgress2 = current.alternate;
    null === workInProgress2 ? (workInProgress2 = createFiberImplClass(
      current.tag,
      pendingProps,
      current.key,
      current.mode
    ), workInProgress2.elementType = current.elementType, workInProgress2.type = current.type, workInProgress2.stateNode = current.stateNode, workInProgress2.alternate = current, current.alternate = workInProgress2) : (workInProgress2.pendingProps = pendingProps, workInProgress2.type = current.type, workInProgress2.flags = 0, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null);
    workInProgress2.flags = current.flags & 1206910976;
    workInProgress2.childLanes = current.childLanes;
    workInProgress2.lanes = current.lanes;
    workInProgress2.child = current.child;
    workInProgress2.memoizedProps = current.memoizedProps;
    workInProgress2.memoizedState = current.memoizedState;
    workInProgress2.updateQueue = current.updateQueue;
    pendingProps = current.dependencies;
    workInProgress2.dependencies = null === pendingProps ? null : { lanes: pendingProps.lanes, firstContext: pendingProps.firstContext };
    workInProgress2.sibling = current.sibling;
    workInProgress2.index = current.index;
    workInProgress2.ref = current.ref;
    workInProgress2.refCleanup = current.refCleanup;
    return workInProgress2;
  }
  function resetWorkInProgress(workInProgress2, renderLanes2) {
    workInProgress2.flags &= 1206910978;
    var current = workInProgress2.alternate;
    null === current ? (workInProgress2.childLanes = 0, workInProgress2.lanes = renderLanes2, workInProgress2.child = null, workInProgress2.subtreeFlags = 0, workInProgress2.memoizedProps = null, workInProgress2.memoizedState = null, workInProgress2.updateQueue = null, workInProgress2.dependencies = null, workInProgress2.stateNode = null) : (workInProgress2.childLanes = current.childLanes, workInProgress2.lanes = current.lanes, workInProgress2.child = current.child, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null, workInProgress2.memoizedProps = current.memoizedProps, workInProgress2.memoizedState = current.memoizedState, workInProgress2.updateQueue = current.updateQueue, workInProgress2.type = current.type, renderLanes2 = current.dependencies, workInProgress2.dependencies = null === renderLanes2 ? null : {
      lanes: renderLanes2.lanes,
      firstContext: renderLanes2.firstContext
    });
    return workInProgress2;
  }
  function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, lanes) {
    var fiberTag = 0;
    owner = type;
    if ("function" === typeof owner) shouldConstruct(owner) && (fiberTag = 1);
    else if ("string" === typeof owner)
      fiberTag = isHostHoistableType(
        type,
        pendingProps,
        contextStackCursor.current
      ) ? 26 : "html" === type || "head" === type || "body" === type ? 27 : 5;
    else
      a: switch (owner) {
        case REACT_ACTIVITY_TYPE:
          return type = createFiberImplClass(31, pendingProps, key, mode), type.elementType = REACT_ACTIVITY_TYPE, type.lanes = lanes, type;
        case REACT_FRAGMENT_TYPE:
          return createFiberFromFragment(pendingProps.children, mode, lanes, key);
        case REACT_STRICT_MODE_TYPE:
          fiberTag = 8;
          mode |= 24;
          break;
        case REACT_PROFILER_TYPE:
          return type = createFiberImplClass(12, pendingProps, key, mode | 2), type.elementType = REACT_PROFILER_TYPE, type.lanes = lanes, type;
        case REACT_SUSPENSE_TYPE:
          return type = createFiberImplClass(13, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_TYPE, type.lanes = lanes, type;
        case REACT_SUSPENSE_LIST_TYPE:
          return type = createFiberImplClass(19, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_LIST_TYPE, type.lanes = lanes, type;
        case REACT_LEGACY_HIDDEN_TYPE:
        case REACT_VIEW_TRANSITION_TYPE:
          return type = mode | 32, type = createFiberImplClass(30, pendingProps, key, type), type.elementType = REACT_VIEW_TRANSITION_TYPE, type.lanes = lanes, type.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, type;
        default:
          if ("object" === typeof owner && null !== owner)
            switch (owner.$$typeof) {
              case REACT_CONTEXT_TYPE:
                fiberTag = 10;
                break a;
              case REACT_CONSUMER_TYPE:
                fiberTag = 9;
                break a;
              case REACT_FORWARD_REF_TYPE:
                fiberTag = 11;
                break a;
              case REACT_MEMO_TYPE:
                fiberTag = 14;
                break a;
              case REACT_LAZY_TYPE:
                fiberTag = 16;
                owner = null;
                break a;
            }
          fiberTag = 29;
          pendingProps = Error(
            formatProdErrorMessage(130, null === type ? "null" : typeof type, "")
          );
          owner = null;
      }
    key = createFiberImplClass(fiberTag, pendingProps, key, mode);
    key.elementType = type;
    key.type = owner;
    key.lanes = lanes;
    return key;
  }
  function createFiberFromFragment(elements, mode, lanes, key) {
    elements = createFiberImplClass(7, elements, key, mode);
    elements.lanes = lanes;
    return elements;
  }
  function createFiberFromText(content, mode, lanes) {
    content = createFiberImplClass(6, content, null, mode);
    content.lanes = lanes;
    return content;
  }
  function createFiberFromDehydratedFragment(dehydratedNode) {
    var fiber = createFiberImplClass(18, null, null, 0);
    fiber.stateNode = dehydratedNode;
    return fiber;
  }
  function createFiberFromPortal(portal, mode, lanes) {
    mode = createFiberImplClass(
      4,
      null !== portal.children ? portal.children : [],
      portal.key,
      mode
    );
    mode.lanes = lanes;
    mode.stateNode = {
      containerInfo: portal.containerInfo,
      pendingChildren: null,
      implementation: portal.implementation
    };
    return mode;
  }
  var CapturedStacks = /* @__PURE__ */ new WeakMap();
  function createCapturedValueAtFiber(value, source) {
    if ("object" === typeof value && null !== value) {
      var existing = CapturedStacks.get(value);
      if (void 0 !== existing) return existing;
      source = {
        value,
        source,
        stack: getStackByFiberInDevAndProd(source)
      };
      CapturedStacks.set(value, source);
      return source;
    }
    return {
      value,
      source,
      stack: getStackByFiberInDevAndProd(source)
    };
  }
  var forkStack = [], forkStackIndex = 0, treeForkProvider = null, treeForkCount = 0, idStack = [], idStackIndex = 0, treeContextProvider = null, treeContextId = 1, treeContextOverflow = "";
  function pushTreeFork(workInProgress2, totalChildren) {
    forkStack[forkStackIndex++] = treeForkCount;
    forkStack[forkStackIndex++] = treeForkProvider;
    treeForkProvider = workInProgress2;
    treeForkCount = totalChildren;
  }
  function pushTreeId(workInProgress2, totalChildren, index2) {
    idStack[idStackIndex++] = treeContextId;
    idStack[idStackIndex++] = treeContextOverflow;
    idStack[idStackIndex++] = treeContextProvider;
    treeContextProvider = workInProgress2;
    var baseIdWithLeadingBit = treeContextId;
    workInProgress2 = treeContextOverflow;
    var baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
    baseIdWithLeadingBit &= ~(1 << baseLength);
    index2 += 1;
    var length = 32 - clz32(totalChildren) + baseLength;
    if (30 < length) {
      var numberOfOverflowBits = baseLength - baseLength % 5;
      length = (baseIdWithLeadingBit & (1 << numberOfOverflowBits) - 1).toString(32);
      baseIdWithLeadingBit >>= numberOfOverflowBits;
      baseLength -= numberOfOverflowBits;
      treeContextId = 1 << 32 - clz32(totalChildren) + baseLength | index2 << baseLength | baseIdWithLeadingBit;
      treeContextOverflow = length + workInProgress2;
    } else
      treeContextId = 1 << length | index2 << baseLength | baseIdWithLeadingBit, treeContextOverflow = workInProgress2;
  }
  function pushMaterializedTreeId(workInProgress2) {
    null !== workInProgress2.return && (pushTreeFork(workInProgress2, 1), pushTreeId(workInProgress2, 1, 0));
  }
  function popTreeContext(workInProgress2) {
    for (; workInProgress2 === treeForkProvider; )
      treeForkProvider = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null, treeForkCount = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null;
    for (; workInProgress2 === treeContextProvider; )
      treeContextProvider = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextOverflow = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextId = idStack[--idStackIndex], idStack[idStackIndex] = null;
  }
  function restoreSuspendedTreeContext(workInProgress2, suspendedContext) {
    idStack[idStackIndex++] = treeContextId;
    idStack[idStackIndex++] = treeContextOverflow;
    idStack[idStackIndex++] = treeContextProvider;
    treeContextId = suspendedContext.id;
    treeContextOverflow = suspendedContext.overflow;
    treeContextProvider = workInProgress2;
  }
  var hydrationParentFiber = null, nextHydratableInstance = null, isHydrating = false, hydrationErrors = null, rootOrSingletonContext = false, HydrationMismatchException = Error(formatProdErrorMessage(519));
  function throwOnHydrationMismatch(fiber) {
    var error = Error(
      formatProdErrorMessage(
        418,
        1 < arguments.length && void 0 !== arguments[1] && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    queueHydrationError(createCapturedValueAtFiber(error, fiber));
    throw HydrationMismatchException;
  }
  function prepareToHydrateHostInstance(fiber) {
    var instance = fiber.stateNode, type = fiber.type, props = fiber.memoizedProps;
    instance[internalInstanceKey] = fiber;
    instance[internalPropsKey] = props;
    switch (type) {
      case "dialog":
        listenToNonDelegatedEvent("cancel", instance);
        listenToNonDelegatedEvent("close", instance);
        break;
      case "iframe":
      case "object":
      case "embed":
        listenToNonDelegatedEvent("load", instance);
        break;
      case "video":
      case "audio":
        for (type = 0; type < mediaEventTypes.length; type++)
          listenToNonDelegatedEvent(mediaEventTypes[type], instance);
        break;
      case "source":
        listenToNonDelegatedEvent("error", instance);
        break;
      case "img":
      case "image":
      case "link":
        listenToNonDelegatedEvent("error", instance);
        listenToNonDelegatedEvent("load", instance);
        break;
      case "details":
        listenToNonDelegatedEvent("toggle", instance);
        break;
      case "input":
        listenToNonDelegatedEvent("invalid", instance);
        initInput(
          instance,
          props.value,
          props.defaultValue,
          props.checked,
          props.defaultChecked,
          props.type,
          props.name,
          true
        );
        break;
      case "select":
        listenToNonDelegatedEvent("invalid", instance);
        break;
      case "textarea":
        listenToNonDelegatedEvent("invalid", instance), initTextarea(instance, props.value, props.defaultValue, props.children);
    }
    type = props.children;
    "string" !== typeof type && "number" !== typeof type && "bigint" !== typeof type || instance.textContent === "" + type || true === props.suppressHydrationWarning || checkForUnmatchedText(instance.textContent, type) ? (null != props.popover && (listenToNonDelegatedEvent("beforetoggle", instance), listenToNonDelegatedEvent("toggle", instance)), null != props.onScroll && listenToNonDelegatedEvent("scroll", instance), null != props.onScrollEnd && listenToNonDelegatedEvent("scrollend", instance), null != props.onClick && (instance.onclick = noop$1), instance = true) : instance = false;
    instance || throwOnHydrationMismatch(fiber, true);
  }
  function popToNextHostParent(fiber) {
    for (hydrationParentFiber = fiber.return; hydrationParentFiber; )
      switch (hydrationParentFiber.tag) {
        case 5:
        case 31:
        case 13:
          rootOrSingletonContext = false;
          return;
        case 27:
        case 3:
          rootOrSingletonContext = true;
          return;
        default:
          hydrationParentFiber = hydrationParentFiber.return;
      }
  }
  function popHydrationState(fiber) {
    if (fiber !== hydrationParentFiber) return false;
    if (!isHydrating) return popToNextHostParent(fiber), isHydrating = true, false;
    var tag = fiber.tag, JSCompiler_temp;
    if (JSCompiler_temp = 3 !== tag && 27 !== tag) {
      if (JSCompiler_temp = 5 === tag)
        JSCompiler_temp = fiber.type, JSCompiler_temp = !("form" !== JSCompiler_temp && "button" !== JSCompiler_temp) || shouldSetTextContent(fiber.type, fiber.memoizedProps);
      JSCompiler_temp = !JSCompiler_temp;
    }
    JSCompiler_temp && nextHydratableInstance && throwOnHydrationMismatch(fiber);
    popToNextHostParent(fiber);
    if (13 === tag) {
      fiber = fiber.memoizedState;
      fiber = null !== fiber ? fiber.dehydrated : null;
      if (!fiber) throw Error(formatProdErrorMessage(317));
      nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
    } else if (31 === tag) {
      fiber = fiber.memoizedState;
      fiber = null !== fiber ? fiber.dehydrated : null;
      if (!fiber) throw Error(formatProdErrorMessage(317));
      nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
    } else
      27 === tag ? (tag = nextHydratableInstance, isSingletonScope(fiber.type) ? (fiber = previousHydratableOnEnteringScopedSingleton, previousHydratableOnEnteringScopedSingleton = null, nextHydratableInstance = fiber) : nextHydratableInstance = tag) : nextHydratableInstance = hydrationParentFiber ? getNextHydratable(fiber.stateNode.nextSibling) : null;
    return true;
  }
  function resetHydrationState() {
    nextHydratableInstance = hydrationParentFiber = null;
    isHydrating = false;
  }
  function upgradeHydrationErrorsToRecoverable() {
    var queuedErrors = hydrationErrors;
    null !== queuedErrors && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = queuedErrors : workInProgressRootRecoverableErrors.push.apply(
      workInProgressRootRecoverableErrors,
      queuedErrors
    ), hydrationErrors = null);
    return queuedErrors;
  }
  function queueHydrationError(error) {
    null === hydrationErrors ? hydrationErrors = [error] : hydrationErrors.push(error);
  }
  var valueCursor = createCursor(null), currentlyRenderingFiber$1 = null, lastContextDependency = null;
  function pushProvider(providerFiber, context, nextValue) {
    push(valueCursor, context._currentValue);
    context._currentValue = nextValue;
  }
  function popProvider(context) {
    context._currentValue = valueCursor.current;
    pop(valueCursor);
  }
  function scheduleContextWorkOnParentPath(parent, renderLanes2, propagationRoot) {
    for (; null !== parent; ) {
      var alternate = parent.alternate;
      (parent.childLanes & renderLanes2) !== renderLanes2 ? (parent.childLanes |= renderLanes2, null !== alternate && (alternate.childLanes |= renderLanes2)) : null !== alternate && (alternate.childLanes & renderLanes2) !== renderLanes2 && (alternate.childLanes |= renderLanes2);
      if (parent === propagationRoot) break;
      parent = parent.return;
    }
  }
  function propagateContextChanges(workInProgress2, contexts, renderLanes2, forcePropagateEntireTree) {
    var fiber = workInProgress2.child;
    null !== fiber && (fiber.return = workInProgress2);
    for (; null !== fiber; ) {
      var list = fiber.dependencies;
      if (null !== list) {
        var nextFiber = fiber.child;
        list = list.firstContext;
        a: for (; null !== list; ) {
          var dependency = list;
          list = fiber;
          for (var i = 0; i < contexts.length; i++)
            if (dependency.context === contexts[i]) {
              list.lanes |= renderLanes2;
              dependency = list.alternate;
              null !== dependency && (dependency.lanes |= renderLanes2);
              scheduleContextWorkOnParentPath(
                list.return,
                renderLanes2,
                workInProgress2
              );
              forcePropagateEntireTree || (nextFiber = null);
              break a;
            }
          list = dependency.next;
        }
      } else if (18 === fiber.tag) {
        nextFiber = fiber.return;
        if (null === nextFiber) throw Error(formatProdErrorMessage(341));
        nextFiber.lanes |= renderLanes2;
        list = nextFiber.alternate;
        null !== list && (list.lanes |= renderLanes2);
        scheduleContextWorkOnParentPath(nextFiber, renderLanes2, workInProgress2);
        nextFiber = null;
      } else
        13 === fiber.tag && null !== fiber.memoizedState && null === fiber.memoizedState.dehydrated ? (fiber.lanes |= renderLanes2, nextFiber = fiber.alternate, null !== nextFiber && (nextFiber.lanes |= renderLanes2), scheduleContextWorkOnParentPath(
          fiber.return,
          renderLanes2,
          workInProgress2
        ), nextFiber = fiber.child, nextFiber = null !== nextFiber ? nextFiber.sibling : null) : nextFiber = fiber.child;
      if (null !== nextFiber) nextFiber.return = fiber;
      else
        for (nextFiber = fiber; null !== nextFiber; ) {
          if (nextFiber === workInProgress2) {
            nextFiber = null;
            break;
          }
          fiber = nextFiber.sibling;
          if (null !== fiber) {
            fiber.return = nextFiber.return;
            nextFiber = fiber;
            break;
          }
          nextFiber = nextFiber.return;
        }
      fiber = nextFiber;
    }
  }
  function propagateParentContextChanges(current, workInProgress2, renderLanes2, forcePropagateEntireTree) {
    current = null;
    for (var parent = workInProgress2, isInsidePropagationBailout = false; null !== parent; ) {
      if (!isInsidePropagationBailout) {
        if (0 !== (parent.flags & 524288)) isInsidePropagationBailout = true;
        else if (0 !== (parent.flags & 262144)) break;
      }
      if (10 === parent.tag) {
        var currentParent = parent.alternate;
        if (null === currentParent) throw Error(formatProdErrorMessage(387));
        currentParent = currentParent.memoizedProps;
        if (null !== currentParent) {
          var context = parent.type;
          objectIs(parent.pendingProps.value, currentParent.value) || (null !== current ? current.push(context) : current = [context]);
        }
      } else if (parent === hostTransitionProviderCursor.current) {
        currentParent = parent.alternate;
        if (null === currentParent) throw Error(formatProdErrorMessage(387));
        currentParent.memoizedState.memoizedState !== parent.memoizedState.memoizedState && (null !== current ? current.push(HostTransitionContext) : current = [HostTransitionContext]);
      }
      parent = parent.return;
    }
    null !== current && propagateContextChanges(
      workInProgress2,
      current,
      renderLanes2,
      forcePropagateEntireTree
    );
    workInProgress2.flags |= 262144;
    return null !== current;
  }
  function checkIfContextChanged(currentDependencies) {
    for (currentDependencies = currentDependencies.firstContext; null !== currentDependencies; ) {
      if (!objectIs(
        currentDependencies.context._currentValue,
        currentDependencies.memoizedValue
      ))
        return true;
      currentDependencies = currentDependencies.next;
    }
    return false;
  }
  function prepareToReadContext(workInProgress2) {
    currentlyRenderingFiber$1 = workInProgress2;
    lastContextDependency = null;
    workInProgress2 = workInProgress2.dependencies;
    null !== workInProgress2 && (workInProgress2.firstContext = null);
  }
  function readContext(context) {
    return readContextForConsumer(currentlyRenderingFiber$1, context);
  }
  function readContextDuringReconciliation(consumer, context) {
    null === currentlyRenderingFiber$1 && prepareToReadContext(consumer);
    return readContextForConsumer(consumer, context);
  }
  function readContextForConsumer(consumer, context) {
    var value = context._currentValue;
    context = { context, memoizedValue: value, next: null };
    if (null === lastContextDependency) {
      if (null === consumer) throw Error(formatProdErrorMessage(308));
      lastContextDependency = context;
      consumer.dependencies = { lanes: 0, firstContext: context };
      consumer.flags |= 524288;
    } else lastContextDependency = lastContextDependency.next = context;
    return value;
  }
  var AbortControllerLocal = "undefined" !== typeof AbortController ? AbortController : function() {
    var listeners = [], signal = this.signal = {
      aborted: false,
      addEventListener: function(type, listener) {
        listeners.push(listener);
      }
    };
    this.abort = function() {
      signal.aborted = true;
      listeners.forEach(function(listener) {
        return listener();
      });
    };
  }, scheduleCallback$2 = Scheduler.unstable_scheduleCallback, NormalPriority = Scheduler.unstable_NormalPriority, CacheContext = {
    $$typeof: REACT_CONTEXT_TYPE,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function createCache() {
    return {
      controller: new AbortControllerLocal(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function releaseCache(cache) {
    cache.refCount--;
    0 === cache.refCount && scheduleCallback$2(NormalPriority, function() {
      cache.controller.abort();
    });
  }
  function queueTransitionTypes(root2, transitionTypes) {
    if (0 !== (root2.pendingLanes & 4194048)) {
      var queued = root2.transitionTypes;
      null === queued && (queued = root2.transitionTypes = []);
      for (root2 = 0; root2 < transitionTypes.length; root2++) {
        var transitionType = transitionTypes[root2];
        -1 === queued.indexOf(transitionType) && queued.push(transitionType);
      }
    }
  }
  var entangledTransitionTypes = null;
  function claimQueuedTransitionTypes(root2) {
    var claimed = root2.transitionTypes;
    root2.transitionTypes = null;
    return claimed;
  }
  var currentEntangledListeners = null, currentEntangledPendingCount = 0, currentEntangledLane = 0, currentEntangledActionThenable = null;
  function entangleAsyncAction(transition, thenable) {
    if (null === currentEntangledListeners) {
      var entangledListeners = currentEntangledListeners = [];
      currentEntangledPendingCount = 0;
      currentEntangledLane = requestTransitionLane();
      currentEntangledActionThenable = {
        status: "pending",
        value: void 0,
        then: function(resolve) {
          entangledListeners.push(resolve);
        }
      };
    }
    currentEntangledPendingCount++;
    thenable.then(pingEngtangledActionScope, pingEngtangledActionScope);
    return thenable;
  }
  function pingEngtangledActionScope() {
    if (0 === --currentEntangledPendingCount && (entangledTransitionTypes = null, null !== currentEntangledListeners)) {
      null !== currentEntangledActionThenable && (currentEntangledActionThenable.status = "fulfilled");
      var listeners = currentEntangledListeners;
      currentEntangledListeners = null;
      currentEntangledLane = 0;
      currentEntangledActionThenable = null;
      for (var i = 0; i < listeners.length; i++) (0, listeners[i])();
    }
  }
  function chainThenableValue(thenable, result) {
    var listeners = [], thenableWithOverride = {
      status: "pending",
      value: null,
      reason: null,
      then: function(resolve) {
        listeners.push(resolve);
      }
    };
    thenable.then(
      function() {
        thenableWithOverride.status = "fulfilled";
        thenableWithOverride.value = result;
        for (var i = 0; i < listeners.length; i++) (0, listeners[i])(result);
      },
      function(error) {
        thenableWithOverride.status = "rejected";
        thenableWithOverride.reason = error;
        for (error = 0; error < listeners.length; error++)
          (0, listeners[error])(void 0);
      }
    );
    return thenableWithOverride;
  }
  var prevOnStartTransitionFinish = ReactSharedInternals.S;
  ReactSharedInternals.S = function(transition, returnValue) {
    globalMostRecentTransitionTime = now();
    "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && entangleAsyncAction(transition, returnValue);
    if (null !== entangledTransitionTypes)
      for (var root$28 = firstScheduledRoot; null !== root$28; )
        queueTransitionTypes(root$28, entangledTransitionTypes), root$28 = root$28.next;
    root$28 = transition.types;
    if (null !== root$28) {
      for (var root$29 = firstScheduledRoot; null !== root$29; )
        queueTransitionTypes(root$29, root$28), root$29 = root$29.next;
      if (0 !== currentEntangledLane) {
        root$29 = entangledTransitionTypes;
        null === root$29 && (root$29 = entangledTransitionTypes = []);
        for (var i = 0; i < root$28.length; i++) {
          var transitionType = root$28[i];
          -1 === root$29.indexOf(transitionType) && root$29.push(transitionType);
        }
      }
    }
    null !== prevOnStartTransitionFinish && prevOnStartTransitionFinish(transition, returnValue);
  };
  var resumedCache = createCursor(null);
  function peekCacheFromPool() {
    var cacheResumedFromPreviousRender = resumedCache.current;
    return null !== cacheResumedFromPreviousRender ? cacheResumedFromPreviousRender : workInProgressRoot.pooledCache;
  }
  function pushTransition(offscreenWorkInProgress, prevCachePool) {
    null === prevCachePool ? push(resumedCache, resumedCache.current) : push(resumedCache, prevCachePool.pool);
  }
  function getSuspendedCache() {
    var cacheFromPool = peekCacheFromPool();
    return null === cacheFromPool ? null : { parent: CacheContext._currentValue, pool: cacheFromPool };
  }
  var SuspenseException = Error(formatProdErrorMessage(460)), SuspenseyCommitException = Error(formatProdErrorMessage(474)), SuspenseActionException = Error(formatProdErrorMessage(542)), noopSuspenseyCommitThenable = { then: function() {
  } };
  function isThenableResolved(thenable) {
    thenable = thenable.status;
    return "fulfilled" === thenable || "rejected" === thenable;
  }
  function trackUsedThenable(thenableState2, thenable, index2) {
    index2 = thenableState2[index2];
    void 0 === index2 ? thenableState2.push(thenable) : index2 !== thenable && (thenable.then(noop$1, noop$1), thenable = index2);
    switch (thenable.status) {
      case "fulfilled":
        return thenable.value;
      case "rejected":
        thenableState2 = thenable.reason;
        checkIfUseWrappedInAsyncCatch(thenableState2);
        if (void 0 === thenableState2 && !("reason" in thenable))
          throw Error(formatProdErrorMessage(600));
        throw thenableState2;
      default:
        if ("string" === typeof thenable.status) thenable.then(noop$1, noop$1);
        else {
          thenableState2 = workInProgressRoot;
          if (null !== thenableState2 && 100 < thenableState2.shellSuspendCounter)
            throw Error(formatProdErrorMessage(482));
          thenableState2 = thenable;
          thenableState2.status = "pending";
          thenableState2.then(
            function(fulfilledValue) {
              if ("pending" === thenable.status) {
                var fulfilledThenable = thenable;
                fulfilledThenable.status = "fulfilled";
                fulfilledThenable.value = fulfilledValue;
              }
            },
            function(error) {
              if ("pending" === thenable.status) {
                var rejectedThenable = thenable;
                rejectedThenable.status = "rejected";
                rejectedThenable.reason = error;
              }
            }
          );
        }
        switch (thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenableState2 = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState2), thenableState2;
        }
        suspendedThenable = thenable;
        throw SuspenseException;
    }
  }
  function resolveLazy(lazyType) {
    try {
      var init = lazyType._init;
      return init(lazyType._payload);
    } catch (x) {
      if (null !== x && "object" === typeof x && "function" === typeof x.then)
        throw suspendedThenable = x, SuspenseException;
      throw x;
    }
  }
  var suspendedThenable = null;
  function getSuspendedThenable() {
    if (null === suspendedThenable) throw Error(formatProdErrorMessage(459));
    var thenable = suspendedThenable;
    suspendedThenable = null;
    return thenable;
  }
  function checkIfUseWrappedInAsyncCatch(rejectedReason) {
    if (rejectedReason === SuspenseException || rejectedReason === SuspenseActionException)
      throw Error(formatProdErrorMessage(483));
  }
  var thenableState$1 = null, thenableIndexCounter$1 = 0;
  function unwrapThenable(thenable) {
    var index2 = thenableIndexCounter$1;
    thenableIndexCounter$1 += 1;
    null === thenableState$1 && (thenableState$1 = []);
    return trackUsedThenable(thenableState$1, thenable, index2);
  }
  function coerceRef(workInProgress2, element) {
    element = element.props.ref;
    workInProgress2.ref = void 0 !== element ? element : null;
  }
  function throwOnInvalidObjectTypeImpl(returnFiber, newChild) {
    if (newChild.$$typeof === REACT_LEGACY_ELEMENT_TYPE)
      throw Error(formatProdErrorMessage(525));
    returnFiber = Object.prototype.toString.call(newChild);
    throw Error(
      formatProdErrorMessage(
        31,
        "[object Object]" === returnFiber ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : returnFiber
      )
    );
  }
  function createChildReconciler(shouldTrackSideEffects) {
    function deleteChild(returnFiber, childToDelete) {
      if (shouldTrackSideEffects) {
        var deletions = returnFiber.deletions;
        null === deletions ? (returnFiber.deletions = [childToDelete], returnFiber.flags |= 16) : deletions.push(childToDelete);
      }
    }
    function deleteRemainingChildren(returnFiber, currentFirstChild) {
      if (!shouldTrackSideEffects) return null;
      for (; null !== currentFirstChild; )
        deleteChild(returnFiber, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
      return null;
    }
    function mapRemainingChildren(currentFirstChild) {
      for (var existingChildren = /* @__PURE__ */ new Map(); null !== currentFirstChild; )
        null === currentFirstChild.key ? existingChildren.set(currentFirstChild.index, currentFirstChild) : existingChildren.set(currentFirstChild.key, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
      return existingChildren;
    }
    function useFiber(fiber, pendingProps) {
      fiber = createWorkInProgress(fiber, pendingProps);
      fiber.index = 0;
      fiber.sibling = null;
      return fiber;
    }
    function placeChild(newFiber, lastPlacedIndex, newIndex) {
      newFiber.index = newIndex;
      if (!shouldTrackSideEffects)
        return newFiber.flags |= 1048576, lastPlacedIndex;
      newIndex = newFiber.alternate;
      if (null !== newIndex)
        return newIndex = newIndex.index, newIndex < lastPlacedIndex ? (newFiber.flags |= 2, lastPlacedIndex) : newIndex;
      newFiber.flags |= 134217730;
      return lastPlacedIndex;
    }
    function placeSingleChild(newFiber) {
      shouldTrackSideEffects && null === newFiber.alternate && (newFiber.flags |= 134217730);
      return newFiber;
    }
    function updateTextNode(returnFiber, current, textContent, lanes) {
      if (null === current || 6 !== current.tag)
        return current = createFiberFromText(textContent, returnFiber.mode, lanes), current.return = returnFiber, current;
      current = useFiber(current, textContent);
      current.return = returnFiber;
      return current;
    }
    function updateElement(returnFiber, current, element, lanes) {
      var elementType = element.type;
      if (elementType === REACT_FRAGMENT_TYPE)
        return returnFiber = updateFragment(
          returnFiber,
          current,
          element.props.children,
          lanes,
          element.key
        ), coerceRef(returnFiber, element), returnFiber;
      if (null !== current && (current.elementType === elementType || "object" === typeof elementType && null !== elementType && elementType.$$typeof === REACT_LAZY_TYPE && resolveLazy(elementType) === current.type))
        return current = useFiber(current, element.props), coerceRef(current, element), current.return = returnFiber, current;
      current = createFiberFromTypeAndProps(
        element.type,
        element.key,
        element.props,
        null,
        returnFiber.mode,
        lanes
      );
      coerceRef(current, element);
      current.return = returnFiber;
      return current;
    }
    function updatePortal(returnFiber, current, portal, lanes) {
      if (null === current || 4 !== current.tag || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation)
        return current = createFiberFromPortal(portal, returnFiber.mode, lanes), current.return = returnFiber, current;
      current = useFiber(current, portal.children || []);
      current.return = returnFiber;
      return current;
    }
    function updateFragment(returnFiber, current, fragment, lanes, key) {
      if (null === current || 7 !== current.tag)
        return current = createFiberFromFragment(
          fragment,
          returnFiber.mode,
          lanes,
          key
        ), current.return = returnFiber, current;
      current = useFiber(current, fragment);
      current.return = returnFiber;
      return current;
    }
    function createChild(returnFiber, newChild, lanes) {
      if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
        return newChild = createFiberFromText(
          "" + newChild,
          returnFiber.mode,
          lanes
        ), newChild.return = returnFiber, newChild;
      if ("object" === typeof newChild && null !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            return lanes = createFiberFromTypeAndProps(
              newChild.type,
              newChild.key,
              newChild.props,
              null,
              returnFiber.mode,
              lanes
            ), coerceRef(lanes, newChild), lanes.return = returnFiber, lanes;
          case REACT_PORTAL_TYPE:
            return newChild = createFiberFromPortal(
              newChild,
              returnFiber.mode,
              lanes
            ), newChild.return = returnFiber, newChild;
          case REACT_LAZY_TYPE:
            return newChild = resolveLazy(newChild), createChild(returnFiber, newChild, lanes);
        }
        if (isArrayImpl(newChild) || getIteratorFn(newChild))
          return newChild = createFiberFromFragment(
            newChild,
            returnFiber.mode,
            lanes,
            null
          ), newChild.return = returnFiber, newChild;
        if ("function" === typeof newChild.then)
          return createChild(returnFiber, unwrapThenable(newChild), lanes);
        if (newChild.$$typeof === REACT_CONTEXT_TYPE)
          return createChild(
            returnFiber,
            readContextDuringReconciliation(returnFiber, newChild),
            lanes
          );
        throwOnInvalidObjectTypeImpl(returnFiber, newChild);
      }
      return null;
    }
    function updateSlot(returnFiber, oldFiber, newChild, lanes) {
      var key = null !== oldFiber ? oldFiber.key : null;
      if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
        return null !== key ? null : updateTextNode(returnFiber, oldFiber, "" + newChild, lanes);
      if ("object" === typeof newChild && null !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            return newChild.key === key ? updateElement(returnFiber, oldFiber, newChild, lanes) : null;
          case REACT_PORTAL_TYPE:
            return newChild.key === key ? updatePortal(returnFiber, oldFiber, newChild, lanes) : null;
          case REACT_LAZY_TYPE:
            return newChild = resolveLazy(newChild), updateSlot(returnFiber, oldFiber, newChild, lanes);
        }
        if (isArrayImpl(newChild) || getIteratorFn(newChild))
          return null !== key ? null : updateFragment(returnFiber, oldFiber, newChild, lanes, null);
        if ("function" === typeof newChild.then)
          return updateSlot(
            returnFiber,
            oldFiber,
            unwrapThenable(newChild),
            lanes
          );
        if (newChild.$$typeof === REACT_CONTEXT_TYPE)
          return updateSlot(
            returnFiber,
            oldFiber,
            readContextDuringReconciliation(returnFiber, newChild),
            lanes
          );
        throwOnInvalidObjectTypeImpl(returnFiber, newChild);
      }
      return null;
    }
    function updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes) {
      if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
        return existingChildren = existingChildren.get(newIdx) || null, updateTextNode(returnFiber, existingChildren, "" + newChild, lanes);
      if ("object" === typeof newChild && null !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            return existingChildren = existingChildren.get(
              null === newChild.key ? newIdx : newChild.key
            ) || null, updateElement(returnFiber, existingChildren, newChild, lanes);
          case REACT_PORTAL_TYPE:
            return existingChildren = existingChildren.get(
              null === newChild.key ? newIdx : newChild.key
            ) || null, updatePortal(returnFiber, existingChildren, newChild, lanes);
          case REACT_LAZY_TYPE:
            return newChild = resolveLazy(newChild), updateFromMap(
              existingChildren,
              returnFiber,
              newIdx,
              newChild,
              lanes
            );
        }
        if (isArrayImpl(newChild) || getIteratorFn(newChild))
          return existingChildren = existingChildren.get(newIdx) || null, updateFragment(returnFiber, existingChildren, newChild, lanes, null);
        if ("function" === typeof newChild.then)
          return updateFromMap(
            existingChildren,
            returnFiber,
            newIdx,
            unwrapThenable(newChild),
            lanes
          );
        if (newChild.$$typeof === REACT_CONTEXT_TYPE)
          return updateFromMap(
            existingChildren,
            returnFiber,
            newIdx,
            readContextDuringReconciliation(returnFiber, newChild),
            lanes
          );
        throwOnInvalidObjectTypeImpl(returnFiber, newChild);
      }
      return null;
    }
    function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {
      for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null; null !== oldFiber && newIdx < newChildren.length; newIdx++) {
        oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
        var newFiber = updateSlot(
          returnFiber,
          oldFiber,
          newChildren[newIdx],
          lanes
        );
        if (null === newFiber) {
          null === oldFiber && (oldFiber = nextOldFiber);
          break;
        }
        shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
        currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
        null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
        previousNewFiber = newFiber;
        oldFiber = nextOldFiber;
      }
      if (newIdx === newChildren.length)
        return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
      if (null === oldFiber) {
        for (; newIdx < newChildren.length; newIdx++)
          oldFiber = createChild(returnFiber, newChildren[newIdx], lanes), null !== oldFiber && (currentFirstChild = placeChild(
            oldFiber,
            currentFirstChild,
            newIdx
          ), null === previousNewFiber ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
        isHydrating && pushTreeFork(returnFiber, newIdx);
        return resultingFirstChild;
      }
      for (oldFiber = mapRemainingChildren(oldFiber); newIdx < newChildren.length; newIdx++)
        nextOldFiber = updateFromMap(
          oldFiber,
          returnFiber,
          newIdx,
          newChildren[newIdx],
          lanes
        ), null !== nextOldFiber && (shouldTrackSideEffects && (newFiber = nextOldFiber.alternate, null !== newFiber && oldFiber.delete(null === newFiber.key ? newIdx : newFiber.key)), currentFirstChild = placeChild(
          nextOldFiber,
          currentFirstChild,
          newIdx
        ), null === previousNewFiber ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
      shouldTrackSideEffects && oldFiber.forEach(function(child) {
        return deleteChild(returnFiber, child);
      });
      isHydrating && pushTreeFork(returnFiber, newIdx);
      return resultingFirstChild;
    }
    function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildren, lanes) {
      if (null == newChildren) throw Error(formatProdErrorMessage(151));
      for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null, step = newChildren.next(); null !== oldFiber && !step.done; newIdx++, step = newChildren.next()) {
        oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
        var newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
        if (null === newFiber) {
          null === oldFiber && (oldFiber = nextOldFiber);
          break;
        }
        shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
        currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
        null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
        previousNewFiber = newFiber;
        oldFiber = nextOldFiber;
      }
      if (step.done)
        return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
      if (null === oldFiber) {
        for (; !step.done; newIdx++, step = newChildren.next())
          step = createChild(returnFiber, step.value, lanes), null !== step && (currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
        isHydrating && pushTreeFork(returnFiber, newIdx);
        return resultingFirstChild;
      }
      for (oldFiber = mapRemainingChildren(oldFiber); !step.done; newIdx++, step = newChildren.next())
        step = updateFromMap(oldFiber, returnFiber, newIdx, step.value, lanes), null !== step && (shouldTrackSideEffects && (nextOldFiber = step.alternate, null !== nextOldFiber && oldFiber.delete(
          null === nextOldFiber.key ? newIdx : nextOldFiber.key
        )), currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
      shouldTrackSideEffects && oldFiber.forEach(function(child) {
        return deleteChild(returnFiber, child);
      });
      isHydrating && pushTreeFork(returnFiber, newIdx);
      return resultingFirstChild;
    }
    function reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes) {
      "object" === typeof newChild && null !== newChild && newChild.type === REACT_FRAGMENT_TYPE && null === newChild.key && void 0 === newChild.props.ref && (newChild = newChild.props.children);
      if ("object" === typeof newChild && null !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            a: {
              for (var key = newChild.key; null !== currentFirstChild; ) {
                if (currentFirstChild.key === key) {
                  key = newChild.type;
                  if (key === REACT_FRAGMENT_TYPE) {
                    if (7 === currentFirstChild.tag) {
                      deleteRemainingChildren(
                        returnFiber,
                        currentFirstChild.sibling
                      );
                      lanes = useFiber(
                        currentFirstChild,
                        newChild.props.children
                      );
                      coerceRef(lanes, newChild);
                      lanes.return = returnFiber;
                      returnFiber = lanes;
                      break a;
                    }
                  } else if (currentFirstChild.elementType === key || "object" === typeof key && null !== key && key.$$typeof === REACT_LAZY_TYPE && resolveLazy(key) === currentFirstChild.type) {
                    deleteRemainingChildren(
                      returnFiber,
                      currentFirstChild.sibling
                    );
                    lanes = useFiber(currentFirstChild, newChild.props);
                    coerceRef(lanes, newChild);
                    lanes.return = returnFiber;
                    returnFiber = lanes;
                    break a;
                  }
                  deleteRemainingChildren(returnFiber, currentFirstChild);
                  break;
                } else deleteChild(returnFiber, currentFirstChild);
                currentFirstChild = currentFirstChild.sibling;
              }
              newChild.type === REACT_FRAGMENT_TYPE ? (lanes = createFiberFromFragment(
                newChild.props.children,
                returnFiber.mode,
                lanes,
                newChild.key
              ), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = lanes) : (lanes = createFiberFromTypeAndProps(
                newChild.type,
                newChild.key,
                newChild.props,
                null,
                returnFiber.mode,
                lanes
              ), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = lanes);
            }
            return placeSingleChild(returnFiber);
          case REACT_PORTAL_TYPE:
            a: {
              for (key = newChild.key; null !== currentFirstChild; ) {
                if (currentFirstChild.key === key)
                  if (4 === currentFirstChild.tag && currentFirstChild.stateNode.containerInfo === newChild.containerInfo && currentFirstChild.stateNode.implementation === newChild.implementation) {
                    deleteRemainingChildren(
                      returnFiber,
                      currentFirstChild.sibling
                    );
                    lanes = useFiber(currentFirstChild, newChild.children || []);
                    lanes.return = returnFiber;
                    returnFiber = lanes;
                    break a;
                  } else {
                    deleteRemainingChildren(returnFiber, currentFirstChild);
                    break;
                  }
                else deleteChild(returnFiber, currentFirstChild);
                currentFirstChild = currentFirstChild.sibling;
              }
              lanes = createFiberFromPortal(newChild, returnFiber.mode, lanes);
              lanes.return = returnFiber;
              returnFiber = lanes;
            }
            return placeSingleChild(returnFiber);
          case REACT_LAZY_TYPE:
            return newChild = resolveLazy(newChild), reconcileChildFibersImpl(
              returnFiber,
              currentFirstChild,
              newChild,
              lanes
            );
        }
        if (isArrayImpl(newChild))
          return reconcileChildrenArray(
            returnFiber,
            currentFirstChild,
            newChild,
            lanes
          );
        if (getIteratorFn(newChild)) {
          key = getIteratorFn(newChild);
          if ("function" !== typeof key) throw Error(formatProdErrorMessage(150));
          newChild = key.call(newChild);
          return reconcileChildrenIterator(
            returnFiber,
            currentFirstChild,
            newChild,
            lanes
          );
        }
        if ("function" === typeof newChild.then)
          return reconcileChildFibersImpl(
            returnFiber,
            currentFirstChild,
            unwrapThenable(newChild),
            lanes
          );
        if (newChild.$$typeof === REACT_CONTEXT_TYPE)
          return reconcileChildFibersImpl(
            returnFiber,
            currentFirstChild,
            readContextDuringReconciliation(returnFiber, newChild),
            lanes
          );
        throwOnInvalidObjectTypeImpl(returnFiber, newChild);
      }
      return "string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild ? (newChild = "" + newChild, null !== currentFirstChild && 6 === currentFirstChild.tag ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling), lanes = useFiber(currentFirstChild, newChild), lanes.return = returnFiber, returnFiber = lanes) : (deleteRemainingChildren(returnFiber, currentFirstChild), lanes = createFiberFromText(newChild, returnFiber.mode, lanes), lanes.return = returnFiber, returnFiber = lanes), placeSingleChild(returnFiber)) : deleteRemainingChildren(returnFiber, currentFirstChild);
    }
    return function(returnFiber, currentFirstChild, newChild, lanes) {
      try {
        thenableIndexCounter$1 = 0;
        var firstChildFiber = reconcileChildFibersImpl(
          returnFiber,
          currentFirstChild,
          newChild,
          lanes
        );
        thenableState$1 = null;
        return firstChildFiber;
      } catch (x) {
        if (x === SuspenseException || x === SuspenseActionException) throw x;
        var fiber = createFiberImplClass(29, x, null, returnFiber.mode);
        fiber.lanes = lanes;
        fiber.return = returnFiber;
        return fiber;
      } finally {
      }
    };
  }
  var reconcileChildFibers = createChildReconciler(true), mountChildFibers = createChildReconciler(false), hasForceUpdate = false;
  function initializeUpdateQueue(fiber) {
    fiber.updateQueue = {
      baseState: fiber.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function cloneUpdateQueue(current, workInProgress2) {
    current = current.updateQueue;
    workInProgress2.updateQueue === current && (workInProgress2.updateQueue = {
      baseState: current.baseState,
      firstBaseUpdate: current.firstBaseUpdate,
      lastBaseUpdate: current.lastBaseUpdate,
      shared: current.shared,
      callbacks: null
    });
  }
  function createUpdate(lane) {
    return { lane, tag: 0, payload: null, callback: null, next: null };
  }
  function enqueueUpdate(fiber, update, lane) {
    var updateQueue = fiber.updateQueue;
    if (null === updateQueue) return null;
    updateQueue = updateQueue.shared;
    if (0 !== (executionContext & 2)) {
      var pending = updateQueue.pending;
      null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
      updateQueue.pending = update;
      update = getRootForUpdatedFiber(fiber);
      markUpdateLaneFromFiberToRoot(fiber, null, lane);
      return update;
    }
    enqueueUpdate$1(fiber, updateQueue, update, lane);
    return getRootForUpdatedFiber(fiber);
  }
  function entangleTransitions(root2, fiber, lane) {
    fiber = fiber.updateQueue;
    if (null !== fiber && (fiber = fiber.shared, 0 !== (lane & 4194048))) {
      var queueLanes = fiber.lanes;
      queueLanes &= root2.pendingLanes;
      lane |= queueLanes;
      fiber.lanes = lane;
      markRootEntangled(root2, lane);
    }
  }
  function enqueueCapturedUpdate(workInProgress2, capturedUpdate) {
    var queue = workInProgress2.updateQueue, current = workInProgress2.alternate;
    if (null !== current && (current = current.updateQueue, queue === current)) {
      var newFirst = null, newLast = null;
      queue = queue.firstBaseUpdate;
      if (null !== queue) {
        do {
          var clone = {
            lane: queue.lane,
            tag: queue.tag,
            payload: queue.payload,
            callback: null,
            next: null
          };
          null === newLast ? newFirst = newLast = clone : newLast = newLast.next = clone;
          queue = queue.next;
        } while (null !== queue);
        null === newLast ? newFirst = newLast = capturedUpdate : newLast = newLast.next = capturedUpdate;
      } else newFirst = newLast = capturedUpdate;
      queue = {
        baseState: current.baseState,
        firstBaseUpdate: newFirst,
        lastBaseUpdate: newLast,
        shared: current.shared,
        callbacks: current.callbacks
      };
      workInProgress2.updateQueue = queue;
      return;
    }
    workInProgress2 = queue.lastBaseUpdate;
    null === workInProgress2 ? queue.firstBaseUpdate = capturedUpdate : workInProgress2.next = capturedUpdate;
    queue.lastBaseUpdate = capturedUpdate;
  }
  var didReadFromEntangledAsyncAction = false;
  function suspendIfUpdateReadFromEntangledAsyncAction() {
    if (didReadFromEntangledAsyncAction) {
      var entangledActionThenable = currentEntangledActionThenable;
      if (null !== entangledActionThenable) throw entangledActionThenable;
    }
  }
  function processUpdateQueue(workInProgress$jscomp$0, props, instance$jscomp$0, renderLanes2) {
    didReadFromEntangledAsyncAction = false;
    var queue = workInProgress$jscomp$0.updateQueue;
    hasForceUpdate = false;
    var firstBaseUpdate = queue.firstBaseUpdate, lastBaseUpdate = queue.lastBaseUpdate, pendingQueue = queue.shared.pending;
    if (null !== pendingQueue) {
      queue.shared.pending = null;
      var lastPendingUpdate = pendingQueue, firstPendingUpdate = lastPendingUpdate.next;
      lastPendingUpdate.next = null;
      null === lastBaseUpdate ? firstBaseUpdate = firstPendingUpdate : lastBaseUpdate.next = firstPendingUpdate;
      lastBaseUpdate = lastPendingUpdate;
      var current = workInProgress$jscomp$0.alternate;
      null !== current && (current = current.updateQueue, pendingQueue = current.lastBaseUpdate, pendingQueue !== lastBaseUpdate && (null === pendingQueue ? current.firstBaseUpdate = firstPendingUpdate : pendingQueue.next = firstPendingUpdate, current.lastBaseUpdate = lastPendingUpdate));
    }
    if (null !== firstBaseUpdate) {
      var newState = queue.baseState;
      lastBaseUpdate = 0;
      current = firstPendingUpdate = lastPendingUpdate = null;
      pendingQueue = firstBaseUpdate;
      do {
        var updateLane = pendingQueue.lane & -536870913, isHiddenUpdate = updateLane !== pendingQueue.lane;
        if (isHiddenUpdate ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes2 & updateLane) === updateLane) {
          0 !== updateLane && updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction = true);
          null !== current && (current = current.next = {
            lane: 0,
            tag: pendingQueue.tag,
            payload: pendingQueue.payload,
            callback: null,
            next: null
          });
          a: {
            var workInProgress2 = workInProgress$jscomp$0, update = pendingQueue;
            updateLane = props;
            var instance = instance$jscomp$0;
            switch (update.tag) {
              case 1:
                workInProgress2 = update.payload;
                if ("function" === typeof workInProgress2) {
                  newState = workInProgress2.call(instance, newState, updateLane);
                  break a;
                }
                newState = workInProgress2;
                break a;
              case 3:
                workInProgress2.flags = workInProgress2.flags & -65537 | 128;
              case 0:
                workInProgress2 = update.payload;
                updateLane = "function" === typeof workInProgress2 ? workInProgress2.call(instance, newState, updateLane) : workInProgress2;
                if (null === updateLane || void 0 === updateLane) break a;
                newState = assign({}, newState, updateLane);
                break a;
              case 2:
                hasForceUpdate = true;
            }
          }
          updateLane = pendingQueue.callback;
          null !== updateLane && (workInProgress$jscomp$0.flags |= 64, isHiddenUpdate && (workInProgress$jscomp$0.flags |= 8192), isHiddenUpdate = queue.callbacks, null === isHiddenUpdate ? queue.callbacks = [updateLane] : isHiddenUpdate.push(updateLane));
        } else
          isHiddenUpdate = {
            lane: updateLane,
            tag: pendingQueue.tag,
            payload: pendingQueue.payload,
            callback: pendingQueue.callback,
            next: null
          }, null === current ? (firstPendingUpdate = current = isHiddenUpdate, lastPendingUpdate = newState) : current = current.next = isHiddenUpdate, lastBaseUpdate |= updateLane;
        pendingQueue = pendingQueue.next;
        if (null === pendingQueue)
          if (pendingQueue = queue.shared.pending, null === pendingQueue)
            break;
          else
            isHiddenUpdate = pendingQueue, pendingQueue = isHiddenUpdate.next, isHiddenUpdate.next = null, queue.lastBaseUpdate = isHiddenUpdate, queue.shared.pending = null;
      } while (1);
      null === current && (lastPendingUpdate = newState);
      queue.baseState = lastPendingUpdate;
      queue.firstBaseUpdate = firstPendingUpdate;
      queue.lastBaseUpdate = current;
      null === firstBaseUpdate && (queue.shared.lanes = 0);
      workInProgressRootSkippedLanes |= lastBaseUpdate;
      workInProgress$jscomp$0.lanes = lastBaseUpdate;
      workInProgress$jscomp$0.memoizedState = newState;
    }
  }
  function callCallback(callback, context) {
    if ("function" !== typeof callback)
      throw Error(formatProdErrorMessage(191, callback));
    callback.call(context);
  }
  function commitCallbacks(updateQueue, context) {
    var callbacks = updateQueue.callbacks;
    if (null !== callbacks)
      for (updateQueue.callbacks = null, updateQueue = 0; updateQueue < callbacks.length; updateQueue++)
        callCallback(callbacks[updateQueue], context);
  }
  var currentTreeHiddenStackCursor = createCursor(null), prevEntangledRenderLanesCursor = createCursor(0);
  function pushHiddenContext(fiber, context) {
    fiber = entangledRenderLanes;
    push(prevEntangledRenderLanesCursor, fiber);
    push(currentTreeHiddenStackCursor, context);
    entangledRenderLanes = fiber | context.baseLanes;
  }
  function reuseHiddenContextOnStack() {
    push(prevEntangledRenderLanesCursor, entangledRenderLanes);
    push(currentTreeHiddenStackCursor, currentTreeHiddenStackCursor.current);
  }
  function popHiddenContext() {
    entangledRenderLanes = prevEntangledRenderLanesCursor.current;
    pop(currentTreeHiddenStackCursor);
    pop(prevEntangledRenderLanesCursor);
  }
  var suspenseHandlerStackCursor = createCursor(null), shellBoundary = null;
  function pushPrimaryTreeSuspenseHandler(handler) {
    var current = handler.alternate;
    push(suspenseStackCursor, suspenseStackCursor.current & 1);
    push(suspenseHandlerStackCursor, handler);
    null === shellBoundary && (null === current || null !== currentTreeHiddenStackCursor.current ? shellBoundary = handler : null !== current.memoizedState && (shellBoundary = handler));
  }
  function pushDehydratedActivitySuspenseHandler(fiber) {
    push(suspenseStackCursor, suspenseStackCursor.current);
    push(suspenseHandlerStackCursor, fiber);
    null === shellBoundary && (shellBoundary = fiber);
  }
  function pushOffscreenSuspenseHandler(fiber) {
    22 === fiber.tag ? (push(suspenseStackCursor, suspenseStackCursor.current), push(suspenseHandlerStackCursor, fiber), null === shellBoundary && (shellBoundary = fiber)) : reuseSuspenseHandlerOnStack();
  }
  function reuseSuspenseHandlerOnStack() {
    push(suspenseStackCursor, suspenseStackCursor.current);
    push(suspenseHandlerStackCursor, suspenseHandlerStackCursor.current);
  }
  function popSuspenseHandler(fiber) {
    pop(suspenseHandlerStackCursor);
    shellBoundary === fiber && (shellBoundary = null);
    pop(suspenseStackCursor);
  }
  var suspenseStackCursor = createCursor(0);
  function pushSuspenseListContext(fiber, newContext) {
    push(suspenseHandlerStackCursor, suspenseHandlerStackCursor.current);
    push(suspenseStackCursor, newContext);
  }
  function popSuspenseListContext(fiber) {
    pop(suspenseStackCursor);
    pop(suspenseHandlerStackCursor);
    shellBoundary === fiber && (shellBoundary = null);
  }
  function findFirstSuspended(row) {
    for (var node = row; null !== node; ) {
      if (13 === node.tag) {
        var state = node.memoizedState;
        if (null !== state && (state = state.dehydrated, null === state || isSuspenseInstancePending(state) || isSuspenseInstanceFallback(state)))
          return node;
      } else if (19 === node.tag && "independent" !== node.memoizedProps.revealOrder) {
        if (0 !== (node.flags & 128)) return node;
      } else if (null !== node.child) {
        node.child.return = node;
        node = node.child;
        continue;
      }
      if (node === row) break;
      for (; null === node.sibling; ) {
        if (null === node.return || node.return === row) return null;
        node = node.return;
      }
      node.sibling.return = node.return;
      node = node.sibling;
    }
    return null;
  }
  var renderLanes = 0, currentlyRenderingFiber = null, currentHook = null, workInProgressHook = null, didScheduleRenderPhaseUpdate = false, didScheduleRenderPhaseUpdateDuringThisPass = false, shouldDoubleInvokeUserFnsInHooksDEV = false, localIdCounter = 0, thenableIndexCounter = 0, thenableState = null, globalClientIdCounter = 0;
  function throwInvalidHookError() {
    throw Error(formatProdErrorMessage(321));
  }
  function areHookInputsEqual(nextDeps, prevDeps) {
    if (null === prevDeps) return false;
    for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++)
      if (!objectIs(nextDeps[i], prevDeps[i])) return false;
    return true;
  }
  function renderWithHooks(current, workInProgress2, Component, props, secondArg, nextRenderLanes) {
    renderLanes = nextRenderLanes;
    currentlyRenderingFiber = workInProgress2;
    workInProgress2.memoizedState = null;
    workInProgress2.updateQueue = null;
    workInProgress2.lanes = 0;
    ReactSharedInternals.H = null === current || null === current.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
    shouldDoubleInvokeUserFnsInHooksDEV = false;
    nextRenderLanes = Component(props, secondArg);
    shouldDoubleInvokeUserFnsInHooksDEV = false;
    didScheduleRenderPhaseUpdateDuringThisPass && (nextRenderLanes = renderWithHooksAgain(
      workInProgress2,
      Component,
      props,
      secondArg
    ));
    finishRenderingHooks(current);
    return nextRenderLanes;
  }
  function finishRenderingHooks(current) {
    ReactSharedInternals.H = ContextOnlyDispatcher;
    var didRenderTooFewHooks = null !== currentHook && null !== currentHook.next;
    renderLanes = 0;
    workInProgressHook = currentHook = currentlyRenderingFiber = null;
    didScheduleRenderPhaseUpdate = false;
    thenableIndexCounter = 0;
    thenableState = null;
    if (didRenderTooFewHooks) throw Error(formatProdErrorMessage(300));
    null === current || didReceiveUpdate || (current = current.dependencies, null !== current && checkIfContextChanged(current) && (didReceiveUpdate = true));
  }
  function renderWithHooksAgain(workInProgress2, Component, props, secondArg) {
    currentlyRenderingFiber = workInProgress2;
    var numberOfReRenders = 0;
    do {
      didScheduleRenderPhaseUpdateDuringThisPass && (thenableState = null);
      thenableIndexCounter = 0;
      didScheduleRenderPhaseUpdateDuringThisPass = false;
      if (25 <= numberOfReRenders) throw Error(formatProdErrorMessage(301));
      numberOfReRenders += 1;
      workInProgressHook = currentHook = null;
      if (null != workInProgress2.updateQueue) {
        var children = workInProgress2.updateQueue;
        children.lastEffect = null;
        children.events = null;
        children.stores = null;
        null != children.memoCache && (children.memoCache.index = 0);
      }
      ReactSharedInternals.H = HooksDispatcherOnRerender;
      children = Component(props, secondArg);
    } while (didScheduleRenderPhaseUpdateDuringThisPass);
    return children;
  }
  function TransitionAwareHostComponent() {
    var dispatcher = ReactSharedInternals.H, maybeThenable = dispatcher.useState()[0];
    maybeThenable = "function" === typeof maybeThenable.then ? useThenable(maybeThenable) : maybeThenable;
    dispatcher = dispatcher.useState()[0];
    (null !== currentHook ? currentHook.memoizedState : null) !== dispatcher && (currentlyRenderingFiber.flags |= 1024);
    return maybeThenable;
  }
  function checkDidRenderIdHook() {
    var didRenderIdHook = 0 !== localIdCounter;
    localIdCounter = 0;
    return didRenderIdHook;
  }
  function bailoutHooks(current, workInProgress2, lanes) {
    workInProgress2.updateQueue = current.updateQueue;
    workInProgress2.flags &= -2053;
    current.lanes &= ~lanes;
  }
  function resetHooksOnUnwind(workInProgress2) {
    if (didScheduleRenderPhaseUpdate) {
      for (workInProgress2 = workInProgress2.memoizedState; null !== workInProgress2; ) {
        var queue = workInProgress2.queue;
        null !== queue && (queue.pending = null);
        workInProgress2 = workInProgress2.next;
      }
      didScheduleRenderPhaseUpdate = false;
    }
    renderLanes = 0;
    workInProgressHook = currentHook = currentlyRenderingFiber = null;
    didScheduleRenderPhaseUpdateDuringThisPass = false;
    thenableIndexCounter = localIdCounter = 0;
    thenableState = null;
  }
  function mountWorkInProgressHook() {
    var hook = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = hook : workInProgressHook = workInProgressHook.next = hook;
    return workInProgressHook;
  }
  function updateWorkInProgressHook() {
    if (null === currentHook) {
      var nextCurrentHook = currentlyRenderingFiber.alternate;
      nextCurrentHook = null !== nextCurrentHook ? nextCurrentHook.memoizedState : null;
    } else nextCurrentHook = currentHook.next;
    var nextWorkInProgressHook = null === workInProgressHook ? currentlyRenderingFiber.memoizedState : workInProgressHook.next;
    if (null !== nextWorkInProgressHook)
      workInProgressHook = nextWorkInProgressHook, currentHook = nextCurrentHook;
    else {
      if (null === nextCurrentHook) {
        if (null === currentlyRenderingFiber.alternate)
          throw Error(formatProdErrorMessage(467));
        throw Error(formatProdErrorMessage(310));
      }
      currentHook = nextCurrentHook;
      nextCurrentHook = {
        memoizedState: currentHook.memoizedState,
        baseState: currentHook.baseState,
        baseQueue: currentHook.baseQueue,
        queue: currentHook.queue,
        next: null
      };
      null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = nextCurrentHook : workInProgressHook = workInProgressHook.next = nextCurrentHook;
    }
    return workInProgressHook;
  }
  function createFunctionComponentUpdateQueue() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function useThenable(thenable) {
    var index2 = thenableIndexCounter;
    thenableIndexCounter += 1;
    null === thenableState && (thenableState = []);
    thenable = trackUsedThenable(thenableState, thenable, index2);
    index2 = currentlyRenderingFiber;
    null === (null === workInProgressHook ? index2.memoizedState : workInProgressHook.next) && (index2 = index2.alternate, ReactSharedInternals.H = null === index2 || null === index2.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate);
    return thenable;
  }
  function use(usable) {
    if (null !== usable && "object" === typeof usable) {
      if ("function" === typeof usable.then) return useThenable(usable);
      if (usable.$$typeof === REACT_RECOVERABLE_TYPE) return;
      if (usable.$$typeof === REACT_CONTEXT_TYPE) return readContext(usable);
    }
    throw Error(formatProdErrorMessage(438, String(usable)));
  }
  function useMemoCache(size) {
    var memoCache = null, updateQueue = currentlyRenderingFiber.updateQueue;
    null !== updateQueue && (memoCache = updateQueue.memoCache);
    if (null == memoCache) {
      var current = currentlyRenderingFiber.alternate;
      null !== current && (current = current.updateQueue, null !== current && (current = current.memoCache, null != current && (memoCache = {
        data: current.data.map(function(array) {
          return array.slice();
        }),
        index: 0
      })));
    }
    null == memoCache && (memoCache = { data: [], index: 0 });
    null === updateQueue && (updateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = updateQueue);
    updateQueue.memoCache = memoCache;
    updateQueue = memoCache.data[memoCache.index];
    if (void 0 === updateQueue)
      for (updateQueue = memoCache.data[memoCache.index] = Array(size), current = 0; current < size; current++)
        updateQueue[current] = REACT_MEMO_CACHE_SENTINEL;
    memoCache.index++;
    return updateQueue;
  }
  function basicStateReducer(state, action) {
    return "function" === typeof action ? action(state) : action;
  }
  function updateReducer(reducer) {
    var hook = updateWorkInProgressHook();
    return updateReducerImpl(hook, currentHook, reducer);
  }
  function updateReducerImpl(hook, current, reducer) {
    var queue = hook.queue;
    if (null === queue) throw Error(formatProdErrorMessage(311));
    queue.lastRenderedReducer = reducer;
    var baseQueue = hook.baseQueue, pendingQueue = queue.pending;
    if (null !== pendingQueue) {
      if (null !== baseQueue) {
        var baseFirst = baseQueue.next;
        baseQueue.next = pendingQueue.next;
        pendingQueue.next = baseFirst;
      }
      current.baseQueue = baseQueue = pendingQueue;
      queue.pending = null;
    }
    pendingQueue = hook.baseState;
    if (null === baseQueue) hook.memoizedState = pendingQueue;
    else {
      current = baseQueue.next;
      var newBaseQueueFirst = baseFirst = null, newBaseQueueLast = null, update = current, didReadFromEntangledAsyncAction$64 = false;
      do {
        var updateLane = update.lane & -536870913;
        if (updateLane !== update.lane ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes & updateLane) === updateLane) {
          var revertLane = update.revertLane;
          if (0 === revertLane)
            null !== newBaseQueueLast && (newBaseQueueLast = newBaseQueueLast.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: update.action,
              hasEagerState: update.hasEagerState,
              eagerState: update.eagerState,
              next: null
            }), updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction$64 = true);
          else if ((renderLanes & revertLane) === revertLane) {
            update = update.next;
            revertLane === currentEntangledLane && (didReadFromEntangledAsyncAction$64 = true);
            continue;
          } else
            updateLane = {
              lane: 0,
              revertLane: update.revertLane,
              gesture: null,
              action: update.action,
              hasEagerState: update.hasEagerState,
              eagerState: update.eagerState,
              next: null
            }, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = updateLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = updateLane, currentlyRenderingFiber.lanes |= revertLane, workInProgressRootSkippedLanes |= revertLane;
          updateLane = update.action;
          shouldDoubleInvokeUserFnsInHooksDEV && reducer(pendingQueue, updateLane);
          pendingQueue = update.hasEagerState ? update.eagerState : reducer(pendingQueue, updateLane);
        } else
          revertLane = {
            lane: updateLane,
            revertLane: update.revertLane,
            gesture: update.gesture,
            action: update.action,
            hasEagerState: update.hasEagerState,
            eagerState: update.eagerState,
            next: null
          }, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = revertLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = revertLane, currentlyRenderingFiber.lanes |= updateLane, workInProgressRootSkippedLanes |= updateLane;
        update = update.next;
      } while (null !== update && update !== current);
      null === newBaseQueueLast ? baseFirst = pendingQueue : newBaseQueueLast.next = newBaseQueueFirst;
      if (!objectIs(pendingQueue, hook.memoizedState) && (didReceiveUpdate = true, didReadFromEntangledAsyncAction$64 && (reducer = currentEntangledActionThenable, null !== reducer)))
        throw reducer;
      hook.memoizedState = pendingQueue;
      hook.baseState = baseFirst;
      hook.baseQueue = newBaseQueueLast;
      queue.lastRenderedState = pendingQueue;
    }
    null === baseQueue && (queue.lanes = 0);
    return [hook.memoizedState, queue.dispatch];
  }
  function rerenderReducer(reducer) {
    var hook = updateWorkInProgressHook(), queue = hook.queue;
    if (null === queue) throw Error(formatProdErrorMessage(311));
    queue.lastRenderedReducer = reducer;
    var dispatch = queue.dispatch, lastRenderPhaseUpdate = queue.pending, newState = hook.memoizedState;
    if (null !== lastRenderPhaseUpdate) {
      queue.pending = null;
      var update = lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
      do
        newState = reducer(newState, update.action), update = update.next;
      while (update !== lastRenderPhaseUpdate);
      objectIs(newState, hook.memoizedState) || (didReceiveUpdate = true);
      hook.memoizedState = newState;
      null === hook.baseQueue && (hook.baseState = newState);
      queue.lastRenderedState = newState;
    }
    return [newState, dispatch];
  }
  function updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
    var fiber = currentlyRenderingFiber, hook = updateWorkInProgressHook(), isHydrating$jscomp$0 = isHydrating;
    if (isHydrating$jscomp$0) {
      if (void 0 === getServerSnapshot) throw Error(formatProdErrorMessage(407));
      getServerSnapshot = getServerSnapshot();
    } else getServerSnapshot = getSnapshot();
    var snapshotChanged = !objectIs(
      (currentHook || hook).memoizedState,
      getServerSnapshot
    );
    snapshotChanged && (hook.memoizedState = getServerSnapshot, didReceiveUpdate = true);
    hook = hook.queue;
    updateEffect(subscribeToStore.bind(null, fiber, hook, subscribe), [
      subscribe
    ]);
    subscribe = hook.getSnapshot !== getSnapshot || snapshotChanged || null !== workInProgressHook && 0 !== (workInProgressHook.memoizedState.tag & 1);
    pushSimpleEffect(
      subscribe ? 9 : 8,
      { destroy: void 0 },
      updateStoreInstance.bind(null, fiber, hook, getServerSnapshot, getSnapshot),
      null
    );
    if (subscribe) {
      fiber.flags |= 2048;
      if (null === workInProgressRoot) throw Error(formatProdErrorMessage(349));
      isHydrating$jscomp$0 || 0 !== (renderLanes & 127) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
    }
    return getServerSnapshot;
  }
  function pushStoreConsistencyCheck(fiber, getSnapshot, renderedSnapshot) {
    fiber.flags |= 16384;
    fiber = { getSnapshot, value: renderedSnapshot };
    getSnapshot = currentlyRenderingFiber.updateQueue;
    null === getSnapshot ? (getSnapshot = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = getSnapshot, getSnapshot.stores = [fiber]) : (renderedSnapshot = getSnapshot.stores, null === renderedSnapshot ? getSnapshot.stores = [fiber] : renderedSnapshot.push(fiber));
  }
  function updateStoreInstance(fiber, inst, nextSnapshot, getSnapshot) {
    inst.value = nextSnapshot;
    inst.getSnapshot = getSnapshot;
    checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
  }
  function subscribeToStore(fiber, inst, subscribe) {
    return subscribe(function() {
      checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
    });
  }
  function checkIfSnapshotChanged(inst) {
    var latestGetSnapshot = inst.getSnapshot;
    inst = inst.value;
    try {
      var nextValue = latestGetSnapshot();
      return !objectIs(inst, nextValue);
    } catch (error) {
      return true;
    }
  }
  function forceStoreRerender(fiber) {
    var root2 = enqueueConcurrentRenderForLane(fiber, 2);
    null !== root2 && scheduleUpdateOnFiber(root2, fiber, 2);
  }
  function mountStateImpl(initialState) {
    var hook = mountWorkInProgressHook();
    if ("function" === typeof initialState) {
      var initialStateInitializer = initialState;
      initialState = initialStateInitializer();
      if (shouldDoubleInvokeUserFnsInHooksDEV) {
        setIsStrictModeForDevtools(true);
        try {
          initialStateInitializer();
        } finally {
          setIsStrictModeForDevtools(false);
        }
      }
    }
    hook.memoizedState = hook.baseState = initialState;
    hook.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: basicStateReducer,
      lastRenderedState: initialState
    };
    return hook;
  }
  function updateOptimisticImpl(hook, current, passthrough, reducer) {
    hook.baseState = passthrough;
    return updateReducerImpl(
      hook,
      currentHook,
      "function" === typeof reducer ? reducer : basicStateReducer
    );
  }
  function dispatchActionState(fiber, actionQueue, setPendingState, setState, payload) {
    if (isRenderPhaseUpdate(fiber)) throw Error(formatProdErrorMessage(485));
    fiber = actionQueue.action;
    if (null !== fiber) {
      var actionNode = {
        payload,
        action: fiber,
        next: null,
        isTransition: true,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(listener) {
          actionNode.listeners.push(listener);
        }
      };
      null !== ReactSharedInternals.T ? setPendingState(true) : actionNode.isTransition = false;
      setState(actionNode);
      setPendingState = actionQueue.pending;
      null === setPendingState ? (actionNode.next = actionQueue.pending = actionNode, runActionStateAction(actionQueue, actionNode)) : (actionNode.next = setPendingState.next, actionQueue.pending = setPendingState.next = actionNode);
    }
  }
  function runActionStateAction(actionQueue, node) {
    var action = node.action, payload = node.payload, prevState = actionQueue.state;
    if (node.isTransition) {
      var prevTransition = ReactSharedInternals.T, currentTransition = {};
      currentTransition.types = null !== prevTransition ? prevTransition.types : null;
      ReactSharedInternals.T = currentTransition;
      try {
        var returnValue = action(prevState, payload), onStartTransitionFinish = ReactSharedInternals.S;
        null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
        handleActionReturnValue(actionQueue, node, returnValue);
      } catch (error) {
        onActionError(actionQueue, node, error);
      } finally {
        null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
      }
    } else
      try {
        prevTransition = action(prevState, payload), handleActionReturnValue(actionQueue, node, prevTransition);
      } catch (error$70) {
        onActionError(actionQueue, node, error$70);
      }
  }
  function handleActionReturnValue(actionQueue, node, returnValue) {
    null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then ? returnValue.then(
      function(nextState) {
        onActionSuccess(actionQueue, node, nextState);
      },
      function(error) {
        return onActionError(actionQueue, node, error);
      }
    ) : onActionSuccess(actionQueue, node, returnValue);
  }
  function onActionSuccess(actionQueue, actionNode, nextState) {
    actionNode.status = "fulfilled";
    actionNode.value = nextState;
    notifyActionListeners(actionNode);
    actionQueue.state = nextState;
    actionNode = actionQueue.pending;
    null !== actionNode && (nextState = actionNode.next, nextState === actionNode ? actionQueue.pending = null : (nextState = nextState.next, actionNode.next = nextState, runActionStateAction(actionQueue, nextState)));
  }
  function onActionError(actionQueue, actionNode, error) {
    var last = actionQueue.pending;
    actionQueue.pending = null;
    if (null !== last) {
      last = last.next;
      do
        actionNode.status = "rejected", actionNode.reason = error, notifyActionListeners(actionNode), actionNode = actionNode.next;
      while (actionNode !== last);
    }
    actionQueue.action = null;
  }
  function notifyActionListeners(actionNode) {
    actionNode = actionNode.listeners;
    for (var i = 0; i < actionNode.length; i++) (0, actionNode[i])();
  }
  function actionStateReducer(oldState, newState) {
    return newState;
  }
  function mountActionState(action, initialStateProp) {
    if (isHydrating) {
      var ssrFormState = workInProgressRoot.formState;
      if (null !== ssrFormState) {
        a: {
          var JSCompiler_inline_result = currentlyRenderingFiber;
          if (isHydrating) {
            if (nextHydratableInstance) {
              b: {
                var JSCompiler_inline_result$jscomp$0 = nextHydratableInstance;
                for (var inRootOrSingleton = rootOrSingletonContext; 8 !== JSCompiler_inline_result$jscomp$0.nodeType; ) {
                  if (!inRootOrSingleton) {
                    JSCompiler_inline_result$jscomp$0 = null;
                    break b;
                  }
                  JSCompiler_inline_result$jscomp$0 = getNextHydratable(
                    JSCompiler_inline_result$jscomp$0.nextSibling
                  );
                  if (null === JSCompiler_inline_result$jscomp$0) {
                    JSCompiler_inline_result$jscomp$0 = null;
                    break b;
                  }
                }
                inRootOrSingleton = JSCompiler_inline_result$jscomp$0.data;
                JSCompiler_inline_result$jscomp$0 = "F!" === inRootOrSingleton || "F" === inRootOrSingleton ? JSCompiler_inline_result$jscomp$0 : null;
              }
              if (JSCompiler_inline_result$jscomp$0) {
                nextHydratableInstance = getNextHydratable(
                  JSCompiler_inline_result$jscomp$0.nextSibling
                );
                JSCompiler_inline_result = "F!" === JSCompiler_inline_result$jscomp$0.data;
                break a;
              }
            }
            throwOnHydrationMismatch(JSCompiler_inline_result);
          }
          JSCompiler_inline_result = false;
        }
        JSCompiler_inline_result && (initialStateProp = ssrFormState[0]);
      }
    }
    ssrFormState = mountWorkInProgressHook();
    ssrFormState.memoizedState = ssrFormState.baseState = initialStateProp;
    JSCompiler_inline_result = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: actionStateReducer,
      lastRenderedState: initialStateProp
    };
    ssrFormState.queue = JSCompiler_inline_result;
    ssrFormState = dispatchSetState.bind(
      null,
      currentlyRenderingFiber,
      JSCompiler_inline_result
    );
    JSCompiler_inline_result.dispatch = ssrFormState;
    JSCompiler_inline_result = mountStateImpl(false);
    inRootOrSingleton = dispatchOptimisticSetState.bind(
      null,
      currentlyRenderingFiber,
      false,
      JSCompiler_inline_result.queue
    );
    JSCompiler_inline_result = mountWorkInProgressHook();
    JSCompiler_inline_result$jscomp$0 = {
      state: initialStateProp,
      dispatch: null,
      action,
      pending: null
    };
    JSCompiler_inline_result.queue = JSCompiler_inline_result$jscomp$0;
    ssrFormState = dispatchActionState.bind(
      null,
      currentlyRenderingFiber,
      JSCompiler_inline_result$jscomp$0,
      inRootOrSingleton,
      ssrFormState
    );
    JSCompiler_inline_result$jscomp$0.dispatch = ssrFormState;
    JSCompiler_inline_result.memoizedState = action;
    return [initialStateProp, ssrFormState, false];
  }
  function updateActionState(action) {
    var stateHook = updateWorkInProgressHook();
    return updateActionStateImpl(stateHook, currentHook, action);
  }
  function updateActionStateImpl(stateHook, currentStateHook, action) {
    currentStateHook = updateReducerImpl(
      stateHook,
      currentStateHook,
      actionStateReducer
    )[0];
    stateHook = updateReducer(basicStateReducer)[0];
    if ("object" === typeof currentStateHook && null !== currentStateHook && "function" === typeof currentStateHook.then)
      try {
        var state = useThenable(currentStateHook);
      } catch (x) {
        if (x === SuspenseException) throw SuspenseActionException;
        throw x;
      }
    else state = currentStateHook;
    currentStateHook = updateWorkInProgressHook();
    var actionQueue = currentStateHook.queue, dispatch = actionQueue.dispatch;
    action !== currentStateHook.memoizedState && (currentlyRenderingFiber.flags |= 2048, pushSimpleEffect(
      9,
      { destroy: void 0 },
      actionStateActionEffect.bind(null, actionQueue, action),
      null
    ));
    return [state, dispatch, stateHook];
  }
  function actionStateActionEffect(actionQueue, action) {
    actionQueue.action = action;
  }
  function rerenderActionState(action) {
    var stateHook = updateWorkInProgressHook(), currentStateHook = currentHook;
    if (null !== currentStateHook)
      return updateActionStateImpl(stateHook, currentStateHook, action);
    updateWorkInProgressHook();
    stateHook = stateHook.memoizedState;
    currentStateHook = updateWorkInProgressHook();
    var dispatch = currentStateHook.queue.dispatch;
    currentStateHook.memoizedState = action;
    return [stateHook, dispatch, false];
  }
  function pushSimpleEffect(tag, inst, create, deps) {
    tag = { tag, create, deps, inst, next: null };
    inst = currentlyRenderingFiber.updateQueue;
    null === inst && (inst = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = inst);
    create = inst.lastEffect;
    null === create ? inst.lastEffect = tag.next = tag : (deps = create.next, create.next = tag, tag.next = deps, inst.lastEffect = tag);
    return tag;
  }
  function updateRef() {
    return updateWorkInProgressHook().memoizedState;
  }
  function mountEffectImpl(fiberFlags, hookFlags, create, deps) {
    var hook = mountWorkInProgressHook();
    currentlyRenderingFiber.flags |= fiberFlags;
    hook.memoizedState = pushSimpleEffect(
      1 | hookFlags,
      { destroy: void 0 },
      create,
      void 0 === deps ? null : deps
    );
  }
  function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
    var hook = updateWorkInProgressHook();
    deps = void 0 === deps ? null : deps;
    var inst = hook.memoizedState.inst;
    null !== currentHook && null !== deps && areHookInputsEqual(deps, currentHook.memoizedState.deps) ? hook.memoizedState = pushSimpleEffect(hookFlags, inst, create, deps) : (currentlyRenderingFiber.flags |= fiberFlags, hook.memoizedState = pushSimpleEffect(
      1 | hookFlags,
      inst,
      create,
      deps
    ));
  }
  function mountEffect(create, deps) {
    mountEffectImpl(8390656, 8, create, deps);
  }
  function updateEffect(create, deps) {
    updateEffectImpl(2048, 8, create, deps);
  }
  function useEffectEventImpl(payload) {
    currentlyRenderingFiber.flags |= 4;
    var componentUpdateQueue = currentlyRenderingFiber.updateQueue;
    if (null === componentUpdateQueue)
      componentUpdateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = componentUpdateQueue, componentUpdateQueue.events = [payload];
    else {
      var events = componentUpdateQueue.events;
      null === events ? componentUpdateQueue.events = [payload] : events.push(payload);
    }
  }
  function updateEvent(callback) {
    var ref = updateWorkInProgressHook().memoizedState;
    useEffectEventImpl({ ref, nextImpl: callback });
    return function() {
      if (0 !== (executionContext & 2)) throw Error(formatProdErrorMessage(440));
      return ref.impl.apply(void 0, arguments);
    };
  }
  function updateInsertionEffect(create, deps) {
    return updateEffectImpl(4, 2, create, deps);
  }
  function updateLayoutEffect(create, deps) {
    return updateEffectImpl(4, 4, create, deps);
  }
  function imperativeHandleEffect(create, ref) {
    if ("function" === typeof ref) {
      create = create();
      var refCleanup = ref(create);
      return function() {
        "function" === typeof refCleanup ? refCleanup() : ref(null);
      };
    }
    if (null !== ref && void 0 !== ref)
      return create = create(), ref.current = create, function() {
        ref.current = null;
      };
  }
  function updateImperativeHandle(ref, create, deps) {
    deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
    updateEffectImpl(4, 4, imperativeHandleEffect.bind(null, create, ref), deps);
  }
  function mountDebugValue() {
  }
  function updateCallback(callback, deps) {
    var hook = updateWorkInProgressHook();
    deps = void 0 === deps ? null : deps;
    var prevState = hook.memoizedState;
    if (null !== deps && areHookInputsEqual(deps, prevState[1]))
      return prevState[0];
    hook.memoizedState = [callback, deps];
    return callback;
  }
  function updateMemo(nextCreate, deps) {
    var hook = updateWorkInProgressHook();
    deps = void 0 === deps ? null : deps;
    var prevState = hook.memoizedState;
    if (null !== deps && areHookInputsEqual(deps, prevState[1]))
      return prevState[0];
    prevState = nextCreate();
    if (shouldDoubleInvokeUserFnsInHooksDEV) {
      setIsStrictModeForDevtools(true);
      try {
        nextCreate();
      } finally {
        setIsStrictModeForDevtools(false);
      }
    }
    hook.memoizedState = [prevState, deps];
    return prevState;
  }
  function mountDeferredValueImpl(hook, value, initialValue) {
    if (void 0 === initialValue || 0 !== (renderLanes & 1073741824) && 0 === (workInProgressRootRenderLanes & 261930))
      return hook.memoizedState = value;
    hook.memoizedState = initialValue;
    hook = requestDeferredLane();
    currentlyRenderingFiber.lanes |= hook;
    workInProgressRootSkippedLanes |= hook;
    return initialValue;
  }
  function updateDeferredValueImpl(hook, prevValue, value, initialValue) {
    if (objectIs(value, prevValue)) return value;
    if (null !== currentTreeHiddenStackCursor.current)
      return hook = mountDeferredValueImpl(hook, value, initialValue), objectIs(hook, prevValue) || (didReceiveUpdate = true), hook;
    if (0 === (renderLanes & 106) || 0 !== (renderLanes & 1073741824) && 0 === (workInProgressRootRenderLanes & 261930))
      return didReceiveUpdate = true, hook.memoizedState = value;
    hook = requestDeferredLane();
    currentlyRenderingFiber.lanes |= hook;
    workInProgressRootSkippedLanes |= hook;
    return prevValue;
  }
  function startTransition(fiber, queue, pendingState, finishedState, callback) {
    var previousPriority = ReactDOMSharedInternals.p;
    ReactDOMSharedInternals.p = 0 !== previousPriority && 8 > previousPriority ? previousPriority : 8;
    var prevTransition = ReactSharedInternals.T, currentTransition = {};
    currentTransition.types = null !== prevTransition ? prevTransition.types : null;
    ReactSharedInternals.T = currentTransition;
    dispatchOptimisticSetState(fiber, false, queue, pendingState);
    try {
      var returnValue = callback(), onStartTransitionFinish = ReactSharedInternals.S;
      null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
      if (null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then) {
        var thenableForFinishedState = chainThenableValue(
          returnValue,
          finishedState
        );
        dispatchSetStateInternal(
          fiber,
          queue,
          thenableForFinishedState,
          requestUpdateLane(fiber)
        );
      } else
        dispatchSetStateInternal(
          fiber,
          queue,
          finishedState,
          requestUpdateLane(fiber)
        );
    } catch (error) {
      dispatchSetStateInternal(
        fiber,
        queue,
        { then: function() {
        }, status: "rejected", reason: error },
        requestUpdateLane()
      );
    } finally {
      ReactDOMSharedInternals.p = previousPriority, null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
    }
  }
  function noop2() {
  }
  function startHostTransition(formFiber, pendingState, action, formData) {
    if (5 !== formFiber.tag) throw Error(formatProdErrorMessage(476));
    var queue = ensureFormComponentIsStateful(formFiber).queue;
    startTransition(
      formFiber,
      queue,
      pendingState,
      sharedNotPendingObject,
      null === action ? noop2 : function() {
        requestFormReset$1(formFiber);
        return action(formData);
      }
    );
  }
  function ensureFormComponentIsStateful(formFiber) {
    var existingStateHook = formFiber.memoizedState;
    if (null !== existingStateHook) return existingStateHook;
    existingStateHook = {
      memoizedState: sharedNotPendingObject,
      baseState: sharedNotPendingObject,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: basicStateReducer,
        lastRenderedState: sharedNotPendingObject
      },
      next: null
    };
    var initialResetState = {};
    existingStateHook.next = {
      memoizedState: initialResetState,
      baseState: initialResetState,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: basicStateReducer,
        lastRenderedState: initialResetState
      },
      next: null
    };
    formFiber.memoizedState = existingStateHook;
    formFiber = formFiber.alternate;
    null !== formFiber && (formFiber.memoizedState = existingStateHook);
    return existingStateHook;
  }
  function requestFormReset$1(formFiber) {
    var stateHook = ensureFormComponentIsStateful(formFiber);
    null === stateHook.next && (stateHook = formFiber.alternate.memoizedState);
    dispatchSetStateInternal(
      formFiber,
      stateHook.next.queue,
      {},
      requestUpdateLane()
    );
  }
  function useHostTransitionStatus() {
    return readContext(HostTransitionContext);
  }
  function updateId() {
    return updateWorkInProgressHook().memoizedState;
  }
  function updateRefresh() {
    return updateWorkInProgressHook().memoizedState;
  }
  function refreshCache(fiber) {
    for (var provider = fiber.return; null !== provider; ) {
      switch (provider.tag) {
        case 24:
        case 3:
          var lane = requestUpdateLane();
          fiber = createUpdate(lane);
          var root$73 = enqueueUpdate(provider, fiber, lane);
          null !== root$73 && (scheduleUpdateOnFiber(root$73, provider, lane), entangleTransitions(root$73, provider, lane));
          provider = { cache: createCache() };
          fiber.payload = provider;
          return;
      }
      provider = provider.return;
    }
  }
  function dispatchReducerAction(fiber, queue, action) {
    var lane = requestUpdateLane();
    action = {
      lane,
      revertLane: 0,
      gesture: null,
      action,
      hasEagerState: false,
      eagerState: null,
      next: null
    };
    isRenderPhaseUpdate(fiber) ? enqueueRenderPhaseUpdate(queue, action) : (action = enqueueConcurrentHookUpdate(fiber, queue, action, lane), null !== action && (scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane)));
  }
  function dispatchSetState(fiber, queue, action) {
    var lane = requestUpdateLane();
    dispatchSetStateInternal(fiber, queue, action, lane);
  }
  function dispatchSetStateInternal(fiber, queue, action, lane) {
    var update = {
      lane,
      revertLane: 0,
      gesture: null,
      action,
      hasEagerState: false,
      eagerState: null,
      next: null
    };
    if (isRenderPhaseUpdate(fiber)) enqueueRenderPhaseUpdate(queue, update);
    else {
      var alternate = fiber.alternate;
      if (0 === fiber.lanes && (null === alternate || 0 === alternate.lanes) && (alternate = queue.lastRenderedReducer, null !== alternate))
        try {
          var currentState = queue.lastRenderedState, eagerState = alternate(currentState, action);
          update.hasEagerState = true;
          update.eagerState = eagerState;
          if (objectIs(eagerState, currentState))
            return enqueueUpdate$1(fiber, queue, update, 0), null === workInProgressRoot && finishQueueingConcurrentUpdates(), false;
        } catch (error) {
        } finally {
        }
      action = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
      if (null !== action)
        return scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane), true;
    }
    return false;
  }
  function dispatchOptimisticSetState(fiber, throwIfDuringRender, queue, action) {
    action = {
      lane: 2,
      revertLane: requestTransitionLane(),
      gesture: null,
      action,
      hasEagerState: false,
      eagerState: null,
      next: null
    };
    if (isRenderPhaseUpdate(fiber)) {
      if (throwIfDuringRender) throw Error(formatProdErrorMessage(479));
    } else
      throwIfDuringRender = enqueueConcurrentHookUpdate(
        fiber,
        queue,
        action,
        2
      ), null !== throwIfDuringRender && scheduleUpdateOnFiber(throwIfDuringRender, fiber, 2);
  }
  function isRenderPhaseUpdate(fiber) {
    var alternate = fiber.alternate;
    return fiber === currentlyRenderingFiber || null !== alternate && alternate === currentlyRenderingFiber;
  }
  function enqueueRenderPhaseUpdate(queue, update) {
    didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = true;
    var pending = queue.pending;
    null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
    queue.pending = update;
  }
  function entangleTransitionUpdate(root2, queue, lane) {
    if (0 !== (lane & 4194048)) {
      var queueLanes = queue.lanes;
      queueLanes &= root2.pendingLanes;
      lane |= queueLanes;
      queue.lanes = lane;
      markRootEntangled(root2, lane);
    }
  }
  var ContextOnlyDispatcher = {
    readContext,
    use,
    useCallback: throwInvalidHookError,
    useContext: throwInvalidHookError,
    useEffect: throwInvalidHookError,
    useImperativeHandle: throwInvalidHookError,
    useLayoutEffect: throwInvalidHookError,
    useInsertionEffect: throwInvalidHookError,
    useMemo: throwInvalidHookError,
    useReducer: throwInvalidHookError,
    useRef: throwInvalidHookError,
    useState: throwInvalidHookError,
    useDebugValue: throwInvalidHookError,
    useDeferredValue: throwInvalidHookError,
    useTransition: throwInvalidHookError,
    useSyncExternalStore: throwInvalidHookError,
    useId: throwInvalidHookError,
    useHostTransitionStatus: throwInvalidHookError,
    useFormState: throwInvalidHookError,
    useActionState: throwInvalidHookError,
    useOptimistic: throwInvalidHookError,
    useMemoCache: throwInvalidHookError,
    useCacheRefresh: throwInvalidHookError,
    useEffectEvent: throwInvalidHookError
  }, HooksDispatcherOnMount = {
    readContext,
    use,
    useCallback: function(callback, deps) {
      mountWorkInProgressHook().memoizedState = [
        callback,
        void 0 === deps ? null : deps
      ];
      return callback;
    },
    useContext: readContext,
    useEffect: mountEffect,
    useImperativeHandle: function(ref, create, deps) {
      deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
      mountEffectImpl(
        4194308,
        4,
        imperativeHandleEffect.bind(null, create, ref),
        deps
      );
    },
    useLayoutEffect: function(create, deps) {
      return mountEffectImpl(4194308, 4, create, deps);
    },
    useInsertionEffect: function(create, deps) {
      mountEffectImpl(4, 2, create, deps);
    },
    useMemo: function(nextCreate, deps) {
      var hook = mountWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      var nextValue = nextCreate();
      if (shouldDoubleInvokeUserFnsInHooksDEV) {
        setIsStrictModeForDevtools(true);
        try {
          nextCreate();
        } finally {
          setIsStrictModeForDevtools(false);
        }
      }
      hook.memoizedState = [nextValue, deps];
      return nextValue;
    },
    useReducer: function(reducer, initialArg, init) {
      var hook = mountWorkInProgressHook();
      if (void 0 !== init) {
        var initialState = init(initialArg);
        if (shouldDoubleInvokeUserFnsInHooksDEV) {
          setIsStrictModeForDevtools(true);
          try {
            init(initialArg);
          } finally {
            setIsStrictModeForDevtools(false);
          }
        }
      } else initialState = initialArg;
      hook.memoizedState = hook.baseState = initialState;
      reducer = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: reducer,
        lastRenderedState: initialState
      };
      hook.queue = reducer;
      reducer = reducer.dispatch = dispatchReducerAction.bind(
        null,
        currentlyRenderingFiber,
        reducer
      );
      return [hook.memoizedState, reducer];
    },
    useRef: function(initialValue) {
      var hook = mountWorkInProgressHook();
      initialValue = { current: initialValue };
      return hook.memoizedState = initialValue;
    },
    useState: function(initialState) {
      initialState = mountStateImpl(initialState);
      var queue = initialState.queue, dispatch = dispatchSetState.bind(null, currentlyRenderingFiber, queue);
      queue.dispatch = dispatch;
      return [initialState.memoizedState, dispatch];
    },
    useDebugValue: mountDebugValue,
    useDeferredValue: function(value, initialValue) {
      var hook = mountWorkInProgressHook();
      return mountDeferredValueImpl(hook, value, initialValue);
    },
    useTransition: function() {
      var stateHook = mountStateImpl(false);
      stateHook = startTransition.bind(
        null,
        currentlyRenderingFiber,
        stateHook.queue,
        true,
        false
      );
      mountWorkInProgressHook().memoizedState = stateHook;
      return [false, stateHook];
    },
    useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
      var fiber = currentlyRenderingFiber, hook = mountWorkInProgressHook();
      if (isHydrating) {
        if (void 0 === getServerSnapshot)
          throw Error(formatProdErrorMessage(407));
        getServerSnapshot = getServerSnapshot();
      } else {
        getServerSnapshot = getSnapshot();
        if (null === workInProgressRoot)
          throw Error(formatProdErrorMessage(349));
        0 !== (workInProgressRootRenderLanes & 127) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
      }
      hook.memoizedState = getServerSnapshot;
      var inst = { value: getServerSnapshot, getSnapshot };
      hook.queue = inst;
      mountEffect(subscribeToStore.bind(null, fiber, inst, subscribe), [
        subscribe
      ]);
      fiber.flags |= 2048;
      pushSimpleEffect(
        9,
        { destroy: void 0 },
        updateStoreInstance.bind(
          null,
          fiber,
          inst,
          getServerSnapshot,
          getSnapshot
        ),
        null
      );
      return getServerSnapshot;
    },
    useId: function() {
      var hook = mountWorkInProgressHook(), identifierPrefix = workInProgressRoot.identifierPrefix;
      if (isHydrating) {
        var JSCompiler_inline_result = treeContextOverflow;
        var idWithLeadingBit = treeContextId;
        JSCompiler_inline_result = (idWithLeadingBit & ~(1 << 32 - clz32(idWithLeadingBit) - 1)).toString(32) + JSCompiler_inline_result;
        identifierPrefix = "_" + identifierPrefix + "R_" + JSCompiler_inline_result;
        JSCompiler_inline_result = localIdCounter++;
        0 < JSCompiler_inline_result && (identifierPrefix += "H" + JSCompiler_inline_result.toString(32));
        identifierPrefix += "_";
      } else
        JSCompiler_inline_result = globalClientIdCounter++, identifierPrefix = "_" + identifierPrefix + "r_" + JSCompiler_inline_result.toString(32) + "_";
      return hook.memoizedState = identifierPrefix;
    },
    useHostTransitionStatus,
    useFormState: mountActionState,
    useActionState: mountActionState,
    useOptimistic: function(passthrough) {
      var hook = mountWorkInProgressHook();
      hook.memoizedState = hook.baseState = passthrough;
      var queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      hook.queue = queue;
      hook = dispatchOptimisticSetState.bind(
        null,
        currentlyRenderingFiber,
        true,
        queue
      );
      queue.dispatch = hook;
      return [passthrough, hook];
    },
    useMemoCache,
    useCacheRefresh: function() {
      return mountWorkInProgressHook().memoizedState = refreshCache.bind(
        null,
        currentlyRenderingFiber
      );
    },
    useEffectEvent: function(callback) {
      var hook = mountWorkInProgressHook(), ref = { impl: callback };
      hook.memoizedState = ref;
      return function() {
        if (0 !== (executionContext & 2))
          throw Error(formatProdErrorMessage(440));
        return ref.impl.apply(void 0, arguments);
      };
    }
  }, HooksDispatcherOnUpdate = {
    readContext,
    use,
    useCallback: updateCallback,
    useContext: readContext,
    useEffect: updateEffect,
    useImperativeHandle: updateImperativeHandle,
    useInsertionEffect: updateInsertionEffect,
    useLayoutEffect: updateLayoutEffect,
    useMemo: updateMemo,
    useReducer: updateReducer,
    useRef: updateRef,
    useState: function() {
      return updateReducer(basicStateReducer);
    },
    useDebugValue: mountDebugValue,
    useDeferredValue: function(value, initialValue) {
      var hook = updateWorkInProgressHook();
      return updateDeferredValueImpl(
        hook,
        currentHook.memoizedState,
        value,
        initialValue
      );
    },
    useTransition: function() {
      var booleanOrThenable = updateReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
      return [
        "boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable),
        start
      ];
    },
    useSyncExternalStore: updateSyncExternalStore,
    useId: updateId,
    useHostTransitionStatus,
    useFormState: updateActionState,
    useActionState: updateActionState,
    useOptimistic: function(passthrough, reducer) {
      var hook = updateWorkInProgressHook();
      return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
    },
    useMemoCache,
    useCacheRefresh: updateRefresh,
    useEffectEvent: updateEvent
  }, HooksDispatcherOnRerender = {
    readContext,
    use,
    useCallback: updateCallback,
    useContext: readContext,
    useEffect: updateEffect,
    useImperativeHandle: updateImperativeHandle,
    useInsertionEffect: updateInsertionEffect,
    useLayoutEffect: updateLayoutEffect,
    useMemo: updateMemo,
    useReducer: rerenderReducer,
    useRef: updateRef,
    useState: function() {
      return rerenderReducer(basicStateReducer);
    },
    useDebugValue: mountDebugValue,
    useDeferredValue: function(value, initialValue) {
      var hook = updateWorkInProgressHook();
      return null === currentHook ? mountDeferredValueImpl(hook, value, initialValue) : updateDeferredValueImpl(
        hook,
        currentHook.memoizedState,
        value,
        initialValue
      );
    },
    useTransition: function() {
      var booleanOrThenable = rerenderReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
      return [
        "boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable),
        start
      ];
    },
    useSyncExternalStore: updateSyncExternalStore,
    useId: updateId,
    useHostTransitionStatus,
    useFormState: rerenderActionState,
    useActionState: rerenderActionState,
    useOptimistic: function(passthrough, reducer) {
      var hook = updateWorkInProgressHook();
      if (null !== currentHook)
        return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
      hook.baseState = passthrough;
      return [passthrough, hook.queue.dispatch];
    },
    useMemoCache,
    useCacheRefresh: updateRefresh,
    useEffectEvent: updateEvent
  };
  function applyDerivedStateFromProps(workInProgress2, ctor, getDerivedStateFromProps, nextProps) {
    ctor = workInProgress2.memoizedState;
    getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
    getDerivedStateFromProps = null === getDerivedStateFromProps || void 0 === getDerivedStateFromProps ? ctor : assign({}, ctor, getDerivedStateFromProps);
    workInProgress2.memoizedState = getDerivedStateFromProps;
    0 === workInProgress2.lanes && (workInProgress2.updateQueue.baseState = getDerivedStateFromProps);
  }
  var classComponentUpdater = {
    enqueueSetState: function(inst, payload, callback) {
      inst = inst._reactInternals;
      var lane = requestUpdateLane(), update = createUpdate(lane);
      update.payload = payload;
      void 0 !== callback && null !== callback && (update.callback = callback);
      payload = enqueueUpdate(inst, update, lane);
      null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
    },
    enqueueReplaceState: function(inst, payload, callback) {
      inst = inst._reactInternals;
      var lane = requestUpdateLane(), update = createUpdate(lane);
      update.tag = 1;
      update.payload = payload;
      void 0 !== callback && null !== callback && (update.callback = callback);
      payload = enqueueUpdate(inst, update, lane);
      null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
    },
    enqueueForceUpdate: function(inst, callback) {
      inst = inst._reactInternals;
      var lane = requestUpdateLane(), update = createUpdate(lane);
      update.tag = 2;
      void 0 !== callback && null !== callback && (update.callback = callback);
      callback = enqueueUpdate(inst, update, lane);
      null !== callback && (scheduleUpdateOnFiber(callback, inst, lane), entangleTransitions(callback, inst, lane));
    }
  };
  function checkShouldComponentUpdate(workInProgress2, ctor, oldProps, newProps, oldState, newState, nextContext) {
    workInProgress2 = workInProgress2.stateNode;
    return "function" === typeof workInProgress2.shouldComponentUpdate ? workInProgress2.shouldComponentUpdate(newProps, newState, nextContext) : ctor.prototype && ctor.prototype.isPureReactComponent ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState) : true;
  }
  function callComponentWillReceiveProps(workInProgress2, instance, newProps, nextContext) {
    workInProgress2 = instance.state;
    "function" === typeof instance.componentWillReceiveProps && instance.componentWillReceiveProps(newProps, nextContext);
    "function" === typeof instance.UNSAFE_componentWillReceiveProps && instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
    instance.state !== workInProgress2 && classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
  }
  function resolveClassComponentProps(Component, baseProps) {
    var newProps = baseProps;
    if ("ref" in baseProps) {
      newProps = {};
      for (var propName in baseProps)
        "ref" !== propName && (newProps[propName] = baseProps[propName]);
    }
    if (Component = Component.defaultProps) {
      newProps === baseProps && (newProps = assign({}, newProps));
      for (var propName$77 in Component)
        void 0 === newProps[propName$77] && (newProps[propName$77] = Component[propName$77]);
    }
    return newProps;
  }
  function defaultOnUncaughtError(error) {
    reportGlobalError(error);
  }
  function defaultOnCaughtError(error) {
    console.error(error);
  }
  function defaultOnRecoverableError(error) {
    reportGlobalError(error);
  }
  function logUncaughtError(root2, errorInfo) {
    try {
      var onUncaughtError = root2.onUncaughtError;
      onUncaughtError(errorInfo.value, { componentStack: errorInfo.stack });
    } catch (e$78) {
      setTimeout(function() {
        throw e$78;
      });
    }
  }
  function logCaughtError(root2, boundary, errorInfo) {
    try {
      var onCaughtError = root2.onCaughtError;
      onCaughtError(errorInfo.value, {
        componentStack: errorInfo.stack,
        errorBoundary: 1 === boundary.tag ? boundary.stateNode : null
      });
    } catch (e$79) {
      setTimeout(function() {
        throw e$79;
      });
    }
  }
  function createRootErrorUpdate(root2, errorInfo, lane) {
    lane = createUpdate(lane);
    lane.tag = 3;
    lane.payload = { element: null };
    lane.callback = function() {
      logUncaughtError(root2, errorInfo);
    };
    return lane;
  }
  function createClassErrorUpdate(lane) {
    lane = createUpdate(lane);
    lane.tag = 3;
    return lane;
  }
  function initializeClassErrorUpdate(update, root2, fiber, errorInfo) {
    var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
    if ("function" === typeof getDerivedStateFromError) {
      var error = errorInfo.value;
      update.payload = function() {
        return getDerivedStateFromError(error);
      };
      update.callback = function() {
        logCaughtError(root2, fiber, errorInfo);
      };
    }
    var inst = fiber.stateNode;
    null !== inst && "function" === typeof inst.componentDidCatch && (update.callback = function() {
      logCaughtError(root2, fiber, errorInfo);
      "function" !== typeof getDerivedStateFromError && (null === legacyErrorBoundariesThatAlreadyFailed ? legacyErrorBoundariesThatAlreadyFailed = /* @__PURE__ */ new Set([this]) : legacyErrorBoundariesThatAlreadyFailed.add(this));
      var stack = errorInfo.stack;
      this.componentDidCatch(errorInfo.value, {
        componentStack: null !== stack ? stack : ""
      });
    });
  }
  function throwException(root2, returnFiber, sourceFiber, value, rootRenderLanes) {
    sourceFiber.flags |= 32768;
    if (null !== value && "object" === typeof value && "function" === typeof value.then) {
      returnFiber = sourceFiber.alternate;
      null !== returnFiber && propagateParentContextChanges(
        returnFiber,
        sourceFiber,
        rootRenderLanes,
        true
      );
      sourceFiber = suspenseHandlerStackCursor.current;
      if (null !== sourceFiber) {
        switch (sourceFiber.tag) {
          case 31:
          case 13:
          case 19:
            return null === shellBoundary ? renderDidSuspendDelayIfPossible() : null === sourceFiber.alternate && 0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 3), sourceFiber.flags &= -257, sourceFiber.flags |= 65536, sourceFiber.lanes = rootRenderLanes, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? sourceFiber.updateQueue = /* @__PURE__ */ new Set([value]) : returnFiber.add(value), attachPingListener(root2, value, rootRenderLanes)), false;
          case 22:
            return sourceFiber.flags |= 65536, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? (returnFiber = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([value])
            }, sourceFiber.updateQueue = returnFiber) : (sourceFiber = returnFiber.retryQueue, null === sourceFiber ? returnFiber.retryQueue = /* @__PURE__ */ new Set([value]) : sourceFiber.add(value)), attachPingListener(root2, value, rootRenderLanes)), false;
        }
        throw Error(formatProdErrorMessage(435, sourceFiber.tag));
      }
      attachPingListener(root2, value, rootRenderLanes);
      renderDidSuspendDelayIfPossible();
      return false;
    }
    if (isHydrating)
      return returnFiber = suspenseHandlerStackCursor.current, null !== returnFiber ? (0 === (returnFiber.flags & 65536) && (returnFiber.flags |= 256), returnFiber.flags |= 65536, returnFiber.lanes = rootRenderLanes, value !== HydrationMismatchException && (root2 = Error(formatProdErrorMessage(422), { cause: value }), queueHydrationError(createCapturedValueAtFiber(root2, sourceFiber)))) : (value !== HydrationMismatchException && (returnFiber = Error(formatProdErrorMessage(423), {
        cause: value
      }), queueHydrationError(
        createCapturedValueAtFiber(returnFiber, sourceFiber)
      )), root2 = root2.current.alternate, root2.flags |= 65536, rootRenderLanes &= -rootRenderLanes, root2.lanes |= rootRenderLanes, value = createCapturedValueAtFiber(value, sourceFiber), rootRenderLanes = createRootErrorUpdate(
        root2.stateNode,
        value,
        rootRenderLanes
      ), enqueueCapturedUpdate(root2, rootRenderLanes), 4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2)), false;
    var wrapperError = Error(formatProdErrorMessage(520), { cause: value });
    wrapperError = createCapturedValueAtFiber(wrapperError, sourceFiber);
    null === workInProgressRootConcurrentErrors ? workInProgressRootConcurrentErrors = [wrapperError] : workInProgressRootConcurrentErrors.push(wrapperError);
    4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2);
    if (null === returnFiber) return true;
    value = createCapturedValueAtFiber(value, sourceFiber);
    sourceFiber = returnFiber;
    do {
      switch (sourceFiber.tag) {
        case 3:
          return sourceFiber.flags |= 65536, root2 = rootRenderLanes & -rootRenderLanes, sourceFiber.lanes |= root2, root2 = createRootErrorUpdate(sourceFiber.stateNode, value, root2), enqueueCapturedUpdate(sourceFiber, root2), false;
        case 1:
          returnFiber = sourceFiber.type;
          wrapperError = sourceFiber.stateNode;
          if (0 === (sourceFiber.flags & 128) && ("function" === typeof returnFiber.getDerivedStateFromError || null !== wrapperError && "function" === typeof wrapperError.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(wrapperError))))
            return sourceFiber.flags |= 65536, rootRenderLanes &= -rootRenderLanes, sourceFiber.lanes |= rootRenderLanes, rootRenderLanes = createClassErrorUpdate(rootRenderLanes), initializeClassErrorUpdate(
              rootRenderLanes,
              root2,
              sourceFiber,
              value
            ), enqueueCapturedUpdate(sourceFiber, rootRenderLanes), false;
          break;
        case 22:
          if (null !== sourceFiber.memoizedState)
            return sourceFiber.flags |= 65536, false;
      }
      sourceFiber = sourceFiber.return;
    } while (null !== sourceFiber);
    return false;
  }
  var SelectiveHydrationException = Error(formatProdErrorMessage(461)), didReceiveUpdate = false;
  function reconcileChildren(current, workInProgress2, nextChildren, renderLanes2) {
    workInProgress2.child = null === current ? mountChildFibers(workInProgress2, null, nextChildren, renderLanes2) : reconcileChildFibers(
      workInProgress2,
      current.child,
      nextChildren,
      renderLanes2
    );
  }
  function updateForwardRef(current, workInProgress2, Component, nextProps, renderLanes2) {
    Component = Component.render;
    var ref = workInProgress2.ref;
    if ("ref" in nextProps) {
      var propsWithoutRef = {};
      for (var key in nextProps)
        "ref" !== key && (propsWithoutRef[key] = nextProps[key]);
    } else propsWithoutRef = nextProps;
    prepareToReadContext(workInProgress2);
    nextProps = renderWithHooks(
      current,
      workInProgress2,
      Component,
      propsWithoutRef,
      ref,
      renderLanes2
    );
    key = checkDidRenderIdHook();
    if (null !== current && !didReceiveUpdate)
      return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
    isHydrating && key && pushMaterializedTreeId(workInProgress2);
    workInProgress2.flags |= 1;
    reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
    return workInProgress2.child;
  }
  function updateMemoComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
    if (null === current) {
      var type = Component.type;
      if ("function" === typeof type && !shouldConstruct(type) && void 0 === type.defaultProps && null === Component.compare)
        return workInProgress2.tag = 15, workInProgress2.type = type, updateSimpleMemoComponent(
          current,
          workInProgress2,
          type,
          nextProps,
          renderLanes2
        );
      current = createFiberFromTypeAndProps(
        Component.type,
        null,
        nextProps,
        workInProgress2,
        workInProgress2.mode,
        renderLanes2
      );
      current.ref = workInProgress2.ref;
      current.return = workInProgress2;
      return workInProgress2.child = current;
    }
    type = current.child;
    if (!checkScheduledUpdateOrContext(current, renderLanes2)) {
      var prevProps = type.memoizedProps;
      Component = Component.compare;
      Component = null !== Component ? Component : shallowEqual;
      if (Component(prevProps, nextProps) && current.ref === workInProgress2.ref)
        return bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
    }
    workInProgress2.flags |= 1;
    current = createWorkInProgress(type, nextProps);
    current.ref = workInProgress2.ref;
    current.return = workInProgress2;
    return workInProgress2.child = current;
  }
  function updateSimpleMemoComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
    if (null !== current) {
      var prevProps = current.memoizedProps;
      if (shallowEqual(prevProps, nextProps) && current.ref === workInProgress2.ref)
        if (didReceiveUpdate = false, workInProgress2.pendingProps = nextProps = prevProps, checkScheduledUpdateOrContext(current, renderLanes2))
          0 !== (current.flags & 131072) && (didReceiveUpdate = true);
        else
          return workInProgress2.lanes = current.lanes, bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
    }
    return updateFunctionComponent(
      current,
      workInProgress2,
      Component,
      nextProps,
      renderLanes2
    );
  }
  function updateOffscreenComponent(current, workInProgress2, renderLanes2, nextProps) {
    var nextChildren = nextProps.children, prevState = null !== current ? current.memoizedState : null;
    null === current && null === workInProgress2.stateNode && (workInProgress2.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    });
    if ("hidden" === nextProps.mode) {
      if (0 !== (workInProgress2.flags & 128)) {
        prevState = null !== prevState ? prevState.baseLanes | renderLanes2 : renderLanes2;
        if (null !== current) {
          nextProps = workInProgress2.child = current.child;
          for (nextChildren = 0; null !== nextProps; )
            nextChildren = nextChildren | nextProps.lanes | nextProps.childLanes, nextProps = nextProps.sibling;
          nextProps = nextChildren & ~prevState;
        } else nextProps = 0, workInProgress2.child = null;
        return deferHiddenOffscreenComponent(
          current,
          workInProgress2,
          prevState,
          renderLanes2,
          nextProps
        );
      }
      if (0 !== (renderLanes2 & 536870912))
        workInProgress2.memoizedState = { baseLanes: 0, cachePool: null }, null !== current && pushTransition(
          workInProgress2,
          null !== prevState ? prevState.cachePool : null
        ), null !== prevState ? pushHiddenContext(workInProgress2, prevState) : reuseHiddenContextOnStack(), pushOffscreenSuspenseHandler(workInProgress2);
      else
        return nextProps = workInProgress2.lanes = 536870912, deferHiddenOffscreenComponent(
          current,
          workInProgress2,
          null !== prevState ? prevState.baseLanes | renderLanes2 : renderLanes2,
          renderLanes2,
          nextProps
        );
    } else
      null !== prevState ? (pushTransition(workInProgress2, prevState.cachePool), pushHiddenContext(workInProgress2, prevState), reuseSuspenseHandlerOnStack(), workInProgress2.memoizedState = null) : (null !== current && pushTransition(workInProgress2, null), reuseHiddenContextOnStack(), reuseSuspenseHandlerOnStack());
    reconcileChildren(current, workInProgress2, nextChildren, renderLanes2);
    return workInProgress2.child;
  }
  function bailoutOffscreenComponent(current, workInProgress2) {
    null !== current && 22 === current.tag || null !== workInProgress2.stateNode || (workInProgress2.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    });
    return workInProgress2.sibling;
  }
  function deferHiddenOffscreenComponent(current, workInProgress2, nextBaseLanes, renderLanes2, remainingChildLanes) {
    var JSCompiler_inline_result = peekCacheFromPool();
    JSCompiler_inline_result = null === JSCompiler_inline_result ? null : { parent: CacheContext._currentValue, pool: JSCompiler_inline_result };
    workInProgress2.memoizedState = {
      baseLanes: nextBaseLanes,
      cachePool: JSCompiler_inline_result
    };
    null !== current && pushTransition(workInProgress2, null);
    reuseHiddenContextOnStack();
    pushOffscreenSuspenseHandler(workInProgress2);
    null !== current && propagateParentContextChanges(current, workInProgress2, renderLanes2, true);
    workInProgress2.childLanes = remainingChildLanes;
    return null;
  }
  function mountActivityChildren(workInProgress2, nextProps) {
    nextProps = mountWorkInProgressOffscreenFiber(
      { mode: nextProps.mode, children: nextProps.children },
      workInProgress2.mode
    );
    nextProps.ref = workInProgress2.ref;
    workInProgress2.child = nextProps;
    nextProps.return = workInProgress2;
    return nextProps;
  }
  function retryActivityComponentWithoutHydrating(current, workInProgress2, renderLanes2) {
    reconcileChildFibers(workInProgress2, current.child, null, renderLanes2);
    current = mountActivityChildren(workInProgress2, workInProgress2.pendingProps);
    current.flags |= 2;
    popSuspenseHandler(workInProgress2);
    workInProgress2.memoizedState = null;
    return current;
  }
  function updateActivityComponent(current, workInProgress2, renderLanes2) {
    var nextProps = workInProgress2.pendingProps, didSuspend = 0 !== (workInProgress2.flags & 128);
    workInProgress2.flags &= -129;
    if (null === current) {
      if (isHydrating) {
        if ("hidden" === nextProps.mode)
          return current = mountActivityChildren(workInProgress2, nextProps), workInProgress2.lanes = 536870912, current.memoizedState = { baseLanes: 0, cachePool: null }, bailoutOffscreenComponent(null, current);
        pushDehydratedActivitySuspenseHandler(workInProgress2);
        (current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(
          current,
          rootOrSingletonContext
        ), current = null !== current && "&" === current.data ? current : null, null !== current && (workInProgress2.memoizedState = {
          dehydrated: current,
          treeContext: null !== treeContextProvider ? { id: treeContextId, overflow: treeContextOverflow } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, renderLanes2 = createFiberFromDehydratedFragment(current), renderLanes2.return = workInProgress2, workInProgress2.child = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null)) : current = null;
        if (null === current) throw throwOnHydrationMismatch(workInProgress2);
        workInProgress2.lanes = 536870912;
        return null;
      }
      return mountActivityChildren(workInProgress2, nextProps);
    }
    var prevState = current.memoizedState;
    if (null !== prevState) {
      var dehydrated = prevState.dehydrated;
      pushDehydratedActivitySuspenseHandler(workInProgress2);
      if (didSuspend)
        if (workInProgress2.flags & 256)
          workInProgress2.flags &= -257, workInProgress2 = retryActivityComponentWithoutHydrating(
            current,
            workInProgress2,
            renderLanes2
          );
        else if (null !== workInProgress2.memoizedState)
          workInProgress2.child = current.child, workInProgress2.flags |= 128, workInProgress2 = null;
        else throw Error(formatProdErrorMessage(558));
      else if (didReceiveUpdate || propagateParentContextChanges(current, workInProgress2, renderLanes2, false), didSuspend = 0 !== (renderLanes2 & current.childLanes), didReceiveUpdate || didSuspend) {
        if (null === currentTreeHiddenStackCursor.current) {
          nextProps = workInProgressRoot;
          if (null !== nextProps && (dehydrated = getBumpedLaneForHydration(nextProps, renderLanes2), 0 !== dehydrated && dehydrated !== prevState.retryLane))
            throw prevState.retryLane = dehydrated, enqueueConcurrentRenderForLane(current, dehydrated), scheduleUpdateOnFiber(nextProps, current, dehydrated), SelectiveHydrationException;
          renderDidSuspendDelayIfPossible();
        }
        workInProgress2 = retryActivityComponentWithoutHydrating(
          current,
          workInProgress2,
          renderLanes2
        );
      } else
        current = prevState.treeContext, nextHydratableInstance = getNextHydratable(dehydrated.nextSibling), hydrationParentFiber = workInProgress2, isHydrating = true, hydrationErrors = null, rootOrSingletonContext = false, null !== current && restoreSuspendedTreeContext(workInProgress2, current), workInProgress2 = mountActivityChildren(workInProgress2, nextProps), workInProgress2.flags |= 134221824;
      return workInProgress2;
    }
    current = createWorkInProgress(current.child, {
      mode: nextProps.mode,
      children: nextProps.children
    });
    current.ref = workInProgress2.ref;
    workInProgress2.child = current;
    current.return = workInProgress2;
    return current;
  }
  function markRef(current, workInProgress2) {
    var ref = workInProgress2.ref;
    if (null === ref)
      null !== current && null !== current.ref && (workInProgress2.flags |= 4194816);
    else {
      if ("function" !== typeof ref && "object" !== typeof ref)
        throw Error(formatProdErrorMessage(284));
      if (null === current || current.ref !== ref)
        workInProgress2.flags |= 4194816;
    }
  }
  function updateFunctionComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
    prepareToReadContext(workInProgress2);
    Component = renderWithHooks(
      current,
      workInProgress2,
      Component,
      nextProps,
      void 0,
      renderLanes2
    );
    nextProps = checkDidRenderIdHook();
    if (null !== current && !didReceiveUpdate)
      return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
    isHydrating && nextProps && pushMaterializedTreeId(workInProgress2);
    workInProgress2.flags |= 1;
    reconcileChildren(current, workInProgress2, Component, renderLanes2);
    return workInProgress2.child;
  }
  function replayFunctionComponent(current, workInProgress2, nextProps, Component, secondArg, renderLanes2) {
    prepareToReadContext(workInProgress2);
    workInProgress2.updateQueue = null;
    nextProps = renderWithHooksAgain(
      workInProgress2,
      Component,
      nextProps,
      secondArg
    );
    finishRenderingHooks(current);
    Component = checkDidRenderIdHook();
    if (null !== current && !didReceiveUpdate)
      return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
    isHydrating && Component && pushMaterializedTreeId(workInProgress2);
    workInProgress2.flags |= 1;
    reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
    return workInProgress2.child;
  }
  function updateClassComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
    prepareToReadContext(workInProgress2);
    if (null === workInProgress2.stateNode) {
      var context = emptyContextObject, contextType = Component.contextType;
      "object" === typeof contextType && null !== contextType && (context = readContext(contextType));
      context = new Component(nextProps, context);
      workInProgress2.memoizedState = null !== context.state && void 0 !== context.state ? context.state : null;
      context.updater = classComponentUpdater;
      workInProgress2.stateNode = context;
      context._reactInternals = workInProgress2;
      context = workInProgress2.stateNode;
      context.props = nextProps;
      context.state = workInProgress2.memoizedState;
      context.refs = {};
      initializeUpdateQueue(workInProgress2);
      contextType = Component.contextType;
      context.context = "object" === typeof contextType && null !== contextType ? readContext(contextType) : emptyContextObject;
      context.state = workInProgress2.memoizedState;
      contextType = Component.getDerivedStateFromProps;
      "function" === typeof contextType && (applyDerivedStateFromProps(
        workInProgress2,
        Component,
        contextType,
        nextProps
      ), context.state = workInProgress2.memoizedState);
      "function" === typeof Component.getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || (contextType = context.state, "function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount(), contextType !== context.state && classComponentUpdater.enqueueReplaceState(context, context.state, null), processUpdateQueue(workInProgress2, nextProps, context, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction(), context.state = workInProgress2.memoizedState);
      "function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308);
      nextProps = true;
    } else if (null === current) {
      context = workInProgress2.stateNode;
      var unresolvedOldProps = workInProgress2.memoizedProps, oldProps = resolveClassComponentProps(Component, unresolvedOldProps);
      context.props = oldProps;
      var oldContext = context.context, contextType$jscomp$0 = Component.contextType;
      contextType = emptyContextObject;
      "object" === typeof contextType$jscomp$0 && null !== contextType$jscomp$0 && (contextType = readContext(contextType$jscomp$0));
      var getDerivedStateFromProps = Component.getDerivedStateFromProps;
      contextType$jscomp$0 = "function" === typeof getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate;
      unresolvedOldProps = workInProgress2.pendingProps !== unresolvedOldProps;
      contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (unresolvedOldProps || oldContext !== contextType) && callComponentWillReceiveProps(
        workInProgress2,
        context,
        nextProps,
        contextType
      );
      hasForceUpdate = false;
      var oldState = workInProgress2.memoizedState;
      context.state = oldState;
      processUpdateQueue(workInProgress2, nextProps, context, renderLanes2);
      suspendIfUpdateReadFromEntangledAsyncAction();
      oldContext = workInProgress2.memoizedState;
      unresolvedOldProps || oldState !== oldContext || hasForceUpdate ? ("function" === typeof getDerivedStateFromProps && (applyDerivedStateFromProps(
        workInProgress2,
        Component,
        getDerivedStateFromProps,
        nextProps
      ), oldContext = workInProgress2.memoizedState), (oldProps = hasForceUpdate || checkShouldComponentUpdate(
        workInProgress2,
        Component,
        oldProps,
        nextProps,
        oldState,
        oldContext,
        contextType
      )) ? (contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || ("function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount()), "function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308)) : ("function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = oldContext), context.props = nextProps, context.state = oldContext, context.context = contextType, nextProps = oldProps) : ("function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308), nextProps = false);
    } else {
      context = workInProgress2.stateNode;
      cloneUpdateQueue(current, workInProgress2);
      contextType = workInProgress2.memoizedProps;
      contextType$jscomp$0 = resolveClassComponentProps(Component, contextType);
      context.props = contextType$jscomp$0;
      getDerivedStateFromProps = workInProgress2.pendingProps;
      oldState = context.context;
      oldContext = Component.contextType;
      oldProps = emptyContextObject;
      "object" === typeof oldContext && null !== oldContext && (oldProps = readContext(oldContext));
      unresolvedOldProps = Component.getDerivedStateFromProps;
      (oldContext = "function" === typeof unresolvedOldProps || "function" === typeof context.getSnapshotBeforeUpdate) || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (contextType !== getDerivedStateFromProps || oldState !== oldProps) && callComponentWillReceiveProps(
        workInProgress2,
        context,
        nextProps,
        oldProps
      );
      hasForceUpdate = false;
      oldState = workInProgress2.memoizedState;
      context.state = oldState;
      processUpdateQueue(workInProgress2, nextProps, context, renderLanes2);
      suspendIfUpdateReadFromEntangledAsyncAction();
      var newState = workInProgress2.memoizedState;
      contextType !== getDerivedStateFromProps || oldState !== newState || hasForceUpdate || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies) ? ("function" === typeof unresolvedOldProps && (applyDerivedStateFromProps(
        workInProgress2,
        Component,
        unresolvedOldProps,
        nextProps
      ), newState = workInProgress2.memoizedState), (contextType$jscomp$0 = hasForceUpdate || checkShouldComponentUpdate(
        workInProgress2,
        Component,
        contextType$jscomp$0,
        nextProps,
        oldState,
        newState,
        oldProps
      ) || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies)) ? (oldContext || "function" !== typeof context.UNSAFE_componentWillUpdate && "function" !== typeof context.componentWillUpdate || ("function" === typeof context.componentWillUpdate && context.componentWillUpdate(nextProps, newState, oldProps), "function" === typeof context.UNSAFE_componentWillUpdate && context.UNSAFE_componentWillUpdate(
        nextProps,
        newState,
        oldProps
      )), "function" === typeof context.componentDidUpdate && (workInProgress2.flags |= 4), "function" === typeof context.getSnapshotBeforeUpdate && (workInProgress2.flags |= 1024)) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 1024), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = newState), context.props = nextProps, context.state = newState, context.context = oldProps, nextProps = contextType$jscomp$0) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 1024), nextProps = false);
    }
    context = nextProps;
    markRef(current, workInProgress2);
    nextProps = 0 !== (workInProgress2.flags & 128);
    context || nextProps ? (context = workInProgress2.stateNode, Component = nextProps && "function" !== typeof Component.getDerivedStateFromError ? null : context.render(), workInProgress2.flags |= 1, null !== current && nextProps ? (workInProgress2.child = reconcileChildFibers(
      workInProgress2,
      current.child,
      null,
      renderLanes2
    ), workInProgress2.child = reconcileChildFibers(
      workInProgress2,
      null,
      Component,
      renderLanes2
    )) : reconcileChildren(current, workInProgress2, Component, renderLanes2), workInProgress2.memoizedState = context.state, current = workInProgress2.child) : current = bailoutOnAlreadyFinishedWork(
      current,
      workInProgress2,
      renderLanes2
    );
    return current;
  }
  function mountHostRootWithoutHydrating(current, workInProgress2, nextChildren, renderLanes2) {
    resetHydrationState();
    workInProgress2.flags |= 256;
    reconcileChildren(current, workInProgress2, nextChildren, renderLanes2);
    return workInProgress2.child;
  }
  var SUSPENDED_MARKER = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function mountSuspenseOffscreenState(renderLanes2) {
    return { baseLanes: renderLanes2, cachePool: getSuspendedCache() };
  }
  function getRemainingWorkInPrimaryTree(current, primaryTreeDidDefer, renderLanes2) {
    current = null !== current ? current.childLanes & ~renderLanes2 : 0;
    primaryTreeDidDefer && (current |= workInProgressDeferredLane);
    return current;
  }
  function updateSuspenseComponent(current, workInProgress2, renderLanes2) {
    var nextProps = workInProgress2.pendingProps, showFallback = false, didSuspend = 0 !== (workInProgress2.flags & 128), JSCompiler_temp;
    (JSCompiler_temp = didSuspend) || (JSCompiler_temp = null !== current && null === current.memoizedState ? false : 0 !== (suspenseStackCursor.current & 2));
    JSCompiler_temp && (showFallback = true, workInProgress2.flags &= -129);
    JSCompiler_temp = 0 !== (workInProgress2.flags & 32);
    workInProgress2.flags &= -33;
    if (null === current) {
      if (isHydrating) {
        showFallback ? pushPrimaryTreeSuspenseHandler(workInProgress2) : reuseSuspenseHandlerOnStack();
        (current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(
          current,
          rootOrSingletonContext
        ), current = null !== current && "&" !== current.data ? current : null, null !== current && (workInProgress2.memoizedState = {
          dehydrated: current,
          treeContext: null !== treeContextProvider ? { id: treeContextId, overflow: treeContextOverflow } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, renderLanes2 = createFiberFromDehydratedFragment(current), renderLanes2.return = workInProgress2, workInProgress2.child = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null)) : current = null;
        if (null === current) throw throwOnHydrationMismatch(workInProgress2);
        isSuspenseInstanceFallback(current) ? workInProgress2.lanes = 32 : workInProgress2.lanes = 536870912;
        return null;
      }
      didSuspend = nextProps.children;
      nextProps = nextProps.fallback;
      if (showFallback)
        return reuseSuspenseHandlerOnStack(), showFallback = workInProgress2.mode, didSuspend = mountWorkInProgressOffscreenFiber(
          { mode: "hidden", children: didSuspend },
          showFallback
        ), nextProps = createFiberFromFragment(
          nextProps,
          showFallback,
          renderLanes2,
          null
        ), didSuspend.return = workInProgress2, nextProps.return = workInProgress2, didSuspend.sibling = nextProps, workInProgress2.child = didSuspend, nextProps = workInProgress2.child, nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes2), nextProps.childLanes = getRemainingWorkInPrimaryTree(
          current,
          JSCompiler_temp,
          renderLanes2
        ), workInProgress2.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(null, nextProps);
      pushPrimaryTreeSuspenseHandler(workInProgress2);
      return mountSuspensePrimaryChildren(workInProgress2, didSuspend);
    }
    var prevState = current.memoizedState;
    if (null !== prevState) {
      var dehydrated$96 = prevState.dehydrated;
      if (null !== dehydrated$96)
        return updateDehydratedSuspenseComponent(
          current,
          workInProgress2,
          didSuspend,
          JSCompiler_temp,
          nextProps,
          dehydrated$96,
          prevState,
          renderLanes2
        );
    }
    if (showFallback)
      return reuseSuspenseHandlerOnStack(), showFallback = nextProps.fallback, didSuspend = workInProgress2.mode, prevState = current.child, dehydrated$96 = prevState.sibling, nextProps = createWorkInProgress(prevState, {
        mode: "hidden",
        children: nextProps.children
      }), nextProps.subtreeFlags = prevState.subtreeFlags & 1206910976, null !== dehydrated$96 ? showFallback = createWorkInProgress(dehydrated$96, showFallback) : (showFallback = createFiberFromFragment(
        showFallback,
        didSuspend,
        renderLanes2,
        null
      ), showFallback.flags |= 2), showFallback.return = workInProgress2, nextProps.return = workInProgress2, nextProps.sibling = showFallback, workInProgress2.child = nextProps, bailoutOffscreenComponent(null, nextProps), nextProps = workInProgress2.child, showFallback = current.child.memoizedState, null === showFallback ? showFallback = mountSuspenseOffscreenState(renderLanes2) : (didSuspend = showFallback.cachePool, null !== didSuspend ? (prevState = CacheContext._currentValue, didSuspend = didSuspend.parent !== prevState ? { parent: prevState, pool: prevState } : didSuspend) : didSuspend = getSuspendedCache(), showFallback = {
        baseLanes: showFallback.baseLanes | renderLanes2,
        cachePool: didSuspend
      }), nextProps.memoizedState = showFallback, nextProps.childLanes = getRemainingWorkInPrimaryTree(
        current,
        JSCompiler_temp,
        renderLanes2
      ), workInProgress2.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(current.child, nextProps);
    pushPrimaryTreeSuspenseHandler(workInProgress2);
    renderLanes2 = current.child;
    current = renderLanes2.sibling;
    renderLanes2 = createWorkInProgress(renderLanes2, {
      mode: "visible",
      children: nextProps.children
    });
    renderLanes2.return = workInProgress2;
    renderLanes2.sibling = null;
    null !== current && (JSCompiler_temp = workInProgress2.deletions, null === JSCompiler_temp ? (workInProgress2.deletions = [current], workInProgress2.flags |= 16) : JSCompiler_temp.push(current));
    workInProgress2.child = renderLanes2;
    workInProgress2.memoizedState = null;
    return renderLanes2;
  }
  function mountSuspensePrimaryChildren(workInProgress2, primaryChildren) {
    primaryChildren = mountWorkInProgressOffscreenFiber(
      { mode: "visible", children: primaryChildren },
      workInProgress2.mode
    );
    primaryChildren.return = workInProgress2;
    return workInProgress2.child = primaryChildren;
  }
  function mountWorkInProgressOffscreenFiber(offscreenProps, mode) {
    offscreenProps = createFiberImplClass(22, offscreenProps, null, mode);
    offscreenProps.lanes = 0;
    return offscreenProps;
  }
  function retrySuspenseComponentWithoutHydrating(current, workInProgress2, renderLanes2) {
    reconcileChildFibers(workInProgress2, current.child, null, renderLanes2);
    current = mountSuspensePrimaryChildren(
      workInProgress2,
      workInProgress2.pendingProps.children
    );
    current.flags |= 2;
    workInProgress2.memoizedState = null;
    return current;
  }
  function updateDehydratedSuspenseComponent(current, workInProgress2, didSuspend, didPrimaryChildrenDefer, nextProps, suspenseInstance, suspenseState, renderLanes2) {
    if (didSuspend) {
      if (workInProgress2.flags & 256)
        return pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags &= -257, retrySuspenseComponentWithoutHydrating(
          current,
          workInProgress2,
          renderLanes2
        );
      if (null !== workInProgress2.memoizedState)
        return reuseSuspenseHandlerOnStack(), workInProgress2.child = current.child, workInProgress2.flags |= 128, null;
      reuseSuspenseHandlerOnStack();
      suspenseInstance = nextProps.fallback;
      suspenseState = workInProgress2.mode;
      nextProps = mountWorkInProgressOffscreenFiber(
        { mode: "visible", children: nextProps.children },
        suspenseState
      );
      suspenseInstance = createFiberFromFragment(
        suspenseInstance,
        suspenseState,
        renderLanes2,
        null
      );
      suspenseInstance.flags |= 2;
      nextProps.return = workInProgress2;
      suspenseInstance.return = workInProgress2;
      nextProps.sibling = suspenseInstance;
      workInProgress2.child = nextProps;
      reconcileChildFibers(workInProgress2, current.child, null, renderLanes2);
      nextProps = workInProgress2.child;
      nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes2);
      nextProps.childLanes = getRemainingWorkInPrimaryTree(
        current,
        didPrimaryChildrenDefer,
        renderLanes2
      );
      workInProgress2.memoizedState = SUSPENDED_MARKER;
      return bailoutOffscreenComponent(null, nextProps);
    }
    pushPrimaryTreeSuspenseHandler(workInProgress2);
    if (isSuspenseInstanceFallback(suspenseInstance)) {
      didPrimaryChildrenDefer = suspenseInstance.nextSibling && suspenseInstance.nextSibling.dataset;
      if (didPrimaryChildrenDefer) var digest = didPrimaryChildrenDefer.dgst;
      didPrimaryChildrenDefer = digest;
      "" !== didPrimaryChildrenDefer && (nextProps = Error(formatProdErrorMessage(419)), nextProps.stack = "", nextProps.digest = didPrimaryChildrenDefer, queueHydrationError({ value: nextProps, source: null, stack: null }));
      return retrySuspenseComponentWithoutHydrating(
        current,
        workInProgress2,
        renderLanes2
      );
    }
    didReceiveUpdate || propagateParentContextChanges(current, workInProgress2, renderLanes2, false);
    didPrimaryChildrenDefer = 0 !== (renderLanes2 & current.childLanes);
    if (didReceiveUpdate || didPrimaryChildrenDefer) {
      if (null !== currentTreeHiddenStackCursor.current)
        return retrySuspenseComponentWithoutHydrating(
          current,
          workInProgress2,
          renderLanes2
        );
      didPrimaryChildrenDefer = workInProgressRoot;
      if (null !== didPrimaryChildrenDefer && (nextProps = getBumpedLaneForHydration(
        didPrimaryChildrenDefer,
        renderLanes2
      ), 0 !== nextProps && nextProps !== suspenseState.retryLane))
        throw suspenseState.retryLane = nextProps, enqueueConcurrentRenderForLane(current, nextProps), scheduleUpdateOnFiber(didPrimaryChildrenDefer, current, nextProps), SelectiveHydrationException;
      isSuspenseInstancePending(suspenseInstance) || renderDidSuspendDelayIfPossible();
      return retrySuspenseComponentWithoutHydrating(
        current,
        workInProgress2,
        renderLanes2
      );
    }
    if (isSuspenseInstancePending(suspenseInstance))
      return workInProgress2.flags |= 192, workInProgress2.child = current.child, null;
    current = suspenseState.treeContext;
    nextHydratableInstance = getNextHydratable(suspenseInstance.nextSibling);
    hydrationParentFiber = workInProgress2;
    isHydrating = true;
    hydrationErrors = null;
    rootOrSingletonContext = false;
    null !== current && restoreSuspendedTreeContext(workInProgress2, current);
    workInProgress2 = mountSuspensePrimaryChildren(
      workInProgress2,
      nextProps.children
    );
    workInProgress2.flags |= 134221824;
    return workInProgress2;
  }
  function scheduleSuspenseWorkOnFiber(fiber, renderLanes2, propagationRoot) {
    fiber.lanes |= renderLanes2;
    var alternate = fiber.alternate;
    null !== alternate && (alternate.lanes |= renderLanes2);
    scheduleContextWorkOnParentPath(fiber.return, renderLanes2, propagationRoot);
  }
  function findLastContentRow(firstChild) {
    for (var lastContentRow = null; null !== firstChild; ) {
      var currentRow = firstChild.alternate;
      null !== currentRow && null === findFirstSuspended(currentRow) && (lastContentRow = firstChild);
      firstChild = firstChild.sibling;
    }
    return lastContentRow;
  }
  function initSuspenseListRenderState(workInProgress2, isBackwards, tail, lastContentRow, tailMode, treeForkCount2) {
    var renderState = workInProgress2.memoizedState;
    null === renderState ? workInProgress2.memoizedState = {
      isBackwards,
      rendering: null,
      renderingStartTime: 0,
      last: lastContentRow,
      tail,
      tailMode,
      treeForkCount: treeForkCount2
    } : (renderState.isBackwards = isBackwards, renderState.rendering = null, renderState.renderingStartTime = 0, renderState.last = lastContentRow, renderState.tail = tail, renderState.tailMode = tailMode, renderState.treeForkCount = treeForkCount2);
  }
  function reverseChildren(fiber) {
    var row = fiber.child;
    for (fiber.child = null; null !== row; ) {
      var nextRow = row.sibling;
      row.sibling = fiber.child;
      fiber.child = row;
      row = nextRow;
    }
  }
  function updateSuspenseListComponent(current, workInProgress2, renderLanes2) {
    var nextProps = workInProgress2.pendingProps, revealOrder = nextProps.revealOrder, tailMode = nextProps.tail;
    nextProps = nextProps.children;
    var suspenseContext = suspenseStackCursor.current;
    if (workInProgress2.flags & 128)
      return pushSuspenseListContext(workInProgress2, suspenseContext), null;
    var shouldForceFallback = 0 !== (suspenseContext & 2);
    shouldForceFallback ? (suspenseContext = suspenseContext & 1 | 2, workInProgress2.flags |= 128) : suspenseContext &= 1;
    pushSuspenseListContext(workInProgress2, suspenseContext);
    "backwards" === revealOrder && null !== current ? (reverseChildren(current), reconcileChildren(current, workInProgress2, nextProps, renderLanes2), reverseChildren(current)) : reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
    nextProps = isHydrating ? treeForkCount : 0;
    if (!shouldForceFallback && null !== current && 0 !== (current.flags & 128))
      a: for (current = workInProgress2.child; null !== current; ) {
        if (13 === current.tag)
          null !== current.memoizedState && scheduleSuspenseWorkOnFiber(current, renderLanes2, workInProgress2);
        else if (19 === current.tag)
          scheduleSuspenseWorkOnFiber(current, renderLanes2, workInProgress2);
        else if (null !== current.child) {
          current.child.return = current;
          current = current.child;
          continue;
        }
        if (current === workInProgress2) break a;
        for (; null === current.sibling; ) {
          if (null === current.return || current.return === workInProgress2)
            break a;
          current = current.return;
        }
        current.sibling.return = current.return;
        current = current.sibling;
      }
    switch (revealOrder) {
      case "backwards":
        renderLanes2 = findLastContentRow(workInProgress2.child);
        null === renderLanes2 ? (revealOrder = workInProgress2.child, workInProgress2.child = null) : (revealOrder = renderLanes2.sibling, renderLanes2.sibling = null, reverseChildren(workInProgress2));
        initSuspenseListRenderState(
          workInProgress2,
          true,
          revealOrder,
          null,
          tailMode,
          nextProps
        );
        break;
      case "unstable_legacy-backwards":
        renderLanes2 = null;
        revealOrder = workInProgress2.child;
        for (workInProgress2.child = null; null !== revealOrder; ) {
          current = revealOrder.alternate;
          if (null !== current && null === findFirstSuspended(current)) {
            workInProgress2.child = revealOrder;
            break;
          }
          current = revealOrder.sibling;
          revealOrder.sibling = renderLanes2;
          renderLanes2 = revealOrder;
          revealOrder = current;
        }
        initSuspenseListRenderState(
          workInProgress2,
          true,
          renderLanes2,
          null,
          tailMode,
          nextProps
        );
        break;
      case "together":
        initSuspenseListRenderState(
          workInProgress2,
          false,
          null,
          null,
          void 0,
          nextProps
        );
        break;
      case "independent":
        workInProgress2.memoizedState = null;
        break;
      default:
        renderLanes2 = findLastContentRow(workInProgress2.child), null === renderLanes2 ? (revealOrder = workInProgress2.child, workInProgress2.child = null) : (revealOrder = renderLanes2.sibling, renderLanes2.sibling = null), initSuspenseListRenderState(
          workInProgress2,
          false,
          revealOrder,
          renderLanes2,
          tailMode,
          nextProps
        );
    }
    return workInProgress2.child;
  }
  function updateContextProvider(current, workInProgress2, renderLanes2) {
    var newProps = workInProgress2.pendingProps;
    pushProvider(workInProgress2, workInProgress2.type, newProps.value);
    reconcileChildren(current, workInProgress2, newProps.children, renderLanes2);
    return workInProgress2.child;
  }
  function bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2) {
    null !== current && (workInProgress2.dependencies = current.dependencies);
    workInProgressRootSkippedLanes |= workInProgress2.lanes;
    if (0 === (renderLanes2 & workInProgress2.childLanes))
      if (null !== current) {
        if (propagateParentContextChanges(
          current,
          workInProgress2,
          renderLanes2,
          false
        ), 0 === (renderLanes2 & workInProgress2.childLanes))
          return null;
      } else return null;
    if (null !== current && workInProgress2.child !== current.child)
      throw Error(formatProdErrorMessage(153));
    if (null !== workInProgress2.child) {
      current = workInProgress2.child;
      renderLanes2 = createWorkInProgress(current, current.pendingProps);
      workInProgress2.child = renderLanes2;
      for (renderLanes2.return = workInProgress2; null !== current.sibling; )
        current = current.sibling, renderLanes2 = renderLanes2.sibling = createWorkInProgress(current, current.pendingProps), renderLanes2.return = workInProgress2;
      renderLanes2.sibling = null;
    }
    return workInProgress2.child;
  }
  function checkScheduledUpdateOrContext(current, renderLanes2) {
    if (0 !== (current.lanes & renderLanes2)) return true;
    current = current.dependencies;
    return null !== current && checkIfContextChanged(current) ? true : false;
  }
  function attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress2, renderLanes2) {
    switch (workInProgress2.tag) {
      case 3:
        pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
        pushProvider(workInProgress2, CacheContext, current.memoizedState.cache);
        resetHydrationState();
        break;
      case 27:
      case 5:
        pushHostContext(workInProgress2);
        break;
      case 4:
        pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
        break;
      case 10:
        pushProvider(
          workInProgress2,
          workInProgress2.type,
          workInProgress2.memoizedProps.value
        );
        break;
      case 31:
        if (null !== workInProgress2.memoizedState)
          return workInProgress2.flags |= 128, pushDehydratedActivitySuspenseHandler(workInProgress2), null;
        break;
      case 13:
        var state$108 = workInProgress2.memoizedState;
        if (null !== state$108) {
          if (null !== state$108.dehydrated)
            return pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags |= 128, null;
          state$108 = propagateParentContextChanges(
            current,
            workInProgress2,
            renderLanes2,
            false
          );
          var primaryChildLanes = workInProgress2.child.childLanes;
          if (state$108 || 0 !== (renderLanes2 & primaryChildLanes))
            return updateSuspenseComponent(current, workInProgress2, renderLanes2);
          pushPrimaryTreeSuspenseHandler(workInProgress2);
          current = bailoutOnAlreadyFinishedWork(
            current,
            workInProgress2,
            renderLanes2
          );
          return null !== current ? current.sibling : null;
        }
        pushPrimaryTreeSuspenseHandler(workInProgress2);
        break;
      case 19:
        if (workInProgress2.flags & 128)
          return updateSuspenseListComponent(
            current,
            workInProgress2,
            renderLanes2
          );
        primaryChildLanes = 0 !== (current.flags & 128);
        state$108 = 0 !== (renderLanes2 & workInProgress2.childLanes);
        state$108 || (propagateParentContextChanges(
          current,
          workInProgress2,
          renderLanes2,
          false
        ), state$108 = 0 !== (renderLanes2 & workInProgress2.childLanes));
        if (primaryChildLanes) {
          if (state$108)
            return updateSuspenseListComponent(
              current,
              workInProgress2,
              renderLanes2
            );
          workInProgress2.flags |= 128;
        }
        primaryChildLanes = workInProgress2.memoizedState;
        null !== primaryChildLanes && (primaryChildLanes.rendering = null, primaryChildLanes.tail = null, primaryChildLanes.lastEffect = null);
        pushSuspenseListContext(workInProgress2, suspenseStackCursor.current);
        if (state$108) break;
        else return null;
      case 22:
        return workInProgress2.lanes = 0, updateOffscreenComponent(
          current,
          workInProgress2,
          renderLanes2,
          workInProgress2.pendingProps
        );
      case 24:
        pushProvider(workInProgress2, CacheContext, current.memoizedState.cache);
    }
    return bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
  }
  function beginWork(current, workInProgress2, renderLanes2) {
    if (null !== current)
      if (current.memoizedProps !== workInProgress2.pendingProps)
        didReceiveUpdate = true;
      else {
        if (!checkScheduledUpdateOrContext(current, renderLanes2) && 0 === (workInProgress2.flags & 128))
          return didReceiveUpdate = false, attemptEarlyBailoutIfNoScheduledUpdate(
            current,
            workInProgress2,
            renderLanes2
          );
        didReceiveUpdate = 0 !== (current.flags & 131072) ? true : false;
      }
    else
      didReceiveUpdate = false, isHydrating && 0 !== (workInProgress2.flags & 1048576) && pushTreeId(workInProgress2, treeForkCount, workInProgress2.index);
    workInProgress2.lanes = 0;
    switch (workInProgress2.tag) {
      case 16:
        a: {
          var props = workInProgress2.pendingProps;
          current = resolveLazy(workInProgress2.elementType);
          workInProgress2.type = current;
          if ("function" === typeof current)
            shouldConstruct(current) ? (props = resolveClassComponentProps(current, props), workInProgress2.tag = 1, workInProgress2 = updateClassComponent(
              null,
              workInProgress2,
              current,
              props,
              renderLanes2
            )) : (workInProgress2.tag = 0, workInProgress2 = updateFunctionComponent(
              null,
              workInProgress2,
              current,
              props,
              renderLanes2
            ));
          else {
            if (void 0 !== current && null !== current) {
              var $$typeof = current.$$typeof;
              if ($$typeof === REACT_FORWARD_REF_TYPE) {
                workInProgress2.tag = 11;
                workInProgress2 = updateForwardRef(
                  null,
                  workInProgress2,
                  current,
                  props,
                  renderLanes2
                );
                break a;
              } else if ($$typeof === REACT_MEMO_TYPE) {
                workInProgress2.tag = 14;
                workInProgress2 = updateMemoComponent(
                  null,
                  workInProgress2,
                  current,
                  props,
                  renderLanes2
                );
                break a;
              } else if ($$typeof === REACT_CONTEXT_TYPE) {
                workInProgress2.tag = 10;
                workInProgress2.type = current;
                workInProgress2 = updateContextProvider(
                  null,
                  workInProgress2,
                  renderLanes2
                );
                break a;
              }
            }
            workInProgress2 = getComponentNameFromType(current) || current;
            throw Error(formatProdErrorMessage(306, workInProgress2, ""));
          }
        }
        return workInProgress2;
      case 0:
        return updateFunctionComponent(
          current,
          workInProgress2,
          workInProgress2.type,
          workInProgress2.pendingProps,
          renderLanes2
        );
      case 1:
        return props = workInProgress2.type, $$typeof = resolveClassComponentProps(
          props,
          workInProgress2.pendingProps
        ), updateClassComponent(
          current,
          workInProgress2,
          props,
          $$typeof,
          renderLanes2
        );
      case 3:
        a: {
          pushHostContainer(
            workInProgress2,
            workInProgress2.stateNode.containerInfo
          );
          if (null === current) throw Error(formatProdErrorMessage(387));
          props = workInProgress2.pendingProps;
          var prevState = workInProgress2.memoizedState;
          $$typeof = prevState.element;
          cloneUpdateQueue(current, workInProgress2);
          processUpdateQueue(workInProgress2, props, null, renderLanes2);
          var nextState = workInProgress2.memoizedState;
          props = nextState.cache;
          pushProvider(workInProgress2, CacheContext, props);
          props !== prevState.cache && propagateContextChanges(
            workInProgress2,
            [CacheContext],
            renderLanes2,
            true
          );
          suspendIfUpdateReadFromEntangledAsyncAction();
          props = nextState.element;
          if (prevState.isDehydrated)
            if (prevState = {
              element: props,
              isDehydrated: false,
              cache: nextState.cache
            }, workInProgress2.updateQueue.baseState = prevState, workInProgress2.memoizedState = prevState, workInProgress2.flags & 256) {
              workInProgress2 = mountHostRootWithoutHydrating(
                current,
                workInProgress2,
                props,
                renderLanes2
              );
              break a;
            } else if (props !== $$typeof) {
              $$typeof = createCapturedValueAtFiber(
                Error(formatProdErrorMessage(424)),
                workInProgress2
              );
              queueHydrationError($$typeof);
              workInProgress2 = mountHostRootWithoutHydrating(
                current,
                workInProgress2,
                props,
                renderLanes2
              );
              break a;
            } else {
              current = workInProgress2.stateNode.containerInfo;
              switch (current.nodeType) {
                case 9:
                  current = current.body;
                  break;
                default:
                  current = "HTML" === current.nodeName ? current.ownerDocument.body : current;
              }
              nextHydratableInstance = getNextHydratable(current.firstChild);
              hydrationParentFiber = workInProgress2;
              isHydrating = true;
              hydrationErrors = null;
              rootOrSingletonContext = true;
              renderLanes2 = mountChildFibers(
                workInProgress2,
                null,
                props,
                renderLanes2
              );
              for (workInProgress2.child = renderLanes2; renderLanes2; )
                renderLanes2.flags = renderLanes2.flags & -3 | 134221824, renderLanes2 = renderLanes2.sibling;
            }
          else {
            resetHydrationState();
            if (props === $$typeof) {
              workInProgress2 = bailoutOnAlreadyFinishedWork(
                current,
                workInProgress2,
                renderLanes2
              );
              break a;
            }
            reconcileChildren(current, workInProgress2, props, renderLanes2);
          }
          workInProgress2 = workInProgress2.child;
        }
        return workInProgress2;
      case 26:
        return markRef(current, workInProgress2), null === current ? (renderLanes2 = getResource(
          workInProgress2.type,
          null,
          workInProgress2.pendingProps,
          null
        )) ? workInProgress2.memoizedState = renderLanes2 : isHydrating || (workInProgress2.stateNode = createHoistableInstance(
          workInProgress2.type,
          workInProgress2.pendingProps,
          rootInstanceStackCursor.current,
          workInProgress2
        )) : workInProgress2.memoizedState = getResource(
          workInProgress2.type,
          current.memoizedProps,
          workInProgress2.pendingProps,
          current.memoizedState
        ), null;
      case 27:
        return pushHostContext(workInProgress2), null === current && isHydrating && (props = workInProgress2.stateNode = resolveSingletonInstance(
          workInProgress2.type,
          workInProgress2.pendingProps,
          rootInstanceStackCursor.current
        ), hydrationParentFiber = workInProgress2, rootOrSingletonContext = true, $$typeof = nextHydratableInstance, isSingletonScope(workInProgress2.type) ? (previousHydratableOnEnteringScopedSingleton = $$typeof, nextHydratableInstance = getNextHydratable(props.firstChild)) : nextHydratableInstance = $$typeof), reconcileChildren(
          current,
          workInProgress2,
          workInProgress2.pendingProps.children,
          renderLanes2
        ), markRef(current, workInProgress2), null === current && (workInProgress2.flags |= 4194304), workInProgress2.child;
      case 5:
        if (null === current && isHydrating) {
          if ($$typeof = props = nextHydratableInstance)
            props = canHydrateInstance(
              props,
              workInProgress2.type,
              workInProgress2.pendingProps,
              rootOrSingletonContext
            ), null !== props ? (workInProgress2.stateNode = props, hydrationParentFiber = workInProgress2, nextHydratableInstance = getNextHydratable(props.firstChild), rootOrSingletonContext = false, $$typeof = true) : $$typeof = false;
          $$typeof || throwOnHydrationMismatch(workInProgress2);
        }
        pushHostContext(workInProgress2);
        $$typeof = workInProgress2.type;
        prevState = workInProgress2.pendingProps;
        nextState = null !== current ? current.memoizedProps : null;
        props = prevState.children;
        shouldSetTextContent($$typeof, prevState) ? props = null : null !== nextState && shouldSetTextContent($$typeof, nextState) && (workInProgress2.flags |= 32);
        null !== workInProgress2.memoizedState && ($$typeof = renderWithHooks(
          current,
          workInProgress2,
          TransitionAwareHostComponent,
          null,
          null,
          renderLanes2
        ), HostTransitionContext._currentValue = $$typeof);
        markRef(current, workInProgress2);
        reconcileChildren(current, workInProgress2, props, renderLanes2);
        return workInProgress2.child;
      case 6:
        if (null === current && isHydrating) {
          if (current = renderLanes2 = nextHydratableInstance)
            renderLanes2 = canHydrateTextInstance(
              renderLanes2,
              workInProgress2.pendingProps,
              rootOrSingletonContext
            ), null !== renderLanes2 ? (workInProgress2.stateNode = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null, current = true) : current = false;
          current || throwOnHydrationMismatch(workInProgress2);
        }
        return null;
      case 13:
        return updateSuspenseComponent(current, workInProgress2, renderLanes2);
      case 4:
        return pushHostContainer(
          workInProgress2,
          workInProgress2.stateNode.containerInfo
        ), props = workInProgress2.pendingProps, null === current ? workInProgress2.child = reconcileChildFibers(
          workInProgress2,
          null,
          props,
          renderLanes2
        ) : reconcileChildren(current, workInProgress2, props, renderLanes2), workInProgress2.child;
      case 11:
        return updateForwardRef(
          current,
          workInProgress2,
          workInProgress2.type,
          workInProgress2.pendingProps,
          renderLanes2
        );
      case 7:
        return props = workInProgress2.pendingProps, markRef(current, workInProgress2), reconcileChildren(current, workInProgress2, props, renderLanes2), workInProgress2.child;
      case 8:
        return reconcileChildren(
          current,
          workInProgress2,
          workInProgress2.pendingProps.children,
          renderLanes2
        ), workInProgress2.child;
      case 12:
        return reconcileChildren(
          current,
          workInProgress2,
          workInProgress2.pendingProps.children,
          renderLanes2
        ), workInProgress2.child;
      case 10:
        return updateContextProvider(current, workInProgress2, renderLanes2);
      case 9:
        return $$typeof = workInProgress2.type._context, props = workInProgress2.pendingProps.children, prepareToReadContext(workInProgress2), $$typeof = readContext($$typeof), props = props($$typeof), workInProgress2.flags |= 1, reconcileChildren(current, workInProgress2, props, renderLanes2), workInProgress2.child;
      case 14:
        return updateMemoComponent(
          current,
          workInProgress2,
          workInProgress2.type,
          workInProgress2.pendingProps,
          renderLanes2
        );
      case 15:
        return updateSimpleMemoComponent(
          current,
          workInProgress2,
          workInProgress2.type,
          workInProgress2.pendingProps,
          renderLanes2
        );
      case 19:
        return updateSuspenseListComponent(current, workInProgress2, renderLanes2);
      case 31:
        return updateActivityComponent(current, workInProgress2, renderLanes2);
      case 22:
        return updateOffscreenComponent(
          current,
          workInProgress2,
          renderLanes2,
          workInProgress2.pendingProps
        );
      case 24:
        return prepareToReadContext(workInProgress2), props = readContext(CacheContext), null === current ? ($$typeof = peekCacheFromPool(), null === $$typeof && ($$typeof = workInProgressRoot, prevState = createCache(), $$typeof.pooledCache = prevState, prevState.refCount++, null !== prevState && ($$typeof.pooledCacheLanes |= renderLanes2), $$typeof = prevState), workInProgress2.memoizedState = { parent: props, cache: $$typeof }, initializeUpdateQueue(workInProgress2), pushProvider(workInProgress2, CacheContext, $$typeof)) : (0 !== (current.lanes & renderLanes2) && (cloneUpdateQueue(current, workInProgress2), processUpdateQueue(workInProgress2, null, null, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction()), $$typeof = current.memoizedState, prevState = workInProgress2.memoizedState, $$typeof.parent !== props ? ($$typeof = { parent: props, cache: props }, workInProgress2.memoizedState = $$typeof, 0 === workInProgress2.lanes && (workInProgress2.memoizedState = workInProgress2.updateQueue.baseState = $$typeof), pushProvider(workInProgress2, CacheContext, props)) : (props = prevState.cache, pushProvider(workInProgress2, CacheContext, props), props !== $$typeof.cache && propagateContextChanges(
          workInProgress2,
          [CacheContext],
          renderLanes2,
          true
        ))), reconcileChildren(
          current,
          workInProgress2,
          workInProgress2.pendingProps.children,
          renderLanes2
        ), workInProgress2.child;
      case 30:
        return null === workInProgress2.stateNode && (workInProgress2.stateNode = {
          autoName: null,
          paired: null,
          clones: null,
          ref: null
        }), props = workInProgress2.pendingProps, null != props.name && "auto" !== props.name ? workInProgress2.flags |= null === current ? 18882560 : 18874368 : isHydrating && pushMaterializedTreeId(workInProgress2), null !== current && current.memoizedProps.name !== props.name ? workInProgress2.flags |= 4194816 : markRef(current, workInProgress2), reconcileChildren(current, workInProgress2, props.children, renderLanes2), workInProgress2.child;
      case 29:
        throw workInProgress2.pendingProps;
    }
    throw Error(formatProdErrorMessage(156, workInProgress2.tag));
  }
  function markUpdate(workInProgress2) {
    workInProgress2.flags |= 4;
  }
  function preloadInstanceAndSuspendIfNeeded(workInProgress2, type, oldProps, newProps, renderLanes2) {
    var JSCompiler_temp;
    if (JSCompiler_temp = 0 !== (workInProgress2.mode & 32))
      JSCompiler_temp = null === oldProps ? maySuspendCommit(type, newProps) : maySuspendCommit(type, newProps) && (newProps.src !== oldProps.src || newProps.srcSet !== oldProps.srcSet);
    if (JSCompiler_temp) {
      if (workInProgress2.flags |= 16777216, (renderLanes2 & 335544128) === renderLanes2)
        if (workInProgress2.stateNode.complete) workInProgress2.flags |= 8192;
        else if (shouldRemainOnPreviousScreen()) workInProgress2.flags |= 8192;
        else
          throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
    } else workInProgress2.flags &= -16777217;
  }
  function preloadResourceAndSuspendIfNeeded(workInProgress2, resource) {
    if ("stylesheet" !== resource.type || 0 !== (resource.state.loading & 4))
      workInProgress2.flags &= -16777217;
    else if (workInProgress2.flags |= 16777216, !preloadResource(resource))
      if (shouldRemainOnPreviousScreen()) workInProgress2.flags |= 8192;
      else
        throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
  }
  function scheduleRetryEffect(workInProgress2, retryQueue) {
    null !== retryQueue && (workInProgress2.flags |= 4);
    workInProgress2.flags & 16384 && (retryQueue = 22 !== workInProgress2.tag ? claimNextRetryLane() : 536870912, workInProgress2.lanes |= retryQueue, workInProgressSuspendedRetryLanes |= retryQueue);
  }
  function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
    if (!isHydrating)
      switch (renderState.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var tailNode = renderState.tail, lastTailNode = null; null !== tailNode; )
            null !== tailNode.alternate && (lastTailNode = tailNode), tailNode = tailNode.sibling;
          null === lastTailNode ? hasRenderedATailFallback || null === renderState.tail ? renderState.tail = null : renderState.tail.sibling = null : lastTailNode.sibling = null;
          break;
        default:
          hasRenderedATailFallback = renderState.tail;
          for (tailNode = null; null !== hasRenderedATailFallback; )
            null !== hasRenderedATailFallback.alternate && (tailNode = hasRenderedATailFallback), hasRenderedATailFallback = hasRenderedATailFallback.sibling;
          null === tailNode ? renderState.tail = null : tailNode.sibling = null;
      }
  }
  function bubbleProperties(completedWork) {
    var didBailout = null !== completedWork.alternate && completedWork.alternate.child === completedWork.child, newChildLanes = 0, subtreeFlags = 0;
    if (didBailout)
      for (var child$113 = completedWork.child; null !== child$113; )
        newChildLanes |= child$113.lanes | child$113.childLanes, subtreeFlags |= child$113.subtreeFlags & 1206910976, subtreeFlags |= child$113.flags & 1206910976, child$113.return = completedWork, child$113 = child$113.sibling;
    else
      for (child$113 = completedWork.child; null !== child$113; )
        newChildLanes |= child$113.lanes | child$113.childLanes, subtreeFlags |= child$113.subtreeFlags, subtreeFlags |= child$113.flags, child$113.return = completedWork, child$113 = child$113.sibling;
    completedWork.subtreeFlags |= subtreeFlags;
    completedWork.childLanes = newChildLanes;
    return didBailout;
  }
  function completeWork(current, workInProgress2, renderLanes2) {
    var newProps = workInProgress2.pendingProps;
    popTreeContext(workInProgress2);
    switch (workInProgress2.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return bubbleProperties(workInProgress2), null;
      case 1:
        return bubbleProperties(workInProgress2), null;
      case 3:
        renderLanes2 = workInProgress2.stateNode;
        newProps = null;
        null !== current && (newProps = current.memoizedState.cache);
        workInProgress2.memoizedState.cache !== newProps && (workInProgress2.flags |= 2048);
        popProvider(CacheContext);
        popHostContainer();
        renderLanes2.pendingContext && (renderLanes2.context = renderLanes2.pendingContext, renderLanes2.pendingContext = null);
        if (null === current || null === current.child)
          popHydrationState(workInProgress2) ? markUpdate(workInProgress2) : null === current || current.memoizedState.isDehydrated && 0 === (workInProgress2.flags & 256) || (workInProgress2.flags |= 1024, upgradeHydrationErrorsToRecoverable());
        bubbleProperties(workInProgress2);
        return null;
      case 26:
        var type = workInProgress2.type, nextResource = workInProgress2.memoizedState;
        null === current ? (markUpdate(workInProgress2), null !== nextResource ? (bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(workInProgress2, nextResource)) : (bubbleProperties(workInProgress2), preloadInstanceAndSuspendIfNeeded(
          workInProgress2,
          type,
          null,
          newProps,
          renderLanes2
        ))) : nextResource ? nextResource !== current.memoizedState ? (markUpdate(workInProgress2), bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(workInProgress2, nextResource)) : (bubbleProperties(workInProgress2), workInProgress2.flags &= -16777217) : (current = current.memoizedProps, current !== newProps && markUpdate(workInProgress2), bubbleProperties(workInProgress2), preloadInstanceAndSuspendIfNeeded(
          workInProgress2,
          type,
          current,
          newProps,
          renderLanes2
        ));
        return null;
      case 27:
        popHostContext(workInProgress2);
        renderLanes2 = rootInstanceStackCursor.current;
        type = workInProgress2.type;
        if (null !== current && null != workInProgress2.stateNode)
          current.memoizedProps !== newProps && markUpdate(workInProgress2);
        else {
          if (!newProps) {
            if (null === workInProgress2.stateNode)
              throw Error(formatProdErrorMessage(166));
            bubbleProperties(workInProgress2);
            workInProgress2.subtreeFlags &= -33554433;
            return null;
          }
          current = contextStackCursor.current;
          popHydrationState(workInProgress2) ? prepareToHydrateHostInstance(workInProgress2) : (current = resolveSingletonInstance(type, newProps, renderLanes2), workInProgress2.stateNode = current, markUpdate(workInProgress2));
        }
        bubbleProperties(workInProgress2);
        workInProgress2.subtreeFlags &= -33554433;
        return null;
      case 5:
        popHostContext(workInProgress2);
        type = workInProgress2.type;
        if (null !== current && null != workInProgress2.stateNode)
          current.memoizedProps !== newProps && markUpdate(workInProgress2);
        else {
          if (!newProps) {
            if (null === workInProgress2.stateNode)
              throw Error(formatProdErrorMessage(166));
            bubbleProperties(workInProgress2);
            workInProgress2.subtreeFlags &= -33554433;
            return null;
          }
          nextResource = contextStackCursor.current;
          if (popHydrationState(workInProgress2))
            prepareToHydrateHostInstance(workInProgress2);
          else {
            var ownerDocument = getOwnerDocumentFromRootContainer(
              rootInstanceStackCursor.current
            );
            switch (nextResource) {
              case 1:
                nextResource = ownerDocument.createElementNS(
                  "http://www.w3.org/2000/svg",
                  type
                );
                break;
              case 2:
                nextResource = ownerDocument.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  type
                );
                break;
              default:
                switch (type) {
                  case "svg":
                    nextResource = ownerDocument.createElementNS(
                      "http://www.w3.org/2000/svg",
                      type
                    );
                    break;
                  case "math":
                    nextResource = ownerDocument.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      type
                    );
                    break;
                  case "script":
                    nextResource = ownerDocument.createElement("div");
                    nextResource.innerHTML = "<script><\/script>";
                    nextResource = nextResource.removeChild(
                      nextResource.firstChild
                    );
                    break;
                  case "select":
                    nextResource = "string" === typeof newProps.is ? ownerDocument.createElement("select", {
                      is: newProps.is
                    }) : ownerDocument.createElement("select");
                    newProps.multiple ? nextResource.multiple = true : newProps.size && (nextResource.size = newProps.size);
                    break;
                  default:
                    nextResource = "string" === typeof newProps.is ? ownerDocument.createElement(type, { is: newProps.is }) : ownerDocument.createElement(type);
                }
            }
            nextResource[internalInstanceKey] = workInProgress2;
            nextResource[internalPropsKey] = newProps;
            a: for (ownerDocument = workInProgress2.child; null !== ownerDocument; ) {
              if (5 === ownerDocument.tag || 6 === ownerDocument.tag)
                nextResource.appendChild(ownerDocument.stateNode);
              else if (4 !== ownerDocument.tag && 27 !== ownerDocument.tag && null !== ownerDocument.child) {
                ownerDocument.child.return = ownerDocument;
                ownerDocument = ownerDocument.child;
                continue;
              }
              if (ownerDocument === workInProgress2) break a;
              for (; null === ownerDocument.sibling; ) {
                if (null === ownerDocument.return || ownerDocument.return === workInProgress2)
                  break a;
                ownerDocument = ownerDocument.return;
              }
              ownerDocument.sibling.return = ownerDocument.return;
              ownerDocument = ownerDocument.sibling;
            }
            workInProgress2.stateNode = nextResource;
            a: switch (setInitialProperties(nextResource, type, newProps), type) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                newProps = !!newProps.autoFocus;
                break a;
              case "img":
                newProps = true;
                break a;
              default:
                newProps = false;
            }
            newProps && markUpdate(workInProgress2);
          }
        }
        bubbleProperties(workInProgress2);
        workInProgress2.subtreeFlags &= -33554433;
        preloadInstanceAndSuspendIfNeeded(
          workInProgress2,
          workInProgress2.type,
          null === current ? null : current.memoizedProps,
          workInProgress2.pendingProps,
          renderLanes2
        );
        return null;
      case 6:
        if (current && null != workInProgress2.stateNode)
          current.memoizedProps !== newProps && markUpdate(workInProgress2);
        else {
          if ("string" !== typeof newProps && null === workInProgress2.stateNode)
            throw Error(formatProdErrorMessage(166));
          current = rootInstanceStackCursor.current;
          if (popHydrationState(workInProgress2)) {
            current = workInProgress2.stateNode;
            renderLanes2 = workInProgress2.memoizedProps;
            newProps = null;
            type = hydrationParentFiber;
            if (null !== type)
              switch (type.tag) {
                case 27:
                case 5:
                  newProps = type.memoizedProps;
              }
            current[internalInstanceKey] = workInProgress2;
            current = current.nodeValue === renderLanes2 || null !== newProps && true === newProps.suppressHydrationWarning || checkForUnmatchedText(current.nodeValue, renderLanes2) ? true : false;
            current || throwOnHydrationMismatch(workInProgress2, true);
          } else
            current = getOwnerDocumentFromRootContainer(current).createTextNode(
              newProps
            ), current[internalInstanceKey] = workInProgress2, workInProgress2.stateNode = current;
        }
        bubbleProperties(workInProgress2);
        return null;
      case 31:
        renderLanes2 = workInProgress2.memoizedState;
        if (null === current || null !== current.memoizedState) {
          newProps = popHydrationState(workInProgress2);
          if (null !== renderLanes2) {
            if (null === current) {
              if (!newProps) throw Error(formatProdErrorMessage(318));
              current = workInProgress2.memoizedState;
              current = null !== current ? current.dehydrated : null;
              if (!current) throw Error(formatProdErrorMessage(557));
              current[internalInstanceKey] = workInProgress2;
            } else
              resetHydrationState(), 0 === (workInProgress2.flags & 128) && (workInProgress2.memoizedState = null), workInProgress2.flags |= 4;
            bubbleProperties(workInProgress2);
            current = false;
          } else
            renderLanes2 = upgradeHydrationErrorsToRecoverable(), null !== current && null !== current.memoizedState && (current.memoizedState.hydrationErrors = renderLanes2), current = true;
          if (!current) {
            if (workInProgress2.flags & 256)
              return popSuspenseHandler(workInProgress2), workInProgress2;
            popSuspenseHandler(workInProgress2);
            return null;
          }
          if (0 !== (workInProgress2.flags & 128))
            throw Error(formatProdErrorMessage(558));
        }
        bubbleProperties(workInProgress2);
        return null;
      case 13:
        newProps = workInProgress2.memoizedState;
        if (null === current || null !== current.memoizedState && null !== current.memoizedState.dehydrated) {
          type = popHydrationState(workInProgress2);
          if (null !== newProps && null !== newProps.dehydrated) {
            if (null === current) {
              if (!type) throw Error(formatProdErrorMessage(318));
              type = workInProgress2.memoizedState;
              type = null !== type ? type.dehydrated : null;
              if (!type) throw Error(formatProdErrorMessage(317));
              type[internalInstanceKey] = workInProgress2;
            } else
              resetHydrationState(), 0 === (workInProgress2.flags & 128) && (workInProgress2.memoizedState = null), workInProgress2.flags |= 4;
            bubbleProperties(workInProgress2);
            type = false;
          } else
            type = upgradeHydrationErrorsToRecoverable(), null !== current && null !== current.memoizedState && (current.memoizedState.hydrationErrors = type), type = true;
          if (!type) {
            if (workInProgress2.flags & 256)
              return popSuspenseHandler(workInProgress2), workInProgress2;
            popSuspenseHandler(workInProgress2);
            return null;
          }
        }
        popSuspenseHandler(workInProgress2);
        if (0 !== (workInProgress2.flags & 128))
          return workInProgress2.lanes = renderLanes2, workInProgress2;
        renderLanes2 = null !== newProps;
        current = null !== current && null !== current.memoizedState;
        renderLanes2 && (newProps = workInProgress2.child, type = null, null !== newProps.alternate && null !== newProps.alternate.memoizedState && null !== newProps.alternate.memoizedState.cachePool && (type = newProps.alternate.memoizedState.cachePool.pool), nextResource = null, null !== newProps.memoizedState && null !== newProps.memoizedState.cachePool && (nextResource = newProps.memoizedState.cachePool.pool), nextResource !== type && (newProps.flags |= 2048));
        renderLanes2 !== current && renderLanes2 && (workInProgress2.child.flags |= 8192);
        scheduleRetryEffect(workInProgress2, workInProgress2.updateQueue);
        bubbleProperties(workInProgress2);
        return null;
      case 4:
        return popHostContainer(), null === current && listenToAllSupportedEvents(workInProgress2.stateNode.containerInfo), workInProgress2.flags |= 67108864, bubbleProperties(workInProgress2), null;
      case 10:
        return popProvider(workInProgress2.type), bubbleProperties(workInProgress2), null;
      case 19:
        popSuspenseListContext(workInProgress2);
        newProps = workInProgress2.memoizedState;
        if (null === newProps) return bubbleProperties(workInProgress2), null;
        type = 0 !== (workInProgress2.flags & 128);
        nextResource = newProps.rendering;
        if (null === nextResource)
          if (type) cutOffTailIfNeeded(newProps, false);
          else {
            if (0 !== workInProgressRootExitStatus || null !== current && 0 !== (current.flags & 128))
              for (current = workInProgress2.child; null !== current; ) {
                nextResource = findFirstSuspended(current);
                if (null !== nextResource) {
                  workInProgress2.flags |= 128;
                  cutOffTailIfNeeded(newProps, false);
                  current = nextResource.updateQueue;
                  workInProgress2.updateQueue = current;
                  scheduleRetryEffect(workInProgress2, current);
                  workInProgress2.subtreeFlags = 0;
                  current = renderLanes2;
                  for (renderLanes2 = workInProgress2.child; null !== renderLanes2; )
                    resetWorkInProgress(renderLanes2, current), renderLanes2 = renderLanes2.sibling;
                  pushSuspenseListContext(
                    workInProgress2,
                    suspenseStackCursor.current & 1 | 2
                  );
                  isHydrating && pushTreeFork(workInProgress2, newProps.treeForkCount);
                  return workInProgress2.child;
                }
                current = current.sibling;
              }
            null !== newProps.tail && now() > workInProgressRootRenderTargetTime && (workInProgress2.flags |= 128, type = true, cutOffTailIfNeeded(newProps, false), workInProgress2.lanes = 4194304);
          }
        else {
          if (!type)
            if (current = findFirstSuspended(nextResource), null !== current) {
              if (workInProgress2.flags |= 128, type = true, current = current.updateQueue, workInProgress2.updateQueue = current, scheduleRetryEffect(workInProgress2, current), cutOffTailIfNeeded(newProps, true), null === newProps.tail && "collapsed" !== newProps.tailMode && "visible" !== newProps.tailMode && !nextResource.alternate && !isHydrating)
                return bubbleProperties(workInProgress2), null;
            } else
              2 * now() - newProps.renderingStartTime > workInProgressRootRenderTargetTime && 536870912 !== renderLanes2 && (workInProgress2.flags |= 128, type = true, cutOffTailIfNeeded(newProps, false), workInProgress2.lanes = 4194304);
          newProps.isBackwards ? (nextResource.sibling = workInProgress2.child, workInProgress2.child = nextResource) : (current = newProps.last, null !== current ? current.sibling = nextResource : workInProgress2.child = nextResource, newProps.last = nextResource);
        }
        if (null !== newProps.tail) {
          current = newProps.tail;
          a: {
            for (renderLanes2 = current; null !== renderLanes2; ) {
              if (null !== renderLanes2.alternate) {
                renderLanes2 = false;
                break a;
              }
              renderLanes2 = renderLanes2.sibling;
            }
            renderLanes2 = true;
          }
          newProps.rendering = current;
          newProps.tail = current.sibling;
          newProps.renderingStartTime = now();
          current.sibling = null;
          nextResource = suspenseStackCursor.current;
          nextResource = type ? nextResource & 1 | 2 : nextResource & 1;
          "visible" === newProps.tailMode || "collapsed" === newProps.tailMode || !renderLanes2 || isHydrating ? pushSuspenseListContext(workInProgress2, nextResource) : (renderLanes2 = nextResource, push(suspenseHandlerStackCursor, workInProgress2), push(suspenseStackCursor, renderLanes2), null === shellBoundary && (shellBoundary = workInProgress2));
          isHydrating && pushTreeFork(workInProgress2, newProps.treeForkCount);
          return current;
        }
        bubbleProperties(workInProgress2);
        return null;
      case 22:
      case 23:
        return popSuspenseHandler(workInProgress2), popHiddenContext(), newProps = null !== workInProgress2.memoizedState, null !== current ? null !== current.memoizedState !== newProps && (workInProgress2.flags |= 8192) : newProps && (workInProgress2.flags |= 8192), newProps ? 0 !== (renderLanes2 & 536870912) && 0 === (workInProgress2.flags & 128) && (bubbleProperties(workInProgress2), workInProgress2.subtreeFlags & 6 && (workInProgress2.flags |= 8192)) : bubbleProperties(workInProgress2), renderLanes2 = workInProgress2.updateQueue, null !== renderLanes2 && scheduleRetryEffect(workInProgress2, renderLanes2.retryQueue), renderLanes2 = null, null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (renderLanes2 = current.memoizedState.cachePool.pool), newProps = null, null !== workInProgress2.memoizedState && null !== workInProgress2.memoizedState.cachePool && (newProps = workInProgress2.memoizedState.cachePool.pool), newProps !== renderLanes2 && (workInProgress2.flags |= 2048), null !== current && pop(resumedCache), null;
      case 24:
        return renderLanes2 = null, null !== current && (renderLanes2 = current.memoizedState.cache), workInProgress2.memoizedState.cache !== renderLanes2 && (workInProgress2.flags |= 2048), popProvider(CacheContext), bubbleProperties(workInProgress2), null;
      case 25:
        return null;
      case 30:
        return workInProgress2.flags |= 33554432, bubbleProperties(workInProgress2), null;
    }
    throw Error(formatProdErrorMessage(156, workInProgress2.tag));
  }
  function unwindWork(current, workInProgress2) {
    popTreeContext(workInProgress2);
    switch (workInProgress2.tag) {
      case 1:
        return current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
      case 3:
        return popProvider(CacheContext), popHostContainer(), current = workInProgress2.flags, 0 !== (current & 65536) && 0 === (current & 128) ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
      case 26:
      case 27:
      case 5:
        return popHostContext(workInProgress2), null;
      case 31:
        if (null !== workInProgress2.memoizedState) {
          popSuspenseHandler(workInProgress2);
          if (null === workInProgress2.alternate)
            throw Error(formatProdErrorMessage(340));
          resetHydrationState();
        }
        current = workInProgress2.flags;
        return current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
      case 13:
        popSuspenseHandler(workInProgress2);
        current = workInProgress2.memoizedState;
        if (null !== current && null !== current.dehydrated) {
          if (null === workInProgress2.alternate)
            throw Error(formatProdErrorMessage(340));
          resetHydrationState();
        }
        current = workInProgress2.flags;
        return current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
      case 19:
        return popSuspenseListContext(workInProgress2), current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, current = workInProgress2.memoizedState, null !== current && (current.rendering = null, current.tail = null), workInProgress2.flags |= 4, workInProgress2) : null;
      case 4:
        return popHostContainer(), null;
      case 10:
        return popProvider(workInProgress2.type), null;
      case 22:
      case 23:
        return popSuspenseHandler(workInProgress2), popHiddenContext(), null !== current && pop(resumedCache), current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
      case 24:
        return popProvider(CacheContext), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function unwindInterruptedWork(current, interruptedWork) {
    popTreeContext(interruptedWork);
    switch (interruptedWork.tag) {
      case 3:
        popProvider(CacheContext);
        popHostContainer();
        break;
      case 26:
      case 27:
      case 5:
        popHostContext(interruptedWork);
        break;
      case 4:
        popHostContainer();
        break;
      case 31:
        null !== interruptedWork.memoizedState && popSuspenseHandler(interruptedWork);
        break;
      case 13:
        popSuspenseHandler(interruptedWork);
        break;
      case 19:
        popSuspenseListContext(interruptedWork);
        break;
      case 10:
        popProvider(interruptedWork.type);
        break;
      case 22:
      case 23:
        popSuspenseHandler(interruptedWork);
        popHiddenContext();
        null !== current && pop(resumedCache);
        break;
      case 24:
        popProvider(CacheContext);
    }
  }
  function commitHookEffectListMount(flags, finishedWork) {
    try {
      var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
      if (null !== lastEffect) {
        var firstEffect = lastEffect.next;
        updateQueue = firstEffect;
        do {
          if ((updateQueue.tag & flags) === flags) {
            lastEffect = void 0;
            var create = updateQueue.create, inst = updateQueue.inst;
            lastEffect = create();
            inst.destroy = lastEffect;
          }
          updateQueue = updateQueue.next;
        } while (updateQueue !== firstEffect);
      }
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
  }
  function commitHookEffectListUnmount(flags, finishedWork, nearestMountedAncestor$jscomp$0) {
    try {
      var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
      if (null !== lastEffect) {
        var firstEffect = lastEffect.next;
        updateQueue = firstEffect;
        do {
          if ((updateQueue.tag & flags) === flags) {
            var inst = updateQueue.inst, destroy = inst.destroy;
            if (void 0 !== destroy) {
              inst.destroy = void 0;
              lastEffect = finishedWork;
              var nearestMountedAncestor = nearestMountedAncestor$jscomp$0, destroy_ = destroy;
              try {
                destroy_();
              } catch (error) {
                captureCommitPhaseError(
                  lastEffect,
                  nearestMountedAncestor,
                  error
                );
              }
            }
          }
          updateQueue = updateQueue.next;
        } while (updateQueue !== firstEffect);
      }
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
  }
  function commitClassCallbacks(finishedWork) {
    var updateQueue = finishedWork.updateQueue;
    if (null !== updateQueue) {
      var instance = finishedWork.stateNode;
      try {
        commitCallbacks(updateQueue, instance);
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
  }
  function safelyCallComponentWillUnmount(current, nearestMountedAncestor, instance) {
    instance.props = resolveClassComponentProps(
      current.type,
      current.memoizedProps
    );
    instance.state = current.memoizedState;
    try {
      instance.componentWillUnmount();
    } catch (error) {
      captureCommitPhaseError(current, nearestMountedAncestor, error);
    }
  }
  function safelyAttachRef(current, nearestMountedAncestor) {
    try {
      var ref = current.ref;
      if (null !== ref) {
        switch (current.tag) {
          case 26:
          case 27:
          case 5:
            var instanceToUse = current.stateNode;
            break;
          case 30:
            var instance = current.stateNode, name = getViewTransitionName(current.memoizedProps, instance);
            if (null === instance.ref || instance.ref.name !== name)
              instance.ref = createViewTransitionInstance(name);
            instanceToUse = instance.ref;
            break;
          case 7:
            if (null === current.stateNode) {
              var fragmentInstance = new FragmentInstance(current);
              traverseVisibleInstancesAndTextInstances(
                current.child,
                false,
                addFragmentHandleToFiber,
                fragmentInstance,
                void 0,
                void 0
              );
              current.stateNode = fragmentInstance;
            }
            instanceToUse = current.stateNode;
            break;
          default:
            instanceToUse = current.stateNode;
        }
        "function" === typeof ref ? current.refCleanup = ref(instanceToUse) : ref.current = instanceToUse;
      }
    } catch (error) {
      captureCommitPhaseError(current, nearestMountedAncestor, error);
    }
  }
  function safelyDetachRef(current, nearestMountedAncestor) {
    var ref = current.ref, refCleanup = current.refCleanup;
    if (null !== ref)
      if ("function" === typeof refCleanup)
        try {
          refCleanup();
        } catch (error) {
          captureCommitPhaseError(current, nearestMountedAncestor, error);
        } finally {
          current.refCleanup = null, current = current.alternate, null != current && (current.refCleanup = null);
        }
      else if ("function" === typeof ref)
        try {
          ref(null);
        } catch (error$148) {
          captureCommitPhaseError(current, nearestMountedAncestor, error$148);
        }
      else ref.current = null;
  }
  function commitNewChildToFragmentInstances(fiber, parentFragmentInstances) {
    if ((5 === fiber.tag || 27 === fiber.tag || 6 === fiber.tag) && null === fiber.alternate && null !== parentFragmentInstances)
      for (var i = 0; i < parentFragmentInstances.length; i++)
        commitNewChildToFragmentInstance(
          fiber.stateNode,
          parentFragmentInstances[i]
        );
  }
  function commitFragmentInstanceInsertionEffects(fiber) {
    for (var parent = fiber.return; null !== parent; ) {
      isFragmentInstanceParent(parent) && commitNewChildToFragmentInstance(fiber.stateNode, parent.stateNode);
      if (isFragmentInstanceHostBoundary(parent)) break;
      parent = parent.return;
    }
  }
  function commitFragmentInstanceDeletionEffects(fiber) {
    for (var parent = fiber.return; null !== parent; ) {
      isFragmentInstanceParent(parent) && deleteChildFromFragmentInstance(fiber.stateNode, parent.stateNode);
      if (isFragmentInstanceHostBoundary(parent)) break;
      parent = parent.return;
    }
  }
  function isFragmentInstanceHostBoundary(fiber) {
    return 5 === fiber.tag || 3 === fiber.tag || 27 === fiber.tag;
  }
  function isFragmentInstanceParent(fiber) {
    return fiber && 7 === fiber.tag && null !== fiber.stateNode;
  }
  function commitHostMount(finishedWork) {
    var type = finishedWork.type, props = finishedWork.memoizedProps, instance = finishedWork.stateNode;
    try {
      a: switch (type) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          props.autoFocus && instance.focus();
          break a;
        case "img":
          props.src ? instance.src = props.src : props.srcSet && (instance.srcset = props.srcSet);
      }
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
  }
  function commitHostUpdate(finishedWork, newProps, oldProps) {
    try {
      var domElement = finishedWork.stateNode;
      updateProperties(domElement, finishedWork.type, oldProps, newProps);
      domElement[internalPropsKey] = newProps;
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
  }
  function isHostParent(fiber) {
    return 5 === fiber.tag || 3 === fiber.tag || 26 === fiber.tag || 27 === fiber.tag && isSingletonScope(fiber.type) || 4 === fiber.tag;
  }
  function getHostSibling(fiber) {
    a: for (; ; ) {
      for (; null === fiber.sibling; ) {
        if (null === fiber.return || isHostParent(fiber.return)) return null;
        fiber = fiber.return;
      }
      fiber.sibling.return = fiber.return;
      for (fiber = fiber.sibling; 5 !== fiber.tag && 6 !== fiber.tag && 18 !== fiber.tag; ) {
        if (27 === fiber.tag && isSingletonScope(fiber.type)) continue a;
        if (fiber.flags & 2) continue a;
        if (null === fiber.child || 4 === fiber.tag) continue a;
        else fiber.child.return = fiber, fiber = fiber.child;
      }
      if (!(fiber.flags & 2)) return fiber.stateNode;
    }
  }
  function insertOrAppendPlacementNodeIntoContainer(node, before, parent, parentFragmentInstances) {
    var tag = node.tag;
    if (5 === tag || 6 === tag)
      tag = node.stateNode, before ? (9 === parent.nodeType ? parent.body : "HTML" === parent.nodeName ? parent.ownerDocument.body : parent).insertBefore(tag, before) : (before = 9 === parent.nodeType ? parent.body : "HTML" === parent.nodeName ? parent.ownerDocument.body : parent, before.appendChild(tag), parent = parent._reactRootContainer, null !== parent && void 0 !== parent || null !== before.onclick || (before.onclick = noop$1)), commitNewChildToFragmentInstances(node, parentFragmentInstances), viewTransitionMutationContext = true;
    else if (4 !== tag && (27 === tag && (commitNewChildToFragmentInstances(node, parentFragmentInstances), parentFragmentInstances = null, isSingletonScope(node.type) && (parent = node.stateNode, before = null)), node = node.child, null !== node))
      for (insertOrAppendPlacementNodeIntoContainer(
        node,
        before,
        parent,
        parentFragmentInstances
      ), node = node.sibling; null !== node; )
        insertOrAppendPlacementNodeIntoContainer(
          node,
          before,
          parent,
          parentFragmentInstances
        ), node = node.sibling;
  }
  function insertOrAppendPlacementNode(node, before, parent, parentFragmentInstances) {
    var tag = node.tag;
    if (5 === tag || 6 === tag)
      tag = node.stateNode, before ? parent.insertBefore(tag, before) : parent.appendChild(tag), commitNewChildToFragmentInstances(node, parentFragmentInstances), viewTransitionMutationContext = true;
    else if (4 !== tag && (27 === tag && (commitNewChildToFragmentInstances(node, parentFragmentInstances), parentFragmentInstances = null, isSingletonScope(node.type) && (parent = node.stateNode)), node = node.child, null !== node))
      for (insertOrAppendPlacementNode(
        node,
        before,
        parent,
        parentFragmentInstances
      ), node = node.sibling; null !== node; )
        insertOrAppendPlacementNode(
          node,
          before,
          parent,
          parentFragmentInstances
        ), node = node.sibling;
  }
  function commitHostSingletonAcquisition(finishedWork) {
    var singleton = finishedWork.stateNode, props = finishedWork.memoizedProps;
    try {
      for (var type = finishedWork.type, attributes = singleton.attributes; attributes.length; )
        singleton.removeAttributeNode(attributes[0]);
      setInitialProperties(singleton, type, props);
      singleton[internalInstanceKey] = finishedWork;
      singleton[internalPropsKey] = props;
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
  }
  var shouldStartViewTransition = false, appearingViewTransitions = null;
  function trackEnterViewTransitions(placement) {
    if (30 === placement.tag || 0 !== (placement.subtreeFlags & 33554432))
      shouldStartViewTransition = true;
  }
  var viewTransitionCancelableChildren = null;
  function pushViewTransitionCancelableScope() {
    var prevChildren = viewTransitionCancelableChildren;
    viewTransitionCancelableChildren = null;
    return prevChildren;
  }
  var viewTransitionHostInstanceIdx = 0;
  function applyViewTransitionToHostInstances(fiber, name, className, collectMeasurements, stopAtNestedViewTransitions) {
    viewTransitionHostInstanceIdx = 0;
    return applyViewTransitionToHostInstancesRecursive(
      fiber.child,
      name,
      className,
      collectMeasurements,
      stopAtNestedViewTransitions
    );
  }
  function applyViewTransitionToHostInstancesRecursive(child, name, className, collectMeasurements, stopAtNestedViewTransitions) {
    for (var inViewport = false; null !== child; ) {
      if (5 === child.tag) {
        var instance = child.stateNode;
        if (null !== collectMeasurements) {
          var measurement = measureInstance(instance);
          collectMeasurements.push(measurement);
          measurement.view && (inViewport = true);
        } else
          inViewport || measureInstance(instance).view && (inViewport = true);
        shouldStartViewTransition = true;
        applyViewTransitionName(
          instance,
          0 === viewTransitionHostInstanceIdx ? name : name + "_" + viewTransitionHostInstanceIdx,
          className
        );
        viewTransitionHostInstanceIdx++;
      } else if (22 !== child.tag || null === child.memoizedState)
        30 === child.tag && stopAtNestedViewTransitions || applyViewTransitionToHostInstancesRecursive(
          child.child,
          name,
          className,
          collectMeasurements,
          stopAtNestedViewTransitions
        ) && (inViewport = true);
      child = child.sibling;
    }
    return inViewport;
  }
  function restoreViewTransitionOnHostInstances(child, stopAtNestedViewTransitions) {
    for (; null !== child; ) {
      if (5 === child.tag)
        restoreViewTransitionName(child.stateNode, child.memoizedProps);
      else if (22 !== child.tag || null === child.memoizedState)
        30 === child.tag && stopAtNestedViewTransitions || restoreViewTransitionOnHostInstances(
          child.child,
          stopAtNestedViewTransitions
        );
      child = child.sibling;
    }
  }
  function commitAppearingPairViewTransitions(placement) {
    if (0 !== (placement.subtreeFlags & 18874368))
      for (placement = placement.child; null !== placement; ) {
        if (22 !== placement.tag || null === placement.memoizedState) {
          if (commitAppearingPairViewTransitions(placement), 30 === placement.tag && 0 !== (placement.flags & 18874368) && placement.stateNode.paired) {
            var props = placement.memoizedProps;
            if (null == props.name || "auto" === props.name)
              throw Error(formatProdErrorMessage(544));
            var name = props.name;
            props = getViewTransitionClassName(props.default, props.share);
            "none" !== props && (applyViewTransitionToHostInstances(
              placement,
              name,
              props,
              null,
              false
            ) || restoreViewTransitionOnHostInstances(placement.child, false));
          }
        }
        placement = placement.sibling;
      }
  }
  function commitEnterViewTransitions(placement, gesture) {
    if (30 === placement.tag) {
      var state = placement.stateNode, props = placement.memoizedProps, name = getViewTransitionName(props, state), className = getViewTransitionClassName(
        props.default,
        state.paired ? props.share : props.enter
      );
      "none" !== className ? applyViewTransitionToHostInstances(placement, name, className, null, false) ? (commitAppearingPairViewTransitions(placement), state.paired || gesture || scheduleViewTransitionEvent(placement, props.onEnter)) : restoreViewTransitionOnHostInstances(placement.child, false) : commitAppearingPairViewTransitions(placement);
    } else if (0 !== (placement.subtreeFlags & 33554432))
      for (placement = placement.child; null !== placement; )
        commitEnterViewTransitions(placement, gesture), placement = placement.sibling;
    else commitAppearingPairViewTransitions(placement);
  }
  function commitDeletedPairViewTransitions(deletion) {
    if (null !== appearingViewTransitions && 0 !== appearingViewTransitions.size) {
      var pairs = appearingViewTransitions;
      if (0 !== (deletion.subtreeFlags & 18874368))
        for (deletion = deletion.child; null !== deletion; ) {
          if (22 !== deletion.tag || null === deletion.memoizedState) {
            if (30 === deletion.tag && 0 !== (deletion.flags & 18874368)) {
              var props = deletion.memoizedProps, name = props.name;
              if (null != name && "auto" !== name) {
                var pair = pairs.get(name);
                if (void 0 !== pair) {
                  var className = getViewTransitionClassName(
                    props.default,
                    props.share
                  );
                  "none" !== className && (applyViewTransitionToHostInstances(
                    deletion,
                    name,
                    className,
                    null,
                    false
                  ) ? (className = deletion.stateNode, pair.paired = className, className.paired = pair, scheduleViewTransitionEvent(deletion, props.onShare)) : restoreViewTransitionOnHostInstances(deletion.child, false));
                  pairs.delete(name);
                  if (0 === pairs.size) break;
                }
              }
            }
            commitDeletedPairViewTransitions(deletion);
          }
          deletion = deletion.sibling;
        }
    }
  }
  function commitExitViewTransitions(deletion) {
    if (30 === deletion.tag) {
      var props = deletion.memoizedProps, name = getViewTransitionName(props, deletion.stateNode), pair = null !== appearingViewTransitions ? appearingViewTransitions.get(name) : void 0, className = getViewTransitionClassName(
        props.default,
        void 0 !== pair ? props.share : props.exit
      );
      "none" !== className && (applyViewTransitionToHostInstances(deletion, name, className, null, false) ? void 0 !== pair ? (className = deletion.stateNode, pair.paired = className, className.paired = pair, appearingViewTransitions.delete(name), scheduleViewTransitionEvent(deletion, props.onShare)) : scheduleViewTransitionEvent(deletion, props.onExit) : restoreViewTransitionOnHostInstances(deletion.child, false));
      null !== appearingViewTransitions && commitDeletedPairViewTransitions(deletion);
    } else if (0 !== (deletion.subtreeFlags & 33554432))
      for (deletion = deletion.child; null !== deletion; )
        commitExitViewTransitions(deletion), deletion = deletion.sibling;
    else
      null !== appearingViewTransitions && commitDeletedPairViewTransitions(deletion);
  }
  function commitNestedViewTransitions(changedParent) {
    for (changedParent = changedParent.child; null !== changedParent; ) {
      if (30 === changedParent.tag) {
        var props = changedParent.memoizedProps, name = getViewTransitionName(props, changedParent.stateNode);
        props = getViewTransitionClassName(props.default, props.update);
        changedParent.flags &= -5;
        "none" !== props && applyViewTransitionToHostInstances(
          changedParent,
          name,
          props,
          changedParent.memoizedState = [],
          false
        );
      } else
        0 !== (changedParent.subtreeFlags & 33554432) && commitNestedViewTransitions(changedParent);
      changedParent = changedParent.sibling;
    }
  }
  function restorePairedViewTransitions(parent) {
    if (0 !== (parent.subtreeFlags & 18874368))
      for (parent = parent.child; null !== parent; ) {
        if (22 !== parent.tag || null === parent.memoizedState) {
          if (30 === parent.tag && 0 !== (parent.flags & 18874368)) {
            var instance = parent.stateNode;
            null !== instance.paired && (instance.paired = null, restoreViewTransitionOnHostInstances(parent.child, false));
          }
          restorePairedViewTransitions(parent);
        }
        parent = parent.sibling;
      }
  }
  function restoreEnterOrExitViewTransitions(fiber) {
    if (30 === fiber.tag)
      fiber.stateNode.paired = null, restoreViewTransitionOnHostInstances(fiber.child, false), restorePairedViewTransitions(fiber);
    else if (0 !== (fiber.subtreeFlags & 33554432))
      for (fiber = fiber.child; null !== fiber; )
        restoreEnterOrExitViewTransitions(fiber), fiber = fiber.sibling;
    else restorePairedViewTransitions(fiber);
  }
  function restoreNestedViewTransitions(changedParent) {
    for (changedParent = changedParent.child; null !== changedParent; )
      30 === changedParent.tag ? restoreViewTransitionOnHostInstances(changedParent.child, false) : 0 !== (changedParent.subtreeFlags & 33554432) && restoreNestedViewTransitions(changedParent), changedParent = changedParent.sibling;
  }
  function measureViewTransitionHostInstancesRecursive(parentViewTransition, child, newName, oldName, className, previousMeasurements, stopAtNestedViewTransitions) {
    for (var inViewport = false; null !== child; ) {
      if (5 === child.tag) {
        var instance = child.stateNode;
        if (null !== previousMeasurements && viewTransitionHostInstanceIdx < previousMeasurements.length) {
          var previousMeasurement = previousMeasurements[viewTransitionHostInstanceIdx], nextMeasurement = measureInstance(instance);
          if (previousMeasurement.view || nextMeasurement.view) inViewport = true;
          var JSCompiler_temp;
          if (JSCompiler_temp = 0 === (parentViewTransition.flags & 4))
            if (nextMeasurement.clip) JSCompiler_temp = true;
            else {
              JSCompiler_temp = previousMeasurement.rect;
              var newRect = nextMeasurement.rect;
              JSCompiler_temp = JSCompiler_temp.y !== newRect.y || JSCompiler_temp.x !== newRect.x || JSCompiler_temp.height !== newRect.height || JSCompiler_temp.width !== newRect.width;
            }
          JSCompiler_temp && (parentViewTransition.flags |= 4);
          nextMeasurement.abs ? nextMeasurement = !previousMeasurement.abs : (previousMeasurement = previousMeasurement.rect, nextMeasurement = nextMeasurement.rect, nextMeasurement = previousMeasurement.height !== nextMeasurement.height || previousMeasurement.width !== nextMeasurement.width);
          nextMeasurement && (parentViewTransition.flags |= 32);
        } else parentViewTransition.flags |= 32;
        0 !== (parentViewTransition.flags & 4) && applyViewTransitionName(
          instance,
          0 === viewTransitionHostInstanceIdx ? newName : newName + "_" + viewTransitionHostInstanceIdx,
          className
        );
        inViewport && 0 !== (parentViewTransition.flags & 4) || (null === viewTransitionCancelableChildren && (viewTransitionCancelableChildren = []), viewTransitionCancelableChildren.push(
          instance,
          0 === viewTransitionHostInstanceIdx ? oldName : oldName + "_" + viewTransitionHostInstanceIdx,
          child.memoizedProps
        ));
        viewTransitionHostInstanceIdx++;
      } else if (22 !== child.tag || null === child.memoizedState)
        30 === child.tag && stopAtNestedViewTransitions ? parentViewTransition.flags |= child.flags & 32 : measureViewTransitionHostInstancesRecursive(
          parentViewTransition,
          child.child,
          newName,
          oldName,
          className,
          previousMeasurements,
          stopAtNestedViewTransitions
        ) && (inViewport = true);
      child = child.sibling;
    }
    return inViewport;
  }
  function measureNestedViewTransitions(changedParent, gesture) {
    for (changedParent = changedParent.child; null !== changedParent; ) {
      if (30 === changedParent.tag) {
        var props = changedParent.memoizedProps, state = changedParent.stateNode, name = getViewTransitionName(props, state), className = getViewTransitionClassName(props.default, props.update);
        var previousMeasurements;
        previousMeasurements = changedParent.memoizedState, changedParent.memoizedState = null;
        state = changedParent;
        var child = changedParent.child;
        viewTransitionHostInstanceIdx = 0;
        name = measureViewTransitionHostInstancesRecursive(
          state,
          child,
          name,
          name,
          className,
          previousMeasurements,
          false
        );
        0 !== (changedParent.flags & 4) && name && scheduleViewTransitionEvent(changedParent, props.onUpdate);
      } else
        0 !== (changedParent.subtreeFlags & 33554432) && measureNestedViewTransitions(changedParent);
      changedParent = changedParent.sibling;
    }
  }
  var offscreenSubtreeIsHidden = false, offscreenSubtreeWasHidden = false, offscreenDirectParentIsHidden = false, needsFormReset = false, PossiblyWeakSet = "function" === typeof WeakSet ? WeakSet : Set, nextEffect = null, viewTransitionContextChanged = false, inUpdateViewTransition = false, rootViewTransitionAffected = false, rootViewTransitionNameCanceled = false;
  function commitBeforeMutationEffects(root2, firstChild, committedLanes) {
    root2 = root2.containerInfo;
    eventsEnabled = _enabled;
    root2 = getActiveElementDeep(root2);
    if (hasSelectionCapabilities(root2)) {
      if ("selectionStart" in root2)
        var JSCompiler_temp = {
          start: root2.selectionStart,
          end: root2.selectionEnd
        };
      else
        a: {
          JSCompiler_temp = (JSCompiler_temp = root2.ownerDocument) && JSCompiler_temp.defaultView || window;
          var selection = JSCompiler_temp.getSelection && JSCompiler_temp.getSelection();
          if (selection && 0 !== selection.rangeCount) {
            JSCompiler_temp = selection.anchorNode;
            var anchorOffset = selection.anchorOffset, focusNode = selection.focusNode;
            selection = selection.focusOffset;
            try {
              JSCompiler_temp.nodeType, focusNode.nodeType;
            } catch (e$21) {
              JSCompiler_temp = null;
              break a;
            }
            var length = 0, start = -1, end = -1, indexWithinAnchor = 0, indexWithinFocus = 0, node = root2, parentNode = null;
            b: for (; ; ) {
              for (var next; ; ) {
                node !== JSCompiler_temp || 0 !== anchorOffset && 3 !== node.nodeType || (start = length + anchorOffset);
                node !== focusNode || 0 !== selection && 3 !== node.nodeType || (end = length + selection);
                3 === node.nodeType && (length += node.nodeValue.length);
                if (null === (next = node.firstChild)) break;
                parentNode = node;
                node = next;
              }
              for (; ; ) {
                if (node === root2) break b;
                parentNode === JSCompiler_temp && ++indexWithinAnchor === anchorOffset && (start = length);
                parentNode === focusNode && ++indexWithinFocus === selection && (end = length);
                if (null !== (next = node.nextSibling)) break;
                node = parentNode;
                parentNode = node.parentNode;
              }
              node = next;
            }
            JSCompiler_temp = -1 === start || -1 === end ? null : { start, end };
          } else JSCompiler_temp = null;
        }
      JSCompiler_temp = JSCompiler_temp || { start: 0, end: 0 };
    } else JSCompiler_temp = null;
    selectionInformation = { focusedElem: root2, selectionRange: JSCompiler_temp };
    _enabled = false;
    committedLanes = (committedLanes & 335544064) === committedLanes;
    nextEffect = firstChild;
    for (firstChild = committedLanes ? 9270 : 1024; null !== nextEffect; ) {
      root2 = nextEffect;
      if (committedLanes && (JSCompiler_temp = root2.deletions, null !== JSCompiler_temp))
        for (anchorOffset = 0; anchorOffset < JSCompiler_temp.length; anchorOffset++)
          committedLanes && commitExitViewTransitions(JSCompiler_temp[anchorOffset]);
      if (null === root2.alternate && 0 !== (root2.flags & 2))
        committedLanes && trackEnterViewTransitions(root2), commitBeforeMutationEffects_complete(committedLanes);
      else {
        if (22 === root2.tag) {
          if (JSCompiler_temp = root2.alternate, null !== root2.memoizedState) {
            null !== JSCompiler_temp && null === JSCompiler_temp.memoizedState && committedLanes && commitExitViewTransitions(JSCompiler_temp);
            commitBeforeMutationEffects_complete(committedLanes);
            continue;
          } else if (null !== JSCompiler_temp && null !== JSCompiler_temp.memoizedState) {
            committedLanes && trackEnterViewTransitions(root2);
            commitBeforeMutationEffects_complete(committedLanes);
            continue;
          }
        }
        JSCompiler_temp = root2.child;
        0 !== (root2.subtreeFlags & firstChild) && null !== JSCompiler_temp ? (JSCompiler_temp.return = root2, nextEffect = JSCompiler_temp) : (committedLanes && commitNestedViewTransitions(root2), commitBeforeMutationEffects_complete(committedLanes));
      }
    }
    appearingViewTransitions = null;
  }
  function commitBeforeMutationEffects_complete(isViewTransitionEligible$jscomp$0) {
    for (; null !== nextEffect; ) {
      var fiber = nextEffect, isViewTransitionEligible = isViewTransitionEligible$jscomp$0, current = fiber.alternate, flags = fiber.flags;
      switch (fiber.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (0 !== (flags & 1024) && null !== current) {
            isViewTransitionEligible = void 0;
            flags = current.memoizedProps;
            current = current.memoizedState;
            var instance = fiber.stateNode;
            try {
              var resolvedPrevProps = resolveClassComponentProps(
                fiber.type,
                flags
              );
              isViewTransitionEligible = instance.getSnapshotBeforeUpdate(
                resolvedPrevProps,
                current
              );
              instance.__reactInternalSnapshotBeforeUpdate = isViewTransitionEligible;
            } catch (error) {
              captureCommitPhaseError(fiber, fiber.return, error);
            }
          }
          break;
        case 3:
          if (0 !== (flags & 1024)) {
            if (current = fiber.stateNode.containerInfo, isViewTransitionEligible = current.nodeType, 9 === isViewTransitionEligible)
              clearContainerSparingly(current);
            else if (1 === isViewTransitionEligible)
              switch (current.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  clearContainerSparingly(current);
                  break;
                default:
                  current.textContent = "";
              }
          }
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        case 30:
          isViewTransitionEligible && null !== current && (isViewTransitionEligible = getViewTransitionName(
            current.memoizedProps,
            current.stateNode
          ), flags = fiber.memoizedProps, flags = getViewTransitionClassName(flags.default, flags.update), "none" !== flags && applyViewTransitionToHostInstances(
            current,
            isViewTransitionEligible,
            flags,
            current.memoizedState = [],
            true
          ));
          break;
        default:
          if (0 !== (flags & 1024)) throw Error(formatProdErrorMessage(163));
      }
      current = fiber.sibling;
      if (null !== current) {
        current.return = fiber.return;
        nextEffect = current;
        break;
      }
      nextEffect = fiber.return;
    }
  }
  function commitLayoutEffectOnFiber(finishedRoot, current, finishedWork) {
    var flags = finishedWork.flags;
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 15:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        flags & 4 && commitHookEffectListMount(5, finishedWork);
        break;
      case 1:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        if (flags & 4)
          if (finishedRoot = finishedWork.stateNode, null === current)
            try {
              finishedRoot.componentDidMount();
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          else {
            var prevProps = resolveClassComponentProps(
              finishedWork.type,
              current.memoizedProps
            );
            current = current.memoizedState;
            try {
              finishedRoot.componentDidUpdate(
                prevProps,
                current,
                finishedRoot.__reactInternalSnapshotBeforeUpdate
              );
            } catch (error$146) {
              captureCommitPhaseError(
                finishedWork,
                finishedWork.return,
                error$146
              );
            }
          }
        flags & 64 && commitClassCallbacks(finishedWork);
        flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
        break;
      case 3:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        if (flags & 64 && (finishedRoot = finishedWork.updateQueue, null !== finishedRoot)) {
          current = null;
          if (null !== finishedWork.child)
            switch (finishedWork.child.tag) {
              case 27:
              case 5:
                current = finishedWork.child.stateNode;
                break;
              case 1:
                current = finishedWork.child.stateNode;
            }
          try {
            commitCallbacks(finishedRoot, current);
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
        break;
      case 27:
        null === current && flags & 4 && commitHostSingletonAcquisition(finishedWork);
      case 26:
      case 5:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        null === current && flags & 4 && commitHostMount(finishedWork);
        flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
        break;
      case 12:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        break;
      case 31:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
        break;
      case 13:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
        flags & 64 && (finishedRoot = finishedWork.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot && (finishedWork = retryDehydratedSuspenseBoundary.bind(
          null,
          finishedWork
        ), registerSuspenseInstanceRetry(finishedRoot, finishedWork))));
        break;
      case 22:
        flags = null !== finishedWork.memoizedState || offscreenSubtreeIsHidden;
        if (!flags) {
          var newOffscreenSubtreeWasHidden = null !== current && null !== current.memoizedState || offscreenSubtreeWasHidden;
          current = offscreenSubtreeIsHidden;
          prevProps = offscreenSubtreeWasHidden;
          offscreenSubtreeIsHidden = flags;
          (offscreenSubtreeWasHidden = newOffscreenSubtreeWasHidden) && !prevProps ? (flags = 2, 0 !== (finishedWork.subtreeFlags & 8772) && (flags |= 1), recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            flags
          )) : recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          offscreenSubtreeIsHidden = current;
          offscreenSubtreeWasHidden = prevProps;
        }
        break;
      case 30:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
        break;
      case 7:
        flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
      default:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
    }
  }
  function hideOrUnhideAllChildren(parentFiber, isHidden) {
    for (parentFiber = parentFiber.child; null !== parentFiber; )
      hideOrUnhideAllChildrenOnFiber(parentFiber, isHidden), parentFiber = parentFiber.sibling;
  }
  function hideOrUnhideAllChildrenOnFiber(fiber, isHidden) {
    switch (fiber.tag) {
      case 5:
      case 26:
        try {
          var instance = fiber.stateNode;
          if (isHidden) {
            var style2 = instance.style;
            "function" === typeof style2.setProperty ? style2.setProperty("display", "none", "important") : style2.display = "none";
          } else {
            var instance$jscomp$0 = fiber.stateNode, styleProp = fiber.memoizedProps.style, display = void 0 !== styleProp && null !== styleProp && styleProp.hasOwnProperty("display") ? styleProp.display : null;
            instance$jscomp$0.style.display = null == display || "boolean" === typeof display ? "" : ("" + display).trim();
          }
        } catch (error) {
          captureCommitPhaseError(fiber, fiber.return, error);
        }
        hideOrUnhideNearestPortals(fiber, isHidden);
        break;
      case 6:
        try {
          fiber.stateNode.nodeValue = isHidden ? "" : fiber.memoizedProps, viewTransitionMutationContext = true;
        } catch (error) {
          captureCommitPhaseError(fiber, fiber.return, error);
        }
        break;
      case 18:
        try {
          var instance$jscomp$1 = fiber.stateNode;
          isHidden ? hideOrUnhideDehydratedBoundary(instance$jscomp$1, true) : hideOrUnhideDehydratedBoundary(fiber.stateNode, false);
        } catch (error) {
          captureCommitPhaseError(fiber, fiber.return, error);
        }
        break;
      case 22:
      case 23:
        null === fiber.memoizedState && hideOrUnhideAllChildren(fiber, isHidden);
        break;
      default:
        hideOrUnhideAllChildren(fiber, isHidden);
    }
  }
  function hideOrUnhideNearestPortals(parentFiber, isHidden$jscomp$0) {
    if (parentFiber.subtreeFlags & 67108864)
      for (parentFiber = parentFiber.child; null !== parentFiber; ) {
        a: {
          var fiber = parentFiber, isHidden = isHidden$jscomp$0;
          switch (fiber.tag) {
            case 4:
              hideOrUnhideAllChildrenOnFiber(fiber, isHidden);
              break a;
            case 22:
              null === fiber.memoizedState && hideOrUnhideNearestPortals(fiber, isHidden);
              break a;
            default:
              hideOrUnhideNearestPortals(fiber, isHidden);
          }
        }
        parentFiber = parentFiber.sibling;
      }
  }
  function detachFiberAfterEffects(fiber) {
    var alternate = fiber.alternate;
    null !== alternate && (fiber.alternate = null, detachFiberAfterEffects(alternate));
    fiber.child = null;
    fiber.deletions = null;
    fiber.sibling = null;
    5 === fiber.tag && (alternate = fiber.stateNode, null !== alternate && detachDeletedInstance(alternate));
    fiber.stateNode = null;
    fiber.return = null;
    fiber.dependencies = null;
    fiber.memoizedProps = null;
    fiber.memoizedState = null;
    fiber.pendingProps = null;
    fiber.stateNode = null;
    fiber.updateQueue = null;
  }
  var hostParent = null, hostParentIsContainer = false;
  function recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, parent) {
    for (parent = parent.child; null !== parent; )
      commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, parent), parent = parent.sibling;
  }
  function commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, deletedFiber) {
    if (injectedHook && "function" === typeof injectedHook.onCommitFiberUnmount)
      try {
        injectedHook.onCommitFiberUnmount(rendererID, deletedFiber);
      } catch (err) {
      }
    switch (deletedFiber.tag) {
      case 26:
        offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        deletedFiber.memoizedState ? deletedFiber.memoizedState.count-- : deletedFiber.stateNode && !offscreenSubtreeWasHidden && (deletedFiber = deletedFiber.stateNode, deletedFiber.parentNode.removeChild(deletedFiber));
        break;
      case 27:
        offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
        commitFragmentInstanceDeletionEffects(deletedFiber);
        var prevHostParent = hostParent, prevHostParentIsContainer = hostParentIsContainer;
        isSingletonScope(deletedFiber.type) && (hostParent = deletedFiber.stateNode, hostParentIsContainer = false);
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        releaseSingletonInstance(
          deletedFiber.stateNode,
          deletedFiber.type,
          deletedFiber.memoizedProps
        );
        hostParent = prevHostParent;
        hostParentIsContainer = prevHostParentIsContainer;
        break;
      case 5:
        offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor), commitFragmentInstanceDeletionEffects(deletedFiber);
      case 6:
        6 === deletedFiber.tag && commitFragmentInstanceDeletionEffects(deletedFiber);
        prevHostParent = hostParent;
        prevHostParentIsContainer = hostParentIsContainer;
        hostParent = null;
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        hostParent = prevHostParent;
        hostParentIsContainer = prevHostParentIsContainer;
        if (null !== hostParent)
          if (hostParentIsContainer)
            try {
              (9 === hostParent.nodeType ? hostParent.body : "HTML" === hostParent.nodeName ? hostParent.ownerDocument.body : hostParent).removeChild(deletedFiber.stateNode), viewTransitionMutationContext = true;
            } catch (error) {
              captureCommitPhaseError(
                deletedFiber,
                nearestMountedAncestor,
                error
              );
            }
          else
            try {
              hostParent.removeChild(deletedFiber.stateNode), viewTransitionMutationContext = true;
            } catch (error) {
              captureCommitPhaseError(
                deletedFiber,
                nearestMountedAncestor,
                error
              );
            }
        break;
      case 18:
        null !== hostParent && (hostParentIsContainer ? (finishedRoot = hostParent, clearHydrationBoundary(
          9 === finishedRoot.nodeType ? finishedRoot.body : "HTML" === finishedRoot.nodeName ? finishedRoot.ownerDocument.body : finishedRoot,
          deletedFiber.stateNode
        ), retryIfBlockedOn(finishedRoot)) : clearHydrationBoundary(hostParent, deletedFiber.stateNode));
        break;
      case 4:
        prevHostParent = hostParent;
        prevHostParentIsContainer = hostParentIsContainer;
        hostParent = deletedFiber.stateNode.containerInfo;
        hostParentIsContainer = true;
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        hostParent = prevHostParent;
        hostParentIsContainer = prevHostParentIsContainer;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        commitHookEffectListUnmount(2, deletedFiber, nearestMountedAncestor);
        offscreenSubtreeWasHidden || commitHookEffectListUnmount(4, deletedFiber, nearestMountedAncestor);
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        break;
      case 1:
        offscreenSubtreeWasHidden || (safelyDetachRef(deletedFiber, nearestMountedAncestor), prevHostParent = deletedFiber.stateNode, "function" === typeof prevHostParent.componentWillUnmount && safelyCallComponentWillUnmount(
          deletedFiber,
          nearestMountedAncestor,
          prevHostParent
        ));
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        break;
      case 21:
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        break;
      case 22:
        offscreenSubtreeWasHidden = (prevHostParent = offscreenSubtreeWasHidden) || null !== deletedFiber.memoizedState;
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        offscreenSubtreeWasHidden = prevHostParent;
        break;
      case 30:
        safelyDetachRef(deletedFiber, nearestMountedAncestor);
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        break;
      case 7:
        offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        break;
      default:
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
    }
  }
  function commitActivityHydrationCallbacks(finishedRoot, finishedWork) {
    if (null === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, null !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, null !== finishedRoot))) {
      finishedRoot = finishedRoot.dehydrated;
      try {
        retryIfBlockedOn(finishedRoot);
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
  }
  function commitSuspenseHydrationCallbacks(finishedRoot, finishedWork) {
    if (null === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, null !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot))))
      try {
        retryIfBlockedOn(finishedRoot);
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
  }
  function getRetryCache(finishedWork) {
    switch (finishedWork.tag) {
      case 31:
      case 13:
      case 19:
        var retryCache = finishedWork.stateNode;
        null === retryCache && (retryCache = finishedWork.stateNode = new PossiblyWeakSet());
        return retryCache;
      case 22:
        return finishedWork = finishedWork.stateNode, retryCache = finishedWork._retryCache, null === retryCache && (retryCache = finishedWork._retryCache = new PossiblyWeakSet()), retryCache;
      default:
        throw Error(formatProdErrorMessage(435, finishedWork.tag));
    }
  }
  function attachSuspenseRetryListeners(finishedWork, wakeables) {
    var retryCache = getRetryCache(finishedWork);
    wakeables.forEach(function(wakeable) {
      if (!retryCache.has(wakeable)) {
        retryCache.add(wakeable);
        var retry = resolveRetryWakeable.bind(null, finishedWork, wakeable);
        wakeable.then(retry, retry);
      }
    });
  }
  function recursivelyTraverseMutationEffects(root$jscomp$0, parentFiber, lanes) {
    var deletions = parentFiber.deletions;
    if (null !== deletions)
      for (var i = 0; i < deletions.length; i++) {
        var childToDelete = deletions[i], root2 = root$jscomp$0, returnFiber = parentFiber, parent = returnFiber;
        a: for (; null !== parent; ) {
          switch (parent.tag) {
            case 27:
              if (isSingletonScope(parent.type)) {
                hostParent = parent.stateNode;
                hostParentIsContainer = false;
                break a;
              }
              break;
            case 5:
              hostParent = parent.stateNode;
              hostParentIsContainer = false;
              break a;
            case 3:
            case 4:
              hostParent = parent.stateNode.containerInfo;
              hostParentIsContainer = true;
              break a;
          }
          parent = parent.return;
        }
        if (null === hostParent) throw Error(formatProdErrorMessage(160));
        commitDeletionEffectsOnFiber(root2, returnFiber, childToDelete);
        hostParent = null;
        hostParentIsContainer = false;
        root2 = childToDelete.alternate;
        null !== root2 && (root2.return = null);
        childToDelete.return = null;
      }
    if (parentFiber.subtreeFlags & 13886)
      for (parentFiber = parentFiber.child; null !== parentFiber; )
        commitMutationEffectsOnFiber(parentFiber, root$jscomp$0, lanes), parentFiber = parentFiber.sibling;
  }
  var currentHoistableRoot = null;
  function commitMutationEffectsOnFiber(finishedWork, root2, lanes) {
    var current = finishedWork.alternate, flags = finishedWork.flags;
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (flags & 4 && (current = finishedWork.updateQueue, current = null !== current ? current.events : null, null !== current))
          for (var ii = 0; ii < current.length; ii++) {
            var _eventPayloads$ii2 = current[ii];
            _eventPayloads$ii2.ref.impl = _eventPayloads$ii2.nextImpl;
          }
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        flags & 4 && (commitHookEffectListUnmount(3, finishedWork, finishedWork.return), commitHookEffectListMount(3, finishedWork), commitHookEffectListUnmount(5, finishedWork, finishedWork.return));
        break;
      case 1:
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
        flags & 64 && offscreenSubtreeIsHidden && (finishedWork = finishedWork.updateQueue, null !== finishedWork && (root2 = finishedWork.callbacks, null !== root2 && (lanes = finishedWork.shared.hiddenCallbacks, finishedWork.shared.hiddenCallbacks = null === lanes ? root2 : lanes.concat(root2))));
        break;
      case 26:
        ii = currentHoistableRoot;
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
        if (flags & 4)
          if (flags = null !== current ? current.memoizedState : null, lanes = finishedWork.memoizedState, null === current)
            if (null === lanes)
              if (null === finishedWork.stateNode)
                if (offscreenSubtreeIsHidden)
                  finishedWork.stateNode = createHoistableInstance(
                    finishedWork.type,
                    finishedWork.memoizedProps,
                    root2.containerInfo,
                    finishedWork
                  );
                else {
                  a: {
                    root2 = finishedWork.type;
                    lanes = finishedWork.memoizedProps;
                    flags = ii.ownerDocument || ii;
                    b: switch (root2) {
                      case "title":
                        current = flags.getElementsByTagName("title")[0];
                        if (!current || current[internalHoistableMarker] || current[internalInstanceKey] || "http://www.w3.org/2000/svg" === current.namespaceURI || current.hasAttribute("itemprop"))
                          current = flags.createElement(root2), flags.head.insertBefore(
                            current,
                            flags.querySelector("head > title")
                          );
                        setInitialProperties(current, root2, lanes);
                        current[internalInstanceKey] = finishedWork;
                        markNodeAsHoistable(current);
                        root2 = current;
                        break a;
                      case "link":
                        if (ii = getHydratableHoistableCache(
                          "link",
                          "href",
                          flags
                        ).get(root2 + (lanes.href || ""))) {
                          for (_eventPayloads$ii2 = 0; _eventPayloads$ii2 < ii.length; _eventPayloads$ii2++)
                            if (current = ii[_eventPayloads$ii2], current.getAttribute("href") === (null == lanes.href || "" === lanes.href ? null : lanes.href) && current.getAttribute("rel") === (null == lanes.rel ? null : lanes.rel) && current.getAttribute("title") === (null == lanes.title ? null : lanes.title) && current.getAttribute("crossorigin") === (null == lanes.crossOrigin ? null : lanes.crossOrigin)) {
                              ii.splice(_eventPayloads$ii2, 1);
                              break b;
                            }
                        }
                        current = flags.createElement(root2);
                        setInitialProperties(current, root2, lanes);
                        flags.head.appendChild(current);
                        break;
                      case "meta":
                        if (ii = getHydratableHoistableCache(
                          "meta",
                          "content",
                          flags
                        ).get(root2 + (lanes.content || ""))) {
                          for (_eventPayloads$ii2 = 0; _eventPayloads$ii2 < ii.length; _eventPayloads$ii2++)
                            if (current = ii[_eventPayloads$ii2], current.getAttribute("content") === (null == lanes.content ? null : "" + lanes.content) && current.getAttribute("name") === (null == lanes.name ? null : lanes.name) && current.getAttribute("property") === (null == lanes.property ? null : lanes.property) && current.getAttribute("http-equiv") === (null == lanes.httpEquiv ? null : lanes.httpEquiv) && current.getAttribute("charset") === (null == lanes.charSet ? null : lanes.charSet)) {
                              ii.splice(_eventPayloads$ii2, 1);
                              break b;
                            }
                        }
                        current = flags.createElement(root2);
                        setInitialProperties(current, root2, lanes);
                        flags.head.appendChild(current);
                        break;
                      default:
                        throw Error(formatProdErrorMessage(468, root2));
                    }
                    current[internalInstanceKey] = finishedWork;
                    markNodeAsHoistable(current);
                    root2 = current;
                  }
                  finishedWork.stateNode = root2;
                }
              else
                offscreenSubtreeIsHidden || mountHoistable(ii, finishedWork.type, finishedWork.stateNode);
            else
              finishedWork.stateNode = acquireResource(
                ii,
                lanes,
                finishedWork.memoizedProps
              );
          else
            flags !== lanes ? (null === flags ? (root2 = current.stateNode, null === root2 || offscreenSubtreeWasHidden || root2.parentNode.removeChild(root2)) : flags.count--, null === lanes ? offscreenSubtreeIsHidden || mountHoistable(ii, finishedWork.type, finishedWork.stateNode) : acquireResource(ii, lanes, finishedWork.memoizedProps)) : null === lanes && null !== finishedWork.stateNode && commitHostUpdate(
              finishedWork,
              finishedWork.memoizedProps,
              current.memoizedProps
            );
        break;
      case 27:
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
        null !== current && flags & 4 && commitHostUpdate(
          finishedWork,
          finishedWork.memoizedProps,
          current.memoizedProps
        );
        break;
      case 5:
        ii = offscreenDirectParentIsHidden;
        offscreenDirectParentIsHidden = false;
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        offscreenDirectParentIsHidden = ii;
        commitReconciliationEffects(finishedWork);
        flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
        if (finishedWork.flags & 32) {
          root2 = finishedWork.stateNode;
          try {
            setTextContent(root2, ""), viewTransitionMutationContext = true;
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
        flags & 4 && null != finishedWork.stateNode && (root2 = finishedWork.memoizedProps, commitHostUpdate(
          finishedWork,
          root2,
          null !== current ? current.memoizedProps : root2
        ));
        flags & 1024 && (needsFormReset = true);
        break;
      case 6:
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        if (flags & 4) {
          if (null === finishedWork.stateNode)
            throw Error(formatProdErrorMessage(162));
          root2 = finishedWork.memoizedProps;
          lanes = finishedWork.stateNode;
          try {
            lanes.nodeValue = root2, viewTransitionMutationContext = true;
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
        break;
      case 3:
        viewTransitionMutationContext = false;
        tagCaches = null;
        ii = currentHoistableRoot;
        currentHoistableRoot = getHoistableRoot(root2.containerInfo);
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        currentHoistableRoot = ii;
        commitReconciliationEffects(finishedWork);
        if (flags & 4 && null !== current && current.memoizedState.isDehydrated)
          try {
            retryIfBlockedOn(root2.containerInfo);
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        needsFormReset && (needsFormReset = false, recursivelyResetForms(finishedWork));
        viewTransitionMutationContext = false;
        break;
      case 4:
        flags = offscreenDirectParentIsHidden;
        offscreenDirectParentIsHidden = offscreenSubtreeIsHidden;
        current = pushMutationContext();
        ii = currentHoistableRoot;
        currentHoistableRoot = getHoistableRoot(
          finishedWork.stateNode.containerInfo
        );
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        currentHoistableRoot = ii;
        viewTransitionMutationContext && inUpdateViewTransition && (rootViewTransitionAffected = true);
        viewTransitionMutationContext = current;
        offscreenDirectParentIsHidden = flags;
        break;
      case 12:
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        break;
      case 31:
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        flags & 4 && (root2 = finishedWork.updateQueue, null !== root2 && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, root2)));
        break;
      case 13:
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        finishedWork.child.flags & 8192 && null !== finishedWork.memoizedState !== (null !== current && null !== current.memoizedState) && (globalMostRecentFallbackTime = now());
        flags & 4 && (root2 = finishedWork.updateQueue, null !== root2 && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, root2)));
        break;
      case 22:
        ii = null !== finishedWork.memoizedState;
        _eventPayloads$ii2 = null !== current && null !== current.memoizedState;
        var prevOffscreenSubtreeIsHidden = offscreenSubtreeIsHidden, prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden, prevOffscreenDirectParentIsHidden$166 = offscreenDirectParentIsHidden;
        offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden || ii;
        offscreenDirectParentIsHidden = prevOffscreenDirectParentIsHidden$166 || ii;
        offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden || _eventPayloads$ii2;
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
        offscreenDirectParentIsHidden = prevOffscreenDirectParentIsHidden$166;
        offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden;
        commitReconciliationEffects(finishedWork);
        flags & 8192 && (root2 = finishedWork.stateNode, root2._visibility = ii ? root2._visibility & -2 : root2._visibility | 1, !ii || null === current || _eventPayloads$ii2 || offscreenSubtreeIsHidden || offscreenSubtreeWasHidden || (root2 = _eventPayloads$ii2 || offscreenSubtreeWasHidden, lanes = offscreenSubtreeIsHidden, current = offscreenSubtreeWasHidden, offscreenSubtreeIsHidden = ii || offscreenSubtreeIsHidden, offscreenSubtreeWasHidden = root2, recursivelyTraverseDisappearLayoutEffects(finishedWork, 2), offscreenSubtreeIsHidden = lanes, offscreenSubtreeWasHidden = current), !ii && offscreenDirectParentIsHidden || hideOrUnhideAllChildren(finishedWork, ii));
        flags & 4 && (root2 = finishedWork.updateQueue, null !== root2 && (lanes = root2.retryQueue, null !== lanes && (root2.retryQueue = null, attachSuspenseRetryListeners(finishedWork, lanes))));
        break;
      case 19:
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        flags & 4 && (root2 = finishedWork.updateQueue, null !== root2 && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, root2)));
        break;
      case 30:
        flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
        flags = pushMutationContext();
        ii = inUpdateViewTransition;
        _eventPayloads$ii2 = (lanes & 335544064) === lanes;
        prevOffscreenSubtreeIsHidden = finishedWork.memoizedProps;
        inUpdateViewTransition = _eventPayloads$ii2 && "none" !== getViewTransitionClassName(
          prevOffscreenSubtreeIsHidden.default,
          prevOffscreenSubtreeIsHidden.update
        );
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        _eventPayloads$ii2 && null !== current && viewTransitionMutationContext && (finishedWork.flags |= 4);
        inUpdateViewTransition = ii;
        viewTransitionMutationContext = flags;
        break;
      case 21:
        break;
      case 7:
        flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return)), current && null !== current.stateNode && (current.stateNode._fragmentFiber = finishedWork);
      default:
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes), commitReconciliationEffects(finishedWork);
    }
  }
  function commitReconciliationEffects(finishedWork) {
    var flags = finishedWork.flags;
    if (flags & 2) {
      try {
        for (var hostParentFiber, parentFiber = finishedWork.return; null !== parentFiber; ) {
          if (isHostParent(parentFiber)) {
            hostParentFiber = parentFiber;
            break;
          }
          parentFiber = parentFiber.return;
        }
        parentFiber = null;
        for (var parent = finishedWork.return; null !== parent; ) {
          if (isFragmentInstanceParent(parent)) {
            var fragmentInstance = parent.stateNode;
            null === parentFiber ? parentFiber = [fragmentInstance] : parentFiber.push(fragmentInstance);
          }
          if (isFragmentInstanceHostBoundary(parent)) break;
          parent = parent.return;
        }
        var JSCompiler_inline_result = parentFiber;
        if (null == hostParentFiber) throw Error(formatProdErrorMessage(160));
        switch (hostParentFiber.tag) {
          case 27:
            var parent$jscomp$0 = hostParentFiber.stateNode, before = getHostSibling(finishedWork);
            insertOrAppendPlacementNode(
              finishedWork,
              before,
              parent$jscomp$0,
              JSCompiler_inline_result
            );
            break;
          case 5:
            var parent$149 = hostParentFiber.stateNode;
            hostParentFiber.flags & 32 && (setTextContent(parent$149, ""), hostParentFiber.flags &= -33);
            var before$150 = getHostSibling(finishedWork);
            insertOrAppendPlacementNode(
              finishedWork,
              before$150,
              parent$149,
              JSCompiler_inline_result
            );
            break;
          case 3:
          case 4:
            var parent$151 = hostParentFiber.stateNode.containerInfo, before$152 = getHostSibling(finishedWork);
            insertOrAppendPlacementNodeIntoContainer(
              finishedWork,
              before$152,
              parent$151,
              JSCompiler_inline_result
            );
            break;
          default:
            throw Error(formatProdErrorMessage(161));
        }
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
      finishedWork.flags &= -3;
    }
    flags & 4096 && (finishedWork.flags &= -4097);
  }
  function recursivelyResetForms(parentFiber) {
    if (parentFiber.subtreeFlags & 1024)
      for (parentFiber = parentFiber.child; null !== parentFiber; ) {
        var fiber = parentFiber;
        recursivelyResetForms(fiber);
        5 === fiber.tag && fiber.flags & 1024 && (fiber = fiber.stateNode, _enabled = true, fiber.reset(), _enabled = false);
        parentFiber = parentFiber.sibling;
      }
  }
  function recursivelyTraverseAfterMutationEffects(root2, parentFiber) {
    if (parentFiber.subtreeFlags & 9270)
      for (parentFiber = parentFiber.child; null !== parentFiber; )
        commitAfterMutationEffectsOnFiber(parentFiber, root2), parentFiber = parentFiber.sibling;
    else measureNestedViewTransitions(parentFiber);
  }
  function commitAfterMutationEffectsOnFiber(finishedWork, root2) {
    var current = finishedWork.alternate;
    if (null === current) commitEnterViewTransitions(finishedWork, false);
    else
      switch (finishedWork.tag) {
        case 3:
          rootViewTransitionNameCanceled = viewTransitionContextChanged = false;
          pushViewTransitionCancelableScope();
          recursivelyTraverseAfterMutationEffects(root2, finishedWork);
          if (!viewTransitionContextChanged && !rootViewTransitionAffected) {
            finishedWork = viewTransitionCancelableChildren;
            if (null !== finishedWork)
              for (var i = 0; i < finishedWork.length; i += 3) {
                current = finishedWork[i];
                var oldName = finishedWork[i + 1];
                restoreViewTransitionName(current, finishedWork[i + 2]);
                current = current.ownerDocument.documentElement;
                null !== current && current.animate(
                  { opacity: [0, 0], pointerEvents: ["none", "none"] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(" + oldName + ")"
                  }
                );
              }
            finishedWork = root2.containerInfo;
            finishedWork = 9 === finishedWork.nodeType ? finishedWork.documentElement : finishedWork.ownerDocument.documentElement;
            null !== finishedWork && "" === finishedWork.style.viewTransitionName && (finishedWork.style.viewTransitionName = "none", finishedWork.animate(
              { opacity: [0, 0], pointerEvents: ["none", "none"] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition-group(root)"
              }
            ), finishedWork.animate(
              { width: [0, 0], height: [0, 0] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition"
              }
            ));
            rootViewTransitionNameCanceled = true;
          }
          viewTransitionCancelableChildren = null;
          break;
        case 5:
          recursivelyTraverseAfterMutationEffects(root2, finishedWork);
          break;
        case 4:
          i = viewTransitionContextChanged;
          viewTransitionContextChanged = false;
          recursivelyTraverseAfterMutationEffects(root2, finishedWork);
          viewTransitionContextChanged && (rootViewTransitionAffected = true);
          viewTransitionContextChanged = i;
          break;
        case 22:
          null === finishedWork.memoizedState && (null !== current.memoizedState ? commitEnterViewTransitions(finishedWork, false) : recursivelyTraverseAfterMutationEffects(root2, finishedWork));
          break;
        case 30:
          i = viewTransitionContextChanged;
          oldName = pushViewTransitionCancelableScope();
          viewTransitionContextChanged = false;
          recursivelyTraverseAfterMutationEffects(root2, finishedWork);
          viewTransitionContextChanged && (finishedWork.flags |= 4);
          var props = finishedWork.memoizedProps, state = finishedWork.stateNode;
          root2 = getViewTransitionName(props, state);
          state = getViewTransitionName(current.memoizedProps, state);
          var className = getViewTransitionClassName(props.default, props.update);
          "none" === className ? root2 = false : (props = current.memoizedState, current.memoizedState = null, current = finishedWork.child, viewTransitionHostInstanceIdx = 0, root2 = measureViewTransitionHostInstancesRecursive(
            finishedWork,
            current,
            root2,
            state,
            className,
            props,
            true
          ), viewTransitionHostInstanceIdx !== (null === props ? 0 : props.length) && (finishedWork.flags |= 32));
          0 !== (finishedWork.flags & 4) && root2 ? (scheduleViewTransitionEvent(
            finishedWork,
            finishedWork.memoizedProps.onUpdate
          ), viewTransitionCancelableChildren = oldName) : null !== oldName && (oldName.push.apply(oldName, viewTransitionCancelableChildren), viewTransitionCancelableChildren = oldName);
          viewTransitionContextChanged = 0 !== (finishedWork.flags & 32) ? true : i;
          break;
        default:
          recursivelyTraverseAfterMutationEffects(root2, finishedWork);
      }
  }
  function recursivelyTraverseLayoutEffects(root2, parentFiber) {
    if (parentFiber.subtreeFlags & 8772)
      for (parentFiber = parentFiber.child; null !== parentFiber; )
        commitLayoutEffectOnFiber(root2, parentFiber.alternate, parentFiber), parentFiber = parentFiber.sibling;
  }
  function recursivelyTraverseDisappearLayoutEffects(parentFiber, layoutEffectTraversalFlags$jscomp$0) {
    for (parentFiber = parentFiber.child; null !== parentFiber; ) {
      var finishedWork = parentFiber, layoutEffectTraversalFlags = layoutEffectTraversalFlags$jscomp$0;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          commitHookEffectListUnmount(4, finishedWork, finishedWork.return);
          recursivelyTraverseDisappearLayoutEffects(
            finishedWork,
            layoutEffectTraversalFlags
          );
          break;
        case 1:
          safelyDetachRef(finishedWork, finishedWork.return);
          var instance = finishedWork.stateNode;
          "function" === typeof instance.componentWillUnmount && safelyCallComponentWillUnmount(
            finishedWork,
            finishedWork.return,
            instance
          );
          recursivelyTraverseDisappearLayoutEffects(
            finishedWork,
            layoutEffectTraversalFlags
          );
          break;
        case 27:
          0 !== (layoutEffectTraversalFlags & 2) && releaseSingletonInstance(
            finishedWork.stateNode,
            finishedWork.type,
            finishedWork.memoizedProps
          );
        case 5:
          safelyDetachRef(finishedWork, finishedWork.return);
          5 !== finishedWork.tag && 27 !== finishedWork.tag || commitFragmentInstanceDeletionEffects(finishedWork);
          recursivelyTraverseDisappearLayoutEffects(
            finishedWork,
            layoutEffectTraversalFlags
          );
          break;
        case 6:
          commitFragmentInstanceDeletionEffects(finishedWork);
          break;
        case 26:
          safelyDetachRef(finishedWork, finishedWork.return);
          instance = finishedWork.stateNode;
          null !== finishedWork.memoizedState || null === instance || offscreenSubtreeWasHidden || instance.parentNode.removeChild(instance);
          recursivelyTraverseDisappearLayoutEffects(
            finishedWork,
            layoutEffectTraversalFlags
          );
          break;
        case 22:
          null === finishedWork.memoizedState && recursivelyTraverseDisappearLayoutEffects(
            finishedWork,
            layoutEffectTraversalFlags
          );
          break;
        case 30:
          safelyDetachRef(finishedWork, finishedWork.return);
          recursivelyTraverseDisappearLayoutEffects(
            finishedWork,
            layoutEffectTraversalFlags
          );
          break;
        case 7:
          safelyDetachRef(finishedWork, finishedWork.return);
        default:
          recursivelyTraverseDisappearLayoutEffects(
            finishedWork,
            layoutEffectTraversalFlags
          );
      }
      parentFiber = parentFiber.sibling;
    }
  }
  function recursivelyTraverseReappearLayoutEffects(finishedRoot$jscomp$0, parentFiber, layoutEffectTraversalFlags) {
    layoutEffectTraversalFlags = 0 !== (parentFiber.subtreeFlags & 8772) ? layoutEffectTraversalFlags : layoutEffectTraversalFlags & -2;
    for (parentFiber = parentFiber.child; null !== parentFiber; ) {
      var current = parentFiber.alternate, finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags, includeWorkInProgressEffects = 0 !== (layoutEffectTraversalFlags & 1);
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
          commitHookEffectListMount(4, finishedWork);
          break;
        case 1:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
          current = finishedWork;
          finishedRoot = current.stateNode;
          if ("function" === typeof finishedRoot.componentDidMount)
            try {
              finishedRoot.componentDidMount();
            } catch (error) {
              captureCommitPhaseError(current, current.return, error);
            }
          current = finishedWork;
          finishedRoot = current.updateQueue;
          if (null !== finishedRoot) {
            var instance = current.stateNode;
            try {
              var hiddenCallbacks = finishedRoot.shared.hiddenCallbacks;
              if (null !== hiddenCallbacks)
                for (finishedRoot.shared.hiddenCallbacks = null, finishedRoot = 0; finishedRoot < hiddenCallbacks.length; finishedRoot++)
                  callCallback(hiddenCallbacks[finishedRoot], instance);
            } catch (error) {
              captureCommitPhaseError(current, current.return, error);
            }
          }
          includeWorkInProgressEffects && flags & 64 && commitClassCallbacks(finishedWork);
          safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 27:
          0 !== (layoutEffectTraversalFlags & 2) && commitHostSingletonAcquisition(finishedWork);
        case 5:
          5 !== finishedWork.tag && 27 !== finishedWork.tag || commitFragmentInstanceInsertionEffects(finishedWork);
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
          includeWorkInProgressEffects && null === current && flags & 4 && commitHostMount(finishedWork);
          safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 6:
          commitFragmentInstanceInsertionEffects(finishedWork);
          break;
        case 26:
          instance = finishedWork.stateNode;
          null !== finishedWork.memoizedState || null === instance || offscreenSubtreeIsHidden || mountHoistable(
            getHoistableRoot(instance.ownerDocument),
            finishedWork.type,
            instance
          );
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
          includeWorkInProgressEffects && null === current && flags & 4 && commitHostMount(finishedWork);
          safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 12:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
          break;
        case 31:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
          includeWorkInProgressEffects && flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
          break;
        case 13:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
          includeWorkInProgressEffects && flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
          break;
        case 22:
          null === finishedWork.memoizedState && recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
          safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 30:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
          safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 7:
          safelyAttachRef(finishedWork, finishedWork.return);
        default:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
      }
      parentFiber = parentFiber.sibling;
    }
  }
  function commitOffscreenPassiveMountEffects(current, finishedWork) {
    var previousCache = null;
    null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (previousCache = current.memoizedState.cachePool.pool);
    current = null;
    null !== finishedWork.memoizedState && null !== finishedWork.memoizedState.cachePool && (current = finishedWork.memoizedState.cachePool.pool);
    current !== previousCache && (null != current && current.refCount++, null != previousCache && releaseCache(previousCache));
  }
  function commitCachePassiveMountEffect(current, finishedWork) {
    current = null;
    null !== finishedWork.alternate && (current = finishedWork.alternate.memoizedState.cache);
    finishedWork = finishedWork.memoizedState.cache;
    finishedWork !== current && (finishedWork.refCount++, null != current && releaseCache(current));
  }
  function recursivelyTraversePassiveMountEffects(root2, parentFiber, committedLanes, committedTransitions) {
    var isViewTransitionEligible = (committedLanes & 335544064) === committedLanes;
    if (parentFiber.subtreeFlags & (isViewTransitionEligible ? 10262 : 10256))
      for (parentFiber = parentFiber.child; null !== parentFiber; )
        commitPassiveMountOnFiber(
          root2,
          parentFiber,
          committedLanes,
          committedTransitions
        ), parentFiber = parentFiber.sibling;
    else isViewTransitionEligible && restoreNestedViewTransitions(parentFiber);
  }
  function commitPassiveMountOnFiber(finishedRoot, finishedWork, committedLanes, committedTransitions) {
    var isViewTransitionEligible = (committedLanes & 335544064) === committedLanes;
    isViewTransitionEligible && null === finishedWork.alternate && null !== finishedWork.return && null !== finishedWork.return.alternate && restoreEnterOrExitViewTransitions(finishedWork);
    var flags = finishedWork.flags;
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 15:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        flags & 2048 && commitHookEffectListMount(9, finishedWork);
        break;
      case 1:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        break;
      case 3:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        isViewTransitionEligible && rootViewTransitionNameCanceled && (finishedRoot = finishedRoot.containerInfo, finishedRoot = 9 === finishedRoot.nodeType ? finishedRoot.body : "HTML" === finishedRoot.nodeName ? finishedRoot.ownerDocument.body : finishedRoot, "root" === finishedRoot.style.viewTransitionName && (finishedRoot.style.viewTransitionName = ""), finishedRoot = finishedRoot.ownerDocument.documentElement, null !== finishedRoot && "none" === finishedRoot.style.viewTransitionName && (finishedRoot.style.viewTransitionName = ""));
        flags & 2048 && (flags = null, null !== finishedWork.alternate && (flags = finishedWork.alternate.memoizedState.cache), finishedWork = finishedWork.memoizedState.cache, finishedWork !== flags && (finishedWork.refCount++, null != flags && releaseCache(flags)));
        break;
      case 12:
        if (flags & 2048) {
          recursivelyTraversePassiveMountEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions
          );
          flags = finishedWork.stateNode;
          try {
            var _finishedWork$memoize2 = finishedWork.memoizedProps, id = _finishedWork$memoize2.id, onPostCommit = _finishedWork$memoize2.onPostCommit;
            "function" === typeof onPostCommit && onPostCommit(
              id,
              null === finishedWork.alternate ? "mount" : "update",
              flags.passiveEffectDuration,
              -0
            );
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        } else
          recursivelyTraversePassiveMountEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions
          );
        break;
      case 31:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        break;
      case 13:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        break;
      case 23:
        break;
      case 22:
        _finishedWork$memoize2 = finishedWork.stateNode;
        id = finishedWork.alternate;
        null !== finishedWork.memoizedState ? (isViewTransitionEligible && null !== id && null === id.memoizedState && restoreEnterOrExitViewTransitions(id), _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        ) : recursivelyTraverseAtomicPassiveEffects(
          finishedRoot,
          finishedWork
        )) : (isViewTransitionEligible && null !== id && null !== id.memoizedState && restoreEnterOrExitViewTransitions(finishedWork), _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        ) : (_finishedWork$memoize2._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions,
          0 !== (finishedWork.subtreeFlags & 10256) || false
        )));
        flags & 2048 && commitOffscreenPassiveMountEffects(id, finishedWork);
        break;
      case 24:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
        break;
      case 30:
        isViewTransitionEligible && (flags = finishedWork.alternate, null !== flags && (restoreViewTransitionOnHostInstances(flags.child, true), restoreViewTransitionOnHostInstances(finishedWork.child, true)));
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        break;
      default:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
    }
  }
  function recursivelyTraverseReconnectPassiveEffects(finishedRoot$jscomp$0, parentFiber, committedLanes$jscomp$0, committedTransitions$jscomp$0, includeWorkInProgressEffects) {
    includeWorkInProgressEffects = includeWorkInProgressEffects && (0 !== (parentFiber.subtreeFlags & 10256) || false);
    for (parentFiber = parentFiber.child; null !== parentFiber; ) {
      var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, committedLanes = committedLanes$jscomp$0, committedTransitions = committedTransitions$jscomp$0, flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          recursivelyTraverseReconnectPassiveEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions,
            includeWorkInProgressEffects
          );
          commitHookEffectListMount(8, finishedWork);
          break;
        case 23:
          break;
        case 22:
          var instance = finishedWork.stateNode;
          null !== finishedWork.memoizedState ? instance._visibility & 2 ? recursivelyTraverseReconnectPassiveEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions,
            includeWorkInProgressEffects
          ) : recursivelyTraverseAtomicPassiveEffects(
            finishedRoot,
            finishedWork
          ) : (instance._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions,
            includeWorkInProgressEffects
          ));
          includeWorkInProgressEffects && flags & 2048 && commitOffscreenPassiveMountEffects(
            finishedWork.alternate,
            finishedWork
          );
          break;
        case 24:
          recursivelyTraverseReconnectPassiveEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions,
            includeWorkInProgressEffects
          );
          includeWorkInProgressEffects && flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
          break;
        default:
          recursivelyTraverseReconnectPassiveEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions,
            includeWorkInProgressEffects
          );
      }
      parentFiber = parentFiber.sibling;
    }
  }
  function recursivelyTraverseAtomicPassiveEffects(finishedRoot$jscomp$0, parentFiber) {
    if (parentFiber.subtreeFlags & 10256)
      for (parentFiber = parentFiber.child; null !== parentFiber; ) {
        var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags;
        switch (finishedWork.tag) {
          case 22:
            recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
            flags & 2048 && commitOffscreenPassiveMountEffects(
              finishedWork.alternate,
              finishedWork
            );
            break;
          case 24:
            recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
            flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
            break;
          default:
            recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
        }
        parentFiber = parentFiber.sibling;
      }
  }
  var suspenseyCommitFlag = 8192;
  function recursivelyAccumulateSuspenseyCommit(parentFiber, committedLanes, suspendedState) {
    if (parentFiber.subtreeFlags & suspenseyCommitFlag)
      for (parentFiber = parentFiber.child; null !== parentFiber; )
        accumulateSuspenseyCommitOnFiber(
          parentFiber,
          committedLanes,
          suspendedState
        ), parentFiber = parentFiber.sibling;
  }
  function accumulateSuspenseyCommitOnFiber(fiber, committedLanes, suspendedState) {
    switch (fiber.tag) {
      case 26:
        recursivelyAccumulateSuspenseyCommit(
          fiber,
          committedLanes,
          suspendedState
        );
        fiber.flags & suspenseyCommitFlag && (null !== fiber.memoizedState ? suspendResource(
          suspendedState,
          currentHoistableRoot,
          fiber.memoizedState,
          fiber.memoizedProps
        ) : (fiber = fiber.stateNode, (committedLanes & 335544128) === committedLanes && suspendInstance(suspendedState, fiber)));
        break;
      case 5:
        recursivelyAccumulateSuspenseyCommit(
          fiber,
          committedLanes,
          suspendedState
        );
        fiber.flags & suspenseyCommitFlag && (fiber = fiber.stateNode, (committedLanes & 335544128) === committedLanes && suspendInstance(suspendedState, fiber));
        break;
      case 3:
      case 4:
        var previousHoistableRoot = currentHoistableRoot;
        currentHoistableRoot = getHoistableRoot(fiber.stateNode.containerInfo);
        recursivelyAccumulateSuspenseyCommit(
          fiber,
          committedLanes,
          suspendedState
        );
        currentHoistableRoot = previousHoistableRoot;
        break;
      case 22:
        null === fiber.memoizedState && (previousHoistableRoot = fiber.alternate, null !== previousHoistableRoot && null !== previousHoistableRoot.memoizedState ? (previousHoistableRoot = suspenseyCommitFlag, suspenseyCommitFlag = 16777216, recursivelyAccumulateSuspenseyCommit(
          fiber,
          committedLanes,
          suspendedState
        ), suspenseyCommitFlag = previousHoistableRoot) : recursivelyAccumulateSuspenseyCommit(
          fiber,
          committedLanes,
          suspendedState
        ));
        break;
      case 30:
        if (0 !== (fiber.flags & suspenseyCommitFlag) && (previousHoistableRoot = fiber.memoizedProps.name, null != previousHoistableRoot && "auto" !== previousHoistableRoot)) {
          var state = fiber.stateNode;
          state.paired = null;
          null === appearingViewTransitions && (appearingViewTransitions = /* @__PURE__ */ new Map());
          appearingViewTransitions.set(previousHoistableRoot, state);
        }
        recursivelyAccumulateSuspenseyCommit(
          fiber,
          committedLanes,
          suspendedState
        );
        break;
      default:
        recursivelyAccumulateSuspenseyCommit(
          fiber,
          committedLanes,
          suspendedState
        );
    }
  }
  function detachAlternateSiblings(parentFiber) {
    var previousFiber = parentFiber.alternate;
    if (null !== previousFiber && (parentFiber = previousFiber.child, null !== parentFiber)) {
      previousFiber.child = null;
      do
        previousFiber = parentFiber.sibling, parentFiber.sibling = null, parentFiber = previousFiber;
      while (null !== parentFiber);
    }
  }
  function recursivelyTraversePassiveUnmountEffects(parentFiber) {
    var deletions = parentFiber.deletions;
    if (0 !== (parentFiber.flags & 16)) {
      if (null !== deletions)
        for (var i = 0; i < deletions.length; i++) {
          var childToDelete = deletions[i];
          nextEffect = childToDelete;
          commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
            childToDelete,
            parentFiber
          );
        }
      detachAlternateSiblings(parentFiber);
    }
    if (parentFiber.subtreeFlags & 10256)
      for (parentFiber = parentFiber.child; null !== parentFiber; )
        commitPassiveUnmountOnFiber(parentFiber), parentFiber = parentFiber.sibling;
  }
  function commitPassiveUnmountOnFiber(finishedWork) {
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 15:
        recursivelyTraversePassiveUnmountEffects(finishedWork);
        finishedWork.flags & 2048 && commitHookEffectListUnmount(9, finishedWork, finishedWork.return);
        break;
      case 3:
        recursivelyTraversePassiveUnmountEffects(finishedWork);
        break;
      case 12:
        recursivelyTraversePassiveUnmountEffects(finishedWork);
        break;
      case 22:
        var instance = finishedWork.stateNode;
        null !== finishedWork.memoizedState && instance._visibility & 2 && (null === finishedWork.return || 13 !== finishedWork.return.tag) ? (instance._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(finishedWork)) : recursivelyTraversePassiveUnmountEffects(finishedWork);
        break;
      default:
        recursivelyTraversePassiveUnmountEffects(finishedWork);
    }
  }
  function recursivelyTraverseDisconnectPassiveEffects(parentFiber) {
    var deletions = parentFiber.deletions;
    if (0 !== (parentFiber.flags & 16)) {
      if (null !== deletions)
        for (var i = 0; i < deletions.length; i++) {
          var childToDelete = deletions[i];
          nextEffect = childToDelete;
          commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
            childToDelete,
            parentFiber
          );
        }
      detachAlternateSiblings(parentFiber);
    }
    for (parentFiber = parentFiber.child; null !== parentFiber; ) {
      deletions = parentFiber;
      switch (deletions.tag) {
        case 0:
        case 11:
        case 15:
          commitHookEffectListUnmount(8, deletions, deletions.return);
          recursivelyTraverseDisconnectPassiveEffects(deletions);
          break;
        case 22:
          i = deletions.stateNode;
          i._visibility & 2 && (i._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(deletions));
          break;
        default:
          recursivelyTraverseDisconnectPassiveEffects(deletions);
      }
      parentFiber = parentFiber.sibling;
    }
  }
  function commitPassiveUnmountEffectsInsideOfDeletedTree_begin(deletedSubtreeRoot, nearestMountedAncestor) {
    for (; null !== nextEffect; ) {
      var fiber = nextEffect;
      switch (fiber.tag) {
        case 0:
        case 11:
        case 15:
          commitHookEffectListUnmount(8, fiber, nearestMountedAncestor);
          break;
        case 23:
        case 22:
          if (null !== fiber.memoizedState && null !== fiber.memoizedState.cachePool) {
            var cache = fiber.memoizedState.cachePool.pool;
            null != cache && cache.refCount++;
          }
          break;
        case 24:
          releaseCache(fiber.memoizedState.cache);
      }
      cache = fiber.child;
      if (null !== cache) cache.return = fiber, nextEffect = cache;
      else
        a: for (fiber = deletedSubtreeRoot; null !== nextEffect; ) {
          cache = nextEffect;
          var sibling = cache.sibling, returnFiber = cache.return;
          detachFiberAfterEffects(cache);
          if (cache === fiber) {
            nextEffect = null;
            break a;
          }
          if (null !== sibling) {
            sibling.return = returnFiber;
            nextEffect = sibling;
            break a;
          }
          nextEffect = returnFiber;
        }
    }
  }
  var DefaultAsyncDispatcher = {
    getCacheForType: function(resourceType) {
      var cache = readContext(CacheContext), cacheForType = cache.data.get(resourceType);
      void 0 === cacheForType && (cacheForType = resourceType(), cache.data.set(resourceType, cacheForType));
      return cacheForType;
    },
    cacheSignal: function() {
      return readContext(CacheContext).controller.signal;
    }
  }, PossiblyWeakMap = "function" === typeof WeakMap ? WeakMap : Map, executionContext = 0, workInProgressRoot = null, workInProgress = null, workInProgressRootRenderLanes = 0, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, workInProgressRootDidSkipSuspendedSiblings = false, workInProgressRootIsPrerendering = false, workInProgressRootDidAttachPingListener = false, entangledRenderLanes = 0, workInProgressRootExitStatus = 0, workInProgressRootSkippedLanes = 0, workInProgressRootInterleavedUpdatedLanes = 0, workInProgressRootPingedLanes = 0, workInProgressDeferredLane = 0, workInProgressSuspendedRetryLanes = 0, workInProgressRootConcurrentErrors = null, workInProgressRootRecoverableErrors = null, workInProgressRootDidIncludeRecursiveRenderUpdate = false, globalMostRecentFallbackTime = 0, globalMostRecentTransitionTime = 0, workInProgressRootRenderTargetTime = Infinity, workInProgressTransitions = null, legacyErrorBoundariesThatAlreadyFailed = null, pendingEffectsStatus = 0, pendingEffectsRoot = null, pendingFinishedWork = null, pendingEffectsLanes = 0, pendingEffectsRemainingLanes = 0, pendingPassiveTransitions = null, pendingRecoverableErrors = null, pendingViewTransition = null, pendingViewTransitionEvents = null, pendingTransitionTypes = null, nestedUpdateCount = 0, rootWithNestedUpdates = null;
  function requestUpdateLane() {
    return 0 !== (executionContext & 2) && 0 !== workInProgressRootRenderLanes ? workInProgressRootRenderLanes & -workInProgressRootRenderLanes : null !== ReactSharedInternals.T ? requestTransitionLane() : resolveUpdatePriority();
  }
  function requestDeferredLane() {
    if (0 === workInProgressDeferredLane)
      if (0 === (workInProgressRootRenderLanes & 536870912) || isHydrating) {
        var lane = nextTransitionDeferredLane;
        nextTransitionDeferredLane <<= 1;
        0 === (nextTransitionDeferredLane & 3932160) && (nextTransitionDeferredLane = 262144);
        workInProgressDeferredLane = lane;
      } else workInProgressDeferredLane = 536870912;
    lane = suspenseHandlerStackCursor.current;
    null !== lane && (lane.flags |= 32);
    return workInProgressDeferredLane;
  }
  function scheduleViewTransitionEvent(fiber, callback) {
    if (null != callback) {
      var state = fiber.stateNode, instance = state.ref;
      null === instance && (instance = state.ref = createViewTransitionInstance(
        getViewTransitionName(fiber.memoizedProps, state)
      ));
      null === pendingViewTransitionEvents && (pendingViewTransitionEvents = []);
      pendingViewTransitionEvents.push(callback.bind(null, instance));
    }
  }
  function scheduleUpdateOnFiber(root2, fiber, lane) {
    if (root2 === workInProgressRoot && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || null !== root2.cancelPendingCommit)
      prepareFreshStack(root2, 0), markRootSuspended(
        root2,
        workInProgressRootRenderLanes,
        workInProgressDeferredLane,
        false
      );
    markRootUpdated$1(root2, lane);
    if (0 === (executionContext & 2) || root2 !== workInProgressRoot)
      root2 === workInProgressRoot && (0 === (executionContext & 2) && (workInProgressRootInterleavedUpdatedLanes |= lane), 4 === workInProgressRootExitStatus && markRootSuspended(
        root2,
        workInProgressRootRenderLanes,
        workInProgressDeferredLane,
        false
      )), ensureRootIsScheduled(root2);
  }
  function performWorkOnRoot(root$jscomp$0, lanes, forceSync) {
    if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
    var shouldTimeSlice = !forceSync && 0 === (lanes & 127) && 0 === (lanes & root$jscomp$0.expiredLanes) || checkIfRootIsPrerendering(root$jscomp$0, lanes), exitStatus = shouldTimeSlice ? renderRootConcurrent(root$jscomp$0, lanes) : renderRootSync(root$jscomp$0, lanes, true), renderWasConcurrent = shouldTimeSlice;
    do {
      if (0 === exitStatus) {
        workInProgressRootIsPrerendering && !shouldTimeSlice && markRootSuspended(root$jscomp$0, lanes, 0, false);
        break;
      } else {
        forceSync = root$jscomp$0.current.alternate;
        if (renderWasConcurrent && !isRenderConsistentWithExternalStores(forceSync)) {
          exitStatus = renderRootSync(root$jscomp$0, lanes, false);
          renderWasConcurrent = false;
          continue;
        }
        if (2 === exitStatus) {
          renderWasConcurrent = lanes;
          if (root$jscomp$0.errorRecoveryDisabledLanes & renderWasConcurrent)
            var JSCompiler_inline_result = 0;
          else
            JSCompiler_inline_result = root$jscomp$0.pendingLanes & -536870913, JSCompiler_inline_result = 0 !== JSCompiler_inline_result ? JSCompiler_inline_result : JSCompiler_inline_result & 536870912 ? 536870912 : 0;
          if (0 !== JSCompiler_inline_result) {
            lanes = JSCompiler_inline_result;
            a: {
              var root2 = root$jscomp$0;
              exitStatus = workInProgressRootConcurrentErrors;
              var wasRootDehydrated = root2.current.memoizedState.isDehydrated;
              wasRootDehydrated && (prepareFreshStack(root2, JSCompiler_inline_result).flags |= 256);
              JSCompiler_inline_result = renderRootSync(
                root2,
                JSCompiler_inline_result,
                false
              );
              if (2 !== JSCompiler_inline_result && 6 !== JSCompiler_inline_result) {
                if (workInProgressRootDidAttachPingListener && !wasRootDehydrated) {
                  root2.errorRecoveryDisabledLanes |= renderWasConcurrent;
                  workInProgressRootInterleavedUpdatedLanes |= renderWasConcurrent;
                  exitStatus = 4;
                  break a;
                }
                renderWasConcurrent = workInProgressRootRecoverableErrors;
                workInProgressRootRecoverableErrors = exitStatus;
                null !== renderWasConcurrent && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = renderWasConcurrent : workInProgressRootRecoverableErrors.push.apply(
                  workInProgressRootRecoverableErrors,
                  renderWasConcurrent
                ));
              }
              exitStatus = JSCompiler_inline_result;
            }
            renderWasConcurrent = false;
            if (2 !== exitStatus) continue;
          }
        }
        if (1 === exitStatus) {
          prepareFreshStack(root$jscomp$0, 0);
          markRootSuspended(root$jscomp$0, lanes, 0, true);
          break;
        }
        a: {
          shouldTimeSlice = root$jscomp$0;
          renderWasConcurrent = exitStatus;
          switch (renderWasConcurrent) {
            case 0:
            case 1:
              throw Error(formatProdErrorMessage(345));
            case 4:
              if ((lanes & 4194048) !== lanes && (lanes & 62914560) !== lanes)
                break;
            case 6:
              markRootSuspended(
                shouldTimeSlice,
                lanes,
                workInProgressDeferredLane,
                !workInProgressRootDidSkipSuspendedSiblings
              );
              break a;
            case 2:
              workInProgressRootRecoverableErrors = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(formatProdErrorMessage(329));
          }
          if ((lanes & 62914560) === lanes && (exitStatus = globalMostRecentFallbackTime + 300 - now(), 10 < exitStatus)) {
            markRootSuspended(
              shouldTimeSlice,
              lanes,
              workInProgressDeferredLane,
              !workInProgressRootDidSkipSuspendedSiblings
            );
            if (0 !== getNextLanes(shouldTimeSlice, 0, true)) break a;
            pendingEffectsLanes = lanes;
            shouldTimeSlice.timeoutHandle = scheduleTimeout(
              completeRootWhenReady.bind(
                null,
                shouldTimeSlice,
                forceSync,
                workInProgressRootRecoverableErrors,
                workInProgressTransitions,
                workInProgressRootDidIncludeRecursiveRenderUpdate,
                lanes,
                workInProgressDeferredLane,
                workInProgressRootInterleavedUpdatedLanes,
                workInProgressSuspendedRetryLanes,
                workInProgressRootDidSkipSuspendedSiblings,
                renderWasConcurrent,
                "Throttled",
                -0,
                0
              ),
              exitStatus
            );
            break a;
          }
          completeRootWhenReady(
            shouldTimeSlice,
            forceSync,
            workInProgressRootRecoverableErrors,
            workInProgressTransitions,
            workInProgressRootDidIncludeRecursiveRenderUpdate,
            lanes,
            workInProgressDeferredLane,
            workInProgressRootInterleavedUpdatedLanes,
            workInProgressSuspendedRetryLanes,
            workInProgressRootDidSkipSuspendedSiblings,
            renderWasConcurrent,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (1);
    ensureRootIsScheduled(root$jscomp$0);
  }
  function completeRootWhenReady(root2, finishedWork, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason, completedRenderStartTime, completedRenderEndTime) {
    root2.timeoutHandle = -1;
    var subtreeFlags = finishedWork.subtreeFlags, isViewTransitionEligible = (lanes & 335544064) === lanes;
    suspendedCommitReason = null;
    if (isViewTransitionEligible || subtreeFlags & 8192 || 16785408 === (subtreeFlags & 16785408)) {
      if (suspendedCommitReason = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: true,
        waitingForViewTransition: false,
        unsuspend: noop$1
      }, appearingViewTransitions = null, accumulateSuspenseyCommitOnFiber(
        finishedWork,
        lanes,
        suspendedCommitReason
      ), isViewTransitionEligible && (subtreeFlags = suspendedCommitReason, isViewTransitionEligible = root2.containerInfo, isViewTransitionEligible = (9 === isViewTransitionEligible.nodeType ? isViewTransitionEligible : isViewTransitionEligible.ownerDocument).__reactViewTransition, null != isViewTransitionEligible && (subtreeFlags.count++, subtreeFlags.waitingForViewTransition = true, subtreeFlags = onUnsuspend.bind(subtreeFlags), isViewTransitionEligible.finished.then(subtreeFlags, subtreeFlags))), subtreeFlags = (lanes & 62914560) === lanes ? globalMostRecentFallbackTime - now() : (lanes & 4194048) === lanes ? globalMostRecentTransitionTime - now() : 0, subtreeFlags = waitForCommitToBeReady(
        suspendedCommitReason,
        subtreeFlags
      ), null !== subtreeFlags) {
        pendingEffectsLanes = lanes;
        root2.cancelPendingCommit = subtreeFlags(
          completeRoot.bind(
            null,
            root2,
            finishedWork,
            lanes,
            recoverableErrors,
            transitions,
            didIncludeRenderPhaseUpdate,
            spawnedLane,
            updatedLanes,
            suspendedRetryLanes,
            didSkipSuspendedSiblings,
            exitStatus,
            suspendedCommitReason,
            null,
            completedRenderStartTime,
            completedRenderEndTime
          )
        );
        markRootSuspended(root2, lanes, spawnedLane, !didSkipSuspendedSiblings);
        return;
      }
    }
    completeRoot(
      root2,
      finishedWork,
      lanes,
      recoverableErrors,
      transitions,
      didIncludeRenderPhaseUpdate,
      spawnedLane,
      updatedLanes,
      suspendedRetryLanes,
      didSkipSuspendedSiblings,
      exitStatus,
      suspendedCommitReason
    );
  }
  function isRenderConsistentWithExternalStores(finishedWork) {
    for (var node = finishedWork; ; ) {
      var tag = node.tag;
      if ((0 === tag || 11 === tag || 15 === tag) && node.flags & 16384 && (tag = node.updateQueue, null !== tag && (tag = tag.stores, null !== tag)))
        for (var i = 0; i < tag.length; i++) {
          var check = tag[i], getSnapshot = check.getSnapshot;
          check = check.value;
          try {
            if (!objectIs(getSnapshot(), check)) return false;
          } catch (error) {
            return false;
          }
        }
      tag = node.child;
      if (node.subtreeFlags & 16384 && null !== tag)
        tag.return = node, node = tag;
      else {
        if (node === finishedWork) break;
        for (; null === node.sibling; ) {
          if (null === node.return || node.return === finishedWork) return true;
          node = node.return;
        }
        node.sibling.return = node.return;
        node = node.sibling;
      }
    }
    return true;
  }
  function markRootSuspended(root2, suspendedLanes, spawnedLane, didAttemptEntireTree) {
    suspendedLanes = getEntangledLanes(root2, suspendedLanes);
    suspendedLanes &= ~workInProgressRootPingedLanes;
    suspendedLanes &= ~workInProgressRootInterleavedUpdatedLanes;
    root2.suspendedLanes |= suspendedLanes;
    root2.pingedLanes &= ~suspendedLanes;
    didAttemptEntireTree && (root2.warmLanes |= suspendedLanes);
    didAttemptEntireTree = root2.expirationTimes;
    for (var lanes = suspendedLanes; 0 < lanes; ) {
      var index$6 = 31 - clz32(lanes), lane = 1 << index$6;
      didAttemptEntireTree[index$6] = -1;
      lanes &= ~lane;
    }
    0 !== spawnedLane && markSpawnedDeferredLane(root2, spawnedLane, suspendedLanes);
  }
  function flushSyncWork$1() {
    return 0 === (executionContext & 6) ? (flushSyncWorkAcrossRoots_impl(0), false) : true;
  }
  function resetWorkInProgressStack() {
    if (null !== workInProgress) {
      if (0 === workInProgressSuspendedReason)
        var interruptedWork = workInProgress.return;
      else
        interruptedWork = workInProgress, lastContextDependency = currentlyRenderingFiber$1 = null, resetHooksOnUnwind(interruptedWork), thenableState$1 = null, thenableIndexCounter$1 = 0, interruptedWork = workInProgress;
      for (; null !== interruptedWork; )
        unwindInterruptedWork(interruptedWork.alternate, interruptedWork), interruptedWork = interruptedWork.return;
      workInProgress = null;
    }
  }
  function prepareFreshStack(root2, lanes) {
    var timeoutHandle = root2.timeoutHandle;
    -1 !== timeoutHandle && (root2.timeoutHandle = -1, cancelTimeout(timeoutHandle));
    timeoutHandle = root2.cancelPendingCommit;
    null !== timeoutHandle && (root2.cancelPendingCommit = null, timeoutHandle());
    pendingEffectsLanes = 0;
    resetWorkInProgressStack();
    workInProgressRoot = root2;
    workInProgress = timeoutHandle = createWorkInProgress(root2.current, null);
    workInProgressRootRenderLanes = lanes;
    workInProgressSuspendedReason = 0;
    workInProgressThrownValue = null;
    workInProgressRootDidSkipSuspendedSiblings = false;
    workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root2, lanes);
    workInProgressRootDidAttachPingListener = false;
    workInProgressSuspendedRetryLanes = workInProgressDeferredLane = workInProgressRootPingedLanes = workInProgressRootInterleavedUpdatedLanes = workInProgressRootSkippedLanes = workInProgressRootExitStatus = 0;
    workInProgressRootRecoverableErrors = workInProgressRootConcurrentErrors = null;
    workInProgressRootDidIncludeRecursiveRenderUpdate = false;
    entangledRenderLanes = getEntangledLanes(root2, lanes);
    finishQueueingConcurrentUpdates();
    return timeoutHandle;
  }
  function handleThrow(root2, thrownValue) {
    currentlyRenderingFiber = null;
    ReactSharedInternals.H = ContextOnlyDispatcher;
    thrownValue === SuspenseException || thrownValue === SuspenseActionException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 3) : thrownValue === SuspenseyCommitException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 4) : workInProgressSuspendedReason = thrownValue === SelectiveHydrationException ? 8 : null !== thrownValue && "object" === typeof thrownValue && "function" === typeof thrownValue.then ? 6 : 1;
    workInProgressThrownValue = thrownValue;
    null === workInProgress && (workInProgressRootExitStatus = 1, logUncaughtError(
      root2,
      createCapturedValueAtFiber(thrownValue, root2.current)
    ));
  }
  function shouldRemainOnPreviousScreen() {
    var handler = suspenseHandlerStackCursor.current;
    return null === handler ? true : (workInProgressRootRenderLanes & 4194048) === workInProgressRootRenderLanes ? null === shellBoundary ? true : false : (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes || 0 !== (workInProgressRootRenderLanes & 536870912) ? handler === shellBoundary : false;
  }
  function pushDispatcher() {
    var prevDispatcher = ReactSharedInternals.H;
    ReactSharedInternals.H = ContextOnlyDispatcher;
    return null === prevDispatcher ? ContextOnlyDispatcher : prevDispatcher;
  }
  function pushAsyncDispatcher() {
    var prevAsyncDispatcher = ReactSharedInternals.A;
    ReactSharedInternals.A = DefaultAsyncDispatcher;
    return prevAsyncDispatcher;
  }
  function renderDidSuspendDelayIfPossible() {
    workInProgressRootExitStatus = 4;
    workInProgressRootDidSkipSuspendedSiblings || (workInProgressRootRenderLanes & 4194048) !== workInProgressRootRenderLanes && null !== suspenseHandlerStackCursor.current || (workInProgressRootIsPrerendering = true);
    0 === (workInProgressRootSkippedLanes & 134217727) && 0 === (workInProgressRootInterleavedUpdatedLanes & 134217727) || null === workInProgressRoot || markRootSuspended(
      workInProgressRoot,
      workInProgressRootRenderLanes,
      workInProgressDeferredLane,
      false
    );
  }
  function renderRootSync(root2, lanes, shouldYieldForPrerendering) {
    var prevExecutionContext = executionContext;
    executionContext |= 2;
    var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
    if (workInProgressRoot !== root2 || workInProgressRootRenderLanes !== lanes)
      workInProgressTransitions = null, prepareFreshStack(root2, lanes);
    lanes = false;
    var exitStatus = workInProgressRootExitStatus;
    a: do
      try {
        if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
          var unitOfWork = workInProgress, thrownValue = workInProgressThrownValue;
          switch (workInProgressSuspendedReason) {
            case 8:
              resetWorkInProgressStack();
              exitStatus = 6;
              break a;
            case 3:
            case 2:
            case 9:
            case 6:
              null === suspenseHandlerStackCursor.current && (lanes = true);
              var reason = workInProgressSuspendedReason;
              workInProgressSuspendedReason = 0;
              workInProgressThrownValue = null;
              throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, reason);
              if (shouldYieldForPrerendering && workInProgressRootIsPrerendering) {
                exitStatus = 0;
                break a;
              }
              break;
            default:
              reason = workInProgressSuspendedReason, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, reason);
          }
        }
        workLoopSync();
        exitStatus = workInProgressRootExitStatus;
        break;
      } catch (thrownValue$184) {
        handleThrow(root2, thrownValue$184);
      }
    while (1);
    lanes && root2.shellSuspendCounter++;
    lastContextDependency = currentlyRenderingFiber$1 = null;
    executionContext = prevExecutionContext;
    ReactSharedInternals.H = prevDispatcher;
    ReactSharedInternals.A = prevAsyncDispatcher;
    null === workInProgress && (workInProgressRoot = null, workInProgressRootRenderLanes = 0, finishQueueingConcurrentUpdates());
    return exitStatus;
  }
  function workLoopSync() {
    for (; null !== workInProgress; ) performUnitOfWork(workInProgress);
  }
  function renderRootConcurrent(root2, lanes) {
    var prevExecutionContext = executionContext;
    executionContext |= 2;
    var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
    workInProgressRoot !== root2 || workInProgressRootRenderLanes !== lanes ? (workInProgressTransitions = null, workInProgressRootRenderTargetTime = now() + 500, prepareFreshStack(root2, lanes)) : workInProgressRootIsPrerendering = checkIfRootIsPrerendering(
      root2,
      lanes
    );
    a: do
      try {
        if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
          lanes = workInProgress;
          var thrownValue = workInProgressThrownValue;
          b: switch (workInProgressSuspendedReason) {
            case 1:
              workInProgressSuspendedReason = 0;
              workInProgressThrownValue = null;
              throwAndUnwindWorkLoop(root2, lanes, thrownValue, 1);
              break;
            case 2:
            case 9:
              if (isThenableResolved(thrownValue)) {
                workInProgressSuspendedReason = 0;
                workInProgressThrownValue = null;
                replaySuspendedUnitOfWork(lanes);
                break;
              }
              lanes = function() {
                2 !== workInProgressSuspendedReason && 9 !== workInProgressSuspendedReason || workInProgressRoot !== root2 || (workInProgressSuspendedReason = 7);
                ensureRootIsScheduled(root2);
              };
              thrownValue.then(lanes, lanes);
              break a;
            case 3:
              workInProgressSuspendedReason = 7;
              break a;
            case 4:
              workInProgressSuspendedReason = 5;
              break a;
            case 7:
              isThenableResolved(thrownValue) ? (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, replaySuspendedUnitOfWork(lanes)) : (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root2, lanes, thrownValue, 7));
              break;
            case 5:
              var resource = null;
              switch (workInProgress.tag) {
                case 26:
                  resource = workInProgress.memoizedState;
                case 5:
                case 27:
                  var hostFiber = workInProgress;
                  if (resource ? preloadResource(resource) : hostFiber.stateNode.complete) {
                    workInProgressSuspendedReason = 0;
                    workInProgressThrownValue = null;
                    var sibling = hostFiber.sibling;
                    if (null !== sibling) workInProgress = sibling;
                    else {
                      var returnFiber = hostFiber.return;
                      null !== returnFiber ? (workInProgress = returnFiber, completeUnitOfWork(returnFiber)) : workInProgress = null;
                    }
                    break b;
                  }
              }
              workInProgressSuspendedReason = 0;
              workInProgressThrownValue = null;
              throwAndUnwindWorkLoop(root2, lanes, thrownValue, 5);
              break;
            case 6:
              workInProgressSuspendedReason = 0;
              workInProgressThrownValue = null;
              throwAndUnwindWorkLoop(root2, lanes, thrownValue, 6);
              break;
            case 8:
              resetWorkInProgressStack();
              workInProgressRootExitStatus = 6;
              break a;
            default:
              throw Error(formatProdErrorMessage(462));
          }
        }
        workLoopConcurrentByScheduler();
        break;
      } catch (thrownValue$186) {
        handleThrow(root2, thrownValue$186);
      }
    while (1);
    lastContextDependency = currentlyRenderingFiber$1 = null;
    ReactSharedInternals.H = prevDispatcher;
    ReactSharedInternals.A = prevAsyncDispatcher;
    executionContext = prevExecutionContext;
    if (null !== workInProgress) return 0;
    workInProgressRoot = null;
    workInProgressRootRenderLanes = 0;
    finishQueueingConcurrentUpdates();
    return workInProgressRootExitStatus;
  }
  function workLoopConcurrentByScheduler() {
    for (; null !== workInProgress && !shouldYield(); )
      performUnitOfWork(workInProgress);
  }
  function performUnitOfWork(unitOfWork) {
    var next = beginWork(unitOfWork.alternate, unitOfWork, entangledRenderLanes);
    unitOfWork.memoizedProps = unitOfWork.pendingProps;
    null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
  }
  function replaySuspendedUnitOfWork(unitOfWork) {
    var next = unitOfWork;
    var current = next.alternate;
    switch (next.tag) {
      case 15:
      case 0:
        next = replayFunctionComponent(
          current,
          next,
          next.pendingProps,
          next.type,
          void 0,
          workInProgressRootRenderLanes
        );
        break;
      case 11:
        next = replayFunctionComponent(
          current,
          next,
          next.pendingProps,
          next.type.render,
          next.ref,
          workInProgressRootRenderLanes
        );
        break;
      case 5:
        resetHooksOnUnwind(next);
        var fiber = next;
        fiber === hydrationParentFiber && (isHydrating ? (popToNextHostParent(fiber), 5 === fiber.tag && null != fiber.stateNode && (nextHydratableInstance = fiber.stateNode)) : (popToNextHostParent(fiber), isHydrating = true));
      default:
        unwindInterruptedWork(current, next), next = workInProgress = resetWorkInProgress(next, entangledRenderLanes), next = beginWork(current, next, entangledRenderLanes);
    }
    unitOfWork.memoizedProps = unitOfWork.pendingProps;
    null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
  }
  function throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, suspendedReason) {
    lastContextDependency = currentlyRenderingFiber$1 = null;
    resetHooksOnUnwind(unitOfWork);
    thenableState$1 = null;
    thenableIndexCounter$1 = 0;
    var returnFiber = unitOfWork.return;
    try {
      if (throwException(
        root2,
        returnFiber,
        unitOfWork,
        thrownValue,
        workInProgressRootRenderLanes
      )) {
        workInProgressRootExitStatus = 1;
        logUncaughtError(
          root2,
          createCapturedValueAtFiber(thrownValue, root2.current)
        );
        workInProgress = null;
        return;
      }
    } catch (error) {
      if (null !== returnFiber) throw workInProgress = returnFiber, error;
      workInProgressRootExitStatus = 1;
      logUncaughtError(
        root2,
        createCapturedValueAtFiber(thrownValue, root2.current)
      );
      workInProgress = null;
      return;
    }
    if (unitOfWork.flags & 32768) {
      if (isHydrating || 1 === suspendedReason) root2 = true;
      else if (workInProgressRootIsPrerendering || 0 !== (workInProgressRootRenderLanes & 536870912))
        root2 = false;
      else if (workInProgressRootDidSkipSuspendedSiblings = root2 = true, 2 === suspendedReason || 9 === suspendedReason || 3 === suspendedReason || 6 === suspendedReason)
        suspendedReason = suspenseHandlerStackCursor.current, null !== suspendedReason && 13 === suspendedReason.tag && (suspendedReason.flags |= 16384);
      unwindUnitOfWork(unitOfWork, root2);
    } else completeUnitOfWork(unitOfWork);
  }
  function completeUnitOfWork(unitOfWork) {
    var completedWork = unitOfWork;
    do {
      if (0 !== (completedWork.flags & 32768)) {
        unwindUnitOfWork(
          completedWork,
          workInProgressRootDidSkipSuspendedSiblings
        );
        return;
      }
      unitOfWork = completedWork.return;
      var next = completeWork(
        completedWork.alternate,
        completedWork,
        entangledRenderLanes
      );
      if (null !== next) {
        workInProgress = next;
        return;
      }
      completedWork = completedWork.sibling;
      if (null !== completedWork) {
        workInProgress = completedWork;
        return;
      }
      workInProgress = completedWork = unitOfWork;
    } while (null !== completedWork);
    0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 5);
  }
  function unwindUnitOfWork(unitOfWork, skipSiblings) {
    do {
      var next = unwindWork(unitOfWork.alternate, unitOfWork);
      if (null !== next) {
        next.flags &= 32767;
        workInProgress = next;
        return;
      }
      next = unitOfWork.return;
      null !== next && (next.flags |= 32768, next.subtreeFlags = 0, next.deletions = null);
      if (!skipSiblings && (unitOfWork = unitOfWork.sibling, null !== unitOfWork)) {
        workInProgress = unitOfWork;
        return;
      }
      workInProgress = unitOfWork = next;
    } while (null !== unitOfWork);
    workInProgressRootExitStatus = 6;
    workInProgress = null;
  }
  function completeRoot(root2, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedState) {
    root2.cancelPendingCommit = null;
    do
      flushPendingEffects();
    while (0 !== pendingEffectsStatus);
    if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
    if (null !== finishedWork) {
      if (finishedWork === root2.current) throw Error(formatProdErrorMessage(177));
      root2 === workInProgressRoot && (workInProgress = workInProgressRoot = null, workInProgressRootRenderLanes = 0);
      pendingFinishedWork = finishedWork;
      pendingEffectsRoot = root2;
      pendingEffectsLanes = lanes;
      pendingPassiveTransitions = transitions;
      pendingRecoverableErrors = recoverableErrors;
      commitRoot(
        root2,
        finishedWork,
        lanes,
        spawnedLane,
        updatedLanes,
        suspendedRetryLanes,
        suspendedState
      );
    }
  }
  function commitRoot(root2, finishedWork, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, suspendedState) {
    var remainingLanes = finishedWork.lanes | finishedWork.childLanes;
    pendingEffectsRemainingLanes = remainingLanes;
    remainingLanes |= concurrentlyUpdatedLanes;
    markRootFinished(
      root2,
      lanes,
      remainingLanes,
      spawnedLane,
      updatedLanes,
      suspendedRetryLanes
    );
    pendingViewTransitionEvents = null;
    (lanes & 335544064) === lanes ? (pendingTransitionTypes = claimQueuedTransitionTypes(root2), spawnedLane = 10262) : (pendingTransitionTypes = null, spawnedLane = 10256);
    0 !== (finishedWork.subtreeFlags & spawnedLane) || 0 !== (finishedWork.flags & spawnedLane) ? (root2.callbackNode = null, root2.callbackPriority = 0, scheduleCallback$1(NormalPriority$1, function() {
      flushPassiveEffects();
      return null;
    })) : (root2.callbackNode = null, root2.callbackPriority = 0);
    shouldStartViewTransition = false;
    spawnedLane = 0 !== (finishedWork.flags & 13878);
    if (0 !== (finishedWork.subtreeFlags & 13878) || spawnedLane) {
      spawnedLane = ReactSharedInternals.T;
      ReactSharedInternals.T = null;
      updatedLanes = ReactDOMSharedInternals.p;
      ReactDOMSharedInternals.p = 2;
      suspendedRetryLanes = executionContext;
      executionContext |= 4;
      try {
        commitBeforeMutationEffects(root2, finishedWork, lanes);
      } finally {
        executionContext = suspendedRetryLanes, ReactDOMSharedInternals.p = updatedLanes, ReactSharedInternals.T = spawnedLane;
      }
    }
    pendingEffectsStatus = 1;
    shouldStartViewTransition ? pendingViewTransition = startViewTransition(
      suspendedState,
      root2.containerInfo,
      pendingTransitionTypes,
      flushMutationEffects,
      flushLayoutEffects,
      flushAfterMutationEffects,
      flushSpawnedWork,
      flushPassiveEffects,
      reportViewTransitionError
    ) : (flushMutationEffects(), flushLayoutEffects(), flushSpawnedWork());
  }
  function reportViewTransitionError(error) {
    if (0 !== pendingEffectsStatus) {
      var onRecoverableError = pendingEffectsRoot.onRecoverableError;
      onRecoverableError(error, { componentStack: null });
    }
  }
  function flushAfterMutationEffects() {
    3 === pendingEffectsStatus && (pendingEffectsStatus = 0, commitAfterMutationEffectsOnFiber(pendingFinishedWork, pendingEffectsRoot), pendingEffectsStatus = 4);
  }
  function flushMutationEffects() {
    if (1 === pendingEffectsStatus) {
      pendingEffectsStatus = 0;
      var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, lanes = pendingEffectsLanes, rootMutationHasEffect = 0 !== (finishedWork.flags & 13878);
      if (0 !== (finishedWork.subtreeFlags & 13878) || rootMutationHasEffect) {
        rootMutationHasEffect = ReactSharedInternals.T;
        ReactSharedInternals.T = null;
        var previousPriority = ReactDOMSharedInternals.p;
        ReactDOMSharedInternals.p = 2;
        var prevExecutionContext = executionContext;
        executionContext |= 4;
        try {
          inUpdateViewTransition = rootViewTransitionAffected = false;
          commitMutationEffectsOnFiber(finishedWork, root2, lanes);
          lanes = selectionInformation;
          var curFocusedElem = getActiveElementDeep(root2.containerInfo), priorFocusedElem = lanes.focusedElem, priorSelectionRange = lanes.selectionRange;
          if (curFocusedElem !== priorFocusedElem && priorFocusedElem && priorFocusedElem.ownerDocument && containsNode(
            priorFocusedElem.ownerDocument.documentElement,
            priorFocusedElem
          )) {
            if (null !== priorSelectionRange && hasSelectionCapabilities(priorFocusedElem)) {
              var start = priorSelectionRange.start, end = priorSelectionRange.end;
              void 0 === end && (end = start);
              if ("selectionStart" in priorFocusedElem)
                priorFocusedElem.selectionStart = start, priorFocusedElem.selectionEnd = Math.min(
                  end,
                  priorFocusedElem.value.length
                );
              else {
                var doc = priorFocusedElem.ownerDocument || document, win = doc && doc.defaultView || window;
                if (win.getSelection) {
                  var selection = win.getSelection(), length = priorFocusedElem.textContent.length, start$jscomp$0 = Math.min(priorSelectionRange.start, length), end$jscomp$0 = void 0 === priorSelectionRange.end ? start$jscomp$0 : Math.min(priorSelectionRange.end, length);
                  !selection.extend && start$jscomp$0 > end$jscomp$0 && (curFocusedElem = end$jscomp$0, end$jscomp$0 = start$jscomp$0, start$jscomp$0 = curFocusedElem);
                  var startMarker = getNodeForCharacterOffset(
                    priorFocusedElem,
                    start$jscomp$0
                  ), endMarker = getNodeForCharacterOffset(
                    priorFocusedElem,
                    end$jscomp$0
                  );
                  if (startMarker && endMarker && (1 !== selection.rangeCount || selection.anchorNode !== startMarker.node || selection.anchorOffset !== startMarker.offset || selection.focusNode !== endMarker.node || selection.focusOffset !== endMarker.offset)) {
                    var range = doc.createRange();
                    range.setStart(startMarker.node, startMarker.offset);
                    selection.removeAllRanges();
                    start$jscomp$0 > end$jscomp$0 ? (selection.addRange(range), selection.extend(endMarker.node, endMarker.offset)) : (range.setEnd(endMarker.node, endMarker.offset), selection.addRange(range));
                  }
                }
              }
            }
            doc = [];
            for (selection = priorFocusedElem; selection = selection.parentNode; )
              1 === selection.nodeType && doc.push({
                element: selection,
                left: selection.scrollLeft,
                top: selection.scrollTop
              });
            "function" === typeof priorFocusedElem.focus && priorFocusedElem.focus();
            for (priorFocusedElem = 0; priorFocusedElem < doc.length; priorFocusedElem++) {
              var info = doc[priorFocusedElem];
              info.element.scrollLeft = info.left;
              info.element.scrollTop = info.top;
            }
          }
          _enabled = !!eventsEnabled;
          selectionInformation = eventsEnabled = null;
        } finally {
          executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootMutationHasEffect;
        }
      }
      root2.current = finishedWork;
      pendingEffectsStatus = 2;
    }
  }
  function flushLayoutEffects() {
    if (2 === pendingEffectsStatus) {
      pendingEffectsStatus = 0;
      var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, rootHasLayoutEffect = 0 !== (finishedWork.flags & 8772);
      if (0 !== (finishedWork.subtreeFlags & 8772) || rootHasLayoutEffect) {
        rootHasLayoutEffect = ReactSharedInternals.T;
        ReactSharedInternals.T = null;
        var previousPriority = ReactDOMSharedInternals.p;
        ReactDOMSharedInternals.p = 2;
        var prevExecutionContext = executionContext;
        executionContext |= 4;
        try {
          commitLayoutEffectOnFiber(root2, finishedWork.alternate, finishedWork);
        } finally {
          executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootHasLayoutEffect;
        }
      }
      pendingEffectsStatus = 3;
    }
  }
  function flushSpawnedWork() {
    if (4 === pendingEffectsStatus || 3 === pendingEffectsStatus) {
      pendingEffectsStatus = 0;
      var committedViewTransition = pendingViewTransition;
      pendingViewTransition = null;
      requestPaint();
      var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, lanes = pendingEffectsLanes, recoverableErrors = pendingRecoverableErrors, passiveSubtreeMask = (lanes & 335544064) === lanes ? 10262 : 10256;
      0 !== (finishedWork.subtreeFlags & passiveSubtreeMask) || 0 !== (finishedWork.flags & passiveSubtreeMask) ? pendingEffectsStatus = 5 : (pendingEffectsStatus = 0, pendingFinishedWork = pendingEffectsRoot = null, releaseRootPooledCache(root2, root2.pendingLanes));
      passiveSubtreeMask = root2.pendingLanes;
      0 === passiveSubtreeMask && (legacyErrorBoundariesThatAlreadyFailed = null);
      lanesToEventPriority(lanes);
      finishedWork = finishedWork.stateNode;
      if (injectedHook && "function" === typeof injectedHook.onCommitFiberRoot)
        try {
          injectedHook.onCommitFiberRoot(
            rendererID,
            finishedWork,
            void 0,
            128 === (finishedWork.current.flags & 128)
          );
        } catch (err) {
        }
      if (null !== recoverableErrors) {
        finishedWork = ReactSharedInternals.T;
        passiveSubtreeMask = ReactDOMSharedInternals.p;
        ReactDOMSharedInternals.p = 2;
        ReactSharedInternals.T = null;
        try {
          for (var onRecoverableError = root2.onRecoverableError, i = 0; i < recoverableErrors.length; i++) {
            var recoverableError = recoverableErrors[i];
            onRecoverableError(recoverableError.value, {
              componentStack: recoverableError.stack
            });
          }
        } finally {
          ReactSharedInternals.T = finishedWork, ReactDOMSharedInternals.p = passiveSubtreeMask;
        }
      }
      recoverableErrors = pendingViewTransitionEvents;
      onRecoverableError = pendingTransitionTypes;
      pendingTransitionTypes = null;
      if (null !== recoverableErrors && (pendingViewTransitionEvents = null, null === onRecoverableError && (onRecoverableError = []), null !== committedViewTransition))
        for (recoverableError = 0; recoverableError < recoverableErrors.length; recoverableError++)
          finishedWork = (0, recoverableErrors[recoverableError])(
            onRecoverableError
          ), void 0 !== finishedWork && committedViewTransition.finished.finally(finishedWork);
      0 !== (pendingEffectsLanes & 3) && flushPendingEffects();
      ensureRootIsScheduled(root2);
      passiveSubtreeMask = root2.pendingLanes;
      0 !== (lanes & 261930) && 0 !== (passiveSubtreeMask & 42) ? root2 === rootWithNestedUpdates ? nestedUpdateCount++ : (nestedUpdateCount = 0, rootWithNestedUpdates = root2) : (nestedUpdateCount = 0, rootWithNestedUpdates = null);
      flushSyncWorkAcrossRoots_impl(0);
    }
  }
  function releaseRootPooledCache(root2, remainingLanes) {
    0 === (root2.pooledCacheLanes &= remainingLanes) && (remainingLanes = root2.pooledCache, null != remainingLanes && (root2.pooledCache = null, releaseCache(remainingLanes)));
  }
  function flushPendingEffects() {
    null !== pendingViewTransition && (pendingViewTransition.skipTransition(), pendingViewTransition = null);
    flushMutationEffects();
    flushLayoutEffects();
    flushSpawnedWork();
    return flushPassiveEffects();
  }
  function flushPassiveEffects() {
    if (5 !== pendingEffectsStatus) return false;
    var root2 = pendingEffectsRoot, remainingLanes = pendingEffectsRemainingLanes;
    pendingEffectsRemainingLanes = 0;
    var renderPriority = lanesToEventPriority(pendingEffectsLanes), prevTransition = ReactSharedInternals.T, previousPriority = ReactDOMSharedInternals.p;
    try {
      ReactDOMSharedInternals.p = 32 > renderPriority ? 32 : renderPriority;
      ReactSharedInternals.T = null;
      renderPriority = pendingPassiveTransitions;
      pendingPassiveTransitions = null;
      var root$jscomp$0 = pendingEffectsRoot, lanes = pendingEffectsLanes;
      pendingEffectsStatus = 0;
      pendingFinishedWork = pendingEffectsRoot = null;
      pendingEffectsLanes = 0;
      if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(331));
      var prevExecutionContext = executionContext;
      executionContext |= 4;
      commitPassiveUnmountOnFiber(root$jscomp$0.current);
      commitPassiveMountOnFiber(
        root$jscomp$0,
        root$jscomp$0.current,
        lanes,
        renderPriority
      );
      executionContext = prevExecutionContext;
      flushSyncWorkAcrossRoots_impl(0, false);
      if (injectedHook && "function" === typeof injectedHook.onPostCommitFiberRoot)
        try {
          injectedHook.onPostCommitFiberRoot(rendererID, root$jscomp$0);
        } catch (err) {
        }
      return true;
    } finally {
      ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition, releaseRootPooledCache(root2, remainingLanes);
    }
  }
  function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
    sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
    sourceFiber = createRootErrorUpdate(rootFiber.stateNode, sourceFiber, 2);
    rootFiber = enqueueUpdate(rootFiber, sourceFiber, 2);
    null !== rootFiber && (markRootUpdated$1(rootFiber, 2), ensureRootIsScheduled(rootFiber));
  }
  function captureCommitPhaseError(sourceFiber, nearestMountedAncestor, error) {
    if (3 === sourceFiber.tag)
      captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
    else
      for (; null !== nearestMountedAncestor; ) {
        if (3 === nearestMountedAncestor.tag) {
          captureCommitPhaseErrorOnRoot(
            nearestMountedAncestor,
            sourceFiber,
            error
          );
          break;
        } else if (1 === nearestMountedAncestor.tag) {
          var instance = nearestMountedAncestor.stateNode;
          if ("function" === typeof nearestMountedAncestor.type.getDerivedStateFromError || "function" === typeof instance.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(instance))) {
            sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
            error = createClassErrorUpdate(2);
            instance = enqueueUpdate(nearestMountedAncestor, error, 2);
            null !== instance && (initializeClassErrorUpdate(
              error,
              instance,
              nearestMountedAncestor,
              sourceFiber
            ), markRootUpdated$1(instance, 2), ensureRootIsScheduled(instance));
            break;
          }
        }
        nearestMountedAncestor = nearestMountedAncestor.return;
      }
  }
  function attachPingListener(root2, wakeable, lanes) {
    var pingCache = root2.pingCache;
    if (null === pingCache) {
      pingCache = root2.pingCache = new PossiblyWeakMap();
      var threadIDs = /* @__PURE__ */ new Set();
      pingCache.set(wakeable, threadIDs);
    } else
      threadIDs = pingCache.get(wakeable), void 0 === threadIDs && (threadIDs = /* @__PURE__ */ new Set(), pingCache.set(wakeable, threadIDs));
    threadIDs.has(lanes) || (workInProgressRootDidAttachPingListener = true, threadIDs.add(lanes), root2 = pingSuspendedRoot.bind(null, root2, wakeable, lanes), wakeable.then(root2, root2));
  }
  function pingSuspendedRoot(root2, wakeable, pingedLanes) {
    var pingCache = root2.pingCache;
    null !== pingCache && pingCache.delete(wakeable);
    root2.pingedLanes |= root2.suspendedLanes & pingedLanes;
    root2.warmLanes &= ~pingedLanes;
    workInProgressRoot === root2 && (workInProgressRootRenderLanes & pingedLanes) === pingedLanes && (4 === workInProgressRootExitStatus || 3 === workInProgressRootExitStatus && (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes && 300 > now() - globalMostRecentFallbackTime ? 0 === (executionContext & 2) ? prepareFreshStack(root2, 0) : workInProgressRootPingedLanes |= pingedLanes : workInProgressRootPingedLanes |= pingedLanes, workInProgressSuspendedRetryLanes === workInProgressRootRenderLanes && (workInProgressSuspendedRetryLanes = 0));
    ensureRootIsScheduled(root2);
  }
  function retryTimedOutBoundary(boundaryFiber, retryLane) {
    0 === retryLane && (retryLane = claimNextRetryLane());
    boundaryFiber = enqueueConcurrentRenderForLane(boundaryFiber, retryLane);
    null !== boundaryFiber && (markRootUpdated$1(boundaryFiber, retryLane), ensureRootIsScheduled(boundaryFiber));
  }
  function retryDehydratedSuspenseBoundary(boundaryFiber) {
    var suspenseState = boundaryFiber.memoizedState, retryLane = 0;
    null !== suspenseState && (retryLane = suspenseState.retryLane);
    retryTimedOutBoundary(boundaryFiber, retryLane);
  }
  function resolveRetryWakeable(boundaryFiber, wakeable) {
    var retryLane = 0;
    switch (boundaryFiber.tag) {
      case 31:
      case 13:
        var retryCache = boundaryFiber.stateNode;
        var suspenseState = boundaryFiber.memoizedState;
        null !== suspenseState && (retryLane = suspenseState.retryLane);
        break;
      case 19:
        retryCache = boundaryFiber.stateNode;
        break;
      case 22:
        retryCache = boundaryFiber.stateNode._retryCache;
        break;
      default:
        throw Error(formatProdErrorMessage(314));
    }
    null !== retryCache && retryCache.delete(wakeable);
    retryTimedOutBoundary(boundaryFiber, retryLane);
  }
  function scheduleCallback$1(priorityLevel, callback) {
    return scheduleCallback$3(priorityLevel, callback);
  }
  var firstScheduledRoot = null, lastScheduledRoot = null, didScheduleMicrotask = false, mightHavePendingSyncWork = false, isFlushingWork = false, currentEventTransitionLane = 0;
  function ensureRootIsScheduled(root2) {
    root2 !== lastScheduledRoot && null === root2.next && (null === lastScheduledRoot ? firstScheduledRoot = lastScheduledRoot = root2 : lastScheduledRoot = lastScheduledRoot.next = root2);
    mightHavePendingSyncWork = true;
    didScheduleMicrotask || (didScheduleMicrotask = true, scheduleImmediateRootScheduleTask());
  }
  function flushSyncWorkAcrossRoots_impl(syncTransitionLanes, onlyLegacy) {
    if (!isFlushingWork && mightHavePendingSyncWork) {
      isFlushingWork = true;
      do {
        var didPerformSomeWork = false;
        for (var root$190 = firstScheduledRoot; null !== root$190; ) {
          if (0 !== syncTransitionLanes) {
            var pendingLanes = root$190.pendingLanes;
            if (0 === pendingLanes) var JSCompiler_inline_result = 0;
            else {
              var suspendedLanes = root$190.suspendedLanes, pingedLanes = root$190.pingedLanes;
              JSCompiler_inline_result = (1 << 31 - clz32(42 | syncTransitionLanes) + 1) - 1;
              JSCompiler_inline_result &= pendingLanes & ~(suspendedLanes & ~pingedLanes);
              JSCompiler_inline_result = JSCompiler_inline_result & 201326741 ? JSCompiler_inline_result & 201326741 | 1 : JSCompiler_inline_result ? JSCompiler_inline_result | 2 : 0;
            }
            0 !== JSCompiler_inline_result && (didPerformSomeWork = true, performSyncWorkOnRoot(root$190, JSCompiler_inline_result));
          } else
            JSCompiler_inline_result = workInProgressRootRenderLanes, JSCompiler_inline_result = getNextLanes(
              root$190,
              root$190 === workInProgressRoot ? JSCompiler_inline_result : 0,
              null !== root$190.cancelPendingCommit || -1 !== root$190.timeoutHandle
            ), 0 === (JSCompiler_inline_result & 3) || checkIfRootIsPrerendering(root$190, JSCompiler_inline_result) || (didPerformSomeWork = true, performSyncWorkOnRoot(root$190, JSCompiler_inline_result));
          root$190 = root$190.next;
        }
      } while (didPerformSomeWork);
      isFlushingWork = false;
    }
  }
  function processRootScheduleInImmediateTask() {
    processRootScheduleInMicrotask();
  }
  function processRootScheduleInMicrotask() {
    mightHavePendingSyncWork = didScheduleMicrotask = false;
    var syncTransitionLanes = 0;
    0 !== currentEventTransitionLane && shouldAttemptEagerTransition() && (syncTransitionLanes = currentEventTransitionLane);
    for (var currentTime = now(), prev = null, root2 = firstScheduledRoot; null !== root2; ) {
      var next = root2.next, nextLanes = scheduleTaskForRootDuringMicrotask(root2, currentTime);
      if (0 === nextLanes)
        root2.next = null, null === prev ? firstScheduledRoot = next : prev.next = next, null === next && (lastScheduledRoot = prev);
      else if (prev = root2, 0 !== syncTransitionLanes || 0 !== (nextLanes & 3))
        mightHavePendingSyncWork = true;
      root2 = next;
    }
    0 !== pendingEffectsStatus && 5 !== pendingEffectsStatus || flushSyncWorkAcrossRoots_impl(syncTransitionLanes);
    0 !== currentEventTransitionLane && (currentEventTransitionLane = 0);
  }
  function scheduleTaskForRootDuringMicrotask(root2, currentTime) {
    for (var suspendedLanes = root2.suspendedLanes, pingedLanes = root2.pingedLanes, expirationTimes = root2.expirationTimes, lanes = root2.pendingLanes & -62914561; 0 < lanes; ) {
      var index$5 = 31 - clz32(lanes), lane = 1 << index$5, expirationTime = expirationTimes[index$5];
      if (-1 === expirationTime) {
        if (0 === (lane & suspendedLanes) || 0 !== (lane & pingedLanes))
          expirationTimes[index$5] = computeExpirationTime(lane, currentTime);
      } else expirationTime <= currentTime && (root2.expiredLanes |= lane);
      lanes &= ~lane;
    }
    currentTime = workInProgressRoot;
    suspendedLanes = workInProgressRootRenderLanes;
    suspendedLanes = getNextLanes(
      root2,
      root2 === currentTime ? suspendedLanes : 0,
      null !== root2.cancelPendingCommit || -1 !== root2.timeoutHandle
    );
    pingedLanes = root2.callbackNode;
    if (0 === suspendedLanes || root2 === currentTime && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || null !== root2.cancelPendingCommit)
      return null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes), root2.callbackNode = null, root2.callbackPriority = 0;
    if (0 === (suspendedLanes & 3) || checkIfRootIsPrerendering(root2, suspendedLanes)) {
      currentTime = suspendedLanes & -suspendedLanes;
      if (currentTime === root2.callbackPriority) return currentTime;
      null !== pingedLanes && cancelCallback$1(pingedLanes);
      switch (lanesToEventPriority(suspendedLanes)) {
        case 2:
        case 8:
          suspendedLanes = UserBlockingPriority;
          break;
        case 32:
          suspendedLanes = NormalPriority$1;
          break;
        case 268435456:
          suspendedLanes = IdlePriority;
          break;
        default:
          suspendedLanes = NormalPriority$1;
      }
      pingedLanes = performWorkOnRootViaSchedulerTask.bind(null, root2);
      suspendedLanes = scheduleCallback$3(suspendedLanes, pingedLanes);
      root2.callbackPriority = currentTime;
      root2.callbackNode = suspendedLanes;
      return currentTime;
    }
    null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes);
    root2.callbackPriority = 2;
    root2.callbackNode = null;
    return 2;
  }
  function performWorkOnRootViaSchedulerTask(root2, didTimeout) {
    if (0 !== pendingEffectsStatus && 5 !== pendingEffectsStatus)
      return root2.callbackNode = null, root2.callbackPriority = 0, null;
    var originalCallbackNode = root2.callbackNode;
    if (flushPendingEffects() && root2.callbackNode !== originalCallbackNode)
      return null;
    var workInProgressRootRenderLanes$jscomp$0 = workInProgressRootRenderLanes;
    workInProgressRootRenderLanes$jscomp$0 = getNextLanes(
      root2,
      root2 === workInProgressRoot ? workInProgressRootRenderLanes$jscomp$0 : 0,
      null !== root2.cancelPendingCommit || -1 !== root2.timeoutHandle
    );
    if (0 === workInProgressRootRenderLanes$jscomp$0) return null;
    performWorkOnRoot(root2, workInProgressRootRenderLanes$jscomp$0, didTimeout);
    scheduleTaskForRootDuringMicrotask(root2, now());
    return null != root2.callbackNode && root2.callbackNode === originalCallbackNode ? performWorkOnRootViaSchedulerTask.bind(null, root2) : null;
  }
  function performSyncWorkOnRoot(root2, lanes) {
    if (flushPendingEffects()) return null;
    performWorkOnRoot(root2, lanes, true);
  }
  function scheduleImmediateRootScheduleTask() {
    scheduleMicrotask(function() {
      0 !== (executionContext & 6) ? scheduleCallback$3(
        ImmediatePriority,
        processRootScheduleInImmediateTask
      ) : processRootScheduleInMicrotask();
    });
  }
  function requestTransitionLane() {
    if (0 === currentEventTransitionLane) {
      var actionScopeLane = currentEntangledLane;
      0 === actionScopeLane && (actionScopeLane = nextTransitionUpdateLane, nextTransitionUpdateLane <<= 1, 0 === (nextTransitionUpdateLane & 261888) && (nextTransitionUpdateLane = 256));
      currentEventTransitionLane = actionScopeLane;
    }
    return currentEventTransitionLane;
  }
  function coerceFormActionProp(actionProp) {
    return null == actionProp || "symbol" === typeof actionProp || "boolean" === typeof actionProp ? null : "function" === typeof actionProp ? actionProp : sanitizeURL(actionProp);
  }
  function extractEvents$1(dispatchQueue, domEventName, maybeTargetInst, nativeEvent, nativeEventTarget) {
    if ("submit" === domEventName && maybeTargetInst && maybeTargetInst.stateNode === nativeEventTarget) {
      var action = coerceFormActionProp(
        (nativeEventTarget[internalPropsKey] || null).action
      ), submitter = nativeEvent.submitter;
      submitter && (domEventName = (domEventName = submitter[internalPropsKey] || null) ? coerceFormActionProp(domEventName.formAction) : submitter.getAttribute("formAction"), null !== domEventName && (action = domEventName, submitter = null));
      var event = new SyntheticEvent(
        "action",
        "action",
        null,
        nativeEvent,
        nativeEventTarget
      );
      dispatchQueue.push({
        event,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (nativeEvent.defaultPrevented) {
                if (0 !== currentEventTransitionLane) {
                  var formData = new FormData(nativeEventTarget, submitter);
                  startHostTransition(
                    maybeTargetInst,
                    {
                      pending: true,
                      data: formData,
                      method: nativeEventTarget.method,
                      action
                    },
                    null,
                    formData
                  );
                }
              } else
                "function" === typeof action && (event.preventDefault(), formData = new FormData(nativeEventTarget, submitter), startHostTransition(
                  maybeTargetInst,
                  {
                    pending: true,
                    data: formData,
                    method: nativeEventTarget.method,
                    action
                  },
                  action,
                  formData
                ));
            },
            currentTarget: nativeEventTarget
          }
        ]
      });
    }
  }
  for (var i$jscomp$inline_1667 = 0; i$jscomp$inline_1667 < simpleEventPluginEvents.length; i$jscomp$inline_1667++) {
    var eventName$jscomp$inline_1668 = simpleEventPluginEvents[i$jscomp$inline_1667], domEventName$jscomp$inline_1669 = eventName$jscomp$inline_1668.toLowerCase(), capitalizedEvent$jscomp$inline_1670 = eventName$jscomp$inline_1668[0].toUpperCase() + eventName$jscomp$inline_1668.slice(1);
    registerSimpleEvent(
      domEventName$jscomp$inline_1669,
      "on" + capitalizedEvent$jscomp$inline_1670
    );
  }
  registerSimpleEvent(ANIMATION_END, "onAnimationEnd");
  registerSimpleEvent(ANIMATION_ITERATION, "onAnimationIteration");
  registerSimpleEvent(ANIMATION_START, "onAnimationStart");
  registerSimpleEvent("dblclick", "onDoubleClick");
  registerSimpleEvent("focusin", "onFocus");
  registerSimpleEvent("focusout", "onBlur");
  registerSimpleEvent(TRANSITION_RUN, "onTransitionRun");
  registerSimpleEvent(TRANSITION_START, "onTransitionStart");
  registerSimpleEvent(TRANSITION_CANCEL, "onTransitionCancel");
  registerSimpleEvent(TRANSITION_END, "onTransitionEnd");
  registerDirectEvent("onMouseEnter", ["mouseout", "mouseover"]);
  registerDirectEvent("onMouseLeave", ["mouseout", "mouseover"]);
  registerDirectEvent("onPointerEnter", ["pointerout", "pointerover"]);
  registerDirectEvent("onPointerLeave", ["pointerout", "pointerover"]);
  registerTwoPhaseEvent(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  );
  registerTwoPhaseEvent(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  );
  registerTwoPhaseEvent("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]);
  registerTwoPhaseEvent(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  );
  registerTwoPhaseEvent(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  );
  registerTwoPhaseEvent(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var mediaEventTypes = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), nonDelegatedEvents = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(mediaEventTypes)
  );
  function processDispatchQueue(dispatchQueue, eventSystemFlags) {
    eventSystemFlags = 0 !== (eventSystemFlags & 4);
    for (var i = 0; i < dispatchQueue.length; i++) {
      var _dispatchQueue$i = dispatchQueue[i], event = _dispatchQueue$i.event;
      _dispatchQueue$i = _dispatchQueue$i.listeners;
      a: {
        var previousInstance = void 0;
        if (eventSystemFlags)
          for (var i$jscomp$0 = _dispatchQueue$i.length - 1; 0 <= i$jscomp$0; i$jscomp$0--) {
            var _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0], instance = _dispatchListeners$i.instance, currentTarget = _dispatchListeners$i.currentTarget;
            _dispatchListeners$i = _dispatchListeners$i.listener;
            if (instance !== previousInstance && event.isPropagationStopped())
              break a;
            previousInstance = _dispatchListeners$i;
            event.currentTarget = currentTarget;
            try {
              previousInstance(event);
            } catch (error) {
              reportGlobalError(error);
            }
            event.currentTarget = null;
            previousInstance = instance;
          }
        else
          for (i$jscomp$0 = 0; i$jscomp$0 < _dispatchQueue$i.length; i$jscomp$0++) {
            _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0];
            instance = _dispatchListeners$i.instance;
            currentTarget = _dispatchListeners$i.currentTarget;
            _dispatchListeners$i = _dispatchListeners$i.listener;
            if (instance !== previousInstance && event.isPropagationStopped())
              break a;
            previousInstance = _dispatchListeners$i;
            event.currentTarget = currentTarget;
            try {
              previousInstance(event);
            } catch (error) {
              reportGlobalError(error);
            }
            event.currentTarget = null;
            previousInstance = instance;
          }
      }
    }
  }
  function listenToNonDelegatedEvent(domEventName, targetElement) {
    var JSCompiler_inline_result = targetElement[internalEventHandlersKey];
    void 0 === JSCompiler_inline_result && (JSCompiler_inline_result = targetElement[internalEventHandlersKey] = /* @__PURE__ */ new Set());
    var listenerSetKey = domEventName + "__bubble";
    JSCompiler_inline_result.has(listenerSetKey) || (addTrappedEventListener(targetElement, domEventName, 2, false), JSCompiler_inline_result.add(listenerSetKey));
  }
  function listenToNativeEvent(domEventName, isCapturePhaseListener, target) {
    var eventSystemFlags = 0;
    isCapturePhaseListener && (eventSystemFlags |= 4);
    addTrappedEventListener(
      target,
      domEventName,
      eventSystemFlags,
      isCapturePhaseListener
    );
  }
  var listeningMarker = "_reactListening" + Math.random().toString(36).slice(2);
  function listenToAllSupportedEvents(rootContainerElement) {
    if (!rootContainerElement[listeningMarker]) {
      rootContainerElement[listeningMarker] = true;
      allNativeEvents.forEach(function(domEventName) {
        "selectionchange" !== domEventName && (nonDelegatedEvents.has(domEventName) || listenToNativeEvent(domEventName, false, rootContainerElement), listenToNativeEvent(domEventName, true, rootContainerElement));
      });
      var ownerDocument = 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
      null === ownerDocument || ownerDocument[listeningMarker] || (ownerDocument[listeningMarker] = true, listenToNativeEvent("selectionchange", false, ownerDocument));
    }
  }
  function addTrappedEventListener(targetContainer, domEventName, eventSystemFlags, isCapturePhaseListener) {
    switch (getEventPriority(domEventName)) {
      case 2:
        var listenerWrapper = dispatchDiscreteEvent;
        break;
      case 8:
        listenerWrapper = dispatchContinuousEvent;
        break;
      default:
        listenerWrapper = dispatchEvent2;
    }
    eventSystemFlags = listenerWrapper.bind(
      null,
      domEventName,
      eventSystemFlags,
      targetContainer
    );
    listenerWrapper = void 0;
    !passiveBrowserEventsSupported || "touchstart" !== domEventName && "touchmove" !== domEventName && "wheel" !== domEventName || (listenerWrapper = true);
    isCapturePhaseListener ? void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
      capture: true,
      passive: listenerWrapper
    }) : targetContainer.addEventListener(domEventName, eventSystemFlags, true) : void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
      passive: listenerWrapper
    }) : targetContainer.addEventListener(domEventName, eventSystemFlags, false);
  }
  function dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, targetInst$jscomp$0, targetContainer) {
    var ancestorInst = targetInst$jscomp$0;
    if (0 === (eventSystemFlags & 1) && 0 === (eventSystemFlags & 2) && null !== targetInst$jscomp$0)
      a: for (; ; ) {
        if (null === targetInst$jscomp$0) return;
        var nodeTag = targetInst$jscomp$0.tag;
        if (3 === nodeTag || 4 === nodeTag) {
          var container = targetInst$jscomp$0.stateNode.containerInfo;
          if (container === targetContainer) break;
          if (4 === nodeTag)
            for (nodeTag = targetInst$jscomp$0.return; null !== nodeTag; ) {
              var grandTag = nodeTag.tag;
              if ((3 === grandTag || 4 === grandTag) && nodeTag.stateNode.containerInfo === targetContainer)
                return;
              nodeTag = nodeTag.return;
            }
          for (; null !== container; ) {
            nodeTag = getClosestInstanceFromNode(container);
            if (null === nodeTag) return;
            grandTag = nodeTag.tag;
            if (5 === grandTag || 6 === grandTag || 26 === grandTag || 27 === grandTag) {
              targetInst$jscomp$0 = ancestorInst = nodeTag;
              continue a;
            }
            container = container.parentNode;
          }
        }
        targetInst$jscomp$0 = targetInst$jscomp$0.return;
      }
    batchedUpdates$1(function() {
      var targetInst = ancestorInst, nativeEventTarget = getEventTarget(nativeEvent), dispatchQueue = [];
      a: {
        var reactName = topLevelEventsToReactNames.get(domEventName);
        if (void 0 !== reactName) {
          var SyntheticEventCtor = SyntheticEvent, reactEventType = domEventName;
          switch (domEventName) {
            case "keypress":
              if (0 === getEventCharCode(nativeEvent)) break a;
            case "keydown":
            case "keyup":
              SyntheticEventCtor = SyntheticKeyboardEvent;
              break;
            case "focusin":
              reactEventType = "focus";
              SyntheticEventCtor = SyntheticFocusEvent;
              break;
            case "focusout":
              reactEventType = "blur";
              SyntheticEventCtor = SyntheticFocusEvent;
              break;
            case "beforeblur":
            case "afterblur":
              SyntheticEventCtor = SyntheticFocusEvent;
              break;
            case "click":
              if (2 === nativeEvent.button) break a;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              SyntheticEventCtor = SyntheticMouseEvent;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              SyntheticEventCtor = SyntheticDragEvent;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              SyntheticEventCtor = SyntheticTouchEvent;
              break;
            case ANIMATION_END:
            case ANIMATION_ITERATION:
            case ANIMATION_START:
              SyntheticEventCtor = SyntheticAnimationEvent;
              break;
            case TRANSITION_END:
              SyntheticEventCtor = SyntheticTransitionEvent;
              break;
            case "scroll":
            case "scrollend":
              SyntheticEventCtor = SyntheticUIEvent;
              break;
            case "wheel":
              SyntheticEventCtor = SyntheticWheelEvent;
              break;
            case "copy":
            case "cut":
            case "paste":
              SyntheticEventCtor = SyntheticClipboardEvent;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              SyntheticEventCtor = SyntheticPointerEvent;
              break;
            case "submit":
              SyntheticEventCtor = SyntheticSubmitEvent;
              break;
            case "toggle":
            case "beforetoggle":
              SyntheticEventCtor = SyntheticToggleEvent;
          }
          var inCapturePhase = 0 !== (eventSystemFlags & 4), accumulateTargetOnly = !inCapturePhase && ("scroll" === domEventName || "scrollend" === domEventName), reactEventName = inCapturePhase ? null !== reactName ? reactName + "Capture" : null : reactName;
          inCapturePhase = [];
          for (var instance = targetInst, lastHostComponent; null !== instance; ) {
            var _instance = instance;
            lastHostComponent = _instance.stateNode;
            _instance = _instance.tag;
            5 !== _instance && 26 !== _instance && 27 !== _instance || null === lastHostComponent || null === reactEventName || (_instance = getListener(instance, reactEventName), null != _instance && inCapturePhase.push(
              createDispatchListener(instance, _instance, lastHostComponent)
            ));
            if (accumulateTargetOnly) break;
            instance = instance.return;
          }
          0 < inCapturePhase.length && (reactName = new SyntheticEventCtor(
            reactName,
            reactEventType,
            null,
            nativeEvent,
            nativeEventTarget
          ), dispatchQueue.push({ event: reactName, listeners: inCapturePhase }));
        }
      }
      if (0 === (eventSystemFlags & 7)) {
        a: {
          SyntheticEventCtor = "mouseover" === domEventName || "pointerover" === domEventName;
          reactName = "mouseout" === domEventName || "pointerout" === domEventName;
          if (SyntheticEventCtor && nativeEvent !== currentReplayingEvent && (reactEventType = nativeEvent.relatedTarget || nativeEvent.fromElement) && (getClosestInstanceFromNode(reactEventType) || reactEventType[internalContainerInstanceKey]))
            break a;
          if (reactName || SyntheticEventCtor) {
            reactEventType = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget : (SyntheticEventCtor = nativeEventTarget.ownerDocument) ? SyntheticEventCtor.defaultView || SyntheticEventCtor.parentWindow : window;
            if (reactName) {
              if (SyntheticEventCtor = nativeEvent.relatedTarget || nativeEvent.toElement, reactName = targetInst, SyntheticEventCtor = SyntheticEventCtor ? getClosestInstanceFromNode(SyntheticEventCtor) : null, null !== SyntheticEventCtor && (accumulateTargetOnly = getNearestMountedFiber(SyntheticEventCtor), inCapturePhase = SyntheticEventCtor.tag, SyntheticEventCtor !== accumulateTargetOnly || 5 !== inCapturePhase && 27 !== inCapturePhase && 6 !== inCapturePhase))
                SyntheticEventCtor = null;
            } else reactName = null, SyntheticEventCtor = targetInst;
            if (reactName !== SyntheticEventCtor) {
              inCapturePhase = SyntheticMouseEvent;
              _instance = "onMouseLeave";
              reactEventName = "onMouseEnter";
              instance = "mouse";
              if ("pointerout" === domEventName || "pointerover" === domEventName)
                inCapturePhase = SyntheticPointerEvent, _instance = "onPointerLeave", reactEventName = "onPointerEnter", instance = "pointer";
              accumulateTargetOnly = null == reactName ? reactEventType : getNodeFromInstance(reactName);
              lastHostComponent = null == SyntheticEventCtor ? reactEventType : getNodeFromInstance(SyntheticEventCtor);
              reactEventType = new inCapturePhase(
                _instance,
                instance + "leave",
                reactName,
                nativeEvent,
                nativeEventTarget
              );
              reactEventType.target = accumulateTargetOnly;
              reactEventType.relatedTarget = lastHostComponent;
              _instance = null;
              getClosestInstanceFromNode(nativeEventTarget) === targetInst && (inCapturePhase = new inCapturePhase(
                reactEventName,
                instance + "enter",
                SyntheticEventCtor,
                nativeEvent,
                nativeEventTarget
              ), inCapturePhase.target = lastHostComponent, inCapturePhase.relatedTarget = accumulateTargetOnly, _instance = inCapturePhase);
              accumulateTargetOnly = _instance;
              inCapturePhase = reactName && SyntheticEventCtor ? getLowestCommonAncestor(
                reactName,
                SyntheticEventCtor,
                getParent2
              ) : null;
              null !== reactName && accumulateEnterLeaveListenersForEvent(
                dispatchQueue,
                reactEventType,
                reactName,
                inCapturePhase,
                false
              );
              null !== SyntheticEventCtor && null !== accumulateTargetOnly && accumulateEnterLeaveListenersForEvent(
                dispatchQueue,
                accumulateTargetOnly,
                SyntheticEventCtor,
                inCapturePhase,
                true
              );
            }
          }
        }
        a: {
          reactName = targetInst ? getNodeFromInstance(targetInst) : window;
          SyntheticEventCtor = reactName.nodeName && reactName.nodeName.toLowerCase();
          if ("select" === SyntheticEventCtor || "input" === SyntheticEventCtor && "file" === reactName.type)
            var getTargetInstFunc = getTargetInstForChangeEvent;
          else if (isTextInputElement(reactName))
            if (isInputEventSupported)
              getTargetInstFunc = getTargetInstForInputOrChangeEvent;
            else {
              getTargetInstFunc = getTargetInstForInputEventPolyfill;
              var handleEventFunc = handleEventsForInputEventPolyfill;
            }
          else
            SyntheticEventCtor = reactName.nodeName, !SyntheticEventCtor || "input" !== SyntheticEventCtor.toLowerCase() || "checkbox" !== reactName.type && "radio" !== reactName.type ? targetInst && isCustomElement(targetInst.elementType) && (getTargetInstFunc = getTargetInstForChangeEvent) : getTargetInstFunc = getTargetInstForClickEvent;
          if (getTargetInstFunc && (getTargetInstFunc = getTargetInstFunc(domEventName, targetInst))) {
            createAndAccumulateChangeEvent(
              dispatchQueue,
              getTargetInstFunc,
              nativeEvent,
              nativeEventTarget
            );
            break a;
          }
          handleEventFunc && handleEventFunc(domEventName, reactName, targetInst);
        }
        handleEventFunc = targetInst ? getNodeFromInstance(targetInst) : window;
        switch (domEventName) {
          case "focusin":
            if (isTextInputElement(handleEventFunc) || "true" === handleEventFunc.contentEditable)
              activeElement = handleEventFunc, activeElementInst = targetInst, lastSelection = null;
            break;
          case "focusout":
            lastSelection = activeElementInst = activeElement = null;
            break;
          case "mousedown":
            mouseDown = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            mouseDown = false;
            constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
            break;
          case "selectionchange":
            if (skipSelectionChangeEvent) break;
          case "keydown":
          case "keyup":
            constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
        }
        var fallbackData;
        if (canUseCompositionEvent)
          b: {
            switch (domEventName) {
              case "compositionstart":
                var eventType = "onCompositionStart";
                break b;
              case "compositionend":
                eventType = "onCompositionEnd";
                break b;
              case "compositionupdate":
                eventType = "onCompositionUpdate";
                break b;
            }
            eventType = void 0;
          }
        else
          isComposing ? isFallbackCompositionEnd(domEventName, nativeEvent) && (eventType = "onCompositionEnd") : "keydown" === domEventName && 229 === nativeEvent.keyCode && (eventType = "onCompositionStart");
        eventType && (useFallbackCompositionData && "ko" !== nativeEvent.locale && (isComposing || "onCompositionStart" !== eventType ? "onCompositionEnd" === eventType && isComposing && (fallbackData = getData()) : (root = nativeEventTarget, startText = "value" in root ? root.value : root.textContent, isComposing = true)), handleEventFunc = accumulateTwoPhaseListeners(targetInst, eventType), 0 < handleEventFunc.length && (eventType = new SyntheticCompositionEvent(
          eventType,
          domEventName,
          null,
          nativeEvent,
          nativeEventTarget
        ), dispatchQueue.push({ event: eventType, listeners: handleEventFunc }), fallbackData ? eventType.data = fallbackData : (fallbackData = getDataFromCustomEvent(nativeEvent), null !== fallbackData && (eventType.data = fallbackData))));
        if (fallbackData = canUseTextInputEvent ? getNativeBeforeInputChars(domEventName, nativeEvent) : getFallbackBeforeInputChars(domEventName, nativeEvent))
          eventType = accumulateTwoPhaseListeners(targetInst, "onBeforeInput"), 0 < eventType.length && (handleEventFunc = new SyntheticCompositionEvent(
            "onBeforeInput",
            "beforeinput",
            null,
            nativeEvent,
            nativeEventTarget
          ), dispatchQueue.push({
            event: handleEventFunc,
            listeners: eventType
          }), handleEventFunc.data = fallbackData);
        extractEvents$1(
          dispatchQueue,
          domEventName,
          targetInst,
          nativeEvent,
          nativeEventTarget
        );
      }
      processDispatchQueue(dispatchQueue, eventSystemFlags);
    });
  }
  function createDispatchListener(instance, listener, currentTarget) {
    return {
      instance,
      listener,
      currentTarget
    };
  }
  function accumulateTwoPhaseListeners(targetFiber, reactName) {
    for (var captureName = reactName + "Capture", listeners = []; null !== targetFiber; ) {
      var _instance2 = targetFiber, stateNode = _instance2.stateNode;
      _instance2 = _instance2.tag;
      5 !== _instance2 && 26 !== _instance2 && 27 !== _instance2 || null === stateNode || (_instance2 = getListener(targetFiber, captureName), null != _instance2 && listeners.unshift(
        createDispatchListener(targetFiber, _instance2, stateNode)
      ), _instance2 = getListener(targetFiber, reactName), null != _instance2 && listeners.push(
        createDispatchListener(targetFiber, _instance2, stateNode)
      ));
      if (3 === targetFiber.tag) return listeners;
      targetFiber = targetFiber.return;
    }
    return [];
  }
  function getParent2(inst) {
    if (null === inst) return null;
    do
      inst = inst.return;
    while (inst && 5 !== inst.tag && 27 !== inst.tag);
    return inst ? inst : null;
  }
  function accumulateEnterLeaveListenersForEvent(dispatchQueue, event, target, common, inCapturePhase) {
    for (var registrationName = event._reactName, listeners = []; null !== target && target !== common; ) {
      var _instance3 = target, alternate = _instance3.alternate, stateNode = _instance3.stateNode;
      _instance3 = _instance3.tag;
      if (null !== alternate && alternate === common) break;
      5 !== _instance3 && 26 !== _instance3 && 27 !== _instance3 || null === stateNode || (alternate = stateNode, inCapturePhase ? (stateNode = getListener(target, registrationName), null != stateNode && listeners.unshift(
        createDispatchListener(target, stateNode, alternate)
      )) : inCapturePhase || (stateNode = getListener(target, registrationName), null != stateNode && listeners.push(
        createDispatchListener(target, stateNode, alternate)
      )));
      target = target.return;
    }
    0 !== listeners.length && dispatchQueue.push({ event, listeners });
  }
  var NORMALIZE_NEWLINES_REGEX = /\r\n?/g, NORMALIZE_NULL_AND_REPLACEMENT_REGEX = /\u0000|\uFFFD/g;
  function normalizeMarkupForTextOrAttribute(markup) {
    return ("string" === typeof markup ? markup : "" + markup).replace(NORMALIZE_NEWLINES_REGEX, "\n").replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX, "");
  }
  function checkForUnmatchedText(serverText, clientText) {
    clientText = normalizeMarkupForTextOrAttribute(clientText);
    return normalizeMarkupForTextOrAttribute(serverText) === clientText ? true : false;
  }
  function setProp(domElement, tag, key, value, props, prevValue) {
    switch (key) {
      case "children":
        if ("string" === typeof value)
          "body" === tag || "textarea" === tag && "" === value || setTextContent(domElement, value);
        else if ("number" === typeof value || "bigint" === typeof value)
          "body" !== tag && setTextContent(domElement, "" + value);
        else return;
        break;
      case "className":
        setValueForKnownAttribute(domElement, "class", value);
        break;
      case "tabIndex":
        setValueForKnownAttribute(domElement, "tabindex", value);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        setValueForKnownAttribute(domElement, key, value);
        break;
      case "style":
        setValueForStyles(domElement, value, prevValue);
        return;
      case "data":
        if ("object" !== tag) {
          setValueForKnownAttribute(domElement, "data", value);
          break;
        }
      case "src":
      case "href":
        if ("" === value && ("a" !== tag || "href" !== key)) {
          domElement.removeAttribute(key);
          break;
        }
        if (null == value || "function" === typeof value || "symbol" === typeof value || "boolean" === typeof value) {
          domElement.removeAttribute(key);
          break;
        }
        value = sanitizeURL(value);
        domElement.setAttribute(key, value);
        break;
      case "action":
      case "formAction":
        if ("function" === typeof value) {
          domElement.setAttribute(
            key,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          "function" === typeof prevValue && ("formAction" === key ? ("input" !== tag && setProp(domElement, tag, "name", props.name, props, null), setProp(
            domElement,
            tag,
            "formEncType",
            props.formEncType,
            props,
            null
          ), setProp(
            domElement,
            tag,
            "formMethod",
            props.formMethod,
            props,
            null
          ), setProp(
            domElement,
            tag,
            "formTarget",
            props.formTarget,
            props,
            null
          )) : (setProp(domElement, tag, "encType", props.encType, props, null), setProp(domElement, tag, "method", props.method, props, null), setProp(domElement, tag, "target", props.target, props, null)));
        if (null == value || "symbol" === typeof value || "boolean" === typeof value) {
          domElement.removeAttribute(key);
          break;
        }
        value = sanitizeURL(value);
        domElement.setAttribute(key, value);
        break;
      case "onClick":
        null != value && (domElement.onclick = noop$1);
        return;
      case "onScroll":
        null != value && listenToNonDelegatedEvent("scroll", domElement);
        return;
      case "onScrollEnd":
        null != value && listenToNonDelegatedEvent("scrollend", domElement);
        return;
      case "dangerouslySetInnerHTML":
        if (null != value) {
          if ("object" !== typeof value || !("__html" in value))
            throw Error(formatProdErrorMessage(61));
          key = value.__html;
          if (null != key) {
            if (null != props.children) throw Error(formatProdErrorMessage(60));
            (null != prevValue ? prevValue.__html : void 0) !== key && (domElement.innerHTML = key);
          }
        }
        break;
      case "multiple":
        domElement.multiple = value && "function" !== typeof value && "symbol" !== typeof value;
        break;
      case "muted":
        domElement.muted = value && "function" !== typeof value && "symbol" !== typeof value;
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (null == value || "function" === typeof value || "boolean" === typeof value || "symbol" === typeof value) {
          domElement.removeAttribute("xlink:href");
          break;
        }
        key = sanitizeURL(value);
        domElement.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          key
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        null != value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "credentialless":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, "") : domElement.removeAttribute(key);
        break;
      case "capture":
      case "download":
        true === value ? domElement.setAttribute(key, "") : false !== value && null != value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        null != value && "function" !== typeof value && "symbol" !== typeof value && !isNaN(value) && 1 <= value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
        break;
      case "rowSpan":
      case "start":
        null == value || "function" === typeof value || "symbol" === typeof value || isNaN(value) ? domElement.removeAttribute(key) : domElement.setAttribute(key, value);
        break;
      case "popover":
        listenToNonDelegatedEvent("beforetoggle", domElement);
        listenToNonDelegatedEvent("toggle", domElement);
        setValueForAttribute(domElement, "popover", value);
        break;
      case "xlinkActuate":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          value
        );
        break;
      case "xlinkArcrole":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          value
        );
        break;
      case "xlinkRole":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          value
        );
        break;
      case "xlinkShow":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          value
        );
        break;
      case "xlinkTitle":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          value
        );
        break;
      case "xlinkType":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          value
        );
        break;
      case "xmlBase":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          value
        );
        break;
      case "xmlLang":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          value
        );
        break;
      case "xmlSpace":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          value
        );
        break;
      case "is":
        setValueForAttribute(domElement, "is", value);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < key.length) || "o" !== key[0] && "O" !== key[0] || "n" !== key[1] && "N" !== key[1])
          key = aliases.get(key) || key, setValueForAttribute(domElement, key, value);
        else return;
    }
    viewTransitionMutationContext = true;
  }
  function setPropOnCustomElement(domElement, tag, key, value, props, prevValue) {
    switch (key) {
      case "style":
        setValueForStyles(domElement, value, prevValue);
        return;
      case "dangerouslySetInnerHTML":
        if (null != value) {
          if ("object" !== typeof value || !("__html" in value))
            throw Error(formatProdErrorMessage(61));
          key = value.__html;
          if (null != key) {
            if (null != props.children) throw Error(formatProdErrorMessage(60));
            (null != prevValue ? prevValue.__html : void 0) !== key && (domElement.innerHTML = key);
          }
        }
        break;
      case "children":
        if ("string" === typeof value) setTextContent(domElement, value);
        else if ("number" === typeof value || "bigint" === typeof value)
          setTextContent(domElement, "" + value);
        else return;
        break;
      case "onScroll":
        null != value && listenToNonDelegatedEvent("scroll", domElement);
        return;
      case "onScrollEnd":
        null != value && listenToNonDelegatedEvent("scrollend", domElement);
        return;
      case "onClick":
        null != value && (domElement.onclick = noop$1);
        return;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        return;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!registrationNameDependencies.hasOwnProperty(key))
          a: {
            if ("o" === key[0] && "n" === key[1] && (props = key.endsWith("Capture"), prevValue = key.slice(2, props ? key.length - 7 : void 0), tag = domElement[internalPropsKey] || null, tag = null != tag ? tag[key] : null, "function" === typeof tag && domElement.removeEventListener(prevValue, tag, props), "function" === typeof value)) {
              "function" !== typeof tag && null !== tag && (key in domElement ? domElement[key] = null : domElement.hasAttribute(key) && domElement.removeAttribute(key));
              domElement.addEventListener(prevValue, value, props);
              break a;
            }
            viewTransitionMutationContext = true;
            key in domElement ? domElement[key] = value : true === value ? domElement.setAttribute(key, "") : setValueForAttribute(domElement, key, value);
          }
        return;
    }
    viewTransitionMutationContext = true;
  }
  function setInitialProperties(domElement, tag, props) {
    switch (tag) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        listenToNonDelegatedEvent("error", domElement);
        listenToNonDelegatedEvent("load", domElement);
        var hasSrc = false, hasSrcSet = false, propKey;
        for (propKey in props)
          if (props.hasOwnProperty(propKey)) {
            var propValue = props[propKey];
            if (null != propValue)
              switch (propKey) {
                case "src":
                  hasSrc = true;
                  break;
                case "srcSet":
                  hasSrcSet = true;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(formatProdErrorMessage(137, tag));
                default:
                  setProp(domElement, tag, propKey, propValue, props, null);
              }
          }
        hasSrcSet && setProp(domElement, tag, "srcSet", props.srcSet, props, null);
        hasSrc && setProp(domElement, tag, "src", props.src, props, null);
        return;
      case "input":
        listenToNonDelegatedEvent("invalid", domElement);
        var defaultValue = propKey = propValue = hasSrcSet = null, checked = null, defaultChecked = null;
        for (hasSrc in props)
          if (props.hasOwnProperty(hasSrc)) {
            var propValue$204 = props[hasSrc];
            if (null != propValue$204)
              switch (hasSrc) {
                case "name":
                  hasSrcSet = propValue$204;
                  break;
                case "type":
                  propValue = propValue$204;
                  break;
                case "checked":
                  checked = propValue$204;
                  break;
                case "defaultChecked":
                  defaultChecked = propValue$204;
                  break;
                case "value":
                  propKey = propValue$204;
                  break;
                case "defaultValue":
                  defaultValue = propValue$204;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (null != propValue$204)
                    throw Error(formatProdErrorMessage(137, tag));
                  break;
                default:
                  setProp(domElement, tag, hasSrc, propValue$204, props, null);
              }
          }
        initInput(
          domElement,
          propKey,
          defaultValue,
          checked,
          defaultChecked,
          propValue,
          hasSrcSet,
          false
        );
        return;
      case "select":
        listenToNonDelegatedEvent("invalid", domElement);
        hasSrc = propValue = propKey = null;
        for (hasSrcSet in props)
          if (props.hasOwnProperty(hasSrcSet) && (defaultValue = props[hasSrcSet], null != defaultValue))
            switch (hasSrcSet) {
              case "value":
                propKey = defaultValue;
                break;
              case "defaultValue":
                propValue = defaultValue;
                break;
              case "multiple":
                hasSrc = defaultValue;
              default:
                setProp(domElement, tag, hasSrcSet, defaultValue, props, null);
            }
        tag = propKey;
        props = propValue;
        domElement.multiple = !!hasSrc;
        null != tag ? updateOptions(domElement, !!hasSrc, tag, false) : null != props && updateOptions(domElement, !!hasSrc, props, true);
        return;
      case "textarea":
        listenToNonDelegatedEvent("invalid", domElement);
        propKey = hasSrcSet = hasSrc = null;
        for (propValue in props)
          if (props.hasOwnProperty(propValue) && (defaultValue = props[propValue], null != defaultValue))
            switch (propValue) {
              case "value":
                hasSrc = defaultValue;
                break;
              case "defaultValue":
                hasSrcSet = defaultValue;
                break;
              case "children":
                propKey = defaultValue;
                break;
              case "dangerouslySetInnerHTML":
                if (null != defaultValue) throw Error(formatProdErrorMessage(91));
                break;
              default:
                setProp(domElement, tag, propValue, defaultValue, props, null);
            }
        initTextarea(domElement, hasSrc, hasSrcSet, propKey);
        return;
      case "option":
        for (checked in props)
          if (props.hasOwnProperty(checked) && (hasSrc = props[checked], null != hasSrc))
            switch (checked) {
              case "selected":
                domElement.selected = hasSrc && "function" !== typeof hasSrc && "symbol" !== typeof hasSrc;
                break;
              default:
                setProp(domElement, tag, checked, hasSrc, props, null);
            }
        return;
      case "dialog":
        listenToNonDelegatedEvent("beforetoggle", domElement);
        listenToNonDelegatedEvent("toggle", domElement);
        listenToNonDelegatedEvent("cancel", domElement);
        listenToNonDelegatedEvent("close", domElement);
        break;
      case "iframe":
      case "object":
        listenToNonDelegatedEvent("load", domElement);
        break;
      case "video":
      case "audio":
        for (hasSrc = 0; hasSrc < mediaEventTypes.length; hasSrc++)
          listenToNonDelegatedEvent(mediaEventTypes[hasSrc], domElement);
        break;
      case "image":
        listenToNonDelegatedEvent("error", domElement);
        listenToNonDelegatedEvent("load", domElement);
        break;
      case "details":
        listenToNonDelegatedEvent("toggle", domElement);
        break;
      case "embed":
      case "source":
      case "link":
        listenToNonDelegatedEvent("error", domElement), listenToNonDelegatedEvent("load", domElement);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (defaultChecked in props)
          if (props.hasOwnProperty(defaultChecked) && (hasSrc = props[defaultChecked], null != hasSrc))
            switch (defaultChecked) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(formatProdErrorMessage(137, tag));
              default:
                setProp(domElement, tag, defaultChecked, hasSrc, props, null);
            }
        return;
      default:
        if (isCustomElement(tag)) {
          for (propValue$204 in props)
            props.hasOwnProperty(propValue$204) && (hasSrc = props[propValue$204], void 0 !== hasSrc && setPropOnCustomElement(
              domElement,
              tag,
              propValue$204,
              hasSrc,
              props,
              void 0
            ));
          return;
        }
    }
    for (defaultValue in props)
      props.hasOwnProperty(defaultValue) && (hasSrc = props[defaultValue], null != hasSrc && setProp(domElement, tag, defaultValue, hasSrc, props, null));
  }
  var emptyProps = {};
  function updateProperties(domElement, tag, lastProps, nextProps) {
    switch (tag) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var name = null, type = null, value = null, defaultValue = null, lastDefaultValue = null, checked = null, defaultChecked = null;
        for (propKey in lastProps) {
          var lastProp = lastProps[propKey];
          if (lastProps.hasOwnProperty(propKey) && null != lastProp)
            switch (propKey) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                lastDefaultValue = lastProp;
              default:
                nextProps.hasOwnProperty(propKey) || setProp(domElement, tag, propKey, null, nextProps, lastProp);
            }
        }
        for (var propKey$221 in nextProps) {
          var propKey = nextProps[propKey$221];
          lastProp = lastProps[propKey$221];
          if (nextProps.hasOwnProperty(propKey$221) && (null != propKey || null != lastProp))
            switch (propKey$221) {
              case "type":
                propKey !== lastProp && (viewTransitionMutationContext = true);
                type = propKey;
                break;
              case "name":
                propKey !== lastProp && (viewTransitionMutationContext = true);
                name = propKey;
                break;
              case "checked":
                propKey !== lastProp && (viewTransitionMutationContext = true);
                checked = propKey;
                break;
              case "defaultChecked":
                propKey !== lastProp && (viewTransitionMutationContext = true);
                defaultChecked = propKey;
                break;
              case "value":
                propKey !== lastProp && (viewTransitionMutationContext = true);
                value = propKey;
                break;
              case "defaultValue":
                propKey !== lastProp && (viewTransitionMutationContext = true);
                defaultValue = propKey;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (null != propKey)
                  throw Error(formatProdErrorMessage(137, tag));
                break;
              default:
                propKey !== lastProp && setProp(
                  domElement,
                  tag,
                  propKey$221,
                  propKey,
                  nextProps,
                  lastProp
                );
            }
        }
        updateInput(
          domElement,
          value,
          defaultValue,
          lastDefaultValue,
          checked,
          defaultChecked,
          type,
          name
        );
        return;
      case "select":
        propKey = value = defaultValue = propKey$221 = null;
        for (type in lastProps)
          if (lastDefaultValue = lastProps[type], lastProps.hasOwnProperty(type) && null != lastDefaultValue)
            switch (type) {
              case "value":
                break;
              case "multiple":
                propKey = lastDefaultValue;
              default:
                nextProps.hasOwnProperty(type) || setProp(
                  domElement,
                  tag,
                  type,
                  null,
                  nextProps,
                  lastDefaultValue
                );
            }
        for (name in nextProps)
          if (type = nextProps[name], lastDefaultValue = lastProps[name], nextProps.hasOwnProperty(name) && (null != type || null != lastDefaultValue))
            switch (name) {
              case "value":
                type !== lastDefaultValue && (viewTransitionMutationContext = true);
                propKey$221 = type;
                break;
              case "defaultValue":
                type !== lastDefaultValue && (viewTransitionMutationContext = true);
                defaultValue = type;
                break;
              case "multiple":
                type !== lastDefaultValue && (viewTransitionMutationContext = true), value = type;
              default:
                type !== lastDefaultValue && setProp(
                  domElement,
                  tag,
                  name,
                  type,
                  nextProps,
                  lastDefaultValue
                );
            }
        tag = defaultValue;
        lastProps = value;
        nextProps = propKey;
        null != propKey$221 ? updateOptions(domElement, !!lastProps, propKey$221, false) : !!nextProps !== !!lastProps && (null != tag ? updateOptions(domElement, !!lastProps, tag, true) : updateOptions(domElement, !!lastProps, lastProps ? [] : "", false));
        return;
      case "textarea":
        propKey = propKey$221 = null;
        for (defaultValue in lastProps)
          if (name = lastProps[defaultValue], lastProps.hasOwnProperty(defaultValue) && null != name && !nextProps.hasOwnProperty(defaultValue))
            switch (defaultValue) {
              case "value":
                break;
              case "children":
                break;
              default:
                setProp(domElement, tag, defaultValue, null, nextProps, name);
            }
        for (value in nextProps)
          if (name = nextProps[value], type = lastProps[value], nextProps.hasOwnProperty(value) && (null != name || null != type))
            switch (value) {
              case "value":
                name !== type && (viewTransitionMutationContext = true);
                propKey$221 = name;
                break;
              case "defaultValue":
                name !== type && (viewTransitionMutationContext = true);
                propKey = name;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (null != name) throw Error(formatProdErrorMessage(91));
                break;
              default:
                name !== type && setProp(domElement, tag, value, name, nextProps, type);
            }
        updateTextarea(domElement, propKey$221, propKey);
        return;
      case "option":
        for (var propKey$237 in lastProps)
          if (propKey$221 = lastProps[propKey$237], lastProps.hasOwnProperty(propKey$237) && null != propKey$221 && !nextProps.hasOwnProperty(propKey$237))
            switch (propKey$237) {
              case "selected":
                domElement.selected = false;
                break;
              default:
                setProp(
                  domElement,
                  tag,
                  propKey$237,
                  null,
                  nextProps,
                  propKey$221
                );
            }
        for (lastDefaultValue in nextProps)
          if (propKey$221 = nextProps[lastDefaultValue], propKey = lastProps[lastDefaultValue], nextProps.hasOwnProperty(lastDefaultValue) && propKey$221 !== propKey && (null != propKey$221 || null != propKey))
            switch (lastDefaultValue) {
              case "selected":
                propKey$221 !== propKey && (viewTransitionMutationContext = true);
                domElement.selected = propKey$221 && "function" !== typeof propKey$221 && "symbol" !== typeof propKey$221;
                break;
              default:
                setProp(
                  domElement,
                  tag,
                  lastDefaultValue,
                  propKey$221,
                  nextProps,
                  propKey
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var propKey$242 in lastProps)
          propKey$221 = lastProps[propKey$242], lastProps.hasOwnProperty(propKey$242) && null != propKey$221 && !nextProps.hasOwnProperty(propKey$242) && setProp(domElement, tag, propKey$242, null, nextProps, propKey$221);
        for (checked in nextProps)
          if (propKey$221 = nextProps[checked], propKey = lastProps[checked], nextProps.hasOwnProperty(checked) && propKey$221 !== propKey && (null != propKey$221 || null != propKey))
            switch (checked) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (null != propKey$221)
                  throw Error(formatProdErrorMessage(137, tag));
                break;
              default:
                setProp(
                  domElement,
                  tag,
                  checked,
                  propKey$221,
                  nextProps,
                  propKey
                );
            }
        return;
      default:
        if (isCustomElement(tag)) {
          for (var propKey$247 in lastProps)
            propKey$221 = lastProps[propKey$247], lastProps.hasOwnProperty(propKey$247) && void 0 !== propKey$221 && !nextProps.hasOwnProperty(propKey$247) && setPropOnCustomElement(
              domElement,
              tag,
              propKey$247,
              void 0,
              nextProps,
              propKey$221
            );
          for (defaultChecked in nextProps)
            propKey$221 = nextProps[defaultChecked], propKey = lastProps[defaultChecked], !nextProps.hasOwnProperty(defaultChecked) || propKey$221 === propKey || void 0 === propKey$221 && void 0 === propKey || setPropOnCustomElement(
              domElement,
              tag,
              defaultChecked,
              propKey$221,
              nextProps,
              propKey
            );
          return;
        }
    }
    for (var propKey$252 in lastProps)
      propKey$221 = lastProps[propKey$252], lastProps.hasOwnProperty(propKey$252) && null != propKey$221 && !nextProps.hasOwnProperty(propKey$252) && setProp(domElement, tag, propKey$252, null, nextProps, propKey$221);
    for (lastProp in nextProps)
      propKey$221 = nextProps[lastProp], propKey = lastProps[lastProp], !nextProps.hasOwnProperty(lastProp) || propKey$221 === propKey || null == propKey$221 && null == propKey || setProp(domElement, tag, lastProp, propKey$221, nextProps, propKey);
  }
  function isLikelyStaticResource(initiatorType) {
    switch (initiatorType) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return true;
      default:
        return false;
    }
  }
  function estimateBandwidth() {
    if ("function" === typeof performance.getEntriesByType) {
      for (var count = 0, bits = 0, resourceEntries = performance.getEntriesByType("resource"), i = 0; i < resourceEntries.length; i++) {
        var entry = resourceEntries[i], transferSize = entry.transferSize, initiatorType = entry.initiatorType, duration = entry.duration;
        if (transferSize && duration && isLikelyStaticResource(initiatorType)) {
          initiatorType = 0;
          duration = entry.responseEnd;
          for (i += 1; i < resourceEntries.length; i++) {
            var overlapEntry = resourceEntries[i], overlapStartTime = overlapEntry.startTime;
            if (overlapStartTime > duration) break;
            var overlapTransferSize = overlapEntry.transferSize, overlapInitiatorType = overlapEntry.initiatorType;
            overlapTransferSize && isLikelyStaticResource(overlapInitiatorType) && (overlapEntry = overlapEntry.responseEnd, initiatorType += overlapTransferSize * (overlapEntry < duration ? 1 : (duration - overlapStartTime) / (overlapEntry - overlapStartTime)));
          }
          --i;
          bits += 8 * (transferSize + initiatorType) / (entry.duration / 1e3);
          count++;
          if (10 < count) break;
        }
      }
      if (0 < count) return bits / count / 1e6;
    }
    return navigator.connection && (count = navigator.connection.downlink, "number" === typeof count) ? count : 5;
  }
  var eventsEnabled = null, selectionInformation = null;
  function getOwnerDocumentFromRootContainer(rootContainerElement) {
    return 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
  }
  function getOwnHostContext(namespaceURI) {
    switch (namespaceURI) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function getChildHostContextProd(parentNamespace, type) {
    if (0 === parentNamespace)
      switch (type) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return 1 === parentNamespace && "foreignObject" === type ? 0 : parentNamespace;
  }
  function createHoistableInstance(type, props, rootContainerInstance, internalInstanceHandle) {
    rootContainerInstance = getOwnerDocumentFromRootContainer(
      rootContainerInstance
    ).createElement(type);
    rootContainerInstance[internalInstanceKey] = internalInstanceHandle;
    rootContainerInstance[internalPropsKey] = props;
    setInitialProperties(rootContainerInstance, type, props);
    markNodeAsHoistable(rootContainerInstance);
    return rootContainerInstance;
  }
  function shouldSetTextContent(type, props) {
    return "textarea" === type || "noscript" === type || "string" === typeof props.children || "number" === typeof props.children || "bigint" === typeof props.children || "object" === typeof props.dangerouslySetInnerHTML && null !== props.dangerouslySetInnerHTML && null != props.dangerouslySetInnerHTML.__html;
  }
  var currentPopstateTransitionEvent = null;
  function shouldAttemptEagerTransition() {
    var event = window.event;
    if (event && "popstate" === event.type) {
      if (event === currentPopstateTransitionEvent) return false;
      currentPopstateTransitionEvent = event;
      return true;
    }
    currentPopstateTransitionEvent = null;
    return false;
  }
  var scheduleTimeout = "function" === typeof setTimeout ? setTimeout : void 0, cancelTimeout = "function" === typeof clearTimeout ? clearTimeout : void 0, localPromise = "function" === typeof Promise ? Promise : void 0, localRequestAnimationFrame = "function" === typeof requestAnimationFrame ? requestAnimationFrame : scheduleTimeout, scheduleMicrotask = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof localPromise ? function(callback) {
    return localPromise.resolve(null).then(callback).catch(handleErrorInNextTick);
  } : scheduleTimeout;
  function handleErrorInNextTick(error) {
    setTimeout(function() {
      throw error;
    });
  }
  function isSingletonScope(type) {
    return "head" === type;
  }
  function clearHydrationBoundary(parentInstance, hydrationInstance) {
    var node = hydrationInstance, depth = 0;
    do {
      var nextNode = node.nextSibling;
      parentInstance.removeChild(node);
      if (nextNode && 8 === nextNode.nodeType)
        if (node = nextNode.data, "/$" === node || "/&" === node) {
          if (0 === depth) {
            parentInstance.removeChild(nextNode);
            retryIfBlockedOn(hydrationInstance);
            return;
          }
          depth--;
        } else if ("$" === node || "$?" === node || "$~" === node || "$!" === node || "&" === node)
          depth++;
        else if ("html" === node)
          clearSingletonPreambleContribution(
            parentInstance.ownerDocument.documentElement
          );
        else if ("head" === node) {
          node = parentInstance.ownerDocument.head;
          clearSingletonPreambleContribution(node);
          for (var node$jscomp$0 = node.firstChild; node$jscomp$0; ) {
            var nextNode$jscomp$0 = node$jscomp$0.nextSibling, nodeName = node$jscomp$0.nodeName;
            node$jscomp$0[internalHoistableMarker] || "SCRIPT" === nodeName || "STYLE" === nodeName || "LINK" === nodeName && "stylesheet" === node$jscomp$0.rel.toLowerCase() || node.removeChild(node$jscomp$0);
            node$jscomp$0 = nextNode$jscomp$0;
          }
        } else
          "body" === node && clearSingletonPreambleContribution(parentInstance.ownerDocument.body);
      node = nextNode;
    } while (node);
    retryIfBlockedOn(hydrationInstance);
  }
  function hideOrUnhideDehydratedBoundary(suspenseInstance, isHidden) {
    var node = suspenseInstance;
    suspenseInstance = 0;
    do {
      var nextNode = node.nextSibling;
      1 === node.nodeType ? isHidden ? (node._stashedDisplay = node.style.display, node.style.display = "none") : (node.style.display = node._stashedDisplay || "", "" === node.getAttribute("style") && node.removeAttribute("style")) : 3 === node.nodeType && (isHidden ? (node._stashedText = node.nodeValue, node.nodeValue = "") : node.nodeValue = node._stashedText || "");
      if (nextNode && 8 === nextNode.nodeType)
        if (node = nextNode.data, "/$" === node)
          if (0 === suspenseInstance) break;
          else suspenseInstance--;
        else
          "$" !== node && "$?" !== node && "$~" !== node && "$!" !== node || suspenseInstance++;
      node = nextNode;
    } while (node);
  }
  function applyViewTransitionName(instance, name, className) {
    name = CSS.escape(name) !== name ? "r-" + btoa(name).replace(/=/g, "") : name;
    instance.style.viewTransitionName = name;
    null != className && (instance.style.viewTransitionClass = className);
    className = getComputedStyle(instance);
    if ("inline" === className.display) {
      name = instance.getClientRects();
      if (1 === name.length) var JSCompiler_inline_result = 1;
      else
        for (var i = JSCompiler_inline_result = 0; i < name.length; i++) {
          var rect = name[i];
          0 < rect.width && 0 < rect.height && JSCompiler_inline_result++;
        }
      1 === JSCompiler_inline_result && (instance = instance.style, instance.display = 1 === name.length ? "inline-block" : "block", instance.marginTop = "-" + className.paddingTop, instance.marginBottom = "-" + className.paddingBottom);
    }
  }
  function restoreViewTransitionName(instance, props) {
    instance = instance.style;
    props = props.style;
    var viewTransitionName = null != props ? props.hasOwnProperty("viewTransitionName") ? props.viewTransitionName : props.hasOwnProperty("view-transition-name") ? props["view-transition-name"] : null : null;
    instance.viewTransitionName = null == viewTransitionName || "boolean" === typeof viewTransitionName ? "" : ("" + viewTransitionName).trim();
    viewTransitionName = null != props ? props.hasOwnProperty("viewTransitionClass") ? props.viewTransitionClass : props.hasOwnProperty("view-transition-class") ? props["view-transition-class"] : null : null;
    instance.viewTransitionClass = null == viewTransitionName || "boolean" === typeof viewTransitionName ? "" : ("" + viewTransitionName).trim();
    "inline-block" === instance.display && (null == props ? instance.display = instance.margin = "" : (viewTransitionName = props.display, instance.display = null == viewTransitionName || "boolean" === typeof viewTransitionName ? "" : viewTransitionName, viewTransitionName = props.margin, null != viewTransitionName ? instance.margin = viewTransitionName : (viewTransitionName = props.hasOwnProperty("marginTop") ? props.marginTop : props["margin-top"], instance.marginTop = null == viewTransitionName || "boolean" === typeof viewTransitionName ? "" : viewTransitionName, props = props.hasOwnProperty("marginBottom") ? props.marginBottom : props["margin-bottom"], instance.marginBottom = null == props || "boolean" === typeof props ? "" : props)));
  }
  function createMeasurement(rect, computedStyle, element) {
    element = element.ownerDocument.defaultView;
    return {
      rect,
      abs: "absolute" === computedStyle.position || "fixed" === computedStyle.position,
      clip: "none" !== computedStyle.clipPath || "visible" !== computedStyle.overflow || "none" !== computedStyle.filter || "none" !== computedStyle.mask || "none" !== computedStyle.mask || "0px" !== computedStyle.borderRadius,
      view: 0 <= rect.bottom && 0 <= rect.right && rect.top <= element.innerHeight && rect.left <= element.innerWidth
    };
  }
  function measureInstance(instance) {
    var rect = instance.getBoundingClientRect(), computedStyle = getComputedStyle(instance);
    return createMeasurement(rect, computedStyle, instance);
  }
  function forceLayout(ownerDocument) {
    return ownerDocument.documentElement.clientHeight;
  }
  function waitForImageToLoad(resolve) {
    this.addEventListener("load", resolve);
    this.addEventListener("error", resolve);
  }
  function startViewTransition(suspendedState, rootContainer, transitionTypes, mutationCallback, layoutCallback, afterMutationCallback, spawnedWorkCallback, passiveCallback, errorCallback) {
    var ownerDocument = 9 === rootContainer.nodeType ? rootContainer : rootContainer.ownerDocument;
    try {
      var transition = ownerDocument.startViewTransition({
        update: function() {
          var ownerWindow = ownerDocument.defaultView, pendingNavigation = ownerWindow.navigation && ownerWindow.navigation.transition, previousFontLoadingStatus = ownerDocument.fonts.status;
          mutationCallback();
          var blockingPromises = [];
          "loaded" === previousFontLoadingStatus && (forceLayout(ownerDocument), "loading" === ownerDocument.fonts.status && blockingPromises.push(ownerDocument.fonts.ready));
          previousFontLoadingStatus = blockingPromises.length;
          if (null !== suspendedState)
            for (var suspenseyImages = suspendedState.suspenseyImages, imgBytes = 0, i = 0; i < suspenseyImages.length; i++) {
              var suspenseyImage = suspenseyImages[i];
              if (!suspenseyImage.complete) {
                var rect = suspenseyImage.getBoundingClientRect();
                if (0 < rect.bottom && 0 < rect.right && rect.top < ownerWindow.innerHeight && rect.left < ownerWindow.innerWidth) {
                  imgBytes += estimateImageBytes(suspenseyImage);
                  if (imgBytes > estimatedBytesWithinLimit) {
                    blockingPromises.length = previousFontLoadingStatus;
                    break;
                  }
                  suspenseyImage = new Promise(
                    waitForImageToLoad.bind(suspenseyImage)
                  );
                  blockingPromises.push(suspenseyImage);
                }
              }
            }
          if (0 < blockingPromises.length)
            return ownerWindow = Promise.race([
              Promise.all(blockingPromises),
              new Promise(function(resolve) {
                return setTimeout(resolve, 500);
              })
            ]).then(layoutCallback, layoutCallback), (pendingNavigation ? Promise.allSettled([pendingNavigation.finished, ownerWindow]) : ownerWindow).then(afterMutationCallback, afterMutationCallback);
          layoutCallback();
          if (pendingNavigation)
            return pendingNavigation.finished.then(
              afterMutationCallback,
              afterMutationCallback
            );
          afterMutationCallback();
        },
        types: transitionTypes
      });
      ownerDocument.__reactViewTransition = transition;
      var viewTransitionAnimations = [];
      transition.ready.then(
        function() {
          for (var animations = ownerDocument.documentElement.getAnimations({
            subtree: true
          }), i = 0; i < animations.length; i++) {
            var animation = animations[i], effect = animation.effect, pseudoElement = effect.pseudoElement;
            if (null != pseudoElement && pseudoElement.startsWith("::view-transition")) {
              viewTransitionAnimations.push(animation);
              animation = effect.getKeyframes();
              for (var height = pseudoElement = void 0, unchangedDimensions = true, j = 0; j < animation.length; j++) {
                var keyframe = animation[j], w = keyframe.width;
                if (void 0 === pseudoElement) pseudoElement = w;
                else if (pseudoElement !== w) {
                  unchangedDimensions = false;
                  break;
                }
                w = keyframe.height;
                if (void 0 === height) height = w;
                else if (height !== w) {
                  unchangedDimensions = false;
                  break;
                }
                delete keyframe.width;
                delete keyframe.height;
                "none" === keyframe.transform && delete keyframe.transform;
              }
              unchangedDimensions && void 0 !== pseudoElement && void 0 !== height && (effect.setKeyframes(animation), unchangedDimensions = getComputedStyle(
                effect.target,
                effect.pseudoElement
              ), unchangedDimensions.width !== pseudoElement || unchangedDimensions.height !== height) && (unchangedDimensions = animation[0], unchangedDimensions.width = pseudoElement, unchangedDimensions.height = height, unchangedDimensions = animation[animation.length - 1], unchangedDimensions.width = pseudoElement, unchangedDimensions.height = height, effect.setKeyframes(animation));
            }
          }
          spawnedWorkCallback();
        },
        function(error) {
          ownerDocument.__reactViewTransition === transition && (ownerDocument.__reactViewTransition = null);
          try {
            if ("object" === typeof error && null !== error)
              switch (error.name) {
                case "InvalidStateError":
                  if ("View transition was skipped because document visibility state is hidden." === error.message || "Skipping view transition because document visibility state has become hidden." === error.message || "Skipping view transition because viewport size changed." === error.message || "Transition was aborted because of invalid state" === error.message)
                    error = null;
              }
            null !== error && errorCallback(error);
          } finally {
            mutationCallback(), layoutCallback(), spawnedWorkCallback();
          }
        }
      );
      transition.finished.finally(function() {
        for (var i = 0; i < viewTransitionAnimations.length; i++)
          viewTransitionAnimations[i].cancel();
        ownerDocument.__reactViewTransition === transition && (ownerDocument.__reactViewTransition = null);
        passiveCallback();
      });
      return transition;
    } catch (x) {
      return mutationCallback(), layoutCallback(), spawnedWorkCallback(), null;
    }
  }
  function ViewTransitionPseudoElement(pseudo, name) {
    this._scope = document.documentElement;
    this._selector = "::view-transition-" + pseudo + "(" + name + ")";
  }
  ViewTransitionPseudoElement.prototype.animate = function(keyframes, options2) {
    options2 = "number" === typeof options2 ? { duration: options2 } : assign({}, options2);
    options2.pseudoElement = this._selector;
    return this._scope.animate(keyframes, options2);
  };
  ViewTransitionPseudoElement.prototype.getAnimations = function() {
    for (var scope = this._scope, selector = this._selector, animations = scope.getAnimations({ subtree: true }), result = [], i = 0; i < animations.length; i++) {
      var effect = animations[i].effect;
      null !== effect && effect.target === scope && effect.pseudoElement === selector && result.push(animations[i]);
    }
    return result;
  };
  ViewTransitionPseudoElement.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function createViewTransitionInstance(name) {
    return {
      name,
      group: new ViewTransitionPseudoElement("group", name),
      imagePair: new ViewTransitionPseudoElement("image-pair", name),
      old: new ViewTransitionPseudoElement("old", name),
      new: new ViewTransitionPseudoElement("new", name)
    };
  }
  function FragmentInstance(fragmentFiber) {
    this._fragmentFiber = fragmentFiber;
    this._observers = this._eventListeners = null;
  }
  FragmentInstance.prototype.addEventListener = function(type, listener, optionsOrUseCapture) {
    var signal = null, cleanup = null;
    if (null != optionsOrUseCapture && "boolean" !== typeof optionsOrUseCapture && (signal = optionsOrUseCapture.signal || null, null !== signal && signal.aborted))
      return;
    null === this._eventListeners && (this._eventListeners = []);
    var listeners = this._eventListeners;
    if (-1 === indexOfEventListener(listeners, type, listener, optionsOrUseCapture)) {
      var fragmentInstance = this, attachedListener = listener;
      null != optionsOrUseCapture && "boolean" !== typeof optionsOrUseCapture && true === optionsOrUseCapture.once && (attachedListener = function(event) {
        fragmentInstance.removeEventListener(
          type,
          listener,
          optionsOrUseCapture
        );
        "function" === typeof listener ? listener.call(this, event) : listener.handleEvent(event);
      });
      null !== signal && (cleanup = fragmentInstance.removeEventListener.bind(
        fragmentInstance,
        type,
        listener,
        optionsOrUseCapture
      ), signal.addEventListener("abort", cleanup, { once: true }), cleanup = signal.removeEventListener.bind(signal, "abort", cleanup));
      signal = getAttachOptions(optionsOrUseCapture);
      listeners.push({
        type,
        listener,
        optionsOrUseCapture,
        attachedListener,
        cleanup
      });
      traverseVisibleInstancesAndTextInstances(
        this._fragmentFiber.child,
        false,
        addEventListenerToChild,
        type,
        attachedListener,
        signal
      );
    }
    this._eventListeners = listeners;
  };
  function addEventListenerToChild(child, type, listener, optionsOrUseCapture) {
    getInstanceFromHostFiber(child).addEventListener(
      type,
      listener,
      optionsOrUseCapture
    );
    return false;
  }
  FragmentInstance.prototype.removeEventListener = function(type, listener, optionsOrUseCapture) {
    var listeners = this._eventListeners;
    if (null !== listeners && (listener = indexOfEventListener(
      listeners,
      type,
      listener,
      optionsOrUseCapture
    ), -1 !== listener)) {
      var _listeners$index = listeners[listener];
      optionsOrUseCapture = _listeners$index.attachedListener;
      var cleanup = _listeners$index.cleanup;
      _listeners$index = getAttachOptions(_listeners$index.optionsOrUseCapture);
      traverseVisibleInstancesAndTextInstances(
        this._fragmentFiber.child,
        false,
        removeEventListenerFromChild,
        type,
        optionsOrUseCapture,
        _listeners$index
      );
      listeners.splice(listener, 1);
      null !== cleanup && cleanup();
    }
  };
  function removeEventListenerFromChild(child, type, listener, optionsOrUseCapture) {
    getInstanceFromHostFiber(child).removeEventListener(
      type,
      listener,
      optionsOrUseCapture
    );
    return false;
  }
  function getAttachOptions(opts) {
    return null != opts && "boolean" !== typeof opts && (true === opts.once || opts.signal instanceof AbortSignal) ? { capture: opts.capture, passive: opts.passive } : opts;
  }
  function normalizeListenerOptions(opts) {
    return null == opts ? "c=0" : "boolean" === typeof opts ? "c=" + (opts ? "1" : "0") : "c=" + (opts.capture ? "1" : "0");
  }
  function indexOfEventListener(eventListeners, type, listener, optionsOrUseCapture) {
    if (0 === eventListeners.length) return -1;
    optionsOrUseCapture = normalizeListenerOptions(optionsOrUseCapture);
    for (var i = 0; i < eventListeners.length; i++) {
      var item = eventListeners[i];
      if (item.type === type && item.listener === listener && normalizeListenerOptions(item.optionsOrUseCapture) === optionsOrUseCapture)
        return i;
    }
    return -1;
  }
  FragmentInstance.prototype.dispatchEvent = function(event) {
    var parentHostFiber = getFragmentParentInstanceOrContainerFiber(
      this._fragmentFiber
    );
    if (null === parentHostFiber) return true;
    parentHostFiber = getInstanceFromHostFiber(parentHostFiber);
    var eventListeners = this._eventListeners;
    if (null !== eventListeners && 0 < eventListeners.length || !event.bubbles) {
      var temp = 9 === parentHostFiber.nodeType ? parentHostFiber.createComment("") : document.createTextNode("");
      if (eventListeners)
        for (var i = 0; i < eventListeners.length; i++) {
          var _eventListeners$i = eventListeners[i];
          temp.addEventListener(
            _eventListeners$i.type,
            _eventListeners$i.attachedListener,
            getAttachOptions(_eventListeners$i.optionsOrUseCapture)
          );
        }
      parentHostFiber.appendChild(temp);
      event = temp.dispatchEvent(event);
      if (eventListeners)
        for (i = 0; i < eventListeners.length; i++)
          _eventListeners$i = eventListeners[i], temp.removeEventListener(
            _eventListeners$i.type,
            _eventListeners$i.attachedListener,
            getAttachOptions(_eventListeners$i.optionsOrUseCapture)
          );
      parentHostFiber.removeChild(temp);
      return event;
    }
    return parentHostFiber.dispatchEvent(event);
  };
  FragmentInstance.prototype.focus = function(focusOptions) {
    traverseVisibleInstancesAndTextInstances(
      this._fragmentFiber.child,
      true,
      setFocusOnFiberIfFocusable,
      focusOptions,
      void 0,
      void 0
    );
  };
  function setFocusOnFiberIfFocusable(fiber, focusOptions) {
    if (6 === fiber.tag) return false;
    fiber = getInstanceFromHostFiber(fiber);
    return setFocusIfFocusable(fiber, focusOptions);
  }
  FragmentInstance.prototype.focusLast = function(focusOptions) {
    var children = [];
    traverseVisibleInstancesAndTextInstances(
      this._fragmentFiber.child,
      true,
      collectChildren,
      children,
      void 0,
      void 0
    );
    for (var i = children.length - 1; 0 <= i && !setFocusOnFiberIfFocusable(children[i], focusOptions); i--) ;
  };
  function collectChildren(child, collection) {
    collection.push(child);
    return false;
  }
  FragmentInstance.prototype.blur = function() {
    var parentHostFiber = getFragmentParentInstanceOrContainerFiber(
      this._fragmentFiber
    );
    null !== parentHostFiber && (parentHostFiber = getInstanceFromHostFiber(parentHostFiber), parentHostFiber = getOwnerDocumentFromRootContainer(parentHostFiber).activeElement, null !== parentHostFiber && traverseVisibleInstancesAndTextInstances(
      this._fragmentFiber.child,
      false,
      blurActiveElementWithinFragment,
      parentHostFiber,
      void 0,
      void 0
    ));
  };
  function blurActiveElementWithinFragment(child, activeElement2) {
    if (6 === child.tag) return false;
    child = getInstanceFromHostFiber(child);
    return child === activeElement2 || child.contains(activeElement2) ? (activeElement2.blur(), true) : false;
  }
  FragmentInstance.prototype.observeUsing = function(observer) {
    null === this._observers && (this._observers = /* @__PURE__ */ new Set());
    this._observers.add(observer);
    traverseVisibleInstancesAndTextInstances(
      this._fragmentFiber.child,
      false,
      observeChild,
      observer,
      void 0,
      void 0
    );
  };
  function observeChild(child, observer) {
    if (6 === child.tag) return false;
    child = getInstanceFromHostFiber(child);
    observer.observe(child);
    return false;
  }
  FragmentInstance.prototype.unobserveUsing = function(observer) {
    var observers = this._observers;
    if (null !== observers && observers.has(observer)) {
      observers.delete(observer);
      traverseVisibleInstancesAndTextInstances(
        this._fragmentFiber.child,
        false,
        unobserveChild,
        observer,
        void 0,
        void 0
      );
      for (var i = observers = 0; i < pendingIntersectionUnobserves.length; i++) {
        var pending = pendingIntersectionUnobserves[i];
        pending.fragmentInstance === this && pending.observer === observer ? observer.unobserve(pending.instance) : pendingIntersectionUnobserves[observers++] = pending;
      }
      pendingIntersectionUnobserves.length = observers;
    }
  };
  function unobserveChild(child, observer) {
    if (6 === child.tag) return false;
    child = getInstanceFromHostFiber(child);
    observer.unobserve(child);
    return false;
  }
  var pendingIntersectionUnobserves = [], intersectionUnobserveScheduled = false;
  function schedulePendingIntersectionUnobserve(fragmentInstance, observer, instance) {
    pendingIntersectionUnobserves.push({
      fragmentInstance,
      observer,
      instance
    });
    intersectionUnobserveScheduled || (intersectionUnobserveScheduled = true, requestPostPaintCallback(function() {
      intersectionUnobserveScheduled = false;
      var pending = pendingIntersectionUnobserves;
      pendingIntersectionUnobserves = [];
      for (var i = 0; i < pending.length; i++) {
        var item = pending[i];
        item.observer.unobserve(item.instance);
      }
    }));
  }
  FragmentInstance.prototype.getClientRects = function() {
    var rects = [];
    traverseVisibleInstancesAndTextInstances(
      this._fragmentFiber.child,
      false,
      collectClientRects,
      rects,
      void 0,
      void 0
    );
    return rects;
  };
  function collectClientRects(child, rects) {
    if (6 === child.tag) {
      child = child.stateNode;
      var range = child.ownerDocument.createRange();
      range.selectNodeContents(child);
      rects.push.apply(rects, range.getClientRects());
    } else
      child = getInstanceFromHostFiber(child), rects.push.apply(rects, child.getClientRects());
    return false;
  }
  FragmentInstance.prototype.getRootNode = function(getRootNodeOptions) {
    var parentHostFiber = getFragmentParentInstanceOrContainerFiber(
      this._fragmentFiber
    );
    return null === parentHostFiber ? this : getInstanceFromHostFiber(parentHostFiber).getRootNode(getRootNodeOptions);
  };
  FragmentInstance.prototype.compareDocumentPosition = function(otherNode) {
    var parentHostFiber = getFragmentParentInstanceOrContainerFiber(
      this._fragmentFiber
    );
    if (null === parentHostFiber) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var children = [];
    traverseVisibleInstancesAndTextInstances(
      this._fragmentFiber.child,
      false,
      collectChildren,
      children,
      void 0,
      void 0
    );
    var parentHostInstance = getInstanceFromHostFiber(parentHostFiber);
    if (0 === children.length) {
      children = parentHostInstance;
      if (fiberIsPortaledIntoHost(this._fragmentFiber)) {
        a: {
          for (parentHostFiber = this._fragmentFiber.return; null !== parentHostFiber; ) {
            if (4 === parentHostFiber.tag) {
              parentHostFiber = parentHostFiber.stateNode.containerInfo;
              break a;
            }
            if (3 === parentHostFiber.tag || 5 === parentHostFiber.tag || 27 === parentHostFiber.tag)
              break;
            parentHostFiber = parentHostFiber.return;
          }
          parentHostFiber = null;
        }
        null != parentHostFiber && (children = parentHostFiber);
      }
      parentHostFiber = this._fragmentFiber;
      var result = parentHostInstance = children.compareDocumentPosition(otherNode);
      children === otherNode ? result = Node.DOCUMENT_POSITION_CONTAINS : parentHostInstance & Node.DOCUMENT_POSITION_CONTAINED_BY && (children = getFragmentInstanceOrTextInstanceSiblings(parentHostFiber)[1], null === children ? result = Node.DOCUMENT_POSITION_PRECEDING : (otherNode = getInstanceFromHostFiber(children).compareDocumentPosition(
        otherNode
      ), result = 0 === otherNode || otherNode & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING));
      return result |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    parentHostFiber = getInstanceFromHostFiber(children[0]);
    result = getInstanceFromHostFiber(children[children.length - 1]);
    var parentHostInstanceFromDOM = fiberIsPortaledIntoHost(this._fragmentFiber) ? parentHostFiber.parentElement : parentHostInstance;
    if (null == parentHostInstanceFromDOM)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    parentHostInstance = parentHostInstanceFromDOM.compareDocumentPosition(parentHostFiber) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    parentHostInstanceFromDOM = parentHostInstanceFromDOM.compareDocumentPosition(result) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var firstResult = parentHostFiber.compareDocumentPosition(otherNode), lastResult = result.compareDocumentPosition(otherNode), otherNodeIsWithinFirstOrLastChild = firstResult & Node.DOCUMENT_POSITION_CONTAINED_BY || lastResult & Node.DOCUMENT_POSITION_CONTAINED_BY;
    lastResult = parentHostInstance && parentHostInstanceFromDOM && firstResult & Node.DOCUMENT_POSITION_FOLLOWING && lastResult & Node.DOCUMENT_POSITION_PRECEDING;
    parentHostFiber = parentHostInstance && parentHostFiber === otherNode || parentHostInstanceFromDOM && result === otherNode || otherNodeIsWithinFirstOrLastChild || lastResult ? Node.DOCUMENT_POSITION_CONTAINED_BY : !parentHostInstance && parentHostFiber === otherNode || !parentHostInstanceFromDOM && result === otherNode ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : firstResult;
    return parentHostFiber & Node.DOCUMENT_POSITION_DISCONNECTED || parentHostFiber & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || validateDocumentPositionWithFiberTree(
      parentHostFiber,
      this._fragmentFiber,
      children[0],
      children[children.length - 1],
      otherNode
    ) ? parentHostFiber : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function validateDocumentPositionWithFiberTree(documentPosition, fragmentFiber, precedingBoundaryFiber, followingBoundaryFiber, otherNode) {
    var otherFiber = getClosestInstanceFromNode(otherNode);
    if (documentPosition & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (precedingBoundaryFiber = !!otherFiber)
        a: {
          for (; null !== otherFiber; ) {
            if (7 === otherFiber.tag && (otherFiber === fragmentFiber || otherFiber.alternate === fragmentFiber)) {
              precedingBoundaryFiber = true;
              break a;
            }
            otherFiber = otherFiber.return;
          }
          precedingBoundaryFiber = false;
        }
      return precedingBoundaryFiber;
    }
    if (documentPosition & Node.DOCUMENT_POSITION_CONTAINS) {
      if (null === otherFiber)
        return otherFiber = otherNode.ownerDocument, otherNode === otherFiber || otherNode === otherFiber.documentElement || otherNode === otherFiber.body;
      a: {
        otherFiber = fragmentFiber;
        for (fragmentFiber = getFragmentParentInstanceOrContainerFiber(fragmentFiber); null !== otherFiber; ) {
          if (!(5 !== otherFiber.tag && 3 !== otherFiber.tag && 27 !== otherFiber.tag || otherFiber !== fragmentFiber && otherFiber.alternate !== fragmentFiber)) {
            otherFiber = true;
            break a;
          }
          otherFiber = otherFiber.return;
        }
        otherFiber = false;
      }
      return otherFiber;
    }
    return documentPosition & Node.DOCUMENT_POSITION_PRECEDING ? ((fragmentFiber = !!otherFiber) && !(fragmentFiber = otherFiber === precedingBoundaryFiber) && (fragmentFiber = getLowestCommonAncestor(
      precedingBoundaryFiber,
      otherFiber,
      getParentForFragmentAncestors
    ), null === fragmentFiber ? fragmentFiber = false : (traverseVisibleInstancesAndTextInstances(
      fragmentFiber,
      true,
      isFiberPrecedingCheck,
      otherFiber,
      precedingBoundaryFiber
    ), otherFiber = searchTarget, searchTarget = null, fragmentFiber = null !== otherFiber)), fragmentFiber) : documentPosition & Node.DOCUMENT_POSITION_FOLLOWING ? ((fragmentFiber = !!otherFiber) && !(fragmentFiber = otherFiber === followingBoundaryFiber) && (fragmentFiber = getLowestCommonAncestor(
      followingBoundaryFiber,
      otherFiber,
      getParentForFragmentAncestors
    ), null === fragmentFiber ? fragmentFiber = false : (traverseVisibleInstancesAndTextInstances(
      fragmentFiber,
      true,
      isFiberFollowingCheck,
      otherFiber,
      followingBoundaryFiber
    ), otherFiber = searchTarget, searchBoundary = searchTarget = null, fragmentFiber = null !== otherFiber)), fragmentFiber) : false;
  }
  function scrollTextNodeIntoView(textNode, resolvedAlignToTop) {
    var range = textNode.ownerDocument.createRange();
    range.selectNodeContents(textNode);
    textNode = range.getBoundingClientRect();
    window.scrollTo(
      window.scrollX + textNode.left,
      resolvedAlignToTop ? window.scrollY + textNode.top : window.scrollY + textNode.bottom - window.innerHeight
    );
  }
  FragmentInstance.prototype.scrollIntoView = function(alignToTop) {
    if ("object" === typeof alignToTop) throw Error(formatProdErrorMessage(566));
    var children = [];
    traverseVisibleInstancesAndTextInstances(
      this._fragmentFiber.child,
      false,
      collectChildren,
      children,
      void 0,
      void 0
    );
    var resolvedAlignToTop = false !== alignToTop;
    if (0 === children.length) {
      var hostSiblings = getFragmentInstanceOrTextInstanceSiblings(
        this._fragmentFiber
      );
      hostSiblings = resolvedAlignToTop ? hostSiblings[1] || hostSiblings[0] || getFragmentParentInstanceOrContainerFiber(this._fragmentFiber) : hostSiblings[0] || hostSiblings[1];
      if (null === hostSiblings) return;
      if (6 === hostSiblings.tag) {
        alignToTop = getInstanceFromHostFiber(hostSiblings);
        scrollTextNodeIntoView(alignToTop, resolvedAlignToTop);
        return;
      }
      hostSiblings = getInstanceFromHostFiber(hostSiblings);
      if (9 !== hostSiblings.nodeType) {
        if (11 === hostSiblings.nodeType) {
          resolvedAlignToTop = "host" in hostSiblings ? hostSiblings.host : null;
          null !== resolvedAlignToTop && resolvedAlignToTop.scrollIntoView(alignToTop);
          return;
        }
        hostSiblings.scrollIntoView(alignToTop);
      }
    }
    for (hostSiblings = resolvedAlignToTop ? children.length - 1 : 0; hostSiblings !== (resolvedAlignToTop ? -1 : children.length); ) {
      var child = children[hostSiblings];
      6 === child.tag ? (child = getInstanceFromHostFiber(child), scrollTextNodeIntoView(child, resolvedAlignToTop)) : getInstanceFromHostFiber(child).scrollIntoView(alignToTop);
      hostSiblings += resolvedAlignToTop ? -1 : 1;
    }
  };
  function addFragmentHandleToFiber(child, fragmentInstance) {
    child = getInstanceFromHostFiber(child);
    addFragmentHandleToInstance(child, fragmentInstance);
    return false;
  }
  function addFragmentHandleToInstance(instance, fragmentInstance) {
    null == instance.reactFragments && (instance.reactFragments = /* @__PURE__ */ new Set());
    instance.reactFragments.add(fragmentInstance);
  }
  function commitNewChildToFragmentInstance(childInstance, fragmentInstance) {
    var eventListeners = fragmentInstance._eventListeners;
    if (null !== eventListeners)
      for (var i$jscomp$0 = 0; i$jscomp$0 < eventListeners.length; i$jscomp$0++) {
        var _eventListeners$i3 = eventListeners[i$jscomp$0];
        childInstance.addEventListener(
          _eventListeners$i3.type,
          _eventListeners$i3.attachedListener,
          getAttachOptions(_eventListeners$i3.optionsOrUseCapture)
        );
      }
    3 !== childInstance.nodeType && (eventListeners = fragmentInstance._observers, null !== eventListeners && eventListeners.forEach(function(observer) {
      for (var writeIdx = 0, i = 0; i < pendingIntersectionUnobserves.length; i++) {
        var pending = pendingIntersectionUnobserves[i];
        if (pending.fragmentInstance !== fragmentInstance || pending.observer !== observer || pending.instance !== childInstance)
          pendingIntersectionUnobserves[writeIdx++] = pending;
      }
      pendingIntersectionUnobserves.length = writeIdx;
      observer.observe(childInstance);
    }), addFragmentHandleToInstance(childInstance, fragmentInstance));
  }
  function deleteChildFromFragmentInstance(childInstance, fragmentInstance) {
    var eventListeners = fragmentInstance._eventListeners;
    if (null !== eventListeners)
      for (var i = 0; i < eventListeners.length; i++) {
        var _eventListeners$i4 = eventListeners[i];
        childInstance.removeEventListener(
          _eventListeners$i4.type,
          _eventListeners$i4.attachedListener,
          getAttachOptions(_eventListeners$i4.optionsOrUseCapture)
        );
      }
    3 !== childInstance.nodeType && (eventListeners = fragmentInstance._observers, null !== eventListeners && eventListeners.forEach(function(observer) {
      "string" === typeof observer.rootMargin ? schedulePendingIntersectionUnobserve(
        fragmentInstance,
        observer,
        childInstance
      ) : observer.unobserve(childInstance);
    }), null != childInstance.reactFragments && childInstance.reactFragments.delete(fragmentInstance));
  }
  function clearContainerSparingly(container) {
    var nextNode = container.firstChild;
    nextNode && 10 === nextNode.nodeType && (nextNode = nextNode.nextSibling);
    for (; nextNode; ) {
      var node = nextNode;
      nextNode = nextNode.nextSibling;
      switch (node.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          clearContainerSparingly(node);
          detachDeletedInstance(node);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if ("stylesheet" === node.rel.toLowerCase()) continue;
      }
      container.removeChild(node);
    }
  }
  function canHydrateInstance(instance, type, props, inRootOrSingleton) {
    for (; 1 === instance.nodeType; ) {
      var anyProps = props;
      if (instance.nodeName.toLowerCase() !== type.toLowerCase()) {
        if (!inRootOrSingleton && ("INPUT" !== instance.nodeName || "hidden" !== instance.type))
          break;
      } else if (!inRootOrSingleton)
        if ("input" === type && "hidden" === instance.type) {
          var name = null == anyProps.name ? null : "" + anyProps.name;
          if ("hidden" === anyProps.type && instance.getAttribute("name") === name)
            return instance;
        } else return instance;
      else if (!instance[internalHoistableMarker])
        switch (type) {
          case "meta":
            if (!instance.hasAttribute("itemprop")) break;
            return instance;
          case "link":
            name = instance.getAttribute("rel");
            if ("stylesheet" === name && instance.hasAttribute("data-precedence"))
              break;
            else if (name !== anyProps.rel || instance.getAttribute("href") !== (null == anyProps.href || "" === anyProps.href ? null : anyProps.href) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin) || instance.getAttribute("title") !== (null == anyProps.title ? null : anyProps.title))
              break;
            return instance;
          case "style":
            if (instance.hasAttribute("data-precedence")) break;
            return instance;
          case "script":
            name = instance.getAttribute("src");
            if ((name !== (null == anyProps.src ? null : anyProps.src) || instance.getAttribute("type") !== (null == anyProps.type ? null : anyProps.type) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin)) && name && instance.hasAttribute("async") && !instance.hasAttribute("itemprop"))
              break;
            return instance;
          default:
            return instance;
        }
      instance = getNextHydratable(instance.nextSibling);
      if (null === instance) break;
    }
    return null;
  }
  function canHydrateTextInstance(instance, text, inRootOrSingleton) {
    if ("" === text) return null;
    for (; 3 !== instance.nodeType; ) {
      if ((1 !== instance.nodeType || "INPUT" !== instance.nodeName || "hidden" !== instance.type) && !inRootOrSingleton)
        return null;
      instance = getNextHydratable(instance.nextSibling);
      if (null === instance) return null;
    }
    return instance;
  }
  function canHydrateHydrationBoundary(instance, inRootOrSingleton) {
    for (; 8 !== instance.nodeType; ) {
      if ((1 !== instance.nodeType || "INPUT" !== instance.nodeName || "hidden" !== instance.type) && !inRootOrSingleton)
        return null;
      instance = getNextHydratable(instance.nextSibling);
      if (null === instance) return null;
    }
    return instance;
  }
  function isSuspenseInstancePending(instance) {
    return "$?" === instance.data || "$~" === instance.data;
  }
  function isSuspenseInstanceFallback(instance) {
    return "$!" === instance.data || "$?" === instance.data && "loading" !== instance.ownerDocument.readyState;
  }
  function registerSuspenseInstanceRetry(instance, callback) {
    var ownerDocument = instance.ownerDocument;
    if ("$~" === instance.data) instance._reactRetry = callback;
    else if ("$?" !== instance.data || "loading" !== ownerDocument.readyState)
      callback();
    else {
      var listener = function() {
        callback();
        ownerDocument.removeEventListener("DOMContentLoaded", listener);
      };
      ownerDocument.addEventListener("DOMContentLoaded", listener);
      instance._reactRetry = listener;
    }
  }
  function getNextHydratable(node) {
    for (; null != node; node = node.nextSibling) {
      var nodeType = node.nodeType;
      if (1 === nodeType || 3 === nodeType) break;
      if (8 === nodeType) {
        nodeType = node.data;
        if ("$" === nodeType || "$!" === nodeType || "$?" === nodeType || "$~" === nodeType || "&" === nodeType || "F!" === nodeType || "F" === nodeType)
          break;
        if ("/$" === nodeType || "/&" === nodeType) return null;
      }
    }
    return node;
  }
  var previousHydratableOnEnteringScopedSingleton = null;
  function getNextHydratableInstanceAfterHydrationBoundary(hydrationInstance) {
    hydrationInstance = hydrationInstance.nextSibling;
    for (var depth = 0; hydrationInstance; ) {
      if (8 === hydrationInstance.nodeType) {
        var data = hydrationInstance.data;
        if ("/$" === data || "/&" === data) {
          if (0 === depth)
            return getNextHydratable(hydrationInstance.nextSibling);
          depth--;
        } else
          "$" !== data && "$!" !== data && "$?" !== data && "$~" !== data && "&" !== data || depth++;
      }
      hydrationInstance = hydrationInstance.nextSibling;
    }
    return null;
  }
  function getParentHydrationBoundary(targetInstance) {
    targetInstance = targetInstance.previousSibling;
    for (var depth = 0; targetInstance; ) {
      if (8 === targetInstance.nodeType) {
        var data = targetInstance.data;
        if ("$" === data || "$!" === data || "$?" === data || "$~" === data || "&" === data) {
          if (0 === depth) return targetInstance;
          depth--;
        } else "/$" !== data && "/&" !== data || depth++;
      }
      targetInstance = targetInstance.previousSibling;
    }
    return null;
  }
  function setFocusIfFocusable(node, focusOptions) {
    function handleFocus() {
      didFocus = true;
    }
    if (node.ownerDocument.activeElement === node) return true;
    var didFocus = false;
    try {
      node.ownerDocument.addEventListener("focus", handleFocus, true), (node.focus || HTMLElement.prototype.focus).call(node, focusOptions);
    } finally {
      node.ownerDocument.removeEventListener("focus", handleFocus, true);
    }
    return didFocus;
  }
  function requestPostPaintCallback(callback) {
    localRequestAnimationFrame(function() {
      localRequestAnimationFrame(function(time) {
        return callback(time);
      });
    });
  }
  function resolveSingletonInstance(type, props, rootContainerInstance) {
    props = getOwnerDocumentFromRootContainer(rootContainerInstance);
    switch (type) {
      case "html":
        type = props.documentElement;
        if (!type) throw Error(formatProdErrorMessage(452));
        return type;
      case "head":
        type = props.head;
        if (!type) throw Error(formatProdErrorMessage(453));
        return type;
      case "body":
        type = props.body;
        if (!type) throw Error(formatProdErrorMessage(454));
        return type;
      default:
        throw Error(formatProdErrorMessage(451));
    }
  }
  function releaseSingletonInstance(instance, type, props) {
    for (var propKey in props) {
      var propValue = props[propKey];
      props.hasOwnProperty(propKey) && null != propValue && setProp(instance, type, propKey, null, emptyProps, propValue);
    }
    null != props.dangerouslySetInnerHTML && (instance.textContent = "");
    instance.onclick === noop$1 && (instance.onclick = null);
    detachDeletedInstance(instance);
  }
  function clearSingletonPreambleContribution(instance) {
    for (var attributes = instance.attributes; attributes.length; )
      instance.removeAttributeNode(attributes[0]);
    detachDeletedInstance(instance);
  }
  var preloadPropsMap = /* @__PURE__ */ new Map(), preconnectsSet = /* @__PURE__ */ new Set();
  function getHoistableRoot(container) {
    if ("function" === typeof container.getRootNode) {
      var rootNode = container.getRootNode();
      if (9 === rootNode.nodeType || 11 === rootNode.nodeType) return rootNode;
    }
    return 9 === container.nodeType ? container : container.ownerDocument;
  }
  var previousDispatcher = ReactDOMSharedInternals.d;
  ReactDOMSharedInternals.d = {
    f: flushSyncWork,
    r: requestFormReset,
    D: prefetchDNS,
    C: preconnect,
    L: preload,
    m: preloadModule,
    X: preinitScript,
    S: preinitStyle,
    M: preinitModuleScript
  };
  function flushSyncWork() {
    var previousWasRendering = previousDispatcher.f(), wasRendering = flushSyncWork$1();
    return previousWasRendering || wasRendering;
  }
  function requestFormReset(form) {
    var formInst = getInstanceFromNode(form);
    null !== formInst && 5 === formInst.tag && "form" === formInst.type ? requestFormReset$1(formInst) : previousDispatcher.r(form);
  }
  var globalDocument = "undefined" === typeof document ? null : document;
  function preconnectAs(rel, href, crossOrigin) {
    var ownerDocument = globalDocument;
    if (ownerDocument && "string" === typeof href && href) {
      var limitedEscapedHref = escapeSelectorAttributeValueInsideDoubleQuotes(href);
      limitedEscapedHref = 'link[rel="' + rel + '"][href="' + limitedEscapedHref + '"]';
      "string" === typeof crossOrigin && (limitedEscapedHref += '[crossorigin="' + crossOrigin + '"]');
      preconnectsSet.has(limitedEscapedHref) || (preconnectsSet.add(limitedEscapedHref), rel = { rel, crossOrigin, href }, null === ownerDocument.querySelector(limitedEscapedHref) && (href = ownerDocument.createElement("link"), setInitialProperties(href, "link", rel), markNodeAsHoistable(href), ownerDocument.head.appendChild(href)));
    }
  }
  function prefetchDNS(href) {
    previousDispatcher.D(href);
    preconnectAs("dns-prefetch", href, null);
  }
  function preconnect(href, crossOrigin) {
    previousDispatcher.C(href, crossOrigin);
    preconnectAs("preconnect", href, crossOrigin);
  }
  function preload(href, as, options2) {
    previousDispatcher.L(href, as, options2);
    var ownerDocument = globalDocument;
    if (ownerDocument && href && as) {
      var preloadSelector = 'link[rel="preload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"]';
      "image" === as ? options2 && options2.imageSrcSet ? (preloadSelector += '[imagesrcset="' + escapeSelectorAttributeValueInsideDoubleQuotes(
        options2.imageSrcSet
      ) + '"]', "string" === typeof options2.imageSizes && (preloadSelector += '[imagesizes="' + escapeSelectorAttributeValueInsideDoubleQuotes(
        options2.imageSizes
      ) + '"]')) : preloadSelector += '[href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]' : preloadSelector += '[href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]';
      var key = preloadSelector;
      switch (as) {
        case "style":
          key = getStyleKey(href);
          break;
        case "script":
          key = getScriptKey(href);
      }
      if (!(preloadPropsMap.has(key) || (href = assign(
        {
          rel: "preload",
          href: "image" === as && options2 && options2.imageSrcSet ? void 0 : href,
          as
        },
        options2
      ), preloadPropsMap.set(key, href), null !== ownerDocument.querySelector(preloadSelector) || "style" === as && ownerDocument.querySelector(getStylesheetSelectorFromKey(key)) || "script" === as && ownerDocument.querySelector(getScriptSelectorFromKey(key))))) {
        var instance = ownerDocument.createElement("link");
        setInitialProperties(instance, "link", href);
        "style" === as && (instance[internalLoadPendingKey] = true, instance.onload = instance.onerror = function() {
          clearPendingLoadOnNode(instance);
        });
        markNodeAsHoistable(instance);
        ownerDocument.head.appendChild(instance);
      }
    }
  }
  function preloadModule(href, options2) {
    previousDispatcher.m(href, options2);
    var ownerDocument = globalDocument;
    if (ownerDocument && href) {
      var as = options2 && "string" === typeof options2.as ? options2.as : "script", preloadSelector = 'link[rel="modulepreload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"][href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]', key = preloadSelector;
      switch (as) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          key = getScriptKey(href);
      }
      if (!preloadPropsMap.has(key) && (href = assign({ rel: "modulepreload", href }, options2), preloadPropsMap.set(key, href), null === ownerDocument.querySelector(preloadSelector))) {
        switch (as) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (ownerDocument.querySelector(getScriptSelectorFromKey(key)))
              return;
        }
        as = ownerDocument.createElement("link");
        setInitialProperties(as, "link", href);
        markNodeAsHoistable(as);
        ownerDocument.head.appendChild(as);
      }
    }
  }
  function preinitStyle(href, precedence, options2) {
    previousDispatcher.S(href, precedence, options2);
    var ownerDocument = globalDocument;
    if (ownerDocument && href) {
      var styles = getResourcesFromRoot(ownerDocument).hoistableStyles, key = getStyleKey(href);
      precedence = precedence || "default";
      var resource = styles.get(key);
      if (!resource) {
        var state = { loading: 0, preload: null };
        if (resource = ownerDocument.querySelector(
          getStylesheetSelectorFromKey(key)
        ))
          state.loading = 5;
        else {
          href = assign(
            { rel: "stylesheet", href, "data-precedence": precedence },
            options2
          );
          (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(href, options2);
          var link = resource = ownerDocument.createElement("link");
          markNodeAsHoistable(link);
          setInitialProperties(link, "link", href);
          link._p = new Promise(function(resolve, reject) {
            link.onload = resolve;
            link.onerror = reject;
          });
          link.addEventListener("load", function() {
            state.loading |= 1;
          });
          link.addEventListener("error", function() {
            state.loading |= 2;
          });
          state.loading |= 4;
          insertStylesheet(resource, precedence, ownerDocument);
        }
        resource = {
          type: "stylesheet",
          instance: resource,
          count: 1,
          state
        };
        styles.set(key, resource);
      }
    }
  }
  function preinitScript(src, options2) {
    previousDispatcher.X(src, options2);
    var ownerDocument = globalDocument;
    if (ownerDocument && src) {
      var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
      resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({ src, async: true }, options2), (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options2), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
        type: "script",
        instance: resource,
        count: 1,
        state: null
      }, scripts.set(key, resource));
    }
  }
  function preinitModuleScript(src, options2) {
    previousDispatcher.M(src, options2);
    var ownerDocument = globalDocument;
    if (ownerDocument && src) {
      var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
      resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({ src, async: true, type: "module" }, options2), (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options2), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
        type: "script",
        instance: resource,
        count: 1,
        state: null
      }, scripts.set(key, resource));
    }
  }
  function getResource(type, currentProps, pendingProps, currentResource) {
    var JSCompiler_inline_result = (JSCompiler_inline_result = rootInstanceStackCursor.current) ? getHoistableRoot(JSCompiler_inline_result) : null;
    if (!JSCompiler_inline_result) throw Error(formatProdErrorMessage(446));
    switch (type) {
      case "meta":
      case "title":
        return null;
      case "style":
        return "string" === typeof pendingProps.precedence && "string" === typeof pendingProps.href ? (pendingProps = getStyleKey(pendingProps.href), currentProps = getResourcesFromRoot(
          JSCompiler_inline_result
        ).hoistableStyles, currentResource = currentProps.get(pendingProps), currentResource || (currentResource = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, currentProps.set(pendingProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if ("stylesheet" === pendingProps.rel && "string" === typeof pendingProps.href && "string" === typeof pendingProps.precedence) {
          type = getStyleKey(pendingProps.href);
          var styles$268 = getResourcesFromRoot(
            JSCompiler_inline_result
          ).hoistableStyles, resource$269 = styles$268.get(type);
          resource$269 || (JSCompiler_inline_result = JSCompiler_inline_result.ownerDocument || JSCompiler_inline_result, resource$269 = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, styles$268.set(type, resource$269), (styles$268 = JSCompiler_inline_result.querySelector(
            getStylesheetSelectorFromKey(type)
          )) ? styles$268._p || (resource$269.instance = styles$268, resource$269.state.loading = 5) : (styles$268 = preloadPropsMap.get(type), styles$268 || (styles$268 = {
            rel: "preload",
            as: "style",
            href: pendingProps.href,
            crossOrigin: pendingProps.crossOrigin,
            integrity: pendingProps.integrity,
            media: pendingProps.media,
            hrefLang: pendingProps.hrefLang,
            referrerPolicy: pendingProps.referrerPolicy
          }, preloadPropsMap.set(type, styles$268)), preloadStylesheet(
            JSCompiler_inline_result,
            type,
            styles$268,
            resource$269.state
          )));
          if (currentProps && null === currentResource)
            throw Error(formatProdErrorMessage(528, ""));
          return resource$269;
        }
        if (currentProps && null !== currentResource)
          throw Error(formatProdErrorMessage(529, ""));
        return null;
      case "script":
        return currentProps = pendingProps.async, pendingProps = pendingProps.src, "string" === typeof pendingProps && currentProps && "function" !== typeof currentProps && "symbol" !== typeof currentProps ? (pendingProps = getScriptKey(pendingProps), currentProps = getResourcesFromRoot(
          JSCompiler_inline_result
        ).hoistableScripts, currentResource = currentProps.get(pendingProps), currentResource || (currentResource = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, currentProps.set(pendingProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(formatProdErrorMessage(444, type));
    }
  }
  function getStyleKey(href) {
    return 'href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"';
  }
  function getStylesheetSelectorFromKey(key) {
    return 'link[rel="stylesheet"][' + key + "]";
  }
  function stylesheetPropsFromRawProps(rawProps) {
    return assign({}, rawProps, {
      "data-precedence": rawProps.precedence,
      precedence: null
    });
  }
  function preloadStylesheet(ownerDocument, key, preloadProps, state) {
    if (key = ownerDocument.querySelector(
      'link[rel="preload"][as="style"][' + key + "]"
    )) {
      if (true !== key[internalLoadPendingKey]) {
        state.loading = 1;
        return;
      }
    } else
      key = ownerDocument.createElement("link"), key[internalLoadPendingKey] = true, key.onload = key.onerror = clearPendingLoadOnNode.bind(null, key), setInitialProperties(key, "link", preloadProps), markNodeAsHoistable(key), ownerDocument.head.appendChild(key);
    state.preload = key;
    key.addEventListener("load", function() {
      return state.loading |= 1;
    });
    key.addEventListener("error", function() {
      return state.loading |= 2;
    });
  }
  function getScriptKey(src) {
    return '[src="' + escapeSelectorAttributeValueInsideDoubleQuotes(src) + '"]';
  }
  function getScriptSelectorFromKey(key) {
    return "script[async]" + key;
  }
  function acquireResource(hoistableRoot, resource, props) {
    resource.count++;
    if (null === resource.instance)
      switch (resource.type) {
        case "style":
          var instance = hoistableRoot.querySelector(
            'style[data-href~="' + escapeSelectorAttributeValueInsideDoubleQuotes(props.href) + '"]'
          );
          if (instance)
            return resource.instance = instance, markNodeAsHoistable(instance), instance;
          var styleProps = assign({}, props, {
            "data-href": props.href,
            "data-precedence": props.precedence,
            href: null,
            precedence: null
          });
          instance = (hoistableRoot.ownerDocument || hoistableRoot).createElement(
            "style"
          );
          markNodeAsHoistable(instance);
          setInitialProperties(instance, "style", styleProps);
          insertStylesheet(instance, props.precedence, hoistableRoot);
          return resource.instance = instance;
        case "stylesheet":
          styleProps = getStyleKey(props.href);
          var instance$274 = hoistableRoot.querySelector(
            getStylesheetSelectorFromKey(styleProps)
          );
          if (instance$274)
            return resource.state.loading |= 4, resource.instance = instance$274, markNodeAsHoistable(instance$274), instance$274;
          instance = stylesheetPropsFromRawProps(props);
          (styleProps = preloadPropsMap.get(styleProps)) && adoptPreloadPropsForStylesheet(instance, styleProps);
          instance$274 = (hoistableRoot.ownerDocument || hoistableRoot).createElement("link");
          markNodeAsHoistable(instance$274);
          var linkInstance = instance$274;
          linkInstance._p = new Promise(function(resolve, reject) {
            linkInstance.onload = resolve;
            linkInstance.onerror = reject;
          });
          setInitialProperties(instance$274, "link", instance);
          resource.state.loading |= 4;
          insertStylesheet(instance$274, props.precedence, hoistableRoot);
          return resource.instance = instance$274;
        case "script":
          instance$274 = getScriptKey(props.src);
          if (styleProps = hoistableRoot.querySelector(
            getScriptSelectorFromKey(instance$274)
          ))
            return resource.instance = styleProps, markNodeAsHoistable(styleProps), styleProps;
          instance = props;
          if (styleProps = preloadPropsMap.get(instance$274))
            instance = assign({}, props), adoptPreloadPropsForScript(instance, styleProps);
          hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
          styleProps = hoistableRoot.createElement("script");
          markNodeAsHoistable(styleProps);
          setInitialProperties(styleProps, "link", instance);
          hoistableRoot.head.appendChild(styleProps);
          return resource.instance = styleProps;
        case "void":
          return null;
        default:
          throw Error(formatProdErrorMessage(443, resource.type));
      }
    else
      "stylesheet" === resource.type && 0 === (resource.state.loading & 4) && (instance = resource.instance, resource.state.loading |= 4, insertStylesheet(instance, props.precedence, hoistableRoot));
    return resource.instance;
  }
  function insertStylesheet(instance, precedence, root2) {
    for (var nodes = root2.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), last = nodes.length ? nodes[nodes.length - 1] : null, prior = last, i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node.dataset.precedence === precedence) prior = node;
      else if (prior !== last) break;
    }
    prior ? prior.parentNode.insertBefore(instance, prior.nextSibling) : (precedence = 9 === root2.nodeType ? root2.head : root2, precedence.insertBefore(instance, precedence.firstChild));
  }
  function adoptPreloadPropsForStylesheet(stylesheetProps, preloadProps) {
    null == stylesheetProps.crossOrigin && (stylesheetProps.crossOrigin = preloadProps.crossOrigin);
    null == stylesheetProps.referrerPolicy && (stylesheetProps.referrerPolicy = preloadProps.referrerPolicy);
    null == stylesheetProps.title && (stylesheetProps.title = preloadProps.title);
  }
  function adoptPreloadPropsForScript(scriptProps, preloadProps) {
    null == scriptProps.crossOrigin && (scriptProps.crossOrigin = preloadProps.crossOrigin);
    null == scriptProps.referrerPolicy && (scriptProps.referrerPolicy = preloadProps.referrerPolicy);
    null == scriptProps.integrity && (scriptProps.integrity = preloadProps.integrity);
  }
  var tagCaches = null;
  function getHydratableHoistableCache(type, keyAttribute, ownerDocument) {
    if (null === tagCaches) {
      var cache = /* @__PURE__ */ new Map();
      var caches = tagCaches = /* @__PURE__ */ new Map();
      caches.set(ownerDocument, cache);
    } else
      caches = tagCaches, cache = caches.get(ownerDocument), cache || (cache = /* @__PURE__ */ new Map(), caches.set(ownerDocument, cache));
    if (cache.has(type)) return cache;
    cache.set(type, null);
    ownerDocument = ownerDocument.getElementsByTagName(type);
    for (caches = 0; caches < ownerDocument.length; caches++) {
      var node = ownerDocument[caches];
      if (!(node[internalHoistableMarker] || node[internalInstanceKey] || "link" === type && "stylesheet" === node.getAttribute("rel")) && "http://www.w3.org/2000/svg" !== node.namespaceURI) {
        var nodeKey = node.getAttribute(keyAttribute) || "";
        nodeKey = type + nodeKey;
        var existing = cache.get(nodeKey);
        existing ? existing.push(node) : cache.set(nodeKey, [node]);
      }
    }
    return cache;
  }
  function mountHoistable(hoistableRoot, type, instance) {
    hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
    hoistableRoot.head.insertBefore(
      instance,
      "title" === type ? hoistableRoot.querySelector("head > title") : null
    );
  }
  function isHostHoistableType(type, props, hostContext) {
    if (1 === hostContext || null != props.itemProp) return false;
    switch (type) {
      case "meta":
      case "title":
        return true;
      case "style":
        if ("string" !== typeof props.precedence || "string" !== typeof props.href || "" === props.href)
          break;
        return true;
      case "link":
        if ("string" !== typeof props.rel || "string" !== typeof props.href || "" === props.href || props.onLoad || props.onError)
          break;
        switch (props.rel) {
          case "stylesheet":
            return type = props.disabled, "string" === typeof props.precedence && null == type;
          default:
            return true;
        }
      case "script":
        if (props.async && "function" !== typeof props.async && "symbol" !== typeof props.async && !props.onLoad && !props.onError && props.src && "string" === typeof props.src)
          return true;
    }
    return false;
  }
  function maySuspendCommit(type, props) {
    return "img" === type && null != props.src && "" !== props.src && null == props.onLoad && "lazy" !== props.loading;
  }
  function preloadResource(resource) {
    return "stylesheet" === resource.type && 0 === (resource.state.loading & 3) ? false : true;
  }
  function estimateImageBytes(instance) {
    return (instance.width || 100) * (instance.height || 100) * ("number" === typeof devicePixelRatio ? devicePixelRatio : 1) * 0.25;
  }
  function suspendInstance(state, instance) {
    "function" === typeof instance.decode && (state.imgCount++, instance.complete || (state.imgBytes += estimateImageBytes(instance), state.suspenseyImages.push(instance)), state = onUnsuspendImg.bind(state), instance.decode().then(state, state));
  }
  function suspendResource(state, hoistableRoot, resource, props) {
    if ("stylesheet" === resource.type && ("string" !== typeof props.media || false !== matchMedia(props.media).matches) && 0 === (resource.state.loading & 4)) {
      if (null === resource.instance) {
        var key = getStyleKey(props.href), instance = hoistableRoot.querySelector(
          getStylesheetSelectorFromKey(key)
        );
        if (instance) {
          hoistableRoot = instance._p;
          null !== hoistableRoot && "object" === typeof hoistableRoot && "function" === typeof hoistableRoot.then && (state.count++, state = onUnsuspend.bind(state), hoistableRoot.then(state, state));
          resource.state.loading |= 4;
          resource.instance = instance;
          markNodeAsHoistable(instance);
          return;
        }
        instance = hoistableRoot.ownerDocument || hoistableRoot;
        props = stylesheetPropsFromRawProps(props);
        (key = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(props, key);
        instance = instance.createElement("link");
        markNodeAsHoistable(instance);
        var linkInstance = instance;
        linkInstance._p = new Promise(function(resolve, reject) {
          linkInstance.onload = resolve;
          linkInstance.onerror = reject;
        });
        setInitialProperties(instance, "link", props);
        resource.instance = instance;
      }
      null === state.stylesheets && (state.stylesheets = /* @__PURE__ */ new Map());
      state.stylesheets.set(resource, hoistableRoot);
      (hoistableRoot = resource.state.preload) && 0 === (resource.state.loading & 3) && (state.count++, resource = onUnsuspend.bind(state), hoistableRoot.addEventListener("load", resource), hoistableRoot.addEventListener("error", resource));
    }
  }
  var estimatedBytesWithinLimit = 0;
  function waitForCommitToBeReady(state, timeoutOffset) {
    state.stylesheets && 0 === state.count && insertSuspendedStylesheets(state, state.stylesheets);
    return 0 < state.count || 0 < state.imgCount ? function(commit) {
      var stylesheetTimer = setTimeout(function() {
        state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets);
        if (state.unsuspend) {
          var unsuspend = state.unsuspend;
          state.unsuspend = null;
          unsuspend();
        }
      }, 6e4 + timeoutOffset);
      0 < state.imgBytes && 0 === estimatedBytesWithinLimit && (estimatedBytesWithinLimit = 62500 * estimateBandwidth());
      var imgTimer = setTimeout(
        function() {
          state.waitingForImages = false;
          if (0 === state.count && (state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets), state.unsuspend)) {
            var unsuspend = state.unsuspend;
            state.unsuspend = null;
            unsuspend();
          }
        },
        (state.imgBytes > estimatedBytesWithinLimit ? 50 : 800) + timeoutOffset
      );
      state.unsuspend = commit;
      return function() {
        state.unsuspend = null;
        clearTimeout(stylesheetTimer);
        clearTimeout(imgTimer);
      };
    } : null;
  }
  function checkIfFullyUnsuspended(state) {
    if (0 === state.count && (0 === state.imgCount || !state.waitingForImages)) {
      if (state.stylesheets) insertSuspendedStylesheets(state, state.stylesheets);
      else if (state.unsuspend) {
        var unsuspend = state.unsuspend;
        state.unsuspend = null;
        unsuspend();
      }
    }
  }
  function onUnsuspend() {
    this.count--;
    checkIfFullyUnsuspended(this);
  }
  function onUnsuspendImg() {
    this.imgCount--;
    checkIfFullyUnsuspended(this);
  }
  var precedencesByRoot = null;
  function insertSuspendedStylesheets(state, resources) {
    state.stylesheets = null;
    null !== state.unsuspend && (state.count++, precedencesByRoot = /* @__PURE__ */ new Map(), resources.forEach(insertStylesheetIntoRoot, state), precedencesByRoot = null, onUnsuspend.call(state));
  }
  function insertStylesheetIntoRoot(root2, resource) {
    if (!(resource.state.loading & 4)) {
      var precedences = precedencesByRoot.get(root2);
      if (precedences) var last = precedences.get(null);
      else {
        precedences = /* @__PURE__ */ new Map();
        precedencesByRoot.set(root2, precedences);
        for (var nodes = root2.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          if ("LINK" === node.nodeName || "not all" !== node.getAttribute("media"))
            precedences.set(node.dataset.precedence, node), last = node;
        }
        last && precedences.set(null, last);
      }
      nodes = resource.instance;
      node = nodes.getAttribute("data-precedence");
      i = precedences.get(node) || last;
      i === last && precedences.set(null, nodes);
      precedences.set(node, nodes);
      this.count++;
      last = onUnsuspend.bind(this);
      nodes.addEventListener("load", last);
      nodes.addEventListener("error", last);
      i ? i.parentNode.insertBefore(nodes, i.nextSibling) : (root2 = 9 === root2.nodeType ? root2.head : root2, root2.insertBefore(nodes, root2.firstChild));
      resource.state.loading |= 4;
    }
  }
  var HostTransitionContext = {
    $$typeof: REACT_CONTEXT_TYPE,
    Provider: null,
    Consumer: null,
    _currentValue: sharedNotPendingObject,
    _currentValue2: sharedNotPendingObject,
    _threadCount: 0
  };
  function FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator, formState) {
    this.tag = 1;
    this.containerInfo = containerInfo;
    this.pingCache = this.current = this.pendingChildren = null;
    this.timeoutHandle = -1;
    this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null;
    this.callbackPriority = 0;
    this.expirationTimes = createLaneMap(-1);
    this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
    this.entanglements = createLaneMap(0);
    this.hiddenUpdates = createLaneMap(null);
    this.identifierPrefix = identifierPrefix;
    this.onUncaughtError = onUncaughtError;
    this.onCaughtError = onCaughtError;
    this.onRecoverableError = onRecoverableError;
    this.pooledCache = null;
    this.pooledCacheLanes = 0;
    this.formState = formState;
    this.transitionTypes = null;
    this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, identifierPrefix, formState, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator) {
    containerInfo = new FiberRootNode(
      containerInfo,
      tag,
      hydrate,
      identifierPrefix,
      onUncaughtError,
      onCaughtError,
      onRecoverableError,
      onDefaultTransitionIndicator,
      formState
    );
    tag = 1;
    true === isStrictMode && (tag |= 24);
    isStrictMode = createFiberImplClass(3, null, null, tag);
    containerInfo.current = isStrictMode;
    isStrictMode.stateNode = containerInfo;
    tag = createCache();
    tag.refCount++;
    containerInfo.pooledCache = tag;
    tag.refCount++;
    isStrictMode.memoizedState = {
      element: initialChildren,
      isDehydrated: hydrate,
      cache: tag
    };
    initializeUpdateQueue(isStrictMode);
    return containerInfo;
  }
  function getContextForSubtree(parentComponent) {
    if (!parentComponent) return emptyContextObject;
    parentComponent = emptyContextObject;
    return parentComponent;
  }
  function updateContainerImpl(rootFiber, lane, element, container, parentComponent, callback) {
    parentComponent = getContextForSubtree(parentComponent);
    null === container.context ? container.context = parentComponent : container.pendingContext = parentComponent;
    container = createUpdate(lane);
    container.payload = { element };
    callback = void 0 === callback ? null : callback;
    null !== callback && (container.callback = callback);
    element = enqueueUpdate(rootFiber, container, lane);
    null !== element && (scheduleUpdateOnFiber(element, rootFiber, lane), entangleTransitions(element, rootFiber, lane));
  }
  function markRetryLaneImpl(fiber, retryLane) {
    fiber = fiber.memoizedState;
    if (null !== fiber && null !== fiber.dehydrated) {
      var a = fiber.retryLane;
      fiber.retryLane = 0 !== a && a < retryLane ? a : retryLane;
    }
  }
  function markRetryLaneIfNotHydrated(fiber, retryLane) {
    markRetryLaneImpl(fiber, retryLane);
    (fiber = fiber.alternate) && markRetryLaneImpl(fiber, retryLane);
  }
  function attemptContinuousHydration(fiber) {
    if (13 === fiber.tag || 31 === fiber.tag) {
      var root2 = enqueueConcurrentRenderForLane(fiber, 67108864);
      null !== root2 && scheduleUpdateOnFiber(root2, fiber, 67108864);
      markRetryLaneIfNotHydrated(fiber, 67108864);
    }
  }
  function attemptHydrationAtCurrentPriority(fiber) {
    if (13 === fiber.tag || 31 === fiber.tag) {
      var lane = requestUpdateLane();
      lane = getBumpedLaneForHydrationByLane(lane);
      var root2 = enqueueConcurrentRenderForLane(fiber, lane);
      null !== root2 && scheduleUpdateOnFiber(root2, fiber, lane);
      markRetryLaneIfNotHydrated(fiber, lane);
    }
  }
  var _enabled = true;
  function dispatchDiscreteEvent(domEventName, eventSystemFlags, container, nativeEvent) {
    var prevTransition = ReactSharedInternals.T;
    ReactSharedInternals.T = null;
    var previousPriority = ReactDOMSharedInternals.p;
    try {
      ReactDOMSharedInternals.p = 2, dispatchEvent2(domEventName, eventSystemFlags, container, nativeEvent);
    } finally {
      ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
    }
  }
  function dispatchContinuousEvent(domEventName, eventSystemFlags, container, nativeEvent) {
    var prevTransition = ReactSharedInternals.T;
    ReactSharedInternals.T = null;
    var previousPriority = ReactDOMSharedInternals.p;
    try {
      ReactDOMSharedInternals.p = 8, dispatchEvent2(domEventName, eventSystemFlags, container, nativeEvent);
    } finally {
      ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
    }
  }
  function dispatchEvent2(domEventName, eventSystemFlags, targetContainer, nativeEvent) {
    if (_enabled) {
      var blockedOn = findInstanceBlockingEvent(nativeEvent);
      if (null === blockedOn)
        dispatchEventForPluginEventSystem(
          domEventName,
          eventSystemFlags,
          nativeEvent,
          return_targetInst,
          targetContainer
        ), clearIfContinuousEvent(domEventName, nativeEvent);
      else if (queueIfContinuousEvent(
        blockedOn,
        domEventName,
        eventSystemFlags,
        targetContainer,
        nativeEvent
      ))
        nativeEvent.stopPropagation();
      else if (clearIfContinuousEvent(domEventName, nativeEvent), eventSystemFlags & 4 && -1 < discreteReplayableEvents.indexOf(domEventName)) {
        for (; null !== blockedOn; ) {
          var fiber = getInstanceFromNode(blockedOn);
          if (null !== fiber)
            switch (fiber.tag) {
              case 3:
                fiber = fiber.stateNode;
                if (fiber.current.memoizedState.isDehydrated) {
                  var lanes = getHighestPriorityLanes(fiber.pendingLanes);
                  if (0 !== lanes) {
                    var root2 = fiber;
                    root2.pendingLanes |= 2;
                    for (root2.entangledLanes |= 2; lanes; ) {
                      var lane = 1 << 31 - clz32(lanes);
                      root2.entanglements[1] |= lane;
                      lanes &= ~lane;
                    }
                    ensureRootIsScheduled(fiber);
                    0 === (executionContext & 6) && (workInProgressRootRenderTargetTime = now() + 500, flushSyncWorkAcrossRoots_impl(0));
                  }
                }
                break;
              case 31:
              case 13:
                root2 = enqueueConcurrentRenderForLane(fiber, 2), null !== root2 && scheduleUpdateOnFiber(root2, fiber, 2), flushSyncWork$1(), markRetryLaneIfNotHydrated(fiber, 2);
            }
          fiber = findInstanceBlockingEvent(nativeEvent);
          null === fiber && dispatchEventForPluginEventSystem(
            domEventName,
            eventSystemFlags,
            nativeEvent,
            return_targetInst,
            targetContainer
          );
          if (fiber === blockedOn) break;
          blockedOn = fiber;
        }
        null !== blockedOn && nativeEvent.stopPropagation();
      } else
        dispatchEventForPluginEventSystem(
          domEventName,
          eventSystemFlags,
          nativeEvent,
          null,
          targetContainer
        );
    }
  }
  function findInstanceBlockingEvent(nativeEvent) {
    nativeEvent = getEventTarget(nativeEvent);
    return findInstanceBlockingTarget(nativeEvent);
  }
  var return_targetInst = null;
  function findInstanceBlockingTarget(targetNode) {
    return_targetInst = null;
    targetNode = getClosestInstanceFromNode(targetNode);
    if (null !== targetNode) {
      var nearestMounted = getNearestMountedFiber(targetNode);
      if (null === nearestMounted) targetNode = null;
      else {
        var tag = nearestMounted.tag;
        if (13 === tag) {
          targetNode = getSuspenseInstanceFromFiber(nearestMounted);
          if (null !== targetNode) return targetNode;
          targetNode = null;
        } else if (31 === tag) {
          targetNode = getActivityInstanceFromFiber(nearestMounted);
          if (null !== targetNode) return targetNode;
          targetNode = null;
        } else if (3 === tag) {
          if (nearestMounted.stateNode.current.memoizedState.isDehydrated)
            return 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
          targetNode = null;
        } else nearestMounted !== targetNode && (targetNode = null);
      }
    }
    return_targetInst = targetNode;
    return null;
  }
  function getEventPriority(domEventName) {
    switch (domEventName) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "fullscreenerror":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "resize":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (getCurrentPriorityLevel()) {
          case ImmediatePriority:
            return 2;
          case UserBlockingPriority:
            return 8;
          case NormalPriority$1:
          case LowPriority:
            return 32;
          case IdlePriority:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var hasScheduledReplayAttempt = false, queuedFocus = null, queuedDrag = null, queuedMouse = null, queuedPointers = /* @__PURE__ */ new Map(), queuedPointerCaptures = /* @__PURE__ */ new Map(), queuedExplicitHydrationTargets = [], discreteReplayableEvents = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function clearIfContinuousEvent(domEventName, nativeEvent) {
    switch (domEventName) {
      case "focusin":
      case "focusout":
        queuedFocus = null;
        break;
      case "dragenter":
      case "dragleave":
        queuedDrag = null;
        break;
      case "mouseover":
      case "mouseout":
        queuedMouse = null;
        break;
      case "pointerover":
      case "pointerout":
        queuedPointers.delete(nativeEvent.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        queuedPointerCaptures.delete(nativeEvent.pointerId);
    }
  }
  function accumulateOrCreateContinuousQueuedReplayableEvent(existingQueuedEvent, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
    if (null === existingQueuedEvent || existingQueuedEvent.nativeEvent !== nativeEvent)
      return existingQueuedEvent = {
        blockedOn,
        domEventName,
        eventSystemFlags,
        nativeEvent,
        targetContainers: [targetContainer]
      }, null !== blockedOn && (blockedOn = getInstanceFromNode(blockedOn), null !== blockedOn && attemptContinuousHydration(blockedOn)), existingQueuedEvent;
    existingQueuedEvent.eventSystemFlags |= eventSystemFlags;
    blockedOn = existingQueuedEvent.targetContainers;
    null !== targetContainer && -1 === blockedOn.indexOf(targetContainer) && blockedOn.push(targetContainer);
    return existingQueuedEvent;
  }
  function queueIfContinuousEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
    switch (domEventName) {
      case "focusin":
        return queuedFocus = accumulateOrCreateContinuousQueuedReplayableEvent(
          queuedFocus,
          blockedOn,
          domEventName,
          eventSystemFlags,
          targetContainer,
          nativeEvent
        ), true;
      case "dragenter":
        return queuedDrag = accumulateOrCreateContinuousQueuedReplayableEvent(
          queuedDrag,
          blockedOn,
          domEventName,
          eventSystemFlags,
          targetContainer,
          nativeEvent
        ), true;
      case "mouseover":
        return queuedMouse = accumulateOrCreateContinuousQueuedReplayableEvent(
          queuedMouse,
          blockedOn,
          domEventName,
          eventSystemFlags,
          targetContainer,
          nativeEvent
        ), true;
      case "pointerover":
        var pointerId = nativeEvent.pointerId;
        queuedPointers.set(
          pointerId,
          accumulateOrCreateContinuousQueuedReplayableEvent(
            queuedPointers.get(pointerId) || null,
            blockedOn,
            domEventName,
            eventSystemFlags,
            targetContainer,
            nativeEvent
          )
        );
        return true;
      case "gotpointercapture":
        return pointerId = nativeEvent.pointerId, queuedPointerCaptures.set(
          pointerId,
          accumulateOrCreateContinuousQueuedReplayableEvent(
            queuedPointerCaptures.get(pointerId) || null,
            blockedOn,
            domEventName,
            eventSystemFlags,
            targetContainer,
            nativeEvent
          )
        ), true;
    }
    return false;
  }
  function attemptExplicitHydrationTarget(queuedTarget) {
    var targetInst = getClosestInstanceFromNode(queuedTarget.target);
    if (null !== targetInst) {
      var nearestMounted = getNearestMountedFiber(targetInst);
      if (null !== nearestMounted) {
        if (targetInst = nearestMounted.tag, 13 === targetInst) {
          if (targetInst = getSuspenseInstanceFromFiber(nearestMounted), null !== targetInst) {
            queuedTarget.blockedOn = targetInst;
            runWithPriority(queuedTarget.priority, function() {
              attemptHydrationAtCurrentPriority(nearestMounted);
            });
            return;
          }
        } else if (31 === targetInst) {
          if (targetInst = getActivityInstanceFromFiber(nearestMounted), null !== targetInst) {
            queuedTarget.blockedOn = targetInst;
            runWithPriority(queuedTarget.priority, function() {
              attemptHydrationAtCurrentPriority(nearestMounted);
            });
            return;
          }
        } else if (3 === targetInst && nearestMounted.stateNode.current.memoizedState.isDehydrated) {
          queuedTarget.blockedOn = 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
          return;
        }
      }
    }
    queuedTarget.blockedOn = null;
  }
  function attemptReplayContinuousQueuedEvent(queuedEvent) {
    if (null !== queuedEvent.blockedOn) return false;
    for (var targetContainers = queuedEvent.targetContainers; 0 < targetContainers.length; ) {
      var nextBlockedOn = findInstanceBlockingEvent(queuedEvent.nativeEvent);
      if (null === nextBlockedOn) {
        nextBlockedOn = queuedEvent.nativeEvent;
        var nativeEventClone = new nextBlockedOn.constructor(
          nextBlockedOn.type,
          nextBlockedOn
        );
        currentReplayingEvent = nativeEventClone;
        nextBlockedOn.target.dispatchEvent(nativeEventClone);
        currentReplayingEvent = null;
      } else
        return targetContainers = getInstanceFromNode(nextBlockedOn), null !== targetContainers && attemptContinuousHydration(targetContainers), queuedEvent.blockedOn = nextBlockedOn, false;
      targetContainers.shift();
    }
    return true;
  }
  function attemptReplayContinuousQueuedEventInMap(queuedEvent, key, map) {
    attemptReplayContinuousQueuedEvent(queuedEvent) && map.delete(key);
  }
  function replayUnblockedEvents() {
    hasScheduledReplayAttempt = false;
    null !== queuedFocus && attemptReplayContinuousQueuedEvent(queuedFocus) && (queuedFocus = null);
    null !== queuedDrag && attemptReplayContinuousQueuedEvent(queuedDrag) && (queuedDrag = null);
    null !== queuedMouse && attemptReplayContinuousQueuedEvent(queuedMouse) && (queuedMouse = null);
    queuedPointers.forEach(attemptReplayContinuousQueuedEventInMap);
    queuedPointerCaptures.forEach(attemptReplayContinuousQueuedEventInMap);
  }
  function scheduleCallbackIfUnblocked(queuedEvent, unblocked) {
    queuedEvent.blockedOn === unblocked && (queuedEvent.blockedOn = null, hasScheduledReplayAttempt || (hasScheduledReplayAttempt = true, Scheduler.unstable_scheduleCallback(
      Scheduler.unstable_NormalPriority,
      replayUnblockedEvents
    )));
  }
  var lastScheduledReplayQueue = null;
  function scheduleReplayQueueIfNeeded(formReplayingQueue) {
    lastScheduledReplayQueue !== formReplayingQueue && (lastScheduledReplayQueue = formReplayingQueue, Scheduler.unstable_scheduleCallback(
      Scheduler.unstable_NormalPriority,
      function() {
        lastScheduledReplayQueue === formReplayingQueue && (lastScheduledReplayQueue = null);
        for (var i = 0; i < formReplayingQueue.length; i += 3) {
          var form = formReplayingQueue[i], submitterOrAction = formReplayingQueue[i + 1], formData = formReplayingQueue[i + 2];
          if ("function" !== typeof submitterOrAction)
            if (null === findInstanceBlockingTarget(submitterOrAction || form))
              continue;
            else break;
          var formInst = getInstanceFromNode(form);
          null !== formInst && (formReplayingQueue.splice(i, 3), i -= 3, startHostTransition(
            formInst,
            {
              pending: true,
              data: formData,
              method: form.method,
              action: submitterOrAction
            },
            submitterOrAction,
            formData
          ));
        }
      }
    ));
  }
  function retryIfBlockedOn(unblocked) {
    function unblock(queuedEvent) {
      return scheduleCallbackIfUnblocked(queuedEvent, unblocked);
    }
    null !== queuedFocus && scheduleCallbackIfUnblocked(queuedFocus, unblocked);
    null !== queuedDrag && scheduleCallbackIfUnblocked(queuedDrag, unblocked);
    null !== queuedMouse && scheduleCallbackIfUnblocked(queuedMouse, unblocked);
    queuedPointers.forEach(unblock);
    queuedPointerCaptures.forEach(unblock);
    for (var i = 0; i < queuedExplicitHydrationTargets.length; i++) {
      var queuedTarget = queuedExplicitHydrationTargets[i];
      queuedTarget.blockedOn === unblocked && (queuedTarget.blockedOn = null);
    }
    for (; 0 < queuedExplicitHydrationTargets.length && (i = queuedExplicitHydrationTargets[0], null === i.blockedOn); )
      attemptExplicitHydrationTarget(i), null === i.blockedOn && queuedExplicitHydrationTargets.shift();
    i = (unblocked.ownerDocument || unblocked).$$reactFormReplay;
    if (null != i)
      for (queuedTarget = 0; queuedTarget < i.length; queuedTarget += 3) {
        var form = i[queuedTarget], submitterOrAction = i[queuedTarget + 1], formProps = form[internalPropsKey] || null;
        if ("function" === typeof submitterOrAction)
          formProps || scheduleReplayQueueIfNeeded(i);
        else if (formProps) {
          var action = null;
          if (submitterOrAction && submitterOrAction.hasAttribute("formAction"))
            if (form = submitterOrAction, formProps = submitterOrAction[internalPropsKey] || null)
              action = formProps.formAction;
            else {
              if (null !== findInstanceBlockingTarget(form)) continue;
            }
          else action = formProps.action;
          "function" === typeof action ? i[queuedTarget + 1] = action : (i.splice(queuedTarget, 3), queuedTarget -= 3);
          scheduleReplayQueueIfNeeded(i);
        }
      }
  }
  function defaultOnDefaultTransitionIndicator() {
    function handleNavigate(event) {
      event.canIntercept && "react-transition" === event.info && event.intercept({
        handler: function() {
          return new Promise(function(resolve) {
            return pendingResolve = resolve;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function handleNavigateComplete() {
      null !== pendingResolve && (pendingResolve(), pendingResolve = null);
      isCancelled || setTimeout(startFakeNavigation, 20);
    }
    function startFakeNavigation() {
      if (!isCancelled && !navigation.transition) {
        var currentEntry = navigation.currentEntry;
        currentEntry && null != currentEntry.url && navigation.navigate(currentEntry.url, {
          state: currentEntry.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if ("object" === typeof navigation) {
      var isCancelled = false, pendingResolve = null;
      navigation.addEventListener("navigate", handleNavigate);
      navigation.addEventListener("navigatesuccess", handleNavigateComplete);
      navigation.addEventListener("navigateerror", handleNavigateComplete);
      setTimeout(startFakeNavigation, 100);
      return function() {
        isCancelled = true;
        navigation.removeEventListener("navigate", handleNavigate);
        navigation.removeEventListener("navigatesuccess", handleNavigateComplete);
        navigation.removeEventListener("navigateerror", handleNavigateComplete);
        null !== pendingResolve && (pendingResolve(), pendingResolve = null);
      };
    }
  }
  function ReactDOMRoot(internalRoot) {
    this._internalRoot = internalRoot;
  }
  ReactDOMHydrationRoot.prototype.render = ReactDOMRoot.prototype.render = function(children) {
    var root2 = this._internalRoot;
    if (null === root2) throw Error(formatProdErrorMessage(409));
    var current = root2.current, lane = requestUpdateLane();
    updateContainerImpl(current, lane, children, root2, null, null);
  };
  ReactDOMHydrationRoot.prototype.unmount = ReactDOMRoot.prototype.unmount = function() {
    var root2 = this._internalRoot;
    if (null !== root2) {
      this._internalRoot = null;
      var container = root2.containerInfo;
      updateContainerImpl(root2.current, 2, null, root2, null, null);
      flushSyncWork$1();
      container[internalContainerInstanceKey] = null;
    }
  };
  function ReactDOMHydrationRoot(internalRoot) {
    this._internalRoot = internalRoot;
  }
  ReactDOMHydrationRoot.prototype.unstable_scheduleHydration = function(target) {
    if (target) {
      var updatePriority = resolveUpdatePriority();
      target = { blockedOn: null, target, priority: updatePriority };
      for (var i = 0; i < queuedExplicitHydrationTargets.length && 0 !== updatePriority && updatePriority < queuedExplicitHydrationTargets[i].priority; i++) ;
      queuedExplicitHydrationTargets.splice(i, 0, target);
      0 === i && attemptExplicitHydrationTarget(target);
    }
  };
  var isomorphicReactPackageVersion$jscomp$inline_2043 = React2.version;
  if ("19.3.0" !== isomorphicReactPackageVersion$jscomp$inline_2043)
    throw Error(
      formatProdErrorMessage(
        527,
        isomorphicReactPackageVersion$jscomp$inline_2043,
        "19.3.0"
      )
    );
  ReactDOMSharedInternals.findDOMNode = function(componentOrElement) {
    var fiber = componentOrElement._reactInternals;
    if (void 0 === fiber) {
      if ("function" === typeof componentOrElement.render)
        throw Error(formatProdErrorMessage(188));
      componentOrElement = Object.keys(componentOrElement).join(",");
      throw Error(formatProdErrorMessage(268, componentOrElement));
    }
    componentOrElement = findCurrentFiberUsingSlowPath(fiber);
    componentOrElement = null !== componentOrElement ? findCurrentHostFiberImpl(componentOrElement) : null;
    componentOrElement = null === componentOrElement ? null : componentOrElement.stateNode;
    return componentOrElement;
  };
  var internals$jscomp$inline_2586 = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: ReactSharedInternals,
    reconcilerVersion: "19.3.0"
  };
  if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
    var hook$jscomp$inline_2587 = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!hook$jscomp$inline_2587.isDisabled && hook$jscomp$inline_2587.supportsFiber)
      try {
        rendererID = hook$jscomp$inline_2587.inject(
          internals$jscomp$inline_2586
        ), injectedHook = hook$jscomp$inline_2587;
      } catch (err) {
      }
  }
  reactDomClient_production.createRoot = function(container, options2) {
    if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
    var isStrictMode = false, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError;
    null !== options2 && void 0 !== options2 && (true === options2.unstable_strictMode && (isStrictMode = true), void 0 !== options2.identifierPrefix && (identifierPrefix = options2.identifierPrefix), void 0 !== options2.onUncaughtError && (onUncaughtError = options2.onUncaughtError), void 0 !== options2.onCaughtError && (onCaughtError = options2.onCaughtError), void 0 !== options2.onRecoverableError && (onRecoverableError = options2.onRecoverableError));
    options2 = createFiberRoot(
      container,
      1,
      false,
      null,
      null,
      isStrictMode,
      identifierPrefix,
      null,
      onUncaughtError,
      onCaughtError,
      onRecoverableError,
      defaultOnDefaultTransitionIndicator
    );
    container[internalContainerInstanceKey] = options2.current;
    listenToAllSupportedEvents(container);
    return new ReactDOMRoot(options2);
  };
  reactDomClient_production.hydrateRoot = function(container, initialChildren, options2) {
    if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
    var isStrictMode = false, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError, formState = null;
    null !== options2 && void 0 !== options2 && (true === options2.unstable_strictMode && (isStrictMode = true), void 0 !== options2.identifierPrefix && (identifierPrefix = options2.identifierPrefix), void 0 !== options2.onUncaughtError && (onUncaughtError = options2.onUncaughtError), void 0 !== options2.onCaughtError && (onCaughtError = options2.onCaughtError), void 0 !== options2.onRecoverableError && (onRecoverableError = options2.onRecoverableError), void 0 !== options2.formState && (formState = options2.formState));
    initialChildren = createFiberRoot(
      container,
      1,
      true,
      initialChildren,
      null != options2 ? options2 : null,
      isStrictMode,
      identifierPrefix,
      formState,
      onUncaughtError,
      onCaughtError,
      onRecoverableError,
      defaultOnDefaultTransitionIndicator
    );
    initialChildren.context = getContextForSubtree(null);
    options2 = initialChildren.current;
    isStrictMode = requestUpdateLane();
    isStrictMode = getBumpedLaneForHydrationByLane(isStrictMode);
    identifierPrefix = createUpdate(isStrictMode);
    identifierPrefix.callback = null;
    enqueueUpdate(options2, identifierPrefix, isStrictMode);
    options2 = isStrictMode;
    initialChildren.current.lanes = options2;
    markRootUpdated$1(initialChildren, options2);
    ensureRootIsScheduled(initialChildren);
    container[internalContainerInstanceKey] = initialChildren.current;
    listenToAllSupportedEvents(container);
    return new ReactDOMHydrationRoot(initialChildren);
  };
  reactDomClient_production.version = "19.3.0";
  return reactDomClient_production;
}
var hasRequiredClient;
function requireClient() {
  if (hasRequiredClient) return client.exports;
  hasRequiredClient = 1;
  function checkDCE() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
      return;
    }
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
    } catch (err) {
      console.error(err);
    }
  }
  {
    checkDCE();
    client.exports = requireReactDomClient_production();
  }
  return client.exports;
}
var clientExports = requireClient();
const __GLOBAL__ = typeof window === "undefined" ? global : window;
const __NAMESPACE_PREFIX__ = "@griffel/";
function getGlobalVar(name, defaultValue) {
  if (!__GLOBAL__[/* @__PURE__ */ Symbol.for(__NAMESPACE_PREFIX__ + name)]) {
    __GLOBAL__[/* @__PURE__ */ Symbol.for(__NAMESPACE_PREFIX__ + name)] = defaultValue;
  }
  return __GLOBAL__[/* @__PURE__ */ Symbol.for(__NAMESPACE_PREFIX__ + name)];
}
const DEFINITION_LOOKUP_TABLE = /* @__PURE__ */ getGlobalVar("DEFINITION_LOOKUP_TABLE", {});
const DATA_BUCKET_ATTR = "data-make-styles-bucket";
const DATA_PRIORITY_ATTR = "data-priority";
const DATA_CONTAINER_ATTR = "data-container";
const HASH_PREFIX = "f";
const SEQUENCE_HASH_LENGTH = 7;
const SEQUENCE_PREFIX = "___";
const SEQUENCE_SIZE = SEQUENCE_PREFIX.length + SEQUENCE_HASH_LENGTH;
const LOOKUP_DEFINITIONS_INDEX = 0;
const LOOKUP_DIR_INDEX = 1;
const UNSUPPORTED_CSS_PROPERTIES = {
  all: 1,
  borderColor: 1,
  borderStyle: 1,
  borderWidth: 1,
  borderBlock: 1,
  borderBlockEnd: 1,
  borderBlockStart: 1,
  borderInline: 1,
  borderInlineEnd: 1,
  borderInlineStart: 1
};
const RESET = "DO_NOT_USE_DIRECTLY: @griffel/reset-value";
function murmur2(str) {
  var h = 0;
  var k, i = 0, len = str.length;
  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
    k = /* Math.imul(k, m): */
    (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
    k ^= /* k >>> r: */
    k >>> 24;
    h = /* Math.imul(k, m): */
    (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 255) << 16;
    case 2:
      h ^= (str.charCodeAt(i + 1) & 255) << 8;
    case 1:
      h ^= str.charCodeAt(i) & 255;
      h = /* Math.imul(h, m): */
      (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  h ^= h >>> 13;
  h = /* Math.imul(h, m): */
  (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}
function padEndHash(value) {
  const hashLength = value.length;
  if (hashLength === SEQUENCE_HASH_LENGTH) {
    return value;
  }
  for (let i = hashLength; i < SEQUENCE_HASH_LENGTH; i++) {
    value += "0";
  }
  return value;
}
function hashSequence(classes, dir, sequenceIds = []) {
  {
    return SEQUENCE_PREFIX + padEndHash(murmur2(classes + dir));
  }
}
function reduceToClassName(classMap, dir) {
  let classString = "";
  let hashString = "";
  for (const propertyHash in classMap) {
    const classNameMapping = classMap[propertyHash];
    if (classNameMapping === 0) {
      hashString += propertyHash + " ";
      continue;
    }
    const hasRTLClassName = Array.isArray(classNameMapping);
    const className = dir === "rtl" ? (hasRTLClassName ? classNameMapping[1] : classNameMapping) + " " : (hasRTLClassName ? classNameMapping[0] : classNameMapping) + " ";
    classString += className;
    hashString += className;
  }
  return [classString.slice(0, -1), hashString.slice(0, -1)];
}
function reduceToClassNameForSlots(classesMapBySlot, dir) {
  const classNamesForSlots = {};
  for (const slotName in classesMapBySlot) {
    const [slotClasses, slotClassesHash] = reduceToClassName(classesMapBySlot[slotName], dir);
    if (slotClassesHash === "") {
      classNamesForSlots[slotName] = "";
      continue;
    }
    const sequenceHash = hashSequence(slotClassesHash, dir);
    const resultSlotClasses = sequenceHash + (slotClasses === "" ? "" : " " + slotClasses);
    DEFINITION_LOOKUP_TABLE[sequenceHash] = [classesMapBySlot[slotName], dir];
    classNamesForSlots[slotName] = resultSlotClasses;
  }
  return classNamesForSlots;
}
const mergeClassesCachedResults = {};
function mergeClasses() {
  let dir = null;
  let resultClassName = "";
  let sequenceMatch = "";
  const sequencesIds = new Array(arguments.length);
  for (let i = 0; i < arguments.length; i++) {
    const className = arguments[i];
    if (typeof className === "string" && className !== "") {
      const sequenceIndex = className.indexOf(SEQUENCE_PREFIX);
      if (sequenceIndex === -1) {
        resultClassName += className + " ";
      } else {
        const sequenceId = className.substr(sequenceIndex, SEQUENCE_SIZE);
        if (sequenceIndex > 0) {
          resultClassName += className.slice(0, sequenceIndex);
        }
        sequenceMatch += sequenceId;
        sequencesIds[i] = sequenceId;
      }
    }
  }
  if (sequenceMatch === "") {
    return resultClassName.slice(0, -1);
  }
  const mergeClassesResult = mergeClassesCachedResults[sequenceMatch];
  if (mergeClassesResult !== void 0) {
    return resultClassName + mergeClassesResult;
  }
  const sequenceMappings = [];
  for (let i = 0; i < arguments.length; i++) {
    const sequenceId = sequencesIds[i];
    if (sequenceId) {
      const sequenceMapping = DEFINITION_LOOKUP_TABLE[sequenceId];
      if (sequenceMapping) {
        sequenceMappings.push(sequenceMapping[LOOKUP_DEFINITIONS_INDEX]);
        dir = sequenceMapping[LOOKUP_DIR_INDEX];
      }
    }
  }
  const resultClassesMap = Object.assign.apply(
    Object,
    // .assign() mutates the first object, we can't mutate mappings as it will produce invalid results later
    [{}].concat(sequenceMappings)
  );
  const [atomicClasses, classesMapHash] = reduceToClassName(resultClassesMap, dir);
  const newSequenceHash = hashSequence(classesMapHash, dir, sequencesIds);
  const newClassName = newSequenceHash + " " + atomicClasses;
  mergeClassesCachedResults[sequenceMatch] = newClassName;
  DEFINITION_LOOKUP_TABLE[newSequenceHash] = [resultClassesMap, dir];
  return resultClassName + newClassName;
}
function normalizeCSSBucketEntry(entry) {
  if (!Array.isArray(entry)) {
    return [entry];
  }
  return entry;
}
function createIsomorphicStyleSheet(styleElement, bucketName, priority, elementAttributes) {
  const __cssRulesForSSR = [];
  elementAttributes[DATA_BUCKET_ATTR] = bucketName;
  elementAttributes[DATA_PRIORITY_ATTR] = String(priority);
  if (styleElement) {
    for (const attrName in elementAttributes) {
      styleElement.setAttribute(attrName, elementAttributes[attrName]);
    }
  }
  function insertRule(rule) {
    if (styleElement === null || styleElement === void 0 ? void 0 : styleElement.sheet) {
      return styleElement.sheet.insertRule(rule, styleElement.sheet.cssRules.length);
    }
    return __cssRulesForSSR.push(rule);
  }
  return {
    elementAttributes,
    insertRule,
    element: styleElement,
    bucketName,
    cssRules() {
      if (styleElement === null || styleElement === void 0 ? void 0 : styleElement.sheet) {
        return Array.from(styleElement.sheet.cssRules).map((cssRule) => cssRule.cssText);
      }
      return __cssRulesForSSR;
    }
  };
}
const styleBucketOrdering = [
  // reset styles
  "r",
  // catch-all
  "d",
  // link
  "l",
  // visited
  "v",
  // focus-within
  "w",
  // focus
  "f",
  // focus-visible
  "i",
  // hover
  "h",
  // active
  "a",
  // at rules for reset styles
  "s",
  // keyframes
  "k",
  // at-rules
  "t",
  // @media rules
  "m",
  // @container rules (legacy/shared)
  "c",
  // @container rules (sorted)
  "x"
];
const styleBucketOrderingMap = /* @__PURE__ */ styleBucketOrdering.reduce((acc, cur, j) => {
  acc[cur] = j;
  return acc;
}, {});
function getStyleSheetKey(bucketName, mediaValue, priority) {
  if (bucketName === "m" || bucketName === "x") {
    return bucketName + mediaValue + priority;
  }
  return bucketName + priority;
}
function getStyleSheetForBucket(bucketName, targetDocument, insertionPoint, renderer, metadata = {}) {
  var _a, _b;
  const isMediaBucket = bucketName === "m";
  const isContainerBucket = bucketName === "x";
  const media = metadata["m"];
  const container = metadata["x"];
  const priority = (_a = metadata["p"]) !== null && _a !== void 0 ? _a : 0;
  const stylesheetKey = getStyleSheetKey(bucketName, (_b = container !== null && container !== void 0 ? container : media) !== null && _b !== void 0 ? _b : "0", priority);
  if (!renderer.stylesheets[stylesheetKey]) {
    const tag = targetDocument && targetDocument.createElement("style");
    const stylesheet = createIsomorphicStyleSheet(tag, bucketName, priority, {
      ...renderer.styleElementAttributes,
      ...isMediaBucket && { media },
      ...isContainerBucket && { [DATA_CONTAINER_ATTR]: container }
    });
    renderer.stylesheets[stylesheetKey] = stylesheet;
    if ((targetDocument === null || targetDocument === void 0 ? void 0 : targetDocument.head) && tag) {
      targetDocument.head.insertBefore(tag, findInsertionPoint(targetDocument, insertionPoint, bucketName, renderer, metadata));
    }
  }
  return renderer.stylesheets[stylesheetKey];
}
function isSameInsertionKey(elementA, bucketNameB, metadataB) {
  const elementBucketA = elementA.getAttribute(DATA_BUCKET_ATTR);
  const isSameBucket = elementBucketA === bucketNameB;
  if (isSameBucket) {
    if (bucketNameB === "m") {
      return metadataB["m"] === elementA.media;
    }
    if (bucketNameB === "x") {
      return metadataB["x"] === elementA.getAttribute(DATA_CONTAINER_ATTR);
    }
    return true;
  }
  return false;
}
function findInsertionPoint(targetDocument, insertionPoint, targetBucket, renderer, metadata = {}) {
  var _a, _b, _c;
  const targetOrder = styleBucketOrderingMap[targetBucket];
  const media = (_a = metadata["m"]) !== null && _a !== void 0 ? _a : "";
  const container = (_b = metadata["x"]) !== null && _b !== void 0 ? _b : "";
  const priority = (_c = metadata["p"]) !== null && _c !== void 0 ? _c : 0;
  let comparer = (el) => targetOrder - styleBucketOrderingMap[el.getAttribute(DATA_BUCKET_ATTR)];
  let styleElements = targetDocument.head.querySelectorAll(`[${DATA_BUCKET_ATTR}]`);
  if (targetBucket === "m" || targetBucket === "x") {
    const conditionElements = targetDocument.head.querySelectorAll(`[${DATA_BUCKET_ATTR}="${targetBucket}"]`);
    if (conditionElements.length) {
      styleElements = conditionElements;
      comparer = targetBucket === "m" ? (el) => renderer.compareMediaQueries(media, el.media) : (el) => {
        var _a2;
        return renderer.compareContainerQueries(container, (_a2 = el.getAttribute(DATA_CONTAINER_ATTR)) !== null && _a2 !== void 0 ? _a2 : "");
      };
    }
  }
  const comparerWithPriority = (el) => {
    if (isSameInsertionKey(el, targetBucket, metadata)) {
      return priority - Number(el.getAttribute(DATA_PRIORITY_ATTR));
    }
    return comparer(el);
  };
  const length = styleElements.length;
  let index = length - 1;
  while (index >= 0) {
    const styleElement = styleElements.item(index);
    if (comparerWithPriority(styleElement) > 0) {
      return styleElement.nextSibling;
    }
    index--;
  }
  if (length > 0) {
    return styleElements.item(0);
  }
  return insertionPoint ? insertionPoint.nextSibling : null;
}
function safeInsertRule(sheet, ruleCSS) {
  try {
    sheet.insertRule(ruleCSS);
  } catch (e) {
  }
}
let lastIndex = 0;
const defaultCompareMediaQueries = (a, b) => a < b ? -1 : a > b ? 1 : 0;
function createDOMRenderer(targetDocument = typeof document === "undefined" ? void 0 : document, options = {}) {
  const {
    classNameHashSalt,
    unstable_filterCSSRule,
    insertionPoint,
    styleElementAttributes,
    compareMediaQueries = defaultCompareMediaQueries,
    // Container queries default to the same comparator as media queries; pass `compareCSSQueries`
    // from `@griffel/sort-css-queries` for numeric min-width / max-width ordering.
    compareContainerQueries = compareMediaQueries
  } = options;
  const renderer = {
    classNameHashSalt,
    insertionCache: {},
    stylesheets: {},
    styleElementAttributes: Object.freeze(styleElementAttributes),
    compareMediaQueries,
    compareContainerQueries,
    id: `d${lastIndex++}`,
    insertCSSRules(cssRules) {
      for (const styleBucketName in cssRules) {
        const cssRulesForBucket = cssRules[styleBucketName];
        for (let i = 0, l = cssRulesForBucket.length; i < l; i++) {
          const [ruleCSS, metadata] = normalizeCSSBucketEntry(cssRulesForBucket[i]);
          const sheet = getStyleSheetForBucket(styleBucketName, targetDocument, insertionPoint || null, renderer, metadata);
          if (renderer.insertionCache[ruleCSS]) {
            continue;
          }
          renderer.insertionCache[ruleCSS] = styleBucketName;
          if (unstable_filterCSSRule) {
            if (unstable_filterCSSRule(ruleCSS)) {
              safeInsertRule(sheet, ruleCSS);
            }
          } else {
            safeInsertRule(sheet, ruleCSS);
          }
        }
      }
    }
  };
  return renderer;
}
const insertionFactory$1 = () => {
  const insertionCache = {};
  return function insertStyles(renderer, cssRules) {
    if (insertionCache[renderer.id] === void 0) {
      renderer.insertCSSRules(cssRules);
      insertionCache[renderer.id] = true;
    }
  };
};
function __styles$1(classesMapBySlot, cssRules, factory = insertionFactory$1) {
  const insertStyles = factory();
  let ltrClassNamesForSlots = null;
  let rtlClassNamesForSlots = null;
  function computeClasses(options) {
    const { dir, renderer } = options;
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
function __resetStyles$1(ltrClassName, rtlClassName, cssRules, factory = insertionFactory$1) {
  const insertStyles = factory();
  function computeClassName(options) {
    const { dir, renderer } = options;
    const className = dir === "ltr" ? ltrClassName : rtlClassName || ltrClassName;
    insertStyles(renderer, Array.isArray(cssRules) ? { r: cssRules } : cssRules);
    return className;
  }
  return computeClassName;
}
function canUseDOM$1() {
  return typeof window !== "undefined" && !!(window.document && window.document.createElement);
}
var reactExports = requireReact();
const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
const React$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: React
}, [reactExports]);
const useInsertionEffect$1 = (
  // @ts-expect-error Hack to make sure that `useInsertionEffect` will not cause bundling issues in older React versions
  // eslint-disable-next-line no-useless-concat
  React["useInsertionEffect"] ? React["useInsertionEffect"] : void 0
);
const insertionFactory = () => {
  const insertionCache = {};
  return function insert(renderer, cssRules) {
    if (useInsertionEffect$1 && canUseDOM$1()) {
      useInsertionEffect$1(() => {
        renderer.insertCSSRules(cssRules);
      }, [renderer, cssRules]);
      return;
    }
    if (insertionCache[renderer.id] === void 0) {
      renderer.insertCSSRules(cssRules);
      insertionCache[renderer.id] = true;
    }
  };
};
const RendererContext = /* @__PURE__ */ reactExports.createContext(/* @__PURE__ */ createDOMRenderer());
function useRenderer() {
  return reactExports.useContext(RendererContext);
}
const TextDirectionContext = /* @__PURE__ */ reactExports.createContext("ltr");
const TextDirectionProvider = ({ children, dir }) => {
  return jsxRuntimeExports.jsx(TextDirectionContext.Provider, { value: dir, children });
};
function useTextDirection() {
  return reactExports.useContext(TextDirectionContext);
}
function __styles(classesMapBySlot, cssRules) {
  const getStyles = __styles$1(classesMapBySlot, cssRules, insertionFactory);
  return function useClasses() {
    const dir = useTextDirection();
    const renderer = useRenderer();
    return getStyles({ dir, renderer });
  };
}
function __resetStyles(ltrClassName, rtlClassName, cssRules) {
  const getStyles = __resetStyles$1(ltrClassName, rtlClassName, cssRules, insertionFactory);
  return function useClasses() {
    const dir = useTextDirection();
    const renderer = useRenderer();
    return getStyles({ dir, renderer });
  };
}
const CSS_ESCAPE_MAP = {
  "\\": "\\5C ",
  "<": "\\3C ",
  ">": "\\3E ",
  "{": "\\7B ",
  "}": "\\7D ",
  ";": "\\3B "
};
const CSS_ESCAPE_PATTERN = /[\\<>{};]/g;
function escapeCharacter(character) {
  return `\\${character.charCodeAt(0).toString(16).toUpperCase()} `;
}
function escapeSelector(value) {
  return value.replace(/\\+[<{}]?|[<{}]/g, (match) => {
    const character = match[match.length - 1];
    if (!"<{}".includes(character)) {
      return match;
    }
    const backslashes = match.length - 1;
    return match.slice(0, backslashes - backslashes % 2) + escapeCharacter(character);
  });
}
function escapeThemeText(value) {
  return value.replace(CSS_ESCAPE_PATTERN, (match) => CSS_ESCAPE_MAP[match]);
}
function createCSSRuleFromTheme(selector, theme) {
  const escapedSelector = escapeSelector(selector);
  if (theme) {
    const cssVarsAsString = Object.keys(theme).reduce((cssVarRule, cssVar) => {
      const tokenValue = theme[cssVar];
      if (typeof tokenValue !== "string" && (typeof tokenValue !== "number" || !Number.isFinite(tokenValue))) {
        return cssVarRule;
      }
      return `${cssVarRule}--${escapeThemeText(cssVar)}: ${escapeThemeText(String(tokenValue))}; `;
    }, "");
    return `${escapedSelector} { ${cssVarsAsString} }`;
  }
  return `${escapedSelector} {}`;
}
const SLOT_RENDER_FUNCTION_SYMBOL = /* @__PURE__ */ Symbol.for("fui.slotRenderFunction");
const SLOT_ELEMENT_TYPE_SYMBOL = /* @__PURE__ */ Symbol.for("fui.slotElementType");
const SLOT_CLASS_NAME_PROP_SYMBOL = /* @__PURE__ */ Symbol.for("fui.slotClassNameProp");
function always(value, options) {
  const { defaultProps, elementType } = options;
  const props = resolveShorthand(value);
  const propsWithMetadata = {
    ...defaultProps,
    ...props,
    [SLOT_ELEMENT_TYPE_SYMBOL]: elementType,
    [SLOT_CLASS_NAME_PROP_SYMBOL]: (props === null || props === void 0 ? void 0 : props.className) || (defaultProps === null || defaultProps === void 0 ? void 0 : defaultProps.className)
  };
  if (props && typeof props.children === "function") {
    propsWithMetadata[SLOT_RENDER_FUNCTION_SYMBOL] = props.children;
    propsWithMetadata.children = defaultProps === null || defaultProps === void 0 ? void 0 : defaultProps.children;
  }
  return propsWithMetadata;
}
function optional(value, options) {
  if (value === null || value === void 0 && !options.renderByDefault) {
    return void 0;
  }
  return always(value, options);
}
function resolveShorthand(value) {
  if (typeof value === "string" || typeof value === "number" || isIterable(value) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reactExports.isValidElement(value)) {
    return {
      children: value
    };
  }
  if (value && typeof value !== "object" && false) {
    console.error(`@fluentui/react-utilities [slot.${resolveShorthand.name}]:
A slot got an invalid value "${value}" (${typeof value}).
A valid value for a slot is a slot shorthand or slot properties object.
Slot shorthands can be strings, numbers, arrays or JSX elements`);
  }
  return value;
}
const isIterable = (value) => typeof value === "object" && value !== null && Symbol.iterator in value;
function isResolvedShorthand(shorthand) {
  return shorthand !== null && typeof shorthand === "object" && !Array.isArray(shorthand) && !reactExports.isValidElement(shorthand);
}
function isSlot(element) {
  return Boolean(element === null || element === void 0 ? void 0 : element.hasOwnProperty(SLOT_ELEMENT_TYPE_SYMBOL));
}
const toObjectMap = (...items) => {
  const result = {};
  for (const item of items) {
    const keys = Array.isArray(item) ? item : Object.keys(item);
    for (const key of keys) {
      result[key] = 1;
    }
  }
  return result;
};
const baseElementEvents = toObjectMap([
  "onAuxClick",
  "onAnimationEnd",
  "onAnimationStart",
  "onCopy",
  "onCut",
  "onPaste",
  "onCompositionEnd",
  "onCompositionStart",
  "onCompositionUpdate",
  "onFocus",
  "onFocusCapture",
  "onBlur",
  "onBlurCapture",
  "onChange",
  "onInput",
  "onSubmit",
  "onLoad",
  "onError",
  "onKeyDown",
  "onKeyDownCapture",
  "onKeyPress",
  "onKeyUp",
  "onAbort",
  "onCanPlay",
  "onCanPlayThrough",
  "onDurationChange",
  "onEmptied",
  "onEncrypted",
  "onEnded",
  "onLoadedData",
  "onLoadedMetadata",
  "onLoadStart",
  "onPause",
  "onPlay",
  "onPlaying",
  "onProgress",
  "onRateChange",
  "onSeeked",
  "onSeeking",
  "onStalled",
  "onSuspend",
  "onTimeUpdate",
  "onVolumeChange",
  "onWaiting",
  "onClick",
  "onClickCapture",
  "onContextMenu",
  "onDoubleClick",
  "onDrag",
  "onDragEnd",
  "onDragEnter",
  "onDragExit",
  "onDragLeave",
  "onDragOver",
  "onDragStart",
  "onDrop",
  "onMouseDown",
  "onMouseDownCapture",
  "onMouseEnter",
  "onMouseLeave",
  "onMouseMove",
  "onMouseOut",
  "onMouseOver",
  "onMouseUp",
  "onMouseUpCapture",
  "onSelect",
  "onTouchCancel",
  "onTouchEnd",
  "onTouchMove",
  "onTouchStart",
  "onScroll",
  "onWheel",
  "onPointerCancel",
  "onPointerDown",
  "onPointerEnter",
  "onPointerLeave",
  "onPointerMove",
  "onPointerOut",
  "onPointerOver",
  "onPointerUp",
  "onGotPointerCapture",
  "onLostPointerCapture"
]);
const baseElementProperties = toObjectMap([
  "accessKey",
  "children",
  "className",
  "contentEditable",
  "dir",
  "draggable",
  "hidden",
  "htmlFor",
  "id",
  "lang",
  "popover",
  "focusgroup",
  "focusgroupstart",
  "ref",
  "role",
  "style",
  "tabIndex",
  "title",
  "translate",
  "spellCheck",
  "name"
]);
const microdataProperties = toObjectMap([
  "itemID",
  "itemProp",
  "itemRef",
  "itemScope",
  "itemType"
]);
const htmlElementProperties = toObjectMap(baseElementProperties, baseElementEvents, microdataProperties);
const labelProperties = toObjectMap(htmlElementProperties, [
  "form"
]);
const audioProperties = toObjectMap(htmlElementProperties, [
  "height",
  "loop",
  "muted",
  "preload",
  "src",
  "width"
]);
const videoProperties = toObjectMap(audioProperties, [
  "poster"
]);
const olProperties = toObjectMap(htmlElementProperties, [
  "start"
]);
const liProperties = toObjectMap(htmlElementProperties, [
  "value"
]);
const anchorProperties = toObjectMap(htmlElementProperties, [
  "download",
  "href",
  "hrefLang",
  "media",
  "referrerPolicy",
  "rel",
  "target",
  "type"
]);
const timeProperties = toObjectMap(htmlElementProperties, [
  "dateTime"
]);
const buttonProperties = toObjectMap(htmlElementProperties, [
  "autoFocus",
  "disabled",
  "form",
  "formAction",
  "formEncType",
  "formMethod",
  "formNoValidate",
  "formTarget",
  "popoverTarget",
  "popoverTargetAction",
  "type",
  "value"
]);
const inputProperties = toObjectMap(buttonProperties, [
  "accept",
  "alt",
  "autoCorrect",
  "autoCapitalize",
  "autoComplete",
  "checked",
  "dirname",
  "form",
  "height",
  "inputMode",
  "list",
  "max",
  "maxLength",
  "min",
  "minLength",
  "multiple",
  "pattern",
  "placeholder",
  "readOnly",
  "required",
  "src",
  "step",
  "size",
  "type",
  "value",
  "width"
]);
const textAreaProperties = toObjectMap(buttonProperties, [
  "autoCapitalize",
  "cols",
  "dirname",
  "form",
  "maxLength",
  "placeholder",
  "readOnly",
  "required",
  "rows",
  "wrap"
]);
const selectProperties = toObjectMap(buttonProperties, [
  "form",
  "multiple",
  "required"
]);
const optionProperties = toObjectMap(htmlElementProperties, [
  "selected",
  "value"
]);
const tableProperties = toObjectMap(htmlElementProperties, [
  "cellPadding",
  "cellSpacing"
]);
const trProperties = htmlElementProperties;
const thProperties = toObjectMap(htmlElementProperties, [
  "colSpan",
  "rowSpan",
  "scope"
]);
const tdProperties = toObjectMap(htmlElementProperties, [
  "colSpan",
  "headers",
  "rowSpan",
  "scope"
]);
const colGroupProperties = toObjectMap(htmlElementProperties, [
  "span"
]);
const colProperties = toObjectMap(htmlElementProperties, [
  "span"
]);
const fieldsetProperties = toObjectMap(htmlElementProperties, [
  "disabled",
  "form"
]);
const formProperties = toObjectMap(htmlElementProperties, [
  "acceptCharset",
  "action",
  "encType",
  "encType",
  "method",
  "noValidate",
  "target"
]);
const iframeProperties = toObjectMap(htmlElementProperties, [
  "allow",
  "allowFullScreen",
  "allowPaymentRequest",
  "allowTransparency",
  "csp",
  "height",
  "importance",
  "referrerPolicy",
  "sandbox",
  "src",
  "srcDoc",
  "width"
]);
const imgProperties = toObjectMap(htmlElementProperties, [
  "alt",
  "crossOrigin",
  "height",
  "loading",
  "src",
  "srcSet",
  "useMap",
  "width"
]);
const dialogProperties = toObjectMap(htmlElementProperties, [
  "open",
  "onCancel",
  "onClose"
]);
function getNativeProps(props, allowedPropNames, excludedPropNames) {
  const isArray = Array.isArray(allowedPropNames);
  const result = {};
  const keys = Object.keys(props);
  for (const key of keys) {
    const isNativeProp = !isArray && Object.prototype.hasOwnProperty.call(allowedPropNames, key) || isArray && allowedPropNames.indexOf(key) >= 0 || key.indexOf("data-") === 0 || key.indexOf("aria-") === 0;
    if (key !== "__proto__" && isNativeProp && (!excludedPropNames || (excludedPropNames === null || excludedPropNames === void 0 ? void 0 : excludedPropNames.indexOf(key)) === -1)) {
      result[key] = props[key];
    }
  }
  return result;
}
const nativeElementMap = {
  label: labelProperties,
  audio: audioProperties,
  video: videoProperties,
  ol: olProperties,
  li: liProperties,
  a: anchorProperties,
  button: buttonProperties,
  input: inputProperties,
  textarea: textAreaProperties,
  select: selectProperties,
  option: optionProperties,
  table: tableProperties,
  tr: trProperties,
  th: thProperties,
  td: tdProperties,
  colGroup: colGroupProperties,
  col: colProperties,
  fieldset: fieldsetProperties,
  form: formProperties,
  iframe: iframeProperties,
  img: imgProperties,
  time: timeProperties,
  dialog: dialogProperties
};
function getNativeElementProps(tagName, props, excludedPropNames) {
  const allowedPropNames = tagName && Object.prototype.hasOwnProperty.call(nativeElementMap, tagName) ? nativeElementMap[tagName] : htmlElementProperties;
  allowedPropNames.as = 1;
  return getNativeProps(props, allowedPropNames, excludedPropNames);
}
const getPartitionedNativeProps = ({ primarySlotTagName, props, excludedPropNames }) => {
  return {
    root: {
      style: props.style,
      className: props.className
    },
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    primary: getNativeElementProps(primarySlotTagName, props, [
      ...excludedPropNames || [],
      "style",
      "className"
    ])
  };
};
const getIntrinsicElementProps = (tagName, props, excludedPropNames) => {
  var _props_as;
  return getNativeElementProps((_props_as = props.as) !== null && _props_as !== void 0 ? _props_as : tagName, props, excludedPropNames);
};
const ThemeContext = reactExports.createContext(void 0);
const ThemeProvider = ThemeContext.Provider;
const ThemeClassNameContext = reactExports.createContext(void 0);
const themeClassNameContextDefaultVaue = "";
const ThemeClassNameProvider = ThemeClassNameContext.Provider;
function useThemeClassName() {
  var _React_useContext;
  return (_React_useContext = reactExports.useContext(ThemeClassNameContext)) !== null && _React_useContext !== void 0 ? _React_useContext : themeClassNameContextDefaultVaue;
}
const TooltipVisibilityContext = reactExports.createContext(void 0);
const TooltipVisibilityProvider = TooltipVisibilityContext.Provider;
const ProviderContext = reactExports.createContext(void 0);
const providerContextDefaultValue = {
  // eslint-disable-next-line @nx/workspace-no-restricted-globals -- expected ignore ( SSR friendly acquisition of globals )
  targetDocument: typeof document === "object" ? document : void 0,
  dir: "ltr"
};
const Provider = ProviderContext.Provider;
function useFluent() {
  var _React_useContext;
  return (_React_useContext = reactExports.useContext(ProviderContext)) !== null && _React_useContext !== void 0 ? _React_useContext : providerContextDefaultValue;
}
const OverridesContext = reactExports.createContext(void 0);
const OverridesProvider = OverridesContext.Provider;
function useOverrides() {
  var _React_useContext;
  return (_React_useContext = reactExports.useContext(OverridesContext)) !== null && _React_useContext !== void 0 ? _React_useContext : {};
}
const CustomStyleHooksContext = reactExports.createContext(void 0);
const noop = () => {
};
const CustomStyleHooksProvider = CustomStyleHooksContext.Provider;
const useCustomStyleHook = (hook) => {
  var _React_useContext;
  var _React_useContext_hook;
  return (_React_useContext_hook = (_React_useContext = reactExports.useContext(CustomStyleHooksContext)) === null || _React_useContext === void 0 ? void 0 : _React_useContext[hook]) !== null && _React_useContext_hook !== void 0 ? _React_useContext_hook : noop;
};
function isFactoryDispatch(newState) {
  return typeof newState === "function";
}
const useControllableState = (options) => {
  "use no memo";
  const [internalState, setInternalState] = reactExports.useState(() => {
    if (options.defaultState === void 0) {
      return options.initialState;
    }
    return isInitializer(options.defaultState) ? options.defaultState() : options.defaultState;
  });
  const stateValueRef = reactExports.useRef(options.state);
  reactExports.useEffect(() => {
    stateValueRef.current = options.state;
  }, [
    options.state
  ]);
  const setControlledState = reactExports.useCallback((newState) => {
    if (isFactoryDispatch(newState)) {
      newState(stateValueRef.current);
    }
  }, []);
  return useIsControlled(options.state) ? [
    options.state,
    setControlledState
  ] : [
    internalState,
    setInternalState
  ];
};
function isInitializer(value) {
  return typeof value === "function";
}
const useIsControlled = (controlledValue) => {
  const [isControlled] = reactExports.useState(() => controlledValue !== void 0);
  return isControlled;
};
function canUseDOM() {
  return (
    /* eslint-disable @nx/workspace-no-restricted-globals -- expected ignore ( SSR friendly acquisition of globals )*/
    typeof window !== "undefined" && !!(window.document && // eslint-disable-next-line @typescript-eslint/no-deprecated
    window.document.createElement)
  );
}
const defaultSSRContextValue = {
  current: 0
};
const SSRContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useSSRContext() {
  var _React_useContext;
  return (_React_useContext = reactExports.useContext(SSRContext)) !== null && _React_useContext !== void 0 ? _React_useContext : defaultSSRContextValue;
}
const useIsomorphicLayoutEffect = canUseDOM() ? reactExports.useLayoutEffect : reactExports.useEffect;
const useEventCallback = (fn) => {
  const callbackRef = reactExports.useRef(() => {
    throw new Error("Cannot call an event handler while rendering");
  });
  useIsomorphicLayoutEffect(() => {
    callbackRef.current = fn;
  }, [
    fn
  ]);
  return reactExports.useCallback((...args) => {
    const callback = callbackRef.current;
    return callback(...args);
  }, [
    callbackRef
  ]);
};
const IdPrefixContext = reactExports.createContext(void 0);
IdPrefixContext.Provider;
function useIdPrefix() {
  return reactExports.useContext(IdPrefixContext) || "";
}
function useId(prefix = "fui-", providedId) {
  const contextValue = useSSRContext();
  const idPrefix = useIdPrefix();
  const _useId = React$1["useId"];
  if (_useId) {
    const generatedId = _useId();
    const escapedId = reactExports.useMemo(() => generatedId.replace(/:/g, ""), [
      generatedId
    ]);
    return providedId || `${idPrefix}${prefix}${escapedId}`;
  }
  return reactExports.useMemo(() => {
    if (providedId) {
      return providedId;
    }
    return `${idPrefix}${prefix}${++contextValue.current}`;
  }, [
    idPrefix,
    prefix,
    providedId,
    contextValue
  ]);
}
function useMergedRefs(...refs) {
  const mergedCallback = reactExports.useCallback(
    // eslint-disable-next-line react-hooks/immutability
    (value) => {
      mergedCallback.current = value;
      for (const ref of refs) {
        if (typeof ref === "function") {
          ref(value);
        } else if (ref) {
          ref.current = value;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/use-memo -- already exhaustive
    [
      ...refs
    ]
  );
  return mergedCallback;
}
const IS_REACT_19_OR_HIGHER = parseInt(reactExports.version, 10) >= 19;
function getReactElementRef(element) {
  if (!element) {
    return void 0;
  }
  if (IS_REACT_19_OR_HIGHER) {
    return element.props.ref;
  }
  return element.ref;
}
function mergeCallbacks(callback1, callback2) {
  return (...args) => {
    callback1 === null || callback1 === void 0 ? void 0 : callback1(...args);
    callback2 === null || callback2 === void 0 ? void 0 : callback2(...args);
  };
}
function isHTMLElement$1(element, options) {
  var _typedElement_ownerDocument;
  const typedElement = element;
  var _options_constructorName;
  return Boolean((typedElement === null || typedElement === void 0 ? void 0 : (_typedElement_ownerDocument = typedElement.ownerDocument) === null || _typedElement_ownerDocument === void 0 ? void 0 : _typedElement_ownerDocument.defaultView) && typedElement instanceof typedElement.ownerDocument.defaultView[(_options_constructorName = options === null || options === void 0 ? void 0 : options.constructorName) !== null && _options_constructorName !== void 0 ? _options_constructorName : "HTMLElement"]);
}
function isVirtualElement(element) {
  return element && !!element._virtual;
}
function getVirtualParent(child) {
  return isVirtualElement(child) ? child._virtual.parent || null : null;
}
function getParent(child, options = {}) {
  if (!child) {
    return null;
  }
  if (!options.skipVirtual) {
    const virtualParent = getVirtualParent(child);
    if (virtualParent) {
      return virtualParent;
    }
  }
  const parent = child.parentNode;
  if (parent && parent.nodeType === 11) {
    return parent.host;
  }
  return parent;
}
function createCompatSlotComponent(type, props) {
  return {
    ...props,
    [SLOT_ELEMENT_TYPE_SYMBOL]: type
  };
}
function createJSX(runtime, slotRuntime) {
  return function jsx2(type, overrideProps, key, source, self) {
    if (isSlot(overrideProps)) {
      return slotRuntime(createCompatSlotComponent(type, overrideProps), null, key, source, self);
    }
    if (isSlot(type)) {
      return slotRuntime(type, overrideProps, key, source, self);
    }
    return runtime(type, overrideProps, key, source, self);
  };
}
function getMetadataFromSlotComponent(type) {
  const { as, [SLOT_CLASS_NAME_PROP_SYMBOL]: _classNameProp, [SLOT_ELEMENT_TYPE_SYMBOL]: baseElementType, [SLOT_RENDER_FUNCTION_SYMBOL]: renderFunction, ...propsWithoutMetadata } = type;
  const props = propsWithoutMetadata;
  const elementType = typeof baseElementType === "string" ? as !== null && as !== void 0 ? as : baseElementType : baseElementType;
  if (typeof elementType !== "string" && as) {
    props.as = as;
  }
  return {
    elementType,
    props,
    renderFunction
  };
}
const Runtime = ReactRuntime;
const jsxSlot = (type, overrideProps, key) => {
  const { elementType, renderFunction, props: slotProps } = getMetadataFromSlotComponent(type);
  const props = {
    ...slotProps,
    ...overrideProps
  };
  if (renderFunction) {
    return Runtime.jsx(reactExports.Fragment, {
      children: renderFunction(elementType, props)
    }, key);
  }
  return Runtime.jsx(elementType, props, key);
};
const jsxsSlot = (type, overrideProps, key) => {
  const { elementType, renderFunction, props: slotProps } = getMetadataFromSlotComponent(type);
  const props = {
    ...slotProps,
    ...overrideProps
  };
  if (renderFunction) {
    return Runtime.jsx(reactExports.Fragment, {
      children: renderFunction(elementType, {
        ...props,
        children: Runtime.jsxs(reactExports.Fragment, {
          children: props.children
        }, void 0)
      })
    }, key);
  }
  return Runtime.jsxs(elementType, props, key);
};
const jsx = createJSX(Runtime.jsx, jsxSlot);
const jsxs = createJSX(Runtime.jsxs, jsxsSlot);
const IconDirectionContext = reactExports.createContext(void 0);
const IconDirectionContextDefaultValue = {};
const IconDirectionContextProvider = IconDirectionContext.Provider;
const useIconContext = () => {
  const context = reactExports.useContext(IconDirectionContext);
  return context !== null && context !== void 0 ? context : IconDirectionContextDefaultValue;
};
const renderFluentProvider_unstable = (state, contextValues) => {
  return /* @__PURE__ */ jsx(Provider, {
    value: contextValues.provider,
    children: /* @__PURE__ */ jsx(ThemeProvider, {
      value: contextValues.theme,
      children: /* @__PURE__ */ jsx(ThemeClassNameProvider, {
        value: contextValues.themeClassName,
        children: /* @__PURE__ */ jsx(CustomStyleHooksProvider, {
          value: contextValues.customStyleHooks_unstable,
          children: /* @__PURE__ */ jsx(TooltipVisibilityProvider, {
            value: contextValues.tooltip,
            children: /* @__PURE__ */ jsx(TextDirectionProvider, {
              dir: contextValues.textDirection,
              children: /* @__PURE__ */ jsx(IconDirectionContextProvider, {
                value: contextValues.iconDirection,
                children: /* @__PURE__ */ jsx(OverridesProvider, {
                  value: contextValues.overrides_unstable,
                  children: /* @__PURE__ */ jsxs(state.root, {
                    children: [
                      canUseDOM() ? null : /* @__PURE__ */ jsx("style", {
                        // Using dangerous HTML because react can escape characters
                        // which can lead to invalid CSS.
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML: {
                          __html: state.serverStyleProps.cssRule
                        },
                        ...state.serverStyleProps.attributes
                      }),
                      state.root.children
                    ]
                  })
                })
              })
            })
          })
        })
      })
    })
  });
};
const TABSTER_ATTRIBUTE_NAME = "data-tabster";
const TABSTER_DUMMY_INPUT_ATTRIBUTE_NAME = "data-tabster-dummy";
const FOCUSABLE_SELECTOR = `:is(${[
  "a[href]",
  "button",
  "input",
  "select",
  "textarea",
  "*[tabindex]",
  "*[contenteditable]",
  "details > summary",
  "audio[controls]",
  "video[controls]"
].join(", ")}):not(:disabled)`;
const AsyncFocusSources = {
  EscapeGroupper: 1,
  Restorer: 2,
  Deloser: 3
};
const RestorerTypes = {
  Source: 0,
  Target: 1
};
const GroupperTabbabilities = {
  Unlimited: 0,
  Limited: 1,
  // The tabbability is limited to the container and explicit Enter is needed to go inside.
  LimitedTrapFocus: 2
  // The focus is limited as above, plus trapped when inside.
};
const GroupperMoveFocusActions = {
  Enter: 1
};
const SysDummyInputsPositions = {
  Outside: 2
  // Tabster will always place dummy inputs outside of the container.
};
function getTabsterOnElement(tabster, element) {
  return tabster.storageEntry(element)?.tabster;
}
function updateTabsterByAttribute(tabster, element, dispose) {
  const newAttrValue = dispose || tabster._noop ? void 0 : element.getAttribute(TABSTER_ATTRIBUTE_NAME);
  let entry = tabster.storageEntry(element);
  let newAttr;
  if (newAttrValue) {
    if (newAttrValue !== entry?.attr?.string) {
      try {
        const newValue = JSON.parse(newAttrValue);
        if (typeof newValue !== "object") {
          throw new Error(`Value is not a JSON object, got '${newAttrValue}'.`);
        }
        newAttr = {
          string: newAttrValue,
          object: newValue
        };
      } catch (e) {
      }
    } else {
      return;
    }
  } else if (!entry) {
    return;
  }
  if (!entry) {
    entry = tabster.storageEntry(element, true);
  }
  if (!entry.tabster) {
    entry.tabster = {};
  }
  const tabsterOnElement = entry.tabster || {};
  const oldTabsterProps = entry.attr?.object || {};
  const newTabsterProps = newAttr?.object || {};
  for (const key of Object.keys(oldTabsterProps)) {
    if (!newTabsterProps[key]) {
      if (key === "root") {
        const root = tabsterOnElement[key];
        if (root) {
          tabster.root.onRoot(root, true);
        }
      }
      switch (key) {
        case "deloser":
        case "root":
        case "groupper":
        case "modalizer":
        case "restorer":
        case "mover":
          const part = tabsterOnElement[key];
          if (part) {
            part.dispose();
            delete tabsterOnElement[key];
          }
          break;
        case "observed":
          delete tabsterOnElement[key];
          if (tabster.observedElement) {
            tabster.observedElement.onObservedElementUpdate(element);
          }
          break;
        case "focusable":
        case "outline":
        case "uncontrolled":
        case "sys":
          delete tabsterOnElement[key];
          break;
      }
    }
  }
  for (const key of Object.keys(newTabsterProps)) {
    const sys = newTabsterProps.sys;
    switch (key) {
      case "root":
        if (tabsterOnElement.root) {
          tabsterOnElement.root.setProps(newTabsterProps.root);
        } else {
          tabsterOnElement.root = tabster.root.createRoot(element, newTabsterProps.root, sys);
        }
        tabster.root.onRoot(tabsterOnElement.root);
        break;
      case "focusable":
        tabsterOnElement.focusable = newTabsterProps.focusable;
        break;
      case "observed":
        if (tabster.observedElement) {
          tabsterOnElement.observed = newTabsterProps.observed;
          tabster.observedElement.onObservedElementUpdate(element);
        }
        break;
      case "uncontrolled":
        tabsterOnElement.uncontrolled = newTabsterProps.uncontrolled;
        break;
      case "outline":
        if (tabster.outline) {
          tabsterOnElement.outline = newTabsterProps.outline;
        }
        break;
      case "sys":
        tabsterOnElement.sys = newTabsterProps.sys;
        break;
      default: {
        const handler = tabster.attrHandlers.get(key);
        if (handler) {
          tabsterOnElement[key] = handler(element, tabsterOnElement[key], newTabsterProps[key], oldTabsterProps?.[key], sys);
        }
      }
    }
  }
  if (newAttr) {
    entry.attr = newAttr;
  } else {
    if (Object.keys(tabsterOnElement).length === 0) {
      delete entry.tabster;
      delete entry.attr;
    }
    tabster.storageEntry(element, false);
  }
}
const addEventListener = (target, type, handler) => {
  target.addEventListener(type, handler, true);
};
const removeEventListener = (target, type, handler) => {
  target.removeEventListener(type, handler, true);
};
const KEYBORG_FOCUSIN = "keyborg:focusin";
const KEYBORG_FOCUSOUT = "keyborg:focusout";
const FOCUS_IN_HANDLER = 0;
const FOCUS_OUT_HANDLER = 1;
const SHADOW_TARGETS = 2;
const LAST_FOCUSED_PROGRAMMATICALLY = 3;
function nativeFocus(element) {
  const focus = element.focus;
  if (focus.__keyborgNativeFocus) focus.__keyborgNativeFocus.call(element);
  else element.focus();
}
function setupFocusEvent(win) {
  const kwin = win;
  const doc = kwin.document;
  const proto = kwin.HTMLElement.prototype;
  const origFocusDescriptor = Object.getOwnPropertyDescriptor(proto, "focus");
  if (origFocusDescriptor?.value?.__keyborgNativeFocus) return;
  focus.__keyborgNativeFocus = callNativeFocus;
  focus.__keyborgFocusDescriptor = origFocusDescriptor;
  Object.defineProperty(proto, "focus", {
    configurable: origFocusDescriptor?.configurable ?? true,
    enumerable: origFocusDescriptor?.enumerable ?? false,
    writable: true,
    value: focus
  });
  const shadowTargets = /* @__PURE__ */ new Set();
  const focusOutHandler = (e) => {
    const target = e.target;
    if (!target) return;
    const event = new CustomEvent(KEYBORG_FOCUSOUT, {
      cancelable: true,
      bubbles: true,
      composed: true,
      detail: { originalEvent: e }
    });
    target.dispatchEvent(event);
  };
  const focusInHandler = (e) => {
    const target = e.target;
    if (!target) return;
    let node = e.composedPath()[0];
    const currentShadows = /* @__PURE__ */ new Set();
    while (node) if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      currentShadows.add(node);
      node = node.host;
    } else node = node.parentNode;
    for (const shadowRootWeakRef of shadowTargets) {
      const shadowRoot = shadowRootWeakRef.deref();
      if (!shadowRoot || !currentShadows.has(shadowRoot)) {
        shadowTargets.delete(shadowRootWeakRef);
        if (shadowRoot) {
          removeEventListener(shadowRoot, "focusin", focusInHandler);
          removeEventListener(shadowRoot, "focusout", focusOutHandler);
        }
      }
    }
    onFocusIn(target, e.relatedTarget || void 0);
  };
  const onFocusIn = (target, relatedTarget, originalEvent) => {
    const shadowRoot = target.shadowRoot;
    if (shadowRoot) {
      for (const shadowRootWeakRef of shadowTargets) if (shadowRootWeakRef.deref() === shadowRoot) return;
      addEventListener(shadowRoot, "focusin", focusInHandler);
      addEventListener(shadowRoot, "focusout", focusOutHandler);
      shadowTargets.add(new WeakRef(shadowRoot));
      return;
    }
    const details = {
      relatedTarget,
      originalEvent
    };
    const event = new CustomEvent(KEYBORG_FOCUSIN, {
      cancelable: true,
      bubbles: true,
      composed: true,
      detail: details
    });
    details.isFocusedProgrammatically = target === data[LAST_FOCUSED_PROGRAMMATICALLY]?.deref();
    data[LAST_FOCUSED_PROGRAMMATICALLY] = void 0;
    target.dispatchEvent(event);
  };
  const data = [
    focusInHandler,
    focusOutHandler,
    shadowTargets
  ];
  kwin.__keyborgData = data;
  addEventListener(doc, "focusin", focusInHandler);
  addEventListener(doc, "focusout", focusOutHandler);
  function focus() {
    const d = kwin.__keyborgData;
    if (d) d[LAST_FOCUSED_PROGRAMMATICALLY] = new WeakRef(this);
    return callNativeFocus.apply(this, arguments);
  }
  function callNativeFocus() {
    const originalFocus = origFocusDescriptor?.get ? origFocusDescriptor.get.call(this) : origFocusDescriptor?.value;
    if (typeof originalFocus !== "function") throw new TypeError("HTMLElement.prototype.focus is not callable");
    return originalFocus.apply(this, arguments);
  }
  let activeElement = doc.activeElement;
  while (activeElement && activeElement.shadowRoot) {
    onFocusIn(activeElement);
    activeElement = activeElement.shadowRoot.activeElement;
  }
}
function disposeFocusEvent(win) {
  const kwin = win;
  const proto = kwin.HTMLElement.prototype;
  const focus = Object.getOwnPropertyDescriptor(proto, "focus")?.value;
  const origFocusDescriptor = focus?.__keyborgFocusDescriptor;
  const data = kwin.__keyborgData;
  if (data) {
    const doc = kwin.document;
    removeEventListener(doc, "focusin", data[FOCUS_IN_HANDLER]);
    removeEventListener(doc, "focusout", data[FOCUS_OUT_HANDLER]);
    for (const shadowRootWeakRef of data[SHADOW_TARGETS]) {
      const shadowRoot = shadowRootWeakRef.deref();
      if (shadowRoot) {
        removeEventListener(shadowRoot, "focusin", data[FOCUS_IN_HANDLER]);
        removeEventListener(shadowRoot, "focusout", data[FOCUS_OUT_HANDLER]);
      }
    }
    data[SHADOW_TARGETS].clear();
    delete kwin.__keyborgData;
  }
  if (focus?.__keyborgNativeFocus) if (origFocusDescriptor) Object.defineProperty(proto, "focus", origFocusDescriptor);
  else delete proto.focus;
}
let _lastId = 0;
function createKeyborgCore(targetWindow) {
  let currentTargetWindow = targetWindow;
  let isNavigating = false;
  let isMouseOrTouchUsedTimer;
  const broadcast = () => {
    const refs = currentTargetWindow?.__keyborg?.refs;
    if (refs) for (const id of Object.keys(refs)) refs[id]._cb.forEach((cb) => cb(isNavigating));
  };
  const setNavigating = (val) => {
    if (isNavigating !== val) {
      isNavigating = val;
      broadcast();
    }
  };
  const shouldTrigger = (e) => {
    if (e.key === "Tab") return true;
    const active = currentTargetWindow?.document.activeElement;
    return !(active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.isContentEditable));
  };
  const onFocusIn = (e) => {
    if (isMouseOrTouchUsedTimer) return;
    if (isNavigating) return;
    const details = e.detail;
    if (!details.relatedTarget) return;
    if (details.isFocusedProgrammatically || details.isFocusedProgrammatically === void 0) return;
    setNavigating(true);
  };
  const onMouseOrTouch = () => {
    if (currentTargetWindow) {
      if (isMouseOrTouchUsedTimer) currentTargetWindow.clearTimeout(isMouseOrTouchUsedTimer);
      isMouseOrTouchUsedTimer = currentTargetWindow.setTimeout(() => {
        isMouseOrTouchUsedTimer = void 0;
      }, 1e3);
    }
    setNavigating(false);
  };
  const onMouseDown = (e) => {
    if (e.buttons === 0 || e.clientX === 0 && e.clientY === 0 && e.screenX === 0 && e.screenY === 0) return;
    onMouseOrTouch();
  };
  const onKeyDown = (e) => {
    if (!isNavigating && shouldTrigger(e)) setNavigating(true);
  };
  const targetDocument = targetWindow.document;
  addEventListener(targetDocument, KEYBORG_FOCUSIN, onFocusIn);
  addEventListener(targetDocument, "mousedown", onMouseDown);
  addEventListener(targetWindow, "keydown", onKeyDown);
  addEventListener(targetDocument, "touchstart", onMouseOrTouch);
  addEventListener(targetDocument, "touchend", onMouseOrTouch);
  addEventListener(targetDocument, "touchcancel", onMouseOrTouch);
  setupFocusEvent(targetWindow);
  const dispose = () => {
    if (!currentTargetWindow) return;
    if (isMouseOrTouchUsedTimer) {
      currentTargetWindow.clearTimeout(isMouseOrTouchUsedTimer);
      isMouseOrTouchUsedTimer = void 0;
    }
    disposeFocusEvent(currentTargetWindow);
    const targetDocument2 = currentTargetWindow.document;
    removeEventListener(targetDocument2, KEYBORG_FOCUSIN, onFocusIn);
    removeEventListener(targetDocument2, "mousedown", onMouseDown);
    removeEventListener(currentTargetWindow, "keydown", onKeyDown);
    removeEventListener(targetDocument2, "touchstart", onMouseOrTouch);
    removeEventListener(targetDocument2, "touchend", onMouseOrTouch);
    removeEventListener(targetDocument2, "touchcancel", onMouseOrTouch);
    currentTargetWindow = void 0;
  };
  return {
    dispose,
    get isNavigatingWithKeyboard() {
      return isNavigating;
    },
    set isNavigatingWithKeyboard(val) {
      setNavigating(val);
    }
  };
}
function createKeyborg(win) {
  const kwin = win;
  const id = "k" + ++_lastId;
  let localWin = kwin;
  let core;
  const callbacks = [];
  const existing = kwin.__keyborg;
  if (existing) core = existing.core;
  else core = createKeyborgCore(kwin);
  const instance = {
    isNavigatingWithKeyboard() {
      return !!core?.isNavigatingWithKeyboard;
    },
    subscribe(callback) {
      callbacks.push(callback);
    },
    unsubscribe(callback) {
      const index = callbacks.indexOf(callback);
      if (index >= 0) callbacks.splice(index, 1);
    },
    setVal(val) {
      if (core) core.isNavigatingWithKeyboard = val;
    },
    _cb: callbacks,
    dispose() {
      const wkb = localWin?.__keyborg;
      if (wkb?.refs[id]) {
        delete wkb.refs[id];
        if (Object.keys(wkb.refs).length === 0) {
          wkb.core.dispose();
          delete localWin.__keyborg;
        }
      }
      callbacks.length = 0;
      core = void 0;
      localWin = void 0;
    }
  };
  if (existing) existing.refs[id] = instance;
  else kwin.__keyborg = {
    core,
    refs: { [id]: instance }
  };
  return instance;
}
function disposeKeyborg(instance) {
  instance.dispose();
}
const TabsterFocusInEventName = "tabster:focusin";
const TabsterFocusOutEventName = "tabster:focusout";
const TabsterMoveFocusEventName = "tabster:movefocus";
const ModalizerActiveEventName = "tabster:modalizer:active";
const ModalizerInactiveEventName = "tabster:modalizer:inactive";
const GroupperMoveFocusEventName = "tabster:groupper:movefocus";
const RestorerRestoreFocusEventName = "tabster:restorer:restore-focus";
const RootFocusEventName = "tabster:root:focus";
const RootBlurEventName = "tabster:root:blur";
const CustomEvent_ = typeof CustomEvent !== "undefined" ? CustomEvent : function() {
};
class TabsterCustomEvent extends CustomEvent_ {
  constructor(type, detail) {
    super(type, {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail
    });
    this.details = detail;
  }
}
class TabsterFocusInEvent extends TabsterCustomEvent {
  constructor(detail) {
    super(TabsterFocusInEventName, detail);
  }
}
class TabsterFocusOutEvent extends TabsterCustomEvent {
  constructor(detail) {
    super(TabsterFocusOutEventName, detail);
  }
}
class TabsterMoveFocusEvent extends TabsterCustomEvent {
  constructor(detail) {
    super(TabsterMoveFocusEventName, detail);
  }
}
class ModalizerActiveEvent extends TabsterCustomEvent {
  constructor(detail) {
    super(ModalizerActiveEventName, detail);
  }
}
class ModalizerInactiveEvent extends TabsterCustomEvent {
  constructor(detail) {
    super(ModalizerInactiveEventName, detail);
  }
}
class RestorerRestoreFocusEvent extends TabsterCustomEvent {
  constructor() {
    super(RestorerRestoreFocusEventName);
  }
}
class RootFocusEvent extends TabsterCustomEvent {
  constructor(detail) {
    super(RootFocusEventName, detail);
  }
}
class RootBlurEvent extends TabsterCustomEvent {
  constructor(detail) {
    super(RootBlurEventName, detail);
  }
}
const _createMutationObserver = (callback) => new MutationObserver(callback);
const _createTreeWalker = (doc, root, whatToShow, filter) => doc.createTreeWalker(root, whatToShow, filter);
const _getParentNode = (node) => node ? node.parentNode : null;
const _getParentElement = (element) => element ? element.parentElement : null;
const _nodeContains = (parent, child) => !!(child && parent?.contains(child));
const _getActiveElement = (doc) => doc.activeElement;
const _querySelector = (element, selector) => element.querySelector(selector);
const _querySelectorAll = (element, selector) => Array.prototype.slice.call(element.querySelectorAll(selector), 0);
const _getElementById = (doc, id) => doc.getElementById(id);
const _getFirstChild = (node) => node?.firstChild || null;
const _getLastChild = (node) => node?.lastChild || null;
const _getNextSibling = (node) => node?.nextSibling || null;
const _getPreviousSibling = (node) => node?.previousSibling || null;
const _getFirstElementChild = (element) => element?.firstElementChild || null;
const _getLastElementChild = (element) => element?.lastElementChild || null;
const _getNextElementSibling = (element) => element?.nextElementSibling || null;
const _getPreviousElementSibling = (element) => element?.previousElementSibling || null;
const _appendChild = (parent, child) => parent.appendChild(child);
const _insertBefore = (parent, child, referenceChild) => parent.insertBefore(child, referenceChild);
const _getSelection = (ref) => ref.ownerDocument?.getSelection() || null;
const _getElementsByName = (referenceElement, name) => referenceElement.ownerDocument.getElementsByName(name);
const dom = {
  createMutationObserver: _createMutationObserver,
  createTreeWalker: _createTreeWalker,
  getParentNode: _getParentNode,
  getParentElement: _getParentElement,
  nodeContains: _nodeContains,
  getActiveElement: _getActiveElement,
  querySelector: _querySelector,
  querySelectorAll: _querySelectorAll,
  getElementById: _getElementById,
  getFirstChild: _getFirstChild,
  getLastChild: _getLastChild,
  getNextSibling: _getNextSibling,
  getPreviousSibling: _getPreviousSibling,
  getFirstElementChild: _getFirstElementChild,
  getLastElementChild: _getLastElementChild,
  getNextElementSibling: _getNextElementSibling,
  getPreviousElementSibling: _getPreviousElementSibling,
  appendChild: _appendChild,
  insertBefore: _insertBefore,
  getSelection: _getSelection,
  getElementsByName: _getElementsByName
};
function setDOMAPI(domapi) {
  for (const key of Object.keys(domapi)) {
    dom[key] = domapi[key];
  }
}
let _uidCounter = 0;
function getInstanceContext(getWindow) {
  const win = getWindow();
  return win.__tabsterInstanceContext ??= {
    elementByUId: {},
    containerBoundingRectCache: {},
    lastContainerBoundingRectCacheId: 0
  };
}
function disposeInstanceContext(win) {
  const w = win;
  const ctx = w.__tabsterInstanceContext;
  if (ctx) {
    ctx.elementByUId = {};
    ctx.containerBoundingRectCache = {};
    if (ctx.containerBoundingRectCacheTimer) {
      win.clearTimeout(ctx.containerBoundingRectCacheTimer);
    }
    delete w.__tabsterInstanceContext;
  }
}
function hasSubFocusable(element) {
  return !!element.querySelector(FOCUSABLE_SELECTOR);
}
class WeakHTMLElement {
  constructor(element, data) {
    this._ref = new WeakRef(element);
    this._data = data;
  }
  get() {
    const ref = this._ref;
    let element;
    if (ref) {
      element = ref.deref();
      if (!element) {
        delete this._ref;
      }
    }
    return element;
  }
  getData() {
    return this._data;
  }
}
function createElementTreeWalker(doc, root, acceptNode) {
  if (root.nodeType !== Node.ELEMENT_NODE) {
    return void 0;
  }
  return dom.createTreeWalker(doc, root, NodeFilter.SHOW_ELEMENT, {
    acceptNode
  });
}
function makeFocusIgnored(element) {
  element.__shouldIgnoreFocus = true;
}
function shouldIgnoreFocus(element) {
  return !!element.__shouldIgnoreFocus;
}
function getUId(wnd) {
  const rnd = new Uint32Array(4);
  wnd.crypto.getRandomValues(rnd);
  return Array.from(rnd, (n) => n.toString(36)).join("") + "|" + (++_uidCounter).toString(36) + "|" + Date.now().toString(36);
}
function getElementUId(getWindow, element) {
  const context = getInstanceContext(getWindow);
  const uid = element.__tabsterElementUID ??= getUId(getWindow());
  if (!context.elementByUId[uid] && documentContains(element.ownerDocument, element)) {
    context.elementByUId[uid] = new WeakHTMLElement(element);
  }
  return uid;
}
function clearElementCache(getWindow, parent) {
  const cache = getInstanceContext(getWindow).elementByUId;
  for (const key of Object.keys(cache)) {
    const el = cache[key]?.get();
    if (parent && el && !dom.nodeContains(parent, el)) {
      continue;
    }
    delete cache[key];
  }
}
function documentContains(doc, element) {
  return dom.nodeContains(doc?.body, element);
}
function matchesSelector(element, selector) {
  return typeof element.matches === "function" && element.matches(selector);
}
let _lastTabsterPartId = 0;
class TabsterPart {
  constructor(tabster, element, props) {
    this._tabster = tabster;
    this._element = new WeakHTMLElement(element);
    this._props = { ...props };
    this.id = "i" + ++_lastTabsterPartId;
  }
  getElement() {
    return this._element.get();
  }
  getProps() {
    return this._props;
  }
  setProps(props) {
    this._props = { ...props };
  }
}
function getLastChild(container) {
  let lastChild = null;
  for (let i = dom.getLastElementChild(container); i; i = dom.getLastElementChild(i)) {
    lastChild = i;
  }
  return lastChild || void 0;
}
function getAdjacentElement(from, prev) {
  let cur = from;
  let adjacent = null;
  while (cur && !adjacent) {
    adjacent = prev ? dom.getPreviousElementSibling(cur) : dom.getNextElementSibling(cur);
    cur = dom.getParentElement(cur);
  }
  return adjacent || void 0;
}
function augmentAttribute(tabster, element, name, value) {
  const entry = tabster.storageEntry(element, true);
  let ret = false;
  if (!entry.aug) {
    if (value === void 0) {
      return ret;
    }
    entry.aug = {};
  }
  if (value === void 0) {
    if (name in entry.aug) {
      const origVal = entry.aug[name];
      delete entry.aug[name];
      if (origVal === null) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, origVal);
      }
      ret = true;
    }
  } else {
    let origValue;
    if (!(name in entry.aug)) {
      origValue = element.getAttribute(name);
    }
    if (origValue !== void 0 && origValue !== value) {
      entry.aug[name] = origValue;
      if (value === null) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value);
      }
      ret = true;
    }
  }
  if (value === void 0 && Object.keys(entry.aug).length === 0) {
    delete entry.aug;
    tabster.storageEntry(element, false);
  }
  return ret;
}
function isDisplayNone(element) {
  const elementDocument = element.ownerDocument;
  const computedStyle = elementDocument.defaultView?.getComputedStyle(element);
  if (element.offsetParent === null && elementDocument.body !== element && computedStyle?.position !== "fixed") {
    return true;
  }
  if (computedStyle?.visibility === "hidden") {
    return true;
  }
  if (computedStyle?.position === "fixed") {
    if (computedStyle.display === "none") {
      return true;
    }
    if (element.parentElement?.offsetParent === null && elementDocument.body !== element.parentElement) {
      return true;
    }
  }
  return false;
}
function isRadio(element) {
  return element.tagName === "INPUT" && !!element.name && element.type === "radio";
}
function getRadioButtonGroup(element) {
  if (!isRadio(element)) {
    return;
  }
  const name = element.name;
  const radioButtons = [];
  let checked;
  for (const el of dom.getElementsByName(element, name)) {
    if (isRadio(el)) {
      const input = el;
      radioButtons.push(input);
      if (input.checked) {
        checked = input;
      }
    }
  }
  return {
    name,
    buttons: new Set(radioButtons),
    checked
  };
}
function addListener(target, type, handler, options) {
  target?.addEventListener(type, handler, options);
}
function removeListener(target, type, handler, options) {
  target?.removeEventListener(type, handler, options);
}
function dispatchEvent(target, event) {
  return !!target && target.dispatchEvent(event);
}
const _updateDummyInputsTimeout = 100;
class DummyInput {
  constructor(getWindow, isOutside, props, element, fixedTarget) {
    this._focusIn = (e) => {
      if (this._fixedTarget) {
        const target = this._fixedTarget.get();
        if (target) {
          nativeFocus(target);
        }
        return;
      }
      const input2 = this.input;
      if (this.onFocusIn && input2) {
        const relatedTarget = e.relatedTarget;
        this.onFocusIn(this, this._isBackward(true, input2, relatedTarget), relatedTarget);
      }
    };
    this._focusOut = (e) => {
      if (this._fixedTarget) {
        return;
      }
      this.useDefaultAction = false;
      const input2 = this.input;
      if (this.onFocusOut && input2) {
        const relatedTarget = e.relatedTarget;
        this.onFocusOut(this, this._isBackward(false, input2, relatedTarget), relatedTarget);
      }
    };
    const win = getWindow();
    const input = win.document.createElement("i");
    input.tabIndex = 0;
    input.setAttribute("role", "none");
    input.setAttribute(TABSTER_DUMMY_INPUT_ATTRIBUTE_NAME, "");
    input.setAttribute("aria-hidden", "true");
    const style = input.style;
    style.position = "fixed";
    style.width = style.height = "1px";
    style.opacity = "0.001";
    style.zIndex = "-1";
    style.setProperty("content-visibility", "hidden");
    makeFocusIgnored(input);
    this.input = input;
    this.isFirst = props.isFirst;
    this.isOutside = isOutside;
    this._isPhantom = props.isPhantom ?? false;
    this._fixedTarget = fixedTarget;
    addListener(input, "focusin", this._focusIn);
    addListener(input, "focusout", this._focusOut);
    input.__tabsterDummyContainer = element;
    if (this._isPhantom) {
      this._disposeTimer = win.setTimeout(() => {
        delete this._disposeTimer;
        this.dispose();
      }, 0);
      this._clearDisposeTimeout = () => {
        if (this._disposeTimer) {
          win.clearTimeout(this._disposeTimer);
          delete this._disposeTimer;
        }
        delete this._clearDisposeTimeout;
      };
    }
  }
  dispose() {
    if (this._clearDisposeTimeout) {
      this._clearDisposeTimeout();
    }
    const input = this.input;
    if (!input) {
      return;
    }
    delete this._fixedTarget;
    delete this.onFocusIn;
    delete this.onFocusOut;
    delete this.input;
    removeListener(input, "focusin", this._focusIn);
    removeListener(input, "focusout", this._focusOut);
    delete input.__tabsterDummyContainer;
    dom.getParentNode(input)?.removeChild(input);
  }
  setTopLeft(top, left) {
    const style = this.input?.style;
    if (style) {
      style.top = `${top}px`;
      style.left = `${left}px`;
    }
  }
  _isBackward(isIn, current, previous) {
    return isIn && !previous ? !this.isFirst : !!(previous && current.compareDocumentPosition(previous) & Node.DOCUMENT_POSITION_FOLLOWING);
  }
}
const DummyInputManagerPriorities = {
  Root: 1,
  Modalizer: 2,
  Groupper: 4
};
class DummyInputManager {
  constructor(tabster, element, priority, sys, outsideByDefault, callForDefaultAction) {
    this._element = element;
    this._instance = new DummyInputManagerCore(tabster, element, this, priority, sys, outsideByDefault, callForDefaultAction);
  }
  _setHandlers(onFocusIn, onFocusOut) {
    this._onFocusIn = onFocusIn;
    this._onFocusOut = onFocusOut;
  }
  moveOut(backwards) {
    this._instance?.moveOut(backwards);
  }
  moveOutWithDefaultAction(backwards, relatedEvent) {
    this._instance?.moveOutWithDefaultAction(backwards, relatedEvent);
  }
  getHandler(isIn) {
    return isIn ? this._onFocusIn : this._onFocusOut;
  }
  setTabbable(tabbable) {
    this._instance?.setTabbable(this, tabbable);
  }
  dispose() {
    if (this._instance) {
      this._instance.dispose(this);
      delete this._instance;
    }
    delete this._onFocusIn;
    delete this._onFocusOut;
  }
  static moveWithPhantomDummy(tabster, element, moveOutOfElement, isBackward, relatedEvent) {
    const dummy = new DummyInput(tabster.getWindow, true, {
      isPhantom: true,
      isFirst: true
    });
    const input = dummy.input;
    if (input) {
      let parent;
      let insertBefore;
      if (element.tagName === "BODY") {
        parent = element;
        insertBefore = moveOutOfElement && isBackward || !moveOutOfElement && !isBackward ? dom.getFirstElementChild(element) : null;
      } else {
        if (moveOutOfElement && (!isBackward || isBackward && !tabster.focusable.isFocusable(element, false, true, true))) {
          parent = element;
          insertBefore = isBackward ? element.firstElementChild : null;
        } else {
          parent = dom.getParentElement(element);
          insertBefore = moveOutOfElement && isBackward || !moveOutOfElement && !isBackward ? element : dom.getNextElementSibling(element);
        }
        let potentialDummy;
        let dummyFor;
        do {
          potentialDummy = moveOutOfElement && isBackward || !moveOutOfElement && !isBackward ? dom.getPreviousElementSibling(insertBefore) : insertBefore;
          dummyFor = getDummyInputContainer(potentialDummy);
          if (dummyFor === element) {
            insertBefore = moveOutOfElement && isBackward || !moveOutOfElement && !isBackward ? potentialDummy : dom.getNextElementSibling(potentialDummy);
          } else {
            dummyFor = null;
          }
        } while (dummyFor);
      }
      if (parent && dispatchEvent(parent, new TabsterMoveFocusEvent({
        by: "root",
        owner: parent,
        next: null,
        relatedEvent
      }))) {
        dom.insertBefore(parent, input, insertBefore);
        nativeFocus(input);
      }
    }
  }
  static addPhantomDummyWithTarget(tabster, sourceElement, isBackward, targetElement) {
    const dummy = new DummyInput(tabster.getWindow, true, {
      isPhantom: true,
      isFirst: true
    }, void 0, new WeakHTMLElement(targetElement));
    const input = dummy.input;
    if (input) {
      let dummyParent;
      let insertBefore;
      if (hasSubFocusable(sourceElement) && !isBackward) {
        dummyParent = sourceElement;
        insertBefore = dom.getFirstElementChild(sourceElement);
      } else {
        dummyParent = dom.getParentElement(sourceElement);
        insertBefore = isBackward ? sourceElement : dom.getNextElementSibling(sourceElement);
      }
      if (dummyParent) {
        dom.insertBefore(dummyParent, input, insertBefore);
      }
    }
  }
}
class DummyInputObserver {
  constructor(win) {
    this._updateQueue = /* @__PURE__ */ new Set();
    this._lastUpdateQueueTime = 0;
    this._changedParents = /* @__PURE__ */ new WeakSet();
    this._dummyElements = [];
    this._dummyCallbacks = /* @__PURE__ */ new WeakMap();
    this._domChanged = (parent) => {
      if (this._changedParents.has(parent)) {
        return;
      }
      this._changedParents.add(parent);
      if (this._updateDummyInputsTimer) {
        return;
      }
      this._updateDummyInputsTimer = this._win?.().setTimeout(() => {
        delete this._updateDummyInputsTimer;
        for (const ref of this._dummyElements) {
          const dummyElement = ref.get();
          if (dummyElement) {
            const callback = this._dummyCallbacks.get(dummyElement);
            if (callback) {
              const dummyParent = dom.getParentNode(dummyElement);
              if (!dummyParent || this._changedParents.has(dummyParent)) {
                callback();
              }
            }
          }
        }
        this._changedParents = /* @__PURE__ */ new WeakSet();
      }, _updateDummyInputsTimeout);
    };
    this._win = win;
  }
  add(dummy, callback) {
    if (!this._dummyCallbacks.has(dummy) && this._win) {
      this._dummyElements.push(new WeakHTMLElement(dummy));
      this._dummyCallbacks.set(dummy, callback);
      this.domChanged = this._domChanged;
    }
  }
  remove(dummy) {
    this._dummyElements = this._dummyElements.filter((ref) => {
      const element = ref.get();
      return element && element !== dummy;
    });
    this._dummyCallbacks.delete(dummy);
    if (this._dummyElements.length === 0) {
      delete this.domChanged;
    }
  }
  dispose() {
    const win = this._win?.();
    if (this._updateTimer) {
      win?.clearTimeout(this._updateTimer);
      delete this._updateTimer;
    }
    if (this._updateDummyInputsTimer) {
      win?.clearTimeout(this._updateDummyInputsTimer);
      delete this._updateDummyInputsTimer;
    }
    this._changedParents = /* @__PURE__ */ new WeakSet();
    this._dummyCallbacks = /* @__PURE__ */ new WeakMap();
    this._dummyElements = [];
    this._updateQueue.clear();
    delete this.domChanged;
    delete this._win;
  }
  updatePositions(compute) {
    if (!this._win) {
      return;
    }
    this._updateQueue.add(compute);
    this._lastUpdateQueueTime = Date.now();
    this._scheduledUpdatePositions();
  }
  _scheduledUpdatePositions() {
    if (this._updateTimer) {
      return;
    }
    this._updateTimer = this._win?.().setTimeout(() => {
      delete this._updateTimer;
      if (this._lastUpdateQueueTime + _updateDummyInputsTimeout <= Date.now()) {
        const scrollTopLeftCache = /* @__PURE__ */ new Map();
        const setTopLeftCallbacks = [];
        for (const compute of this._updateQueue) {
          setTopLeftCallbacks.push(compute(scrollTopLeftCache));
        }
        this._updateQueue.clear();
        for (const setTopLeft of setTopLeftCallbacks) {
          setTopLeft();
        }
        scrollTopLeftCache.clear();
      } else {
        this._scheduledUpdatePositions();
      }
    }, _updateDummyInputsTimeout);
  }
}
class DummyInputManagerCore {
  constructor(tabster, element, manager, priority, sys, outsideByDefault, callForDefaultAction) {
    this._wrappers = [];
    this._isOutside = false;
    this._transformElements = /* @__PURE__ */ new Set();
    this._onFocusIn = (dummyInput, isBackward, relatedTarget) => {
      this._onFocus(true, dummyInput, isBackward, relatedTarget);
    };
    this._onFocusOut = (dummyInput, isBackward, relatedTarget) => {
      this._onFocus(false, dummyInput, isBackward, relatedTarget);
    };
    this.moveOut = (backwards) => {
      const first = this._firstDummy;
      const last = this._lastDummy;
      if (first && last) {
        this._ensurePosition();
        const firstInput = first.input;
        const lastInput = last.input;
        const element2 = this._element?.get();
        if (firstInput && lastInput && element2) {
          let toFocus;
          if (backwards) {
            firstInput.tabIndex = 0;
            toFocus = firstInput;
          } else {
            lastInput.tabIndex = 0;
            toFocus = lastInput;
          }
          if (toFocus) {
            nativeFocus(toFocus);
          }
        }
      }
    };
    this.moveOutWithDefaultAction = (backwards, relatedEvent) => {
      const first = this._firstDummy;
      const last = this._lastDummy;
      if (first && last) {
        this._ensurePosition();
        const firstInput = first.input;
        const lastInput = last.input;
        const element2 = this._element?.get();
        if (firstInput && lastInput && element2) {
          let toFocus;
          if (backwards) {
            if (!first.isOutside && this._tabster.focusable.isFocusable(element2, true, true, true)) {
              toFocus = element2;
            } else {
              first.useDefaultAction = true;
              firstInput.tabIndex = 0;
              toFocus = firstInput;
            }
          } else {
            last.useDefaultAction = true;
            lastInput.tabIndex = 0;
            toFocus = lastInput;
          }
          if (toFocus && dispatchEvent(element2, new TabsterMoveFocusEvent({
            by: "root",
            owner: element2,
            next: null,
            relatedEvent
          }))) {
            nativeFocus(toFocus);
          }
        }
      }
    };
    this.setTabbable = (manager2, tabbable) => {
      for (const w of this._wrappers) {
        if (w.manager === manager2) {
          w.tabbable = tabbable;
          break;
        }
      }
      const wrapper = this._getCurrent();
      if (wrapper) {
        const tabIndex = wrapper.tabbable ? 0 : -1;
        let input = this._firstDummy?.input;
        if (input) {
          input.tabIndex = tabIndex;
        }
        input = this._lastDummy?.input;
        if (input) {
          input.tabIndex = tabIndex;
        }
      }
    };
    this._addDummyInputs = () => {
      if (this._addTimer) {
        return;
      }
      this._addTimer = this._getWindow().setTimeout(() => {
        delete this._addTimer;
        this._ensurePosition();
        this._addTransformOffsets();
      }, 0);
    };
    this._addTransformOffsets = () => {
      this._tabster._dummyObserver.updatePositions(this._computeTransformOffsets);
    };
    this._computeTransformOffsets = (scrollTopLeftCache) => {
      const from = this._firstDummy?.input || this._lastDummy?.input;
      const transformElements = this._transformElements;
      const newTransformElements = /* @__PURE__ */ new Set();
      let scrollTop = 0;
      let scrollLeft = 0;
      const win = this._getWindow();
      for (let element2 = from; element2 && element2.nodeType === Node.ELEMENT_NODE; element2 = dom.getParentElement(element2)) {
        let scrollTopLeft = scrollTopLeftCache.get(element2);
        if (scrollTopLeft === void 0) {
          const transform = win.getComputedStyle(element2).transform;
          if (transform && transform !== "none") {
            scrollTopLeft = {
              scrollTop: element2.scrollTop,
              scrollLeft: element2.scrollLeft
            };
          }
          scrollTopLeftCache.set(element2, scrollTopLeft || null);
        }
        if (scrollTopLeft) {
          newTransformElements.add(element2);
          if (!transformElements.has(element2)) {
            addListener(element2, "scroll", this._addTransformOffsets);
          }
          scrollTop += scrollTopLeft.scrollTop;
          scrollLeft += scrollTopLeft.scrollLeft;
        }
      }
      for (const el2 of transformElements) {
        if (!newTransformElements.has(el2)) {
          removeListener(el2, "scroll", this._addTransformOffsets);
        }
      }
      this._transformElements = newTransformElements;
      return () => {
        this._firstDummy?.setTopLeft(scrollTop, scrollLeft);
        this._lastDummy?.setTopLeft(scrollTop, scrollLeft);
      };
    };
    const el = element.get();
    if (!el) {
      throw new Error("No element");
    }
    this._tabster = tabster;
    this._getWindow = tabster.getWindow;
    this._callForDefaultAction = callForDefaultAction;
    const instance = el.__tabsterDummy;
    (instance || this)._wrappers.push({
      manager,
      priority,
      tabbable: true
    });
    if (instance) {
      return instance;
    }
    el.__tabsterDummy = this;
    const forcedDummyPosition = sys?.dummyInputsPosition;
    const tagName = el.tagName;
    this._isOutside = !forcedDummyPosition ? (outsideByDefault || tagName === "UL" || tagName === "OL" || tagName === "TABLE") && !(tagName === "LI" || tagName === "TD" || tagName === "TH") : forcedDummyPosition === SysDummyInputsPositions.Outside;
    this._firstDummy = new DummyInput(this._getWindow, this._isOutside, {
      isFirst: true
    }, element);
    this._lastDummy = new DummyInput(this._getWindow, this._isOutside, {
      isFirst: false
    }, element);
    const dummyElement = this._firstDummy.input;
    dummyElement && tabster._dummyObserver.add(dummyElement, this._addDummyInputs);
    this._firstDummy.onFocusIn = this._onFocusIn;
    this._firstDummy.onFocusOut = this._onFocusOut;
    this._lastDummy.onFocusIn = this._onFocusIn;
    this._lastDummy.onFocusOut = this._onFocusOut;
    this._element = element;
    this._addDummyInputs();
  }
  dispose(manager, force) {
    const wrappers = this._wrappers = this._wrappers.filter((w) => w.manager !== manager && !force);
    if (wrappers.length === 0) {
      delete (this._element?.get()).__tabsterDummy;
      for (const el of this._transformElements) {
        removeListener(el, "scroll", this._addTransformOffsets);
      }
      this._transformElements.clear();
      const win = this._getWindow();
      if (this._addTimer) {
        win.clearTimeout(this._addTimer);
        delete this._addTimer;
      }
      const dummyElement = this._firstDummy?.input;
      dummyElement && this._tabster._dummyObserver.remove(dummyElement);
      this._firstDummy?.dispose();
      this._lastDummy?.dispose();
    }
  }
  _onFocus(isIn, dummyInput, isBackward, relatedTarget) {
    const wrapper = this._getCurrent();
    if (wrapper && (!dummyInput.useDefaultAction || this._callForDefaultAction)) {
      wrapper.manager.getHandler(isIn)?.(dummyInput, isBackward, relatedTarget);
    }
  }
  _getCurrent() {
    this._wrappers.sort((a, b) => {
      if (a.tabbable !== b.tabbable) {
        return a.tabbable ? -1 : 1;
      }
      return a.priority - b.priority;
    });
    return this._wrappers[0];
  }
  _ensurePosition() {
    const element = this._element?.get();
    const firstDummyInput = this._firstDummy?.input;
    const lastDummyInput = this._lastDummy?.input;
    if (!element || !firstDummyInput || !lastDummyInput) {
      return;
    }
    if (this._isOutside) {
      const elementParent = dom.getParentNode(element);
      if (elementParent) {
        const nextSibling = dom.getNextSibling(element);
        if (nextSibling !== lastDummyInput) {
          dom.insertBefore(elementParent, lastDummyInput, nextSibling);
        }
        if (dom.getPreviousElementSibling(element) !== firstDummyInput) {
          dom.insertBefore(elementParent, firstDummyInput, element);
        }
      }
    } else {
      if (dom.getLastElementChild(element) !== lastDummyInput) {
        dom.appendChild(element, lastDummyInput);
      }
      const firstElementChild = dom.getFirstElementChild(element);
      if (firstElementChild && firstElementChild !== firstDummyInput && firstElementChild.parentNode) {
        dom.insertBefore(firstElementChild.parentNode, firstDummyInput, firstElementChild);
      }
    }
  }
}
function getDummyInputContainer(element) {
  return element?.__tabsterDummyContainer?.get() || null;
}
function getTabsterAttribute(props, plain) {
  const attr = JSON.stringify(props);
  {
    return attr;
  }
}
function mergeTabsterProps(props, newProps) {
  for (const key of Object.keys(newProps)) {
    const value = newProps[key];
    if (value) {
      props[key] = value;
    } else {
      delete props[key];
    }
  }
}
function setTabsterAttribute(element, newProps, update) {
  let props;
  {
    const attr = element.getAttribute(TABSTER_ATTRIBUTE_NAME);
    if (attr) {
      try {
        props = JSON.parse(attr);
      } catch (e) {
      }
    }
  }
  if (!props) {
    props = {};
  }
  mergeTabsterProps(props, newProps);
  if (Object.keys(props).length > 0) {
    element.setAttribute(TABSTER_ATTRIBUTE_NAME, getTabsterAttribute(props));
  } else {
    element.removeAttribute(TABSTER_ATTRIBUTE_NAME);
  }
}
class RootDummyManager extends DummyInputManager {
  constructor(tabster, element, setFocused, sys) {
    super(tabster, element, DummyInputManagerPriorities.Root, sys, void 0, true);
    this._onDummyInputFocus = (dummyInput) => {
      if (dummyInput.useDefaultAction) {
        this._setFocused(false);
      } else {
        this._tabster.keyboardNavigation.setNavigatingWithKeyboard(true);
        const element2 = this._element.get();
        if (element2) {
          this._setFocused(true);
          const toFocus = this._tabster.focusedElement.getFirstOrLastTabbable(dummyInput.isFirst, { container: element2, ignoreAccessibility: true });
          if (toFocus) {
            nativeFocus(toFocus);
            return;
          }
        }
        dummyInput.input?.blur();
      }
    };
    this._setHandlers(this._onDummyInputFocus);
    this._tabster = tabster;
    this._setFocused = setFocused;
  }
}
class Root extends TabsterPart {
  constructor(tabster, element, onDispose, props, sys) {
    super(tabster, element, props);
    this._isFocused = false;
    this._setFocused = (hasFocused) => {
      if (this._setFocusedTimer) {
        this._tabster.getWindow().clearTimeout(this._setFocusedTimer);
        delete this._setFocusedTimer;
      }
      if (this._isFocused === hasFocused) {
        return;
      }
      const element2 = this._element.get();
      if (element2) {
        if (hasFocused) {
          this._isFocused = true;
          this._dummyManager?.setTabbable(false);
          dispatchEvent(element2, new RootFocusEvent({ element: element2 }));
        } else {
          this._setFocusedTimer = this._tabster.getWindow().setTimeout(() => {
            delete this._setFocusedTimer;
            this._isFocused = false;
            this._dummyManager?.setTabbable(true);
            dispatchEvent(element2, new RootBlurEvent({ element: element2 }));
          }, 0);
        }
      }
    };
    this._onFocusIn = (event) => {
      const getParent2 = this._tabster.getParent;
      const rootElement = this._element.get();
      let curElement = event.composedPath()[0];
      do {
        if (curElement === rootElement) {
          this._setFocused(true);
          return;
        }
        curElement = curElement && getParent2(curElement);
      } while (curElement);
    };
    this._onFocusOut = () => {
      this._setFocused(false);
    };
    this._onDispose = onDispose;
    const win = tabster.getWindow;
    this.uid = getElementUId(win, element);
    this._sys = sys;
    if (tabster.controlTab || tabster.rootDummyInputs) {
      this.addDummyInputs();
    }
    const w = win();
    const doc = w.document;
    addListener(doc, KEYBORG_FOCUSIN, this._onFocusIn);
    addListener(doc, KEYBORG_FOCUSOUT, this._onFocusOut);
    this._add();
  }
  addDummyInputs() {
    if (!this._dummyManager) {
      this._dummyManager = new RootDummyManager(this._tabster, this._element, this._setFocused, this._sys);
    }
  }
  dispose() {
    this._onDispose(this);
    const win = this._tabster.getWindow();
    const doc = win.document;
    removeListener(doc, KEYBORG_FOCUSIN, this._onFocusIn);
    removeListener(doc, KEYBORG_FOCUSOUT, this._onFocusOut);
    if (this._setFocusedTimer) {
      win.clearTimeout(this._setFocusedTimer);
      delete this._setFocusedTimer;
    }
    this._dummyManager?.dispose();
    this._remove();
  }
  moveOutWithDefaultAction(isBackward, relatedEvent) {
    const dummyManager = this._dummyManager;
    if (dummyManager) {
      dummyManager.moveOutWithDefaultAction(isBackward, relatedEvent);
    } else {
      const el = this.getElement();
      if (el) {
        RootDummyManager.moveWithPhantomDummy(this._tabster, el, true, isBackward, relatedEvent);
      }
    }
  }
  _add() {
  }
  _remove() {
  }
}
class RootAPI {
  constructor(tabster, autoRoot) {
    this._autoRootWaiting = false;
    this._roots = {};
    this._forceDummy = false;
    this.rootById = {};
    this._autoRootCreate = () => {
      const doc = this._win().document;
      const body = doc.body;
      if (body) {
        this._autoRootUnwait(doc);
        const props = this._autoRoot;
        if (props) {
          setTabsterAttribute(body, { root: props });
          updateTabsterByAttribute(this._tabster, body);
          return getTabsterOnElement(this._tabster, body)?.root;
        }
      } else if (!this._autoRootWaiting) {
        this._autoRootWaiting = true;
        addListener(doc, "readystatechange", this._autoRootCreate);
      }
      return void 0;
    };
    this._onRootDispose = (root) => {
      delete this._roots[root.id];
    };
    this._tabster = tabster;
    this._win = tabster.getWindow;
    this._autoRoot = autoRoot;
    tabster.queueInit(() => {
      if (this._autoRoot) {
        this._autoRootCreate();
      }
    });
  }
  _autoRootUnwait(doc) {
    removeListener(doc, "readystatechange", this._autoRootCreate);
    this._autoRootWaiting = false;
  }
  dispose() {
    const win = this._win();
    this._autoRootUnwait(win.document);
    delete this._autoRoot;
    Object.keys(this._roots).forEach((rootId) => {
      if (this._roots[rootId]) {
        this._roots[rootId].dispose();
        delete this._roots[rootId];
      }
    });
    this.rootById = {};
  }
  createRoot(element, props, sys) {
    const newRoot = new Root(this._tabster, element, this._onRootDispose, props, sys);
    this._roots[newRoot.id] = newRoot;
    if (this._forceDummy) {
      newRoot.addDummyInputs();
    }
    return newRoot;
  }
  addDummyInputs() {
    this._forceDummy = true;
    const roots = this._roots;
    for (const id of Object.keys(roots)) {
      roots[id].addDummyInputs();
    }
  }
  static getRootByUId(getWindow, id) {
    const tabster = getWindow().__tabsterInstance;
    return tabster && tabster.root.rootById[id];
  }
  /**
   * Fetches the tabster context for an element walking up its ancestors
   *
   * @param tabster Tabster instance
   * @param element The element the tabster context should represent
   * @param options Additional options
   * @returns undefined if the element is not a child of a tabster root, otherwise all applicable tabster behaviours and configurations
   */
  static getTabsterContext(tabster, element, options = {}) {
    if (!element.ownerDocument) {
      return void 0;
    }
    const { checkRtl, referenceElement } = options;
    const getParent2 = tabster.getParent;
    tabster.drainInitQueue();
    let root;
    let modalizer;
    let groupper;
    let mover;
    let excludedFromMover = false;
    let groupperBeforeMover;
    let modalizerInGroupper;
    let dirRightToLeft;
    let uncontrolled;
    let curElement = referenceElement || element;
    const ignoreKeydown = {};
    while (curElement && (!root || checkRtl)) {
      const tabsterOnElement = getTabsterOnElement(tabster, curElement);
      if (checkRtl && dirRightToLeft === void 0) {
        const dir = curElement.dir;
        if (dir) {
          dirRightToLeft = dir.toLowerCase() === "rtl";
        }
      }
      if (!tabsterOnElement) {
        curElement = getParent2(curElement);
        continue;
      }
      const tagName = curElement.tagName;
      if ((tabsterOnElement.uncontrolled || tagName === "IFRAME" || tagName === "WEBVIEW") && tabster.focusable.isVisible(curElement)) {
        uncontrolled = curElement;
      }
      if (!mover && tabsterOnElement.focusable?.excludeFromMover && !groupper) {
        excludedFromMover = true;
      }
      const curModalizer = tabsterOnElement.modalizer;
      const curGroupper = tabsterOnElement.groupper;
      const curMover = tabsterOnElement.mover;
      if (!modalizer && curModalizer) {
        modalizer = curModalizer;
      }
      if (!groupper && curGroupper && (!modalizer || curModalizer)) {
        if (modalizer) {
          if (!curGroupper.isActive() && curGroupper.getProps().tabbability && modalizer.userId !== tabster.modalizer?.activeId) {
            modalizer = void 0;
            groupper = curGroupper;
          }
          modalizerInGroupper = curGroupper;
        } else {
          groupper = curGroupper;
        }
      }
      if (!mover && curMover && (!modalizer || curModalizer) && (!curGroupper || curElement !== element) && curElement.contains(element)) {
        mover = curMover;
        groupperBeforeMover = !!groupper && groupper !== curGroupper;
      }
      if (tabsterOnElement.root) {
        root = tabsterOnElement.root;
      }
      if (tabsterOnElement.focusable?.ignoreKeydown) {
        Object.assign(ignoreKeydown, tabsterOnElement.focusable.ignoreKeydown);
      }
      curElement = getParent2(curElement);
    }
    if (!root) {
      const rootAPI = tabster.root;
      const autoRoot = rootAPI._autoRoot;
      if (autoRoot) {
        if (element.ownerDocument?.body) {
          root = rootAPI._autoRootCreate();
        }
      }
    }
    if (groupper && !mover) {
      groupperBeforeMover = true;
    }
    const shouldIgnoreKeydown = (event) => !!ignoreKeydown[event.key];
    return root ? {
      root,
      modalizer,
      groupper,
      mover,
      groupperBeforeMover,
      modalizerInGroupper,
      rtl: checkRtl ? !!dirRightToLeft : void 0,
      uncontrolled,
      excludedFromMover,
      ignoreKeydown: shouldIgnoreKeydown
    } : void 0;
  }
  static getRoot(tabster, element) {
    const getParent2 = tabster.getParent;
    for (let el = element; el; el = getParent2(el)) {
      const root = getTabsterOnElement(tabster, el)?.root;
      if (root) {
        return root;
      }
    }
    return void 0;
  }
  onRoot(root, removed) {
    if (removed) {
      delete this.rootById[root.uid];
    } else {
      this.rootById[root.uid] = root;
    }
  }
}
class FocusableAPI {
  constructor(tabster) {
    this._tabster = tabster;
  }
  dispose() {
  }
  getProps(element) {
    const tabsterOnElement = getTabsterOnElement(this._tabster, element);
    return tabsterOnElement && tabsterOnElement.focusable || {};
  }
  isFocusable(el, includeProgrammaticallyFocusable, noVisibleCheck, noAccessibleCheck) {
    if (matchesSelector(el, FOCUSABLE_SELECTOR) && (includeProgrammaticallyFocusable || el.tabIndex !== -1)) {
      return (noVisibleCheck || this.isVisible(el)) && (noAccessibleCheck || this.isAccessible(el));
    }
    return false;
  }
  isVisible(el) {
    if (!el.ownerDocument || el.nodeType !== Node.ELEMENT_NODE) {
      return false;
    }
    if (isDisplayNone(el)) {
      return false;
    }
    const rect = el.ownerDocument.body.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      return false;
    }
    return true;
  }
  isAccessible(el) {
    for (let e = el; e; e = dom.getParentElement(e)) {
      const tabsterOnElement = getTabsterOnElement(this._tabster, e);
      if (this._isHidden(e)) {
        return false;
      }
      const ignoreDisabled = tabsterOnElement?.focusable?.ignoreAriaDisabled;
      if (!ignoreDisabled && this._isDisabled(e)) {
        return false;
      }
    }
    return true;
  }
  _isDisabled(el) {
    return el.hasAttribute("disabled");
  }
  _isHidden(el) {
    const attrVal = el.getAttribute("aria-hidden");
    if (attrVal && attrVal.toLowerCase() === "true") {
      if (!this._tabster.modalizer?.isAugmented(el)) {
        return true;
      }
    }
    return false;
  }
  findFirst(options, out) {
    return this.findElement({
      ...options
    }, out);
  }
  findLast(options, out) {
    return this.findElement({
      isBackward: true,
      ...options
    }, out);
  }
  findNext(options, out) {
    return this.findElement({ ...options }, out);
  }
  findPrev(options, out) {
    return this.findElement({ ...options, isBackward: true }, out);
  }
  findDefault(options, out) {
    return this.findElement({
      ...options,
      acceptCondition: (el) => this.isFocusable(el, options.includeProgrammaticallyFocusable) && !!this.getProps(el).isDefault
    }, out) || null;
  }
  findAll(options) {
    return this._findElements(true, options) || [];
  }
  findElement(options, out) {
    const found = this._findElements(false, options, out);
    return found ? found[0] : found;
  }
  _findElements(isFindAll, options, out) {
    const { container, currentElement = null, includeProgrammaticallyFocusable, useActiveModalizer, ignoreAccessibility, modalizerId, isBackward, onElement } = options;
    if (!out) {
      out = {};
    }
    const elements = [];
    let { acceptCondition } = options;
    const hasCustomCondition = !!acceptCondition;
    if (!container) {
      return null;
    }
    if (!acceptCondition) {
      acceptCondition = (el) => this.isFocusable(el, includeProgrammaticallyFocusable, false, ignoreAccessibility);
    }
    const acceptElementState = {
      container,
      modalizerUserId: modalizerId === void 0 && useActiveModalizer ? this._tabster.modalizer?.activeId : modalizerId || RootAPI.getTabsterContext(this._tabster, container)?.modalizer?.userId,
      from: currentElement || container,
      isBackward,
      isFindAll,
      acceptCondition,
      hasCustomCondition,
      includeProgrammaticallyFocusable,
      ignoreAccessibility,
      cachedGrouppers: {},
      cachedRadioGroups: {}
    };
    const walker = createElementTreeWalker(container.ownerDocument, container, (node) => this._acceptElement(node, acceptElementState));
    if (!walker) {
      return null;
    }
    const prepareForNextElement = (shouldContinueIfNotFound) => {
      const foundElement = acceptElementState.foundElement ?? acceptElementState.foundBackward;
      if (foundElement) {
        elements.push(foundElement);
      }
      if (isFindAll) {
        if (foundElement) {
          acceptElementState.found = false;
          delete acceptElementState.foundElement;
          delete acceptElementState.foundBackward;
          delete acceptElementState.fromCtx;
          acceptElementState.from = foundElement;
          if (onElement && !onElement(foundElement)) {
            return false;
          }
        }
        return !!(foundElement || shouldContinueIfNotFound);
      } else {
        if (foundElement && out) {
          out.uncontrolled = RootAPI.getTabsterContext(this._tabster, foundElement)?.uncontrolled;
        }
        return !!(shouldContinueIfNotFound && !foundElement);
      }
    };
    if (!currentElement) {
      out.outOfDOMOrder = true;
    }
    if (currentElement && dom.nodeContains(container, currentElement)) {
      walker.currentNode = currentElement;
    } else if (isBackward) {
      const lastChild = getLastChild(container);
      if (!lastChild) {
        return null;
      }
      if (this._acceptElement(lastChild, acceptElementState) === NodeFilter.FILTER_ACCEPT && !prepareForNextElement(true)) {
        if (acceptElementState.skippedFocusable) {
          out.outOfDOMOrder = true;
        }
        return elements;
      }
      walker.currentNode = lastChild;
    }
    do {
      if (isBackward) {
        walker.previousNode();
      } else {
        walker.nextNode();
      }
    } while (prepareForNextElement());
    if (acceptElementState.skippedFocusable) {
      out.outOfDOMOrder = true;
    }
    return elements.length ? elements : null;
  }
  _acceptElement(element, state) {
    if (state.found) {
      return NodeFilter.FILTER_ACCEPT;
    }
    const foundBackward = state.foundBackward;
    if (foundBackward && (element === foundBackward || !dom.nodeContains(foundBackward, element))) {
      state.found = true;
      state.foundElement = foundBackward;
      return NodeFilter.FILTER_ACCEPT;
    }
    const container = state.container;
    if (element === container) {
      return NodeFilter.FILTER_SKIP;
    }
    if (!dom.nodeContains(container, element)) {
      return NodeFilter.FILTER_REJECT;
    }
    if (getDummyInputContainer(element)) {
      return NodeFilter.FILTER_REJECT;
    }
    if (dom.nodeContains(state.rejectElementsFrom, element)) {
      return NodeFilter.FILTER_REJECT;
    }
    const ctx = state.currentCtx = RootAPI.getTabsterContext(this._tabster, element);
    if (!ctx) {
      return NodeFilter.FILTER_SKIP;
    }
    if (shouldIgnoreFocus(element)) {
      if (this.isFocusable(element, void 0, true, true)) {
        state.skippedFocusable = true;
      }
      return NodeFilter.FILTER_SKIP;
    }
    if (!state.hasCustomCondition && (element.tagName === "IFRAME" || element.tagName === "WEBVIEW")) {
      if (this.isVisible(element) && ctx.modalizer?.userId === this._tabster.modalizer?.activeId) {
        state.found = true;
        state.rejectElementsFrom = state.foundElement = element;
        return NodeFilter.FILTER_ACCEPT;
      } else {
        return NodeFilter.FILTER_REJECT;
      }
    }
    if (!state.ignoreAccessibility && !this.isAccessible(element)) {
      if (this.isFocusable(element, false, true, true)) {
        state.skippedFocusable = true;
      }
      return NodeFilter.FILTER_REJECT;
    }
    let result;
    let fromCtx = state.fromCtx;
    if (!fromCtx) {
      fromCtx = state.fromCtx = RootAPI.getTabsterContext(this._tabster, state.from);
    }
    const fromMover = fromCtx?.mover;
    let groupper = ctx.groupper;
    let mover = ctx.mover;
    result = this._tabster.modalizer?.acceptElement(element, state);
    if (result !== void 0) {
      state.skippedFocusable = true;
    }
    if (result === void 0 && (groupper || mover || fromMover)) {
      const groupperElement = groupper?.getElement();
      const fromMoverElement = fromMover?.getElement();
      let moverElement = mover?.getElement();
      if (moverElement && dom.nodeContains(fromMoverElement, moverElement) && dom.nodeContains(container, fromMoverElement) && (!groupperElement || !mover || dom.nodeContains(fromMoverElement, groupperElement))) {
        mover = fromMover;
        moverElement = fromMoverElement;
      }
      if (groupperElement) {
        if (groupperElement === container || !dom.nodeContains(container, groupperElement)) {
          groupper = void 0;
        } else if (!dom.nodeContains(groupperElement, element)) {
          return NodeFilter.FILTER_REJECT;
        }
      }
      if (moverElement) {
        if (!dom.nodeContains(container, moverElement)) {
          mover = void 0;
        } else if (!dom.nodeContains(moverElement, element)) {
          return NodeFilter.FILTER_REJECT;
        }
      }
      if (groupper && mover) {
        if (moverElement && groupperElement && !dom.nodeContains(groupperElement, moverElement)) {
          mover = void 0;
        } else {
          groupper = void 0;
        }
      }
      if (groupper) {
        result = groupper.acceptElement(element, state);
      }
      if (mover) {
        result = mover.acceptElement(element, state);
      }
    }
    if (result === void 0) {
      result = state.acceptCondition(element) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      if (result === NodeFilter.FILTER_SKIP && this.isFocusable(element, false, true, true)) {
        state.skippedFocusable = true;
      }
    }
    if (result === NodeFilter.FILTER_ACCEPT && !state.found) {
      if (!state.isFindAll && isRadio(element) && !element.checked) {
        const radioGroupName = element.name;
        let radioGroup = state.cachedRadioGroups[radioGroupName];
        if (!radioGroup) {
          radioGroup = getRadioButtonGroup(element);
          if (radioGroup) {
            state.cachedRadioGroups[radioGroupName] = radioGroup;
          }
        }
        if (radioGroup?.checked && radioGroup.checked !== element) {
          return NodeFilter.FILTER_SKIP;
        }
      }
      if (state.isBackward) {
        state.foundBackward = element;
        result = NodeFilter.FILTER_SKIP;
      } else {
        state.found = true;
        state.foundElement = element;
      }
    }
    return result;
  }
}
const Keys = {
  Tab: "Tab",
  Enter: "Enter",
  Escape: "Escape"
};
class Subscribable {
  constructor() {
    this._callbacks = [];
  }
  dispose() {
    this._callbacks = [];
    delete this._val;
  }
  subscribe(callback) {
    const callbacks = this._callbacks;
    const index = callbacks.indexOf(callback);
    if (index < 0) {
      callbacks.push(callback);
    }
  }
  subscribeFirst(callback) {
    const callbacks = this._callbacks;
    const index = callbacks.indexOf(callback);
    if (index >= 0) {
      callbacks.splice(index, 1);
    }
    callbacks.unshift(callback);
  }
  unsubscribe(callback) {
    const index = this._callbacks.indexOf(callback);
    if (index >= 0) {
      this._callbacks.splice(index, 1);
    }
  }
  setVal(val, detail) {
    if (this._val === val) {
      return;
    }
    this._val = val;
    this._callCallbacks(val, detail);
  }
  getVal() {
    return this._val;
  }
  trigger(val, detail) {
    this._callCallbacks(val, detail);
  }
  _callCallbacks(val, detail) {
    this._callbacks.forEach((callback) => callback(val, detail));
  }
}
function getUncontrolledCompletelyContainer(tabster, element) {
  const getParent2 = tabster.getParent;
  let el = element;
  do {
    const uncontrolledOnElement = getTabsterOnElement(tabster, el)?.uncontrolled;
    if (uncontrolledOnElement && tabster.uncontrolled.isUncontrolledCompletely(el, !!uncontrolledOnElement.completely)) {
      return el;
    }
    el = getParent2(el);
  } while (el);
  return void 0;
}
const AsyncFocusIntentPriorityBySource = {
  [AsyncFocusSources.Restorer]: 0,
  [AsyncFocusSources.Deloser]: 1,
  [AsyncFocusSources.EscapeGroupper]: 2
};
class FocusedElementState extends Subscribable {
  static {
    this.isTabbing = false;
  }
  constructor(tabster, getWindow) {
    super();
    this._init = () => {
      const win = this._win();
      const doc = win.document;
      addListener(doc, KEYBORG_FOCUSIN, this._onFocusIn, true);
      addListener(doc, KEYBORG_FOCUSOUT, this._onFocusOut, true);
      addListener(win, "keydown", this._onKeyDown, true);
      const activeElement = dom.getActiveElement(doc);
      if (activeElement && activeElement !== doc.body) {
        this._setFocusedElement(activeElement);
      }
      this.subscribe(this._onChanged);
    };
    this._onFocusIn = (e) => {
      const target = e.composedPath()[0];
      if (target) {
        this._setFocusedElement(target, e.detail.relatedTarget, e.detail.isFocusedProgrammatically);
      }
    };
    this._onFocusOut = (e) => {
      this._setFocusedElement(void 0, e.detail?.originalEvent.relatedTarget);
    };
    this._validateFocusedElement = (element) => {
    };
    this._onKeyDown = (event) => {
      if (event.key !== Keys.Tab || event.ctrlKey) {
        return;
      }
      const currentElement = this.getVal();
      if (!currentElement || !currentElement.ownerDocument || currentElement.contentEditable === "true") {
        return;
      }
      const tabster2 = this._tabster;
      const controlTab = tabster2.controlTab;
      const ctx = RootAPI.getTabsterContext(tabster2, currentElement);
      if (!ctx || ctx.ignoreKeydown(event)) {
        return;
      }
      const isBackward = event.shiftKey;
      const next = FocusedElementState.findNextTabbable(tabster2, ctx, void 0, currentElement, void 0, isBackward, true);
      const rootElement = ctx.root.getElement();
      if (!rootElement) {
        return;
      }
      const nextElement = next?.element;
      const uncontrolledCompletelyContainer = getUncontrolledCompletelyContainer(tabster2, currentElement);
      if (nextElement) {
        const nextUncontrolled = next.uncontrolled;
        if (ctx.uncontrolled || dom.nodeContains(nextUncontrolled, currentElement)) {
          if (!next.outOfDOMOrder && nextUncontrolled === ctx.uncontrolled || uncontrolledCompletelyContainer && !dom.nodeContains(uncontrolledCompletelyContainer, nextElement)) {
            return;
          }
          DummyInputManager.addPhantomDummyWithTarget(tabster2, currentElement, isBackward, nextElement);
          return;
        }
        if (nextUncontrolled && tabster2.focusable.isVisible(nextUncontrolled) || nextElement.tagName === "IFRAME" && tabster2.focusable.isVisible(nextElement)) {
          if (dispatchEvent(rootElement, new TabsterMoveFocusEvent({
            by: "root",
            owner: rootElement,
            next: nextElement,
            relatedEvent: event
          }))) {
            DummyInputManager.moveWithPhantomDummy(tabster2, nextUncontrolled ?? nextElement, false, isBackward, event);
          }
          return;
        }
        if (controlTab || next?.outOfDOMOrder) {
          if (dispatchEvent(rootElement, new TabsterMoveFocusEvent({
            by: "root",
            owner: rootElement,
            next: nextElement,
            relatedEvent: event
          }))) {
            event.preventDefault();
            event.stopImmediatePropagation();
            nativeFocus(nextElement);
          }
        }
      } else {
        if (!uncontrolledCompletelyContainer && dispatchEvent(rootElement, new TabsterMoveFocusEvent({
          by: "root",
          owner: rootElement,
          next: null,
          relatedEvent: event
        }))) {
          ctx.root.moveOutWithDefaultAction(isBackward, event);
        }
      }
    };
    this._onChanged = (element, detail) => {
      if (element) {
        dispatchEvent(element, new TabsterFocusInEvent(detail));
      } else {
        const last = this._lastVal?.get();
        if (last) {
          const d = { ...detail };
          const lastCtx = RootAPI.getTabsterContext(this._tabster, last);
          const modalizerId = lastCtx?.modalizer?.userId;
          if (modalizerId) {
            d.modalizerId = modalizerId;
          }
          dispatchEvent(last, new TabsterFocusOutEvent(d));
        }
      }
    };
    this._tabster = tabster;
    this._win = getWindow;
    tabster.queueInit(this._init);
  }
  dispose() {
    super.dispose();
    const win = this._win();
    const doc = win.document;
    removeListener(doc, KEYBORG_FOCUSIN, this._onFocusIn, true);
    removeListener(doc, KEYBORG_FOCUSOUT, this._onFocusOut, true);
    removeListener(win, "keydown", this._onKeyDown, true);
    this.unsubscribe(this._onChanged);
    const asyncFocus = this._asyncFocus;
    if (asyncFocus) {
      win.clearTimeout(asyncFocus.timeout);
      delete this._asyncFocus;
    }
    delete FocusedElementState._lastResetElement;
    delete this._nextVal;
    delete this._lastVal;
  }
  static forgetMemorized(instance, parent) {
    let wel = FocusedElementState._lastResetElement;
    let el = wel && wel.get();
    if (el && dom.nodeContains(parent, el)) {
      delete FocusedElementState._lastResetElement;
    }
    el = instance._nextVal?.element?.get();
    if (el && dom.nodeContains(parent, el)) {
      delete instance._nextVal;
    }
    wel = instance._lastVal;
    el = wel && wel.get();
    if (el && dom.nodeContains(parent, el)) {
      delete instance._lastVal;
    }
  }
  getFocusedElement() {
    return this.getVal();
  }
  getLastFocusedElement() {
    let el = this._lastVal?.get();
    if (!el || el && !documentContains(el.ownerDocument, el)) {
      this._lastVal = el = void 0;
    }
    return el;
  }
  focus(element, noFocusedProgrammaticallyFlag, noAccessibleCheck, focusOptions) {
    if (!this._tabster.focusable.isFocusable(element, noFocusedProgrammaticallyFlag, false, noAccessibleCheck)) {
      return false;
    }
    const options = typeof focusOptions === "boolean" ? { preventScroll: focusOptions } : focusOptions;
    element.focus(options);
    return true;
  }
  focusDefault(container) {
    const el = this._tabster.focusable.findDefault({ container });
    if (el) {
      this._tabster.focusedElement.focus(el);
      return true;
    }
    return false;
  }
  getFirstOrLastTabbable(isFirst, props) {
    const { container, ignoreAccessibility } = props;
    let toFocus;
    if (container) {
      const ctx = RootAPI.getTabsterContext(this._tabster, container);
      if (ctx) {
        toFocus = FocusedElementState.findNextTabbable(this._tabster, ctx, container, void 0, void 0, !isFirst, ignoreAccessibility)?.element;
      }
    }
    if (toFocus && !dom.nodeContains(container, toFocus)) {
      toFocus = void 0;
    }
    return toFocus || void 0;
  }
  _focusFirstOrLast(isFirst, props) {
    const toFocus = this.getFirstOrLastTabbable(isFirst, props);
    if (toFocus) {
      this.focus(toFocus, false, true);
      return true;
    }
    return false;
  }
  focusFirst(props) {
    return this._focusFirstOrLast(true, props);
  }
  focusLast(props) {
    return this._focusFirstOrLast(false, props);
  }
  resetFocus(container) {
    if (!this._tabster.focusable.isVisible(container)) {
      return false;
    }
    if (!this._tabster.focusable.isFocusable(container, true, true, true)) {
      const prevTabIndex = container.getAttribute("tabindex");
      const prevAriaHidden = container.getAttribute("aria-hidden");
      container.tabIndex = -1;
      container.setAttribute("aria-hidden", "true");
      FocusedElementState._lastResetElement = new WeakHTMLElement(container);
      this.focus(container, true, true);
      this._setOrRemoveAttribute(container, "tabindex", prevTabIndex);
      this._setOrRemoveAttribute(container, "aria-hidden", prevAriaHidden);
    } else {
      this.focus(container);
    }
    return true;
  }
  requestAsyncFocus(source, callback, delay) {
    const win = this._tabster.getWindow();
    const currentAsyncFocus = this._asyncFocus;
    if (currentAsyncFocus) {
      if (AsyncFocusIntentPriorityBySource[source] > AsyncFocusIntentPriorityBySource[currentAsyncFocus.source]) {
        return;
      }
      win.clearTimeout(currentAsyncFocus.timeout);
    }
    this._asyncFocus = {
      source,
      callback,
      timeout: win.setTimeout(() => {
        this._asyncFocus = void 0;
        callback();
      }, delay)
    };
  }
  cancelAsyncFocus(source) {
    const asyncFocus = this._asyncFocus;
    if (asyncFocus?.source === source) {
      this._tabster.getWindow().clearTimeout(asyncFocus.timeout);
      this._asyncFocus = void 0;
    }
  }
  _setOrRemoveAttribute(element, name, value) {
    if (value === null) {
      element.removeAttribute(name);
    } else {
      element.setAttribute(name, value);
    }
  }
  _setFocusedElement(element, relatedTarget, isFocusedProgrammatically) {
    if (this._tabster._noop) {
      return;
    }
    const detail = { relatedTarget };
    if (element) {
      const lastResetElement = FocusedElementState._lastResetElement?.get();
      FocusedElementState._lastResetElement = void 0;
      if (lastResetElement === element || shouldIgnoreFocus(element)) {
        return;
      }
      detail.isFocusedProgrammatically = isFocusedProgrammatically;
      const ctx = RootAPI.getTabsterContext(this._tabster, element);
      const modalizerId = ctx?.modalizer?.userId;
      if (modalizerId) {
        detail.modalizerId = modalizerId;
      }
    }
    const nextVal = this._nextVal = {
      element: element ? new WeakHTMLElement(element) : void 0,
      detail
    };
    if (element && element !== this._val) {
      this._validateFocusedElement(element);
    }
    if (this._nextVal === nextVal) {
      this.setVal(element, detail);
    }
    this._nextVal = void 0;
  }
  setVal(val, detail) {
    super.setVal(val, detail);
    if (val) {
      this._lastVal = new WeakHTMLElement(val);
    }
  }
  static findNextTabbable(tabster, ctx, container, currentElement, referenceElement, isBackward, ignoreAccessibility) {
    const actualContainer = container || ctx.root.getElement();
    if (!actualContainer) {
      return null;
    }
    let next = null;
    const isTabbingTimer = FocusedElementState._isTabbingTimer;
    const win = tabster.getWindow();
    if (isTabbingTimer) {
      win.clearTimeout(isTabbingTimer);
    }
    FocusedElementState.isTabbing = true;
    FocusedElementState._isTabbingTimer = win.setTimeout(() => {
      delete FocusedElementState._isTabbingTimer;
      FocusedElementState.isTabbing = false;
    }, 0);
    const modalizer = ctx.modalizer;
    const groupper = ctx.groupper;
    const mover = ctx.mover;
    const callFindNext = (what) => {
      next = what.findNextTabbable(currentElement, referenceElement, isBackward, ignoreAccessibility);
      if (currentElement && !next?.element) {
        const parentElement = what !== modalizer && dom.getParentElement(what.getElement());
        if (parentElement) {
          const parentCtx = RootAPI.getTabsterContext(tabster, currentElement, { referenceElement: parentElement });
          if (parentCtx) {
            const currentScopeElement = what.getElement();
            const newCurrent = isBackward ? currentScopeElement : currentScopeElement && getLastChild(currentScopeElement) || currentScopeElement;
            if (newCurrent) {
              next = FocusedElementState.findNextTabbable(tabster, parentCtx, container, newCurrent, parentElement, isBackward, ignoreAccessibility);
              if (next) {
                next.outOfDOMOrder = true;
              }
            }
          }
        }
      }
    };
    if (groupper && mover) {
      callFindNext(ctx.groupperBeforeMover ? groupper : mover);
    } else if (groupper) {
      callFindNext(groupper);
    } else if (mover) {
      callFindNext(mover);
    } else if (modalizer) {
      callFindNext(modalizer);
    } else {
      const findProps = {
        container: actualContainer,
        currentElement,
        referenceElement,
        ignoreAccessibility,
        useActiveModalizer: true
      };
      const findPropsOut = {};
      const nextElement = tabster.focusable[isBackward ? "findPrev" : "findNext"](findProps, findPropsOut);
      next = {
        element: nextElement,
        outOfDOMOrder: findPropsOut.outOfDOMOrder,
        uncontrolled: findPropsOut.uncontrolled
      };
    }
    return next;
  }
}
class KeyboardNavigationState extends Subscribable {
  constructor(getWindow) {
    super();
    this._onChange = (isNavigatingWithKeyboard) => {
      this.setVal(isNavigatingWithKeyboard, void 0);
    };
    this._keyborg = createKeyborg(getWindow());
    this._keyborg.subscribe(this._onChange);
  }
  dispose() {
    super.dispose();
    if (this._keyborg) {
      this._keyborg.unsubscribe(this._onChange);
      disposeKeyborg(this._keyborg);
      delete this._keyborg;
    }
  }
  setNavigatingWithKeyboard(isNavigatingWithKeyboard) {
    this._keyborg?.setVal(isNavigatingWithKeyboard);
  }
  isNavigatingWithKeyboard() {
    return !!this._keyborg?.isNavigatingWithKeyboard();
  }
}
function observeMutations(doc, tabster, updateTabsterByAttribute2, syncState) {
  if (typeof MutationObserver === "undefined") {
    return () => {
    };
  }
  const getWindow = tabster.getWindow;
  let elementByUId;
  const onMutation = (mutations) => {
    const removedNodes = /* @__PURE__ */ new Set();
    for (const mutation of mutations) {
      const target = mutation.target;
      const removed = mutation.removedNodes;
      const added = mutation.addedNodes;
      if (mutation.type === "attributes") {
        if (mutation.attributeName === TABSTER_ATTRIBUTE_NAME) {
          if (!removedNodes.has(target)) {
            updateTabsterByAttribute2(tabster, target);
          }
        }
      } else {
        for (const removedNode of removed) {
          removedNodes.add(removedNode);
          updateTabsterElements(removedNode, true);
          tabster._dummyObserver.domChanged?.(target);
        }
        for (const addedNode of added) {
          updateTabsterElements(addedNode);
          tabster._dummyObserver.domChanged?.(target);
        }
      }
    }
    removedNodes.clear();
    tabster.modalizer?.hiddenUpdate();
  };
  function updateTabsterElements(node, removed) {
    if (!elementByUId) {
      elementByUId = getInstanceContext(getWindow).elementByUId;
    }
    processNode(node, removed);
    const walker = createElementTreeWalker(doc, node, (element) => {
      return processNode(element, removed);
    });
    if (walker) {
      while (walker.nextNode()) {
      }
    }
  }
  function processNode(element, removed) {
    if (!element.getAttribute) {
      return NodeFilter.FILTER_SKIP;
    }
    const uid = element.__tabsterElementUID;
    if (uid && elementByUId) {
      if (removed) {
        delete elementByUId[uid];
      } else {
        elementByUId[uid] ??= new WeakHTMLElement(element);
      }
    }
    if (getTabsterOnElement(tabster, element) || element.hasAttribute(TABSTER_ATTRIBUTE_NAME)) {
      updateTabsterByAttribute2(tabster, element, removed);
    }
    return NodeFilter.FILTER_SKIP;
  }
  const observer = dom.createMutationObserver(onMutation);
  if (syncState) {
    updateTabsterElements(getWindow().document.body);
  }
  observer.observe(doc, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: [TABSTER_ATTRIBUTE_NAME]
  });
  return () => {
    observer.disconnect();
  };
}
class UncontrolledAPI {
  constructor(isUncontrolledCompletely) {
    this._isUncontrolledCompletely = isUncontrolledCompletely;
  }
  isUncontrolledCompletely(element, completely) {
    const isUncontrolledCompletely = this._isUncontrolledCompletely?.(element, completely);
    return isUncontrolledCompletely === void 0 ? completely : isUncontrolledCompletely;
  }
}
class Tabster {
  constructor(tabster) {
    this.keyboardNavigation = tabster.keyboardNavigation;
    this.focusedElement = tabster.focusedElement;
    this.focusable = tabster.focusable;
    this.root = tabster.root;
    this.uncontrolled = tabster.uncontrolled;
    this.core = tabster;
  }
}
class TabsterCore {
  constructor(win, props) {
    this._forgetMemorizedElements = [];
    this._wrappers = /* @__PURE__ */ new Set();
    this._initQueue = [];
    this._version = "8.8.1";
    this._noop = false;
    this.attrHandlers = /* @__PURE__ */ new Map();
    this.getWindow = () => {
      if (!this._win) {
        throw new Error("Using disposed Tabster.");
      }
      return this._win;
    };
    this._storage = /* @__PURE__ */ new WeakMap();
    this._win = win;
    const getWindow = this.getWindow;
    if (props?.DOMAPI) {
      setDOMAPI({ ...props.DOMAPI });
    }
    this.keyboardNavigation = new KeyboardNavigationState(getWindow);
    this.focusedElement = new FocusedElementState(this, getWindow);
    this.focusable = new FocusableAPI(this);
    this.root = new RootAPI(this, props?.autoRoot);
    this.uncontrolled = new UncontrolledAPI(
      // TODO: Remove checkUncontrolledTrappingFocus in the next major version.
      props?.checkUncontrolledCompletely || props?.checkUncontrolledTrappingFocus
    );
    this.controlTab = props?.controlTab ?? true;
    this.rootDummyInputs = !!props?.rootDummyInputs;
    this._dummyObserver = new DummyInputObserver(getWindow);
    this.getParent = props?.getParent ?? dom.getParentNode;
    this.internal = {
      stopObserver: () => {
        if (this._unobserve) {
          this._unobserve();
          delete this._unobserve;
        }
      },
      resumeObserver: (syncState) => {
        if (!this._unobserve) {
          const doc = getWindow().document;
          this._unobserve = observeMutations(doc, this, updateTabsterByAttribute, syncState);
        }
      }
    };
    this.queueInit(() => {
      this.internal.resumeObserver(true);
    });
  }
  /**
   * Merges external props with the current props. Not all
   * props can/should be mergeable, so let's add more as we move on.
   * @param props Tabster props
   */
  _mergeProps(props) {
    if (!props) {
      return;
    }
    this.getParent = props.getParent ?? this.getParent;
  }
  createTabster(noRefCount, props) {
    const wrapper = new Tabster(this);
    if (!noRefCount) {
      this._wrappers.add(wrapper);
    }
    this._mergeProps(props);
    return wrapper;
  }
  disposeTabster(wrapper, allInstances) {
    if (allInstances) {
      this._wrappers.clear();
    } else {
      this._wrappers.delete(wrapper);
    }
    if (this._wrappers.size === 0) {
      this.dispose();
    }
  }
  dispose() {
    this.internal.stopObserver();
    const win = this._win;
    win?.clearTimeout(this._initTimer);
    delete this._initTimer;
    this._initQueue = [];
    this._forgetMemorizedElements = [];
    if (win && this._forgetMemorizedTimer) {
      win.clearTimeout(this._forgetMemorizedTimer);
      delete this._forgetMemorizedTimer;
    }
    this.outline?.dispose();
    this.crossOrigin?.dispose();
    this.deloser?.dispose();
    this.groupper?.dispose();
    this.mover?.dispose();
    this.modalizer?.dispose();
    this.observedElement?.dispose();
    this.restorer?.dispose();
    this.keyboardNavigation.dispose();
    this.focusable.dispose();
    this.focusedElement.dispose();
    this.root.dispose();
    this._dummyObserver.dispose();
    this.attrHandlers.clear();
    clearElementCache(this.getWindow);
    this._storage = /* @__PURE__ */ new WeakMap();
    this._wrappers.clear();
    if (win) {
      disposeInstanceContext(win);
      delete win.__tabsterInstance;
      delete this._win;
    }
  }
  storageEntry(element, addremove) {
    const storage = this._storage;
    let entry = storage.get(element);
    if (entry) {
      if (addremove === false && Object.keys(entry).length === 0) {
        storage.delete(element);
      }
    } else if (addremove === true) {
      entry = {};
      storage.set(element, entry);
    }
    return entry;
  }
  forceCleanup() {
    if (!this._win) {
      return;
    }
    this._forgetMemorizedElements.push(this._win.document.body);
    if (this._forgetMemorizedTimer) {
      return;
    }
    this._forgetMemorizedTimer = this._win.setTimeout(() => {
      delete this._forgetMemorizedTimer;
      for (let el = this._forgetMemorizedElements.shift(); el; el = this._forgetMemorizedElements.shift()) {
        clearElementCache(this.getWindow, el);
        FocusedElementState.forgetMemorized(this.focusedElement, el);
      }
    }, 0);
  }
  queueInit(callback) {
    if (!this._win) {
      return;
    }
    this._initQueue.push(callback);
    if (!this._initTimer) {
      this._initTimer = this._win?.setTimeout(() => {
        delete this._initTimer;
        this.drainInitQueue();
      }, 0);
    }
  }
  drainInitQueue() {
    if (!this._win) {
      return;
    }
    const queue = this._initQueue;
    this._initQueue = [];
    queue.forEach((callback) => callback());
  }
}
function createTabster(win, props) {
  let tabster = getCurrentTabster(win);
  if (tabster) {
    return tabster.createTabster(false, props);
  }
  tabster = new TabsterCore(win, props);
  win.__tabsterInstance = tabster;
  return tabster.createTabster();
}
function disposeTabster(tabster, allInstances) {
  tabster.core.disposeTabster(tabster, allInstances);
}
function getCurrentTabster(win) {
  return win.__tabsterInstance;
}
const DEFAULT_FACTORY = (tabster) => {
  return tabster;
};
function createTabsterWithConfig(targetDocument) {
  const defaultView = (targetDocument === null || targetDocument === void 0 ? void 0 : targetDocument.defaultView) || void 0;
  const shadowDOMAPI = defaultView === null || defaultView === void 0 ? void 0 : defaultView.__tabsterShadowDOMAPI;
  if (defaultView) {
    return createTabster(defaultView, {
      autoRoot: {},
      controlTab: false,
      getParent,
      // The non-undefined return value of checkUncontrolledCompletely() dominates the value that the element might
      // have in its `uncontrolled: { completely: true }` part of the tabster attribute. We must make sure to return
      // undefined if we want the value from tabster attribute to be respected.
      checkUncontrolledCompletely: (element) => {
        var _element_firstElementChild;
        return ((_element_firstElementChild = element.firstElementChild) === null || _element_firstElementChild === void 0 ? void 0 : _element_firstElementChild.hasAttribute("data-is-focus-trap-zone-bumper")) === true || void 0;
      },
      DOMAPI: shadowDOMAPI
    });
  }
}
function useTabster(factory = DEFAULT_FACTORY) {
  const { targetDocument } = useFluent();
  const factoryResultRef = reactExports.useRef(null);
  useIsomorphicLayoutEffect(() => {
    const tabster = createTabsterWithConfig(targetDocument);
    if (tabster) {
      factoryResultRef.current = factory(tabster);
      return () => {
        disposeTabster(tabster);
        factoryResultRef.current = null;
      };
    }
  }, [
    targetDocument,
    factory
  ]);
  return factoryResultRef;
}
const useTabsterAttributes = (props) => {
  useTabster();
  const strAttr = getTabsterAttribute(props);
  return reactExports.useMemo(() => ({
    [TABSTER_ATTRIBUTE_NAME]: strAttr
  }), [
    strAttr
  ]);
};
const useFocusFinders = () => {
  const tabsterRef = useTabster();
  const { targetDocument } = useFluent();
  const findAllFocusable = reactExports.useCallback((container, acceptCondition) => {
    var _tabsterRef_current;
    return container && ((_tabsterRef_current = tabsterRef.current) === null || _tabsterRef_current === void 0 ? void 0 : _tabsterRef_current.focusable.findAll({
      container,
      acceptCondition
    })) || [];
  }, [
    tabsterRef
  ]);
  const findFirstFocusable = reactExports.useCallback((container) => {
    var _tabsterRef_current;
    return container && ((_tabsterRef_current = tabsterRef.current) === null || _tabsterRef_current === void 0 ? void 0 : _tabsterRef_current.focusable.findFirst({
      container
    }));
  }, [
    tabsterRef
  ]);
  const findLastFocusable = reactExports.useCallback((container) => {
    var _tabsterRef_current;
    return container && ((_tabsterRef_current = tabsterRef.current) === null || _tabsterRef_current === void 0 ? void 0 : _tabsterRef_current.focusable.findLast({
      container
    }));
  }, [
    tabsterRef
  ]);
  const findNextFocusable = reactExports.useCallback((currentElement, options = {}) => {
    if (!tabsterRef.current || !targetDocument || !currentElement) {
      return null;
    }
    const { container = targetDocument.body } = options;
    return tabsterRef.current.focusable.findNext({
      currentElement,
      container
    });
  }, [
    tabsterRef,
    targetDocument
  ]);
  const findPrevFocusable = reactExports.useCallback((currentElement, options = {}) => {
    if (!tabsterRef.current || !targetDocument || !currentElement) {
      return null;
    }
    const { container = targetDocument.body } = options;
    return tabsterRef.current.focusable.findPrev({
      currentElement,
      container
    });
  }, [
    tabsterRef,
    targetDocument
  ]);
  return {
    findAllFocusable,
    findFirstFocusable,
    findLastFocusable,
    findNextFocusable,
    findPrevFocusable
  };
};
const FOCUS_VISIBLE_ATTR = "data-fui-focus-visible";
const FOCUS_WITHIN_ATTR = "data-fui-focus-within";
function applyFocusVisiblePolyfill(scope, targetWindow) {
  if (alreadyInScope(scope)) {
    return () => void 0;
  }
  const state = {
    current: void 0
  };
  const keyborg = createKeyborg(targetWindow);
  function registerElementIfNavigating(el) {
    if (keyborg.isNavigatingWithKeyboard() && isHTMLElement$1(el)) {
      state.current = el;
      el.setAttribute(FOCUS_VISIBLE_ATTR, "");
    }
  }
  function disposeCurrentElement() {
    if (state.current) {
      state.current.removeAttribute(FOCUS_VISIBLE_ATTR);
      state.current = void 0;
    }
  }
  keyborg.subscribe((isNavigatingWithKeyboard) => {
    if (!isNavigatingWithKeyboard) {
      disposeCurrentElement();
    } else {
      registerElementIfNavigating(targetWindow.document.activeElement);
    }
  });
  const keyborgListener = (e) => {
    disposeCurrentElement();
    const target = e.composedPath()[0];
    registerElementIfNavigating(target);
  };
  const blurListener = (e) => {
    if (!e.relatedTarget || isHTMLElement$1(e.relatedTarget) && !scope.contains(e.relatedTarget)) {
      disposeCurrentElement();
    }
  };
  scope.addEventListener(KEYBORG_FOCUSIN, keyborgListener);
  scope.addEventListener("focusout", blurListener);
  scope.focusVisible = true;
  if (scope.contains(targetWindow.document.activeElement)) {
    registerElementIfNavigating(targetWindow.document.activeElement);
  }
  return () => {
    disposeCurrentElement();
    scope.removeEventListener(KEYBORG_FOCUSIN, keyborgListener);
    scope.removeEventListener("focusout", blurListener);
    scope.focusVisible = void 0;
    disposeKeyborg(keyborg);
  };
}
function alreadyInScope(el) {
  if (!el) {
    return false;
  }
  if (el.focusVisible) {
    return true;
  }
  return alreadyInScope(el === null || el === void 0 ? void 0 : el.parentElement);
}
function useFocusVisible(options = {}) {
  const contextValue = useFluent();
  const scopeRef = reactExports.useRef(null);
  var _options_targetDocument;
  const targetDocument = (_options_targetDocument = options.targetDocument) !== null && _options_targetDocument !== void 0 ? _options_targetDocument : contextValue.targetDocument;
  reactExports.useEffect(() => {
    if ((targetDocument === null || targetDocument === void 0 ? void 0 : targetDocument.defaultView) && scopeRef.current) {
      return applyFocusVisiblePolyfill(scopeRef.current, targetDocument.defaultView);
    }
  }, [
    scopeRef,
    targetDocument
  ]);
  return scopeRef;
}
function applyFocusWithinPolyfill(element, win) {
  const keyborg = createKeyborg(win);
  keyborg.subscribe((isNavigatingWithKeyboard) => {
    if (!isNavigatingWithKeyboard) {
      removeFocusWithinClass(element);
    }
  });
  const keyborgListener = (e) => {
    if (keyborg.isNavigatingWithKeyboard() && isHTMLElement(e.target)) {
      applyFocusWithinClass(element);
    }
  };
  const blurListener = (e) => {
    if (!e.relatedTarget || isHTMLElement(e.relatedTarget) && !element.contains(e.relatedTarget)) {
      removeFocusWithinClass(element);
    }
  };
  element.addEventListener(KEYBORG_FOCUSIN, keyborgListener);
  element.addEventListener("focusout", blurListener);
  return () => {
    element.removeEventListener(KEYBORG_FOCUSIN, keyborgListener);
    element.removeEventListener("focusout", blurListener);
    disposeKeyborg(keyborg);
  };
}
function applyFocusWithinClass(el) {
  el.setAttribute(FOCUS_WITHIN_ATTR, "");
}
function removeFocusWithinClass(el) {
  el.removeAttribute(FOCUS_WITHIN_ATTR);
}
function isHTMLElement(target) {
  if (!target) {
    return false;
  }
  return Boolean(target && typeof target === "object" && "classList" in target && "contains" in target);
}
function useFocusWithin() {
  const { targetDocument } = useFluent();
  const elementRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if ((targetDocument === null || targetDocument === void 0 ? void 0 : targetDocument.defaultView) && elementRef.current) {
      return applyFocusWithinPolyfill(elementRef.current, targetDocument.defaultView);
    }
  }, [
    elementRef,
    targetDocument
  ]);
  return elementRef;
}
const grey = {
  "2": "#050505",
  "4": "#0a0a0a",
  "6": "#0f0f0f",
  "8": "#141414",
  "10": "#1a1a1a",
  "12": "#1f1f1f",
  "14": "#242424",
  "16": "#292929",
  "18": "#2e2e2e",
  "20": "#333333",
  "22": "#383838",
  "24": "#3d3d3d",
  "26": "#424242",
  "30": "#4d4d4d",
  "32": "#525252",
  "34": "#575757",
  "36": "#5c5c5c",
  "38": "#616161",
  "40": "#666666",
  "42": "#6b6b6b",
  "44": "#707070",
  "46": "#757575",
  "60": "#999999",
  "68": "#adadad",
  "70": "#b3b3b3",
  "74": "#bdbdbd",
  "78": "#c7c7c7",
  "82": "#d1d1d1",
  "84": "#d6d6d6",
  "86": "#dbdbdb",
  "88": "#e0e0e0",
  "90": "#e6e6e6",
  "92": "#ebebeb",
  "94": "#f0f0f0",
  "96": "#f5f5f5",
  "98": "#fafafa",
  "99": "#fcfcfc"
};
const whiteAlpha = {
  "5": "rgba(255, 255, 255, 0.05)",
  "10": "rgba(255, 255, 255, 0.1)",
  "20": "rgba(255, 255, 255, 0.2)",
  "40": "rgba(255, 255, 255, 0.4)",
  "50": "rgba(255, 255, 255, 0.5)",
  "60": "rgba(255, 255, 255, 0.6)",
  "70": "rgba(255, 255, 255, 0.7)",
  "80": "rgba(255, 255, 255, 0.8)"
};
const blackAlpha = {
  "5": "rgba(0, 0, 0, 0.05)",
  "10": "rgba(0, 0, 0, 0.1)",
  "20": "rgba(0, 0, 0, 0.2)",
  "30": "rgba(0, 0, 0, 0.3)",
  "40": "rgba(0, 0, 0, 0.4)",
  "50": "rgba(0, 0, 0, 0.5)"
};
const grey10Alpha = {
  "50": "rgba(26, 26, 26, 0.5)"
};
const grey12Alpha = {
  "70": "rgba(31, 31, 31, 0.7)"
};
const grey14Alpha = {
  "50": "rgba(36, 36, 36, 0.5)",
  "80": "rgba(36, 36, 36, 0.8)"
};
const white = "#ffffff";
const black = "#000000";
const darkRed = {
  shade50: "#130204",
  shade40: "#230308",
  shade30: "#420610",
  shade20: "#590815",
  shade10: "#690a19",
  primary: "#750b1c",
  tint10: "#861b2c",
  tint20: "#962f3f",
  tint30: "#ac4f5e",
  tint40: "#d69ca5",
  tint50: "#e9c7cd",
  tint60: "#f9f0f2"
};
const cranberry = {
  shade50: "#200205",
  shade40: "#3b0509",
  shade30: "#6e0811",
  shade20: "#960b18",
  shade10: "#b10e1c",
  primary: "#c50f1f",
  tint10: "#cc2635",
  tint20: "#d33f4c",
  tint30: "#dc626d",
  tint40: "#eeacb2",
  tint50: "#f6d1d5",
  tint60: "#fdf3f4"
};
const red = {
  shade50: "#210809",
  shade40: "#3f1011",
  shade30: "#751d1f",
  shade20: "#9f282b",
  shade10: "#bc2f32",
  primary: "#d13438",
  tint10: "#d7494c",
  tint20: "#dc5e62",
  tint30: "#e37d80",
  tint40: "#f1bbbc",
  tint50: "#f8dadb",
  tint60: "#fdf6f6"
};
const darkOrange = {
  shade50: "#230900",
  shade40: "#411200",
  shade30: "#7a2101",
  shade20: "#a62d01",
  shade10: "#c43501",
  primary: "#da3b01",
  tint10: "#de501c",
  tint20: "#e36537",
  tint30: "#e9835e",
  tint40: "#f4bfab",
  tint50: "#f9dcd1",
  tint60: "#fdf6f3"
};
const pumpkin = {
  shade50: "#200d03",
  shade40: "#3d1805",
  shade30: "#712d09",
  shade20: "#9a3d0c",
  shade10: "#b6480e",
  primary: "#ca5010",
  tint10: "#d06228",
  tint20: "#d77440",
  tint30: "#df8e64",
  tint40: "#efc4ad",
  tint50: "#f7dfd2",
  tint60: "#fdf7f4"
};
const orange = {
  shade50: "#271002",
  shade40: "#4a1e04",
  shade30: "#8a3707",
  shade20: "#bc4b09",
  shade10: "#de590b",
  primary: "#f7630c",
  tint10: "#f87528",
  tint20: "#f98845",
  tint30: "#faa06b",
  tint40: "#fdcfb4",
  tint50: "#fee5d7",
  tint60: "#fff9f5"
};
const peach = {
  shade50: "#291600",
  shade40: "#4d2a00",
  shade30: "#8f4e00",
  shade20: "#c26a00",
  shade10: "#e67e00",
  primary: "#ff8c00",
  tint10: "#ff9a1f",
  tint20: "#ffa83d",
  tint30: "#ffba66",
  tint40: "#ffddb3",
  tint50: "#ffedd6",
  tint60: "#fffaf5"
};
const marigold = {
  shade50: "#251a00",
  shade40: "#463100",
  shade30: "#835b00",
  shade20: "#b27c00",
  shade10: "#d39300",
  primary: "#eaa300",
  tint10: "#edad1c",
  tint20: "#efb839",
  tint30: "#f2c661",
  tint40: "#f9e2ae",
  tint50: "#fcefd3",
  tint60: "#fefbf4"
};
const yellow = {
  shade50: "#282400",
  shade40: "#4c4400",
  shade30: "#817400",
  shade20: "#c0ad00",
  shade10: "#e4cc00",
  primary: "#fde300",
  tint10: "#fde61e",
  tint20: "#fdea3d",
  tint30: "#feee66",
  tint40: "#fef7b2",
  tint50: "#fffad6",
  tint60: "#fffef5"
};
const gold = {
  shade50: "#1f1900",
  shade40: "#3a2f00",
  shade30: "#6c5700",
  shade20: "#937700",
  shade10: "#ae8c00",
  primary: "#c19c00",
  tint10: "#c8a718",
  tint20: "#d0b232",
  tint30: "#dac157",
  tint40: "#ecdfa5",
  tint50: "#f5eece",
  tint60: "#fdfbf2"
};
const brass = {
  shade50: "#181202",
  shade40: "#2e2103",
  shade30: "#553e06",
  shade20: "#745408",
  shade10: "#89640a",
  primary: "#986f0b",
  tint10: "#a47d1e",
  tint20: "#b18c34",
  tint30: "#c1a256",
  tint40: "#e0cea2",
  tint50: "#efe4cb",
  tint60: "#fbf8f2"
};
const brown = {
  shade50: "#170e07",
  shade40: "#2b1a0e",
  shade30: "#50301a",
  shade20: "#6c4123",
  shade10: "#804d29",
  primary: "#8e562e",
  tint10: "#9c663f",
  tint20: "#a97652",
  tint30: "#bb8f6f",
  tint40: "#ddc3b0",
  tint50: "#edded3",
  tint60: "#faf7f4"
};
const forest = {
  shade50: "#0c1501",
  shade40: "#162702",
  shade30: "#294903",
  shade20: "#376304",
  shade10: "#427505",
  primary: "#498205",
  tint10: "#599116",
  tint20: "#6ba02b",
  tint30: "#85b44c",
  tint40: "#bdd99b",
  tint50: "#dbebc7",
  tint60: "#f6faf0"
};
const seafoam = {
  shade50: "#002111",
  shade40: "#003d20",
  shade30: "#00723b",
  shade20: "#009b51",
  shade10: "#00b85f",
  primary: "#00cc6a",
  tint10: "#19d279",
  tint20: "#34d889",
  tint30: "#5ae0a0",
  tint40: "#a8f0cd",
  tint50: "#cff7e4",
  tint60: "#f3fdf8"
};
const lightGreen = {
  shade50: "#031a02",
  shade40: "#063004",
  shade30: "#0b5a08",
  shade20: "#0e7a0b",
  shade10: "#11910d",
  primary: "#13a10e",
  tint10: "#27ac22",
  tint20: "#3db838",
  tint30: "#5ec75a",
  tint40: "#a7e3a5",
  tint50: "#cef0cd",
  tint60: "#f2fbf2"
};
const green = {
  shade50: "#031403",
  shade40: "#052505",
  shade30: "#094509",
  shade20: "#0c5e0c",
  shade10: "#0e700e",
  primary: "#107c10",
  tint10: "#218c21",
  tint20: "#359b35",
  tint30: "#54b054",
  tint40: "#9fd89f",
  tint50: "#c9eac9",
  tint60: "#f1faf1"
};
const darkGreen = {
  shade50: "#021102",
  shade40: "#032003",
  shade30: "#063b06",
  shade20: "#085108",
  shade10: "#0a5f0a",
  primary: "#0b6a0b",
  tint10: "#1a7c1a",
  tint20: "#2d8e2d",
  tint30: "#4da64d",
  tint40: "#9ad29a",
  tint50: "#c6e7c6",
  tint60: "#f0f9f0"
};
const lightTeal = {
  shade50: "#001d1f",
  shade40: "#00373a",
  shade30: "#00666d",
  shade20: "#008b94",
  shade10: "#00a5af",
  primary: "#00b7c3",
  tint10: "#18bfca",
  tint20: "#32c8d1",
  tint30: "#58d3db",
  tint40: "#a6e9ed",
  tint50: "#cef3f5",
  tint60: "#f2fcfd"
};
const teal = {
  shade50: "#001516",
  shade40: "#012728",
  shade30: "#02494c",
  shade20: "#026467",
  shade10: "#037679",
  primary: "#038387",
  tint10: "#159195",
  tint20: "#2aa0a4",
  tint30: "#4cb4b7",
  tint40: "#9bd9db",
  tint50: "#c7ebec",
  tint60: "#f0fafa"
};
const steel = {
  shade50: "#000f12",
  shade40: "#001b22",
  shade30: "#00333f",
  shade20: "#004555",
  shade10: "#005265",
  primary: "#005b70",
  tint10: "#0f6c81",
  tint20: "#237d92",
  tint30: "#4496a9",
  tint40: "#94c8d4",
  tint50: "#c3e1e8",
  tint60: "#eff7f9"
};
const blue = {
  shade50: "#001322",
  shade40: "#002440",
  shade30: "#004377",
  shade20: "#005ba1",
  shade10: "#006cbf",
  primary: "#0078d4",
  tint10: "#1a86d9",
  tint20: "#3595de",
  tint30: "#5caae5",
  tint40: "#a9d3f2",
  tint50: "#d0e7f8",
  tint60: "#f3f9fd"
};
const royalBlue = {
  shade50: "#000c16",
  shade40: "#00172a",
  shade30: "#002c4e",
  shade20: "#003b6a",
  shade10: "#00467e",
  primary: "#004e8c",
  tint10: "#125e9a",
  tint20: "#286fa8",
  tint30: "#4a89ba",
  tint40: "#9abfdc",
  tint50: "#c7dced",
  tint60: "#f0f6fa"
};
const cornflower = {
  shade50: "#0d1126",
  shade40: "#182047",
  shade30: "#2c3c85",
  shade20: "#3c51b4",
  shade10: "#4760d5",
  primary: "#4f6bed",
  tint10: "#637cef",
  tint20: "#778df1",
  tint30: "#93a4f4",
  tint40: "#c8d1fa",
  tint50: "#e1e6fc",
  tint60: "#f7f9fe"
};
const navy = {
  shade50: "#00061d",
  shade40: "#000c36",
  shade30: "#001665",
  shade20: "#001e89",
  shade10: "#0023a2",
  primary: "#0027b4",
  tint10: "#173bbd",
  tint20: "#3050c6",
  tint30: "#546fd2",
  tint40: "#a3b2e8",
  tint50: "#ccd5f3",
  tint60: "#f2f4fc"
};
const lavender = {
  shade50: "#120f25",
  shade40: "#221d46",
  shade30: "#3f3682",
  shade20: "#5649b0",
  shade10: "#6656d1",
  primary: "#7160e8",
  tint10: "#8172eb",
  tint20: "#9184ee",
  tint30: "#a79cf1",
  tint40: "#d2ccf8",
  tint50: "#e7e4fb",
  tint60: "#f9f8fe"
};
const purple = {
  shade50: "#0f0717",
  shade40: "#1c0e2b",
  shade30: "#341a51",
  shade20: "#46236e",
  shade10: "#532982",
  primary: "#5c2e91",
  tint10: "#6b3f9e",
  tint20: "#7c52ab",
  tint30: "#9470bd",
  tint40: "#c6b1de",
  tint50: "#e0d3ed",
  tint60: "#f7f4fb"
};
const grape = {
  shade50: "#160418",
  shade40: "#29072e",
  shade30: "#4c0d55",
  shade20: "#671174",
  shade10: "#7a1589",
  primary: "#881798",
  tint10: "#952aa4",
  tint20: "#a33fb1",
  tint30: "#b55fc1",
  tint40: "#d9a7e0",
  tint50: "#eaceef",
  tint60: "#faf2fb"
};
const berry = {
  shade50: "#1f091d",
  shade40: "#3a1136",
  shade30: "#6d2064",
  shade20: "#932b88",
  shade10: "#af33a1",
  primary: "#c239b3",
  tint10: "#c94cbc",
  tint20: "#d161c4",
  tint30: "#da7ed0",
  tint40: "#edbbe7",
  tint50: "#f5daf2",
  tint60: "#fdf5fc"
};
const lilac = {
  shade50: "#1c0b1f",
  shade40: "#35153a",
  shade30: "#63276d",
  shade20: "#863593",
  shade10: "#9f3faf",
  primary: "#b146c2",
  tint10: "#ba58c9",
  tint20: "#c36bd1",
  tint30: "#cf87da",
  tint40: "#e6bfed",
  tint50: "#f2dcf5",
  tint60: "#fcf6fd"
};
const pink = {
  shade50: "#24091b",
  shade40: "#441232",
  shade30: "#80215d",
  shade20: "#ad2d7e",
  shade10: "#cd3595",
  primary: "#e43ba6",
  tint10: "#e750b0",
  tint20: "#ea66ba",
  tint30: "#ef85c8",
  tint40: "#f7c0e3",
  tint50: "#fbddf0",
  tint60: "#fef6fb"
};
const magenta = {
  shade50: "#1f0013",
  shade40: "#390024",
  shade30: "#6b0043",
  shade20: "#91005a",
  shade10: "#ac006b",
  primary: "#bf0077",
  tint10: "#c71885",
  tint20: "#ce3293",
  tint30: "#d957a8",
  tint40: "#eca5d1",
  tint50: "#f5cee6",
  tint60: "#fcf2f9"
};
const plum = {
  shade50: "#13000c",
  shade40: "#240017",
  shade30: "#43002b",
  shade20: "#5a003b",
  shade10: "#6b0045",
  primary: "#77004d",
  tint10: "#87105d",
  tint20: "#98246f",
  tint30: "#ad4589",
  tint40: "#d696c0",
  tint50: "#e9c4dc",
  tint60: "#faf0f6"
};
const beige = {
  shade50: "#141313",
  shade40: "#252323",
  shade30: "#444241",
  shade20: "#5d5958",
  shade10: "#6e6968",
  primary: "#7a7574",
  tint10: "#8a8584",
  tint20: "#9a9594",
  tint30: "#afabaa",
  tint40: "#d7d4d4",
  tint50: "#eae8e8",
  tint60: "#faf9f9"
};
const mink = {
  shade50: "#0f0e0e",
  shade40: "#1c1b1a",
  shade30: "#343231",
  shade20: "#474443",
  shade10: "#54514f",
  primary: "#5d5a58",
  tint10: "#706d6b",
  tint20: "#84817e",
  tint30: "#9e9b99",
  tint40: "#cecccb",
  tint50: "#e5e4e3",
  tint60: "#f8f8f8"
};
const platinum = {
  shade50: "#111314",
  shade40: "#1f2426",
  shade30: "#3b4447",
  shade20: "#505c60",
  shade10: "#5f6d71",
  primary: "#69797e",
  tint10: "#79898d",
  tint20: "#89989d",
  tint30: "#a0adb2",
  tint40: "#cdd6d8",
  tint50: "#e4e9ea",
  tint60: "#f8f9fa"
};
const anchor = {
  shade50: "#090a0b",
  shade40: "#111315",
  shade30: "#202427",
  shade20: "#2b3135",
  shade10: "#333a3f",
  primary: "#394146",
  tint10: "#4d565c",
  tint20: "#626c72",
  tint30: "#808a90",
  tint40: "#bcc3c7",
  tint50: "#dbdfe1",
  tint60: "#f6f7f8"
};
const statusSharedColors = {
  red,
  green,
  darkOrange,
  yellow,
  berry,
  lightGreen,
  marigold
};
const personaSharedColors = {
  darkRed,
  cranberry,
  pumpkin,
  peach,
  gold,
  brass,
  brown,
  forest,
  seafoam,
  darkGreen,
  lightTeal,
  teal,
  steel,
  blue,
  royalBlue,
  cornflower,
  navy,
  lavender,
  purple,
  grape,
  lilac,
  pink,
  magenta,
  plum,
  beige,
  mink,
  platinum,
  anchor
};
const mappedStatusColors = {
  cranberry,
  green,
  orange
};
const statusSharedColorNames = [
  "red",
  "green",
  "darkOrange",
  "yellow",
  "berry",
  "lightGreen",
  "marigold"
];
const personaSharedColorNames = [
  "darkRed",
  "cranberry",
  "pumpkin",
  "peach",
  "gold",
  "brass",
  "brown",
  "forest",
  "seafoam",
  "darkGreen",
  "lightTeal",
  "teal",
  "steel",
  "blue",
  "royalBlue",
  "cornflower",
  "navy",
  "lavender",
  "purple",
  "grape",
  "lilac",
  "pink",
  "magenta",
  "plum",
  "beige",
  "mink",
  "platinum",
  "anchor"
];
const statusColorMapping = {
  success: "green",
  warning: "orange",
  danger: "cranberry"
};
const statusColorPaletteTokens$1 = statusSharedColorNames.reduce((acc, sharedColor) => {
  const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
  const sharedColorTokens = {
    [`colorPalette${color}Background1`]: statusSharedColors[sharedColor].tint60,
    [`colorPalette${color}Background2`]: statusSharedColors[sharedColor].tint40,
    [`colorPalette${color}Background3`]: statusSharedColors[sharedColor].primary,
    [`colorPalette${color}Foreground1`]: statusSharedColors[sharedColor].shade10,
    [`colorPalette${color}Foreground2`]: statusSharedColors[sharedColor].shade30,
    [`colorPalette${color}Foreground3`]: statusSharedColors[sharedColor].primary,
    [`colorPalette${color}BorderActive`]: statusSharedColors[sharedColor].primary,
    [`colorPalette${color}Border1`]: statusSharedColors[sharedColor].tint40,
    [`colorPalette${color}Border2`]: statusSharedColors[sharedColor].primary
  };
  return Object.assign(acc, sharedColorTokens);
}, {});
statusColorPaletteTokens$1.colorPaletteYellowForeground1 = statusSharedColors.yellow.shade30;
statusColorPaletteTokens$1.colorPaletteRedForegroundInverted = statusSharedColors.red.tint20;
statusColorPaletteTokens$1.colorPaletteGreenForegroundInverted = statusSharedColors.green.tint20;
statusColorPaletteTokens$1.colorPaletteYellowForegroundInverted = statusSharedColors.yellow.tint40;
const personaColorPaletteTokens$1 = personaSharedColorNames.reduce((acc, sharedColor) => {
  const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
  const sharedColorTokens = {
    [`colorPalette${color}Background2`]: personaSharedColors[sharedColor].tint40,
    [`colorPalette${color}Foreground2`]: personaSharedColors[sharedColor].shade30,
    [`colorPalette${color}BorderActive`]: personaSharedColors[sharedColor].primary
  };
  return Object.assign(acc, sharedColorTokens);
}, {});
const colorPaletteTokens$1 = {
  ...statusColorPaletteTokens$1,
  ...personaColorPaletteTokens$1
};
const colorStatusTokens$1 = Object.entries(statusColorMapping).reduce((acc, [statusColor, sharedColor]) => {
  const color = statusColor.slice(0, 1).toUpperCase() + statusColor.slice(1);
  const statusColorTokens = {
    [`colorStatus${color}Background1`]: mappedStatusColors[sharedColor].tint60,
    [`colorStatus${color}Background2`]: mappedStatusColors[sharedColor].tint40,
    [`colorStatus${color}Background3`]: mappedStatusColors[sharedColor].primary,
    [`colorStatus${color}Foreground1`]: mappedStatusColors[sharedColor].shade10,
    [`colorStatus${color}Foreground2`]: mappedStatusColors[sharedColor].shade30,
    [`colorStatus${color}Foreground3`]: mappedStatusColors[sharedColor].primary,
    [`colorStatus${color}ForegroundInverted`]: mappedStatusColors[sharedColor].tint30,
    [`colorStatus${color}BorderActive`]: mappedStatusColors[sharedColor].primary,
    [`colorStatus${color}Border1`]: mappedStatusColors[sharedColor].tint40,
    [`colorStatus${color}Border2`]: mappedStatusColors[sharedColor].primary
  };
  return Object.assign(acc, statusColorTokens);
}, {});
colorStatusTokens$1.colorStatusDangerBackground3Hover = mappedStatusColors[statusColorMapping.danger].shade10;
colorStatusTokens$1.colorStatusDangerBackground3Pressed = mappedStatusColors[statusColorMapping.danger].shade20;
colorStatusTokens$1.colorStatusWarningForeground1 = mappedStatusColors[statusColorMapping.warning].shade20;
colorStatusTokens$1.colorStatusWarningForeground3 = mappedStatusColors[statusColorMapping.warning].shade20;
colorStatusTokens$1.colorStatusWarningBorder2 = mappedStatusColors[statusColorMapping.warning].shade20;
const generateColorTokens$1 = (brand) => ({
  colorNeutralForeground1: grey[14],
  colorNeutralForeground1Hover: grey[14],
  colorNeutralForeground1Pressed: grey[14],
  colorNeutralForeground1Selected: grey[14],
  colorNeutralForeground2: grey[26],
  colorNeutralForeground2Hover: grey[14],
  colorNeutralForeground2Pressed: grey[14],
  colorNeutralForeground2Selected: grey[14],
  colorNeutralForeground2BrandHover: brand[80],
  colorNeutralForeground2BrandPressed: brand[70],
  colorNeutralForeground2BrandSelected: brand[80],
  colorNeutralForeground3: grey[38],
  colorNeutralForeground3Hover: grey[26],
  colorNeutralForeground3Pressed: grey[26],
  colorNeutralForeground3Selected: grey[26],
  colorNeutralForeground3BrandHover: brand[80],
  colorNeutralForeground3BrandPressed: brand[70],
  colorNeutralForeground3BrandSelected: brand[80],
  colorNeutralForeground4: grey[44],
  colorNeutralForeground5: grey[38],
  colorNeutralForeground5Hover: grey[14],
  colorNeutralForeground5Pressed: grey[14],
  colorNeutralForeground5Selected: grey[14],
  colorNeutralForegroundDisabled: grey[74],
  colorNeutralForegroundInvertedDisabled: whiteAlpha[40],
  colorBrandForegroundLink: brand[70],
  colorBrandForegroundLinkHover: brand[60],
  colorBrandForegroundLinkPressed: brand[40],
  colorBrandForegroundLinkSelected: brand[70],
  colorNeutralForeground2Link: grey[26],
  colorNeutralForeground2LinkHover: grey[14],
  colorNeutralForeground2LinkPressed: grey[14],
  colorNeutralForeground2LinkSelected: grey[14],
  colorCompoundBrandForeground1: brand[80],
  colorCompoundBrandForeground1Hover: brand[70],
  colorCompoundBrandForeground1Pressed: brand[60],
  colorBrandForeground1: brand[80],
  colorBrandForeground2: brand[70],
  colorBrandForeground2Hover: brand[60],
  colorBrandForeground2Pressed: brand[30],
  colorNeutralForeground1Static: grey[14],
  colorNeutralForegroundStaticInverted: white,
  colorNeutralForegroundInverted: white,
  colorNeutralForegroundInvertedHover: white,
  colorNeutralForegroundInvertedPressed: white,
  colorNeutralForegroundInvertedSelected: white,
  colorNeutralForegroundInverted2: white,
  colorNeutralForegroundOnBrand: white,
  colorNeutralForegroundInvertedLink: white,
  colorNeutralForegroundInvertedLinkHover: white,
  colorNeutralForegroundInvertedLinkPressed: white,
  colorNeutralForegroundInvertedLinkSelected: white,
  colorBrandForegroundInverted: brand[100],
  colorBrandForegroundInvertedHover: brand[110],
  colorBrandForegroundInvertedPressed: brand[100],
  colorBrandForegroundOnLight: brand[80],
  colorBrandForegroundOnLightHover: brand[70],
  colorBrandForegroundOnLightPressed: brand[50],
  colorBrandForegroundOnLightSelected: brand[60],
  colorNeutralBackground1: white,
  colorNeutralBackground1Hover: grey[96],
  colorNeutralBackground1Pressed: grey[88],
  colorNeutralBackground1Selected: grey[92],
  colorNeutralBackground2: grey[98],
  colorNeutralBackground2Hover: grey[94],
  colorNeutralBackground2Pressed: grey[86],
  colorNeutralBackground2Selected: grey[90],
  colorNeutralBackground3: grey[96],
  colorNeutralBackground3Hover: grey[92],
  colorNeutralBackground3Pressed: grey[84],
  colorNeutralBackground3Selected: grey[88],
  colorNeutralBackground4: grey[94],
  colorNeutralBackground4Hover: grey[98],
  colorNeutralBackground4Pressed: grey[96],
  colorNeutralBackground4Selected: white,
  colorNeutralBackground5: grey[92],
  colorNeutralBackground5Hover: grey[96],
  colorNeutralBackground5Pressed: grey[94],
  colorNeutralBackground5Selected: grey[98],
  colorNeutralBackground6: grey[90],
  colorNeutralBackground7: "#00000000",
  colorNeutralBackground7Hover: grey[92],
  colorNeutralBackground7Pressed: grey[84],
  colorNeutralBackground7Selected: "#00000000",
  colorNeutralBackground8: grey[99],
  colorNeutralBackgroundInverted: grey[16],
  colorNeutralBackgroundInvertedHover: grey[24],
  colorNeutralBackgroundInvertedPressed: grey[12],
  colorNeutralBackgroundInvertedSelected: grey[22],
  colorNeutralBackgroundStatic: grey[20],
  colorNeutralBackgroundAlpha: whiteAlpha[50],
  colorNeutralBackgroundAlpha2: whiteAlpha[80],
  colorSubtleBackground: "transparent",
  colorSubtleBackgroundHover: grey[96],
  colorSubtleBackgroundPressed: grey[88],
  colorSubtleBackgroundSelected: grey[92],
  colorSubtleBackgroundLightAlphaHover: whiteAlpha[70],
  colorSubtleBackgroundLightAlphaPressed: whiteAlpha[50],
  colorSubtleBackgroundLightAlphaSelected: "transparent",
  colorSubtleBackgroundInverted: "transparent",
  colorSubtleBackgroundInvertedHover: blackAlpha[10],
  colorSubtleBackgroundInvertedPressed: blackAlpha[30],
  colorSubtleBackgroundInvertedSelected: blackAlpha[20],
  colorTransparentBackground: "transparent",
  colorTransparentBackgroundHover: "transparent",
  colorTransparentBackgroundPressed: "transparent",
  colorTransparentBackgroundSelected: "transparent",
  colorNeutralBackgroundDisabled: grey[94],
  colorNeutralBackgroundDisabled2: white,
  colorNeutralBackgroundInvertedDisabled: whiteAlpha[10],
  colorNeutralStencil1: grey[90],
  colorNeutralStencil2: grey[98],
  colorNeutralStencil1Alpha: blackAlpha[10],
  colorNeutralStencil2Alpha: blackAlpha[5],
  colorBackgroundOverlay: blackAlpha[40],
  colorScrollbarOverlay: blackAlpha[50],
  colorBrandBackground: brand[80],
  colorBrandBackgroundHover: brand[70],
  colorBrandBackgroundPressed: brand[40],
  colorBrandBackgroundSelected: brand[60],
  colorCompoundBrandBackground: brand[80],
  colorCompoundBrandBackgroundHover: brand[70],
  colorCompoundBrandBackgroundPressed: brand[60],
  colorBrandBackgroundStatic: brand[80],
  colorBrandBackground2: brand[160],
  colorBrandBackground2Hover: brand[150],
  colorBrandBackground2Pressed: brand[130],
  colorBrandBackground3Static: brand[60],
  colorBrandBackground4Static: brand[40],
  colorBrandBackgroundInverted: white,
  colorBrandBackgroundInvertedHover: brand[160],
  colorBrandBackgroundInvertedPressed: brand[140],
  colorBrandBackgroundInvertedSelected: brand[150],
  colorNeutralCardBackground: grey[98],
  colorNeutralCardBackgroundHover: white,
  colorNeutralCardBackgroundPressed: grey[96],
  colorNeutralCardBackgroundSelected: grey[92],
  colorNeutralCardBackgroundDisabled: grey[94],
  colorNeutralStrokeAccessible: grey[38],
  colorNeutralStrokeAccessibleHover: grey[34],
  colorNeutralStrokeAccessiblePressed: grey[30],
  colorNeutralStrokeAccessibleSelected: brand[80],
  colorNeutralStroke1: grey[82],
  colorNeutralStroke1Hover: grey[78],
  colorNeutralStroke1Pressed: grey[70],
  colorNeutralStroke1Selected: grey[74],
  colorNeutralStroke2: grey[88],
  colorNeutralStroke3: grey[94],
  colorNeutralStroke4: grey[92],
  colorNeutralStroke4Hover: grey[88],
  colorNeutralStroke4Pressed: grey[84],
  colorNeutralStroke4Selected: grey[92],
  colorNeutralStrokeSubtle: grey[88],
  colorNeutralStrokeOnBrand: white,
  colorNeutralStrokeOnBrand2: white,
  colorNeutralStrokeOnBrand2Hover: white,
  colorNeutralStrokeOnBrand2Pressed: white,
  colorNeutralStrokeOnBrand2Selected: white,
  colorBrandStroke1: brand[80],
  colorBrandStroke2: brand[140],
  colorBrandStroke2Hover: brand[120],
  colorBrandStroke2Pressed: brand[80],
  colorBrandStroke2Contrast: brand[140],
  colorCompoundBrandStroke: brand[80],
  colorCompoundBrandStrokeHover: brand[70],
  colorCompoundBrandStrokePressed: brand[60],
  colorNeutralStrokeDisabled: grey[88],
  colorNeutralStrokeDisabled2: grey[92],
  colorNeutralStrokeInvertedDisabled: whiteAlpha[40],
  colorTransparentStroke: "transparent",
  colorTransparentStrokeInteractive: "transparent",
  colorTransparentStrokeDisabled: "transparent",
  colorNeutralStrokeAlpha: blackAlpha[5],
  colorNeutralStrokeAlpha2: whiteAlpha[20],
  colorStrokeFocus1: white,
  colorStrokeFocus2: black,
  colorNeutralShadowAmbient: "rgba(0,0,0,0.12)",
  colorNeutralShadowKey: "rgba(0,0,0,0.14)",
  colorNeutralShadowAmbientLighter: "rgba(0,0,0,0.06)",
  colorNeutralShadowKeyLighter: "rgba(0,0,0,0.07)",
  colorNeutralShadowAmbientDarker: "rgba(0,0,0,0.20)",
  colorNeutralShadowKeyDarker: "rgba(0,0,0,0.24)",
  colorBrandShadowAmbient: "rgba(0,0,0,0.30)",
  colorBrandShadowKey: "rgba(0,0,0,0.25)"
});
const borderRadius = {
  borderRadiusNone: "0",
  borderRadiusSmall: "2px",
  borderRadiusMedium: "4px",
  borderRadiusLarge: "6px",
  borderRadiusXLarge: "8px",
  borderRadius2XLarge: "12px",
  borderRadius3XLarge: "16px",
  borderRadius4XLarge: "24px",
  borderRadius5XLarge: "32px",
  borderRadius6XLarge: "40px",
  borderRadiusCircular: "10000px"
};
const curves$1 = {
  curveAccelerateMax: "cubic-bezier(0.9,0.1,1,0.2)",
  curveAccelerateMid: "cubic-bezier(1,0,1,1)",
  curveAccelerateMin: "cubic-bezier(0.8,0,0.78,1)",
  curveDecelerateMax: "cubic-bezier(0.1,0.9,0.2,1)",
  curveDecelerateMid: "cubic-bezier(0,0,0,1)",
  curveDecelerateMin: "cubic-bezier(0.33,0,0.1,1)",
  curveEasyEaseMax: "cubic-bezier(0.8,0,0.2,1)",
  curveEasyEase: "cubic-bezier(0.33,0,0.67,1)",
  curveLinear: "cubic-bezier(0,0,1,1)"
};
const durations$1 = {
  durationUltraFast: "50ms",
  durationFaster: "100ms",
  durationFast: "150ms",
  durationNormal: "200ms",
  durationGentle: "250ms",
  durationSlow: "300ms",
  durationSlower: "400ms",
  durationUltraSlow: "500ms"
};
const fontSizes = {
  fontSizeBase100: "10px",
  fontSizeBase200: "12px",
  fontSizeBase300: "14px",
  fontSizeBase400: "16px",
  fontSizeBase500: "20px",
  fontSizeBase600: "24px",
  fontSizeHero700: "28px",
  fontSizeHero800: "32px",
  fontSizeHero900: "40px",
  fontSizeHero1000: "68px"
};
const lineHeights = {
  lineHeightBase100: "14px",
  lineHeightBase200: "16px",
  lineHeightBase300: "20px",
  lineHeightBase400: "22px",
  lineHeightBase500: "28px",
  lineHeightBase600: "32px",
  lineHeightHero700: "36px",
  lineHeightHero800: "40px",
  lineHeightHero900: "52px",
  lineHeightHero1000: "92px"
};
const fontWeights = {
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemibold: 600,
  fontWeightBold: 700
};
const fontFamilies = {
  fontFamilyBase: "'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif",
  fontFamilyMonospace: "Consolas, 'Courier New', Courier, monospace",
  fontFamilyNumeric: "Bahnschrift, 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif"
};
const spacings = {
  none: "0",
  xxs: "2px",
  xs: "4px",
  sNudge: "6px",
  s: "8px",
  mNudge: "10px",
  m: "12px",
  l: "16px",
  xl: "20px",
  xxl: "24px",
  xxxl: "32px"
};
const horizontalSpacings = {
  spacingHorizontalNone: spacings.none,
  spacingHorizontalXXS: spacings.xxs,
  spacingHorizontalXS: spacings.xs,
  spacingHorizontalSNudge: spacings.sNudge,
  spacingHorizontalS: spacings.s,
  spacingHorizontalMNudge: spacings.mNudge,
  spacingHorizontalM: spacings.m,
  spacingHorizontalL: spacings.l,
  spacingHorizontalXL: spacings.xl,
  spacingHorizontalXXL: spacings.xxl,
  spacingHorizontalXXXL: spacings.xxxl
};
const verticalSpacings = {
  spacingVerticalNone: spacings.none,
  spacingVerticalXXS: spacings.xxs,
  spacingVerticalXS: spacings.xs,
  spacingVerticalSNudge: spacings.sNudge,
  spacingVerticalS: spacings.s,
  spacingVerticalMNudge: spacings.mNudge,
  spacingVerticalM: spacings.m,
  spacingVerticalL: spacings.l,
  spacingVerticalXL: spacings.xl,
  spacingVerticalXXL: spacings.xxl,
  spacingVerticalXXXL: spacings.xxxl
};
const strokeWidths = {
  strokeWidthThin: "1px",
  strokeWidthThick: "2px",
  strokeWidthThicker: "3px",
  strokeWidthThickest: "4px"
};
function createShadowTokens(ambientColor, keyColor, tokenSuffix = "") {
  return {
    [`shadow2${tokenSuffix}`]: `0 0 2px ${ambientColor}, 0 1px 2px ${keyColor}`,
    [`shadow4${tokenSuffix}`]: `0 0 2px ${ambientColor}, 0 2px 4px ${keyColor}`,
    [`shadow8${tokenSuffix}`]: `0 0 2px ${ambientColor}, 0 4px 8px ${keyColor}`,
    [`shadow16${tokenSuffix}`]: `0 0 2px ${ambientColor}, 0 8px 16px ${keyColor}`,
    [`shadow28${tokenSuffix}`]: `0 0 8px ${ambientColor}, 0 14px 28px ${keyColor}`,
    [`shadow64${tokenSuffix}`]: `0 0 8px ${ambientColor}, 0 32px 64px ${keyColor}`
  };
}
const createLightTheme = (brand) => {
  const colorTokens = generateColorTokens$1(brand);
  return {
    ...borderRadius,
    ...fontSizes,
    ...lineHeights,
    ...fontFamilies,
    ...fontWeights,
    ...strokeWidths,
    ...horizontalSpacings,
    ...verticalSpacings,
    ...durations$1,
    ...curves$1,
    ...colorTokens,
    ...colorPaletteTokens$1,
    ...colorStatusTokens$1,
    ...createShadowTokens(colorTokens.colorNeutralShadowAmbient, colorTokens.colorNeutralShadowKey),
    ...createShadowTokens(colorTokens.colorBrandShadowAmbient, colorTokens.colorBrandShadowKey, "Brand")
  };
};
const brandWeb = {
  10: `#061724`,
  20: `#082338`,
  30: `#0a2e4a`,
  40: `#0c3b5e`,
  50: `#0e4775`,
  60: `#0f548c`,
  70: `#115ea3`,
  80: `#0f6cbd`,
  90: `#2886de`,
  100: `#479ef5`,
  110: `#62abf5`,
  120: `#77b7f7`,
  130: `#96c6fa`,
  140: `#b4d6fa`,
  150: `#cfe4fa`,
  160: `#ebf3fc`
};
const statusColorPaletteTokens = statusSharedColorNames.reduce((acc, sharedColor) => {
  const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
  const sharedColorTokens = {
    [`colorPalette${color}Background1`]: statusSharedColors[sharedColor].shade40,
    [`colorPalette${color}Background2`]: statusSharedColors[sharedColor].shade30,
    [`colorPalette${color}Background3`]: statusSharedColors[sharedColor].primary,
    [`colorPalette${color}Foreground1`]: statusSharedColors[sharedColor].tint30,
    [`colorPalette${color}Foreground2`]: statusSharedColors[sharedColor].tint40,
    [`colorPalette${color}Foreground3`]: statusSharedColors[sharedColor].tint20,
    [`colorPalette${color}BorderActive`]: statusSharedColors[sharedColor].tint30,
    [`colorPalette${color}Border1`]: statusSharedColors[sharedColor].primary,
    [`colorPalette${color}Border2`]: statusSharedColors[sharedColor].tint20
  };
  return Object.assign(acc, sharedColorTokens);
}, {});
statusColorPaletteTokens.colorPaletteRedForeground3 = statusSharedColors.red.tint30;
statusColorPaletteTokens.colorPaletteRedBorder2 = statusSharedColors.red.tint30;
statusColorPaletteTokens.colorPaletteGreenForeground3 = statusSharedColors.green.tint40;
statusColorPaletteTokens.colorPaletteGreenBorder2 = statusSharedColors.green.tint40;
statusColorPaletteTokens.colorPaletteDarkOrangeForeground3 = statusSharedColors.darkOrange.tint30;
statusColorPaletteTokens.colorPaletteDarkOrangeBorder2 = statusSharedColors.darkOrange.tint30;
statusColorPaletteTokens.colorPaletteRedForegroundInverted = statusSharedColors.red.primary;
statusColorPaletteTokens.colorPaletteGreenForegroundInverted = statusSharedColors.green.primary;
statusColorPaletteTokens.colorPaletteYellowForegroundInverted = statusSharedColors.yellow.shade30;
const personaColorPaletteTokens = personaSharedColorNames.reduce((acc, sharedColor) => {
  const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
  const sharedColorTokens = {
    [`colorPalette${color}Background2`]: personaSharedColors[sharedColor].shade30,
    [`colorPalette${color}Foreground2`]: personaSharedColors[sharedColor].tint40,
    [`colorPalette${color}BorderActive`]: personaSharedColors[sharedColor].tint30
  };
  return Object.assign(acc, sharedColorTokens);
}, {});
personaColorPaletteTokens.colorPaletteDarkRedBackground2 = personaSharedColors.darkRed.shade20;
personaColorPaletteTokens.colorPalettePlumBackground2 = personaSharedColors.plum.shade20;
const colorPaletteTokens = {
  ...statusColorPaletteTokens,
  ...personaColorPaletteTokens
};
const colorStatusTokens = Object.entries(statusColorMapping).reduce((acc, [statusColor, sharedColor]) => {
  const color = statusColor.slice(0, 1).toUpperCase() + statusColor.slice(1);
  const statusColorTokens = {
    [`colorStatus${color}Background1`]: mappedStatusColors[sharedColor].shade40,
    [`colorStatus${color}Background2`]: mappedStatusColors[sharedColor].shade30,
    [`colorStatus${color}Background3`]: mappedStatusColors[sharedColor].primary,
    [`colorStatus${color}Foreground1`]: mappedStatusColors[sharedColor].tint30,
    [`colorStatus${color}Foreground2`]: mappedStatusColors[sharedColor].tint40,
    [`colorStatus${color}Foreground3`]: mappedStatusColors[sharedColor].tint20,
    [`colorStatus${color}BorderActive`]: mappedStatusColors[sharedColor].tint30,
    [`colorStatus${color}ForegroundInverted`]: mappedStatusColors[sharedColor].shade10,
    [`colorStatus${color}Border1`]: mappedStatusColors[sharedColor].primary,
    [`colorStatus${color}Border2`]: mappedStatusColors[sharedColor].tint20
  };
  return Object.assign(acc, statusColorTokens);
}, {});
colorStatusTokens.colorStatusDangerBackground3Hover = mappedStatusColors[statusColorMapping.danger].shade10;
colorStatusTokens.colorStatusDangerBackground3Pressed = mappedStatusColors[statusColorMapping.danger].shade20;
colorStatusTokens.colorStatusDangerForeground3 = mappedStatusColors[statusColorMapping.danger].tint40;
colorStatusTokens.colorStatusDangerBorder2 = mappedStatusColors[statusColorMapping.danger].tint30;
colorStatusTokens.colorStatusSuccessForeground3 = mappedStatusColors[statusColorMapping.success].tint40;
colorStatusTokens.colorStatusSuccessBorder2 = mappedStatusColors[statusColorMapping.success].tint40;
colorStatusTokens.colorStatusWarningForegroundInverted = mappedStatusColors[statusColorMapping.warning].shade20;
const webLightTheme = createLightTheme(brandWeb);
const generateColorTokens = (brand) => ({
  colorNeutralForeground1: white,
  colorNeutralForeground1Hover: white,
  colorNeutralForeground1Pressed: white,
  colorNeutralForeground1Selected: white,
  colorNeutralForeground2: grey[84],
  colorNeutralForeground2Hover: white,
  colorNeutralForeground2Pressed: white,
  colorNeutralForeground2Selected: white,
  colorNeutralForeground2BrandHover: brand[100],
  colorNeutralForeground2BrandPressed: brand[90],
  colorNeutralForeground2BrandSelected: brand[100],
  colorNeutralForeground3: grey[68],
  colorNeutralForeground3Hover: grey[84],
  colorNeutralForeground3Pressed: grey[84],
  colorNeutralForeground3Selected: grey[84],
  colorNeutralForeground3BrandHover: brand[100],
  colorNeutralForeground3BrandPressed: brand[90],
  colorNeutralForeground3BrandSelected: brand[100],
  colorNeutralForeground4: grey[60],
  colorNeutralForeground5: grey[68],
  colorNeutralForeground5Hover: white,
  colorNeutralForeground5Pressed: white,
  colorNeutralForeground5Selected: white,
  colorNeutralForegroundDisabled: grey[36],
  colorNeutralForegroundInvertedDisabled: whiteAlpha[40],
  colorBrandForegroundLink: brand[100],
  colorBrandForegroundLinkHover: brand[110],
  colorBrandForegroundLinkPressed: brand[90],
  colorBrandForegroundLinkSelected: brand[100],
  colorNeutralForeground2Link: grey[84],
  colorNeutralForeground2LinkHover: white,
  colorNeutralForeground2LinkPressed: white,
  colorNeutralForeground2LinkSelected: white,
  colorCompoundBrandForeground1: brand[100],
  colorCompoundBrandForeground1Hover: brand[110],
  colorCompoundBrandForeground1Pressed: brand[90],
  colorBrandForeground1: brand[100],
  colorBrandForeground2: brand[110],
  colorBrandForeground2Hover: brand[130],
  colorBrandForeground2Pressed: brand[160],
  colorNeutralForeground1Static: grey[14],
  colorNeutralForegroundStaticInverted: white,
  colorNeutralForegroundInverted: grey[14],
  colorNeutralForegroundInvertedHover: grey[14],
  colorNeutralForegroundInvertedPressed: grey[14],
  colorNeutralForegroundInvertedSelected: grey[14],
  colorNeutralForegroundInverted2: grey[14],
  colorNeutralForegroundOnBrand: white,
  colorNeutralForegroundInvertedLink: white,
  colorNeutralForegroundInvertedLinkHover: white,
  colorNeutralForegroundInvertedLinkPressed: white,
  colorNeutralForegroundInvertedLinkSelected: white,
  colorBrandForegroundInverted: brand[80],
  colorBrandForegroundInvertedHover: brand[70],
  colorBrandForegroundInvertedPressed: brand[60],
  colorBrandForegroundOnLight: brand[80],
  colorBrandForegroundOnLightHover: brand[70],
  colorBrandForegroundOnLightPressed: brand[50],
  colorBrandForegroundOnLightSelected: brand[60],
  colorNeutralBackground1: grey[16],
  colorNeutralBackground1Hover: grey[24],
  colorNeutralBackground1Pressed: grey[12],
  colorNeutralBackground1Selected: grey[22],
  colorNeutralBackground2: grey[12],
  colorNeutralBackground2Hover: grey[20],
  colorNeutralBackground2Pressed: grey[8],
  colorNeutralBackground2Selected: grey[18],
  colorNeutralBackground3: grey[8],
  colorNeutralBackground3Hover: grey[16],
  colorNeutralBackground3Pressed: grey[4],
  colorNeutralBackground3Selected: grey[14],
  colorNeutralBackground4: grey[4],
  colorNeutralBackground4Hover: grey[12],
  colorNeutralBackground4Pressed: black,
  colorNeutralBackground4Selected: grey[10],
  colorNeutralBackground5: black,
  colorNeutralBackground5Hover: grey[8],
  colorNeutralBackground5Pressed: grey[2],
  colorNeutralBackground5Selected: grey[6],
  colorNeutralBackground6: grey[20],
  colorNeutralBackground7: "#00000000",
  colorNeutralBackground7Hover: grey[10],
  colorNeutralBackground7Pressed: grey[4],
  colorNeutralBackground7Selected: "#00000000",
  colorNeutralBackground8: grey[16],
  colorNeutralBackgroundInverted: white,
  colorNeutralBackgroundInvertedHover: grey[96],
  colorNeutralBackgroundInvertedPressed: grey[88],
  colorNeutralBackgroundInvertedSelected: grey[92],
  colorNeutralBackgroundStatic: grey[24],
  colorNeutralBackgroundAlpha: grey10Alpha[50],
  colorNeutralBackgroundAlpha2: grey12Alpha[70],
  colorSubtleBackground: "transparent",
  colorSubtleBackgroundHover: grey[22],
  colorSubtleBackgroundPressed: grey[18],
  colorSubtleBackgroundSelected: grey[20],
  colorSubtleBackgroundLightAlphaHover: grey14Alpha[80],
  colorSubtleBackgroundLightAlphaPressed: grey14Alpha[50],
  colorSubtleBackgroundLightAlphaSelected: "transparent",
  colorSubtleBackgroundInverted: "transparent",
  colorSubtleBackgroundInvertedHover: blackAlpha[10],
  colorSubtleBackgroundInvertedPressed: blackAlpha[30],
  colorSubtleBackgroundInvertedSelected: blackAlpha[20],
  colorTransparentBackground: "transparent",
  colorTransparentBackgroundHover: "transparent",
  colorTransparentBackgroundPressed: "transparent",
  colorTransparentBackgroundSelected: "transparent",
  colorNeutralBackgroundDisabled: grey[8],
  colorNeutralBackgroundDisabled2: grey[16],
  colorNeutralBackgroundInvertedDisabled: whiteAlpha[10],
  colorNeutralStencil1: grey[34],
  colorNeutralStencil2: grey[20],
  colorNeutralStencil1Alpha: whiteAlpha[10],
  colorNeutralStencil2Alpha: whiteAlpha[5],
  colorBackgroundOverlay: blackAlpha[50],
  colorScrollbarOverlay: whiteAlpha[60],
  colorBrandBackground: brand[70],
  colorBrandBackgroundHover: brand[80],
  colorBrandBackgroundPressed: brand[40],
  colorBrandBackgroundSelected: brand[60],
  colorCompoundBrandBackground: brand[100],
  colorCompoundBrandBackgroundHover: brand[110],
  colorCompoundBrandBackgroundPressed: brand[90],
  colorBrandBackgroundStatic: brand[80],
  colorBrandBackground2: brand[20],
  colorBrandBackground2Hover: brand[40],
  colorBrandBackground2Pressed: brand[10],
  colorBrandBackground3Static: brand[60],
  colorBrandBackground4Static: brand[40],
  colorBrandBackgroundInverted: white,
  colorBrandBackgroundInvertedHover: brand[160],
  colorBrandBackgroundInvertedPressed: brand[140],
  colorBrandBackgroundInvertedSelected: brand[150],
  colorNeutralCardBackground: grey[20],
  colorNeutralCardBackgroundHover: grey[24],
  colorNeutralCardBackgroundPressed: grey[18],
  colorNeutralCardBackgroundSelected: grey[22],
  colorNeutralCardBackgroundDisabled: grey[8],
  colorNeutralStrokeAccessible: grey[68],
  colorNeutralStrokeAccessibleHover: grey[74],
  colorNeutralStrokeAccessiblePressed: grey[70],
  colorNeutralStrokeAccessibleSelected: brand[100],
  colorNeutralStroke1: grey[40],
  colorNeutralStroke1Hover: grey[46],
  colorNeutralStroke1Pressed: grey[42],
  colorNeutralStroke1Selected: grey[44],
  colorNeutralStroke2: grey[32],
  colorNeutralStroke3: grey[24],
  colorNeutralStroke4: grey[24],
  colorNeutralStroke4Hover: grey[18],
  colorNeutralStroke4Pressed: grey[14],
  colorNeutralStroke4Selected: grey[24],
  colorNeutralStrokeSubtle: grey[4],
  colorNeutralStrokeOnBrand: grey[16],
  colorNeutralStrokeOnBrand2: white,
  colorNeutralStrokeOnBrand2Hover: white,
  colorNeutralStrokeOnBrand2Pressed: white,
  colorNeutralStrokeOnBrand2Selected: white,
  colorBrandStroke1: brand[100],
  colorBrandStroke2: brand[50],
  colorBrandStroke2Hover: brand[50],
  colorBrandStroke2Pressed: brand[30],
  colorBrandStroke2Contrast: brand[50],
  colorCompoundBrandStroke: brand[100],
  colorCompoundBrandStrokeHover: brand[110],
  colorCompoundBrandStrokePressed: brand[90],
  colorNeutralStrokeDisabled: grey[26],
  colorNeutralStrokeDisabled2: grey[24],
  colorNeutralStrokeInvertedDisabled: whiteAlpha[40],
  colorTransparentStroke: "transparent",
  colorTransparentStrokeInteractive: "transparent",
  colorTransparentStrokeDisabled: "transparent",
  colorNeutralStrokeAlpha: whiteAlpha[10],
  colorNeutralStrokeAlpha2: whiteAlpha[20],
  colorStrokeFocus1: black,
  colorStrokeFocus2: white,
  colorNeutralShadowAmbient: "rgba(0,0,0,0.24)",
  colorNeutralShadowKey: "rgba(0,0,0,0.28)",
  colorNeutralShadowAmbientLighter: "rgba(0,0,0,0.12)",
  colorNeutralShadowKeyLighter: "rgba(0,0,0,0.14)",
  colorNeutralShadowAmbientDarker: "rgba(0,0,0,0.40)",
  colorNeutralShadowKeyDarker: "rgba(0,0,0,0.48)",
  colorBrandShadowAmbient: "rgba(0,0,0,0.30)",
  colorBrandShadowKey: "rgba(0,0,0,0.25)"
});
const createDarkTheme = (brand) => {
  const colorTokens = generateColorTokens(brand);
  return {
    ...borderRadius,
    ...fontSizes,
    ...lineHeights,
    ...fontFamilies,
    ...fontWeights,
    ...strokeWidths,
    ...horizontalSpacings,
    ...verticalSpacings,
    ...durations$1,
    ...curves$1,
    ...colorTokens,
    ...colorPaletteTokens,
    ...colorStatusTokens,
    ...createShadowTokens(colorTokens.colorNeutralShadowAmbient, colorTokens.colorNeutralShadowKey),
    ...createShadowTokens(colorTokens.colorBrandShadowAmbient, colorTokens.colorBrandShadowKey, "Brand")
  };
};
const webDarkTheme = createDarkTheme(brandWeb);
const fluentProviderClassNames = {
  root: "fui-FluentProvider"
};
const useStyles$3 = /* @__PURE__ */ __styles$1({
  root: {
    sj55zd: "f19n0e5",
    De3pzq: "fxugw4r",
    fsow6f: ["f1o700av", "fes3tcz"],
    Bahqtrf: "fk6fouc",
    Be2twd7: "fkhj508",
    Bhrd7zp: "figsok6",
    Bg96gwp: "f1i3iumi"
  }
}, {
  d: [".f19n0e5{color:var(--colorNeutralForeground1);}", ".fxugw4r{background-color:var(--colorNeutralBackground1);}", ".f1o700av{text-align:left;}", ".fes3tcz{text-align:right;}", ".fk6fouc{font-family:var(--fontFamilyBase);}", ".fkhj508{font-size:var(--fontSizeBase300);}", ".figsok6{font-weight:var(--fontWeightRegular);}", ".f1i3iumi{line-height:var(--lineHeightBase300);}"]
});
const useFluentProviderStyles_unstable = (state) => {
  const renderer = useRenderer();
  const styles = useStyles$3({
    dir: state.dir,
    renderer
  });
  state.root.className = mergeClasses(fluentProviderClassNames.root, state.themeClassName, styles.root, state.root.className);
  return state;
};
const useInsertionEffect = reactExports.useInsertionEffect ? reactExports.useInsertionEffect : useIsomorphicLayoutEffect;
const createStyleTag = (target, elementAttributes) => {
  if (!(target === null || target === void 0 ? void 0 : target.head)) {
    return void 0;
  }
  const tag = target.createElement("style");
  Object.keys(elementAttributes).forEach((attrName) => {
    tag.setAttribute(attrName, elementAttributes[attrName]);
  });
  target.head.appendChild(tag);
  return tag;
};
const insertSheet = (tag, rule) => {
  const sheet = tag.sheet;
  if (sheet) {
    if (sheet.cssRules.length > 0) {
      sheet.deleteRule(0);
    }
    sheet.insertRule(rule, 0);
  }
};
const useFluentProviderThemeStyleTag = (options) => {
  const { targetDocument, theme, rendererAttributes } = options;
  const styleTag = reactExports.useRef(void 0);
  const styleTagId = useId(fluentProviderClassNames.root);
  const styleElementAttributes = rendererAttributes;
  const rule = reactExports.useMemo(() => createCSSRuleFromTheme(`.${styleTagId}`, theme), [
    theme,
    styleTagId
  ]);
  useHandleSSRStyleElements(targetDocument, styleTagId);
  useInsertionEffect(() => {
    const ssrStyleElement = targetDocument === null || targetDocument === void 0 ? void 0 : targetDocument.getElementById(styleTagId);
    if (ssrStyleElement) {
      styleTag.current = ssrStyleElement;
    } else {
      styleTag.current = createStyleTag(targetDocument, {
        ...styleElementAttributes,
        id: styleTagId
      });
      if (styleTag.current) {
        insertSheet(styleTag.current, rule);
      }
    }
    return () => {
      var _styleTag_current;
      (_styleTag_current = styleTag.current) === null || _styleTag_current === void 0 ? void 0 : _styleTag_current.remove();
    };
  }, [
    styleTagId,
    targetDocument,
    rule,
    styleElementAttributes
  ]);
  return {
    styleTagId,
    rule
  };
};
function useHandleSSRStyleElements(targetDocument, styleTagId) {
  reactExports.useState(() => {
    if (!targetDocument) {
      return;
    }
    const themeStyleElement = targetDocument.getElementById(styleTagId);
    if (themeStyleElement) {
      targetDocument.head.append(themeStyleElement);
    }
  });
}
const DEFAULT_STYLE_HOOKS = {};
const DEFAULT_RENDERER_ATTRIBUTES = {};
const useFluentProvider_unstable = (props, ref) => {
  var _renderer_styleElementAttributes;
  const parentContext = useFluent();
  const parentTheme = useTheme();
  const parentOverrides = useOverrides();
  const parentCustomStyleHooks = reactExports.useContext(CustomStyleHooksContext) || DEFAULT_STYLE_HOOKS;
  const {
    applyStylesToPortals = true,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    customStyleHooks_unstable,
    dir = parentContext.dir,
    targetDocument = parentContext.targetDocument,
    theme,
    overrides_unstable: overrides = {}
  } = props;
  const mergedTheme = shallowMerge(parentTheme, theme);
  const mergedOverrides = shallowMerge(parentOverrides, overrides);
  const mergedCustomStyleHooks = shallowMerge(parentCustomStyleHooks, customStyleHooks_unstable);
  const renderer = useRenderer();
  const { styleTagId, rule } = useFluentProviderThemeStyleTag({
    theme: mergedTheme,
    targetDocument,
    rendererAttributes: (_renderer_styleElementAttributes = renderer.styleElementAttributes) !== null && _renderer_styleElementAttributes !== void 0 ? _renderer_styleElementAttributes : DEFAULT_RENDERER_ATTRIBUTES
  });
  return {
    applyStylesToPortals,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    customStyleHooks_unstable: mergedCustomStyleHooks,
    dir,
    targetDocument,
    theme: mergedTheme,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    overrides_unstable: mergedOverrides,
    themeClassName: styleTagId,
    components: {
      root: "div"
    },
    root: always(getIntrinsicElementProps("div", {
      ...props,
      dir,
      // FIXME:
      // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
      // but since it would be a breaking change to fix it, we are casting ref to it's proper type
      ref: useMergedRefs(ref, useFocusVisible({
        targetDocument
      }))
    }), {
      elementType: "div"
    }),
    serverStyleProps: {
      cssRule: rule,
      attributes: {
        ...renderer.styleElementAttributes,
        id: styleTagId
      }
    }
  };
};
function shallowMerge(a, b) {
  if (a && b) {
    return {
      ...a,
      ...b
    };
  }
  if (a) {
    return a;
  }
  return b;
}
function useTheme() {
  return reactExports.useContext(ThemeContext);
}
function useFluentProviderContextValues_unstable(state) {
  const {
    applyStylesToPortals,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    customStyleHooks_unstable,
    dir,
    root,
    targetDocument,
    theme,
    themeClassName,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    overrides_unstable
  } = state;
  const provider = reactExports.useMemo(() => ({
    dir,
    targetDocument
  }), [
    dir,
    targetDocument
  ]);
  const [tooltip] = reactExports.useState(() => ({}));
  const iconDirection = reactExports.useMemo(() => ({
    textDirection: dir
  }), [
    dir
  ]);
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    customStyleHooks_unstable,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    overrides_unstable,
    provider,
    textDirection: dir,
    iconDirection,
    tooltip,
    theme,
    themeClassName: applyStylesToPortals ? root.className : themeClassName
  };
}
const FluentProvider = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useFluentProvider_unstable(props, ref);
  useFluentProviderStyles_unstable(state);
  const contextValues = useFluentProviderContextValues_unstable(state);
  return renderFluentProvider_unstable(state, contextValues);
});
FluentProvider.displayName = "FluentProvider";
const Enter = "Enter";
const Space = " ";
const Tab = "Tab";
const ArrowDown = "ArrowDown";
const ArrowLeft = "ArrowLeft";
const ArrowRight = "ArrowRight";
const ArrowUp = "ArrowUp";
const End = "End";
const Home = "Home";
const PageDown = "PageDown";
const PageUp = "PageUp";
const Escape = "Escape";
function useARIAButtonProps(type, props) {
  const { disabled, disabledFocusable = false, ["aria-disabled"]: ariaDisabled, onClick, onKeyDown, onKeyUp, ...rest } = props !== null && props !== void 0 ? props : {};
  const normalizedARIADisabled = typeof ariaDisabled === "string" ? ariaDisabled === "true" : ariaDisabled;
  const isDisabled = disabled || disabledFocusable || normalizedARIADisabled;
  const handleClick = useEventCallback((ev) => {
    if (isDisabled) {
      ev.preventDefault();
      ev.stopPropagation();
    } else {
      onClick === null || onClick === void 0 ? void 0 : onClick(ev);
    }
  });
  const handleKeyDown = useEventCallback((ev) => {
    onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(ev);
    if (ev.isDefaultPrevented()) {
      return;
    }
    const key = ev.key;
    if (isDisabled && (key === Enter || key === Space)) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
    if (key === Space) {
      ev.preventDefault();
      return;
    } else if (key === Enter) {
      ev.preventDefault();
      ev.currentTarget.click();
    }
  });
  const handleKeyUp = useEventCallback((ev) => {
    onKeyUp === null || onKeyUp === void 0 ? void 0 : onKeyUp(ev);
    if (ev.isDefaultPrevented()) {
      return;
    }
    const key = ev.key;
    if (isDisabled && (key === Enter || key === Space)) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
    if (key === Space) {
      ev.preventDefault();
      ev.currentTarget.click();
    }
  });
  if (type === "button" || type === void 0) {
    return {
      ...rest,
      disabled: disabled && !disabledFocusable,
      "aria-disabled": disabledFocusable ? true : normalizedARIADisabled,
      // onclick should still use internal handler to ensure prevention if disabled
      // if disabledFocusable then there's no requirement for handlers as those events should not be propagated
      onClick: disabledFocusable ? void 0 : handleClick,
      onKeyUp: disabledFocusable ? void 0 : onKeyUp,
      onKeyDown: disabledFocusable ? void 0 : onKeyDown
    };
  } else {
    const isLink = !!rest.href;
    let roleOverride = isLink ? void 0 : "button";
    if (!roleOverride && isDisabled) {
      roleOverride = "link";
    }
    const resultProps = {
      role: roleOverride,
      tabIndex: disabledFocusable || !isLink && !disabled ? 0 : void 0,
      ...rest,
      // If it's not a <button> than listeners are required even with disabledFocusable
      // Since you cannot assure the default behavior of the element
      // E.g: <a> will redirect on click
      onClick: handleClick,
      onKeyUp: handleKeyUp,
      onKeyDown: handleKeyDown,
      "aria-disabled": isDisabled
    };
    if (type === "a" && isDisabled) {
      resultProps.href = void 0;
    }
    return resultProps;
  }
}
const useStyles$2 = __styles({
  root: {
    mc9l5x: "f1w7gpdv",
    Bg96gwp: "fez10in"
  },
  rtl: {
    Bz10aip: "f13rod7r"
  }
}, {
  d: [".f1w7gpdv{display:inline;}", ".fez10in{line-height:0;}", ".f13rod7r{transform:scaleX(-1);}"]
});
const iconClassName = "fui-Icon";
const DATA_FUI_ICON = "data-fui-icon";
const useBaseIconState = (props, options) => {
  const {
    // remove unwanted props to be set on the svg/html element
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filled,
    // consumed by the icon factory to scope color-icon ids, never a DOM attribute
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    idPrefix,
    title,
    primaryFill = "currentColor",
    ...rest
  } = props;
  const state = {
    ...rest,
    fill: primaryFill
  };
  const iconContext = useIconContext();
  const isRtlFlip = Boolean((options === null || options === void 0 ? void 0 : options.flipInRtl) && (iconContext === null || iconContext === void 0 ? void 0 : iconContext.textDirection) === "rtl");
  if (title) {
    state["aria-label"] = title;
  }
  if (!state["aria-label"] && !state["aria-labelledby"]) {
    state["aria-hidden"] = true;
  } else {
    state["role"] = "img";
  }
  state[DATA_FUI_ICON] = "";
  return { state, isRtlFlip };
};
const useIconState = (props, options) => {
  const styles = useStyles$2();
  const { state, isRtlFlip } = useBaseIconState(props, options);
  state.className = mergeClasses(styles.root, isRtlFlip && styles.rtl, state.className);
  return state;
};
const useRootStyles$5 = __styles({
  root: {
    B8gzw0y: "f1dd5bof"
  }
}, {
  m: [["@media (forced-colors: active){.f1dd5bof{forced-color-adjust:auto;}}", {
    m: "(forced-colors: active)"
  }]]
});
const URL_REF = "url(#";
const renderSvgNode = (node, key, prefix) => {
  const [tag, attrs, ...children] = node;
  let scoped = attrs;
  if (prefix && attrs) {
    const next = {};
    for (const attrName in attrs) {
      const attrValue = attrs[attrName];
      if (typeof attrValue !== "string") {
        next[attrName] = attrValue;
      } else if (attrName === "id") {
        next[attrName] = prefix + attrValue;
      } else {
        const refAt = attrValue.indexOf(URL_REF);
        next[attrName] = refAt < 0 ? attrValue : attrValue.slice(0, refAt + URL_REF.length) + prefix + attrValue.slice(refAt + URL_REF.length);
      }
    }
    scoped = next;
  }
  return reactExports.createElement(tag, { ...scoped, key }, ...children.map((child, idx) => renderSvgNode(child, idx, prefix)));
};
const computeViewBox = (width) => width === "1em" ? "20" : width;
const precomputeColorChildren = (pathsOrSvg, options, prefix) => typeof pathsOrSvg !== "string" && ((options === null || options === void 0 ? void 0 : options.color) || Array.isArray(pathsOrSvg[0])) ? pathsOrSvg.map((node, i) => renderSvgNode(node, i, prefix)) : void 0;
const noColorChildren = () => void 0;
const createColorChildrenResolver = (pathsOrSvg, options) => {
  const colorChildren = precomputeColorChildren(pathsOrSvg, options);
  if (!colorChildren) {
    return noColorChildren;
  }
  return function useColorChildren(idPrefix) {
    return reactExports.useMemo(() => idPrefix ? precomputeColorChildren(pathsOrSvg, options, idPrefix) : colorChildren, [idPrefix]);
  };
};
const renderSvgBody = (state, pathsOrSvg, colorChildren) => {
  if (typeof pathsOrSvg === "string") {
    return reactExports.createElement("svg", { ...state, dangerouslySetInnerHTML: { __html: pathsOrSvg } });
  }
  if (colorChildren) {
    return reactExports.createElement("svg", state, ...colorChildren);
  }
  return reactExports.createElement("svg", state, ...pathsOrSvg.map((d) => reactExports.createElement("path", { d, fill: state.fill })));
};
const createFluentIcon = (displayName, width, pathsOrSvg, options) => {
  const viewBoxWidth = computeViewBox(width);
  const useColorChildren = createColorChildrenResolver(pathsOrSvg, options);
  const Icon = reactExports.forwardRef((props, ref) => {
    const styles = useRootStyles$5();
    const iconState = useIconState(props, { flipInRtl: options === null || options === void 0 ? void 0 : options.flipInRtl });
    const colorChildren = useColorChildren(props.idPrefix);
    const state = {
      ...iconState,
      className: mergeClasses(iconClassName, iconState.className, styles.root),
      ref,
      width,
      height: width,
      viewBox: `0 0 ${viewBoxWidth} ${viewBoxWidth}`,
      xmlns: "http://www.w3.org/2000/svg"
    };
    return renderSvgBody(state, pathsOrSvg, colorChildren);
  });
  Icon.displayName = displayName;
  return Icon;
};
const CircleFilled = /* @__PURE__ */ createFluentIcon("CircleFilled", "1em", ["M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16"]);
const DismissRegular = /* @__PURE__ */ createFluentIcon("DismissRegular", "1em", ["m4.09 4.22.06-.07a.5.5 0 0 1 .63-.06l.07.06L10 9.29l5.15-5.14a.5.5 0 0 1 .63-.06l.07.06c.18.17.2.44.06.63l-.06.07L10.71 10l5.14 5.15c.18.17.2.44.06.63l-.06.07a.5.5 0 0 1-.63.06l-.07-.06L10 10.71l-5.15 5.14a.5.5 0 0 1-.63.06l-.07-.06a.5.5 0 0 1-.06-.63l.06-.07L9.29 10 4.15 4.85a.5.5 0 0 1-.06-.63l.06-.07z"]);
const Copy16Regular = /* @__PURE__ */ createFluentIcon("Copy16Regular", "16", ["M5 6H4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1h1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h1zm7-4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2zM8 3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"]);
const Emoji24Regular = /* @__PURE__ */ createFluentIcon("Emoji24Regular", "24", ["M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20m0 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17M8.46 14.78a4.5 4.5 0 0 0 7.07 0 .75.75 0 1 1 1.18.94 6 6 0 0 1-9.43 0 .75.75 0 1 1 1.18-.94M9 8.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5m6 0a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5"]);
const Globe24Regular = /* @__PURE__ */ createFluentIcon("Globe24Regular", "24", ["M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20m2.94 14.5H9.06c.65 2.41 1.79 4 2.94 4s2.29-1.59 2.94-4m-7.43 0H4.79a8.5 8.5 0 0 0 4.09 3.41q-.79-1.25-1.27-3.02zm11.7 0H16.5c-.32 1.33-.79 2.5-1.37 3.41a8.5 8.5 0 0 0 3.9-3.13zM7.1 10H3.74v.02a8.5 8.5 0 0 0 .3 4.98h3.18a20 20 0 0 1-.13-5m8.3 0H8.6a19 19 0 0 0 .14 5h6.52a19 19 0 0 0 .14-5m4.87 0h-3.35a21 21 0 0 1-.13 5h3.18a8.5 8.5 0 0 0 .3-5M8.88 4.09h-.02a8.5 8.5 0 0 0-4.61 4.4l3.05.01c.31-1.75.86-3.28 1.58-4.41m3.12-.6-.12.01c-1.26.12-2.48 2.12-3.05 5h6.34c-.56-2.87-1.78-4.87-3.04-5zm3.12.6.1.17A13 13 0 0 1 16.7 8.5h3.05a8.5 8.5 0 0 0-4.34-4.29z"]);
const PlugConnected24Regular = /* @__PURE__ */ createFluentIcon("PlugConnected24Regular", "24", ["M19.49 5.57a5.97 5.97 0 0 1-1.9 8.96c-.64.35-1.42.14-1.94-.38l-5.8-5.8c-.52-.52-.73-1.3-.38-1.95a6 6 0 0 1 8.96-1.89l2.29-2.29a.75.75 0 1 1 1.06 1.06zm-2.02 7.26a4.5 4.5 0 1 0-6.3-6.3c-.27.35-.19.83.12 1.14l5.04 5.04c.31.3.8.39 1.14.12M3.28 21.78l2.3-2.29a5.97 5.97 0 0 0 8.95-1.9c.35-.64.14-1.42-.38-1.94l-5.8-5.8c-.52-.52-1.3-.73-1.95-.38a6 6 0 0 0-1.89 8.96l-2.29 2.29a.75.75 0 1 0 1.06 1.06m4.39-10.49 5.04 5.04c.3.31.39.8.12 1.14a4.5 4.5 0 1 1-6.3-6.3c.35-.27.83-.19 1.14.12"]);
const Warning24Regular = /* @__PURE__ */ createFluentIcon("Warning24Regular", "24", ["M9.14 3.7a3.25 3.25 0 0 1 5.72 0l6.74 12.5a3.25 3.25 0 0 1-2.86 4.8H5.25a3.25 3.25 0 0 1-2.86-4.8zm4.4.72a1.75 1.75 0 0 0-3.08 0L3.7 16.92a1.75 1.75 0 0 0 1.54 2.58h13.5a1.75 1.75 0 0 0 1.53-2.58zM12 15a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-7.5c.41 0 .75.34.75.75v4.5a.75.75 0 0 1-1.5 0v-4.5c0-.41.34-.75.75-.75"]);
const History16Regular = /* @__PURE__ */ createFluentIcon("History16Regular", "16", ["M8 3a5 5 0 1 1-4.98 5.46.5.5 0 0 0-1 .08 6 6 0 1 0 1.48-4.5V2.5a.5.5 0 1 0-1 0v3c0 .28.22.5.5.5h3a.5.5 0 1 0 0-1H4a5 5 0 0 1 4-2m0 2.5a.5.5 0 1 0-1 0v3c0 .28.22.5.5.5h2a.5.5 0 1 0 0-1H8z"]);
const History24Regular = /* @__PURE__ */ createFluentIcon("History24Regular", "24", ["M12 4.5a7.5 7.5 0 1 1-7.42 6.4c.07-.46-.26-.9-.72-.9-.37 0-.7.26-.76.62Q3 11.3 3 12a9 9 0 1 0 3-6.7V4.24a.75.75 0 0 0-1.5 0v3c0 .41.34.75.75.75h3a.75.75 0 0 0 0-1.5H6.9a7.5 7.5 0 0 1 5.1-2m.5 3.25a.75.75 0 0 0-1.5 0v4.5c0 .41.34.75.75.75h3a.75.75 0 0 0 0-1.5H12.5z"]);
const LocalLanguage24Regular = /* @__PURE__ */ createFluentIcon("LocalLanguage24Regular", "24", ["m9.34 6.37.05.1 5.56 14.5a.75.75 0 0 1-.42.98.73.73 0 0 1-.9-.33l-.05-.1-1.43-3.73h-7.1l-.08-.01-1.55 3.76a.73.73 0 0 1-.96.4.75.75 0 0 1-.43-.88l.03-.1 5.97-14.5a.73.73 0 0 1 1.31-.09M18.74 2c.39 0 .7.29.75.65V7.5h1.76c.38 0 .69.28.74.65v.1c0 .38-.28.7-.64.74l-.1.01H19.5v7.25c0 .38-.29.7-.65.74l-.1.01a.75.75 0 0 1-.75-.65V2.75c0-.41.33-.75.75-.75M8.82 8.75l-3.16 7.54h6.1zM10.75 2h5.5c.38 0 .69.29.74.65v3.1C17 8.1 15.1 10 12.76 10a.75.75 0 0 1 0-1.5 2.75 2.75 0 0 0 2.74-2.58V3.5h-4.74a.75.75 0 0 1-.1-1.49zh5.5z"]);
const LockClosed24Regular = /* @__PURE__ */ createFluentIcon("LockClosed24Regular", "24", ["M12 1a5 5 0 0 1 5 5v2.01c1.68.13 3 1.53 3 3.24v7.5c0 1.8-1.46 3.25-3.25 3.25h-9.5A3.25 3.25 0 0 1 4 18.75v-7.5a3.25 3.25 0 0 1 3-3.24V6a5 5 0 0 1 5-5M7.25 9.5c-.97 0-1.75.78-1.75 1.75v7.5c0 .97.78 1.75 1.75 1.75h9.5c.97 0 1.75-.78 1.75-1.75v-7.5c0-.97-.78-1.75-1.75-1.75zM12 13.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 2.5A3.5 3.5 0 0 0 8.5 6v2h7V6A3.5 3.5 0 0 0 12 2.5"]);
const ArrowDown16Regular = /* @__PURE__ */ createFluentIcon("ArrowDown16Regular", "16", ["M8.5 2.5a.5.5 0 1 0-1 0v9.7L3.87 8.17a.5.5 0 1 0-.74.66l4.5 5a.5.5 0 0 0 .74 0l4.5-5a.5.5 0 0 0-.74-.66L8.5 12.2z"]);
const ArrowDownload24Regular = /* @__PURE__ */ createFluentIcon("ArrowDownload24Regular", "24", ["M18.25 20.5a.75.75 0 1 1 0 1.5h-13a.75.75 0 1 1 0-1.5zm-6.6-18.49h.1c.38 0 .7.28.74.64l.01.1v13.7l3.72-3.73a.75.75 0 0 1 .98-.07l.08.07c.27.27.3.68.07.98l-.07.08-5 5a.75.75 0 0 1-.97.07l-.09-.07-5-5a.75.75 0 0 1 .98-1.13l.08.07L11 16.43V2.76c0-.38.28-.7.65-.75h.1z"]);
const ArrowMove24Regular = /* @__PURE__ */ createFluentIcon("ArrowMove24Regular", "24", ["M15.28 6.03c-.3.3-.77.3-1.06 0l-1.47-1.47v3.69a.75.75 0 0 1-1.5 0V4.56L9.78 6.03a.75.75 0 0 1-1.06-1.06l2.75-2.75a.75.75 0 0 1 1.06 0l2.75 2.75c.3.3.3.77 0 1.06m-9.25 8.19a.75.75 0 1 1-1.06 1.06l-2.75-2.75a.75.75 0 0 1 0-1.06l2.75-2.75a.75.75 0 0 1 1.06 1.06l-1.47 1.47h3.69a.75.75 0 0 1 0 1.5H4.56zm11.94 1.06a.75.75 0 0 1 0-1.06l1.47-1.47h-3.69a.75.75 0 0 1 0-1.5h3.69l-1.47-1.47a.75.75 0 0 1 1.06-1.06l2.75 2.75a.75.75 0 0 1 0 1.06l-2.75 2.75c-.3.3-.77.3-1.06 0m-2.69 2.69a.75.75 0 0 0-1.06 0l-1.47 1.47v-3.69a.75.75 0 0 0-1.5 0v3.69l-1.47-1.47a.75.75 0 0 0-1.06 1.06l2.75 2.75a.75.75 0 0 0 1.06 0l2.75-2.75c.3-.3.3-.77 0-1.06"]);
const ArrowSync24Regular = /* @__PURE__ */ createFluentIcon("ArrowSync24Regular", "24", ["M16.25 5.18c-.25.33-.19.8.14 1.05a7.24 7.24 0 0 1-3.6 12.98l.68-.68a.75.75 0 0 0-.98-1.13l-.08.07-2 2a.75.75 0 0 0-.07.98l.07.08 2 2a.75.75 0 0 0 1.13-.98l-.07-.08-.75-.75A8.75 8.75 0 0 0 17.3 5.04a.75.75 0 0 0-1.05.14m-5.72-3.71c-.3.3-.3.77 0 1.06l.75.75a8.75 8.75 0 0 0-4.85 15.47.75.75 0 1 0 .96-1.16A7.23 7.23 0 0 1 11.2 4.8l-.68.68a.75.75 0 1 0 1.06 1.06l2-2c.3-.3.3-.77 0-1.06l-2-2a.75.75 0 0 0-1.06 0"], { flipInRtl: true });
const ArrowUp16Regular = /* @__PURE__ */ createFluentIcon("ArrowUp16Regular", "16", ["M7.5 13.5a.5.5 0 0 0 1 0V3.8l3.63 4.03a.5.5 0 0 0 .74-.66l-4.5-5a.5.5 0 0 0-.74 0l-4.5 5a.5.5 0 0 0 .74.66L7.5 3.8z"], { flipInRtl: true });
const Send16Regular = /* @__PURE__ */ createFluentIcon("Send16Regular", "16", ["M1.18 1.12a.5.5 0 0 1 .54-.07l13 6.5a.5.5 0 0 1 0 .9l-13 6.5a.5.5 0 0 1-.7-.6L2.98 8 1.02 1.65a.5.5 0 0 1 .16-.53M3.87 8.5l-1.55 5.03L13.38 8 2.32 2.47 3.87 7.5H9.5a.5.5 0 0 1 0 1z"], { flipInRtl: true });
const ShieldKeyhole24Regular = /* @__PURE__ */ createFluentIcon("ShieldKeyhole24Regular", "24", ["M14 11a2 2 0 0 1-1.25 1.85v2.4a.75.75 0 0 1-1.5 0v-2.4A2 2 0 1 1 14 11M3.75 5a.75.75 0 0 0-.75.75V11c0 5 2.96 8.68 8.73 10.95q.27.1.54 0C18.04 19.68 21 16 21 11V5.75a.75.75 0 0 0-.75-.75q-3.99 0-7.8-2.85a.75.75 0 0 0-.9 0Q7.74 5 3.75 5m.75 6V6.48a14.4 14.4 0 0 0 7.5-2.8 14.4 14.4 0 0 0 7.5 2.8V11c0 4.26-2.45 7.38-7.5 9.44-5.05-2.06-7.5-5.18-7.5-9.44"]);
const Chat24Regular = /* @__PURE__ */ createFluentIcon("Chat24Regular", "24", ["M12 2a10 10 0 1 1-4.59 18.89L3.6 21.96a1.25 1.25 0 0 1-1.54-1.54l1.06-3.83A10 10 0 0 1 12 2m0 1.5a8.5 8.5 0 0 0-7.43 12.64l.15.27-1.1 3.98 3.98-1.11.27.15A8.5 8.5 0 1 0 12 3.5M8.75 13h4.5a.75.75 0 0 1 .1 1.5h-4.6a.75.75 0 0 1-.1-1.5zh4.5zm0-3.5h6.5a.75.75 0 0 1 .1 1.5h-6.6a.75.75 0 0 1-.1-1.5zh6.5z"]);
const CheckboxChecked24Regular = /* @__PURE__ */ createFluentIcon("CheckboxChecked24Regular", "24", ["M6.25 3A3.25 3.25 0 0 0 3 6.25v11.5C3 19.55 4.46 21 6.25 21h11.5c1.8 0 3.25-1.46 3.25-3.25V6.25C21 4.45 19.54 3 17.75 3zM4.5 6.25c0-.97.78-1.75 1.75-1.75h11.5c.97 0 1.75.78 1.75 1.75v11.5c0 .97-.78 1.75-1.75 1.75H6.25c-.97 0-1.75-.78-1.75-1.75zm12.78 3.03a.75.75 0 1 0-1.06-1.06L10 14.44l-2.22-2.22a.75.75 0 0 0-1.06 1.06l2.75 2.75c.29.29.76.29 1.06 0z"]);
const Checkmark12Filled = /* @__PURE__ */ createFluentIcon("Checkmark12Filled", "12", ["M9.76 3.2c.3.29.32.76.04 1.06l-4.25 4.5a.75.75 0 0 1-1.08.02L2.22 6.53a.75.75 0 0 1 1.06-1.06l1.7 1.7L8.7 3.24a.75.75 0 0 1 1.06-.04"]);
const Checkmark16Filled = /* @__PURE__ */ createFluentIcon("Checkmark16Filled", "16", ["M14.05 3.49c.28.3.27.77-.04 1.06l-7.93 7.47A.85.85 0 0 1 4.9 12L2.22 9.28a.75.75 0 1 1 1.06-1.06l2.24 2.27 7.47-7.04a.75.75 0 0 1 1.06.04"]);
const Checkmark16Regular = /* @__PURE__ */ createFluentIcon("Checkmark16Regular", "16", ["M13.86 3.66a.5.5 0 0 1-.02.7l-7.93 7.48a.6.6 0 0 1-.84-.02L2.4 9.1a.5.5 0 0 1 .72-.7l2.4 2.44 7.65-7.2a.5.5 0 0 1 .7.02"]);
const Checkmark24Regular = /* @__PURE__ */ createFluentIcon("Checkmark24Regular", "24", ["M4.53 12.97a.75.75 0 0 0-1.06 1.06l4.5 4.5c.3.3.77.3 1.06 0l11-11a.75.75 0 0 0-1.06-1.06L8.5 16.94z"]);
const ChevronDown16Regular = /* @__PURE__ */ createFluentIcon("ChevronDown16Regular", "16", ["M3.15 5.65c.2-.2.5-.2.7 0L8 9.79l4.15-4.14a.5.5 0 0 1 .7.7l-4.5 4.5a.5.5 0 0 1-.7 0l-4.5-4.5a.5.5 0 0 1 0-.7"]);
const ChevronDown20Regular = /* @__PURE__ */ createFluentIcon("ChevronDown20Regular", "20", ["M15.85 7.65c.2.2.2.5 0 .7l-5.46 5.49a.55.55 0 0 1-.78 0L4.15 8.35a.5.5 0 1 1 .7-.7L10 12.8l5.15-5.16c.2-.2.5-.2.7 0"]);
const ChevronUp16Regular = /* @__PURE__ */ createFluentIcon("ChevronUp16Regular", "16", ["M3.15 10.35c.2.2.5.2.7 0L8 6.21l4.15 4.14a.5.5 0 0 0 .7-.7l-4.5-4.5a.5.5 0 0 0-.7 0l-4.5 4.5a.5.5 0 0 0 0 .7"]);
const Timer24Regular = /* @__PURE__ */ createFluentIcon("Timer24Regular", "24", ["M12 5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17m0 1.5a7 7 0 1 0 0 14 7 7 0 0 0 0-14M12 8c.38 0 .7.28.74.65l.01.1v4.5a.75.75 0 0 1-1.5.1v-4.6c0-.41.34-.75.75-.75m7.15-2.89.08.06 1.16.97a.75.75 0 0 1-.88 1.21l-.08-.06-1.16-.96a.75.75 0 0 1 .88-1.22m-4.9-2.61a.75.75 0 0 1 .1 1.5h-4.6a.75.75 0 0 1-.1-1.5h4.6"]);
const Square12Filled = /* @__PURE__ */ createFluentIcon("Square12Filled", "12", ["M2 4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"]);
const Square16Filled = /* @__PURE__ */ createFluentIcon("Square16Filled", "16", ["M2 4.5A2.5 2.5 0 0 1 4.5 2h7A2.5 2.5 0 0 1 14 4.5v7a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 11.5z"]);
const ClipboardPaste24Regular = /* @__PURE__ */ createFluentIcon("ClipboardPaste24Regular", "24", ["M12.75 2c1.16 0 2.11.88 2.24 2h1.76c1.2 0 2.17.93 2.24 2.1l.01.15c0 .38-.28.7-.65.74h-.1a.75.75 0 0 1-.74-.64l-.01-.1c0-.38-.28-.7-.65-.74l-.1-.01h-2.13c-.4.6-1.09 1-1.87 1h-3.5c-.78 0-1.46-.4-1.87-1H5.25c-.38 0-.7.28-.74.65l-.01.1v13.5c0 .38.28.7.65.75h3.1c.38 0 .7.29.74.65l.01.1c0 .42-.34.75-.75.75h-3c-1.2 0-2.17-.92-2.24-2.1L3 19.76V6.25c0-1.2.93-2.17 2.1-2.24L5.25 4h1.76c.13-1.12 1.08-2 2.24-2zm6 6c1.2 0 2.17.93 2.24 2.1l.01.15v9.5c0 1.2-.93 2.17-2.1 2.24l-.15.01h-6.5c-1.2 0-2.17-.93-2.24-2.1l-.01-.15v-9.5c0-1.2.93-2.17 2.1-2.24l.15-.01zm0 1.5h-6.5c-.38 0-.7.28-.74.65l-.01.1v9.5c0 .38.28.7.65.74l.1.01h6.5c.38 0 .7-.28.74-.65l.01-.1v-9.5c0-.38-.28-.7-.65-.74zm-6-6h-3.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 1 0 0-1.5"]);
const Delete16Regular = /* @__PURE__ */ createFluentIcon("Delete16Regular", "16", ["M7 3h2a1 1 0 0 0-2 0M6 3a2 2 0 1 1 4 0h4a.5.5 0 0 1 0 1h-.56l-1.2 8.84A2.5 2.5 0 0 1 9.74 15h-3.5a2.5 2.5 0 0 1-2.48-2.16L2.57 4H2a.5.5 0 0 1 0-1zm1 3.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0zM9.5 6c.28 0 .5.22.5.5v5a.5.5 0 0 1-1 0v-5c0-.28.22-.5.5-.5m-4.74 6.7c.1.75.74 1.3 1.49 1.3h3.5a1.5 1.5 0 0 0 1.5-1.3L12.42 4H3.57z"]);
const Delete24Regular = /* @__PURE__ */ createFluentIcon("Delete24Regular", "24", ["M10 5h4a2 2 0 1 0-4 0M8.5 5a3.5 3.5 0 1 1 7 0h5.75a.75.75 0 0 1 0 1.5h-1.32l-1.17 12.11A3.75 3.75 0 0 1 15.03 22H8.97a3.75 3.75 0 0 1-3.73-3.39L4.07 6.5H2.75a.75.75 0 0 1 0-1.5zm2 4.75a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0zM14.25 9c.41 0 .75.34.75.75v7.5a.75.75 0 0 1-1.5 0v-7.5c0-.41.34-.75.75-.75m-7.52 9.47a2.25 2.25 0 0 0 2.24 2.03h6.06c1.15 0 2.12-.88 2.24-2.03L18.42 6.5H5.58z"]);
const People24Regular = /* @__PURE__ */ createFluentIcon("People24Regular", "24", ["M5.5 8a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8m7.5 5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M17 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6m-2.75 13.04q1.04.44 2.75.46c2.28 0 3.59-.7 4.3-1.56a3 3 0 0 0 .7-1.73v-.03c0-1.2-.97-2.18-2.18-2.18H14.1q.6.63.81 1.5h4.91a.7.7 0 0 1 .68.7l-.04.18q-.05.25-.32.6C19.8 17.42 18.97 18 17 18c-.98 0-1.67-.15-2.17-.34q-.14.62-.58 1.38M4.25 14C3.01 14 2 15 2 16.25v.28l.01.2q.02.21.1.53c.09.42.29.98.68 1.55C3.61 19.97 5.17 21 8 21s4.39-1.03 5.2-2.2a4.5 4.5 0 0 0 .8-2.27v-.28c0-1.24-1-2.25-2.25-2.25zm-.75 2.5v-.25c0-.41.34-.75.75-.75h7.5c.41 0 .75.34.75.75v.34l-.06.33c-.07.28-.2.65-.46 1.02-.5.71-1.56 1.56-3.98 1.56s-3.49-.85-3.98-1.56a3 3 0 0 1-.52-1.43"]);
const PeopleCommunity24Regular = /* @__PURE__ */ createFluentIcon("PeopleCommunity24Regular", "24", ["M12 4.5A1.75 1.75 0 1 0 12 8a1.75 1.75 0 0 0 0-3.5M8.75 6.25a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0M5 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0m15.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M19 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6M7.5 12.75c0-.97.78-1.75 1.75-1.75h5.5c.97 0 1.75.78 1.75 1.75v3.75a4.5 4.5 0 1 1-9 0zm1.75-.25a.25.25 0 0 0-.25.25v3.75a3 3 0 1 0 6 0v-3.75a.25.25 0 0 0-.25-.25zm-2.64-.52q-.1.36-.11.77v.81l-2.81.75a.25.25 0 0 0-.18.31l.71 2.66a3 3 0 0 0 3.16 2.2q.48.75 1.15 1.3a4.5 4.5 0 0 1-5.76-3.12l-.71-2.65c-.25-.94.3-1.9 1.24-2.14zm8.86 8.8.25.07a4.5 4.5 0 0 0 5.5-3.19l.72-2.65c.25-.94-.3-1.9-1.24-2.14l-3.31-.9q.1.38.11.78v.81l2.82.75c.13.04.2.18.17.31l-.7 2.66a3 3 0 0 1-3.17 2.2q-.48.75-1.15 1.3"]);
const Power24Regular = /* @__PURE__ */ createFluentIcon("Power24Regular", "24", ["M8.2 4.82a.75.75 0 0 1 .64 1.36 7.51 7.51 0 1 0 6.34 0 .75.75 0 1 1 .63-1.35 9 9 0 1 1-7.6-.01M12 2.5c.38 0 .7.28.74.64v7.6a.75.75 0 0 1-1.48.1l-.01-.1v-7.5c0-.4.33-.74.75-.74"]);
const ResizeLarge24Regular = /* @__PURE__ */ createFluentIcon("ResizeLarge24Regular", "24", ["M6.25 4.5c-.97 0-1.75.78-1.75 1.75v1.5a.75.75 0 0 1-1.5 0v-1.5C3 4.45 4.46 3 6.25 3h1.5a.75.75 0 0 1 0 1.5zM19.5 6.25c0-.97-.78-1.75-1.75-1.75h-1.5a.75.75 0 0 1 0-1.5h1.5C19.55 3 21 4.46 21 6.25v1.5a.75.75 0 0 1-1.5 0zm0 11.5c0 .97-.78 1.75-1.75 1.75h-1.5a.75.75 0 0 0 0 1.5h1.5c1.8 0 3.25-1.46 3.25-3.25v-1.5a.75.75 0 0 0-1.5 0zm-15 0c0 .97.78 1.75 1.75 1.75h1.5a.75.75 0 0 1 0 1.5h-1.5A3.25 3.25 0 0 1 3 17.75v-1.5a.75.75 0 0 1 1.5 0zM8.25 6C7.01 6 6 7 6 8.25v7.5C6 16.99 7 18 8.25 18h7.5c1.24 0 2.25-1 2.25-2.25v-7.5C18 7.01 17 6 15.75 6zM7.5 8.25c0-.41.34-.75.75-.75h7.5c.41 0 .75.34.75.75v7.5c0 .41-.34.75-.75.75h-7.5a.75.75 0 0 1-.75-.75z"]);
const Dismiss16Regular = /* @__PURE__ */ createFluentIcon("Dismiss16Regular", "16", ["m2.59 2.72.06-.07a.5.5 0 0 1 .63-.06l.07.06L8 7.29l4.65-4.64a.5.5 0 0 1 .7.7L8.71 8l4.64 4.65c.18.17.2.44.06.63l-.06.07a.5.5 0 0 1-.63.06l-.07-.06L8 8.71l-4.65 4.64a.5.5 0 0 1-.7-.7L7.29 8 2.65 3.35a.5.5 0 0 1-.06-.63l.06-.07z"]);
const Dismiss20Regular = /* @__PURE__ */ createFluentIcon("Dismiss20Regular", "20", ["m4.09 4.22.06-.07a.5.5 0 0 1 .63-.06l.07.06L10 9.29l5.15-5.14a.5.5 0 0 1 .63-.06l.07.06c.18.17.2.44.06.63l-.06.07L10.71 10l5.14 5.15c.18.17.2.44.06.63l-.06.07a.5.5 0 0 1-.63.06l-.07-.06L10 10.71l-5.15 5.14a.5.5 0 0 1-.63.06l-.07-.06a.5.5 0 0 1-.06-.63l.06-.07L9.29 10 4.15 4.85a.5.5 0 0 1-.06-.63l.06-.07z"]);
const Dismiss24Regular = /* @__PURE__ */ createFluentIcon("Dismiss24Regular", "24", ["m4.4 4.55.07-.08a.75.75 0 0 1 .98-.07l.08.07L12 10.94l6.47-6.47a.75.75 0 1 1 1.06 1.06L13.06 12l6.47 6.47c.27.27.3.68.07.98l-.07.08a.75.75 0 0 1-.98.07l-.08-.07L12 13.06l-6.47 6.47a.75.75 0 0 1-1.06-1.06L10.94 12 4.47 5.53a.75.75 0 0 1-.07-.98l.07-.08z"]);
const Rocket24Regular = /* @__PURE__ */ createFluentIcon("Rocket24Regular", "24", ["M13.06 7.43a2.5 2.5 0 1 1 3.53 3.54 2.5 2.5 0 0 1-3.53-3.54m2.47 1.06a1 1 0 1 0-1.41 1.42 1 1 0 0 0 1.41-1.42m5.98-4.17a2.8 2.8 0 0 0-1.81-1.8l-.66-.21c-2.4-.75-5-.1-6.78 1.67l-1 1a3.5 3.5 0 0 0-4.56.32L5.45 6.55c-.29.29-.29.76 0 1.06l1.6 1.59-.18.18c-.69.68-.69 1.79 0 2.47l.5.5-1.4.8a.75.75 0 0 0-.16 1.17l3.89 3.9a.75.75 0 0 0 1.18-.16l.8-1.4.5.5c.68.68 1.78.68 2.47 0l.17-.18 1.6 1.6c.29.28.76.28 1.05 0l1.25-1.25a3.5 3.5 0 0 0 .32-4.57l1-1A6.8 6.8 0 0 0 21.72 5zm-2.26-.38q.62.21.83.83l.2.66c.58 1.86.08 3.9-1.3 5.27l-5.4 5.4c-.1.1-.25.1-.35 0l-5.3-5.3a.25.25 0 0 1 0-.36l5.4-5.4a5.3 5.3 0 0 1 5.26-1.3zm-1.29 9.9a2 2 0 0 1-.3 2.43l-.72.71-1.06-1.06zM7.76 6.36a2 2 0 0 1 2.43-.3L8.1 8.14 7.05 7.08zm2.82 9.2-.52.9-2.5-2.5.9-.51zM6.69 18.4a.75.75 0 0 0-1.06-1.06l-2.48 2.48a.75.75 0 0 0 1.06 1.06zm-1.94-3c.29.3.29.77 0 1.06l-1.07 1.06a.75.75 0 0 1-1.06-1.06l1.06-1.06c.3-.3.77-.3 1.07 0m3.88 4.95a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 0 1.06 1.06z"]);
const durations = {
  durationUltraFast: 50,
  durationFaster: 100,
  durationFast: 150,
  durationNormal: 200,
  durationGentle: 250,
  durationSlow: 300,
  durationSlower: 400,
  durationUltraSlow: 500
};
const curves = {
  curveAccelerateMax: "cubic-bezier(0.9,0.1,1,0.2)",
  curveAccelerateMid: "cubic-bezier(1,0,1,1)",
  curveAccelerateMin: "cubic-bezier(0.8,0,0.78,1)",
  curveDecelerateMax: "cubic-bezier(0.1,0.9,0.2,1)",
  curveDecelerateMid: "cubic-bezier(0,0,0,1)",
  curveDecelerateMin: "cubic-bezier(0.33,0,0.1,1)",
  curveEasyEaseMax: "cubic-bezier(0.8,0,0.2,1)",
  curveEasyEase: "cubic-bezier(0.33,0,0.67,1)",
  curveLinear: "cubic-bezier(0,0,1,1)"
};
const motionTokens = {
  ...durations,
  ...curves
};
function isAnimationRunning(animation) {
  if (animation.playState === "running") {
    var _animation_effect;
    if (animation.overallProgress !== void 0) {
      var _animation_overallProgress;
      const overallProgress = (_animation_overallProgress = animation.overallProgress) !== null && _animation_overallProgress !== void 0 ? _animation_overallProgress : 0;
      return overallProgress > 0 && overallProgress < 1;
    }
    var _animation_currentTime;
    const currentTime = Number((_animation_currentTime = animation.currentTime) !== null && _animation_currentTime !== void 0 ? _animation_currentTime : 0);
    var _animation_effect_getTiming_duration;
    const totalTime = Number((_animation_effect_getTiming_duration = (_animation_effect = animation.effect) === null || _animation_effect === void 0 ? void 0 : _animation_effect.getTiming().duration) !== null && _animation_effect_getTiming_duration !== void 0 ? _animation_effect_getTiming_duration : 0);
    return currentTime > 0 && currentTime < totalTime;
  }
  return false;
}
const DEFAULT_ANIMATION_OPTIONS = {
  fill: "forwards"
};
const DEFAULT_REDUCED_MOTION_ATOM = {
  duration: 1
};
function createHandle(animations) {
  return {
    set playbackRate(rate) {
      animations.forEach((animation) => {
        animation.playbackRate = rate;
      });
    },
    setMotionEndCallbacks(onfinish, oncancel) {
      const promises = animations.map((animation) => {
        return new Promise((resolve, reject) => {
          animation.onfinish = () => resolve();
          animation.oncancel = () => reject();
        });
      });
      Promise.all(promises).then(() => {
        onfinish();
      }).catch(() => {
        oncancel();
      });
    },
    isRunning() {
      return animations.some((animation) => isAnimationRunning(animation));
    },
    dispose: () => {
      animations.length = 0;
    },
    cancel: () => {
      animations.forEach((animation) => {
        animation.cancel();
      });
    },
    pause: () => {
      animations.forEach((animation) => {
        animation.pause();
      });
    },
    play: () => {
      animations.forEach((animation) => {
        animation.play();
      });
    },
    finish: () => {
      animations.forEach((animation) => {
        animation.finish();
      });
    },
    reverse: () => {
      animations.forEach((animation) => {
        animation.reverse();
      });
    }
  };
}
function useAnimateAtomsInSupportedEnvironment() {
  var _window_Animation;
  const SUPPORTS_PERSIST = typeof window !== "undefined" && typeof ((_window_Animation = window.Animation) === null || _window_Animation === void 0 ? void 0 : _window_Animation.prototype.persist) === "function";
  return reactExports.useCallback((element, value, options) => {
    const atoms = Array.isArray(value) ? value : [
      value
    ];
    const { isReducedMotion } = options;
    const animations = atoms.map((motion) => {
      const { keyframes: motionKeyframes, reducedMotion = DEFAULT_REDUCED_MOTION_ATOM, ...params } = motion;
      const { keyframes: reducedMotionKeyframes = motionKeyframes, ...reducedMotionParams } = reducedMotion;
      const animationKeyframes = isReducedMotion ? reducedMotionKeyframes : motionKeyframes;
      const animationParams = {
        ...DEFAULT_ANIMATION_OPTIONS,
        ...params,
        // Use reduced motion overrides (e.g. duration, easing) when reduced motion is enabled
        ...isReducedMotion && reducedMotionParams
      };
      try {
        const animation = element.animate(animationKeyframes, animationParams);
        if (SUPPORTS_PERSIST) {
          animation === null || animation === void 0 ? void 0 : animation.persist();
        } else {
          const resultKeyframe = animationKeyframes[animationKeyframes.length - 1];
          var _element_style;
          Object.assign((_element_style = element.style) !== null && _element_style !== void 0 ? _element_style : {}, resultKeyframe);
        }
        return animation;
      } catch (e) {
        return null;
      }
    }).filter((animation) => !!animation);
    return createHandle(animations);
  }, [
    SUPPORTS_PERSIST
  ]);
}
function useAnimateAtoms() {
  return useAnimateAtomsInSupportedEnvironment();
}
function useMotionImperativeRef(imperativeRef) {
  const animationRef = reactExports.useRef(void 0);
  reactExports.useImperativeHandle(imperativeRef, () => ({
    setPlayState: (state) => {
      if (state === "running") {
        var _animationRef_current;
        (_animationRef_current = animationRef.current) === null || _animationRef_current === void 0 ? void 0 : _animationRef_current.play();
      }
      if (state === "paused") {
        var _animationRef_current1;
        (_animationRef_current1 = animationRef.current) === null || _animationRef_current1 === void 0 ? void 0 : _animationRef_current1.pause();
      }
    },
    setPlaybackRate: (rate) => {
      if (animationRef.current) {
        animationRef.current.playbackRate = rate;
      }
    }
  }));
  return animationRef;
}
const REDUCED_MEDIA_QUERY = "screen and (prefers-reduced-motion: reduce)";
function useIsReducedMotion() {
  const { targetDocument } = useFluent();
  var _targetDocument_defaultView;
  const targetWindow = (_targetDocument_defaultView = targetDocument === null || targetDocument === void 0 ? void 0 : targetDocument.defaultView) !== null && _targetDocument_defaultView !== void 0 ? _targetDocument_defaultView : null;
  const queryValue = reactExports.useRef(false);
  const isEnabled = reactExports.useCallback(() => queryValue.current, []);
  useIsomorphicLayoutEffect(() => {
    if (targetWindow === null || typeof targetWindow.matchMedia !== "function") {
      return;
    }
    const queryMatch = targetWindow.matchMedia(REDUCED_MEDIA_QUERY);
    if (queryMatch.matches) {
      queryValue.current = true;
    }
    const matchListener = (e) => {
      queryValue.current = e.matches;
    };
    queryMatch.addEventListener("change", matchListener);
    return () => {
      queryMatch.removeEventListener("change", matchListener);
    };
  }, [
    targetWindow
  ]);
  return isEnabled;
}
const CHILD_ERROR_MESSAGE = [
  "@fluentui/react-motion: Invalid child element.",
  "\n",
  "Motion factories require a single child element to be passed. ",
  "That element element should support ref forwarding i.e. it should be either an intrinsic element (e.g. div) or a component that uses React.forwardRef()."
].join("");
function useChildElement(children, mounted = true) {
  const childRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
  }, [
    mounted
  ]);
  try {
    const child = reactExports.Children.only(children);
    if (reactExports.isValidElement(child)) {
      return [
        reactExports.cloneElement(child, {
          ref: useMergedRefs(childRef, getReactElementRef(child))
        }),
        childRef
      ];
    }
  } catch {
  }
  throw new Error(CHILD_ERROR_MESSAGE);
}
const MotionBehaviourContext = reactExports.createContext(void 0);
MotionBehaviourContext.Provider;
const useMotionBehaviourContext = () => {
  var _React_useContext;
  return (_React_useContext = reactExports.useContext(MotionBehaviourContext)) !== null && _React_useContext !== void 0 ? _React_useContext : "default";
};
const MOTION_DEFINITION = /* @__PURE__ */ Symbol("MOTION_DEFINITION");
function createMotionComponent(value) {
  const Atom = (props) => {
    const { children, imperativeRef, onMotionFinish: onMotionFinishProp, onMotionStart: onMotionStartProp, onMotionCancel: onMotionCancelProp, replayKey, ..._rest } = props;
    const params = _rest;
    const [child, childRef] = useChildElement(children);
    const handleRef = useMotionImperativeRef(imperativeRef);
    const isInitialRender = reactExports.useRef(true);
    const skipMotions = useMotionBehaviourContext() === "skip";
    const optionsRef = reactExports.useRef({
      skipMotions,
      params
    });
    const animateAtoms = useAnimateAtoms();
    const isReducedMotion = useIsReducedMotion();
    const onMotionStart = useEventCallback(() => {
      onMotionStartProp === null || onMotionStartProp === void 0 ? void 0 : onMotionStartProp(null);
    });
    const onMotionFinish = useEventCallback(() => {
      onMotionFinishProp === null || onMotionFinishProp === void 0 ? void 0 : onMotionFinishProp(null);
    });
    const onMotionCancel = useEventCallback(() => {
      onMotionCancelProp === null || onMotionCancelProp === void 0 ? void 0 : onMotionCancelProp(null);
    });
    const activateAnimationHandle = reactExports.useCallback((handle) => {
      onMotionStart();
      handle.setMotionEndCallbacks(onMotionFinish, onMotionCancel);
      if (optionsRef.current.skipMotions) {
        handle.finish();
      }
    }, [
      onMotionStart,
      onMotionFinish,
      onMotionCancel
    ]);
    useIsomorphicLayoutEffect(() => {
      optionsRef.current = {
        skipMotions,
        params
      };
    });
    useIsomorphicLayoutEffect(() => {
      const element = childRef.current;
      if (element) {
        const atoms = typeof value === "function" ? value({
          element,
          ...optionsRef.current.params
        }) : value;
        const handle = animateAtoms(element, atoms, {
          isReducedMotion: isReducedMotion()
        });
        handleRef.current = handle;
        activateAnimationHandle(handle);
        return () => {
          handle.cancel();
        };
      }
    }, [
      animateAtoms,
      childRef,
      handleRef,
      isReducedMotion,
      activateAnimationHandle
    ]);
    useIsomorphicLayoutEffect(() => {
      if (isInitialRender.current) {
        return;
      }
      const handle = handleRef.current;
      if (handle) {
        handle.cancel();
        handle.play();
        activateAnimationHandle(handle);
      }
    }, [
      replayKey
    ]);
    useIsomorphicLayoutEffect(() => {
      isInitialRender.current = false;
      return () => {
        isInitialRender.current = true;
      };
    }, []);
    return child;
  };
  return Object.assign(Atom, {
    // Heads up!
    // Always normalize it to a function to simplify types
    [MOTION_DEFINITION]: typeof value === "function" ? value : () => value
  });
}
function motionSlot(motion, options) {
  const { as, children, ...rest } = motion !== null && motion !== void 0 ? motion : {};
  if (motion === null) {
    const renderFn = (_, props) => /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, props.children);
    return {
      [SLOT_RENDER_FUNCTION_SYMBOL]: renderFn,
      [SLOT_ELEMENT_TYPE_SYMBOL]: options.elementType
    };
  }
  const propsWithMetadata = {
    ...options.defaultProps,
    ...rest,
    [SLOT_ELEMENT_TYPE_SYMBOL]: options.elementType
  };
  if (typeof children === "function") {
    propsWithMetadata[SLOT_RENDER_FUNCTION_SYMBOL] = children;
  }
  return propsWithMetadata;
}
const renderButton_unstable = (state) => {
  const { iconOnly, iconPosition } = state;
  return /* @__PURE__ */ jsxs(state.root, {
    children: [
      iconPosition !== "after" && state.icon && /* @__PURE__ */ jsx(state.icon, {}),
      !iconOnly && state.root.children,
      iconPosition === "after" && state.icon && /* @__PURE__ */ jsx(state.icon, {})
    ]
  });
};
const buttonContext = reactExports.createContext(void 0);
const buttonContextDefaultValue = {};
buttonContext.Provider;
const useButtonContext = () => {
  var _React_useContext;
  return (_React_useContext = reactExports.useContext(buttonContext)) !== null && _React_useContext !== void 0 ? _React_useContext : buttonContextDefaultValue;
};
const useButton_unstable = (props, ref) => {
  const { size: contextSize } = useButtonContext();
  const { appearance = "secondary", shape = "rounded", size = contextSize !== null && contextSize !== void 0 ? contextSize : "medium", ...buttonProps } = props;
  const state = useButtonBase_unstable(buttonProps, ref);
  return {
    appearance,
    shape,
    size,
    ...state
  };
};
const useButtonBase_unstable = (props, ref) => {
  var _props_disabled, _props_disabledFocusable;
  const { icon, iconPosition = "before", ...buttonProps } = props;
  const iconShorthand = optional(icon, {
    elementType: "span"
  });
  return {
    disabled: (_props_disabled = props.disabled) !== null && _props_disabled !== void 0 ? _props_disabled : false,
    disabledFocusable: (_props_disabledFocusable = props.disabledFocusable) !== null && _props_disabledFocusable !== void 0 ? _props_disabledFocusable : false,
    iconPosition,
    iconOnly: Boolean((iconShorthand === null || iconShorthand === void 0 ? void 0 : iconShorthand.children) && !props.children),
    components: {
      root: "button",
      icon: "span"
    },
    root: always(useARIAButtonProps(buttonProps.as, buttonProps), {
      elementType: "button",
      defaultProps: {
        ref,
        type: props.as !== "a" ? "button" : void 0
      }
    }),
    icon: iconShorthand
  };
};
const buttonClassNames = {
  root: "fui-Button",
  icon: "fui-Button__icon"
};
const useRootBaseClassName$2 = /* @__PURE__ */ __resetStyles("r1f29ykk", null, {
  r: [".r1f29ykk{align-items:center;box-sizing:border-box;display:inline-flex;justify-content:center;text-decoration-line:none;vertical-align:middle;margin:0;overflow:hidden;background-color:var(--colorNeutralBackground1);color:var(--colorNeutralForeground1);border:var(--strokeWidthThin) solid var(--colorNeutralStroke1);font-family:var(--fontFamilyBase);outline-style:none;padding:5px var(--spacingHorizontalM);min-width:96px;border-radius:var(--borderRadiusMedium);font-size:var(--fontSizeBase300);font-weight:var(--fontWeightSemibold);line-height:var(--lineHeightBase300);transition-duration:var(--durationFaster);transition-property:background,border,color;transition-timing-function:var(--curveEasyEase);}", ".r1f29ykk:hover{background-color:var(--colorNeutralBackground1Hover);border-color:var(--colorNeutralStroke1Hover);color:var(--colorNeutralForeground1Hover);cursor:pointer;}", ".r1f29ykk:hover:active,.r1f29ykk:active:focus-visible{background-color:var(--colorNeutralBackground1Pressed);border-color:var(--colorNeutralStroke1Pressed);color:var(--colorNeutralForeground1Pressed);outline-style:none;}", ".r1f29ykk[data-fui-focus-visible]{border-color:var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);border-width:1px;outline:var(--strokeWidthThick) solid var(--colorTransparentStroke);box-shadow:0 0 0 var(--strokeWidthThin) var(--colorStrokeFocus2) inset;z-index:1;}"],
  s: ["@media screen and (prefers-reduced-motion: reduce){.r1f29ykk{transition-duration:0.01ms;}}", "@media (forced-colors: active){.r1f29ykk:focus{border-color:ButtonText;}.r1f29ykk:hover{background-color:HighlightText;border-color:Highlight;color:Highlight;forced-color-adjust:none;}.r1f29ykk:hover:active,.r1f29ykk:active:focus-visible{background-color:HighlightText;border-color:Highlight;color:Highlight;forced-color-adjust:none;}}", "@supports (-moz-appearance:button){.r1f29ykk[data-fui-focus-visible]{box-shadow:0 0 0 calc(var(--strokeWidthThin) + 0.25px) var(--colorStrokeFocus2) inset;}}"]
});
const useIconBaseClassName = /* @__PURE__ */ __resetStyles("rywnvv2", null, [".rywnvv2{align-items:center;display:inline-flex;justify-content:center;font-size:20px;height:20px;width:20px;--fui-Button__icon--spacing:var(--spacingHorizontalSNudge);}"]);
const useRootStyles$4 = /* @__PURE__ */ __styles({
  outline: {
    De3pzq: "f1c21dwh",
    Jwef8y: "fjxutwb",
    Bpjbzib: "fkoldzo"
  },
  primary: {
    De3pzq: "ffp7eso",
    g2u3we: "f1p3nwhy",
    h3c5rm: ["f11589ue", "f1pdflbu"],
    B9xav0g: "f1q5o8ev",
    zhjwy3: ["f1pdflbu", "f11589ue"],
    sj55zd: "f1phragk",
    Jwef8y: "f15wkkf3",
    Bgoe8wy: "f1s2uweq",
    Bwzppfd: ["fr80ssc", "fecsdlb"],
    oetu4i: "f1ukrpxl",
    gg5e9n: ["fecsdlb", "fr80ssc"],
    Bi91k9c: "f1rq72xc",
    Bpjbzib: "f1ksv2xa",
    im15vp: "fhvnf4x",
    Hjvxdg: ["fb6swo4", "f232fm2"],
    Gpfmf1: "f1klyf7k",
    ustxxc: ["f232fm2", "fb6swo4"],
    Brsut9c: "f1d6mv4x",
    By8wz76: "f1nz3ub2",
    Bcq6wej: "fag2qd2",
    Jcjdmf: ["fmvhcg7", "f14bpyus"],
    sc4o1m: "f1o3dhpw",
    Bosien3: ["f14bpyus", "fmvhcg7"],
    B7iucu3: "fqc85l4",
    B8gzw0y: "f1h3a8gf",
    Bbkh6qg: "fkiggi6",
    F230oe: "f8gmj8i",
    Bdw8ktp: ["f1ap8nzx", "fjag8bx"],
    Bj1xduy: "f1igan7k",
    Bhh2cfd: ["fjag8bx", "f1ap8nzx"],
    Bahaeuw: "f1v3eptx",
    Bv2bamp: "f1ysmecq",
    vxuvv6: "faulsx",
    Bli9q98: ["f79t15f", "f8qmx7k"],
    Bx2tt8t: "fbtzoaq",
    yad0b3: ["f8qmx7k", "f79t15f"],
    j2fop7: "fd4bjan"
  },
  secondary: {},
  subtle: {
    De3pzq: "fhovq9v",
    g2u3we: "f1p3nwhy",
    h3c5rm: ["f11589ue", "f1pdflbu"],
    B9xav0g: "f1q5o8ev",
    zhjwy3: ["f1pdflbu", "f11589ue"],
    sj55zd: "fkfq4zb",
    Jwef8y: "f1t94bn6",
    Bgoe8wy: "f1s2uweq",
    Bwzppfd: ["fr80ssc", "fecsdlb"],
    oetu4i: "f1ukrpxl",
    gg5e9n: ["fecsdlb", "fr80ssc"],
    Bi91k9c: "fnwyq0v",
    Bk3fhr4: "ft1hn21",
    Bmfj8id: "fuxngvv",
    Bbdnnc7: "fy5bs14",
    Bpjbzib: "f1q1yqic",
    im15vp: "fhvnf4x",
    Hjvxdg: ["fb6swo4", "f232fm2"],
    Gpfmf1: "f1klyf7k",
    ustxxc: ["f232fm2", "fb6swo4"],
    Brsut9c: "fwga7ee",
    Bqou3pl: "f1nhwcv0",
    Bsnehw8: "f1gm6xmp",
    wsxvnf: "f1xxsver",
    Bahaeuw: "f1v3eptx",
    Buhizc3: "fivsta0",
    j2fop7: "fd4bjan",
    Bqabnb4: "f3m6zum"
  },
  transparent: {
    De3pzq: "f1c21dwh",
    g2u3we: "f1p3nwhy",
    h3c5rm: ["f11589ue", "f1pdflbu"],
    B9xav0g: "f1q5o8ev",
    zhjwy3: ["f1pdflbu", "f11589ue"],
    sj55zd: "fkfq4zb",
    Jwef8y: "fjxutwb",
    Bgoe8wy: "f1s2uweq",
    Bwzppfd: ["fr80ssc", "fecsdlb"],
    oetu4i: "f1ukrpxl",
    gg5e9n: ["fecsdlb", "fr80ssc"],
    Bi91k9c: "f139oj5f",
    Bk3fhr4: "ft1hn21",
    Bmfj8id: "fuxngvv",
    Bpjbzib: "fkoldzo",
    im15vp: "fhvnf4x",
    Hjvxdg: ["fb6swo4", "f232fm2"],
    Gpfmf1: "f1klyf7k",
    ustxxc: ["f232fm2", "fb6swo4"],
    Brsut9c: "f1l983o9",
    Bqou3pl: "f1nhwcv0",
    Bsnehw8: "f1gm6xmp",
    Bbkh6qg: "fxoo9op",
    Bahaeuw: "f1v3eptx",
    Bv2bamp: "f1i0gk12",
    j2fop7: "fd4bjan"
  },
  circular: {
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "f44lkw9"
  },
  rounded: {},
  square: {
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "f1fabniw"
  },
  small: {
    Bf4jedk: "fh7ncta",
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: "fneth5b",
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "ft85np5",
    Be2twd7: "fy9rknc",
    Bhrd7zp: "figsok6",
    Bg96gwp: "fwrc4pm"
  },
  smallWithIcon: {
    Byoj8tv: "f1brlhvm",
    z8tnut: "f1sl3k7w"
  },
  medium: {},
  large: {
    Bf4jedk: "f14es27b",
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: "f4db1ww",
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "ft85np5",
    Be2twd7: "fod5ikn",
    Bhrd7zp: "fl43uef",
    Bg96gwp: "faaz57k"
  },
  largeWithIcon: {
    Byoj8tv: "fy7v416",
    z8tnut: "f1a1bwwz"
  }
}, {
  d: [".f1c21dwh{background-color:var(--colorTransparentBackground);}", ".ffp7eso{background-color:var(--colorBrandBackground);}", ".f1p3nwhy{border-top-color:transparent;}", ".f11589ue{border-right-color:transparent;}", ".f1pdflbu{border-left-color:transparent;}", ".f1q5o8ev{border-bottom-color:transparent;}", ".f1phragk{color:var(--colorNeutralForegroundOnBrand);}", ".fhovq9v{background-color:var(--colorSubtleBackground);}", ".fkfq4zb{color:var(--colorNeutralForeground2);}", [".f44lkw9{border-radius:var(--borderRadiusCircular);}", {
    p: -1
  }], [".f1fabniw{border-radius:var(--borderRadiusNone);}", {
    p: -1
  }], ".fh7ncta{min-width:64px;}", [".fneth5b{padding:3px var(--spacingHorizontalS);}", {
    p: -1
  }], [".ft85np5{border-radius:var(--borderRadiusMedium);}", {
    p: -1
  }], ".fy9rknc{font-size:var(--fontSizeBase200);}", ".figsok6{font-weight:var(--fontWeightRegular);}", ".fwrc4pm{line-height:var(--lineHeightBase200);}", ".f1brlhvm{padding-bottom:1px;}", ".f1sl3k7w{padding-top:1px;}", ".f14es27b{min-width:96px;}", [".f4db1ww{padding:8px var(--spacingHorizontalL);}", {
    p: -1
  }], [".ft85np5{border-radius:var(--borderRadiusMedium);}", {
    p: -1
  }], ".fod5ikn{font-size:var(--fontSizeBase400);}", ".fl43uef{font-weight:var(--fontWeightSemibold);}", ".faaz57k{line-height:var(--lineHeightBase400);}", ".fy7v416{padding-bottom:7px;}", ".f1a1bwwz{padding-top:7px;}"],
  h: [".fjxutwb:hover{background-color:var(--colorTransparentBackgroundHover);}", ".fkoldzo:hover:active,.fkoldzo:active:focus-visible{background-color:var(--colorTransparentBackgroundPressed);}", ".f15wkkf3:hover{background-color:var(--colorBrandBackgroundHover);}", ".f1s2uweq:hover{border-top-color:transparent;}", ".fr80ssc:hover{border-right-color:transparent;}", ".fecsdlb:hover{border-left-color:transparent;}", ".f1ukrpxl:hover{border-bottom-color:transparent;}", ".f1rq72xc:hover{color:var(--colorNeutralForegroundOnBrand);}", ".f1ksv2xa:hover:active,.f1ksv2xa:active:focus-visible{background-color:var(--colorBrandBackgroundPressed);}", ".fhvnf4x:hover:active,.fhvnf4x:active:focus-visible{border-top-color:transparent;}", ".fb6swo4:hover:active,.fb6swo4:active:focus-visible{border-right-color:transparent;}", ".f232fm2:hover:active,.f232fm2:active:focus-visible{border-left-color:transparent;}", ".f1klyf7k:hover:active,.f1klyf7k:active:focus-visible{border-bottom-color:transparent;}", ".f1d6mv4x:hover:active,.f1d6mv4x:active:focus-visible{color:var(--colorNeutralForegroundOnBrand);}", ".f1t94bn6:hover{background-color:var(--colorSubtleBackgroundHover);}", ".fnwyq0v:hover{color:var(--colorNeutralForeground2Hover);}", ".ft1hn21:hover .fui-Icon-filled{display:inline;}", ".fuxngvv:hover .fui-Icon-regular{display:none;}", ".fy5bs14:hover .fui-Button__icon{color:var(--colorNeutralForeground2BrandHover);}", ".f1q1yqic:hover:active,.f1q1yqic:active:focus-visible{background-color:var(--colorSubtleBackgroundPressed);}", ".fwga7ee:hover:active,.fwga7ee:active:focus-visible{color:var(--colorNeutralForeground2Pressed);}", ".f1nhwcv0:hover:active .fui-Icon-filled,.f1nhwcv0:active:focus-visible .fui-Icon-filled{display:inline;}", ".f1gm6xmp:hover:active .fui-Icon-regular,.f1gm6xmp:active:focus-visible .fui-Icon-regular{display:none;}", ".f1xxsver:hover:active .fui-Button__icon,.f1xxsver:active:focus-visible .fui-Button__icon{color:var(--colorNeutralForeground2BrandPressed);}", ".f139oj5f:hover{color:var(--colorNeutralForeground2BrandHover);}", ".f1l983o9:hover:active,.f1l983o9:active:focus-visible{color:var(--colorNeutralForeground2BrandPressed);}"],
  m: [["@media (forced-colors: active){.f1nz3ub2{background-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fag2qd2{border-top-color:HighlightText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f14bpyus{border-left-color:HighlightText;}.fmvhcg7{border-right-color:HighlightText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1o3dhpw{border-bottom-color:HighlightText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fqc85l4{color:HighlightText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1h3a8gf{forced-color-adjust:none;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fkiggi6:hover{background-color:HighlightText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f8gmj8i:hover{border-top-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1ap8nzx:hover{border-right-color:Highlight;}.fjag8bx:hover{border-left-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1igan7k:hover{border-bottom-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1v3eptx:hover{color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1ysmecq:hover:active,.f1ysmecq:active:focus-visible{background-color:HighlightText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.faulsx:hover:active,.faulsx:active:focus-visible{border-top-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f79t15f:hover:active,.f79t15f:active:focus-visible{border-right-color:Highlight;}.f8qmx7k:hover:active,.f8qmx7k:active:focus-visible{border-left-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fbtzoaq:hover:active,.fbtzoaq:active:focus-visible{border-bottom-color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fd4bjan:hover:active,.fd4bjan:active:focus-visible{color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fivsta0:hover .fui-Button__icon{color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f3m6zum:hover:active .fui-Button__icon,.f3m6zum:active:focus-visible .fui-Button__icon{color:Highlight;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fxoo9op:hover{background-color:var(--colorTransparentBackground);}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1i0gk12:hover:active,.f1i0gk12:active:focus-visible{background-color:var(--colorTransparentBackground);}}", {
    m: "(forced-colors: active)"
  }]]
});
const useRootDisabledStyles = /* @__PURE__ */ __styles({
  base: {
    De3pzq: "f1bg9a2p",
    g2u3we: "f1jj8ep1",
    h3c5rm: ["f15xbau", "fy0fskl"],
    B9xav0g: "f4ikngz",
    zhjwy3: ["fy0fskl", "f15xbau"],
    sj55zd: "f1s2aq7o",
    Bceei9c: "fdrzuqr",
    Bfinmwp: "f15x8b5r",
    Jwef8y: "f1falr9n",
    Bgoe8wy: "f12mpcsy",
    Bwzppfd: ["f1gwvigk", "f18rmfxp"],
    oetu4i: "f1jnshp0",
    gg5e9n: ["f18rmfxp", "f1gwvigk"],
    Bi91k9c: "fvgxktp",
    eoavqd: "fphbwmw",
    Bk3fhr4: "f19vpps7",
    Bmfj8id: "fv5swzo",
    Bbdnnc7: "f1al02dq",
    Bpjbzib: "f1jct5ie",
    im15vp: "f13txml0",
    Hjvxdg: ["f1ncddno", "f1axfvow"],
    Gpfmf1: "f1z04ada",
    ustxxc: ["f1axfvow", "f1ncddno"],
    Brsut9c: "f1uhomfy",
    Bses4qk: "fy9mucy",
    Bqou3pl: "f1g9va8i",
    Bsnehw8: "fwgvudy",
    wsxvnf: "fom6jww"
  },
  highContrast: {
    By8wz76: "f14ptb23",
    Bcq6wej: "f9dbb4x",
    Jcjdmf: ["f3qs60o", "f5u9ap2"],
    sc4o1m: "fwd1oij",
    Bosien3: ["f5u9ap2", "f3qs60o"],
    B7iucu3: "f1cyfu5x",
    Grqk0h: "f127ot8j",
    h3ptyc: "f19etb0b",
    Buw724y: ["f4f984j", "fw441p0"],
    Buk7464: "f3d22hf",
    Hwei09: ["fw441p0", "f4f984j"],
    Bbkh6qg: "fj8k9ua",
    F230oe: "fifrq0d",
    Bdw8ktp: ["f196mwp7", "fnekfq"],
    Bj1xduy: "f1l6uprw",
    Bhh2cfd: ["fnekfq", "f196mwp7"],
    Bahaeuw: "fa9u7a5",
    Buhizc3: "f1m71e0y",
    Bv2bamp: "fw24f3",
    vxuvv6: "f1nznrny",
    Bli9q98: ["fq8nxuu", "f1ao3jkc"],
    Bx2tt8t: "ftoixeo",
    yad0b3: ["f1ao3jkc", "fq8nxuu"],
    j2fop7: "fpmuzpx",
    Bqabnb4: "f168odog"
  },
  outline: {
    De3pzq: "f1c21dwh",
    Jwef8y: "f9ql6rf",
    Bpjbzib: "f9r0db0"
  },
  primary: {
    g2u3we: "f1p3nwhy",
    h3c5rm: ["f11589ue", "f1pdflbu"],
    B9xav0g: "f1q5o8ev",
    zhjwy3: ["f1pdflbu", "f11589ue"],
    Bgoe8wy: "f1s2uweq",
    Bwzppfd: ["fr80ssc", "fecsdlb"],
    oetu4i: "f1ukrpxl",
    gg5e9n: ["fecsdlb", "fr80ssc"],
    im15vp: "fhvnf4x",
    Hjvxdg: ["fb6swo4", "f232fm2"],
    Gpfmf1: "f1klyf7k",
    ustxxc: ["f232fm2", "fb6swo4"]
  },
  secondary: {},
  subtle: {
    De3pzq: "f1c21dwh",
    g2u3we: "f1p3nwhy",
    h3c5rm: ["f11589ue", "f1pdflbu"],
    B9xav0g: "f1q5o8ev",
    zhjwy3: ["f1pdflbu", "f11589ue"],
    Jwef8y: "f9ql6rf",
    Bgoe8wy: "f1s2uweq",
    Bwzppfd: ["fr80ssc", "fecsdlb"],
    oetu4i: "f1ukrpxl",
    gg5e9n: ["fecsdlb", "fr80ssc"],
    Bpjbzib: "f9r0db0",
    im15vp: "fhvnf4x",
    Hjvxdg: ["fb6swo4", "f232fm2"],
    Gpfmf1: "f1klyf7k",
    ustxxc: ["f232fm2", "fb6swo4"]
  },
  transparent: {
    De3pzq: "f1c21dwh",
    g2u3we: "f1p3nwhy",
    h3c5rm: ["f11589ue", "f1pdflbu"],
    B9xav0g: "f1q5o8ev",
    zhjwy3: ["f1pdflbu", "f11589ue"],
    Jwef8y: "f9ql6rf",
    Bgoe8wy: "f1s2uweq",
    Bwzppfd: ["fr80ssc", "fecsdlb"],
    oetu4i: "f1ukrpxl",
    gg5e9n: ["fecsdlb", "fr80ssc"],
    Bpjbzib: "f9r0db0",
    im15vp: "fhvnf4x",
    Hjvxdg: ["fb6swo4", "f232fm2"],
    Gpfmf1: "f1klyf7k",
    ustxxc: ["f232fm2", "fb6swo4"]
  }
}, {
  d: [".f1bg9a2p{background-color:var(--colorNeutralBackgroundDisabled);}", ".f1jj8ep1{border-top-color:var(--colorNeutralStrokeDisabled);}", ".f15xbau{border-right-color:var(--colorNeutralStrokeDisabled);}", ".fy0fskl{border-left-color:var(--colorNeutralStrokeDisabled);}", ".f4ikngz{border-bottom-color:var(--colorNeutralStrokeDisabled);}", ".f1s2aq7o{color:var(--colorNeutralForegroundDisabled);}", ".fdrzuqr{cursor:not-allowed;}", ".f15x8b5r .fui-Button__icon{color:var(--colorNeutralForegroundDisabled);}", ".f1c21dwh{background-color:var(--colorTransparentBackground);}", ".f1p3nwhy{border-top-color:transparent;}", ".f11589ue{border-right-color:transparent;}", ".f1pdflbu{border-left-color:transparent;}", ".f1q5o8ev{border-bottom-color:transparent;}"],
  h: [".f1falr9n:hover{background-color:var(--colorNeutralBackgroundDisabled);}", ".f12mpcsy:hover{border-top-color:var(--colorNeutralStrokeDisabled);}", ".f1gwvigk:hover{border-right-color:var(--colorNeutralStrokeDisabled);}", ".f18rmfxp:hover{border-left-color:var(--colorNeutralStrokeDisabled);}", ".f1jnshp0:hover{border-bottom-color:var(--colorNeutralStrokeDisabled);}", ".fvgxktp:hover{color:var(--colorNeutralForegroundDisabled);}", ".fphbwmw:hover{cursor:not-allowed;}", ".f19vpps7:hover .fui-Icon-filled{display:none;}", ".fv5swzo:hover .fui-Icon-regular{display:inline;}", ".f1al02dq:hover .fui-Button__icon{color:var(--colorNeutralForegroundDisabled);}", ".f1jct5ie:hover:active,.f1jct5ie:active:focus-visible{background-color:var(--colorNeutralBackgroundDisabled);}", ".f13txml0:hover:active,.f13txml0:active:focus-visible{border-top-color:var(--colorNeutralStrokeDisabled);}", ".f1ncddno:hover:active,.f1ncddno:active:focus-visible{border-right-color:var(--colorNeutralStrokeDisabled);}", ".f1axfvow:hover:active,.f1axfvow:active:focus-visible{border-left-color:var(--colorNeutralStrokeDisabled);}", ".f1z04ada:hover:active,.f1z04ada:active:focus-visible{border-bottom-color:var(--colorNeutralStrokeDisabled);}", ".f1uhomfy:hover:active,.f1uhomfy:active:focus-visible{color:var(--colorNeutralForegroundDisabled);}", ".fy9mucy:hover:active,.fy9mucy:active:focus-visible{cursor:not-allowed;}", ".f1g9va8i:hover:active .fui-Icon-filled,.f1g9va8i:active:focus-visible .fui-Icon-filled{display:none;}", ".fwgvudy:hover:active .fui-Icon-regular,.fwgvudy:active:focus-visible .fui-Icon-regular{display:inline;}", ".fom6jww:hover:active .fui-Button__icon,.fom6jww:active:focus-visible .fui-Button__icon{color:var(--colorNeutralForegroundDisabled);}", ".f9ql6rf:hover{background-color:var(--colorTransparentBackground);}", ".f9r0db0:hover:active,.f9r0db0:active:focus-visible{background-color:var(--colorTransparentBackground);}", ".f1s2uweq:hover{border-top-color:transparent;}", ".fr80ssc:hover{border-right-color:transparent;}", ".fecsdlb:hover{border-left-color:transparent;}", ".f1ukrpxl:hover{border-bottom-color:transparent;}", ".fhvnf4x:hover:active,.fhvnf4x:active:focus-visible{border-top-color:transparent;}", ".fb6swo4:hover:active,.fb6swo4:active:focus-visible{border-right-color:transparent;}", ".f232fm2:hover:active,.f232fm2:active:focus-visible{border-left-color:transparent;}", ".f1klyf7k:hover:active,.f1klyf7k:active:focus-visible{border-bottom-color:transparent;}"],
  m: [["@media (forced-colors: active){.f14ptb23{background-color:ButtonFace;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f9dbb4x{border-top-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f3qs60o{border-right-color:GrayText;}.f5u9ap2{border-left-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fwd1oij{border-bottom-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1cyfu5x{color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f127ot8j .fui-Button__icon{color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f19etb0b:focus{border-top-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f4f984j:focus{border-right-color:GrayText;}.fw441p0:focus{border-left-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f3d22hf:focus{border-bottom-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fj8k9ua:hover{background-color:ButtonFace;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fifrq0d:hover{border-top-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f196mwp7:hover{border-right-color:GrayText;}.fnekfq:hover{border-left-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1l6uprw:hover{border-bottom-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fa9u7a5:hover{color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1m71e0y:hover .fui-Button__icon{color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fw24f3:hover:active,.fw24f3:active:focus-visible{background-color:ButtonFace;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1nznrny:hover:active,.f1nznrny:active:focus-visible{border-top-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1ao3jkc:hover:active,.f1ao3jkc:active:focus-visible{border-left-color:GrayText;}.fq8nxuu:hover:active,.fq8nxuu:active:focus-visible{border-right-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.ftoixeo:hover:active,.ftoixeo:active:focus-visible{border-bottom-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fpmuzpx:hover:active,.fpmuzpx:active:focus-visible{color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f168odog:hover:active .fui-Button__icon,.f168odog:active:focus-visible .fui-Button__icon{color:GrayText;}}", {
    m: "(forced-colors: active)"
  }]]
});
const useRootFocusStyles = /* @__PURE__ */ __styles({
  circular: {
    Bw81rd7: 0,
    kdpuga: 0,
    dm238s: 0,
    B6xbmo0: 0,
    B3whbx2: "f1062rbf"
  },
  rounded: {},
  square: {
    Bw81rd7: 0,
    kdpuga: 0,
    dm238s: 0,
    B6xbmo0: 0,
    B3whbx2: "fj0ryk1"
  },
  primary: {
    B8q5s1w: "f17t0x8g",
    Bci5o5g: ["f194v5ow", "fk7jm04"],
    n8qw10: "f1qgg65p",
    Bdrgwmp: ["fk7jm04", "f194v5ow"],
    j6ew2k: ["fhgccpy", "fjo7pq6"],
    he4mth: "f32wu9k",
    Byr4aka: "fu5nqqq",
    lks7q5: ["f13prjl2", "f1nl83rv"],
    Bnan3qt: "f1czftr5",
    k1dn9: ["f1nl83rv", "f13prjl2"],
    Bqsb82s: ["fixhny3", "f18mfu3r"],
    jg1oma: "feygou5"
  },
  small: {
    Bw81rd7: 0,
    kdpuga: 0,
    dm238s: 0,
    B6xbmo0: 0,
    B3whbx2: "fazmxh"
  },
  medium: {},
  large: {
    Bw81rd7: 0,
    kdpuga: 0,
    dm238s: 0,
    B6xbmo0: 0,
    B3whbx2: "f1b6alqh"
  }
}, {
  d: [[".f1062rbf[data-fui-focus-visible]{border-radius:var(--borderRadiusCircular);}", {
    p: -1
  }], [".fj0ryk1[data-fui-focus-visible]{border-radius:var(--borderRadiusNone);}", {
    p: -1
  }], ".f17t0x8g[data-fui-focus-visible]{border-top-color:var(--colorStrokeFocus2);}", ".f194v5ow[data-fui-focus-visible]{border-right-color:var(--colorStrokeFocus2);}", ".fk7jm04[data-fui-focus-visible]{border-left-color:var(--colorStrokeFocus2);}", ".f1qgg65p[data-fui-focus-visible]{border-bottom-color:var(--colorStrokeFocus2);}", ".fhgccpy[data-fui-focus-visible]{box-shadow:var(--shadow2),0 0 0 var(--strokeWidthThin) var(--colorStrokeFocus2) inset,0 0 0 var(--strokeWidthThick) var(--colorNeutralForegroundOnBrand) inset;}", ".fjo7pq6[data-fui-focus-visible]{box-shadow:var(--shadow2),0 0 0 var(--strokeWidthThin) var(--colorStrokeFocus2) inset,0 0 0 var(--strokeWidthThick) var(--colorNeutralForegroundOnBrand) inset;}", ".f32wu9k[data-fui-focus-visible]:hover{box-shadow:var(--shadow2),0 0 0 var(--strokeWidthThin) var(--colorStrokeFocus2) inset;}", ".fu5nqqq[data-fui-focus-visible]:hover{border-top-color:var(--colorStrokeFocus2);}", ".f13prjl2[data-fui-focus-visible]:hover{border-right-color:var(--colorStrokeFocus2);}", ".f1nl83rv[data-fui-focus-visible]:hover{border-left-color:var(--colorStrokeFocus2);}", ".f1czftr5[data-fui-focus-visible]:hover{border-bottom-color:var(--colorStrokeFocus2);}", [".fazmxh[data-fui-focus-visible]{border-radius:var(--borderRadiusSmall);}", {
    p: -1
  }], [".f1b6alqh[data-fui-focus-visible]{border-radius:var(--borderRadiusLarge);}", {
    p: -1
  }]],
  t: ["@supports (-moz-appearance:button){.f18mfu3r[data-fui-focus-visible]{box-shadow:var(--shadow2),0 0 0 calc(var(--strokeWidthThin) + 0.25px) var(--colorStrokeFocus2) inset,0 0 0 var(--strokeWidthThick) var(--colorNeutralForegroundOnBrand) inset;}.fixhny3[data-fui-focus-visible]{box-shadow:var(--shadow2),0 0 0 calc(var(--strokeWidthThin) + 0.25px) var(--colorStrokeFocus2) inset,0 0 0 var(--strokeWidthThick) var(--colorNeutralForegroundOnBrand) inset;}}", "@supports (-moz-appearance:button){.feygou5[data-fui-focus-visible]:hover{box-shadow:var(--shadow2),0 0 0 calc(var(--strokeWidthThin) + 0.25px) var(--colorStrokeFocus2) inset;}}"]
});
const useRootIconOnlyStyles = /* @__PURE__ */ __styles({
  small: {
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: "fu97m5z",
    Bf4jedk: "f17fgpbq",
    B2u0y6b: "f1jt17bm"
  },
  medium: {
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: "f18ktai2",
    Bf4jedk: "fwbmr0d",
    B2u0y6b: "f44c6la"
  },
  large: {
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: "f1hbd1aw",
    Bf4jedk: "f12clzc2",
    B2u0y6b: "fjy1crr"
  }
}, {
  d: [[".fu97m5z{padding:1px;}", {
    p: -1
  }], ".f17fgpbq{min-width:24px;}", ".f1jt17bm{max-width:24px;}", [".f18ktai2{padding:5px;}", {
    p: -1
  }], ".fwbmr0d{min-width:32px;}", ".f44c6la{max-width:32px;}", [".f1hbd1aw{padding:7px;}", {
    p: -1
  }], ".f12clzc2{min-width:40px;}", ".fjy1crr{max-width:40px;}"]
});
const useIconStyles = /* @__PURE__ */ __styles({
  small: {
    Be2twd7: "fe5j1ua",
    Bqenvij: "fjamq6b",
    a9b677: "f64fuq3",
    Bqrlyyl: "fbaiahx"
  },
  medium: {},
  large: {
    Be2twd7: "f1rt2boy",
    Bqenvij: "frvgh55",
    a9b677: "fq4mcun",
    Bqrlyyl: "f1exjqw5"
  },
  before: {
    t21cq0: ["f1nizpg2", "f1a695kz"]
  },
  after: {
    Frg6f3: ["f1a695kz", "f1nizpg2"]
  }
}, {
  d: [".fe5j1ua{font-size:20px;}", ".fjamq6b{height:20px;}", ".f64fuq3{width:20px;}", ".fbaiahx{--fui-Button__icon--spacing:var(--spacingHorizontalXS);}", ".f1rt2boy{font-size:24px;}", ".frvgh55{height:24px;}", ".fq4mcun{width:24px;}", ".f1exjqw5{--fui-Button__icon--spacing:var(--spacingHorizontalSNudge);}", ".f1nizpg2{margin-right:var(--fui-Button__icon--spacing);}", ".f1a695kz{margin-left:var(--fui-Button__icon--spacing);}"]
});
const useButtonStyles_unstable = (state) => {
  const rootBaseClassName = useRootBaseClassName$2();
  const iconBaseClassName = useIconBaseClassName();
  const rootStyles = useRootStyles$4();
  const rootDisabledStyles = useRootDisabledStyles();
  const rootFocusStyles = useRootFocusStyles();
  const rootIconOnlyStyles = useRootIconOnlyStyles();
  const iconStyles = useIconStyles();
  const {
    appearance,
    disabled,
    disabledFocusable,
    icon,
    iconOnly,
    iconPosition,
    shape,
    size
  } = state;
  state.root.className = mergeClasses(
    buttonClassNames.root,
    rootBaseClassName,
    appearance && rootStyles[appearance],
    rootStyles[size],
    icon && size === "small" && rootStyles.smallWithIcon,
    icon && size === "large" && rootStyles.largeWithIcon,
    rootStyles[shape],
    // Disabled styles
    (disabled || disabledFocusable) && rootDisabledStyles.base,
    (disabled || disabledFocusable) && rootDisabledStyles.highContrast,
    appearance && (disabled || disabledFocusable) && rootDisabledStyles[appearance],
    // Focus styles
    appearance === "primary" && rootFocusStyles.primary,
    rootFocusStyles[size],
    rootFocusStyles[shape],
    // Icon-only styles
    iconOnly && rootIconOnlyStyles[size],
    // User provided class name
    state.root.className
  );
  if (state.icon) {
    state.icon.className = mergeClasses(buttonClassNames.icon, iconBaseClassName, !!state.root.children && iconStyles[iconPosition], iconStyles[size], state.icon.className);
  }
  return state;
};
const Button = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useButton_unstable(props, ref);
  useButtonStyles_unstable(state);
  useCustomStyleHook("useButtonStyles_unstable")(state);
  return renderButton_unstable(state);
});
Button.displayName = "Button";
const FieldContext = reactExports.createContext(void 0);
FieldContext.Provider;
const useFieldContext_unstable = () => reactExports.useContext(FieldContext);
function useFieldControlProps_unstable(props, options) {
  return getFieldControlProps(useFieldContext_unstable(), props, options);
}
function getFieldControlProps(context, props, options) {
  if (!context) {
    return props;
  }
  props = {
    ...props
  };
  const { generatedControlId, hintId, labelFor, labelId, required, validationMessageId, validationState } = context;
  if (generatedControlId) {
    var _props;
    var _id;
    (_id = (_props = props).id) !== null && _id !== void 0 ? _id : _props.id = generatedControlId;
  }
  if (labelId && (!(options === null || options === void 0 ? void 0 : options.supportsLabelFor) || labelFor !== props.id)) {
    var _props1, _arialabelledby;
    var _;
    (_ = (_props1 = props)[_arialabelledby = "aria-labelledby"]) !== null && _ !== void 0 ? _ : _props1[_arialabelledby] = labelId;
  }
  if (validationMessageId || hintId) {
    props["aria-describedby"] = [
      validationMessageId,
      hintId,
      props === null || props === void 0 ? void 0 : props["aria-describedby"]
    ].filter(Boolean).join(" ");
  }
  if (validationState === "error") {
    var _props2, _ariainvalid;
    var _1;
    (_1 = (_props2 = props)[_ariainvalid = "aria-invalid"]) !== null && _1 !== void 0 ? _1 : _props2[_ariainvalid] = true;
  }
  if (required) {
    if (options === null || options === void 0 ? void 0 : options.supportsRequired) {
      var _props3;
      var _required;
      (_required = (_props3 = props).required) !== null && _required !== void 0 ? _required : _props3.required = true;
    } else {
      var _props4, _ariarequired;
      var _2;
      (_2 = (_props4 = props)[_ariarequired = "aria-required"]) !== null && _2 !== void 0 ? _2 : _props4[_ariarequired] = true;
    }
  }
  if (options === null || options === void 0 ? void 0 : options.supportsSize) {
    var _props5;
    var _size;
    (_size = (_props5 = props).size) !== null && _size !== void 0 ? _size : _props5.size = context.size;
  }
  return props;
}
const useLabel_unstable = (props, ref) => {
  const { weight = "regular", size = "medium", ...baseProps } = props;
  const state = useLabelBase_unstable(baseProps, ref);
  return {
    weight,
    size,
    ...state
  };
};
const useLabelBase_unstable = (props, ref) => {
  const { disabled = false, required = false, ...rest } = props;
  return {
    disabled,
    required: optional(required === true ? "*" : required || void 0, {
      defaultProps: {
        "aria-hidden": "true"
      },
      elementType: "span"
    }),
    components: {
      root: "label",
      required: "span"
    },
    root: always(getIntrinsicElementProps("label", {
      ref,
      ...rest
    }), {
      elementType: "label"
    })
  };
};
const renderLabel_unstable = (state) => {
  return /* @__PURE__ */ jsxs(state.root, {
    children: [
      state.root.children,
      state.required && /* @__PURE__ */ jsx(state.required, {})
    ]
  });
};
const labelClassNames = {
  root: "fui-Label",
  required: "fui-Label__required"
};
const useStyles$1 = /* @__PURE__ */ __styles({
  root: {
    Bahqtrf: "fk6fouc",
    sj55zd: "f19n0e5"
  },
  disabled: {
    sj55zd: "f1s2aq7o",
    B7iucu3: "f1cyfu5x"
  },
  required: {
    sj55zd: "f1whyuy6",
    uwmqm3: ["fruq291", "f7x41pl"]
  },
  small: {
    Be2twd7: "fy9rknc",
    Bg96gwp: "fwrc4pm"
  },
  medium: {
    Be2twd7: "fkhj508",
    Bg96gwp: "f1i3iumi"
  },
  large: {
    Be2twd7: "fod5ikn",
    Bg96gwp: "faaz57k",
    Bhrd7zp: "fl43uef"
  },
  semibold: {
    Bhrd7zp: "fl43uef"
  }
}, {
  d: [".fk6fouc{font-family:var(--fontFamilyBase);}", ".f19n0e5{color:var(--colorNeutralForeground1);}", ".f1s2aq7o{color:var(--colorNeutralForegroundDisabled);}", ".f1whyuy6{color:var(--colorPaletteRedForeground3);}", ".fruq291{padding-left:var(--spacingHorizontalXS);}", ".f7x41pl{padding-right:var(--spacingHorizontalXS);}", ".fy9rknc{font-size:var(--fontSizeBase200);}", ".fwrc4pm{line-height:var(--lineHeightBase200);}", ".fkhj508{font-size:var(--fontSizeBase300);}", ".f1i3iumi{line-height:var(--lineHeightBase300);}", ".fod5ikn{font-size:var(--fontSizeBase400);}", ".faaz57k{line-height:var(--lineHeightBase400);}", ".fl43uef{font-weight:var(--fontWeightSemibold);}"],
  m: [["@media (forced-colors: active){.f1cyfu5x{color:GrayText;}}", {
    m: "(forced-colors: active)"
  }]]
});
const useLabelStyles_unstable = (state) => {
  const styles = useStyles$1();
  state.root.className = mergeClasses(labelClassNames.root, styles.root, state.disabled && styles.disabled, styles[state.size], state.weight === "semibold" && styles.semibold, state.root.className);
  if (state.required) {
    state.required.className = mergeClasses(labelClassNames.required, styles.required, state.disabled && styles.disabled, state.required.className);
  }
  return state;
};
const Label = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useLabel_unstable(props, ref);
  useLabelStyles_unstable(state);
  useCustomStyleHook("useLabelStyles_unstable")(state);
  return renderLabel_unstable(state);
});
Label.displayName = "Label";
const useCheckbox_unstable = (props, ref) => {
  const { shape = "square", size = "medium", ...checkboxProps } = props;
  const state = useCheckboxBase_unstable(checkboxProps, ref);
  const mixed = state.checked === "mixed";
  let checkmarkIcon;
  if (mixed) {
    if (shape === "circular") {
      checkmarkIcon = /* @__PURE__ */ reactExports.createElement(CircleFilled, null);
    } else {
      checkmarkIcon = size === "large" ? /* @__PURE__ */ reactExports.createElement(Square16Filled, null) : /* @__PURE__ */ reactExports.createElement(Square12Filled, null);
    }
  } else if (state.checked) {
    checkmarkIcon = size === "large" ? /* @__PURE__ */ reactExports.createElement(Checkmark16Filled, null) : /* @__PURE__ */ reactExports.createElement(Checkmark12Filled, null);
  }
  if (state.indicator) {
    var _state_indicator;
    var _children;
    (_children = (_state_indicator = state.indicator).children) !== null && _children !== void 0 ? _children : _state_indicator.children = checkmarkIcon;
  }
  return {
    shape,
    size,
    ...state,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...state.components,
      label: Label
    },
    label: optional(props.label, {
      defaultProps: {
        ...state.label,
        size: "medium"
      },
      elementType: Label
    })
  };
};
const useCheckboxBase_unstable = (props, ref) => {
  "use no memo";
  props = useFieldControlProps_unstable(props, {
    supportsLabelFor: true,
    supportsRequired: true
  });
  const { disabled = false, required, labelPosition = "after", onChange } = props;
  const [checked, setChecked] = useControllableState({
    defaultState: props.defaultChecked,
    state: props.checked,
    initialState: false
  });
  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: "input",
    excludedPropNames: [
      "checked",
      "defaultChecked",
      "onChange"
    ]
  });
  const mixed = checked === "mixed";
  const id = useId("checkbox-", nativeProps.primary.id);
  const state = {
    checked,
    disabled,
    labelPosition,
    components: {
      root: "span",
      input: "input",
      indicator: "div",
      label: "label"
    },
    root: always(props.root, {
      defaultProps: {
        ref: useFocusWithin(),
        ...nativeProps.root
      },
      elementType: "span"
    }),
    input: always(props.input, {
      defaultProps: {
        type: "checkbox",
        id,
        ref,
        checked: checked === true,
        ...nativeProps.primary
      },
      elementType: "input"
    }),
    label: optional(props.label, {
      defaultProps: {
        htmlFor: id,
        disabled,
        required
      },
      elementType: "label"
    }),
    indicator: optional(props.indicator, {
      renderByDefault: true,
      defaultProps: {
        "aria-hidden": true
      },
      elementType: "div"
    })
  };
  state.input.onChange = mergeCallbacks(state.input.onChange, (ev) => {
    const val = ev.currentTarget.indeterminate ? "mixed" : ev.currentTarget.checked;
    onChange === null || onChange === void 0 ? void 0 : onChange(ev, {
      checked: val
    });
    setChecked(val);
  });
  const inputRef = useMergedRefs(state.input.ref);
  state.input.ref = inputRef;
  useIsomorphicLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = mixed;
    }
  }, [
    inputRef,
    mixed
  ]);
  return state;
};
const renderCheckbox_unstable = (state) => {
  return /* @__PURE__ */ jsxs(state.root, {
    children: [
      /* @__PURE__ */ jsx(state.input, {}),
      state.labelPosition === "before" && state.label && /* @__PURE__ */ jsx(state.label, {}),
      state.indicator && /* @__PURE__ */ jsx(state.indicator, {}),
      state.labelPosition === "after" && state.label && /* @__PURE__ */ jsx(state.label, {})
    ]
  });
};
const checkboxClassNames = {
  root: "fui-Checkbox",
  label: "fui-Checkbox__label",
  input: "fui-Checkbox__input",
  indicator: "fui-Checkbox__indicator"
};
const useRootBaseClassName$1 = /* @__PURE__ */ __resetStyles("r1nzur1d", "r128arqq", {
  r: [".r1nzur1d{position:relative;display:inline-flex;cursor:pointer;max-width:fit-content;vertical-align:middle;color:var(--colorNeutralForeground3);}", ".r1nzur1d:focus{outline-style:none;}", ".r1nzur1d:focus-visible{outline-style:none;}", ".r1nzur1d[data-fui-focus-within]:focus-within{border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent;}", '.r1nzur1d[data-fui-focus-within]:focus-within::after{content:"";position:absolute;pointer-events:none;z-index:1;border:2px solid var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);top:calc(2px * -1);right:calc(2px * -1);bottom:calc(2px * -1);left:calc(2px * -1);}', ".r128arqq{position:relative;display:inline-flex;cursor:pointer;max-width:fit-content;vertical-align:middle;color:var(--colorNeutralForeground3);}", ".r128arqq:focus{outline-style:none;}", ".r128arqq:focus-visible{outline-style:none;}", ".r128arqq[data-fui-focus-within]:focus-within{border-top-color:transparent;border-left-color:transparent;border-bottom-color:transparent;border-right-color:transparent;}", '.r128arqq[data-fui-focus-within]:focus-within::after{content:"";position:absolute;pointer-events:none;z-index:1;border:2px solid var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);top:calc(2px * -1);left:calc(2px * -1);bottom:calc(2px * -1);right:calc(2px * -1);}'],
  s: ["@media (forced-colors: active){.r1nzur1d[data-fui-focus-within]:focus-within::after{border-top-color:Highlight;border-right-color:Highlight;border-bottom-color:Highlight;border-left-color:Highlight;}}", "@media (forced-colors: active){.r128arqq[data-fui-focus-within]:focus-within::after{border-top-color:Highlight;border-left-color:Highlight;border-bottom-color:Highlight;border-right-color:Highlight;}}"]
});
const useRootStyles$3 = /* @__PURE__ */ __styles({
  unchecked: {
    Bi91k9c: "f3p8bqa",
    pv5h1i: "fium13f",
    lj723h: "f1r2dosr",
    Hnthvo: "f1729es6"
  },
  checked: {
    sj55zd: "f19n0e5",
    wkncrt: "f35ds98",
    zxk7z7: "f12mnkne",
    Hmsnfy: "fei9a8h",
    e6czan: "fix56y3",
    pv5h1i: "f1bcv2js",
    qbydtz: "f7dr4go",
    Hnthvo: "f1r5cpua"
  },
  mixed: {
    sj55zd: "f19n0e5",
    Hmsnfy: "f1l27tf0",
    zxk7z7: "fcilktj",
    pv5h1i: "f1lphd54",
    Bunfa6h: "f1obkvq7",
    Hnthvo: "f2gmbuh",
    B15ykmv: "f1oy4fa1"
  },
  disabled: {
    Bceei9c: "f158kwzp",
    sj55zd: "f1s2aq7o",
    Hmsnfy: "f1w7mfl5",
    zxk7z7: "fcoafq6",
    B7iucu3: "f1cyfu5x",
    Bptavk6: "f1lwde8o"
  }
}, {
  h: [".f3p8bqa:hover{color:var(--colorNeutralForeground2);}", ".fium13f:hover{--fui-Checkbox__indicator--borderColor:var(--colorNeutralStrokeAccessibleHover);}", ".fix56y3:hover{--fui-Checkbox__indicator--backgroundColor:var(--colorCompoundBrandBackgroundHover);}", ".f1bcv2js:hover{--fui-Checkbox__indicator--borderColor:var(--colorCompoundBrandBackgroundHover);}", ".f1lphd54:hover{--fui-Checkbox__indicator--borderColor:var(--colorCompoundBrandStrokeHover);}", ".f1obkvq7:hover{--fui-Checkbox__indicator--color:var(--colorCompoundBrandForeground1Hover);}"],
  a: [".f1r2dosr:active{color:var(--colorNeutralForeground1);}", ".f1729es6:active{--fui-Checkbox__indicator--borderColor:var(--colorNeutralStrokeAccessiblePressed);}", ".f7dr4go:active{--fui-Checkbox__indicator--backgroundColor:var(--colorCompoundBrandBackgroundPressed);}", ".f1r5cpua:active{--fui-Checkbox__indicator--borderColor:var(--colorCompoundBrandBackgroundPressed);}", ".f2gmbuh:active{--fui-Checkbox__indicator--borderColor:var(--colorCompoundBrandStrokePressed);}", ".f1oy4fa1:active{--fui-Checkbox__indicator--color:var(--colorCompoundBrandForeground1Pressed);}"],
  d: [".f19n0e5{color:var(--colorNeutralForeground1);}", ".f35ds98{--fui-Checkbox__indicator--backgroundColor:var(--colorCompoundBrandBackground);}", ".f12mnkne{--fui-Checkbox__indicator--color:var(--colorNeutralForegroundInverted);}", ".fei9a8h{--fui-Checkbox__indicator--borderColor:var(--colorCompoundBrandBackground);}", ".f1l27tf0{--fui-Checkbox__indicator--borderColor:var(--colorCompoundBrandStroke);}", ".fcilktj{--fui-Checkbox__indicator--color:var(--colorCompoundBrandForeground1);}", ".f158kwzp{cursor:default;}", ".f1s2aq7o{color:var(--colorNeutralForegroundDisabled);}", ".f1w7mfl5{--fui-Checkbox__indicator--borderColor:var(--colorNeutralStrokeDisabled);}", ".fcoafq6{--fui-Checkbox__indicator--color:var(--colorNeutralForegroundDisabled);}"],
  m: [["@media (forced-colors: active){.f1cyfu5x{color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f1lwde8o{--fui-Checkbox__indicator--color:GrayText;}}", {
    m: "(forced-colors: active)"
  }]]
});
const useInputBaseClassName$1 = /* @__PURE__ */ __resetStyles("ruo9svu", null, [".ruo9svu{box-sizing:border-box;cursor:inherit;height:100%;margin:0;opacity:0;position:absolute;top:0;width:calc(16px + 2 * var(--spacingHorizontalS));}"]);
const useInputStyles$1 = /* @__PURE__ */ __styles({
  before: {
    j35jbq: ["f1e31b4d", "f1vgc2s3"]
  },
  after: {
    oyh7mz: ["f1vgc2s3", "f1e31b4d"]
  },
  large: {
    a9b677: "f1mq5jt6"
  }
}, {
  d: [".f1e31b4d{right:0;}", ".f1vgc2s3{left:0;}", ".f1mq5jt6{width:calc(20px + 2 * var(--spacingHorizontalS));}"]
});
const useIndicatorBaseClassName$1 = /* @__PURE__ */ __resetStyles("rl7ci6d", null, [".rl7ci6d{align-self:flex-start;box-sizing:border-box;flex-shrink:0;display:flex;align-items:center;justify-content:center;overflow:hidden;color:var(--fui-Checkbox__indicator--color);background-color:var(--fui-Checkbox__indicator--backgroundColor);border-color:var(--fui-Checkbox__indicator--borderColor, var(--colorNeutralStrokeAccessible));border-style:solid;border-width:var(--strokeWidthThin);border-radius:var(--borderRadiusSmall);margin:var(--spacingVerticalS) var(--spacingHorizontalS);fill:currentColor;pointer-events:none;font-size:12px;height:16px;width:16px;}"]);
const useIndicatorStyles$1 = /* @__PURE__ */ __styles({
  large: {
    Be2twd7: "f4ybsrx",
    Bqenvij: "fjamq6b",
    a9b677: "f64fuq3"
  },
  circular: {
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "f44lkw9"
  }
}, {
  d: [".f4ybsrx{font-size:16px;}", ".fjamq6b{height:20px;}", ".f64fuq3{width:20px;}", [".f44lkw9{border-radius:var(--borderRadiusCircular);}", {
    p: -1
  }]]
});
const useLabelStyles$1 = /* @__PURE__ */ __styles({
  base: {
    qb2dma: "f7nlbp4",
    sj55zd: "f1ym3bx4",
    Bceei9c: "fpo1scq",
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: "f1f5q0n8"
  },
  before: {
    z189sj: ["f7x41pl", "fruq291"]
  },
  after: {
    uwmqm3: ["fruq291", "f7x41pl"]
  },
  medium: {
    B6of3ja: "fjzwpt6",
    jrapky: "fh6j2fo"
  },
  large: {
    B6of3ja: "f1xlvstr",
    jrapky: "f49ad5g"
  }
}, {
  d: [".f7nlbp4{align-self:center;}", ".f1ym3bx4{color:inherit;}", ".fpo1scq{cursor:inherit;}", [".f1f5q0n8{padding:var(--spacingVerticalS) var(--spacingHorizontalS);}", {
    p: -1
  }], ".f7x41pl{padding-right:var(--spacingHorizontalXS);}", ".fruq291{padding-left:var(--spacingHorizontalXS);}", ".fjzwpt6{margin-top:calc((16px - var(--lineHeightBase300)) / 2);}", ".fh6j2fo{margin-bottom:calc((16px - var(--lineHeightBase300)) / 2);}", ".f1xlvstr{margin-top:calc((20px - var(--lineHeightBase300)) / 2);}", ".f49ad5g{margin-bottom:calc((20px - var(--lineHeightBase300)) / 2);}"]
});
const useCheckboxStyles_unstable = (state) => {
  const {
    checked,
    disabled,
    labelPosition,
    shape,
    size
  } = state;
  const rootBaseClassName = useRootBaseClassName$1();
  const rootStyles = useRootStyles$3();
  state.root.className = mergeClasses(checkboxClassNames.root, rootBaseClassName, disabled ? rootStyles.disabled : checked === "mixed" ? rootStyles.mixed : checked ? rootStyles.checked : rootStyles.unchecked, state.root.className);
  const inputBaseClassName = useInputBaseClassName$1();
  const inputStyles = useInputStyles$1();
  state.input.className = mergeClasses(checkboxClassNames.input, inputBaseClassName, size === "large" && inputStyles.large, inputStyles[labelPosition], state.input.className);
  const indicatorBaseClassName = useIndicatorBaseClassName$1();
  const indicatorStyles = useIndicatorStyles$1();
  if (state.indicator) {
    state.indicator.className = mergeClasses(checkboxClassNames.indicator, indicatorBaseClassName, size === "large" && indicatorStyles.large, shape === "circular" && indicatorStyles.circular, state.indicator.className);
  }
  const labelStyles = useLabelStyles$1();
  if (state.label) {
    state.label.className = mergeClasses(checkboxClassNames.label, labelStyles.base, labelStyles[size], labelStyles[labelPosition], state.label.className);
  }
  return state;
};
const Checkbox = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useCheckbox_unstable(props, ref);
  useCheckboxStyles_unstable(state);
  useCustomStyleHook("useCheckboxStyles_unstable")(state);
  return renderCheckbox_unstable(state);
});
Checkbox.displayName = "Checkbox";
const useInput_unstable = (props, ref) => {
  const overrides = useOverrides();
  const fieldContext = useFieldContext_unstable();
  var _fieldContext_size, _overrides_inputDefaultAppearance;
  const { size = (_fieldContext_size = fieldContext === null || fieldContext === void 0 ? void 0 : fieldContext.size) !== null && _fieldContext_size !== void 0 ? _fieldContext_size : "medium", appearance = (_overrides_inputDefaultAppearance = overrides.inputDefaultAppearance) !== null && _overrides_inputDefaultAppearance !== void 0 ? _overrides_inputDefaultAppearance : "outline", ...baseProps } = props;
  const state = useInputBase_unstable(baseProps, ref);
  return {
    size,
    appearance,
    ...state
  };
};
const useInputBase_unstable = (props, ref) => {
  const fieldControlProps = useFieldControlProps_unstable(props, {
    supportsLabelFor: true,
    supportsRequired: true
  });
  const [value, setValue] = useControllableState({
    state: fieldControlProps.value,
    defaultState: fieldControlProps.defaultValue,
    initialState: ""
  });
  const nativeProps = getPartitionedNativeProps({
    props: fieldControlProps,
    primarySlotTagName: "input",
    excludedPropNames: [
      "onChange",
      "value",
      "defaultValue"
    ]
  });
  const state = {
    components: {
      root: "span",
      input: "input",
      contentBefore: "span",
      contentAfter: "span"
    },
    input: always(fieldControlProps.input, {
      defaultProps: {
        type: "text",
        ref,
        ...nativeProps.primary
      },
      elementType: "input"
    }),
    contentAfter: optional(fieldControlProps.contentAfter, {
      elementType: "span"
    }),
    contentBefore: optional(fieldControlProps.contentBefore, {
      elementType: "span"
    }),
    root: always(fieldControlProps.root, {
      defaultProps: nativeProps.root,
      elementType: "span"
    })
  };
  state.input.value = value;
  state.input.onChange = useEventCallback((ev) => {
    var _fieldControlProps_onChange;
    const newValue = ev.target.value;
    (_fieldControlProps_onChange = fieldControlProps.onChange) === null || _fieldControlProps_onChange === void 0 ? void 0 : _fieldControlProps_onChange.call(fieldControlProps, ev, {
      value: newValue
    });
    setValue(newValue);
  });
  return state;
};
const renderInput_unstable = (state) => {
  return /* @__PURE__ */ jsxs(state.root, {
    children: [
      state.contentBefore && /* @__PURE__ */ jsx(state.contentBefore, {}),
      /* @__PURE__ */ jsx(state.input, {}),
      state.contentAfter && /* @__PURE__ */ jsx(state.contentAfter, {})
    ]
  });
};
const inputClassNames = {
  root: "fui-Input",
  input: "fui-Input__input",
  contentBefore: "fui-Input__contentBefore",
  contentAfter: "fui-Input__contentAfter"
};
const useRootClassName = /* @__PURE__ */ __resetStyles("r1oeeo9n", "r9sxh5", {
  r: [".r1oeeo9n{display:inline-flex;align-items:center;flex-wrap:nowrap;gap:var(--spacingHorizontalXXS);border-radius:var(--borderRadiusMedium);position:relative;box-sizing:border-box;vertical-align:middle;min-height:32px;font-family:var(--fontFamilyBase);font-size:var(--fontSizeBase300);font-weight:var(--fontWeightRegular);line-height:var(--lineHeightBase300);background-color:var(--colorNeutralBackground1);border:1px solid var(--colorNeutralStroke1);border-bottom-color:var(--colorNeutralStrokeAccessible);}", '.r1oeeo9n::after{box-sizing:border-box;content:"";position:absolute;left:-1px;bottom:-1px;right:-1px;height:max(2px, var(--borderRadiusMedium));border-bottom-left-radius:var(--borderRadiusMedium);border-bottom-right-radius:var(--borderRadiusMedium);border-bottom:2px solid var(--colorCompoundBrandStroke);clip-path:inset(calc(100% - 2px) 0 0 0);transform:scaleX(0);transition-property:transform;transition-duration:var(--durationUltraFast);transition-delay:var(--curveAccelerateMid);}', ".r1oeeo9n:focus-within::after{transform:scaleX(1);transition-property:transform;transition-duration:var(--durationNormal);transition-delay:var(--curveDecelerateMid);}", ".r1oeeo9n:focus-within:active::after{border-bottom-color:var(--colorCompoundBrandStrokePressed);}", ".r1oeeo9n:focus-within{outline:2px solid transparent;}", ".r9sxh5{display:inline-flex;align-items:center;flex-wrap:nowrap;gap:var(--spacingHorizontalXXS);border-radius:var(--borderRadiusMedium);position:relative;box-sizing:border-box;vertical-align:middle;min-height:32px;font-family:var(--fontFamilyBase);font-size:var(--fontSizeBase300);font-weight:var(--fontWeightRegular);line-height:var(--lineHeightBase300);background-color:var(--colorNeutralBackground1);border:1px solid var(--colorNeutralStroke1);border-bottom-color:var(--colorNeutralStrokeAccessible);}", '.r9sxh5::after{box-sizing:border-box;content:"";position:absolute;right:-1px;bottom:-1px;left:-1px;height:max(2px, var(--borderRadiusMedium));border-bottom-right-radius:var(--borderRadiusMedium);border-bottom-left-radius:var(--borderRadiusMedium);border-bottom:2px solid var(--colorCompoundBrandStroke);clip-path:inset(calc(100% - 2px) 0 0 0);transform:scaleX(0);transition-property:transform;transition-duration:var(--durationUltraFast);transition-delay:var(--curveAccelerateMid);}', ".r9sxh5:focus-within::after{transform:scaleX(1);transition-property:transform;transition-duration:var(--durationNormal);transition-delay:var(--curveDecelerateMid);}", ".r9sxh5:focus-within:active::after{border-bottom-color:var(--colorCompoundBrandStrokePressed);}", ".r9sxh5:focus-within{outline:2px solid transparent;}"],
  s: ["@media screen and (prefers-reduced-motion: reduce){.r1oeeo9n::after{transition-duration:0.01ms;transition-delay:0.01ms;}}", "@media screen and (prefers-reduced-motion: reduce){.r1oeeo9n:focus-within::after{transition-duration:0.01ms;transition-delay:0.01ms;}}", "@media screen and (prefers-reduced-motion: reduce){.r9sxh5::after{transition-duration:0.01ms;transition-delay:0.01ms;}}", "@media screen and (prefers-reduced-motion: reduce){.r9sxh5:focus-within::after{transition-duration:0.01ms;transition-delay:0.01ms;}}"]
});
const useRootStyles$2 = /* @__PURE__ */ __styles({
  small: {
    sshi5w: "f1pha7fy",
    Bahqtrf: "fk6fouc",
    Be2twd7: "fy9rknc",
    Bhrd7zp: "figsok6",
    Bg96gwp: "fwrc4pm"
  },
  medium: {},
  large: {
    sshi5w: "f1w5jphr",
    Bahqtrf: "fk6fouc",
    Be2twd7: "fod5ikn",
    Bhrd7zp: "figsok6",
    Bg96gwp: "faaz57k",
    i8kkvl: 0,
    Belr9w4: 0,
    rmohyg: "f1eyhf9v"
  },
  outline: {},
  outlineInteractive: {
    Bgoe8wy: "fvcxoqz",
    Bwzppfd: ["f1ub3y4t", "f1m52nbi"],
    oetu4i: "f1l4zc64",
    gg5e9n: ["f1m52nbi", "f1ub3y4t"],
    Drbcw7: "f8vnjqi",
    udz0bu: ["fz1etlk", "f1hc16gm"],
    Be8ivqh: "f1klwx88",
    ofdepl: ["f1hc16gm", "fz1etlk"]
  },
  underline: {
    De3pzq: "f1c21dwh",
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "fokr779",
    icvyot: "f1ern45e",
    vrafjx: ["f1n71otn", "f1deefiw"],
    wvpqe5: ["f1deefiw", "f1n71otn"],
    Eqx8gd: ["f1n6gb5g", "f15yvnhg"],
    B1piin3: ["f15yvnhg", "f1n6gb5g"]
  },
  underlineInteractive: {
    oetu4i: "f1l4zc64",
    Be8ivqh: "f1klwx88",
    d9w3h3: 0,
    B3778ie: 0,
    B4j8arr: 0,
    Bl18szs: 0,
    Blrzh8d: "f2ale1x"
  },
  filled: {
    g2u3we: "fghlq4f",
    h3c5rm: ["f1gn591s", "fjscplz"],
    B9xav0g: "fb073pr",
    zhjwy3: ["fjscplz", "f1gn591s"]
  },
  filledInteractive: {
    q7v0qe: "ftmjh5b",
    kmh5ft: ["f17blpuu", "fsrcdbj"],
    nagaa4: "f1tpwn32",
    B1yhkcb: ["fsrcdbj", "f17blpuu"]
  },
  invalid: {
    tvckwq: "fs4k3qj",
    gk2u95: ["fcee079", "fmyw78r"],
    hhx65j: "f1fgmyf4",
    Bxowmz0: ["fmyw78r", "fcee079"]
  },
  "filled-darker": {
    De3pzq: "f16xq7d1"
  },
  "filled-lighter": {
    De3pzq: "fxugw4r"
  },
  "filled-darker-shadow": {
    De3pzq: "f16xq7d1",
    E5pizo: "fyed02w"
  },
  "filled-lighter-shadow": {
    De3pzq: "fxugw4r",
    E5pizo: "fyed02w"
  },
  disabled: {
    Bceei9c: "fdrzuqr",
    De3pzq: "f1c21dwh",
    g2u3we: "f1jj8ep1",
    h3c5rm: ["f15xbau", "fy0fskl"],
    B9xav0g: "f4ikngz",
    zhjwy3: ["fy0fskl", "f15xbau"],
    Bcq6wej: "f9dbb4x",
    Jcjdmf: ["f3qs60o", "f5u9ap2"],
    sc4o1m: "fwd1oij",
    Bosien3: ["f5u9ap2", "f3qs60o"],
    Bsft5z2: "fhr9occ",
    Bduesf4: "f99w1ws"
  },
  smallWithContentBefore: {
    uwmqm3: ["fk8j09s", "fdw0yi8"]
  },
  smallWithContentAfter: {
    z189sj: ["fdw0yi8", "fk8j09s"]
  },
  mediumWithContentBefore: {
    uwmqm3: ["f1ng84yb", "f11gcy0p"]
  },
  mediumWithContentAfter: {
    z189sj: ["f11gcy0p", "f1ng84yb"]
  },
  largeWithContentBefore: {
    uwmqm3: ["f1uw59to", "fw5db7e"]
  },
  largeWithContentAfter: {
    z189sj: ["fw5db7e", "f1uw59to"]
  }
}, {
  d: [".f1pha7fy{min-height:24px;}", ".fk6fouc{font-family:var(--fontFamilyBase);}", ".fy9rknc{font-size:var(--fontSizeBase200);}", ".figsok6{font-weight:var(--fontWeightRegular);}", ".fwrc4pm{line-height:var(--lineHeightBase200);}", ".f1w5jphr{min-height:40px;}", ".fod5ikn{font-size:var(--fontSizeBase400);}", ".faaz57k{line-height:var(--lineHeightBase400);}", [".f1eyhf9v{gap:var(--spacingHorizontalSNudge);}", {
    p: -1
  }], ".f1c21dwh{background-color:var(--colorTransparentBackground);}", [".fokr779{border-radius:0;}", {
    p: -1
  }], ".f1ern45e{border-top-style:none;}", ".f1n71otn{border-right-style:none;}", ".f1deefiw{border-left-style:none;}", ".f1n6gb5g::after{left:0;}", ".f15yvnhg::after{right:0;}", [".f2ale1x::after{border-radius:0;}", {
    p: -1
  }], ".fghlq4f{border-top-color:var(--colorTransparentStroke);}", ".f1gn591s{border-right-color:var(--colorTransparentStroke);}", ".fjscplz{border-left-color:var(--colorTransparentStroke);}", ".fb073pr{border-bottom-color:var(--colorTransparentStroke);}", ".fs4k3qj:not(:focus-within),.fs4k3qj:hover:not(:focus-within){border-top-color:var(--colorPaletteRedBorder2);}", ".fcee079:not(:focus-within),.fcee079:hover:not(:focus-within){border-right-color:var(--colorPaletteRedBorder2);}", ".fmyw78r:not(:focus-within),.fmyw78r:hover:not(:focus-within){border-left-color:var(--colorPaletteRedBorder2);}", ".f1fgmyf4:not(:focus-within),.f1fgmyf4:hover:not(:focus-within){border-bottom-color:var(--colorPaletteRedBorder2);}", ".f16xq7d1{background-color:var(--colorNeutralBackground3);}", ".fxugw4r{background-color:var(--colorNeutralBackground1);}", ".fyed02w{box-shadow:var(--shadow2);}", ".fdrzuqr{cursor:not-allowed;}", ".f1jj8ep1{border-top-color:var(--colorNeutralStrokeDisabled);}", ".f15xbau{border-right-color:var(--colorNeutralStrokeDisabled);}", ".fy0fskl{border-left-color:var(--colorNeutralStrokeDisabled);}", ".f4ikngz{border-bottom-color:var(--colorNeutralStrokeDisabled);}", ".fhr9occ::after{content:unset;}", ".fk8j09s{padding-left:var(--spacingHorizontalSNudge);}", ".fdw0yi8{padding-right:var(--spacingHorizontalSNudge);}", ".f1ng84yb{padding-left:var(--spacingHorizontalMNudge);}", ".f11gcy0p{padding-right:var(--spacingHorizontalMNudge);}", ".f1uw59to{padding-left:var(--spacingHorizontalM);}", ".fw5db7e{padding-right:var(--spacingHorizontalM);}"],
  h: [".fvcxoqz:hover{border-top-color:var(--colorNeutralStroke1Hover);}", ".f1ub3y4t:hover{border-right-color:var(--colorNeutralStroke1Hover);}", ".f1m52nbi:hover{border-left-color:var(--colorNeutralStroke1Hover);}", ".f1l4zc64:hover{border-bottom-color:var(--colorNeutralStrokeAccessibleHover);}", ".ftmjh5b:hover,.ftmjh5b:focus-within{border-top-color:var(--colorTransparentStrokeInteractive);}", ".f17blpuu:hover,.f17blpuu:focus-within{border-right-color:var(--colorTransparentStrokeInteractive);}", ".fsrcdbj:hover,.fsrcdbj:focus-within{border-left-color:var(--colorTransparentStrokeInteractive);}", ".f1tpwn32:hover,.f1tpwn32:focus-within{border-bottom-color:var(--colorTransparentStrokeInteractive);}"],
  a: [".f8vnjqi:active,.f8vnjqi:focus-within{border-top-color:var(--colorNeutralStroke1Pressed);}", ".fz1etlk:active,.fz1etlk:focus-within{border-right-color:var(--colorNeutralStroke1Pressed);}", ".f1hc16gm:active,.f1hc16gm:focus-within{border-left-color:var(--colorNeutralStroke1Pressed);}", ".f1klwx88:active,.f1klwx88:focus-within{border-bottom-color:var(--colorNeutralStrokeAccessiblePressed);}"],
  m: [["@media (forced-colors: active){.f9dbb4x{border-top-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.f3qs60o{border-right-color:GrayText;}.f5u9ap2{border-left-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }], ["@media (forced-colors: active){.fwd1oij{border-bottom-color:GrayText;}}", {
    m: "(forced-colors: active)"
  }]],
  w: [".f99w1ws:focus-within{outline-style:none;}"]
});
const useInputClassName = /* @__PURE__ */ __resetStyles("r12stul0", null, [".r12stul0{align-self:stretch;box-sizing:border-box;flex-grow:1;min-width:0;border-style:none;padding:0 var(--spacingHorizontalM);color:var(--colorNeutralForeground1);background-color:transparent;outline-style:none;font-family:inherit;font-size:inherit;font-weight:inherit;line-height:inherit;}", ".r12stul0::-webkit-input-placeholder{color:var(--colorNeutralForeground4);opacity:1;}", ".r12stul0::-moz-placeholder{color:var(--colorNeutralForeground4);opacity:1;}", ".r12stul0::placeholder{color:var(--colorNeutralForeground4);opacity:1;}"]);
const useInputElementStyles = /* @__PURE__ */ __styles({
  small: {
    uwmqm3: ["f1f5gg8d", "f1vdfbxk"],
    z189sj: ["f1vdfbxk", "f1f5gg8d"]
  },
  medium: {},
  large: {
    uwmqm3: ["fnphzt9", "flt1dlf"],
    z189sj: ["flt1dlf", "fnphzt9"]
  },
  smallWithContentBefore: {
    uwmqm3: ["fgiv446", "ffczdla"]
  },
  smallWithContentAfter: {
    z189sj: ["ffczdla", "fgiv446"]
  },
  mediumWithContentBefore: {
    uwmqm3: ["fgiv446", "ffczdla"]
  },
  mediumWithContentAfter: {
    z189sj: ["ffczdla", "fgiv446"]
  },
  largeWithContentBefore: {
    uwmqm3: ["fk8j09s", "fdw0yi8"]
  },
  largeWithContentAfter: {
    z189sj: ["fdw0yi8", "fk8j09s"]
  },
  disabled: {
    sj55zd: "f1s2aq7o",
    De3pzq: "f1c21dwh",
    Bceei9c: "fdrzuqr",
    yvdlaj: "fahhnxm"
  }
}, {
  d: [".f1f5gg8d{padding-left:var(--spacingHorizontalS);}", ".f1vdfbxk{padding-right:var(--spacingHorizontalS);}", ".fnphzt9{padding-left:calc(var(--spacingHorizontalM) + var(--spacingHorizontalSNudge));}", ".flt1dlf{padding-right:calc(var(--spacingHorizontalM) + var(--spacingHorizontalSNudge));}", ".fgiv446{padding-left:var(--spacingHorizontalXXS);}", ".ffczdla{padding-right:var(--spacingHorizontalXXS);}", ".fk8j09s{padding-left:var(--spacingHorizontalSNudge);}", ".fdw0yi8{padding-right:var(--spacingHorizontalSNudge);}", ".f1s2aq7o{color:var(--colorNeutralForegroundDisabled);}", ".f1c21dwh{background-color:var(--colorTransparentBackground);}", ".fdrzuqr{cursor:not-allowed;}", ".fahhnxm::-webkit-input-placeholder{color:var(--colorNeutralForegroundDisabled);}", ".fahhnxm::-moz-placeholder{color:var(--colorNeutralForegroundDisabled);}"]
});
const useContentClassName = /* @__PURE__ */ __resetStyles("r1572tok", null, [".r1572tok{box-sizing:border-box;color:var(--colorNeutralForeground3);display:flex;}", ".r1572tok>svg{font-size:20px;}"]);
const useContentStyles = /* @__PURE__ */ __styles({
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
const useInputStyles_unstable = (state) => {
  const {
    size,
    appearance
  } = state;
  const disabled = state.input.disabled;
  const invalid = `${state.input["aria-invalid"]}` === "true";
  const filled = appearance.startsWith("filled");
  const rootStyles = useRootStyles$2();
  const inputStyles = useInputElementStyles();
  const contentStyles = useContentStyles();
  state.root.className = mergeClasses(inputClassNames.root, useRootClassName(), rootStyles[size], state.contentBefore && rootStyles[`${size}WithContentBefore`], state.contentAfter && rootStyles[`${size}WithContentAfter`], rootStyles[appearance], !disabled && appearance === "outline" && rootStyles.outlineInteractive, !disabled && appearance === "underline" && rootStyles.underlineInteractive, !disabled && filled && rootStyles.filledInteractive, filled && rootStyles.filled, !disabled && invalid && rootStyles.invalid, disabled && rootStyles.disabled, state.root.className);
  state.input.className = mergeClasses(inputClassNames.input, useInputClassName(), inputStyles[size], state.contentBefore && inputStyles[`${size}WithContentBefore`], state.contentAfter && inputStyles[`${size}WithContentAfter`], disabled && inputStyles.disabled, state.input.className);
  const contentClasses = [useContentClassName(), disabled && contentStyles.disabled, contentStyles[size]];
  if (state.contentBefore) {
    state.contentBefore.className = mergeClasses(inputClassNames.contentBefore, ...contentClasses, state.contentBefore.className);
  }
  if (state.contentAfter) {
    state.contentAfter.className = mergeClasses(inputClassNames.contentAfter, ...contentClasses, state.contentAfter.className);
  }
  return state;
};
const Input = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useInput_unstable(props, ref);
  useInputStyles_unstable(state);
  useCustomStyleHook("useInputStyles_unstable")(state);
  return renderInput_unstable(state);
});
Input.displayName = "Input";
const useSwitch_unstable = (props, ref) => {
  var _baseState_indicator;
  const { size = "medium", ...baseProps } = props;
  const baseState = useSwitchBase_unstable(baseProps, ref);
  var _children;
  (_children = (_baseState_indicator = baseState.indicator).children) !== null && _children !== void 0 ? _children : _baseState_indicator.children = /* @__PURE__ */ reactExports.createElement(CircleFilled, null);
  return {
    ...baseState,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...baseState.components,
      label: Label
    },
    size,
    label: optional(props.label, {
      defaultProps: {
        size: "medium",
        ...baseState.label
      },
      elementType: Label
    })
  };
};
const useSwitchBase_unstable = (props, ref) => {
  props = useFieldControlProps_unstable(props, {
    supportsLabelFor: true,
    supportsRequired: true
  });
  const { checked, defaultChecked, disabled, disabledFocusable = false, labelPosition = "after", onChange, required } = props;
  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: "input",
    excludedPropNames: [
      "checked",
      "defaultChecked",
      "onChange",
      "disabledFocusable"
    ]
  });
  const id = useId("switch-", nativeProps.primary.id);
  const root = always(props.root, {
    defaultProps: {
      ref: useFocusWithin(),
      ...nativeProps.root
    },
    elementType: "div"
  });
  const indicator = always(props.indicator, {
    defaultProps: {
      "aria-hidden": true
    },
    elementType: "div"
  });
  const input = always(props.input, {
    defaultProps: {
      checked,
      defaultChecked,
      id,
      ref,
      role: "switch",
      type: "checkbox",
      ...nativeProps.primary,
      disabled: disabled && !disabledFocusable,
      ...disabledFocusable && {
        "aria-disabled": true
      }
    },
    elementType: "input"
  });
  input.onChange = mergeCallbacks(input.onChange, (ev) => onChange === null || onChange === void 0 ? void 0 : onChange(ev, {
    checked: ev.currentTarget.checked
  }));
  input.onClick = mergeCallbacks(input.onClick, (ev) => {
    if (disabledFocusable) {
      ev.preventDefault();
    }
  });
  input.onKeyDown = mergeCallbacks(input.onKeyDown, (ev) => {
    if (disabledFocusable && (ev.key === " " || ev.key === "Enter")) {
      ev.preventDefault();
    }
  });
  const label = optional(props.label, {
    defaultProps: {
      disabled: disabled || disabledFocusable,
      htmlFor: id,
      required
    },
    elementType: "label"
  });
  return {
    disabledFocusable,
    labelPosition,
    components: {
      root: "div",
      indicator: "div",
      input: "input",
      label: "label"
    },
    root,
    indicator,
    input,
    label
  };
};
const renderSwitch_unstable = (state) => {
  const { labelPosition } = state;
  return /* @__PURE__ */ jsxs(state.root, {
    children: [
      /* @__PURE__ */ jsx(state.input, {}),
      labelPosition !== "after" && state.label && /* @__PURE__ */ jsx(state.label, {}),
      /* @__PURE__ */ jsx(state.indicator, {}),
      labelPosition === "after" && state.label && /* @__PURE__ */ jsx(state.label, {})
    ]
  });
};
const switchClassNames = {
  root: "fui-Switch",
  indicator: "fui-Switch__indicator",
  input: "fui-Switch__input",
  label: "fui-Switch__label"
};
const useRootBaseClassName = /* @__PURE__ */ __resetStyles("r2i81i2", "rofhmb8", {
  r: [".r2i81i2{align-items:flex-start;box-sizing:border-box;display:inline-flex;position:relative;}", ".r2i81i2:focus{outline-style:none;}", ".r2i81i2:focus-visible{outline-style:none;}", ".r2i81i2[data-fui-focus-within]:focus-within{border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent;}", '.r2i81i2[data-fui-focus-within]:focus-within::after{content:"";position:absolute;pointer-events:none;z-index:1;border:2px solid var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);top:calc(2px * -1);right:calc(2px * -1);bottom:calc(2px * -1);left:calc(2px * -1);}', ".rofhmb8{align-items:flex-start;box-sizing:border-box;display:inline-flex;position:relative;}", ".rofhmb8:focus{outline-style:none;}", ".rofhmb8:focus-visible{outline-style:none;}", ".rofhmb8[data-fui-focus-within]:focus-within{border-top-color:transparent;border-left-color:transparent;border-bottom-color:transparent;border-right-color:transparent;}", '.rofhmb8[data-fui-focus-within]:focus-within::after{content:"";position:absolute;pointer-events:none;z-index:1;border:2px solid var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);top:calc(2px * -1);left:calc(2px * -1);bottom:calc(2px * -1);right:calc(2px * -1);}'],
  s: ["@media (forced-colors: active){.r2i81i2[data-fui-focus-within]:focus-within::after{border-top-color:Highlight;border-right-color:Highlight;border-bottom-color:Highlight;border-left-color:Highlight;}}", "@media (forced-colors: active){.rofhmb8[data-fui-focus-within]:focus-within::after{border-top-color:Highlight;border-left-color:Highlight;border-bottom-color:Highlight;border-right-color:Highlight;}}"]
});
const useRootStyles$1 = /* @__PURE__ */ __styles({
  vertical: {
    Beiy3e4: "f1vx9l62"
  }
}, {
  d: [".f1vx9l62{flex-direction:column;}"]
});
const useIndicatorBaseClassName = /* @__PURE__ */ __resetStyles("r1c3hft5", null, {
  r: [".r1c3hft5{border-radius:var(--borderRadiusCircular);border:1px solid;line-height:0;box-sizing:border-box;fill:currentColor;flex-shrink:0;font-size:18px;height:20px;margin:var(--spacingVerticalS) var(--spacingHorizontalS);pointer-events:none;transition-duration:var(--durationNormal);transition-timing-function:var(--curveEasyEase);transition-property:background,border,color;width:40px;}", ".r1c3hft5>*{transition-duration:var(--durationNormal);transition-timing-function:var(--curveEasyEase);transition-property:transform;}"],
  s: ["@media screen and (prefers-reduced-motion: reduce){.r1c3hft5{transition-duration:0.01ms;}}", "@media (forced-colors: active){.r1c3hft5{color:CanvasText;}.r1c3hft5>i{forced-color-adjust:none;}}", "@media screen and (prefers-reduced-motion: reduce){.r1c3hft5>*{transition-duration:0.01ms;}}"]
});
const useIndicatorStyles = /* @__PURE__ */ __styles({
  labelAbove: {
    B6of3ja: "f1hu3pq6"
  },
  sizeSmall: {
    Be2twd7: "fses1vf",
    Bqenvij: "fd461yt",
    a9b677: "f1szoe96"
  }
}, {
  d: [".f1hu3pq6{margin-top:0;}", ".fses1vf{font-size:14px;}", ".fd461yt{height:16px;}", ".f1szoe96{width:32px;}"]
});
const useInputBaseClassName = /* @__PURE__ */ __resetStyles("r12ojtgy", "rhc0e9x", {
  r: [".r12ojtgy{box-sizing:border-box;cursor:pointer;height:100%;margin:0;opacity:0;position:absolute;width:calc(40px + 2 * var(--spacingHorizontalS));}", ".r12ojtgy:checked~.fui-Switch__indicator>*{transform:translateX(20px);}", '.r12ojtgy:disabled,.r12ojtgy[aria-disabled="true"]{cursor:default;}', '.r12ojtgy:disabled~.fui-Switch__indicator,.r12ojtgy[aria-disabled="true"]~.fui-Switch__indicator{color:var(--colorNeutralForegroundDisabled);}', '.r12ojtgy:disabled~.fui-Switch__label,.r12ojtgy[aria-disabled="true"]~.fui-Switch__label{cursor:default;color:var(--colorNeutralForegroundDisabled);}', '.r12ojtgy:enabled:not(:checked):not([aria-disabled="true"])~.fui-Switch__indicator{color:var(--colorNeutralStrokeAccessible);border-color:var(--colorNeutralStrokeAccessible);}', '.r12ojtgy:enabled:not(:checked):not([aria-disabled="true"])~.fui-Switch__label{color:var(--colorNeutralForeground1);}', '.r12ojtgy:enabled:not(:checked):not([aria-disabled="true"]):hover~.fui-Switch__indicator{color:var(--colorNeutralStrokeAccessibleHover);border-color:var(--colorNeutralStrokeAccessibleHover);}', '.r12ojtgy:enabled:not(:checked):not([aria-disabled="true"]):hover:active~.fui-Switch__indicator{color:var(--colorNeutralStrokeAccessiblePressed);border-color:var(--colorNeutralStrokeAccessiblePressed);}', '.r12ojtgy:enabled:checked:not([aria-disabled="true"])~.fui-Switch__indicator{background-color:var(--colorCompoundBrandBackground);color:var(--colorNeutralForegroundInverted);border-color:var(--colorTransparentStroke);}', '.r12ojtgy:enabled:checked:not([aria-disabled="true"]):hover~.fui-Switch__indicator{background-color:var(--colorCompoundBrandBackgroundHover);border-color:var(--colorTransparentStrokeInteractive);}', '.r12ojtgy:enabled:checked:not([aria-disabled="true"]):hover:active~.fui-Switch__indicator{background-color:var(--colorCompoundBrandBackgroundPressed);border-color:var(--colorTransparentStrokeInteractive);}', '.r12ojtgy:disabled:not(:checked)~.fui-Switch__indicator,.r12ojtgy[aria-disabled="true"]:not(:checked)~.fui-Switch__indicator{border-color:var(--colorNeutralStrokeDisabled);}', '.r12ojtgy:disabled:checked~.fui-Switch__indicator,.r12ojtgy[aria-disabled="true"]:checked~.fui-Switch__indicator{background-color:var(--colorNeutralBackgroundDisabled);border-color:var(--colorTransparentStrokeDisabled);}', ".rhc0e9x{box-sizing:border-box;cursor:pointer;height:100%;margin:0;opacity:0;position:absolute;width:calc(40px + 2 * var(--spacingHorizontalS));}", ".rhc0e9x:checked~.fui-Switch__indicator>*{transform:translateX(-20px);}", '.rhc0e9x:disabled,.rhc0e9x[aria-disabled="true"]{cursor:default;}', '.rhc0e9x:disabled~.fui-Switch__indicator,.rhc0e9x[aria-disabled="true"]~.fui-Switch__indicator{color:var(--colorNeutralForegroundDisabled);}', '.rhc0e9x:disabled~.fui-Switch__label,.rhc0e9x[aria-disabled="true"]~.fui-Switch__label{cursor:default;color:var(--colorNeutralForegroundDisabled);}', '.rhc0e9x:enabled:not(:checked):not([aria-disabled="true"])~.fui-Switch__indicator{color:var(--colorNeutralStrokeAccessible);border-color:var(--colorNeutralStrokeAccessible);}', '.rhc0e9x:enabled:not(:checked):not([aria-disabled="true"])~.fui-Switch__label{color:var(--colorNeutralForeground1);}', '.rhc0e9x:enabled:not(:checked):not([aria-disabled="true"]):hover~.fui-Switch__indicator{color:var(--colorNeutralStrokeAccessibleHover);border-color:var(--colorNeutralStrokeAccessibleHover);}', '.rhc0e9x:enabled:not(:checked):not([aria-disabled="true"]):hover:active~.fui-Switch__indicator{color:var(--colorNeutralStrokeAccessiblePressed);border-color:var(--colorNeutralStrokeAccessiblePressed);}', '.rhc0e9x:enabled:checked:not([aria-disabled="true"])~.fui-Switch__indicator{background-color:var(--colorCompoundBrandBackground);color:var(--colorNeutralForegroundInverted);border-color:var(--colorTransparentStroke);}', '.rhc0e9x:enabled:checked:not([aria-disabled="true"]):hover~.fui-Switch__indicator{background-color:var(--colorCompoundBrandBackgroundHover);border-color:var(--colorTransparentStrokeInteractive);}', '.rhc0e9x:enabled:checked:not([aria-disabled="true"]):hover:active~.fui-Switch__indicator{background-color:var(--colorCompoundBrandBackgroundPressed);border-color:var(--colorTransparentStrokeInteractive);}', '.rhc0e9x:disabled:not(:checked)~.fui-Switch__indicator,.rhc0e9x[aria-disabled="true"]:not(:checked)~.fui-Switch__indicator{border-color:var(--colorNeutralStrokeDisabled);}', '.rhc0e9x:disabled:checked~.fui-Switch__indicator,.rhc0e9x[aria-disabled="true"]:checked~.fui-Switch__indicator{background-color:var(--colorNeutralBackgroundDisabled);border-color:var(--colorTransparentStrokeDisabled);}'],
  s: ['@media (forced-colors: active){.r12ojtgy:disabled~.fui-Switch__indicator,.r12ojtgy[aria-disabled="true"]~.fui-Switch__indicator{color:GrayText;border-color:GrayText;}.r12ojtgy:disabled~.fui-Switch__label,.r12ojtgy[aria-disabled="true"]~.fui-Switch__label{color:GrayText;}.r12ojtgy:hover{color:CanvasText;}.r12ojtgy:hover:active{color:CanvasText;}.r12ojtgy:enabled:checked:not([aria-disabled="true"]):hover~.fui-Switch__indicator{background-color:Highlight;color:Canvas;}.r12ojtgy:enabled:checked:not([aria-disabled="true"]):hover:active~.fui-Switch__indicator{background-color:Highlight;color:Canvas;}.r12ojtgy:enabled:checked:not([aria-disabled="true"])~.fui-Switch__indicator{background-color:Highlight;color:Canvas;}}', '@media (forced-colors: active){.rhc0e9x:disabled~.fui-Switch__indicator,.rhc0e9x[aria-disabled="true"]~.fui-Switch__indicator{color:GrayText;border-color:GrayText;}.rhc0e9x:disabled~.fui-Switch__label,.rhc0e9x[aria-disabled="true"]~.fui-Switch__label{color:GrayText;}.rhc0e9x:hover{color:CanvasText;}.rhc0e9x:hover:active{color:CanvasText;}.rhc0e9x:enabled:checked:not([aria-disabled="true"]):hover~.fui-Switch__indicator{background-color:Highlight;color:Canvas;}.rhc0e9x:enabled:checked:not([aria-disabled="true"]):hover:active~.fui-Switch__indicator{background-color:Highlight;color:Canvas;}.rhc0e9x:enabled:checked:not([aria-disabled="true"])~.fui-Switch__indicator{background-color:Highlight;color:Canvas;}}']
});
const useInputStyles = /* @__PURE__ */ __styles({
  before: {
    j35jbq: ["f1e31b4d", "f1vgc2s3"],
    Bhzewxz: "f15twtuk"
  },
  after: {
    oyh7mz: ["f1vgc2s3", "f1e31b4d"],
    Bhzewxz: "f15twtuk"
  },
  above: {
    B5kzvoi: "f1yab3r1",
    Bqenvij: "f1aar7gd",
    a9b677: "fly5x3f"
  },
  sizeSmall: {
    a9b677: "f83td6f",
    oedwrj: ["f1t5zc5r", "fmy58zi"]
  }
}, {
  d: [".f1e31b4d{right:0;}", ".f1vgc2s3{left:0;}", ".f15twtuk{top:0;}", ".f1yab3r1{bottom:0;}", ".f1aar7gd{height:calc(20px + var(--spacingVerticalS));}", ".fly5x3f{width:100%;}", ".f83td6f{width:calc(32px + 2 * var(--spacingHorizontalS));}", ".f1t5zc5r:checked~.fui-Switch__indicator>*{transform:translateX(16px);}", ".fmy58zi:checked~.fui-Switch__indicator>*{transform:translateX(-16px);}"]
});
const useLabelStyles = /* @__PURE__ */ __styles({
  base: {
    Bceei9c: "f1k6fduh",
    jrapky: "f49ad5g",
    B6of3ja: "f1xlvstr",
    Byoj8tv: 0,
    uwmqm3: 0,
    z189sj: 0,
    z8tnut: 0,
    B0ocmuz: "f1f5q0n8"
  },
  sizeSmall: {
    Be2twd7: "fy9rknc",
    Bg96gwp: "fwrc4pm",
    jrapky: "f1suqah5",
    B6of3ja: "f26bnac"
  },
  above: {
    z8tnut: "f1ywm7hm",
    Byoj8tv: "f14wxoun",
    a9b677: "fly5x3f"
  },
  after: {
    uwmqm3: ["fruq291", "f7x41pl"]
  },
  before: {
    z189sj: ["f7x41pl", "fruq291"]
  }
}, {
  d: [".f1k6fduh{cursor:pointer;}", ".f49ad5g{margin-bottom:calc((20px - var(--lineHeightBase300)) / 2);}", ".f1xlvstr{margin-top:calc((20px - var(--lineHeightBase300)) / 2);}", [".f1f5q0n8{padding:var(--spacingVerticalS) var(--spacingHorizontalS);}", {
    p: -1
  }], ".fy9rknc{font-size:var(--fontSizeBase200);}", ".fwrc4pm{line-height:var(--lineHeightBase200);}", ".f1suqah5{margin-bottom:calc((16px - var(--lineHeightBase200)) / 2);}", ".f26bnac{margin-top:calc((16px - var(--lineHeightBase200)) / 2);}", ".f1ywm7hm{padding-top:var(--spacingVerticalXS);}", ".f14wxoun{padding-bottom:var(--spacingVerticalXS);}", ".fly5x3f{width:100%;}", ".fruq291{padding-left:var(--spacingHorizontalXS);}", ".f7x41pl{padding-right:var(--spacingHorizontalXS);}"]
});
const useSwitchStyles_unstable = (state) => {
  const rootBaseClassName = useRootBaseClassName();
  const rootStyles = useRootStyles$1();
  const indicatorBaseClassName = useIndicatorBaseClassName();
  const indicatorStyles = useIndicatorStyles();
  const inputBaseClassName = useInputBaseClassName();
  const inputStyles = useInputStyles();
  const labelStyles = useLabelStyles();
  const {
    label,
    labelPosition,
    size
  } = state;
  state.root.className = mergeClasses(switchClassNames.root, rootBaseClassName, labelPosition === "above" && rootStyles.vertical, state.root.className);
  state.indicator.className = mergeClasses(switchClassNames.indicator, indicatorBaseClassName, label && labelPosition === "above" && indicatorStyles.labelAbove, size === "small" && indicatorStyles.sizeSmall, state.indicator.className);
  state.input.className = mergeClasses(switchClassNames.input, inputBaseClassName, label && inputStyles[labelPosition], size === "small" && inputStyles.sizeSmall, state.input.className);
  if (state.label) {
    state.label.className = mergeClasses(switchClassNames.label, labelStyles.base, labelStyles[labelPosition], size === "small" && labelStyles.sizeSmall, state.label.className);
  }
  return state;
};
const Switch = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useSwitch_unstable(props, ref);
  useSwitchStyles_unstable(state);
  useCustomStyleHook("useSwitchStyles_unstable")(state);
  return renderSwitch_unstable(state);
});
Switch.displayName = "Switch";
const useText_unstable = (props, ref) => {
  const { wrap, truncate, block, italic, underline, strikethrough, size, font, weight, align } = props;
  const state = {
    align: align !== null && align !== void 0 ? align : "start",
    block: block !== null && block !== void 0 ? block : false,
    font: font !== null && font !== void 0 ? font : "base",
    italic: italic !== null && italic !== void 0 ? italic : false,
    size: size !== null && size !== void 0 ? size : 300,
    strikethrough: strikethrough !== null && strikethrough !== void 0 ? strikethrough : false,
    truncate: truncate !== null && truncate !== void 0 ? truncate : false,
    underline: underline !== null && underline !== void 0 ? underline : false,
    weight: weight !== null && weight !== void 0 ? weight : "regular",
    wrap: wrap !== null && wrap !== void 0 ? wrap : true,
    components: {
      root: "span"
    },
    root: always(getIntrinsicElementProps("span", {
      // FIXME:
      // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLHeadingElement & HTMLPreElement`
      // but since it would be a breaking change to fix it, we are casting ref to it's proper type
      ref,
      ...props
    }), {
      elementType: "span"
    })
  };
  return state;
};
const renderText_unstable = (state) => {
  return /* @__PURE__ */ jsx(state.root, {});
};
const textClassNames = {
  root: "fui-Text"
};
const useStyles = /* @__PURE__ */ __styles({
  root: {
    Bahqtrf: "fk6fouc",
    Be2twd7: "fkhj508",
    Bg96gwp: "f1i3iumi",
    Bhrd7zp: "figsok6",
    fsow6f: "fpgzoln",
    mc9l5x: "f1w7gpdv",
    Huce71: "f6juhto",
    B68tc82: 0,
    Bmxbyg5: 0,
    Bpg54ce: "f1gl81tg",
    ygn44y: "f2jf649"
  },
  nowrap: {
    Huce71: "fz5stix",
    B68tc82: 0,
    Bmxbyg5: 0,
    Bpg54ce: "f1a3p1vp"
  },
  truncate: {
    ygn44y: "f1cmbuwj"
  },
  block: {
    mc9l5x: "ftgm304"
  },
  italic: {
    B80ckks: "f1j4dglz"
  },
  underline: {
    w71qe1: "f13mvf36"
  },
  strikethrough: {
    w71qe1: "fv5q2k7"
  },
  strikethroughUnderline: {
    w71qe1: "f1drk4o6"
  },
  base100: {
    Be2twd7: "f13mqy1h",
    Bg96gwp: "fcpl73t"
  },
  base200: {
    Be2twd7: "fy9rknc",
    Bg96gwp: "fwrc4pm"
  },
  base400: {
    Be2twd7: "fod5ikn",
    Bg96gwp: "faaz57k"
  },
  base500: {
    Be2twd7: "f1pp30po",
    Bg96gwp: "f106mvju"
  },
  base600: {
    Be2twd7: "f1x0m3f5",
    Bg96gwp: "fb86gi6"
  },
  hero700: {
    Be2twd7: "fojgt09",
    Bg96gwp: "fcen8rp"
  },
  hero800: {
    Be2twd7: "fccw675",
    Bg96gwp: "f1ebx5kk"
  },
  hero900: {
    Be2twd7: "f15afnhw",
    Bg96gwp: "fr3w3wp"
  },
  hero1000: {
    Be2twd7: "fpyltcb",
    Bg96gwp: "f1ivgwrt"
  },
  monospace: {
    Bahqtrf: "f1fedwem"
  },
  numeric: {
    Bahqtrf: "f1uq0ln5"
  },
  weightMedium: {
    Bhrd7zp: "fdj6btp"
  },
  weightSemibold: {
    Bhrd7zp: "fl43uef"
  },
  weightBold: {
    Bhrd7zp: "flh3ekv"
  },
  alignCenter: {
    fsow6f: "f17mccla"
  },
  alignEnd: {
    fsow6f: "f12ymhq5"
  },
  alignJustify: {
    fsow6f: "f1j59e10"
  }
}, {
  d: [".fk6fouc{font-family:var(--fontFamilyBase);}", ".fkhj508{font-size:var(--fontSizeBase300);}", ".f1i3iumi{line-height:var(--lineHeightBase300);}", ".figsok6{font-weight:var(--fontWeightRegular);}", ".fpgzoln{text-align:start;}", ".f1w7gpdv{display:inline;}", ".f6juhto{white-space:normal;}", [".f1gl81tg{overflow:visible;}", {
    p: -1
  }], ".f2jf649{text-overflow:clip;}", ".fz5stix{white-space:nowrap;}", [".f1a3p1vp{overflow:hidden;}", {
    p: -1
  }], ".f1cmbuwj{text-overflow:ellipsis;}", ".ftgm304{display:block;}", ".f1j4dglz{font-style:italic;}", ".f13mvf36{text-decoration-line:underline;}", ".fv5q2k7{text-decoration-line:line-through;}", ".f1drk4o6{text-decoration-line:line-through underline;}", ".f13mqy1h{font-size:var(--fontSizeBase100);}", ".fcpl73t{line-height:var(--lineHeightBase100);}", ".fy9rknc{font-size:var(--fontSizeBase200);}", ".fwrc4pm{line-height:var(--lineHeightBase200);}", ".fod5ikn{font-size:var(--fontSizeBase400);}", ".faaz57k{line-height:var(--lineHeightBase400);}", ".f1pp30po{font-size:var(--fontSizeBase500);}", ".f106mvju{line-height:var(--lineHeightBase500);}", ".f1x0m3f5{font-size:var(--fontSizeBase600);}", ".fb86gi6{line-height:var(--lineHeightBase600);}", ".fojgt09{font-size:var(--fontSizeHero700);}", ".fcen8rp{line-height:var(--lineHeightHero700);}", ".fccw675{font-size:var(--fontSizeHero800);}", ".f1ebx5kk{line-height:var(--lineHeightHero800);}", ".f15afnhw{font-size:var(--fontSizeHero900);}", ".fr3w3wp{line-height:var(--lineHeightHero900);}", ".fpyltcb{font-size:var(--fontSizeHero1000);}", ".f1ivgwrt{line-height:var(--lineHeightHero1000);}", ".f1fedwem{font-family:var(--fontFamilyMonospace);}", ".f1uq0ln5{font-family:var(--fontFamilyNumeric);}", ".fdj6btp{font-weight:var(--fontWeightMedium);}", ".fl43uef{font-weight:var(--fontWeightSemibold);}", ".flh3ekv{font-weight:var(--fontWeightBold);}", ".f17mccla{text-align:center;}", ".f12ymhq5{text-align:end;}", ".f1j59e10{text-align:justify;}"]
});
const useTextStyles_unstable = (state) => {
  const styles = useStyles();
  state.root.className = mergeClasses(textClassNames.root, styles.root, state.wrap === false && styles.nowrap, state.truncate && styles.truncate, state.block && styles.block, state.italic && styles.italic, state.underline && styles.underline, state.strikethrough && styles.strikethrough, state.underline && state.strikethrough && styles.strikethroughUnderline, state.size === 100 && styles.base100, state.size === 200 && styles.base200, state.size === 400 && styles.base400, state.size === 500 && styles.base500, state.size === 600 && styles.base600, state.size === 700 && styles.hero700, state.size === 800 && styles.hero800, state.size === 900 && styles.hero900, state.size === 1e3 && styles.hero1000, state.font === "monospace" && styles.monospace, state.font === "numeric" && styles.numeric, state.weight === "medium" && styles.weightMedium, state.weight === "semibold" && styles.weightSemibold, state.weight === "bold" && styles.weightBold, state.align === "center" && styles.alignCenter, state.align === "end" && styles.alignEnd, state.align === "justify" && styles.alignJustify, state.root.className);
  return state;
};
const Text = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useText_unstable(props, ref);
  useTextStyles_unstable(state);
  useCustomStyleHook("useTextStyles_unstable")(state);
  return renderText_unstable(state);
});
Text.displayName = "Text";
const clampMax = (max) => {
  const internalMax = max <= 0 ? 1 : max;
  return internalMax;
};
const clampValue = (value, max) => {
  if (value === void 0) {
    return value;
  }
  const internalValue = value < 0 ? 0 : value > max ? max : value;
  return internalValue;
};
const ProgressBarIndeterminateMotion = createMotionComponent({
  // translate percentages are relative to the element's own width, not the container's.
  // The indeterminate bar is ~33% the width of its container, so:
  //   translate: '-100%' === left: '-33%' (one bar-width off-screen to the left)
  //   translate: '300%'  === left: '100%' (3 × bar-width ≈ full container width, off-screen to the right)
  keyframes: [
    {
      translate: "-100%"
    },
    {
      translate: "300%"
    }
  ],
  duration: 3e3,
  iterations: Infinity,
  easing: motionTokens.curveLinear,
  reducedMotion: {
    keyframes: [
      {
        opacity: 0.2
      },
      {
        opacity: 1
      },
      {
        opacity: 0.2
      }
    ],
    duration: 3e3,
    iterations: Infinity
  }
});
const useProgressBar_unstable = (props, ref) => {
  const field = useFieldContext_unstable();
  const fieldState = field === null || field === void 0 ? void 0 : field.validationState;
  const { color = fieldState === "error" || fieldState === "warning" || fieldState === "success" ? fieldState : "brand", shape = "rounded", thickness = "medium", indeterminateMotion, ...baseProps } = props;
  const state = useProgressBarBase_unstable(baseProps, ref);
  return {
    ...state,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...state.components,
      indeterminateMotion: ProgressBarIndeterminateMotion
    },
    color,
    shape,
    thickness,
    indeterminateMotion: state.value === void 0 ? motionSlot(indeterminateMotion, {
      elementType: ProgressBarIndeterminateMotion,
      defaultProps: {}
    }) : void 0
  };
};
const useProgressBarBase_unstable = (props, ref) => {
  const field = useFieldContext_unstable();
  var _props_max;
  const max = clampMax((_props_max = props.max) !== null && _props_max !== void 0 ? _props_max : 1);
  const value = clampValue(props.value, max);
  const root = always(getIntrinsicElementProps("div", {
    // FIXME:
    // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
    // but since it would be a breaking change to fix it, we are casting ref to it's proper type
    ref,
    role: "progressbar",
    "aria-valuemin": value !== void 0 ? 0 : void 0,
    "aria-valuemax": value !== void 0 ? max : void 0,
    "aria-valuenow": value,
    "aria-labelledby": field === null || field === void 0 ? void 0 : field.labelId,
    ...props
  }), {
    elementType: "div"
  });
  if (field && (field.validationMessageId || field.hintId)) {
    root["aria-describedby"] = [
      field === null || field === void 0 ? void 0 : field.validationMessageId,
      field === null || field === void 0 ? void 0 : field.hintId,
      root["aria-describedby"]
    ].filter(Boolean).join(" ");
  }
  const bar = always(props.bar, {
    elementType: "div"
  });
  return {
    max,
    value,
    components: {
      root: "div",
      bar: "div",
      indeterminateMotion: "div"
    },
    root,
    bar
  };
};
const renderProgressBar_unstable = (state) => {
  return /* @__PURE__ */ jsx(state.root, {
    children: state.bar && (state.indeterminateMotion ? /* @__PURE__ */ jsx(state.indeterminateMotion, {
      children: /* @__PURE__ */ jsx(state.bar, {})
    }) : /* @__PURE__ */ jsx(state.bar, {}))
  });
};
const progressBarClassNames = {
  root: "fui-ProgressBar",
  bar: "fui-ProgressBar__bar"
};
const ZERO_THRESHOLD = 0.01;
const useRootStyles = /* @__PURE__ */ __styles({
  root: {
    mc9l5x: "ftgm304",
    De3pzq: "f18f03hv",
    a9b677: "fly5x3f",
    B68tc82: 0,
    Bmxbyg5: 0,
    Bpg54ce: "f1a3p1vp",
    Bomf52o: "f1skxd4g"
  },
  rounded: {
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "ft85np5"
  },
  square: {
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "f1fabniw"
  },
  medium: {
    Bqenvij: "f4t8t6x"
  },
  large: {
    Bqenvij: "f6ywr7j"
  }
}, {
  d: [".ftgm304{display:block;}", ".f18f03hv{background-color:var(--colorNeutralBackground6);}", ".fly5x3f{width:100%;}", [".f1a3p1vp{overflow:hidden;}", {
    p: -1
  }], [".ft85np5{border-radius:var(--borderRadiusMedium);}", {
    p: -1
  }], [".f1fabniw{border-radius:var(--borderRadiusNone);}", {
    p: -1
  }], ".f4t8t6x{height:2px;}", ".f6ywr7j{height:4px;}"],
  m: [["@media screen and (forced-colors: active){.f1skxd4g{background-color:CanvasText;}}", {
    m: "screen and (forced-colors: active)"
  }]]
});
const useBarStyles = /* @__PURE__ */ __styles({
  base: {
    Bomf52o: "f1tnpuu0",
    Beyfa6y: 0,
    Bbmb7ep: 0,
    Btl43ni: 0,
    B7oj6ja: 0,
    Dimara: "f12b9xdw",
    Bqenvij: "f1l02sjl"
  },
  nonZeroDeterminate: {
    Bmy1vo4: "fjt6zfz",
    B3o57yi: "f1wofebd",
    Bkqvd7p: "fv71qf3"
  },
  indeterminate: {
    B2u0y6b: "fa0wk36",
    qhf8xq: "f10pi13n",
    Bcmaq0h: ["fpo0yib", "f1u5hf6c"],
    jpy9cc: "f3z2g5w"
  },
  brand: {
    De3pzq: "ftywsgz"
  },
  error: {
    De3pzq: "fdl5y0r"
  },
  warning: {
    De3pzq: "f1s438gw"
  },
  success: {
    De3pzq: "flxk52p"
  }
}, {
  m: [["@media screen and (forced-colors: active){.f1tnpuu0{background-color:Highlight;}}", {
    m: "screen and (forced-colors: active)"
  }], ["@media screen and (prefers-reduced-motion: reduce){.f3z2g5w{max-width:100%;}}", {
    m: "screen and (prefers-reduced-motion: reduce)"
  }]],
  d: [[".f12b9xdw{border-radius:inherit;}", {
    p: -1
  }], ".f1l02sjl{height:100%;}", ".fjt6zfz{transition-property:width;}", ".f1wofebd{transition-duration:0.3s;}", ".fv71qf3{transition-timing-function:ease;}", ".fa0wk36{max-width:33%;}", ".f10pi13n{position:relative;}", ".fpo0yib{background-image:linear-gradient(\n      to right,\n      var(--colorNeutralBackground6) 0%,\n      var(--colorTransparentBackground) 50%,\n      var(--colorNeutralBackground6) 100%\n    );}", ".f1u5hf6c{background-image:linear-gradient(\n      to left,\n      var(--colorNeutralBackground6) 0%,\n      var(--colorTransparentBackground) 50%,\n      var(--colorNeutralBackground6) 100%\n    );}", ".ftywsgz{background-color:var(--colorCompoundBrandBackground);}", ".fdl5y0r{background-color:var(--colorPaletteRedBackground3);}", ".f1s438gw{background-color:var(--colorPaletteDarkOrangeBackground3);}", ".flxk52p{background-color:var(--colorPaletteGreenBackground3);}"]
});
const useProgressBarStyles_unstable = (state) => {
  const {
    color,
    max,
    shape,
    thickness,
    value
  } = state;
  const rootStyles = useRootStyles();
  const barStyles = useBarStyles();
  state.root.className = mergeClasses(progressBarClassNames.root, rootStyles.root, rootStyles[shape], rootStyles[thickness], state.root.className);
  if (state.bar) {
    state.bar.className = mergeClasses(progressBarClassNames.bar, barStyles.base, barStyles.brand, value === void 0 && barStyles.indeterminate, value !== void 0 && value > ZERO_THRESHOLD && barStyles.nonZeroDeterminate, color && value !== void 0 && barStyles[color], state.bar.className);
  }
  if (state.bar && value !== void 0) {
    state.bar.style = {
      width: Math.min(100, Math.max(0, value / max * 100)) + "%",
      ...state.bar.style
    };
  }
  return state;
};
const ProgressBar = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const state = useProgressBar_unstable(props, ref);
  useProgressBarStyles_unstable(state);
  useCustomStyleHook("useProgressBarStyles_unstable")(state);
  return renderProgressBar_unstable(state);
});
ProgressBar.displayName = "ProgressBar";
export {
  ArrowUp as $,
  AsyncFocusSources as A,
  createFluentIcon as B,
  useMotionBehaviourContext as C,
  DummyInputManager as D,
  useChildElement as E,
  FocusedElementState as F,
  useMotionImperativeRef as G,
  useAnimateAtoms as H,
  useIsReducedMotion as I,
  createMotionComponent as J,
  Keys as K,
  SLOT_RENDER_FUNCTION_SYMBOL as L,
  ModalizerActiveEvent as M,
  motionTokens as N,
  canUseDOM as O,
  useFocusVisible as P,
  useThemeClassName as Q,
  RootAPI as R,
  SLOT_ELEMENT_TYPE_SYMBOL as S,
  TabsterPart as T,
  mergeClasses as U,
  React$1 as V,
  WeakHTMLElement as W,
  requireReactDom as X,
  Space as Y,
  ArrowDown as Z,
  __styles as _,
  useEventCallback as a,
  FluentProvider as a$,
  Enter as a0,
  Escape as a1,
  Home as a2,
  End as a3,
  PageUp as a4,
  PageDown as a5,
  Tab as a6,
  useControllableState as a7,
  always as a8,
  getIntrinsicElementProps as a9,
  Button as aA,
  ArrowDownload24Regular as aB,
  ProgressBar as aC,
  ArrowSync24Regular as aD,
  Text as aE,
  Emoji24Regular as aF,
  ResizeLarge24Regular as aG,
  Input as aH,
  ArrowUp16Regular as aI,
  ArrowDown16Regular as aJ,
  Globe24Regular as aK,
  ClipboardPaste24Regular as aL,
  PlugConnected24Regular as aM,
  ShieldKeyhole24Regular as aN,
  History24Regular as aO,
  Dismiss24Regular as aP,
  Checkbox as aQ,
  Checkmark24Regular as aR,
  People24Regular as aS,
  CheckboxChecked24Regular as aT,
  Chat24Regular as aU,
  PeopleCommunity24Regular as aV,
  Delete24Regular as aW,
  LockClosed24Regular as aX,
  Warning24Regular as aY,
  createLightTheme as aZ,
  createDarkTheme as a_,
  mergeCallbacks as aa,
  jsx as ab,
  useCustomStyleHook as ac,
  Checkmark12Filled as ad,
  optional as ae,
  jsxs as af,
  isResolvedShorthand as ag,
  useFieldControlProps_unstable as ah,
  ArrowLeft as ai,
  ArrowRight as aj,
  useFieldContext_unstable as ak,
  DismissRegular as al,
  getPartitionedNativeProps as am,
  __resetStyles as an,
  Label as ao,
  useFocusWithin as ap,
  useOverrides as aq,
  ChevronUp16Regular as ar,
  ChevronDown16Regular as as,
  useFocusFinders as at,
  getReactElementRef as au,
  useARIAButtonProps as av,
  Dismiss20Regular as aw,
  jsxRuntimeExports as ax,
  Switch as ay,
  ChevronDown20Regular as az,
  augmentAttribute as b,
  webDarkTheme as b0,
  webLightTheme as b1,
  ArrowMove24Regular as b2,
  Power24Regular as b3,
  Timer24Regular as b4,
  Rocket24Regular as b5,
  LocalLanguage24Regular as b6,
  clientExports as b7,
  murmur2 as b8,
  HASH_PREFIX as b9,
  RESET as ba,
  UNSUPPORTED_CSS_PROPERTIES as bb,
  insertionFactory$1 as bc,
  reduceToClassNameForSlots as bd,
  useTextDirection as be,
  useRenderer as bf,
  insertionFactory as bg,
  GroupperMoveFocusEventName as bh,
  GroupperMoveFocusActions as bi,
  TabsterMoveFocusEvent as bj,
  GroupperTabbabilities as bk,
  getAdjacentElement as bl,
  useText_unstable as bm,
  useTextStyles_unstable as bn,
  renderText_unstable as bo,
  resolveShorthand as bp,
  useInput_unstable as bq,
  useInputStyles_unstable as br,
  Dismiss16Regular as bs,
  Send16Regular as bt,
  History16Regular as bu,
  Checkmark16Regular as bv,
  Copy16Regular as bw,
  Delete16Regular as bx,
  addListener as c,
  dom as d,
  removeListener as e,
  ModalizerInactiveEvent as f,
  getTabsterOnElement as g,
  dispatchEvent as h,
  DummyInputManagerPriorities as i,
  getDummyInputContainer as j,
  RestorerTypes as k,
  RestorerRestoreFocusEventName as l,
  RestorerRestoreFocusEvent as m,
  nativeFocus as n,
  createKeyborg as o,
  disposeKeyborg as p,
  useTabster as q,
  reactExports as r,
  useId as s,
  useTabsterAttributes as t,
  useFluent as u,
  TABSTER_ATTRIBUTE_NAME as v,
  requireScheduler as w,
  useIsomorphicLayoutEffect as x,
  isHTMLElement$1 as y,
  useMergedRefs as z
};
