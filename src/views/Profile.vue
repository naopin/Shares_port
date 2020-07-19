<template>
  <div id="profile">
    <Header></Header>
    <div class="contaier">
      <div class="profile_modify">
        <ProfileModify></ProfileModify>
      </div>
      <div class="movie_history">
        <PostHistory></PostHistory>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileModify from "../components/ProfileModify";
import PostHistory from "../components/PostHistory";
import Header from "../components/HeaderSignIn";

export default {
  components: { Header, ProfileModify, PostHistory }
};
</script>

<style scoped>
.contaier {
  margin: 2em 2em;
  padding: 2em 1em;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #eee;
  display: flex;
  justify-content: space-between;
}
.profile_modify {
  width: 50%;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #eee;
}
.movie_history {
  width: 50%;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #eee;
}

</style>