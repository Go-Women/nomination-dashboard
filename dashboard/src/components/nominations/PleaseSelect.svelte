<script lang="ts">
  export let type = "nomination";
</script>

<main>
  <div class="container">
    <div id="centered">
      <h3>Please select a {type} to begin reviewing.</h3>
    </div>
  </div>
</main>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 100vh;
    align-items: center;
    justify-items: center;
  }

  #centered {
    font-style: italic;
    color: darkgray;
  }
</style>