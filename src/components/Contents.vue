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

#content {
  padding: 2em 1em;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #eee;

   background-image: url("../assets/bg.jpg");
  background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.89),
        rgba(56, 56, 56, 0.842)
       
      )
      fixed,
    url(../assets/bg.jpg) fixed;
  background-size: cover;
  min-height:100vh

}
.childItems {
background: -webkit-linear-gradient(to right, #FFFFFF, #ECE9E6);  
background: linear-gradient(to right, #FFFFFF, #ECE9E6);

}
.parentItems h2:hover {
  color: rgb(116, 142, 255);
  transform: translateY(5px);
  transition: all 0.5s;
}

.childItems h2 {
  padding: 0.5em 1em 2em 1em;
}

.childItems:hover img {
  opacity: 1;
  animation: flash 2s;
}
@keyframes flash {
  0% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}

#contents .username {
  font-size: 1.5em;
  font-weight: bold;
  position: absolute;
  bottom: 0;
  margin-left: 0.5em;
}
.comments {
  padding-bottom:3em ;
  font-size: 1.5em;
  margin-left: 0.5em;
}
.comments p {
  color: rgb(24, 31, 59);
}

#contents .frames {
  width: 80em;
  height: 45em;
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

@media screen and (max-width: 1000px) {
  #contents .frames {
    width: 60em;
    height: 34em;
  }
}

@media screen and (max-width: 768px) {
  #contents .parentItems {
    font-size: 0.8em;
  }
  #contents form {
    font-size: 1.5em;
    margin: 1.3em 0;
  }
  #contents .username {
    font-size: 1.2em;
  }
  #contents .frames {
    width: 46em;
    height: 28em;
  }
}

@media screen and (max-width: 600px) {
  #contents .childItems {
    width: 48%;
  }

  #contents .parentItems {
    font-size: 0.5em;
  }

  #contents .username .comments {
    font-size: 1em;
  }

  #contents .forms {
    width: 60%;
  }
  #contents .frames {
    width: 35em;
    height: 20em;
  }
}

@media screen and (max-width: 375px) {
  #contents .childItems {
    width: 98%;
  }
  #contents .forms {
    width: 90%;
  }
}
</style>