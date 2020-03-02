/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/javascript/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@financial-times/o-toggle/browser.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toggle = _interopRequireDefault(__webpack_require__("./node_modules/@financial-times/o-toggle/dist/js/toggle.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var constructAll = () => {
  _toggle.default.init();

  document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);
var _default = _toggle.default;
exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./node_modules/@financial-times/o-toggle/dist/js/target.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Target {
  constructor(toggle) {
    this.targetEl = toggle.targetEl;
    this.toggles = [];
  }

  addToggle(toggle) {
    this.toggles.push(toggle);
  }

  removeToggle(toggle) {
    var togglePosition = this.toggles.indexOf(toggle);
    this.toggles = this.toggles.slice(0, togglePosition).concat(this.toggles.slice(togglePosition + 1));

    if (this.toggles.length === 0) {
      // If that was the last/only toggle that controlled this target then ensure
      // this target is open so it doesn't get stuck in the closed position
      this.open();
    }
  }

  open() {
    this.targetEl.setAttribute('aria-hidden', 'false');
    this.targetEl.classList.add('o-toggle--active'); // Set every toggle that controls this target to be open

    this.toggles.forEach(toggle => {
      toggle.open();
    });
  }

  close() {
    this.targetEl.setAttribute('aria-hidden', 'true');
    this.targetEl.classList.remove('o-toggle--active'); // Set every toggle that controls this target to be closed

    this.toggles.forEach(toggle => {
      toggle.close();
    });
  }

  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  isOpen() {
    return this.targetEl.classList.contains('o-toggle--active');
  }

}

var _default = Target;
exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./node_modules/@financial-times/o-toggle/dist/js/toggle.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _target = _interopRequireDefault(__webpack_require__("./node_modules/@financial-times/o-toggle/dist/js/target.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Toggle {
  constructor(toggleEl, config) {
    if (!Toggle._targets) {
      Toggle._targets = new Map();
    }

    if (!toggleEl) {
      return;
    } else if (!(toggleEl instanceof HTMLElement)) {
      toggleEl = document.querySelector(toggleEl);
    }

    if (toggleEl.hasAttribute('data-o-toggle--js')) {
      return;
    }

    if (!config) {
      config = {}; // Try to get config set declaratively on the element

      Array.prototype.forEach.call(toggleEl.attributes, attr => {
        if (attr.name.indexOf('data-o-toggle') === 0) {
          // Remove the prefix part of the data attribute name
          var key = attr.name.replace('data-o-toggle-', '');

          try {
            // If it's a JSON, a boolean or a number, we want it stored like that, and not as a string
            // We also replace all ' with " so JSON strings are parsed correctly
            config[key] = JSON.parse(attr.value.replace(/\'/g, '"'));
          } catch (e) {
            config[key] = attr.value;
          }
        }
      });
    } // Set the toggle callback if its a string.


    if (config.callback && typeof config.callback === 'string') {
      // Error if the callback is a string and a global function of that name does not exist.
      if (typeof window[config.callback] !== 'function') {
        throw new Error("Could not find o-toggle callback \"".concat(config.callback, "\"."));
      }

      this.callback = window[config.callback];
    } // Set the toggle callback if its a funciton.


    if (config.callback && typeof config.callback === 'function') {
      this.callback = config.callback;
    } // Error if some callback value has been given but has not been set.


    if (config.callback && !this.callback) {
      throw new Error("The o-toggle callback must be a string or function.");
    } // Set the toggle element.


    this.toggleEl = toggleEl;

    if (this.toggleEl.nodeName === 'A') {
      this.toggleEl.setAttribute('role', 'button');
    }

    this.toggle = this.toggle.bind(this);
    this.toggleEl.addEventListener('click', this.toggle);
    this.toggleEl.setAttribute('data-o-toggle--js', 'true');
    this.targetEl = config.target;

    if (!(this.targetEl instanceof HTMLElement)) {
      this.targetEl = document.querySelector(this.targetEl);
    }

    if (Toggle._targets.get(this.targetEl) === undefined) {
      this.target = new Toggle.Target(this);

      Toggle._targets.set(this.targetEl, this.target);
    } else {
      this.target = Toggle._targets.get(this.targetEl);
    }

    this.target.addToggle(this);
    this.target.close();
  }

  open() {
    this.toggleEl.setAttribute('aria-expanded', 'true');
  }

  close() {
    this.toggleEl.setAttribute('aria-expanded', 'false');
  } // toggle is bound to the Toggle instance in the constructor


  toggle(e) {
    this.target.toggle();

    if (e) {
      e.preventDefault();
    }

    if (this.callback) {
      var stateName = this.target.isOpen() ? 'open' : 'close';
      this.callback(stateName, e);
    }
  }

  destroy() {
    this.toggleEl.removeEventListener('click', this.toggle);
    this.toggleEl.removeAttribute('aria-expanded');
    this.toggleEl.removeAttribute('role');
    this.toggleEl.removeAttribute('data-o-toggle--js');
    this.target.removeToggle(this);
    this.target = undefined;
    this.toggleEl = undefined;
    this.callback = undefined;
  }

  static init(el, config) {
    if (!el) {
      el = document.body;
    } else if (!(el instanceof HTMLElement)) {
      el = document.querySelector(el);
    }

    var toggleEls = el.querySelectorAll('[data-o-component="o-toggle"]');
    var toggles = [];

    for (var toggleEl of toggleEls) {
      if (!toggleEl.hasAttribute('data-o-toggle--js')) {
        toggles.push(new Toggle(toggleEl, config));
      }
    }

    return toggles;
  }

}

Toggle.Target = _target.default;
var _default = Toggle;
exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./node_modules/@financial-times/o-utils/browser.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = debounce;
exports.throttle = throttle;

/**
*
* Debounces function so it is only called after n milliseconds
* without it not being called
*
* @example
* Utils.debounce(myFunction() {}, 100);
*
* @param {Function} func - Function to be debounced
* @param {number} wait - Time in miliseconds
*
* @returns {Function} - Debounced function
*/
function debounce(func, wait) {
  let timeout;
  return function () {
    const args = arguments;

    const later = () => {
      timeout = null;
      func.apply(this, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
/**
*
* Throttle function so it is only called once every n milliseconds
*
* @example
* Utils.throttle(myFunction() {}, 100);
*
* @param {Function} func - Function to be throttled
* @param {number} wait - Time in miliseconds
*
* @returns {Function} - Throttled function
*/


function throttle(func, wait) {
  let timeout;
  return function () {
    if (timeout) {
      return;
    }

    const args = arguments;

    const later = () => {
      timeout = null;
      func.apply(this, args);
    };

    timeout = setTimeout(later, wait);
  };
}

/***/ }),

/***/ "./public/javascript/drawer.js":
/***/ (function(module, exports, __webpack_require__) {

var require;/*** IMPORTS FROM imports-loader ***/
var define = false;
var requireText = require;

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Toggle = __webpack_require__("./node_modules/@financial-times/o-toggle/browser.js");

var LISTEN_DELAY = 300;
var INTENT_DELAY = 1000;

function handleCloseEvents(scope, callback, allFocusable) {
  var timeout = void 0;

  var handleKeydown = function handleKeydown(e) {
    if (e.keyCode === 27) {
      callback();
    }
  };

  var handleClick = function handleClick(e) {
    if (!scope.contains(e.target)) {
      callback();
    }
  };

  var handleMouseenter = function handleMouseenter() {
    clearTimeout(timeout);
  };

  var handleMouseleave = function handleMouseleave() {
    // IE 11 mobile fires a mouseleave event when the search box gets focus. This means when the user tries
    // to use the search box, it disappears because the drawer closes.
    // Mouseout events should only occur when the drawer takes up less than 100% of the window, so we can ignore
    // any events triggered if the width of the drawer is equal to or bigger than the window.innerwidth
    if (window.innerWidth >= scope.offsetWidth) {
      timeout = setTimeout(callback, INTENT_DELAY);
    }
  };

  var handleFocus = function handleFocus(e) {
    var target = e.relatedTarget || e.target;

    if (!scope.contains(target)) {
      scope.focus();
    }
  };

  var handleTab = function handleTab(e) {
    if (e.keyCode === 9) {
      var firstEl = allFocusable[0];
      var lastEl = allFocusable[allFocusable.length - 1];

      // Keep focus within the drawer when tabbing for a11y reasons.
      if (!e.shiftKey && e.target === lastEl) {
        firstEl.focus();
        e.preventDefault();
      } else if (e.shiftKey && e.target === firstEl) {
        // loop to the bottom when shift+tabbing.
        lastEl.focus();
        e.preventDefault();
      }
    }
  };

  var removeEvents = function removeEvents() {
    clearTimeout(timeout);

    scope.removeEventListener("mouseenter", handleMouseenter);
    scope.removeEventListener("mouseleave", handleMouseleave);
    document.removeEventListener("click", handleClick);
    document.removeEventListener("touchstart", handleClick);
    document.removeEventListener("keydown", handleKeydown);
    document.removeEventListener("focusin", handleFocus);
    document.removeEventListener("focusout", handleFocus);
    scope.removeEventListener("keydown", handleTab);
  };

  var addEvents = function addEvents() {
    scope.addEventListener("mouseenter", handleMouseenter);
    scope.addEventListener("mouseleave", handleMouseleave);
    document.addEventListener("click", handleClick);
    document.addEventListener("touchstart", handleClick);
    document.addEventListener("keydown", handleKeydown);

    // Firefox doesn't support focusin or focusout
    // https://bugzilla.mozilla.org/show_bug.cgi?id=687787
    document.addEventListener("focusin", handleFocus);
    document.addEventListener("focusout", handleFocus);

    scope.addEventListener("keydown", handleTab);
  };

  return { addEvents: addEvents, removeEvents: removeEvents, handleMouseleave: handleMouseleave };
}

function addDrawerToggles(drawerEl, allFocusable) {
  var controls = Array.from(document.body.querySelectorAll("[aria-controls=\"" + drawerEl.id + "\"]"));

  var handleClose = void 0;
  var openingControl = void 0;

  function toggleCallback(state, e) {
    if (state === "close") {
      toggleTabbing(drawerEl, false, allFocusable);

      handleClose.removeEvents();

      openingControl.focus();
    } else {
      toggleTabbing(drawerEl, true, allFocusable);

      // don't capture the initial click or accidental double taps etc.
      // we could use transitionend but scoping is tricky and it needs prefixing and...
      setTimeout(handleClose.addEvents, LISTEN_DELAY);

      // record the opening control so we can send focus back to it when closing the drawer
      openingControl = e.currentTarget;

      // aria-controls is only supported by JAWS.
      // In a setTimeout callback to avoid flickering transitions in Chrome (v54)
      setTimeout(function () {
        // Don't focus on the drawer itself or iOS VoiceOver will miss it
        // Focus on the first focusable element
        var firstFocusable = drawerEl.querySelector("a, button, input, select");

        if (firstFocusable) {
          firstFocusable.focus();
        } else {
          drawerEl.focus();
        }
      });
    }

    drawerEl.classList.toggle("o-header__drawer--closing", state === "close");
    drawerEl.classList.toggle("o-header__drawer--opening", state === "open");
  }

  controls.forEach(function (control) {
    var drawerToggle = new Toggle(control, {
      target: drawerEl,
      callback: toggleCallback
    });

    // Both toggles have the same target, so the toggle function will be the same
    // If there's a separate handleClose instance for each toggle, removeEvents doesn't work
    // when the close toggle is clicked
    if (!handleClose) {
      handleClose = handleCloseEvents(drawerEl, drawerToggle.toggle, allFocusable);
    }
  });

  // make the drawer programmatically focusable
  drawerEl.tabIndex = -1;
}

function addSubmenuToggles(drawerEl) {
  var submenus = drawerEl.querySelectorAll('[id^="o-header-drawer-child-"]');

  Array.from(submenus).forEach(function (submenu) {
    var button = drawerEl.querySelector("[aria-controls=\"" + submenu.id + "\"]");

    submenu.setAttribute("aria-hidden", "true");

    new Toggle(button, {
      target: submenu,
      callback: function callback(state) {
        button.textContent = button.textContent.replace(/fewer|more/, state === "open" ? "fewer" : "more");
      }
    });
  });
}

// This function is to solve accessibility issue
// when o-header-drawer is closed => tabbing is disabled.
// when o-header-drawer is open => tabbing is enabled.
function toggleTabbing(drawerEl, isEnabled, allFocusable) {
  if (isEnabled) {
    allFocusable.forEach(function (el) {
      el.removeAttribute("tabindex");
    });
  } else {
    allFocusable.forEach(function (el) {
      el.setAttribute("tabindex", "-1");
    });
  }
}

function init() {
  var drawerEl = document.body.querySelector("[data-o-header-drawer]");
  debugger;

  if (!drawerEl) {
    return;
  }
  var allFocusable = Array.from(drawerEl.querySelectorAll("a, button, input, select"));
  toggleTabbing(drawerEl, false, allFocusable);
  addSubmenuToggles(drawerEl);
  addDrawerToggles(drawerEl, allFocusable);

  // Wrap in a timeout to stop page load stall in Chrome v73 on Android
  // toggleTabbing and the removal of the no-js attribute spikes the CPU
  // and causes the main process to block for around 10 seconds.
  setTimeout(function () {
    drawerEl.removeAttribute("data-o-header-drawer--no-js");
    drawerEl.setAttribute("data-o-header-drawer--js", "true");
  });
}

exports["default"] = { init: init, handleCloseEvents: handleCloseEvents };
exports.init = init;
exports.handleCloseEvents = handleCloseEvents;


/***/ }),

/***/ "./public/javascript/header.js":
/***/ (function(module, exports, __webpack_require__) {

var require;/*** IMPORTS FROM imports-loader ***/
var define = false;
var requireText = require;

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _search = __webpack_require__("./public/javascript/search.js");

var _search2 = _interopRequireDefault(_search);

var _mega = __webpack_require__("./public/javascript/mega.js");

var _mega2 = _interopRequireDefault(_mega);

var _drawer = __webpack_require__("./public/javascript/drawer.js");

var _drawer2 = _interopRequireDefault(_drawer);

var _subnav = __webpack_require__("./public/javascript/subnav.js");

var _subnav2 = _interopRequireDefault(_subnav);

var _sticky = __webpack_require__("./public/javascript/sticky.js");

var _sticky2 = _interopRequireDefault(_sticky);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Header = function () {
  function Header(headerEl) {
    _classCallCheck(this, Header);

    if (!headerEl) {
      headerEl = document.querySelector('[data-o-component="o-header"]');
    } else if (typeof headerEl === "string") {
      headerEl = document.querySelector(headerEl);
    }

    if (headerEl.hasAttribute("data-o-header--js")) {
      return;
    }

    this.headerEl = headerEl;

    _search2["default"].init(this.headerEl);
    _mega2["default"].init(this.headerEl);
    _drawer2["default"].init(this.headerEl);
    _subnav2["default"].init(this.headerEl);
    _sticky2["default"].init(this.headerEl);

    this.headerEl.removeAttribute("data-o-header--no-js");
    this.headerEl.setAttribute("data-o-header--js", "");
  }

  _createClass(Header, null, [{
    key: "init",
    value: function init(rootEl) {
      if (!rootEl) {
        rootEl = document.body;
      }
      if (!(rootEl instanceof HTMLElement)) {
        rootEl = document.querySelector(rootEl);
      }
      if (/\bo-header\b/.test(rootEl.getAttribute("data-o-component"))) {
        return new Header(rootEl);
      }

      return [].map.call(rootEl.querySelectorAll('[data-o-component="o-header"]'), function (el) {
        if (!el.hasAttribute("data-o-header--js")) {
          return new Header(el);
        }
      }).filter(function (header) {
        return header !== undefined;
      });
    }
  }]);

  return Header;
}();

exports["default"] = Header;
module.exports = exports["default"];


/***/ }),

/***/ "./public/javascript/main.js":
/***/ (function(module, exports, __webpack_require__) {

var require;/*** IMPORTS FROM imports-loader ***/
var define = false;
var requireText = require;

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _header = __webpack_require__("./public/javascript/header.js");

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var constructAll = function constructAll() {
  _header2["default"].init();
  document.removeEventListener("o.DOMContentLoaded", constructAll);
};

document.addEventListener("o.DOMContentLoaded", constructAll);

exports["default"] = _header2["default"];
module.exports = exports["default"];


/***/ }),

/***/ "./public/javascript/mega.js":
/***/ (function(module, exports, __webpack_require__) {

var require;/*** IMPORTS FROM imports-loader ***/
var define = false;
var requireText = require;

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var INTENT_ENTER = 300;
var INTENT_LEAVE = 400;

var expanded = [];

function addEvents(parent, menu) {
	var timeout = void 0;

	parent.addEventListener('mouseenter', function () {
		clearTimeout(timeout);

		if (isOpen(menu)) {
			return;
		}

		timeout = setTimeout(function () {
			if (expanded.length) {
				hide(expanded[0]);
				show(menu, false);
			} else {
				show(menu, true);
			}
		}, INTENT_ENTER);
	});

	parent.addEventListener('mouseleave', function () {
		clearTimeout(timeout);
		timeout = setTimeout(function () {
			return isOpen(menu) && hide(menu);
		}, INTENT_LEAVE);
	});
}

function isOpen(menu) {
	return expanded.indexOf(menu) !== -1;
}

function show(menu, animate) {
	if (animate) {
		menu.classList.add('o-header__mega--animation');
	}

	menu.setAttribute('aria-hidden', 'false');
	menu.setAttribute('aria-expanded', 'true');

	menu.dispatchEvent(new CustomEvent('oHeader.MegaMenuShow', { bubbles: true }));

	expanded.push(menu);
}

function hide(menu) {
	menu.classList.remove('o-header__mega--animation');
	menu.setAttribute('aria-hidden', 'true');
	menu.setAttribute('aria-expanded', 'false');

	menu.dispatchEvent(new CustomEvent('oHeader.MegaMenuHide', { bubbles: true }));

	expanded.splice(expanded.indexOf(menu), 1);
}

function init(headerEl) {
	var menus = Array.from(headerEl.querySelectorAll('[data-o-header-mega]'));
	var parents = menus.map(function (menu) {
		return menu.parentNode;
	});

	menus.forEach(function (menu) {
		menu.setAttribute('aria-hidden', 'true');
		menu.setAttribute('aria-expanded', 'false');
	});

	parents.forEach(function (parent, i) {
		return addEvents(parent, menus[i]);
	});
}

exports.init = init;
exports.show = show;
exports.hide = hide;
exports['default'] = { init: init, show: show, hide: hide };


/***/ }),

/***/ "./public/javascript/search.js":
/***/ (function(module, exports, __webpack_require__) {

var require;/*** IMPORTS FROM imports-loader ***/
var define = false;
var requireText = require;

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Toggle = __webpack_require__("./node_modules/@financial-times/o-toggle/browser.js");

function init(headerEl) {
  var target = headerEl.querySelector("[data-o-header-search]");
  var controls = target && headerEl.querySelectorAll("[aria-controls=\"" + target.id + "\"]");

  if (controls === null || controls.length === 0) {
    return;
  }

  var opening = [];

  var callback = function callback(state, e) {
    if (state === "open") {
      // record the opening control
      opening.push(e.currentTarget);
      target.querySelector('[name="q"]').focus();
    } else {
      // re-focus opening control
      if (opening.length) {
        opening.pop().focus();
      }
    }
  };

  for (var i = 0, len = controls.length; i < len; i++) {
    new Toggle(controls[i], { target: target, callback: callback });
  }
}

exports.init = init;
exports["default"] = { init: init };


/***/ }),

/***/ "./public/javascript/sticky.js":
/***/ (function(module, exports, __webpack_require__) {

var require;/*** IMPORTS FROM imports-loader ***/
var define = false;
var requireText = require;

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _require = __webpack_require__("./node_modules/@financial-times/o-utils/browser.js"),
    debounce = _require.debounce;

function init(headerEl) {
  if (!headerEl.hasAttribute("data-o-header--sticky")) {
    return;
  }

  var viewportOffset = void 0;
  var lastScrollDepth = void 0;
  var lastAnimationFrame = void 0;
  var lastStickyState = void 0;

  function handleFrame() {
    // sticky el will appear when scrolled down from page top to
    // (arbitrarily) > half the viewport height
    var scrollDepth = window.pageYOffset || window.scrollY;
    var isActive = scrollDepth > viewportOffset;

    headerEl.classList.toggle("o-header--sticky-active", isActive);

    if (isActive !== lastStickyState) {
      lastStickyState = isActive;
      headerEl.dispatchEvent(new CustomEvent("oHeader.Sticky", {
        bubbles: true,
        detail: { isActive: isActive }
      }));
    }

    // allow a little wiggling room so we don't get too hasty toggling up/down state
    if (Math.abs(scrollDepth - lastScrollDepth) > 20) {
      var isScrollingDown = lastScrollDepth < scrollDepth;
      headerEl.classList.toggle("o-header--sticky-scroll-down", isActive && isScrollingDown);
      headerEl.classList.toggle("o-header--sticky-scroll-up", isActive && !isScrollingDown);
    }

    lastScrollDepth = scrollDepth;
  }

  function startLoop() {
    viewportOffset = window.innerHeight / 2;

    lastAnimationFrame = window.requestAnimationFrame(function () {
      handleFrame();
      startLoop();
    });
  }

  function stopLoop() {
    if (lastAnimationFrame) {
      window.cancelAnimationFrame(lastAnimationFrame);
    }
  }

  function scrollStart() {
    window.removeEventListener("scroll", scrollStart);
    window.addEventListener("scroll", debouncedScrollEnd);
    startLoop();
  }

  function scrollEnd() {
    stopLoop();
    window.removeEventListener("scroll", debouncedScrollEnd);
    window.addEventListener("scroll", scrollStart);
  }

  var debouncedScrollEnd = debounce(scrollEnd, 300);

  window.addEventListener("scroll", scrollStart);

  handleFrame();
}

exports.init = init;
exports["default"] = { init: init };


/***/ }),

/***/ "./public/javascript/subnav.js":
/***/ (function(module, exports, __webpack_require__) {

var require;/*** IMPORTS FROM imports-loader ***/
var define = false;
var requireText = require;

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var oUtils = __webpack_require__("./node_modules/@financial-times/o-utils/browser.js");

function init(headerEl) {
  var subnav = headerEl.querySelector("[data-o-header-subnav]");

  if (subnav === null) {
    return;
  }

  var buttons = Array.from(subnav.getElementsByTagName("button"));
  var wrapper = subnav.querySelector("[data-o-header-subnav-wrapper]");

  var scrollWidth = void 0;
  var wrapperWidth = wrapper.clientWidth;

  function checkCurrentPosition() {
    var currentSelection = wrapper.querySelector("[aria-current]");
    if (currentSelection) {
      var currentSelectionEnd = currentSelection.getBoundingClientRect().right;

      //if the current selection is wider than the end of the wrapper
      if (currentSelectionEnd > wrapperWidth) {
        // check by how much
        var diff = currentSelectionEnd - wrapperWidth;
        // if the difference is greater than half of the wrapper, scroll to the end of the current selection.
        diff = diff > wrapperWidth / 2 ? currentSelectionEnd : wrapperWidth / 2;

        wrapper.scrollTo(diff, 0);
      }
    }
    scrollable();
  }

  function direction(button) {
    return button.className.match(/left|right/).pop();
  }

  function scrollable() {
    scrollWidth = wrapper.scrollWidth;

    buttons.forEach(function (button) {
      if (direction(button) === "left") {
        button.disabled = wrapper.scrollLeft === 0;
      } else {
        var remaining = scrollWidth - wrapperWidth - wrapper.scrollLeft;
        // Allow a little difference as scrollWidth is fast, not accurate.
        button.disabled = remaining <= 1;
      }
    });
  }

  function scroll(e) {
    var distance = 100;

    if (direction(e.currentTarget) === "left") {
      distance = (wrapper.scrollLeft > distance ? distance : wrapper.scrollLeft) * -1;
    } else {
      var remaining = scrollWidth - wrapperWidth - wrapper.scrollLeft;
      distance = remaining > distance ? distance : remaining;
    }

    wrapper.scrollLeft = wrapper.scrollLeft + distance;

    scrollable();
  }

  wrapper.addEventListener("scroll", oUtils.throttle(scrollable, 100));
  window.addEventListener("oViewport.resize", scrollable);

  buttons.forEach(function (button) {
    button.onclick = scroll;
  });

  checkCurrentPosition();
}

exports.init = init;
exports["default"] = { init: init };


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2svYm9vdHN0cmFwIDNkMWM1NmVhMGEyYTZjMWU3M2RhIiwiLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9vLXRvZ2dsZS9icm93c2VyLmpzIiwiLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9vLXRvZ2dsZS9kaXN0L2pzL3RhcmdldC5qcyIsIi4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvby10b2dnbGUvZGlzdC9qcy90b2dnbGUuanMiLCIuL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL28tdXRpbHMvYnJvd3Nlci5qcyIsIi4vcHVibGljL2phdmFzY3JpcHQvZHJhd2VyLmpzIiwiLi9wdWJsaWMvamF2YXNjcmlwdC9oZWFkZXIuanMiLCIuL3B1YmxpYy9qYXZhc2NyaXB0L21haW4uanMiLCIuL3B1YmxpYy9qYXZhc2NyaXB0L21lZ2EuanMiLCIuL3B1YmxpYy9qYXZhc2NyaXB0L3NlYXJjaC5qcyIsIi4vcHVibGljL2phdmFzY3JpcHQvc3RpY2t5LmpzIiwiLi9wdWJsaWMvamF2YXNjcmlwdC9zdWJuYXYuanMiXSwibmFtZXMiOlsiVG9nZ2xlIiwicmVxdWlyZSIsIkxJU1RFTl9ERUxBWSIsIklOVEVOVF9ERUxBWSIsImhhbmRsZUNsb3NlRXZlbnRzIiwic2NvcGUiLCJjYWxsYmFjayIsImFsbEZvY3VzYWJsZSIsInRpbWVvdXQiLCJoYW5kbGVLZXlkb3duIiwiZSIsImtleUNvZGUiLCJoYW5kbGVDbGljayIsImNvbnRhaW5zIiwidGFyZ2V0IiwiaGFuZGxlTW91c2VlbnRlciIsImNsZWFyVGltZW91dCIsImhhbmRsZU1vdXNlbGVhdmUiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwib2Zmc2V0V2lkdGgiLCJzZXRUaW1lb3V0IiwiaGFuZGxlRm9jdXMiLCJyZWxhdGVkVGFyZ2V0IiwiZm9jdXMiLCJoYW5kbGVUYWIiLCJmaXJzdEVsIiwibGFzdEVsIiwibGVuZ3RoIiwic2hpZnRLZXkiLCJwcmV2ZW50RGVmYXVsdCIsInJlbW92ZUV2ZW50cyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkb2N1bWVudCIsImFkZEV2ZW50cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJhZGREcmF3ZXJUb2dnbGVzIiwiZHJhd2VyRWwiLCJjb250cm9scyIsIkFycmF5IiwiZnJvbSIsImJvZHkiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaWQiLCJoYW5kbGVDbG9zZSIsIm9wZW5pbmdDb250cm9sIiwidG9nZ2xlQ2FsbGJhY2siLCJzdGF0ZSIsInRvZ2dsZVRhYmJpbmciLCJjdXJyZW50VGFyZ2V0IiwiZmlyc3RGb2N1c2FibGUiLCJxdWVyeVNlbGVjdG9yIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiZm9yRWFjaCIsImRyYXdlclRvZ2dsZSIsImNvbnRyb2wiLCJ0YWJJbmRleCIsImFkZFN1Ym1lbnVUb2dnbGVzIiwic3VibWVudXMiLCJidXR0b24iLCJzdWJtZW51Iiwic2V0QXR0cmlidXRlIiwidGV4dENvbnRlbnQiLCJyZXBsYWNlIiwiaXNFbmFibGVkIiwiZWwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJpbml0IiwiSGVhZGVyIiwiaGVhZGVyRWwiLCJoYXNBdHRyaWJ1dGUiLCJzZWFyY2giLCJtZWdhIiwiZHJhd2VyIiwic3VibmF2Iiwic3RpY2t5Iiwicm9vdEVsIiwiSFRNTEVsZW1lbnQiLCJ0ZXN0IiwiZ2V0QXR0cmlidXRlIiwibWFwIiwiY2FsbCIsImZpbHRlciIsImhlYWRlciIsInVuZGVmaW5lZCIsImNvbnN0cnVjdEFsbCIsIklOVEVOVF9FTlRFUiIsIklOVEVOVF9MRUFWRSIsImV4cGFuZGVkIiwicGFyZW50IiwibWVudSIsImlzT3BlbiIsImhpZGUiLCJzaG93IiwiaW5kZXhPZiIsImFuaW1hdGUiLCJhZGQiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJidWJibGVzIiwicHVzaCIsInJlbW92ZSIsInNwbGljZSIsIm1lbnVzIiwicGFyZW50cyIsInBhcmVudE5vZGUiLCJpIiwib3BlbmluZyIsInBvcCIsImxlbiIsImRlYm91bmNlIiwidmlld3BvcnRPZmZzZXQiLCJsYXN0U2Nyb2xsRGVwdGgiLCJsYXN0QW5pbWF0aW9uRnJhbWUiLCJsYXN0U3RpY2t5U3RhdGUiLCJoYW5kbGVGcmFtZSIsInNjcm9sbERlcHRoIiwicGFnZVlPZmZzZXQiLCJzY3JvbGxZIiwiaXNBY3RpdmUiLCJkZXRhaWwiLCJNYXRoIiwiYWJzIiwiaXNTY3JvbGxpbmdEb3duIiwic3RhcnRMb29wIiwiaW5uZXJIZWlnaHQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJzdG9wTG9vcCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwic2Nyb2xsU3RhcnQiLCJkZWJvdW5jZWRTY3JvbGxFbmQiLCJzY3JvbGxFbmQiLCJvVXRpbHMiLCJidXR0b25zIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJ3cmFwcGVyIiwic2Nyb2xsV2lkdGgiLCJ3cmFwcGVyV2lkdGgiLCJjbGllbnRXaWR0aCIsImNoZWNrQ3VycmVudFBvc2l0aW9uIiwiY3VycmVudFNlbGVjdGlvbiIsImN1cnJlbnRTZWxlY3Rpb25FbmQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJyaWdodCIsImRpZmYiLCJzY3JvbGxUbyIsInNjcm9sbGFibGUiLCJkaXJlY3Rpb24iLCJjbGFzc05hbWUiLCJtYXRjaCIsImRpc2FibGVkIiwic2Nyb2xsTGVmdCIsInJlbWFpbmluZyIsInNjcm9sbCIsImRpc3RhbmNlIiwidGhyb3R0bGUiLCJvbmNsaWNrIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2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T0FGRCxNQUVPO0FBQ0wsWUFBTUMsWUFBWWhCLGNBQWNDLFlBQWQsR0FBNkJGLFFBQVFnQixVQUF2RDtBQUNBO0FBQ0E1RixlQUFPMkYsUUFBUCxHQUFrQkUsYUFBYSxDQUEvQjtBQUNEO0FBQ0YsS0FSRDtBQVNEOztBQUVELFdBQVNDLE1BQVQsQ0FBZ0JoSixDQUFoQixFQUFtQjtBQUNqQixRQUFJaUosV0FBVyxHQUFmOztBQUVBLFFBQUlQLFVBQVUxSSxFQUFFdUMsYUFBWixNQUErQixNQUFuQyxFQUEyQztBQUN6QzBHLGlCQUNFLENBQUNuQixRQUFRZ0IsVUFBUixHQUFxQkcsUUFBckIsR0FBZ0NBLFFBQWhDLEdBQTJDbkIsUUFBUWdCLFVBQXBELElBQWtFLENBQUMsQ0FEckU7QUFFRCxLQUhELE1BR087QUFDTCxVQUFNQyxZQUFZaEIsY0FBY0MsWUFBZCxHQUE2QkYsUUFBUWdCLFVBQXZEO0FBQ0FHLGlCQUFXRixZQUFZRSxRQUFaLEdBQXVCQSxRQUF2QixHQUFrQ0YsU0FBN0M7QUFDRDs7QUFFRGpCLFlBQVFnQixVQUFSLEdBQXFCaEIsUUFBUWdCLFVBQVIsR0FBcUJHLFFBQTFDOztBQUVBUjtBQUNEOztBQUVEWCxVQUFRckcsZ0JBQVIsQ0FBeUIsUUFBekIsRUFBbUNrRyxPQUFPdUIsUUFBUCxDQUFnQlQsVUFBaEIsRUFBNEIsR0FBNUIsQ0FBbkM7QUFDQWpJLFNBQU9pQixnQkFBUCxDQUF3QixrQkFBeEIsRUFBNENnSCxVQUE1Qzs7QUFFQWIsVUFBUWhGLE9BQVIsQ0FBZ0Isa0JBQVU7QUFDeEJNLFdBQU9pRyxPQUFQLEdBQWlCSCxNQUFqQjtBQUNELEdBRkQ7O0FBSUFkO0FBQ0Q7O1FBRVF4RSxJLEdBQUFBLEk7cUJBQ00sRUFBRUEsVUFBRixFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vcHVibGljL2phdmFzY3JpcHQvbWFpbi5qc1wiKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzZDFjNTZlYTBhMmE2YzFlNzNkYSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX3RvZ2dsZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vZGlzdC9qcy90b2dnbGVcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgY29uc3RydWN0QWxsID0gKCkgPT4ge1xuICBfdG9nZ2xlLmRlZmF1bHQuaW5pdCgpO1xuXG4gIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xudmFyIF9kZWZhdWx0ID0gX3RvZ2dsZS5kZWZhdWx0O1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL28tdG9nZ2xlL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvby10b2dnbGUvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxuY2xhc3MgVGFyZ2V0IHtcbiAgY29uc3RydWN0b3IodG9nZ2xlKSB7XG4gICAgdGhpcy50YXJnZXRFbCA9IHRvZ2dsZS50YXJnZXRFbDtcbiAgICB0aGlzLnRvZ2dsZXMgPSBbXTtcbiAgfVxuXG4gIGFkZFRvZ2dsZSh0b2dnbGUpIHtcbiAgICB0aGlzLnRvZ2dsZXMucHVzaCh0b2dnbGUpO1xuICB9XG5cbiAgcmVtb3ZlVG9nZ2xlKHRvZ2dsZSkge1xuICAgIHZhciB0b2dnbGVQb3NpdGlvbiA9IHRoaXMudG9nZ2xlcy5pbmRleE9mKHRvZ2dsZSk7XG4gICAgdGhpcy50b2dnbGVzID0gdGhpcy50b2dnbGVzLnNsaWNlKDAsIHRvZ2dsZVBvc2l0aW9uKS5jb25jYXQodGhpcy50b2dnbGVzLnNsaWNlKHRvZ2dsZVBvc2l0aW9uICsgMSkpO1xuXG4gICAgaWYgKHRoaXMudG9nZ2xlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIElmIHRoYXQgd2FzIHRoZSBsYXN0L29ubHkgdG9nZ2xlIHRoYXQgY29udHJvbGxlZCB0aGlzIHRhcmdldCB0aGVuIGVuc3VyZVxuICAgICAgLy8gdGhpcyB0YXJnZXQgaXMgb3BlbiBzbyBpdCBkb2Vzbid0IGdldCBzdHVjayBpbiB0aGUgY2xvc2VkIHBvc2l0aW9uXG4gICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHRoaXMudGFyZ2V0RWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuICAgIHRoaXMudGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgnby10b2dnbGUtLWFjdGl2ZScpOyAvLyBTZXQgZXZlcnkgdG9nZ2xlIHRoYXQgY29udHJvbHMgdGhpcyB0YXJnZXQgdG8gYmUgb3BlblxuXG4gICAgdGhpcy50b2dnbGVzLmZvckVhY2godG9nZ2xlID0+IHtcbiAgICAgIHRvZ2dsZS5vcGVuKCk7XG4gICAgfSk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLnRhcmdldEVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIHRoaXMudGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZSgnby10b2dnbGUtLWFjdGl2ZScpOyAvLyBTZXQgZXZlcnkgdG9nZ2xlIHRoYXQgY29udHJvbHMgdGhpcyB0YXJnZXQgdG8gYmUgY2xvc2VkXG5cbiAgICB0aGlzLnRvZ2dsZXMuZm9yRWFjaCh0b2dnbGUgPT4ge1xuICAgICAgdG9nZ2xlLmNsb3NlKCk7XG4gICAgfSk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgaWYgKHRoaXMuaXNPcGVuKCkpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICB9XG5cbiAgaXNPcGVuKCkge1xuICAgIHJldHVybiB0aGlzLnRhcmdldEVsLmNsYXNzTGlzdC5jb250YWlucygnby10b2dnbGUtLWFjdGl2ZScpO1xuICB9XG5cbn1cblxudmFyIF9kZWZhdWx0ID0gVGFyZ2V0O1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL28tdG9nZ2xlL2Rpc3QvanMvdGFyZ2V0LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL28tdG9nZ2xlL2Rpc3QvanMvdGFyZ2V0LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX3RhcmdldCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdGFyZ2V0XCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuY2xhc3MgVG9nZ2xlIHtcbiAgY29uc3RydWN0b3IodG9nZ2xlRWwsIGNvbmZpZykge1xuICAgIGlmICghVG9nZ2xlLl90YXJnZXRzKSB7XG4gICAgICBUb2dnbGUuX3RhcmdldHMgPSBuZXcgTWFwKCk7XG4gICAgfVxuXG4gICAgaWYgKCF0b2dnbGVFbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoISh0b2dnbGVFbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgdG9nZ2xlRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRvZ2dsZUVsKTtcbiAgICB9XG5cbiAgICBpZiAodG9nZ2xlRWwuaGFzQXR0cmlidXRlKCdkYXRhLW8tdG9nZ2xlLS1qcycpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcpIHtcbiAgICAgIGNvbmZpZyA9IHt9OyAvLyBUcnkgdG8gZ2V0IGNvbmZpZyBzZXQgZGVjbGFyYXRpdmVseSBvbiB0aGUgZWxlbWVudFxuXG4gICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHRvZ2dsZUVsLmF0dHJpYnV0ZXMsIGF0dHIgPT4ge1xuICAgICAgICBpZiAoYXR0ci5uYW1lLmluZGV4T2YoJ2RhdGEtby10b2dnbGUnKSA9PT0gMCkge1xuICAgICAgICAgIC8vIFJlbW92ZSB0aGUgcHJlZml4IHBhcnQgb2YgdGhlIGRhdGEgYXR0cmlidXRlIG5hbWVcbiAgICAgICAgICB2YXIga2V5ID0gYXR0ci5uYW1lLnJlcGxhY2UoJ2RhdGEtby10b2dnbGUtJywgJycpO1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIElmIGl0J3MgYSBKU09OLCBhIGJvb2xlYW4gb3IgYSBudW1iZXIsIHdlIHdhbnQgaXQgc3RvcmVkIGxpa2UgdGhhdCwgYW5kIG5vdCBhcyBhIHN0cmluZ1xuICAgICAgICAgICAgLy8gV2UgYWxzbyByZXBsYWNlIGFsbCAnIHdpdGggXCIgc28gSlNPTiBzdHJpbmdzIGFyZSBwYXJzZWQgY29ycmVjdGx5XG4gICAgICAgICAgICBjb25maWdba2V5XSA9IEpTT04ucGFyc2UoYXR0ci52YWx1ZS5yZXBsYWNlKC9cXCcvZywgJ1wiJykpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbmZpZ1trZXldID0gYXR0ci52YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gLy8gU2V0IHRoZSB0b2dnbGUgY2FsbGJhY2sgaWYgaXRzIGEgc3RyaW5nLlxuXG5cbiAgICBpZiAoY29uZmlnLmNhbGxiYWNrICYmIHR5cGVvZiBjb25maWcuY2FsbGJhY2sgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBFcnJvciBpZiB0aGUgY2FsbGJhY2sgaXMgYSBzdHJpbmcgYW5kIGEgZ2xvYmFsIGZ1bmN0aW9uIG9mIHRoYXQgbmFtZSBkb2VzIG5vdCBleGlzdC5cbiAgICAgIGlmICh0eXBlb2Ygd2luZG93W2NvbmZpZy5jYWxsYmFja10gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgby10b2dnbGUgY2FsbGJhY2sgXFxcIlwiLmNvbmNhdChjb25maWcuY2FsbGJhY2ssIFwiXFxcIi5cIikpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNhbGxiYWNrID0gd2luZG93W2NvbmZpZy5jYWxsYmFja107XG4gICAgfSAvLyBTZXQgdGhlIHRvZ2dsZSBjYWxsYmFjayBpZiBpdHMgYSBmdW5jaXRvbi5cblxuXG4gICAgaWYgKGNvbmZpZy5jYWxsYmFjayAmJiB0eXBlb2YgY29uZmlnLmNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLmNhbGxiYWNrID0gY29uZmlnLmNhbGxiYWNrO1xuICAgIH0gLy8gRXJyb3IgaWYgc29tZSBjYWxsYmFjayB2YWx1ZSBoYXMgYmVlbiBnaXZlbiBidXQgaGFzIG5vdCBiZWVuIHNldC5cblxuXG4gICAgaWYgKGNvbmZpZy5jYWxsYmFjayAmJiAhdGhpcy5jYWxsYmFjaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIG8tdG9nZ2xlIGNhbGxiYWNrIG11c3QgYmUgYSBzdHJpbmcgb3IgZnVuY3Rpb24uXCIpO1xuICAgIH0gLy8gU2V0IHRoZSB0b2dnbGUgZWxlbWVudC5cblxuXG4gICAgdGhpcy50b2dnbGVFbCA9IHRvZ2dsZUVsO1xuXG4gICAgaWYgKHRoaXMudG9nZ2xlRWwubm9kZU5hbWUgPT09ICdBJykge1xuICAgICAgdGhpcy50b2dnbGVFbC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnYnV0dG9uJyk7XG4gICAgfVxuXG4gICAgdGhpcy50b2dnbGUgPSB0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMudG9nZ2xlRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZSk7XG4gICAgdGhpcy50b2dnbGVFbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtby10b2dnbGUtLWpzJywgJ3RydWUnKTtcbiAgICB0aGlzLnRhcmdldEVsID0gY29uZmlnLnRhcmdldDtcblxuICAgIGlmICghKHRoaXMudGFyZ2V0RWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgIHRoaXMudGFyZ2V0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMudGFyZ2V0RWwpO1xuICAgIH1cblxuICAgIGlmIChUb2dnbGUuX3RhcmdldHMuZ2V0KHRoaXMudGFyZ2V0RWwpID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMudGFyZ2V0ID0gbmV3IFRvZ2dsZS5UYXJnZXQodGhpcyk7XG5cbiAgICAgIFRvZ2dsZS5fdGFyZ2V0cy5zZXQodGhpcy50YXJnZXRFbCwgdGhpcy50YXJnZXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRhcmdldCA9IFRvZ2dsZS5fdGFyZ2V0cy5nZXQodGhpcy50YXJnZXRFbCk7XG4gICAgfVxuXG4gICAgdGhpcy50YXJnZXQuYWRkVG9nZ2xlKHRoaXMpO1xuICAgIHRoaXMudGFyZ2V0LmNsb3NlKCk7XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHRoaXMudG9nZ2xlRWwuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMudG9nZ2xlRWwuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gIH0gLy8gdG9nZ2xlIGlzIGJvdW5kIHRvIHRoZSBUb2dnbGUgaW5zdGFuY2UgaW4gdGhlIGNvbnN0cnVjdG9yXG5cblxuICB0b2dnbGUoZSkge1xuICAgIHRoaXMudGFyZ2V0LnRvZ2dsZSgpO1xuXG4gICAgaWYgKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jYWxsYmFjaykge1xuICAgICAgdmFyIHN0YXRlTmFtZSA9IHRoaXMudGFyZ2V0LmlzT3BlbigpID8gJ29wZW4nIDogJ2Nsb3NlJztcbiAgICAgIHRoaXMuY2FsbGJhY2soc3RhdGVOYW1lLCBlKTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMudG9nZ2xlRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZSk7XG4gICAgdGhpcy50b2dnbGVFbC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKTtcbiAgICB0aGlzLnRvZ2dsZUVsLnJlbW92ZUF0dHJpYnV0ZSgncm9sZScpO1xuICAgIHRoaXMudG9nZ2xlRWwucmVtb3ZlQXR0cmlidXRlKCdkYXRhLW8tdG9nZ2xlLS1qcycpO1xuICAgIHRoaXMudGFyZ2V0LnJlbW92ZVRvZ2dsZSh0aGlzKTtcbiAgICB0aGlzLnRhcmdldCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnRvZ2dsZUVsID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBzdGF0aWMgaW5pdChlbCwgY29uZmlnKSB7XG4gICAgaWYgKCFlbCkge1xuICAgICAgZWwgPSBkb2N1bWVudC5ib2R5O1xuICAgIH0gZWxzZSBpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKTtcbiAgICB9XG5cbiAgICB2YXIgdG9nZ2xlRWxzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtby1jb21wb25lbnQ9XCJvLXRvZ2dsZVwiXScpO1xuICAgIHZhciB0b2dnbGVzID0gW107XG5cbiAgICBmb3IgKHZhciB0b2dnbGVFbCBvZiB0b2dnbGVFbHMpIHtcbiAgICAgIGlmICghdG9nZ2xlRWwuaGFzQXR0cmlidXRlKCdkYXRhLW8tdG9nZ2xlLS1qcycpKSB7XG4gICAgICAgIHRvZ2dsZXMucHVzaChuZXcgVG9nZ2xlKHRvZ2dsZUVsLCBjb25maWcpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdG9nZ2xlcztcbiAgfVxuXG59XG5cblRvZ2dsZS5UYXJnZXQgPSBfdGFyZ2V0LmRlZmF1bHQ7XG52YXIgX2RlZmF1bHQgPSBUb2dnbGU7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvby10b2dnbGUvZGlzdC9qcy90b2dnbGUuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvby10b2dnbGUvZGlzdC9qcy90b2dnbGUuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlYm91bmNlID0gZGVib3VuY2U7XG5leHBvcnRzLnRocm90dGxlID0gdGhyb3R0bGU7XG5cbi8qKlxuKlxuKiBEZWJvdW5jZXMgZnVuY3Rpb24gc28gaXQgaXMgb25seSBjYWxsZWQgYWZ0ZXIgbiBtaWxsaXNlY29uZHNcbiogd2l0aG91dCBpdCBub3QgYmVpbmcgY2FsbGVkXG4qXG4qIEBleGFtcGxlXG4qIFV0aWxzLmRlYm91bmNlKG15RnVuY3Rpb24oKSB7fSwgMTAwKTtcbipcbiogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIEZ1bmN0aW9uIHRvIGJlIGRlYm91bmNlZFxuKiBAcGFyYW0ge251bWJlcn0gd2FpdCAtIFRpbWUgaW4gbWlsaXNlY29uZHNcbipcbiogQHJldHVybnMge0Z1bmN0aW9ufSAtIERlYm91bmNlZCBmdW5jdGlvblxuKi9cbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQpIHtcbiAgbGV0IHRpbWVvdXQ7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgYXJncyA9IGFyZ3VtZW50cztcblxuICAgIGNvbnN0IGxhdGVyID0gKCkgPT4ge1xuICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH07XG5cbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuICB9O1xufVxuLyoqXG4qXG4qIFRocm90dGxlIGZ1bmN0aW9uIHNvIGl0IGlzIG9ubHkgY2FsbGVkIG9uY2UgZXZlcnkgbiBtaWxsaXNlY29uZHNcbipcbiogQGV4YW1wbGVcbiogVXRpbHMudGhyb3R0bGUobXlGdW5jdGlvbigpIHt9LCAxMDApO1xuKlxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gRnVuY3Rpb24gdG8gYmUgdGhyb3R0bGVkXG4qIEBwYXJhbSB7bnVtYmVyfSB3YWl0IC0gVGltZSBpbiBtaWxpc2Vjb25kc1xuKlxuKiBAcmV0dXJucyB7RnVuY3Rpb259IC0gVGhyb3R0bGVkIGZ1bmN0aW9uXG4qL1xuXG5cbmZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIHdhaXQpIHtcbiAgbGV0IHRpbWVvdXQ7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgY29uc3QgbGF0ZXIgPSAoKSA9PiB7XG4gICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgIGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfTtcblxuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgfTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL28tdXRpbHMvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9vLXV0aWxzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgVG9nZ2xlID0gcmVxdWlyZShcIkBmaW5hbmNpYWwtdGltZXMvby10b2dnbGVcIik7XG5cbmNvbnN0IExJU1RFTl9ERUxBWSA9IDMwMDtcbmNvbnN0IElOVEVOVF9ERUxBWSA9IDEwMDA7XG5cbmZ1bmN0aW9uIGhhbmRsZUNsb3NlRXZlbnRzKHNjb3BlLCBjYWxsYmFjaywgYWxsRm9jdXNhYmxlKSB7XG4gIGxldCB0aW1lb3V0O1xuXG4gIGNvbnN0IGhhbmRsZUtleWRvd24gPSBlID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAyNykge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2xpY2sgPSBlID0+IHtcbiAgICBpZiAoIXNjb3BlLmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTW91c2VlbnRlciA9ICgpID0+IHtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTW91c2VsZWF2ZSA9ICgpID0+IHtcbiAgICAvLyBJRSAxMSBtb2JpbGUgZmlyZXMgYSBtb3VzZWxlYXZlIGV2ZW50IHdoZW4gdGhlIHNlYXJjaCBib3ggZ2V0cyBmb2N1cy4gVGhpcyBtZWFucyB3aGVuIHRoZSB1c2VyIHRyaWVzXG4gICAgLy8gdG8gdXNlIHRoZSBzZWFyY2ggYm94LCBpdCBkaXNhcHBlYXJzIGJlY2F1c2UgdGhlIGRyYXdlciBjbG9zZXMuXG4gICAgLy8gTW91c2VvdXQgZXZlbnRzIHNob3VsZCBvbmx5IG9jY3VyIHdoZW4gdGhlIGRyYXdlciB0YWtlcyB1cCBsZXNzIHRoYW4gMTAwJSBvZiB0aGUgd2luZG93LCBzbyB3ZSBjYW4gaWdub3JlXG4gICAgLy8gYW55IGV2ZW50cyB0cmlnZ2VyZWQgaWYgdGhlIHdpZHRoIG9mIHRoZSBkcmF3ZXIgaXMgZXF1YWwgdG8gb3IgYmlnZ2VyIHRoYW4gdGhlIHdpbmRvdy5pbm5lcndpZHRoXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IHNjb3BlLm9mZnNldFdpZHRoKSB7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChjYWxsYmFjaywgSU5URU5UX0RFTEFZKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRm9jdXMgPSBlID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnJlbGF0ZWRUYXJnZXQgfHwgZS50YXJnZXQ7XG5cbiAgICBpZiAoIXNjb3BlLmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgIHNjb3BlLmZvY3VzKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVRhYiA9IGUgPT4ge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDkpIHtcbiAgICAgIGNvbnN0IGZpcnN0RWwgPSBhbGxGb2N1c2FibGVbMF07XG4gICAgICBjb25zdCBsYXN0RWwgPSBhbGxGb2N1c2FibGVbYWxsRm9jdXNhYmxlLmxlbmd0aCAtIDFdO1xuXG4gICAgICAvLyBLZWVwIGZvY3VzIHdpdGhpbiB0aGUgZHJhd2VyIHdoZW4gdGFiYmluZyBmb3IgYTExeSByZWFzb25zLlxuICAgICAgaWYgKCFlLnNoaWZ0S2V5ICYmIGUudGFyZ2V0ID09PSBsYXN0RWwpIHtcbiAgICAgICAgZmlyc3RFbC5mb2N1cygpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9IGVsc2UgaWYgKGUuc2hpZnRLZXkgJiYgZS50YXJnZXQgPT09IGZpcnN0RWwpIHtcbiAgICAgICAgLy8gbG9vcCB0byB0aGUgYm90dG9tIHdoZW4gc2hpZnQrdGFiYmluZy5cbiAgICAgICAgbGFzdEVsLmZvY3VzKCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlRXZlbnRzID0gKCkgPT4ge1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblxuICAgIHNjb3BlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGhhbmRsZU1vdXNlZW50ZXIpO1xuICAgIHNjb3BlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGhhbmRsZU1vdXNlbGVhdmUpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGljayk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlQ2xpY2spO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUtleWRvd24pO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c2luXCIsIGhhbmRsZUZvY3VzKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgaGFuZGxlRm9jdXMpO1xuICAgIHNjb3BlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZVRhYik7XG4gIH07XG5cbiAgY29uc3QgYWRkRXZlbnRzID0gKCkgPT4ge1xuICAgIHNjb3BlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGhhbmRsZU1vdXNlZW50ZXIpO1xuICAgIHNjb3BlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGhhbmRsZU1vdXNlbGVhdmUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGljayk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlQ2xpY2spO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUtleWRvd24pO1xuXG4gICAgLy8gRmlyZWZveCBkb2Vzbid0IHN1cHBvcnQgZm9jdXNpbiBvciBmb2N1c291dFxuICAgIC8vIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY4Nzc4N1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c2luXCIsIGhhbmRsZUZvY3VzKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgaGFuZGxlRm9jdXMpO1xuXG4gICAgc2NvcGUuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlVGFiKTtcbiAgfTtcblxuICByZXR1cm4geyBhZGRFdmVudHMsIHJlbW92ZUV2ZW50cywgaGFuZGxlTW91c2VsZWF2ZSB9O1xufVxuXG5mdW5jdGlvbiBhZGREcmF3ZXJUb2dnbGVzKGRyYXdlckVsLCBhbGxGb2N1c2FibGUpIHtcbiAgY29uc3QgY29udHJvbHMgPSBBcnJheS5mcm9tKFxuICAgIGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvckFsbChgW2FyaWEtY29udHJvbHM9XCIke2RyYXdlckVsLmlkfVwiXWApXG4gICk7XG5cbiAgbGV0IGhhbmRsZUNsb3NlO1xuICBsZXQgb3BlbmluZ0NvbnRyb2w7XG5cbiAgZnVuY3Rpb24gdG9nZ2xlQ2FsbGJhY2soc3RhdGUsIGUpIHtcbiAgICBpZiAoc3RhdGUgPT09IFwiY2xvc2VcIikge1xuICAgICAgdG9nZ2xlVGFiYmluZyhkcmF3ZXJFbCwgZmFsc2UsIGFsbEZvY3VzYWJsZSk7XG5cbiAgICAgIGhhbmRsZUNsb3NlLnJlbW92ZUV2ZW50cygpO1xuXG4gICAgICBvcGVuaW5nQ29udHJvbC5mb2N1cygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b2dnbGVUYWJiaW5nKGRyYXdlckVsLCB0cnVlLCBhbGxGb2N1c2FibGUpO1xuXG4gICAgICAvLyBkb24ndCBjYXB0dXJlIHRoZSBpbml0aWFsIGNsaWNrIG9yIGFjY2lkZW50YWwgZG91YmxlIHRhcHMgZXRjLlxuICAgICAgLy8gd2UgY291bGQgdXNlIHRyYW5zaXRpb25lbmQgYnV0IHNjb3BpbmcgaXMgdHJpY2t5IGFuZCBpdCBuZWVkcyBwcmVmaXhpbmcgYW5kLi4uXG4gICAgICBzZXRUaW1lb3V0KGhhbmRsZUNsb3NlLmFkZEV2ZW50cywgTElTVEVOX0RFTEFZKTtcblxuICAgICAgLy8gcmVjb3JkIHRoZSBvcGVuaW5nIGNvbnRyb2wgc28gd2UgY2FuIHNlbmQgZm9jdXMgYmFjayB0byBpdCB3aGVuIGNsb3NpbmcgdGhlIGRyYXdlclxuICAgICAgb3BlbmluZ0NvbnRyb2wgPSBlLmN1cnJlbnRUYXJnZXQ7XG5cbiAgICAgIC8vIGFyaWEtY29udHJvbHMgaXMgb25seSBzdXBwb3J0ZWQgYnkgSkFXUy5cbiAgICAgIC8vIEluIGEgc2V0VGltZW91dCBjYWxsYmFjayB0byBhdm9pZCBmbGlja2VyaW5nIHRyYW5zaXRpb25zIGluIENocm9tZSAodjU0KVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vIERvbid0IGZvY3VzIG9uIHRoZSBkcmF3ZXIgaXRzZWxmIG9yIGlPUyBWb2ljZU92ZXIgd2lsbCBtaXNzIGl0XG4gICAgICAgIC8vIEZvY3VzIG9uIHRoZSBmaXJzdCBmb2N1c2FibGUgZWxlbWVudFxuICAgICAgICBjb25zdCBmaXJzdEZvY3VzYWJsZSA9IGRyYXdlckVsLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgXCJhLCBidXR0b24sIGlucHV0LCBzZWxlY3RcIlxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChmaXJzdEZvY3VzYWJsZSkge1xuICAgICAgICAgIGZpcnN0Rm9jdXNhYmxlLmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZHJhd2VyRWwuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZHJhd2VyRWwuY2xhc3NMaXN0LnRvZ2dsZShcIm8taGVhZGVyX19kcmF3ZXItLWNsb3NpbmdcIiwgc3RhdGUgPT09IFwiY2xvc2VcIik7XG4gICAgZHJhd2VyRWwuY2xhc3NMaXN0LnRvZ2dsZShcIm8taGVhZGVyX19kcmF3ZXItLW9wZW5pbmdcIiwgc3RhdGUgPT09IFwib3BlblwiKTtcbiAgfVxuXG4gIGNvbnRyb2xzLmZvckVhY2goY29udHJvbCA9PiB7XG4gICAgY29uc3QgZHJhd2VyVG9nZ2xlID0gbmV3IFRvZ2dsZShjb250cm9sLCB7XG4gICAgICB0YXJnZXQ6IGRyYXdlckVsLFxuICAgICAgY2FsbGJhY2s6IHRvZ2dsZUNhbGxiYWNrXG4gICAgfSk7XG5cbiAgICAvLyBCb3RoIHRvZ2dsZXMgaGF2ZSB0aGUgc2FtZSB0YXJnZXQsIHNvIHRoZSB0b2dnbGUgZnVuY3Rpb24gd2lsbCBiZSB0aGUgc2FtZVxuICAgIC8vIElmIHRoZXJlJ3MgYSBzZXBhcmF0ZSBoYW5kbGVDbG9zZSBpbnN0YW5jZSBmb3IgZWFjaCB0b2dnbGUsIHJlbW92ZUV2ZW50cyBkb2Vzbid0IHdvcmtcbiAgICAvLyB3aGVuIHRoZSBjbG9zZSB0b2dnbGUgaXMgY2xpY2tlZFxuICAgIGlmICghaGFuZGxlQ2xvc2UpIHtcbiAgICAgIGhhbmRsZUNsb3NlID0gaGFuZGxlQ2xvc2VFdmVudHMoXG4gICAgICAgIGRyYXdlckVsLFxuICAgICAgICBkcmF3ZXJUb2dnbGUudG9nZ2xlLFxuICAgICAgICBhbGxGb2N1c2FibGVcbiAgICAgICk7XG4gICAgfVxuICB9KTtcblxuICAvLyBtYWtlIHRoZSBkcmF3ZXIgcHJvZ3JhbW1hdGljYWxseSBmb2N1c2FibGVcbiAgZHJhd2VyRWwudGFiSW5kZXggPSAtMTtcbn1cblxuZnVuY3Rpb24gYWRkU3VibWVudVRvZ2dsZXMoZHJhd2VyRWwpIHtcbiAgY29uc3Qgc3VibWVudXMgPSBkcmF3ZXJFbC5xdWVyeVNlbGVjdG9yQWxsKCdbaWRePVwiby1oZWFkZXItZHJhd2VyLWNoaWxkLVwiXScpO1xuXG4gIEFycmF5LmZyb20oc3VibWVudXMpLmZvckVhY2goc3VibWVudSA9PiB7XG4gICAgY29uc3QgYnV0dG9uID0gZHJhd2VyRWwucXVlcnlTZWxlY3RvcihgW2FyaWEtY29udHJvbHM9XCIke3N1Ym1lbnUuaWR9XCJdYCk7XG5cbiAgICBzdWJtZW51LnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcblxuICAgIG5ldyBUb2dnbGUoYnV0dG9uLCB7XG4gICAgICB0YXJnZXQ6IHN1Ym1lbnUsXG4gICAgICBjYWxsYmFjazogc3RhdGUgPT4ge1xuICAgICAgICBidXR0b24udGV4dENvbnRlbnQgPSBidXR0b24udGV4dENvbnRlbnQucmVwbGFjZShcbiAgICAgICAgICAvZmV3ZXJ8bW9yZS8sXG4gICAgICAgICAgc3RhdGUgPT09IFwib3BlblwiID8gXCJmZXdlclwiIDogXCJtb3JlXCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgdG8gc29sdmUgYWNjZXNzaWJpbGl0eSBpc3N1ZVxuLy8gd2hlbiBvLWhlYWRlci1kcmF3ZXIgaXMgY2xvc2VkID0+IHRhYmJpbmcgaXMgZGlzYWJsZWQuXG4vLyB3aGVuIG8taGVhZGVyLWRyYXdlciBpcyBvcGVuID0+IHRhYmJpbmcgaXMgZW5hYmxlZC5cbmZ1bmN0aW9uIHRvZ2dsZVRhYmJpbmcoZHJhd2VyRWwsIGlzRW5hYmxlZCwgYWxsRm9jdXNhYmxlKSB7XG4gIGlmIChpc0VuYWJsZWQpIHtcbiAgICBhbGxGb2N1c2FibGUuZm9yRWFjaChlbCA9PiB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBhbGxGb2N1c2FibGUuZm9yRWFjaChlbCA9PiB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIGNvbnN0IGRyYXdlckVsID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtby1oZWFkZXItZHJhd2VyXVwiKTtcbiAgZGVidWdnZXI7XG5cbiAgaWYgKCFkcmF3ZXJFbCkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBhbGxGb2N1c2FibGUgPSBBcnJheS5mcm9tKFxuICAgIGRyYXdlckVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCJhLCBidXR0b24sIGlucHV0LCBzZWxlY3RcIilcbiAgKTtcbiAgdG9nZ2xlVGFiYmluZyhkcmF3ZXJFbCwgZmFsc2UsIGFsbEZvY3VzYWJsZSk7XG4gIGFkZFN1Ym1lbnVUb2dnbGVzKGRyYXdlckVsKTtcbiAgYWRkRHJhd2VyVG9nZ2xlcyhkcmF3ZXJFbCwgYWxsRm9jdXNhYmxlKTtcblxuICAvLyBXcmFwIGluIGEgdGltZW91dCB0byBzdG9wIHBhZ2UgbG9hZCBzdGFsbCBpbiBDaHJvbWUgdjczIG9uIEFuZHJvaWRcbiAgLy8gdG9nZ2xlVGFiYmluZyBhbmQgdGhlIHJlbW92YWwgb2YgdGhlIG5vLWpzIGF0dHJpYnV0ZSBzcGlrZXMgdGhlIENQVVxuICAvLyBhbmQgY2F1c2VzIHRoZSBtYWluIHByb2Nlc3MgdG8gYmxvY2sgZm9yIGFyb3VuZCAxMCBzZWNvbmRzLlxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBkcmF3ZXJFbC5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLW8taGVhZGVyLWRyYXdlci0tbm8tanNcIik7XG4gICAgZHJhd2VyRWwuc2V0QXR0cmlidXRlKFwiZGF0YS1vLWhlYWRlci1kcmF3ZXItLWpzXCIsIFwidHJ1ZVwiKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHsgaW5pdCwgaGFuZGxlQ2xvc2VFdmVudHMgfTtcbmV4cG9ydCB7IGluaXQsIGhhbmRsZUNsb3NlRXZlbnRzIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvamF2YXNjcmlwdC9kcmF3ZXIuanMiLCJpbXBvcnQgc2VhcmNoIGZyb20gXCIuL3NlYXJjaFwiO1xuaW1wb3J0IG1lZ2EgZnJvbSBcIi4vbWVnYVwiO1xuaW1wb3J0IGRyYXdlciBmcm9tIFwiLi9kcmF3ZXJcIjtcbmltcG9ydCBzdWJuYXYgZnJvbSBcIi4vc3VibmF2XCI7XG5pbXBvcnQgc3RpY2t5IGZyb20gXCIuL3N0aWNreVwiO1xuXG5jbGFzcyBIZWFkZXIge1xuICBjb25zdHJ1Y3RvcihoZWFkZXJFbCkge1xuICAgIGlmICghaGVhZGVyRWwpIHtcbiAgICAgIGhlYWRlckVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtby1jb21wb25lbnQ9XCJvLWhlYWRlclwiXScpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGhlYWRlckVsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBoZWFkZXJFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaGVhZGVyRWwpO1xuICAgIH1cblxuICAgIGlmIChoZWFkZXJFbC5oYXNBdHRyaWJ1dGUoXCJkYXRhLW8taGVhZGVyLS1qc1wiKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaGVhZGVyRWwgPSBoZWFkZXJFbDtcblxuICAgIHNlYXJjaC5pbml0KHRoaXMuaGVhZGVyRWwpO1xuICAgIG1lZ2EuaW5pdCh0aGlzLmhlYWRlckVsKTtcbiAgICBkcmF3ZXIuaW5pdCh0aGlzLmhlYWRlckVsKTtcbiAgICBzdWJuYXYuaW5pdCh0aGlzLmhlYWRlckVsKTtcbiAgICBzdGlja3kuaW5pdCh0aGlzLmhlYWRlckVsKTtcblxuICAgIHRoaXMuaGVhZGVyRWwucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1vLWhlYWRlci0tbm8tanNcIik7XG4gICAgdGhpcy5oZWFkZXJFbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLW8taGVhZGVyLS1qc1wiLCBcIlwiKTtcbiAgfVxuXG4gIHN0YXRpYyBpbml0KHJvb3RFbCkge1xuICAgIGlmICghcm9vdEVsKSB7XG4gICAgICByb290RWwgPSBkb2N1bWVudC5ib2R5O1xuICAgIH1cbiAgICBpZiAoIShyb290RWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgIHJvb3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iocm9vdEVsKTtcbiAgICB9XG4gICAgaWYgKC9cXGJvLWhlYWRlclxcYi8udGVzdChyb290RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1vLWNvbXBvbmVudFwiKSkpIHtcbiAgICAgIHJldHVybiBuZXcgSGVhZGVyKHJvb3RFbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtdLm1hcFxuICAgICAgLmNhbGwocm9vdEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW8tY29tcG9uZW50PVwiby1oZWFkZXJcIl0nKSwgZWwgPT4ge1xuICAgICAgICBpZiAoIWVsLmhhc0F0dHJpYnV0ZShcImRhdGEtby1oZWFkZXItLWpzXCIpKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBIZWFkZXIoZWwpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmZpbHRlcihoZWFkZXIgPT4ge1xuICAgICAgICByZXR1cm4gaGVhZGVyICE9PSB1bmRlZmluZWQ7XG4gICAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBIZWFkZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvamF2YXNjcmlwdC9oZWFkZXIuanMiLCJpbXBvcnQgSGVhZGVyIGZyb20gXCIuL2hlYWRlclwiO1xuXG5jb25zdCBjb25zdHJ1Y3RBbGwgPSAoKSA9PiB7XG4gIEhlYWRlci5pbml0KCk7XG4gIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJvLkRPTUNvbnRlbnRMb2FkZWRcIiwgY29uc3RydWN0QWxsKTtcbn07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJvLkRPTUNvbnRlbnRMb2FkZWRcIiwgY29uc3RydWN0QWxsKTtcblxuZXhwb3J0IGRlZmF1bHQgSGVhZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2phdmFzY3JpcHQvbWFpbi5qcyIsImNvbnN0IElOVEVOVF9FTlRFUiA9IDMwMDtcbmNvbnN0IElOVEVOVF9MRUFWRSA9IDQwMDtcblxuY29uc3QgZXhwYW5kZWQgPSBbXTtcblxuZnVuY3Rpb24gYWRkRXZlbnRzIChwYXJlbnQsIG1lbnUpIHtcblx0bGV0IHRpbWVvdXQ7XG5cblx0cGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG5cdFx0aWYgKGlzT3BlbihtZW51KSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdGlmIChleHBhbmRlZC5sZW5ndGgpIHtcblx0XHRcdFx0aGlkZShleHBhbmRlZFswXSk7XG5cdFx0XHRcdHNob3cobWVudSwgZmFsc2UpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2hvdyhtZW51LCB0cnVlKTtcblx0XHRcdH1cblx0XHR9LCBJTlRFTlRfRU5URVIpO1xuXHR9KTtcblxuXHRwYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gaXNPcGVuKG1lbnUpICYmIGhpZGUobWVudSksIElOVEVOVF9MRUFWRSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBpc09wZW4gKG1lbnUpIHtcblx0cmV0dXJuIGV4cGFuZGVkLmluZGV4T2YobWVudSkgIT09IC0xO1xufVxuXG5mdW5jdGlvbiBzaG93IChtZW51LCBhbmltYXRlKSB7XG5cdGlmIChhbmltYXRlKSB7XG5cdFx0bWVudS5jbGFzc0xpc3QuYWRkKCdvLWhlYWRlcl9fbWVnYS0tYW5pbWF0aW9uJyk7XG5cdH1cblxuXHRtZW51LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblx0bWVudS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuXG5cdG1lbnUuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ29IZWFkZXIuTWVnYU1lbnVTaG93JywgeyBidWJibGVzOiB0cnVlIH0pKTtcblxuXHRleHBhbmRlZC5wdXNoKG1lbnUpO1xufVxuXG5mdW5jdGlvbiBoaWRlIChtZW51KSB7XG5cdG1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnby1oZWFkZXJfX21lZ2EtLWFuaW1hdGlvbicpO1xuXHRtZW51LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXHRtZW51LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuXG5cdG1lbnUuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ29IZWFkZXIuTWVnYU1lbnVIaWRlJywgeyBidWJibGVzOiB0cnVlIH0pKTtcblxuXHRleHBhbmRlZC5zcGxpY2UoZXhwYW5kZWQuaW5kZXhPZihtZW51KSwgMSk7XG59XG5cbmZ1bmN0aW9uIGluaXQgKGhlYWRlckVsKSB7XG5cdGNvbnN0IG1lbnVzID0gQXJyYXkuZnJvbShoZWFkZXJFbC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1vLWhlYWRlci1tZWdhXScpKTtcblx0Y29uc3QgcGFyZW50cyA9IG1lbnVzLm1hcChtZW51ID0+IG1lbnUucGFyZW50Tm9kZSk7XG5cblx0bWVudXMuZm9yRWFjaChtZW51ID0+IHtcblx0XHRtZW51LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXHRcdG1lbnUuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG5cdH0pO1xuXG5cdHBhcmVudHMuZm9yRWFjaCgocGFyZW50LCBpKSA9PiBhZGRFdmVudHMocGFyZW50LCBtZW51c1tpXSkpO1xufVxuXG5leHBvcnQgeyBpbml0LCBzaG93LCBoaWRlIH07XG5leHBvcnQgZGVmYXVsdCB7IGluaXQsIHNob3csIGhpZGUgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qYXZhc2NyaXB0L21lZ2EuanMiLCJjb25zdCBUb2dnbGUgPSByZXF1aXJlKFwiQGZpbmFuY2lhbC10aW1lcy9vLXRvZ2dsZVwiKTtcblxuZnVuY3Rpb24gaW5pdChoZWFkZXJFbCkge1xuICBjb25zdCB0YXJnZXQgPSBoZWFkZXJFbC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtby1oZWFkZXItc2VhcmNoXVwiKTtcbiAgY29uc3QgY29udHJvbHMgPVxuICAgIHRhcmdldCAmJiBoZWFkZXJFbC5xdWVyeVNlbGVjdG9yQWxsKGBbYXJpYS1jb250cm9scz1cIiR7dGFyZ2V0LmlkfVwiXWApO1xuXG4gIGlmIChjb250cm9scyA9PT0gbnVsbCB8fCBjb250cm9scy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBvcGVuaW5nID0gW107XG5cbiAgY29uc3QgY2FsbGJhY2sgPSBmdW5jdGlvbihzdGF0ZSwgZSkge1xuICAgIGlmIChzdGF0ZSA9PT0gXCJvcGVuXCIpIHtcbiAgICAgIC8vIHJlY29yZCB0aGUgb3BlbmluZyBjb250cm9sXG4gICAgICBvcGVuaW5nLnB1c2goZS5jdXJyZW50VGFyZ2V0KTtcbiAgICAgIHRhcmdldC5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cInFcIl0nKS5mb2N1cygpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZS1mb2N1cyBvcGVuaW5nIGNvbnRyb2xcbiAgICAgIGlmIChvcGVuaW5nLmxlbmd0aCkge1xuICAgICAgICBvcGVuaW5nLnBvcCgpLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBjb250cm9scy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIG5ldyBUb2dnbGUoY29udHJvbHNbaV0sIHsgdGFyZ2V0LCBjYWxsYmFjayB9KTtcbiAgfVxufVxuXG5leHBvcnQgeyBpbml0IH07XG5leHBvcnQgZGVmYXVsdCB7IGluaXQgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qYXZhc2NyaXB0L3NlYXJjaC5qcyIsImNvbnN0IHsgZGVib3VuY2UgfSA9IHJlcXVpcmUoXCJAZmluYW5jaWFsLXRpbWVzL28tdXRpbHNcIik7XG5cbmZ1bmN0aW9uIGluaXQoaGVhZGVyRWwpIHtcbiAgaWYgKCFoZWFkZXJFbC5oYXNBdHRyaWJ1dGUoXCJkYXRhLW8taGVhZGVyLS1zdGlja3lcIikpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgdmlld3BvcnRPZmZzZXQ7XG4gIGxldCBsYXN0U2Nyb2xsRGVwdGg7XG4gIGxldCBsYXN0QW5pbWF0aW9uRnJhbWU7XG4gIGxldCBsYXN0U3RpY2t5U3RhdGU7XG5cbiAgZnVuY3Rpb24gaGFuZGxlRnJhbWUoKSB7XG4gICAgLy8gc3RpY2t5IGVsIHdpbGwgYXBwZWFyIHdoZW4gc2Nyb2xsZWQgZG93biBmcm9tIHBhZ2UgdG9wIHRvXG4gICAgLy8gKGFyYml0cmFyaWx5KSA+IGhhbGYgdGhlIHZpZXdwb3J0IGhlaWdodFxuICAgIGNvbnN0IHNjcm9sbERlcHRoID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxZO1xuICAgIGNvbnN0IGlzQWN0aXZlID0gc2Nyb2xsRGVwdGggPiB2aWV3cG9ydE9mZnNldDtcblxuICAgIGhlYWRlckVsLmNsYXNzTGlzdC50b2dnbGUoXCJvLWhlYWRlci0tc3RpY2t5LWFjdGl2ZVwiLCBpc0FjdGl2ZSk7XG5cbiAgICBpZiAoaXNBY3RpdmUgIT09IGxhc3RTdGlja3lTdGF0ZSkge1xuICAgICAgbGFzdFN0aWNreVN0YXRlID0gaXNBY3RpdmU7XG4gICAgICBoZWFkZXJFbC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJvSGVhZGVyLlN0aWNreVwiLCB7XG4gICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICBkZXRhaWw6IHsgaXNBY3RpdmUgfVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBhbGxvdyBhIGxpdHRsZSB3aWdnbGluZyByb29tIHNvIHdlIGRvbid0IGdldCB0b28gaGFzdHkgdG9nZ2xpbmcgdXAvZG93biBzdGF0ZVxuICAgIGlmIChNYXRoLmFicyhzY3JvbGxEZXB0aCAtIGxhc3RTY3JvbGxEZXB0aCkgPiAyMCkge1xuICAgICAgY29uc3QgaXNTY3JvbGxpbmdEb3duID0gbGFzdFNjcm9sbERlcHRoIDwgc2Nyb2xsRGVwdGg7XG4gICAgICBoZWFkZXJFbC5jbGFzc0xpc3QudG9nZ2xlKFxuICAgICAgICBcIm8taGVhZGVyLS1zdGlja3ktc2Nyb2xsLWRvd25cIixcbiAgICAgICAgaXNBY3RpdmUgJiYgaXNTY3JvbGxpbmdEb3duXG4gICAgICApO1xuICAgICAgaGVhZGVyRWwuY2xhc3NMaXN0LnRvZ2dsZShcbiAgICAgICAgXCJvLWhlYWRlci0tc3RpY2t5LXNjcm9sbC11cFwiLFxuICAgICAgICBpc0FjdGl2ZSAmJiAhaXNTY3JvbGxpbmdEb3duXG4gICAgICApO1xuICAgIH1cblxuICAgIGxhc3RTY3JvbGxEZXB0aCA9IHNjcm9sbERlcHRoO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnRMb29wKCkge1xuICAgIHZpZXdwb3J0T2Zmc2V0ID0gd2luZG93LmlubmVySGVpZ2h0IC8gMjtcblxuICAgIGxhc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgaGFuZGxlRnJhbWUoKTtcbiAgICAgIHN0YXJ0TG9vcCgpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RvcExvb3AoKSB7XG4gICAgaWYgKGxhc3RBbmltYXRpb25GcmFtZSkge1xuICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGxhc3RBbmltYXRpb25GcmFtZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsU3RhcnQoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgc2Nyb2xsU3RhcnQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGRlYm91bmNlZFNjcm9sbEVuZCk7XG4gICAgc3RhcnRMb29wKCk7XG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGxFbmQoKSB7XG4gICAgc3RvcExvb3AoKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBkZWJvdW5jZWRTY3JvbGxFbmQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHNjcm9sbFN0YXJ0KTtcbiAgfVxuXG4gIGNvbnN0IGRlYm91bmNlZFNjcm9sbEVuZCA9IGRlYm91bmNlKHNjcm9sbEVuZCwgMzAwKTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBzY3JvbGxTdGFydCk7XG5cbiAgaGFuZGxlRnJhbWUoKTtcbn1cblxuZXhwb3J0IHsgaW5pdCB9O1xuZXhwb3J0IGRlZmF1bHQgeyBpbml0IH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvamF2YXNjcmlwdC9zdGlja3kuanMiLCJjb25zdCBvVXRpbHMgPSByZXF1aXJlKFwiQGZpbmFuY2lhbC10aW1lcy9vLXV0aWxzXCIpO1xuXG5mdW5jdGlvbiBpbml0KGhlYWRlckVsKSB7XG4gIGNvbnN0IHN1Ym5hdiA9IGhlYWRlckVsLnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1vLWhlYWRlci1zdWJuYXZdXCIpO1xuXG4gIGlmIChzdWJuYXYgPT09IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBidXR0b25zID0gQXJyYXkuZnJvbShzdWJuYXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJidXR0b25cIikpO1xuICBjb25zdCB3cmFwcGVyID0gc3VibmF2LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1vLWhlYWRlci1zdWJuYXYtd3JhcHBlcl1cIik7XG5cbiAgbGV0IHNjcm9sbFdpZHRoO1xuICBsZXQgd3JhcHBlcldpZHRoID0gd3JhcHBlci5jbGllbnRXaWR0aDtcblxuICBmdW5jdGlvbiBjaGVja0N1cnJlbnRQb3NpdGlvbigpIHtcbiAgICBjb25zdCBjdXJyZW50U2VsZWN0aW9uID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yKFwiW2FyaWEtY3VycmVudF1cIik7XG4gICAgaWYgKGN1cnJlbnRTZWxlY3Rpb24pIHtcbiAgICAgIGxldCBjdXJyZW50U2VsZWN0aW9uRW5kID0gY3VycmVudFNlbGVjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5yaWdodDtcblxuICAgICAgLy9pZiB0aGUgY3VycmVudCBzZWxlY3Rpb24gaXMgd2lkZXIgdGhhbiB0aGUgZW5kIG9mIHRoZSB3cmFwcGVyXG4gICAgICBpZiAoY3VycmVudFNlbGVjdGlvbkVuZCA+IHdyYXBwZXJXaWR0aCkge1xuICAgICAgICAvLyBjaGVjayBieSBob3cgbXVjaFxuICAgICAgICBsZXQgZGlmZiA9IGN1cnJlbnRTZWxlY3Rpb25FbmQgLSB3cmFwcGVyV2lkdGg7XG4gICAgICAgIC8vIGlmIHRoZSBkaWZmZXJlbmNlIGlzIGdyZWF0ZXIgdGhhbiBoYWxmIG9mIHRoZSB3cmFwcGVyLCBzY3JvbGwgdG8gdGhlIGVuZCBvZiB0aGUgY3VycmVudCBzZWxlY3Rpb24uXG4gICAgICAgIGRpZmYgPSBkaWZmID4gd3JhcHBlcldpZHRoIC8gMiA/IGN1cnJlbnRTZWxlY3Rpb25FbmQgOiB3cmFwcGVyV2lkdGggLyAyO1xuXG4gICAgICAgIHdyYXBwZXIuc2Nyb2xsVG8oZGlmZiwgMCk7XG4gICAgICB9XG4gICAgfVxuICAgIHNjcm9sbGFibGUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpcmVjdGlvbihidXR0b24pIHtcbiAgICByZXR1cm4gYnV0dG9uLmNsYXNzTmFtZS5tYXRjaCgvbGVmdHxyaWdodC8pLnBvcCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsYWJsZSgpIHtcbiAgICBzY3JvbGxXaWR0aCA9IHdyYXBwZXIuc2Nyb2xsV2lkdGg7XG5cbiAgICBidXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgIGlmIChkaXJlY3Rpb24oYnV0dG9uKSA9PT0gXCJsZWZ0XCIpIHtcbiAgICAgICAgYnV0dG9uLmRpc2FibGVkID0gd3JhcHBlci5zY3JvbGxMZWZ0ID09PSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcmVtYWluaW5nID0gc2Nyb2xsV2lkdGggLSB3cmFwcGVyV2lkdGggLSB3cmFwcGVyLnNjcm9sbExlZnQ7XG4gICAgICAgIC8vIEFsbG93IGEgbGl0dGxlIGRpZmZlcmVuY2UgYXMgc2Nyb2xsV2lkdGggaXMgZmFzdCwgbm90IGFjY3VyYXRlLlxuICAgICAgICBidXR0b24uZGlzYWJsZWQgPSByZW1haW5pbmcgPD0gMTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbChlKSB7XG4gICAgbGV0IGRpc3RhbmNlID0gMTAwO1xuXG4gICAgaWYgKGRpcmVjdGlvbihlLmN1cnJlbnRUYXJnZXQpID09PSBcImxlZnRcIikge1xuICAgICAgZGlzdGFuY2UgPVxuICAgICAgICAod3JhcHBlci5zY3JvbGxMZWZ0ID4gZGlzdGFuY2UgPyBkaXN0YW5jZSA6IHdyYXBwZXIuc2Nyb2xsTGVmdCkgKiAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcmVtYWluaW5nID0gc2Nyb2xsV2lkdGggLSB3cmFwcGVyV2lkdGggLSB3cmFwcGVyLnNjcm9sbExlZnQ7XG4gICAgICBkaXN0YW5jZSA9IHJlbWFpbmluZyA+IGRpc3RhbmNlID8gZGlzdGFuY2UgOiByZW1haW5pbmc7XG4gICAgfVxuXG4gICAgd3JhcHBlci5zY3JvbGxMZWZ0ID0gd3JhcHBlci5zY3JvbGxMZWZ0ICsgZGlzdGFuY2U7XG5cbiAgICBzY3JvbGxhYmxlKCk7XG4gIH1cblxuICB3cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb1V0aWxzLnRocm90dGxlKHNjcm9sbGFibGUsIDEwMCkpO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm9WaWV3cG9ydC5yZXNpemVcIiwgc2Nyb2xsYWJsZSk7XG5cbiAgYnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgYnV0dG9uLm9uY2xpY2sgPSBzY3JvbGw7XG4gIH0pO1xuXG4gIGNoZWNrQ3VycmVudFBvc2l0aW9uKCk7XG59XG5cbmV4cG9ydCB7IGluaXQgfTtcbmV4cG9ydCBkZWZhdWx0IHsgaW5pdCB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2phdmFzY3JpcHQvc3VibmF2LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==