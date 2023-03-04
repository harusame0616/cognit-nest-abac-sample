<script setup lang="ts">
const { $auth } = useNuxtApp();

const email = ref('');
const password = ref('');
const isProcessing = ref(false);
const errorMessage = ref('');

const login = async () => {
  isProcessing.value = true;
  errorMessage.value = '';

  try {
    await $auth.signIn(email.value, password.value);
  } catch (e: unknown) {
    errorMessage.value = (e as any).message;
  }

  isProcessing.value = false;
};
</script>

<template>
  <div>
    <div>
      メールアドレス
      <input v-model="email" type="text" />
    </div>
    <div>
      パスワード
      <input v-model="password" type="password" />
    </div>
    <button @click="login" :disabled="isProcessing">login</button>
    <div>
      {{ errorMessage }}
    </div>

    <div>
      {{ $auth.user }}
    </div>
  </div>
</template>
