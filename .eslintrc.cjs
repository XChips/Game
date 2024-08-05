/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

/**
 * @description .eslintrc.js
 * eslint官方中文文档 https://eslint.nodejs.cn/docs/latest/
 * eslint官方英文文档 https://eslint.org/docs/latest/rules/
 * eslint-plugin-vue官方英文文档 https://eslint.vuejs.org/rules/
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
    './src/init/.eslintrc-auto-import.json',
  ],
  parserOptions: {
    // parser: 'vue-eslint-parser',
    // sourceType: 'module',
    ecmaVersion: 'latest',
  },
  plugins: ['vue'],
  globals: {
    OptionType: 'readonly',
  },
  rules: {
    /**
     * 部分重要的值说明
     * 'off' 或 0 - 关闭规则
     * 'warn' 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
     * 'error' 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
     * 'always'-总是 'never'-总不是 'ignore'-忽略规则
     * 每个配置部分 前半部分为 Eslint 后半部分为 vue
     */
    /** 重要的基础配置，该配置一般项目均会用到 **/
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 生产环境使用 console 提示 warn
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 生产环境使用 debugger 提示 warn
    // 忽略 v-html 警告，v-html 可能会导致XSS攻击，vue 会在使用时弹出该警告 该规则在官方文档找到索引但未查找到内容
    'vue/no-v-html': 'off',
    // 要求组件名称总是由多个单词组成 默认时要求驼峰或者多单词使用‘-’进行连接
    'vue/multi-word-component-names': 'off',
    // 不允许< template >上的无用属性 部分自定义属性可能会受影响
    'vue/no-useless-template-attributes': 'off',
    // 不允许在组件定义中使用保留名称
    'vue/no-reserved-component-names': 'off',
    /**
     * 个人风格配置
     */
    // 数组括号间是否需要换行符 'consistent'-要求每对括号都使用一致的换行符（其中一个有，另外一个应当有）。
    'array-bracket-newline': ['error', 'consistent'],
    // 数组括号间是否需要空格
    'array-bracket-spacing': ['error', 'never'],
    // 数组元素间是否需要换行 'consistent' 元素保持统一的换行格式
    'array-element-newline': ['error', 'consistent'],
    // 在打开块之后和关闭块之前，不允许或强制块内有空格
    'block-spacing': ['error', 'never'],
    // 块级花括号的排列模式
    'brace-style': ['error', '1tbs', {'allowSingleLine': true}],
    // 是否使用驼峰命名
    'camelcase': ['off', {'properties': 'always'}],
    // 句末是否需要逗号 'always-multiline'-多行时需要 'only-multiline'-多行时可以有但不强制要求
    'comma-dangle': ['error', 'always-multiline'],
    // 要求使用 === 和 !==
    'eqeqeq': ['error', 'always', {null: 'ignore'}],
    // 在三元表达式的操作数之间强制换行符 'always-multiline'-多行时需要
    'multiline-ternary': ['error', 'always-multiline'],
    // 要求使用模板字面量而非字符串连接 开启后将禁止使用 + 号连接字符串 此规则不应在 ES3/5 环境中使用
    'prefer-template': 'error',
    // 强制 generator 函数中 * 号周围使用一致的空格
    'generator-star-spacing': ['error', 'before'],
    // vue 组件属性是否需要连字符 'always'-禁止驼峰 'never'-可以驼峰
    'vue/attribute-hyphenation': ['error', 'always'],
    // 强制第一个属性的位置(属性换行) singleline 单行时 multiline 多行时 below 需要换行 beside 不需要换行 ignore 忽略
    'vue/first-attribute-linebreak': ['error', {'singleline': 'beside', 'multiline': 'beside'}],
    // 要求或不允许在标记的右括号前换行
    'vue/html-closing-bracket-newline': ['error', {'singleline': 'never', 'multiline': 'never'}],
    // html 标签与尖括号>之间是否需要空格 startTag<div> endTag</div> selfClosingTag<input/>
    'vue/html-closing-bracket-spacing': ['error', {
      'startTag': 'never',
      'endTag': 'never',
      'selfClosingTag': 'never',
    }],
    // 强制每行的最大属性数 singleline 单行时 multiline 多行时
    'vue/max-attributes-per-line': ['error', {'singleline': 10, 'multiline': 5}],
    // 在多行元素的内容前后需要换行符
    'vue/multiline-html-element-content-newline': 'off',
    // 强制插值 {{data}} 中是否需要空格
    'vue/mustache-interpolation-spacing': ['error', 'never'],
    // 当v-bind值为真时需要速记形式属性 'always' | 'never' :show='true' 在 'always' 时应当直接简写为 show
    'vue/prefer-true-attribute-shorthand': ['error', 'always'],
    // 要求每个 prop 都有注释来记录它 'JSDoc'</** */>|'line'<//>|'block'</**/>|'any' 默认为 'JSDoc'
    'vue/require-prop-comment': ['error', {'type': 'JSDoc'}],
    // 在单行元素的内容前后需要换行符
    'vue/singleline-html-element-content-newline': 'off',
    // 在模板中的自定义组件上实施v-on事件命名样式 'always' | 'never' always-连字符 never-驼峰
    'vue/v-on-event-hyphenation': ['error', 'always', {'autofix': true, 'ignore': []}],
    /** 个人风格配置 end ----------------------------------------------------- **/
    /**
     * 默认的推荐配置
     */
    // 箭头函数是否需要空格 <(a) => {}|(a)=>{}>
    'arrow-spacing': ['error', {'before': true, 'after': true}],
    // 逗号前后是否需要空格
    'comma-spacing': ['error', {'before': false, 'after': true}],
    // 逗号的排列样式 last-排在末位 first-排在首位
    'comma-style': ['error', 'last'],
    // 在点前后强制一致的换行符 'object'-与对象同行 'property'-与属性同行
    'dot-location': ['error', 'property'],
    // 尽可能强制使用点符号连接对象与属性
    'dot-notation': 'off',
    // 要求或不允许函数标识符和它们的调用之间有间隔
    'func-call-spacing': ['error', 'never'],
    // 强制对象文字属性中的键和值之间的间距一致
    'key-spacing': ['error', {'beforeColon': false, 'afterColon': true}],
    // 强制关键字前后间距一致
    'keyword-spacing': ['error', {'before': true, 'after': true}],
    // 不允许在条件中使用常量表达式
    'no-constant-condition': 'error',
    // 不允许对象文字中有重复的键
    'no-dupe-keys': 'error',
    // 不允许空的析构模式
    'no-empty-pattern': 'error',
    // 不允许不必要的括号
    'no-extra-parens': ['error', 'functions'],
    // 不允许不规则空格
    'no-irregular-whitespace': 'error',
    // 不允许多个空格
    'no-multi-spaces': 'error',
    // 禁止使用稀疏数组，也就是逗号之前没有任何元素的数组
    'no-sparse-arrays': 'error',
    // 强制在大括号中使用一致的空格
    'object-curly-spacing': ['error', 'never'],
    // 强制操作符使用一致的换行符风格
    'operator-linebreak': ['error', 'after', {'overrides': {'?': 'before', ':': 'before'}}],
    // 禁止或强制圆括号内的空格
    'space-in-parens': ['error', 'never'],
    // 要求操作符周围有空格
    'space-infix-ops': 'error',
    // 强制在一元操作符前后使用一致的空格
    'space-unary-ops': ['error', {'words': true, 'nonwords': false}],
    // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
    'template-curly-spacing': ['error', 'never'],
    // 强制 getter 和 setter 在对象中成对出现
    'accessor-pairs': 'error',
    // 要求在构造函数中有 super() 的调用
    'constructor-super': 'error',
    // 强制所有控制语句使用一致的括号风格
    'curly': ['error', 'multi-line'],
    // 要求或禁止文件末尾存在空行
    'eol-last': 'error',
    // 要求回调函数中有容错处理 当参数名为 err, error 时，该规则会报告有未处理的错误
    'handle-callback-err': ['error', '^(err|error)$'],
    // 强制使用一致的缩进
    'indent': ['error', 2, {'SwitchCase': 1}],
    // 强制在 JSX 属性中一致地使用双引号或单引号
    'jsx-quotes': ['error', 'prefer-single'],
    // 要求构造函数首字母大写 'capIsNew': false 允许调用首字母大写的函数时没有 new 操作符
    'new-cap': ['error', {'newIsCap': true, 'capIsNew': false}],
    // 强制或禁止调用无参构造函数时有圆括号
    'new-parens': 'error',
    // 禁用 Array 构造函数
    'no-array-constructor': 'error',
    // 禁用 arguments.caller 或 arguments.callee
    'no-caller': 'error',
    // 禁止修改类声明的变量
    'no-class-assign': 'error',
    // 禁止条件表达式中出现赋值操作符
    'no-cond-assign': 'error',
    // 禁止修改 const 声明的变量
    'no-const-assign': 'error',
    // 禁止在正则表达式中使用控制字符
    'no-control-regex': 'off',
    // 禁止删除变量
    'no-delete-var': 'error',
    // 禁止 function 定义中出现重名参数
    'no-dupe-args': 'error',
    // 禁止类成员中出现重复的名称
    'no-dupe-class-members': 'error',
    // 禁止出现重复的 case 标签
    'no-duplicate-case': 'error',
    // 禁止在正则表达式中出现空字符集
    'no-empty-character-class': 'error',
    // 禁用 eval()
    'no-eval': 'error',
    // 禁止对 catch 子句的参数重新赋值
    'no-ex-assign': 'error',
    // 禁止扩展原生类型
    'no-extend-native': 'error',
    // 禁止不必要的 .bind() 调用
    'no-extra-bind': 'error',
    // 禁止不必要的布尔转换
    'no-extra-boolean-cast': 'error',
    // 禁止 case 语句落空 如果注释为 // falls through 则表明故意落空，允许当前落空
    'no-fallthrough': 'error',
    // 禁止数字字面量中使用前导和末尾小数点
    'no-floating-decimal': 'error',
    // 禁止对 function 声明重新赋值
    'no-func-assign': 'error',
    // 禁止使用类似 eval() 的方法
    'no-implied-eval': 'error',
    // 禁止在嵌套的块中出现变量声明或 function 声明
    'no-inner-declarations': ['error', 'functions'],
    // 禁止 RegExp 构造函数中存在无效的正则表达式字符串
    'no-invalid-regexp': 'error',
    // 禁用 __iterator__ 属性
    'no-iterator': 'error',
    // 不允许标签与变量同名
    'no-label-var': 'error',
    // 禁用标签语句
    'no-labels': ['error', {'allowLoop': false, 'allowSwitch': false}],
    // 禁用不必要的嵌套块
    'no-lone-blocks': 'error',
    // 禁止空格和 tab 的混合缩进
    'no-mixed-spaces-and-tabs': 'error',
    // 禁止使用多行字符串
    'no-multi-str': 'error',
    // 禁止出现多行空行
    'no-multiple-empty-lines': ['error', {'max': 1}],
    // 不允许重新分配本机对象
    'no-native-reassign': 'error',
    // 禁止在表达式中否定左操作数
    'no-negated-in-lhs': 'error',
    // 禁用 Object 的构造函数
    'no-new-object': 'error',
    // 禁止调用 require 时使用 new 操作符
    'no-new-require': 'error',
    // 禁止 Symbolnew 操作符和 new 一起使用
    'no-new-symbol': 'error',
    // 禁止对 String，Number 和 Boolean 使用 new 操作符
    'no-new-wrappers': 'error',
    // 禁止把全局对象作为函数调用
    'no-obj-calls': 'error',
    // 禁用八进制字面量
    'no-octal': 'error',
    // 禁止在字符串中使用八进制转义序列 应该使用 Unicode 转义序列
    'no-octal-escape': 'error',
    // 禁止对 __dirname 和 __filename 进行字符串连接
    'no-path-concat': 'error',
    // 禁用 __proto__ 属性
    'no-proto': 'error',
    // 禁止多次声明同一变量
    'no-redeclare': 'error',
    // 禁止正则表达式字面量中出现多个空格
    'no-regex-spaces': 'error',
    // 禁止在 return 语句中使用赋值语句 except-parens-使用括号时才可以出现赋值语句 always-禁止所有赋值
    'no-return-assign': ['error', 'except-parens'],
    // 禁止自我赋值
    'no-self-assign': 'error',
    // 禁止自身比较
    'no-self-compare': 'error',
    // 禁用逗号操作符
    'no-sequences': 'error',
    // 禁止将标识符定义为受限的名字
    'no-shadow-restricted-names': 'error',
    // 不允许函数标识符及其应用程序之间的间隔
    'no-spaced-func': 'error',
    // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
    'no-this-before-super': 'error',
    // 禁止抛出异常字面量
    'no-throw-literal': 'error',
    // 禁用行尾空格
    'no-trailing-spaces': 'error',
    // 禁用未声明的变量，除非它们在 /* global */ 注释中被提到
    'no-undef': 'error',
    // 禁止将变量初始化为 undefined
    'no-undef-init': 'error',
    // 禁止出现令人困惑的多行表达式
    'no-unexpected-multiline': 'error',
    // 禁用一成不变的循环条件
    'no-unmodified-loop-condition': 'error',
    // 禁止可以在有更简单的可替代的表达式时使用三元操作符
    'no-unneeded-ternary': ['error', {'defaultAssignment': false}],
    // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    'no-unreachable': 'error',
    // 禁止在 finally 语句块中出现控制流语句
    'no-unsafe-finally': 'error',
    // 禁止出现未使用过的变量
    'no-unused-vars': ['error', {'vars': 'all', 'args': 'none'}],
    // 禁止不必要的 .call() 和 .apply()
    'no-useless-call': 'error',
    // 禁止在对象中使用不必要的计算属性
    'no-useless-computed-key': 'error',
    // 禁用不必要的构造函数
    'no-useless-constructor': 'error',
    // 禁用不必要的转义字符
    'no-useless-escape': 'off',
    // 禁止属性前有空白
    'no-whitespace-before-property': 'error',
    // 禁用 with 语句
    'no-with': 'error',
    // 强制函数中的变量要么一起声明要么分开声明 'initialized': 'never' 要求每个作用域的初始化的变量有多个变量声明
    'one-var': ['error', {'initialized': 'never'}],
    // 要求或禁止块内填充
    'padded-blocks': ['error', 'never'],
    // 强制使用一致的反勾号、双引号或单引号 'double'|'single'|'backtick'
    'quotes': ['error', 'single', {'avoidEscape': true, 'allowTemplateLiterals': true}],
    // 要求或禁止使用分号代替 ASI
    'semi': ['error', 'always'],
    // 强制分号之前和之后使用一致的空格
    'semi-spacing': ['error', {'before': false, 'after': true}],
    // 强制在块之前使用一致的空格
    'space-before-blocks': ['error', 'always'],
    // 强制在 function的左括号之前使用一致的空格
    'space-before-function-paren': ['error', 'never'],
    // 要求或禁止在注释前有空白
    'spaced-comment': ['error', 'always', {'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',', '/']}],
    // 要求使用 isNaN() 检查 NaN
    'use-isnan': 'error',
    // 强制 typeof 表达式与有效的字符串进行比较
    'valid-typeof': 'error',
    // 要求 IIFE 使用括号括起来
    'wrap-iife': ['error', 'any'],
    // 强制在 yield* 表达式中 * 周围使用空格
    'yield-star-spacing': ['error', 'both'],
    // 要求或禁止 “Yoda” 条件 字面量在判断条件中靠后或靠前 'never'-靠后
    'yoda': ['error', 'never'],
    // 要求使用 const 声明那些声明后不再被修改的变量 destructuring<any(解构中任何变量都应该是const)|all(解构中所有变量都应该是const)>
    'prefer-const': ['error', {'destructuring': 'all', 'ignoreReadBeforeAssign': false}],
    // vue 组件属性是否需要按推荐顺序排列 {'order': [], 'alphabetical': false}
    'vue/attributes-order': 'error',
    // 在开始标签和结束标签之间是否换行 maxEmptyLines-最大空行
    'vue/block-tag-newline': ['error', {'singleline': 'never', 'multiline': 'always', 'maxEmptyLines': 0}],
    // 强制组件API样式 'script-setup', 'composition', 'composition-vue2', or 'options'
    // 'vue/component-api-style': ['error', ['script-setup', 'composition']],
    // 对组件定义名称强制使用特定的大小写 'PascalCase' | 'kebab-case'
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    // 强制模板中组件命名样式的特定大小写 'PascalCase' | 'kebab-case'
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {'registeredComponentsOnly': true}],
    // 强制组件选项中组件名称的大小写 'PascalCase' | 'kebab-case' | 'camelCase'
    'vue/component-options-name-casing': ['error', 'PascalCase'],
    // 不允许使用没有显式类型属性的按钮
    'vue/html-button-has-type': ['error', {'button': true, 'submit': true, 'reset': true}],
    // 在HTML注释中实施统一的行的行为
    'vue/html-comment-content-newline': ['error', {'singleline': 'ignore', 'multiline': 'always'}],
    // 在HTML注释中强制统一间距
    'vue/html-comment-content-spacing': ['error', 'always'],
    // 在HTML注释中强制一致的缩进
    'vue/html-comment-indent': ['error', 2],
    // 在< template >中强制一致的缩进
    'vue/html-indent': ['error', 2, {
      'attribute': 1,
      'baseIndent': 1,
      'closeBracket': 0,
      'alignAttributesVertically': true,
      'ignores': [],
    }],
    // 强制HTML属性的引号样式
    'vue/html-quotes': ['error', 'double', {'avoidEscape': true}],
    // 结束标签的样式
    'vue/html-self-closing': 'error',
    // 要求组件名属性与其文件名匹配 默认情况下只检查 .jsx 文件
    'vue/match-component-file-name': ['error', {'extensions': ['jsx'], 'shouldMatchCase': false}],
    // 不允许属性重复 排除掉 class | style
    'vue/no-duplicate-attributes': ['error', {'allowCoexistClass': true, 'allowCoexistStyle': true}],
    // 不允许不必要的<template> 如果你使用的是Vue.js 2.x，ignoreAccessible选项就没用了
    'vue/no-lone-template': ['error', {'ignoreAccessible': false}],
    // 不允许标签属性的等号两边有空格
    'vue/no-spaces-around-equal-signs-in-attribute': ['error'],
    // 对Vue组件中的 Prop 名称强制使用特定的大小写 'camelCase' | 'snake_case'
    'vue/prop-name-casing': ['error', 'camelCase'],
    // 不允许在 template 中使用 this
    'vue/this-in-template': ['error', 'never'],
    // 强制v-bind指令样式 'shorthand' | 'longform' shorthand-冒号简写(:) longform-全写(v-bind:)
    'vue/v-bind-style': ['error', 'shorthand'],
    // 强制v-for指令的分隔符样式 'in' | 'of'
    'vue/v-for-delimiter-style': ['error', 'in'],
    // 在v-on指令中不带参数的方法调用后强制或禁止括号 'always'|'never'
    'vue/v-on-function-call': ['error', 'never', {'ignoreIncludesComment': false}],
    /** 默认的推荐配置 end --------------------------------------------------- **/
    /**
     * 可忽略的配置
     */
    // 强制最大行长度 只会报错，不会autofix 所以利用报错，在编辑器格式化中设置同样的属性值，遇到报错文件就执行格式化
    // 'max-len': ['error', {'code': 140}],
    // 属性按字母顺序进行排列 'asc'|'desc' 'caseSensitive'-是否区分大小写 'natural'-是否按自然顺序排列 'minKeys'-未排序错误所需的最小个数
    // 'sort-keys': ['error', 'asc', {'caseSensitive': true, 'natural': false, 'minKeys': 2}],
    // 为 script 标签设置 lang 属性
    // 'vue/block-lang':'error',
    // 是否支持< template >中的注释指令
    // 'vue/comment-directive': ['error', {'reportUnusedDisableDirectives': false}],
    // 强制组件顶级元素的顺序
    // 'vue/component-tags-order': ['error', {'order': [ [ 'script', 'template' ], 'style']}],
    // 对自定义事件名称强制使用特定的大小写 'camelCase' | 'kebab-case'
    // 'vue/custom-event-name-casing': ['error', 'camelCase', {'ignores': []}],
    // 强制定义限制的声明样式，lang='ts'时生效 'type-based' | 'runtime'
    // 'vue/define-emits-declaration': ['error', 'type-based'],
    // 强制执行定义限制和定义弹出编译器宏的顺序
    // 'vue/define-macros-order': ['error', {'order': ['defineProps', 'defineEmits']}],
    // 强制定义弹出窗口的声明样式 'type-based' | 'runtime'
    // 'vue/define-props-declaration': ['error', 'type-based'],
    // 在Vue组件的多行属性之间强制换行符 一般不设置该规则
    // 'vue/new-line-between-multi-line-property': ['error', {'minLineOfMultilineProperty': 2}],
    // 不允许在< template >中使用空字符串 一般不设置该规则
    // 'vue/no-bare-strings-in-template': 'error',
    // 不允许布尔默认值 no-default | default-false 设置后 props 中的布尔值将无法默认设置为true
    // 'vue/no-boolean-default': ['error', 'no-default'],
    // 不允许元素的子内容被v-html或v-text这样的指令覆盖 设置后v-html或v-text标签内不能有内容
    // 'vue/no-child-content': ['error', {'additionalDirectives': ['foo']}],
    // 将带有默认值的属性强制为可选 autofix 为true时将会自动修复
    // 'vue/no-required-prop-with-default': ['error', {'autofix': false,}],
    // 不允许静态内联样式属性 allowBinding 为 true 时，可以使用 :style= 但是不可以使用 style
    // 'vue/no-static-inline-styles': ['error', {'allowBinding': true}],
    // 不允许target='_blank '属性不带rel='noopener noreferrer'
    // 超链接添加rel='noopener noreferrer'来防止钓鱼网站，因为它获取的window.opener的值为null。
    // 'vue/no-template-target-blank': ['error', {'allowReferrer': false, 'enforceDynamicLinks': 'always'}],
    // 不允许在< template >中使用未定义的组件 该规则不能检查全局注册的组件和mixins中注册的组件，除非将它们忽略
    // 'vue/no-undef-components': ['error', {'ignorePatterns': ['custom(\\-\\w+)+']}],
    // 不允许未定义的属性 此规则无法检测在其他文件或组件中定义的属性 请注意，如果使用mixins，会有许多误报 默认是$开头则被忽略
    // 'vue/no-undef-properties': ['error', {'ignores': ['/^\\$/']}],
    // 不允许不必要的{{data}}插值 比如 {{String}}
    // 'vue/no-useless-mustaches': ['error', {'ignoreIncludesComment': false, 'ignoreStringEscape': false}],
    // 在v-on指令中强制处理程序的写作风格 ['method', 'inline-function'] | ['method', 'inline'] | 'inline-function' | 'inline'
    // 'vue/v-on-handler-style': ['error', ['method', 'inline'], {'ignoreIncludesComment': false}],
    // 强制v-on指令样式 'shorthand'(@) | 'longform'(v-on:)
    // 'vue/v-on-style': ['error', 'shorthand'],
    // 强制v-slot指令样式 'shorthand'(简写) | 'longform'(全写) | 'v-slot'(默认插槽),
    // 'vue/v-slot-style': ['error', {'atComponent': 'v-slot', 'default': 'shorthand', 'named': 'shorthand'}],
    /** 可忽略的配置 end ----------------------------------------------------- **/
    /**
     * 不建议设置的配置
     */
    // 不允许失去精度的文字数字
    // 'no-loss-of-precision' 该规则为默认生效
    // 强制大括号内换行符的一致性 'always' | 'never'
    // 'object-curly-newline': ['error', 'always'],
    // 强制将对象的属性放在不同的行上
    // 'object-property-newline': ['error', 'never'],
    // 要求或禁止对象字面量中方法和属性使用简写语法
    // 'object-shorthand': ['error', 'always'],
    // 要求对象字面量属性名称用引号括起来
    // 'quote-props' 该规则为默认生效
    // 禁止缺少结束标签，单标签不影响
    // 'vue/html-end-tags' 无配置项，不可更改
    // 防止在JSX使用的变量被标记为未使用
    // 'vue/jsx-uses-vars' 无配置项，不可更改
    // 要求注册的组件名与导入的组件名匹配
    // 'vue/match-component-import-name' 该规则为默认生效
    // 在Vue组件中强制 name 属性的特定大小写
    // 'vue/name-property-casing': ['error', 'PascalCase'],
    // 不允许使用箭头函数定义观察器
    // 'vue/no-arrow-functions-in-watch' 该规则默认生效，防止关联上下文，不建议修改
    // 在nextTick中强制承诺或回调样式 'promise' | 'callback'
    // 'vue/next-tick-style': ['error', 'promise'],
    // 不允许计算属性中的异步操作
    // 'no-async-in-computed-properties' 该规则为默认生效
    // 不允许访问数据中的计算属性 在data中，不允许使用计算属性
    // 'vue/no-computed-properties-in-data' 该规则为默认生效
    // 不允许在组件上使用v-model上的自定义修改器
    // 'vue/no-custom-modifiers-on-v-model' 该规则为默认生效
    // 不允许对数据使用不推荐使用的对象声明(在Vue.js 3.0.0+中)
    // 'vue/no-deprecated-data-object-declaration' 该规则为默认生效
    // 不允许使用弃用的destroyed和beforeDestroy生命周期挂钩(在Vue.js 3.0.0+中)
    // 'vue/no-deprecated-destroyed-lifecycle' 该规则为默认生效
    // 不允许使用不推荐使用的$listeners(在Vue.js 3.0.0+中)
    // 'vue/no-deprecated-dollar-listeners-api' 该规则为默认生效
    // 不允许使用不推荐使用的$scopedSlots(在Vue.js 3.0.0+中)
    // 'vue/no-deprecated-dollar-scopedslots-api' 该规则为默认生效
    // 不允许使用不推荐使用的事件api(在Vue.js 3.0.0+中)
    // 'vue/no-deprecated-events-api' 该规则为默认生效
    // 不允许使用不推荐使用的过滤器语法(在Vue.js 3.0.0+中)
    // 'vue/no-deprecated-filter' 该规则为默认生效
    // 不允许使用弃用的函数模板(在Vue.js 3.0.0+中)
    // 'vue/no-deprecated-functional-template' 该规则为默认生效
    // 不允许在HTML元素上使用不推荐使用的is属性(在Vue.js 3.0.0+中)
    // 'vue/no-deprecated-html-element-is' 该规则为默认生效
    // 不允许使用不推荐使用的内联模板属性(在Vue.js 3.0.0+中)
    // 'vue/no-deprecated-inline-template' 该规则为默认生效
    // 不允许在props默认函数中使用this(在Vue.js 3.0.0+中)
    // 'vue/no-deprecated-props-default-this' 该规则为默认生效
    // 不允许在RouterLink上使用不推荐使用的标记属性(在Vue.js 3.0.0+中)
    // 'vue/no-deprecated-router-link-tag-prop' 该规则为默认生效
    // 不允许不推荐使用的 scope 属性(在Vue.js 2.5.0+中)
    // 'vue/no-deprecated-scope-attribute' 该规则为默认生效
    // 不允许弃用的插槽属性(在Vue.js 2.6.0+中)
    // 'vue/no-deprecated-slot-attribute' 该规则为默认生效
    // 不允许不推荐使用的插槽范围属性(在Vue.js 2.6.0+中)
    // 'vue/no-deprecated-slot-scope-attribute' 该规则为默认生效
    // 不允许使用已弃用的。v-bind指令上的sync修饰符(在Vue.js 3.0.0+中)
    // 'vue/no-deprecated-v-bind-sync' 该规则为默认生效
    // 不允许废弃的v-is指令(在Vue.js 3.1.0+中)
    // 'vue/no-deprecated-v-is' 该规则为默认生效
    // 不允许使用已弃用的 .native 原生修饰符(在Vue.js 3.0.0+中)
    // 'vue/no-deprecated-v-on-native-modifier' 该规则为默认生效
    // 不允许使用不推荐使用的数字(键码)修饰符(在Vue.js 3.0.0+中)
    // 'vue/no-deprecated-v-on-number-modifiers' 该规则为默认生效
    // 不允许使用不推荐使用的Vue.config.keyCodes(在Vue.js 3.0.0+中)
    // 'vue/no-deprecated-vue-config-keycodes' 该规则为默认生效
    // 不允许v-if / v-else-if链中的重复条件
    // 'vue/no-dupe-v-else-if' 该规则为默认生效
    // 使用v-bind='$attrs '时，强制将inheritAttrs设置为false
    // 'vue/no-duplicate-attr-inheritance' 该规则为默认生效
    // 不允许< template> <script> <style >块为空
    // 'vue/no-empty-component-block' 该规则为默认生效
    // 在<script setup>中不允许导出
    // 'vue/no-export-in-script-setup' 该规则为默认生效
    // 不允许在 await 之后使用 expose
    // 'vue/no-expose-after-await' 该规则为默认生效
    // 模型选项中需要有效的密钥
    // 'vue/no-invalid-model-keys' 该规则已弃用，改用 'vue/valid-model-definition'
    // 不允许异步注册的生命周期挂钩
    // 'vue/no-lifecycle-after-await' 该规则为默认生效
    // 不允许将多个对象传递到类的数组中
    // 'vue/no-multiple-objects-in-class' 该规则为默认生效
    // 不允许向作用域插槽传递多个参数
    // 'vue/no-multiple-slot-args' 该规则为默认生效
    // 不允许向模板添加多个根节点 该规则检查模板是否包含对Vue 2有效的单个根元素
    // 'vue/no-multiple-template-root' 该规则为默认生效
    // 不允许组件属性的变异
    // 'vue/no-mutating-props' 该规则为默认生效
    // 不允许< template >中出现解析错误
    // 'vue/no-parsing-error' 该规则是一个具体的 options 配置 具体细节参考官方文档
    // 不允许组件属性中出现潜在的输入错误 会开启单词检测
    // 'vue/no-potential-component-option-typo': ['error', {'presets': ['all'], 'custom': ['test']}],
    // 不允许将ref() (Composition API)包装的值用作操作数
    // 'vue/no-ref-as-operand' 该规则为默认生效
    // 不允许对引用对象进行析构，否则会导致反应性丧失
    // 'vue/no-ref-object-destructure' 该规则为默认生效
    // 不允许覆盖保留键
    // 'vue/no-reserved-keys': 'error',
    // 不允许在 props 中保留名称 比如 ref | key
    // 'vue/no-reserved-props' 该规则为默认生效
    // 不允许使用的标签名称或块名称 ['error', ...] 格式
    // 'vue/no-restricted-block': 'error',
    // 不允许在异步 await 之后调用受限的方法 例如 restricted 模块里导出的 restricted 方法
    // 'vue/no-restricted-call-after-await': ['error', { 'module': 'restricted', 'path': 'restricted' }],
    // 不允许Vue组件中的特定类 限制使用的 class 名称 ['error', ...<String>] 格式
    // 'vue/no-restricted-class': 'error',
    // 不允许特定组件选项 限制data中禁止使用的属性或对象（包括自定义） ['error', ...<String>] 格式
    // 'vue/no-restricted-component-options': 'error',
    // 不允许特定自定义事件 限制data中禁止使用的事件（包括自定义） ['error', ...<String>] 格式
    // 'vue/no-restricted-custom-event': 'error',
    // 不允许特定的HTML元素 ['error', ...<String>] 格式
    // 'vue/no-restricted-html-elements': 'error',
    // 不允许特定的 props ['error', ...<String>] 格式
    // 'vue/no-restricted-props': 'error',
    // 不允许使用的标签属性 ['error', ...<String>] 格式
    // 'vue/no-restricted-static-attribute': 'error',
    // 不允许< template >中的指定语法
    // 'vue/no-restricted-syntax' 该规则为默认生效
    // 不允许使用 v-bind 的参数名称 ['error', ...<String>] 格式
    // 'vue/no-restricted-v-bind': 'error',
    // 不允许析构传递给安装程序的属性
    // 'vue/no-setup-props-destructure' 该规则为默认生效
    // 将组件的数据属性强制为函数
    // 'vue/no-shared-component-data' 该规则为默认生效
    // 不允许计算属性中的副作用 大概意思是不允许在计算属性中使用新的内存空间储存变量，尤其时数组操作的时候
    // 'vue/no-side-effects-in-computed-properties' 该规则为默认生效
    // 不允许< template >上的键属性
    // 'vue/no-template-key' 该规则为默认生效
    // 不允许变量声明隐藏在外部作用域中已声明的变量
    // 'vue/no-template-shadow' 该规则为默认生效
    // 不允许在< textarea >中使用 {{data}}
    // 'vue/no-textarea-mustache' 该规则为默认生效
    // 不允许在beforeRouteEnter方法中使用this
    // 'vue/no-this-in-before-route-enter' 该规则为默认生效
    // 不允许指定版本上不支持的Vue.js语法
    // 'vue/no-unsupported-features': ['error', {'version': '^2.6.0', 'ignores': []}],
    // 组件已注册但未使用
    // 'vue/no-unused-components' 该规则在官方文档找到索引但未查找到内容
    // 不允许未使用的属性 此规则不能在其他组件(例如mixins、通过$refs的属性访问)中使用，也不能在无法确定范围的地方使用
    // 'vue/no-unused-properties': ['error', {'groups': ['props'], 'deepData': false, 'ignorePublicMembers': false}],
    // 不允许未使用的refs 此规则不能在其他组件中使用(例如，mixins，通过$refs.x.$refs访问)。
    // 'vue/no-unused-refs' 该规则为默认生效
    // 不允许未使用的v-for指令或范围属性的变量定义 如果在指令中命名成立，则必须使用该定义
    // 当v-for指令或范围属性的定义与ignorePattern正则表达式匹配时，禁用报告。默认为空，不会忽略任何内容
    // 'vue/no-unused-vars': ['error', {'ignorePattern': '^_'}],
    // 不允许使用计算属性名称的方法
    // 'vue/no-use-computed-property-like-method' 该规则为默认生效
    // 不允许在与v-for相同的元素上使用v-if allowUsingIterationVar 为 true 时允许使用 item 下的属性作为 v-if 的值
    // 'vue/no-use-v-if-with-v-for': ['error', {'allowUsingIterationVar': false}],
    // 不允许< template >中不必要的文字或模板文字连接
    // 'vue/no-useless-concat' 该规则为默认生效
    // 禁止不必要的v-bind指令
    // 'vue/no-useless-v-bind': ['error', {'ignoreIncludesComment': false, 'ignoreStringEscape': false}],
    // 不允许将< template v-for >的 key 放在子元素上 Vue.js 3.x
    // 'vue/no-v-for-template-key-on-child' 该规则在Vue3默认生效 禁止与 'vue/no-v-for-template-key' 同时生效
    // 不允许<template v-for >上的 key 属性 Vue.js 2.x
    // 'vue/no-v-for-template-key' 该规则在Vue2默认生效 禁止与 'vue/no-v-for-template-key-on-child' 同时生效
    // 不允许向自定义组件中使用的v-model添加参数
    // 'vue/no-v-model-argument' 该规则为默认生效
    // 不允许组件上的v-text / v-html
    // 'vue/no-v-text-v-html-on-component' 该规则为默认生效
    // 不允许使用虚拟文本
    // 'vue/no-v-text' 该规则为默认生效
    // 不允许异步注册的观察器
    // 'vue/no-watch-after-await' 该规则为默认生效
    // 强制每个组件都应该对应一个文件
    // 'vue/one-component-per-file' 该规则为默认生效
    // 强制组件中的属性顺序 具体顺序在官方文档中可查
    // 'vue/order-in-components' 该规则为默认生效
    // 要求或不允许在块之间填充行
    // 'vue/padding-line-between-blocks': ['error', 'always' | 'never'],
    // 要求或不允许在模板中的同级标签之间换行
    // 'vue/padding-line-between-tags': ['error', [{ 'blankLine': 'always', 'prev': '*', 'next': '*' }]],
    // 组件定义中需要或不允许填充行 该规则可以设置一个具体的 options 配置 具体细节参考官方文档
    // 'vue/padding-lines-in-component-definition': ['error',<options>],
    // 强制从“vue”导入，而不是从“@vue/*”导入
    // 'vue/prefer-import-from-vue' 该规则为默认生效
    // 强制布尔首先出现在组件 prop type 中 type: [Boolean, String] 禁止 type: [String, Boolean]
    // 'vue/prefer-prop-type-boolean-first' 该规则为默认生效
    // 要求模板中的静态 class 名位于单独的 class 属性中
    // 'vue/prefer-separate-static-class' 该规则为默认生效
    // 需要v-bind:is 属于 < component >元素
    // 'vue/require-component-is' 该规则为默认生效
    // 要求 props 的默认值
    // 'vue/require-default-prop' 该规则为默认生效
    // 要求组件直接导出 禁止 const ComponentA = {name,data} 后再 export default ComponentA
    // 'vue/require-direct-export': ['error', {'disallowFunctionalComponentFunction': false}],
    // 在 emits 中需要类型定义
    // 'vue/require-emit-validator' 该规则为默认生效
    // 需要声明 emits: [] 属性 (Vue.js 3.0.0+)
    // 'vue/require-explicit-emits': ['error', {'allowProps': false}],
    // 要求使用expose声明公共属性 (Vue.js 3.0.0+)
    // 'vue/require-expose' 该规则为默认生效
    // 在Vue组件中需要一个 name 属性
    // 'vue/require-name-property' 该规则为默认生效
    // 需要适当的类型作为构造函数
    // 'vue/require-prop-type-constructor' 该规则为默认生效
    // 在props中需要类型定义
    // 'vue/require-prop-types' 该规则为默认生效
    // 强制 render 函数始终返回值
    // 'vue/require-render-return' 该规则为默认生效
    // 强制将$slots的属性用作函数的方式
    // 'vue/require-slots-as-functions' 该规则为默认生效
    // 要求控制< transition >内部内容的显示 内容元素需要 v-if | v-show
    // 'vue/require-toggle-inside-transition' 该规则为默认生效
    // 要求v-for指令同时使用:key
    // 'vue/require-v-for-key' 该规则为默认生效
    // 强制 prop 默认值符合给定的 type
    // 'vue/require-valid-default-prop' 该规则为默认生效
    // 强制计算属性中存在return语句 treatUndefinedAsUnspecified 禁止使用return语句隐式返回undefined
    // 'vue/return-in-computed-property': ['error', {'treatUndefinedAsUnspecified': true}],
    // 未知规则 该规则在官方文档找到索引但未查找到内容
    // 'vue/return-in-emits-validator' 该规则在官方文档找到索引但未查找到内容
    // 在< script >中强制一致的缩进 该规则会导致 js 文件与 vue 文件规则冲突
    // 'vue/script-indent': ['error', 2, {'baseIndent': 0, 'switchCase': 0, 'ignores': []}],
    // 防止< template >中使用的< script setup >变量被标记为未使用
    // 'vue/script-setup-uses-vars' 该规则为默认生效
    // 强制静态 class 名顺序
    // 'vue/static-class-names-order' 该规则为默认生效
    // 在“v-on”上强制使用“exact”修饰语
    // 'vue/use-v-on-exact' 该规则在官方文档找到索引但未查找到内容
    // 以下为 vue 检查强制有效的指令
    // 'vue/valid-attribute-name' 该规则为默认生效
    // 'vue/valid-define-emits' 该规则为默认生效
    // 'vue/valid-define-props' 该规则为默认生效
    // 'vue/valid-model-definition' 该规则为默认生效
    // 'vue/valid-next-tick' 该规则为默认生效
    // 'vue/valid-template-root' 该规则为默认生效
    // 'vue/valid-v-bind-sync' 该规则为默认生效
    // 'vue/valid-v-bind' 该规则为默认生效
    // 'vue/valid-v-cloak' 该规则为默认生效
    // 'vue/valid-v-else-if' 该规则为默认生效
    // 'vue/valid-v-else' 该规则为默认生效
    // 'vue/valid-v-for' 该规则为默认生效
    // 'vue/valid-v-html' 该规则为默认生效
    // 'vue/valid-v-if' 该规则为默认生效
    // 'vue/valid-v-is' 该规则为默认生效
    // 'vue/valid-v-memo' 该规则为默认生效
    // 'vue/valid-v-model' 该规则为默认生效
    // 'vue/valid-v-on' 该规则为默认生效
    // 'vue/valid-v-once' 该规则为默认生效
    // 'vue/valid-v-pre' 该规则为默认生效
    // 'vue/valid-v-show' 该规则为默认生效
    // 'vue/valid-v-slot' 该规则为默认生效
    // 'vue/valid-v-text' 该规则为默认生效
    /** 不建议设置的配置 end -------------------------------------------------- **/
  },

};
