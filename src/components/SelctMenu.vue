<template>
  <div id="tabBox">
    <div class="tabMenues">
      <div class="tabs" v-for="item in items" :key="item.menu">
        <input type="radio" :value="item.value" :id="item.name" v-model="isActive" />
        <label @click="click(item.value)" :for="item.name">{{item.menu}}</label>
      </div>
    </div>
    <div class="header-logo-menu">
      <!-- ハンバーガーメニュー -->
      <div id="nav-drawer">
        <input id="nav-input" type="checkbox" class="nav-unshown" />
        <label id="nav-open" for="nav-input">
          <span></span>
        </label>
        <label class="nav-unshown" id="nav-close" for="nav-input"></label>
        <div id="nav-content">
          <div class="menus_drawer" v-for="item in items" :key="item.menu">
            <input type="radio" :value="item.value" :id="item.name" v-model="isActive" />
            <label @click="click(item.value)" :for="item.name">{{item.menu}}</label>
          </div>
        </div>
      </div>
    </div>

    <!-- タブメニュークリック時にクリックされたitemsのvalueを渡す -->
    <Contents></Contents>
  </div>
</template>
<script>
import Contents from "../components/Contents";

export default {
  components: { Contents },
  data() {
    return {
      // タブメニューの初期値
      isActive: "JavascriptValue",
      // タブコンテンツの初期値
      // clicked: "JavascriptValue",
      clicked: "",

      items: [
        { menu: "Javascript", value: "JavascriptValue", name: "JavascriptTab" },
        { menu: "Vue.js", value: "VueValue", name: "VueTab" },
        { menu: "React", value: "ReacValue", name: "ReactTab" },
        { menu: "Angular", value: "AngularValue", name: "AngularTab" },
        { menu: "Node.js", value: "NodeValue", name: "NodeTab" },
        { menu: "Other", value: "OtherValue", name: "OtherTab" }
      ]
    };
  },
  methods: {
    click(value) {
      this.$store.commit("changeValue", value);
    }
  }
};
</script>
<style scoped>
.tabs {
  display: flex;
 
}
.tabs input, .menus_drawer input {
  display: none;
}
.tabs label {
  text-align: center;
  cursor: pointer;
  padding: 1rem 5rem;
  font-family: "century","Gabriola", "Skia-Regular_Condensed", "Noteworthy", sans-serif;
  font-weight: bold;
  transition: all 0.6s 0s ease;
}
.tabMenues {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
 background: rgba(56, 56, 56, 0.842);
 color: rgba(255,255,255,.9);
 
}


.menus_drawer:nth-child(1) input:checked + label,
.tabs:nth-child(1) input:checked + label,
.tabs:nth-child(1) label:hover {
  background: rgba(250, 253, 60, 0.8);
}
.menus_drawer:nth-child(2) input:checked + label,
.tabs:nth-child(2) input:checked + label,
.tabs:nth-child(2) label:hover {
  background: rgb(116, 255, 60, 0.8);
}
.menus_drawer:nth-child(3) input:checked + label,
.tabs:nth-child(3) input:checked + label,
.tabs:nth-child(3) label:hover {
  background: rgb(60, 226, 255, 0.8);
}
.menus_drawer:nth-child(4) input:checked + label,
.tabs:nth-child(4) input:checked + label,
.tabs:nth-child(4) label:hover {
  background: rgb(253, 60, 60, 0.8);
}
.menus_drawer:nth-child(5) input:checked + label,
.tabs:nth-child(5) input:checked + label,
.tabs:nth-child(5) label:hover {
  background: rgb(60, 253, 108, 0.8);
  transition: all 0.5s 0s ease;
}
.menus_drawer:nth-child(6) input:checked + label,
.tabs:nth-child(6) input:checked + label,
.tabs:nth-child(6) label:hover {
  background: rgb(182, 182, 182, 0.8);
}

/* ハンバーガーメニュー */
#nav-drawer {
  position: relative;
  margin-left: 1em;
  margin-top: 2em;
}

/*チェックボックス等は非表示に*/
.nav-unshown {
  display: none;
}

/*アイコンのスペース*/
#nav-open {
  display: inline-block;
  width: 30px;
  height: 22px;
  vertical-align: middle;
}

/*ハンバーガーの形をCSSで表現*/
#nav-open span,
#nav-open span:before,
#nav-open span:after {
  position: absolute;
  height: 3px; /*線の太さ*/
  width: 25px; /*長さ*/
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.842);
  display: block;
  content: "";
  cursor: pointer;
}
#nav-open span:before {
  bottom: -8px;
}
#nav-open span:after {
  bottom: -16px;
}

/*閉じる用の薄黒箇所*/
#nav-close {
  display: none;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0;
  transition: 0.3s ease-in-out;
}

/*メニューの中身*/
#nav-content {
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 40%;
  max-width: 330px; /*最大幅（お好みで調整を）*/
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  color: bisque;
  transition: 0.3s ease-in-out;
  -webkit-transform: translateX(-105%);
  transform: translateX(-105%);
  font-size: 1.8em;
  padding: 2em;
  font-weight: bold;
}
#nav-content .menus_drawer {
  margin-bottom: 0.8em;
}

#nav-content .menus_drawer:hover {
  color: rgb(78, 125, 255);
  display: inline-block;
  border-bottom: solid 1px rgb(78, 125, 255);
}

/*チェックがついたら表示させる*/
#nav-input:checked ~ #nav-close {
  display: block;
  opacity: 0.5;
}

#nav-input:checked ~ #nav-content {
  transform: translateX(0%);
  box-shadow: 6px 0 25px rgba(0, 0, 0, 0.15);
}

.header-logo-menu {
  display: flex;
  flex-direction: row;
}

@media screen and (min-width: 600px) {
  #nav-drawer {
    display: none;
  }
}

@media screen and (max-width: 900px) {
  .tabs label {
    padding: 1rem 3rem;
  }
}

@media screen and (max-width: 768px) {
  .tabs label {
    padding: 1rem 2.5rem;
    font-size: 0.8em;
  }
}

@media screen and (max-width: 600px) {
  .tabs label {
    padding: 1rem 2rem;
  }
  #nav-drawer {
    display: block;
  }
  .tabMenues {
    display: none;
  }
}
@media screen and (max-width: 375px) {
  #nav-content {
    font-size: 1.5em;
  }
}
</style>