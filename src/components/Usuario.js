export default class Usuario {
    nome: String; 
    email: String;
    idade: String;
    //Adicionar outros atributos, pq eu não sei quais precisamos agora.
    constructor(String nome, String email, String idade){
        this.email = email;
        this.idade = idade;
        this.nome = nome; 
    }
}