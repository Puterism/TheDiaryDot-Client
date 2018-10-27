<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Nanum+Myeongjo');
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  height: 100vh;
  background-color: rgb(240, 238, 225);
  overflow-x: hidden;
}

.container {
  width: 60vw;
  margin: 0 auto 30px auto;
  display: flex;
  flex-direction: column;
}

@media only screen and (min-width: 701px) {
  .container, .diary-writer, .header, .diary-reader-monthpicker {
    min-width: 650px;
  }
}

@media only screen and (max-width: 700px) {
  .container, .diary-writer, .header, .diary-reader-monthpicker {
    width: 95vw !important;
  }
  .header, .diary-reader-monthpicker {
    min-width: 500px;
  }
}

#app {
  font-family: 'Nanum Myeongjo', Helvetica, sans-serif, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
