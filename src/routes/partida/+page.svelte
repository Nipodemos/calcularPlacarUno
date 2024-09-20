<script>
	import { Pessoas } from '../../stores/stores.svelte';
	let pessoasNaoAdicionadas = Pessoas.value;
	Pessoas.value;
</script>

<h2>Adicione pessoas a partida</h2>

{#each Pessoas.value as pessoa}
	<p>{pessoa.nome}</p>
	<button>Adicionar</button>
{/each}
