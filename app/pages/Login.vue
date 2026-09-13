<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { defineRule } from 'vee-validate';
import { required } from '@vee-validate/rules';
import axios from '~/axios/axios';
import ModalCom from '~/components/ModalCom.vue';

const router = useRouter()
defineRule("req", required)

const email = ref('')
const password = ref('')
const user = ref(null)
const errorMessage = ref('')
const handeleModal = ref(false)


async function handleSubmit() {
    try{
        const res = await axios.get('/users')
        user.value = res.data
        const foundUser = user.value.find(user => user.password === password.value && user.email === email.value);

        console.log(user.value)
        if (foundUser) {
            
            router.push(`/panel-${foundUser.name}/${foundUser.id}`)
        } else {
            errorMessage.value = 'Invalid email or password'
            handeleModal.value = true
        }
    }
    catch (error) {
        console.error(error)
        errorMessage.value = 'server error'
        handeleModal.value = true
    }   
}


useHead({
    meta: [
        {
            name: 'login',
            content: 'login page'
        }
    ],
    title: 'login'
})
</script>

<template>
    <div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950 px-4 py-12">
        <!-- ambient background glow -->
        <div class="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-yellow-400/20 blur-3xl"></div>
        <div class="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl"></div>

        <Form v-on:submit="handleSubmit" class="relative w-full max-w-md space-y-5 rounded-2xl border border-white/10 bg-gray-900/70 p-8 shadow-2xl backdrop-blur-xl">
            <div class="mb-2 text-center">
                <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400 text-xl font-bold text-black shadow-lg shadow-yellow-400/20">
                    A
                </div>
                <h1 class="text-2xl font-bold tracking-tight text-white">Welcome back</h1>
                <p class="mt-1 text-sm text-gray-400">Log in to continue to your account</p>
            </div>

            <div>
                <label for="email" class="mb-1.5 block text-sm font-medium text-gray-300">Email</label>
                <Field
                    v-model="email"
                    id="email"
                    name="email"
                    type="text"
                    rules="req"
                    placeholder="you@example.com"
                    class="w-full rounded-lg border border-gray-700/80 bg-gray-800/60 px-3.5 py-2.5 text-gray-100 placeholder-gray-500 transition-colors focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
                ></Field>
                <ErrorMessage name="email" class="mt-1 block text-sm text-red-400" />
            </div>

            <div>
                <label for="password" class="mb-1.5 block text-sm font-medium text-gray-300">Password</label>
                <Field
                    v-model="password"
                    id="password"
                    name="password"
                    type="password"
                    rules="req"
                    placeholder="At least 6 characters"
                    class="w-full rounded-lg border border-gray-700/80 bg-gray-800/60 px-3.5 py-2.5 text-gray-100 placeholder-gray-500 transition-colors focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
                ></Field>
                <ErrorMessage name="password" class="mt-1 block text-sm text-red-400" />
            </div>

            <button
                type="submit"
                class="w-full rounded-lg bg-yellow-400 py-2.5 font-semibold text-black shadow-lg shadow-yellow-400/20 transition-all hover:bg-yellow-300 hover:shadow-yellow-400/30 active:scale-[0.98]"
            >
                Log in
            </button>
       
            <div>
                <p class="pt-1 text-center text-sm text-gray-400">
                    Don't have an account?
                    <NuxtLink to="/signup" class="font-medium text-yellow-400 hover:text-yellow-300">Sign up</NuxtLink>
                </p>
            </div> 
        </Form>

    </div>
        <ModalCom v-model="handeleModal">
            <template #title>{{ errorMessage }}</template>
            <template #body>please check your email and password</template>
        </ModalCom>
</template>