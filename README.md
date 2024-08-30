<p align="center">
  <img src="https://raw.githubusercontent.com/hdrdevs/cedro/main/public/cedro-logo.svg" alt="Cedro" width="170">
</p>

<h1 align="center">cedro</h1>

Javascript library to build user interfece based on widgets.

<div align="center">

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/hdrdevs/cedro/blob/HEAD/LICENSE)
[![npm latest package](https://img.shields.io/npm/v/cedro)](https://www.npmjs.com/package/cedro)
[![npm downloads](https://img.shields.io/npm/dm/cedro)](https://www.npmjs.com/package/cedro)

</div>

## Cedro Demo

We have created a live demo of **Cedro** on CodeSandbox for you to explore its capabilities. This template provides a hands-on experience, allowing you to see Cedro in action and experiment with it in real-time.

[Check out the Cedro Demo on CodeSandbox](https://pyskv2-5173.csb.app)

Feel free to [fork the template](https://codesandbox.io/p/github/hdrdevs/vite-cedro/main?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522cm0gzwaud000620684w92xute%2522%252C%2522sizes%2522%253A%255B100%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522cm0gzwaud000220684q50obd6%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522cm0gzwaud00042068wm2ct2dl%2522%257D%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522cm0gzwaud00052068l97sq7ys%2522%257D%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522cm0gzwaud000220684q50obd6%2522%253A%257B%2522id%2522%253A%2522cm0gzwaud000220684q50obd6%2522%252C%2522activeTabId%2522%253A%2522cm0h02bw900372068zcijoffp%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522cm0gzwaud00012068qh732zgi%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252FREADME.md%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%252C%257B%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252F.codesandbox%252Ftasks.json%2522%252C%2522id%2522%253A%2522cm0h02bw900372068zcijoffp%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%255D%257D%252C%2522cm0gzwaud00052068l97sq7ys%2522%253A%257B%2522id%2522%253A%2522cm0gzwaud00052068l97sq7ys%2522%252C%2522activeTabId%2522%253A%2522cm0gzwce5000d2068swd73pqe%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522SETUP_TASKS%2522%252C%2522id%2522%253A%2522cm0gzwce5000d2068swd73pqe%2522%252C%2522mode%2522%253A%2522permanent%2522%257D%255D%257D%252C%2522cm0gzwaud00042068wm2ct2dl%2522%253A%257B%2522id%2522%253A%2522cm0gzwaud00042068wm2ct2dl%2522%252C%2522activeTabId%2522%253A%2522cm0gzwf76000k2068v1hzvy3c%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522cm0gzwaud00032068ac13dwl5%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522NEW_TERMINAL%2522%257D%252C%257B%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522id%2522%253A%2522cm0gzwf76000k2068v1hzvy3c%2522%252C%2522mode%2522%253A%2522permanent%2522%257D%255D%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D) and customize it to suit your needs. This is a great way to start learning how to build complex user interfaces with Cedro.

## Documentation

Visit [https://cedro.hdrdevs.com.ar](https://cedro.hdrdevs.com.ar) to view the full documentation.

## Getting Started

Install Vite project template from command line

```sh
npm install -g degit
npx degit hdrdevs/vite-cedro#main my-app-name
cd my-app-name
npm install
npm run dev
```

## License

This project is licensed under the terms of the
[MIT license](/LICENSE).
