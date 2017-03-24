'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PlacesAutocompleteWithTypeAhead = require('./PlacesAutocompleteWithTypeAhead');

var _PlacesAutocompleteWithTypeAhead2 = _interopRequireDefault(_PlacesAutocompleteWithTypeAhead);

var _PlacesAutocompleteBasic = require('./PlacesAutocompleteBasic');

var _PlacesAutocompleteBasic2 = _interopRequireDefault(_PlacesAutocompleteBasic);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*
                                                                                                                                                                                                                             * Copyright (c) 2017 Ken Hibino.
                                                                                                                                                                                                                             * Licensed under the MIT License (MIT).
                                                                                                                                                                                                                             * See https://kenny-hibino.github.io/react-places-autocomplete
                                                                                                                                                                                                                             */

var PlacesAutocomplete = function PlacesAutocomplete(props) {
  var typeAhead = props.typeAhead,
      rest = _objectWithoutProperties(props, ['typeAhead']);
  // Work around for React KeyDown event issue: https://github.com/facebook/react/issues/6176


  var isMobile = (0, _helpers.mobileCheck)();
  if (typeAhead && !isMobile) {
    return _react2.default.createElement(_PlacesAutocompleteWithTypeAhead2.default, rest);
  } else {
    return _react2.default.createElement(_PlacesAutocompleteBasic2.default, rest);
  }
};

PlacesAutocomplete.propTypes = {
  value: _react2.default.PropTypes.string.isRequired,
  onChange: _react2.default.PropTypes.func.isRequired,
  onError: _react2.default.PropTypes.func,
  clearItemsOnError: _react2.default.PropTypes.bool,
  onSelect: _react2.default.PropTypes.func,
  placeholder: _react2.default.PropTypes.string,
  autoFocus: _react2.default.PropTypes.bool,
  inputName: _react2.default.PropTypes.string,
  autocompleteItem: _react2.default.PropTypes.func,
  classNames: _react2.default.PropTypes.shape({
    root: _react2.default.PropTypes.string,
    input: _react2.default.PropTypes.string,
    autocompleteContainer: _react2.default.PropTypes.string,
    autocompleteItem: _react2.default.PropTypes.string,
    autocompleteItemActive: _react2.default.PropTypes.string
  }),
  styles: _react2.default.PropTypes.shape({
    root: _react2.default.PropTypes.object,
    input: _react2.default.PropTypes.object,
    autocompleteContainer: _react2.default.PropTypes.object,
    autocompleteItem: _react2.default.PropTypes.object,
    autocompleteItemActive: _react2.default.PropTypes.object
  }),
  options: _react2.default.PropTypes.shape({
    bounds: _react2.default.PropTypes.object,
    componentRestrictions: _react2.default.PropTypes.object,
    location: _react2.default.PropTypes.object,
    offset: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),
    radius: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),
    types: _react2.default.PropTypes.array
  }),
  typeAhead: _react2.default.PropTypes.bool
};

PlacesAutocomplete.defaultProps = {
  clearItemsOnError: false,
  onError: function onError(status) {
    return console.error('[react-places-autocomplete]: error happened when fetching data from Google Maps API.\nPlease check the docs here (https://developers.google.com/maps/documentation/javascript/places#place_details_responses)\nStatus: ', status);
  },
  placeholder: 'Address',
  autoFocus: false,
  classNames: {},
  autocompleteItem: function autocompleteItem(_ref) {
    var suggestion = _ref.suggestion;
    return _react2.default.createElement(
      'div',
      null,
      suggestion
    );
  },
  styles: {},
  options: {},
  typeAhead: true
};

exports.default = PlacesAutocomplete;