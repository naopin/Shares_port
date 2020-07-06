
<template>
  <div id="tabBox">
    <div class="tabMenues">
      <div class="tabs" v-for="item in items" :key="item.menu">
        <input type="radio" :value="item.value" :id="item.name" v-model="isActive" />
        <label :for="item.name">{{item.menu}}</label>
      </div>
    </div>
    <ul id="contents">
      <transition name="fade">
        <li v-if="isActive == 'JavascriptValue'">
          <p class="title">テスト</p>
          <p>JavascriptValue</p>
        </li>
      </transition>
      <transition name="fade">
        <li v-if="isActive == 'VueValue'">
          <p class="title">テスト2</p>
          <p>VueValue</p>
        </li>
      </transition>
      <transition name="fade">
        <li v-if="isActive == 'ReacValue'">
          <p class="title">テスト3</p>
          <p>ReacValue</p>
        </li>
      </transition>
      <transition name="fade">
        <li v-if="isActive == 'AngularValue'">
          <p class="title">テスト3</p>
          <p>AngularValue</p>
        </li>
      </transition>
      <transition name="fade">
        <li v-if="isActive == 'NodeValue'">
          <p class="title">テスト3</p>
          <p>NodeValue</p>
        </li>
      </transition>
      <transition name="fade">
        <li v-if="isActive == 'OtherValue'">
          <p class="title">テスト3</p>
          <p>NOtherValue</p>
        </li>
      </transition>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: "JavascriptValue",
      items: [
        { menu: "Javascript", value: "JavascriptValue", name: "JavascriptTab" },
        { menu: "Vue.js", value: "VueValue", name: "VueTab" },
        { menu: "React", value: "ReacValue", name: "ReactTab" },
        { menu: "Angular", value: "AngularValue", name: "AngularTab" },
        { menu: "Node.js", value: "NodeValue", name: "NodeTab" },
        { menu: "Other", value: "OtherValue", name: "OtherTab" }
      ]
    };
  }
};
</script>

<style scoped>
.tabs {
  overflow: hidden;
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
  transition: all .6s 0s ease;
}

.tabMenues {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  background: #e9e9e8;
}

#contents {
  padding: 5px 10px;
  box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #eee;
  text-align: center;
}

#contents p {
  font-size: 15px;
  margin: 0;
}

#contents p.title {
  font-size: 16px;
  font-weight: bold;
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
   transition: all .5s 0s ease;
}
.tabs:nth-child(6) input:checked + label,
.tabs:nth-child(6) label:hover {
   background: rgb(182, 182, 182);
}


/* .fade-enter-active, .fade-leave-actibe {
  transition: opacity 2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
} */


.fade-enter {
  transform: translate(-350px, 0);
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter-active {
  transition: all 1s .3s ease;
}
.fade-leave {
  transform: translate(0, 0);
  opacity: 1;
}
.fade-leave-to {
  transform: translate(200px, 0);
  opacity: 0;
}
.fade-leave-active {
  transition: all .3s 0s ease;
}
</style>