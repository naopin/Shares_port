<template>
  <div id="profile">
    <!-- <Header></Header> -->
    <div class="profile_modifies">
      <div class="profile_title">
        <h1>ユーザー情報の編集</h1>
      </div>
      <div class="profile_modify">
        <div class="current_user_information" v-if="displayUsers">
          <div class="user_name">
            <h3>ユーザー名</h3>
            <h4>{{users.displayName}}</h4>
          </div>
          <div class="user_email">
            <h3>メールアドレス</h3>
            <h4>{{users.email}}</h4>
          </div>
          <button @click="profilelModify()">プロフィール変更</button>
        </div>
        <div class="edit_profile" v-if="editProfile">
          <h3>ユーザー名</h3>
          <h4>{{users.displayName}}</h4>
          <div><input type="text" @input="userNameModify" /></div>
          <div><button @click="saveUserName()">変更</button></div>
          

          <h3>メールアドレス</h3>
          <h4>{{users.email}}</h4>
          <input type="text" @input="emailModify" />
          <div class="input">
            <div><input type="text" placeholder="現在のメールアドレスを入力してください" @input="pastEmail" /></div>
            <div><input type="text" placeholder="パスワードを入力してください" @input="pastPassword" /></div>
          </div>

          <div><button @click="saveEmail()">変更</button></div>
          <div><button @click="cancel()">戻る</button></div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
// import "firebase/auth";
// import "firebase/firestore";
// import Header from "../components/HeaderSignIn";
export default {
  // components: { Header },
  data() {
    return {
      users: [],
      displayUsers: true,
      editProfile: false,
      NewUserName: {},
      newEmail: {},
      email: "",
      password: ""
    };
  },
  created() {
    this.$nextTick(function() {
      const self = this;
      // ログインユーザーを参照
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          self.users = user;
          console.log(self.users);
        } else {
          console.log("ログインユーザーを参照できていません");
        }
      });
    });
  },
  methods: {
    profilelModify() {
      this.displayUsers = false;
      this.editProfile = true;
    },
    cancel() {
      this.editProfile = false;
      this.displayUsers = true;
    },
    //入力されたメール
    pastEmail(e) {
      this.email = e.target.value;
    },
    //入力されたパスワード
    pastPassword(e) {
      this.password = e.target.value;
    },
    //変更されたユーザー名を取得
    userNameModify(e) {
      this.NewUserName = e.target.value;
      console.log(this.NewUserName);
    },
    //Authユーザー名を変更
    saveUserName() {
      if (this.NewUserName) {
        firebase
          .auth()
          //authのdisplaynameを変更
          .currentUser.updateProfile({
            displayName: this.NewUserName
          })
          .then(() => {
            this.users = {
              displayName: firebase.auth().currentUser.displayName,
              email: firebase.auth().currentUser.email
            };
          })
          .catch(error => {
            console.log("Error edit username: ", error);
          });
        this.cancel();
      } else {
        alert("変更が確認されません");
      }
    },
    //変更されたメールアドレスを取得
    emailModify(e) {
      console.log(e.target.value);
      this.newEmail = e.target.value;
    },
    //firebaseのメールを更新
    saveEmail() {
      if (this.newEmail) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            firebase
              .auth()
              .currentUser.updateEmail(this.newEmail)
              .then(() => {
                this.users = {
                  displayName: firebase.auth().currentUser.displayName,
                  email: firebase.auth().currentUser.email
                };
                console.log(firebase.auth().currentUser);
                this.cancel();
              })
              .catch(error => {
                console.log("authメール変更失敗", error);
              });

            // this.$router.push("/");
          })
          .catch(error => {
            alert(error.message);
          });
      } else {
        alert("変更が確認されません");
      }
    }
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

::placeholder {
  font-size: 0.6em;
}
</style>