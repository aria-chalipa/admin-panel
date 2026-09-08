<script setup>
import { required, alpha_spaces } from '@vee-validate/rules';
import { defineRule, Form, Field, ErrorMessage, useForm } from 'vee-validate';
import * as yup from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

const router = useRouter()
const errorMessage = ref('')

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
function handelSubmit(values){
    router.push('/login')
}

function handelInvalidSubmit({ values, errors, results }){
    handelModal.value.default = true
    errorMessage.value = errors.name || errors.lastName || errors.email || errors.password
    console.log(errors)

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

watch(errorM, ()=>{
    console.log(errorM) 
})
</script>

<template>
    <div class="flex min-h-screen items-center justify-center bg-black px-4">
        <Form @submit="handelSubmit" @invalid-submit="handelInvalidSubmit" :validation-schema="schema" class="w-full max-w-md space-y-4 rounded-lg bg-gray-900 p-8 shadow-md">
            <h1 class="mb-6 text-center text-2xl font-bold text-yellow-400">Sign Up</h1>

            <div>
                <Field
                    placeholder="name"
                    name="name"
                    rules="req|alpha_spaces"
                    class="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-gray-100 placeholder-gray-500 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
                <ErrorMessage name="name" class="mt-1 block text-sm text-red-400" />
            </div>

            <div>
                <Field
                    placeholder="lastName"
                    name="lastName"
                    rules="req|alpha_spaces"
                    class="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-gray-100 placeholder-gray-500 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
                <ErrorMessage name="lastName" class="mt-1 block text-sm text-red-400" />
            </div>

            <div>
                <Field
                    placeholder="email"
                    name="email"
                    rules="req"
                    class="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-gray-100 placeholder-gray-500 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
                <ErrorMessage name="email" class="mt-1 block text-sm text-red-400" />
            </div>

            <div>
                <Field
                    placeholder="enter a password"
                    name="password"
                    rules="req"
                    type="password"
                    class="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-gray-100 placeholder-gray-500 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
                <ErrorMessage name="password" class="mt-1 block text-sm text-red-400" />
            </div>

            <button
                type="submit"
                class="w-full rounded-md bg-yellow-400 py-2 font-medium text-black transition-colors hover:bg-yellow-300"
            >
                Sign Up
            </button>
        </Form>

        <ModalCom v-model="handelModal.default">
            <template #title>
                <h2 class="text-red-500 ">
                  validation error  
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