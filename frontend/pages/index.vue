<template>
  <div>
    <UCard class="form-card">
      <h1 class="mb-3">Welcome to this app. Please login to proceed!</h1>
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>
        <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" />
        </UFormGroup>
          <error-message :error="formError?.value" v-if="!!formError?.message"></error-message>
        <UButton type="submit" :loading="loading">Submit</UButton>
      </UForm>
    </UCard>

  </div>
</template>

<script setup lang="ts">
import { formatError } from '../helpers/formatError';
import { useIntegrate } from '../composables/useIntegrate';
import { useAuth } from '../composables/useAuth';
import { reactive } from 'vue';
import { object, string } from 'yup';
import { isEmpty } from 'lodash';
import { useRouter } from 'vue-router';
const router = useRouter();

const formError = reactive({
  value: null
});
const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string().min(8, 'Must be at least 8 characters').required('Required')
});

const state = reactive({
  email: undefined,
  password: undefined,
});

const onSubmit = async () => {
  formError.value = null;
  const { data, loading, error } = await useIntegrate(`/auth/login`, {
    method: 'POST',
    body: {
      ...state
    },
  })

  if(error) {
    const errorData = formatError(error);
    formError.value = errorData?.message;
  }

  if(!isEmpty(data?.value?.data)) {
    console.log('DDDD___', data);
    const { saveUser } = useAuth();
    const user = data?.value?.data;
    saveUser(user);
    // TODO: Redirect to contacts page
    router.push('/contacts');
  }
}

</script>

<style lang="scss" scoped>

.form-card {
  margin: 3% 20%;
}
</style>