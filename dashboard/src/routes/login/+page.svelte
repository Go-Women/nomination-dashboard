<script lang="ts">
  import { Button, Form, FormGroup, PasswordInput, TextInput } from "carbon-components-svelte";
  import "carbon-components-svelte/css/all.css";
  import Login from "carbon-icons-svelte/lib/Login.svelte";
  import "../../css/index.css";


</script>

<main>

  <div id="login-form">
    <div id="login-label">Portal Login</div>
    <Form>
      <FormGroup>
        <TextInput name="username" labelText="Username" placeholder="Enter Username..." />
        <PasswordInput name="password" labelText="Password" placeholder="Enter Password..." />
      </FormGroup>
      <Button type="submit" icon={Login} href="/home">Login</Button>
    </Form>
  </div>

</main>

<style>
  main {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    justify-items: center;
  }

  #login-form {
    width: 100%;
    grid-column: 2;
    grid-row: 2;
  }

  #login-label {
    font-size: 2.5em;
    margin-bottom: 1em;
  }

</style>