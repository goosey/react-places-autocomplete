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

var PlacesAutocompleteBasic = function (_Component) {
  _inherits(PlacesAutocompleteBasic, _Component);

  function PlacesAutocompleteBasic(props) {
    _classCallCheck(this, PlacesAutocompleteBasic);

    var _this = _possibleConstructorReturn(this, (PlacesAutocompleteBasic.__proto__ || Object.getPrototypeOf(PlacesAutocompleteBasic)).call(this, props));

    _this.state = { autocompleteItems: [] };

    _this.autocompleteCallback = _this.autocompleteCallback.bind(_this);
    _this.handleInputKeyDown = _this.handleInputKeyDown.bind(_this);
    _this.handleInputChange = _this.handleInputChange.bind(_this);
    return _this;
  }

  _createClass(PlacesAutocompleteBasic, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.autocompleteOK = google.maps.places.PlacesServiceStatus.OK;
    }
  }, {
    key: 'autocompleteCallback',
    value: function autocompleteCallback(predictions, status) {
      var _this2 = this;

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
        })
      });
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
    key: 'handleInputKeyDown',
    value: function handleInputKeyDown(event) {
      var ARROW_UP = 38;
      var ARROW_DOWN = 40;
      var ENTER_KEY = 13;
      var ESC_KEY = 27;

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
      }
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
    key: 'handleInputChange',
    value: function handleInputChange(event) {
      this.props.onChange(event.target.value);
      if (!event.target.value) {
        this.clearAutocomplete();
        return;
      }
      this.autocompleteService.getPlacePredictions(_extends({}, this.props.options, { input: event.target.value }), this.autocompleteCallback);
    }
  }, {
    key: 'autocompleteItemStyle',
    value: function autocompleteItemStyle(active) {
      if (active) {
        return _extends({}, !this.props.classNames.autocompleteContainer ? _defaultStyles2.default.autocompleteItemActive : {}, this.props.styles.autocompleteItemActive);
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
                return _this3.selectAddress(p.suggestion, p.placeId);
              },
              className: _this3.autocompleteItemClassNames(p.active),
              style: _extends({}, !classNames.autocompleteItem ? _defaultStyles2.default.autocompleteItem : {}, styles.autocompleteItem, _this3.autocompleteItemStyle(p.active)) },
            _this3.props.autocompleteItem({ suggestion: p.suggestion, formattedSuggestion: p.formattedSuggestion })
          );
        })
      );
    }
  }, {
    key: 'renderInput',
    value: function renderInput() {
      var _this4 = this;

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
        name: inputName || ''
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

  return PlacesAutocompleteBasic;
}(_react.Component);

exports.default = PlacesAutocompleteBasic;