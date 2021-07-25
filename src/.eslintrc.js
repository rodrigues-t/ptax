module.exports = {
  extends: ["react-app", "airbnb", "airbnb/hooks"],  
  overrides: [
    {
      files: ["**/*.ts?(x)", "**/*.js?(x)"],
      settings: {},
      settings: {
        "import/resolver": {
          node: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
            moduleDirectory: ["node_modules", "src/"],
          },
        },
      },
      rules: {
        "indent": ["error", 2],
        "max-len": ["warn", { "code": 120 }],
        "import/extensions": "off",
        // "react/jsx-filename-enpm xtension": [
        //   2,
        //   { extensions: [".js", ".jsx", ".ts", ".tsx"] },
        // ],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
        "arrow-parens": ["error", "as-needed"],
        "arrow-body-style": "off",
        "import/prefer-default-export": "off",
        "jsx-a11y/label-has-associated-control": "off",
        "react/jsx-wrap-multilines": "off",
        "react/destructuring-assignment": "off",
        "implicit-arrow-linebreak": "off",
        "react/jsx-one-expression-per-line": "off",
        "react/jsx-props-no-spreading": "off",
        "no-async-promise-executor": "off",
        "semi": "off",
        "@typescript-eslint/semi": "error",
        "import/no-cycle": "off"
      },
    },
  ],
};
