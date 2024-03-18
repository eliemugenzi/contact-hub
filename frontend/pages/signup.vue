<template>
    <main>
        <UCard class="form-card">
            <h2>Welcome to the signup page!</h2>
            <UForm :schema="schema" :state="state">
              
            </UForm>
          
        </UCard>
    </main>
</template>

<script lang="ts" setup>
import * as Yup from 'yup';
import { reactive } from 'vue';

const state = reactive({
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    password: undefined,
})

const schema = Yup.object({
    first_name: Yup.string().min(3, "Minimum 3 characters long").required("First name is required"),
    last_name: Yup.string().min(3, "Miminum 3 characters long").required("Last name is required"),
    email: Yup.string().email("Email is invalid!").required("Email is required"),
    password: Yup.string().required("Password is required")
});
  
</script>
