<script lang="ts">

export let data: any;
let { matches } = data.props;

</script>

<main>

    {#each matches as match}
        {#if match.matched}
        <p>Matched {match.nominee} with {match.judge} using
            {#if match.category}
            category {match.category}
            {/if}
            {#if match.subcategory}
            subcategory {match.subcategory}
            {/if}
        </p>
        {:else}
        <p>Unable to match {match.nominee} (category {match.category} and subcategory {match.subcategory})</p>
        {/if}
    {/each}

</main>