(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'react', 'react-dom', 'lodash.isequal', 'progressbar.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, require('react'), require('react-dom'), require('lodash.isequal'), require('progressbar.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.react, global.reactDom, global.lodash, global.progressbar);
        global.main = mod.exports;
    }
})(this, function (module, React, ReactDom, isEqual, ProgressBar) {
    'use strict';

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Shape = function (_React$Component) {
        _inherits(Shape, _React$Component);

        _createClass(Shape, [{
            key: '_isPath',
            get: function get() {
                return this.props.ShapeClass instanceof ProgressBar.Path;
            }
        }], [{
            key: 'defaultProps',
            get: function get() {
                return {
                    ShapeClass: null,
                    options: {},
                    progress: 0,
                    text: null,
                    initialAnimate: false,
                    containerStyle: {},
                    containerClassName: '.progressbar-container',
                    svgPath: null
                };
            }
        }]);

        function Shape(props) {
            _classCallCheck(this, Shape);

            var _this = _possibleConstructorReturn(this, (Shape.__proto__ || Object.getPrototypeOf(Shape)).call(this, props));

            _this.state = {
                shape: null
            };
            return _this;
        }

        _createClass(Shape, [{
            key: 'render',
            value: function render() {
                var style = this.props.containerStyle;
                var className = this.props.containerClassName;

                return React.createElement('div', { className: className, style: style, ref: 'progressBar' });
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                if (!isEqual(this.props.options, nextProps.options)) {
                    this._destroy();
                    this._create(nextProps, this.props);
                    return;
                }

                this.animateProgress(nextProps.progress);
                this.setText(nextProps.text);
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                this._create(this.props);
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                this._destroy();
            }
        }, {
            key: '_create',
            value: function _create(props, oldProps) {
                if (this.state.shape !== null) {
                    throw new Error('Progressbar is already created');
                }

                // setState function is not used to prevent a new render cycle
                // This handling happens outside of React component's lifecycle
                var container = ReactDom.findDOMNode(this.refs.progressBar);
                this.state.shape = new props.ShapeClass(this._isPath ? this.props.svgPath : container, props.options);

                if (props.initialAnimate) {
                    if (oldProps) {
                        this.setProgress(oldProps.progress);
                    }

                    this.animateProgress(props.progress);
                } else {
                    this.setProgress(props.progress);
                }

                this.setText(props.text);
            }
        }, {
            key: '_destroy',
            value: function _destroy() {
                if (this.state.shape) {
                    this.state.shape.destroy();
                    this.state.shape = null;
                }
            }
        }, {
            key: 'animateProgress',
            value: function animateProgress(progress) {
                this.state.shape.animate(progress);
            }
        }, {
            key: 'setProgress',
            value: function setProgress(progress) {
                this.state.shape.set(progress);
            }
        }, {
            key: 'setText',
            value: function setText(text) {
                if (text) {
                    this.state.shape.setText(text);
                }
            }
        }]);

        return Shape;
    }(React.Component);

    var Line = function (_React$Component2) {
        _inherits(Line, _React$Component2);

        function Line() {
            _classCallCheck(this, Line);

            return _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).apply(this, arguments));
        }

        _createClass(Line, [{
            key: 'render',
            value: function render() {
                return React.createElement(Shape, _extends({}, this.props, { ref: 'shape', ShapeClass: ProgressBar.Line }));
            }
        }, {
            key: '_shape',
            get: function get() {
                return this.refs.shape;
            }
        }]);

        return Line;
    }(React.Component);

    var Circle = function (_React$Component3) {
        _inherits(Circle, _React$Component3);

        function Circle() {
            _classCallCheck(this, Circle);

            return _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).apply(this, arguments));
        }

        _createClass(Circle, [{
            key: 'render',
            value: function render() {
                return React.createElement(Shape, _extends({}, this.props, { ref: 'shape', ShapeClass: ProgressBar.Circle }));
            }
        }, {
            key: '_shape',
            get: function get() {
                return this.refs.shape;
            }
        }]);

        return Circle;
    }(React.Component);

    var SemiCircle = function (_React$Component4) {
        _inherits(SemiCircle, _React$Component4);

        function SemiCircle() {
            _classCallCheck(this, SemiCircle);

            return _possibleConstructorReturn(this, (SemiCircle.__proto__ || Object.getPrototypeOf(SemiCircle)).apply(this, arguments));
        }

        _createClass(SemiCircle, [{
            key: 'render',
            value: function render() {
                return React.createElement(Shape, _extends({}, this.props, { ref: 'shape', ShapeClass: ProgressBar.SemiCircle }));
            }
        }, {
            key: '_shape',
            get: function get() {
                return this.refs.shape;
            }
        }]);

        return SemiCircle;
    }(React.Component);

    var Path = function (_React$Component5) {
        _inherits(Path, _React$Component5);

        function Path() {
            _classCallCheck(this, Path);

            return _possibleConstructorReturn(this, (Path.__proto__ || Object.getPrototypeOf(Path)).apply(this, arguments));
        }

        _createClass(Path, [{
            key: 'render',
            value: function render() {
                return React.createElement(Shape, _extends({}, this.props, { ref: 'shape', ShapeClass: ProgressBar.Path }));
            }
        }, {
            key: '_shape',
            get: function get() {
                return this.refs.shape;
            }
        }]);

        return Path;
    }(React.Component);

    module.exports = {
        Shape: Shape,
        Line: Line,
        Circle: Circle,
        SemiCircle: SemiCircle
    };
});
