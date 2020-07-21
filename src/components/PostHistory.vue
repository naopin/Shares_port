<template>
  <div>
    <h1 class="movie_history_title">投稿履歴</h1>
    <div class="childItems">
      <div class="history_cards">
        <img class="thumbnails" v-bind:src="firstThumbnails" />
        <h2>{{firstTitle}}</h2>
      </div>
      <button class="delete_btn" @click="deleteBtn(item)">削除</button>
    </div>
    <div class="display">
      <button @click="openModal()">一覧を表示</button>
    </div>
    <MyModal class="modals" @close="closeModal()" v-if="modal">
      <div class="modal">
        <div class="modal_items" v-for="item in allHistoryMovie" :key="item.snippet.title">
          <div class="items">
            <img class="thumbnails" v-bind:src="item.snippet.thumbnails.medium.url" />
            <h2>{{item.snippet.title}}</h2>
            <div class="btn">
              <button class="delete_btn" @click="deleteBtn(item)">削除</button>
            </div>
          </div>
        </div>
      </div>
    </MyModal>
  </div>
</template>

<script>
import "firebase/auth";
import "firebase/firestore";
import { firebaseApp } from "../main";
import * as firebase from "firebase/app";
import MyModal from "../components/Mymodal";

export default {
  components: { MyModal },
  data() {
    return {
      allHistoryMovie: [],
      modal: false,
      firstThumbnails: "",
      firstTitle:"",

    };
  },

  created() {
    this.$nextTick(function() {
      const self = this;
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          firebaseApp
            .firestore()
            .collection("shares")
            //firestoreのすべてdoc取得
            .onSnapshot(querySnapshot => {
              let videos = [];
              querySnapshot.forEach(doc => {
                videos.push(doc.data());
              });
              let filterUid = [];
              //ログインユーザーの投稿のみ(doc)取得
              filterUid = videos.filter(item => {
                return item.userId === user.uid;
              });
              self.allHistoryMovie = filterUid;
              console.log(self.allHistoryMovie)
              self.firstThumbnails = filterUid[0].snippet.thumbnails.medium.url;
              self.firstTitle = filterUid[0].snippet.title;
            });
        } else {
          self.$router.push("/");
        }
      });
    });
  },
  methods: {
    deleteBtn(value) {
      firebase
        .firestore()
        .collection("shares")
        .doc(value.snippet.movieId)
        .delete()
        .then(() => {
          console.log("履歴", this.allHistoryMovie);
        })
        .catch(error => {
          console.error("Error removing document: ", error);
        });
    },
    closeModal() {
      this.modal = false;
    },
    openModal() {
      this.modal = true;
    }
  }
};
</script>

<style scoped>
.history_cards h2 {
  padding: 1em;
}
.movie_history_title {
  font-size: 4em;
  text-align: center;
}

.childItems {
  width: 70%;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #eee;
  font-size: 1.2em;
  margin: 0 auto;
  margin-bottom: 3em;
}

.modals {
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #eee;
  font-size: 1em;
  margin: 0 auto;
}

.modal_items {
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #eee;
  font-size: 0.8em;
  margin: 4em 2em;
  width: 300px;
  padding-bottom: 8em;
  position: relative;
}

.items {
  width: 300px;
}

.modal {
  display: flex;
  overflow-x: auto;
}

.btn {
  position: absolute;
  bottom: 0;
}
.display {
  margin: 1.5em;
}
.display button {
 background: rgb(255, 144, 41);
}

.delete_btn , .display button {
  color: rgb(255, 255, 255);
  padding: 0.5em 1em;
  font-size: 1.3em;
  font-weight: bold;
  border-radius: 6px;
  border-bottom: solid 4px #6b6b6b;
  margin: 0.5em;
  border-top: none;
  border-left: none;
  border-right: none;
  cursor: pointer;
  outline: none;
  appearance: none;
}

.delete_btn {
  background: rgb(255, 13, 13);
}

.delete_btn:hover {
  background: rgb(255, 103, 103);
}
.display button:hover {
 background: rgb(255, 169, 89);
}

.delete_btn:active ,.display button:active{
  -webkit-transform: translateY(3px);
  transform: translateY(3px); /*下に動く*/
  border-bottom: none; /*線を消す*/
}

/* responsive */

@media screen and (max-width: 1041px) {
  .movie_history_title {
    font-size: 3em;
  }
}

@media screen and (max-width: 768px) {
  .movie_history_title {
    font-size: 2em;
  }

  .history_cards h2 {
    font-size: 1em;
  }
  .delete_btn, .display button {
    padding: 0.5em 0.8em;
    font-size: 1.1em;
    border-bottom: solid 3px #6b6b6b;
  }
}

@media screen and (max-width: 375px) {
  .movie_history_title {
    font-size: 1.8em;
  }

  .history_cards h2 {
    font-size: 0.8em;
  }
}
</style>