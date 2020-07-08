<template>
  <div id="profile">
    <!-- <Header></Header> -->
    <div class="profile_modifies" v-for="item in currentUsers" :key="item.username">
      <div class="profile_title"><h1> ユーザー情報の編集</h1></div>
      <div class="profile_modify">
        <div class="current_user_information" v-if="currentUserInformation">
          <div class="user_name">
            <h3>ユーザー名</h3>
            <h4>{{item.username}}</h4>
          </div>
          <div class="user_email">
            <h3>メールアドレス</h3>
            <h4>{{item.email}}</h4>
          </div>
          <button @click="profilelModify()">プロフィール変更</button>
        </div>
        <div class="edit_profile" v-if="editProfile">
          <h3>ユーザー名</h3>
          <h4>{{item.username}}</h4>
          <input type="text" :value="item.username" @input="userNameModify">
          <button @click="saveUserName()">変更</button>

          <h3>メールアドレス</h3>
          <h4>{{item.email}}</h4>
          <input type="text" :value="item.email" @input="emailModify"/>
          <button @click="saveEmail()">変更</button>

          <button @click="cancel()">キャンセル</button>
          
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
// import Header from "../components/HeaderSignIn";
export default {
    // components: { Header },
  data() {
    return {
      currentUserReference: [],
      currentUsers: [],
      dbUsers: [],
      currentUserInformation: true,
      editProfile: false,
      updateUserName:""
      
    };
  },
  created() {
    this.$nextTick(function() {
      const self = this;
      //ログインユーザーを参照
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          self.currentUserReference = user;
        } else {
          console.log("ログインユーザーを参照できていません");
        }

        //データベースに保管されているユーザー
        const db = firebase.firestore();
        db.collection("users").onSnapshot(snapshot => {
          snapshot.docs.forEach(doc => {
            self.dbUsers.push(doc.data());
          });

          //現在のログインユーザーを取得
          self.currentUsers = self.dbUsers.filter(item => {
            return item.uid === self.currentUserReference.uid;
          });
          console.log("ログインユーザー", self.currentUsers);
        });
      });
    });
  },
  methods: {
    profilelModify() {
      this.currentUserInformation = false;
      this.editProfile = true;
    },
    cancel() {
      this.editProfile = false;
      this.currentUserInformation = true;
    }, 
    //変更されたユーザー名を取得
    userNameModify(e) {
      console.log(e.target.value)
      this.userName = e.target.value;
    },
    //Firestoreのユーザー名を変更
    saveUserName() {
      if(this.updateUserName === "") {
        alert('変更が確認されません')
      } else {
        console.log('変更されたよ',this.updateUserName)
      }
    },
     //変更されたメールアドレスを取得
    userNameModify(e) {
      console.log(e.target.value)
      this.userName = e.target.value;
    },
      //変更されたメールアドレスを取得
    userNameModify(e) {
      console.log(e.target.value)
      this.userName = e.target.value;
    },
  }
};
</script>

<style scoped>
.profile_modifies {
    margin: 3em 3em;
    font-size: 2em;
      padding: 2em 1em;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #eee;
}
</style>