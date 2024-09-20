import { LocalStore } from '$lib/persistedStore.svelte';
type Pessoa = {
	nome: string;
	id: string;
};

type Placar = {
	jogador: string;
	pontos: number;
};

type Partida = {
	id: string;
	data: Date;
	placar: Placar[];
};

let Pessoas = $state([]) as Pessoa[];
let Partidas = $state([]) as Partida[];

$effect(() => {
	let jsonPessoas = localStorage.getItem('placarUnoPessoas');
	if (jsonPessoas) {
		Pessoas = JSON.parse(jsonPessoas);
	}
	localStorage.setItem('placarUnoPessoas', JSON.stringify(Pessoas));
}
// const Pessoas = new LocalStore<Pessoa[]>('placarUnoPessoas', []);

const Partidas = new LocalStore<Partida[]>('placarUnoPartidas', []);

export { Pessoas, Partidas };
