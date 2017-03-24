'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _defaultStyles = require('./defaultStyles');

var _defaultStyles2 = _interopRequireDefault(_defaultStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * Copyright (c) 2017 Ken Hibino.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * Licensed under the MIT License (MIT).
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * See https://kenny-hibino.github.io/react-places-autocomplete
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var PlacesAutocompleteWithTypeAhead = function (_Component) {
  _inherits(PlacesAutocompleteWithTypeAhead, _Component);

  function PlacesAutocompleteWithTypeAhead(props) {
    _classCallCheck(this, PlacesAutocompleteWithTypeAhead);

    var _this = _possibleConstructorReturn(this, (PlacesAutocompleteWithTypeAhead.__proto__ || Object.getPrototypeOf(PlacesAutocompleteWithTypeAhead)).call(this, props));

    _this.state = {
      autocompleteItems: [],
      firstSuggestion: '',
      userTypedValue: '',
      shouldTypeAhead: true
    };

    _this.autocompleteCallback = _this.autocompleteCallback.bind(_this);
    _this.handleInputKeyDown = _this.handleInputKeyDown.bind(_this);
    _this.handleInputChange = _this.handleInputChange.bind(_this);
    return _this;
  }

  _createClass(PlacesAutocompleteWithTypeAhead, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.autocompleteOK = google.maps.places.PlacesServiceStatus.OK;
      this.autocompleteZeroResult = google.maps.places.PlacesServiceStatus.ZERO_RESULTS;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _state = this.state,
          firstSuggestion = _state.firstSuggestion,
          userTypedValue = _state.userTypedValue;


      if (userTypedValue.length < prevState.userTypedValue.length) {
        return; // noop
      }

      if (this.shouldSoftAutcomplete()) {
        this.refs.inputField.setSelectionRange(userTypedValue.length, firstSuggestion.length);
      }
    }
  }, {
    key: 'autocompleteCallback',
    value: function autocompleteCallback(predictions, status) {
      var _this2 = this;

      if (status === this.autocompleteZeroResult) {
        this.setState({
          autocompleteItems: [],
          firstSuggestion: ''
        });
        return;
      }

      if (status != this.autocompleteOK) {
        this.props.onError(status);
        if (this.props.clearItemsOnError) {
          this.clearAutocomplete();
        }
        return;
      }

      this.setState({
        autocompleteItems: predictions.map(function (p, idx) {
          return {
            suggestion: p.description,
            placeId: p.place_id,
            active: false,
            index: idx,
            formattedSuggestion: _this2.formattedSuggestion(p.structured_formatting)
          };
        }),
        firstSuggestion: predictions[0].description
      });

      this.updateInputValue();
    }
  }, {
    key: 'formattedSuggestion',
    value: function formattedSuggestion(structured_formatting) {
      return { mainText: structured_formatting.main_text, secondaryText: structured_formatting.secondary_text };
    }
  }, {
    key: 'clearAutocomplete',
    value: function clearAutocomplete() {
      this.setState({ autocompleteItems: [] });
    }
  }, {
    key: 'selectAddress',
    value: function selectAddress(address, placeId) {
      this.clearAutocomplete();
      this.handleSelect(address, placeId);
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(address, placeId) {
      this.props.onSelect ? this.props.onSelect(address, placeId) : this.props.onChange(address);
    }
  }, {
    key: 'handleAutocompleteItemMouseDown',
    value: function handleAutocompleteItemMouseDown(address, placeId) {
      this.selectAddress(address, placeId);
      this.setState({
        userTypedValue: address
      });
    }
  }, {
    key: 'getActiveItem',
    value: function getActiveItem() {
      return this.state.autocompleteItems.find(function (item) {
        return item.active;
      });
    }
  }, {
    key: 'selectActiveItemAtIndex',
    value: function selectActiveItemAtIndex(index) {
      var activeName = this.state.autocompleteItems.find(function (item) {
        return item.index === index;
      }).suggestion;
      this.setActiveItemAtIndex(index);
      this.props.onChange(activeName);
      this.setState({ userTypedValue: activeName });
    }
  }, {
    key: 'handleEnterKey',
    value: function handleEnterKey() {
      var activeItem = this.getActiveItem();
      if (activeItem === undefined) {
        this.handleEnterKeyWithoutActiveItem();
      } else {
        this.selectAddress(activeItem.suggestion, activeItem.placeId);
      }

      this.refs.inputField.focus();
      this.refs.inputField.setSelectionRange(0, 0);
      this.setState({
        userTypedValue: this.props.value
      });
    }
  }, {
    key: 'handleEnterKeyWithoutActiveItem',
    value: function handleEnterKeyWithoutActiveItem() {
      if (this.props.onEnterKeyDown) {
        this.props.onEnterKeyDown(this.props.value);
        this.clearAutocomplete();
      } else {
        return; //noop
      }
    }
  }, {
    key: 'handleDownKey',
    value: function handleDownKey() {
      var activeItem = this.getActiveItem();
      if (activeItem === undefined) {
        this.selectActiveItemAtIndex(0);
      } else {
        var nextIndex = (activeItem.index + 1) % this.state.autocompleteItems.length;
        this.selectActiveItemAtIndex(nextIndex);
      }
    }
  }, {
    key: 'handleUpKey',
    value: function handleUpKey() {
      var activeItem = this.getActiveItem();
      if (activeItem === undefined) {
        this.selectActiveItemAtIndex(this.state.autocompleteItems.length - 1);
      } else {
        var prevIndex = void 0;
        if (activeItem.index === 0) {
          prevIndex = this.state.autocompleteItems.length - 1;
        } else {
          prevIndex = (activeItem.index - 1) % this.state.autocompleteItems.length;
        }
        this.selectActiveItemAtIndex(prevIndex);
      }
    }
  }, {
    key: 'handleDeleteKey',
    value: function handleDeleteKey() {
      var _state2 = this.state,
          userTypedValue = _state2.userTypedValue,
          firstSuggestion = _state2.firstSuggestion;

      if (userTypedValue.length === 0) {
        return; // noop
      }
      var selectionString = window.getSelection().toString();
      var cursorPosition = this.refs.inputField.selectionStart;
      var isPlainBackSpace = selectionString === firstSuggestion.replace(userTypedValue, '') || selectionString.length === 0;

      if (isPlainBackSpace) {
        this.setState({
          userTypedValue: userTypedValue.slice(0, cursorPosition - 1) + userTypedValue.slice(cursorPosition, userTypedValue.length),
          shouldTypeAhead: false,
          firstSuggestion: ''
        });
      } else {
        this.setState({
          userTypedValue: this.props.value.replace(selectionString, ''),
          shouldTypeAhead: false,
          firstSuggestion: ''
        });
      }
    }
  }, {
    key: 'handleTabKey',
    value: function handleTabKey() {
      this.refs.inputField.focus();
      this.refs.inputField.setSelectionRange(0, 0);
      this.refs.inputField.blur();
      this.setState({
        userTypedValue: this.props.value
      });
    }
  }, {
    key: 'handleRightLeftKey',
    value: function handleRightLeftKey() {
      this.setState({
        userTypedValue: this.props.value,
        shouldTypeAhead: false
      });
    }
  }, {
    key: 'handleDefaultKey',
    value: function handleDefaultKey(event) {
      if (event.key.length > 1) {
        return;
      }
      var userTypedValue = this.state.userTypedValue;

      var selectionString = window.getSelection().toString();

      if (selectionString.length === 0) {
        var cursorPosition = this.refs.inputField.selectionStart;
        this.setState({
          userTypedValue: this.props.value.slice(0, cursorPosition) + event.key + this.props.value.slice(cursorPosition, this.props.value.length),
          shouldTypeAhead: true
        });
      } else if (this.props.value === '' + userTypedValue + selectionString) {
        this.setState({
          userTypedValue: this.fixCasing(this.state.userTypedValue + event.key),
          shouldTypeAhead: true
        });
      } else {
        this.setState({
          userTypedValue: this.props.value.replace(selectionString, event.key),
          shouldTypeAhead: false
        });
      }
    }
  }, {
    key: 'handleInputKeyDown',
    value: function handleInputKeyDown(event) {
      var onlyShiftKeyDown = event.shiftKey && event.keyCode === 16;
      var onlyAltKeyDown = event.altKey && event.keyCode === 18;
      if (onlyShiftKeyDown || onlyAltKeyDown || event.ctrlKey || event.metaKey) {
        return; // noop
      }

      var ARROW_LEFT = 37;
      var ARROW_UP = 38;
      var ARROW_RIGHT = 39;
      var ARROW_DOWN = 40;
      var ENTER_KEY = 13;
      var ESC_KEY = 27;
      var DELETE_KEY = 8;
      var TAB_KEY = 9;

      switch (event.keyCode) {
        case ENTER_KEY:
          event.preventDefault();
          this.handleEnterKey();
          break;
        case ARROW_DOWN:
          event.preventDefault(); // prevent the cursor from moving
          this.handleDownKey();
          break;
        case ARROW_UP:
          event.preventDefault(); // prevent the cursor from moving
          this.handleUpKey();
          break;
        case ESC_KEY:
          this.clearAutocomplete();
          break;
        case DELETE_KEY:
          this.handleDeleteKey();
          break;
        case TAB_KEY:
          this.handleTabKey();
          break;
        case ARROW_LEFT:
        case ARROW_RIGHT:
          this.handleRightLeftKey();
          break;
        default:
          this.handleDefaultKey(event);
      }
    }
  }, {
    key: 'fixCasing',
    value: function fixCasing(newValue) {
      var firstSuggestion = this.state.firstSuggestion;

      if (firstSuggestion.length === 0) {
        return newValue;
      }

      if (this.isMatch(newValue, firstSuggestion)) {
        return firstSuggestion.substr(0, newValue.length);
      }

      return newValue;
    }
  }, {
    key: 'setActiveItemAtIndex',
    value: function setActiveItemAtIndex(index) {
      this.setState({
        autocompleteItems: this.state.autocompleteItems.map(function (item, idx) {
          if (idx === index) {
            return _extends({}, item, { active: true });
          } else {
            return _extends({}, item, { active: false });
          }
        })
      });
    }
  }, {
    key: 'updateInputValue',
    value: function updateInputValue() {
      var _state3 = this.state,
          firstSuggestion = _state3.firstSuggestion,
          userTypedValue = _state3.userTypedValue;

      if (this.shouldSoftAutcomplete()) {
        this.props.onChange(firstSuggestion);
      } else {
        this.props.onChange(userTypedValue);
      }
    }
  }, {
    key: 'shouldSoftAutcomplete',
    value: function shouldSoftAutcomplete() {
      var _state4 = this.state,
          firstSuggestion = _state4.firstSuggestion,
          userTypedValue = _state4.userTypedValue,
          shouldTypeAhead = _state4.shouldTypeAhead;

      return firstSuggestion !== '' && userTypedValue !== '' && this.isMatch(userTypedValue, firstSuggestion) && shouldTypeAhead;
    }
  }, {
    key: 'handleInputChange',
    value: function handleInputChange(event) {
      this.updateInputValue();

      var userTypedValue = this.state.userTypedValue;

      if (userTypedValue.length === 0) {
        this.clearAutocomplete();
        return;
      }

      if (this.state.shouldTypeAhead) {
        this.autocompleteService.getPlacePredictions(_extends({}, this.props.options, { input: userTypedValue }), this.autocompleteCallback);
      }
    }
  }, {
    key: 'autocompleteItemStyle',
    value: function autocompleteItemStyle(active) {
      if (active) {
        return _extends({}, !this.props.classNames.autocompleteItem ? _defaultStyles2.default.autocompleteItemActive : {}, this.props.styles.autocompleteItemActive);
      } else {
        return {};
      }
    }
  }, {
    key: 'autocompleteItemClassNames',
    value: function autocompleteItemClassNames(active) {
      var classNames = this.props.classNames;

      if (active) {
        return (classNames.autocompleteItem || '') + ' ' + (classNames.autocompleteItemActive || '');
      } else {
        return classNames.autocompleteItem || '';
      }
    }
  }, {
    key: 'renderAutocomplete',
    value: function renderAutocomplete() {
      var _this3 = this;

      var autocompleteItems = this.state.autocompleteItems;
      var _props = this.props,
          classNames = _props.classNames,
          styles = _props.styles;

      if (autocompleteItems.length === 0) {
        return null;
      }
      return _react2.default.createElement(
        'div',
        {
          id: 'PlacesAutocomplete__autocomplete-container',
          className: classNames.autocompleteContainer || '',
          style: _extends({}, !classNames.autocompleteContainer ? _defaultStyles2.default.autocompleteContainer : {}, styles.autocompleteContainer) },
        autocompleteItems.map(function (p, idx) {
          return _react2.default.createElement(
            'div',
            {
              key: p.placeId,
              onMouseOver: function onMouseOver() {
                return _this3.setActiveItemAtIndex(p.index);
              },
              onMouseDown: function onMouseDown() {
                return _this3.handleAutocompleteItemMouseDown(p.suggestion, p.placeId);
              },
              className: _this3.autocompleteItemClassNames(p.active),
              style: _extends({}, !classNames.autocompleteItem ? _defaultStyles2.default.autocompleteItem : {}, styles.autocompleteItem, _this3.autocompleteItemStyle(p.active)) },
            _this3.props.autocompleteItem({ suggestion: p.suggestion, formattedSuggestion: p.formattedSuggestion })
          );
        })
      );
    }
  }, {
    key: 'isMatch',
    value: function isMatch(subject, target) {
      var normalizedSubject = subject.toLowerCase();
      var normalizedTarget = target.toLowerCase();
      return normalizedSubject === normalizedTarget.substr(0, subject.length);
    }
  }, {
    key: 'renderInput',
    value: function renderInput() {
      var _this4 = this;

      var _state5 = this.state,
          firstSuggestion = _state5.firstSuggestion,
          userTypedValue = _state5.userTypedValue;
      var _props2 = this.props,
          classNames = _props2.classNames,
          placeholder = _props2.placeholder,
          styles = _props2.styles,
          value = _props2.value,
          autoFocus = _props2.autoFocus,
          inputName = _props2.inputName;

      return _react2.default.createElement('input', {
        type: 'text',
        placeholder: placeholder,
        className: classNames.input || '',
        value: value,
        onChange: this.handleInputChange,
        onKeyDown: this.handleInputKeyDown,
        onBlur: function onBlur() {
          return _this4.clearAutocomplete();
        },
        style: styles.input,
        autoFocus: autoFocus,
        name: inputName || '',
        ref: 'inputField'
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          classNames = _props3.classNames,
          styles = _props3.styles;

      return _react2.default.createElement(
        'div',
        {
          style: _extends({}, !classNames.root ? _defaultStyles2.default.root : {}, styles.root),
          className: classNames.root || '' },
        this.renderInput(),
        this.renderAutocomplete()
      );
    }
  }]);

  return PlacesAutocompleteWithTypeAhead;
}(_react.Component);

exports.default = PlacesAutocompleteWithTypeAhead;