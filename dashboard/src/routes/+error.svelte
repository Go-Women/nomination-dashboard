<script lang="ts">
  import { page } from "$app/stores";
  let errorImg = '/error.jpg';
</script>

<main>
  <div class="container">
    <div class="middle">
      <div class="errorCode">
        {$page.status}
      </div>
      <div class="errorText">
        {$page.error ? $page.error.message : 'Error'}
        <span class="allWeKnow">That's all we know.</span>
      </div>
      <div class="errorImage">
        <img src={errorImg} alt="A sad girl" />
      </div>
      <div class="whatnext">
        Try using your browser's Back button, or return to the
        <a href="/">Home</a> page.
      </div>
    </div>
  </div>
</main>

<style>
  .container {
    display: grid;
    grid-template-columns: 25% 50% 25%;
    grid-template-rows: 100%;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .middle {
    grid-column: 2;
    grid-row: 1;
    margin-top: 5em;
  }
  .errorCode {
    font-size: 6em;
  }
  .errorText {
    font-size: 2em;
    padding: 1em;
  }
  .allWeKnow {
    font-weight: 300;
  }
  .whatnext {
    padding-top: 1em;
  }
</style>