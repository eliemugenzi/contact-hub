<template>
    <main class="contacts-wrapper">
        <h1>Your contacts!</h1>
        <UForm :schema="schema" :state="state" @submit="onSearch">
            <UFormGroup label="Search" name="search">
                <UInput v-model="state.search" />
            </UFormGroup>
            <UButton type="submit" class="search-button">Search...</UButton>
        </UForm>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Contact Preferences</th>
                    <th>Probable duplicates</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in contacts" :key="index">
                    <td>{{ item.id }}</td>
                    <td>{{ item.first_name }}</td>
                    <td>{{ item.last_name }}</td>
                    <td>
                        <ul v-for="(preference, i) in item.preferences" :key="i">
                            <li>
                                <span class="preference-key">{{ preference.type }}:</span>
                                <span class="preference-value">{{ preference.value }}</span>
                            </li>
                        </ul>
                    </td>
                    <td>
                        <ul v-for="(duplicate, i) in item.duplicates" :key="i">
                            <li>
                                <span>{{ duplicate?.first_name }} {{ duplicate.last_name }}</span>
                                <ul v-for="(preference, i) in item.preferences" :key="i">
                                    <li>
                                        <span class="preference-key">{{ preference.type }}:</span>
                                        <span class="preference-value">{{ preference.value }}</span>
                                    </li>
                                </ul>
                            </li>
                            <UButton class="merge-button">Merge</UButton>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    </main>
</template>

<script setup>
import { onBeforeMount, reactive, computed } from 'vue';
import { useStore, mapGetters, mapActions } from 'vuex';
import * as Yup from 'yup';

const store = useStore();

const schema = Yup.object({
    search: Yup.string().required("Search contacts using first or last name..."),
})

const state = reactive({
    search: null,
})

onBeforeMount(() => {
    // store.dispatch("getContacts")
    const { getContacts } = mapActions(["getContacts"])

    console.log('GET CONTACTS___', getContacts);
})

const { contacts: ctx } = mapGetters(["contacts"])



const contactsMapper = ctx?.data?.map((contact, index) => ({
    id: index + 1,
    first_name: contact?.first_name,
    last_name: contact?.last_name,
    preferences: contact?.preferences,
    duplicates: contact?.duplicates
}))

const contacts = computed(()=> contactsMapper);

const onSearch = ()=>{
   store.dispatch("searchContacts", state.search);
}


</script>

<style lang="scss" scoped>
table {
    margin: 2rem 0;
}

tr:nth-child(even) {
    background: rgba($color: #000000, $alpha: 0.15);
    padding: 1.5rem;

    td {
        padding: 1rem;
    }
}

tr:nth-child(odd) {
    td {
        padding: 1rem;
    }
}

.preference-key {
    margin-right: 0.5rem;
    font-size: 0.8rem;
    font-weight: bold;
}

.preference-value {
    font-size: 0.7rem;
    font-weight: 600;
}

.merge-button {
    margin-top: 0.5rem;
}

.contacts-wrapper {
    margin: auto 10%;
}

.search-button {
    margin-top: 10px;
}
</style>