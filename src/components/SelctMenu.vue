<template>
     <div id="menu">
      <button class="menu-list" v-for="item in menu_list" :key="item.name">{{item.name}}</button>
    </div>
</template>

<script>
export default {
  name: "SelecVar",
  data() {
    return {
      menu_list: [
        { name: "Javascript" },
        { name: "Vue.js" },
        { name: "React" },
        { name: "Angular" },
        { name: "Node.js" },
        { name: "Other" }
      ]
    };
  },
};
</script>

<style scoped>
#header {
  background: #f6f6f6;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  font-family: "Gabriola", "Skia-Regular_Condensed", "Noteworthy", sans-serif;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
ul {
  display: flex;
  list-style: none;
}
li {
  font-size: 2.5em;
  text-decoration: none;
  padding: 1rem;
}

a:hover {
  color: rgb(160, 160, 160);
}

.navbar_log {
  font-size: 4.5em;
  font-weight: 300;
  margin: 0;
  padding: 1rem;
  text-shadow: 2px 2px 3px #acabab;
}

#menu {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  text-shadow: 6px 6px 10px #acabab;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  background: #e9e9e8;
}
.menu-list {
  padding: 1rem 3rem;

  cursor: pointer;
}
.menu-list:nth-child(1):hover {
  background: rgb(250, 253, 60);
}
.menu-list:nth-child(2):hover {
  background: rgb(116, 255, 60);
}
.menu-list:nth-child(3):hover {
  background: rgb(60, 226, 255);
}
.menu-list:nth-child(4):hover {
  background: rgb(253, 60, 60);
}
.menu-list:nth-child(5):hover {
  background: rgb(60, 253, 108);
}
.menu-list:nth-child(6):hover {
  background: rgb(182, 182, 182);
}

button {
  color: rgb(97, 97, 97);
  padding: 8px 15px;
  border-radius: 5px;
  box-shadow: 5px 5px 6px -3px rgba(0, 0, 0, 0.5);
  font-weight: 300;
  border: none; /* 枠線を消す */
  outline: none; /* クリックしたときに表示される枠線を消す */
  background: transparent;
}
</style>