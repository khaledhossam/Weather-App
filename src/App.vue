<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700,900&display=swap');
:root {
  --gradient: linear-gradient(135deg, #72edf2 10%, #5151e5 100%);
}

* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 1.25em;
  margin: 0;
}

.clear {
  clear: both;
}

body {
  font-family: 'Montserrat', sans-serif;
  background-color: #343d4b;
  overflow-x: hidden;
}

input {
  width: 100%;
  padding: 1rem;
  border-radius: 1.563rem;
  border: none;
  background-color: #222831;
  color: #ffffff;
}

input:focus {
  outline: none;
}

button {
  color: #ffffff;
  border: none;
  padding: 0.99rem 3rem;
  border-radius: 1.563rem;
  cursor: pointer;
}

::-webkit-scrollbar {
  width: 0.625rem;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
