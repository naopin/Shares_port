<template>
  <div class="forms">
    <form>
      <input type="text" v-model="keyword" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: ""
    };
  },
  computed: {
    filteredUsers: function() {
      const users = [];
      for (var i in this.users) {
        const user = this.users[i];
        if (user.name.indexOf(this.keyword) !== -1) {
          users.push(user);
        }
      }

      return users;
    }
  }
};
</script>
<style scoped>
.forms {
  margin: 0 auto;
  width: 35%;
}
form {
  font-size: 1.8em;
  margin-top: 2em;
}
</style>