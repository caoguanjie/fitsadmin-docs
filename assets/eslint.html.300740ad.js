import{J as u,K as d,L as v,M as n,N as e,T as o,Q as t,O as s,P as l}from"./clientConfigs.6078fcf8.js";var m="/images/20220825102734.png",k="/images/20220825102954.png",h="/images/20220825103554.png",g="/images/20220825103559.png",_="/images/20220825104459.png",b="/images/20220825110230.png",y="/images/20220825110317.png",f="/images/20220825110426.png";const x={},E=t(`<h1 id="eslint" tabindex="-1"><a class="header-anchor" href="#eslint" aria-hidden="true">#</a> ESLint</h1><p>\u5927\u5BB6\u77E5\u9053TypeScript\u53EF\u4EE5\u548CVue3\u4E00\u8D77\u5F00\u53D1\uFF0C\u628ATS\u5F3A\u7C7B\u578B\u7684\u8BED\u8A00\u7279\u6027\u5F15\u5165\u5230\u524D\u7AEF\u5DE5\u7A0B\u4E2D\u3002</p><p>\u8FD9\u53EF\u4EE5\u4F7F\u5F97\u6574\u4E2A\u5DE5\u7A0B\u7684\u4EE3\u7801\u66F4\u52A0\u5065\u58EE\u548C\u53EF\u9760\uFF0C\u4E0D\u4F1A\u7ECF\u5E38\u51FA\u73B0\u50CFJS\u90A3\u6837\u4EE3\u7801\u8FD0\u884C\u8D77\u6765\u540E\uFF0C\u624D\u77E5\u9053\u53D8\u91CF\u7684\u503C\u53EF\u80FD\u662F<code>undefined</code>\uFF0C\u8FD0\u884C\u65F6\u5F88\u96BE\u63A7\u5236\u9519\u8BEF\uFF0C\u5BFC\u81F4\u51FA\u73B0\u5404\u79CD\u8F6F\u4EF6\u7684Bug\u3002</p><p>\u9664\u4E86\u4EE3\u7801\u7684\u5065\u58EE\u6027\u548C\u53EF\u9760\u6027\uFF0C\u4E00\u4E2A\u4E2D\u5927\u578B\u7684\u524D\u7AEF\u7F51\u7AD9\u5F80\u5F80\u9700\u8981\u56E2\u961F\u534F\u4F5C\u5F00\u53D1\uFF0C\u4EE3\u7801\u98CE\u683C\u7684\u7EDF\u4E00\u6027\u53EF\u4EE5\u589E\u5F3A\u5DE5\u7A0B\u7684\u53EF\u7EF4\u62A4\u6027\u548C\u53EF\u9605\u8BFB\u6027\u3002</p><p>\u7531\u4E8EJS\u8BED\u8A00\u8BED\u6CD5\u7684\u7075\u6D3B\u548C\u591A\u53D8\uFF0C\u8FDE\u4E00\u53E5\u4EE3\u7801\u90FD\u53EF\u4EE5\u6709\u591A\u79CD\u5199\u6CD5\uFF0C\u5DE5\u7A0B\u7684\u4EE3\u7801\u98CE\u683C\u5F80\u5F80\u4F1A\u4E0D\u540C\u4EBA\u4E0D\u540C\u65F6\u95F4\u90FD\u4F1A\u6709\u4E0D\u4E00\u6837\u7684\u4EE3\u7801\u98CE\u683C\u3002</p><p>\u56E2\u961F\u534F\u4F5C\u5F00\u53D1\u524D\u7AEF\u7684\u65F6\u5019\uFF0C\u5F80\u5F80\u5E0C\u671B\u6709\u4E00\u4E2A\u5DE5\u5177\u53EF\u4EE5\u81EA\u52A8\u5316\u68C0\u67E5\u3001\u8B66\u544A\u3001\u5BF9\u4E0D\u5B89\u5168\u7684\u98CE\u683C\u4EE3\u7801\u62A5\u9519\u3001\u4E00\u952E\u4FEE\u6539\u3002</p><p>Vscode + Eslint\u65B9\u6848\uFF0C\u53EF\u4EE5\u5F88\u65B9\u4FBF\u5730\u5BF9Ts\u548CVue3\u5DE5\u7A0B\u6587\u4EF6\u4EE3\u7801\uFF0C\u5F00\u53D1\u65F6\u81EA\u52A8\u5316\u68C0\u67E5\u3001\u8B66\u544A\u3001\u5BF9\u4E0D\u5B89\u5168\u7684\u98CE\u683C\u4EE3\u7801\u62A5\u9519\u3001\u4E00\u952E\u4FEE\u6539\u3002</p><h2 id="\u9879\u76EE\u96C6\u6210" tabindex="-1"><a class="header-anchor" href="#\u9879\u76EE\u96C6\u6210" aria-hidden="true">#</a> \u9879\u76EE\u96C6\u6210</h2><p>npm\u5B89\u88C5eslint\u76F8\u5E94\u7684\u4F9D\u8D56</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> eslint --save-dev
<span class="token function">npm</span> <span class="token function">install</span> eslint-plugin-vue --save-dev
<span class="token function">npm</span> <span class="token function">install</span> @typescript-eslint/parser --save-dev
<span class="token function">npm</span> <span class="token function">install</span> @typescript-eslint/eslint-plugin --save-dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u8BF4\u660E\uFF1A</strong></p>`,11),V=n("li",null,[n("code",null,"eslint-plugin-vue"),s("\u53EF\u4EE5\u68C0\u67E5"),n("code",null,".vue"),s("\u540E\u7F00\u540D\u6587\u4EF6\u7684\u8BED\u6CD5\u683C\u5F0F\u95EE\u9898\u3002")],-1),S=n("code",null,"ESLint",-1),j=s(" \u9ED8\u8BA4\u4F7F\u7528"),T={href:"https://github.com/eslint/espree",target:"_blank",rel:"noopener noreferrer"},w=s("Espree"),L=s("\u89E3\u6790\u5668\u5C06\u4EE3\u7801\u89E3\u6790\u4E3AAST\u62BD\u8C61\u8BED\u6CD5\u6811\uFF0C\u7136\u540E\u518D\u5BF9\u4EE3\u7801\u8FDB\u884C\u68C0\u67E5\u3002"),q=n("code",null,"Espree",-1),A=s("\u200B\u4F1A\u65E0\u6CD5\u8BC6\u522B "),C=n("code",null,"TypeScript",-1),N=s(" \u7684\u4E00\u4E9B\u8BED\u6CD5\uFF0C\u6240\u4EE5\u9700\u8981\u5B89\u88C5"),B=n("code",null,"@typescript-eslint/parser",-1),J=s("\uFF0C\u66FF\u4EE3\u6389\u9ED8\u8BA4\u7684\u89E3\u6790\u5668\u3002"),P=n("li",null,[s("\u7531\u4E8E"),n("code",null,"@typescript-eslint/parser"),s("\u5BF9\u4E00\u90E8\u5206 ESLint \u89C4\u5219\u652F\u6301\u6027\u4E0D\u597D\uFF0C\u6240\u4EE5\u9700\u8981\u5B89\u88C5"),n("code",null,"@typescript-eslint/eslint-plugin"),s("\uFF0C\u66FF\u6362\u4E00\u4E9B\u652F\u6301\u6027\u4E0D\u597D\u7684\u89C4\u5219\u3002")],-1),F=t('<h2 id="vscode\u652F\u6301" tabindex="-1"><a class="header-anchor" href="#vscode\u652F\u6301" aria-hidden="true">#</a> vscode\u652F\u6301</h2><div class="custom-container warning"><p class="custom-container-title">\u63D0\u9192\uFF1Avscode\u52A1\u5FC5\u66F4\u65B0\u6700\u65B0\u7684\u7248\u672C\uFF0C\u907F\u514D\u51FA\u73B0\u4E0D\u5FC5\u8981\u7684\u9519\u8BEF</p></div><p>\u4E00\u5B9A\u8981\u5B89\u88C5\u4E0B\u9762\u4E24\u4E2Avscode\u7684\u63D2\u4EF6\u652F\u6301vue3\u8BED\u6CD5\uFF1A</p><ol><li><code>Volar\uFF08Vue Language Features\uFF09</code> \u662F\u5B98\u65B9\u7684 <code>VSCode</code> \u6269\u5C55\uFF0C\u63D0\u4F9B\u4E86 <code>Vue</code> \u5355\u6587\u4EF6\u7EC4\u4EF6\u4E2D\u7684 <code>TypeScript</code> \u652F\u6301\uFF0C<code>.vue</code>\u6587\u4EF6\u7684\u7F16\u7801\u89C4\u8303\uFF0C\u8FD8\u4F34\u968F\u7740\u4E00\u4E9B\u5176\u4ED6\u975E\u5E38\u68D2\u7684\u7279\u6027\u3002</li><li><code>TypeScript Vue Plugin </code>\u7528\u4E8E\u652F\u6301\u5728 TS \u4E2D <code>import *.vue</code> \u6587\u4EF6,\u8F93\u5165 <code>import</code> \u8BED\u53E5\u65F6\uFF0C<code>.vue* </code>\u6587\u4EF6\u4E5F\u4F1A\u51FA\u73B0\u4EE5\u8FDB\u884C\u81EA\u52A8\u5B8C\u6210\u3002\u5728 <code>*.ts</code> \u6587\u4EF6\u4E2D\u67E5\u627E\u5F15\u7528\u65F6\uFF0C\u60A8\u8FD8\u53EF\u4EE5\u4ECE <code>*.vue</code> \u6587\u4EF6\u4E2D\u83B7\u5F97\u7ED3\u679C\u3002</li></ol><p><img src="'+m+'" alt="\u56FE 1"></p><div class="custom-container danger"><p class="custom-container-title">\u8B66\u544A</p><p>Volar \u53D6\u4EE3\u4E86\u6211\u4EEC\u4E4B\u524D\u4E3A Vue 2 \u63D0\u4F9B\u7684\u5B98\u65B9 VSCode \u6269\u5C55 Vetur\u3002\u5982\u679C\u4F60\u4E4B\u524D\u5DF2\u7ECF\u5B89\u88C5\u4E86 Vetur\uFF0C\u8BF7\u786E\u4FDD\u5728 Vue 3 \u7684\u9879\u76EE\u4E2D\u7981\u7528\u5B83\u3002</p></div><p><strong>\u641C\u7D22Eslint\u63D2\u4EF6\u5E76\u70B9\u51FBinstall\u5B89\u88C5</strong></p><p><img src="'+k+'" alt="\u56FE 2"></p><h2 id="\u9009\u53D6volar\u9ED8\u8BA4\u683C\u5F0F\u5316\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u9009\u53D6volar\u9ED8\u8BA4\u683C\u5F0F\u5316\u914D\u7F6E" aria-hidden="true">#</a> \u9009\u53D6volar\u9ED8\u8BA4\u683C\u5F0F\u5316\u914D\u7F6E</h2><p>\u6253\u5F00\u9879\u76EE\u4E2D\u4EFB\u4F55\u4E00\u4E2Avue\u7684\u6587\u4EF6\uFF0C\u7136\u540E\u53F3\u952E\u83DC\u5355\uFF0C\u9009\u4E2D<strong>\u4F7F\u7528...\u683C\u5F0F\u5316\u6587\u6863</strong>\uFF0C\u9009\u53D6volar\u4F5C\u4E3Avue3\u9879\u76EE\u7684\u9ED8\u8BA4\u683C\u5F0F\u5316\u5DE5\u5177</p><p><img src="'+h+'" alt="\u56FE 3" height="300"><br><img src="'+g+'" alt="\u56FE 4"></p><h2 id="\u521B\u5EFAeslint\u89C4\u5219\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u521B\u5EFAeslint\u89C4\u5219\u6587\u4EF6" aria-hidden="true">#</a> \u521B\u5EFAEslint\u89C4\u5219\u6587\u4EF6</h2><p>\u4E3B\u8981\u662F\u5728\u9879\u76EE\u4E2D\u521B\u5EFAEslint\u89C4\u5219\u6587\u4EF6<code>.eslintrc.js</code>\u548CEslint\u5FFD\u7565\u68C0\u67E5\u914D\u7F6E\u6587\u4EF6<code>.eslintignore</code></p><p><img src="'+_+'" alt="\u56FE 5"></p>',14),I=n("div",{class:"language-javascript ext-js line-numbers-mode"},[n("pre",{class:"language-javascript"},[n("code",null,[s("module"),n("span",{class:"token punctuation"},"."),s("exports "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token literal-property property"},"env"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token literal-property property"},"browser"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token boolean"},"true"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token literal-property property"},"es2021"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token boolean"},"true"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token literal-property property"},"node"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token boolean"},"true"),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"globals"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token literal-property property"},"defineProps"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'readonly'"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token literal-property property"},"defineEmits"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'readonly'"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token literal-property property"},"defineExpose"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'readonly'"),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"parser"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'vue-eslint-parser'"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token keyword"},"extends"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),s(`
    `),n("span",{class:"token string"},"'eslint:recommended'"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token string"},"'plugin:vue/vue3-essential'"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token string"},"'plugin:@typescript-eslint/recommended'"),s(`
  `),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"parserOptions"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token literal-property property"},"ecmaVersion"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'latest'"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token literal-property property"},"parser"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'@typescript-eslint/parser'"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token literal-property property"},"sourceType"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'module'"),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"plugins"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"["),n("span",{class:"token string"},"'vue'"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},"'@typescript-eslint'"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"rules"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token string-property property"},"'vue/multi-word-component-names'"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'off'"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token string-property property"},"'@typescript-eslint/no-empty-function'"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'off'"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token comment"},"// \u5173\u95ED\u7A7A\u65B9\u6CD5\u68C0\u67E5"),s(`
    `),n("span",{class:"token string-property property"},"'@typescript-eslint/no-explicit-any'"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'off'"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token comment"},"// \u5173\u95EDany\u7C7B\u578B\u7684\u8B66\u544A"),s(`
    `),n("span",{class:"token string-property property"},"'vue/no-v-model-argument'"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token string"},"'off'"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),O=n("div",{class:"language-text ext-text line-numbers-mode"},[n("pre",{class:"language-text"},[n("code",null,`*.sh
node_modules
*.md
*.woff
*.ttf
.vscode
.idea
dist
/public
/docs
.husky
.local
/bin
.eslintrc.js
prettier.config.js
src/assets
`)]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),H=t(`<h2 id="\u81EA\u52A8\u4FEE\u590D\u89C4\u5219" tabindex="-1"><a class="header-anchor" href="#\u81EA\u52A8\u4FEE\u590D\u89C4\u5219" aria-hidden="true">#</a> \u81EA\u52A8\u4FEE\u590D\u89C4\u5219</h2><ol><li>\u5728<code>package.json</code>\u6587\u4EF6\u4E2D\u521B\u5EFAeslint\u8FD0\u884C\u811A\u672C\u547D\u4EE4</li></ol><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
       ...
        <span class="token property">&quot;lint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eslint src/**/*.{ts,js,vue} --fix&quot;</span><span class="token punctuation">,</span>
       ...
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>VsCode\u4F1A\u6839\u636EEslint\u63D2\u4EF6\u542F\u52A8\u81EA\u52A8\u63D0\u793A\u4E0D\u826F\u98CE\u683C\u4EE3\u7801\u529F\u80FD\u548C\u4E00\u952E\u4FEE\u590D\u529F\u80FD</li></ol><p><strong>\u4F8B\u5B50\uFF1A</strong></p><ul><li>App.vue\u6587\u4EF6\u4E2D\u88ABEslint\u63D2\u4EF6\u53D1\u73B0\u4E86\u4E00\u4E2A\u4E0D\u826F\u98CE\u683C\u4EE3\u7801\u8B66\u544A\uFF0C\u9EC4\u8272\u6CE2\u6D6A\u7EBF\u63D0\u793A</li></ul><p><img src="`+b+'" alt="\u56FE 6"></p><ul><li>\u67E5\u770B\u5177\u4F53\u8B66\u544A\uFF08vue/html-self-closing\u8B66\u544A\uFF09</li></ul><p><img src="'+y+'" alt="\u56FE 7"></p><ul><li>\u4F7F\u7528Eslint\u4E00\u952E\u4FEE\u590D\u529F\u80FD\u6216\u8005\u6267\u884Ceslint\u8FD0\u884C\u811A\u672C\u547D\u4EE4\u5168\u5C40\u4FEE\u590D</li></ul><p><img src="'+f+`" alt="\u56FE 8"></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u6216\u8005\u6267\u884Ceslint\u8FD0\u884C\u811A\u672C\u547D\u4EE4\u5168\u5C40\u4FEE\u590D</span>
<span class="token function">npm</span> run lint
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u66F4\u591A\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u66F4\u591A\u914D\u7F6E" aria-hidden="true">#</a> \u66F4\u591A\u914D\u7F6E</h2>`,13),K=s("\u8FD9\u6837\u6BCF\u6B21\u4FDD\u5B58\u7684\u65F6\u5019\u5C31\u53EF\u4EE5\u6839\u636E\u6839\u76EE\u5F55\u4E0B"),M=n("code",null,".eslintrc.js ",-1),Q=s("\u4F60\u914D\u7F6E\u7684"),z=n("code",null," eslint",-1),D=s(" \u89C4\u5219\u6765\u68C0\u67E5\u548C\u505A\u4E00\u4E9B\u7B80\u5355\u7684"),G=n("code",null," fix",-1),R=s("\u3002\u6BCF\u4E2A\u4EBA\u548C\u56E2\u961F\u90FD\u6709\u81EA\u5DF1\u7684\u4EE3\u7801\u89C4\u8303\uFF0C\u7EDF\u4E00\u5C31\u597D\u4E86\uFF0C\u53BB\u6253\u9020\u4E00\u4EFD\u5C5E\u4E8EFitsAdmin\u7684 "),U=n("code",null,"eslint",-1),W=s(" \u89C4\u5219\uFF0C\u4E5F\u53EF\u4EE5\u53C2\u8003\u997F\u4E86\u4E48\u56E2\u961F\u7684 "),X={href:"https://www.npmjs.com/package/eslint-config-elemefe",target:"_blank",rel:"noopener noreferrer"},Y=s("ESlint config"),Z=s("\uFF0Cvue \u7684"),$={href:"https://github.com/vuejs/eslint-config-vue",target:"_blank",rel:"noopener noreferrer"},nn=s("ESlint config"),sn=s("\u3002"),en={href:"https://github.com/varHarrie/varharrie.github.io/issues/10",target:"_blank",rel:"noopener noreferrer"},an=s("vscode \u63D2\u4EF6\u548C\u914D\u7F6E\u63A8\u8350");function tn(on,ln){const a=l("ExternalLinkIcon"),i=l("Tabs");return d(),v("div",null,[E,n("ol",null,[V,n("li",null,[S,j,n("a",T,[w,e(a)]),L,q,A,C,N,B,J]),P]),F,e(i,{data:[{title:".eslintrc.js"},{title:".eslintignore"}],active:0},{tab0:o(({title:r,value:c,isActive:p})=>[I]),tab1:o(({title:r,value:c,isActive:p})=>[O]),_:1},8,["data"]),H,n("p",null,[K,M,Q,z,D,G,R,U,W,n("a",X,[Y,e(a)]),Z,n("a",$,[nn,e(a)]),sn]),n("p",null,[n("a",en,[an,e(a)])])])}var cn=u(x,[["render",tn],["__file","eslint.html.vue"]]);export{cn as default};
