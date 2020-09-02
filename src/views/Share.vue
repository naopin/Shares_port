<template>
  <div id="share">
    <Header></Header>
    <div class="share">
      <div>
        <h1 class="share_title">動画検索</h1>
      </div>
      <div class="search">
        <input placeholder="キーワード" v-model="keyword" type="search" />
        <button @click="search_video">検索</button>
      </div>

      <div class="share_table" v-show="results">
        <table>
          <tr>
            <th>
              <font>No</font>
            </th>
            <th>
              <font>Video</font>
            </th>
            <th>
              <font>Contents</font>
            </th>
          </tr>
          <tr @click="click(movie)" v-for="(movie, index) in results" v-bind:key="movie.id.videoId">
            <!-- No -->
            <td>{{ index + 1 }}</td>
            <!-- Video -->
            <td>
              <img v-bind:src="movie.snippet.thumbnails.medium.url" />
            </td>
            <!-- titleとdescription -->
            <td class="tds">
              <font>
                <b>{{ movie.snippet.title }}</b>
              </font>
              <br />
              <div class="descript">{{ movie.snippet.description}}</div>
            </td>
          </tr>
        </table>
      </div>
      <MyModal @close="closeModal" v-if="shareModal">
        <div class="modal_contents">
          <div class="frame">
            <iframe
              width="448"
              height="252"
              :src="resultVideo"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            >></iframe>
          </div>
          <div class="selectmovie">
            <div class="recommend">
              <div class="recommend_p">
                <p>{{selectMovieTitle}}</p>
              </div>
              <div class="recommend_sub">
                <div class="category">
                  <h3>言語</h3>
                  <select v-model="choice" @change="selectCategory">
                    <option v-for="catregory in categories" :key="catregory.name">{{catregory.name}}</option>
                  </select>
                </div>
              </div>
              <div class="comment">
                <h3>おすすめコメント</h3>
               <textarea @input="textArea" ></textarea>
              </div>
              <div class="share_button">
                <button @click="share()">投稿</button>
              </div>
            </div>
          </div>
        </div>
      </MyModal>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Header from "../components/HeaderSignIn";
import MyModal from "../components/Mymodal";

export default {
  components: { Header, MyModal },
  data() {
    return {
      shareModal: false,
      categories: [
        { name: "Javascript" },
        { name: "Vue.js" },
        { name: "React" },
        { name: "Angular" },
        { name: "Node.js" },
        { name: "Other" }
      ],
      content: "",
      choice: "",
      comment: "",
      selctedCategory: "",
      movieItems: "",
      selectMovieTitle: "",
      selectMovieUrl: "",
      users: "",
      selcted: "",
      resultVideo: null,
      results: null,
      keyword: "",
      order: "viewCount", // リソースを再生回数の多い順に並べます。
      params: {
        q: "", // 検索クエリを指定します。
        part: "snippet",
        type: "video",
        maxResults: "30", // 最大検索数
        key: "AIzaSyAzgmiuC-kMvgkhuhvV4j01F93kU1AGF50"
      }
    };
  },
  props: {
    msg: String
  },
  methods: {
    // コメント取得
    textArea(e) {
       this.comment = e.target.value;
    },
    closeModal() {
      this.shareModal = false;
    },
    search_video() {
      this.params.q = this.keyword;
      var self = this;
      axios
        .get("https://www.googleapis.com/youtube/v3/search", {
          params: this.params
        })
        .then(function(res) {
          self.results = res.data.items;
          self.resultVideo = `https://www.youtube.com/embed/${self.results[0].id.videoId}`;
          console.log(self.results);
        });
    },
    click(value) {
      this.resultVideo = `https://www.youtube.com/embed/${value.id.videoId}`;
      // 選択された全ての動画情報
      this.movieItems = value;
      // 選択された動画タイトル
      this.selectMovieTitle = this.movieItems.snippet.title;
      // 選択された動画URL
      this.selectMovieUrl = `https://www.youtube.com/embed/${this.movieItems.id.videoId}`;

      console.log(this.movieItems);
      this.shareModal = true;
    },
    share() {
      this.$nextTick(function() {
        if (!this.choice) {
          alert("「言語を入力してください");
        } else {
          const self = this;
          firebase.auth().onAuthStateChanged(function() {
            const user = firebase.auth().currentUser;
            let db = firebase.firestore();
            const sharesRef = db.collection("shares");

            sharesRef
              .doc(self.movieItems.id.videoId)
              .set({
                userName: user.displayName,
                userId: user.uid,
                category: self.selctedCategory,
                comment: self.comment,
                snippet: {
                  title: self.movieItems.snippet.title,
                  description: self.movieItems.snippet.description,
                  url: `https://www.youtube.com/embed/${self.movieItems.id.videoId}`,
                  movieId: self.movieItems.id.videoId,
                  thumbnails: {
                    medium: {
                      url: self.movieItems.snippet.thumbnails.medium.url
                    }
                  }
                }
              })
              .then(() => {
                //モーダルを閉じる
                self.shareModal = false;
              })
              .catch(error => {
                console.error("Error edit user: ", error);
              });
          });
        }
      });
    },
    selectCategory(e) {
      this.selctedCategory = e.target.value;
    }
  },
  created() {
    this.$nextTick(function() {
      const selfs = this;
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log("Sare.vueログイン中", user);
        } else {
          console.log("Sare.vueログアウト");
          selfs.$router.push("/");
        }
      });
    });
  }
};
</script>

<style scoped>
.share {
  font-size: 2em;
  margin: 2em 2em;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #eee;
}
.share_table {
  margin: 1em;
}
table {
  border: solid 2px #a7a7a7; /*表全体を線で囲う*/
}
.share_table img {
  cursor: pointer;
}

.share_table img:hover {
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
.tds {
  cursor: pointer;
}
.tds:hover {
  color: rgb(116, 142, 255);
  transform: translateY(5px);
  transition: all 0.5s;
}

table th {
  color: #141414; /*文字色*/
  background: #f6f6f6; /*背景色*/
  border: dashed 1px #a7a7a7;
}

table td {
  background: #fcfcfc;
  border: dashed 1px #a7a7a7;
}

.share_title {
  text-align: center;
}

.search,
.frame {
  text-align: center;
}
.search {
  margin-bottom: 1em;
}

.search input {
  width: 50%;
}

.recommend {
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #eee;
}

.recommend_p,
.recommend_sub,
.comment {
  width: 90%;
  margin: 0 auto;
}

.share_button {
  text-align: center;
  margin-bottom: 1em;
}
.share_button button {
  color: rgb(255, 255, 255);
  background: rgb(255, 158, 13);
  padding: 0.3em 0.6em;
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

.share_button button:hover {
  background: rgb(255, 189, 91);
}

.share_button button:active {
  -webkit-transform: translateY(3px);
  transform: translateY(3px); /*下に動く*/
  border-bottom: none; /*線を消す*/
}

@media screen and (max-width: 900px) {
  .share_table,
  .modal_contents {
    font-size: 0.8em;
  }
}

@media screen and (max-width: 768px) {
  .share h1 {
    font-size: 1em;
  }
  .share_table,
  .modal_contents {
    font-size: 0.6em;
  }
  .search {
    font-size: 0.8em;
  }
  .frame iframe {
    width: 336px;
    height: 189px;
  }
}

@media screen and (max-width: 600px) {
  .descript {
    display: none;
  }
  .share_table {
    font-size: 0.4em;
  }
  .modal_contents {
    width: 80%;
    margin: 0 auto;
  }
}

@media screen and (max-width: 375px) {
  .share_table {
    font-size: 0.3em;
  }
  .tds {
    width: 80px;
    overflow: hidden;
  }
  .search {
    font-size: 0.6em;
  }
}
</style>
