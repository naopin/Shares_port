<template>
<div class="mmm">
  <div><font size="6" color="#c71585">VueMovie</font></div>
  <br>
  <input size="40" v-model="keyword" placeholder="検索キーワードを入力">
  <button @click="search_video">検索</button>
  <table cellspacing="0" cellpadding="5" v-show="results">
    <tr>
      <th width="50">
        <font>No</font>
      </th>
      <th width="200">
        <font>Video</font>
      </th>
      <th width="700">
        <font>Contents</font>
      </th>
    </tr>

    <tr v-for="(movie, index) in results" v-bind:key="movie.id.videoId">
      <!-- No -->
      <td valign="top" width="50">{{ index + 1 }}</td>
      <!-- Video -->
      <td valign="top" width="300">
        <a v-bind:href="'https://www.youtube.com/watch?v=' + movie.id.videoId">
          <img width="300" height="200" v-bind:src="movie.snippet.thumbnails.medium.url">
        </a>
      </td>
     <!-- titleとdescription -->
      <td align="left" valign="top" width="700">
        <font size="5" color="#c71585"><b>{{ movie.snippet.title }}</b></font>
        <br>
        {{ movie.snippet.description}}</td>
    </tr>
  </table>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: "SearchVideo",
  data: function() {
    return {
      results: null,
      keyword: "",
      order: "viewCount", // リソースを再生回数の多い順に並べます。
      params: {
        q: "", // 検索クエリを指定します。
        part: "snippet",
        type: "video",
        maxResults: "20", // 最大検索数
        key: "AIzaSyAzgmiuC-kMvgkhuhvV4j01F93kU1AGF50"
      }
    };
  },
  props: {
    msg: String
  },
  methods: {
    search_video: function() {
      this.params.q = this.keyword;
      var self = this;
      axios
        .get("https://www.googleapis.com/youtube/v3/search", {
          params: this.params
        })
        .then(function(res) {
          self.results = res.data.items;
          console.log(self.results)
        })
    }
  }
};
</script>

<style scoped>

table {
  border-collapse: collapse;
  border: solid 2px #c0c0c0;/*表全体を線で囲う*/
}
table th {
  border: dashed 1px #c0c0c0;
}

table td {
  background: #f3f3f3;
  border: dashed 1px #c0c0c0;
}

.mmm{
    font-size: 1.5em;
    color: rgb(29, 29, 29);
}

</style>
