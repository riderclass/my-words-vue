<template>
  <div class="header">
    <div class="navigation-box">
      <nav role="navigation">
        <div id="menuToggle">
          <input type="checkbox" v-model="checker" />
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
            <li>
              <a
                @click="
                  $router.push('/');
                  checker = !checker;
                "
                href="#"
                >Учить слова</a
              >
            </li>
            <li>
              <a
                @click="
                  $router.push('/contacts');
                  checker = !checker;
                "
                href="#"
                >Контакты</a
              >
            </li>

            <li>
              <a
                @click="
                  $router.push('/register');
                  checker = !checker;
                "
                href="#"
                >Регистрация</a
              >
            </li>
            <li v-if="!isLoggedIn">
              <a
                @click="
                  $router.push('/sign-in');
                  checker = !checker;
                "
                href="#"
                >Войти</a
              >
            </li>
            <li>
              <a
                @click="
                  $router.push('/feed');
                  checker = !checker;
                "
                href="#"
                >Мой аккаунт</a
              >
            </li>

            <button
              class="uk-button uk-button-default uk-margin-small-top"
              @click="handleSignOut"
              v-if="isLoggedIn"
            >
              Выйти
            </button>
          </ul>
        </div>
      </nav>
    </div>

    <div class="logo">
        <span class="logo-t">My Words App</span>
      <img class="logo-w" alt="Vue logo" src="@/assets/logo.png" />
      <p class="underlogo">Check yourself right now!</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const router = useRouter();
const isLoggedIn = ref(false);
const checker = ref(false);

let auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/sign-in");
    checker.value = false;
  });
};
</script>





<style scoped>
</style>
