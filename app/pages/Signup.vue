<script setup>
import { required, alpha_spaces } from '@vee-validate/rules';
import { defineRule, Form, Field, ErrorMessage, useForm } from 'vee-validate';
import * as yup from 'yup'
import { toTypedSchema } from '@vee-validate/yup'
import axios from '../axios/axios';
import useCreateToken from '~/compositions/useCreateToken';
import { useUserStore } from '~/stores/useUserStore';

const router = useRouter()
const store = useUserStore()
const { token } = useCreateToken()
const errorMessage = ref('')
const isSubmiting =ref(false)
const user = reactive({
    name : '',
    lastName: '',
    email:'',
    password:''
})

const handelModal = ref({
    type:Boolean,
    default: false
})

defineRule("req", required)
defineRule("alpha_spaces", alpha_spaces)
const schema = toTypedSchema(yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(6)
}))

async function handelSubmit(values){
    isSubmiting.value = true
    try {
        const response = await axios.post('/users', {
            name : user.name,
            lastName : user.lastName,
            email : user.email,
            password : user.password,
            token : token.value
        })
        store.setUser(response.data)

        router.push('/login')
    }catch(error){
        console.error(error);
        handelModal.value.default = true
        errorMessage.value = error
    }finally{
        isSubmiting.value = false
        user.value = {}
    }
}

const { handleSubmit, errors } = useForm({ validationSchema: schema })

useHead({
    meta: [
        {
            name: 'signup',
            content: 'signup page'
        }
    ],
    title: 'signup'
})

</script>

<template>
    <div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950 px-4 py-12">
        <!-- ambient background glow -->
        <div class="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-yellow-400/20 blur-3xl"></div>
        <div class="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl"></div>

        <Form
            @submit="handelSubmit"
            :validation-schema="schema"
            class="relative w-full max-w-md space-y-5 rounded-2xl border border-white/10 bg-gray-900/70 p-8 shadow-2xl backdrop-blur-xl"
        >
            <div class="mb-2 text-center">
                <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400 text-xl font-bold text-black shadow-lg shadow-yellow-400/20">
                    A
                </div>
                <h1 class="text-2xl font-bold tracking-tight text-white">Create your account</h1>
                <p class="mt-1 text-sm text-gray-400">Join us, it only takes a minute</p>
            </div>

            <div>
                <label for="name" class="mb-1.5 block text-sm font-medium text-gray-300">Name</label>
                <Field
                    v-model="user.name"
                    id="name"
                    placeholder="John"
                    name="name"
                    rules="req|alpha_spaces"
                    class="w-full rounded-lg border border-gray-700/80 bg-gray-800/60 px-3.5 py-2.5 text-gray-100 placeholder-gray-500 transition-colors focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
                />
                <ErrorMessage name="name" class="mt-1 block text-sm text-red-400" />
            </div>

            <div>
                <label for="lastName" class="mb-1.5 block text-sm font-medium text-gray-300">Last name</label>
                <Field
                    v-model="user.lastName"
                    id="lastName"
                    placeholder="Doe"
                    name="lastName"
                    rules="req|alpha_spaces"
                    class="w-full rounded-lg border border-gray-700/80 bg-gray-800/60 px-3.5 py-2.5 text-gray-100 placeholder-gray-500 transition-colors focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
                />
                <ErrorMessage name="lastName" class="mt-1 block text-sm text-red-400" />
            </div>

            <div>
                <label for="email" class="mb-1.5 block text-sm font-medium text-gray-300">Email</label>
                <Field
                    v-model="user.email"
                    id="email"
                    placeholder="you@example.com"
                    name="email"
                    type="email"
                    rules="req"
                    class="w-full rounded-lg border border-gray-700/80 bg-gray-800/60 px-3.5 py-2.5 text-gray-100 placeholder-gray-500 transition-colors focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
                />
                <ErrorMessage name="email" class="mt-1 block text-sm text-red-400" />
            </div>

            <div>
                <label for="password" class="mb-1.5 block text-sm font-medium text-gray-300">Password</label>
                <Field
                    v-model="user.password"
                    id="password"
                    placeholder="At least 6 characters"
                    name="password"
                    rules="req"
                    type="password"
                    class="w-full rounded-lg border border-gray-700/80 bg-gray-800/60 px-3.5 py-2.5 text-gray-100 placeholder-gray-500 transition-colors focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
                />
                <ErrorMessage name="password" class="mt-1 block text-sm text-red-400" />
            </div>

            <button
                type="submit"
                class="w-full rounded-lg bg-yellow-400 py-2.5 font-semibold text-black shadow-lg shadow-yellow-400/20 transition-all hover:bg-yellow-300 hover:shadow-yellow-400/30 active:scale-[0.98]"
            >
            <span v-if="isSubmiting">submiting...</span>
                Sign Up
            </button>

            <p class="pt-1 text-center text-sm text-gray-400">
                Already have an account?
                <NuxtLink to="/login" class="font-medium text-yellow-400 hover:text-yellow-300">Log in</NuxtLink>
            </p>
        </Form>

        <ModalCom v-model="handelModal.default">
            <template #title>
                <h2 class="text-red-500 ">
                  request error  
                </h2>
                
            </template>
            <template #body>
                <div>
                    <p>
                        {{ errorMessage }}
                    </p>
                </div>
            </template>
        </ModalCom>
    </div>
</template>