<template>
    <div class="mt-8 p-4">
        <h2 class="text-lg font-semibold mb-4">Ajouter un commentaire</h2>

        <v-form>
            <v-text-field
                v-model="state.username"
                label="Nom d'utilisateur"
                required
                :error="v$.username.$error"
                :error-messages="v$.username.$errors.map((e: { $message: any; }) => e.$message)"
            >
            </v-text-field>

            <v-textarea
                v-model="state.message"
                :counter="500"
                label="Message"
                required
                :error-messages="v$.message.$errors.map((e: { $message: any; }) => e.$message)"
            >
            </v-textarea>

            <v-number-input
                v-model="state.rating"
                controlVariant="hidden"
                label="Note (/10)"
                :min="1"
                :max="10"
                :error-messages="v$.rating.$errors.map((e: { $message: any; }) => e.$message)"
            >
            </v-number-input>

            <v-btn type="submit" @click="submitCommentForm" :disabled="v$.$invalid">
                Envoyer le commentaire
            </v-btn>
        </v-form>
    </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import {
  required,
  minLength,
  maxLength,
  between,
  helpers
} from '@vuelidate/validators';
import { useCommentsStore } from '~/store/comments';

const props = defineProps<{
  movieId: number;
}>();

const commentsStore = useCommentsStore();

const initialState = {
    username: '',
    message: '',
    rating: null
}

const state = reactive({
...initialState,
})

const rules = {
    username: {
        required: helpers.withMessage('Le nom est requis', required),
        minLength: helpers.withMessage('Le nom doit être compris entre 3 et 50 caractères', minLength(3)),
        maxLength: helpers.withMessage('Le nom doit être compris entre 3 et 50 caractères', maxLength(50))
    },
    message: {
        required: helpers.withMessage('Le message est requis', required),
        minLength: helpers.withMessage('Le nom doit être compris entre 3 et 50 caractères', minLength(3)),
        maxLength: helpers.withMessage('Le nom doit être compris entre 3 et 50 caractères', maxLength(500))
    },
    rating: {
        between: helpers.withMessage('La note doit être comprise entre 1 et 10', between(1, 10))
    }
}

const v$ = useVuelidate(rules, state, {
  $autoDirty: true
});

const submitCommentForm = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  commentsStore.addComment({
    id: crypto.randomUUID(),
    movieId: props.movieId,
    username: state.username,
    message: state.message,
    rating: state.rating!,
    createdAt: new Date().toISOString()
  });

  // Reset form values afterwards
  Object.assign(state, initialState);
  v$.value.$reset();
}
</script>