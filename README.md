## scratch-www
#### Standalone web client for Scratch

[![Build Status](https://travis-ci.org/LLK/scratch-www.svg)](https://travis-ci.org/LLK/scratch-www)
[![Coverage Status](https://coveralls.io/repos/github/LLK/scratch-www/badge.svg?branch=develop)](https://coveralls.io/github/LLK/scratch-www?branch=develop)
[![dependencies Status](https://david-dm.org/llk/scratch-www/status.svg)](https://david-dm.org/llk/scratch-www)
[![devDependencies Status](https://david-dm.org/llk/scratch-www/dev-status.svg)](https://david-dm.org/llk/scratch-www?type=dev) [![Greenkeeper badge](https://badges.greenkeeper.io/LLK/scratch-www.svg)](https://greenkeeper.io/)

### Where am I?
Physically? No idea.

Digitally? You’re at Scratch’s open source web client!

We’re working to update the [Scratch website](https://scratch.mit.edu) to use a new codebase, contained in this repository.

We’re currently building Scratch using [React](https://facebook.github.io/react/) and [SCSS](http://sass-lang.com/documentation/file.SASS_REFERENCE.html). Here are some resources to help you get acquainted with how we’re working on the Scratch codebase:

* [Style Guide](https://github.com/LLK/scratch-www/wiki/Style-Guide)
* [Testing Guide](https://github.com/LLK/scratch-www/wiki/Testing-Guide-for-Bugfixes)
* [Localization Guide](https://github.com/LLK/scratch-www/wiki/Localization-Guide)
* [Map of the repository](https://github.com/LLK/scratch-www/wiki/Repo-Map)


### Before Getting Started
* Make sure you have node (v4.2 or higher) and npm [installed](https://docs.npmjs.com/getting-started/installing-node)
We use npm (Node Package Manager) to maintain and update packages required to build the site.

### Update Packages
It's important to make sure that all of the dependencies are up to date because the scratch-www code only works with specific versions of the dependencies. You can update the packages by running this command:

```bash
npm install
```

### To Build
To compile the source code into HTML and JavaScript bundles browsers can read, run this command:

```bash
npm run build
```
If you want to run a server that rebuilds the files as you edit them, skip to the To Run section below.

#### Warnings during npm install

These warnings can be safely ignored:

```bash
npm WARN react-modal@0.6.1 requires a peer of react@^0.14.0 but none was installed.
npm WARN react-redux@4.4.0 requires a peer of react@^0.14.0 but none was installed.
npm WARN react-redux@4.4.0 requires a peer of redux@^2.0.0 || ^3.0.0 but none was installed.
npm WARN react-addons-test-utils@0.14.7 requires a peer of react@^0.14.7 but none was installed.
npm WARN react-dom@0.14.8 requires a peer of react@^0.14.8 but none was installed.
```

These currently exist in static/js/lib

### To Run
If you would like to create a temporary version of the site on your machine that you can access through your web browser run the command below.  Building (see To Build above) is not necessary for this step and the temporary server can be turned off (see To Stop below).

The intl directory must be built separately with the `npm run translate` line below in order for the text to appear properly.

```bash
npm run translate
npm start
```

The site hosted on your local machine can now be accessed by a web browser by entering localhost:8333 into your web browser.

During development, `npm start` watches any update you make to files in either `./static` or `./src` and triggers a rebuild of the project.  In development, the build is stored in memory, and not served from the `./build` directory.

When running `npm start`, here are some important log messages to keep an eye out for:
* `webpack: bundle is now VALID.` – The bundle has been loaded into memory and is now viewable in the browser. This will show up both once `npm start` has completed its setup, and also once updates you make to files have been re-compiled for viewing in the browser.
* `webpack: bundle is now INVALID.` – If you see this, then it means you have made updates to files that are still being compiled for browser viewing. Pages will still be viewable, but they will not see any updates you made yet.

Once running, open `http://localhost:8333` in your browser. If you wish to have the server reload automatically, you can install either [nodemon](https://github.com/remy/nodemon) or [forever](https://github.com/foreverjs/forever).

### To stop
To stop the process that is making the site available to your web browser (created above in To Start) use `^C`.

#### Configuration

`npm start` can be configured with the following environment variables

| Variable        | Default                            | Description                                    |
| --------------- | ---------------------------------- | ---------------------------------------------- |
| `API_HOST`      | `https://api.scratch.mit.edu`      | Hostname for API requests                      |
| `ASSET_HOST`    | `https://assets.scratch.mit.edu`   | Hostname for asset requests                    |
| `BACKPACK_HOST` | `https://backpack.scratch.mit.edu` | Hostname for backpack requests                 |
| `PROJECT_HOST`  | `https://projects.scratch.mit.edu` | Hostname for project requests                  |
| `SENTRY_DSN`    | `''`                               | DSN for Sentry                                 |
| `FALLBACK`      | `''`                               | Pass-through location for old site             |
| `GA_TRACKER`    | `''`                               | Where to log Google Analytics data             |
| `NODE_ENV`      | `null`                             | If not `production`, app acts like development |
| `PORT`          | `8333`                             | Port for devserver (http://localhost:XXXX)     |

**NOTE:** Because by default `API_HOST=https://api.scratch.mit.edu`, please be aware that, by default, you will be seeing and interacting with real data on the Scratch website.

### Unit Tests
To run:
```bash
npm test
```
This will build the application and run the unit and localization tests.  Some of the tests are run using the TAP framework and others run using Jest.

### Integration tests
We are transitioning from using TAP to using Jest as our testing framework so for the time being our tests run using both.  

#### Running the tests

* By default, tests run against our Staging instance, but you can pass in a different location with the ROOT_URL environment variable (see below) if you want to run the tests against e.g. your local build

#### Running the tests
* Run all tests from the command-line: `$ SMOKE_USERNAME=username SMOKE_PASSWORD=password ROOT_URL=https://scratch.mit.edu npm run test:integration`
* To run a single file from the command-line using TAP: `$ SMOKE_USERNAME=username SMOKE_PASSWORD=password ROOT_URL=https://scratch.mit.edu node_modules/.bin/tap ./test/integration-legacy/smoke-testing/filename.js --timeout=3600`
  * The timeout var is for the length of the entire tap test-suite; if you are getting a timeout error, you may need to adjust this value (some of the Selenium tests take a while to run)
* To run a single file from the command-line using Jest: `$ SMOKE_USERNAME=username SMOKE_PASSWORD=password ROOT_URL=https://scratch.mit.edu node_modules/.bin/jest ./test/integration/filename.test.js`

#### Running Remote tests
* TAP tests can be run using Saucelabs, an online service that can test browser/os combinations remotely. Currently all tests are written for use for chrome on mac.
* You will need a Saucelabs account in order to use it for testing. To find the Access Key, click your username and select User Settings from the dropdown menu.  Near the bottom of the page is your access key that you can copy and use in the command line.
* Currently Jest tests will not run with Saucelabs.
* To run tests using saucelabs run this command `$ SMOKE_USERNAME=username SMOKE_PASSWORD=password SAUCE_USERNAME=saucelabsUsername SAUCE_ACCESS_KEY=saucelabsAccessKey ROOT_URL=https://scratch.mit.edu npm run test:integration:remote`

#### Configuration

| Variable      		| Default               | Description                                 			    |
| ---------------------	| --------------------- | --------------------------------------------------------- |
| `ROOT_URL`			| `scratch.ly`			| Location you want to run the tests against                |
| `SMOKE_USERNAME`    	| `None` 				| Username for Scratch user you're signing in with to test 	|
| `SMOKE_PASSWORD`  	| `None`                | Password for Scratch user you're signing in with to test  |
| `SMOKE_REMOTE`        | `false`               | Tests with Sauce Labs or not. True if running test:smoke:sauce |
| `SMOKE_HEADLESS`      | `false`               | Run browser in headless mode. Flaky at the moment         |
| `SAUCE_USERNAME`      | `None`                | Username for your Sauce Labs account                      |
| `SAUCE_ACCESS_KEY`    | `None`                | Access Key for Sauce Labs found under User Settings       |

### To Deploy

Deploying to staging or production will upload code to S3 and configure Fastly.

```bash
npm install
virtualenv ENV
. ENV/bin/activate
pip install -r requirements.txt
npm run build && npm run deploy
```

| Variable                 | Default | Description                                      |
| ------------------------ | ------- | ------------------------------------------------ |
| `FASTLY_SERVICE_ID`      | `''`    | Fastly service ID for `bin/configure-fastly.js`  |
| `FASTLY_API_KEY`         | `''`    | Fastly API key for `bin/configure-fastly.js`     |
| `FASTLY_ACTIVATE_CHANGES`| `false` | Activate changes and purge all after configuring |
| `AWS_ACCESS_KEY_ID`      | `''`    | AWS access key id for S3                         |
| `AWS_SECRET_ACCESS_KEY`  | `''`    | AWS secret access key for S3                     |
| `S3_BUCKET_NAME`         | `''`    | S3 bucket name to deploy into                    |


### Current issues with the development
We're currently in the process of transitioning into this web client from Scratch's existing structure. As we transition, there are going to be some issues along the way that relate to how this client needs to interact with the existing infrastructure to work properly in production.

#### FALLBACK
On top of migrating to using this as our web client, Scratch is also transitioning into using a new API backend, Scratch REST API. As that is also currently in development and incomplete, we are set up to fall back to using existing Scratch endpoints if an API endpoint does not exist – which is where the `FALLBACK` comes in.

Most of the issues we have currently revolve around the use of `FALLBACK`. This variable is used to specify what URL to fall back onto should a request fail within the context of this web client, or when using the `API_HOST`. If not specified in the process, it will not be used, and any request that is not made through the web client or the API will be unreachable.

Setting `FALLBACK=https://scratch.mit.edu` allows the web client to retrieve data from the Scratch website in your development environment. However, because of security concerns, trying to send data to Scratch through your development environment won't work. This means the following things will be broken for the time being:
* Login on the splash page (*In the process of being fixed*)
* Some update attempts to production data made through a development version of the web client

Additionally, if you set `FALLBACK=https://scratch.mit.edu`, be aware that clicking on links to parts of the website not yet migrated over (currently such as `Explore`, `Discuss`, `Profile`, etc.) will take you to the Scratch website itself.

#### Windows
Some users have experienced difficulties when trying to get our web client to work on Windows. One solution could be to use [Cygwin](https://www.cygwin.com/). If that doesn't work, you might want to use [Wubi](https://wiki.ubuntu.com/WubiGuide) (Windows XP, Vista, 7) or [Wubiuefi](https://github.com/hakuna-m/wubiuefi) (Windows 8 or higher). Wubi(uefi) is a Windows Installer for Ubuntu that allows you to have Ubuntu and Windows on one disk, without the need of an extra partition.

## 二次开发步骤

* 同步官方仓库

```sh
git clone git@github.com:quoyi/scratch-www.git
git remote add upstream https://github.com/LLK/scratch-www.git
git checkout develop
git fetch upstream
git merge upstream/develop
git push origin develop
```

* 安装依赖并运行

```sh
yarn
FALLBACK=https://scratch.mit.edu yarn start
```

* 访问 `http://localhost:8333`

## 代码结构分析

* ~~所有~~ 页面组件经过 `src/lib/render.jsx` 处理，添加 `store`、`本地化` 和 `设置挂载点` 后在组件内自渲染（即调用 render 方法）。
* ~~所有~~ 页面组件在自渲染时已应用 `Page` 组件包装，用于捕获系统错误（Sentry）、设置网站布局、根据运行环境设置不同样式类（控制显示内容）。
* `module.exports` 相当于 `module.exports.<variable>`，等同于 `require` 引入变量。[参考](https://www.jianshu.com/p/beafd9ac9656)

## 辅助

* 删除 Git 分支:

  ```sh
  > for up in `git branch -l | grep greenkeeper`; do git branch -D $up; done
  ```
  