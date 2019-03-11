<template>
    <input 
      v-bind:type=inputType
      v-bind:placeholder=inputPlaceholder
      v-bind:pattern=rex
      v-bind:title=title
    />
</template>

<script>
export default {
    props: {
      inputType: {
        type: String,
        required: true,
      },
      inputPlaceholder: String,
      rex: String,
      title: String,
    }
}
</script>

<style scoped>
input
{
    width: 300px;
    height: 34px;
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 6px;
    font-size: 1.5em;
}
input:focus
{
    box-shadow: 0 0 20px blue;
}
</style>
