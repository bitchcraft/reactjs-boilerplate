module.exports = {
    "extends": [
        "airbnb",
        "plugin:flowtype/recommended"
    ],
    "plugins": [
        "react",
        "flowtype",
        "flowtype-errors"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "blockBindings": true,
            "jsx": true
        }
    },
    "env": {
        "browser": true,
        "node": true,
        "mocha": true,
        "es6": true
    },
    "rules": {
        "arrow-body-style": 0,
        "array-bracket-spacing": [0, "always"],
        "camelcase": [1, {
            "properties": "never"
        }],
        "flowtype/boolean-style": [2, "boolean"],
        "flowtype/define-flow-type": 1,
        "flowtype/delimiter-dangle": [1, "always"],
        "flowtype/generic-spacing": [2, "never"],
        "flowtype/no-primitive-constructor-types": 2,
        "flowtype/no-weak-types": 1,
        "flowtype/object-type-delimiter": [2, "comma"],
        "flowtype/require-parameter-type": 0,
        "flowtype/require-return-type": 0,
        "flowtype/require-valid-file-annotation": 0,
        "flowtype/semi": [2, "always"],
        "flowtype/space-after-type-colon": [2, "always"],
        "flowtype/space-before-generic-bracket": [2, "never"],
        "flowtype/space-before-type-colon": [2, "never"],
        "flowtype/union-intersection-spacing": [2, "always"],
        "flowtype/use-flow-type": 2,
        "flowtype/valid-syntax": 2,
        "flowtype-errors/show-errors": 2,
        "no-tabs": 0,
        "comma-dangle": [1, "always-multiline"],
        "consistent-return": 1,
        "func-names": 0,
        "function-paren-newline": 0,
        "global-require": 0,
        "indent": [2, "tab", {"SwitchCase": 1}],
        "jsx-a11y/anchor-has-content": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "jsx-quotes": [2, "prefer-single"],
        "max-len": 0,
        "new-cap": [1, {
            "capIsNewExceptions": [
                "Array",
                "Boolean",
                "Date",
                "Error",
                "Function",
                "Number",
                "Object",
                "RegExp",
                "String",
                "Symbol",
                "List",
                "Map",
                "OrderedMap"
            ]
        }],
        "no-else-return": 1,
        "no-mixed-spaces-and-tabs": 1,
        "no-multiple-empty-lines": [1, {
            max: 10
        }],
        "no-param-reassign": 0,
        "no-plusplus": 0,
        "no-tabs": 0,
        "no-trailing-spaces": [2, {
            "skipBlankLines": true
        }],
        "no-underscore-dangle": 0,
        "no-unused-vars": [2, {
            "vars": "all",
            "args": "none"
        }],
        "no-use-before-define": [2, "nofunc"],
        "no-var": 1,
        "one-var": [1, "never"],
        "object-shorthand": 0,
        "padded-blocks": 0,
        "prefer-arrow-callback": 0,
        "prefer-const": 1,
        "prefer-template": 0,
        "quotes": [1, "single", "avoid-escape"],
        "radix": 0,
        "react/display-name": 0,
        "react/jsx-boolean-value": 1,
        'react/jsx-closing-bracket-location': [1, 'after-props'],
        "react/jsx-indent": [2, 'tab'],
        "react/jsx-indent-props": [2, 'tab'],
        "react/jsx-key": 2,
        "react/jsx-no-duplicate-props": 2,
        "react/jsx-no-undef": 2,
        "react/jsx-pascal-case": 1,
        "react/jsx-sort-props": 1,
        "react/jsx-space-before-closing": 0,
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": 1,
        "react/no-deprecated": 1,
        "react/no-did-mount-set-state": 1,
        "react/no-did-update-set-state": 1,
        "react/no-direct-mutation-state": 2,
        "react/no-is-mounted": 2,
        "react/no-multi-comp": 0,
        "react/no-unknown-property": 1,
        // "react/prefer-stateless-function": 1,
        "react/prefer-es6-class": 0,
        "react/prop-types": 1,
        "react/react-in-jsx-scope": 1,
        "react/require-default-props": 0,
        "react/self-closing-comp": 1,
        "react/sort-comp": [1, {
            "order": [
                "lifecycle",
                "render",
                "everything-else"
            ],
            "groups": {
                "lifecycle": [
                    "displayName",
                    "propTypes",
                    "contextTypes",
                    "childContextTypes",
                    "mixins",
                    "statics",
                    "defaultProps",
                    "constructor",
                    "getDefaultProps",
                    "getInitialState",
                    "getChildContext",
                    "componentWillMount",
                    "componentDidMount",
                    "componentWillReceiveProps",
                    "shouldComponentUpdate",
                    "componentWillUpdate",
                    "componentDidUpdate",
                    "componentWillUnmount"
                ]
            }
        }],
        "react/sort-prop-types": 1,
        "react/no-find-dom-node": 1,
        "space-before-function-paren": [1, "never"],
        "import/no-extraneous-dependencies": 0,
        "import/extensions": 0,
        "import/first": 0,
        "import/no-unresolved": [2, {
            ignore: [
                "actions.*",
                "components.*",
                "constants.*",
                "containers.*",
                "services.*",
                "tools.*",
                "client.*",
                "typedef.*",
            ],
        }],
        "import/extensions": 0,
        "import/no-extraneous-dependencies": 0,
        "no-duplicate-imports": 0,
    }
};
