<template>
  <div class="profiles">
    <div class="profile_title">
      <h1>ユーザー情報の編集</h1>
    </div>
    <div class="profile_modify">
      <div class="current_user_information" v-if="displayUsers">
        <div class="profile_icon">
          <font-awesome-icon size="7x" :icon="['fas', 'user']" />
        </div>
        <div class="user">
          <h3>ユーザー名</h3>
          <p>{{users.displayName}}</p>
          <h3>メールアドレス</h3>
          <p>{{users.email}}</p>
          <button @click="profilelModify()">プロフィール変更</button>
        </div>
      </div>
      <div class="edit_profile" v-if="editProfile">
        <h3>ユーザー名</h3>
        <p>{{users.displayName}}</p>
        <div>
          <input type="text" @input="userNameModify" />
        </div>
        <div class="modify_btn">
          <button @click="saveUserName()">変更</button>
        </div>

        <h3>メールアドレス</h3>
        <p>{{users.email}}</p>
        <input type="text" @input="emailModify" />
        <div class="input">
          <div>
            <input type="text" placeholder="現在のメールアドレスを入力してください" @input="pastEmail" />
          </div>
          <div>
            <input type="text" placeholder="パスワードを入力してください" @input="pastPassword" />
          </div>
        </div>

        <div class="modify_btn">
          <button @click="saveEmail()">変更</button>
        </div>
        <div class="back_btn">
          <button @click="cancel()">戻る</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
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
          //   console.log(self.users);
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
      //   console.log(this.NewUserName);
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
::placeholder {
  font-size: 0.6em;
}
.profile_title h1 {
  font-size: 4em;
  text-align: center;
}
.profile_modify {
  width: 70%;
  font-size: 2em;
  cursor: pointer;
}

.current_user_information {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.profile_modify {
  margin: 0 auto;
}

.profile_icon {
  color: rgb(95, 95, 95);
}

button {
  color: rgb(255, 255, 255);
  padding: 0.5em 1em;
  font-weight: bold;
  border-radius: 6px;
  border-bottom: solid 4px #6b6b6b;
  border-top: none;
  border-left: none;
  border-right: none;
  cursor: pointer;
  outline: none;
  appearance: none;
  margin-top: 0.5em;
  font-size: 0.8em;
}
.user button,
.back_btn button {
  background: rgb(66, 94, 255);
}

.modify_btn button {
  background: rgb(255, 13, 13);
}
.edit_profile .modify_btn {
  margin-bottom: 1em;
}

.modify_btn button:hover {
  background: rgb(255, 103, 103);
}

.user button:hover,
.back_btn button:hover {
  background: rgb(103, 118, 255);
}

.modify_btn button:active,
.user button:active,
.back_btn button:active {
  -webkit-transform: translateY(3px);
  transform: translateY(3px); /*下に動く*/
  border-bottom: none; /*線を消す*/
}

@media screen and (max-width: 1041px) {
  .profile_title h1 {
    font-size: 3em;
  }
  .profile_icon,
  .user {
    margin: 0 auto;
  }
}

@media screen and (max-width: 768px) {
  .profile_title h1 {
    font-size: 2em;
  }
  .profile_modify {
  font-size: 1.6em;
}
::placeholder {
  font-size: 0.3em;
}
button {
    padding: 0.4em 0.8em;
    font-size: 0.8em;
  }

}

@media screen and (max-width: 375px) {
  .profile_title h1 {
    font-size: 1.8em;
  }
  .profile_modify {
  font-size: 1.4em;
}

}

</style>