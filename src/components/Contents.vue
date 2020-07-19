<template>
  <div id="contents">
    <div id="content">
      <!-- Javascript -->
      <JavascriptContent></JavascriptContent>
      <!-- vue.js -->
      <VueContent></VueContent>
      <!-- React -->
      <ReactContent></ReactContent>
      <!-- Angular -->
      <AngularContent></AngularContent>
      <!-- Node.js -->
      <NodeContent></NodeContent>
      <!-- other -->
      <OtherContent></OtherContent>
    </div>
  </div>
</template>
<script>
import JavascriptContent from "../components/JavascriptContent";
import VueContent from "../components/VueContent";
import ReactContent from "../components/ReactContent";
import AngularContent from "../components/AngularContent";
import NodeContent from "../components/NodeContent";
import OtherContent from "../components/OtherContent";

export default {
  components: {
    JavascriptContent,
    VueContent,
    ReactContent,
    AngularContent,
    NodeContent,
    OtherContent
  }
};
</script>
<style>
#contents {
  margin: 5em 5em;
}
#content {
  padding: 2em 1em;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #eee;
}

.childItems h2 {
  padding: 0.5em 1em 4.5em 1em;
}

#contents .username {
  font-size: 1.5em;
  font-weight: bold;
  position: absolute;
  bottom: 0;
  margin-left: 0.5em;
}

#contents .frames {
  width: 90em;
  height: 50em;
}
#contents .parentItems {
  display: flex;

  flex-wrap: wrap;
  justify-content: space-between;
}
#contents .childItems {
  width: 32%;
  margin-bottom: 2em;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #eee;
  position: relative;
  cursor: pointer;
}
.fade-enter {
  transform: translate(-350px, 0);
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter-active {
  transition: all 1s 0.3s ease;
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
  transition: all 0.3s 0s ease;
}

#contents .forms {
  margin: 0 auto;
  width: 35%;
}
#contents form {
  font-size: 2em;
  margin: 1.5em 0;
}

#contents form input {
  width: 100%;
}
</style>