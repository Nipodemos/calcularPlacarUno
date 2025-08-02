<script lang="ts">
	interface Pessoa {
		id: string;
		nome: string;
	}
	interface Partida {
		id: string;
		pontuacao: {
			[chave: string]: number;
		};
	}
	interface Sessao {
		id: string;
		pessoas: Pessoa[];
		partidas: Partida[];
	}

	let pessoas = $state<Pessoa[]>([]);

	let sessao = $state<Sessao[]>([]);

	let mostrarTelaNovaPartida = $state(false);
	let idPartidaAtual: string | null = $state(null);
	let idSessaoAtual: string | null = $state(null);
	let pessoasSelecionadas: string[] = $state([]);

	function gerarIdUnico() {
		const timestamp = Date.now().toString(36); // Converte para base 36 (alfanumérico)
		const randomString = Math.random().toString(36).substring(2, 15); // Remove o "0."
		return timestamp + randomString;
	}

	function iniciarNovaSessao(
		event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
	) {
		event.preventDefault();

		if (pessoasSelecionadas.length === 0) {
			alert('Selecione pelo menos uma pessoa para iniciar a sessão.');
			return;
		}
		let pessoasPraAdicionar = pessoasSelecionadas
			.map((id) => {
				return pessoas.find((p) => p.id === id);
			})
			.filter((p): p is Pessoa => p !== undefined);

		let pontuacaoInicial: Record<string, number> = {};
		for (let pessoa of pessoasPraAdicionar) {
			pontuacaoInicial[pessoa.id] = 0;
		}

		let novaPartida = {
			id: gerarIdUnico(),
			pontuacao: pontuacaoInicial
		};

		idSessaoAtual = gerarIdUnico();
		sessao.push({
			id: idSessaoAtual,
			pessoas: pessoasPraAdicionar,
			partidas: [novaPartida]
		});
	}
	$inspect(sessao);
</script>

{#if mostrarTelaNovaPartida}
	<h4>Selecione quem irá participar:</h4>
	{#each pessoas as pessoa (pessoa.id)}
		<div>
			<input type="checkbox" id={pessoa.id} bind:group={pessoasSelecionadas} />
			<label for={pessoa.id}>{pessoa.nome}</label>
		</div>
	{/each}
	<button onclick={iniciarNovaSessao}>Começar nova Sessão</button>
{/if}

<button>Nova Partida</button>
