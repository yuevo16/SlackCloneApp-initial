<template>
  <div class="app-layout">
    <div class="sideber">
      <p>チャンネル一覧</p>
      <p v-for="channel in channels">
        <nuxt-link :to="`/channels/${channel.id}`">{{ channel.name }}</nuxt-link>
      </p>
      <p v-if="isAuthenticated" class="logout" v-on:click="logout">ログアウト</p>
    </div>
    <div class="main-content">
      <nuxt />
    </div>
  </div>
</template>

<script>
//データベースの情報を取得する
import { db, firebase } from '~/plugins/firebase'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      channels: []
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    ...mapActions(['setUser']),
    logout() {
      firebase.auth().signOut()
        .then(() => {
          this.setUser(null)
          window.alert('ログアウトに成功！')
        })
        .catch((e) => {
          window.alert('ログアウトに失敗しました')
          console.log(e)
        })
    }
  },
  mounted () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUser(user)
        db.collection('profiles').doc(user.uid).set({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        })
      }
    })
    //全てのdocを取得するのでcollection idを指定するだけでOK
    db.collection('channels').get()
      .then((querySnapshot) => {
        //作られたdocの数だけ繰り返し生成される
        querySnapshot.forEach((doc) => {
          //pushする段階でidを入れておくようにする
          this.channels.push({id: doc.id, ...doc.data()})
        })
      })
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.app-layout {
  display: flex;
}

.sideber {
  width: 300px;
  background-color: #4A4141;
  height: 100vh;
  padding: 20px;
}

.sideber p {
  color: #DDDDDD;
  padding-top: 4px;
}

.main-content {
  width: 100%;
  background-color: #F1F1F1;
  height: 100vh;
}

.logout {
  position: absolute;
  bottom: 10px;
  cursor: pointer;
}

</style>
