<template>
  <div id="tabBox">
    <div class="tabMenues">
      <div class="tabs" v-for="item in items" :key="item.menu">
        <input type="radio" :value="item.value" :id="item.name" v-model="isActive" />
        <label @click="click(item.value)" :for="item.name">{{item.menu}}</label>
      </div>
    </div>
  <div class="header-logo-menu">
  <div id="nav-drawer">
      <input id="nav-input" type="checkbox" class="nav-unshown">
      <label id="nav-open" for="nav-input"><span></span></label>
      <label class="nav-unshown" id="nav-close" for="nav-input"></label>
      <div id="nav-content">ここに中身を入れる</div>
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
#nav-drawer {
  position: relative;
}

/*チェックボックス等は非表示に*/
.nav-unshown {
  display:none;
}

/*アイコンのスペース*/
#nav-open {
  display: inline-block;
  width: 30px;
  height: 22px;
  vertical-align: middle;
}

/*ハンバーガーの形をCSSで表現*/
#nav-open span, #nav-open span:before, #nav-open span:after {
  position: absolute;
  height: 3px;/*線の太さ*/
  width: 25px;/*長さ*/
  border-radius: 3px;
  background: #555;
  display: block;
  content: '';
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
  transition: .3s ease-in-out;
}

/*メニューの中身*/
#nav-content {
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 90%;
  max-width: 330px;/*最大幅（お好みで調整を）*/
  height: 100%;
  background: #fff;
  transition: .3s ease-in-out;
  -webkit-transform: translateX(-105%);
  transform: translateX(-105%);
}

/*チェックがついたら表示させる*/
#nav-input:checked ~ #nav-close {
  display: block;
  opacity: .5;
}

#nav-input:checked ~ #nav-content {
  -webkit-transform: translateX(0%);
  transform: translateX(0%);
  box-shadow: 6px 0 25px rgba(0,0,0,.15);
}

.header-logo-menu{
 display: flex;
 display: -moz-flex;
 display: -o-flex;
 display: -webkit-flex;
 display: -ms-flex;
 flex-direction: row;
 -moz-flex-direction: row;
 -o-flex-direction: row;
 -webkit-flex-direction: row;
 -ms-flex-direction: row;
}

/*ロゴやサイトタイトルをセンタリング*/
.logo-area{text-align:center;margin:auto;}

@media screen and (min-width:600px) {
   #nav-drawer {
     display:none;
   }
 }










.tabs {
  display: flex;
  box-shadow: 5px 5px 6px -3px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
}
.tabs input {
  display: none;
}
.tabs label {
  text-align: center;
  cursor: pointer;
  padding: 1rem 5rem;
  font-family: "Gabriola", "Skia-Regular_Condensed", "Noteworthy", sans-serif;
  transition: all 0.6s 0s ease;
}
.tabMenues {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  background: #e9e9e8;
}

.tabs:nth-child(1) input:checked + label,
.tabs:nth-child(1) label:hover {
  background: rgb(250, 253, 60);
}
.tabs:nth-child(2) input:checked + label,
.tabs:nth-child(2) label:hover {
  background: rgb(116, 255, 60);
}
.tabs:nth-child(3) input:checked + label,
.tabs:nth-child(3) label:hover {
  background: rgb(60, 226, 255);
}
.tabs:nth-child(4) input:checked + label,
.tabs:nth-child(4) label:hover {
  background: rgb(253, 60, 60);
}
.tabs:nth-child(5) input:checked + label,
.tabs:nth-child(5) label:hover {
  background: rgb(60, 253, 108);
  transition: all 0.5s 0s ease;
}
.tabs:nth-child(6) input:checked + label,
.tabs:nth-child(6) label:hover {
  background: rgb(182, 182, 182);
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

</style>